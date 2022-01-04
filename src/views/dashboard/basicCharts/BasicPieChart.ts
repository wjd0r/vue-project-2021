import AbstractChart from '../ts/AbstractChart';
import { EChartOption } from 'echarts';
import { IKeyValueObject } from '@/interface';

export interface IPieChartDataSeries {
  name: string;
  values: {
    name: string;
    value: number;
  }[];
  label?: IKeyValueObject;
  itemStyle?: IKeyValueObject;
}

export interface IPieChartData {
  series: { [key: string]: IPieChartDataSeries };
}

export interface IBasicPieChart {
  makeSeries(data: IPieChartData): void;
  makeSeriesRose(data: IPieChartData): void;
}

export default class BasicPieChart extends AbstractChart implements IBasicPieChart {
  constructor(el: HTMLDivElement) {
    super(el);
  }

  makeSeries(data: IPieChartData): void {
    const series: EChartOption.SeriesPie[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      const data: EChartOption.SeriesPie = {
        type: 'pie',
        name: value.name,
        data: value.values,
        radius: [20, 100],
        roseType: 'area',
        center: ['50%', '50%'],
      };

      if (value.label) {
        data.label = value.label;
      }

      if (value.itemStyle) {
        data.itemStyle = value.itemStyle;
      }

      series.push(data);
    }

    this.setSeries(series);
  }

  makeSeriesRose(data: IPieChartData): void {
    const series: EChartOption.SeriesPie[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      const data: EChartOption.SeriesPie = {
        type: 'pie',
        name: value.name,
        data: value.values,
        radius: ['10%', '60%'],
        roseType: 'area',
      };

      if (value.label) {
        data.label = value.label;
      }

      if (value.itemStyle) {
        data.itemStyle = value.itemStyle;
      }

      series.push(data);
    }

    this.setSeries(series);
  }
}
