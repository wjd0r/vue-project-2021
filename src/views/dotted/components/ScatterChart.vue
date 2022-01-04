<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component d-flex align-items-center justify-content-center" no-fade bg-color="#fff" opacity="1">
    <div id="scatter-chart" class="chart w-100 h-100"></div>
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
        <template v-else-if="variantLoading">{{ $t('view.process.alert.loadingVariantList') }}</template>
        <template v-else-if="variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
        <template v-else-if="variantId === ''">{{ $t('view.process.alert.chooseVariant') }}</template>
      </template>
      <template v-else-if="isNoData">{{ $t('view.process.alert.variantNodata') }}</template>
      <b-spinner v-else label="Spinning"></b-spinner>
    </template>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { IClient, IWorkFlowRequestAction, ISetting } from '@/interface';

import { AnalysisMixin } from '@/mixin';
import store from '../../../store';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import moment from 'moment';

import echarts, { EChartOption, ECharts } from 'echarts';

@Component({
  components: {},
  computed: mapGetters({
    readOnlySetting: 'sso/getSetting',
  }),
})
export default class ScatterChart extends Mixins(AnalysisMixin) {

  readonly readOnlySetting!: ISetting;
  chart: ECharts = null;
  chartOption: EChartOption = {};

  dottedValue: string = '';
  componentValue: string = '';

  xAxis: any[] = [];
  yAxis: any[] = [];

  originalChartData: any = null;
  originalSeries: any = [];

  created() {

    this.chartOption = {
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          axis: 'y',
          lineStyle: {
            width: 30,
            opacity: 0.3,
          }
        },
        transitionDuration: 0,
        formatter: (param: any) => {

            const newParam = param.map((element: any)=> {
              return {marker: element.marker, seriesName: element.seriesName, data1: element.data[0], data2: element.data[1]};
            })

            const set: any[] = [];
            newParam.forEach((element: any) => {

              if(set.length == 0) set.push(element);
              else {
                //const latest = set[set.length-1];
                //if(!(element.seriesName == latest.seriesName && element.data1 == latest.data1 && element.data2 == latest.data2)) set.push(element);
                const haveAlready = set.filter((s: any)=> {
                  return element.seriesName == s.seriesName && element.data1 == s.data1 && element.data2 == s.data2
                });
                if(haveAlready.length == 0) set.push(element);
              }
              
            });

            const string = [param[0].axisValueLabel];
            for (const element of set) {
              const text = element.marker + '' + element.seriesName + ': ' + element.data1 + ', ' + element.data2;
              
              string.push(text);
            }
            return string.join('<br/>');

        //     //const text = element.marker + '' + element.data[1];
        //     // string.push(text;
        //     string.push(JSON.stringify(element.data));
        //   }
        //   return string.join('<br/>');

        },
      },
      grid: {
        // height: '83%',
        top: '40px', //'10px',
        bottom: '10%',
        right: '50px',
        left: '88px',
        containLabel: true,
      },
      legend: {
        type: 'scroll',
        data: [],
        top: '94%',
        padding: [10, 50],
        //bottom: '5px',
      },
      xAxis: {
        type: 'category',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: (value: any) => {
            if (value === '0') {
              return 0;
            } else {
              return value;
              //return `${moment(value, 'X').format('YYYY-MM-DD')}\n${moment(value, 'X').format('HH:mm:ss')}`;
              //return `${moment(value, 'X').format('YYYY-MM-DD HH시')}`;
            }
          },
        },
      },
      yAxis: {
        scale: true,
        type: 'category',
        position: 'right',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            type: 'dashed',
          },
        },
        axisLabel: {
        },
      },
      dataZoom: [],
      series: [
        {
          name: 'Punch Card',
          type: 'scatter',
          data: null,
        },
      ],
    };

    this.dottedValue = 'ea';
    this.componentValue = 'ci';
  }

  mounted() {

    const theme = store.getters['sso/getColorTheme'] !== 'dark' ? 'light' : 'dark';

    window.addEventListener('resize', this.resize);

    EventBus.$on('setDottedGraphOption', (args: any) => {
      this.componentValue = args.component;
      this.dottedValue = args.value;
    });
    EventBus.$on('resize', () => this.resize());

    this.$nextTick(() => {
      const el = document.getElementById('scatter-chart') as HTMLDivElement;
      this.chart = echarts.init(el, theme);
      this.chart.on('dblclick', (cell: any) => {
        const x = this.xAxis[cell.data[0]];
        const y = this.yAxis[cell.data[1]];

        const cellData = cell.data;
        const newSeries = _.cloneDeep(this.originalSeries);
        const idx = newSeries[0].data.indexOf(cellData);
        newSeries[0].data.splice(idx, 0);
        newSeries.push({ type: 'effectScatter', color: '#FFE08C', symbolSize: 20, data: [cellData] });

        this.chartOption.series = newSeries;
        this.chart.setOption(this.chartOption);

        const series = cell.seriesName;
        const cellValue = _.find(this.originalChartData.data, (item: any) => {
          if ((item.timeStr, x, item.timeStr.startsWith(x.substring(0, x.length - 1)) && y == item.component && series == item.value)) {
            return item;
          }
        });
        const value = { timeStart: cellValue.time, timeStartStr: cellValue.timeStr, timeStr: x, component: y };
        const config = {
          _type: 'DottedChartConfiguration',
          component: this.componentValue,
          value: this.dottedValue,
        };
        this.$emit('cellDoubleClick', value, config);
      });
    });
  }

  resize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  beforeDestroy() {
    EventBus.$off('setDottedGraphOption');
    EventBus.$off('resize');
    window.removeEventListener('resize', this.resize);
  }

  requestBuilder(caseId?: string) {
    const data = {
      _type: 'DottedChartConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      component: this.componentValue,
      value: this.dottedValue,
    };

    if (this.variantId !== '---') {
      data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
    }

    if (caseId) {
      data.eventFilters.push({
        _type: 'CaseFilterLite',
        values: [caseId],
      });
    }

    const request = [data];

    return request;
  }

  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'chart',
      serviceId: 'process.discovery.chart.dotted',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  getDottedChart() {
    const params = [
      {
        _type: 'DottedChartConfiguration',
        repository: {
          id: this.$route.params.repositoryId,
          _type: 'EventRepository',
          project: {
            id: this.$route.params.projectId,
            _type: 'Project',
          },
          relations: {},
        },
        eventFilters: [
          {
            _type: 'TimeframeFilterLite',
            minStr: moment(this.filter.duration.start).format('YYYY-MM-DD HH:mm:ss'),
            maxStr: moment(this.filter.duration.end).endOf('days').format('YYYY-MM-DD HH:mm:ss'),
            keepCases: 'CONTAINED',
          },
        ] as any,
        component: this.componentValue,
        value: this.dottedValue,
      },
    ];

    if (this.variantId !== '---') {
      params[0].eventFilters.push({
        _type: 'TraceVariantFilterLite',
        config: {
          _type: 'TraceVariantDiscoveryLiteConfiguration',
          repository: {
            id: this.$route.params.repositoryId,
            _type: 'EventRepository',
            project: {
              id: this.$route.params.projectId,
              _type: 'Project',
            },
            relations: {},
          },
          eventFilters: [
            {
              _type: 'TimeframeFilterLite',
              minStr: moment(this.filter.duration.start).format('YYYY-MM-DD HH:mm:ss'),
              maxStr: moment(this.filter.duration.end).endOf('days').format('YYYY-MM-DD HH:mm:ss'),
              keepCases: 'CONTAINED',
            },
          ],
          option: this.filter.variantType,
          excludeNull: false,
        },
        values: [this.variantId],
      });
    }

    this.$store.dispatch('dotted/getDottedChart', params).then((res: AxiosResponse) => {
      this.drawChart(res);
    });
  }

  getDottedChartByCaseId(caseId: string) {
    const paramsWithCaseId = [
      {
        _type: 'DottedChartConfiguration',
        repository: {
          id: this.$route.params.repositoryId, //"idsportlogistics_ierportlogistics",
          _type: 'EventRepository',
          project: {
            id: this.$route.params.projectId, //"iprdemo",
            _type: 'Project',
          },
          relations: {},
        },
        eventFilters: [
          {
            _type: 'TimeframeFilterLite',
            minStr: moment(this.filter.duration.start).format('YYYY-MM-DD HH:mm:ss'), //"2018-01-31 09:00:00",
            maxStr: moment(this.filter.duration.end).endOf('days').format('YYYY-MM-DD HH:mm:ss'), //"2018-01-31 18:00:00",
            keepCases: 'CONTAINED',
          },
          {
            _type: 'CaseFilterLite',
            values: [caseId],
          },
        ],
        component: this.componentValue, //"ci",
        value: this.dottedValue, //"ea"
      },
    ];

    this.$store.dispatch('dotted/getDottedChart', paramsWithCaseId).then((res: AxiosResponse) => {
      this.drawChart(res);
    });
  }

  getByDataUri(dataUri: string) {
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.drawChart(res);
    });
  }

  drawChart(res: any) {
    this.originalChartData = res.data.data;
    this.isNoData = false;

    if (JSON.stringify(this.originalChartData) == '{}' || this.originalChartData === null) {
    //if (this.originalChartData === null || this.originalChartData.data == undefined || this.originalChartData.data.length == 0) {
      this.isNoData = true;
      this.showLoading = false;
      this.chart.clear();
      return;
    }

    if(this.originalChartData.data == undefined) return;

    const data = this.originalChartData.data.map((item: any) => {
      //return [item.time, item.component, item.value];
      const example = '2017-10-25 00:36:00+00';
      return [item.timeStr.substring(0, example.length - 9) + '시', item.component, item.value];
    });

    let xAxis = [
      ...new Set(
        data.map((item: any) => {
          return item[0];
        })
      ),
    ];

    xAxis = this.xAxis = _.concat([0], xAxis);

    const yAxis = (this.yAxis = [
      ...new Set(
        data.map((item: any) => {
          return item[1];
        })
      ),
    ]);
    const colorValues = [
      ...new Set(
        data.map((item: any) => {
          return item[2];
        })
      ),
    ];

    //const xLength = xAxis.length;
    //const yLength = yAxis.length;

    /*
      const series = data.map((item: any) => {

        const x = _.findIndex(xAxis, (x) => {
          return x === item[0];
        });
        const y = _.findIndex(yAxis, (y) => {
          return y === item[1];
        });
        return [x, y, item[2]];
      });
      */

    const seriesInputs: any[] = [];
    //name: colorvalue, type: 'scatter', data: [~]
    for (const key in colorValues) {
      const datas = [];
      for (const k in data) {
        const s = data[k];
        if (s[2].toString() == colorValues[key].toString()) {
          const x = _.findIndex(xAxis, (x) => {
            return x === s[0];
          });
          const y = _.findIndex(yAxis, (y) => {
            return y === s[1];
          });

          datas.push([x, y]);
        }
      }
      const seriesInput = { name: colorValues[key], type: 'scatter', data: datas };
      seriesInputs.push(seriesInput);
    }

    /*
      const formatter = (param: any) => {
          // return JSON.stringify(param);

          const string = [moment(xAxis[param[0].data[0]], "X").format('YYYY-MM-DD HH:mm:ss')];

          const yInfo = [];
          for (const element of param) {
            const text = element.marker + ' ' + yAxis[element.data[1]] + '(' + element.seriesName + ')';
            yInfo.push(text);
          }
          const yInfoReversed = yInfo.reverse();
          yInfoReversed.forEach((oneYInfo: string) => {
            string.push(oneYInfo); 
          })        
          return string.join('<br/>');
      }
      */

    this.chartOption.dataZoom = [];
    this.chartOption.dataZoom.push({
      show: true,
      height: 20,
      type: 'slider',
      top: '91%',
      //bottom: '0px',//'8%',
      xAxisIndex: 0,
      start: 0,
      end: 100,
      //endValue: xLength, //5,
      handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
      handleSize: '100%'
    } as any);

    this.chartOption.dataZoom.push({
      type: 'inside',
      xAxisIndex: 0,
      zoomOnMouseWheel: false,
    });

    this.chartOption.dataZoom.push({
      show: true,
      type: 'slider',
      yAxisIndex: [0],
      left: '50px',
      //right: 0,
      start: 0,
      end: 100,
      //endValue: yLength, //11,
      textStyle: {
        color: 'transparent',
      },
      handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
      handleSize: '100%'
    });

    this.chartOption.dataZoom.push({
      type: 'inside',
      yAxisIndex: 0,
      zoomOnMouseWheel: false,
      moveOnMouseWheel: true,
    });

    (this.chartOption.xAxis as any).data = xAxis;
    (this.chartOption.yAxis as any).data = yAxis;
    //this.chartOption.series[0].data = series;
    this.chartOption.series = seriesInputs;
    this.originalSeries = _.cloneDeep(seriesInputs);
    //this.chartOption.tooltip.formatter = formatter;
    this.chartOption.legend.data = colorValues;

    this.chart.setOption(this.chartOption, { notMerge: false });

    this.showLoading = false;
  }

  showOverlay() {
    return this.variantId === '' || this.variant.totalCount === 0 || this.isNoData || this.showLoading || this.variantLoading || this.checkFilterHaveOnlyDuration;
  }
}
</script>
