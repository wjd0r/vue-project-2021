import { INotification, IWorkFlowResponse } from '@/interface';
import { CancelTokenSource } from 'axios';

export default {
  setEventLog(state: any, payload: any) {
    state.eventlog = payload;
  },
  setFilter(state: any, payload: any) {
    state.filter = payload;
  },
  setVariant(state: any, payload: any) {
    state.variant = payload;
  },
  setVariantId(state: any, payload: string) {
    state.variantId = payload;
  },
  setVariantLoading(state: any, payload: boolean) {
    state.variantLoading = payload;
  },
  setSSEMessage(state: any, payload: INotification) {
    state.message = payload;
  },
  setWorkflowState(state: any, payload: string){
    state.workflowState = payload;
  },
  setWorkflowService(state: any, payload: string){
    state.workflowService = payload;
  },
  setWorkFlowResponse(state: any, payload: IWorkFlowResponse) {
    state.workFlowResponse = payload
  },
  setWorkFlowCancelToken(state: any, payload: CancelTokenSource) {
    state.workflowcancelToken = payload
  },
  addCancelToken(state: any, token: CancelTokenSource) {
    state.cancelTokens.push(token);
  },
  clearCancelTokens(state: any) {
    state.cancelTokens = [];
  },
};
