import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // 로그인 이력 검색
  searchAuthHistory({ commit }: any, data: any = {}): Promise<AxiosResponse>{
    return http.sso.get(`/auth-history/search`, {params:data}).then((res) => {
      return res;
    })
  },

};
