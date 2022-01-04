<template>
  <b-overlay :show="repositoryLoading || subscribeLoading" class="content-common-component process-component discovery-compoenent" no-fade bg-color="#fff" opacity="1">
    <div v-if="!repositoryLoading" class="content-common-content process-content">
      <Breadcrumb ref="breadcrumb" />
      <div class="content-header">
        <template v-if="variantId !== '' && variant.totalCount !== 0">
          <div class="header-group">
            <div class="title">{{ getVariantTitle() }}</div>
            <h6 class="date-text">{{ duration }}</h6>
          </div>
        </template>
        <div class="right-align">
          <div v-if="!checkFilterHaveOnlyDuration" class="filter-info-component">
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionAlgorithm') }} : {{ getBadges(filter.algorithm) }}</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionNode') }} : {{ getBadges(filter.nodeText) }}</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionArc') }} : {{ getBadges(filter.arcText) }}</b-badge>
            <b-badge variant="primary" v-if="caseBy !== ''" @click="onClickOffHighlight(true)" class="like-button">
              {{ $t('view.process.filter.option.optionSelect') }} {{ caseBy }}
              <span class="fake-button"><div class="ico-close-w" alt="취소 아이콘"></div></span>
            </b-badge>
            <b-badge variant="primary" v-if="caseId !== '' || nodeName !== '' || arcName !== ''" @click="onClickOffHighlight()" class="like-button">
              <template v-if="caseId">{{ $t('view.process.filter.option.optionCaseid') }} : {{ caseId }}</template>
              <template v-else-if="nodeName">{{ $t('view.process.filter.option.optionNode') }} : {{ nodeName }}</template>
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
            <template v-if="$route.params.projectId !== 'iprdemo'">
              <div v-show="variantId" ref="editorButton" id="tooltip-editor" class="ico-standard-editor" :class="{ 'd-none': isMobileBlock() }" @click="onClickCreateProcessModel" alt="editor-icon"></div>
            </template>
            <div id="tooltip-direct" :class="{ 'ico-horizontal': graphDirect === 'TB', 'ico-vertical': graphDirect === 'LR' }" @click="onClickLayoutDirect" alt="graphDirect icon"></div>
            <div id="tooltip-align" class="ico-option-align" @click="onClickGraphAlign()" alt="graph-align icon"></div>
            <div id="tooltip-minimap" :class="{ 'ico-map-show': showMinimap === false, 'ico-map-hide': showMinimap === true }" @click="onClickToggleMinimap" alt="minimap icon"></div>
            <!-- <div id="tooltip-log" class="ico-option-log" alt="option-log icon"></div> -->
          </div>

          <div v-show="!checkFilterHaveOnlyDuration && variantId !== '' && variant.totalCount !== 0 && iocCode === ''" class="right-option-component">
            <div ref="gridButton" id="tooltip-table" class="ico-table" @click="onClickMenu('grid')" alt="table icon"></div>
            <div v-show="!checkFilterHaveOnlyDuration && filter.nodeText === 'reworks.total'" ref="reworkButton" id="tooltip-rework" class="ico-rework" @click="onClickMenu('rework')" alt="rework icon"></div>
            <div v-show="!checkFilterHaveOnlyDuration && filter.arcText === 'bottlenecks'" ref="bottleneckButton" id="tooltip-bottleneck" class="ico-bottleneck" @click="onClickMenu('bottleneck')" alt="bottleneck icon"></div>
          </div>
        </div>
        <!-- option -->

        <!-- chart-component -->
        <processGraph ref="graph" @closeMenu="closeMenu" @updateSlider="updateSlider" @graphDoubleClick="graphDoubleClick" @setIocCode="setIocCode" @offHighlight="onClickOffHighlight(true)" />
        <!-- chart-component -->
      </div>
      <processFilter ref="filter" v-show="showFilter" @getVariant="getVariant" />
      <processVariant ref="variant" v-show="showVariant" @clickVariant="clickVariant" />
      <processCaseTable ref="grid" v-show="showGrid" @rowDoubleClick="caseTableRowDoubleClick" @showGrid="onClickMenu('grid', true)" @closeMenu="closeMenu('grid')" />
      <processReworks v-if="!checkFilterHaveOnlyDuration && filter.nodeText === 'reworks.total'" ref="rework" v-show="showRework" @rowDoubleClick="reworkTableRowDoubleClick" @closeMenu="closeMenu('rework')" />
      <processBottleneck v-if="!checkFilterHaveOnlyDuration && filter.arcText === 'bottlenecks'" ref="bottleneck" v-show="showBottleneck" @rowDoubleClick="bottleneckTableRowDoubleClick" @closeMenu="closeMenu('bottleneck')" />

      <template v-if="!isMobile()">
        <b-tooltip ref="tooltip-filter" :disabled.sync="showFilter" target="tooltip-filter" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipFilter') }}</b-tooltip>
        <b-tooltip ref="tooltip-list" :disabled.sync="showVariant" target="tooltip-list" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipVariant') }}</b-tooltip>
        <b-tooltip v-if="$route.params.projectId !== 'iprdemo'" target="tooltip-editor" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipEditor') }}</b-tooltip>
        <b-tooltip ref="tooltip-table" :disabled.sync="showGrid" target="tooltip-table" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipCase') }}</b-tooltip>
        <b-tooltip ref="tooltip-rework" :disabled.sync="showRework" target="tooltip-rework" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipReworks') }}</b-tooltip>
        <b-tooltip ref="tooltip-bottleneck" :disabled.sync="showBottleneck" target="tooltip-bottleneck" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipBottlenecks') }}</b-tooltip>
        <b-tooltip target="tooltip-direct" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipDirect' + (graphDirect === 'TB' ? 'LR' : 'TB')) }}</b-tooltip>
        <b-tooltip target="tooltip-align" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipAlign') }}</b-tooltip>
        <b-tooltip target="tooltip-minimap" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipMinimap' + (showMinimap === true ? 'Off' : 'On')) }}</b-tooltip>
        <!-- <b-tooltip target="tooltip-log" triggers="hover" placement="right">이벤트 생성</b-tooltip> -->
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

import { AnalysisMixin, AnalysisPageCompMixin, UtilsMixin, WorkflowMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

import processGraph from './processGraph.vue';
import processFilter from './processFilter.vue';
import processVariant from '../../components/Variant.vue';
import processCaseTable from '../../components/CaseTable.vue';
import processReworks from '../components/processReworks.vue';
import processBottleneck from '../components/processBottleneck.vue';
import { BTooltip } from 'bootstrap-vue';

@Component({
  components: {
    processGraph,
    processFilter,
    processVariant,
    processCaseTable,
    processReworks,
    processBottleneck,
  },
})
export default class ProcessDiscovery extends Mixins(AnalysisPageCompMixin, AnalysisMixin, WorkflowMixin, UtilsMixin) {
  showFilter: boolean = false;
  showVariant: boolean = false;
  showGrid: boolean = false;
  showRework: boolean = false;
  showBottleneck: boolean = false;

  graphDirect: 'TB' | 'LR' = 'TB';
  showMinimap: boolean = true;

  duration: string = '';

  caseId: string = '';
  nodeName: string = '';
  arcName: string = '';
  caseBy: string = '';

  iocCode: string = '';

  $refs!: {
    graph: processGraph;
    filter: processFilter;
    variant: processVariant;
    grid: processCaseTable;
    rework: processReworks;
    bottleneck: processBottleneck;
    filterButton: HTMLDivElement;
    variantButton: HTMLDivElement;
    gridButton: HTMLDivElement;
    reworkButton: HTMLDivElement;
    bottleneckButton: HTMLDivElement;
    'tooltip-filter': BTooltip;
    'tooltip-list': BTooltip;
    'tooltip-table': BTooltip;
    'tooltip-rework': BTooltip;
    'tooltip-bottleneck': BTooltip;
  };

  @Watch('showGrid')
  onShowGridChanged(newVal: boolean) {
    if (newVal) {
      this.$refs.grid.setColumnSize();
    }
  }

  @Watch('showRework')
  onShowReworkChanged(newVal: boolean) {
    if (newVal) {
      this.$refs.rework.setColumnSize();
    }
  }

  @Watch('showBottleneck')
  onShowBottleneckkChanged(newVal: boolean) {
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
      if (this.$refs.rework) {
        this.$refs.rework.resetRowData();
      }
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
    document.addEventListener('click', this.closeMenu);

    if (!this.$route.query?.sId && this.$route.query?.from !== 'case-section-duration' && this.$route.query?.from !== 'tracevariant-duration') {
      this.onClickMenu('filter', true);
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.closeMenu);
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
        this.showRework = false;
        this.showBottleneck = false;
        if (this.showGrid) {
          this.$refs['tooltip-table']?.$emit('close');
        }
        break;
      }
      case 'rework': {
        this.showRework = !this.showRework;
        this.showGrid = false;
        if (this.showRework) {
          this.$refs['tooltip-rework']?.$emit('close');
        }
        break;
      }
      case 'bottleneck': {
        this.showBottleneck = !this.showBottleneck;
        this.showGrid = false;
        if (this.showBottleneck) {
          this.$refs['tooltip-bottleneck']?.$emit('close');
        }
        break;
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
        case 'rework': {
          this.showRework = false;
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
    this.closeMenu('rework');
    this.closeMenu('bottleneck');
    this.clearLabel(true);
    this.clearWorkflowService();

    this.onClickMenu('variant');

    this.$refs.variant.getVariant();
    this.duration = `${moment(this.filter.duration.start).format('YYYY-MM-DD')} ~ ${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;
  }

  clickVariant() {
    this.closeMenu('filter');
    this.closeMenu('variant');
    this.closeMenu('grid');
    this.closeMenu('rework');
    this.closeMenu('bottleneck');
    this.clearLabel(true);
    this.$refs.graph.clear();
    this.$refs.grid.setReset();
    this.clearWorkflowService();

    /* make workflow configuration */
    const clientState: IClientState = {
      title: 'view.router.processDiscovery.title',
      route: {
        from: this.$route.name,
        to: this.$route.name,
        params: {
          projectId: this.$route.params.projectId,
          repositoryId: this.$route.params.repositoryId,
        },
      },
      processDiscovery: {
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
          algorithm: this.filter.algorithm,
          nodeText: this.filter.nodeText,
          arcText: this.filter.arcText,
          tokenInclude: this.filter.tokenInclude,
          tokenValue: this.filter.tokenValue,
          dep: this.filter.dep,
          freq: this.filter.freq,
          nodeSign: this.filter.nodeSign,
          arcSign: this.filter.arcSign,
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
        graph: this.$refs.graph.workflowActionBuilder(client),
        case: this.$refs.grid.workflowActionBuilder(client),
      },
    };

    if (this.filter.nodeText === 'reworks.total') {
      this.$refs.rework.setReset();
      data.actions['rework'] = this.$refs.rework.workflowActionBuilder(client);
    }
    if (this.filter.arcText === 'bottlenecks') {
      this.$refs.bottleneck.setReset();
      data.actions['bottleneck'] = this.$refs.bottleneck.workflowActionBuilder(client);
    }

    EventBus.$emit('showLoading');

    this.runWorkflow(data);
  }

  initBySSEMessage(workflowRes?: IWorkFlowResponse) {
    if (this.$refs.filter && this.$refs.variant && this.$refs.graph && this.$refs.grid) {
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
    for (const [key, value] of Object.entries(actions)) {
      if (this.getActionState(value) === 'COMPLETED') {
        switch (key) {
          case 'graph': {
            if (!this.$refs.graph.isActionComplete) {
              this.$refs.graph.isActionComplete = true;
              this.$refs.graph.getByDataUri(value.dataUri);
            }
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
          case 'rework': {
            if (this.$refs.rework) {
              if (!this.$refs.rework.isActionComplete) {
                this.$refs.rework.isActionComplete = true;
                this.$refs.rework.setReset();
                this.$refs.rework.getByDataUri(value.dataUri);
              }
            } else {
              setTimeout(() => {
                this.loopWorkflowAction(actions);
              }, 100);
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
  }

  updateSlider() {
    if (this.filter.nodeText === 'reworks.total') this.$refs.rework.getReworkTable();
    else if (this.filter.arcText === 'bottlenecks') this.$refs.bottleneck.getBottleneckTable();
  }

  graphDoubleClick(value: string, config: any, type: string) {
    this.clearLabel();
    this.caseBy = `${this.$t('view.process.discovery.' + type)}: ${value}`;
    this.$refs.grid.onFilterCaseTable(value, config, type);
  }

  caseTableRowDoubleClick(id: string) {
    this.clearLabel();
    this.caseId = id;
    this.$refs.graph.getGraphByCaseId(id);
  }

  reworkTableRowDoubleClick(name: string) {
    this.clearLabel();
    this.nodeName = name;
    this.$refs.graph.onReworkHighlight(name);
  }

  bottleneckTableRowDoubleClick(link: any) {
    this.clearLabel();
    this.arcName = link.source + '-->' + link.target;
    this.$refs.graph.onBottleneckHighlight(link);
  }

  onClickOffHighlight(offCaseBy?: boolean) {
    this.clearLabel(offCaseBy);
    this.$refs.graph.offHighlight(offCaseBy);
    this.$refs.grid.offHighlight();
    if (offCaseBy) this.$refs.grid.offFilterCaseTable();
    if (this.filter.nodeText === 'reworks.total' && !offCaseBy) this.$refs.rework.offHighlight();
    else if (this.filter.arcText === 'bottlenecks' && !offCaseBy) this.$refs.bottleneck.offHighlight();
  }

  clearLabel(offCaseBy?: boolean) {
    if (offCaseBy) this.caseBy = '';
    this.caseId = '';
    this.nodeName = '';
    this.arcName = '';
  }

  onClickCreateProcessModel() {
    if (this.variant.totalCount === 0 || this.iocCode !== '' || this.$refs.graph.isNoData === true) {
      let message = '';
      if (this.variant.totalCount === 0 || this.$refs.graph.isNoData === true) message = 'cantMakeProcessNodata';
      else if (this.iocCode === 'IPR_ERR_413_00030001') message = 'cantMakeProcess413';
      utils.bvModalmsgBoxOk(this, this.$t('view.process.alert.title.alarm').toString(), this.$t('view.process.alert.' + message).toString(), 'warning');
      return;
    }
    const filter: any = {
      algorithm: this.filter.algorithm,
      min: moment(this.filter.duration.start).format('YYYY-MM-DD HH:mm:ss'),
      max: moment(this.filter.duration.end).endOf('days').format('YYYY-MM-DD HH:mm:ss'),
      relations: this.eventView.relations ? _.cloneDeep(this.eventView.relations) : {},
      variantId: this.variantId,
      projectId: this.$route.params.projectId,
    };

    this.$store.commit('standard/setByVariant', true);
    this.$store.commit('standard/setFilter', filter);

    this.$router.push({
      name: 'StandardCreateForm',
      params: {
        projectId: this.$route.params.projectId,
        rgId: this.eventView?.resourceGroup?.id,
      },
      query: {
        id: this.eventView.id,
      },
    });
  }

  getVariantTitle() {
    return this.$refs.variant.getVariantTitle(this.variantId);
  }

  getBadges(value: string) {
    if (this.$te('view.process.filter.value.' + value)) return this.$t('view.process.filter.value.' + value);
    else return '';
  }

  onClickLayoutDirect() {
    this.graphDirect = this.graphDirect === 'TB' ? 'LR' : 'TB';
    this.$refs.graph.changeLayoutDirect(this.graphDirect);
  }

  onClickToggleMinimap() {
    this.showMinimap = !this.showMinimap;
    this.$refs.graph.toggleMinimap(this.showMinimap);
  }

  onClickGraphAlign() {
    this.$refs.graph.changeLayoutDirect(this.graphDirect);
  }

  setIocCode(string: string) {
    this.iocCode = string;
  }
}
</script>
