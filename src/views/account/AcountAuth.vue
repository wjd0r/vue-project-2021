<template>
  <b-container class="sso-common-component acountauth-component">
    <div class="acountauth-content">
      <div class="content-header">
        <div class="logo-ipr-fullname" alt="ipr fullname logo"></div>
      </div>
      <div class="content-body">
        <template v-if="$route.params.state === 'ok'">
          <div v-html="$t('view.sso.alert.authOk')" />
          <!-- <h1 class="title">이메일 인증을 완료하셨습니다</h1>
          <div class="content-body">
            <h4>환영합니다.</h4>
            <h4>회원가입이 완료되었습니다.</h4>
          </div> -->
        </template>

        <template v-else-if="$route.params.state === 'already'">
          <div v-html="$t('view.sso.alert.authAlready')" />
          <!-- <h1 class="title">이미 인증을 완료하셨습니다</h1>
          <div class="content-body">
            <h4>로그인 화면으로 넘어갑니다.</h4>
          </div> -->
        </template>

        <template v-else-if="$route.params.state === 'error'">
          <div v-html="$t('view.sso.alert.authError')" />
          <!-- <h1 class="title">잘못된 정보입니다</h1>
          <div class="content-body">
            <h4>가입정보를 확인해보시기 바랍니다.</h4>
            <h4>로그인 화면으로 넘어갑니다.</h4>
          </div> -->
        </template>

        <b-form-group>
          <b-button variant="primary" @click="onClickLogin()" class="btn-login" desc="확인">{{ $t('view.sso.button.ok') }}</b-button>
        </b-form-group>
      </div>
    </div>
  </b-container>
</template>

<style scoped></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class AcountAuthentication extends Vue {
  onClickLogin() {
    this.$router.push({ name: 'Login' });
  }
}
</script>
