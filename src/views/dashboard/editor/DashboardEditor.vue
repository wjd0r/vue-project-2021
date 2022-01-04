<template>
  <div class="main-common-component editor-component">
    <div :show="showLoading" class="main-common-content editor-content" bg-color="#fff" opacity="1">
      <!-- editor -->
      <b-overlay :show="showLoading" class="left-component" bg-color="#fff" opacity="1">
        <div class="left-content">
          <div class="editor-component dashboard-editor-component chart-component d-flex align-items-center justify-content-center" :style="{ width: '100%', height: '100%' }">
            <div id="graph-frame" class="iochord-ipr-graph-container" :style="{ height: '100%', background: 'white' }">
              <Toolbar :service="editorService" />
              <Paper :service="editorService" />
            </div>
          </div>
        </div>
        <template #overlay>
          <b-spinner label="Spinning"></b-spinner>
        </template>
      </b-overlay>
      <!-- editor -->

      <!-- sidebar -->
      <div class="right-component">
        <div class="right-content">
          <div class="editor-sidebar-component">
            <div class="editor-sidebar-content">
              <!-- kpi -->
              <KpiPalette :service="editorService" />
              <!-- kpi -->

              <!-- chart -->
              <ChartPalette :service="editorService" />
              <!-- chart -->

              <!-- setting -->
              <Inspector :service="editorService" />
              <!-- setting -->
            </div>
          </div>
          <div class="nav-bottom">
            <div class="help-content" @click="onClickHelp()">
              <div class="nav-ico ico-help" alt="도움말 아이콘"></div>
              <div class="nav-title">{{ $t('view.common.help.title') }}</div>
            </div>
            <div class="logout-content" @click="onClickLogout()">
              <div class="nav-ico ico-logout" alt="로그아웃 아이콘"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- sidebar -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';

import { AxiosResponse } from 'axios';
import _ from 'lodash';

import { DashboardEditorService } from './dashboard-editor-service';

import KpiPalette from './components/KPIPalette.vue';
import ChartPalette from './components/ChartPalette.vue';
import Inspector from './components/Inspector.vue';
import Paper from './components/Paper.vue';
import Toolbar from './components/Toolbar.vue';

@Component({
  components: {
    KpiPalette,
    ChartPalette,
    Inspector,
    Paper,
    Toolbar,
  },
  computed: mapGetters({}),
  beforeRouteEnter(to, from, next) {
    if (utils.isMobile() && utils.isMaxWidth767()) {
      next({ path: '/process-mining/cant' });
    } else {
      next();
    }
  },
})
export default class DashboardEditor extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  editorService: DashboardEditorService = null;

  showLoading: boolean = false;
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    this.editorService = new DashboardEditorService([]);

    this.getPersonalTab();
  }

  mounted() {
    this.$nextTick(() => {
      EventBus.$emit('resize');
    });
  }

  /* 메소드 선언 */

  getPersonalTab() {
    this.showLoading = true;
    this.$store.dispatch('dashboard/getPersonalTab', [utils.buildDashboard(this)]).then((res: AxiosResponse) => {
      const dashboard = res.data.data;
      const personalTab = _.find(dashboard.pages, ['name', 'PersonalTab']);
      if (personalTab !== undefined) {
        this.editorService.setOriginLayout(_.values(personalTab.widgets));
        this.editorService.setLayout(_.values(personalTab.widgets));
      }
      this.showLoading = false;
    });
  }

  onClickHelp() {
    EventBus.$emit('showHelp');
  }

  onClickLogout() {
    EventBus.$emit('closeSSE');

    this.$store.dispatch('oauth/logout');
    this.$store.dispatch('sso/logout');
    this.$router.push({ name: 'Login' });
  }
}
</script>