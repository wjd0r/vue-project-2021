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
                <validate-input type="search" v-model="keyword.word" :placeholder="$t('view.sso.other.searchPlaceholder')" @keyup.enter="searchSatate && getRoleListByKeyword()"
                  :isGroup="false" :essential="false" :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
                  @output="(arg) => searchSatate = arg"/>
                <b-input-group-append>
                  <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="getRoleListByKeyword()">{{ $t('view.sso.button.search') }}</b-button>
                </b-input-group-append>
              </b-input-group>
              <!-- search -->
            </div>
          </div>
          <!-- search -->
        </div>
        <!-- button -->
        <div class="btn-group" :class="{ 'd-none': isMobileBlock() }">
          <b-button variant="outline-primary" class="btn-modify" @click="onClickModify()" :class="`lang-${$i18n.locale}`" :disabled="this.selectedId === -1">{{ $t('view.sso.button.editRole') }}</b-button>
          <b-button variant="primary" class="btn-create" @click="onClickRegister()" :class="`lang-${$i18n.locale}`">{{ $t('view.sso.button.createRole') }}</b-button>
        </div>
        <!-- button -->
      </div>
    </div>

    <!-- list -->
    <div class="table-component">
      <div class="table-content">
        <div class="table-title">
          <h4 class="title">{{ $t('view.sso.label.roleManage') }}</h4>
        </div>
        <b-overlay :show="show" rounded="sm" no-fade opacity="0.5" class="overlay-loading">
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </b-overlay>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getRoleList"></Pagination>
        </div>
      </div>
    </div>
    <!-- list -->
    <!-- overlay -->
    <b-overlay :show="showOverlay" bg-color="#fff" opacity="1" no-wrap no-fade class="overlay-form">
      <template #overlay>
        <RoleMadal :mode="form" :id="selectedRow[1]" @finish="finish()" @close="showOverlay = false" />
      </template>
    </b-overlay>
    <!-- overlay -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import { UserManagementMixin, UtilsMixin } from '@/mixin';

import { AxiosError, AxiosResponse } from 'axios';

import { RowDoubleClickedEvent, ValueFormatterParams, ValueGetterParams } from '@ag-grid-community/core';

import RoleMadal from '../modals/RoleModal.vue';
import { EventBus, utils } from '@/common';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    RoleMadal,
    ValidateInput,
  },
})
export default class RoleTab extends Mixins(UserManagementMixin, UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  rowData: Array<any> = [];
  roleForm: any = {};

  keywordOptions: Array<{value: string; text: string}> = [];

  // userId, roleId
  selectedRow: (number | string)[] = [-1, -1];

  show: boolean = false;

  searchSatate: boolean = true;

  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    this.gridOptions.rowSelection = 'single';
    this.gridOptions.onSelectionChanged = this.onSelectionChanged;
    this.gridOptions.onRowDoubleClicked = this.onRowDoubleClicked;

    this.getRoleList();
    this.optionsLocalesChange();

    this.keyword.type = 'name';

    EventBus.$on('changeLocale', () => {
      this.initColumns();
      this.optionsLocalesChange();
    });

    EventBus.$on('roleRowData', (fn: any) => {
      fn(this.rowData);
    });

    EventBus.$on('roleForm', (fn: any) => {
      fn(this.roleForm);
    });
  }

  beforeDestroy() {
    EventBus.$off('changeLocale');
    EventBus.$off('roleRowData');
    EventBus.$off('roleForm');
  }

  // 수정하기 또는 더블 클릭시
  getRoleInfo() {
    this.$store.dispatch('roleManage/getRole', this.selectedId).then((res: AxiosResponse) => {
      this.roleForm = res.data;
      this.showOverlay = true;
    }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  optionsLocalesChange() {
    this.keywordOptions = [
      { value: 'name', text: this.$t('view.sso.label.permissionName').toString() },
    ];
  }

  /* 메소드 선언 */
  getRoleList(page?: number) {
    this.show = true;
    const data: any = {};

    if (this.keyword.hasKeyword) {
      const { type, word } = this.keyword;
      data.search = `${type}~${word}`;
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

    this.$store.dispatch('roleManage/getRoles', data).then((res: AxiosResponse) => {
      if (this.gridApi) {
        this.totalRows = res.data.totalElements;
        this.rowData = res.data !== [] ? res.data.content : [];
        this.gridApi.setRowData(res.data !== null ? res.data.content : null);
      }

      this.show = false;
    }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  getRoleListByKeyword() {
    if (this.keyword.word !== '') {
      this.keyword.hasKeyword = true;
    } else {
      this.keyword.hasKeyword = false;
    }
    this.getRoleList();
  }

  // 등록하기
  onClickRegister() {
    // 등록하기 전에 초기화
    this.roleForm = {
      name: '',
      code: '',
      desc: '',
      isDeleted: false,
      createdOn: '',
      addPermissions:[],
      removePermissions:[],
      permissions: [],
    };

    this.form = 'create';
    this.showOverlay = true;
  }

  onClickModify() {
    this.form = 'modify';
    if (this.selectedRow[0] === -1 || this.selectedRow[1] === -1) {
      return;
    }
    this.getRoleInfo();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = [selectedRows[0].userId, selectedRows[0].id];
    this.selectedId = selectedRows[0].id;
  }

  onRowDoubleClicked(row: RowDoubleClickedEvent) {
    this.selectedRow = [row.data.userId, row.data.id];
    this.selectedId = row.data.id;
    this.form = 'modify';
    this.getRoleInfo();
  }

  finish() {
    this.getRoleList();
    this.selectedRow = [-1, -1];
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
        // 권한 CODE
        headerValueGetter: () => {
          return this.$t('view.sso.label.roleCode');
        },
        field: 'code',
        colId: 'code',
      },
      {
        // 이름
        headerValueGetter: () => {
          return this.$t('view.sso.label.permissionName');
        },
        field: 'name',
        colId: 'name',
      },
      {
        // 설명
        headerValueGetter: () => {
          return this.$t('view.sso.label.description');
        },
        field: 'desc',
        colId: 'desc',
      },
      {
        // 등록일
        headerValueGetter: () => {
          return this.$t('view.sso.label.createdOn');
        },
        field: 'createdOn',
        colId: 'createdOn',
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

  changeIsApprovedWord(isApprovedGroup: any) {
    if (isApprovedGroup) {
      return this.$t('view.sso.filter.approved').toString();
    } else {
      return this.$t('view.sso.filter.unApproved').toString();
    }
  }

  changeIsDeltedWord(isDeleted: any) {
    if (isDeleted) {
      return this.$t('view.sso.filter.unUsed').toString();
    } else {
      return this.$t('view.sso.filter.used').toString();
    }
  }
}
</script>