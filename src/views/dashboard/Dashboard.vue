<template>
  <b-overlay :show="repositoryLoading || subscribeLoading || personalLoading" class="animated fadeIn content-common-component dashboard-component overlay-dashboard" no-fade bg-color="#F2F2F2" opacity="1">
    <div v-if="!repositoryLoading" class="dashboard-content">
      <Breadcrumb ref="breadcrumb" />
      <div class="content-header h-auto">
        <div class="left-option-component">
          <div ref="filterButton" id="tooltip-filter" class="ico-filter" @click="onClickMenu('filter')" alt="filter icon"></div>
          <div ref="variantButton" id="tooltip-list" class="ico-list" @click="onClickMenu('variant')" alt="vriant icon"></div>
          <div class="content-sub-header">
            <div class="date-text">{{ duration }}</div>
          </div>
        </div>
        <div class="btn-scroll">
          <div class="btn-group">
            <b-button ref="tabButton" variant="outline-secondary" class="btn-tab" :class="{ active: tabComponent === item.id }" v-for="item in tabs" :key="`tab-button-${item.id}`" @click="onClickTab(item.id)">{{ $t(`view.dashboard.${item.name}.title`) }}</b-button>
            <b-button v-if="havePersonalTab === false" variant="outline-secondary" class="btn-tab btn-add" @click="onClickAddPersonalTab()"><div class="ico-plus" alt="추가 아이콘"></div></b-button>
          </div>
        </div>
        <b-button v-if="tabComponent === 'PersonalTab'" variant="outline-secondary" class="btn-tab btn-editor m-none" @click="onClickGoEditor()"><div class="ico-dashbard-editor" :class="{ 'd-none': isMobileBlock() }" alt="대시보드 편집 아이콘"></div></b-button>
      </div>
      <div class="content-body">
        <b-overlay :show="showOverlay()" class="overlay-dashboard-tab" no-fade bg-color="#F2F2F2" opacity="1">
          <template v-for="item in tabs">
            <template v-if="item.id !== 'PersonalTab'">
              <component v-show="tabComponent === item.id" :ref="item.id" :is="item.id" :key="`tab-${item.id}`" />
            </template>
            <template v-else>
              <component v-show="tabComponent === item.id" :ref="item.id" :is="item.id" :layout="layout" :key="`tab-${item.id}`" />
            </template>
          </template>

          <template #overlay>
            <div class="text-center">
              <template v-if="!workflowService && !workflowState">
                <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
                <template v-else-if="variantLoading">{{ $t('view.process.alert.loadingVariantList') }}</template>
                <template v-else-if="variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
                <template v-else-if="variantId === ''">{{ $t('view.process.alert.chooseVariant') }}</template>
              </template>
              <template v-else>
                <template v-if="!workflowSelectedTab">{{ $t('view.dashboard.alert.needAnalysis') }}</template>
                <template v-else-if="!variantLoading && variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
                <b-spinner v-else label="Spinning"></b-spinner>
              </template>
            </div>
          </template>
        </b-overlay>

        <DashboardFilter ref="filter" v-show="showFilter" @showMenu="onClickMenu" @getVariant="getVariant" />
        <DashboardVariant ref="variant" v-show="showVariant" @showMenu="onClickMenu" @clickVariant="clickVariant" />

        <template v-if="!isMobile()">
          <b-tooltip ref="tooltip-filter" :disabled.sync="showFilter" target="tooltip-filter" triggers="hover" placement="bottomright">{{ $t('view.process.tooltip.tooltipFilter') }}</b-tooltip>
          <b-tooltip ref="tooltip-list" :disabled.sync="showVariant" target="tooltip-list" triggers="hover" placement="bottomright">{{ $t('view.process.tooltip.tooltipVariant') }}</b-tooltip>
        </template>
      </div>
    </div>
  </b-overlay>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Route, NavigationGuard } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { EventBus, utils } from '@/common';
import { IClient, IClientState, INotificationActionInfo, INotificationData, IRequestDashboard, IWorkFlowRequest, IWorkFlowResponse, IWorkFlowResponseAction } from '@/interface';

import { AnalysisMixin, AnalysisPageCompMixin, UtilsMixin, WorkflowMixin } from '@/mixin';

import { AxiosResponse } from 'axios';
import moment from 'moment';
import _ from 'lodash';

import { IWidget } from './editor/dashboard-editor-service';

import DashboardFilter from './components/DashboardFilter.vue';
import DashboardVariant from '../components/Variant.vue';

import OverviewTab from './tabs/OverviewTab.vue';
import ActivityTab from './tabs/ActivityTab.vue';
import ResourceTab from './tabs/ResourceTab.vue';
import OriginatorTab from './tabs/OriginatorTab.vue';
import CostTab from './tabs/CostTab.vue';
import PersonalTab from './tabs/PersonalTab.vue';
import { BButton, BTooltip } from 'bootstrap-vue';

type tabs = 'OverviewTab' | 'ActivityTab' | 'ResourceTab' | 'OriginatorTab' | 'CostTab' | 'PersonalTab';

@Component({
  components: {
    DashboardFilter,
    DashboardVariant,
    OverviewTab,
    ActivityTab,
    ResourceTab,
    OriginatorTab,
    CostTab,
    PersonalTab,
  },
  computed: mapGetters({}),
})
export default class Dashboard extends Mixins(AnalysisPageCompMixin, AnalysisMixin, WorkflowMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  tabComponent: tabs = 'OverviewTab';
  lastRequestTab: tabs = null;

  showFilter: boolean = false;
  showVariant: boolean = false;
  showDuration: boolean = false;

  duration: string = '';

  havePersonalTab: boolean = null;
  layout: IWidget[] = [];

  personalLoading: boolean = false;

  /* refs 선언 */
  $refs!: {
    filter: DashboardFilter;
    variant: DashboardVariant;
    filterButton: HTMLDivElement;
    variantButton: HTMLDivElement;
    OverviewTab: OverviewTab[];
    ActivityTab: ActivityTab[];
    ResourceTab: ResourceTab[];
    OriginatorTab: OriginatorTab[];
    CostTab: CostTab[];
    PersonalTab: PersonalTab[];
    tabButton: BButton[];
    'tooltip-filter': BTooltip;
    'tooltip-list': BTooltip;
  };

  /* Watch 선언 */

  /* navigator guard 선언 */
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
      next();
      if (to.query.sId) {
        this.initWorkflowFromRouteUpdate(to.query.state, to.query.sId);
      }
    }
  }

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    this.setTabComponent(this.setting.dashboard.defaultTab as tabs);
    this.getPersonalTab();
  }

  mounted() {
    document.addEventListener('click', this.closeMenu);
    window.addEventListener('resize', () => {
      EventBus.$emit('resize');
    });
  }

  beforeDestroy() {
    document.removeEventListener('click', this.closeMenu);
    window.removeEventListener('resize', () => {
      EventBus.$emit('resize');
    });
  }

  /* 메소드 선언 */

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
      }
    } else {
      const target: any = menu.target;
      if (target !== this.$refs.filterButton && target !== this.$refs.variantButton && this.$refs.filter && !this.$refs.filter.$el.contains(target) && this.$refs.variant && !this.$refs.variant.$el.contains(target) && !document.getElementById('sidebar').contains(target) && !this.isClickedTabButton(target)) {
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
    this.$store.commit('common/setWorkflowState', 'REQUEST');

    EventBus.$emit('showLoading');
    EventBus.$emit('setIsActionComplete', false);

    /* make workflow configuration */
    const clientState: IClientState = {
      title: 'view.router.dashboard.title',
      route: {
        from: this.$route.name,
        to: this.$route.name,
        params: {
          projectId: this.$route.params.projectId,
          repositoryId: this.$route.params.repositoryId,
        },
      },
      dashboard: {
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
        },
        variant: {
          id: this.variantId,
          name: this.getVariantTitle(),
        },
        selectedTab: this.tabs.find((tab) => tab.id === this.tabComponent).name,
      },
    };

    this.lastRequestTab = this.tabComponent;

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
      },
    };

    data.actions = _.merge(data.actions, this.$refs[this.tabComponent][0].workflowActionBuilder(client));

    this.runWorkflow(data);
  }

  initBySSEMessage(workflowRes?: IWorkFlowResponse) {
    if (this.$refs.filter && this.$refs.variant) {
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
        this.setTabComponent(this.tabs.find((tab) => tab.name === clientState.dashboard.selectedTab).id);

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
    if (this.$refs[this.tabComponent]) {
      EventBus.$emit(`getWidgetData-${this.tabComponent}`);
    } else {
      setTimeout(() => {
        this.loopWorkflowAction(actions);
      }, 100);
    }
  }

  getPersonalTab() {
    this.personalLoading = true;
    this.$store.dispatch('dashboard/getPersonalTab', [utils.buildDashboard(this)]).then((res: AxiosResponse) => {
      const dashboard = res.data.data;
      const personalTab = _.find(dashboard.pages, ['name', 'PersonalTab']);
      if (personalTab !== undefined) {
        this.havePersonalTab = true;
        this.layout = _.values(personalTab.widgets);
      } else {
        this.havePersonalTab = false;
      }
      this.personalLoading = false;
      if (!this.$route.query.sId) {
        this.onClickMenu('filter', true);
      }
    });
  }

  get tabs(): { id: tabs; name: 'overview' | 'activity' | 'resource' | 'originator' | 'cost' | 'personal' }[] {
    const { overview, activity, resource, originator, cost } = this.setting.dashboard.activeTab;
    const tabList: { id: tabs; name: 'overview' | 'activity' | 'resource' | 'originator' | 'cost' | 'personal' }[] = [];

    if (this.havePersonalTab) {
      tabList.push({ id: 'PersonalTab', name: 'personal' });
    }

    if (overview) {
      tabList.push({ id: 'OverviewTab', name: 'overview' });
    }

    if (activity) {
      tabList.push({ id: 'ActivityTab', name: 'activity' });
    }

    if (this.isFieldExist('er') && resource) {
      tabList.push({ id: 'ResourceTab', name: 'resource' });
    }

    if (this.isFieldExist('eo') && originator) {
      tabList.push({ id: 'OriginatorTab', name: 'originator' });
    }

    if ((this.isFieldExist('cn') || this.isFieldExist('en')) && cost) {
      tabList.push({ id: 'CostTab', name: 'cost' });
    }

    return tabList;
  }

  setTabComponent(tab: tabs) {
    this.tabComponent = tab;
    this.$store.commit('dashboard/setSelectedTab', tab.toLowerCase().split('tab')[0]);
  }

  onClickTab(component: tabs) {
    this.setTabComponent(component);
    if (this.variantId == '') {
      return;
    }

    if (this.variant.totalCount !== 0) {
      if (this.workflowSelectedTab) {
        setTimeout(() => {
          EventBus.$emit(`getWidgetData-${this.tabComponent}`);
          EventBus.$emit('resize');
        }, 50);
      } else {
        this.clickVariant();
      }
    }
  }

  isFieldExist(field: string) {
    return this.eventView.fields[field] !== undefined;
  }

  onClickAddPersonalTab() {
    const data: IRequestDashboard = utils.buildDashboard(this);

    data.data = {
      _type: 'DashboardImpl',
      pages: {
        'page-0': {
          _type: 'PageImpl',
          id: 'page-0',
          name: 'PersonalTab',
          widgets: {},
        },
      },
    };

    for (const widget of this.$store.getters['dashboard/getDefaultPersonalTab']) {
      const newWidget = _.cloneDeep(widget);
      delete newWidget.moved;
      data.data.pages['page-0'].widgets[widget.i] = newWidget;
    }

    this.$store.dispatch('dashboard/savePersonalTab', [data]).then((res: AxiosResponse) => {
      this.onClickGoEditor();
    });
  }

  onClickGoEditor() {
    this.$router.push({
      name: 'DashboardEditor',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
    });
  }

  getVariantTitle() {
    return this.$refs.variant.getVariantTitle(this.variantId);
  }

  isClickedTabButton(target: any) {
    let isClick = false;
    for (const button of this.$refs.tabButton) {
      if (button.contains(target)) {
        isClick = true;
        break;
      }
    }
    return isClick;
  }

  get workflowSelectedTab() {
    let clientState: IClientState = null;

    if (this.message) {
      clientState = JSON.parse((JSON.parse(this.message.notificationData) as INotificationData).client.state);
    } else if (this.workFlowResponse) {
      clientState = JSON.parse(this.workFlowResponse.client.state);
    }

    if (clientState !== null) {
      return this.tabs.find((tab) => tab.name === clientState.dashboard.selectedTab).id === this.tabComponent;
    } else if (clientState === null && (this.workflowState === 'REQUEST' || this.workflowState === 'RUNNING' || this.workflowState || 'COMPLETED')) {
      return this.lastRequestTab === this.tabComponent;
    } else {
      return false;
    }
  }

  showOverlay() {
    return this.variantId === '' || this.variant.totalCount === 0 || this.variantLoading || this.checkFilterHaveOnlyDuration || (this.workflowState && !this.workflowSelectedTab);
  }
}
</script>