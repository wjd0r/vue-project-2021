import { ILineChartData } from '../basicCharts/BasicLineChart';
import { IBoxPlotChartData } from '../basicCharts/BasicBoxPlotChart';
import { IBarChartData } from '../basicCharts/BasicBarChart';
import { IPieChartData } from '../basicCharts/BasicPieChart';
import { IKeyValueObject } from '@/interface';

export const BottleneckStatisticData: IKeyValueObject = {
  BOXPLOT_CHART: {
    fields: ['xLegend', 'min', 'Q1', 'Q2', 'Q3', 'max'],
    series: {
      bottleneck: {
        name: 'bottleneck',
        values: [
          ['A->B', 864000, 1728000, 2592000, 3456000, 4320000],
          ['B->C', 864000, 1728000, 2592000, 4320000, 5184000],
          ['C->D', 0, 864000, 864000, 864000, 864000],
          ['D->F', 432000, 864000, 1296000, 2592000, 3456000],
        ],
      },
      outlier: {
        name: 'outlier',
        values: [
          ['A->B', 5184000],
          ['B->C', 432000],
        ],
      },
    },
  } as IBoxPlotChartData,
  LINE_CHART: {
    fields: ['xLegend', 'yLegend'],
    series: {
      min: {
        name: 'min',
        values: [
          ['A->B', 864000],
          ['B->C', 864000],
          ['C->D', 0],
          ['D->F', 432000],
        ],
      },
      Q1: {
        name: 'Q1',
        values: [
          ['A->B', 1728000],
          ['B->C', 1728000],
          ['C->D', 864000],
          ['D->F', 864000],
        ],
      },
      Q2: {
        name: 'Q2',
        values: [
          ['A->B', 2592000],
          ['B->C', 2592000],
          ['C->D', 864000],
          ['D->F', 1296000],
        ],
      },
      Q3: {
        name: 'Q3',
        values: [
          ['A->B', 3456000],
          ['B->C', 4320000],
          ['C->D', 864000],
          ['D->F', 2592000],
        ],
      },
      max: {
        name: 'max',
        values: [
          ['A->B', 4320000],
          ['B->C', 5184000],
          ['C->D', 864000],
          ['D->F', 3456000],
        ],
      },
      outlier: {
        name: 'outlier',
        values: [
          ['A->B', 5184000],
          ['B->C', 432000],
        ],
      },
    },
  } as ILineChartData,
};

export const CaseSectionDurationData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'real-duration': {
      name: 'actual',
      type: 'bar',
      data: [
        ['a-b', 350],
        ['b-c', 280],
        ['c-d', 50],
        ['d-e', 30],
        ['e-f', 0],
        ['f-g', 80],
      ],
    },
    'standard-duration': {
      name: 'standard',
      type: 'line',
      data: [
        ['a-b', 210],
        ['b-c', 180],
        ['c-d', 80],
        ['d-e', 30],
        ['e-f', 0],
        ['f-g', 90],
      ],
      symbolSize: 8,
      lineStyle: {
        width: 4,
      },
    },
  },
  table: [
    { sname: 'C1075821', stotal: 20521 },
    { sname: 'C1076829', stotal: 19331 },
    { sname: 'C2035649', stotal: 15942 },
    { sname: 'C1275821', stotal: 14351 },
    { sname: 'C8772823', stotal: 3688 },
  ],
};

export const TracevariantDurationData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Variant 2', 48],
        ['Variant 9', 46],
        ['Variant 7', 15],
        ['Variant 3', 11],
        ['Variant 8', 10],
        ['Variant 5', 8],
        ['Variant 6', 8],
        ['Variant 4', 8],
      ],
    },
  },
};

const ActiveCasesOverTimeMonthlyLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['2020-01', 500],
        ['2020-02', 579],
        ['2020-03', 489],
        ['2020-04', 530],
        ['2020-05', 568],
      ],
    },
  },
};

export const ActiveCasesOverTimeMonthlyData: IKeyValueObject = {
  BAR_CHART: ActiveCasesOverTimeMonthlyLineBarData as IBarChartData,
  LINE_CHART: ActiveCasesOverTimeMonthlyLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: '2020-03', value: 489 },
          { name: '2020-04', value: 530 },
          { name: '2020-05', value: 568 },
        ],
      },
    },
  } as IPieChartData,
};

const EventOverTimeDataLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['2018-01-31 03시', 250],
        ['2018-01-31 04시', 680],
        ['2018-01-31 05시', 580],
        ['2018-01-31 06시', 500],
        ['2018-01-31 07시', 690],
        ['2018-01-31 08시', 460],
        ['2018-01-31 09시', 640],
        ['2018-01-31 10시', 800],
        ['2018-01-31 11시', 570],
        ['2018-01-31 12시', 427],
        ['2018-01-31 13시', 462],
        ['2018-01-31 14시', 497],
        ['2018-01-31 15시', 527],
        ['2018-01-31 16시', 610],
        ['2018-01-31 17시', 752],
        ['2018-01-31 18시', 625],
        ['2018-01-31 19시', 498],
        ['2018-01-31 20시', 580],
        ['2018-01-31 21시', 620],
        ['2018-01-31 22시', 500],
        ['2018-01-31 23시', 560],
        ['2018-02-01 00시', 0],
      ],
    },
  },
};

export const EventOverTimeData: IKeyValueObject = {
  BAR_CHART: EventOverTimeDataLineBarData as IBarChartData,
  LINE_CHART: EventOverTimeDataLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: '2018-01-31 03시', value: 250 },
          { name: '2018-01-31 04시', value: 680 },
          { name: '2018-01-31 05시', value: 580 },
          { name: '2018-01-31 06시', value: 500 },
          { name: '2018-01-31 07시', value: 690 },
          { name: '2018-01-31 08시', value: 460 },
          { name: '2018-01-31 09시', value: 640 },
          { name: '2018-01-31 10시', value: 800 },
          { name: '2018-01-31 11시', value: 570 },
          { name: '2018-01-31 12시', value: 427 },
          { name: '2018-01-31 13시', value: 462 },
          { name: '2018-01-31 14시', value: 497 },
          { name: '2018-01-31 15시', value: 527 },
          { name: '2018-01-31 16시', value: 610 },
          { name: '2018-01-31 17시', value: 752 },
          { name: '2018-01-31 18시', value: 625 },
          { name: '2018-01-31 19시', value: 498 },
          { name: '2018-01-31 20시', value: 580 },
          { name: '2018-01-31 21시', value: 620 },
          { name: '2018-01-31 22시', value: 500 },
          { name: '2018-01-31 23시', value: 560 },
          { name: '2018-02-01 00시', value: 0 },
        ],
      },
    },
  } as IPieChartData,
};

const ActivitiesRatioLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['A', 19.75],
        ['B', 13.59],
        ['C', 11.85],
        ['D', 19.75],
        ['E', 19.75],
        ['F', 13.58],
      ],
    },
  },
};

export const ActivitiesRatioData: IKeyValueObject = {
  BAR_CHART: ActivitiesRatioLineBarData as IBarChartData,
  LINE_CHART: ActivitiesRatioLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'A', value: 19.75 },
          { name: 'B', value: 13.59 },
          { name: 'C', value: 11.85 },
          { name: 'D', value: 19.75 },
          { name: 'E', value: 19.75 },
          { name: 'F', value: 13.58 },
        ],
      },
    },
  } as IPieChartData,
};

export const CaseFreqTrendData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    A: {
      name: 'A',
      values: [
        ['2020-01', 15],
        ['2020-02', 900],
        ['2020-03', 578],
        ['2020-04', 157],
      ],
    },
  },
};

const ActivityFreqCounLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['A', 100],
        ['B', 100],
        ['C', 100],
        ['D', 100],
        ['E', 100],
      ],
    },
  },
};

export const ActivityFreqCountData: IKeyValueObject = {
  BAR_CHART: ActivityFreqCounLineBarData as IBarChartData,
  LINE_CHART: ActivityFreqCounLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'A', value: 100 },
          { name: 'B', value: 100 },
          { name: 'C', value: 100 },
          { name: 'D', value: 100 },
          { name: 'E', value: 100 },
        ],
      },
    },
  } as IPieChartData,
};

export const ActivityDurationData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'real-duration': {
      name: 'actual',
      type: 'bar',
      data: [
        ['a-b', 350],
        ['b-c', 280],
        ['c-d', 50],
        ['d-e', 30],
        ['e-f', 0],
        ['f-g', 80],
      ],
    },
    'standard-duration': {
      name: 'standard',
      type: 'line',
      data: [
        ['a-b', 210],
        ['b-c', 180],
        ['c-d', 80],
        ['d-e', 30],
        ['e-f', 0],
        ['f-g', 90],
      ],
      symbolSize: 8,
      lineStyle: {
        width: 4,
      },
    },
  },
};

export const ActivityFreqTrendData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    A: {
      name: 'A',
      values: [
        ['2020-01', 15],
        ['2020-02', 900],
        ['2020-03', 578],
        ['2020-04', 157],
      ],
    },
    B: {
      name: 'B',
      values: [
        ['2020-01', 15],
        ['2020-02', 936],
        ['2020-03', 589],
        ['2020-04', 27],
      ],
    },
    C: {
      name: 'C',
      values: [
        ['2020-01', 387],
        ['2020-02', 387],
        ['2020-03', 387],
        ['2020-04', 0],
      ],
    },
    D: {
      name: 'D',
      values: [
        ['2020-01', 387],
        ['2020-02', 387],
        ['2020-03', 387],
        ['2020-04', 0],
      ],
    },
    E: {
      name: 'E',
      values: [
        ['2020-01', 0],
        ['2020-02', 0],
        ['2020-03', 0],
        ['2020-04', 0],
      ],
    },
  },
};

const ActivityFreqStartRatioLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['A', 100],
        ['B', 100],
        ['C', 100],
        ['D', 100],
        ['E', 100],
      ],
    },
    match: {
      name: 'match',
      values: null,
    },
    notMatch: {
      name: 'notMatch',
      values: null,
    },
  },
};

export const ActivityFreqStartRatioData: IKeyValueObject = {
  BAR_CHART: ActivityFreqStartRatioLineBarData as IBarChartData,
  LINE_CHART: ActivityFreqStartRatioLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'A', value: 100 },
          { name: 'B', value: 100 },
          { name: 'C', value: 100 },
          { name: 'D', value: 100 },
          { name: 'E', value: 100 },
        ],
      },
      match: {
        name: 'match',
        values: null,
      },
      notMatch: {
        name: 'notMatch',
        values: null,
      },
    },
  } as IPieChartData,
};

export const ActivityFreqEndRatioData: IKeyValueObject = {
  BAR_CHART: ActivityFreqStartRatioLineBarData as IBarChartData,
  LINE_CHART: ActivityFreqStartRatioLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'A', value: 100 },
          { name: 'B', value: 100 },
          { name: 'C', value: 100 },
          { name: 'D', value: 100 },
          { name: 'E', value: 100 },
        ],
      },
      match: {
        name: 'match',
        values: null,
      },
      notMatch: {
        name: 'notMatch',
        values: null,
      },
    },
  } as IPieChartData,
};

export const ResourceActivityData = {
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        {
          name: 'Flora',
          children: [
            { name: 'Black Tea', value: 1 },
            { name: 'Floral', value: 1 },
          ],
        },
        {
          name: 'Fruity',
          value: 1,
        },
        {
          name: 'Sour/\nFermented',
          children: [
            { name: 'Sour', value: 1 },
            { name: 'Alcohol/\nFremented', value: 1 },
          ],
        },
        {
          name: 'Green/\nVegetative',
          children: [
            { name: 'Olive Oil', value: 1 },
            { name: 'Raw', value: 1 },
            { name: 'Green/\nVegetative', value: 1 },
            { name: 'Beany', value: 1 },
          ],
        },
        {
          name: 'Other',
          children: [
            { name: 'Papery/Musty', value: 1 },
            { name: 'Chemical', value: 1 },
          ],
        },
        {
          name: 'Roasted',
          children: [
            { name: 'Pipe Tobacco', value: 1 },
            { name: 'Tobacco', value: 1 },
            { name: 'Burnt', value: 1 },
            { name: 'Cereal', value: 1 },
          ],
        },
        {
          name: 'Spices',
          children: [
            { name: 'Pungent', value: 1 },
            { name: 'Pepper', value: 1 },
            { name: 'Brown Spice', value: 1 },
          ],
        },
        {
          name: 'Nutty/\nCocoa',
          children: [
            { name: 'Nutty', value: 1 },
            { name: 'Cocoa', value: 1 },
          ],
        },
        {
          name: 'Sweet',
          children: [
            { name: 'Brown Sugar', value: 1 },
            { name: 'Vanilla', value: 1 },
            { name: 'Vanillin', value: 1 },
            { name: 'Overall Sweet', value: 1 },
            { name: 'Sweet Aromatics', value: 1 },
          ],
        },
      ],
    },
  },
};

const ResourceFreqCountLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Resource 1', 348],
        ['Resource 2', 224],
        ['Resource 3', 75],
        ['Resource 4', 61],
        ['Resource 5', 34],
        ['Resource 6', 31],
        ['Resource 7', 28],
        ['Resource 8', 23],
      ],
    },
  },
};

export const ResourceFreqCountData: IKeyValueObject = {
  BAR_CHART: ResourceFreqCountLineBarData as IBarChartData,
  LINE_CHART: ResourceFreqCountLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'Resource 1', value: 348 },
          { name: 'Resource 2', value: 224 },
          { name: 'Resource 3', value: 75 },
          { name: 'Resource 4', value: 61 },
          { name: 'Resource 5', value: 34 },
          { name: 'Resource 6', value: 31 },
          { name: 'Resource 7', value: 28 },
          { name: 'Resource 8', value: 23 },
        ],
      },
    },
  } as IPieChartData,
};

const ResourceMeanDurationLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Resource 1', 348],
        ['Resource 2', 224],
        ['Resource 3', 75],
        ['Resource 4', 61],
        ['Resource 5', 34],
        ['Resource 6', 31],
        ['Resource 7', 28],
        ['Resource 8', 23],
      ],
    },
  },
};

export const ResourceMeanDurationData: IKeyValueObject = {
  BAR_CHART: ResourceMeanDurationLineBarData as IBarChartData,
  LINE_CHART: ResourceMeanDurationLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'Resource 1', value: 348 },
          { name: 'Resource 2', value: 224 },
          { name: 'Resource 3', value: 75 },
          { name: 'Resource 4', value: 61 },
          { name: 'Resource 5', value: 34 },
          { name: 'Resource 6', value: 31 },
          { name: 'Resource 7', value: 28 },
          { name: 'Resource 8', value: 23 },
        ],
      },
    },
  } as IPieChartData,
};

export const OriginatorActivityData = {
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        {
          name: 'Flora',
          children: [
            { name: 'Black Tea', value: 1 },
            { name: 'Floral', value: 1 },
          ],
        },
        {
          name: 'Fruity',
          value: 1,
        },
        {
          name: 'Sour/\nFermented',
          children: [
            { name: 'Sour', value: 1 },
            { name: 'Alcohol/\nFremented', value: 1 },
          ],
        },
        {
          name: 'Green/\nVegetative',
          children: [
            { name: 'Olive Oil', value: 1 },
            { name: 'Raw', value: 1 },
            { name: 'Green/\nVegetative', value: 1 },
            { name: 'Beany', value: 1 },
          ],
        },
        {
          name: 'Other',
          children: [
            { name: 'Papery/Musty', value: 1 },
            { name: 'Chemical', value: 1 },
          ],
        },
        {
          name: 'Roasted',
          children: [
            { name: 'Pipe Tobacco', value: 1 },
            { name: 'Tobacco', value: 1 },
            { name: 'Burnt', value: 1 },
            { name: 'Cereal', value: 1 },
          ],
        },
        {
          name: 'Spices',
          children: [
            { name: 'Pungent', value: 1 },
            { name: 'Pepper', value: 1 },
            { name: 'Brown Spice', value: 1 },
          ],
        },
        {
          name: 'Nutty/\nCocoa',
          children: [
            { name: 'Nutty', value: 1 },
            { name: 'Cocoa', value: 1 },
          ],
        },
        {
          name: 'Sweet',
          children: [
            { name: 'Brown Sugar', value: 1 },
            { name: 'Vanilla', value: 1 },
            { name: 'Vanillin', value: 1 },
            { name: 'Overall Sweet', value: 1 },
            { name: 'Sweet Aromatics', value: 1 },
          ],
        },
      ],
    },
  },
};

const OriginatorFreqCountLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Originator 1', 348],
        ['Originator 2', 224],
        ['Originator 3', 75],
        ['Originator 4', 61],
        ['Originator 5', 34],
        ['Originator 6', 31],
        ['Originator 7', 28],
        ['Originator 8', 23],
      ],
    },
  },
};

export const OriginatorFreqCountData: IKeyValueObject = {
  BAR_CHART: OriginatorFreqCountLineBarData as IBarChartData,
  LINE_CHART: OriginatorFreqCountLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'Originator 1', value: 348 },
          { name: 'Originator 2', value: 224 },
          { name: 'Originator 3', value: 75 },
          { name: 'Originator 4', value: 61 },
          { name: 'Originator 5', value: 34 },
          { name: 'Originator 6', value: 31 },
          { name: 'Originator 7', value: 28 },
          { name: 'Originator 8', value: 23 },
        ],
      },
    },
  } as IPieChartData,
};

const OriginatorMeanDurationLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Originator 1', 348],
        ['Originator 2', 224],
        ['Originator 3', 75],
        ['Originator 4', 61],
        ['Originator 5', 34],
        ['Originator 6', 31],
        ['Originator 7', 28],
        ['Originator 8', 23],
      ],
    },
  },
};

export const OriginatorMeanDurationData: IKeyValueObject = {
  BAR_CHART: OriginatorMeanDurationLineBarData as IBarChartData,
  LINE_CHART: OriginatorMeanDurationLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'Originator 1', value: 348 },
          { name: 'Originator 2', value: 224 },
          { name: 'Originator 3', value: 75 },
          { name: 'Originator 4', value: 61 },
          { name: 'Originator 5', value: 34 },
          { name: 'Originator 6', value: 31 },
          { name: 'Originator 7', value: 28 },
          { name: 'Originator 8', value: 23 },
        ],
      },
    },
  } as IPieChartData,
};

export const CostCasesData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['A', 120],
        ['B', 340],
        ['C', 80],
        ['D', 90],
        ['E', 40],
      ],
    },
  },
  table: [
    { sname: 'C1075821', stotal: 5000 },
    { sname: 'C1076829', stotal: 4000 },
    { sname: 'C2035649', stotal: 3000 },
    { sname: 'C1275821', stotal: 2000 },
    { sname: 'C8772823', stotal: 1000 },
  ],
};

const CostRatioByActivityLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['act1', 6],
        ['act2', 3],
        ['act3', 3],
        ['act4', 4],
      ],
    },
  },
};

export const CostRatioByActivityData: IKeyValueObject = {
  BAR_CHART: CostRatioByActivityLineBarData as IBarChartData,
  LINE_CHART: CostRatioByActivityLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'pie-1',
        values: [
          { name: 'act1', value: 6 },
          { name: 'act2', value: 3 },
          { name: 'act3', value: 2 },
          { name: 'act4', value: 2 },
        ],
      },
    },
  } as IPieChartData,
};

export const CaseDurationHistogramData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [{ value: ['0.11-2.07', 7] }, { value: ['2.07-4.03', 9] }, { value: ['4.03-5.98', 7] }, { value: ['5.98-7.94', 10] }],
    },
  },
};

const CostMeanResourceLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Resource 1', 1000000],
        ['Resource 2', 900000],
        ['Resource 3', 800000],
        ['Resource 4', 700000],
        ['Resource 5', 600000],
        ['Resource 6', 500000],
        ['Resource 7', 400000],
        ['Resource 8', 300000],
        ['Resource 9', 200000],
        ['Resource 10', 100000],
      ],
    },
  },
};

export const CostMeanResourceData: IKeyValueObject = {
  BAR_CHART: CostMeanResourceLineBarData as IBarChartData,
  LINE_CHART: CostMeanResourceLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'Resource 1', value: 1000000 },
          { name: 'Resource 2', value: 900000 },
          { name: 'Resource 3', value: 800000 },
          { name: 'Resource 4', value: 700000 },
          { name: 'Resource 5', value: 600000 },
          { name: 'Resource 6', value: 500000 },
          { name: 'Resource 7', value: 400000 },
          { name: 'Resource 8', value: 300000 },
          { name: 'Resource 9', value: 200000 },
          { name: 'Resource 10', value: 100000 },
        ],
      },
    },
  } as IPieChartData,
};

const CostMeanOriginatorLineBarData: ILineChartData | IBarChartData = {
  fields: ['xLegend', 'yLegend'],
  series: {
    'series-0': {
      name: 'series-0',
      values: [
        ['Originator 1', 1000000],
        ['Originator 2', 900000],
        ['Originator 3', 800000],
        ['Originator 4', 700000],
        ['Originator 5', 600000],
        ['Originator 6', 500000],
        ['Originator 7', 400000],
        ['Originator 8', 300000],
        ['Originator 9', 200000],
        ['Originator 10', 100000],
      ],
    },
  },
};

export const CostMeanOriginatorData: IKeyValueObject = {
  BAR_CHART: CostMeanOriginatorLineBarData as IBarChartData,
  LINE_CHART: CostMeanOriginatorLineBarData as ILineChartData,
  PIE_CHART: {
    series: {
      'series-0': {
        name: 'series-0',
        values: [
          { name: 'Originator 1', value: 1000000 },
          { name: 'Originator 2', value: 900000 },
          { name: 'Originator 3', value: 800000 },
          { name: 'Originator 4', value: 700000 },
          { name: 'Originator 5', value: 600000 },
          { name: 'Originator 6', value: 500000 },
          { name: 'Originator 7', value: 400000 },
          { name: 'Originator 8', value: 300000 },
          { name: 'Originator 9', value: 200000 },
          { name: 'Originator 10', value: 100000 },
        ],
      },
    },
  } as IPieChartData,
};
