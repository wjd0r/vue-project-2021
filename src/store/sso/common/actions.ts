import { AxiosResponse } from 'axios';
import { EventBus, http } from '../../../common';

import { DefaultSetting } from '@/interface/ISetting';

export default {
  logout({ commit }: any) {
    commit('setMyInfo', null);
  },
  getMyInfo({ getters, commit }: any, isFirst?: boolean): Promise<AxiosResponse> {
    return http.sso.get('user/me').then((res) => {
      const data = res.data;

      commit('setMyInfo', data);
      commit('setProjectId', data.iprProjectId);

      // 새로고침시 세팅값이 날아가는 부분 수정
      let setting = JSON.parse(data.config).config;
      setting = { ...setting, sightDay: getters.getSetting.sightDay };
      commit('setSetting', setting);

      if (isFirst) {
        EventBus.$emit('initNotification');
      }

      return res;
    });
  },
  userRegister({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post('public/users', data).then((res) => {
      return res;
    });
  },
  updateMyInfo({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.put('users/' + data.id, data).then((res) => {
      const data = res.data;
      commit('setMyInfo', data);
      return res;
    });
  },
  forgotPassword({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post(`public/user/password/forgot`, data).then((res) => {
      return res;
    });
  },
  reportBug({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.post(`report/bug`, data).then((res) => {
      return res;
    });
  },
  requestChangeGroup({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.put(`users/${data.id}/groups`, { groupKey: data.groupKey }).then((res) => {
      return res;
    });
  },

  //bookmark
  saveBookmark({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso
      .post(
        `preference/create/${data.featureId}/${data.userId}`,

        {
          userId: data.userId,
          featureId: data.featureId,
          data: data.data,
          attribute: data.attribute,
        }
      )
      .then((res) => {
        return res;
      });
  },

  getBookmarkList({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`preference/list/${data.userId}`).then((res) => {
      return res;
    });
  },

  getBookmark({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`preference/view/${data.preferenceId}`).then((res) => {
      return res;
    });
  },

  removeBookmark({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.delete(`preference/delete/${data.preferenceId}`).then((res) => {
      return res;
    });
  },
  // 3.9 유저벌 설정값 저장
  setSetting({ getters, commit }: any, data: any = {}): Promise<AxiosResponse> {
    // 저장시 sightDay 빼기
    const setting = data;
    delete setting.sightDay;
    return http.sso.post(`user/${data.id}/config`, setting).then((res) => {
      // 새로고침시 세팅값이 날아가는 부분 수정
      let setting = data.config;
      setting = { ...setting, sightDay: getters.getSetting.sightDay };
      commit('setSetting', setting);
      return res;
    });
  },
  // 3.10 유저벌 설정값 불러오기
  getSetting({ commit }: any, id: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`user/${id}/config`).then((res) => {
      let RESULT = res.data.config;
      if (RESULT == undefined) {
        RESULT = DefaultSetting;
      }
      commit('setSetting', RESULT);
      return RESULT;
    });
  },

  // 11.1 Lookup
  lookup({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.sso.get(`/lookup`, { params: data }).then((res) => {
      return res;
    });
  },
};
