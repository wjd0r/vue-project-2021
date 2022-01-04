import { RouteConfig } from 'vue-router';
import BaseContainer from '../containers/Full.vue';

import QnA from '../views/service/QnA.vue';

const route = [
  {
    path: '/process-mining/service',
    component: BaseContainer,
    children: [
      {
        path: 'qna',
        name: 'QnA',
        component: QnA
      }
    ]
  }
] as RouteConfig[];
export default route;
