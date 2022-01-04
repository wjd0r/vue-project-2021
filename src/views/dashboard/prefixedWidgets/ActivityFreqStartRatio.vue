<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading"></chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { IKeyValueObject, IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin } from '@/mixin';

import { BasicBarChart, BasicLineChart, BasicPieChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { ActivityFreqStartRatioData } from './SampleData';

@Component({})
export default class ActivityFreqStartRatio extends Mixins(WidgetMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicPieChart | BasicLineChart | BasicBarChart = null;

  // 시작 액티비티 비율
  name: string = 'activity.chart.start.ratio';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'PIE_CHART', // PIE_CHART , LINE_CHART , BAR_CHART
    dataParams: {},
  };

  sampleData = ActivityFreqStartRatioData;

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

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    if (!_.isEmpty(this.widget)) {
      this.data.widgetType = this.widget.widgetType;
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
      const havePM = this.haveReferenceModel(this.eventView);
      const series: IKeyValueObject = data.data.series;
      for (const [key, value] of Object.entries(series)) {
        const data: IKeyValueObject = value.values;
        for (const [dkey, dvalue] of Object.entries(data)) {
          if (dvalue.type && dvalue.type == 1) {
            dvalue['itemStyle'] = {
              color: this.chart.chartOption.color[1],
            };
          } else {
            dvalue['itemStyle'] = {
              color: this.chart.chartOption.color[0],
            };
          }
        }
      }

      if (havePM) {
        this.chart.chartOption.legend.show = true;

        series['match'] = {
          name: 'match',
          type: 'scatter',
          values: null,
          itemStyle: {
            color: this.chart.chartOption.color[1],
          },
        };

        series['notMatch'] = {
          name: 'notMatch',
          type: 'scatter',
          values: null,
          itemStyle: {
            color: this.chart.chartOption.color[0],
          },
        };

        if (this.data.widgetType !== 'PIE_CHART') {
          this.chart.chartOption.legend.bottom = theme.legendTowBottom;
          this.chart.chartOption.grid = theme.countGrid.twoBottomContent;
        } else {
          this.chart.chartOption.legend.bottom = theme.legendOneBottom;
        }
      } else {
        this.chart.chartOption.legend.show = false;
        if (this.data.widgetType !== 'PIE_CHART') {
          this.chart.chartOption.grid = theme.countGrid.oneBottomContent;
        }
      }

      if (this.data.widgetType !== 'PIE_CHART') {
        this.chart.makeSeries(data.data);
      } else {
        (this.chart as BasicPieChart).makeSeriesRose(data.data);
      }

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
    if (data.widgetType === 'PIE_CHART') {
      (chart as BasicPieChart).makeSeriesRose(sampleData[data.widgetType]);
    } else {
      chart.makeSeries(sampleData[data.widgetType]);
    }
    chart.drawChart();
  }

  initChartOption() {
    const option: EChartOption = {
      // not match, match
      color: this.isDarkTheme ? ['#656373', '#26B5DC'] : ['#8D8B9A', '#26B5DC'],
      tooltip: {
        trigger: this.data.widgetType === 'PIE_CHART' ? 'item' : 'axis',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          if (Array.isArray(params)) {
            return `${params[0].marker} ${params[0].data[0]}: ${this.numberWithCommas(params[0].data[1])}`;
          } else {
            return `${params.marker} ${params.name} : ${this.numberWithCommas(params.value)} (${this.numberWithCommas(params.percent)}%)`;
          }
        },
      },
      legend: {
        show: !this.isEditor ? false : true,
        data: ['match', 'notMatch'],
        type: 'scroll',
        bottom: theme.legendOneBottom,
        selectedMode: false,
        formatter: (value: string) => {
          return this.$t(`view.dashboard.activityFreqRatio.${value}`).toString();
        },
      },
      grid: this.data.widgetType === 'PIE_CHART' ? theme.normalGrid : theme.countGrid.oneBottomContent,
      series: [],
    };

    if (this.data.widgetType === 'LINE_CHART' || this.data.widgetType === 'BAR_CHART') {
      option.xAxis = {
        type: 'category',
        nameGap: 5,
      };

      option.yAxis = {
        type: 'value',
        name: this.getAxisName('number'),
        axisLabel: {
          formatter: (value: string) => {
            return this.numberSymbol(value);
          },
        },
      };

      option.dataZoom = [theme.horizonalSlider] as any[];

      if (this.isEditor) {
        option.legend.bottom = theme.legendTowBottom;
        option.grid = theme.countGrid.twoBottomContent;
      }
    }

    this.chart.setOption(option);
  }

  setLocale() {
    if (this.data.widgetType === 'LINE_CHART' || this.data.widgetType === 'BAR_CHART') {
      if (Array.isArray(this.chart.chartOption.yAxis)) {
        this.chart.chartOption.yAxis[0].name = this.getAxisName('number');
      } else {
        this.chart.chartOption.yAxis.name = this.getAxisName('number');
      }
    }
  }
}
</script>