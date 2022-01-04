import { RouteConfig } from 'vue-router';
import processBeforeEnter from './processBeforeEnter';
import BaseContainer from '@/containers/Full.vue';

import Dashboard from '../views/dashboard/Dashboard.vue';
import DashboardEditor from '../views/dashboard/editor/DashboardEditor.vue';

const route = [
  {
    path: '/process-mining/dashboard',
    component: BaseContainer,
    children: [
      {
        path: ':projectId/:repositoryId',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: processBeforeEnter
      },
      {
        path: ':projectId/:repositoryId/personal/modify',
        name: 'DashboardEditor',
        component: DashboardEditor,
        beforeEnter: processBeforeEnter
      }
    ]
  }
] as RouteConfig[];

export default route;
