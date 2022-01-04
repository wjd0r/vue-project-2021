<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <template v-if="!isNoData && !showLoading && !notHaveField">
        <div class="ico-header ico-table" @click="onClickTable" alt="케이스 테이블 아이콘"></div>
      </template>
    </template>
    <template #content>
      <div ref="chart" class="content w-100 h-100"></div>
      <template v-if="!isEditor">
        <widget-table ref="widgetTable" v-model="showTable" :option="widgetTableOpion" @tableFiler="tableFilter" :tableLoading.sync="tableLoading" @getCaseTableView="getCaseTableView" @onInputPage="onInputPage" @onDetailInputPage="onDetailInputPage" @downloadCSV="downloadCSV"></widget-table>
      </template>
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IKeyValueObject, IWidgetDataConfiguration, IWidgetTableOption } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin, WidgetTableMixin } from '@/mixin';

import { BasicScatterChart } from '../basicCharts';

import WidgetTable from '../components/WidgetTable.vue';
import { EventBus } from '@/common';

@Component({
  components: {
    WidgetTable,
  },
})
export default class ResourceCasesTimeRatio extends Mixins(WidgetMixin, WidgetTableMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicScatterChart = null;

  // 리소스 별 건수 대비 소요시간 비율
  name: string = 'resource.chart.event.to.duration.ratio';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'SCATTER_CHART',
    dataParams: {
      colName: 'er',
      default: 'avg', //option: 'avg' or '중간값' --> 리소스별 소요시간 계산 방법
      nLimit: 50,
      px: 0.5, // range [0.0, 1.0] default 0.3
      py: 0.5, // range [0.0, 1.0] default 0.1
    },
  };

  widgetTableOpion: IWidgetTableOption = {
    widgetName: this.name,
    selectedBy: {
      px: this.data.dataParams.px,
      py: this.data.dataParams.py,
    },
    title: this.title,
    detail: false,
    custom: true,
  };

  /* refs 선언 */
  $refs!: {
    chart: HTMLDivElement;
  };

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    if (!this.isEditor) {
      if (!this.isFieldExist('er')) {
        this.notHaveField = true;
      }
    }
  }

  mounted() {
    this.chart = new BasicScatterChart(this.$refs.chart);

    EventBus.$on('widgetReset', () => {
      this.tableFilter = {
        x: 0,
        y: 0,
      };
    });

    this.initChartOption();
  }

  beforeDestroy() {
    EventBus.$off('widgetReset');
  }

  /* 메소드 선언 */

  dataProcessing(res: any) {
    const data = res.data.data;
    if (data === null || data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    if (!this.isNoData) {
      this.dataFields = data.data?.fields;
      const series: IKeyValueObject = data.data.series;

      const scatterSerise: EChartOption.SeriesScatter = {
        type: 'scatter',
        name: 'point',
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed',
          },
          data: [] as any,
        },
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [] as any,
        },
      };

      const markArea: any[] = [];
      const markLine: any[] = [];

      for (const [key, value] of Object.entries(series)) {
        switch (key) {
          case 'point': {
            scatterSerise.data = value.values;
            break;
          }
          case 'markAreaMax': {
            markArea.push({
              type: 'max',
            });
            break;
          }
          case 'markAreaMin': {
            markArea.push({
              type: 'min',
            });
            break;
          }
          case 'markLineX': {
            const x = value.values[0][0];
            markLine.push({
              xAxis: x,
            });
            this.tableFilter.x = x;
            break;
          }
          case 'markLineY': {
            const y = value.values[0][1];
            markLine.push({
              yAxis: y,
            });
            this.tableFilter.y = y;
            break;
          }
        }
      }

      (scatterSerise.markArea.data as any) = [markArea];
      (scatterSerise.markLine.data as any) = markLine;

      this.chart.setSeries([scatterSerise]);
      this.chart.drawChart();
    }

    this.showLoading = false;
  }

  get title() {
    return this.$t('view.dashboard.' + this.name);
  }

  initChartOption() {
    this.chart.chartOption = {
      color: ['#0597f2', '#03a696', '#f22786', '#e86b0c'],
      tooltip: {
        showDelay: 0,
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1,
          },
          label: {
            precision: 2,
            formatter: (params: any | any[]) => {
              if (params.axisDimension === 'x') {
                return this.numberWithCommas(params.value);
              } else if (params.axisDimension === 'y') {
                return this.durationSymbol(params.value);
              }
            },
          },
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          if (params.componentType === 'series') {
            const string: string[] = [`${params.marker} ${params.value[2]}`];
            string.push(`x : ${this.numberWithCommas(params.value[0])}`);
            string.push(`y : ${this.durationSymbol(params.value[1])}`);
            return string.join('<br>');
          } else if (params.componentType === 'markLine') {
            if (params.data?.yAxis) {
              return this.$t('view.dashboard.casesTimeRatio.durationTooltip', { percentage: this.data.dataParams.py * 100, value: this.durationSymbol(params.data.yAxis) }).toString();
            } else if (params.data?.xAxis) {
              return this.$t('view.dashboard.casesTimeRatio.freqTooltip', { percentage: this.data.dataParams.px * 100, value: this.numberWithCommas(params.data.xAxis) }).toString();
            }
          }
        },
      },
      grid: {
        top: '30px',
        left: '90px',
        bottom: '30px',
        right: '80px',
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: 'value',
        name: this.getAxisName('number'),
        scale: true,
        axisLabel: {
          formatter: (value: string) => {
            return this.numberSymbol(value);
          },
        },
      },
      yAxis: {
        type: 'category',
        scale: true,
        axisLabel: {
          formatter: (value: string) => {
            return this.durationSymbolForAxis(value);
          },
        },
      },
      series: [],
    };
  }

  setLocale() {
    if (Array.isArray(this.chart.chartOption.xAxis)) {
      this.chart.chartOption.xAxis[0].name = this.getAxisName('number');
    } else {
      this.chart.chartOption.xAxis.name = this.getAxisName('number');
    }
  }
}
</script>