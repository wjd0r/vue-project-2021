const eventLogState = {
  projectId: '',
  resourceGroupId: '',
  repositoryId: ''
};

export default {
  eventlog: eventLogState,
  filter: null,
  variant: null,
  variantId: '---',
  variantLoading: false,
  message: null,
  workflowState: '',
  workflowService: '',
  workFlowResponse: undefined,

  workflowcancelToken: null,

  cancelTokens: []
};
