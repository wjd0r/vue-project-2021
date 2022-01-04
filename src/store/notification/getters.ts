export default {

    // getDatasetList (state: any) {
	// 	return state.datasetList;
	// },

    /*
    //ping 오는대로 list로 업데이트
    getSseSampleList(state: any, payload: any) {
      return state.sseSampleList;
    },

    //같은 data면 상태(Idx)만 업데이트
    getSseSamples(state: any, payload: any) {
      return state.sseSamples;
    },
    */
  
    /*
   * notification 가져오기
   */

    getNotificationList(state: any, payload: any) {
        return state.notificationList;
    },

    getConnectState(state: any) {
      return state.connectState;
    }
}