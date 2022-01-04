<template>
  <div class="content-body">
    <div class="form-content">
      <b-form-group id="chartName" :label="$t('view.dashboard.editor.inspector.chart.name')" label-cols="4" label-for="chart-name">
        <b-form-input :value="widgetTitle" @input.native="changeWidgetAttr('widgetTitle', $event.target.value.trim())" autocomplete="off" :placeholder="$t('view.dashboard.editor.inspector.chart.namePlaceholder')" maxLength="255"></b-form-input>
      </b-form-group>
      <template v-if="isCanChangeWidgeType">
        <b-form-group id="chartTypeSelect" :label="$t('view.dashboard.editor.inspector.chart.type')" label-cols="4" label-for="chart-type-select">
          <b-form-select v-model="widgetType" @change="onChangeWidgetType()" :options="widgetTypeOptions"></b-form-select>
        </b-form-group>
      </template>
    </div>
    <template v-if="colorTheme !== undefined">
      <b-form-group v-if="colorPalette" id="chartColor" :label="$t('view.dashboard.editor.inspector.chart.color')" label-cols="4" label-for="chart-color">
        <b-dropdown id="colorPalette" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <template v-for="(color, index) in multiColorPalette[colorTheme]">
              <div v-if="index < 5" class="multi-palette" :key="'preview-' + index" :style="{ background: color }"></div>
            </template>
          </template>
          <b-dropdown-item v-for="(oneColor, oneindex) in multiColorPalette" :key="'multi-one-' + oneindex" :active="colorTheme === oneindex" @click="changeWidgetAttr('colorTheme', oneindex)">
            <div class="palette">
              <div class="color" v-for="(twoColor, twoIndex) in oneColor" :key="'multi-two-' + twoIndex" :style="{ 'background-color': twoColor }"></div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </b-form-group>

      <b-form-group v-else id="chartOneColor" :label="$t('view.dashboard.editor.inspector.chart.color')" label-cols="4" label-for="chart-one-color">
        <b-dropdown id="colorPalette" :style="{ 'background-color': getSingleColorPalette[colorTheme] }">
          <b-dropdown-item v-for="(color, index) in getSingleColorPalette" :key="'single-' + index" :active="colorTheme === index" @click="changeWidgetAttr('colorTheme', index)">
            <div class="color" :style="{ 'background-color': color }"></div>
          </b-dropdown-item>
        </b-dropdown>
      </b-form-group>
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { DashboardInspectorMixin } from '@/mixin';

import { DashbaordTheme } from '../dashboard-editor-service';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class ChartInspector extends Mixins(DashboardInspectorMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  widgetTitle: string = '';
  colorPalette: boolean = false;
  colorTheme: number = 0;
  widgetType: string = 'LINE_CHART';

  singleColorPalette = DashbaordTheme.singleColorPalette;
  multiColorPalette = DashbaordTheme.multiColorPalette;
  boxplotColorPalette = DashbaordTheme.boxplotColorPalette;

  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  // created(){

  // }

  // mounted() {
  //
  // }
  /* 메소드 선언 */
  assignFormFields() {
    const { service, widget } = this;
    const widgetTitle = service.prop(widget.i, 'widgetTitle');
    this.widgetTitle = widgetTitle === undefined ? '' : widgetTitle;
    this.colorPalette = service.prop(widget.i, 'colorPalette');
    this.colorTheme = service.prop(widget.i, 'colorTheme');
    this.widgetType = service.prop(widget.i, 'widgetType');
  }

  onChangeWidgetType() {
    const { widgetType } = this;
    switch (this.widget.componentId) {
      case 'CaseDurationHistogram': {
        this.changeWidgetAttr('widgetType', widgetType);
        if (this.widgetType === 'LINE_CHART') {
          this.changeWidgetAttr('colorPalette', false);
          this.changeWidgetAttr('colorTheme', DashbaordTheme.defaultSingleColorIndex);
        } else {
          this.changeWidgetAttr('colorPalette', true);
          this.changeWidgetAttr('colorTheme', DashbaordTheme.defaultMultiColorIndex);
        }
        break;
      }
      case 'TracevariantDuration':
      case 'CaseFreqTrend':
      case 'ActivityFreqTrend':
      case 'ActivityFreqStartRatio':
      case 'ActivityFreqEndRatio':
      case 'CostCases': {
        this.changeWidgetAttr('widgetType', widgetType);
        break;
      }
      case 'BottleneckStatistic': {
        this.changeWidgetAttr('widgetType', widgetType);
        if (widgetType === 'LINE_CHART') {
          this.changeWidgetAttr('colorPalette', true);
          this.changeWidgetAttr('colorTheme', DashbaordTheme.defaultMultiColorIndex);
        } else {
          this.changeWidgetAttr('colorPalette', false);
          this.changeWidgetAttr('colorTheme', DashbaordTheme.defaultBoxplotColorIndex);
        }
        break;
      }
      case 'EventOverTime':
      case 'ActivitiesRatio':
      case 'ActivityFreqCount':
      case 'ResourceFreqCount':
      case 'ResourceMeanDuration':
      case 'OriginatorFreqCount':
      case 'OriginatorMeanDuration':
      case 'CostRatioByActivity':
      case 'CostMeanResource':
      case 'CostMeanOriginator': {
        this.changeWidgetAttr('widgetType', widgetType);
        if (widgetType === 'PIE_CHART') {
          this.changeWidgetAttr('colorPalette', true);
          this.changeWidgetAttr('colorTheme', DashbaordTheme.defaultMultiColorIndex);
        } else {
          this.changeWidgetAttr('colorPalette', false);
          this.changeWidgetAttr('colorTheme', DashbaordTheme.defaultSingleColorIndex);
        }
        break;
      }
    }
  }

  get isCanChangeWidgeType() {
    switch (this.widget.componentId) {
      case 'CaseSectionDuration':
      case 'ActivityDuration':
      case 'ResourceActivity':
      case 'BottleneckStatistic': {
        return false;
      }
      default: {
        return true;
      }
    }
  }

  get widgetTypeOptions() {
    switch (this.widget.componentId) {
      case 'BottleneckStatistic': {
        return [
          { value: 'BOXPLOT_CHART', text: 'boxplot' },
          { value: 'LINE_CHART', text: 'line' },
        ];
      }
      case 'TracevariantDuration':
      case 'CaseFreqTrend':
      case 'ActivityFreqTrend':
      case 'CostCases':
      case 'CaseDurationHistogram': {
        return [
          { value: 'BAR_CHART', text: 'bar' },
          { value: 'LINE_CHART', text: 'line' },
        ];
      }
      case 'EventOverTime':
      case 'ActivityFreqCount':
      case 'ResourceFreqCount':
      case 'ResourceMeanDuration':
      case 'OriginatorFreqCount':
      case 'OriginatorMeanDuration':
      case 'CostMeanResource':
      case 'CostMeanOriginator': {
        return [
          { value: 'BAR_CHART', text: 'bar' },
          { value: 'LINE_CHART', text: 'line' },
          { value: 'PIE_CHART', text: 'pie' },
        ];
      }
      case 'ActivitiesRatio':
      case 'ActivityFreqStartRatio':
      case 'ActivityFreqEndRatio':
      case 'CostRatioByActivity': {
        return [
          { value: 'PIE_CHART', text: 'pie' },
          { value: 'BAR_CHART', text: 'bar' },
          { value: 'LINE_CHART', text: 'line' },
        ];
      }
      default: {
        return [];
      }
    }
  }

  get getSingleColorPalette() {
    if (this.widget.widgetType === 'BOXPLOT_CHART') {
      return this.boxplotColorPalette;
    } else {
      return this.singleColorPalette;
    }
  }
}
</script>