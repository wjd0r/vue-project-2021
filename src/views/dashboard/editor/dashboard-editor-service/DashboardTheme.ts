import { IWdigetAttributes } from './IDashboardEditorService';

export const colNum = 8;
export const rowHeight = 120;

export const singleColorPalette = ['#29B6F6', '#9768D1', '#F29F05', '#628395', '#05C2AB', '#FFA0A0', '#50BF77', '#F2441D', '#835151', '#7A69DB', '#035AA6', '#03A6A6', '#4A608C', '#FFC90D', '#8D8B9A', '#31869E', '#F14E42', '#26B5DC', '#7952B3', '#6692F7'];

export const multiColorPalette = [
  ['#81D4FA', '#29B6F6', '#039BE5', '#1976D2', '#0D47A1', '#A7D5F2', '#77ACF2', '#75BFB2', '#1976D2', '#27418C'], // 파랑
  ['#D4B6F2', '#B298E3', '#926DD7', '#52318F', '#2F0F6A', '#9768D1', '#7B52AB', '#553285', '#36175E', '#25064C'], // 보라
  ['#50BF77', '#2F734C', '#FCAB55', '#BF7B54', '#023B47', '#A0D9D3', '#038C7F', '#B64926', '#F2A922', '#295E52'], // 초원
  ['#4C594E', '#785441', '#F2A341', '#4D7876', '#91C5C3', '#FAC1A5', '#E9815F', '#75BFB2', '#2D7572', '#C4A391'], // 해질녘
  ['#05C2AB', '#7A69DB', '#4EC3E4', '#FFC90D', '#FC65D7', '#035AA6', '#525EFF', '#F29F05', '#3A758C', '#AE0CE8'], // 무지개
];

export const boxplotColorPalette = ['#ADD90D', '#05C2AB', '#03A696', '#1F98A6', '#78A663', '#5ADCDE', '#26B5DC', '#0597F2', '#525EFF', '#5C8EF2', '#F25C5C', '#FC65D7', '#F22786', '#AE0CE8', '#9C1BF2', '#F29F05', '#EE7F38', '#E86B0C', '#E65100', '#B64926'];

export const defaultSingleColorIndex = 0;
export const defaultMultiColorIndex = 3;
export const defaultBoxplotColorIndex = 7;
export const defaultDarkThemeIndex = 4;

export const normalGrid = {
  top: '12px',
  left: '40px',
  bottom: '30px',
  right: '30px',
};

export const countGrid = {
  normal: {
    top: '30px',
    left: '40px',
    bottom: '30px',
    right: '30px',
  },
  oneBottomContent: {
    top: '30px',
    left: '40px',
    bottom: '58px',
    right: '30px',
  },
  twoBottomContent: {
    top: '30px',
    left: '40px',
    bottom: '80px',
    right: '30px',
  },
};

export const durationGrid = {
  normal: {
    top: '12px',
    left: '90px',
    bottom: '30px',
    right: '30px',
  },
  oneBottomContent: {
    top: '12px',
    left: '90px',
    bottom: '58px',
    right: '30px',
  },
  twoBottomContent: {
    top: '12px',
    left: '90px',
    bottom: '80px',
    right: '30px',
  },
};

export const legendOneBottom = '15px';
export const legendTowBottom = '37px';

export const sliderHandle = {
  handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
  handleSize: '100%',
};

export const horizonalSlider = {
  show: true,
  height: 20,
  type: 'slider',
  bottom: '15px',
  xAxisIndex: 0,
  start: 0,
  end: 100,
  ...sliderHandle,
};

export const template: { [key: string]: IWdigetAttributes } = {
  //chart-widget
  // 소요시간 별 케이스 수
  CaseDurationHistogram: {
    componentType: 'chart',
    templateId: 'overview.chart.duration.by.case',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: true,
    colorTheme: defaultMultiColorIndex,
    componentId: 'CaseDurationHistogram',
  },
  // 평균 소요시간 상위 배리언트
  TracevariantDuration: {
    componentType: 'chart',
    templateId: 'overview.chart.mean.duration.variant',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'TracevariantDuration',
  },
  // 소요시간 top 10 케이스 구간별 소요시간
  CaseSectionDuration: {
    componentType: 'chart',
    templateId: 'overview.chart.case.duration',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    componentId: 'CaseSectionDuration',
  },
  // 병목 구간 현황
  BottleneckStatistic: {
    componentType: 'chart',
    templateId: 'overview.chart.bottleneck',
    widgetType: 'BOXPLOT_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultBoxplotColorIndex,
    componentId: 'BottleneckStatistic',
  },
  // 케이스 추이
  CaseFreqTrend: {
    componentType: 'chart',
    templateId: 'overview.chart.case.trend',
    widgetType: 'LINE_CHART',
    widgetTitle: '',
    colorPalette: true,
    colorTheme: defaultMultiColorIndex,
    componentId: 'CaseFreqTrend',
  },
  // 이벤트 추이
  EventOverTime: {
    componentType: 'chart',
    templateId: 'overview.chart.events.over.time',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'EventOverTime',
  },
  // 액티비티 별 발생 건수
  ActivityFreqCount: {
    componentType: 'chart',
    templateId: 'activity.chart.count',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'ActivityFreqCount',
  },
  // 액티비티 별 평균 소요시간
  ActivityDuration: {
    componentType: 'chart',
    templateId: 'activity.chart.mean.duration',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    componentId: 'ActivityDuration',
  },
  // 액티비티 추이
  ActivityFreqTrend: {
    componentType: 'chart',
    templateId: 'activity.chart.trend',
    widgetType: 'LINE_CHART',
    widgetTitle: '',
    colorPalette: true,
    colorTheme: defaultMultiColorIndex,
    componentId: 'ActivityFreqTrend',
  },
  // 시작 액티비티 비율
  ActivityFreqStartRatio: {
    componentType: 'chart',
    templateId: 'activity.chart.start.ratio',
    widgetType: 'PIE_CHART',
    widgetTitle: '',
    componentId: 'ActivityFreqStartRatio',
  },
  // 종료 액티비티 비율
  ActivityFreqEndRatio: {
    componentType: 'chart',
    templateId: 'activity.chart.end.ratio',
    widgetType: 'PIE_CHART',
    widgetTitle: '',
    componentId: 'ActivityFreqEndRatio',
  },
  // 액티비티 별 리소스
  ResourceActivity: {
    componentType: 'chart',
    templateId: 'resource.chart.resource.by.activity',
    widgetType: 'SUNBURST_CHART',
    widgetTitle: '',
    componentId: 'ResourceActivity',
  },
  // 리소스 별 발생 건수
  ResourceFreqCount: {
    componentType: 'chart',
    templateId: 'resource.chart.count',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'ResourceFreqCount',
  },
  // 리소스 별 평균 소요시간
  ResourceMeanDuration: {
    componentType: 'chart',
    templateId: 'resource.chart.mean.duration',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'ResourceMeanDuration',
  },
  // 액티비티 별 담당자
  OriginatorActivity: {
    componentType: 'chart',
    templateId: 'originator.chart.originator.by.activity',
    widgetType: 'LINE_CHART',
    widgetTitle: '',
    componentId: 'OriginatorActivity',
  },
  // 담당자 별 발생 건수
  OriginatorFreqCount: {
    componentType: 'chart',
    templateId: 'originator.chart.count',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'OriginatorFreqCount',
  },
  // 담당자 별 평균 소요시간
  OriginatorMeanDuration: {
    componentType: 'chart',
    templateId: 'originator.chart.mean.duration',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'OriginatorMeanDuration',
  },
  // 비용 발생 Top 10 케이스
  CostCases: {
    componentType: 'chart',
    templateId: 'cost.chart.cases',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'CostCases',
  },
  // 액티비티 별 비용 발생 비율
  CostRatioByActivity: {
    componentType: 'chart',
    templateId: 'cost.chart.ratio.by.activity',
    widgetType: 'PIE_CHART',
    widgetTitle: '',
    colorPalette: true,
    colorTheme: defaultMultiColorIndex,
    componentId: 'CostRatioByActivity',
  },
  // Top 10 리소스 별 평균 발생 비용
  CostMeanResource: {
    componentType: 'chart',
    templateId: 'cost.chart.avg.by.resource',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'CostMeanResource',
  },
  // Top 10 담당자 별 평균 발생 비용
  CostMeanOriginator: {
    componentType: 'chart',
    templateId: 'cost.chart.avg.by.originator',
    widgetType: 'BAR_CHART',
    widgetTitle: '',
    colorPalette: false,
    colorTheme: defaultSingleColorIndex,
    componentId: 'CostMeanOriginator',
  },
  // kpi-widget
  // 케이스 개수
  OverviewCase: {
    componentType: 'kpi',
    templateId: 'overview.kpi.case.total',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'OverviewCase',
    componentId: 'KpiWidget',
    dataParams: {
      durUnit: 'month',
      durValue: 1,
    },
  },
  // 이벤트 개수
  OverviewEvent: {
    componentType: 'kpi',
    templateId: 'overview.kpi.event.total',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'OverviewEvent',
    componentId: 'KpiWidget',
    dataParams: {
      durUnit: 'month',
      durValue: 1,
    },
  },
  // 시작 시간
  OverviewStartTime: {
    componentType: 'kpi',
    templateId: 'overview.kpi.start.timestamp',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'string',
    kpiId: 'OverviewStartTime',
    componentId: 'KpiWidget',
  },
  // 종료 시간
  OverviewEndTime: {
    componentType: 'kpi',
    templateId: 'overview.kpi.end.timestamp',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'string',
    kpiId: 'OverviewEndTime',
    componentId: 'KpiWidget',
  },
  // 케이스 완료율
  OverviewCompleteRatio: {
    componentType: 'kpi',
    templateId: 'overview.kpi.completion.rate',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'percentage',
    kpiId: 'OverviewCompleteRatio',
    componentId: 'KpiWidget',
    dataParams: {
      ucl: 0.9,
    },
  },
  // 총 액티비티 수
  ActivityCount: {
    componentType: 'kpi',
    templateId: 'activity.kpi.total',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ActivityCount',
    componentId: 'KpiWidget',
  },
  // 케이스 별 최소 액티비티 수
  ActivityMinPerCase: {
    componentType: 'kpi',
    templateId: 'activity.kpi.min',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ActivityMinPerCase',
    componentId: 'KpiWidget',
  },
  // 케이스 별 평균 액티비티 수
  ActivityMeanPerCase: {
    componentType: 'kpi',
    templateId: 'dactivity.kpi.avg',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ActivityMeanPerCase',
    componentId: 'KpiWidget',
  },
  // 케이스 별 최대 액티비티 수
  ActivityMaxPerCase: {
    componentType: 'kpi',
    templateId: 'activity.kpi.max',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ActivityMaxPerCase',
    componentId: 'KpiWidget',
  },
  // 총 리소스 수
  ResourceCount: {
    componentType: 'kpi',
    templateId: 'resource.kpi.total',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ResourceCount',
    componentId: 'KpiWidget',
  },
  // 케이스 별 최소 리소스 수
  ResourceMinPerCase: {
    componentType: 'kpi',
    templateId: 'resource.kpi.min',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ResourceMinPerCase',
    componentId: 'KpiWidget',
  },
  // 케이스 별 평균 리소스 수
  ResourceMeanPerCase: {
    componentType: 'kpi',
    templateId: 'resource.kpi.avg',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ResourceMeanPerCase',
    componentId: 'KpiWidget',
  },
  // 케이스 별 최대 리소스 수
  ResourceMaxPerCase: {
    componentType: 'kpi',
    templateId: 'resource.kpi.max',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'ResourceMaxPerCase',
    componentId: 'KpiWidget',
  },
  // 총 담당자 수
  OriginatorCount: {
    componentType: 'kpi',
    templateId: 'originator.kpi.total',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'OriginatorCount',
    componentId: 'KpiWidget',
  },
  // 케이스 별 최소 담당자 수
  OriginatorMinPerCase: {
    componentType: 'kpi',
    templateId: 'originator.kpi.min',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'OriginatorMinPerCase',
    componentId: 'KpiWidget',
  },
  // 케이스 별 평균 담당자 수
  OriginatorMeanPerCase: {
    componentType: 'kpi',
    templateId: 'originator.kpi.avg',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'OriginatorMeanPerCase',
    componentId: 'KpiWidget',
  },
  // 케이스 별 최대 담당자 수
  OriginatorMaxPerCase: {
    componentType: 'kpi',
    templateId: 'originator.kpi.max',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'OriginatorMaxPerCase',
    componentId: 'KpiWidget',
  },
  // 총 비용
  CostCount: {
    componentType: 'kpi',
    templateId: 'cost.kpi.total',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'CostCount',
    componentId: 'KpiWidget',
    dataParams: {
      durUnit: 'month',
      durValue: 1,
    },
  },
  // 케이스 별 최소 비용
  CostMinPerCase: {
    componentType: 'kpi',
    templateId: 'cost.kpi.min',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'CostMinPerCase',
    componentId: 'KpiWidget',
    dataParams: {
      durUnit: 'month',
      durValue: 1,
    },
  },
  // 케이스 별 평균 비용
  CostMeanPerCase: {
    componentType: 'kpi',
    templateId: 'cost.kpi.avg',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'CostMeanPerCase',
    componentId: 'KpiWidget',
    dataParams: {
      durUnit: 'month',
      durValue: 1,
    },
  },
  // 케이스 별 최대 비용
  CostMaxPerCase: {
    componentType: 'kpi',
    templateId: 'cost.kpi.max',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'number',
    kpiId: 'CostMaxPerCase',
    componentId: 'KpiWidget',
    dataParams: {
      durUnit: 'month',
      durValue: 1,
    },
  },
  // 표준 소요시간 초과 케이스
  TimeoutCase: {
    componentType: 'kpi',
    templateId: 'general.kpi.case.duration.over.ref.model',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'custom',
    kpiId: 'TimeoutCase',
    componentId: 'KpiWidget',
    dataParams: {},
  },
  // 소요시간 상위 10% 케이스
  CaseTimeOutlier: {
    componentType: 'kpi',
    templateId: 'general.kpi.case.outlier',
    widgetType: 'KPI',
    widgetTitle: '',
    kpiFormat: 'custom',
    kpiId: 'CaseTimeOutlier',
    componentId: 'KpiWidget',
    dataParams: {
      ucl: 0.9, // range [0.0 - 1.0]
      threshold: 'ucl', // option: {"ucl", "avg"}
    },
  },
};
