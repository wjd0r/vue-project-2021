<template>
  <!-- help : header -->
  <div class="header-component">
    <!-- 햄버거 메뉴 -->
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" v-show="helpSidebar !== null" @click="onClickMobileSidebarToggle">
      <span class="h1 mb-2"><div class="ico-menubar" alt="햄버거 메뉴 아이콘"></div></span>
    </button>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" v-show="helpSidebar !== null" @click="onClickSidebarToggle">
      <span class="h1 mb-2"><div class="ico-menubar" alt="햄버거 메뉴 아이콘"></div></span>
    </button>
    <!-- 햄버거 메뉴 -->

    <!-- 로고-->
    <div class="logo navbar-brand" alt="IPR 로고 흰색"></div>
    <!-- 로고 -->

    <div class="title">{{$t('view.header.help')}}</div>

    <!-- 언어 -->
    <b-navbar-nav class="ml-auto user-navigation">
      <div class="language-content">
        <b-dropdown id="languageSelection" :text="i18nToUpperCase">
          <b-dropdown-item @click="onClickChangeLocale('kr')">KR</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="onClickChangeLocale('en')">EN</b-dropdown-item>
        </b-dropdown>
      </div>
    </b-navbar-nav>
    <!-- 언어 -->
  </div>
  <!-- help : header -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { EventBus } from '@/common';
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
})
export default class HelpHeader extends Vue {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  helpSidebar: any = null;
  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  // created() {}
  mounted() {
    this.helpSidebar = document.getElementById('HelpSidebar');
    if (this.helpSidebar) {
      this.helpSidebar.addEventListener(
        'transitionend',
        () => {
          EventBus.$emit('resize');
        },
        false
      );
    }
  }  

  /* 메소드 선언 */
  onClickSidebarToggle(e: any) {
    if (!this.helpSidebar) return;
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  onClickMobileSidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  get i18nToUpperCase() {
    return this.$i18n.locale.toUpperCase();
  }

  onClickChangeLocale(lang: string): void {
    this.$i18n.locale = lang;
    EventBus.$emit('changeLocale');
  }
}
</script>