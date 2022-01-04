import _ from 'lodash';
export default {
  getEventLog(state: any) {
    return state.eventlog;
  },
  getFilter(state: any) {
    return state.filter;
  },
  getVariant(state: any) {
    if (state.variant === null) {
      return {
        totalCount: 0,
        traceVariants: {},
      };
    }
    return {
      totalCount: state.variant.totalCount,
      traceVariants: state.variant.traceVariants,
    };
  },
  getVariantId(state: any) {
    return state.variantId;
  },
  getVariantLoading(state: any) {
    return state.variantLoading;
  },
  getSSEMessage(state: any) {
    return state.message;
  },
  getWorkflowState(state: any) {
    return state.workflowState;
  },
  getWorkflowService(state: any) {
    return state.workflowService;
  },
  getWorkFlowResponse(state: any) {
    return state.workFlowResponse;
  },
  getWorkflowCancelTokens(state: any) {
    return state.workflowcancelToken;
  },
  cancelTokens(state: any) {
    return state.cancelTokens;
  },
};
