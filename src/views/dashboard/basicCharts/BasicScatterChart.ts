import AbstractChart from '../ts/AbstractChart';
import { EChartOption } from 'echarts';
import { IKeyValueObject } from '@/interface';

export interface IScatterChartDataSeries {
  name: string;
  values: number[][];
  markArea?: IKeyValueObject;
  markPoint?: IKeyValueObject;
  markLine?: IKeyValueObject;
}

export interface IScatterChartData {
  fields: string[];
  series: {
    [key: string]: IScatterChartDataSeries;
  };
}

export interface IBasicScatterChart {
  makeSeries(data: IScatterChartData): void;
}

export default class BasicScatterChart extends AbstractChart implements IBasicScatterChart {
  constructor(el: HTMLDivElement) {
    super(el);
  }

  makeSeries(data: IScatterChartData): void {
    const series: EChartOption.Series[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      series.push({
        name: value.name,
        type: 'scatter',
        data: value.values,
        markArea: value.markArea,
        markLine: value.markLine,
        markPoint: value.markPoint
      });
    }

    this.setSeries(series);
  }
}
