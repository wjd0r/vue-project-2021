import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // roleManage

  // 9.1. 역할 생성
  // GET /ipr/sso/v3/role
  postRole({ commit }: any, data: any = {}): Promise<AxiosResponse> {

    delete data.addPermissions;
    delete data.createdOn;
    delete data.removePermissions;

    return http.sso.post(`/role`, data).then((res) => {
      return res;
    });
  },

  // 9.2. 역할 조회
  // GET /ipr/sso/v3/role/search?search=code~ADMIN&sort=id,desc
  getRoles({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`/role/search`, {params:data}).then((res) => {
      return res;
    });
  },

  // 9.3. 역할 단일 조회
  // GET /ipr/sso/v3/role
  getRole({ commit }: any, roleId: string): Promise<AxiosResponse> {
    return http.sso.get(`/role/${roleId}`).then((res) => {
      return res;
    });
  },

  // 9.4. 역할 수정
  putRole({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.put(`/role/${data.id}`, data).then((res) => {
      return res;
    });
  },


  // permission 검색
  searchPermissions({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('/permissions/search', data).then((res) => {
      return res;
    });
  },

  //유저 권한 단일 검색
  permissionDetailInfo({ commit }: any, id: number): Promise<AxiosResponse> {
    return http.sso.get('/permissions/search/' + id).then((res) => {
      return res;
    });
  },

  //유저 권한 유저 id 로 검색
  permissionById({ commit }: any, id: number): Promise<AxiosResponse> {
    return http.sso.get('/users/' + id + '/permissions').then((res) => {
      return res;
    });
  },

  //유저 권한 수정
  editUserRole({ commit }: any, data: any = []): Promise<AxiosResponse> {
    const [userId, roleList] = data;
    return http.sso.put('/users/' + userId + '/permissions', roleList).then((res) => {
      return res;
    });
  },

  // 권한 role 조회 - in AdminManageForm.vue
  searchRoleByTypeInAdmin({ commit }: any, resourceType: any = ''): Promise<AxiosResponse> {
    return http.sso.get('/roles?type=' + resourceType).then((res) => {
      return res;
    });
  },

  // role filter 조회  -- RoleManage.vue
  searchPermissionFilterOptions({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('/permissions/filters', data).then((res) => {
      return res;
    });
  }
};
