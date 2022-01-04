import { NavigationGuard, Route, RouteConfig } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { utils } from '@/common';
import BaseContainer from '../containers/Full.vue';

import FilterCreateForm from '../views/dataFilter/FilterCreateForm.vue';
import DatasetDataFilterSelect from '../views/dataFilter/DataFilterSelect.vue';
import DatasetDataFilterCheck from '../views/dataFilter/DataFilterCheck.vue';
import DatasetDataFiltering from '../views/dataFilter/DataFiltering.vue';

import mobileBeforeEnter from './mobileBeforeEnter';

const route = [
  {
    path: '/process-mining/event',
    redirect: '/process-mining/event/list',
    component: BaseContainer,
    children: [
      {
        path: 'dataset/create/filterCreateForm',
        name: 'DatasetFilterCreateForm',
        beforeEnter: mobileBeforeEnter,
        component: FilterCreateForm
      },
      {
        path: 'dataset/create/filter/select',
        name: 'DatasetDataFilterSelect',
        beforeEnter: mobileBeforeEnter,
        component: DatasetDataFilterSelect
      },
      {
        path: 'dataset/create/filter/filtering',
        name: 'DatasetDataFiltering',
        beforeEnter: mobileBeforeEnter,
        component: DatasetDataFiltering
      },
      {
        path: 'dataset/create/filter/check',
        name: 'DatasetDataFilterCheck',
        component: DatasetDataFilterCheck,
        beforeEnter: (to: Route, from: Route, next: Next) => {
          if (utils.isMobileBlock()) {
            next({ path: '/process-mining/cant' });
          } else {
            if (from.name !== 'DatasetDataFilterSelect') {
              next({ name: 'EventList' });
            } else {
              next();
            }
          }
        }
      },
      
      
    ]
  }
] as RouteConfig[];

export default route;
