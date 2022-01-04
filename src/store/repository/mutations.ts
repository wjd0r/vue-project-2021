export default {
  
    // setDatasetList (state: any, payload: any) {
	// 	state.datasetList = payload;
	// },

    //2.1 List All Datasets
    setRepoDataIndex (state: any, payload: any) {
		state.repoDataIndex = payload;
	},

    //2.4 Show Dataset Information
    setRepoDataView (state: any, payload: any) {
		state.repoDataView = payload;
	},
    
	//2.6 Show Dataet Data
    setRepoDataViewData (state: any, payload: any) {
		state.repoDataViewData = payload;
	},

	//3.1 List All Event Repositories
    //setRepoEventIndex (state: any, payload: any) {
	//	state.repoEventIndex = payload;
	//},


    //3.6 Show Event Repository Information 
    setRepoEventView (state: any, payload: any) {
		state.repoEventView = payload;
	},
    
	//이벤트 to 이벤트매핑페이지
	setEventInfo (state: any, payload: any) {
		state.eventInfo = payload;
	},

	setMappings(state: any, payload: any) {
		state.mappings = payload;
	},

	setGroupInfo (state: any, payload: any) {
		state.groupInfo = payload;
	},

	//home event card
	setCardHome (state: any, payload: any) {
		state.cardHome = payload;
	},

	//event create process
	setEventCreateInfo (state: any, payload: any) {
		state.eventCreateInfo = payload;
	},

	//datset create info
	setDatasetCreateInfo (state: any, payload: any) {
		state.datasetCreateInfo = payload;
	},

	//uploadDataId
	setUploadDataId (state: any, payload: any) {
		state.uploadDataId = payload;
	},

	setFieldsToImport (state: any, payload: any) {
		state.fieldsToImport = payload;
	},

	setDatasourceId (state: any, payload: any) {
		state.datasourceId = payload;
	},

	setWhich (state: any, payload: any) {
		state.which = payload;
	},
}