import Vue from 'vue';
import store from '../store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import i18n from './i18n';

const baseUrl = window.env;

const http = {
  ipr: axios.create({
    baseURL: baseUrl.IPR_API_BASE_URL + '/ipr/api/v1',
    headers: {
      Accept: 'application/json',
    },
  }),
  sso: axios.create({
    baseURL: baseUrl.IPR_SSO_BASE_URL + '/ipr/sso/v3',
    headers: {
      Accept: 'application/json',
    },
  }),
  oauth: axios.create({
    baseURL: baseUrl.IPR_SSO_BASE_URL + '/oauth',
    headers: {
      Accept: 'application/json',
    },
  }),
  noti: axios.create({
    baseURL: baseUrl.IPR_SSO_BASE_URL + '/ipr/sso/v3',
    headers: {
      Accept: 'application/json',
    },
  }),
};

const reqInterceptorsSuccess = (config: AxiosRequestConfig) => {
  if (store.getters['oauth/getToken'] === null) {
    router.push({ name: 'Login' });
  } else {
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    store.commit('common/addCancelToken', source);

    if (config.url.endsWith('workflow/run')) {
      store.commit('common/setWorkFlowCancelToken', source);
    }

    config.headers['Authorization'] = 'Bearer ' + store.getters['oauth/getToken'].access_token;
  }
  return config;
};

const reqInterceptorsError = (error: AxiosError) => {
  return Promise.reject(error);
};

const resInterceptorsSuccsss = (response: AxiosResponse) => {
  return response;
};

const resInterceptorsError = (error: AxiosError) => {
  if (!error.response) {
    return Promise.reject(error);
  }

  const originalRequest = error.config;
  const errorHeader = error.response.headers;
  const errorStatus = error.response.status;
  const errorData = error.response.data;

  if (errorData.error === 'invalid_token' || errorData.error === 'unauthorized') {
    store.dispatch('sso/logout');
    store.dispatch('oauth/logout');
    router.push({ name: 'Login' });
  } else {
    let xIocCode = '';
    if (errorHeader !== undefined && errorHeader['x-ioc-code'] !== undefined && errorHeader['x-ioc-code'] === 'IPR_ERR_413_00030001') {
      xIocCode = 'IPR_ERR_413_00030001';
      store.dispatch('common/cancelPendingRequests');
    }

    if ((errorStatus === 403 && errorHeader !== undefined && errorHeader['x-ioc-code'] !== undefined && errorHeader['x-ioc-code'] === 'IPR_ERR_403_01900201') || errorHeader['x-ioc-code'] === 'IPR_ERR_409_00000001') {
      xIocCode = errorHeader['x-ioc-code'];
    }
    if (errorStatus === 409 && errorHeader !== undefined && errorHeader['x-ioc-code'] !== undefined && errorHeader['x-ioc-code'] === 'IPR_ERR_409_00000001') {
      xIocCode = errorHeader['x-ioc-code'];
    }

    if (xIocCode === '') {
      Vue.notify({
        group: 'error',
        title: 'Error',
        text: i18n.t('view.common.alert.serverError').toString(),
        type: 'error',
      });
    }
  }

  return Promise.reject(error);
};

/* ipr init */
//request interceptor
http.ipr.interceptors.request.use(reqInterceptorsSuccess, reqInterceptorsError);
//response interceptor
http.ipr.interceptors.response.use(resInterceptorsSuccsss, resInterceptorsError);

/* sso init */
//request interceptor
http.sso.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (store.getters['oauth/getToken'] === null) {
      if (config.url.indexOf('activate') !== -1 || config.url.indexOf('public') !== -1) {
        config.headers['Authorization'] = null;
        return config;
      } else {
        router.push({ name: 'Login' });
      }
    } else {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      store.commit('common/addCancelToken', source);

      config.headers['Authorization'] = 'Bearer ' + store.getters['oauth/getToken'].access_token;
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
//response interceptor
http.sso.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config;
    // TypeError: Cannot read properties of undefined (reading 'status')
    //const errorStatus = error.response.status;
    if (error.response != null && error.response != undefined && error.response.data != undefined) {
      const errorData = error.response.data;

      if (errorData.error === 'invalid_token' || errorData.error === 'unauthorized') {
        store.dispatch('sso/logout');
        store.dispatch('oauth/logout');
        router.push({ name: 'Login' });
      }
    }

    return Promise.reject(error);
  }
);

/* oauth init */
//request interceptor
http.oauth.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
//response interceptor
http.oauth.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default http;
