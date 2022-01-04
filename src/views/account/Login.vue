<template>
  <b-container class="sso-common-component login-component">
    <div class="login-content">
      <div class="content-header">
        <div class="logo-ipr-fullname" alt="ipr fullname logo"></div>
      </div>
      <div class="content-body">
        <div class="form-content">
          <h2 class="title">{{ $t('view.sso.label.login') }}</h2>
          <div class="content-explain">
            <b-form-group :state="showError ? false : null" :invalid-feedback="$t('view.sso.alert.loginFail')">
              <b-input type="text" :placeholder="$t('view.sso.label.email')" desc="이메일" v-model="username" @focus="showError = false" :state="showError ? false : null"></b-input>
              <b-input type="password" :placeholder="$t('view.sso.label.password')" desc="비밀번호" v-model="password" @keypress.enter="onClickLogin()" @focus="showError = false" :state="showError ? false : null"></b-input>
            </b-form-group>

            <b-form-group class="item">
              <b-form-checkbox v-model="remember">{{ $t('view.sso.label.saveID') }}</b-form-checkbox>
              <a @click="showForgot = true" class="password-find">{{ $t('view.sso.label.forgotPassword') }}</a>
            </b-form-group>

            <b-button variant="primary" class="btn-login" @click="onClickLogin()">
              <template v-if="logining === false" desc="로그인">{{ $t('view.sso.label.login') }}</template>
              <template v-else><b-spinner label="Spinning"></b-spinner></template>
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 비밀번호 찾기 -->
    <b-modal ref="mdoal" id="modal" v-model="showForgot" :title="$t('view.sso.label.forgotPassword')" desc="비밀번호 찾기" centered no-close-on-backdrop>
      <div class="password-content">
        <div class="form-content">
          <b-form-input v-model="forgotEmail" :placeholder="$t('view.sso.label.email')" desc="이메일"></b-form-input>
          <b-form-group :state="forgotState" :valid-feedback="$t('view.sso.alert.forgotRequestComplete')" :invalid-feedback="forgotError">
            <b-button class="mt-3" variant="primary" @click="onClickSendEmail()" :style="{ 'margin-bottom': '10px', display: 'block' }" :disabled="forgotState">
              <template v-if="forgotLoading === false" desc="이메일 전송">{{ $t('view.sso.button.sendEmail') }}</template>
              <template v-else><b-spinner label="Spinning" small></b-spinner></template>
            </b-button>
            <span desc="가입하신 이메일 주소로 비밀번호 재설정 링크가 전송됩니다.">{{ $t('view.sso.login.forgotDesc') }}</span>
          </b-form-group>
        </div>
      </div>
      <template v-slot:modal-footer>
        <b-button @click="showForgot = false" desc="닫기">{{ $t('view.sso.button.close') }}</b-button>
      </template>
    </b-modal>
    <!-- 비밀번호 찾기 -->
  </b-container>
</template>

<script lang="ts">
import { EventBus } from '@/common';
import { AxiosError } from 'axios';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

const baseUrl = (window as any).env;

@Component({
  computed: mapGetters({
    isRemember: 'oauth/getIsRemember',
    userAccess: 'oauth/getUserAccess',
    projectId: 'sso/getProjectId',
  }),
})
export default class Login extends Vue {
  isRemember!: boolean;
  userAccess!: any;

  projectId!: any;

  username: string;
  password: string;
  remember: boolean;
  showError: boolean;
  logining: boolean;

  showForgot: boolean;
  forgotEmail: string;
  forgotState: any;
  forgotLoading: boolean;
  forgotError: string;

  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.remember = false;
    this.showError = false;
    this.logining = false;

    this.showForgot = false;
    this.forgotEmail = '';
    this.forgotState = null;
    this.forgotLoading = false;
    this.forgotError = '';
  }

  @Watch('showForgot')
  onShowForgotChanged() {
    this.forgotEmail = '';
    this.forgotState = null;
  }

  created() {
    if (this.isRemember) {
      this.remember = this.isRemember;
      this.username = this.userAccess;
    }
  }

  private onClickLogin() {
    if (this.username === '' || this.password === '' || this.logining === true) return;

    this.logining = true;

    this.$store.commit('oauth/setIsRemember', this.remember);
    if (this.remember) {
      this.$store.commit('oauth/setUserAccess', this.username);
    } else {
      this.$store.commit('oauth/setUserAccess', '');
    }

    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('scope', 'all');

    this.$store
      .dispatch('oauth/login', formData)
      .then((res) => {
        this.getMyInfo();
      })
      .catch((error) => {
        this.showError = true;
        this.logining = false;
      });
  }

  onClickSendEmail() {
    if (!this.forgotEmail) return;

    this.forgotLoading = true;

    this.$store
      .dispatch('sso/forgotPassword', {
        email: this.forgotEmail,
        returnUrl: baseUrl.IPR_BASE_URL,
      })
      .then((res) => {
        this.forgotLoading = false;
        this.forgotState = true;
      })
      .catch((err: AxiosError) => {
        const e = err.response.data;
        if (e.message) this.forgotError = e.message;
        else this.forgotError = this.$t('view.sso.alert.wrongRequest').toString();
        this.forgotLoading = false;
        this.forgotState = false;
      });
  }

  private getMyInfo() {
    this.$store.dispatch('sso/getMyInfo').then((res) => {
      if (this.$store.getters['sso/getSetting'] != undefined) {
        document.documentElement.className = 'theme-' + this.$store.getters['sso/getSetting'].common.theme;
      }
      this.$router.push('/process-mining').then(res=>{
        EventBus.$emit('initNotification');
      });
    });
  }

  goUserRegister() {
    this.$router.push({ name: 'userRegister' });
  }
}
</script>
