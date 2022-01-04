import Vue from 'vue';
import Router, { RawLocation, Route, RouteConfig, RouterOptions } from 'vue-router';
import store from '../store';
import { utils } from '../common';

import homeRoute from './home';
import eventRoute from './event';
import standardRoute from './standard';
import databaseRoute from './database';
import dashboardRoute from './dashboard';
import processRoute from './process';
import socialRoute from './social';
import matrixRoute from './matrix';
import dottedRoute from './dotted';
import accountRoute from './account';
import managementRoute from './management';
import serviceRoute from './service';

import dataFilterRoute from './dataFilter';
import eventFilterRoute from './eventFilter';

import Help from '../views/help/Help.vue';
import PageNotFound from '../components/PageNotFound.vue';
import PageCant from '../components/PageCant.vue';
import noPermission from '../components/NoPermission.vue';
import NotSupported from '../components/NotSupported.vue';

const originalPush = Router.prototype.push;
Router.prototype.push = async function push(location: RawLocation) {
  let route: Route;
  try {
    route = await originalPush.call<Router, [RawLocation], Promise<Route>>(this, location);
  } catch (err) {
    if (err.name !== 'NavigationDuplicated') throw err;
  }

  return route;
};

Vue.use(Router);

const baseURL = window.env.IPR_BASE_ROUTE !== undefined ? window.env.IPR_BASE_ROUTE + '/' : '';

function isSupport() {
  const test = function(regexp: RegExp) {
    return regexp.test(window.navigator.userAgent);
  };
  switch (true) {
    case test(/edg/i):
      return true; // 'Microsoft Edge'
    case test(/trident/i):
      return false; // 'Microsoft Internet Explorer';
    case test(/firefox|fxios/i):
      return true; //'Mozilla Firefox';
    case test(/opr\//i):
      return false; //'Opera';
    case test(/ucbrowser/i):
      return false; //'UC Browser';
    case test(/samsungbrowser/i):
      return false; //'Samsung Browser';
    case test(/chrome|chromium|crios/i):
      return true; //'Google Chrome';
    case test(/safari/i):
      return true; //'Apple Safari';
    default:
      return false; //'Other';
  }
}

const routerOptions: RouterOptions = {
  mode: 'history',
  base: baseURL,
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [] as RouteConfig[]
};

if (isSupport()) {
  routerOptions.routes = [
    {
      path: '/',
      redirect: '/process-mining'
    },
    ...homeRoute,
    ...eventRoute,
    ...standardRoute,
    ...databaseRoute,
    ...dashboardRoute,
    ...processRoute,
    ...socialRoute,
    ...matrixRoute,
    ...dottedRoute,
    ...accountRoute,
    ...managementRoute,
    ...serviceRoute,
    ...dataFilterRoute,
    ...eventFilterRoute,
    {
      path: '/process-mining/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/process-mining/cant',
      component: PageCant
    },
    {
      path: '/process-mining/noPermission',
      component: noPermission
    },
    {
      path: '*',
      component: PageNotFound
    }
  ];
} else {
  routerOptions.routes = [
    {
      path: '/',
      redirect: '/process-mining'
    },
    {
      path: '/process-mining',
      component: NotSupported
    },
    {
      path: '*',
      redirect: '/process-mining'
    }
  ];
}

const router = new Router(routerOptions);

if (isSupport()) {
  router.beforeEach((to, from, next) => {
    store.dispatch('common/cancelPendingRequests');
    if (!utils.isNoNeedTokenSSO(to.name)) {
      const token = store.getters['oauth/getToken'];
      if (token) {
        const formData = new FormData();
        formData.append('token', token.access_token);
        
        // 21.10.22 next가 처리 되지 않은 상황에서 route가 일어나는 경우 에러가 생김..
        // 순서를 바꾸더라도 token 체크 로직은 수행되고, error가 생기면 login 화면으로 튕기게 됨..
        next();

        store
          .dispatch('oauth/checkToken', formData)
          /* .then((res) => {
             next();
          }) */
          .catch((err) => {
            store.dispatch('oauth/logout');
            store.dispatch('sso/logout');
            next({ name: 'Login' });
          });
      } else {
        next({ name: 'Login' });
      }
    } else {
      next();
    }
  });
}

export default router;
