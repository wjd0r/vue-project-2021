import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {
  login({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http
      .oauth({
        method: 'POST',
        url: 'token',
        data: data,
        auth: {
          username: 'ipr-lite',
          password: 'ipr-lite',
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic aXByLWZlOmlwci1mZQ==',
        },
      })
      .then((res: any) => {
        commit('setToken', res.data);
        return res;
      });
  },
  logout({ commit }: any, data: any = {}) {
    commit('setToken', null);
  },
  checkToken({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http
      .oauth({
        method: 'POST',
        url: 'check_token',
        data: data,
        auth: {
          username: 'ipr-lite',
          password: 'ipr-lite',
        },
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res: any) => {
        return res;
      });
  },
};
