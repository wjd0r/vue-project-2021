import _ from 'lodash';
import { template } from './DashboardTheme';
import { IWidget, ILayout } from './IDashboardEditorService';

export default class DashboardEditorService {
  public originLayout: Array<IWidget>;
  public layout: Array<IWidget>;

  template = template;

  constructor(layout: Array<IWidget>) {
    this.layout = layout;
  }

  // setter originLayout
  setOriginLayout(layout: IWidget[]) {
    this.originLayout = layout;
  }

  // getter originLayout
  getOriginLayout() {
    return this.originLayout;
  }
  // setter layout
  setLayout(layout: IWidget[]) {
    this.layout = layout;
  }

  // getter layout
  getLayout() {
    return this.layout;
  }

  // getter widget
  getWidget(widgetId: string) {
    const index = this.getWidgetIndexById(widgetId);
    if (index !== -1) {
      return this.layout[index];
    } else {
      return null;
    }
  }

  // widget id로 index 찾기
  getWidgetIndexById(widgetId: string) {
    return this.layout.findIndex((item) => item.i === widgetId);
  }

  // component id로 index 찾기
  getWidgetIndexByComponentId(componentId: string) {
    return this.layout.findIndex((item) => item.componentId === componentId);
  }

  // kpi id으로 index 찾기
  getWidgetIndexByKpiId(kpiId: string) {
    return this.layout.findIndex((item) => item.kpiId === kpiId);
  }

  // widget 추가
  addWidget(layout: ILayout, templateName: string) {
    const template = this.template[templateName];
    const widget: IWidget = {
      _type: 'StatisticsWidgetLiteImpl',
      templateId: template.templateId,
      widgetType: template.widgetType,
      order: 0,
      size: 0,
      ...layout,
      componentType: template.componentType,
      widgetTitle: template.widgetTitle,
      componentId: template.componentId,
      dataParams: template.dataParams !== undefined ? template.dataParams : {}
    };

    if (template?.colorPalette !== undefined) {
      widget.colorPalette = template.colorPalette;
    }

    if (template?.colorTheme !== undefined) {
      widget.colorTheme = template.colorTheme;
    }

    if (template?.kpiFormat !== undefined) {
      widget.kpiFormat = template.kpiFormat;
    }

    if (template?.kpiId !== undefined) {
      widget.kpiId = template.kpiId;
    }

    this.layout.push(widget);
  }

  // widget id로 삭제
  deleteWidget(widgetId: string) {
    const index = this.getWidgetIndexById(widgetId);
    if (index !== -1) {
      this.layout.splice(index, 1);
    }
  }

  // drop widget 삭제
  deleteDropItem() {
    this.layout = this.layout.filter((obj) => obj.i !== 'drop');
  }

  // setter widget attributes
  attrs(widgetId: string, attrs: string, value: number | string) {
    const index = this.getWidgetIndexById(widgetId);
    if (index !== -1) {
      this.layout[index][attrs] = value;
    }
  }

  // getter wieget attributes
  prop(widgetId: string, attrs: string): any {
    const index = this.getWidgetIndexById(widgetId);
    if (index !== -1) {
      return this.layout[index][attrs];
    }
  }

  // widget id 중 가장 큰 index 가져옴
  getMaxIndex() {
    if (this.layout.length === 0) {
      return -1;
    } else {
      const indexs = this.layout.map((item) => Number(item.i.split('page-0-widget-')[1]));
      return Math.max(...indexs);
    }
  }

  clearLayout() {
    this.layout = [];
  }
}
