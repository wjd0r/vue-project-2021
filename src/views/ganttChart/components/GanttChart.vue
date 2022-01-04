<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component" no-fade bg-color="#fff" opacity="1">
    <div id="gantt-chart" class="chart w-100" style="height: calc(100% - 40px)"></div>
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
      </template>
      <template v-else-if="isNoData">{{ $t('view.process.alert.variantNodata') }}</template>
      <b-spinner v-else label="Spinning"></b-spinner>
    </template>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { AnalysisMixin } from '@/mixin';
import { AxiosResponse } from 'axios';
import echarts, { EChartOption, ECharts } from 'echarts';
import _ from 'lodash';
import { IClient, IWorkFlowRequestAction } from '@/interface';

@Component({
  computed: mapGetters({
    rawData: 'gantt/getGanttChartData',
  }),
})
export default class GanttChart extends Mixins(AnalysisMixin) {
  rawData!: any;
  chart: ECharts = null;
  clickedVaiantId: string = null;
  clickedVaiantName: string = null;
  //gantt chart code
  HEIGHT_RATIO: number = 0.8;
  VARIANT_INDEX: number = 0;
  ACTIVITY_MIN_START_TIME: number = 1;
  ACTIVITY_MAX_COMPLETE_TIME: number = 2;
  ACTIVITY_NAME: number = 4;
  MIN_RECT_LENGTH: number = 15;
  LMIT_RECT_HEIGHT: number = 120;
  MAX_RECT_HEIGHT: number = 700;
  checkLenInRow: any = {};

  colorData: string[] = ['#4C594E', '#785441', '#F2A341', '#4D7876', '#91C5C3', '#FAC1A5', '#E9815F', '#75BFB2', '#2D7572', '#C4A391'];

  activityColorPair: any = {};

  chartOption: any = {};

  tooltipVal: any = {
    ea: this.$t('view.process.gantt.tooltip.ea'),
    ccnt: this.$t('view.process.gantt.tooltip.ccnt'),
    minStartTime: this.$t('view.process.gantt.tooltip.minStartTime'),
    maxCompleteTime: this.$t('view.process.gantt.tooltip.maxCompleteTime'),
    meanTime: this.$t('view.process.gantt.tooltip.meanTime'),
    variant: this.$t('view.process.gantt.tooltip.variant'),
    minDuration: this.$t('view.process.gantt.tooltip.minDuration'),
    maxDuration: this.$t('view.process.gantt.tooltip.maxDuration'),
    meanDuration: this.$t('view.process.gantt.tooltip.meanDuration'),
  };

  created() {
    window.addEventListener('resize', this.resize);
  }

  mounted() {
    EventBus.$on('resize', () => this.resize());

    this.$nextTick(() => {
      const el = document.getElementById('gantt-chart') as HTMLDivElement;
      this.chart = echarts.init(el, 'light');
      this.chart.on('dblclick', (cell: any) => {
        if (cell.componentIndex == 1) {
          this.clickedVaiantId = cell.data[1];
          this.clickedVaiantName = cell.data[2];
        }
      });
    });
  }

  resize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  @Watch('clickedVaiantId')
  onChangeClickedCell(newClickedVaiantId: string) {
    if (newClickedVaiantId != null) {
      this.$emit('cellDoubleClick', newClickedVaiantId, this.clickedVaiantName);
      this.clickedVaiantId = null; // 초기화
      this.clickedVaiantName = null; // 초기화
    }
  }

  @Watch('rawData', { deep: true })
  onChnageRawData(newVal: any) {
    this.drawChart(newVal);
  }

  getChartData() {
    const params = [
      {
        _type: 'TraceVariantDiscoveryLiteConfiguration',
        repository: {
          id: this.$route.params.repositoryId,
          _type: 'EventRepository',
          project: {
            id: this.$route.params.projectId,
            _type: 'Project',
          },
        },
        eventFilters: [utils.buildTimeEventFilter()],
        option: this.filter.variantType,
        sortBy: this.filter.sortBy,
        sortDirection: this.filter.sortDirection,
        excludeNull: false,
      },
    ];
    this.$store.dispatch('gantt/getGanttChartData', params);
  }

  getByDataUri(dataUri: string) {
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.$store.commit('gantt/setGanttChartData', res.data.data.series);
    });
  }

  drawChart(data: any) {
    const variantDataList = 'data' in data.variantData ? data.variantData.data : [];

    if (variantDataList.length != 0) {
      //
      for (const idx in variantDataList) {
        const checkKey = variantDataList[idx][0] + '-' + variantDataList[idx][3];
        if (checkKey in this.checkLenInRow) {
          this.checkLenInRow[checkKey] += 1;
        } else {
          this.checkLenInRow[checkKey] = 1;
        }

        if (!(variantDataList[idx][4] in this.activityColorPair)) {
          this.activityColorPair[variantDataList[idx][4]] = this.colorData[Number(idx) % 10];
        }
      }
    }
    this.chartOption = this.makeOption();
    this.chartOption.legend.data = Object.keys(this.activityColorPair);
    for (const eachName of Object.keys(this.activityColorPair)) {
      this.chartOption.series.push({
        name: eachName,
        type: 'scatter',
        data: null,
      });
    }
    if ('data' in this.rawData.variant && this.rawData.variant.data.length != 0) {
      this.changeYscrollZoom(this.rawData.variant.data.length);
    }
    if (Object.keys(this.checkLenInRow).length != 0) {
      this.changeXscrollZoom(this.checkLenInRow);
    }
    this.chart.setOption(this.chartOption);
    this.showLoading = false;
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    EventBus.$off('resize');
  }

  changeYscrollZoom(dataLen: number) {
    switch (true) {
      case dataLen >= 100:
        this.chartOption.dataZoom[2].end = 15;
        break;
      case dataLen >= 75 && dataLen < 100:
        this.chartOption.dataZoom[2].end = 30;
        break;
      case dataLen >= 50 && dataLen < 75:
        this.chartOption.dataZoom[2].end = 45;
        break;
      case dataLen >= 35 && dataLen < 50:
        this.chartOption.dataZoom[2].end = 60;
        break;
      case dataLen >= 20 && dataLen < 35:
        this.chartOption.dataZoom[2].end = 75;
        break;
      case dataLen >= 5 && dataLen < 20:
        this.chartOption.dataZoom[2].end = 90;
        break;
      default:
        this.chartOption.dataZoom[2].end = 100;
        break;
    }
  }

  changeXscrollZoom(obj: any) {
    const valueArray = Object.values(obj);
    const average = (arr: any[]) => arr.reduce((p, c) => p + c, 0) / arr.length;
    this.chartOption.dataZoom[0].end = Math.floor(average(valueArray)) > 100 ? 5 : 100 - Math.floor(average(valueArray));
  }

  requestBuilder(caseId?: string) {
    return [
      {
        _type: 'TraceVariantDiscoveryLiteConfiguration',
        repository: {
          id: this.$route.params.repositoryId,
          _type: 'EventRepository',
          project: {
            id: this.$route.params.projectId,
            _type: 'Project',
          },
        },
        eventFilters: [utils.buildTimeEventFilter()],
        option: this.filter.variantType,
        sortBy: this.filter.sortBy,
        sortDirection: this.filter.sortDirection,
        excludeNull: false,
      },
    ];
  }

  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'chart',
      serviceId: 'process.analysis.trace.variant.echarts',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  toDDHHMMSS(time: string | number) {
    return utils.toDDHHMMSS(time, this.$t('view.process.table.dayUnit').toString());
  }

  //gantt chart code
  makeOption(): EChartOption {
    return {
      legend: {
        type: 'scroll',
        data: [],
        top: '92%',
        padding: [5, 120],
      },
      tooltip: {
        formatter: (params: any | any[]) => {
          if (params.componentIndex == 1) {
            return `
              ${this.tooltipVal.variant} : ${params.data[2]}<br />
              ${this.tooltipVal.ccnt}  : ${new Intl.NumberFormat().format(params.data[5])}<br />
              ${this.tooltipVal.maxDuration} : ${this.toDDHHMMSS(params.data[8])}<br />
              ${this.tooltipVal.meanDuration}: ${this.toDDHHMMSS(params.data[7])}<br />
              ${this.tooltipVal.minDuration} : ${this.toDDHHMMSS(params.data[6])}<br />
            `;
          }
          // Activity Min Start Time  : ${this.toDDHHMMSS(params.data[1])}<br />
          // Activity Max Complete Time : ${this.toDDHHMMSS(params.data[2])}<br />
          else if (params.componentIndex == 0) {
            return `
              ${this.tooltipVal.ea}  : ${params.data[4]}<br />
              ${this.tooltipVal.ccnt} :  ${new Intl.NumberFormat().format(params.data[5])}<br />
              ${this.tooltipVal.meanTime} : ${this.toDDHHMMSS(params.data[6])}<br />
            `;
          }
        },
      },
      animation: false,
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'weakFilter',
          height: 20,
          bottom: '5px',
          start: 0,
          end: 100,
          handleSize: '80%',
          showDetail: false,
        },
        {
          type: 'inside',
          id: 'insideX',
          xAxisIndex: 0,
          filterMode: 'weakFilter',
          start: 0,
          end: 26,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
        },
        {
          type: 'slider',
          yAxisIndex: 0,
          filterMode: 'weakFilter',
          width: 20,
          top: '30px',
          bottom: '25px',
          right: 92, //50, //10,
          start: 0,
          end: 80,
          handleSize: '80%',
          showDetail: false,
        },
        {
          type: 'inside',
          id: 'insideY',
          yAxisIndex: 0,
          start: 95,
          end: 100,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true,
        },
      ] as any[],
      grid: {
        top: '40px',
        bottom: '9%',
        left: '215px', //150, //100,
        right: '150px', //60, //20,
        backgroundColor: '#fff',
        borderWidth: 0,
      },
      xAxis: {
        show: false,
        type: 'time',
        splitLine: {
          lineStyle: {
            color: '#E9EDFF',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          lineStyle: {
            color: '#929ABA',
          },
        },
        axisLabel: {
          color: '#929ABA',
          inside: false,
          align: 'center',
          /*formatter: ((value: any)=>{
          }),*/
        },
      },
      yAxis: {
        inverse: true,
        // position: 'top',
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false },
        min: -1,
      },
      series: [
        {
          id: 'variantData',
          type: 'custom',
          name: 'Sales',
          renderItem: (params: any, api: any) => {
            return this.renderGanttItem(params, api);
          },
          dimensions: this.rawData.variantData.dimensions,
          encode: {
            x: [this.ACTIVITY_MAX_COMPLETE_TIME, this.ACTIVITY_MIN_START_TIME],
            y: this.VARIANT_INDEX,
          },
          data: 'data' in this.rawData.variantData && this.rawData.variantData.data.length != 0 ? this.rawData.variantData.data : [],
        },
        {
          type: 'custom',
          renderItem: function (params: any, api: any) {
            const y = api.coord([0, api.value(0)])[1];
            return {
              type: 'group',
              position: [5, y],
              children: [
                {
                  type: 'path',
                  shape: {
                    d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 40,-1 L60,-1 L20,0 Z',
                    x: 85, //50, //0,
                    y: -20,
                    width: 125,
                    height: 22,
                    layout: 'cover',
                  },
                  style: {
                    fill: '#26B5DC',
                  },
                },
                {
                  type: 'text',
                  style: {
                    x: 125, //125, //75
                    y: -3,
                    textVerticalAlign: 'bottom',
                    textAlign: 'center',
                    text: api.value(2),
                    textFill: 'white',
                  },
                },
                {
                  type: 'text',
                  style: {
                    x: 185, //125, //75
                    y: -2,
                    textVerticalAlign: 'bottom',
                    textAlign: 'center',
                    text: new Intl.NumberFormat().format(api.value(5)),
                    textFill: 'black',
                  },
                },
              ],
            };
          },
          dimensions: this.rawData.variant.dimensions,
          encode: {
            x: -1, // Then this series will not controlled by x.
            y: 0,
          },
          data:
            'data' in this.rawData.variant && this.rawData.variant.data != 0
              ? this.rawData.variant.data.map(function (item: any, index: number) {
                  return [index].concat(item);
                })
              : [],
        },
      ],
    };
  }

  dateFormat(date: number) {
    const dateE = new Date(date * 1000);
    dateE.setHours(dateE.getHours() + 9);
    return dateE.toISOString().replace('T', ' ').substring(0, 19);
  }

  renderGanttItem(params: any, api: any) {
    const categoryIndex = api.value(this.VARIANT_INDEX);
    const echart: any = echarts;

    const minStartTime = api.coord([api.value(this.ACTIVITY_MIN_START_TIME), categoryIndex]);
    const maxCompleteTime = api.coord([api.value(this.ACTIVITY_MAX_COMPLETE_TIME), categoryIndex]);
    const barLength = maxCompleteTime[0] - minStartTime[0];

    const barHeight = api.size([0, 1])[1] * this.HEIGHT_RATIO;
    const x = minStartTime[0];
    const y = minStartTime[1] - barHeight;
    const activityName = api.value(this.ACTIVITY_NAME) + '';
    const activityNameWidth = echart.format.getTextRect(activityName).width;
    const text = activityName;

    const param: any = {};
    param.x = params.coordSys.x;
    param.y = params.coordSys.y;
    param.width = params.coordSys.width;
    param.height = barHeight > this.LMIT_RECT_HEIGHT ? this.MAX_RECT_HEIGHT : params.coordSys.height;

    const rect: any = {};
    rect.x = x;
    rect.y = y;
    rect.width = barLength / 2 ? barLength / 2 : this.MIN_RECT_LENGTH;
    rect.height = barHeight > this.LMIT_RECT_HEIGHT ? this.LMIT_RECT_HEIGHT : barHeight;

    const rectVIP = echarts.graphic.clipRectByRect(rect, param);
    const rectText = echarts.graphic.clipRectByRect(rect, param);
    const result: any = {};

    result.type = 'group';
    result.children = [];

    const style1: any = {};
    style1.fill = this.activityColorPair[text];
    style1.borderColor = 'black';

    const children1: any = {};
    children1.type = 'rect';
    children1.ignore = !rectVIP && !api.value(4);
    children1.shape = rectVIP;
    children1.style = api.style(style1);

    const style2: any = {};
    style2.fill = 'transparent';
    style2.stroke = 'transparent';
    style2.text = rect.width < activityNameWidth ? text.substring(0, 3) + '..' : text;
    style2.textFill = 'black';

    const children2: any = {};
    children2.type = 'rect';
    children2.ignore = !rectText;
    children2.shape = rectText;
    children2.style = api.style(style2);

    result.children.push(children1);
    result.children.push(children2);

    return result;
  }

  showOverlay() {
    return this.isNoData || this.showLoading || this.checkFilterHaveOnlyDuration;
  }
}
</script>
