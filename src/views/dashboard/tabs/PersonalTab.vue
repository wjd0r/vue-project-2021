<template>
  <div class="row contens-component w-100 h-100 personal-dashboard-component">
    <div class="pr-0 pl-0 col-xs-12 col-md-12 personal-dashboard-content">
      <grid-layout ref="gridLayout" :layout.sync="layout" :col-num="colNum" :row-height="rowHeight" :margin="[2.5, 2.5]">
        <grid-item v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :static="true" class="no-transition" :style="getGridItemStyle(item.i)">
          <component v-if="item.i !== 'drop'" :is="item.componentId" :widget="item" class="w-100 h-100" :class="[item.componentType]"></component>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { IClient, IWorkFlowRequestAction } from '@/interface';

import { DashboardTabMixin, WidgetMixin } from '@/mixin';

import _ from 'lodash';

import KpiWidget from '../components/KPIWidget.vue';
import PrefixedWidgets from '../prefixedWidgets';

import { GridLayout, GridItem } from 'vue-grid-layout';
import { DashbaordTheme, IWidget } from '../editor/dashboard-editor-service';

@Component({
  components: {
    GridLayout,
    GridItem,
    KpiWidget,
    ...PrefixedWidgets,
  },
  computed: mapGetters({
    variantId: 'common/getVariantId',
  }),
  ...utils.getMq(),
} as any)
export default class DashboardPersonalTab extends Mixins(DashboardTabMixin) {
  /* Prop 선언 */
  @Prop()
  layout!: IWidget[];

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  colNum = DashbaordTheme.colNum;
  rowHeight = DashbaordTheme.rowHeight;

  histogramI: string = '';
  showHistogramDuration: boolean = false;

  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  // created() {}

  mounted() {
    /**
     * this.$children <- GridLayout
     * this.$chidren[0].children <- GridItem
     * this.$chidren[0].children[?].children <- widget
     */

    EventBus.$on('getWidgetData-PersonalTab', () => {
      for (const child of this.$children[0].$children) {
        const widget = child.$children[0] as WidgetMixin;
        if (widget && (widget.$el.classList.contains('kpi') || widget.$el.classList.contains('chart'))) {
          const actionInfos = this.getActionInfos();
          const action = actionInfos ? actionInfos[`personal-${widget.name}`] : null;
          if (action && this.getActionState(action) === 'COMPLETED' && !widget.isActionComplete) {
            widget.isActionComplete = true;
            widget.getByDataUri(action.dataUri);
          } else if (!action && this.workflowState !== 'REQUEST') {
            widget.isActionComplete = true;
            widget.isNoData = true;
          }
        }
      }
    });

    EventBus.$on('setHistogramDuration', (i: string, show: boolean) => {
      this.setShowHistogramDuration(i, show);
    });
  }

  beforeDestroy() {
    EventBus.$off('getWidgetData-PersonalTab');
    EventBus.$off('setHistogramDuration');
  }

  /* 메소드 선언 */

  workflowActionBuilder(client: IClient): { [key: string]: IWorkFlowRequestAction } {
    const actions: { [key: string]: IWorkFlowRequestAction } = {};

    for (const child of this.$children[0].$children) {
      const widget = child.$children[0] as WidgetMixin;
      if (widget && (widget.$el.classList.contains('kpi') || widget.$el.classList.contains('chart'))) {
        const workflowAction = widget.workflowActionBuilder(client, 'personal');
        if (workflowAction !== null) {
          actions[`personal-${widget.name}`] = workflowAction;
        }
      }
    }

    return actions;
  }

  setShowHistogramDuration(i: string, show: boolean) {
    this.histogramI = i;
    this.showHistogramDuration = show;
  }

  getGridItemStyle(i: string) {
    if (this.histogramI !== i) {
      return {};
    } else {
      if (!this.showHistogramDuration) {
        return {};
      } else {
        return {
          'z-index': 9,
        };
      }
    }
  }
}
</script>