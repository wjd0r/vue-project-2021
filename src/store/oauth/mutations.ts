export default {
  setToken(state: any, payload: any) {
    state.token = payload;
  },
  setIsRemember(state: any, payload: any) {
    state.isRemember = payload;
  },
  setUserAccess(state: any, payload: any) {
    state.userAccess = payload;
  },
};
