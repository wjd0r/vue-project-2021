import { NavigationGuard, Route, RouteConfig } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { utils } from '@/common';
import BaseContainer from '../containers/Full.vue';

import EventList from '../views/event/list/EventList.vue';

import CreateFlow from '../views/event/create/dataset/CreateFlow.vue';

import DatasetPreview from '../views/event/create/dataset/Preview.vue';

import DatasetCreateForm from '../views/event/create/dataset/CreateForm.vue';
import DatasetDataImporting from '../views/event/create/dataset/DataImporting.vue';
import DatasetNextStep from '../views/event/create/dataset/NextStep.vue';
import DatasetMappingSelect from '../views/event/create/dataset/MappingSelect.vue';
import DatasetMappingCheck from '../views/event/create/dataset/MappingCheck.vue';

import RepositoryCreateForm from '../views/event/create/repository/CreateForm.vue';
import RepositoryNextStep from '../views/event/create/repository/NextStep.vue';
import RepositoryMappingSelect from '../views/event/create/repository/MappingSelect.vue';
import RepositoryMappingCheck from '../views/event/create/repository/MappingCheck.vue';

import CreateComplete from '../views/event/create/pages/CreateComplete.vue';

import mobileBeforeEnter from './mobileBeforeEnter';

const route = [
  {
    path: '/process-mining/event',
    redirect: '/process-mining/event/list',
    component: BaseContainer,
    children: [
      {
        path: 'list',
        name: 'EventList',
        component: EventList
      },
      {
        path: 'dataset/create/createFlow',
        name: 'CreateFlow',
        beforeEnter: mobileBeforeEnter,
        component: CreateFlow
      },
      {
        path: 'dataset/create/form',
        name: 'DatasetCreateForm',
        beforeEnter: mobileBeforeEnter,
        component: DatasetCreateForm
      },
      {
        path: 'dataset/create/importing',
        name: 'DatasetDataImporting',
        beforeEnter: mobileBeforeEnter,
        component: DatasetDataImporting
      },
      {
        path: 'dataset/create/nextstep',
        name: 'DatasetNextStep',
        beforeEnter: mobileBeforeEnter,
        component: DatasetNextStep
      },
      {
        path: 'dataset/create/mapping/select',
        name: 'DatasetMappingSelect',
        beforeEnter: mobileBeforeEnter,
        component: DatasetMappingSelect
      },
      {
        path: 'dataset/create/mapping/check',
        name: 'DatasetMappingCheck',
        component: DatasetMappingCheck,
        beforeEnter: (to: Route, from: Route, next: Next) => {
          if (utils.isMobileBlock()) {
            next({ path: '/process-mining/cant' });
          } else {
            if (to.query.sId != undefined){
              next();
            } else if (from.name !== 'DatasetMappingSelect') {
              next({ name: 'EventList' });
            } else {
              next();
            }
          }
        }
      },
      {
        path: 'dataset/create/complete',
        name: 'DatasetCreateComplete',
        beforeEnter: mobileBeforeEnter,
        component: CreateComplete
      },
      {
        path: 'dataset/create/preview',
        name: 'DatasetPreview',
        beforeEnter: mobileBeforeEnter,
        component: DatasetPreview
      },
      {
        path: 'repository/create/form',
        name: 'RepositoryCreateForm',
        beforeEnter: mobileBeforeEnter,
        component: RepositoryCreateForm
      },
      {
        path: 'repository/create/nextstep',
        name: 'RepositoryNextStep',
        beforeEnter: mobileBeforeEnter,
        component: RepositoryNextStep
      },
      {
        path: 'repository/create/mapping/select',
        name: 'RepositoryMappingSelect',
        beforeEnter: mobileBeforeEnter,
        component: RepositoryMappingSelect
      },
      {
        path: 'repository/create/mapping/check',
        name: 'RepositoryMappingCheck',
        component: RepositoryMappingCheck,
        beforeEnter: (to: Route, from: Route, next: Next) => {
          if (utils.isMobileBlock()) {
            next({ path: '/process-mining/cant' });
          } else {
            if (from.name !== 'RepositoryMappingSelect') {
              if(to.query.sId != undefined){
                next();
              }else{
                next({ name: 'EventList' });
              }
            } else {
              next();
            }
          }
        }
      },
      {
        path: 'repository/create/complete',
        name: 'RepositoryCreateComplete',
        beforeEnter: mobileBeforeEnter,
        component: CreateComplete
      },
    ]
  }
] as RouteConfig[];

export default route;
