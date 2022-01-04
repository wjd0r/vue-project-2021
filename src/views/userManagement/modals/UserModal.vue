<template>
  <div class="modal-common-component">
    <div class="modal-common-content">
      <div class="top-component">
        <div class="top-content">
          <div class="back" @click.prevent="$emit('close')">
            <div class="ico-arrow-left" alt="왼쪽 방향 아이콘"></div>
            <div class="back-text">{{ $t('view.repo.label.back') }}</div>
          </div>
          <div class="btn-group">
            <b-button variant="primary" type="submit" @click="submitEvent()" :disabled="state">{{ $t('view.sso.button.' + (mode === 'create' ? 'register' : 'save')) }}</b-button>
          </div>
        </div>
      </div>
      <div class="manage-form-component" :class="{ 'add-new-user-form': mode === 'create', 'edit-user-info-form': mode === 'modify' }">
        <div class="content-header">
          <h4 class="title">{{getModeName}}</h4>
          <div class="right-align">
            <span class="notice-text">(*) {{ $t('view.sso.label.required') }}</span>
          </div>
        </div>
        <div class="content-body">
          <UserForm ref="form" :mode="mode" @submitEvent="submitEvent()" @close="$emit('close')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { utils } from '@/common';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import UserForm from '../form/UserForm.vue';

@Component({
  components: {
    UserForm,
  },
  computed: mapGetters({}),
})
export default class UserModal extends Vue {
  /* Prop 선언 */
  @Prop()
  mode!: 'create' | 'modify';

  @Prop()
  id?: number;
  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  showLoading: boolean = false;

  userList: any = [];

  /* refs 선언 */
  $refs!: {
    form: UserForm;
  };

  state: boolean = true;

  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    setInterval(() => this.state = this.validation, 100);
  }
  /* 메소드 선언 */
  submitEvent() {
    if (this.mode === 'create') {
      this.registerUser();
    } else {
      this.modifyUser();
    }
  }

  setUserList(userList: any) {
    this.userList = userList;

    this.$refs.form.setUserList(this.userList);
  }

  registerUser() {
    const userForm = this.$refs.form.userForm;
    this.showLoading = true;

    const param = {
      companyId: userForm.companyId,
      groupId: userForm.groupId,
      employeeNumber: userForm.employeeNumber,
      fullname: userForm.fullname,
      position: userForm.position,
      contactNumber: userForm.contactNumber,
      email: userForm.email,
      isDeleted: userForm.isDeleted,
      password: userForm.password,
      username: userForm.username,
      userRoles: userForm.userRoles,
    }

    this.$store
      .dispatch('userManage/userRegisterByAdmin', param)
      .then((res) => {
        this.showLoading = false;
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.registerComplete').toString(), this.$t('view.sso.alert.createSucess').toString(), 'complete').then((res) => {
          this.$emit('finish');
        });
      }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  modifyUser() {
    const userForm = this.$refs.form.userForm;
    this.showLoading = true;

    const param = {
      id: userForm.id,
      companyId: userForm.companyId,
      groupId: userForm.groupId,
      employeeNumber: userForm.employeeNumber,
      fullname: userForm.fullname,
      position: userForm.position,
      contactNumber: userForm.contactNumber,
      email: userForm.email,
      isDeleted: userForm.isDeleted,
      password: userForm.password,
      username: userForm.username,
      userRoles: userForm.userRoles,
    }

    this.$store
      .dispatch('userManage/putUser', param)
      .then((res) => {
        this.showLoading = false;
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.modifyComplete').toString(), this.$t('view.sso.alert.modifyComplete').toString(), 'complete').then((res) => {
          this.$emit('finish');
        });
      })
      .catch((err: AxiosError) => utils.handlerError(this, err));
      /* .catch((err: AxiosError) => {
        this.showLoading = false;
        const header = err.response.headers;
        let message;

        if (header['x-ioc-code'] !== undefined && this.$te('view.sso.alert.' + header['x-ioc-code'])) message = this.$t('view.sso.alert.' + header['x-ioc-code']).toString();
        else message = this.$t('view.sso.alert.wrongRequest').toString();

        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.registerFail').toString(), this.$t('view.sso.alert.' + message).toString(), 'error');
      }); */
  }

  get getModeName() {
    return this.mode === 'create' ? this.$t('view.sso.label.createUserForm').toString() : this.$t('view.sso.user.userEdit').toString();
  }

  get validation() {
    if(this.$refs.form != undefined) {
      if(this.$refs.form.state != undefined) {
        return !this.$refs.form.state;
      }else {
        return true;
      }
    }
    return true;
  }
}
</script>