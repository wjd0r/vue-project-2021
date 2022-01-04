import { AxiosResponse } from 'axios';
import { http } from '../../common';
import store from '../../store';

export default {

    /*
    getRepoProjectSave({ commit }: any, data: any = {}): Promise<AxiosResponse> {
		return http.ipr.post('/service/run/repo.project.save', [{
			"_type": "ProjectSaveConfiguration",
			"data": {
				"id": data.projectId,
				"name": data.name,
				"description": data.desc
			}
		}]).then((res: any) => {
			const data = res.data.data;
			commit('setRepoProjectSave', data);
			return res;
		});
	},
    */

  /*
      //ping 오는대로 list로 업데이트
    async addSseSampleList({ commit }: any, data: any = {}) { 
      await commit('addSseSampleList', data);    
      
    },

    async deleteSseOne({ commit }: any, data: any = {}) { 
      await commit('deleteSseOne', data);    
    },

    async deleteSseAll({ commit }: any, data: any = {}) { 
      await commit('deleteSseAll', data);    
    },


    //같은 data면 상태(Idx)만 업데이트
    async setSseSamples({ commit }: any, data: any = {}) { 
      await commit('setSseSamples', data);    
    },

    async deleteSseOneSample({ commit }: any, data: any = {}) { 
      await commit('deleteSseOneSample', data);    
    },

    async deleteSseAllSample({ commit }: any, data: any = {}) { 
      await commit('deleteSseAllSample', data);    
    },
  */

  /*
   * notification 업데이트
   */

   //add notification 

   setNotificationEmpty({ commit }: any, data: any = {}) { 
    commit('setNotificationEmpty', data);    
    
  },

  addNotification({ commit }: any, data: any = {}) { 
    commit('addNotification', data);    
    
  },

  //read notification
  readNotification({ commit }: any, data: any = {}): Promise<AxiosResponse> {
		//return http.noti.put('/api/v1/sse/notification/read/' + data.sseId)
    return http.noti({
      method: 'PUT',
      url: '/sse/notification/read/' + data.sseId,
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			//const data = res.data.data;
			commit('readNotification', data.sseId);
			return res;
		});
	},

   //delete notification : Promise<AxiosResponse> 
   deleteNotification({ commit }: any, data: any = {}): Promise<AxiosResponse>{
		//return http.noti.delete('/api/v1/sse/notification/delete/' + data.sseId)
    return http.noti({
      method: 'DELETE',
      url: '/sse/notification/delete/' + data.sseId,
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			//const data = res.data.data;
			commit('deleteNotification', data.serviceId);
			return res;
		});
	},

  //delete all notification
  deleteNotificationAll({ commit }: any, data: any = {}): Promise<AxiosResponse> {
		//return http.noti.delete('/api/v1/sse/notification/deleteAll')
    return http.noti({
      method: 'DELETE',
      url: '/sse/notification/deleteAll',
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			//const data = res.data.data;
			commit('deleteNotificationAll');
			return res;
		});
	},

  //notification list by EventType
  getNotificationListByEventType({ commit }: any, data: any = {}): Promise<AxiosResponse> {
		//return http.noti.delete('/api/v1/sse/notification/list/' + data.eventType) //eventType = {WORKFLOW, SERVICE}
    return http.noti({
      method: 'GET',
      url: '/sse/notification/list/' + data.eventType,
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			//const data = res.data.data;
			//commit('getNotificationListByEventType');
			return res;
		});
	},

  //delete by eventType
  deleteNotificationByEventType({ commit }: any, data: any = {}): Promise<AxiosResponse> {
		//return http.noti.delete('/api/v1/sse/notification/delete/eventType/' + data.eventType) //eventType = {WORKFLOW, SERVICE}
    return http.noti({
      method: 'DELETE',
      url: '/sse/notification/delete/eventType/' + data.eventType,
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			//const data = res.data.data;
			//commit('deleteNotificationByEventType');
			return res;
		});
	},

  //init list
  getNotificationInit({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.noti({
      method: 'GET',
      url: '/sse/init',
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			//const data = res.data.data;
			//commit('deleteNotificationByEventType');
			return res;
		});
	},

  retryNotificationService({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr({
      method: 'GET',
      url: '/service/retry/'+ data.serviceId,
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			return res;
		});
	},

  retryNotificationWorkflow({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr({
      method: 'GET',
      url: '/workflow/retry/'+ data.serviceId,
      //data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + store.getters['oauth/getToken'].access_token
      },
    })
    .then((res: any) => {
			return res;
		});
	},
}