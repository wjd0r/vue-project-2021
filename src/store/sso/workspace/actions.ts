import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // workspaceManage/

  // 5.1. 워크스페이스 검색
  getWorkspaces({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`/workspace/search`, {params:data}).then((res) => {
      return res;
    });
  },

  // 5.2. 워크스페이스 생성
  postWorkspace({ commit }: any, data: string): Promise<AxiosResponse> {
    return http.sso.post(`workspace`, data).then((res) => {
      return res;
    });
  },

  // 5.3. 워크스페이스 단일 조회
  getWorkspace({ commit }: any, id: string): Promise<AxiosResponse> {
    return http.sso.get(`workspace/${id}`).then((res) => {
      return res.data;
    });
  },

  // 5.4. 워크스페이스 정보 수정
  putWorkspace({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    const id = data.id;
    const param = data;
    delete param.id;
    return http.sso.put(`workspace/${id}`, param).then((res) => {
      return res;
    });
  },

  // 5.5. 워크스페이스 Disable
  deleteWorkspace({ commit }: any, id: string): Promise<AxiosResponse> {
    return http.sso.delete(`workspace/${id}`).then((res) => {
      return res;
    });
  },
};
