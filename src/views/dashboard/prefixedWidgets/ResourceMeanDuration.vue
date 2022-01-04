<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :notHaveField="notHaveField" :isNoData="isNoData" :showLoading="showLoading"></chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin } from '@/mixin';

import { BasicBarChart, BasicLineChart, BasicPieChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { ResourceMeanDurationData } from './SampleData';

@Component({})
export default class ResourceMeanDuration extends Mixins(WidgetMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicBarChart | BasicLineChart | BasicPieChart = null;

  // 리소스 별 평균 소요시간
  name: string = 'resource.chart.mean.duration';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART', // BAR_CHART , LINE_CHART , PIE_CHART
    dataParams: {
      nLimit: 25, // 리소스가 26 넘어가면 기타로 일괄로 계산됨
    },
  };

  sampleData = ResourceMeanDurationData;

  /* refs 선언 */

  /* Watch 선언 */
  @Watch('widget.widgetType')
  onChartTypeChanged(newValue: 'LINE_CHART' | 'BAR_CHART' | 'PIE_CHART') {
    if (newValue !== this.data.widgetType) {
      this.data.widgetType = newValue;
      this.initChartClass(this.data.widgetType, this.chartWidget.getChartElement());
    }
    this.drawSampleChart();
  }

  @Watch('widget.colorPalette')
  onColorPaletteChanged(newValue: string) {
    this.setColor();

    this.drawSampleChart();
  }

  @Watch('widget.colorTheme')
  onColorThemeChanged(newValue: string) {
    this.setColor();

    this.drawSampleChart();
  }

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    if (!_.isEmpty(this.widget)) {
      this.data.widgetType = this.widget.widgetType;
    }

    if (this.data.widgetType !== 'PIE_CHART') {
      delete this.data.dataParams.nLimit;
    }

    if (!this.isEditor) {
      if (!this.isFieldExist('er')) {
        this.notHaveField = true;
      }
    }
  }

  mounted() {
    this.initChartClass(this.data.widgetType, this.chartWidget.getChartElement());
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
    const { chart, sampleData, data } = this;
    chart.makeSeries(sampleData[data.widgetType]);
    chart.drawChart();
  }

  initChartOption() {
    const option: EChartOption = {
      color: [theme.singleColorPalette[theme.defaultSingleColorIndex]],
      tooltip: {
        trigger: this.data.widgetType === 'PIE_CHART' ? 'item' : 'axis',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          if (Array.isArray(params)) {
            return `${params[0].marker} ${params[0].data[0]}: ${this.durationSymbol(params[0].data[1])}`;
          } else {
            return `${params.marker} ${params.name} : ${this.durationSymbol(params.value)} (${this.numberWithCommas(params.percent)}%)`;
          }
        },
      },
      grid: this.data.widgetType === 'PIE_CHART' ? theme.normalGrid : theme.durationGrid.oneBottomContent,
      legend: {
        show: false,
      },
      series: [],
    };

    if (this.data.widgetType === 'LINE_CHART' || this.data.widgetType === 'BAR_CHART') {
      option.xAxis = {
        type: 'category',
        nameGap: 5,
      };

      option.yAxis = {
        type: 'value',
        axisLabel: {
          formatter: (value: string) => {
            return this.durationSymbolForAxis(value);
          },
        },
      };

      option.dataZoom = [theme.horizonalSlider] as any[];
    }

    if (!_.isEmpty(this.widget)) {
      if (this.widget.colorPalette) {
        option.color = theme.multiColorPalette[this.widget.colorTheme];
      } else {
        option.color = [theme.singleColorPalette[this.widget.colorTheme]];
      }
    }

    this.chart.setOption(option);
  }
}
</script>