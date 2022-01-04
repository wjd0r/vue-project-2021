<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component d-flex align-items-center justify-content-center" no-fade bg-color="#fff" opacity="1">
    <div id="heatmap-chart" class="chart w-100 h-100"></div>
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
        <template v-else-if="variantLoading">{{ $t('view.process.alert.loadingVariantList') }}</template>
        <template v-else-if="variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
        <template v-else-if="variantId === ''">{{ $t('view.process.alert.chooseVariant') }}</template>
      </template>
      <!--<template v-else-if="noER && noEO">{{ $t('view.process.alert.dataErEo') }}</template>-->
      <template v-else-if="isNoData">{{ $t('view.process.alert.variantNodata') }}</template>
      <b-spinner v-else label="Spinning"></b-spinner>
    </template>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IClient, IWorkFlowRequestAction, ISetting } from '@/interface';
import { mapGetters } from 'vuex';
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
export default class HeatmapChart extends Mixins(AnalysisMixin) {
  readonly readOnlySetting!: ISetting;
  chart: ECharts = null;
  chartOption: EChartOption = {};

  dimensionFrom: string = '';
  dimensionTo: string = '';
  colorByInput: string = '';
  valueInput: string = '';

  noEO: boolean = true;
  noER: boolean = true;

  valueFormat: string = '';

  @Watch('eventView', { immediate: true, deep: true })
  onEventViewChanged(data: any) {
    for (const key in data.fields) {
      const valueData = data.fields[key];
      switch (valueData) {
        case 'eo':
          this.noEO = false;
          break;
        case 'er':
          this.noER = false;
          break;
      }
    }
  }

  created() {

    window.addEventListener('resize', this.resize);

    this.dimensionFrom = 'ea';
    this.dimensionTo = 'eo';
    this.colorByInput = 'total';
    this.valueInput = 'EXTRACT';

    this.chartOption = {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'cross',
        },
      },
      animation: false,
      grid: {
        // height: '83%',
        top: '40px',
        bottom: '10%',
        right: '50px',
        left: '88px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        position: 'top',
        splitArea: {
          show: true,
        },
        axisLabel: {
          interval: 0,
          formatter: (value: any, index: any) => {
            if (value.includes('->')) {
              const item = value.split('->');
              return item[0] + '\n->' + item[1];
            } else if (value.includes('|')) {
              const item = value.split('|');
              return item[0] + '\n|' + item[1];
            } else {
              return value;
            }
          },
        },
      },
      yAxis: {
        type: 'category',
        position: 'right',
        splitArea: {
          show: true,
        },
        axisLabel: {
          interval: 0,
          rotate: 30, //0,
          align: 'left', //'center',
          verticalAlign: 'middle',
          inside: false,
          width: '100%',
          formatter: (value: any, index: any) => {
            if (value.includes('->')) {
              const item = value.split('->');
              return item[0] + '\n->' + item[1];
            } else if (value.includes('|')) {
              const item = value.split('|');
              return item[0] + '\n|' + item[1];
            } else {
              return value;
            }
          },
        },
      },
      visualMap: [
        {
          show: true,
          calculable: true,
          orient: 'horizontal',
          left: 'center', //'2%',
          top: '94%',
          //bottom: '5%', //'0%',
          // formatter: function (value: any) {
          //     return numberWithCommas(value);
          // }
          inRange: {
            color: ['#81D4FA', '#27418C'], //From smaller to bigger value ->
          },
        },
      ],
      dataZoom: [],
      series: [],
    };
  }

  mounted() {
    
    const theme = store.getters['sso/getColorTheme'] !== 'dark' ? 'light' : 'dark';

    EventBus.$on('setMatrixGraphOption', (args: any) => {
      this.dimensionFrom = args.dimensionFrom;
      this.dimensionTo = args.dimensionTo;
      this.valueInput = args.dimensionValue;
      this.colorByInput = args.colorByInput;
    });

    EventBus.$on('resize', () => this.resize());

    this.$nextTick(() => {
      const el = document.getElementById('heatmap-chart') as HTMLDivElement;
      this.chart = echarts.init(el, theme);
      this.chart.on('dblclick', (cell: any) => {
        const value = { from: cell.data[0], to: cell.data[1] };
        const config = {
          _type: 'DirectlyFollowMatrixLiteConfiguration',
          dimensionFrom: this.dimensionFrom,
          dimensionTo: this.dimensionTo,
        };
        this.$emit('cellDoubleClick', value, config);
      });
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    EventBus.$off('setMatrixGraphOption');
    EventBus.$off('resize');
  }

  requestBuilder(caseId?: string) {
    const data: any = {
      _type: 'DirectlyFollowMatrixLiteConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      addArtificialStartEnd: false,
      dfSortActivity: true,
      colEventActivity: 'ea',
      dimensionFrom: this.dimensionFrom, //"ea",
      dimensionTo: this.dimensionTo, //"es"
      //dimensionFrom: this.dimensionFrom.includes('_attribute') ? this.dimensionFrom.split('_attribute')[0] : this.dimensionFrom,
      //dimensionTo: this.dimensionTo.includes('_attribute') ? this.dimensionTo.split('_attribute')[0] : this.dimensionTo,
    };

    if (this.colorByInput.includes('en_')) {
      data.dimensionValueFrom = '0';
      data.dimensionValueTo = 'en';
    } else if (this.colorByInput.includes('cn_')) {
      data.dimensionValueFrom = '0';
      data.dimensionValueTo = 'cn';
      data.nonDfBasedDimensionValue = 'cti';
    }

    // 추가 조건 필터 추가
    if (this.filter.tokenInclude && this.filter.tokenInclude !== '---') {
      data.eventFilters.push(utils.buildTokenFilter());
      if (this.filter.tokenInclude !== 'ci') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    } else {
      // 추가 조건이 없으면 variantId 필터 추가
      if (this.variantId !== '---') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    }

    if (!this.haveCaseIdFilter() && caseId) {
      data.eventFilters.push({
        _type: 'CaseFilterLite',
        values: [caseId],
      });
    }

    const utilizationSelected = this.colorByInput == 'total2' ? true : false;

    if (this.dimensionFrom === 'esm' && utilizationSelected) {
      data.colEventActivity = 'group-ratio';
    }

    const request = [data];

    return request;
  }

  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'chart',
      serviceId: 'process.discovery.matrix.df',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  getMatrixChart() {
    this.showLoading = true;

    this.$store
      .dispatch('matrix/getMatrix', {
        repositoryId: this.$route.params.repositoryId,
        projectId: this.$route.params.projectId,
        datasetId: this.$route.params.datasetId,
        dimensionFrom: this.dimensionFrom,
        dimensionTo: this.dimensionTo,
        dimensionValue: this.valueInput,
        option: this.filter.variantType,
        timeMin: moment(this.filter.duration.start).format('YYYY-MM-DD HH:mm:ss'),
        timeMax: moment(this.filter.duration.end).endOf('days').format('YYYY-MM-DD HH:mm:ss'),
        variantId: this.variantId,
        utilizationSelected: this.colorByInput == 'total2' ? true : false,
      })
      .then((res: AxiosResponse) => {
        this.drawChart(res);
      });
  }

  getByDataUri(dataUri: string) {
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.drawChart(res);
    });
  }

  drawChart(res: any) {
    const data = res.data.data;

    this.isNoData = false;

    this.chart.clear();

    if (JSON.stringify(data) == '{}' || data === null) {
      this.isNoData = true;
      this.showLoading = false;
      return;
    }

    const xAxis: any[] = [];
    const yAxis: any[] = [];
    const heatmap: any[] = [];

    _.forEach(data, (xv, xk) => {
      xAxis.push(xk);
      _.forEach(data[xk], (yv, yk) => {
        const index = _.findIndex(yAxis, (item) => {
          return item === yk;
        });
        if (index === -1) yAxis.push(yk);
        this.valueFormat = yv['valueFormat'];
        let cbiConvert = this.colorByInput == 'total2' ? 'total' : this.colorByInput;

        //비용(케이스 총 비용, 이벤트 비용)
        if (this.colorByInput.includes('en_') || this.colorByInput.includes('cn_')) {
          cbiConvert = this.colorByInput.substring(3, this.colorByInput.length);
        }

        heatmap.push([xk, yk, yv[cbiConvert].toFixed(0)]);
      });
    });

    const values: any = [];
    heatmap.forEach(function (onehp) {
      values.push(Number(onehp[2]));
    });
    const max = Math.max.apply(null, values);
    const cbi = this.colorByInput;

    this.chartOption.visualMap[0].max = max;
    this.chartOption.visualMap[0].formatter = (value: any) => {
      const cellvalue = value;

      if (cbi == 'countCases' || this.colorByInput.includes('en_') || this.colorByInput.includes('cn_')) {
        // || cbi=="average"
        return utils.numberWithCommas(parseFloat(cellvalue).toFixed(0));
      } else if (this.valueFormat == 'duration') {
        const days = Math.floor(cellvalue / (1440 * 60));
        const time = moment('1900-01-01')
          .startOf('day')
          .minutes(cellvalue / 60)
          .format('HH:mm:ss');
        const calculatedValue = days === 0 ? time : days + 'D ' + time;
        return calculatedValue;
      } else if (this.valueFormat == 'group-ratio') {
        return (parseFloat(cellvalue) * 100).toFixed(2) + ' %';
      }
    };

    (this.chartOption.xAxis as any).data = xAxis;
    (this.chartOption.yAxis as any).data = yAxis;

    this.chartOption.tooltip.formatter = (params: any) => {
      const cellvalue = params.data[2];

      if (cbi == 'countCases' || this.colorByInput.includes('en_') || this.colorByInput.includes('cn_')) {
        // || cbi=="average"

        const text = params.marker + ' ' + params.data[0] + ': ' + utils.numberWithCommas(cellvalue);
        return text;
      } else if (this.valueFormat == 'duration') {
        const days = Math.floor(cellvalue / (1440 * 60));
        const time = moment('1900-01-01')
          .startOf('day')
          .minutes(cellvalue / 60)
          .format('HH:mm:ss');
        const calculatedValue = days === 0 ? time : days + 'D ' + time;
        const text = params.marker + ' ' + params.data[0] + ': ' + calculatedValue;
        return text;
      } else if (this.valueFormat == 'group-ratio') {
        const calculatedValue = (parseFloat(cellvalue) * 100).toFixed(2) + ' %';
        const text = params.marker + ' ' + params.data[0] + ': ' + calculatedValue;
        return text;
      }
    };

    this.chartOption.series = [
      {
        type: 'heatmap',
        data: heatmap,
        label: {
          show: true,
          color: 'white',
          // formatter: function(param: any) {
          //   return numberWithCommas(param.data[2]);
          // },
          formatter: (param: any) => {
            if (this.colorByInput == 'countCases' || this.colorByInput.includes('en_') || this.colorByInput.includes('cn_')) {
              // || this.colorByInput=="average"
              return utils.numberWithCommas(param.data[2]);
            } else if (this.valueFormat == 'duration') {
              const days = Math.floor(param.data[2] / (1440 * 60));
              const time = moment('1900-01-01')
                .startOf('day')
                .minutes(param.data[2] / 60)
                .format('HH:mm:ss');

              return days === 0 ? time : days + 'D ' + time;
            } else if (this.valueFormat == 'group-ratio') {
              return (parseFloat(param.data[2]) * 100).toFixed(2) + ' %';
            }
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ];

    this.chartOption.dataZoom = [];
    if (xAxis.length > 6) {
      this.chartOption.dataZoom.push({
        show: true,
        height: 20,
        type: 'slider',
        top: '91%',
        //bottom: '15%', //'8%',
        xAxisIndex: 0,
        endValue: 5,
        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
        handleSize: '100%',
      } as any);

      this.chartOption.dataZoom.push({
        type: 'inside',
        xAxisIndex: 0,
        zoomOnMouseWheel: false,
      });
    }

    //7개가 넘어으면 스크롤
    if (yAxis.length > 4) {
      this.chartOption.dataZoom.push({
        show: true,
        type: 'slider',
        yAxisIndex: [0],
        //right: 0,
        left: '50px',
        start: 0,
        endValue: 13,
        textStyle: {
          color: 'transparent',
        },
        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
        handleSize: '100%',
      });

      this.chartOption.dataZoom.push({
        type: 'inside',
        yAxisIndex: 0,
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
      });
    }

    this.chart.setOption(this.chartOption, { notMerge: true });

    this.showLoading = false;
  }

  resize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  showOverlay() {
    return this.variantId === '' || this.variant.totalCount === 0 || this.isNoData || this.showLoading || this.variantLoading || this.checkFilterHaveOnlyDuration;
  }
}
</script>
