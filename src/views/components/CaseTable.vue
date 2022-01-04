<template>
  <div class="right-table-component case-table-component" :class="{ 'detail-component': showDetail }">
    <div class="right-table-content">
      <div class="case-table-content">
        <div class="content-header">
          <div class="title">{{ $t('view.process.table.caseTitle') }}</div>
          <span class="count-text" alt="총 케이스 수">({{ numberWithCommas(rowData.totalRows) }})</span>
          <div class="right-align">
            <div v-if="!isMobile()" id="tootip-download" class="ico-header ico-download" @click="onClickCaseTableCSV" alt="다운로드 아이콘"></div>
            <div class="ico-header ico-close" @click="onClickExit" alt="나가기 아이콘"></div>
          </div>
        </div>
        <b-overlay :show="showLoading" class="content-body" bg-color="#fff" opacity="1">
          <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="rowData.results" />

          <div class="ag-pagination">
            <div class="page-button">
              <b-pagination v-model="pageNumber" :total-rows="rowData.totalRows" :per-page="pageSize" :limit="10" :hide-ellipsis="true" align="center" @input="onInputPage()" :disabled="showLoading"></b-pagination>
            </div>
          </div>
          <template #overlay>
            <b-spinner label="Spinning"></b-spinner>
          </template>
        </b-overlay>
      </div>
      <div v-show="showDetail" class="table-detail-component">
        <b-overlay :show="detailLoading" class="table-detail-content" bg-color="#fff" opacity="1">
          <div class="content-header">
            <div class="title">{{ $t('view.process.table.caseDetailTitle') }}</div>
            <span class="count-text" alt="총 케이스 수">({{ detailRowData.totalRows }})</span>
            <div class="right-align">
              <!-- <div id="tootip-download" class="ico-header ico-download" alt="다운로드 아이콘"></div> -->
              <div class="ico-header ico-close" @click="onClickDetailClose" alt="나가기 아이콘"></div>
            </div>
          </div>
          <div class="content-body">
            <ag-grid-vue class="ag-theme-balham" :gridOptions="detailGridOptions" :columnDefs="detailColumnDefs" :modules="modules" :rowData="null" />

            <div class="ag-pagination">
              <div class="page-button">
                <b-pagination v-model="detailPageNumber" :total-rows="detailRowData.totalRows" :per-page="this.detailPageSize" :limit="10" :hide-ellipsis="true" align="center" @input="onDetailInputPage()" :disabled="detailLoading"></b-pagination>
              </div>
            </div>
          </div>
        </b-overlay>
      </div>
    </div>
    <template v-if="!isMobile()">
      <b-tooltip target="tootip-download" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipDownload') }}</b-tooltip>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { utils } from '@/common';
import { IClient, IKeyValueObject, IWorkFlowRequestAction } from '@/interface';
import { EventBus } from '@/common';

import { AnalysisMixin, UtilsMixin } from '@/mixin';

import { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';
import _ from 'lodash';

import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules, GridOptions, ColDef, GridApi, ColumnApi, ValueGetterParams, ValueFormatterParams, RowDoubleClickedEvent, RowNode } from '@ag-grid-community/all-modules';

interface IRowClassParams {
  // The data associated with this row from rowData
  data: any;
  // The RowNode associated with this row
  node: RowNode;
  // The index of the row
  rowIndex: number;
  api: GridApi;
  columnApi: ColumnApi;
  // The context as provided on `gridOptions.context`
  context: any;
}

@Component({
  components: {
    AgGridVue,
  },
})
export default class CaseTable extends Mixins(AnalysisMixin, UtilsMixin) {
  dataUri: string = '';
  // 케이스 테이블 데이터
  rowData: {
    totalPages: number; // 총 페이지 수
    totalRows: number; // 총 데이터 수
    results: IKeyValueObject[]; // 해당 페이지 테이블 데이터
  } = {
    totalRows: 0,
    totalPages: 0,
    results: [],
  };

  detailRowData: {
    totalRows: number;
  } = {
    totalRows: 0,
  };

  graphFilter: { _type: string; config?: any; type?: string; values?: any[]; from?: string; to?: string; timeStartStr?: any; component?: string } = null;

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
    getRowClass: this.getRowClass,
  };
  modules = AllCommunityModules;
  gridApi: GridApi = null;
  gridColumnApi: ColumnApi = null;

  columnDefs: ColDef[] = [];

  detailGridOptions: GridOptions = {
    suppressColumnVirtualisation: true,
    rowHeight: 36,
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string, defaultValue: string) => {
      if (this.$te('view.process.table.' + key)) return this.$t('view.process.table.' + key).toString();
      else return defaultValue;
    },
  };
  detailColumnDefs: ColDef[] = [];

  selectedCi: string = '';

  pageNumber: number = 1;
  detailPageNumber: number = 1;

  readonly pageSize: number = 100;
  readonly detailPageSize: number = 50;

  showDetail: boolean = false;

  detailLoading: boolean = false;

  created() {
    this.initColumn();
  }

  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    EventBus.$on('getCaseTable', () => {
      if (this.dataUri !== '') {
        this.getByDataUri(this.dataUri);
      } else {
        this.getCaseTable();
      }
    });
    EventBus.$on('changeLocale', () => {
      this.gridApi.refreshHeader();
      this.gridApi.redrawRows();
      this.detailGridOptions.api.refreshHeader();
      this.detailGridOptions.api.redrawRows();
    });
  }

  beforeDestroy() {
    EventBus.$off('getCaseTable');
    EventBus.$off('changeLocale');
  }

  // 케이스 테이블 데이터 api 요청
  getCaseTable() {
    // api request data 생성
    this.showLoading = true;
    if (this.graphFilter) this.$emit('showGrid');
    const data = this.requestBuilder();
    this.detailGridOptions.api.setRowData([]);
    // service/run/repo.event.case.index
    this.$store
      .dispatch('common/getCases', data)
      .then((res: AxiosResponse) => {
        this.setCaseTableData(res);
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

  // 상세 테이블 데이터 api 요청
  getCaseTableView(caseId: string) {
    // api request data 생성
    const data = this.requestBuilder(caseId);
    data[0].size = this.detailPageSize;
    data[0].page = this.detailPageNumber - 1;
    this.detailGridOptions.api.setRowData([]);
    this.detailLoading = true;
    // service/run/repo.event.case.view
    this.$store
      .dispatch('common/getCaseView', data)
      .then((res: AxiosResponse) => {
        this.detailRowData.totalRows = res.data.data.totalElements;
        const results = _.values(res.data.data.results);

        if (this.detailGridOptions.api) {
          // ag grid에 데이터 세팅
          this.detailGridOptions.api.setRowData(results);
        }
        this.detailLoading = false;
      })
      .catch((err: AxiosError) => {
        this.detailGridOptions.api.setRowData(null);
      });
  }

  // 케이스 테이블 다운로드
  onClickCaseTableCSV() {
    // api request data 생성
    const data = this.requestBuilder();
    data[0].size = -1; // for without pagination

    // service/download/repo.event.case.view.csv
    this.$store.dispatch('common/getCasesCSV', data).then((res: AxiosResponse) => {
      // 파일 제목 생성
      // eventview name
      let title = this.$route.params.projectId === 'iprdemo' ? this.$t('view.' + this.eventView.name) : this.eventView.name + '_' + this.$t('view.process.table.caseTitle');
      // 추가 필터
      if (this.graphFilter) {
        if (this.$route.name === 'processDiscovery' || this.$route.name === 'logReplay' || this.$route.name === 'socialAnalysis') title += `(filter by ${this.graphFilter.values[0]})`;
        else if (this.$route.name === 'matrixModel') title += `(filter by x=${this.graphFilter.from}, y=${this.graphFilter.to})`;
        else if (this.$route.name === 'dotted') title += `(filter by x=${this.graphFilter.timeStartStr}, y=${this.graphFilter.component})`;
      }
      // 기간
      title += `-${moment(this.filter.duration.start).format('YYYY-MM-DD')}~${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;

      // 파일 다운로드
      const file = new Blob(['\ufeff' + res.data], { type: 'text/csv;charset=utf-8' });
      // PC
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', title + '.csv'); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  // standard service와 async service 둘다 사용하기에 메소드로 지정
  setCaseTableData(res: any) {
    this.rowData.totalRows = res.data.data.totalElements;
    this.rowData.totalPages = res.data.data.totalPages;
    this.rowData.results = _.values(res.data.data.results);

    if (this.gridApi) {
      // ag grid에 데이터 세팅
      this.gridApi.setRowData(this.rowData.results);
      // 칼럼 크기 자동 조절
      this.setColumnSize();
    }

    this.showLoading = false;
  }

  setDataUri(value: string) {
    this.dataUri = value;
  }

  getByDataUri(dataUri?: string) {
    this.showLoading = true;

    this.$store
      .dispatch('common/getCache', dataUri)
      .then((res: AxiosResponse) => {
        this.setCaseTableData(res);
      })
      .catch((err: AxiosError) => {
        this.showLoading = false;
        this.resetRowData();
        this.gridApi.setRowData(null);
      });
  }

  // request data 생성기
  requestBuilder(caseId?: string) {
    const data = {
      _type: 'EventRepositoryViewConfiguration',
      repository: utils.buildRepository(this),
      page: this.pageNumber - 1,
      size: this.pageSize,
      eventFilters: [utils.buildTimeEventFilter()] as any,
      sortBy: [
        {
          name: 'cdur',
          dir: 'DESC',
        },
      ],
    };

    // 간트, 프로세스 흐름 분석 아닐 때만
    if (!caseId && this.$route.name !== 'Gantt' && this.$route.name !== 'ProcessFlow') {
      // 토큰 필터 추가
      if (this.filter.tokenInclude && this.filter.tokenInclude !== '---') {
        data.eventFilters.push(utils.buildTokenFilter());
        if (this.filter.tokenInclude !== 'ci') {
          data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
        }
      } else {
        // 토큰 필터 없으면 variantId 필터 추가
        if (this.variantId !== '---') {
          data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
        }
      }
    }

    // 케이스 아이디 필터 추가
    if (caseId) {
      data.eventFilters[0] = {
        _type: 'CaseFilterLite',
        values: [caseId],
      };
    }

    // 그래프, 차트 필터 추가
    if (this.graphFilter && !caseId) {
      data.eventFilters.push(this.graphFilter);
    }

    const request = [data];

    return request;
  }

  // workflow action data 생성기
  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'case',
      serviceId: 'repo.event.case.index',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  // 그래프, 차트 필터의 케이스 테이블 데이터 요청
  onFilterCaseTable(value: any, config?: any, type?: string) {
    switch (this.$route.name) {
      case 'ProcessDiscovery': {
        this.graphFilter = {
          _type: this.filter.algorithm === 'fhm' ? 'FhmProcessDiscoveryFilterLite' : 'FuzzyProcessDiscoveryFilterLite',
          config: config,
          type: type,
          values: [value],
        };
        break;
      }
      case 'LogReplay': {
        this.graphFilter = {
          _type: 'CaseFilterLite',
          values: value,
        };
        break;
      }
      case 'SocialAnalysis': {
        this.graphFilter = {
          _type: 'FhmProcessDiscoveryFilterLite',
          config: config,
          type: type,
          values: [value],
        };
        break;
      }
      case 'MatrixModel': {
        this.graphFilter = {
          _type: 'DirectlyFollowFilterLite',
          config: config,
          from: value.from,
          to: value.to,
        };
        break;
      }
      case 'Dotted': {
        this.graphFilter = {
          _type: 'DottedChartFilterLite',
          config: config,
          timeStartStr: value.timeStartStr,
          component: value.component,
        };
        break;
      }
      case 'Gantt': {
        this.graphFilter = utils.buildVariantFilter(utils.buildRepository(this), utils.buildTimeEventFilter(), value);
        break;
      }
      case 'ProcessFlow': {
        this.graphFilter = utils.buildVariantFilter(utils.buildRepository(this), utils.buildTimeEventFilter(), value);
        break;
      }
    }

    if (this.graphFilter.config !== undefined) {
      this.graphFilter.config.repository = utils.buildRepository(this);
    }

    this.resetRowData();

    this.pageNumber = 1;
    this.getCaseTable();
  }

  // 그래프, 차트 필터 제거
  offFilterCaseTable() {
    this.graphFilter = null;
    this.resetRowData();
    this.setReset(true);
    if (this.dataUri !== '') {
      this.getByDataUri(this.dataUri);
    } else {
      this.getCaseTable();
    }
  }

  // 테이블 행 더블 클릭 이벤트
  rowDoubleClicked(row: RowDoubleClickedEvent) {
    this.selectedCi = row.data.ci;
    this.gridApi.redrawRows();
    this.showDetail = true;
    this.detailRowData.totalRows = 0;
    this.getCaseTableView(row.data.ci);
  }

  getRowClass(params: IRowClassParams) {
    if (this.selectedCi == params.data.ci) {
      return 'ag-row-selected';
    }
  }

  // 페이지네이션 이벤트
  onInputPage() {
    this.onClickDetailClose();
    this.getCaseTable();
  }

  onDetailInputPage() {
    this.getCaseTableView(this.selectedCi);
  }

  // 테이블 행 하이라이트 제거
  offHighlight() {
    this.selectedCi = '';
    this.gridApi.redrawRows();
  }

  // variant 클릭 시 초기화
  setReset(isNotDataUri?: boolean) {
    if (!isNotDataUri) this.dataUri = '';
    this.resetRowData();
    this.pageNumber = 1;
    this.selectedCi = '';
    this.graphFilter = null;
    this.gridApi.setRowData([]);
    this.detailGridOptions.api.setRowData([]);
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
    }, 50);
  }

  // second to DDHHMMSS (duration)
  toDDHHMMSS(time: string | number) {
    return utils.toDDHHMMSS(time, this.$t('view.process.table.dayUnit').toString());
  }

  onClickExit() {
    this.showDetail = false;
    this.$emit('closeMenu');
  }

  onClickDetailClose() {
    this.showDetail = false;
    this.selectedCi = '';
    this.gridApi.redrawRows();
  }

  initColumn() {
    if (this.gridApi) {
      this.gridApi.setRowData(null);
    }

    if (this.detailGridOptions.api) {
      this.detailGridOptions.api.setRowData(null);
    }

    this.resetRowData();

    const numberSort = (num1: number, num2: number) => {
      return num1 - num2;
    };

    this.columnDefs = [
      {
        headerName: 'No.',
        valueGetter: (params: ValueGetterParams) => {
          return (this.pageNumber - 1) * this.pageSize + params.node.rowIndex + 1;
        },
        width: 80,
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 케이스 아이디
        headerValueGetter: () => {
          return this.$t('view.process.table.ci');
        },
        field: 'ci',
        colId: 'ci',
        width: 150,
      },
      {
        // 이벤트 수'
        headerValueGetter: () => {
          return this.$t('view.process.table.ecnt');
        },
        field: 'ecnt',
        colId: 'ecnt',
        comparator: numberSort,
        valueFormatter: (params: any) => {
          return this.numberWithCommas(params.data.ecnt);
        },
        width: 150,
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 시작 시간
        headerValueGetter: () => {
          return this.$t('view.process.table.ces');
        },
        field: 'cs',
        colId: 'ces',
        valueFormatter: (params: ValueFormatterParams) => {
          return moment.utc(params.data.cs).format('YYYY-MM-DD HH:mm:ss');
        },
        width: 150,
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 종료 시간
        headerValueGetter: () => {
          return this.$t('view.process.table.cec');
        },
        field: 'cc',
        colId: 'cec',
        valueFormatter: (params: ValueFormatterParams) => {
          return moment.utc(params.data.cc).format('YYYY-MM-DD HH:mm:ss');
        },
        width: 150,
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 케이스 소요시간
        headerValueGetter: () => {
          return this.$t('view.process.table.cdur');
        },
        field: 'cdur',
        colId: 'cdur',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.toDDHHMMSS(params.data.cdur);
        },
        width: 150,
        cellStyle: {
          'text-align': 'right',
        },
      },
    ];

    this.detailColumnDefs = [
      {
        headerName: 'No.',
        valueGetter: (params: ValueGetterParams) => {
          return (this.detailPageNumber - 1) * this.detailPageSize + params.node.rowIndex + 1;
        },
        width: 80,
        cellStyle: { 'text-align': 'center' },
      },
      {
        // 액티비티 명
        headerValueGetter: () => {
          return this.$t('view.process.table.ea');
        },
        field: 'ea',
        colId: 'ea',
      },
      {
        // 담당자
        headerValueGetter: () => {
          return this.$t('view.process.table.eo');
        },
        field: 'eo',
        colId: 'eo',
        valueFormatter: (params: ValueFormatterParams) => {
          return _.isEmpty(params.data.eo) ? '-' : params.data.eo;
        },
      },
      {
        // 리소스
        headerValueGetter: () => {
          return this.$t('view.process.table.er');
        },
        field: 'er',
        colId: 'er',
        valueFormatter: (params: ValueFormatterParams) => {
          return _.isEmpty(params.data.er) ? '-' : params.data.er;
        },
      },
      {
        // 시작 시간
        headerValueGetter: () => {
          return this.$t('view.process.table.ces');
        },
        field: 'es',
        colId: 'es',
        valueFormatter: (params: ValueFormatterParams) => {
          return moment.utc(params.data.es).format('YYYY-MM-DD HH:mm:ss');
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 종료 시간
        headerValueGetter: () => {
          return this.$t('view.process.table.cec');
        },
        field: 'ec',
        colId: 'ec',
        valueFormatter: (params: ValueFormatterParams) => {
          return moment.utc(params.data.ec).format('YYYY-MM-DD HH:mm:ss');
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 소요 시간
        headerValueGetter: () => {
          return this.$t('view.process.table.edur');
        },
        field: 'edur',
        colId: 'edur',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.toDDHHMMSS(params.data.edur);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
      {
        // 액티비티 구간 소요시간
        headerValueGetter: () => {
          return this.$t('view.process.table.tdur');
        },
        field: 'tdur',
        colId: 'tdur',
        valueFormatter: (params: ValueFormatterParams) => {
          return this.toDDHHMMSS(params.data.tdur);
        },
        cellStyle: {
          'text-align': 'right',
        },
      },
    ];

    for (const [key, value] of Object.entries(this.eventView.caseAttributes as { [key: string]: string })) {
      if (!value.startsWith('ci') && !value.startsWith('ea') && !value.startsWith('ec') && !value.startsWith('es')) {
        const column: ColDef = {
          headerValueGetter: () => {
            return this.$te('view.process.table.' + key) ? this.$t('view.process.table.' + key) : this.eventView.fields[key];
          },
          field: key,
          colId: key,
        };
        if (value.startsWith('cn')) {
          column.valueFormatter = (params: ValueFormatterParams) => {
            return this.numberWithCommas(params.data.cn);
          };
          column.cellStyle = {
            'text-align': 'right',
          };
        }
        if (value.startsWith('en')) {
          column.valueFormatter = (params: ValueFormatterParams) => {
            return this.numberWithCommas(params.data.en);
          };
          column.cellStyle = {
            'text-align': 'right',
          };
        }
        this.columnDefs.push(column);
      }
    }

    for (const [key, value] of Object.entries(this.eventView.eventAttributes as { [key: string]: string })) {
      if (!value.startsWith('ci') && !value.startsWith('ea') && !value.startsWith('ec') && !value.startsWith('es') && !value.startsWith('er') && !value.startsWith('eo')) {
        const column: ColDef = {
          headerValueGetter: () => {
            return this.$te('view.process.table.' + key) ? this.$t('view.process.table.' + key) : this.eventView.fields[key];
          },
          field: key,
          colId: key,
        };
        if (value.startsWith('cn')) {
          column.valueFormatter = (params: ValueFormatterParams) => {
            return this.numberWithCommas(params.data.cn);
          };
          column.cellStyle = {
            'text-align': 'right',
          };
        }
        if (value.startsWith('en')) {
          column.valueFormatter = (params: ValueFormatterParams) => {
            return this.numberWithCommas(params.data.en);
          };
          column.cellStyle = {
            'text-align': 'right',
          };
        }
        this.detailColumnDefs.push(column);
      }
    }
  }
}
</script>
