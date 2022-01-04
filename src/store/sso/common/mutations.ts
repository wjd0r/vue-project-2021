import { ISetting } from '@/interface';

export default {
  setMyInfo(state: any, payload: any) {
    state.myInfo = payload;
  },
  setProjectId(state: any, payload: any) {
    state.projectId = payload;
  },
  setSetting(state: any, setting: ISetting) {
    state.setting = setting;
  },
};
