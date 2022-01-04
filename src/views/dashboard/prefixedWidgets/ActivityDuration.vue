<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading"></chart-widget>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IKeyValueObject, IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { WidgetMixin } from '@/mixin';

import Chart from '../ts/AbstractChart';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { ActivityDurationData } from './SampleData';

@Component({})
export default class ActivityDuration extends Mixins(WidgetMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: Chart = null;

  // 액티비티 별 소요시간
  name: string = 'activity.chart.mean.duration';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART',
    dataParams: {},
  };

  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 
 created(){
   
 }
 */
  mounted() {
    this.chart = new Chart(this.chartWidget.getChartElement());

    this.initChartOption();
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
      const seriesData: IKeyValueObject = data.data.series;

      const series: EChartOption.Series[] = [];

      for (const [key, value] of Object.entries(seriesData)) {
        const newSeries: EChartOption.Series = {
          name: value.name,
          type: value.type,
          data: value.values,
        };

        if (value.name === 'standard') {
          (newSeries as EChartOption.SeriesLine).symbolSize = 8;
          (newSeries as EChartOption.SeriesLine).lineStyle = {
            width: 4,
          };
        }
        series.push(newSeries);
      }

      this.chart.setSeries(series);
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
    this.chart.setSeries(_.values(ActivityDurationData.series));

    this.chart.drawChart();
  }

  initChartOption() {
    const option: EChartOption = {
      // actual, standard
      color: this.isDarkTheme ? ['#656373', '#26B5DC'] : ['#8D8B9A', '#26B5DC'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          const string = [`${params[0].axisValue}`];
          for (const item of params) {
            string.push(`${item.marker} ${this.$t(`view.dashboard.caseSectionDuration.${item.seriesName}`)} : ${this.durationSymbol(item.data[1])}`);
          }
          return string.join('<br>');
        },
      },
      grid: theme.durationGrid.twoBottomContent,
      legend: {
        show: true,
        bottom: theme.legendTowBottom,
        formatter: (value: string) => {
          return this.$t(`view.dashboard.caseSectionDuration.${value}`).toString();
        },
      },
      xAxis: {
        type: 'category',
        nameGap: 5,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: string) => {
            return this.durationSymbolForAxis(value);
          },
        },
      },
      dataZoom: [theme.horizonalSlider] as any[],
      series: [],
    };

    this.chart.setOption(option);
  }
}
</script>