import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {
  getGanttChartData({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.analysis.trace.variant.echarts', data).then((res: any) => {
      commit('setGanttChartData', res.data.data.series);
      return res;
    });
  }
    
}

