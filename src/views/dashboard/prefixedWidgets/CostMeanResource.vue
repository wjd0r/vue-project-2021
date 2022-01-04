<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :notHaveField="notHaveField" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <template v-if="!isNoData && !showLoading">
        <div class="ico-header ico-matrix" @click="onClickMatrix()" alt="데이터 관계 분석 아이콘"></div>
      </template>
    </template>
    <template #content>
      <!-- 차트 -->
      <div ref="chart" class="content w-100 h-100"></div>
      <!-- 차트 -->
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { IWidgetDataConfiguration, IWidgetTableOption } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin } from '@/mixin';

import { BasicBarChart, BasicLineChart, BasicPieChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { CostMeanResourceData } from './SampleData';

@Component({})
export default class CostMeanResource extends Mixins(WidgetMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicBarChart | BasicLineChart | BasicPieChart = null;

  // Top 10 리소스 별 평균 발생 비용
  name: string = 'cost.chart.avg.by.resource';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART', // BAR_CHART , LINE_CHART , PIE_CHART
    dataParams: {
      colName: 'er',
      nLimit: 10, // nLimit null일시  default값은 10
    },
  };

  sampleData = CostMeanResourceData;

  widgetTableOpion: IWidgetTableOption = {
    widgetName: this.name,
    title: this.title,
    detail: false,
    custom: false,
  };

  /* refs 선언 */
  $refs!: {
    chart: HTMLDivElement;
  };

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

    if (!this.isEditor) {
      if (!this.isFieldExist(['er', 'en'])) {
        this.notHaveField = true;
      }
    }
  }

  mounted() {
    this.initChartClass(this.data.widgetType, this.$refs.chart);
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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          switch (this.data.widgetType) {
            case 'LINE_CHART':
            case 'BAR_CHART': {
              return `${params[0].marker} ${params[0].data[0]}: ${this.numberWithCommas(params[0].data[1].toFixed(2))}`;
            }
            case 'PIE_CHART': {
              return `${params.marker} ${params.name} : ${this.numberWithCommas(params.value.toFixed(2))} (${this.numberWithCommas(params.percent)}%)`;
            }
          }
        },
      },
      grid: theme.normalGrid,
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
            return this.numberSymbol(value);
          },
        },
      };
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

  onClickMatrix() {
    if (this.isNoData) {
      return;
    }

    this.$router.push({
      name: 'MatrixModel',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'cost-mean-resource',
        variantId: this.variantId,
      },
    });
  }

}
</script>