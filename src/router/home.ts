import { RouteConfig } from 'vue-router';
import BaseContainer from '../containers/Full.vue';

import Home from '../views/home/Home.vue';

const route = [
  {
    path: '/process-mining',
    redirect: '/process-mining/home',
    component: BaseContainer,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
    ],
  },
] as RouteConfig[];

export default route;