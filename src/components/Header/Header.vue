<template>
  <header class="app-header navbar header-component">
    <!-- logo -->
    <div class="menu-logo-content">
      <button id="mobileSidebarToggle" class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" v-show="sidebar !== null" @click="onClickMobileSidebarToggle">
        <!-- <span class="navbar-toggler-icon"></span> -->
        <span class="h1 mb-2"><div class="ico-menubar" alt="햄버거 메뉴 아이콘"></div></span>
      </button>
      <button id="sidebarToggle" class="navbar-toggler sidebar-toggler d-md-down-none" type="button" v-show="sidebar !== null" @click="onClickSidebarToggle">
        <!-- <span class="navbar-toggler-icon"></span> -->
        <span class="h1 mb-2"><div class="ico-menubar" alt="햄버거 메뉴 아이콘"></div></span>
      </button>
      <b-link class="navbar-brand" :to="isNoNeedTokenSSO() ? { name: 'Login' } : { name: 'Home' }"></b-link>
    </div>
    <!-- logo -->

    <!-- project title -->
    <!-- <div class="content-title">
      <template v-if="isProcessMenu()">
        <div class="title">{{ $route.query.rgId === undefined ? (eventView.project.id == 'iprdemo' ? $t('view.' + eventView.name) : eventView.name) : projectView.name }}</div>
        <div v-if="$route.query.rgId !== undefined" class="event-title">
          <b-dropdown :text="`${getDatasetName(eventView.id)} - ${eventView.name}`" class="event-dropdown">
            <b-dropdown-item class="item" :class="{ active: item.id === eventView.id }" v-for="item in projectView.relations" :key="item.id" @click="updateRoute(item.id)">{{ `${getDatasetName(item.id)} - ${item.name}` }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </div> -->
    <!-- project title -->

    <!-- show-help -->
    <!-- <div v-show="showHelp()" class="help-item">
      <b-icon-question-fill v-b-tooltip.hover :title="$t('view.common.tooltip.help')" class="ico-help tooltip" @click="showTooltip = true" desc="도움말"></b-icon-question-fill>
    </div>

    <div class="show-help" v-if="showTooltip">
      <div class="help-component">
        <b-button @click="showTooltip = false"><div class="ico-close" alt="close icon"></div></b-button>
        <component :is="componentName" />
      </div>
    </div> -->
    <!-- show-help -->

    <!-- right-filter -->
    <template v-if="token !== null && !isNoNeedTokenSSO()">
      <b-navbar-nav class="ml-auto user-navigation">
        <div class="user-name-content">
          <div class="user-name">{{ $t('view.common.header.loginUserName', { name: myInfo !== null ? myInfo.fullname : '' }) }}</div>
          <div class="user-group">({{ myInfo !== null ? myInfo.groupName : '' }})</div>
        </div>

        <div class="notification-content" @click="showOrCloseNoti()">
          <div class="ico-head ico-alarm-w" alt="알림 아이콘"></div>
          <!-- <b-badge pill variant="danger" class="notification-count">{{isVisibleLength()}}</b-badge> -->
          <div class="badge-count" v-if="notiBadgeShow"></div>
        </div>

        <div class="language-content">
          <b-dropdown id="languageSelection" :text="i18nToUpperCase">
            <b-dropdown-item @click="onClickChangeLocale('kr')">KR</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="onClickChangeLocale('en')">EN</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-navbar-nav>
      <!-- right-filter -->
      <div v-show="showAlarm">
        <Notification @closeNoti="showOrCloseNoti()" ref="notification"/>
      </div>
    </template>
  </header>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { EventBus, utils } from '../../common';
import { mapGetters } from 'vuex';

import _ from 'lodash';

import Notification from '../Notification.vue';
import $ from 'jquery';

@Component({
  components: {
    Notification,
  },
  computed: mapGetters({
      projectView: 'project/getRepoProjectGroupView',
      eventView: 'repository/getRepoEventView',
      datasetList: 'repository/getRepoDataIndex',
      token: 'oauth/getToken',
      myInfo: 'sso/getMyInfo',

      notificationList: 'notification/getNotificationList',
  }),
})
export default class Header extends Vue {
  showAlarm: boolean = false;

  token!: any;
  myInfo!: any;
  projectView!: any;
  eventView!: any;
  datasetList!: any;

  sidebar: any = null;

  showTooltip: boolean = false;
  componentName: string = '';

  notificationList: any[];

  notiBadgeShow: boolean = true;

  oldValueNoti: any = [];

  $refs!: {
    notification: Notification;
  }; 

  mounted() {
    this.sidebar = document.getElementById('sidebar');
    if (this.sidebar) {
      this.sidebar.addEventListener(
        'transitionend',
        () => {
          EventBus.$emit('resize');
        },
        false
      );
    }

    document.querySelector('body').addEventListener('click', this.clickListener);
 
    //document.getElementById('languageSelection').addEventListener('mousedown', this.localeDropDown);
  
    const el = document.getElementById('languageSelection');
    if(el){
      el.addEventListener('mousedown', this.localeDropDown);
    }
    this.oldValueNoti = _.clone(this.notificationList);
  }

  localeDropDown() {
    this.showAlarm = false;
    if(this.$refs.notification)
      this.$refs.notification.closeAllNotiWindow();
  }


  @Watch('notificationList', { immediate: true })
  onNotificationListChange(newValue: any, oldValue: any) {

    if(this.notificationList.length == 0) {
      //아무 알림도 없을 때는 뱃지를 표시하지 않는다
      this.notiBadgeShow = false;
    }else{

      //this.notiBadgeShow = true;
      
      //새로 온 noti의 상태 변경에만 뱃지 표시
      //새로 온 noti의 진행률 변경에는 뱃지 표시 X

      //새로 noti가 들어왔을 때 
      //serviceId 가 동일하면 동일한 위치에 넣고(갯수는 그대로)
      //serviceId 가 다르면 맨 앞에 추가한다.(갯수 추가)
      
      if(newValue.length == this.oldValueNoti.length) { //동일한 serviceId의 noti가 이미 있을 떄

        //this.notiBadgeShow = false;
        for(let idx = 0; idx < newValue.length; idx++){
          const newState = (JSON.parse(newValue[idx].notificationData)).state;
          const oldState = (JSON.parse(this.oldValueNoti[idx].notificationData)).state;

          if(newState != oldState) {
            
            this.notiBadgeShow = true;
          }
        }
      }else{
        //알림이 추가되었을 때는 뱃지를 표시한다.
        this.notiBadgeShow = true;
      }
      
    }

    this.oldValueNoti = _.clone(newValue);

  }

  @Watch('showAlarm', { deep: true })
  onShowAlarmChange(newValue: boolean, oldValue: boolean) {

    if(oldValue == true && newValue == false){
      //notification을 열었다가 닫았을 떄는 뱃지를 표시하지 않는다.
      this.notiBadgeShow = false;
    }

  }

  clickListener(e: any) {

    if (!($(e.target).parents('.notification-content').length < 1)) {
      return;
    }
    this.showAlarm = false;
    if(this.$refs.notification)
      this.$refs.notification.closeAllNotiWindow();
    //this.showOrCloseNoti();
  }

  isProcessMenu() {
    switch (this.$route.name) {
      case 'dashboard':
      case 'processDiscovery':
      case 'deltaAnalysis':
      case 'logReplay':
      case 'socialAnalysis':
      case 'matrixModel':
      case 'dotted': {
        return true;
      }
      default: {
        return false;
      }
    }
  }

  isManager() {
    if (this.token === null || this.myInfo === null) return false;
    else if (this.myInfo.roleCode !== 'GROUP_USER') return true;
    else return false;
  }

  isNoNeedTokenSSO() {
    return utils.isNoNeedTokenSSO(this.$route.name);
  }

  getDatasetName(id: string) {
    const _id = id.split('_');
    return this.datasetList.elements[_id[0]] ? this.datasetList.elements[_id[0]].name : '';
  }

  showHelp() {
    switch (this.$route.name) {
      case 'processDiscovery': {
        this.componentName = 'ProcessDiscoveryHelp';
        return true;
      }
      case 'deltaAnalysis': {
        this.componentName = 'DeltaAnalysisHelp';
        return true;
      }
      case 'logReplay': {
        this.componentName = 'LogReplayHelp';
        return true;
      }
      case 'socialAnalysis': {
        this.componentName = 'SocialAnalysisHelp';
        return true;
      }
      case 'matrixModel': {
        this.componentName = 'MatrixModelHelp';
        return true;
      }
      case 'dotted': {
        this.componentName = 'DottedHelp';
        return true;
      }
      case 'dashboard': {
        this.componentName = 'DashboardHelp';
        return true;
      }
      case 'projectList': {
        this.componentName = 'ProjectListHelp';
        return true;
      }
      case 'eventMapping': {
        this.componentName = 'MappingHelp';
        return true;
      }
      case 'eventList': {
        this.componentName = 'EventListHelp';
        return true;
      }
      case 'standardList': {
        this.componentName = 'StandardListHelp';
        return true;
      }
      case 'standardEditor': {
        this.componentName = 'EditorHelp';
        return true;
      }
      default: {
        this.componentName = '';
        return false;
      }
    }
  }

  onClickChangeTheme(color: string) {
    this.$store.commit('sso/setColorTheme', color);
    document.documentElement.className = 'theme-' + color;
  }

  onClickChangeLocale(lang: string): void {
    this.$i18n.locale = lang;
    EventBus.$emit('changeLocale');
  }

  onClickSidebarToggle(e: any) {
    if (!this.sidebar) return;
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }
  sidebarMinimize(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }
  onClickMobileSidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  destroyed() {
    document.querySelector('body').removeEventListener('click', this.clickListener);
  }

  isVisibleLength() {
    let length = 0;
    this.notificationList.forEach((data: any) => {
      const notificationData = data.notificationData;

      if (this.IsJsonString(notificationData)) {
        const client = JSON.parse(notificationData).client;

        if (!(client != null && client.visible != undefined && client.visible === false)) {
          length++;
        }
      }
    });

    return length;
  }

  IsJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  get i18nToUpperCase() {
    return this.$i18n.locale.toUpperCase();
  }

  showOrCloseNoti() {
    if(this.showAlarm) {
      //showAlarm = true
      this.showAlarm = false;
      if(this.$refs.notification)
        this.$refs.notification.closeAllNotiWindow();
    }else {
      //showAlarm = false
      this.showAlarm = true;
    }
  }

}
</script>
