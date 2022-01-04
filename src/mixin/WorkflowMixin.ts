import { Vue, Component, Watch, Ref } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';
import { INotification, INotificationActionInfo, INotificationData, IWorkFlowRequest, IWorkFlowResponse, IWorkFlowResponseAction } from '@/interface';

import _ from 'lodash';
import { AxiosResponse } from 'axios';

@Component({
  computed: mapGetters({
    sseState: 'notification/getConnectState',
    notification: 'notification/getNotificationList',
    message: 'common/getSSEMessage',
    workflowState: 'common/getWorkflowState',
    workflowService: 'common/getWorkflowService',
  }),
})
export default class WorkflowMixin extends Vue {
  readonly sseState!: boolean;
  readonly notification!: INotification[];
  readonly message!: INotification;
  readonly workflowState!: '' | 'REQUEST' | 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'CANCELED' | 'ERROR';
  readonly workflowService!: string;

  interval: number = null;

  repositoryLoading: boolean = false;
  subscribeLoading: boolean = false;

  @Ref('variant') variantRef: any;
  @Ref('graph') graphRef: any;

  @Watch('notification', { deep: true })
  onRouteQueryChange(newValue: { [key: string]: string }) {
    if (this.workflowService === undefined) {
      return;
    }
    if (this.workflowService && (this.workflowState === 'COMPLETED' || this.workflowState === 'ERROR' || this.workflowState === 'CANCELED')) {
      return;
    }

    this.getSSEMessage();
  }

  beforeCreate() {
    this.$store.commit('common/setSSEMessage', undefined);
    this.$store.commit('common/setWorkflowState', this.$route.query?.state);
    this.$store.commit('common/setWorkflowService', this.$route.query?.sId);
    this.$store.commit('common/setWorkFlowResponse', undefined);
  }

  mounted() {
    if (this.$route.query.sId !== undefined) {
      EventBus.$emit('showLoading');
      if (this.repositoryLoading !== false || this.sseState !== true) {
        this.subscribeLoading = true;
        this.interval = setInterval(() => {
          if (this.repositoryLoading === false && this.sseState === true) {
            this.subscribeLoading = false;
            this.getSSEMessage();
            clearInterval(this.interval);
            this.interval = null;
          }
        }, 100);
      } else {
        this.getSSEMessage();
      }
    }
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }

  getSSEMessage() {
    const message = _.find(this.notification, ['serviceId', this.workflowService]);

    if (message !== undefined) {
      if (this.workflowState !== 'COMPLETED') {
        const notificationData: INotificationData = JSON.parse(message.notificationData);

        if (this.workflowState !== notificationData.state) {
          this.$store.commit('common/setWorkflowState', notificationData.state);
        }

        this.$store.commit('common/setSSEMessage', message);

        if (notificationData.state === 'RUNNING' || notificationData.state === 'COMPLETED') {
          this.initBySSEMessage();
        }
      } else {
        this.$store.commit('common/setSSEMessage', message);
        this.initBySSEMessage();
      }
    } else {
      if (this.$route.query.sId) {
        this.clearWorkflowService();
        switch (this.$route.name) {
          case 'Dashboard':
          case 'ProcessDiscovery':
          case 'DeltaAnalysis':
          case 'LogReplay': {
            if (this.variantRef.isFirst) {
              this.onClickMenu('filter');
            }
            break;
          }
          case 'ProcessFlow': {
            if (this.graphRef.isFirst) {
              this.onClickMenu('filter');
            }
            break;
          }
          case 'MatrixModel':
          case 'Dotted': {
            if (this.variantRef.isFirst) {
              this.showMenu('filter');
            }
            break;
          }
          case 'Gantt': {
            this.showMenu('filter');
            break;
          }
        }
      }
    }
  }

  runWorkflow(request: IWorkFlowRequest) {
    this.$store.commit('common/setWorkflowService', 'REQUEST');
    this.$store.dispatch('common/runWorkflow', request).then((res: AxiosResponse) => {
      const data: IWorkFlowResponse = res.data;
      this.$store.commit('common/setWorkflowState', data.info.state);
      this.$store.commit('common/setWorkflowService', data.id);
      if (data.info.state === 'COMPLETED') {
        this.$store.commit('common/setWorkFlowResponse', data);
        this.initBySSEMessage(data);
      }
    });
  }

  initBySSEMessage(workflowRes?: IWorkFlowResponse) {
    return;
  }

  getActionState(action: IWorkFlowResponseAction | INotificationActionInfo) {
    let state;

    if (this.instanceOfIWorkFlowResponseAction(action)) {
      state = action.info.state;
    } else {
      state = action.state;
    }

    return state;
  }

  instanceOfIWorkFlowResponseAction(object: IWorkFlowResponseAction | INotificationActionInfo): object is IWorkFlowResponseAction {
    return 'info' in object;
  }

  clearWorkflowService() {
    this.$store.commit('common/setSSEMessage', undefined);
    this.$store.commit('common/setWorkflowState', undefined);
    this.$store.commit('common/setWorkflowService', undefined);
    this.$store.commit('common/setWorkFlowResponse', undefined);
    EventBus.$emit('setIsActionComplete', false);
    if (this.$route.name === 'Dashboard') {
      EventBus.$emit('widgetReset');
    }
  }

  initWorkflowFromRouteUpdate(state: string | string[], sId: string | string[]) {
    EventBus.$emit('showLoading');
    if (this.variantRef) {
      this.variantRef.isFirst = true;
    }
    this.$store.commit('common/setWorkflowState', state);
    this.$store.commit('common/setWorkflowService', sId);
    this.getSSEMessage();
  }

  onClickMenu(menu: string, value?: boolean) {
    return;
  }

  showMenu(menu: string, value?: boolean) {
    return;
  }
}
