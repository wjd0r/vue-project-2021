import { IKeyValueObject } from '@/interface';

interface IObjectKeys {
  [key: string]: string | number | boolean | IKeyValueObject;
}

export interface ILayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IWdigetAttributes extends IObjectKeys {
  componentType: 'chart' | 'kpi' | 'table';
  /* API properties */
  templateId: string;
  /* API properties */
  widgetType: 'KPI' | 'TABLE' | 'LINE_CHART' | 'BAR_CHART' | 'PIE_CHART' | 'BOXPLOT_CHART' | 'SUNBURST_CHART' | 'SCATTER_CHART';
  widgetTitle: string;
  colorPalette?: boolean;
  colorTheme?: number;
  componentId: string; // chart component name like LineChart, BarChart, PieChart .. etc.
  kpiFormat?: string;
  kpiId?: string;
  dataParams?: IKeyValueObject;
}

export interface IWidget extends IWdigetAttributes, ILayout {
  // API properties
  _type: 'StatisticsWidgetLiteImpl';
  // v1 UI properties (deprecated)
  order?: number;
  size?: number;
  // v2 UI properties
  // IWdigetAttributes, ILayout
}
