import { http } from '@/common';
import { AxiosResponse, CancelTokenSource } from 'axios';
import { IWorkFlowRequest } from '@/interface';
import _ from 'lodash';

export default {
  // 2.3. Workflow Call
  runWorkflow({ getters, commit }: any, data: IWorkFlowRequest): Promise<AxiosResponse> {
    if (getters.getWorkflowCancelTokens !== null && getters.getWorkflowCancelTokens.cancel) {
      getters.getWorkflowCancelTokens.cancel();
      commit('setWorkFlowCancelToken', null);
    }
    return http.ipr.post('workflow/run', data).then((res) => {
      return res;
    });
  },
  // workflow cache clear
  clearCacheWorkflow({ commit }: any, projectId: string): Promise<AxiosResponse> {
    return http.ipr.post(`workflow/cache/clear`, [projectId, 'iprdemo']).then((res) => {
      return res;
    });
  },
  // 2.2. Asynchronous Service Call
  runAsynchronousService({ commit }: any, data: { serviceId: string; data: any }): Promise<AxiosResponse> {
    return http.ipr
      .post('service/run/' + data.serviceId, data.data, {
        headers: {
          'X-IOCHORD-WSA': 1,
        },
      })
      .then((res) => {
        return res;
      });
  },
  getCache({ commit }: any, data: string | { [key: string]: any }): Promise<AxiosResponse> {
    if (typeof data === 'string') {
      return http.ipr.get('service/cache/' + data).then((res) => {
        return res;
      });
    } else {
      return http.ipr.get('service/cache/' + data.dataUri, { params: data.data }).then((res) => {
        return res;
      });
    }
  },
  setSelectedEventLog({ commit }: any, data: any) {
    commit('setEventLog', data);
  },
  setFilter({ commit }: any, data: any) {
    commit('setFilter', data);
  },
  getVariant({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.analysis.trace.variant', data).then((res) => {
      const data = res.data.data;
      commit('setVariant', data);
      return res;
    });
  },
  getCases({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.event.case.index', data).then((res) => {
      return res;
    });
  },
  getAttrTable({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.event.attr.index', data).then((res) => {
      return res;
    });
  },
  getCaseView({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.event.case.view', data).then((res) => {
      return res;
    });
  },
  getCasesCSV({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/download/repo.event.case.index.csv', data).then((res) => {
      return res;
    });
  },
  getAttrTableCSV({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/download/repo.event.attr.index.csv', data).then((res) => {
      return res;
    });
  },
  getLookUp({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.event.util.lookup.lite', data).then((res) => {
      return res;
    });
  },
  cancelPendingRequests({ state, commit }: any) {
    // Cancel all request where a token exists
    state.cancelTokens.forEach((request: CancelTokenSource) => {
      if (request.cancel) {
        request.cancel();
      }
    });

    // Reset the cancelTokens store
    commit('clearCancelTokens');
  },
};
