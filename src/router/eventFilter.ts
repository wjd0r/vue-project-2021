import { NavigationGuard, Route, RouteConfig } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { utils } from '@/common';
import BaseContainer from '../containers/Full.vue';

import SubRepositoryCreateForm from '../views/eventFilter/CreateForm.vue';
import SubRepositoryFilter from '../views/eventFilter/RepositoryFilter.vue';
import SubRepositoryFiltering from '../views/eventFilter/EventFiltering.vue';

import mobileBeforeEnter from './mobileBeforeEnter';

const route = [
  {
    path: '/process-mining/event',
    redirect: '/process-mining/event/list',
    component: BaseContainer,
    children: [
      {
        path: 'repository/sub/create/form',
        name: 'SubRepositoryCreateForm',
        beforeEnter: mobileBeforeEnter,
        component: SubRepositoryCreateForm
      },
      {
        path: 'repository/sub/create/filter',
        name: 'SubRepositoryFilter',
        beforeEnter: mobileBeforeEnter,
        component: SubRepositoryFilter
      },
      {
        path: 'repository/sub/:repositoryId/modify/filter',
        name: 'SubRepositoryFilterModify',
        beforeEnter: mobileBeforeEnter,
        component: SubRepositoryFilter
      },
      {
        path: 'repository/sub/create/filter/filtering',
        name: 'SubRepositoryFiltering',
        beforeEnter: mobileBeforeEnter,
        component: SubRepositoryFiltering
      }
      
    ]
  }
] as RouteConfig[];

export default route;
