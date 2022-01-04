import{ RouteConfig } from 'vue-router';
import processBeforeEnter from './processBeforeEnter';
import BaseContainer from '../containers/Full.vue';

import MatrixModel from '../views/matrixModel/MatrixModel.vue';

const route = [{
	path: '/process-mining/matrix',
	component: BaseContainer,
	beforeEnter: processBeforeEnter,
	children: [
		{
			path: ':projectId/:repositoryId',
			name: 'MatrixModel',
			component: MatrixModel
		}
	]
}] as RouteConfig[];

export default route;