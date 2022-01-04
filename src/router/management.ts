import { NavigationGuard, Route, RouteConfig } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { utils } from '@/common';
import BaseContainer from '../containers/Full.vue';

import SystemManagement from '../views/systemManagement/SystemManagement.vue';
import UserManagement from '../views/userManagement/UserManagement.vue';

import mobileBeforeEnter from './mobileBeforeEnter';

const route = [
  {
    path: '/process-mining/management',
    component: BaseContainer,
    children: [
      {
        path: 'system',
        name: 'SystemManagement',
        component: SystemManagement,
        beforeEnter: mobileBeforeEnter,
      },
      {
        path: 'user',
        name: 'UserManagement',
        component: UserManagement,
        beforeEnter: (to: Route, from: Route, next: Next) => {
          if (utils.isMobileBlock()) {
            next({ path: '/process-mining/cant' });
          } else {
            if (to.query.tab === undefined) {
              next({
                name: to.name,
                query: {
                  tab: 'user'
                }
              });
            } else {
              next();
            }
          }
        }
      }
    ]
  }
] as RouteConfig[];
export default route;
