export default {
  setProcess(state: any, payload: any) {
    state.process = payload;
  },
  setByVariant(state: any, payload: boolean) {
    state.byVariant = payload;
  },
  setFilter(state: any, payload: any) {
    state.filter = payload;
  },
  setRouteFrom(state: any, payload: any) {
    state.routeFrom = payload;
  },
};
