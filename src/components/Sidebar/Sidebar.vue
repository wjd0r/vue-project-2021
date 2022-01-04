<template>
  <div ref="sidebar" class="sidebar sidebar-component sidebar-transition" id="sidebar">
    <div class="side-content">
      <nav class="nav sidebar-transition">
        <ul class="nav-menu sidebar-transition">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isHere('Home') }" :to="getHref('Home')" @click.native="onToggleSidebar()">
              <div class="nav-ico">
                <div class="nav-ico ico-home" alt="홈 아이콘"></div>
              </div>
              <div class="nav-title">{{ $t('view.router.home.title') }}</div>
            </router-link>
          </li>

          <template v-if="isAnalysisMenu">
            <li class="nav-item sidebar-transition">
              <div class="nav-header nav-open">Analysis</div>
              <div class="nav-header nav-hidden">ALY</div>
              <router-link class="nav-link" :class="{ active: isHere('Dashboard') }" :to="getHref('Dashboard')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-dashboard" alt="대시보드 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.dashboard.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('ProcessDiscovery') }" :to="getHref('ProcessDiscovery')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-discovery" alt="프로세스 분석 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.processDiscovery.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('DeltaAnalysis') }" :to="getHref('DeltaAnalysis')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-delta" alt="프로세스 비교 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.deltaAnalysis.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('LogReplay') }" :to="getHref('LogReplay')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-logreplay" alt="프로세스 애니메이션 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.logReplay.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('SocialAnalysis') }" :to="getHref('SocialAnalysis')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-social" alt="리소스 관계 분석 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.socialAnalysis.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('MatrixModel') }" :to="getHref('MatrixModel')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-matrix" alt="데이터 분석 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.matrixModel.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('Dotted') }" :to="getHref('Dotted')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-dotted" alt="액티비티 분석 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.dotted.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('ProcessFlow') }" :to="getHref('ProcessFlow')" @click.native="onToggleSidebar()">
                <div class="nav-ico">
                  <div class="nav-ico ico-gantt" alt="프로세스 흐름 분석 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.processFlow.title') }}</div>
              </router-link>
            </li>
          </template>

          <li class="nav-item">
            <div class="nav-header nav-open">Organize</div>
            <div class="nav-header nav-hidden">ORG</div>
            <router-link class="nav-link" :class="{ active: isHere('EventList') }" :to="getHref('EventList')" @click.native="onToggleSidebar()">
              <div class="nav-ico">
                <div class="nav-ico ico-data" alt="데이터 아이콘"></div>
              </div>
              <div class="nav-title">{{ $t('view.router.eventList.title') }}</div>
            </router-link>
            <router-link class="nav-link" :class="{ active: isHere('StandardList') }" :to="getHref('StandardList')" @click.native="onToggleSidebar()">
              <div class="nav-ico">
                <div class="nav-ico ico-standard" alt="표준 프로세스 아이콘"></div>
              </div>
              <div class="nav-title">{{ $t('view.router.standardList.title') }}</div>
            </router-link>
            <router-link class="nav-link" :class="{ active: isHere('DatabaseSource') }" :to="getHref('DatabaseSource')" @click.native="onToggleSidebar()">
              <div class="nav-ico">
                <div class="nav-ico ico-datasource" alt="데이터소스 아이콘"></div>
              </div>
              <div class="nav-title">{{ $t('view.router.datasource.title') }}</div>
            </router-link>
          </li>
          <template v-if="!isMobileBlock()">
            <li class="nav-item">
              <div class="nav-header nav-open">Management</div>
              <div class="nav-header nav-hidden">MGT</div>
              <router-link class="nav-link" :class="{ active: isHere('MeModify') }" :to="getHref('MeModify')">
                <div class="nav-ico">
                  <div class="nav-ico ico-user" alt="사용자 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.me.title') }}</div>
              </router-link>
              <router-link class="nav-link" :class="{ active: isHere('SystemManagement') }" :to="getHref('SystemManagement')">
                <div class="nav-ico">
                  <div class="nav-ico ico-setting" alt="설정 아이콘"></div>
                </div>
                <div class="nav-title">{{ $t('view.router.systemManagement.title') }}</div>
              </router-link>
              <a class="nav-link" :class="{ active: isHere('UserManagement') }" v-b-toggle.navManage>
                <div class="nav-ico">
                  <div class="nav-ico ico-manage" alt="관리 아이콘"></div>
                </div>
                <div class="nav-title-group">
                  <div class="nav-title">{{ $t('view.router.userManagement.title') }}</div>
                  <div class="right-align">
                    <div class="nav-ico ico-arrow-top" alt="방향 아이콘"></div>
                  </div>
                </div>
              </a>
              <b-collapse id="navManage" class="nav-sub">
                <li class="nav-item" v-if="checkPermission">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('topologyTemplate') }" :to="getUserManagementHref('topologyTemplate')" @click.native="onToggleSidebar()">토폴로지 template 관리</router-link>
                </li>
                <li class="nav-item" v-if="checkPermission">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('topologyInstance') }" :to="getUserManagementHref('topologyInstance')" @click.native="onToggleSidebar()">토폴로지 instance 관리</router-link>
                </li>
                <li class="nav-item" v-if="checkPermission">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('user') }" :to="getUserManagementHref('user')" @click.native="onToggleSidebar()">{{ $t('view.router.userManagement.user.title') }}</router-link>
                </li>
                <li class="nav-item" v-if="checkPermission">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('workspace') }" :to="getUserManagementHref('workspace')">{{ $t('view.router.userManagement.workspace.title') }}</router-link>
                </li>
                <li class="nav-item" v-if="checkPermission">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('role') }" :to="getUserManagementHref('role')" @click.native="onToggleSidebar()">{{ $t('view.router.userManagement.role.title') }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('menuHistory') }" :to="getUserManagementHref('menuHistory')" @click.native="onToggleSidebar()">{{ $t('view.router.userManagement.menuHistory.title') }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :class="{ active: isHereForUserManagement('loginHistory') }" :to="getUserManagementHref('loginHistory')" @click.native="onToggleSidebar()">{{ $t('view.router.userManagement.loginHistory.title') }}</router-link>
                </li>
              </b-collapse>
            </li>
          </template>
        </ul>
      </nav>

      <div class="nav-bottom sidebar-transition">
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
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { UtilsMixin } from '@/mixin';

@Component({
  ...utils.getMq(),
} as any)
export default class Sidebar extends Mixins(UtilsMixin) {
  mobileSidebarToggle: HTMLElement = null;
  sidebarToggle: HTMLElement = null;

  $refs!: {
    sidebar: HTMLDivElement;
  };

  $mq!: {
    phone: boolean;
    tablet: boolean;
    desktop: boolean;
  };

  mounted() {
    this.mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    this.sidebarToggle = document.getElementById('sidebarToggle');
    window.addEventListener('click', this.sidebarContainsEvent);
  }

  beforeDestroy() {
    window.removeEventListener('click', this.sidebarContainsEvent);
  }

  getHref(name: string) {
    const props = this.$router.resolve({
      name: name,
      params: this.$route.params,
    });

    return props.href;
  }

  getUserManagementHref(tab: string) {
    const props = this.$router.resolve({
      name: 'UserManagement',
      query: {
        tab: tab,
      },
    });

    return props.href;
  }

  // 메뉴 아이템과 현재 페이지가 동일한지 (관리 페이지 제외)
  isHere(name: string) {
    return this.$route.name === name;
  }

  isHereForUserManagement(tab: string) {
    const route = this.$route;

    if (route.name !== 'UserManagement') {
      return false;
    } else {
      return route.query.tab === tab;
    }
  }

  // 분석 메뉴인지 아닌지
  get isAnalysisMenu() {
    switch (this.$route.name) {
      case 'Dashboard':
      case 'ProcessDiscovery':
      case 'DeltaAnalysis':
      case 'LogReplay':
      case 'SocialAnalysis':
      case 'MatrixModel':
      case 'Dotted':
      case 'Gantt':
      case 'ProcessFlow': {
        return true;
      }
      default: {
        return false;
      }
    }
  }

  onClickLogout() {
    EventBus.$emit('closeSSE');

    this.$store.dispatch('oauth/logout');
    this.$store.dispatch('sso/logout');
    this.$router.push({ name: 'Login' });
  }

  onClickHelp() {
    EventBus.$emit('showHelp');
  }

  onToggleSidebar(force?: boolean) {
    if (!document.getElementById('sidebar') || this.$mq.desktop) return;
    document.body.classList.toggle('sidebar-mobile-show', force);
  }

  sidebarContainsEvent(evt: Event) {
    const target: any = evt.target;

    if (!this.$refs.sidebar.contains(target) && !this.mobileSidebarToggle.contains(target) && !this.sidebarToggle.contains(target)) {
      this.onToggleSidebar(false);
    }
  }

  // 권한 체크
  get checkPermission() {
    const resourceCreate = utils.checkPermission('*', '*', '*', 'workspace.resource', 'create');
    const resourceDelete = utils.checkPermission('*', '*', '*', 'workspace.resource', 'delete');
    const resourceExport = utils.checkPermission('*', '*', '*', 'workspace.resource', 'export');
    const resourceUpdate = utils.checkPermission('*', '*', '*', 'workspace.resource', 'update');
    const resourceView = utils.checkPermission('*', '*', '*', 'workspace.resource', 'view');
    const assignAdmin = utils.checkPermission('*', '*', '*', 'workspace.resource.assign', 'admin');
    const assignUser = utils.checkPermission('*', '*', '*', 'workspace.resource.assign', 'user');
    const removeUser = utils.checkPermission('*', '*', '*', 'workspace.resource.remove', 'user');
    const transferaAmin = utils.checkPermission('*', '*', '*', 'workspace.resource.transfer', 'admin');
    const workspaceMapping = utils.checkPermission('*', '*', '*', 'workspace.resource.workspace', 'mapping');

    return resourceCreate && resourceDelete && resourceExport && resourceUpdate && resourceView && assignAdmin
      && assignUser && removeUser && transferaAmin && workspaceMapping;
  }
}
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}
</style>
