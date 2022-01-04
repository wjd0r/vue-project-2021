import { IWidgetConfiguration } from '@/interface';
import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {
  // widget data 요청
  getWidgetData({ commit }: any, data: IWidgetConfiguration[]): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/data.discovery.dashboard.echarts', data).then((res) => {
      return res;
    });
  },

  // get personal widget list
  getPersonalTab({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/data.discovery.dashboard.echarts.default', data).then((res) => {
      return res;
    });
  },

  // save personal widget list
  savePersonalTab({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/data.discovery.dashboard.echarts.save', data).then((res) => {
      return res;
    });
  },

  // delete personal tab
  deletePersonalTab({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/data.discovery.dashboard.echarts.delete', data).then((res) => {
      return res;
    });
  }
};
