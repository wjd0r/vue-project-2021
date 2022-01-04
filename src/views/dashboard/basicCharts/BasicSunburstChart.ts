import AbstractChart from '../ts/AbstractChart';
import { EChartOption } from 'echarts';

export interface ISunBurstChartDataSeries {
  name: string;
  values: {
    name: string;
    value?: number;
    children?: {
      name: string;
      value: number;
    }[];
  }[];
}

export interface ISunBurstChartData {
  series: { [key: string]: ISunBurstChartDataSeries };
}

export interface IBasicSunBurstChart {
  makeSeries(data: ISunBurstChartData): void;
}

export default class BasicSunBurstChart extends AbstractChart implements IBasicSunBurstChart {
  constructor(el: HTMLDivElement) {
    super(el);
  }

  makeSeries(data: ISunBurstChartData): void {
    let series: EChartOption.SeriesSunburst;

    for (const [key, value] of Object.entries(data.series)) {
      series = {
        type: 'sunburst',
        data: value.values,
        radius: [0, '100%'],
        emphasis: {
          label: {
            formatter: (params: any) => {
              const treePathInfo: any[] = params.treePathInfo;
              const index = treePathInfo.findIndex((item) => item.name === params.name);
              let name = '';
              if (index === 1) {
                name = params.name;
              } else if (index === 2) {
                const activity = treePathInfo[1].name;
                name = params.name.split(activity)[1];
              }

              return name;
            }
          }
        },
        levels: [
          {},
          {
            r0: '10%',
            r: '40%',
            itemStyle: {
              borderWidth: 2
            },
            label: {
              align: 'left'
            }
          },
          {
            r0: '40%',
            r: '75%',
            label: {
              position: 'outside',
              padding: 3,
              silent: false,
              color: 'auto',
              textBorderColor: 'transparent',
              formatter: (params: any) => {
                const activity = params.treePathInfo[1].name;
                const name = params.name.split(activity)[1];
                if (name.length > 8) {
                  return `${name.substring(0, 8)}...`;
                } else {
                  return name;
                }
              }
            }
          }
        ] as any
      };
    }

    this.setSeries(series as EChartOption.Series[]);
  }

  makeSampleSeries(data: ISunBurstChartData): void {
    let series: EChartOption.SeriesSunburst;

    for (const [key, value] of Object.entries(data.series)) {
      series = {
        type: 'sunburst',
        data: value.values,
        radius: [0, '80%'],
        levels: [
          {},
          {
            r0: '10%',
            r: '20%',
            itemStyle: {
              borderWidth: 2
            },
            label: {
              align: 'left'
            }
          },
          {
            r0: '20%',
            r: '60%',
            label: {
              position: 'outside',
              padding: 3,
              silent: false,
              color: 'auto',
              textBorderColor: 'transparent'
            }
          }
        ] as any
      };
    }
    this.setSeries(series as EChartOption.Series[]);
  }
}
