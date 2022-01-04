import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '../common';

import _ from 'lodash';

import { IKeyValueObject, IWidgetConfiguration, IWidgetDataConfiguration, IClient, IWorkFlowRequestAction } from '../interface';
import { DashbaordTheme, IWidget } from '../views/dashboard/editor/dashboard-editor-service';

import ChartWidget from '../views/dashboard/components/ChartWidget.vue';
import { BasicBarChart, BasicBoxPlotChart, BasicLineChart, BasicPieChart, BasicScatterChart, BasicSunBurstChart } from '@/views/dashboard/basicCharts';
import { AxiosResponse } from 'axios';

@Component({
  components: {
    ChartWidget,
  },
  computed: mapGetters({
    variantId: 'common/getVariantId',
    eventView: 'repository/getRepoEventView',
    selectedTab: 'dashboard/getSelectedTab',
  }),
})
export default class WidgetMixin extends Vue {
  @Prop()
  widget?: IWidget;

  readonly variantId!: string;
  readonly eventView!: IKeyValueObject;
  readonly selectedTab!: string;

  chart: any = null;

  name: string = '';

  tableData?: IWidgetDataConfiguration;
  data: IWidgetDataConfiguration;

  dataFields: string[] = [];

  sampleData: any;

  notHaveField: boolean = false; // 필요한 매핑이 없을 때
  notHavePM: boolean = false; // 표준 프로세스가 없을 때
  isNoData: boolean = false;
  showLoading: boolean = false;

  isActionComplete: boolean = false;

  @Ref() chartWidget: ChartWidget;

  mounted() {
    EventBus.$on('getWidgetData', () => {
      this.getWidgetData();
    });

    EventBus.$on('showLoading', () => {
      this.showLoading = true;
    });

    EventBus.$on('setIsActionComplete', (value: boolean) => {
      this.isActionComplete = value;
      if (value === false) {
        this.isNoData = false;
      }
    });

    EventBus.$on('changeLocale', () => {
      if (this.chart) {
        this.setLocale();
        this.chart.drawChart();
      }
    });

    this.$nextTick(() => {
      if (this.$route.name === 'DashboardEditor') {
        this.drawSampleChart();
      }
    });
  }

  beforeDestroy() {
    EventBus.$off('getWidgetData');
    EventBus.$off('showLoading');
    EventBus.$off('setIsActionComplete');
    if (this.chart !== null) {
      this.chart.chartDestroy();
    }
  }

  initChartClass(type: string, element: HTMLDivElement) {
    switch (type) {
      case 'LINE_CHART': {
        this.chart = new BasicLineChart(element);
        break;
      }
      case 'BAR_CHART': {
        this.chart = new BasicBarChart(element);
        break;
      }
      case 'PIE_CHART': {
        this.chart = new BasicPieChart(element);
        break;
      }
      case 'BOXPLOT_CHART': {
        this.chart = new BasicBoxPlotChart(element);
        break;
      }
      case 'SUNBURST_CHART': {
        this.chart = new BasicSunBurstChart(element);
        break;
      }
      case 'SCATTER_CHART': {
        this.chart = new BasicScatterChart(element);
        break;
      }
    }
    this.initChartOption();
  }

  getWidgetData() {
    if (this.notHaveField || this.notHaveField) {
      return;
    }

    this.isNoData = false;
    this.showLoading = true;

    this.$store.dispatch('dashboard/getWidgetData', this.widgetConfigBuilder('data')).then((res: AxiosResponse) => {
      this.dataProcessing(res);
    });
  }

  getByDataUri(dataUri: string) {
    if (this.notHaveField || this.notHaveField) {
      return;
    }

    this.isNoData = false;
    this.showLoading = true;

    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.dataProcessing(res);
    });
  }

  dataProcessing(res: AxiosResponse) {
    return;
  }

  widgetConfigBuilder(dataName: 'data' | 'tableData'): IWidgetConfiguration[] {
    const eventFilters: any[] = [utils.buildTimeEventFilter()];
    const repository = utils.buildRepository(this);
    const data = this[dataName];

    if (this.variantId !== '---' && !_.isEmpty(this.variantId) && this.name !== 'overview.chart.mean.duration.variant') {
      eventFilters.push(utils.buildVariantFilter(repository, eventFilters[0], this.variantId));
    }

    const request: IWidgetConfiguration[] = [
      {
        _type: 'SqlDataWidgetConfiguration',
        repository: repository,
        eventFilters: eventFilters,
        data: data,
      },
    ];

    return request;
  }

  requestBuilder(): IKeyValueObject {
    return this.widgetConfigBuilder('data');
  }

  workflowActionBuilder(client: IClient, tab: string): IWorkFlowRequestAction {
    if (this.notHaveField) {
      return null;
    } else {
      return {
        _type: 'ServiceAction',
        id: `${tab}-${this.name}`,
        serviceId: 'data.discovery.dashboard.echarts',
        client: {
          ...client,
        },
        configurations: this.requestBuilder(),
      };
    }
  }

  drawSampleChart() {
    return;
  }

  initChartOption() {
    return;
  }

  setLocale() {
    return;
  }

  setColor() {
    if (this.widget.colorPalette) {
      this.chart.setColor(DashbaordTheme.multiColorPalette[this.widget.colorTheme]);
    } else {
      this.chart.setColor([DashbaordTheme.singleColorPalette[this.widget.colorTheme]]);
    }
  }

  numberSymbol(value: number | string) {
    let number = typeof value === 'string' ? parseInt(value, 10) : Number(value);
    const negative = number >= 0 ? false : true;
    const unitWords = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z'];
    const splitUnit = 1000;
    const splitCount = unitWords.length;
    let resultIndex = 0;
    let prevResoultString: number | string = 0;
    let resultString = 0;

    number = Math.abs(number);

    if (number >= 1) {
      for (let i = 0; i < splitCount; i++) {
        let unitResult = (number % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
          resultIndex = i;
          prevResoultString = resultString;
          resultString = unitResult;
        }
      }

      prevResoultString = prevResoultString.toString();
      for (let i = prevResoultString.length; i < 3; i++) {
        prevResoultString = `0${prevResoultString}`;
      }

      prevResoultString = prevResoultString.substring(0, 2);
      prevResoultString = prevResoultString.charAt(1) === '0' ? prevResoultString.substring(0, 1) : prevResoultString;

      return `${negative ? '-' : ''}${resultString}${Number(prevResoultString) !== 0 ? `.${prevResoultString}` : ''}${unitWords[resultIndex]}`;
    } else {
      return `${negative ? '-' : ''}${number.toString(2)}`;
    }
  }

  durationSymbol(value: number | string) {
    const time = typeof value === 'number' ? value.toString() : value;
    return utils.toYYYYMMDDHHMMSSbyDuration(time);
  }

  durationSymbolForAxis(value: number | string) {
    const text = this.durationSymbol(value);
    if (text.includes('M')) {
      return [text.substring(0, text.length - 9), text.substring(text.length - 8)].join('\n');
    } else {
      return text;
    }
  }

  isFieldExist(field: string | string[]) {
    return utils.isFieldExist(this.eventView, field);
  }

  getAxisName(unit: string) {
    return this.$t(`view.dashboard.unit.${unit}`).toString();
  }

  get isEditor() {
    return this.$route.name === 'DashboardEditor';
  }

  get isDarkTheme() {
    return this.$store.getters['sso/getColorTheme'] === 'dark';
  }
}
