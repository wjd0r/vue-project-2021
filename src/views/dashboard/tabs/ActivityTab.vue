<template>
  <div class="row contens-component">
    <div class="pr-0 pl-0 col-xs-12 col-md-12">
      <div class="row kpi-component">
        <div class="kpi-content grid-content w-25" v-for="kpi in kpis" :key="kpi.name">
          <kpi-widget :kpi="kpi"></kpi-widget>
        </div>
      </div>
    </div>
    <div class="chart-component">
      <div class="chart-list-component">
        <div class="row chart-list-content">
          <div class="chart-content grid-content col-xs-12 col-md-12">
            <activity-freq-count></activity-freq-count>
          </div>
          <div class="chart-content grid-content col-xs-12 col-md-12">
            <activity-duration></activity-duration>
          </div>
          <div class="chart-content grid-content col-xs-12 col-md-12">
            <activity-freq-trend></activity-freq-trend>
          </div>
          <div class="chart-content grid-content col-xs-6 col-md-6">
            <activity-freq-start-ratio></activity-freq-start-ratio>
          </div>
          <div class="chart-content grid-content col-xs-6 col-md-6">
            <activity-freq-end-ratio></activity-freq-end-ratio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EventBus } from '@/common';
import { IClient, IKeyValueObject, IWorkFlowRequestAction } from '@/interface';

import { DashboardTabMixin, WidgetMixin } from '@/mixin';

import KpiWidget from '../components/KPIWidget.vue';
import PrefixedWidgets from '../prefixedWidgets';

@Component({
  components: {
    KpiWidget,
    ...PrefixedWidgets,
  },
})
export default class DashboardActivityTab extends Mixins(DashboardTabMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */

  // 액티비티 총 개수, 케이스 별 최소, 평균, 최대 액티비티 수
  kpis: IKeyValueObject = {
    'kpi-01-total': { id: 'kpi-01-total', name: 'activity.kpi.total', value: '0', valueFormat: 'number' },
    'kpi-02-min': { id: 'kpi-02-min', name: 'activity.kpi.min', value: '0', valueFormat: 'number' },
    'kpi-03-avg': { id: 'kpi-03-avg', name: 'activity.kpi.avg', value: '0', valueFormat: 'number' },
    'kpi-04-max': { id: 'kpi-04-max', name: 'activity.kpi.max', value: '0', valueFormat: 'number' },
  };
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  mounted() {
    EventBus.$on('getWidgetData-ActivityTab', () => {
      for (const child of this.$children) {
        const widget = child as WidgetMixin;
        const actionInfos = this.getActionInfos();
        const action = actionInfos ? actionInfos[`activity-${widget.name}`] : null;
        if (action && this.getActionState(action) === 'COMPLETED' && !widget.isActionComplete) {
          widget.isActionComplete = true;
          widget.getByDataUri(action.dataUri);
        } else if (!action && this.workflowState !== 'REQUEST') {
          widget.isActionComplete = true;
          widget.isNoData = true;
        }
      }
    });
  }

  beforeDestroy() {
    EventBus.$off('getWidgetData-ActivityTab');
  }
  /* 메소드 선언 */
  workflowActionBuilder(client: IClient): { [key: string]: IWorkFlowRequestAction } {
    const actions: { [key: string]: IWorkFlowRequestAction } = {};

    for (const child of this.$children) {
      const widget = child as WidgetMixin;
      const widgetAction = widget.workflowActionBuilder(client, 'activity');
      if (widgetAction !== null) {
        actions[`activity-${widget.name}`] = widgetAction;
      }
    }

    return actions;
  }
}
</script>