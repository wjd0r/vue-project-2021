<template>
  <!-- 도움말 : 데이터 관리하기 -->
  <div class="help-component">
    <div class="content-header"><h3 class="title" >{{$t('view.helpDataManage.dataManageForProcessInspect')}}</h3></div>
    <div class="content-body">
      <!-- 워크스페이스 -->
      <div class="help-content">
        <section id="help-workspace-data-manage">
          <div class="content-header"><h3 class="title">{{$t('view.helpDataManage.workspace')}}</h3></div>
          <div class="help-item">
            <div class="help-group">
              <div class="help">
                <section id="help-workspace-is">
                  <div class="help-header">
                    <h4 class="title">{{$t('view.helpDataManage.workspaceIs')}}</h4>
                  </div>
                  <div class="content-text pl-10 pr-10" v-html="$t('view.helpDataManage.explainWorkSpace1')">
                  </div>
                  <div class="content-img p-10 pb-0">
                    <img src="../images/data/help_workspace_01.jpg" alt="워크스페이스 목록 이미지">
                  </div>
                  <div class="content-text p-10 pb-0" v-html="$t('view.helpDataManage.explainWorkSpace2')">
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- 워크스페이스 -->
      
      <!-- 홈 -->
      <HelpHome/>
      <!-- 홈 -->

      <!-- 데이터 -->
      <HelpData/>
      <!-- 데이터 -->

      <!-- 표준 프로세스 -->
      <HelpStandard/>
      <!-- 표준 프로세스 -->

      <!-- 데이터 소스 -->
      <HelpDataSource/>
      <!-- 데이터 소스 -->
    </div>
  </div>
  <!-- 도움말 : 데이터 관리하기 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpHome from './dataManage/HelpHome.vue';
import HelpData from './dataManage/HelpData.vue';
import HelpStandard from './dataManage/HelpStandard.vue';
import HelpDataSource from './dataManage/HelpDataSource.vue';

@Component({
  components: {
    HelpHome,
    HelpData,
    HelpStandard,
    HelpDataSource
  },
  computed: mapGetters({}),
})
export default class HelpDataManage extends Vue {
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