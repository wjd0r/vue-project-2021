import { AxiosResponse } from 'axios';
import { http } from '../../../common';

export default {
  // userManage/

  // 6.5. 유저 전체 검색
  getUsers({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`user/search`, {params: data}).then((res) => {
      return res;
    });
  },

  // 6.6. 유저 단일 조회
  getUser({ commit }: any, id: string): Promise<AxiosResponse> {
    return http.sso.get(`user/${id}`).then((res) => {
      return res;
    });
  },

  // 6.7. 유저 수정
  // userManage/putUser
  putUser({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    const id = data.id;
    delete data.id;
    return http.sso.put(`user/${id}`, data).then((res) => {
      return res;
    });
  },

  // 6.8. 유저 생성
  postUser({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post(`user`, data).then((res) => {
      return res;
    });
  },


  // 6.11. 유저 비밀번호 변경
  forgotPassword({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`user/password/forgot`, data).then((res) => {
      return res;
    });
  },


  // 유저 검색 -> state, mutation, getters 필요
  userSearch({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get('user/search', data).then((res) => {
      return res;
    });
  },
  //회원 가입 by 관리자
  userRegisterByAdmin({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('user', data).then((res) => {
      return res;
    });
  },

  //사용자 정보 자세히 -> state, mutation, getters 필요
  userDetailInfo({ commit }: any, id: any = {}): Promise<AxiosResponse> {
    return http.sso.get('user/' + id).then((res) => {
      return res;
    });
  },

  // 사용자 정보 수정
  editUser({ commit }: any, data: any = []): Promise<AxiosResponse> {
    const id = data[0];
    const userData = data[1];
    return http.sso.put('user/' + id, userData).then((res) => {
      return res;
    });
  },

  // 사용자 정보 삭제
  deleteUserInAdmin({ commit }: any, id: any = {}): Promise<AxiosResponse> {
    return http.sso.delete('user/' + id).then((res) => {
      return res;
    });
  },
};
