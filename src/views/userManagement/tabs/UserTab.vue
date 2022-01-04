<template>
  <div class="manage-common-content manage-content">
    <div class="top-component">
      <div class="top-content">
        <div class="group-search">
          <!-- group -->
          <div class="group-content">
            <b-form-group id="groupSelect" label="" label-for="group-select">
              <b-select v-model="keyword.type" :options="keywordOptions"></b-select>
            </b-form-group>
          </div>
          <!-- group -->

          <!-- search -->
          <div class="search-component">
            <div class="search-content">
              <b-input-group class="search form-content">
                <validate-input type="search" v-model="keyword.word" :placeholder="$t('view.sso.other.searchPlaceholder')" @keyup.enter="searchSatate && getUserListByKeyword()"
                  :isGroup="false" :essential="false" :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
                  @output="(arg) => searchSatate = arg"/>
                <b-input-group-append>
                  <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="getUserListByKeyword()">{{ $t('view.sso.button.search') }}</b-button>
                </b-input-group-append>
              </b-input-group>
              <!-- search -->
            </div>
          </div>
          <!-- search -->
        </div>
        <!-- button -->
        <div class="btn-group" :class="{ 'd-none': isMobileBlock() }">
          <b-button variant="outline-primary" class="btn-modify" @click="onClickModify()" :class="`lang-${$i18n.locale}`" :disabled="this.selectedId === -1">{{ $t('view.sso.user.userEdit') }}</b-button>
          <b-button variant="primary" class="btn-create" @click="onClickRegister()" :class="`lang-${$i18n.locale}`">{{ $t('view.sso.user.userNew') }}</b-button>
        </div>
        <!-- button -->
      </div>
    </div>

    <!-- list -->
    <div class="table-component">
      <div class="table-content">
        <div class="table-title">
          <h4 class="title">{{ $t('view.sso.label.userManage') }}</h4>
        </div>
        <b-overlay :show="show" rounded="sm" no-fade opacity="0.5" class="overlay-loading">
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </b-overlay>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getUserList"></Pagination>
        </div>
      </div>
    </div>
    <!-- list -->

    <!-- overlay -->
    <b-overlay :show="showOverlay" bg-color="#fff" opacity="1" no-wrap no-fade class="overlay-form">
      <template #overlay>
        <UserModal ref="modal" :mode="form" :id="selectedId" @finish="finish()" @close="showOverlay = false" />
      </template>
    </b-overlay>
    <!-- overlay -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins, ProvideReactive } from 'vue-property-decorator';
import { IKeyValueObject } from '@/interface';

import { UserManagementMixin, UtilsMixin } from '@/mixin';

import { AxiosError, AxiosResponse } from 'axios';

import { RowDoubleClickedEvent, ValueFormatterParams, ValueGetterParams } from '@ag-grid-community/core';

import UserModal from '../modals/UserModal.vue';
import { mapGetters } from 'vuex';
import { forEach } from 'lodash';

import { EventBus, utils } from '@/common';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    UserModal,
    ValidateInput,
  },
  computed: {
    ...mapGetters({
      myInfo: 'sso/getMyInfo',
      process: 'standard/getProcess',
    }),
  },
})
export default class UserTab extends Mixins(UserManagementMixin, UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  myInfo!: any;
  process!: any;

  rowData: Array<any> = [];
  userForm: any = {};

  selectedRows: any = null;

  /* 클래스 변수 선언 */
  keywordOptions: Array<{value: string; text: string}> = [];
  userList: any = [];

  /* refs 선언 */
  $refs!: {
    modal: UserModal;
  }

  show: boolean = false;
  searchSatate: boolean = true;

  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    this.gridOptions.rowSelection = 'single';

    this.gridOptions.localeTextFunc = (key: string, defaultValue: string) => {
      if(!this.permissionsView)
        return this.$t('view.repo.alert.noPermission').toString();
      else if (this.$te('view.sso.alert.' + key)) return this.$t('view.sso.alert.' + key).toString();
      else return defaultValue;
    }

    this.gridOptions.onSelectionChanged = this.onSelectionChanged;
    this.gridOptions.onRowDoubleClicked = this.onRowDoubleClicked;

    this.getUserList();
    this.optionsLocalesChange();

    this.keyword.type = 'fullname';

    EventBus.$on('changeLocale', () => {
      this.initColumns();
      this.optionsLocalesChange();
    });

    EventBus.$on('userRowData', (fn: any) => {
      fn(this.rowData);
    });

    EventBus.$on('userForm', (fn: any) => {
      fn(this.userForm);
    });
  }

  beforeDestroy() {
    EventBus.$off('changeLocale');
    EventBus.$off('userRowData');
    EventBus.$off('userForm');
  }

  optionsLocalesChange() {
    this.keywordOptions = [
      { value: 'fullname', text: this.$t('view.sso.label.name').toString() },
      { value: 'username', text: this.$t('view.sso.user.username').toString() },
      { value: 'isDeleted', text: this.$t('view.sso.label.isDeleted').toString() },
    ];
  }

  /* 메소드 선언 */
  getUserList(page?: number) {
    this.show = true;
    if(!this.permissionsView) {
      return
    }

    this.selectedId = -1;

    const data: any = {};
    if (this.keyword.hasKeyword) {
      const { type } = this.keyword;
      let { word } = this.keyword;
      if(type == 'isDeleted') {
        if(word == '사용') {
          word = 'false';
        } else if (word == '미사용') {
          word = 'true';
        }
        data.search = `${type}:${word}`;
      } else {
        data.search = `${type}~${word}`;
      }
    }

    if (page !== undefined && this.pageNumber !== page) {
      this.pageNumber = page;
      data.page = page - 1;
    }

    if (this.gridApi) {
      this.gridApi.setRowData([]);
      this.gridApi.showLoadingOverlay();
    }

    data.size = 50;
    data.sort='createdOn,desc';

    this.$store.dispatch('userManage/getUsers', data).then((res: AxiosResponse) => {
      if (this.gridApi) {
        this.totalRows = res.data.totalElements;
        this.rowData = res.data !== [] ? res.data.content : [];
        this.gridApi.setRowData(res.data !== null ? res.data.content : null);
        this.userList = res.data !== null ? res.data.content : null;
      }

      this.show = false;
    }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  getUserListByKeyword() {
    if (this.keyword.word !== '') {
      this.keyword.hasKeyword = true;
    } else {
      this.keyword.hasKeyword = false;
    }
    this.getUserList();
  }

  // 등록하기
  onClickRegister() {
    if(!this.permissionsCreate) {
      return utils.noPermissionAlert(this);
    }

    // 등록하기 전에 초기화
    this.userForm = {
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
      roleCode: '',
      roleName: '',
      roleType: '',
      licenseActiveOn: '',
      licenseExpireOn: '',
      isApproveGroup: true,
      isDeleted: false,
      delete: false,
      createdOn: '',
      userRoles: [],
      employeeNumber: '',
      companyId: '',
      username: '',
    };

    this.form = 'create';
    this.showOverlay = true;

    setTimeout(() => this.$refs.modal.setUserList(this.userList), 200);
  }

  // 수정하기 또는 더블 클릭시
  getUserDetailInfo() {
    this.$store.dispatch('userManage/userDetailInfo', this.selectedId).then((res: AxiosResponse) => {
      this.showOverlay = true;
      this.userForm = res.data;
    }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  onClickModify() {
    if(!this.permissionsUpdate) {
      return utils.noPermissionAlert(this);
    }
    if (this.selectedId === -1) {
      return;
    }
    this.form = 'modify';
    this.getUserDetailInfo();

    setTimeout(() => this.$refs.modal.setUserList(this.userList), 200);
  }

  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedId = this.selectedRows.id;
  }

  onRowDoubleClicked(row: RowDoubleClickedEvent) {
    this.selectedId = row.data.id;
    this.form = 'modify';
    this.getUserDetailInfo();
  }

  finish() {
    this.getUserList();
    this.selectedId = -1;
    this.showOverlay = false;
  }

  initColumns() {
    this.columnDefs = [
      {
        headerName: 'No.',
        valueGetter: (params: ValueGetterParams) => {
          return (this.pageNumber - 1) * 50 + params.node.rowIndex + 1;
        },
        width: 50,
        cellStyle: { 'text-align': 'center' },
        colId: '',
      },
      {
        // 유저 ID
        headerValueGetter: () => {
          return this.$t('view.sso.user.username');
        },
        field: 'username',
        colId: 'username',
      },
      {
        // 이름
        headerValueGetter: () => {
          return this.$t('view.sso.label.name');
        },
        field: 'fullname',
        colId: 'name',
      },
      {
        // 이메일
        headerValueGetter: () => {
          return this.$t('view.sso.label.email');
        },
        field: 'email',
        colId: 'email',
      },
      {
        // 사용자 등록일
        headerValueGetter: () => {
          return this.$t('view.sso.label.createdOn');
        },
        field: 'createdOn',
        colId: 'createdOn',
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 권한
        headerValueGetter: () => {
          return this.$t('view.sso.label.roleName');
        },
        field: 'roleName',
        colId: 'roleName',
        /* valueFormatter: (params: ValueFormatterParams) => {
          return this.getTranslate('roleCode', params.data.roleCode);
        }, */
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 사용 여부
        headerValueGetter: () => {
          return this.$t('view.sso.label.isDeleted');
        },
        field: 'isDeleted',
        colId: 'isDeleted',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.changeIsDeltedWord(params.data.isDeleted);
        },
        cellStyle: { 'text-align': 'center' },
      },
    ];
  }

  changeIsDeltedWord(isDeleted: any) {
    if (isDeleted == null) {
      return this.$t('view.sso.filter.unUsed').toString();
    } else if (isDeleted) {
      return this.$t('view.sso.filter.unUsed').toString();
    } else {
      return this.$t('view.sso.filter.used').toString();
    }
  }

  getTranslate(key: string, value: string) {
    switch (key) {
      case 'roleCode': {
        return this.$t('view.sso.filter.' + value).toString();
      }
    }
  }

  checkPermissions(resourceCode: string, operationCode: string) {
    if(Array.isArray(this.resourceGroupId)) {
      let result = false
      forEach(this.resourceGroupId, resourceGroupId => {
        const bool = utils.checkPermission(this.projectId, String(this.groupId), resourceGroupId, resourceCode, operationCode);
        if(bool)
          result = true;
      });
      return result;
    }
    return utils.checkPermission(this.projectId, this.groupId, this.resourceGroupId, resourceCode, operationCode);
  }

  get permissionsCreate() {
    return this.checkPermissions('user', 'create');
  }

  get permissionsView() {
    return this.checkPermissions('user', 'view');
  }

  get permissionsDelete() {
    return this.checkPermissions('user', 'delete');
  }

  get permissionsUpdate() {
    return this.checkPermissions('user', 'update');
  }

  get permissionsExport() {
    return this.checkPermissions('user', 'export');
  }

  get projectId() {
    return this.$store.getters['sso/getProjectId'];
  }

  get groupId() {
    return this.myInfo.groupId;
  }

  get resourceGroupId() {
    const { defaultWorkspace } = this.$store.getters['sso/getSetting'].common.workspace;
    if ( defaultWorkspace == null || defaultWorkspace == 'ALL') {
      return this.myInfo.workspaces.map((workspace: any) => workspace.iprResourceGroupId);
    } else {
      return this.myInfo.workspaces.find((workspace: any) => workspace.id == defaultWorkspace).iprResourceGroupId;
    }
  }
}
</script>