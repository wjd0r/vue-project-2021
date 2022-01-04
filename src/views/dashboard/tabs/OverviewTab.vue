<template>
  <div class="row contens-component">
    <div class="pr-0 pl-0 col-xs-12 col-md-12">
      <div class="row kpi-component">
        <div class="kpi-content grid-content w-20" v-for="kpi in kpis" :key="kpi.name">
          <kpi-widget :kpi="kpi"></kpi-widget>
        </div>
      </div>
    </div>
    <div class="chart-component">
      <div class="chart-list-component">
        <div class="row chart-list-content">
          <div class="chart-content grid-content col-xs-6 col-md-6">
            <case-duration-histogram></case-duration-histogram>
          </div>
          <div class="chart-content grid-content col-xs-6 col-md-6">
            <tracevariant-duration></tracevariant-duration>
          </div>
          <div class="chart-content grid-content col-xs-12 col-md-12" :style="{ height: $mq.phone ? '680px' : '360px' }">
            <case-section-duration></case-section-duration>
          </div>
          <div class="chart-content grid-content col-xs-12 col-md-12">
            <bottleneck-statistic></bottleneck-statistic>
          </div>
          <div class="chart-content grid-content col-xs-12 col-md-12">
            <case-freq-trend></case-freq-trend>
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
import { EventBus, utils } from '@/common';
import { IClient, IKeyValueObject, IWorkFlowRequestAction } from '@/interface';

import { DashboardTabMixin, WidgetMixin } from '@/mixin';

import KpiWidget from '../components/KPIWidget.vue';
import PrefixedWidgets from '../prefixedWidgets';

@Component({
  components: {
    KpiWidget,
    ...PrefixedWidgets,
  },
  ...utils.getMq(),
} as any)
export default class DashboardOverviewTab extends Mixins(DashboardTabMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */

  // 케이스 수, 이벤트 수, 시작 시간, 종료 시간, 케이스 완료율
  kpis: IKeyValueObject = {
    'kpi-01-cases': { id: 'kpi-01-cases', name: 'overview.kpi.case.total', value: '0', valueFormat: 'number', dataParams: { durUnit: 'month', durValue: 1 } },
    'kpi-02-events': { id: 'kpi-02-events', name: 'overview.kpi.event.total', value: '0', valueFormat: 'number', dataParams: { durUnit: 'month', durValue: 1 } },
    'kpi-03-start': { id: 'kpi-03-log-start', name: 'overview.kpi.start.timestamp', value: '00:00:00', valueFormat: 'string' },
    'kpi-04-end': { id: 'kpi-04-log-end', name: 'overview.kpi.end.timestamp', value: '00:00:00', valueFormat: 'string' },
    'kpi-05-complete': { id: 'kpi-05-complete', name: 'overview.kpi.completion.rate', value: '0', valueFormat: 'percentage', dataParams: { ucl: 0.9 } },
  };
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  mounted() {
    EventBus.$on('getWidgetData-OverviewTab', () => {
      for (const child of this.$children) {
        const widget = child as WidgetMixin;
        const actionInfos = this.getActionInfos();
        const action = actionInfos ? actionInfos[`overview-${widget.name}`] : null;
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
    EventBus.$off('getWidgetData-OverviewTab');
  }

  /* 메소드 선언 */
  workflowActionBuilder(client: IClient): { [key: string]: IWorkFlowRequestAction } {
    const actions: { [key: string]: IWorkFlowRequestAction } = {};

    for (const child of this.$children) {
      const widget = child as WidgetMixin;
      const widgetAction = widget.workflowActionBuilder(client, 'overview');
      if (widgetAction !== null) {
        actions[`overview-${widget.name}`] = widgetAction;
      }
    }

    return actions;
  }
}
</script>