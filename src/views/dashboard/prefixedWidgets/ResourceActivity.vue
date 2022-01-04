<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :notHaveField="notHaveField" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <div v-if="!isNoData && !showLoading" class="ico-header ico-matrix" @click="onClickMatrix" alt="데이터 분석 아이콘"></div>
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IWidgetDataConfiguration } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin } from '@/mixin';

import { BasicSunBurstChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { ResourceActivityData } from './SampleData';

@Component({})
export default class ResourceActivity extends Mixins(WidgetMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicSunBurstChart = null;

  // 액티비티 별 리소스
  name: string = 'resource.chart.resource.by.activity';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'SUNBURST_CHART',
    dataParams: {
      erLimit: 5, //resource count limit, default null
      eaLimit: 10, //activity count limit, default null
    },
  };

  sampleData = ResourceActivityData;

  /* refs 선언 */

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
    const { chart, sampleData } = this;
    chart.makeSampleSeries(sampleData);
    chart.drawChart();
  }

  initChartOption() {
    const option: EChartOption = {
      color: theme.multiColorPalette[this.isDarkTheme ? theme.defaultDarkThemeIndex : theme.defaultMultiColorIndex],
      tooltip: {
        show: true,
        formatter: (params: any | any[]) => {
          const treePathInfo: any[] = params.treePathInfo;
          const index = treePathInfo.findIndex((item) => item.name === params.name);
          let name = '';
          if (index === 1) {
            name = params.name;
          } else if (index === 2) {
            const activity = treePathInfo[1].name;
            name = params.name.split(activity)[1];
          }

          return `${params.marker} ${name} : ${this.numberWithCommas(params.value)}`;
        },
      },
      grid: theme.normalGrid,
    };

    if (this.$route.name === 'DashboardEditor') {
      option.tooltip.formatter = (params: any | any[]) => {
        return `${params.marker} ${params.name} : ${this.numberWithCommas(params.value)}`;
      };
    }

    this.chart.setOption(option);
  }

  onClickMatrix() {
    this.$router.push({
      name: 'MatrixModel',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'resource-activity',
        variantId: this.variantId,
      },
    });
  }
}
</script>