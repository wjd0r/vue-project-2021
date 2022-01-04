<template>
  <div class="manage-common-content manage-content workspace-content">
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
                <validate-input type="search" v-model="keyword.word" :placeholder="$t('view.sso.other.searchPlaceholder')" @keyup.enter="searchSatate && getWorkspaceByKeyword()"
                  :isGroup="false" :essential="false" :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
                  @output="(arg) => searchSatate = arg"/>
                <b-input-group-append>
                  <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="searchSatate && getWorkspaceByKeyword()">{{ $t('view.sso.button.search') }}</b-button>
                </b-input-group-append>
              </b-input-group>
              <!-- search -->
            </div>
          </div>
          <!-- search -->
        </div>
        <!-- button -->
        <div class="btn-group" :class="{ 'd-none': isMobileBlock() }">
          <b-button variant="outline-primary" class="btn-modify" @click="onClickModify()" :class="`lang-${$i18n.locale}`" :disabled="this.selectedId === -1">{{ $t('view.sso.workspace.editWorkspace') }}</b-button>
          <b-button variant="primary" class="btn-create" @click="onClickRegister()" :class="`lang-${$i18n.locale}`">{{ $t('view.sso.workspace.newWorkspace') }}</b-button>
        </div>
        <!-- button -->
      </div>
    </div>

    <!-- list -->
    <!-- <b-overlay :show="true" rounded="sm" no-fade opacity="1">
      <div class="table-component">
        <div class="table-content">
          <div class="table-title">
            <h4 class="title">{{ $t('view.sso.workspace.workspaceManagement') }}</h4>
          </div>
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </div>
        <div class="bottom-component">
          <div class="bottom-content">
            <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getWorkspace"></Pagination>
          </div>
        </div>
      </div>
    </b-overlay> -->
  
    <div class="table-component">
      <div class="table-content" style="overflow: hidden;">
        <div class="table-title">
          <h4 class="title">{{ $t('view.sso.workspace.workspaceManagement') }}</h4>
        </div>
        <b-overlay :show="show"  no-fade opacity="0.5" class="overlay-loading">
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </b-overlay>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getWorkspace"></Pagination>
        </div>
      </div>
    </div>
    <!-- list -->

    <!-- overlay -->
    <b-overlay :show="showOverlay" bg-color="#fff" opacity="1" no-wrap no-fade class="overlay-form">
      <template #overlay>
        <WorkspaceModal :mode="form" :id="selectedId" @finish="finish()" @close="showOverlay = false" />
      </template>
    </b-overlay>
    <!-- overlay -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins, ProvideReactive } from 'vue-property-decorator';

import { UserManagementMixin, UtilsMixin } from '@/mixin';

import { AxiosError, AxiosResponse } from 'axios';

import { RowDoubleClickedEvent, ValueFormatterParams, ValueGetterParams } from '@ag-grid-community/core';

import WorkspaceModal from '../modals/WorkspaceModal.vue';
import { EventBus, utils } from '@/common';
import { forEach } from 'lodash';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    WorkspaceModal,
    ValidateInput,
  },
})
export default class WorkspaceTab extends Mixins(UserManagementMixin, UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  rowData: Array<any> = [];
  workspaceForm: any = {};

  keywordOptions: Array<{value: string; text: string}> = [];
  selectedId: number = -1;

  show: boolean = false;
  searchSatate: boolean = true;

  roles: any = [];
  
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  async created() {
    this.gridOptions.rowSelection = 'single';

    this.gridOptions.localeTextFunc = (key: string, defaultValue: string) => {
      if(!this.permissionsView)
        return this.$t('view.repo.alert.noPermission').toString();
      else if (this.$te('view.sso.alert.' + key)) return this.$t('view.sso.alert.' + key).toString();
      else return defaultValue;
    }

    this.gridOptions.onSelectionChanged = this.onSelectionChanged;
    this.gridOptions.onRowDoubleClicked = this.onRowDoubleClicked;

    this.getWorkspace();
    this.optionsLocalesChange();

    this.keyword.type = 'workspaceName';

    EventBus.$on('changeLocale', () => {
      this.initColumns();
      this.optionsLocalesChange();
    });

    EventBus.$on('workspaceRowData', (fn: any) => {
      fn(this.rowData);
    });

    EventBus.$on('workspaceForm', (fn: any) => {
      fn(this.workspaceForm);
    });

    // rols 를 너무 많이 콜하여 workspaceform 이 만들어 질때 한번만 호출하도록 변경함
    this.roles = (await this.$store.dispatch('roleManage/getRoles', {})).data.content; // 권한 데이터 가져오기
  }

  beforeDestroy() {
    EventBus.$off('changeLocale');
    EventBus.$off('workspaceRowData');
    EventBus.$off('workspaceForm');
  }

  optionsLocalesChange() {
    this.keywordOptions = [
      { value: 'workspaceName', text: this.$t('view.sso.workspace.workspaceName').toString() },
      { value: 'adminUsername', text: this.$t('view.sso.label.adminUsername').toString() },
      { value: 'adminFullname', text: this.$t('view.sso.filter.MANAGER_NAME').toString() },
      { value: 'isDeleted', text: this.$t('view.sso.label.isDeleted').toString() },
    ];
  }

  /* 메소드 선언 */
  async getWorkspace(page?: number) {
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

    this.$store.dispatch('workspaceManage/getWorkspaces', data).then((res: AxiosResponse) => {
      if (this.gridApi) {
        this.totalRows = res.data.totalElements;
        this.rowData = res.data !== [] ? res.data.content : [];
        this.gridApi.setRowData(res.data !== null ? res.data.content : null);
      }

      this.show = false;
    }).catch((err: AxiosError) => utils.handlerError(this, err));
  }

  getWorkspaceByKeyword() {
    if (this.keyword.word !== '') {
      this.keyword.hasKeyword = true;
    } else {
      this.keyword.hasKeyword = false;
    }
    this.getWorkspace();
  }

  // 등록하기
  onClickRegister() {
    if(!this.permissionsCreate) {
      return utils.noPermissionAlert(this);
    }

    // 등록하기 전에 초기화
    this.workspaceForm = {
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

    this.form = 'create';
    this.showOverlay = true;
  }

  // 수정하기 또는 더블 클릭시
  getWorkspaceDetailInfo() {
    this.$store.dispatch('workspaceManage/getWorkspace', this.selectedId).then((res: AxiosResponse) => {
      this.workspaceForm = res;
      this.showOverlay = true;
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
    this.getWorkspaceDetailInfo();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedId = selectedRows[0].id;
  }

  onRowDoubleClicked(row: RowDoubleClickedEvent) {
    this.selectedId = row.data.id;
    this.form = 'modify';
    this.getWorkspaceDetailInfo();
  }

  finish() {
    this.getWorkspace();
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
        // workspace 명
        headerValueGetter: () => {
          return this.$t('view.sso.workspace.workspaceName');
        },
        field: 'workspaceName',
        colId: 'workspaceName',
      },
      {
        // 관리자 유저 ID
        headerValueGetter: () => {
          return this.$t('view.sso.label.adminUsername');
        },
        field: 'adminUsername',
        colId: 'adminUsername',
      },
      {
        // 관리자 이름
        headerValueGetter: () => {
          return this.$t('view.sso.filter.MANAGER_NAME').toString();
        },
        field: 'adminFullname',
        colId: 'adminFullname',
      },
      {
        // 사용자 수
        headerValueGetter: () => {
          return this.$t('view.sso.label.totalUsers').toString();
        },
        field: 'memberCount',
        colId: 'memberCount',
      },
      {
        // 데이터 소스 수
        headerValueGetter: () => {
          return this.$t('view.sso.label.totalDatasource').toString();
        },
        field: 'datasourceCount',
        colId: 'datasourceCount',
      },
      {
        // 원본 데이터 수
        headerValueGetter: () => {
          return this.$t('view.sso.label.totalDataset').toString();
        },
        field: 'originDataCount',
        colId: 'originDataCount',
      },
      {
        // 이벤트로그 수
        headerValueGetter: () => {
          return this.$t('view.sso.label.totalEventLog').toString();
        },
        field: 'eventLogCount',
        colId: 'eventLogCount',
      },
      {
        // 표준 프로세스 수
        headerValueGetter: () => {
          return this.$t('view.sso.label.totalBaselineProcess').toString();
        },
        field: 'standardProcessCount',
        colId: 'standardProcessCount',
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

  changeIsDeltedWord(isDeleted: any) {
    if (isDeleted) {
      return this.$t('view.sso.filter.unUsed').toString();
    } else {
      return this.$t('view.sso.filter.used').toString();
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
    return this.checkPermissions('workspace.resource', 'create');
  }

  get permissionsView() {
    return this.checkPermissions('workspace.resource', 'view');
  }

  get permissionsDelete() {
    return this.checkPermissions('workspace.resource', 'delete');
  }

  get permissionsUpdate() {
    return this.checkPermissions('workspace.resource', 'update');
  }

  get permissionsExport() {
    return this.checkPermissions('workspace.resource', 'export');
  }

  get projectId() {
    return this.$store.getters['sso/getProjectId'];
  }

  get groupId() {
    return this.$store.getters['sso/getMyInfo'].groupId;
  }

  get resourceGroupId() {
    const { defaultWorkspace } = this.$store.getters['sso/getSetting'].common.workspace;
    if ( defaultWorkspace == null || defaultWorkspace == 'ALL') {
      return this.$store.getters['sso/getMyInfo'].workspaces.map((workspace: any) => workspace.iprResourceGroupId);
    } else {
      return this.$store.getters['sso/getMyInfo'].workspaces.find((workspace: any) => workspace.id == defaultWorkspace).iprResourceGroupId;
    }
  }
}
</script>