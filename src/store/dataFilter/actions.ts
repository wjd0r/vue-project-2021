import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {

    getRepoDataUtilLookupLite({commit}: any, data: any = {}): Promise<any>{

        const cb_data: any = [{
            "_type" : "DatasetLookupConfiguration",
            "dataset" : {
              "id" : data.dataSetId,
              "project" : {
                "id" : data.projectId,
              },
              "resourceGroup": {
                "id": data.resourceGroupId, 
              }
            },
            "dataFilters" : [],
            "field": data.field
          }]
        ;
        const nt_data: any = [{
            "_type" : "DatasetLookupConfiguration",
            "dataset" : {
              "id" : data.dataSetId,
              "project" : {
                "id" : data.projectId,
              },
              "resourceGroup": {
                "id": data.resourceGroupId, 
              }
            },
            "dataFilters" : [],
            "field": data.field,
            "range": true
          }]
        ;

        let input: any = null;
        if(data.field[0] == 'c' || data.field[0] == 'b') input = cb_data;
        else if(data.field[0] == 'n' || data.field[0] == 't') input = nt_data;
        return http.ipr.post('/service/run/repo.data.util.lookup.lite', input)
        .then(res=>{
          return res;
        });
    },
  
}