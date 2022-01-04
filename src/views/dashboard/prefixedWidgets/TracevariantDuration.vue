<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="$route.name !== 'DashboardEditor'" #right-align>
      <template v-if="!isNoData && !showLoading">
        <div class="ico-header ico-gantt" @click="onClickProcessFlow" alt="프로세스 흐름 아이콘"></div>
        <div class="ico-header ico-discovery" :class="{ disabled: selectedItem === '' }" @click="onClickProcessDiscovery" alt="프로세스 분석 아이콘"></div>
      </template>
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { EventBus } from '@/common';
import { IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { WidgetMixin } from '@/mixin';

import { BasicBarChart, BasicLineChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { TracevariantDurationData } from './SampleData';

@Component({})
export default class TracevariantDuration extends Mixins(WidgetMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicBarChart | BasicLineChart = null;

  // 평균 소요시간 상위 프로세스 그룹
  name: string = 'overview.chart.mean.duration.variant';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART', // 'LINE_CHART', 'BAR_CHART'
    dataParams: {},
  };

  selectedItem: string = '';

  sampleData = TracevariantDurationData;

  /* refs 선언 */

  /* Watch 선언 */

  @Watch('widget.widgetType')
  onChartTypeChanged(newValue: 'LINE_CHART' | 'BAR_CHART') {
    if (newValue !== this.data.widgetType) {
      this.data.widgetType = newValue;
      this.initChartClass(this.data.widgetType, this.chartWidget.getChartElement());
    }
    this.drawSampleChart();
  }

  @Watch('widget.colorTheme')
  onColorThemeChanged(newValue: number) {
    this.chart.setColor([theme.singleColorPalette[newValue]]);

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
      this.selectedItem = '';
    });

    this.$nextTick(() => {
      if (!this.isEditor) {
        this.chart.setEventHandler('click', (cell: any) => {
          this.selectedItem = cell.value[2];
          this.chart.chart.dispatchAction({
            type: 'downplay',
          });
          this.chart.chart.dispatchAction({
            type: 'highlight',
            dataIndex: cell.dataIndex,
          });
        });
      }
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
      this.dataFields = data.data;
      this.chart.makeSeries(data.data);
      this.chart.setHighlight();
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

  initChartOption() {
    const option: EChartOption = {
      color: [theme.singleColorPalette[theme.defaultSingleColorIndex]],
      tooltip: {
        show: true,
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          return `${params.marker} ${params.data[0].replace('Variant', this.$t('view.dashboard.tracevariantDuration.variant').toString())} : ${this.durationSymbol(params.data[1])}`;
        },
      },
      grid: theme.durationGrid.normal,
      legend: {
        show: false,
      },
      xAxis: {
        type: 'category',
        nameGap: 5,
        axisLabel: {
          formatter: (value: string) => {
            return value.replace('Variant', this.$t('view.dashboard.tracevariantDuration.variant').toString());
          },
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
      series: [],
    };

    if (!_.isEmpty(this.widget)) {
      option.color = [theme.singleColorPalette[this.widget.colorTheme]];
    }

    this.chart.setOption(option);
  }

  onClickProcessDiscovery() {
    if (this.selectedItem === '') {
      return;
    }

    this.$router.push({
      name: 'ProcessDiscovery',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'tracevariant-duration',
        variantId: this.selectedItem,
      },
    });
  }

  onClickProcessFlow() {
    this.$router.push({
      name: 'ProcessFlow',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'tracevariant-duration',
      },
    });
  }
}
</script>