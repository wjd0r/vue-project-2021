<template>
  <b-overlay :show="repositoryLoading || subscribeLoading" class="content-common-component process-component delta-component" :class="`lang-${$i18n.locale}`" no-fade bg-color="#fff" opacity="1">
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
          </div>
        </div>
      </div>
      <div class="content-body">
        <!-- option -->
        <div class="option-component">
          <div class="left-option-component">
            <div ref="filterButton" id="tooltip-filter" class="ico-filter" @click="onClickMenu('filter')"></div>
            <div ref="variantButton" id="tooltip-list" class="ico-list" @click="onClickMenu('variant')"></div>
            <div id="tooltip-minimap" :class="{ 'ico-map-show': showMinimap === false, 'ico-map-hide': showMinimap === true }" @click="onClickToggleMinimap" alt="minimap icon"></div>
          </div>
        </div>
        <!-- option -->

        <!-- chart -->
        <processGraph ref="graph" :getVariantName="getVariantName" />
        <!-- chart -->
      </div>
      <processFilter ref="filter" v-show="showFilter" @showMenu="onClickMenu" @getVariant="getVariant" />
      <processVariant ref="variant" v-show="showVariant" @showMenu="onClickMenu" @clickVariant="clickVariant" />

      <template v-if="!isMobile()">
        <b-tooltip ref="tooltip-filter" :disabled.sync="showFilter" target="tooltip-filter" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipFilter') }}</b-tooltip>
        <b-tooltip ref="tooltip-list" :disabled.sync="showVariant" target="tooltip-list" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipVariant') }}</b-tooltip>
        <b-tooltip target="tooltip-minimap" triggers="hover" placement="right">{{ $t('view.process.tooltip.tooltipMinimap' + (showMinimap === true ? 'Off' : 'On')) }}</b-tooltip>
      </template>
    </div>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Route, NavigationGuard } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { EventBus, utils } from '@/common';
import { IClient, IClientState, INotificationActionInfo, INotificationData, IWorkFlowRequest, IWorkFlowResponse, IWorkFlowResponseAction } from '@/interface';

import { AnalysisMixin, AnalysisPageCompMixin, WorkflowMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

import processGraph from './components/processGraph.vue';
import processFilter from './components/processFilter.vue';
import processVariant from './components/processVariant.vue';
import { BTooltip } from 'bootstrap-vue';

@Component({
  components: {
    processGraph,
    processFilter,
    processVariant,
  },
  computed: mapGetters({
    deltaVariantId: 'common/getVariantId',
  }),
})
export default class DeltaAnalysis extends Mixins(AnalysisPageCompMixin, AnalysisMixin, WorkflowMixin) {
  deltaVariantId: { leftId: string; rightId: string };

  showFilter: boolean = false;
  showVariant: boolean = false;
  showGrid: boolean = false;

  showMinimap: boolean = true;

  duration: string = '';

  $refs!: {
    graph: processGraph;
    filter: processFilter;
    variant: processVariant;
    filterButton: HTMLDivElement;
    variantButton: HTMLDivElement;
    'tooltip-filter': BTooltip;
    'tooltip-list': BTooltip;
    'tooltip-table': BTooltip;
    'tooltip-rework': BTooltip;
    'tooltip-bottleneck': BTooltip;
  };

  beforeRouteUpdate(to: Route, from: Route, next: Next) {
    this.clearWorkflowService();
    if (from.params.projectId !== to.params.projectId || from.params.repositoryId !== to.params.repositoryId) {
      this.repositoryLoading = true;
      this.$store.commit('common/setVariant', null);
      this.$store.commit('common/setVariantId', { leftId: '', rightId: '' });
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
      next();
      if (to.query.sId) {
        this.initWorkflowFromRouteUpdate(to.query.state, to.query.sId);
      }
    }
  }

  mounted() {
    document.addEventListener('click', this.closeMenu);

    if (!this.$route.query?.sId) {
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
    this.clearWorkflowService();

    this.onClickMenu('variant');

    this.$refs.variant.getVariant();
    this.duration = `${moment(this.filter.duration.start).format('YYYY-MM-DD')} ~ ${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;
  }

  clickVariant() {
    this.closeMenu('variant');
    this.clearWorkflowService();

    const clientState: IClientState = {
      title: 'view.router.deltaAnalysis.title',
      route: {
        from: this.$route.name,
        to: this.$route.name,
        params: {
          projectId: this.$route.params.projectId,
          repositoryId: this.$route.params.repositoryId,
        },
      },
      deltaAnalysis: {
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
          viewMode: this.filter.viewMode,
          dep: this.setting.model.dep.complex,
          freq: this.setting.model.freq.complex,
        },
        variant: {
          id: {
            leftId: this.deltaVariantId.leftId,
            rightId: this.deltaVariantId.rightId,
          },
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
      },
    };

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
        }
      }
    }
  }

  getVariantName(id: string) {
    if (this.variant.totalCount === 0) {
      return '';
    }

    if (id === '---') {
      return this.$t('view.process.variant.title.allTitle');
    } else if (id.startsWith('Standard')) {
      const index = _.findIndex(this.$refs.variant.standardProecesList, ['id', id.split('|')[1]]);
      return `${this.$t('view.process.variant.title.variantProcess')} (${index + 1})`;
    } else {
      if (this.filter.variantType === 'STANDARD') {
        return this.$t('view.process.variant.title.variantName') + ' ' + this.variant.traceVariants[id].name.split(' ')[1];
      } else if (this.filter.variantType === 'ES_MONTHLY') {
        return this.variant.traceVariants[id].name;
      }
    }
  }

  getVariantTitle() {
    if (this.variant.totalCount === 0 || this.deltaVariantId.leftId === '' || this.deltaVariantId.rightId === '') {
      return '';
    } else {
      return `${this.getVariantName(this.deltaVariantId.leftId)}, ${this.getVariantName(this.deltaVariantId.rightId)}`;
    }
  }

  getBadges(value: string) {
    if (this.$te('view.process.filter.value.' + value)) return this.$t('view.process.filter.value.' + value);
    else return '';
  }

  onClickToggleMinimap() {
    this.showMinimap = !this.showMinimap;
    this.$refs.graph.toggleMinimap(this.showMinimap);
  }

  isMobile() {
    return utils.isMobile();
  }
}
</script>
