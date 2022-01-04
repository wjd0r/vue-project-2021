<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <template v-if="!isNoData && !showLoading">
        <div class="ico-header ico-table" @click="onClickTable" alt="케이스 테이블 아이콘"></div>
        <div class="ico-header ico-discovery" :class="{ disabled: data.dataParams.ci === '' }" @click="onClickProcessDiscovery" alt="프로세스 분석 아이콘"></div>
      </template>
    </template>
    <template #content>
      <!-- 테이블, 차트 -->
      <div class="w-100 h-100" :class="{ 'd-flex': !$mq.phone, 'd-flex-col': $mq.phone }">
        <div class="h-100" :class="{ 'w-25': !$mq.phone, 'w-100': $mq.phone }">
          <b-table-simple small caption-top responsive :sticky-header="table.length !== 0" class="text-center h-100">
            <b-thead>
              <b-tr>
                <b-th>{{ $t('view.dashboard.table.case') }}</b-th>
                <b-th>{{ $t('view.dashboard.table.duration') }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr :class="{ active: data.dataParams.ci === item.sname }" v-for="(item, index) in table" :key="'overview-table-case-duration-' + index" @click="onClickRow(item.sname)">
                <b-td>{{ item.sname }}</b-td>
                <b-td class="text-right">{{ toDDHHMMSS(item.stotal, $t('view.process.table.dayUnit').toString()) }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
        <b-overlay :show="showChartLoading || isNoChartData || (data.dataParams.ci === '' && $route.name !== 'DashboardEditor') || table.length === 0" class="h-100" :class="{ 'w-75': !$mq.phone, 'w-100': $mq.phone }" bg-color="#fff" opacity="1">
          <div ref="chart" class="content w-100 h-100"></div>
          <template #overlay>
            <div v-if="data.dataParams.ci === ''" style="text-align: center">{{ $t('view.dashboard.table.needClickRow') }}</div>
            <div v-else-if="isNoChartData" style="text-align: center">{{ $t('view.process.alert.Nodata') }}</div>
            <b-spinner v-else label="Spinning"></b-spinner>
          </template>
        </b-overlay>
      </div>
      <!-- 테이블, 차트 -->
      <!-- 테이블 -->
      <template v-if="!isEditor">
        <widget-table ref="widgetTable" v-model="showTable" :option="widgetTableOpion" :tableLoading.sync="tableLoading" @getCaseTableView="getCaseTableView" @onInputPage="onInputPage" @onDetailInputPage="onDetailInputPage" @downloadCSV="downloadCSV"></widget-table>
      </template>
      <!-- 테이블 -->
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IKeyValueObject, IWidgetDataConfiguration, IWidgetTableOption } from '@/interface';

import { AxiosResponse } from 'axios';
import { EChartOption } from 'echarts';
import _ from 'lodash';

import { WidgetMixin, UtilsMixin, WidgetTableMixin } from '@/mixin';

import Chart from '../ts/AbstractChart';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { CaseSectionDurationData } from './SampleData';

import WidgetTable from '../components/WidgetTable.vue';

@Component({
  components: {
    WidgetTable,
  },
  ...utils.getMq(),
} as any)
export default class CaseSectionDuration extends Mixins(WidgetMixin, WidgetTableMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: Chart = null;

  // 소요시간 Top 10 케이스 구간별 소요시간
  // 테이블
  // name: string = 'overview.table.case.duration';
  // 차트
  name: string = 'overview.chart.case.duration';

  tableData: IWidgetDataConfiguration = {
    _type: 'DataTableWidgetLiteImpl',
    id: 'overview.table.case.duration',
    widgetType: 'TABLE',
    dataParams: {
      nLimit: 10, // 상위 10개만
    },
  };

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART',
    dataParams: {
      ci: '',
    },
  };

  table: any[] = [];

  sampleData = CaseSectionDurationData;

  isNoChartData: boolean = false;
  showChartLoading: boolean = false;

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

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 
 created(){
   
 }
 */
  mounted() {
    this.chart = new Chart(this.$refs.chart);

    this.initChartOption();

    EventBus.$on('resetData', () => {
      this.table = [];
    });
  }

  beforeDestroy() {
    EventBus.$off('resetData');
  }

  /* 메소드 선언 */

  getWidgetData() {
    this.isNoData = false;
    this.showLoading = true;
    this.table = [];
    this.data.dataParams.ci = '';

    this.$store.dispatch('dashboard/getWidgetData', this.widgetConfigBuilder('tableData')).then((res: AxiosResponse) => {
      this.tableDataProcessing(res);
    });
  }

  getByDataUri(dataUri: string) {
    this.isNoData = false;
    this.showLoading = true;
    this.table = [];
    this.data.dataParams.ci = '';

    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.tableDataProcessing(res);
    });
  }

  requestBuilder() {
    return this.widgetConfigBuilder('tableData');
  }

  onClickRow(caseId: string) {
    if (!this.isEditor) {
      if (this.showChartLoading || this.data.dataParams.ci === caseId) {
        return;
      }
      this.isNoChartData = false;
      this.showChartLoading = true;
      this.data.dataParams.ci = caseId;
      this.$store.dispatch('dashboard/getWidgetData', this.widgetConfigBuilder('data')).then((res: AxiosResponse) => {
        this.dataProcessing(res);
      });
    } else {
      this.drawSampleChart();
    }
  }

  tableDataProcessing(res: any) {
    const data = res.data.data;
    if (data === null || data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    if (!this.isNoData) {
      this.table = _.values(data.data.results);
      this.onClickRow(this.table[0].sname);
    }
    this.showLoading = false;
  }

  dataProcessing(res: any) {
    const data = res.data.data;
    if (data === null || data === undefined) {
      this.isNoChartData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoChartData = true;
    } else {
      this.isNoChartData = false;
    }

    if (!this.isNoChartData) {
      this.dataFields = data.data?.fields;
      const seriesData: IKeyValueObject = data.data.series;

      const series: EChartOption.Series[] = [];

      for (const [key, value] of Object.entries(seriesData)) {
        const newSeries: EChartOption.SeriesBar | EChartOption.SeriesLine = {
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

      if (series.length === 1) {
        this.chart.chartOption.legend.show = false;
        this.chart.chartOption.grid = theme.durationGrid.oneBottomContent;
      } else {
        this.chart.chartOption.legend.show = true;
        this.chart.chartOption.grid = theme.durationGrid.twoBottomContent;
      }

      this.chart.setSeries(series);
      this.chart.drawChart();
    }

    this.showChartLoading = false;
  }

  get title() {
    if (_.isEmpty(this.widget)) {
      return this.$t(`view.dashboard.${this.name}`);
    } else {
      if (this.widget.widgetTitle && this.widget.widgetTitle !== '') {
        return this.widget.widgetTitle;
      } else {
        return this.$t(`view.dashboard.${this.name}`);
      }
    }
  }

  drawSampleChart() {
    this.table = this.sampleData.table;

    this.chart.setSeries(_.values(this.sampleData.series));

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
          if (params.length === 1) {
            return `${params[0].marker} ${params[0].data[0]} : ${this.durationSymbol(params[0].data[1])}`;
          } else {
            const string = [`${params[0].data[0]}`];
            params.forEach((element: any) => {
              string.push(`${element.marker} ${this.$t(`view.dashboard.caseSectionDuration.${element.seriesName}`)} : ${this.durationSymbol(element.data[1])}`);
            });
            return string.join('<br>');
          }
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

  onClickProcessDiscovery() {
    if (this.data.dataParams.ci === '') {
      return;
    }

    this.$router.push({
      name: 'ProcessDiscovery',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'case-section-duration',
        caseId: this.data.dataParams.ci,
      },
    });
  }
}
</script>