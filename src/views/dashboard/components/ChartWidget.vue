<template>
  <div class="card chart editor">
    <div class="content-header">
      <div class="title">
        {{ title }}
      </div>
      <div class="right-align">
        <slot name="right-align">
          <b-button v-if="$route.name === 'DashboardEditor'" @click="onClickDeleteWidget()" class="btn-clear">
            <div class="ico-header ico-clear"></div>
          </b-button>
        </slot>
      </div>
    </div>
    <b-overlay :show="notHaveField || notHavePM || isNoData || showLoading" bg-color="#fff" opacity="1" class="content-body w-100 h-100 overlay-dashboard-widget">
      <slot name="content">
        <div ref="chart" class="content w-100 h-100"></div>
      </slot>
      <template #overlay>
        <div v-if="notHaveField || isNoData" class="nodata-text w-100">{{ $t('view.process.alert.Nodata') }}</div>
        <div v-else-if="notHavePM" class="nodata-text w-100">{{ $t('view.dashboard.alert.noProcess') }}</div>
        <b-spinner v-else label="Spinning"></b-spinner>
      </template>
    </b-overlay>
  </div>
</template>

<style lang="scss" scoped>
.content-body::v-deep {
  .content > div {
    overflow: hidden;
    > canvas {
      overflow: hidden;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import { IWidget } from '../editor/dashboard-editor-service';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class ChartWidgetCard extends Vue {
  /* Prop 선언 */
  @Prop()
  widget?: IWidget;

  @Prop({ default: '' })
  title!: string;

  @Prop({ default: false })
  notHaveField?: boolean;

  @Prop({ default: false })
  notHavePM?: boolean;

  @Prop({ default: false })
  isNoData!: boolean;

  @Prop({ default: false })
  showLoading!: boolean;

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */

  /* refs 선언 */
  $refs!: {
    chart: HTMLDivElement;
  };

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 
 created(){
   
 }
 */
  /*
 mounted() {
   
 }
 */

  /* 메소드 선언 */
  getChartElement() {
    return this.$refs.chart;
  }

  onClickDeleteWidget() {
    EventBus.$emit('onClickDeleteWidget', this.widget.i);
  }
}
</script>