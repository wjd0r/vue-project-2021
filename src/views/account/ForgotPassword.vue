<template>
  <b-container class="sso-common-component password-component">
    <div class="password-content" @submit.prevent="resetPassword()">
      <div class="content-header">
        <div class="logo-ipr-fullname" alt="ipr fullname logo"></div>
      </div>
      <div class="content-body">
        <div class="form-content">
          <h2 class="title" desc="비밀번호 재설정">{{ $t('view.sso.label.resetPassword') }}</h2>
          <form class="content-explain">
            <b-form-group :invalid-feedback="$t('view.sso.label.passwordValidate')">
              <b-form-input type="password" :placeholder="$t('view.sso.label.newPassword')" desc="새 비밀번호" v-model="password" :state="passwordState()" maxlength="16" required />
            </b-form-group>

            <b-form-group>
              <b-form-input type="password" :placeholder="$t('view.sso.label.confirmPW')" desc="비밀번호 확인" v-model="confirmPw" :state="confirmPwState()" maxlength="16" required />
            </b-form-group>

            <b-form-group>
              <b-button type="submit" variant="primary" class="btn-login">{{ $t('view.sso.button.apply') }}</b-button>
            </b-form-group>
          </form>
        </div>
      </div>
    </div>

    <b-modal ref="modal" id="okModal" v-model="showModal" :ok-title="$t('view.sso.button.ok')" desc="확인" @ok="goLogin" centered ok-only no-close-on-esc no-close-on-backdrop>
      <div class="d-block">
        <template v-if="!isError" desc="변경이 완료되었습니다. 로그인 화면으로 이동합니다."> {{ $t('view.sso.alert.resetPasswordComplete') }} </template>
        <template v-else>
          {{ errorMessage }}
        </template>
      </div>
    </b-modal>
  </b-container>
</template>

<style scoped>
.form-group {
  margin: 0px;
}
.form-group input.is-invalid {
  margin-bottom: 0px;
}
.invalid-feedback {
  margin-top: calc(0.5px);
  margin-bottom: calc(0.5px);
}

.d-block {
  line-height: 22px;
}

.d-block h3 {
  margin-bottom: 20px !important;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

const baseUrl = (window as any).env;

@Component({})
export default class ResetPassword extends Vue {
  password: string = '';
  confirmPw: string = '';

  isError: boolean = false;
  showModal: boolean = false;

  resetPassword() {
    if (!this.passwordState() || !this.confirmPwState()) {
      return;
    }

    this.$store
      .dispatch('sso/forgotPassword', {
        email: this.$route.params.email,
        forgotPasswordCode: this.$route.params.code,
        password: this.password,
        confirmPassword: this.confirmPw,
        returnUrl: baseUrl.IPR_BASE_URL,
      })
      .then((res) => {
        this.isError = false;
        this.showModal = true;
      });
  }

  goLogin() {
    if (!this.isError) {
      this.$router.push({ name: 'Login' });
    } else {
      this.showModal = false;
    }
  }

  passwordState() {
    const regEx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!this.password) {
      return null;
    } else if (!regEx.test(this.password)) {
      return false;
    } else {
      return true;
    }
  }

  confirmPwState() {
    if (!this.password) {
      return null;
    } else if (this.password !== this.confirmPw || !this.passwordState()) {
      return false;
    } else {
      return true;
    }
  }
}
</script>
