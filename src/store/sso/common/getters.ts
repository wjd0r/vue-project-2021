export default {
  getMyInfo(state: any) {
    return state.myInfo;
  },
  getProjectId(state: any) {
    return state.projectId;
  },
  getColorTheme(state: any) {
    return state.setting.common.theme;
  },
  getSetting(state: any) {
    return state.setting;
  },
};
