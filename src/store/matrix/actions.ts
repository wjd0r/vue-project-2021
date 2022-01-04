import { AxiosResponse } from 'axios';
import { http } from '../../common';

export default {
    getMatrix({ commit }: any, data: any = {}): Promise<AxiosResponse> {
        const params: any[] = [
          {
            _type: 'DirectlyFollowMatrixLiteConfiguration',
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
                "minStr": data.timeMin,
                "maxStr": data.timeMax,
                "keepCases" : "CONTAINED"
              }
            ],
            "addArtificialStartEnd" : false,
            "useEventBag" : true,
            "dfSortActivity" : true,
            "colEventActivity" : "ea",
            dimensionFrom: data.dimensionFrom, //"ea",
            dimensionTo: data.dimensionTo, //"es"
          }
        ];

        if(data.dimensionFrom=='esm' && data.utilizationSelected) {
          params[0]["colActivityPerformanceFormat"] = 'group-ratio';
        }
    
        if (data.variantId !== '---') {
          params[0].eventFilters.push({
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
                  minStr: data.timeMin,
                  maxStr: data.timeMax,
                  "keepCases" : "CONTAINED"
                }
              ],
              option: data.option,
              "excludeNull" : false
            },
            values: [data.variantId]
          })
        }
    
        return http.ipr.post('service/run/process.discovery.matrix.df', params).then((res: any) => {
          return res;
        });
      },
}