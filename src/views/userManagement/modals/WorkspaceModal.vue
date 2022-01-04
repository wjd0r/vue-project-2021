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
            <b-button variant="primary" type="submit" @click="submitEvent" :disabled="state">{{ $t('view.sso.button.' + (mode === 'create' ? 'register' : 'save')) }}</b-button>
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
          <WorkspaceForm ref="form" :mode="mode" @close="$emit('close')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { utils } from '@/common';
import { AxiosError } from 'axios';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import WorkspaceForm from '../form/WorkspaceForm.vue';

@Component({
  components: {
    WorkspaceForm,
  },
  computed: mapGetters({}),
})
export default class WorkspaceModal extends Vue {
  /* Prop 선언 */
  @Prop()
  mode!: 'create' | 'modify';

  @Prop()
  id?: number;
  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  showLoading: boolean = false;
  /* refs 선언 */
  $refs!: {
    form: WorkspaceForm;
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
      this.registerWorkspace();
    } else {
      this.modifyWorkspace();
    }
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

  // 워크스페이스 등록
  registerWorkspace() {
    const { workspaceForm, validation } = this.$refs.form;

    const param = {
      "name": workspaceForm.name,
      "desc": workspaceForm.desc,
      "groupId": workspaceForm.groupId,
      "attribute": workspaceForm.attribute,
      "userRoles": workspaceForm.userRoles,
    };

    if(!validation) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.repo.label.testWrong').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'warning');

      return;
    }

    this.showLoading = true;

    this.$store
      .dispatch('workspaceManage/postWorkspace', param)
      .then((res) => {
        this.showLoading = false;
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.registerComplete').toString(), this.$t('view.sso.alert.createSucess').toString(), 'complete').then((res) => {
          this.$emit('finish');
        });
      })
      .catch((err: AxiosError) => {
        const header = err.response.headers;
        let message;

        if (header['x-ioc-code'] !== undefined && this.$te('view.sso.alert.' + header['x-ioc-code'])) message = this.$t('view.sso.alert.' + header['x-ioc-code']).toString();
        else message = 'wrongRequest';

        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.registerFail').toString(), this.$t('view.sso.alert.' + message).toString(), 'error');
      });
  }

  // 워크스페이스 수정
  modifyWorkspace() {
    const { workspaceForm, validation } = this.$refs.form;

    const param = {
      "id": workspaceForm.id,
      "name": workspaceForm.name,
      "desc": workspaceForm.desc,
      "workspaceKey": workspaceForm.workspaceKey,
      "iprResourceGroupId": workspaceForm.iprResourceGroupId,
      "workspaceType": 'EXTRA_WORKSPACE',
      "isDeleted": workspaceForm.isDeleted,
      "companyId": workspaceForm.companyId,
      "groupId": workspaceForm.groupId,
      "attribute": workspaceForm.attribute,
      "userRoles": workspaceForm.userRoles,
    }

    if(!validation) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.repo.label.testWrong').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'warning');

      return;
    }

    this.showLoading = true;

    this.$store
      .dispatch('workspaceManage/putWorkspace', param)
      .then((res) => {
        this.showLoading = false;
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.registerComplete').toString(), this.$t('view.sso.alert.createSucess').toString(), 'complete').then((res) => {
          this.$emit('finish');
        });
      })
      .catch((err: AxiosError) => {
        const header = err.response.headers;
        let message;

        if (header['x-ioc-code'] !== undefined && this.$te('view.sso.alert.' + header['x-ioc-code'])) message = this.$t('view.sso.alert.' + header['x-ioc-code']).toString();
        else message = 'wrongRequest';

        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.registerFail').toString(), this.$t('view.sso.alert.' + message).toString(), 'error');
      });
  }

  get getModeName() {
    return this.mode === 'create' ? this.$t('view.sso.workspace.newWorkspace').toString() : this.$t('view.sso.workspace.editWorkspace').toString();
  }
}
</script>