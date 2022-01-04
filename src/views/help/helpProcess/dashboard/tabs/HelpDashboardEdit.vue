<template>
  <!-- 도움말 : 대시보드 편집 -->
  <div class="help-item">
    <div class="help">
      <div class="content-header"><h4 class="title">{{$t('view.helpDashboardEdit.editDashboard')}}</h4></div>
      <div class="content-body">
        <div class="content-img"></div>
        <div class="content-text" v-html="$t('view.helpDashboardEdit.explainEditDashboard')">
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 대시보드 편집 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {

  },
  computed: mapGetters({}),
})
export default class HelpDashboardEditor extends Vue {
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