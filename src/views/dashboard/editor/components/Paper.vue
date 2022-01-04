<template>
  <div ref="gridFrame" class="vue-grid-layout-content" @click="onClickContainer($event)">
    <div class="scroll-content">
      <grid-layout ref="gridLayout" :layout.sync="getLayout" :col-num="colNum" :row-height="rowHeight" :margin="[2.5, 2.5]" @click="onClickContainer($event)" @layoutReadyEvent="emitReize()">
        <grid-item class="no-transition" v-for="item in getLayout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :static="false" @resized="emitReize()" @container-resized="emitReize()">
          <component v-if="item.i !== 'drop'" :is="item.componentId" :widget="item" :format="item.kpiFormat" class="w-100 h-100" :class="[item.i === selected ? 'selected' : '', item.componentType]" @click.passive.native="onClickWidget(item.i)"></component>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vue-grid-layout-content::v-deep {
  width: 100%;
  min-height: 100%;
  background: gray;
  .vue-grid-layout {
    .vue-grid-item {
      .vue-resizable-handle {
        padding: 0 3px 3px 0 !important;
      }
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import _ from 'lodash';
import $ from 'jquery';

import KpiWidget from '../../components/KPIWidget.vue';
import PrefixedWidgets from '../../prefixedWidgets';

import { GridLayout, GridItem } from 'vue-grid-layout';
import { DashbaordTheme, DashboardEditorService, ILayout } from '../dashboard-editor-service';

const mouseXY: { x: number; y: number } = { x: 0, y: 0 };
const DragPos: ILayout = { x: 0, y: 0, w: 1, h: 1, i: '0' };

@Component({
  components: {
    GridLayout,
    GridItem,
    KpiWidget,
    ...PrefixedWidgets,
  },
  computed: mapGetters({}),
})
export default class Paper extends Vue {
  /* Prop 선언 */
  @Prop()
  service!: DashboardEditorService;
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */

  selected: string = '';

  colNum = DashbaordTheme.colNum;
  rowHeight = DashbaordTheme.rowHeight;

  /* refs 선언 */
  $refs!: {
    gridFrame: HTMLDivElement;
    // gridLayout: GridLayout;
    gridLayout: any;
  };
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  // created() {

  // }

  mounted() {
    document.addEventListener('dragover', this.onDragover, false);

    document.addEventListener('touchmove', this.onTouchmove, { passive: true });

    EventBus.$on('drag', (evt: Event, component: string, type: 'chart' | 'kpi') => {
      this.drag(evt, component, type);
    });

    EventBus.$on('dragend', (evt: Event, component: string, type: 'chart' | 'kpi') => {
      this.dragend(evt, component, type);
    });

    EventBus.$on('onClickDeleteWidget', (widgetId: string) => {
      this.service.deleteWidget(widgetId);
    });

    $('.vue-grid-item').resize(() => {
      this.emitReize();
    });

    this.$nextTick(() => {
      this.emitReize();
    });
  }

  beforeDestroy() {
    document.removeEventListener('dragover', this.onDragover);
    document.removeEventListener('touchmove', this.onTouchmove);
    EventBus.$off('drag');
    EventBus.$off('dragend');
    EventBus.$off('onClickDeleteWidget');
  }

  /* 메소드 선언 */

  get getLayout() {
    return this.service.getLayout();
  }

  onClickWidget(widgetId: string) {
    this.selected = widgetId;
    EventBus.$emit('createInspector', this.service.getWidget(widgetId));
  }

  drag(e: Event, template: string, type: 'chart' | 'kpi'): void {
    const parentRect = this.$refs.gridFrame.getBoundingClientRect();
    let mouseInGrid = false;

    // 마우스 포인트가 .grid-layout-frame에 들어왔는지 확인
    if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom) {
      mouseInGrid = true;
    }

    let w = 4;
    let h = 3;

    if (type === 'kpi') {
      w = 2;
      h = 1;
    }

    if (template === 'ResourceActivity' || template === 'OriginatorActivity') {
      h = 6;
    }

    // 마우스 포인트가 .grid-layout-frame에 들어가 있으며 layout item에 drop이 없을 때 drop layout item 추가
    if (mouseInGrid === true && this.service.getWidgetIndexById('drop') === -1) {
      this.service.addWidget(
        {
          x: (this.service.getLayout().length * 2) % this.colNum,
          y: this.service.getLayout().length + this.colNum, // puts it at the bottom
          w: w,
          h: h,
          i: 'drop',
        },
        template
      );
    }
    const index = this.service.getWidgetIndexById('drop');
    if (index !== -1) {
      try {
        this.$refs.gridLayout.$children[this.service.getLayout().length].$refs.item.style.display = 'none';
      } catch {
        return;
      }
      const el = this.$refs.gridLayout.$children[index];
      el.dragging = { top: mouseXY.y - parentRect.top, left: mouseXY.x - parentRect.left };
      const newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
      if (mouseInGrid === true) {
        this.$refs.gridLayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, h, w);
        DragPos.i = String(index);
        DragPos.x = this.service.getLayout()[index].x;
        DragPos.y = this.service.getLayout()[index].y;
        DragPos.w = w;
        DragPos.h = h;
      }
      if (mouseInGrid === false) {
        this.$refs.gridLayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, h, w);
        this.service.deleteDropItem();
      }
    }
  }

  dragend(e: Event, template: string, type: 'chart' | 'kpi'): void {
    const parentRect = this.$refs.gridFrame.getBoundingClientRect();
    let mouseInGrid = false;
    if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom) {
      mouseInGrid = true;
    }
    if (mouseInGrid === true) {
      // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
      this.$refs.gridLayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, DragPos.w, DragPos.h);
      this.service.deleteDropItem();

      // UNCOMMENT below if you want to add a grid-item

      let maxIndex = this.service.getMaxIndex();
      maxIndex += 1;

      this.service.addWidget(
        {
          x: DragPos.x,
          y: DragPos.y,
          w: DragPos.w,
          h: DragPos.h,
          i: 'page-0-widget-' + maxIndex,
        },
        template
      );

      this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, DragPos.h, DragPos.w);
      this.$refs.gridLayout.$children[this.service.getLayout().length].$refs.item.style.display = 'block';
      // }
    }
  }

  onDragover(e: MouseEvent): void {
    mouseXY.x = e.clientX;
    mouseXY.y = e.clientY;
  }

  onTouchmove(e: TouchEvent) {
    const touch = e.touches[0];
    mouseXY.x = touch.clientX;
    mouseXY.y = touch.clientY;
  }

  onClickContainer(evt: MouseEvent) {
    if (evt.target === this.$refs.gridLayout.$el || evt.target === this.$refs.gridFrame) {
      this.emitReize();
    }
  }

  emitReize() {
    setTimeout(() => {
      EventBus.$emit('resize');
    }, 100);
  }
}
</script>