import { http } from '@/common';
import { AxiosResponse } from 'axios';

export default {
  getProcessGraph({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.discovery.model.' + data.algorithm, data.data).then((res) => {
      return res;
    });
  },
  getDeltaGraph({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.analysis.delta', data).then((res) => {
      return res;
    });
  },
  getReworks({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.discovery.model.fhm.pf.reworks', data).then((res) => {
      return res;
    });
  },
  getBottleneck({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.discovery.model.fhm.pf.outliers', data).then((res) => {
      return res;
    });
  },
  getReworksCSV({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/download/process.discovery.model.fhm.pf.reworks.csv', data).then((res) => {
      return res;
    });
  },
  getBottleneckCSV({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/download/process.discovery.model.fhm.pf.outliers.csv', data).then((res) => {
      return res;
    });
  }
};
