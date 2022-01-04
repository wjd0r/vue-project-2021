import{ RouteConfig } from 'vue-router';
import processBeforeEnter from './processBeforeEnter';
import BaseContainer from '@/containers/Full.vue';

import Dotted from '@/views/dotted/Dotted.vue';

const route = [{
	path: '/process-mining/dotted',
	component: BaseContainer,
	beforeEnter: processBeforeEnter,
	children: [
		{
			path: ':projectId/:repositoryId',
			name: 'Dotted',
			component: Dotted
		}
	]
}] as RouteConfig[];

export default route;