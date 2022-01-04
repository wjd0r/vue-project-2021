<template>
  <div class="sidebar-chart side">
    <div class="content-header" v-b-toggle.sidebarChart>
      <div class="title">{{ $t('view.dashboard.editor.palette.chart') }}</div>
      <div class="right-align">
        <div class="ico-arrow-top" alt="방향 아이콘"></div>
      </div>
    </div>
    <b-collapse id="sidebarChart" visible>
      <div class="content-body">
        <div class="form-content">
          <b-form-group id="chartTabSelect" :label="$t('view.dashboard.editor.palette.selectTab')" label-cols="4" label-for="chart-tab-select">
            <b-form-select v-model="tab">
              <b-form-select-option v-for="item in tabOptions" :key="`tab-${item.value}`" :value="item.value">{{ $t(`view.dashboard.${item.value}.title`) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="list-component">
          <b-list-group class="list-content">
            <template v-if="tab !== 'all'">
              <b-list-group-item v-for="(item, index) in widgetOptions[tab]" :key="`chart-${index}`" class="droppable-element chart-widget" :class="{ disabled: isExist(item.value) }" :data-type="item.value" :draggable="!isExist(item.value)" unselectable="on" @drag="onDragItem($event, item.value)" @dragend="onDragEndItem($event, item.value)">
                <div class="item">{{ $t(`view.dashboard.${item.text}`) }}</div>
              </b-list-group-item>
            </template>
            <template v-else>
              <template v-for="(tab, tindex) in widgetOptions">
                <template v-for="(item, index) in tab">
                  <b-list-group-item :key="`chart-${tindex}-${index}`" class="droppable-element chart-widget" :class="{ disabled: isExist(item.value) }" :data-type="item.value" :draggable="!isExist(item.value)" unselectable="on" @drag="onDragItem($event, item.value)" @dragend="onDragEndItem($event, item.value)">
                    <div class="item">{{ $t(`view.dashboard.${item.text}`) }}</div>
                  </b-list-group-item>
                </template>
              </template>
            </template>
          </b-list-group>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';

import { DashboardEditorService } from '../dashboard-editor-service';

import $ from 'jquery';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class ChartPaltte extends Vue {
  /* Prop 선언 */
  @Prop()
  service: DashboardEditorService;
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  tab: 'all' | 'overview' | 'activity' | 'resource' | 'originator' | 'cost' | 'etc' = 'all';
  tabOptions = [
    { value: 'all', text: '전체' },
    { value: 'overview', text: '데이터 요약' },
    { value: 'activity', text: '액티비티' },
    { value: 'resource', text: '리소스' },
    { value: 'originator', text: '담당자' },
    { value: 'cost', text: '비용' },
    { value: 'etc', text: '기타' },
  ];

  widgetOptions = {
    overview: [
      { value: 'CaseDurationHistogram', text: 'overview.chart.duration.by.case' },
      { value: 'TracevariantDuration', text: 'overview.chart.mean.duration.variant' },
      { value: 'CaseSectionDuration', text: 'overview.chart.case.duration' },
      { value: 'BottleneckStatistic', text: 'overview.chart.bottleneck' },
      { value: 'CaseFreqTrend', text: 'overview.chart.case.trend' },
    ],
    activity: [
      { value: 'ActivityFreqCount', text: 'activity.chart.count' },
      { value: 'ActivityDuration', text: 'activity.chart.mean.duration' },
      { value: 'ActivityFreqTrend', text: 'activity.chart.trend' },
      { value: 'ActivityFreqStartRatio', text: 'activity.chart.start.ratio' },
      { value: 'ActivityFreqEndRatio', text: 'activity.chart.end.ratio' },
    ],
    resource: [
      { value: 'ResourceActivity', text: 'resource.chart.resource.by.activity' },
      { value: 'ResourceFreqCount', text: 'resource.chart.count' },
      { value: 'ResourceMeanDuration', text: 'resource.chart.mean.duration' },
    ],
    originator: [
      { value: 'OriginatorActivity', text: 'originator.chart.originator.by.activity' },
      { value: 'OriginatorFreqCount', text: 'originator.chart.count' },
      { value: 'OriginatorMeanDuration', text: 'originator.chart.mean.duration' },
    ],
    cost: [
      { value: 'CostCases', text: 'cost.chart.cases' },
      { value: 'CostRatioByActivity', text: 'cost.chart.ratio.by.activity' },
      { value: 'CostMeanResource', text: 'cost.chart.avg.by.resource' },
      { value: 'CostMeanOriginator', text: 'cost.chart.avg.by.originator' },
    ],
    etc: [
      { value: 'EventOverTime', text: 'overview.chart.events.over.time' },
    ],
  };
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 
 created(){
   
 }
 */

  mounted() {
    this.initHammer();
  }

  beforeDestroy() {
    const self = this;
    $('.droppable-element.chart-widget').each(function () {
      if (!utils.isMobile()) return;

      this.removeEventListener('touchstart', function (e) {
        self.onDragItem(e, this.getAttribute('data-type'));
      });

      this.removeEventListener('touchmove', function (e) {
        self.onDragItem(e, this.getAttribute('data-type'));
      });

      this.removeEventListener('touchend', function (e) {
        self.onDragEndItem(e, this.getAttribute('data-type'));
      });
    });
  }

  /* 메소드 선언 */
  // paper에 widget이 존재하는지
  isExist(componentId: string) {
    if (this.service.getWidgetIndexByComponentId(componentId) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  // widget item drag event
  onDragItem(evt: Event, component: string) {
    EventBus.$emit('drag', evt, component, 'chart');
  }

  // widget item drag event
  onDragEndItem(evt: Event, component: string) {
    EventBus.$emit('dragend', evt, component, 'chart');
  }

  initHammer() {
    const self = this;
    $('.droppable-element.chart-widget').each(function () {
      if (!utils.isMobile()) return;

      this.addEventListener(
        'touchstart',
        function (e) {
          self.onDragItem(e, this.getAttribute('data-type'));
        },
        { passive: true }
      );

      this.addEventListener(
        'touchmove',
        function (e) {
          self.onDragItem(e, this.getAttribute('data-type'));
        },
        { passive: true }
      );

      this.addEventListener(
        'touchend',
        function (e) {
          self.onDragEndItem(e, this.getAttribute('data-type'));
        },
        { passive: true }
      );
    });
  }
}
</script>