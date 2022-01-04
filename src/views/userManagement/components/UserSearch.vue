<template>
  <div>
    <div class="content-middle">
      <!-- group -->
      <div class="group-content">
        <b-form-group id="groupSelect"  label=""  label-for="group-select">
          <b-form-select v-model="searchType" :options="options"></b-form-select>
        </b-form-group>
      </div>
      <!-- group -->

      <!-- search -->
      <div class="search-component">
        <div class="search-content">
          <b-input-group class="search">
            <b-form-input type="search" :placeholder="$t('view.sso.other.searchPlaceholder')" v-model="value" @keyup.enter="onClick"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="onClick">{{ $t('view.sso.label.search') }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <!-- search -->
    </div>
    <div class="content-body">
      <div class="table-group">
        <table class="table line">
          <thead>
            <tr>
              <th width="20%">{{ $t('view.sso.workspace.workerID') }}</th>
              <th width="40%">{{ $t('view.sso.workspace.workerName') }}</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="optionsEmployeeNumber.length == 0">
              <td colspan="3"> {{ $t('view.sso.workspace.searchMember') }} </td>
            </tr>
            <tr v-else>
              <td width="20%">
                <b-form-select v-model="userId" :options="optionsEmployeeNumber"></b-form-select>
              </td>
              <td width="40%">
                <b-form-select v-model="userId" :options="optionsName"></b-form-select>
              </td>
              <td  width="10%" class="add-remove">
                <div class="btn-add ico-plus" alt="추가 아이콘" @click="onAdd"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { utils } from '@/common';
import { forEach } from 'lodash';
import { Vue, Component } from 'vue-property-decorator';

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

@Component({})
export default class UserSearch extends Vue {
  value: string = '';

  options: any = [
    { value: 'employeeNumber', text: this.$t('view.sso.user.employeenumber').toString() },
    { value: 'fullname', text: this.$t('view.sso.user.name').toString() },
    { value: 'position', text: this.$t('view.sso.user.department').toString() },
    { value: 'companyName', text: this.$t('view.sso.user.company').toString() },
  ];

  searchType: string = 'fullname';
  searchWord: any = {
    page: 0,
    sort: 'fullname,desc',
  };

  users: IUser[] = [{
    id: 1,
    companyName: "IOCHORD",
    groupName: "",
    employeeNumber: "1000",
    position: "",
    fullname: "admin",
    email: "admin@iochord.com",
    contactNumber: "01010",
    createdOn: "2021-09-16T22:16:47.374254",
    isDeleted: false,
    roleName: ""
  }];

  userId: number = 0;

  optionsName: any = [];
  optionsEmployeeNumber: any = [];

  plus() {
    this.$emit('click', '');
  }

  async onClick() {
    if(this.value == undefined)
      this.value = '';

    if(this.value != '')
      this.searchWord.search = `${this.searchType}~${this.value}`;

    this.users = (await this.$store.dispatch('userManage/getUsers', {search: this.searchWord.search, size: 100})).data.content;
    this.$emit('input', this.value);

    this.onUsers();
  }

  onUsers() {
    this.optionsName = [];
    this.optionsEmployeeNumber = [];
    forEach(this.users, (user: IUser, index) => {
      this.optionsName.push({
        value: user.id,
        text: user.fullname == null ? '-' : user.fullname,
      });
      this.optionsEmployeeNumber.push({
        value: user.id,
        text: user.employeeNumber == null ? '-' : user.employeeNumber,
      });
    });

    this.init();
  }

  init() {
    this.userId = this.optionsName[0].value;
  }

  onAdd() {
    if(this.optionsEmployeeNumber.length == 0) {
      utils.bvModalmsgBoxOk(this, this.$title('warning'), this.$message('wrongMember'), 'warning'); 
    } else {
      this.$emit('add', this.userId);
    }
  }

  $title(code: string) {
    return this.$t(`view.sso.alert.title.${code}`).toString();
  }

  $message(code: string) {
    return this.$t(`view.sso.alert.${code}`).toString();
  }
}
</script>