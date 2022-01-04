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
              <validate-input type="search" v-model="keyword.word" :placeholder="$t('view.sso.other.searchPlaceholder')" @keyup.enter="searchSatate && getLoginHistoryByKeyword()"
                :isGroup="false" :essential="false" :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
                @output="(arg) => searchSatate = arg"/>
              <b-input-group-append>
                <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="getLoginHistoryByKeyword()">{{ $t('view.sso.button.search') }}</b-button>
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
          <h4 class="title">{{ $t('view.sso.label.loginHistory') }}</h4>
        </div>
        <b-overlay :show="show" rounded="sm" no-fade opacity="0.5" class="overlay-loading">
          <ag-grid-vue class="ag-theme-balham w-100" style="height: calc(100vh - 210px)" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="null"></ag-grid-vue>
        </b-overlay>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <Pagination :current="pageNumber" :total="totalRows" @pageChanged="getLoginHistory"></Pagination>
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

import { ValueGetterParams } from '@ag-grid-community/core';
import { EventBus } from '@/common';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    ValidateInput,
  },
})
export default class LoginHsitoryTab extends Mixins(UserManagementMixin, UtilsMixin) {
  keywordOptions: Array<{value: string; text: string}> = [];
  show: boolean = false;
  searchSatate: boolean = true;

  created() {
    this.getLoginHistory();
    this.optionsLocalesChange();

    this.keyword.type = 'userFullname';

    EventBus.$on('changeLocale', () => {
      this.initColumns();
      this.optionsLocalesChange();
    });
  }

  optionsLocalesChange() {
    this.keywordOptions = [
      { value: 'userFullname', text: this.$t('view.sso.label.name').toString() },
      { value: 'groupName', text: this.$t('view.sso.label.department').toString() },
      { value: 'username', text: this.$t('view.sso.user.username').toString() },
    ];
  }

  /* 메소드 선언 */
  getLoginHistory(page?: number) {
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

    data.size = 50;
    data.sort='signInOn,desc';

    if (this.gridApi) {
      this.gridApi.setRowData([]);
      this.gridApi.showLoadingOverlay();
    }

    this.$store.dispatch('loginHistory/searchAuthHistory', data).then((res: AxiosResponse) => {
      if (this.gridApi) {
        this.totalRows = res.data.totalElements;
        this.gridApi.setRowData(res.data !== null ? res.data.content : null);
      }

      this.show = false;
    });
  }

  getLoginHistoryByKeyword() {
    if (this.keyword.word !== '') {
      this.keyword.hasKeyword = true;
    } else {
      this.keyword.hasKeyword = false;
    }
    this.getLoginHistory();
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
        // 로그인IP
        headerValueGetter: () => {
          return this.$t('view.sso.label.ipAddress');
        },
        field: 'ipAddress',
        colId: 'ipAddress',
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 로그인 일자
        headerValueGetter: () => {
          return this.$t('view.sso.label.signInOn');
        },
        field: 'signInOn',
        colId: 'signInOn',
        cellStyle: { 'text-align': 'center' },
      },
    ];
  }
}
</script>