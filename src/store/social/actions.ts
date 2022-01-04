import { http } from '@/common';
import { AxiosResponse } from 'axios';

export default {
  getSocialGraph({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('service/run/process.discovery.model.fhm.social', data).then((res) => {
      return res;
    });
  }
};
