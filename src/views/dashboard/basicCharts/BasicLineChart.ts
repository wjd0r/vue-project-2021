import AbstractChart from '../ts/AbstractChart';
import { EChartOption } from 'echarts';
import { IKeyValueObject } from '@/interface';
import _ from 'lodash';

export interface ILineChartDataSeries {
  name: string;
  values: (number | string)[][];
}

export interface ILineChartData {
  fields: string[];
  series: {
    [key: string]: ILineChartDataSeries;
  };
}

export interface IBasicLineChart {
  makeSeries(data: ILineChartData): void;
}

export default class BasicLineChart extends AbstractChart implements IBasicLineChart {
  constructor(el: HTMLDivElement) {
    super(el);
  }

  makeSeries(data: ILineChartData, itemStyle?: IKeyValueObject, lineStyle?: IKeyValueObject): void {
    const series: EChartOption.Series[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      const data: EChartOption.SeriesLine = {
        name: value.name,
        type: 'line',
        data: value.values,
        symbolSize: 8
      };

      if (itemStyle) {
        data.itemStyle = itemStyle;
      }

      data.lineStyle = _.merge(
        {
          width: 4
        },
        lineStyle
      );

      series.push(data);
    }

    this.setSeries(series);
  }

  makeXAxisSeries(data: ILineChartData, itemStyle?: IKeyValueObject, lineStyle?: IKeyValueObject): void {
    const series: EChartOption.Series[] = [];
    let xAxis: any[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      for (const item of value.values) {
        const xaxisItem = _.find(xAxis, (axis: string) => axis === item[0]);
        if (xaxisItem === undefined) {
          xAxis.push(item[0]);
        }
      }

      const newSeries: EChartOption.SeriesLine = {
        name: value.name,
        type: 'line',
        data: value.values,
        symbolSize: 8
      };

      if (itemStyle) {
        newSeries.itemStyle = itemStyle;
      }

      newSeries.lineStyle = _.merge(
        {
          width: 4
        },
        lineStyle
      );

      series.push(newSeries);
    }
    xAxis = _.sortBy(xAxis);
    this.setXAxis(xAxis);
    this.setSeries(series);
  }
}
