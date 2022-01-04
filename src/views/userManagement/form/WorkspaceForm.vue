<template>
  <div class="manage-form-content">
    <!-- form -->
    <div class="content-header">
      <h5 class="title">{{ $t('view.sso.workspace.workspaceProperties') }}</h5>
    </div>
    <div class="content-body">
      <form class="form-content">

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="true"
          v-model="workspaceForm.name" :label="$t('view.sso.workspace.workspaceName')" 
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255" :duplicate-list="this.rowDataCopy" duplicate-property="workspaceName"
          @output="(arg) => output.name = arg"/>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="false"
          v-model="workspaceForm.desc" :label="$t('view.sso.workspace.workspaceDescription')" 
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.desc = arg"/>

        <div class="content-header">
          <h5 class="title">{{ $t('view.sso.workspace.workspaceOwner') }}</h5>
        </div>
        <b-form-group :label="$t('view.sso.label.organization')" :label-cols="3">
          <CompanySelectBox v-model="workspaceForm.companyId"/>
        </b-form-group>

        <b-form-group :label="$t('view.sso.label.department')" :label-cols="3">
          <GroupSelectBox v-model="workspaceForm.groupId" :companyId="workspaceForm.companyId"/>
        </b-form-group>

        <b-form-group :label="`${$t('view.sso.label.isDeleted')} ${mode === 'create' ? '(*)' : ''}`" :label-cols="3">
          <b-form-select v-model="workspaceForm.isDeleted" :disabled="isMobileBlock()">
            <b-form-select-option value="false">{{ $t('view.sso.filter.used') }}</b-form-select-option>
            <b-form-select-option value="true">{{ $t('view.sso.filter.unUsed') }}</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </form>
    </div>
    <!-- form -->
    <!-- Workspace Setting (Maximum Limit)  -->
    <div class="workspace-setting-component">
      <div class="workspace-setting-content">
        <div class="content-header">
          <h5 class="title">{{ $t('view.sso.workspace.workspaceSetting') }}</h5>
        </div>
        <div class="content-body">
          <div class="right-align">
            <div class="notice-text">※ {{ $t('view.sso.workspace.meansNoLimit') }}</div>
          </div>
          <div class="form-content">
            <validate-input type="number" :label-cols="2" :mode="mode" :essential="true"
              v-model="attribute.workspace_maximum_limit.dataset" :label="$t('view.sso.workspace.dataset')" 
              :disabled="isMobileBlock()" @change="onChangeDataset"
              :permit-string="false" :permit-en="false" :permit-number="true" :permit-special="false" min="-1" minlength="1" maxlength="255"
              @output="(arg) => output.dataset = arg"/>
            <validate-input type="number" :label-cols="2" :mode="mode" :essential="true"
              v-model="attribute.workspace_maximum_limit.datasetRow" :label="$t('view.sso.workspace.datasetRows')" 
              :disabled="isMobileBlock()" @change="onChangeDatasetRow"
              :permit-string="false" :permit-en="false" :permit-number="true" :permit-special="false" min="-1" minlength="1" maxlength="255"
              @output="(arg) => output.datasetRow = arg"/>
            <validate-input type="number" :label-cols="2" :mode="mode" :essential="true"
              v-model="attribute.workspace_maximum_limit.event" :label="$t('view.sso.workspace.event')" 
              :disabled="isMobileBlock()" @change="onChangeEvent"
              :permit-string="false" :permit-en="false" :permit-number="true" :permit-special="false" min="-1" minlength="1" maxlength="255"
              @output="(arg) => output.event = arg"/>
            <validate-input type="number" :label-cols="2" :mode="mode" :essential="true"
              v-model="attribute.workspace_maximum_limit.process" :label="$t('view.sso.workspace.referenceProcess')" 
              :disabled="isMobileBlock()" @change="onChangeProcess"
              :permit-string="false" :permit-en="false" :permit-number="true" :permit-special="false" min="-1" minlength="1" maxlength="255"
              @output="(arg) => output.process = arg"/>
          </div>
        </div>
      </div>
    </div>
    <!-- Workspace Setting (Maximum Limit)  -->

    <!--멤버 추가-->
    <div class="table-list-component member-add">
      <div class="table-list-content">
        <div class="content-header">
          <h5 class="title">{{ $t('view.sso.workspace.addMembers') }}</h5>
        </div>
        <UserSearch @add="onAdd"/>
      </div>
    </div>
    <!--멤버 추가-->

    <!--멤버 목록-->
    <div class="table-list-component member-list">
      <div class="table-list-content">
        <div class="content-header">
          <h5 class="title">{{ $t('view.sso.workspace.memberList') }}</h5>
        </div>
        <UserList v-model="workspaceForm.userRoles" :state="userRoleValidate" />
      </div>
    </div>
    <!--멤버 목록-->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { IKeyValueObject } from '@/interface';
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import UserSearch from '../components/UserSearch.vue';
import UserList from '../components/UserList.vue';
import CompanySelectBox from '../components/CompanySelectBox.vue';
import GroupSelectBox from '../components/GroupSelectBox.vue';

import { EventBus, utils, ValidationCheck } from '@/common';
import { forEach } from 'lodash';
import { UtilsMixin } from '@/mixin';

import ValidateInput from'@/views/components/ValidateInput.vue';

interface IWorkspace {
  id: number;
  name: string; // 워크스페이스 이름
  desc: string; // 워크스페이스 설명
  companyId: number; // 회사는 굳이 필요는 없음
  groupId: number; // 부서
  attribute: string; // {workspac...}
  userRoles: any; // 
  isDeleted: boolean;
  licenseActiveOn: string;
  licenseExpireOn: string;
  groupKey: string;
  groupName: string;
  workspaceKey: string;
  iprResourceGroupId: string;
}

interface IUser {
  id: number;
  companyName: string;
  groupName: string;
  employeeNumber: string;
  position: string;
  fullname: string;
  email: string;
  contactNumber: string;
  createdOn: string;
  isDeleted: false;
  roleName: string;
}

@Component({
  components: {
    UserSearch,
    CompanySelectBox,
    GroupSelectBox,
    UserList,
    ValidateInput,
  },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
  }),
})
export default class WorkspaceForm extends Mixins(UtilsMixin) {
  /* Prop 선언 */
  @Prop()
  mode!: 'create' | 'modify';
  /* mapGetters 변수 선언 */
  myInfo!: IKeyValueObject;

  rowData: Array<any> = [];
  workspaceForm: IWorkspace = {
    id: 0,
    name: '',
    desc: '',
    companyId: 0,
    groupId: 0,
    attribute: '',
    userRoles: [],
    isDeleted: false,
    licenseActiveOn: '',
    licenseExpireOn: '',
    groupKey: '',
    groupName: '',
    workspaceKey: '',
    iprResourceGroupId: '',
  };
  
  rowDataCopy: Array<any> = [];

  attribute: any = {
    workspace_maximum_limit: {
      event: -1,
      dataset: -1,
      datasetRow: -1,
      process: -1,
    }
  };

  temp: any = {
    event: -1,
    dataset: -1,
    datasetRow: -1,
    process: -1,
  }

  output: any = {
    name: true,
    desc: true,
    dataset: true,
    datasetRow: true,
    event: true,
    process: true,
  }

  /* Watch 선언 */
  @Watch('attribute', { deep: true })
  onAttribute(attribute: any) {
    this.workspaceForm.attribute = JSON.stringify(attribute);
  }
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  mounted() {
    //this.getRoleList();
    EventBus.$emit('workspaceRowData', (rowData: any) => {
      this.rowData = rowData;
      this.rowDataCopy = rowData;

      EventBus.$emit('workspaceForm', (workspaceForm: any) => {
        this.workspaceForm = workspaceForm;
        
        if (this.mode === 'create' && this.myInfo.roleCode !== 'SYSTEM_MANAGER') {
          /* this.workspaceForm.licenseActiveOn = this.myInfo.licenseActiveOn;
          this.workspaceForm.licenseExpireOn = this.myInfo.licenseExpireOn;
          this.workspaceForm.groupKey = this.myInfo.groupKey;
          this.workspaceForm.groupName = this.myInfo.groupName; */
        }
        if (this.mode === 'modify') {
          this.rowDataCopy = this.rowData.filter((e: any) => { return e.workspaceName != this.workspaceForm.name; });
        }
        if(this.workspaceForm.attribute != '') {
          this.attribute = JSON.parse(this.workspaceForm.attribute);
        }
      });
    });

    this.onAttribute(this.attribute);
  }

  // 유저가 선택후 더하기 버튼 클릭시
  onAdd(userId: string) {
    this.workspaceForm.userRoles.push({
      userId: userId,
      roleId: 1,
    });
  }

  get validation() {
    return this.output.name &&
      this.output.desc &&
      this.output.dataset &&
      this.output.datasetRow &&
      this.output.event &&
      this.output.process &&
      (this.workspaceForm.companyId != 0) &&
      (this.workspaceForm.groupId != 0) &&
      this.isDuplicate(this.workspaceForm.userRoles);
  }

  isDuplicate(arr: [])  {
    const _arr: any = [];
    forEach(arr, (arg) => {
      _arr.push(JSON.stringify(arg));
    });
    const set = new Set(_arr);

    return _arr.length == set.size;
  }

  get userRoleValidate() {
    return this.isDuplicate(this.workspaceForm.userRoles);
  }

  checkApproved(check: any) {
    if (this.mode === 'modify' && check == true) {
      return true;
    } else {
      return false;
    }
  }

  emailState(value: string) {
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!value) {
      return false;
    } else if (!regEx.test(value)) {
      return false;
    } else {
      return true;
    }
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

  onChangeDataset(value: any) {
    if(value == 0 && this.temp.dataset == -1) {
      this.attribute.workspace_maximum_limit.dataset = 1;
    } else if (value == 0 && this.temp.dataset == 1) {
      this.attribute.workspace_maximum_limit.dataset = -1;
    }

    this.temp.dataset = this.attribute.workspace_maximum_limit.dataset;
  }

  onChangeDatasetRow(value: any) {
    if(value == 0 && this.temp.datasetRow == -1) {
      this.attribute.workspace_maximum_limit.datasetRow = 1;
    } else if (value == 0 && this.temp.datasetRow == 1) {
      this.attribute.workspace_maximum_limit.datasetRow = -1;
    }

    this.temp.datasetRow = this.attribute.workspace_maximum_limit.datasetRow;
  }

  onChangeEvent(value: any) {
    if(value == 0 && this.temp.event == -1) {
      this.attribute.workspace_maximum_limit.event = 1;
    } else if (value == 0 && this.temp.event == 1) {
      this.attribute.workspace_maximum_limit.event = -1;
    }

    this.temp.event = this.attribute.workspace_maximum_limit.event;
  }

  onChangeProcess(value: any) {
    if(value == 0 && this.temp.process == -1) {
      this.attribute.workspace_maximum_limit.process = 1;
    } else if (value == 0 && this.temp.process == 1) {
      this.attribute.workspace_maximum_limit.process = -1;
    }

    this.temp.process = this.attribute.workspace_maximum_limit.process;
  }
}
</script>j