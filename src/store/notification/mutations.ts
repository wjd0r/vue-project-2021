import { startCase } from "lodash";
import { ISetting } from '@/interface';
import store from '../../store';
import _ from 'lodash';

export default {

   /*
   * notification 처리
   */

    setNotificationEmpty(state: any, payload: any) {
      state.notificationList.splice(0);
    },

    //add notification 
    addNotification (state: any, payload: any) {

        const count = store.getters['sso/getSetting'].common.notifiLimit.count;

        const client = JSON.parse(payload.notificationData).client;


        const serviceId = payload.serviceId;

        const idx = state.notificationList.findIndex((n: any)=>{
          return n.serviceId == serviceId;
        });

        if(idx != -1) state.notificationList.splice(idx, 1, payload);
        else state.notificationList.splice(0, 0, payload);

        if(state.notificationList.length > count) {
          state.notificationList = (_.clone(state.notificationList)).splice(0, count);
        }
	},

    //read notification
    readNotification (state: any, payload: any) {
        //state.datasetList = payload;
  },

    //delete notification
    deleteNotification (state: any, payload: any) {
        const serviceId = payload;

        const indexs: any[] = [];
        
        let idx = 0;
        state.notificationList.forEach((n: any) => {
            if(n.serviceId == serviceId){
                indexs.push(idx);

            }
            idx++;
        });

        state.notificationList.splice(indexs[0], 1);

	},

    //delete all notification
    deleteNotificationAll (state: any, payload: any) {
        state.notificationList.splice(0);
	},

  setConnectState(state: any, payload: boolean) {
    state.connectState = payload
  }
}