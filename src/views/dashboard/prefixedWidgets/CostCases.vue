<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :notHaveField="notHaveField" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <template v-if="!isNoData && !showLoading && !notHaveField">
        <div class="ico-header ico-table" @click="onClickTable" alt="케이스 테이블 아이콘"></div>
        <div class="ico-header ico-matrix" :class="{ disabled: data.dataParams.ci === '' }" @click="onClickMatrix()" alt="데이터 관계 분석 아이콘"></div>
      </template>
    </template>
    <template #content>
      <!-- 테이블, 차트 -->
      <div class="w-100 h-100" :class="{ 'd-flex': !$mq.phone, 'd-flex-col': $mq.phone }">
        <div class="h-100" :class="{ 'w-25': !$mq.phone, 'w-100': $mq.phone }">
          <b-table-simple small caption-top responsive :sticky-header="table.length !== 0" class="text-center h-500">
            <b-thead>
              <b-tr>
                <b-th>{{ $t('view.dashboard.table.case') }}</b-th>
                <b-th>{{ $t('view.dashboard.table.cost') }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr :class="{ active: data.dataParams.ci === item.sname }" v-for="(item, index) in table" :key="'cost-table-cases-' + index" @click="onClickRow(item.sname)">
                <b-td>{{ item.sname }}</b-td>
                <b-td>{{ numberWithCommas(item.stotal) }}</b-td>
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
        <widget-table v-if="!isEditor" ref="widgetTable" v-model="showTable" :option="widgetTableOpion" :tableLoading.sync="tableLoading" @getCaseTableView="getCaseTableView" @onInputPage="onInputPage" @onDetailInputPage="onDetailInputPage"></widget-table>
      </template>
      <!-- 테이블 -->
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IWidgetDataConfiguration, IWidgetTableOption } from '@/interface';

import { EChartOption } from 'echarts';
import { AxiosResponse } from 'axios';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin, WidgetTableMixin } from '@/mixin';

import { BasicBarChart, BasicLineChart } from '../basicCharts';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { CostCasesData } from './SampleData';

import WidgetTable from '../components/WidgetTable.vue';

@Component({
  components: {
    WidgetTable,
  },
  ...utils.getMq(),
} as any)
export default class CostCases extends Mixins(WidgetMixin, WidgetTableMixin, UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  chart: BasicBarChart | BasicLineChart = null;

  // 비용 발생 Top 10 케이스
  // 테이블
  // name: string = 'cost.table.cases';
  // 차트
  name: string = 'cost.chart.cases';

  tableData: IWidgetDataConfiguration = {
    _type: 'DataTableWidgetLiteImpl',
    id: 'cost.table.cases',
    widgetType: 'TABLE',
    dataParams: {
      nLimit: 10,
    },
  };

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART', // BAR_CHART , LINE_CHART
    dataParams: {
      ci: '',
    },
  };

  table: any[] = [];

  sampleData = CostCasesData;

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

  @Watch('widget.widgetType')
  onChartTypeChanged(newValue: 'LINE_CHART' | 'BAR_CHART') {
    if (newValue !== this.data.widgetType) {
      this.data.widgetType = newValue;
      this.initChartClass(this.data.widgetType, this.$refs.chart);
    }
    this.drawSampleChart();
  }

  @Watch('widget.colorPalette')
  onColorPaletteChanged(newValue: string) {
    this.chart.setColor([theme.singleColorPalette[theme.defaultSingleColorIndex]]);

    this.drawSampleChart();
  }

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    if (!_.isEmpty(this.widget)) {
      this.data.widgetType = this.widget.widgetType;
    }
    if (!this.isEditor) {
      if (!this.isFieldExist('en') && !this.isFieldExist('cn')) {
        this.notHaveField = true;
      }
    }
  }

  mounted() {
    this.initChartClass(this.data.widgetType, this.$refs.chart);

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
    if (this.$route.name === 'Dashboard') {
      if (this.showChartLoading) {
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

    this.showChartLoading = false;
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
    this.table = this.sampleData.table;

    const data = {
      fields: this.sampleData.fields,
      series: this.sampleData.series,
    };

    this.chart.makeSeries(data);

    this.chart.drawChart();
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
          return `${params[0].marker} ${params[0].data[0]}: ${this.numberWithCommas(params[0].data[1])}`;
        },
      },
      grid: theme.countGrid.oneBottomContent,
      xAxis: {
        type: 'category',
        nameGap: 5,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: string) => {
            return this.numberSymbol(value);
          },
        },
      },
      dataZoom: [theme.horizonalSlider] as any[],
      series: [],
    };

    this.chart.setOption(option);
  }

  onClickMatrix() {
    if (this.isNoData) {
      return;
    }

    if (this.data.dataParams.ci === '') {
      return;
    }

    this.$router.push({
      name: 'MatrixModel',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
      query: {
        from: 'cost-cases',
        caseId: this.data.dataParams.ci,
      },
    });
  }
}
</script>