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
            <b-button variant="primary" type="submit" @click="submitEvent" :disabled="state">{{ $t('view.sso.button.save') }}</b-button>
          </div>
        </div>
      </div>
      <div class="manage-form-component">
        <div class="content-header">
          <h4 class="title">{{getRoleName}}</h4>
          <div class="right-align">
            <span class="notice-text">(*) {{ $t('view.sso.label.required') }}</span>
          </div>
        </div>
        <div class="content-body">
          <RoleForm ref="form" :mode="mode" @close="$emit('close')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { utils } from '@/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import RoleForm from '../form/RoleForm.vue';

@Component({
  components: {
    RoleForm,
  },
  computed: mapGetters({}),
})
export default class RoleModal extends Vue {
  /* Prop 선언 */
  @Prop()
  mode!: 'create' | 'modify';

  @Prop()
  // userId, roleId
  id!: number;
  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  showLoading: boolean = false;
  /* refs 선언 */
  $refs!: {
    form: RoleForm;
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
      this.registerRole();
    } else {
      this.modifyRole();
    }
  }

  getRoleInfo() {
    this.$store.dispatch('roleManage/getRole', this.id).then((res: AxiosResponse) => {
      this.$refs.form.roleForm = res.data;
    });
  }

  registerRole() {
    const { roleForm, validation } = this.$refs.form;
    if(!validation) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.repo.label.testWrong').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'warning');

      return;
    }

    this.showLoading = true;

    this.$store
      .dispatch('roleManage/postRole', roleForm)
      .then((res) => {
        this.showLoading = false;
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.saveComplete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete').then((res) => {
          this.$emit('finish');
        });
      }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  modifyRole() {
    const { roleForm, validation } = this.$refs.form;
    if(!validation) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.repo.label.testWrong').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'warning');

      return;
    }

    this.showLoading = true;

    this.$store
      .dispatch('roleManage/putRole', roleForm)
      .then((res) => {
        this.showLoading = false;
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.saveComplete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete').then((res) => {
          this.$emit('finish');
        });
      }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  get getRoleName() {
    return this.mode === 'create' ? this.$t('view.sso.button.createRole').toString() : this.$t('view.sso.button.editRole').toString();
  }

  get validation() {
    if(this.$refs.form != undefined) {
      if(this.$refs.form.validation != undefined) {
        return !this.$refs.form.validation;
      }else {
        return true;
      }
    }
    return true;
  }
}
</script>