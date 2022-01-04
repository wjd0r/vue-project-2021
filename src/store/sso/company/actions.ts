import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // company/

  // 3.1. 회사 생성
  postCompany({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('company', data).then((res) => {
      return res;
    });
  },
  
  // 3.2. 회사 단일 조회
  getCompany({ commit }: any, id: string): Promise<AxiosResponse> {
    return http.sso.get(`company/${id}`).then((res) => {
      return res;
    });
  },

  // 3.3. 회사 전체 조회
  getCompanyAll({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`company`, {params:data}).then((res) => {
      return res;
    });
  },

  // 3.4. 회사 정보 수정
  putCompany({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.put(`company/${data.id}`, data.data).then((res) => {
      return res;
    });
  },

  // 3.5. 회사 Disable
  deleteCompany({ commit }: any, id: string) {
    return http.sso.delete(`company/${id}`).then((res) => {
      return res;
    });
  },
};
