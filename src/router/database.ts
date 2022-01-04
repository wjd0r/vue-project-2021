import { RouteConfig } from 'vue-router';
import BaseContainer from '@/containers/Full.vue';

import DatabaseSource from '../views/database/DatabaseSource.vue';

const route = [
  {
    path: '/process-mining',
    component: BaseContainer,
    children: [
      {
        path: 'database',
        name: 'DatabaseSource',
        component: DatabaseSource,
      },
    ],
  },
] as RouteConfig[];

export default route;
