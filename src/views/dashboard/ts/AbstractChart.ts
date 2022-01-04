import store from '../../../store';
import echarts, { EChartOption, ECharts } from 'echarts';
import { EventBus } from '@/common';

export interface IChartWidget {
  el: HTMLDivElement;
  chart: ECharts | null;
  chartOption: EChartOption;
  chartEvent?: Function;
  drawChart(): void;
  resize(): void;
  setSeries(series: EChartOption.Series[]): void;
}

export default class ChartWidget implements IChartWidget {
  el: HTMLDivElement;

  chart: ECharts = null;

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  };

  chartEvent: Function;

  theme: string;

  constructor(el: HTMLDivElement) {
    this.el = el;

    this.theme = store.getters['sso/getColorTheme'] !== 'dark' ? 'light' : 'dark';

    EventBus.$on('resize', () => {
      this.resize();
    });
  }

  beforeDestroy() {
    EventBus.$off('resize');
  }

  drawChart(): void {
    if (this.chart === null) {
      this.chart = echarts.init(this.el, this.theme);
    }

    this.chart.setOption(this.chartOption, { notMerge: true });
    this.chart.resize();
  }

  resize(): void {
    if (this.chart) {
      this.chart.resize();
    }
  }

  setOption(option: EChartOption) {
    if (this.theme === 'dark') {
      option.backgroundColor = '#2A2A2A';
    }

    this.chartOption = option;
  }

  setSeries(series: EChartOption.Series[]): void {
    this.chartOption.series = series;
  }

  setXAxis(xAxis: any[]): void {
    (this.chartOption.xAxis as any).data = xAxis;
  }

  setColor(color: string[]): void {
    this.chartOption.color = color;
  }

  setEventHandler(eventName: string, handler: Function) {
    if (this.chart === null) {
      this.chart = echarts.init(this.el, this.theme);
    }

    this.chart.on(eventName, handler);
  }

  setHighlight() {
    for (const item of this.chartOption.series) {
      (item as any).emphasis = {
        itemStyle: {
          borderColor: 'red',
          borderWidth: 3,
        },
      };
    }
  }

  chartDestroy() {
    if (this.chart) {
      this.chart.off('click');
      this.chart.dispose();
    }
  }
}
