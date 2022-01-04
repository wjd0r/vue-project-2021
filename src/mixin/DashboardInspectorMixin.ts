import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import _ from 'lodash';

import { DashboardEditorService, IWidget } from '@/views/dashboard/editor/dashboard-editor-service';

@Component({})
export default class DashboardInspectorMixin extends Vue {
  @Prop()
  service!: DashboardEditorService;
  @Prop()
  widget!: IWidget;

  @Watch('widget', { deep: true })
  onAttributesChanged(currentValue: IWidget, previousValue: IWidget): void {
    this.assignFormFields();
  }

  mounted() {
    this.assignFormFields();
  }

  changeWidgetAttr(attr: string, value: any) {
    this.service.attrs(this.widget.i, attr, value);
  }

  assignFormFields() {
    return;
  }
}
