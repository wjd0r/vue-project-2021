import { AxiosResponse } from 'axios';
import { http } from '../../common';

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

    //////// new API
  
      //2.1 List All Datasets
      getRepoDataIndex({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        const request: any = {
          "_type" : "DatasetSelectConfiguration",
          "selectors" : [ {
            "_type" : "Dataset",
            "project" : {
              "id" : data.projectId, //"iprtest",
              "_type" : "Project"
            },
            "resourceGroup": {
              "_type": "ResourceGroup",
            }
          } ],
        }

        if(data.iprResourceGroupId) {
          request.selectors[0].resourceGroup['id'] = data.iprResourceGroupId
        }
        
        if(data.createdBy) {
          request.selectors[0].resourceGroup['createdBy'] = data.createdBy
        }

        if(data.search && data.searchWord != '') {
          request.mode = "SEARCH_NAME_PREFIX";
          request.selectors[0].name = data.searchWord;
        }

        return http.ipr.post('/service/run/repo.data.index', [ request ]).then((res: any) => {
          const data = res.data.data;
          commit('setRepoDataIndex', data);
          return res;
        });
      },

    // 2. Import new dataset.
    importCsvFile({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.data.import.file.csv.lite', [ {
        "_type": "DatasetImportFileCsvConfiguration",
        "dataset": {
          "name": data.datasetName,
          "_type": "Dataset",
          "description": data.datasetDesc,
          "project": {
            "id": data.projectId, //"iprtest",
            "_type": "Project"
          },
          "relations" : { }, //check?
        },
        "dataFilters" : [],
          "filenames" : [data.uploadDataId],
        "delimeter": data.delimeter,
        "headerRowIdx": data.headerRowIdx,
        "limit": -1 //check?
        } ]).then((res: any) => {
        return res;
      });
    },

      
      //2.2 Import New Dataset(from CSV) check!
      getRepoDataImportFileCSVLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        
        const configurations: any = {
        "_type": "DatasetImportFileCsvConfiguration",
        "dataset": {
          "name": data.datasetName,
          "_type": "Dataset",
          "description": data.datasetDesc,
          "project": {
           "id": data.projectId, //"iprtest",
           "_type": "Project"
          },
          "relations" : {}, //check?
        },
        "delimeter": data.delimeter,
        "headerRowIdx": data.headerRowIdx,
        "limit": -1 //check?
      } ;
    
      const formData = new FormData();
      formData.append('configurations', JSON.stringify(configurations));
      formData.append('file', data.file);
      return http.ipr.post('/service/upload/repo.data.import.file.csv.lite', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res: any) => {
        return res;
      });
    },


    //2.3 Save Dataset Information
    getRepoDataSave({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.data.save', [ {
        "_type" : "DatasetSaveConfiguration",
        "data" : {
          "id" : data.datasetId, //"ids20210316010257", //check?
          "name" : data.datasetName, //"Test dataset Modified.",
          "_type" : "Dataset",
          "description" : data.datasetDesc, //"Test dataset description",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          },
          "resourceGroup": {
            "id": data.resourceGroupId,
          },
          "relations" : { } //check?
        }
      } ]).then((res: any) => {
        return res;
      });
    },

    getRepoDataSaveTest({commit}: any, data: any = {}): Promise<any>{
      return http.ipr.post('/service/run/repo.data.save.test', [{
        '_type': "DatasetSaveConfiguration",
        'data': {
          '_type': "Dataset",
          'name' : data.name,
          'project': {
            'id': data.projectId,
            '_type': 'Project',
          },
          "resourceGroup": {
            'id': data.resourceGroupId,
            '_type': "ResourceGroup",
          }
        },
      }]).then(res=>{
        return res.data.data;
      })
    },

    //2.4 Show Dataset Information
    getRepoDataView({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.data.view', [ {
        "_type" : "DatasetSelectConfiguration",
        "selectors" : [ {
          "id" : data.datasetId, //"ids20210316010257",
          "_type" : "Dataset",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          }
        } ]
      } ]).then((res: any) => {
        const data = res.data.data;
        commit('setRepoDataView', data);
        return res;
      });
    },

    //2.5 Delete Datasets
    getRepoDataDelete({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.data.delete', data).then((res: any) => {
        return res;
      });
    },

    //2.6 Show Dataset Data
    getRepoDataViewData({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.data.view.data', [ {
        "_type" : "DatasetSelectConfiguration",
        "selectors" : [ {
          "id" : data.datasetId, //"ids20210319010513",
          "_type" : "Dataset",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          }
        } ],
        "page" : data.page,//0,
        "size" : data.size, //100
      } ]).then((res: any) => {
        const data = res.data.data;
        commit('setRepoDataViewData', data);
        return res;
      });
    },

    //2.7 Download Dataset(.csv)
    getRepoDataExportFileCsvLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/download/repo.data.export.file.csv.lite', data).then((res: any) => {
        return res;
      });
    },

    //2.8
    getRepoDataImportFileXlsxLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        
      const configurations: any = {
      "_type": "DatasetImportFileXlsxConfiguration",
      "dataset": {
        "name": data.datasetName,
        "_type": "Dataset",
        "description": data.datasetDesc,
        "project": {
         "id": data.projectId, //"iprtest",
         "_type": "Project"
        },
        "relations" : {}, //check?
      },
      "headerRowIdx": data.headerRowIdx,
      "limit": -1 //check?
    } ;
  
    const formData = new FormData();
    formData.append('configurations', JSON.stringify(configurations));
    formData.append('file', data.file);
    return http.ipr.post('/service/upload/repo.data.import.file.xlsx.lite', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res: any) => {
        return res;
      });
    },

    // 1. Upload dataset.
    csvFileUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      const formData = new FormData();
      formData.append('file', data.file);
      return http.ipr.post('/service/upload/'+data.projectId+'/repo.data.import.file.csv.lite', formData
      /*, {
        onUploadProgress: (progressEvent) => {
          data.progress(Math.round(progressEvent.loaded * 100 / progressEvent.total));
        }
      }*/
      ).then((res: any) => {
        return res;
      });
    },

    // 2.9 new
    xlsxFileUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      const formData = new FormData();
      formData.append('file', data.file);
      return http.ipr.post('/service/upload/'+data.projectId+'/repo.data.import.file.xes.lite', formData
      /*, {
        onUploadProgress: (progressEvent) => {
          data.progress(Math.round(progressEvent.loaded * 100 / progressEvent.total));
        }
      }*/
      ).then((res: any) => {
        return res;
      });
    },

    mxmlFileUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      const formData = new FormData();
      formData.append('file', data.file);
      return http.ipr.post('/service/upload/'+data.projectId+'/repo.data.import.file.mxml.lite', formData
      /*, {
        onUploadProgress: (progressEvent) => {
          data.progress(Math.round(progressEvent.loaded * 100 / progressEvent.total));
        }
      }*/
      ).then((res: any) => {
        return res;
      });
    },

    xesFileUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      const formData = new FormData();
      formData.append('file', data.file);
      return http.ipr.post('/service/upload/'+data.projectId+'/repo.data.import.file.xes.lite', formData
      /*, {
        onUploadProgress: (progressEvent) => {
          data.progress(Math.round(progressEvent.loaded * 100 / progressEvent.total));
        }
      }*/
      ).then((res: any) => {
        return res;
      });
    },

    // 2. Import new dataset.
    importXesFile({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.data.import.file.xes.lite', [ {
        "_type": "DatasetImportFileXesConfiguration",
        "dataset": {
          "name": data.datasetName,
          "_type": "Dataset",
          "description": data.datasetDesc,
          "project": {
            "id": data.projectId, //"iprtest",
            "_type": "Project"
          },
          "relations" : { }, //check?
        },
        "dataFilters" : [],
          "filenames" : [data.uploadDataId],
        "delimeter": data.delimeter,
        "headerRowIdx": data.headerRowIdx,
        "limit": -1 //check?
        } ]).then((res: any) => {
        return res;
      });
    },

    //2.9 import new Dataset(from Event Log XES, XES.GZ, MXML, MXML.GZ)
    getRepoDataImportFileXesLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        
      const configurations: any = {
      "_type": "DatasetImportFileXesConfiguration",
      "mapToEventRepository": data.mapToEventRepository,
      "dataset": {
        "name": data.datasetName,
        "_type": "Dataset",
        "description": data.datasetDesc,
        "project": {
         "id": data.projectId, //"iprtest",
         "_type": "Project"
        },
        "relations" : {}, //check?
      },
      "repository": {
        'name': data.datasetName,
        "description": data.datasetDesc,
      },
      "headerRowIdx": data.headerRowIdx,
      "limit": -1 //check?
    } ;
  
    const formData = new FormData();
    formData.append('configurations', JSON.stringify(configurations));
    formData.append('file', data.file);
    return http.ipr.post('/service/upload/repo.data.import.file.xes.lite', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res: any) => {
        return res;
      });
    },

    //3.1 List All Event Repositories
    getRepoEventIndex({ commit }: any, data: any = {}): Promise<AxiosResponse> {

      const params: any[] = [ {
          "_type" : "EventRepositorySelectConfiguration",
          "loadRelation": "FULL",  
          "selectors" : [ {
            "_type" : "EventRepository",
            "project" : {
              "id" : data.projectId, //"iprtest",
              "_type" : "Project"
            }
          } ]
        } ];

        if(data.datasetId != null){  
          params[0]["selectors"][0]["origin"] = 
          {
            "_type" : "DatasetMappingConfiguration",
            "dataset" : {
              "id" : data.datasetId,
              "_type" : "Dataset"
            } 
          };
        }

        if(data.resourceGroupId != null) {
          params[0]["selectors"][0]["resourceGroup"] = 
          {
            _type: 'ResourceGroup',
            "id" : data.resourceGroupId
          }
        }
/*
        params = [ {
          "_type" : "EventRepositorySelectConfiguration",
          "selectors" : [ {
            "_type" : "EventRepository",
            "project" : {
              "id" : data.projectId, //"iprtest",
              "_type" : "Project"
            },
            "origin": {
              "_type" : "DatasetMappingConfiguration",
              "dataset" : {
                "id" : data.datasetId,
                "_type" : "Dataset"
              } 
            }
          } ]
        } ]
      }
*/
      return http.ipr.post('/service/run/repo.event.index', params).then((res: any) => {
        //const data = res.data.data;
        //commit('setRepoEventIndex', data);
        return res;
      });
    },

    //3.2
    getRepoEventIndexByDataset({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.event.index', [{
        _type: 'EventRepositorySelectConfiguration',
        selectors: [
          {
            _type: 'EventRepository',
            origin: {
              _type: 'DatasetMappingConfiguration',
              dataset: {
                _type: 'Dataset',
                id: data.dataset,
                project: {
                  _type: 'Project',
                  id: data.projectId,
                },
              },
            },
            project: {
              _type: 'Project',
              id: data.projectId,
            },
          },
        ],
      }]).then((res)=>{
        return res;
      })
    },

    getRepoEventIndexSample({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.event.index', [ {
        "_type" : "EventRepositorySelectConfiguration",
        "selectors" : [ {
          "_type" : "EventRepository",
          "project" : {
            "id" : "iprdemo",
            "_type" : "Project"
          }
        } ]
      } ]).then((res: any) => {
        return res;
      });
    },

    //3.2 List All Evetn Repositories (with Origin Dataset)
    getRepoEventIndexOrigin({ commit }: any, data: any = {}): Promise<AxiosResponse> {
          return http.ipr.post('/service/run/repo.event.index', [ {
            "_type" : "EventRepositorySelectConfiguration",
            "selectors" : [ {
              "id" : data.eventId,//"ids20210318045646_ier20210318045700",
              "_type" : "EventRepository",
              "origin" : {
                "_type" : "DatasetMappingConfiguration",
                "dataset" : {
                  "id" : data.eventId,//"ids20210318045646_ier20210318045700",
                  "_type" : "Dataset",
                  "project" : {
                    "_type" : "Project"
                  }
                }
              },
              "project" : {
                "id" : data.projectId, //"iprtest",
                "_type" : "Project"
              }
            } ]
          } ]).then((res: any) => {
            return res;
          });
    },
    
    

    //3.3 Dataset to Event Repository Mapping Test
    getRepoDataMappingTest({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.event.mapping.test', [ {
        "_type" : "EventMappingConfiguration", //"DatasetMappingConfiguration",
        "repository" : {
          "name" : data.repositoryName, //"Test repository",
          "_type" : "EventRepository",
          "description" : data.repositoryDesc, //"Test repository description",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          },
          "relations" : {},
        },
        "dataset" : {
          "id" : data.datasetId, //"ids20210316010300", //check?
          "_type" : "Dataset",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          }
        },
        "mappings" : data.mappings,/*{
          "c3" : "eu",
          "c4" : "eo",
          "c5" : "es|YYYY-MM-DD HH24:MI:SS",
          "c6" : "ec|YYYY-MM-DD HH24:MI:SS",
          "c0" : "ci",
          "c1" : "ea",
          "c2" : "er"
        }*/
      } ]).then((res: any) => {
        return res;
      });
    },

    //3.4 Dataset to Event Repository Mapping
    getRepoDataMapping({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.event.mapping', [ {
        "_type" : "EventMappingConfiguration", //"DatasetMappingConfiguration",
        "repository" : {
          "name" : data.repositoryName, //"Test repository",
          "_type" : "EventRepository",
          "description" : data.repositoryDesc, //"Test repository description",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          },
          "relations" : {},
        },
        "dataset" : {
          "id" : data.datasetId, //"ids20210316010300", //check?
          "_type" : "Dataset",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          }
        },
        "mappings" : data.mappings,/*{
          "c3" : "eu",
          "c4" : "eo",
          "c5" : "es|YYYY-MM-DD HH24:MI:SS",
          "c6" : "ec|YYYY-MM-DD HH24:MI:SS",
          "c0" : "ci",
          "c1" : "ea",
          "c2" : "er"
        }*/
      } ]).then((res: any) => {
        return res;
      });
    },

    //3.5 Save Event Repository Information
    getRepoEventSave({ commit }: any, data: any = {}): Promise<AxiosResponse> {

      const params: any[] = [ {
        "_type" : "EventRepositorySaveConfiguration",
        "data" : {
          "id" : data.eventId, //"ids20210316010300_ier20210316010315",
          "name" : data.eventName, //"Test dataset Modified.",
          "_type" : "EventRepository",
          "description" : data.eventDesc, //"Test repository description",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          },
          "relations" : data.relations, /*{
            "ipp20210316010301" : {
              "_type" : "GraphImpl",
              "id" : "ipp20210316010301"
            }
          }*/ //check?
          "referenceModel": data.referenceModel,
          
        }
      } ];

      if(data.resourceGroupId != null) {
        params[0]["data"]["resourceGroup"] = 
        {
          _type: 'ResourceGroup',
          "id" : data.resourceGroupId
        }
      }

      return http.ipr.post('/service/run/repo.event.save', params).then((res: any) => {
        return res;
      });
    },

    //3.6 Show Event Repository Information 
    getRepoEventView({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      const params: any  = [{
        "_type" : "EventRepositorySelectConfiguration",
        "selectors" : [ {
          "id" : data.eventId, //"ids20210318045646_ier20210318045700",
          "_type" : "EventRepository",
          "project" : {
            "id" : data.projectId, //"iprtest",
            "_type" : "Project"
          }
        } ]
      }];

      if(data.resourceGroupId != null) {
        params[0]["selectors"][0]["resourceGroup"] = 
        {
          _type: 'ResourceGroup',
          "id" : data.resourceGroupId
        }
      }

      if(data.loadRelation) {
        params.loadRelation = data.loadRelation
      }
      return http.ipr.post('/service/run/repo.event.view', params).then((res: any) => {
        const data = res.data.data;
        commit('setRepoEventView', data);
        return res;
      });
    },

    //3.7 Delete Event Repositories
    getRepoEventDelete({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/run/repo.event.delete', data).then((res: any) => {
        return res;
      });
    },

    //3.8 Download Event Repository(.csv)
    getRepoEventExportFileCsvLite({ commit }: any, data: any = {}): Promise<AxiosResponse> {
      return http.ipr.post('/service/download/repo.event.export.file.csv.lite', data).then((res: any) => {
        return res;
      });
    },

    getRepoProjectView({commit}: any, data: any = {}): Promise<AxiosResponse>{
      const params = [{
        "_type": "ProjectSelectConfiguration",
        "selectors": [
            {
                "id": data.projectId,
                "_type": "Project"
            }
        ]
      }]
      return http.ipr.post('/service/run/repo.project.view', params).then(res=>{
        return res;
      })
    },
    //repository/getRepoProjectGroupView
    getRepoProjectGroupView({commit}: any, data: any = {}): Promise<any>{
      return http.ipr.post('/service/run/repo.project.group.view', [{
        '_type': "ResourceGroupSelectConfiguration", 'page': '0', 'size': '1000',
        'selectors': [{
          'id': data.ipg,
          '_type': "ResourceGroup",
          'project': {
            'id': data.ipr,
            '_type': 'Project',
          }
        }],
      }]).then(res=>{
        return res.data.data;
      })
    },

    

  setMappingData({ commit }: any, data: any) {
    commit('setMappings', data);
  },

  //repo.event.save.test
  getRepoEventSaveTest({commit}: any, data: any = {}): Promise<any>{
    return http.ipr.post('/service/run/repo.event.save.test', [{
      '_type': "EventRepositorySaveConfiguration",
      'data': {
        '_type': "EventRepository",
        'name' : data.name,
        'project': {
          'id': data.projectId,
          '_type': 'Project',
        },
        "resourceGroup": {
          'id': data.resourceGroupId,
          '_type': "ResourceGroup",
        }
      },
    }]).then(res=>{
      return res.data.data;
    })
  },

  //preview
  ///service/run/repo.data.import.file.csv.preview.lite
  getDataImportFilePreviewLite({commit}: any, data: any = {}): Promise<any>{
    return http.ipr.post('/service/run/repo.data.import.file.'+data.filetype+'.preview.lite', [{
      "_type" : "DatasetImportFile"+data.filetypeUppercase+"Configuration",
      "dataset" : {
        "name" : data.datasetName,
        "_type" : "Dataset",
        "description" : data.datasetDesc,
        "fields" : { },
        "values" : { },
        "project" : {
          "id" : data.projectId,
          "_type" : "Project"
        },
        "relations" : { }
      },
      "dataFilters" : [ ],
      "filenames" : [ data.fileName ],
      "delimeter" : data.delimeter,
      "headerRowIdx" : data.headerRowIdx,
      "limit" : -1
    }]).then(res=>{
      return res.data.data;
    })
  },

  //preview
  ///service/run/repo.data.import.file.csv.preview.lite
  getDataImportDBPreviewLite({commit}: any, data: any = {}): Promise<any>{
    return http.ipr.post('/service/run/repo.data.import.db.'+data.dbtype+'.preview.lite', [{
      "_type": "DatasetImportDb"+ data.dbtypeUppercase +"Configuration",
      "hostname": data.hostname, // "192.168.55.10",
      "port": data.port, // 5432,
      "username": data.username, // "postgres",
      "password": data.password, // "tipspsql",
      "database": data.database, // "ipr_test",
      "schema": data.schema, // "iprdemo",--> oracle does not use schema
      "entity": data.table ? data.table : data.entity,
      "dataset": {
          _type: 'DatasetImpl',
          //name: data.datasetName,
          project: {
            _type: 'ProjectImpl',
            id: data.projectId,
          },
          resourceGroup: {
            id: data.resourceGroup,
          },
      },
      info: {
        _type: 'DbDataSourceInfoImpl',
        id: data.datasourceId
      },
    }, {
      _type: "ClientImpl",
      state: data.clientState,
    }]).then((res: any) => {
      return res;
    });
  }
}