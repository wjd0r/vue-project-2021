import { AxiosResponse } from 'axios';
import { http } from '../../common';
export default {
  getProcessList({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.process.index', data).then((res) => {
      return res;
    });
  },
  getProcess({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.process.view', data).then((res) => {
      const data = res.data.data;
      commit('setProcess', data);
      return res;
    });
  },
  saveProcess({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.process.save', data).then((res) => {
      const data = res.data.data;
      commit('setProcess', data);
      return res;
    });
  },
  deleteProcess({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.process.delete', data).then((res) => {
      commit('setProcess', null);
      return res;
    });
  },
  getGraphJson({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.project.etc.view', data).then((res) => {
      return res;
    });
  },
  saveGraphJson({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/repo.project.etc.save', data).then((res) => {
      return res;
    });
  }
};
