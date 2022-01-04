import{ RouteConfig } from 'vue-router';
import processBeforeEnter from './processBeforeEnter';
import BaseContainer from '../containers/Full.vue';

import SocialAnalysis from '../views/socialAnalysis/SocialAnalysis.vue';

const route = [{
	path: '/process-mining/social',
	component: BaseContainer,
	beforeEnter: processBeforeEnter,
	children: [
		{
			path: ':projectId/:repositoryId',
			name: 'SocialAnalysis',
			component: SocialAnalysis
		}
	]
}] as RouteConfig[];

export default route;