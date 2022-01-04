<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <div v-if="!isNoData && !showLoading" class="ico-header ico-logreplay" @click="onClickLogReplay" alt="프로세스 애니메이션 아이콘"></div>
    </template>
  </chart-widget>
</template>


<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin } from '@/mixin';

import { BasicBoxPlotChart, BasicLineChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { BottleneckStatisticData } from './SampleData';

@Component({})
export default class BottleneckStatistic extends Mixins(WidgetMixin, UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicBoxPlotChart | BasicLineChart = null;

  // 병목 구간 현황
  name: string = 'overview.chart.bottleneck';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BOXPLOT_CHART', // BOXPLOT_CHART , LINE_CHART (이번 버전에서는 사용하지 않음)
    dataParams: {
      outlierLimit: 2, //each x axis will show 5 outlier >= upper and 5 outlier <= lower outlier; optional, if not set default is 5
      arcLimit: 25, // 표준 프로세스 없을 경우, this is for maximum number of arcs shown (arc 긴 소요시간 기준); optional, if not set default is 25
    },
  };

  sampleData = BottleneckStatisticData;

  /* refs 선언 */

  @Watch('widget.widgetType')
  onChartTypeChanged(newValue: 'LINE_CHART' | 'BOXPLOT_CHART') {
    if (newValue !== this.data.widgetType) {
      this.data.widgetType = newValue;
      this.initChartClass(this.data.widgetType, this.chartWidget.getChartElement());
    }
    // this.drawSampleChart();
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

    if (!this.isEditor) {
      if (this.haveReferenceModel(this.eventView)) {
        delete this.data.dataParams.arcLimit;
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
    } else if (_.isEmpty(data.data.series)) {
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
    this.chart.makeSeries(this.sampleData[this.data.widgetType], {
      borderWidth: 2,
    });
    this.chart.drawChart();
  }

  initChartOption() {
    const option: EChartOption = {
      color: [theme.boxplotColorPalette[theme.defaultBoxplotColorIndex]],
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
      },
      grid: theme.durationGrid.oneBottomContent,
      legend: {
        show: false,
        bottom: theme.legendTowBottom,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          width: 10,
        },
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

    if (this.data.widgetType === 'LINE_CHART') {
      option.grid = theme.durationGrid.twoBottomContent;
      option.legend.show = true;
      option.tooltip.formatter = (params: any | any[]) => {
        const string = [`${params[0].axisValue}`];
        for (const item of params) {
          string.push(`${item.marker} ${item.seriesName}: ${this.durationSymbol(item.value[1])}`);
        }
        return string.join('<br>');
      };
    }

    if (this.data.widgetType === 'BOXPLOT_CHART') {
      option.tooltip.formatter = (params: any | any[]) => {
        const string = [`${params[0].axisValue}`];
        for (const item of params) {
          if (item.seriesName === 'bottleneck') {
            string.push(`${item.marker} UCL: ${this.durationSymbol(item.value[5])}`);
            string.push(`${item.marker} Q3: ${this.durationSymbol(item.value[4])}`);
            string.push(`${item.marker} Q2: ${this.durationSymbol(item.value[3])}`);
            string.push(`${item.marker} Q1: ${this.durationSymbol(item.value[2])}`);
            string.push(`${item.marker} LCL: ${this.durationSymbol(item.value[1])}`);
          } else {
            string.push(`${item.marker} Outlier: ${this.durationSymbol(item.value[1])}`);
          }
        }
        return string.join('<br>');
      };
    }

    if (!_.isEmpty(this.widget)) {
      if (this.widget.colorPalette) {
        option.color = theme.multiColorPalette[this.widget.colorTheme];
      } else {
        option.color = [theme.boxplotColorPalette[this.widget.colorTheme]];
      }
    }
    this.chart.setOption(option);
  }

  setColor() {
    if (this.widget.colorPalette) {
      this.chart.setColor(theme.multiColorPalette[this.widget.colorTheme]);
    } else {
      this.chart.setColor([theme.boxplotColorPalette[this.widget.colorTheme]]);
    }
  }

  onClickLogReplay() {
    this.$router.push({
      name: 'LogReplay',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'bottleneck-statistics',
        variantId: this.variantId,
      },
    });
  }
}
</script>