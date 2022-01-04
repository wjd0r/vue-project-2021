import AbstractChart from '../ts/AbstractChart';
import { EChartOption } from 'echarts';
import _ from 'lodash';
import { IKeyValueObject } from '@/interface';

export interface IBoxPlotChartDataSeries {
  name: string;
  values: (string | number)[][];
}

export interface IBoxPlotChartData {
  fields: string[];
  series: {
    [key: string]: IBoxPlotChartDataSeries;
  };
}

export interface IBasicBoxPlotChart {
  makeSeries(data: IBoxPlotChartData): void;
}

export default class BasicBoxPlotChart extends AbstractChart implements IBasicBoxPlotChart {
  constructor(el: HTMLDivElement) {
    super(el);
  }

  makeSeries(data: IBoxPlotChartData, boxplotItemStyle?: IKeyValueObject, scatterItemStyle?: IKeyValueObject): void {
    const series: EChartOption.Series[] = [];
    const xAxis: any[] = [];

    for (const [key, value] of Object.entries(data.series)) {
      let data;
      if (key !== 'outlier') {
        data = value.values.map((item: (string | number)[]) => {
          const xaxisItem = _.find(xAxis, (axis: string) => axis === item[0]);
          if (xaxisItem === undefined) {
            xAxis.push(item[0]);
          }
          return [item[1], item[2], item[3], item[4], item[5]];
        });
      }

      const newSeries: EChartOption.SeriesBoxplot | EChartOption.SeriesScatter = {
        name: value.name,
        type: key !== 'outlier' ? 'boxplot' : 'scatter',
        data: key !== 'outlier' ? data : value.values,
      };

      if (key !== 'outlier') {
        newSeries.itemStyle = _.merge(
          {
            borderWidth: 2,
          },
          boxplotItemStyle
        );
      } else if (key === 'outlier' && scatterItemStyle) {
        newSeries.itemStyle = scatterItemStyle;
      }

      series.push(newSeries);
    }
    this.setXAxis(xAxis);
    this.setSeries(series);
  }
}
