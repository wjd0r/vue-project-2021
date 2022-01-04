import { NavigationGuard, Route, RouteConfig } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import { utils } from '@/common';
import BaseContainer from '@/containers/Full.vue';

import StandardList from '../views/standard/list/StandardList.vue';
import StandardCreateForm from '../views/standard/create/CreateForm.vue';
import StandardCreateNextStep from '../views/standard/create/NextStep.vue';
import ProcessEditor from '../views/standard/editor/ProcessEditor.vue';

const beforeEnter = (operationCode: string) => {
  return (to: Route, from: Route, next: Next) => {
    if (utils.isMobileBlock()) {
      next({ path: '/process-mining/cant' });
    } else {
      const params = to.params;
      if (params.projectId !== 'iprdemo') {
        const workspace = utils.getWorkspaceByRgId(params.rgId);

        if (workspace && utils.checkPermission(params.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.process', operationCode)) {
          next();
        } else {
          next({ path: '/process-mining/noPermission' });
        }
      } else {
        next();
      }
    }
  };
};

const route = [
  {
    path: '/process-mining/standard',
    component: BaseContainer,
    redirect: '/standard/list',
    children: [
      {
        path: 'list',
        name: 'StandardList',
        component: StandardList
      },
      {
        path: ':projectId/:rgId/create/form',
        name: 'StandardCreateForm',
        beforeEnter: beforeEnter('create'),
        component: StandardCreateForm
      },
      {
        path: ':projectId/:rgId/:processId/model/select',
        name: 'StandardCreateNextStep',
        beforeEnter: beforeEnter('create'),
        component: StandardCreateNextStep
      },
      {
        path: ':projectId/:rgId/:processId/model/modify',
        name: 'ProcessEditor',
        beforeEnter: beforeEnter('update'),
        component: ProcessEditor
      }
    ]
  }
] as RouteConfig[];

export default route;
