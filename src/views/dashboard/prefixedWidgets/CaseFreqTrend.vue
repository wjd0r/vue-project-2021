<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="$route.name !== 'DashboardEditor'" #right-align>
      <div v-if="!isNoData && !showLoading">
        <div class="btn-group pb-0">
          <b-button variant="outline-primary" class="btn-trend btn-month" :class="{ active: data.dataParams.timeFormat === 'YYYY-MM' }" @click="onClickTimeFormat('YYYY-MM')">{{ $t('view.dashboard.activityTrend.monthly') }}</b-button>
          <b-button variant="outline-primary" class="btn-trend btn-week" :class="{ active: data.dataParams.timeFormat === 'YYYY-MM-DD' }" @click="onClickTimeFormat('YYYY-MM-DD')">{{ $t('view.dashboard.activityTrend.daily') }}</b-button>
          <b-button variant="outline-primary" class="btn-trend btn-times" :class="{ active: data.dataParams.timeFormat === 'YYYY-MM-DD HH24' }" @click="onClickTimeFormat('YYYY-MM-DD HH24')">{{ $t('view.dashboard.activityTrend.time') }}</b-button>
        </div>
      </div>
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { EventBus } from '@/common';
import { IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin } from '@/mixin';

import { BasicBarChart, BasicLineChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { CaseFreqTrendData } from './SampleData';

@Component({})
export default class CaseFreqTrend extends Mixins(WidgetMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicBarChart | BasicLineChart = null;

  // 케이스 추이
  name: string = 'overview.chart.case.trend';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'LINE_CHART', // LINE_CHART , BAR_CHART
    dataParams: {
      timeFormat: 'YYYY-MM', // 월별: YYYY-MM (default), 시간대별: YYYY-MM-DD HH24, 일 별: YYYY-MM-DD
    },
  };

  sampleData = CaseFreqTrendData;

  /* refs 선언 */

  /* Watch 선언 */
  @Watch('widget.widgetType')
  onChartTypeChanged(newValue: 'BAR_CHART' | 'LINE_CHART') {
    if (newValue !== this.data.widgetType) {
      this.data.widgetType = newValue;
      this.initChartClass(this.data.widgetType, this.chartWidget.getChartElement());
    }
    this.drawSampleChart();
  }

  @Watch('widget.colorTheme')
  onColorThemeChanged(newValue: number) {
    this.chart.setColor(theme.multiColorPalette[newValue]);

    this.drawSampleChart();
  }

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    if (!_.isEmpty(this.widget)) {
      this.data.widgetType = this.widget.widgetType;
    }
  }

  mounted() {
    this.initChartClass(this.data.widgetType, this.chartWidget.getChartElement());

    EventBus.$on('widgetReset', () => {
      this.data.dataParams.timeFormat = 'YYYY-MM';
    });
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
      this.chart.makeSeries(data.data);
      this.chart.drawChart();
    }

    this.showLoading = false;
  }

  get title() {
    if (_.isEmpty(this.widget)) {
      return this.$t('view.dashboard.' + this.name);
    } else {
      if (this.widget.widgetTitle && this.widget.widgetTitle !== '') {
        return this.widget.widgetTitle;
      } else {
        return this.$t('view.dashboard.' + this.name);
      }
    }
  }

  drawSampleChart() {
    this.chart.makeSeries(this.sampleData);
    this.chart.drawChart();
  }

  onClickTimeFormat(timeFormat: 'YYYY-MM' | 'YYYY-MM-DD HH24' | 'YYYY-MM-DD') {
    this.data.dataParams.timeFormat = timeFormat;

    this.getWidgetData();
  }

  initChartOption() {
    const option: EChartOption = {
      color: [theme.singleColorPalette[theme.defaultSingleColorIndex]],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          return `${params[0].marker} ${params[0].axisValue}${this.data.dataParams.timeFormat === 'YYYY-MM-DD HH24' ? this.$t('view.dashboard.activityTrend.HH') : ''} : ${this.numberWithCommas(params[0].data[1])}`;
        },
      },
      grid: theme.countGrid.oneBottomContent,
      legend: {
        show: false,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          formatter: (value: string) => {
            if (this.data.dataParams.timeFormat === 'YYYY-MM-DD HH24') {
              return `${value}${this.$t('view.dashboard.activityTrend.HH')}`;
            } else {
              return value;
            }
          },
        },
      },
      yAxis: {
        type: 'value',
        name: this.getAxisName('number'),
        axisLabel: {
          formatter: (value: string) => {
            return this.numberSymbol(value);
          },
        },
      },
      dataZoom: [theme.horizonalSlider] as any[],
      series: [],
    };

    if (!_.isEmpty(this.widget)) {
      option.color = theme.multiColorPalette[this.widget.colorTheme];
    }

    this.chart.setOption(option);
  }

  setLocale() {
    if (Array.isArray(this.chart.chartOption.yAxis)) {
      this.chart.chartOption.yAxis[0].name = this.getAxisName('number');
    } else {
      this.chart.chartOption.yAxis.name = this.getAxisName('number');
    }
  }
}
</script>