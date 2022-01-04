<template>
  <!-- table modal -->
  <b-modal id="modalTable" :visible="showModal" size="xl" @hidden="onHiddenModal" hide-header hide-footer centered>
    <div class="modal-table-content" :class="{ 'detail-component': showDetail }">
      <div class="modal-table">
        <div class="content-header">
          <div class="title">
            {{ option.title }}
            <template v-if="selectedBy !== ''">{{ selectedBy }}</template>
          </div>
          <div class="right-align">
            <div class="ico-header ico-close" @click="onClickExit" alt="나가기 아이콘"></div>
          </div>
        </div>
        <b-overlay :show="tableLoading.main" class="content-body" bg-color="#fff" opacity="1">
          <div class="content-header">
            <div class="title">{{ mainTableTitle }}</div>
            <span class="count-text" alt="총 케이스 수">({{ numberWithCommas(rowData.totalRows) }})</span>
            <div class="right-align">
              <div v-if="!isMobile()" id="tootip-download" class="ico-header ico-download" @click="onClickTableCSV" alt="다운로드 아이콘"></div>
            </div>
          </div>
          <ag-grid-vue class="ag-theme-balham" :gridOptions="gridOptions" :columnDefs="columnDefs" :modules="modules" :rowData="rowData.results" />

          <template #overlay>
            <b-spinner label="Spinning"></b-spinner>
          </template>
        </b-overlay>
        <div class="content-footer">
          <div class="ag-pagination">
            <div class="page-button">
              <b-pagination v-model="pageNumber" :total-rows="rowData.totalRows" :per-page="100" :limit="10" :hide-ellipsis="true" align="center" @input="onInputPage()" :disabled="tableLoading.main"></b-pagination>
            </div>
          </div>
        </div>
      </div>

      <div v-show="showDetail" class="table-detail-component">
        <b-overlay :show="tableLoading.detail" class="table-detail-content" bg-color="#fff" opacity="1">
          <div class="content-header">
            <div class="title">{{ $t('view.process.table.caseDetailTitle') }}</div>
            <span class="count-text" alt="총 케이스 수">({{ detailRowData.totalRows }})</span>
            <div class="right-align">
              <div class="ico-header ico-close" @click="showDetail = false" alt="나가기 아이콘"></div>
            </div>
          </div>
          <div class="content-body">
            <ag-grid-vue class="ag-theme-balham" :gridOptions="detailGridOptions" :columnDefs="detailColumnDefs" :modules="modules" :rowData="detailRowData.results" />
          </div>
          <div class="content-footer">
            <div class="ag-pagination">
              <div class="page-button">
                <b-pagination v-model="detailPageNumber" :total-rows="detailRowData.totalRows" :per-page="50" :limit="10" :hide-ellipsis="true" align="center" @input="onDetailInputPage()"></b-pagination>
              </div>
            </div>
          </div>
        </b-overlay>
      </div>
    </div>
    <template v-if="!isMobile()">
      <b-tooltip target="tootip-download" triggers="hover" placement="left">{{ $t('view.process.tooltip.tooltipDownload') }}</b-tooltip>
    </template>
  </b-modal>
  <!-- table modal -->
</template>

<script lang="ts">
import { Component, Mixins, Model, Prop, Watch } from 'vue-property-decorator';
import { utils } from '@/common';
import { IKeyValueObject, IWidgetTableOption } from '@/interface';
import { EventBus } from '@/common';

import { AnalysisMixin, UtilsMixin } from '@/mixin';

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
export default class WidgetTable extends Mixins(AnalysisMixin, UtilsMixin) {
  @Model('change', { type: Boolean, required: true, default: false }) readonly showModal: boolean;

  @Prop({
    type: Object,
    required: true,
    default: () => {
      return {
        widgetName: '',
        title: '',
        detail: false,
        custom: false,
      };
    },
  })
  readonly option: IWidgetTableOption;

  // 케이스 테이블 데이터
  rowData: {
    totalRows: number; // 총 데이터 수
    results: IKeyValueObject[]; // 해당 페이지 테이블 데이터
  } = {
    totalRows: 0,
    results: [],
  };

  detailRowData: {
    totalRows: number;
    results: IKeyValueObject[]; // 해당 페이지 테이블 데이터
  } = {
    totalRows: 0,
    results: [],
  };

  @Prop({
    type: Object,
    required: true,
    default: () => {
      return {
        main: false,
        detail: false,
      };
    },
  })
  readonly tableLoading: {
    main: boolean;
    detail: boolean;
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
    getRowClass: this.getRowClass,
  };
  modules = AllCommunityModules;

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

  selected: {
    type: 'case' | 'eo' | 'er';
    value: string | number;
  } = {
    type: 'case',
    value: '',
  };

  pageNumber: number = 1;
  detailPageNumber: number = 1;

  showDetail: boolean = false;

  @Watch('rowData', { deep: true })
  onRowDataChnaged(newVal: { totalRows: number; results: IKeyValueObject[] }) {
    if (this.gridOptions.api) {
      // ag grid에 데이터 세팅
      this.gridOptions.api.setRowData(newVal.results);
    }
  }

  @Watch('detailRowData', { deep: true })
  onDetailRowDataChnaged(newVal: { totalRows: number; results: IKeyValueObject[] }) {
    if (this.detailGridOptions.api) {
      // ag grid에 데이터 세팅
      this.detailGridOptions.api.setRowData(newVal.results);
    }
  }

  created() {
    this.initColumn();
  }

  mounted() {
    EventBus.$on('changeLocale', () => {
      if (this.gridOptions.api) {
        this.gridOptions.api.refreshHeader();
        this.gridOptions.api.redrawRows();
      }
      if (this.detailGridOptions.api) {
        this.detailGridOptions.api.refreshHeader();
        this.detailGridOptions.api.redrawRows();
      }
    });
  }

  beforeDestroy() {
    EventBus.$off('changeLocale');
  }

  get selectedBy() {
    if (this.showModal && this.option.selectedBy) {
      switch (this.option.widgetName) {
        case 'overview.chart.duration.by.case': {
          return `${this.$t('view.process.label.duration')} : ${this.option.selectedBy.duration}(${this.$t(`view.dashboard.histogramChart.${this.option.selectedBy.unit}`)})`;
        }
        case 'cost.chart.avg.by.resource': {
          return `${this.$t('view.process.label.er')} : ${this.option.selectedBy.resource}`;
        }
        case 'cost.chart.avg.by.originator': {
          return `${this.$t('view.process.label.eo')} : ${this.option.selectedBy.originator}`;
        }
        default: {
          return '';
        }
      }
    } else {
      return '';
    }
  }

  get mainTableTitle() {
    switch (this.option.widgetName) {
      case 'resource.chart.event.to.duration.ratio': {
        return this.$t('view.process.table.resourceTitle');
      }
      case 'originator.chart.event.to.duration.ratio': {
        return this.$t('view.process.table.originatorTitle');
      }
      default: {
        return this.$t('view.process.table.caseTitle');
      }
    }
  }

  // standard service와 async service 둘다 사용하기에 메소드로 지정
  setTableData(res: any) {
    if (res !== null) {
      this.rowData.totalRows = res.data.data.totalElements;
      this.rowData.results = _.values(res.data.data.results);
    } else {
      this.rowData = {
        totalRows: 0,
        results: [],
      };
    }

    this.tableLoading.main = false;
  }

  setCaseTableViewData(res: any) {
    if (res !== null) {
      this.detailRowData.totalRows = res.data.data.totalElements;
      this.detailRowData.results = _.values(res.data.data.results);
    } else {
      this.detailRowData = {
        totalRows: 0,
        results: [],
      };
    }

    this.tableLoading.detail = false;
  }

  // 테이블 행 더블 클릭 이벤트
  rowDoubleClicked(row: RowDoubleClickedEvent) {
    switch (this.option.widgetName) {
      case 'resource.chart.event.to.duration.ratio': {
        this.selected = {
          type: 'er',
          value: row.data.ename,
        };
        break;
      }
      case 'originator.chart.event.to.duration.ratio': {
        this.selected = {
          type: 'eo',
          value: row.data.ename,
        };
        break;
      }
      default: {
        this.selected = {
          type: 'case',
          value: row.data.ci,
        };
        break;
      }
    }

    this.gridOptions.api.redrawRows();
    this.showDetail = true;
    this.$emit('getCaseTableView', 1, this.selected.type, this.selected.value);
  }

  getRowClass(params: IRowClassParams) {
    switch (this.selected.type) {
      case 'case': {
        return params.data.ci === this.selected.value ? 'ag-row-selected' : '';
      }
      case 'er':
      case 'eo': {
        return params.data.ename === this.selected.value ? 'ag-row-selected' : '';
      }
    }
  }

  getDetailRowClass(params: IRowClassParams) {
    switch (this.option.widgetName) {
      case 'resource.chart.event.to.duration.ratio': {
        return params.data.er === this.selected.value ? 'ag-row-selected' : '';
      }
      case 'originator.chart.event.to.duration.ratio': {
        return params.data.eo === this.selected.value ? 'ag-row-selected' : '';
      }
      default: {
        return '';
      }
    }
  }

  onClickTableCSV() {
    this.$emit('downloadCSV');
  }

  // 페이지네이션 이벤트
  onInputPage() {
    this.$emit('onInputPage', this.pageNumber);
  }

  onDetailInputPage() {
    this.$emit('onDetailInputPage', this.detailPageNumber, this.selected.type, this.selected.value);
  }

  // 테이블 행 하이라이트 제거
  offHighlight() {
    this.selected = {
      type: 'case',
      value: '',
    };
    this.gridOptions.api.redrawRows();
  }

  // variant 클릭 시 초기화
  setReset() {
    this.pageNumber = 1;
    this.detailPageNumber = 1;
    this.selected = {
      type: 'case',
      value: '',
    };
    this.rowData = {
      totalRows: 0,
      results: [],
    };
    this.detailRowData = {
      totalRows: 0,
      results: [],
    };
  }

  // 테이블 헤더 칼럼 자동 크기 조절
  setColumnSize() {
    const allColumnIds: any[] = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function (column: any) {
      allColumnIds.push(column.colId);
    });
    setTimeout(() => {
      this.gridOptions.columnApi.autoSizeColumns(allColumnIds, false);
    }, 50);
  }

  // second to DDHHMMSS (duration)
  toDDHHMMSS(time: string | number) {
    return utils.toDDHHMMSS(time, this.$t('view.process.table.dayUnit').toString());
  }

  onClickExit() {
    this.setReset();
    this.showDetail = false;
    this.$emit('change', false);
  }

  onHiddenModal() {
    this.onClickExit();
  }

  onClickDetailClose() {
    this.showDetail = false;
    this.selected = {
      type: 'case',
      value: '',
    };
    this.gridOptions.api.redrawRows();
  }

  initColumn() {
    if (this.gridOptions.api) {
      this.gridOptions.api.setRowData(null);
    }

    if (this.detailGridOptions.api) {
      this.detailGridOptions.api.setRowData(null);
    }

    const numberSort = (num1: number, num2: number) => {
      return num1 - num2;
    };

    this.columnDefs = [
      {
        headerName: 'No.',
        valueGetter: (params: ValueGetterParams) => {
          return (this.pageNumber - 1) * 100 + params.node.rowIndex + 1;
        },
        width: 80,
        cellStyle: { 'text-align': 'center' },
      },
    ];

    if (!this.option.custom) {
      this.columnDefs = this.columnDefs.concat([
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
          width: 170,
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
          width: 170,
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
      ]);

      if (this.option.widgetName === 'overview.kpi.completion.rate') {
        this.columnDefs.splice(1, 0, {
          // 케이스 완료 여부
          headerValueGetter: () => {
            return this.$t('view.process.table.cl');
          },
          field: 'cl',
          colId: 'cl',
          valueFormatter: (params: ValueFormatterParams) => {
            return this.$t(`view.process.table.${params.data.cl}`).toString();
          },
          width: 150,
          cellStyle: {
            'text-align': 'right',
          },
        });
      }
    } else {
      switch (this.option.widgetName) {
        case 'resource.chart.event.to.duration.ratio':
        case 'originator.chart.event.to.duration.ratio': {
          this.columnDefs = this.columnDefs.concat([
            {
              // 리소스/담당자
              headerValueGetter: () => {
                return this.$t(`view.process.table.${this.option.widgetName.startsWith('resource') ? 'er' : 'eo'}`);
              },
              field: 'ename',
              colId: 'ename',
            },
            {
              // 발생 건수
              headerValueGetter: () => {
                return this.$t(`view.process.table.freq`);
              },
              field: 'ecnt',
              colId: 'ecnt',
              valueFormatter: (params: ValueFormatterParams) => {
                return this.numberWithCommas(params.data.ecnt);
              },
              cellStyle: {
                'text-align': 'right',
              },
            },
            {
              // 평균 소요 시간
              headerValueGetter: () => {
                return this.$t('view.process.table.edur_avg');
              },
              field: 'edur_avg',
              colId: 'edur_avg',
              valueFormatter: (params: ValueFormatterParams) => {
                return this.toDDHHMMSS(params.data.edur_avg);
              },
              cellStyle: {
                'text-align': 'right',
              },
            },
            {
              // 건수 ~% 기준
              headerValueGetter: () => {
                return this.$t('view.process.table.countConstant', { percentage: this.option.selectedBy.px * 100 });
              },
              field: 'xvalue',
              colId: 'xvalue',
              valueFormatter: (params: ValueFormatterParams) => {
                return this.numberWithCommas(params.data.xvalue);
              },
              cellStyle: {
                'text-align': 'right',
              },
            },
            {
              // 소요 시간 ~% 기준
              headerValueGetter: () => {
                return this.$t('view.process.table.durationConstant', { percentage: this.option.selectedBy.py * 100 });
              },
              field: 'yvalue',
              colId: 'yvalue',
              valueFormatter: (params: ValueFormatterParams) => {
                return this.toDDHHMMSS(params.data.yvalue);
              },
              cellStyle: {
                'text-align': 'right',
              },
            },
          ]);
        }
      }
    }

    this.detailColumnDefs = [
      {
        headerName: 'No.',
        valueGetter: (params: ValueGetterParams) => {
          return params.node.rowIndex + 1;
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

    switch (this.option.widgetName) {
      case 'resource.chart.event.to.duration.ratio':
      case 'originator.chart.event.to.duration.ratio': {
        this.detailColumnDefs.splice(1, 0, {
          // 케이스 아이디
          headerValueGetter: () => {
            return this.$t('view.process.table.ci');
          },
          field: 'ci',
          colId: 'ci',
        });
        break;
      }
    }

    if (!this.option.custom) {
      for (const [key, value] of Object.entries(this.eventView.caseAttributes as { [key: string]: string })) {
        if (!value.startsWith('ci') && !value.startsWith('ea') && !value.startsWith('ec') && !value.startsWith('es')) {
          const column: ColDef = {
            headerValueGetter: () => {
              return this.$te('view.process.table.' + key) ? this.$t('view.process.table.' + key) : this.eventView.fields[key];
            },
            field: key,
            colId: key,
          };
          if (value.startsWith('cn') || value.startsWith('en')) {
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
