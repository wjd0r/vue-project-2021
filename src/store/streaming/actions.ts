import { AxiosResponse } from 'axios';
import { http } from '../../common';
import { ISearch, ITemplate, ITemplates, IInstance, IInstances } from '@/views/userManagement/ts/Topology';

export default {
  getTemplates({ commit }: any, data: ISearch): Promise<AxiosResponse> {
    return http.ipr.get('', { params: data }).then((res) => {
      return res;
    });
  },
  getTemplate({ commit }: any, data: ITemplate): Promise<AxiosResponse> {
    return http.ipr.get('', { params: data }).then((res) => {
      return res;
    });
  },

  getInstances({ commit }: any, data: ISearch): Promise<AxiosResponse> {
    return http.ipr.get('', { params: data }).then((res) => {
      return res;
    });
  },
  
  getInstance({ commit }: any, data: ISearch): Promise<AxiosResponse> {
    return http.ipr.get('', { params: data }).then((res) => {
      return res;
    });
  },
  setInstance({ commit }: any, data: ISearch): Promise<AxiosResponse> {
    return http.ipr.post('', { params: data }).then((res) => {
      return res;
    });
  },

};