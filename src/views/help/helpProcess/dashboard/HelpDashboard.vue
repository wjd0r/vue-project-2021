<template>
  <!-- 도움말 : 데이터요약 -->
  <div class="help-content help-process help-common" >
    <section id="help-dashboard">
      <div class="content-header"><h3 class="title">{{$t('view.helpDashboard.dataSummary')}}</h3></div>
      <div class="content-middle">
        <div class="content-text" v-html="$t('view.helpDashboard.explainDataSummary')">
        </div>
        <div class="content-img">
          <img src="../../images/process/dashboard/help_dashboard_tab.jpg" alt="데이터 요약 메뉴 탭 버튼 이미지">
        </div>
      </div>
    </section>
    <div class="content-body">
      <!-- 데이터요약 탭 -->
      <HelpTabOverview/>
      <!-- 데이터요약 탭 -->

      <!-- 액티비티 탭 -->
      <HelpTabActivity/>
      <!-- 액티비티 탭 -->

      <!-- 리소스 탭 -->
      <HelpTabResource/>
      <!-- 리소스 탭 -->

      <!-- 담당자 탭 -->
      <HelpTabOriginator/>
      <!-- 담당자 탭 -->

      <!-- 비용 탭 -->
      <HelpTabCost/>
      <!-- 비용 탭 -->

      <!-- 개인 대시보드 탭 -->
      <HelpTabPersonal/>
      <!-- 개인 대시보드 탭 -->
    </div>
  </div>
  <!-- 도움말 : 데이터요약 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpTabOverview from './tabs/HelpTabOverview.vue';
import HelpTabActivity from './tabs/HelpTabActivity.vue';
import HelpTabResource from './tabs/HelpTabResource.vue';
import HelpTabOriginator from './tabs/HelpTabOriginator.vue';
import HelpTabCost from './tabs/HelpTabCost.vue';
import HelpTabPersonal from './tabs/HelpTabPersonal.vue';

@Component({
  components: {
    HelpTabOverview,
    HelpTabActivity,
    HelpTabResource,
    HelpTabOriginator,
    HelpTabCost,
    HelpTabPersonal
  },
  computed: mapGetters({}),
})
export default class HelpDashboard extends Vue {
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