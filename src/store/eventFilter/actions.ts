import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {
    getRepoEventUtilLookupLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        return http.ipr.post('/service/run/repo.event.util.lookup.lite', data).then((res: any) => {
          const data = res.data.data;
          return res;
        });
      },

    getRepoEventUtilLookupStartEndLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        return http.ipr.post('/service/run/repo.event.util.lookup.startend.lite', data).then((res: any) => {
          const data = res.data.data;
          return res;
        });
    },
}