import store from '../store';
import { Route, NavigationGuard, RawLocation } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];
import nav from '../router/_nav';
import { find } from 'lodash';

function isAnalysisMenu(name: string) {
  switch (name) {
    case 'Dashboard':
    case 'DashboardEditor':
    case 'ProcessDiscovery':
    case 'DeltaAnalysis':
    case 'LogReplay':
    case 'SocialAnalysis':
    case 'MatrixModel':
    case 'Dotted':
    case 'Gantt':
    case 'ProcessFlow': {
      return true;
    }
    default: {
      return false;
    }
  }
}

function getProcessRouteName(path: string) {
  const navItem = find(nav.items, (item: any) => {
    if (path.startsWith(item.url)) {
      return item;
    }
  });
  if (navItem === undefined) return null;
  else return navItem.routeName;
}

const processBeforeEnter = (to: Route, from: Route, next: Next) => {
  const params = to.params;
  if (params.projectId && params.repositoryId) {
    const eventlog = {
      projectId: params.projectId,
      repositoryId: params.repositoryId,
    };

    store.dispatch('common/setSelectedEventLog', eventlog);

    //repository 불러오기
    const eventView = store.getters['repository/getRepoEventView'];

    if (!eventView || params.projectId !== eventView?.project?.id || params.repositoryId !== eventView?.id || isAnalysisMenu(from.name) !== isAnalysisMenu(to.name)) {
      store.commit('common/setFilter', null);
      store.commit('repository/setRepoEventView', null);
    }
    next();
  } else {
    const eventlog = store.getters['common/getEventLog'];
    if (eventlog.projectId && eventlog.repositoryId) {
      const route: RawLocation = {
        name: getProcessRouteName(to.path),
        params: {
          projectId: eventlog.projectId,
          repositoryId: eventlog.repositoryId,
        },
      };

      next(route);
    } else {
      next('/');
    }
  }
};

export default processBeforeEnter;
