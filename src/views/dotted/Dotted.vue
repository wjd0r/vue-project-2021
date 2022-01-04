<template>
  <b-overlay :show="repositoryLoading || subscribeLoading" class="content-common-component dotted-component" :class="`lang-${$i18n.locale}`" no-fade bg-color="#fff" opacity="1">
    <div v-if="!repositoryLoading" class="content-common-content dotted-content">
      <Breadcrumb ref="breadcrumb" />
      <div class="content-header">
        <div class="header-group">
          <div class="title" v-if="variant.totalCount !== 0">{{ getVariantTitle() }}</div>
          <h6 class="date-text">{{ duration }}</h6>
        </div>
        <div class="right-align">
          <div v-if="!checkFilterHaveOnlyDuration" class="filter-info-component">
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionY') }} : {{ getBadges(componentData) }}</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionCa') }} : {{ getBadges(colorData) }}</b-badge>
            <b-badge variant="primary" v-if="caseBy !== ''" @click="offHighlight(true)" class="like-button">
              {{ $t('view.process.filter.option.optionSelectchart') }} : {{ caseBy }}
              <span class="fake-button"><div class="ico-close-w" alt="취소 아이콘"></div></span>
            </b-badge>
            <b-badge variant="primary" v-show="caseId !== ''" @click="offHighlight()" class="like-button">
              {{ $t('view.process.filter.option.optionCaseid') }} : {{ caseId }}
              <span class="fake-button"><div class="ico-close-w" alt="취소 아이콘"></div></span>
            </b-badge>
          </div>
        </div>
      </div>
      <div class="content-body">
        <!-- option -->
        <div class="option-component">
          <div class="left-option-component">
            <div ref="filterButton" id="tooltip-filter" class="ico-filter" @click="showMenu('filter')" alt="filter icon"></div>
            <div ref="variantButton" id="tooltip-list" class="ico-list" @click="showMenu('variant')" alt="vriant icon"></div>
          </div>

          <div v-show="!checkFilterHaveOnlyDuration && variantId !== '' && variant.totalCount !== 0" class="right-option-component">
            <div ref="gridButton" id="tooltip-table" class="ico-table" @click="showMenu('grid')" alt="table icon"></div>
          </div>
        </div>
        <!-- option -->

        <!-- chart -->
        <ScatterChart ref="graph" @closeMenu="closeMenu" @cellDoubleClick="cellDoubleClick" />
        <!-- chart -->
      </div>
      <ScatterChartFilter ref="filter" v-show="showFilter" @showMenu="showMenu" @getVariant="getVariant" @setBadges="setBadges" />
      <ScatterChartVariant ref="variant" v-show="showVariant" @showMenu="showMenu" @clickVariant="clickVariant" />
      <ScatterCaseTable ref="grid" v-show="showGrid" @showGrid="showMenu('grid', true)" @rowDoubleClick="rowDoubleClick" @closeMenu="closeMenu('grid')" />

      <template v-if="!isMobile()">
        <b-tooltip ref="tooltip-filter" :disabled.sync="showFilter" target="tooltip-filter" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipFilter') }}</b-tooltip>
        <b-tooltip ref="tooltip-list" :disabled.sync="showVariant" target="tooltip-list" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipVariant') }}</b-tooltip>
        <b-tooltip ref="tooltip-table" :disabled.sync="showGrid" target="tooltip-table" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipCase') }}</b-tooltip>
      </template>
    </div>
  </b-overlay>
</template>

<style scoped></style>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { Route, NavigationGuard } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { EventBus, utils } from '@/common';
import { IClient, IClientState, INotificationActionInfo, INotificationData, IWorkFlowRequest, IWorkFlowResponse, IWorkFlowResponseAction } from '@/interface';

import { AnalysisMixin, AnalysisPageCompMixin, WorkflowMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

import ScatterChart from './components/ScatterChart.vue';
import ScatterChartFilter from './components/ScatterChartFilter.vue';
import ScatterChartVariant from '../components/Variant.vue';
import ScatterCaseTable from '../components/CaseTable.vue';
import { BTooltip } from 'bootstrap-vue';

@Component({
  components: {
    ScatterChart,
    ScatterChartFilter,
    ScatterChartVariant,
    ScatterCaseTable,
  },
})
export default class Dotted extends Mixins(AnalysisPageCompMixin, AnalysisMixin, WorkflowMixin) {
  showFilter: boolean = false;
  showVariant: boolean = false;
  showGrid: boolean = false;

  duration: string = '';
  caseId: string = '';
  caseBy: string = '';

  componentData: string = '';
  colorData: string = '';

  $refs!: {
    graph: ScatterChart;
    filter: ScatterChartFilter;
    variant: ScatterChartVariant;
    grid: ScatterCaseTable;
    filterButton: HTMLDivElement;
    variantButton: HTMLDivElement;
    gridButton: HTMLDivElement;
    'tooltip-filter': BTooltip;
    'tooltip-list': BTooltip;
    'tooltip-table': BTooltip;
  };

  @Watch('showGrid')
  onShowGridChanged(newVal: boolean) {
    if (newVal) {
      this.$refs.grid.setColumnSize();
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
          this.showMenu('filter', true);
        }
      });
    } else {
      this.$refs.grid.setReset();
      next();
      if (to.query.sId) {
        this.initWorkflowFromRouteUpdate(to.query.state, to.query.sId);
      }
    }
  }

  mounted() {
    document.addEventListener('click', this.closeMenu);

    if (!this.$route.query.sId) {
      this.showMenu('filter', true);
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.closeMenu);
  }

  showMenu(menu: string, value?: boolean) {
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
        if (this.showGrid) {
          this.$refs['tooltip-table']?.$emit('close');
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
    this.clearLabel(true);
    this.clearWorkflowService();

    this.showMenu('variant');

    this.$refs.variant.getVariant();
    this.duration = `${moment(this.filter.duration.start).format('YYYY-MM-DD')} ~ ${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;
  }

  clickVariant() {
    this.closeMenu('variant');
    this.closeMenu('grid');
    this.clearLabel(true);
    this.$refs.grid.setReset();
    this.clearWorkflowService();

    // make workflow configuration
    const clientState: IClientState = {
      title: 'view.router.dotted.title',
      route: {
        from: this.$route.name,
        to: this.$route.name,
        params: {
          projectId: this.$route.params.projectId,
          repositoryId: this.$route.params.repositoryId,
        },
      },
      dotted: {
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
          component: this.filter.component,
          value: this.filter.value,
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
        chart: this.$refs.graph.workflowActionBuilder(client),
        case: this.$refs.grid.workflowActionBuilder(client),
      },
    };

    EventBus.$emit('showLoading');
    EventBus.$emit('setIsActionComplete', false);

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
          case 'chart': {
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
        }
      }
    }
  }

  cellDoubleClick(value: any, config: any) {
    this.clearLabel();
    this.caseBy = `x = ${value.timeStr}, y = ${value.component}`;
    this.$refs.grid.onFilterCaseTable(value, config);
  }

  rowDoubleClick(id: string) {
    this.clearLabel(true);
    this.caseId = id;
    this.$refs.graph.getDottedChartByCaseId(id);
  }

  clearLabel(offCaseBy?: boolean) {
    if (offCaseBy) this.caseBy = '';
    this.caseId = '';
  }

  offHighlight(offCaseBy?: boolean) {
    this.clearLabel(offCaseBy);

    this.$refs.graph.getDottedChart();
    this.$refs.grid.offHighlight();
    this.$refs.grid.offFilterCaseTable();
  }

  setBadges(badges: any) {
    this.componentData = badges.componentData;
    this.colorData = badges.colorData;
  }

  getVariantTitle() {
    return this.$refs.variant.getVariantTitle(this.variantId);
  }

  getBadges(value: string) {
    if (this.$te('view.process.filter.value.' + value)) return this.$t('view.process.filter.value.' + value);
    else return '';
  }
}
</script>
