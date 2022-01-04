import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { INotification, INotificationActionInfo, INotificationData, IWorkFlowResponse, IWorkFlowResponseAction } from '@/interface';

@Component({
  computed: mapGetters({
    workflowState: 'common/getWorkflowState',
    message: 'common/getSSEMessage',
    workFlowResponse: 'common/getWorkFlowResponse'
  })
})
export default class DashboardTabMixin extends Vue {
  readonly workflowState!: '' | 'REQUEST' | 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'CANCELED' | 'ERROR';
  readonly message!: INotification;
  readonly workFlowResponse!: IWorkFlowResponse;

  getActionInfos(): { [key: string]: INotificationActionInfo | IWorkFlowResponseAction } {
    if (this.message) {
      const notificationData: INotificationData = JSON.parse(this.message.notificationData);
      return notificationData.actionInfo;
    } else if (this.workFlowResponse) {
      return this.workFlowResponse.actions;
    } else {
      return null;
    }
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
}
