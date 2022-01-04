<template>
  <div class="manage-form-content">
    <!-- form -->
    <div class="content-header">
      <h5 class="title">{{ $t('view.sso.user.accountInformation') }}</h5>
    </div>
    <div class="content-body">
      <form class="form-content" @submit.prevent="submit()">
        <template v-if="mode != 'create'">
          <b-form-group :label="$t('view.sso.label.createdOn')" :label-cols="3">
            <b-form-input type="text" v-model="userForm.createdOn" disabled ></b-form-input>
          </b-form-group>
        </template>

        <CompanyGroupSelectBox v-model="companyGroupId"/>

        <!-- IPR-PRO packaging -->
        <template v-if="env.IPR_MODE == 'PRO'">
          <validate-input type="text" :label-cols="3" :mode="mode" :essential="true"
            v-model="userForm.username" :label="$t('view.sso.user.username')" 
            :disabled="mode === 'modify' || isMobileBlock()"
            :permit-string="false" :permit-en="true" :permit-number="true" :permit-special="false" minlength="5" maxlength="20" :duplicate-list="userList" duplicate-property="username"
            @output="(arg) => output.username = arg"/>
        </template>
        <template v-else>
          <validate-input type="text" :label-cols="3" :mode="mode" :essential="true"
            v-model="userForm.username" :label="$t('view.sso.user.username')" 
            :disabled="mode === 'modify' || isMobileBlock()"
            :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="5" maxlength="20" :duplicate-list="userList" duplicate-property="username"
            @output="(arg) => output.username = arg"/>
        </template>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="false"
          v-model="userForm.employeeNumber" :label="$t('view.sso.user.employeenumber')" 
          :disabled="mode === 'modify' || isMobileBlock()"
          :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.employeeNumber = arg"/>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="true"
          v-model="userForm.fullname" :label="$t('view.sso.label.name')"
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.fullname = arg"/>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="false"
          v-model="userForm.position" :label="$t('view.sso.label.position')"
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.position = arg"/>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="mode == 'create'" :duplicate-list="userList" duplicate-property="email"
          v-model="userForm.email" :label="$t('view.sso.label.email')"
          :disabled="mode === 'modify' || isMobileBlock()"
          minlength="1" maxlength="255" regexp="email"
          @output="(arg) => output.email = arg"/>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="false"
          v-model="userForm.contactNumber" :label="$t('view.sso.label.contactNumber')"
          :disabled="isMobileBlock()"
          minlength="1" maxlength="255" regexp="contact"
          @output="(arg) => output.contactNumber = arg"/>

        <b-form-group :label="`${$t('view.sso.user.isDelete')} ${mode === 'create' ? '(*)' : ''}`" :label-cols="3">
          <b-form-select v-model="userForm.isDeleted" :disabled="isMobileBlock()">
            <b-form-select-option :value="false">{{ $t('view.sso.filter.used') }}</b-form-select-option>
            <b-form-select-option :value="true">{{ $t('view.sso.filter.unUsed') }}</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <div class="content-header">
          <h5 class="title">{{ $t('view.sso.user.editPassword') }}</h5>
        </div>
        
        <b-form-group :label="`${$t('view.sso.label.password')} ${mode === 'create' ? '(*)' : ''}`" :label-cols="3" :invalid-feedback="feedbackPass">
          <b-form-input type="password" v-model="userForm.password" :disabled="isMobileBlock()" autocomplete="new-password" maxlength="16" v-if="mode == 'modify' && (userForm.password == '' || userForm.password == null)"></b-form-input>
          <b-form-input type="password" v-model="userForm.password" :state="statePass" :disabled="isMobileBlock()" autocomplete="new-password" maxlength="16" v-else></b-form-input>
        </b-form-group>

        <b-form-group :label="`${$t('view.sso.label.confirmPW')} ${mode === 'create' ? '(*)' : ''}`" :label-cols="3" :invalid-feedback="feedbackConfirmPass">
          <b-form-input type="password" v-model="userForm.checkNewPassword" :disabled="isMobileBlock()" autocomplete="new-password" maxlength="16" v-if="mode == 'modify' && (userForm.password == '' || userForm.password == null)"></b-form-input>
          <b-form-input type="password" v-model="userForm.checkNewPassword" :state="stateConfirmPass" :disabled="isMobileBlock()" autocomplete="new-password" maxlength="16" v-else></b-form-input>
        </b-form-group>
      </form>
    </div>
    <!-- form -->

    <!-- 권한-->
    <WorkRoleSelectBox v-model="userForm.userRoles" :companyId="companyGroupId.companyId" :groupName="userForm.groupName" :companyName="userForm.companyName" />
    <!-- 권한 -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { IKeyValueObject } from '@/interface';
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import WorkRoleSelectBox from '../components/WorkRoleSelectBox.vue'
import CompanyGroupSelectBox from '../components/CompanyGroupSelectBox.vue'
import { UtilsMixin } from '@/mixin';
import { EventBus } from '@/common';

import ValidateInput from'@/views/components/ValidateInput.vue';

interface IUser {
  id: number;
  organization: string;
  department: string;
  groupId: number;
  groupName: string;
  groupKey: string;
  position: string;
  fullname: string;
  email: string;
  contactNumber: string;
  password?: string;
  checkNewPassword?: string;
  roleId: number;
  roleCode: string;
  roleName: string;
  roleType: string;
  licenseActiveOn: string;
  licenseExpireOn: string;
  isApproveGroup: boolean;
  isApproved?: boolean;
  isDeleted: boolean;
  delete: boolean;
  createdOn: string;
  userRoles: [];
  employeeNumber: string;
  companyId: string;
  companyName: string;
  username: string;
}

@Component({
  components: {
    WorkRoleSelectBox,
    CompanyGroupSelectBox,
    ValidateInput,
  },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
  }),
})
export default class UserForm extends Mixins(UtilsMixin) {
  /* Prop 선언 */
  @Prop()
  mode!: 'create' | 'modify';
  /* mapGetters 변수 선언 */
  myInfo!: IKeyValueObject;

  rowData: Array<any> = [];
  userForm: IUser = {
    id: 0,
    organization: '',
    department: '',
    groupId: 0,
    groupName: '',
    groupKey: '',
    position: '',
    fullname: '',
    email: '',
    contactNumber: '',
    password: '',
    checkNewPassword: '',
    roleId: 0,
    roleCode: 'DEMO',
    roleName: '데모',
    roleType: 'GENERAL',
    licenseActiveOn: '',
    licenseExpireOn: '',
    isApproveGroup: true,
    isDeleted: false,
    delete: false,
    createdOn: '',
    userRoles: [],
    employeeNumber: '',
    companyId: '',
    companyName: '',
    username: '',
  };

  orgin: IUser = null;

  roleList: IKeyValueObject[] = [];

  userList: any = [];

  companyGroupId: any = {
    companyId: 1,
  };

  output: any = {
    username: true,
    fullname: true,
    email: true, // 생성일때만 필수
    employeeNumber: true, // 필수 x
    position: true, // 필수 x
    contactNumber: true, // 필수 x
  };
  
  /* refs 선언 */
  /* Watch 선언 */
  @Watch('companyGroupId', { deep: true}) 
  onCompanyGroupId(arg: any) {
    const { companyId, groupId, companyName, groupName } = arg;
    this.userForm.companyId = companyId;
    this.userForm.groupId = groupId;
    this.userForm.companyName = companyName;
    this.userForm.groupName = groupName;
  }

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {

    EventBus.$emit('userRowData', (rowData: any) => {
      this.rowData = rowData;
    });
    // 수정 화면일 경우 데이터를 가져옴
    EventBus.$emit('userForm', (userForm: any) => {
      this.orgin = {...userForm};
      this.userForm = userForm;
    });

    if (this.mode != 'create' && this.myInfo.roleCode !== 'SYSTEM_MANAGER') {
      this.userForm.licenseActiveOn = this.myInfo.licenseActiveOn;
      this.userForm.licenseExpireOn = this.myInfo.licenseExpireOn;
      this.userForm.groupKey = this.myInfo.groupKey;
      this.userForm.groupName = this.myInfo.groupName;

      this.userForm.userRoles;
    }
  }

  // 유저리스트를 usermodal에서 주입함
  setUserList(userList: any) {
    this.userList = userList;
  }

  passwordState(value: string, required: boolean) {
    const regEx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!value && !required) {
      return null;
    } else if (!value && required) {
      return false;
    } else if (!regEx.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  confirmPwState(value: string, confirm: string, required: boolean) {
    if (!value && !confirm && !required) {
      return null;
    } else if (!value && !confirm && required) {
      return false;
    } else if (!value && confirm) {
      return false;
    } else if (value !== confirm || !this.passwordState(confirm, required)) {
      return false;
    } else if (value === confirm) {
      return true;
    }
  }

  deleteState(value: any) {
    return value === true || value === false || value === 'true' || value === 'false' ? true : false;
  }

  // ID is not the same
  get idNotSame() {
    return this.userForm.username != this.userForm.password;
  }

  // 이 상태값으로 저장 버튼이 활성화 됨
  get state() {
    if(this.userForm.userRoles == null)
      return false;

    // 버튼 활성화는 모드에 따라 바뀜
    switch(this.mode) {
      case 'create':
        return this.output.username && this.output.fullname && this.output.employeeNumber && this.output.position && this.output.contactNumber && this.output.email && this.userForm.userRoles.length != 0
        && this.deleteState(this.userForm.isDeleted) && this.statePass && this.stateConfirmPass;
      case 'modify':
        return this.output.username && this.output.fullname && this.output.employeeNumber && this.output.position && this.output.contactNumber && this.output.email && this.userForm.userRoles.length != 0
        && ((this.statePass && this.stateConfirmPass) || ((this.userForm.password == '' || this.userForm.password == null) && (this.userForm.checkNewPassword == '' || this.userForm.checkNewPassword == null)));
      default: {
        return false;
      }
    }
  }

  // 비밀번호
  get statePass() {
    return (this.mode != 'create' && (this.userForm.password == '' || this.userForm.password == null)) || ( /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(this.userForm.password) && this.idNotSame);
  }

  // 비밀번호 확인
  get stateConfirmPass() {
    return this.userForm.checkNewPassword == this.userForm.password;
  }

  get feedbackPass() {
    if(!/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(this.userForm.password)) {
      return this.$t('view.sso.label.passwordValidate').toString();
    } else {
      return this.$t('view.sso.alert.idNotSame').toString();
    }
  }

  get feedbackConfirmPass() {
    return this.$t('view.sso.alert.checkPassword').toString();
  }

  get env() {
    return window.env.app;
  }
}
</script>