import AbstractChart from '../ts/AbstractChart';
import { EChartOption } from 'echarts';
import _ from 'lodash';

export interface IBarChartDataSeries {
  name: string;
  values: (number | string)[][];
}

export interface IBarChartData {
  fields: string[];
  series: {
    [key: string]: IBarChartDataSeries;
  };
}

export interface IBasicBarChart {
  makeSeries(data: IBarChartData): void;
}

export default class BasicBarChart extends AbstractChart implements IBasicBarChart {
  constructor(el: HTMLDivElement) {
    super(el);
  }

  makeSeries(data: IBarChartData): void {
    const series: EChartOption.Series[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      const data: EChartOption.SeriesBar = {
        name: value.name,
        type: 'bar',
        barGap: '0',
        data: value.values
      };

      series.push(data);
    }

    this.setSeries(series);
  }

  makeXAxisSeries(data: IBarChartData): void {
    const series: EChartOption.Series[] = [];
    let xAxis: any[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      for (const item of value.values) {
        const xaxisItem = _.find(xAxis, (axis: string) => axis === item[0]);
        if (xaxisItem === undefined) {
          xAxis.push(item[0]);
        }
      }

      const newSeries: EChartOption.SeriesBar = {
        name: value.name,
        type: 'bar',
        barGap: '0',
        data: value.values
      };

      series.push(newSeries);
    }
    xAxis = _.sortBy(xAxis);
    this.setXAxis(xAxis);
    this.setSeries(series);
  }
}
