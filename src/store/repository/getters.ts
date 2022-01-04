export default {

    // getDatasetList (state: any) {
	// 	return state.datasetList;
	// },
  
    //2.1 List All Datasets
    getRepoDataIndex (state: any) {
        return state.repoDataIndex;
    },


    //2.4 Show Dataset Information
    getRepoDataView (state: any) {
        return state.repoDataView;
    },
    
    //2.6 Show Dataset Data
    // getRepoDataViewData (state: any) {
    //     return state.repoDataViewData;
    // },

    //3.1 List All Event Repositories
    //getRepoEventIndex (state: any) {
    //    return state.repoEventIndex;
    //},
    
    //3.6 Show Event Repository Information
    getRepoEventView (state: any) {
        return state.repoEventView;
    },
    
    //이벤트 to 이벤트매핑페이지
	getEventInfo (state: any) {
        return state.eventInfo;
	},

    getMappings(state: any) {
        return state.mappings;
      }, //check?
    getMappingData(state: any) {
        return state.mappings;
    },

    getGroupInfo (state: any) {
        return state.groupInfo;
	},

    //home event card
    getCardHome (state: any) {
        return state.cardHome;
	},

    //event create process
	getEventCreateInfo (state: any) {
        return state.eventCreateInfo;
	},

    //datset create info
	getDatasetCreateInfo (state: any) {
		return state.datasetCreateInfo;
	},

    getUploadDataId (state: any) {
		return state.uploadDataId;
	},

    getFieldsToImport (state: any) {
		return state.fieldsToImport;
	},

    getDatasourceId (state: any) {
		return state.datasourceId;
	},

    getWhich (state: any) {
		return state.which;
	},
}