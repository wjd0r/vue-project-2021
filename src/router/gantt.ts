import{ RouteConfig } from 'vue-router';
import processBeforeEnter from './processBeforeEnter';
import BaseContainer from '@/containers/Full.vue';

import Gantt from '@/views/ganttChart/GanttChartModel.vue';

const route = [{
	path: '/process-mining/gantt',
	component: BaseContainer,
	beforeEnter: processBeforeEnter,
	children: [
		{
			path: ':projectId/:repositoryId',
			name: 'Gantt',
			component: Gantt
		}
	]
}] as RouteConfig[];

export default route;