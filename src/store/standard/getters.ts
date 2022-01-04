import _ from 'lodash';
export default {
  getProcess(state: any) {
    return state.process;
  },
  getByVariant(state: any) {
    return state.byVariant;
  },
  getFilter(state: any) {
    return state.filter;
  },
  getRouteFrom(state: any) {
    return state.routeFrom;
  },
};
