import { http } from '@/common';
import { AxiosResponse } from 'axios';

export default {
  getLogReplayGraph({ commit }: any, data: any = {}): Promise<AxiosResponse[]> {
    const getTokenIndex = http.ipr.post('service/run/process.discovery.model.fhm.token.index', data.tokenParam).then((res) => {
      return res;
    });

    const getGraph = http.ipr.post('service/run/process.discovery.model.fhm', data.graphParam).then((res) => {
      return res;
    });

    return Promise.all([getTokenIndex, getGraph]).then((results: AxiosResponse[]) => {
      return results;
    });
  },
  getToken({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.discovery.model.fhm.token.view', data).then((res: AxiosResponse) => {
      return res;
    });
  },
  getBottleneck({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.discovery.model.fhm.token.view.table', data).then((res) => {
      return res;
    });
  },
  getBottleneckCSV({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/download/process.discovery.model.fhm.token.view.table.csv', data).then((res) => {
      return res;
    });
  }
};
