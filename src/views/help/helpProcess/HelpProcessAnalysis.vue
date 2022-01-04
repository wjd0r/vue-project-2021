<template>
  <!-- 도움말 : 프로세스 분석하기 -->
  <div class="help-component">
    <div class="content-header"><h2 class="title">{{$t('view.helpProcessAnalysis.inspectProcess')}}</h2></div>
    <div class="content-body">
      <!-- 공통 -->
      <HelpCommon/>
      <!-- 공통 -->

      <!-- 데이터 요약 -->
      <HelpDashboard/>
      <!-- 데이터 요약 -->

      <!-- 프로세스 분석 -->
      <HelpDiscovery/>
      <!-- 프로세스 분석 -->

      <!-- 프로세스 비교 -->
      <HelpDelta/>
      <!-- 프로세스 비교 -->

      <!-- 프로세스 애니메이션 -->
      <HelpLogReplay/>
      <!-- 프로세스 애니메이션 -->

      <!-- 리소스 관계 분석 -->
        <HelpSocial/>
      <!-- 리소스 관계 분석 -->

      <!-- 데이터 분석 -->
      <HelpMatrix/>
      <!-- 데이터 분석 -->

      <!-- 액티비티 분석 -->
      <HelpDotted/>
      <!-- 액티비티 분석 -->

      <!-- 프로세스 흐름 분석 -->
      <HelpProcessFlow/>
      <!-- 프로세스 흐름 분석 -->
    </div>
  </div>
  <!-- 도움말 : 프로세스 분석하기 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';


import HelpCommon from './components/HelpCommon.vue' 
import HelpDashboard from './dashboard/HelpDashboard.vue';
import HelpDiscovery from './discovery/HelpDiscovery.vue';
import HelpDelta from './delta/HelpDelta.vue';
import HelpLogReplay from './logreplay/HelpLogReplay.vue';
import HelpSocial from './social/HelpSocial.vue';
import HelpMatrix from './matrix/HelpMatrix.vue';
import HelpDotted from './dotted/HelpDotted.vue';
import HelpProcessFlow from './processFlow/HelpProcessFlow.vue';

@Component({
  components: {
    HelpCommon,
    HelpDashboard,
    HelpDiscovery,
    HelpDelta,
    HelpLogReplay,
    HelpSocial,
    HelpMatrix,
    HelpDotted,
    HelpProcessFlow
  },
  computed: mapGetters({}),
})
export default class HelpProcessAnalysis extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 메소드 선언 */
}
</script>