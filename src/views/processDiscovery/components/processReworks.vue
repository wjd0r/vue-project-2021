<template>
  <div class="right-table-component rework-table-component">
    <div class="right-table-content rework-table-content">
      <div class="content-header">
        <div class="title">{{ $t('view.process.table.reworksTitle') }}</div>
        <span class="count-text">({{ numberWithCommas(rowData.totalRows) }})</span>
        <div class="right-align">
          <div v-if="!isMobile()" id="tootip-rework-download" class="ico-header ico-download" @click="onClickReworkTableCSV" alt="다운로드 아이콘"></div>
          <div class="ico-header ico-close" @click="onClickExit" alt="나가기 아이콘"></div>
        </div>
      </div>
      <b-overlay :show="showLoading" class="content-body" bg-color="#fff" opacity="1">
        <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="rowData.results" />
        <div class="ag-pagination">
          <div class="page-button">
            <b-pagination v-model="pageNumber" :total-rows="rowData.totalRows" :per-page="100" :limit="10" :hide-ellipsis="true" align="center" @input="onInputPage()" :disabled="showLoading"></b-pagination>
          </div>
        </div>
        <template #overlay>
          <b-spinner label="Spinning"></b-spinner>
        </template>
      </b-overlay>
    </div>
    <template v-if="!isMobile()">
      <b-tooltip target="tootip-rework-download" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipDownload') }}</b-tooltip>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IClient, IKeyValueObject, IWorkFlowRequestAction } from '@/interface';

import { AnalysisMixin, UtilsMixin } from '@/mixin';

import { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';
import _ from 'lodash';

import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules, GridOptions, ColDef, GridApi, ColumnApi, ValueFormatterParams, RowDoubleClickedEvent } from '@ag-grid-community/all-modules';

@Component({
  components: {
    AgGridVue,
  },
})
export default class ProcessReworks extends Mixins(AnalysisMixin, UtilsMixin) {
  rowData: {
    totalPages: number; // 총 페이지 수
    totalRows: number; // 총 데이터 수
    results: IKeyValueObject[];
  } = {
    totalRows: 0,
    totalPages: 0,
    results: [],
  };

  gridOptions: GridOptions = {
    suppressColumnVirtualisation: true,
    rowHeight: 36,
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    onRowDoubleClicked: this.rowDoubleClicked,
    localeTextFunc: (key: string, defaultValue: string) => {
      if (this.$te('view.process.table.' + key)) return this.$t('view.process.table.' + key).toString();
      else return defaultValue;
    },
  };
  modules = AllCommunityModules;
  gridApi: GridApi = null;
  gridColumnApi: ColumnApi = null;

  columnDefs: ColDef[] = [];

  selectedIndex: {
    page: number;
    index: number;
  } = {
    page: -1,
    index: -1,
  };

  pageNumber: number = 1;

  created() {
    this.initColumn();
  }

  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    EventBus.$on('changeLocale', () => {
      this.gridApi.refreshHeader();
      this.gridApi.redrawRows();
    });
  }

  beforeDestroy() {
    EventBus.$off('changeLocale');
  }

  // 반복 테이블 데이터 api 요청
  getReworkTable() {
    this.showLoading = true;
    // api request data 생성
    const data = this.requestBuilder();
    // service/run/process.discovery.model.fhm.pf.reworks
    this.$store
      .dispatch('process/getReworks', data)
      .then((res: AxiosResponse) => {
        this.rowData.results = _.values(res.data.data.results);

        if (this.gridApi) {
          this.gridApi.setRowData(this.rowData.results);
          this.setColumnSize();

          if (this.selectedIndex.page === this.pageNumber) {
            this.gridApi.getDisplayedRowAtIndex(this.selectedIndex.index).setSelected(true);
          }
        }
        this.showLoading = false;
      })
      .catch((err: AxiosError) => {
        this.showLoading = false;
        this.rowData = {
          totalRows: 0,
          totalPages: 0,
          results: [],
        };
        this.gridApi.setRowData(null);
      });
  }

  // 반복 테이블 다운로드
  onClickReworkTableCSV() {
    // api request data 생성
    const data = this.requestBuilder();
    data[0].size = -1; // for without pagination

    // service/download/process.discovery.model.fhm.pf.reworks.csv
    this.$store.dispatch('process/getReworksCSV', data).then((res: AxiosResponse) => {
      // 파일 제목 생성
      let title = `${this.$route.params.projectId === 'iprdemo' ? this.$t('view.' + this.eventView.name) : this.eventView.name}_${this.$t('view.process.table.reworksTitle')}`;
      // 기간
      title += `-${moment(this.filter.duration.start).format('YYYY-MM-DD')}~${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;

      // 파일 다운로드
      const file = new Blob(['\ufeff' + res.data], { type: 'text/csv;charset=utf-8' });
      const link = document.createElement('a');
      // PC
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.setAttribute('download', title + '.csv'); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  setTableData(res: any) {
    this.rowData.totalRows = res.data.data.totalElements;
    this.rowData.totalPages = res.data.data.totalPages;
    this.rowData.results = _.values(res.data.data.results);

    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData.results);
      this.setColumnSize();

      if (this.selectedIndex.page === this.pageNumber) {
        this.gridApi.getDisplayedRowAtIndex(this.selectedIndex.index).setSelected(true);
      }
    }
    this.showLoading = false;
  }

  getByDataUri(dataUri?: string) {
    this.showLoading = true;

    this.$store
      .dispatch('common/getCache', dataUri)
      .then((res: AxiosResponse) => {
        this.setTableData(res);
      })
      .catch((err: AxiosError) => {
        this.showLoading = false;
        this.resetRowData();
        this.gridApi.setRowData(null);
      });
  }

  // request data 생성기
  requestBuilder() {
    const data = {
      _type: 'FhmProcessDiscoveryLiteConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      page: this.pageNumber - 1,
      size: 100,
      positiveObservationThreshold: !this.haveCaseIdFilter() ? this.filter.freq : 0,
      dependencyThreshold: this.filter.dep,
      addArtificialStartEnd: true,
      displayLimit: 1000,
      useEventBag: this.setting.common.analysis.eventBag,
      calculateNodeRework: true,
      calculateBottleneck: false,
    };

    // 추가 조건 필터 추가
    if (this.filter.tokenInclude && this.filter.tokenInclude !== '---') {
      data.eventFilters.push(utils.buildTokenFilter());
      if (this.filter.tokenInclude !== 'ci') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    } else {
      // 추가 조건이 없으면 variantId 필터 추가
      if (this.variantId !== '---') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    }

    const request = [data];
    return request;
  }

  // workflow action data 생성기
  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    // const request = this.requestBuilder;
    return {
      _type: 'ServiceAction',
      id: 'rework',
      serviceId: 'process.discovery.model.fhm.pf.reworks',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  // 테이블 행 더블 클릭 이벤트
  rowDoubleClicked(row: RowDoubleClickedEvent) {
    this.selectedIndex = {
      page: this.pageNumber,
      index: row.rowIndex,
    };
    this.gridApi.getDisplayedRowAtIndex(row.rowIndex).setSelected(true);
    this.$emit('rowDoubleClick', row.data.name);
  }

  // 페이지네이션 이벤트
  onInputPage() {
    this.getReworkTable();
  }

  // 테이블 행 하이라이트 제거
  offHighlight() {
    if (this.selectedIndex.index !== -1) {
      this.gridApi.getDisplayedRowAtIndex(this.selectedIndex.index).setSelected(false);
    }
    this.selectedIndex = {
      page: 0,
      index: -1,
    };
  }

  // variant 클릭 시 초기화
  setReset() {
    this.resetRowData();
    this.pageNumber = 1;
    this.selectedIndex = {
      page: 0,
      index: -1,
    };
    this.gridApi.setRowData([]);
  }

  resetRowData() {
    this.rowData = {
      totalRows: 0,
      totalPages: 0,
      results: [],
    };
  }

  // 테이블 헤더 칼럼 자동 크기 조절
  setColumnSize() {
    const allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: any) {
      allColumnIds.push(column.colId);
    });
    setTimeout(() => {
      this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    }, 100);
  }

  // second to DDHHMMSS (duration)
  toDDHHMMSS(time: string | number) {
    return utils.toDDHHMMSS(time, this.$t('view.process.table.dayUnit').toString());
  }

  onClickExit() {
    this.$emit('closeMenu');
  }

  initColumn() {
    const numberSort = (num1: number, num2: number) => {
      return num1 - num2;
    };

    this.resetRowData();

    this.columnDefs = [
      {
        // 액티비티
        headerValueGetter: () => {
          return this.$t('view.process.table.activity');
        },
        field: 'name',
        colId: 'activity',
      },
      {
        // 반복 횟수
        headerValueGetter: () => {
          return this.$t('view.process.table.rwCount');
        },
        field: 'rwCount',
        colId: 'rwCount',
        comparator: numberSort,
        valueFormatter: (params: ValueFormatterParams) => {
          return this.numberWithCommas(params.data.rwCount);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 반복 평균 소요시간
        headerValueGetter: () => {
          return this.$t('view.process.table.rwAverageCases');
        },
        field: 'rwAverageCases',
        colId: 'rwAverageCases',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.toDDHHMMSS(params.data.rwAverageCases);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 반복 케이스 수
        headerValueGetter: () => {
          return this.$t('view.process.table.rwCountCases');
        },
        field: 'rwCountCases',
        colId: 'rwCountCases',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.numberWithCommas(params.data.rwCountCases);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
    ];
  }
}
</script>
