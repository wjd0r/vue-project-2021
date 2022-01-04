import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // groupManage

  
  
  // 4.1. 그룹 생성
  postGroup({ commit }: any, data: any): Promise<AxiosResponse> {
    return http.sso.post(`group`, data.data).then((res) => {
      return res;
    });
  },

  // 4.2. 그룹 조회
  getGroups({ commit }: any): Promise<AxiosResponse> {
    return http.sso.get(`group`).then((res) => {
      return res;
    });
  },

  // 4.3. 그룹 수정
  putGroup({ commit }: any, data: any): Promise<AxiosResponse> {
    return http.sso.post(`group/${data.id}`, data.data).then((res) => {
      return res;
    });
  },

  // 그룹 필터 옵션 조회
  searchGroupFilter({ commit }: any): Promise<AxiosResponse> {
    return http.sso.get('/groups/filters').then((res) => {
      return res;
    });
  },

  // 그룹 검색
  searchGroup({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('/groups/search', data).then((res) => {
      return res;
    });
  },

  //그룹 정보 자세히
  groupDetailInfo({ commit }: any, id: any = {}): Promise<AxiosResponse> {
    return http.sso.get('groups/' + id).then((res) => {
      return res;
    });
  },
  // 그룹 라이선스 요청
  requestGroupLicenseExtension({ commit }: any, data: any = []): Promise<AxiosResponse> {
    const id = data.groupId;
    return http.sso.put('groups/' + id + '/licenses', data).then((res) => {
      return res;
    });
  },

  //  그룹 정보 수정
  editGroup({ commit }: any, data: any = []): Promise<AxiosResponse> {
    const id = data[0];
    const groupData = data[1];
    return http.sso.put('groups/' + id, groupData).then((res) => {
      return res;
    });
  },

  //  그룹 정보 생성
  addGroup({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('groups/', data).then((res: any) => {
      return res;
    });
  },
  // 그룹 삭제
  deleteGroup({ commit }: any, id: any = {}): Promise<AxiosResponse> {
    return http.sso.delete(`groups/` + id).then((res) => {
      return res;
    });
  },

  // 라이선스 조회
  searchLicenses({ commit }: any): Promise<AxiosResponse> {
    return http.sso.get('licenses').then((res) => {
      return res;
    });
  }
};
