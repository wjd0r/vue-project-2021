<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component" bg-color="#fff" opacity="1" no-fade>
    <div v-if="isMobile()" class="ag-pagination">
      <div class="page-button">
        <b-pagination v-model="page" :total-rows="totalRows" :per-page="perPage" :limit="limit" :hide-ellipsis="true" align="center" @input="onInputPage()" />
      </div>
    </div>
    <div id="flow-chart" class="chart w-100" style="height: calc(100% - 30px)"></div>
    <div v-if="!isMobile()" class="ag-pagination" style="margin-top: -14px">
      <div class="page-button">
        <b-pagination v-model="page" :total-rows="totalRows" :per-page="perPage" :limit="limit" :hide-ellipsis="true" align="center" @input="onInputPage()" :disabled="showLoading" />
      </div>
    </div>
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
      </template>
      <template v-else-if="isNoData">{{ $t('view.process.alert.variantNodata') }}</template>
      <b-spinner v-else label="Spinning"></b-spinner>
    </template>
  </b-overlay>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { IClient, IWorkFlowRequestAction } from '@/interface';

import { AnalysisMixin, UtilsMixin } from '@/mixin';

import { AxiosResponse } from 'axios';
import echarts, { EChartOption, ECharts } from 'echarts';
import _ from 'lodash';

import { DashbaordTheme } from '@/views/dashboard/editor/dashboard-editor-service';

@Component({
  components: {},
  computed: mapGetters({
    colorTheme: 'sso/getColorTheme',
  }),
})
export default class FlowChart extends Mixins(AnalysisMixin, UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  readonly colorTheme: string;
  /* 클래스 변수 선언 */
  chart: ECharts = null;

  page: number = 1;
  totalRows: number = 0;
  perPage: number = 50;
  limit: number = 5;

  selectedVariant = '';

  types: { [key: string]: string } = {};
  readonly color = ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'];

  variantDimensions: string[] = [];
  variantDataDimensions: string[] = [];

  dimensions = {
    INDEX: 'Index',
    VARIANT_ID: 'Variant ID',
    VARIANT_NAME: 'Variant Name',
    VARIANT_INDEX: 'Variant Index',
    SUB_VARIANT_INDEX: 'Sub Variant Index',
    CASE_COUNT: 'Case Count',
    CASE_MIN_DURATION: 'Case Min Duration',
    CASE_AVG_DURATION: 'Case Average Duration',
    CASE_MAX_DURATION: 'Case Max Duration',
    FITNESS: 'Fitness',
    ACTIVITY: 'Activity',
    ACTIVITY_MIN_START_TIME: 'Activity Min Start Time',
    ACTIVITY_MAX_COMPLETE_TIME: 'Activity Max Complete Time',
    ACTIVITY_MIN_DURATION: 'Activity Min Duration',
    ACTIVITY_AVG_DURATION: 'Activity Average Duration',
    ACTIVITY_MAX_DURATION: 'Activity Max Duration',
  };

  readonly multilingual = {
    ea: this.$t('view.process.flow.chart.tooltip.ea'),
    ccnt: this.$t('view.process.flow.chart.tooltip.ccnt'),
    minStartTime: this.$t('view.process.flow.chart.tooltip.minStartTime'),
    maxCompleteTime: this.$t('view.process.flow.chart.tooltip.maxCompleteTime'),
    meanTime: this.$t('view.process.flow.chart.tooltip.meanTime'),
    variant: {
      title: this.$t('view.process.flow.chart.tooltip.variant.title'),
      content: this.$t('view.process.flow.chart.tooltip.variant.content'),
    },
    minDuration: this.$t('view.process.flow.chart.tooltip.minDuration'),
    maxDuration: this.$t('view.process.flow.chart.tooltip.maxDuration'),
    meanDuration: this.$t('view.process.flow.chart.tooltip.meanDuration'),
    fitness: this.$t('view.process.flow.chart.axis.fitness'),
  };

  isFirst: boolean = true;

  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    window.addEventListener('resize', this.resize);

    if (this.isMobile()) {
      this.limit = 3;
    }
  }

  mounted() {
    EventBus.$on('resize', () => this.resize());

    this.$nextTick(() => {
      const el = document.getElementById('flow-chart') as HTMLDivElement;
      this.chart = echarts.init(el, this.colorTheme !== 'dark' ? 'light' : 'dark');
      this.chart.on(this.isMobile() ? 'click' : 'dblclick', { seriesIndex: 1 }, (cell: any) => {
        this.selectedVariant = cell.data.value[this.getVariantDimensionIndex(this.dimensions.VARIANT_NAME)];
        this.$emit('cellDoubleClick', cell.data.value[this.getVariantDimensionIndex(this.dimensions.VARIANT_ID)], this.selectedVariant);
        this.chart.setOption(this.chart.getOption(), { notMerge: true });
      });
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    EventBus.$off('resize');
  }
  /* 메소드 선언 */

  getChartData(page?: number) {
    this.selectedVariant = '';
    this.showLoading = true;

    this.$emit('offHighlight');

    const data = this.requestBuilder(page);
    this.$store.dispatch('gantt/getGanttChartData', data).then((res: AxiosResponse) => {
      this.drawChart(res);
    });
  }

  getByDataUri(dataUri: string) {
    this.selectedVariant = '';
    if (this.isFirst) {
      this.isFirst = false;
    }
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.drawChart(res);
    });
  }

  getVariantDimensionIndex(dimension: string) {
    return this.variantDimensions.findIndex((item) => {
      return item === dimension;
    });
  }

  getVariantDataDimensionIndex(dimension: string) {
    return this.variantDataDimensions.findIndex((item) => {
      return item === dimension;
    });
  }

  drawChart(res: any) {
    const data: any = res.data.data;

    this.isNoData = false;

    this.chart.clear();

    if (_.isEmpty(data)) {
      this.isNoData = true;
    } else if (_.isEmpty(data?.series)) {
      this.isNoData = true;
    } else if (_.isEmpty(data.series?.variant) || _.isEmpty(data.series?.variantData)) {
      this.isNoData = true;
    } else if (_.isEmpty(data.series.variant?.data) || _.isEmpty(data.series.variantData?.data)) {
      this.isNoData = true;
    }

    if (this.isNoData) {
      this.showLoading = false;
      return;
    }

    this.totalRows = data.totalElements;

    const svariant = data.series.variant;
    const svariantData = data.series.variantData;

    this.variantDimensions = ['Index'].concat(svariant.dimensions);
    this.variantDataDimensions = ['Index', 'Activity'].concat(svariantData.dimensions);

    this.types = {};
    const act: any[] = [...new Set(svariantData.data.map((item: any) => item.name))];
    let colorIndex = 0;
    for (let i = 0; i < act.length; i++) {
      this.types[act[i]] = this.color[colorIndex];
      colorIndex++;
      if (colorIndex >= 13) colorIndex = 0;
    }

    for (let i = 0; i < svariant.data.length; i++) {
      svariant.data[i].value = [i].concat(svariant.data[i].value);
    }

    for (const activity of svariantData.data) {
      const vdIndex = activity.value[this.getVariantDataDimensionIndex(this.dimensions.VARIANT_INDEX) - 2];
      const vdSubIndex = activity.value[this.getVariantDataDimensionIndex(this.dimensions.SUB_VARIANT_INDEX) - 2];
      const variant = _.find(svariant.data, (item: any) => {
        const vIndex = item.value[this.getVariantDimensionIndex(this.dimensions.VARIANT_INDEX)];
        const vSubIndex = item.value[this.getVariantDimensionIndex(this.dimensions.SUB_VARIANT_INDEX)];
        if (vIndex === vdIndex && vSubIndex === vdSubIndex) {
          return item;
        }
      });

      if (variant) {
        activity.value = [variant.value[this.getVariantDimensionIndex(this.dimensions.INDEX)], activity.name].concat(activity.value);
        activity.itemStyle = {
          color: this.types[activity.name],
        };
      }
    }

    const option = this.getChartOption(svariantData, svariant);
    option.dataZoom[2].end = this.changeYscrollZoom(svariant.data.length);

    option.legend.data = act;
    for (const ea of act) {
      option.series.push({
        name: ea,
        type: 'scatter',
        data: null,
        itemStyle: {
          color: this.types[ea],
        },
      });
    }

    this.chart.setOption(option, { notMerge: true });
    this.showLoading = false;
  }

  requestBuilder(page?: number) {
    return [
      {
        _type: 'TraceVariantDiscoveryLiteConfiguration',
        repository: {
          id: this.$route.params.repositoryId,
          _type: 'EventRepository',
          project: {
            id: this.$route.params.projectId,
            _type: 'Project',
          },
        },
        eventFilters: [utils.buildTimeEventFilter()],
        option: this.filter.variantType,
        sortBy: this.filter.sortBy,
        sortDirection: this.filter.sortDirection,
        excludeNull: false,
        page: page ? page - 1 : 0,
        size: this.perPage,
      },
    ];
  }

  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'chart',
      serviceId: 'process.analysis.trace.variant.echarts',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  renderItem(params: any, api: any) {
    const getVDIndex = this.getVariantDataDimensionIndex;
    const dimensions = this.dimensions;

    const echart: any = echarts;
    const categoryIndex = api.value(getVDIndex(dimensions.INDEX));
    const start = api.coord([api.value(getVDIndex(dimensions.ACTIVITY_MIN_START_TIME)), categoryIndex]);
    const end = api.coord([api.value(getVDIndex(dimensions.ACTIVITY_MAX_COMPLETE_TIME)), categoryIndex]);
    const height = api.size([0, 1])[1] * 0.8;
    let activityName = api.value(getVDIndex(dimensions.ACTIVITY));

    const rect = {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height,
    };

    const rectParams = {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    };

    const rectShape = echart.graphic.clipRectByRect(rect, rectParams);

    if (rect.width - 8 < echart.format.getTextRect(activityName).width) {
      while (rect.width - 13 < echart.format.getTextRect(activityName).width) {
        activityName = activityName.substring(0, activityName.length - 1);
      }
      activityName += '...';
    }

    return {
      type: 'group',
      children: [
        {
          type: 'rect',
          shape: rectShape,
          style: api.style(),
        },
        {
          type: 'text',
          position: [rect.x, rect.y],
          style: api.style({
            x: 4,
            y: height / 2,
            text: activityName,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            textFill: '#000',
          }),
        },
      ],
    };
  }

  yAxisRenderItem(params: any, api: any) {
    const getVIndex = this.getVariantDimensionIndex;
    const dimensions = this.dimensions;
    const multilingual = this.multilingual;

    const echart: any = echarts;
    const y = api.coord([0, api.value(0)])[1];
    const height = api.size([0, 1])[1];

    const rect = {
      x: 25,
      y: 0 - height / 2,
      width: 93,
      height: height,
    };

    const rectShape = echart.graphic.clipRectByRect(rect, rect);
    let variantTitle = '';

    if (this.filter && this.filter.variantType === 'STANDARD') {
      variantTitle = `${multilingual.variant.content} ${api.value(getVIndex(dimensions.VARIANT_NAME)).split(' ')[1]}`;
    } else {
      variantTitle = api.value(getVIndex(dimensions.VARIANT_NAME));
    }

    const textValue = [variantTitle, `${this.numberWithCommas(api.value(getVIndex(dimensions.CASE_COUNT)))}`, `${multilingual.fitness} ${(api.value(getVIndex(dimensions.FITNESS)) * 100).toFixed(2)}%`];
    let variantText = '';

    if (height < 35) {
      variantText = `${textValue[0]}`;
    } else if (35 <= height && height < 50) {
      variantText = `${textValue[0]}\n(${textValue[1]})`;
    } else {
      variantText = `${textValue[0]}\n(${textValue[1]}\n${textValue[2]})`;
    }

    const children: any = [
      {
        type: 'rect',
        shape: rectShape,
        invisible: true,
      },
      {
        type: 'text',
        style: {
          x: 110,
          y: 0,
          height: height,
          text: variantText,
          textVerticalAlign: 'middle',
          textAlign: 'right',
          textFill: this.colorTheme !== 'dark' ? '#000' : '#fff',
        },
      },
    ];

    if (this.selectedVariant === api.value(getVIndex(dimensions.VARIANT_NAME))) {
      children.splice(1, 0, {
        type: 'rect',
        shape: {
          x: rect.x,
          y: rect.y,
          width: params.coordSys.width + 10 + 50 + 31,
          height: height,
        },
        silent: true,
        style: {
          fill: 'transparent',
          stroke: '#26B5DC',
        },
      });
    }

    return {
      type: 'group',
      position: [25, y],
      children: children,
    };
  }

  getChartOption(variantData: any, variant: any): EChartOption {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        show: true,
        transitionDuration: 0,
        formatter: (params: any | any[0]) => {
          const getVIndex = this.getVariantDimensionIndex;
          const getVDIndex = this.getVariantDataDimensionIndex;
          const dimensions = this.dimensions;

          const value = params.value;
          const string: string[] = [];
          const multilingual = this.multilingual;
          if (params.componentIndex === 0) {
            string.push(`${params.marker} ${params.name}`);
            let variantTitle = '';
            if (this.filter && this.filter.variantType === 'STANDARD') {
              variantTitle = value[getVDIndex(dimensions.VARIANT_NAME)].replace('Variant', multilingual.variant.content);
            } else {
              variantTitle = value[getVDIndex(dimensions.VARIANT_NAME)];
            }
            string.push(`${multilingual.variant.title} : ${variantTitle}`);
            string.push(`${multilingual.ccnt} : ${this.numberWithCommas(value[getVDIndex(dimensions.CASE_COUNT)])}`);
            string.push(`${multilingual.meanDuration} : ${this.toDDHHMMSS(value[getVDIndex(dimensions.ACTIVITY_AVG_DURATION)], 'D')}`);
          } else if (params.componentIndex === 1) {
            let variantTitle = '';
            if (this.filter && this.filter.variantType === 'STANDARD') {
              variantTitle = `${multilingual.variant.content} ${value[getVIndex(dimensions.VARIANT_NAME)].split(' ')[1]}`;
            } else {
              variantTitle = value[getVIndex(dimensions.VARIANT_NAME)];
            }
            string.push(variantTitle);
            string.push(`${multilingual.ccnt} : ${this.numberWithCommas(value[getVIndex(dimensions.CASE_COUNT)])}`);
            string.push(`${multilingual.minDuration} : ${this.toDDHHMMSS(value[getVIndex(dimensions.CASE_MIN_DURATION)], 'D')}`);
            string.push(`${multilingual.meanDuration} : ${this.toDDHHMMSS(value[getVIndex(dimensions.CASE_AVG_DURATION)], 'D')}`);
            string.push(`${multilingual.maxDuration} : ${this.toDDHHMMSS(value[getVIndex(dimensions.CASE_MAX_DURATION)], 'D')}`);
          }
          return string.join('<br>');
        },
      },
      grid: {
        top: '20px',
        bottom: '85px',
        left: '142px',
        right: '73px',
      },
      legend: {
        type: 'scroll',
        data: [],
        bottom: '30px',
        left: '152px',
        right: '90px',
        selectedMode: false,
      },
      xAxis: {
        show: false,
        min: 0,
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: { show: false },
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: 0,
          end: 100,
          height: 20,
          bottom: '62px',
          ...DashbaordTheme.sliderHandle,
          showDetail: false,
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          zoomOnMouseWheel: false,
        },
        {
          type: 'slider',
          yAxisIndex: 0,
          start: 0,
          end: 10,
          width: 20,
          right: '50px',
          ...DashbaordTheme.sliderHandle,
          showDetail: false,
        },
        {
          type: 'inside',
          yAxisIndex: 0,
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
        },
      ] as any[],
      series: [
        {
          type: 'custom',
          renderItem: this.renderItem,
          itemStyle: {
            opacity: 0.8,
          },
          dimensions: variantData.dimensions,
          encode: {
            x: [this.getVariantDataDimensionIndex(this.dimensions.ACTIVITY_MIN_START_TIME), this.getVariantDataDimensionIndex(this.dimensions.ACTIVITY_MAX_COMPLETE_TIME)],
            y: this.getVariantDataDimensionIndex(this.dimensions.INDEX),
          },
          z: 3,
          data: variantData.data,
        },
        {
          type: 'custom',
          renderItem: this.yAxisRenderItem,
          dimensions: variant.dimensions,
          encode: {
            x: -1, // Then this series will not controlled by x.
            y: 0,
          },
          z: 2,
          data: variant.data,
        },
      ],
    };
  }

  changeYscrollZoom(dataLen: number) {
    switch (true) {
      case dataLen >= 100:
        return 15;
      case dataLen >= 75 && dataLen < 100:
        return 30;
      case dataLen >= 50 && dataLen < 75:
        return 45;
      case dataLen >= 35 && dataLen < 50:
        return 60;
      case dataLen >= 20 && dataLen < 35:
        return 75;
      case dataLen >= 5 && dataLen < 20:
        return 90;
      default:
        return 100;
    }
  }

  resize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  removeHighlight() {
    this.selectedVariant = '';
    this.chart.setOption(this.chart.getOption(), { notMerge: true });
  }

  onInputPage() {
    this.getChartData(this.page);
  }

  resetChart() {
    this.page = 1;
    this.totalRows = 0;
  }

  showOverlay() {
    return this.isNoData || this.showLoading || this.checkFilterHaveOnlyDuration;
  }
}
</script>