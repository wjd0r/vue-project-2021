<template>
  <b-overlay :show="repositoryLoading || subscribeLoading" class="content-common-component process-component" :class="`lang-${$i18n.locale}`" no-fade bg-color="#fff" opacity="1">
    <div v-if="!repositoryLoading" class="content-common-content process-content">
      <Breadcrumb ref="breadcrumb" />
      <div class="content-header">
        <template v-if="duration !== ''">
          <div class="header-group">
            <h6 class="date-text">{{ duration }}</h6>
          </div>
        </template>
        <div class="right-align">
          <div v-if="!checkFilterHaveOnlyDuration" class="filter-info-component">
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionVariantTye') }} : {{ getBadges(filter.variantType) }}</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionsBarSeries') }} : {{ getBadges(filter.barSeries) }}</b-badge>
            <b-badge variant="primary">{{ $t('view.process.filter.option.optionSortBy') }} : {{ getSortByBadges() }}</b-badge>
            <b-badge variant="primary" v-if="caseBy !== ''" @click="onClickOffHighlight(true)" class="like-button">
              {{ $t('view.process.filter.option.optionSelectItem') }} : {{ caseByFormatter }}
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
          </div>

          <div v-show="!checkFilterHaveOnlyDuration && iocCode === ''" class="right-option-component">
            <div ref="gridButton" id="tooltip-table" class="ico-table" @click="onClickMenu('grid')" alt="table icon"></div>
          </div>
        </div>
        <!-- option -->

        <!-- chart-component -->
        <FlowChart ref="graph" @closeMenu="closeMenu" @cellDoubleClick="cellDoubleClick" @setIocCode="setIocCode" @offHighlight="onClickOffHighlight(true)" />
        <!-- chart-component -->
      </div>
      <FlowFilter ref="filter" v-show="showFilter" @showMenu="onClickMenu" @getVariant="getVariant" />
      <FlowCaseTable ref="grid" v-show="showGrid" @showGrid="onClickMenu('grid', true)" @closeMenu="closeMenu('grid')" />

      <template v-if="!isMobile()">
        <b-tooltip ref="tooltip-filter" :disabled.sync="showFilter" target="tooltip-filter" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipFilter') }}</b-tooltip>
        <b-tooltip ref="tooltip-table" :disabled.sync="showGrid" target="tooltip-table" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipCase') }}</b-tooltip>
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

import FlowChart from './components/FlowChart.vue';
import FlowFilter from './components/FlowFilter.vue';
import FlowCaseTable from '../components/CaseTable.vue';
import { BTooltip } from 'bootstrap-vue';

@Component({
  components: {
    FlowChart,
    FlowFilter,
    FlowCaseTable,
  },
})
export default class ProcessFlow extends Mixins(AnalysisPageCompMixin, AnalysisMixin, WorkflowMixin, UtilsMixin) {
  showFilter: boolean = false;
  showGrid: boolean = false;

  duration: string = '';

  caseBy: string = '';

  iocCode: string = '';

  $refs!: {
    graph: FlowChart;
    filter: FlowFilter;
    grid: FlowCaseTable;
    filterButton: HTMLDivElement;
    gridButton: HTMLDivElement;
    'tooltip-filter': BTooltip;
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
      this.$refs.grid.setReset();
      next();
      if (to.query.sId) {
        this.initWorkflowFromRouteUpdate(to.query.state, to.query.sId);
      }
    }
  }

  mounted() {
    document.addEventListener('click', this.closeMenu);

    if (!this.$route.query.sId && this.$route.query?.from !== 'tracevariant-duration') {
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
        if (this.showFilter) {
          this.$refs['tooltip-filter']?.$emit('close');
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
        case 'grid': {
          this.showGrid = false;
          break;
        }
      }
    } else {
      const target: any = menu.target;
      if (target !== this.$refs.filterButton && this.$refs.filter && !this.$refs.filter.$el.contains(target) && !document.getElementById('sidebar').contains(target)) {
        this.showFilter = false;
      }
    }
  }

  getVariant() {
    this.closeMenu('filter');
    this.closeMenu('grid');
    this.clearLabel(true);
    this.clearWorkflowService();

    this.duration = `${moment(this.filter.duration.start).format('YYYY-MM-DD')} ~ ${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;

    /* make workflow configuration */
    const clientState: IClientState = {
      title: 'view.router.processFlow.title',
      route: {
        from: this.$route.name,
        to: this.$route.name,
        params: {
          projectId: this.$route.params.projectId,
          repositoryId: this.$route.params.repositoryId,
        },
      },
      processFlow: {
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
          barSeries: this.filter.barSeries,
          sortBy: this.filter.sortBy,
          sortingBy: this.filter.sortingBy,
          sortDirection: this.filter.sortDirection,
        },
      },
    };

    const client: IClient = {
      url: this.$route.fullPath,
      name: this.$route.name,
      state: JSON.stringify(clientState),
    };

    /* make workflow configuration */
    const data: IWorkFlowRequest = {
      _type: 'ConcurrentWorkflowContext',
      namespace: this.$route.params.projectId,
      client: {
        ...client,
      },
      actions: {
        chart: this.$refs.graph.workflowActionBuilder(client),
        case: this.$refs.grid.workflowActionBuilder(client),
      },
    };

    EventBus.$emit('showLoading');
    EventBus.$emit('setIsActionComplete', false);

    this.runWorkflow(data);
  }

  initBySSEMessage(workflowRes?: IWorkFlowResponse) {
    if (this.$refs.filter && this.$refs.graph && this.$refs.grid) {
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
              this.$refs.graph.resetChart();
              this.$refs.graph.getByDataUri(value.dataUri);
            }
            break;
          }
          case 'case': {
            if (!this.$refs.grid.isActionComplete) {
              this.$refs.grid.isActionComplete = true;
              this.$refs.grid.setReset();
              this.$refs.grid.getByDataUri(value.dataUri);
            }
            break;
          }
        }
      }
    }
  }

  cellDoubleClick(id: string, title: string) {
    this.clearLabel();
    this.caseBy = title;
    this.$refs.grid.onFilterCaseTable(id);
  }

  onClickOffHighlight(offCaseBy?: boolean) {
    this.clearLabel(offCaseBy);
    this.$refs.grid.offHighlight();
    if (offCaseBy) {
      this.$refs.graph.removeHighlight();
      this.$refs.grid.offFilterCaseTable();
    }
  }

  get caseByFormatter() {
    if (this.caseBy === '') {
      return '';
    } else {
      if (this.filter.variantType === 'STANDARD') {
        return this.caseBy.replace('Variant', this.$refs.graph.multilingual.variant.content.toString());
      } else {
        return this.caseBy;
      }
    }
  }

  clearLabel(offCaseBy?: boolean) {
    this.caseBy = '';
  }

  getBadges(value: string) {
    if (this.$te('view.process.filter.value.' + value)) return this.$t('view.process.filter.value.' + value);
    else return '';
  }

  getSortByBadges() {
    switch (this.filter.sortBy) {
      case 'ccnt':
      case 'vs':
      case 'vc': {
        return this.$t(`view.process.filter.value.${this.filter.sortBy}`);
      }
      case 'aduravg': {
        return this.$t(`view.process.filter.value.${this.filter.sortBy}${this.filter.sortDirection}`);
      }
      default: {
        return '';
      }
    }
  }

  setIocCode(string: string) {
    this.iocCode = string;
  }
}
</script>
