<template>
  <div class="manage-common-content manage-content history-content">
    <div class="top-component">
      <div class="top-content">
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
              <validate-input type="search" v-model="keyword.word" :placeholder="$t('view.sso.other.searchPlaceholder')" @keyup.enter="searchSatate && getMenuHistoryByKeyword()"
                  :isGroup="false" :essential="false" :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
                  @output="(arg) => searchSatate = arg"/>
              <b-input-group-append>
                <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="getMenuHistoryByKeyword()">{{ $t('view.sso.button.search') }}</b-button>
              </b-input-group-append>
            </b-input-group>
            <!-- search -->
          </div>
        </div>
        <!-- search -->
      </div>
    </div>

    <!-- list -->
    <div class="table-component">
      <div class="table-content">
        <div class="table-title">
          <h4 class="title">{{ $t('view.sso.label.menuHistory') }}</h4>
        </div>
        <b-overlay :show="show" rounded="sm" no-fade opacity="0.5" class="overlay-loading">
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </b-overlay>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getMenuHistory"></Pagination>
        </div>
      </div>
    </div>
    <!-- list -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IKeyValueObject } from '@/interface';

import { UserManagementMixin, UtilsMixin } from '@/mixin';

import { AxiosResponse } from 'axios';

import { ValueFormatterParams, ValueGetterParams } from '@ag-grid-community/core';
import { forEach } from 'lodash';
import { EventBus } from '@/common';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    ValidateInput,
  },
})
export default class MenuHsitoryTab extends Mixins(UserManagementMixin, UtilsMixin) {
  keywordOptions: Array<{value: string; text: string}> = [];
  show: boolean = false;
  searchSatate: boolean = true;

  created() {
    this.getMenuHistory();
    this.optionsLocalesChange();

    this.keyword.type = 'userFullname';

    EventBus.$on('changeLocale', () => {
      this.initColumns();
      this.optionsLocalesChange();
    });
  }

  optionsLocalesChange() {
    this.keywordOptions = [
      { value: 'userFullname', text: this.$t('view.sso.filter.USER_FULLNAME').toString() },
      { value: 'groupName', text: this.$t('view.sso.label.department').toString() },
      { value: 'featureId', text: this.$t('view.sso.label.menuName').toString() },
      { value: 'username', text: this.$t('view.sso.user.username').toString() },
    ];
  }

  /* 메소드 선언 */

  getMenuHistory(page?: number) {
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
    data.sort='activeOn,desc';

    this.$store.dispatch('menuHistory/searchTelemetry', data).then((res: AxiosResponse) => {
      if (this.gridApi) {
        this.totalRows = res.data.totalElements;

        // 가공하기
        const tempData: any[] = [];
        forEach (res.data.content, (_data) => {
          _data.workspaceName = JSON.parse(_data.data).workspaceName;
          _data.eventLogName = JSON.parse(_data.data).eventLogName;
          tempData.push(_data);
        });

        this.gridApi.setRowData(res.data !== null ? tempData : null);
      }

      this.show = false;
    });
  }

  getMenuHistoryByKeyword() {
    if (this.keyword.word !== '') {
      this.keyword.hasKeyword = true;
    } else {
      this.keyword.hasKeyword = false;
    }
    this.getMenuHistory();
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
        // 유저ID
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
        field: 'userFullname',
        colId: 'userFullname',
      },
      {
        // 이메일
        headerValueGetter: () => {
          return this.$t('view.sso.label.email');
        },
        field: 'userEmail',
        colId: 'userEmail',
      },
      {
        //접속 일자
        headerValueGetter: () => {
          return this.$t('view.sso.label.activeOn');
        },
        field: 'activeOn',
        colId: 'activeOn',
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 메뉴
        headerValueGetter: () => {
          return this.$t('view.sso.label.featureId');
        },
        field: 'featureId',
        colId: 'featureId',
        valueFormatter: (cell: ValueFormatterParams) => {
          return this.menuTranslation(cell.data.featureId);
        },
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 워크스페이스
        headerValueGetter: () => {
          return this.$t('view.sso.menuHistory.workspace');
        },
        field: 'workspaceName',
        colId: 'workspaceName',
      },
      {
        // 이벤트로그
        headerValueGetter: () => {
          return this.$t('view.sso.menuHistory.eventLog');
        },
        field: 'eventLogName',
        colId: 'eventLogName',
      },
    ];
  }

  menuTranslation(menu: string) {
    if (this.$te('view.sso.filter.' + menu)) {
      return this.$t('view.sso.filter.' + menu).toString();
    } else {
      return menu;
    }
  }

  setHeaderNameByi18n() {
    for (const [index, item] of this.columnDefs.entries()) {
      if (this.$te('view.sso.label.' + item.colId)) {
        item.headerName = this.$t('view.sso.label.' + item.colId).toString();
      }
    }
    if (this.gridApi) this.gridApi.setColumnDefs(this.columnDefs);
  }
}
</script>