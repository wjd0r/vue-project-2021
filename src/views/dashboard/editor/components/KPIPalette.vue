<template>
  <div class="sidebar-kpi side">
    <div class="content-header" v-b-toggle.sidebarKpi>
      <div class="title">{{ $t('view.dashboard.editor.palette.kpi') }}</div>
      <div class="right-align">
        <div class="ico-arrow-top" alt="방향 아이콘"></div>
      </div>
    </div>
    <b-collapse id="sidebarKpi" visible>
      <div class="content-body">
        <div class="form-content">
          <b-form-group id="kpiTabSelect" :label="$t('view.dashboard.editor.palette.selectTab')" label-cols="4" label-for="kpi-tab-select">
            <b-form-select v-model="tab">
              <b-form-select-option v-for="item in tabOptions" :key="`tab-${item.value}`" :value="item.value">{{ $t(`view.dashboard.${item.value}.title`) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="list-component">
          <b-list-group class="list-content">
            <template v-if="tab !== 'all'">
              <b-list-group-item v-for="(item, index) in widgetOptions[tab]" :key="`kpi-${index}`" class="droppable-element kpi-widget" :class="{ disabled: isExist(item.value) }" :data-type="item.value" :draggable="!isExist(item.value)" unselectable="on" @drag="onDragItem($event, item.value)" @dragend="onDragEndItem($event, item.value)">
                <div class="item">{{ $t(`view.dashboard.${item.text}`) }}</div>
              </b-list-group-item>
            </template>
            <template v-else>
              <template v-for="(tab, tindex) in widgetOptions">
                <template v-for="(item, index) in tab">
                  <b-list-group-item :key="`kpi-${tindex}-${index}`" class="droppable-element kpi-widget" :class="{ disabled: isExist(item.value) }" :data-type="item.value" :draggable="!isExist(item.value)" unselectable="on" @drag="onDragItem($event, item.value)" @dragend="onDragEndItem($event, item.value)">
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
export default class KPIPalette extends Vue {
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
      { value: 'OverviewCase', text: 'overview.kpi.case.total' },
      { value: 'OverviewEvent', text: 'overview.kpi.event.total' },
      { value: 'OverviewStartTime', text: 'overview.kpi.start.timestamp' },
      { value: 'OverviewEndTime', text: 'overview.kpi.end.timestamp' },
      { value: 'OverviewCompleteRatio', text: 'overview.kpi.completion.rate' },
    ],
    activity: [
      { value: 'ActivityCount', text: 'activity.kpi.total' },
      { value: 'ActivityMinPerCase', text: 'activity.kpi.min' },
      { value: 'ActivityMeanPerCase', text: 'activity.kpi.avg' },
      { value: 'ActivityMaxPerCase', text: 'activity.kpi.max' },
    ],
    resource: [
      { value: 'ResourceCount', text: 'resource.kpi.total' },
      { value: 'ResourceMinPerCase', text: 'resource.kpi.min' },
      { value: 'ResourceMeanPerCase', text: 'resource.kpi.avg' },
      { value: 'ResourceMaxPerCase', text: 'resource.kpi.max' },
    ],
    originator: [
      { value: 'OriginatorCount', text: 'originator.kpi.total' },
      { value: 'OriginatorMinPerCase', text: 'originator.kpi.min' },
      { value: 'OriginatorMeanPerCase', text: 'originator.kpi.avg' },
      { value: 'OriginatorMaxPerCase', text: 'originator.kpi.max' },
    ],
    cost: [
      { value: 'CostCount', text: 'cost.kpi.total' },
      { value: 'CostMinPerCase', text: 'cost.kpi.min' },
      { value: 'CostMeanPerCase', text: 'cost.kpi.avg' },
      { value: 'CostMaxPerCase', text: 'cost.kpi.max' },
    ],
    etc: [
      { value: 'TimeoutCase', text: 'general.kpi.case.duration.over.ref.model.title' },
      { value: 'CaseTimeOutlier', text: 'general.kpi.case.outlier.title' },
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
    $('.droppable-element.kpi-widget').each(function () {
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
  isExist(kpiId: string) {
    if (this.service.getWidgetIndexByKpiId(kpiId) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  // widget item drag event
  onDragItem(evt: Event, component: string) {
    EventBus.$emit('drag', evt, component, 'kpi');
  }
  // widget item drag event
  onDragEndItem(evt: Event, component: string) {
    EventBus.$emit('dragend', evt, component, 'kpi');
  }

  initHammer() {
    const self = this;
    $('.droppable-element.kpi-widget').each(function () {
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