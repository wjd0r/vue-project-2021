<template>
  <!-- 도움말 : 프로세스 분석하기 > 공통 -->
  <div class="help-content">
    <section id="help-process-common">
      <div class="content-header"><h3 class="title" >{{$t('view.helpCommon.processCommon')}}</h3></div>
    </section>
    <div class="content-body">
      <!-- 분석 조건 -->
      <HelpFilter/>
      <!-- 분석 조건 -->

      <!-- 분석 목록 -->
      <HelpVariant/>
      <!-- 분석 목록 -->

      <!-- 테이블 목록 -->
      <HelpTable/>
      <!-- 테이블 목록 -->
    </div>
  </div>
  <!-- 도움말 : 프로세스 분석하기 > 공통 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpFilter from './HelpFilter.vue';
import HelpVariant from './HelpVariant.vue';
import HelpTable from './HelpTable.vue';

@Component({
  components: {
    HelpFilter,
    HelpVariant,
    HelpTable,
  },
  computed: mapGetters({}),
})
export default class HelpCommon extends Vue {
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