import { RouteConfig } from 'vue-router';
import processBeforeEnter from './processBeforeEnter';
import BaseContainer from '../containers/Full.vue';

import ProcessDiscovery from '../views/processDiscovery/ProcessDiscovery.vue';
import DeltaAnalysis from '../views/deltaAnalysis/DeltaAnalysis.vue';
import LogReplay from '../views/logReplay/LogReplay.vue';
import ProcessFlow from '../views/processFlow/ProcessFlow.vue'

const route = [
  {
    path: '/process-mining/process',
    component: BaseContainer,
    children: [
      {
        path: 'discovery/:projectId/:repositoryId',
        name: 'ProcessDiscovery',
        beforeEnter: processBeforeEnter,
        component: ProcessDiscovery
      },
      {
        path: 'delta/:projectId/:repositoryId',
        name: 'DeltaAnalysis',
        beforeEnter: processBeforeEnter,
        component: DeltaAnalysis
      },
      {
        path: 'animation/:projectId/:repositoryId',
        name: 'LogReplay',
        beforeEnter: processBeforeEnter,
        component: LogReplay
      },
      {
        path: 'flow/:projectId/:repositoryId',
        name: 'ProcessFlow',
        beforeEnter: processBeforeEnter,
        component: ProcessFlow
      }
    ]
  }
] as RouteConfig[];

export default route;
