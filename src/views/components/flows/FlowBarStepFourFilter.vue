<template>
  <!-- flowbar -->
  <div class="flowbar-component">
    <div class="flowbar-content flowbar-3">
      <!--flowbar-3-->
      <!-- 서브 데이터 정보 입력 -->
      <FlowbarSubDataset v-if="mode === 'dataset'" :class="{ disabled: stage !== 1 }" :selected="stage == 1" />
      <!-- 서브 데이터 정보 입력 -->

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>

      <!-- 데이터 필터(옵션) -->
      <FlowbarDataFilter :class="{ disabled: stage !== 2 }" :selected="stage == 2" />
      <!-- 데이터 필터(옵션) -->

      <!--<div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>-->

      <!-- 데이터 매핑 -->
      <!--<FlowbarMapping :class="{ disabled: stage !== 3 }" :selected="stage == 3" />-->
      <!-- 데이터 매핑 -->

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>

      <!-- 완료 -->
      <FlowbarComplete :class="{ disabled: stage !== 4 }" :selected="stage == 4" />
      <!-- 완료 -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import FlowBarComponent from '@/views/components/flows/flowbar';

@Component({
  components: {
    ...FlowBarComponent,
  },
  computed: mapGetters({}),
})
export default class FlowBarStepFour extends Vue {
  /* Prop 선언 */
  @Prop({ default: 'dataset' })
  mode!: 'dataset' | 'repository';

  @Prop({ default: 1 })
  stage!: number;

  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
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
}
</script>