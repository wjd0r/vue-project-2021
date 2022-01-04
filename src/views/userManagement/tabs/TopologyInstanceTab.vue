<template>
  <div class="manage-common-content manage-content topologe-common-component">
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
          <b-button variant="outline-primary" class="btn-modify" @click="topology.type2 = 'modify'; onClickView()" :class="`lang-${$i18n.locale}`" :disabled="this.selectedId === -1" desc="토폴로지 수정"> {{ $t('view.sso.topology.button.update') }} </b-button>
          <b-button variant="primary" class="btn-create" @click="topology.type2 = 'create'; onClickView()" :class="`lang-${$i18n.locale}`" desc="토폴로지 등록"> {{ $t('view.sso.topology.button.insert') }} </b-button>
        </div>
        <!-- button -->
      </div>
    </div>

    <!-- list -->
    <div class="table-component">
      <div class="table-content">
        <div class="table-title">
          <h4 class="title" desc="토폴로지 instance 관리"> {{ $t('view.sso.topology.label.instanceManagement') }} </h4>
        </div>
        <b-overlay :show="show" rounded="sm" no-fade opacity="0.5" class="overlay-loading">
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </b-overlay>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getListData"></Pagination>
        </div>
      </div>
    </div>
    <!-- list -->

    <!-- overlay -->
    <b-overlay :show="showOverlay" bg-color="#fff" opacity="1" no-wrap no-fade class="overlay-form">
      <template #overlay>
        <TopologyInstanceModal ref="modal" :id="selectedId" @finish="finish()" @close="showOverlay = false" />
      </template>
    </b-overlay>
    <!-- overlay -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { AxiosResponse } from 'axios';
import { UserManagementMixin, UtilsMixin } from '@/mixin';
import { RowDoubleClickedEvent, ValueGetterParams } from '@ag-grid-community/core';
import { EventBus } from '@/common';

import TopologyInstanceModal from '../modals/TopologyInstanceModal.vue';
import Topology from '../ts/Topology';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    TopologyInstanceModal,
    ValidateInput,
  },
  computed: {
    ...mapGetters({
      myInfo: 'sso/getMyInfo',
      projectId: 'sso/getProjectId',
    }),
  },
})
export default class TopologyTemplateTab extends Mixins(UserManagementMixin, UtilsMixin) {
  topology: Topology = null;

  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  myInfo!: any;
  projectId!: any;
  datasetCreateInfo!: any;

  selectedRows: any = null;

  /* 클래스 변수 선언 */
  keywordOptions: Array<{value: string; text: string}> = [];
  userList: any = [];

  show: boolean = false;

  searchSatate: boolean = true;

  created() {
    this.topology = new Topology('instance', this.projectId, this.myInfo);
    this.topology.setVue(this);
    this.gridOptions.rowSelection = 'single';

    this.gridOptions.localeTextFunc = (key: string, defaultValue: string) => {
      if (this.$te('view.sso.alert.' + key)) return this.$t('view.sso.alert.' + key).toString();
      else return defaultValue;
    }

    this.gridOptions.onSelectionChanged = this.onSelectionChanged;
    this.gridOptions.onRowDoubleClicked = this.onRowDoubleClicked;

    this.getListData();
    this.optionsLocalesChange();

    this.keyword.type = this.topology.options.instance[0].value;

    // 상단 다국어 변경 시 이벤트
    EventBus.$on('changeLocale', () => {
      this.initColumns();
      this.optionsLocalesChange();
    });
  }

  optionsLocalesChange() {
    this.keywordOptions = this.topology.options.instance;
  }

  // 리스트 조회
  async getListData(page?: number) {
    this.show = true;
    this.selectedId = -1;

    if (this.gridApi) {
      this.gridApi.setRowData([]);
      this.gridApi.showLoadingOverlay();
    }

    await this.topology.getInstances();

    this.totalRows = 5;
    this.gridApi.setRowData(this.topology.data.instances);
    this.show = false;
  }

  // search 버튼 클릭 (또는 엔터)
  getUserListByKeyword() {
    if (this.keyword.word !== '') {
      this.keyword.hasKeyword = true;
    } else {
      this.keyword.hasKeyword = false;
    }
    this.getListData();
  }

  // 토폴로지 보기 클릭 시
  onClickView() {
    this.showOverlay = true;
  }

  // 로우 선택시 처리
  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedId = this.selectedRows.id;
  }

  // 더블 클릭시 처리
  onRowDoubleClicked(row: RowDoubleClickedEvent) {
    this.selectedId = row.data.id;
    this.form = 'modify';
    this.showOverlay = true;
  }

  // 리스트 화면으로 다시 들어 올때
  finish() {
    this.getListData();
    this.selectedId = -1;
    this.showOverlay = false;
  }

  // 컬럼 초기화
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
        // Template Name
        headerValueGetter: () => {
          return 'Template Name';
        },
        width: 300,
        field: 'templateName',
        colId: 'templateName',
      },
      {
        // Instance Name
        headerValueGetter: () => {
          return 'Instance Name';
        },
        width: 300,
        field: 'instanceName',
        colId: 'instanceName',
      },
      {
        // State
        headerValueGetter: () => {
          return 'State';
        },
        width: 100,
        field: 'state',
        colId: 'state',
      },
      {
        // Source
        headerValueGetter: () => {
          return 'Source';
        },
        width: 300,
        field: 'source',
        colId: 'source',
      },
      {
        // Target
        headerValueGetter: () => {
          return 'Target';
        },
        field: 'target',
        colId: 'target',
      },
    ];
  }
}
</script>