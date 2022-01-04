<template>
  <div class="right-table-component rework-table-component">
    <div class="right-table-content rework-table-content">
      <div class="content-header">
        <div class="title">{{ $t('view.process.table.bottlenecksTitle') }}</div>
        <span class="count-text">({{ numberWithCommas(rowData.totalRows) }})</span>
        <div class="right-align">
          <div v-if="!isMobile()" id="tootip-bottleneck-download" class="ico-header ico-download" @click="onClickBottleneckTableCSV" alt="다운로드 아이콘"></div>
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
      <b-tooltip target="tootip-bottleneck-download" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipDownload') }}</b-tooltip>
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
export default class LogReplayBottleneck extends Mixins(AnalysisMixin, UtilsMixin) {
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

  // 병목 테이블 데이터 api 요청
  getBottleneckTable() {
    // api request data 생성
    const data = this.requestBuilder();
    this.showLoading = true;
    // service/run/process.discovery.model.fhm.token.view.table
    this.$store
      .dispatch('logreplay/getBottleneck', data)
      .then((res: AxiosResponse) => {
        this.setTableData(res);
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

  // 병목 테이블 다운로드
  onClickBottleneckTableCSV() {
    // api request data 생성
    const data = this.requestBuilder();
    data[0].size = -1;
    // service/download/process.discovery.model.fhm.token.view.table.csv
    this.$store.dispatch('logreplay/getBottleneckCSV', data).then((res: AxiosResponse) => {
      // 파일 제목 생성
      let title = `${this.$route.params.projectId === 'iprdemo' ? this.$t('view.' + this.eventView.name) : this.eventView.name}_${this.$t('view.process.table.bottlenecksTitleReplay')}`;
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
      _type: 'FhmProcessReplayLiteConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      addArtificialStartEnd: true,
      config: {
        _type: 'FhmProcessDiscoveryLiteConfigurationImpl',
        positiveObservationThreshold: !this.haveCaseIdFilter() ? this.setting.model.freq.complex : 0,
        dependencyThreshold: this.setting.model.dep.complex,
        addArtificialStartEnd: true,
        displayLimit: 1000,
        useEventBag: this.setting.common.analysis.eventBag,
        calculateNodeRework: false,
        calculateBottleneck: true,
      },
      artificialStartEndDuration: 600,
      page: this.pageNumber - 1,
      size: 100,
    };

    // token filter 추가
    if (this.filter.tokenInclude && this.filter.tokenInclude !== '---' && this.filter.tokenInclude !== 'ci') {
      data.eventFilters.push({
        _type: 'HasAttributeFilterLite',
        attributeCol: this.filter.tokenInclude,
        values: [this.filter.tokenValue],
      });
    }

    // variantId 추가
    if (this.variantId !== '---') {
      data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
    }

    const request = [data];

    return request;
  }

  // workflow action data 생성기
  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'bottleneck',
      serviceId: 'process.discovery.model.fhm.token.view.table',
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
    this.$emit('rowDoubleClick', { source: row.data.source, target: row.data.target });
  }

  // 페이지네이션 이벤트
  onInputPage() {
    this.getBottleneckTable();
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
        // 케이스 아이디
        headerValueGetter: () => {
          return this.$t('view.process.table.ci');
        },
        field: 'caseId',
        colId: 'ci',
      },
      {
        // 시작 액티비티
        headerValueGetter: () => {
          return this.$t('view.process.table.source');
        },
        field: 'source',
        colId: 'source',
      },
      {
        // 종료 액티비티
        headerValueGetter: () => {
          return this.$t('view.process.table.target.replay');
        },
        field: 'target',
        colId: 'target.replay',
      },
      {
        // 병목기준
        headerValueGetter: () => {
          return this.$t('view.process.table.ucl');
        },
        field: 'ucl',
        colId: 'ucl',
        comparator: numberSort,
        valueFormatter: (params: ValueFormatterParams) => {
          return this.toDDHHMMSS(params.data.ucl);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 소요시간
        headerValueGetter: () => {
          return this.$t('view.process.table.total');
        },
        field: 'total',
        colId: 'total',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.toDDHHMMSS(params.data.total);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
    ];
  }
}
</script>
