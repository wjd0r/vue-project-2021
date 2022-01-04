<template>
  <b-overlay :show="repositoryLoading || subscribeLoading" class="content-common-component process-component animation-component" :class="`lang-${$i18n.locale}`" no-fade bg-color="#fff" opacity="1">
    <div v-if="!repositoryLoading" class="content-common-content process-content">
      <Breadcrumb ref="breadcrumb" />
      <div class="content-header">
        <div class="header-group">
          <div class="title" v-if="variant.totalCount !== 0">{{ getVariantTitle() }}</div>
          <h6 class="date-text">{{ duration }}</h6>
        </div>
        <div class="right-align">
          <div v-if="!checkFilterHaveOnlyDuration" class="filter-info-component">
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionAlgorithm') }} : Heuristics Miner</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionNode') }} : {{ getBadges(filter.nodeText) }}</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionArc') }} : {{ getBadges(filter.arcText) }}</b-badge>
            <b-badge variant="primary" v-if="caseBy !== ''" @click="onClickOffHighlight(true)" class="like-button">
              {{ $t('view.process.filter.option.optionSelecttoken') }} : {{ caseBy }}
              <span class="fake-button"><div class="ico-close-w" alt="취소 아이콘"></div></span>
            </b-badge>
            <b-badge variant="primary" v-show="caseId !== '' || arcName !== ''" @click="onClickOffHighlight()" class="like-button">
              <template v-if="caseId">{{ $t('view.process.filter.option.optionCaseid') }} : {{ caseId }}</template>
              <template v-else-if="arcName">{{ $t('view.process.filter.option.optionArc') }} : {{ arcName }}</template>
              <span class="fake-button"><div class="ico-close-w" alt="취소 아이콘"></div></span>
            </b-badge>
          </div>
        </div>
      </div>
      <div class="content-body">
        <!-- option -->
        <div class="option-component">
          <div class="left-option-component">
            <div ref="filterButton" id="tooltip-filter" class="ico-filter" @click="onClickMenu('filter')" alt="filter icon"></div>
            <div ref="variantButton" id="tooltip-list" class="ico-list" @click="onClickMenu('variant')" alt="vriant icon"></div>
            <div id="tooltip-minimap" :class="{ 'ico-map-show': showMinimap === false, 'ico-map-hide': showMinimap === true }" @click="toggleMinimap" alt="minimap icon"></div>
          </div>

          <div v-show="!checkFilterHaveOnlyDuration && variant.totalCount !== 0 && iocCode === ''" class="right-option-component">
            <div ref="gridButton" id="tooltip-table" class="ico-table" @click.prevent="onClickMenu('grid')" alt="table icon"></div>
            <div v-show="!checkFilterHaveOnlyDuration && filter.arcText === 'bottlenecks'" ref="bottleneckButton" id="tooltip-bottleneck" class="ico-bottleneck" @click="onClickMenu('bottleneck')" alt="bottleneck icon"></div>
          </div>
        </div>
        <!-- option -->

        <!-- chart-component -->
        <LogReplayGraph ref="graph" @closeMenu="closeMenu" @graphDoubleClick="graphDoubleClick" @setIocCode="setIocCode" />
        <!-- chart-component -->
      </div>
      <LogReplayFilter ref="filter" v-show="showFilter" @showMenu="onClickMenu" @getVariant="getVariant" />
      <LogReplayVariant ref="variant" v-show="showVariant" @showMenu="onClickMenu" @clickVariant="clickVariant" />
      <LogReplayCaseTable ref="grid" v-show="showGrid" @rowDoubleClick="rowDoubleClick" @showGrid="onClickMenu('grid', true)" @closeMenu="closeMenu('grid')" />
      <LogReplayBottleneck v-if="variant.totalCount !== 0 && !checkFilterHaveOnlyDuration && filter.arcText === 'bottlenecks'" ref="bottleneck" v-show="showBottleneck" @rowDoubleClick="bottleneckTableRowDoubleClick" @closeMenu="closeMenu('bottleneck')" />

      <template v-if="!isMobile()">
        <b-tooltip ref="tooltip-filter" :disabled.sync="showFilter" target="tooltip-filter" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipFilter') }}</b-tooltip>
        <b-tooltip ref="tooltip-list" :disabled.sync="showVariant" target="tooltip-list" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipVariant') }}</b-tooltip>
        <b-tooltip ref="tooltip-table" :disabled.sync="showGrid" target="tooltip-table" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipCase') }}</b-tooltip>
        <b-tooltip ref="tooltip-bottleneck" :disabled.sync="showBottleneck" target="tooltip-bottleneck" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipBottlenecks') }}</b-tooltip>
        <b-tooltip target="tooltip-minimap" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipMinimap' + (showMinimap === true ? 'Off' : 'On')) }}</b-tooltip>
      </template>
    </div>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { Route, NavigationGuard } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { EventBus, utils } from '@/common';
import { IClient, IClientState, INotificationActionInfo, INotificationData, IWorkFlowRequest, IWorkFlowResponse, IWorkFlowResponseAction } from '@/interface';

import { AnalysisMixin, AnalysisPageCompMixin, WorkflowMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

import LogReplayGraph from './components/LogReplayGraph.vue';
import LogReplayFilter from './components/LogReplayFilter.vue';
import LogReplayVariant from '../components/Variant.vue';
import LogReplayCaseTable from '../components/CaseTable.vue';
import LogReplayBottleneck from './components/LogReplayBottleneck.vue';
import { BTooltip } from 'bootstrap-vue';

@Component({
  components: {
    LogReplayGraph,
    LogReplayFilter,
    LogReplayVariant,
    LogReplayCaseTable,
    LogReplayBottleneck,
  },
})
export default class LogReplay extends Mixins(AnalysisPageCompMixin, AnalysisMixin, WorkflowMixin) {
  showFilter: boolean = false;
  showVariant: boolean = false;
  showGrid: boolean = false;
  showBottleneck: boolean = false;

  showMinimap: boolean = true;

  duration: string = '';

  node: string = '빈도';
  arc: string = '빈도';
  caseId: string = '';
  arcName: string = '';
  caseBy: string = '';

  iocCode: string = '';

  $refs!: {
    graph: LogReplayGraph;
    filter: LogReplayFilter;
    variant: LogReplayVariant;
    grid: LogReplayCaseTable;
    bottleneck: LogReplayBottleneck;
    filterButton: HTMLDivElement;
    variantButton: HTMLDivElement;
    gridButton: HTMLDivElement;
    bottleneckButton: HTMLDivElement;
    'tooltip-filter': BTooltip;
    'tooltip-list': BTooltip;
    'tooltip-table': BTooltip;
    'tooltip-bottleneck': BTooltip;
  };

  @Watch('showGrid')
  onShowGridChanged(newVal: boolean) {
    if (newVal) {
      this.$refs.grid.setColumnSize();
    }
  }

  @Watch('showBottleneck')
  onShowBottleneckChanged(newVal: boolean) {
    if (newVal) {
      this.$refs.bottleneck.setColumnSize();
    }
  }

  beforeRouteUpdate(to: Route, from: Route, next: Next) {
    this.clearWorkflowService();
    if (from.params.projectId !== to.params.projectId || from.params.repositoryId !== to.params.repositoryId) {
      this.repositoryLoading = true;
      this.$store.commit('common/setVariant', null);
      this.$store.commit('common/setVariantId', '');
      this.getRepository(to.params.projectId, to.params.repositoryId).then((res) => {
        next();
        this.putProcessMenuHistory(this.getHistoryCode());
        this.repositoryLoading = false;
        if (to.query.sId) {
          this.initWorkflowFromRouteUpdate(to.query.state, to.query.sId);
        } else {
          this.onClickMenu('filter', true);
        }
      });
    } else {
      this.$refs.graph.clear();
      this.$refs.grid.setReset();
      if (this.$refs.bottleneck) {
        this.$refs.bottleneck.resetRowData();
      }
      next();
      if (to.query.sId) {
        this.initWorkflowFromRouteUpdate(to.query.state, to.query.sId);
      }
    }
  }

  mounted() {
    document.addEventListener('click', this.closeMenu, false);

    if (!this.$route.query?.sId && this.$route.query.from !== 'bottleneck-statistics') {
      this.onClickMenu('filter', true);
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.closeMenu, false);
  }

  onClickMenu(menu: string, value?: boolean) {
    switch (menu) {
      case 'filter': {
        this.showFilter = value === undefined ? !this.showFilter : value;
        this.showVariant = false;
        if (this.showFilter) {
          this.$refs['tooltip-filter']?.$emit('close');
        }
        break;
      }
      case 'variant': {
        this.showVariant = !this.showVariant;
        this.showFilter = false;
        if (this.showVariant) {
          this.$refs['tooltip-list']?.$emit('close');
        }
        break;
      }
      case 'grid': {
        this.showGrid = value === undefined ? !this.showGrid : value;
        this.showBottleneck = false;
        if (this.showGrid) {
          this.$refs['tooltip-table']?.$emit('close');
        }
        break;
      }
      case 'bottleneck': {
        this.showBottleneck = !this.showBottleneck;
        this.showGrid = false;
        if (this.showBottleneck) {
          this.$refs['tooltip-bottleneck']?.$emit('close');
        }
      }
    }
  }

  closeMenu(menu: string | Event) {
    if (typeof menu === 'string') {
      switch (menu) {
        case 'filter': {
          this.showFilter = false;
          break;
        }
        case 'variant': {
          this.showVariant = false;
          break;
        }
        case 'grid': {
          this.showGrid = false;
          break;
        }
        case 'bottleneck': {
          this.showBottleneck = false;
          break;
        }
      }
    } else {
      const target: any = menu.target;
      if (target !== this.$refs.filterButton && menu.target !== this.$refs.variantButton && this.$refs.filter && !this.$refs.filter.$el.contains(target) && this.$refs.variant && !this.$refs.variant.$el.contains(target) && !document.getElementById('sidebar').contains(target)) {
        this.showFilter = false;
        this.showVariant = false;
      }
    }
  }

  getVariant() {
    this.closeMenu('filter');
    this.closeMenu('grid');
    this.closeMenu('bottleneck');
    this.clearLabel(true);
    this.clearWorkflowService();

    this.onClickMenu('variant');

    this.$refs.variant.getVariant();
    this.duration = `${moment(this.filter.duration.start).format('YYYY-MM-DD')} ~ ${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;
  }

  clickVariant() {
    this.closeMenu('variant');
    this.closeMenu('grid');
    this.closeMenu('bottleneck');
    this.clearLabel(true);
    this.$refs.grid.setReset();
    this.clearWorkflowService();

    // make workflow configuration
    const clientState: IClientState = {
      title: 'view.router.logReplay.title',
      route: {
        from: this.$route.name,
        to: this.$route.name,
        params: {
          projectId: this.$route.params.projectId,
          repositoryId: this.$route.params.repositoryId,
        },
      },
      logReplay: {
        repository: {
          workspaceName: utils.getWorkspaceByRgId(this.eventView?.resourceGroup?.id)?.name,
          datasetName: this.breadcrumbRef.datasetAttr.name,
          repositoryName: this.eventView.name,
        },
        filter: {
          duration: {
            start: moment(this.filter.duration.start).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(this.filter.duration.end).endOf('days').format('YYYY-MM-DD HH:mm:ss'),
          },
          varintType: this.filter.variantType,
          algorithm: 'fhm',
          nodeText: this.filter.nodeText,
          arcText: this.filter.arcText,
          tokenInclude: this.filter.tokenInclude,
          tokenValue: this.filter.tokenValue,
          dep: this.setting.model.dep.complex,
          freq: this.setting.model.freq.complex,
        },
        variant: {
          id: this.variantId,
          name: this.getVariantTitle(),
        },
      },
    };

    const client: IClient = {
      url: this.$route.fullPath,
      name: this.$route.name,
      state: JSON.stringify(clientState),
    };

    // make workflow configuration
    const data: IWorkFlowRequest = {
      _type: 'ConcurrentWorkflowContext',
      namespace: this.$route.params.projectId,
      client: {
        ...client,
      },
      actions: {
        variant: this.$refs.variant.workflowActionBuilder(client),
        graph: this.$refs.graph.workflowGraphActionBuilder(client),
        'token-index': this.$refs.graph.workflowTokenIndexActionBuilder(client),
        'token-view': this.$refs.graph.workflowTokenViewActionBuilder(client),
        case: this.$refs.grid.workflowActionBuilder(client),
      },
    };

    if (this.filter.arcText === 'bottlenecks') {
      this.$refs.bottleneck.setReset();
      data.actions['bottleneck'] = this.$refs.bottleneck.workflowActionBuilder(client);
    }

    EventBus.$emit('showLoading');
    EventBus.$emit('setIsActionComplete', false);

    this.runWorkflow(data);
  }

  initBySSEMessage(workflowRes?: IWorkFlowResponse) {
    if (this.$refs.filter && this.$refs.variant && this.$refs.graph) {
      let clientState: IClientState;
      let actions: { [key: string]: IWorkFlowResponseAction | INotificationActionInfo };
      if (workflowRes) {
        clientState = JSON.parse(workflowRes.client.state);
        actions = workflowRes.actions;
      } else {
        const notificationData: INotificationData = JSON.parse(this.message.notificationData);
        clientState = JSON.parse(notificationData.client.state);
        actions = notificationData.actionInfo;
      }

      if (this.$route.query.sId && this.message && this.$route.query.sId === this.message.serviceId) {
        this.$refs.filter.initByClientState(clientState);
        this.duration = `${moment(this.filter.duration.start).format('YYYY-MM-DD')} ~ ${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;

        if (this.getActionState(actions['variant']) === 'COMPLETED' && !this.$refs.variant.isActionComplete) {
          this.$refs.variant.isActionComplete = true;
          this.$refs.variant.getByDataUri(actions['variant'].dataUri);
        }
      }

      this.loopWorkflowAction(actions);
    } else {
      setTimeout(() => {
        this.initBySSEMessage(workflowRes);
      }, 100);
    }
  }

  // workflow response나 notification의 actions를 읽는 메소드
  loopWorkflowAction(actions: { [key: string]: IWorkFlowResponseAction | INotificationActionInfo }) {
    let graphDataUri = '';
    let tokenIndexDataUri = '';
    let tokenViewDataUri = '';
    for (const [key, value] of Object.entries(actions)) {
      if (this.getActionState(value) === 'COMPLETED') {
        switch (key) {
          case 'graph': {
            graphDataUri = value.dataUri;
            break;
          }
          case 'token-index': {
            tokenIndexDataUri = value.dataUri;
            break;
          }
          case 'token-view': {
            tokenViewDataUri = value.dataUri;
            break;
          }
          case 'case': {
            if (!this.$refs.grid.isActionComplete) {
              this.$refs.grid.isActionComplete = true;
              this.$refs.grid.setReset();
              this.$refs.grid.setDataUri(value.dataUri);
              this.$refs.grid.getByDataUri(value.dataUri);
            }
            break;
          }
          case 'bottleneck': {
            if (this.$refs.bottleneck) {
              if (!this.$refs.bottleneck.isActionComplete) {
                this.$refs.variant.isActionComplete = true;
                this.$refs.bottleneck.setReset();
                this.$refs.bottleneck.getByDataUri(value.dataUri);
              }
            } else {
              setTimeout(() => {
                this.loopWorkflowAction(actions);
              }, 100);
            }
            break;
          }
        }
      }
    }

    if (graphDataUri !== '' && tokenIndexDataUri !== '' && tokenViewDataUri !== '' && !this.$refs.graph.isActionComplete) {
      this.$refs.graph.isActionComplete = true;
      this.$refs.graph.getByDataUriGraph(graphDataUri, tokenIndexDataUri);
      this.$refs.graph.setTokenViewDataUri(tokenViewDataUri);
    }
  }

  graphDoubleClick(value: any) {
    this.clearLabel(true);
    this.caseBy = value.source + '-->' + value.target;
    this.$refs.grid.onFilterCaseTable(value.caseIds);
  }

  rowDoubleClick(id: string) {
    this.clearLabel();
    this.caseId = id;
    this.$refs.graph.getGraphByCaseId(id);
  }

  bottleneckTableRowDoubleClick(link: any) {
    this.clearLabel();
    this.arcName = link.source + ' -> ' + link.target;
    this.$refs.graph.onBottleneckHighlight(link);
  }

  clearLabel(offCaseBy?: boolean) {
    if (offCaseBy) this.caseBy = '';
    this.caseId = '';
    this.arcName = '';
  }

  onClickOffHighlight(offCaseBy?: boolean) {
    this.clearLabel(offCaseBy);
    this.$refs.graph.offHighlight(offCaseBy);
    this.$refs.grid.offHighlight();
    if (offCaseBy) this.$refs.grid.offFilterCaseTable();
    if (this.filter.arcText === 'bottlenecks') this.$refs.bottleneck.offHighlight();
  }

  getVariantTitle() {
    return this.$refs.variant.getVariantTitle(this.variantId);
  }

  getBadges(value: string) {
    if (this.$te('view.process.filter.value.' + value)) return this.$t('view.process.filter.value.' + value);
    else return '';
  }

  toggleMinimap() {
    this.showMinimap = !this.showMinimap;
    this.$refs.graph.toggleMinimap(this.showMinimap);
  }

  setIocCode(string: string) {
    this.iocCode = string;
  }
}
</script>
