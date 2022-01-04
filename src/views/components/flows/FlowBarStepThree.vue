<template>
  <!-- flowbar -->
  <div class="flowbar-component">
    <div class="flowbar-content flowbar-3">
      <!--flowbar-3-->
      <!-- 서브 이벤트 생성 -->
      <FlowbarSubEvent v-if="mode === 'subRepository'" :class="{ disabled: stage !== 1 }" />
      <!-- 서브 이벤트 생성 -->

      <!-- 표준 프로세스 생성 -->
      <FlowbarStandard v-if="mode === 'standard'" :class="{ disabled: stage !== 1 }" />
      <!-- 표준 프로세스  생성 -->

      <!-- Topology 정보 입력 -->
      <FlowbarTopologyInput v-if="mode === 'topology'" :class="{ disabled: stage !== 1 }"/>
      <!-- Topology 정보 입력 -->

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>

      <!-- 이벤트 필터 -->
      <FlowbarEventFilter v-if="mode === 'subRepository'" :class="{ disabled: stage !== 2 }" />
      <!-- 이벤트 필터 -->

      <!-- 프로세스 편집(옵션) -->
      <FlowbarProcessEditor v-if="mode === 'standard'" :class="{ disabled: stage !== 2 }" />
      <!-- 프로세스 편집(옵션) -->

      <!-- Pipeline 설정 -->
      <FlowbarPipeline v-if="mode === 'topology'" :class="{ disabled: stage !== 2 }"/>
      <!-- Pipeline 설정 -->

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>

      <!-- 완료 -->
      <FlowbarComplete :class="{ disabled: stage !== 3 }"  :selected="stage == 3"/>
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
export default class FlowBarStepThree extends Vue {
  /* Prop 선언 */
  @Prop({ default: 'standard' })
  mode!: 'subRepository' | 'standard' | 'topology';

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