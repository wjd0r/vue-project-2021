import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { IFilter, IKeyValueObject, INotification, ISetting, IVariant, IWorkFlowResponse } from '@/interface';

import _ from 'lodash';

@Component({
  components: {},
  computed: mapGetters({
    filter: 'common/getFilter',
    variant: 'common/getVariant',
    variantId: 'common/getVariantId',
    variantLoading: 'common/getVariantLoading',
    eventView: 'repository/getRepoEventView',
    notification: 'notification/getNotificationList',
    message: 'common/getSSEMessage',
    workflowState: 'common/getWorkflowState',
    workflowService: 'common/getWorkflowService',
    workFlowResponse: 'common/getWorkFlowResponse',
    setting: 'sso/getSetting',
  }),
})
export default class AnalysisMixin extends Vue {
  readonly filter!: IFilter;
  readonly variant!: IVariant;
  readonly variantId!: string;
  readonly variantLoading!: boolean;
  readonly eventView!: IKeyValueObject;
  readonly notification!: INotification[];
  readonly message!: INotification;
  readonly workflowState!: '' | 'REQUEST' | 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'CANCELED' | 'ERROR';
  readonly workflowService!: string;
  readonly workFlowResponse!: IWorkFlowResponse;
  readonly setting!: ISetting;

  isActionComplete: boolean = false;

  isNoData: boolean = false;

  showLoading: boolean = false;

  mounted() {
    EventBus.$on('showLoading', () => {
      this.isNoData = false;
      this.showLoading = true;
    });

    EventBus.$on('setIsActionComplete', (value: boolean) => {
      this.isActionComplete = value;
    });
  }

  beforeDestroy() {
    EventBus.$off('showLoading');
    EventBus.$off('setIsActionComplete');
  }

  setVariantLoading(value: boolean) {
    this.$store.commit('common/setVariantLoading', value);
  }

  isMobile() {
    return utils.isMobile();
  }

  get checkFilterHaveOnlyDuration() {
    return _.isEmpty(this.filter) || (!_.isEmpty(this.filter) && _.isEqual(Object.keys(this.filter), ['duration']));
  }

  haveCaseIdFilter() {
    return this.filter.tokenInclude && this.filter.tokenInclude === 'ci' && this.filter.tokenValue !== '';
  }
}
