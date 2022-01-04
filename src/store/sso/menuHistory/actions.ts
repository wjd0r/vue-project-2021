import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // 10.1. 사용 이력 등록
  // POST /ipr/sso/v3/telemetry

  

  // 기능 사용 필터링 옵션 조회
  searchTelemetryFilters({ commit }: any): Promise<AxiosResponse> {
    return http.sso.get('/telemetry/filters').then((res) => {
      return res;
    });
  },


  // 10.2. 사용 이력 조회
  // GET /ipr/sso/v3/telemetry?search=activeOn<1632704222

  // 기능 사용 이력 검색
  searchTelemetry({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`/telemetry`, {params: data}).then((res) => {
      return res;
    });
  },

  // 메뉴 사용 이력 전송
  useProessMenu({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('telemetry', data).then((res) => {
      return res;
    });
  },

    //메뉴 
  searchTelemetryListByTime({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.sso({
        method: 'GET',
        url: `/telemetry/recent?search=userId:${data}`,
        //params: {
        //  search: data
        //},
      }).then((res) => {
        return res;
      });
  },
};
