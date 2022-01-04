<template>
  <div class="sidebar-setting side">
    <div class="content-header" v-b-toggle.sidebarSetting>
      <div class="title">{{ $t('view.dashboard.editor.inspector.title') }}</div>
      <div class="right-align">
        <div class="ico-arrow-top" alt="방향 아이콘"></div>
      </div>
    </div>
    <b-collapse id="sidebarSetting" visible>
      <template v-if="widget">
        <KpiInpspector v-if="widget.componentType === 'kpi'" :service="service" :widget="widget" />
        <ChartInspector v-if="widget.componentType === 'chart'" :service="service" :widget="widget" />
      </template>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import { DashboardEditorService, IWidget } from '../dashboard-editor-service';

import KpiInpspector from './KPIInspector.vue';
import ChartInspector from './ChartInspector.vue';

@Component({
  components: {
    KpiInpspector,
    ChartInspector,
  },
  computed: mapGetters({}),
})
export default class Inspector extends Vue {
  /* Prop 선언 */
  @Prop()
  service!: DashboardEditorService;
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  widget: IWidget = null;
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 
 created(){
   
 }
 */

  mounted() {
    EventBus.$on('createInspector', (selection: IWidget) => {
      this.setWidget(selection);
    });
  }

  beforeDestroy() {
    EventBus.$off('createInspector');
  }

  private setWidget(selection: IWidget) {
    const widget = selection;
    this.widget = widget;
  }

  /* 메소드 선언 */
}
</script>