<template>
  <div class="content-body">
    <div class="form-content">
      <b-form-group id="chartName" :label="$t('view.dashboard.editor.inspector.kpi.name')" label-cols="4" label-for="chart-name">
        <b-form-input :value="widgetTitle" @input.native="changeWidgetAttr('widgetTitle', $event.target.value.trim())" :placeholder="$t('view.dashboard.editor.inspector.kpi.namePlaceholder')" maxLength="255"></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { DashboardInspectorMixin } from '@/mixin';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class KPIInspector extends Mixins(DashboardInspectorMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  widgetTitle: string = '';
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 메소드 선언 */
  assignFormFields() {
    const { service, widget } = this;
    const widgetTitle = service.prop(widget.i, 'widgetTitle');
    this.widgetTitle = widgetTitle === undefined ? '' : widgetTitle;
  }
}
</script>