import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {

  getDottedChart({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    
    return http.ipr.post('service/run/process.discovery.chart.dotted', data).then((res: any) => {
      return res;
    });
  },
/*
    getDottedChart({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        const params = [
          {
            _type: 'DottedChartConfiguration',
            repository: {
              id: data.repositoryId,
              "_type" : "EventRepository",
              project: {
                id: data.projectId,
                "_type" : "Project"
              },
              "relations" : { }
            },
            eventFilters: [
              {
                _type: 'TimeframeFilterLite',
                minStr: data.timeMin,
                maxStr: data.timeMax,
                "keepCases" : "CONTAINED"
              }
            ],
            component: data.component,
            value: data.value,
          },
        ];
    
        const paramsWithVId = [
          {
            _type: 'DottedChartConfiguration',
            repository: {
              id: data.repositoryId,
              "_type" : "EventRepository",
              project: {
                id: data.projectId,
                "_type" : "Project"
              },
              "relations" : { }
            },
            eventFilters: [
              {
                _type: 'TimeframeFilterLite',
                minStr: data.timeMin,
                maxStr: data.timeMax,
                "keepCases" : "CONTAINED"
              },
              {
                _type: 'TraceVariantFilterLite',
                config: {
                  _type: 'TraceVariantDiscoveryLiteConfiguration',
                  repository: {
                    id: data.repositoryId,
                    "_type" : "EventRepository",
                    project: {
                      id: data.projectId,
                      "_type" : "Project"
                    },
                    "relations" : { }
                  },
                  eventFilters: [
                    {
                      _type: 'TimeframeFilterLite',
                      minStr: data.timeMin,  //min
                      maxStr: data.timeMax,  //max
                      "keepCases" : "CONTAINED"
                    },
                  ],
                  option: data.option,
                  "excludeNull" : false
                },
                values: [data.variantId],
              },
            ],
            component: data.component,
            value: data.value,
          },
        ];
    
        let setParams: any;
        if (data.variantId != null) setParams = paramsWithVId;
        else setParams = params;
    
        return http.ipr.post('service/run/process.discovery.chart.dotted', setParams).then((res: any) => {
          const data = res.data.data;
          commit('setDottedChart', data);
          return res;
        });
      },

      getDottedChartByCaseId({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        const params = [ {
          "_type" : "DottedChartConfiguration",
          "repository" : {
            "id" : data.repositoryId, //"idsportlogistics_ierportlogistics",
            "_type" : "EventRepository",
            "project" : {
              "id" : data.projectId, //"iprdemo",
              "_type" : "Project"
            },
            "relations" : { }
          },
          "eventFilters" : [ {
            "_type" : "TimeframeFilterLite",
            "minStr" : data.timeMin,//"2018-01-31 09:00:00",
            "maxStr" : data.timeMax, //"2018-01-31 18:00:00",
            "keepCases" : "CONTAINED"
          }, {
            "_type" : "CaseFilterLite",
            "values" : [ data.caseId ]
          } ],
          "component" : data.component,//"ci",
          "value" : data.value,//"ea"
        } ];
    
        return http.ipr.post('service/run/process.discovery.chart.dotted', params).then((res: any) => {
          const data = res.data.data;
          commit('getDottedChart', data);
          return res;
        });
      },
*/
    
}