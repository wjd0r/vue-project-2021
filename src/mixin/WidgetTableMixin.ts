import { Vue, Component, Ref } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { IFilter, IKeyValueObject, ISetting, IWidgetTableOption } from '@/interface';

import { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';
import _ from 'lodash';

import WidgetTable from '../views/dashboard/components/WidgetTable.vue';

@Component({
  computed: mapGetters({
    filter: 'common/getFilter',
    variantId: 'common/getVariantId',
    eventView: 'repository/getRepoEventView',
    setting: 'sso/getSetting',
  }),
})
export default class WidgetTableMixin extends Vue {
  readonly filter!: IFilter;
  readonly variantId!: string;
  readonly eventView!: IKeyValueObject;
  readonly setting!: ISetting;

  name: string = '';

  showTable: boolean = false;

  widgetTableOpion: IWidgetTableOption = {
    widgetName: '',
    title: '',
    detail: false,
    custom: false,
  };

  tableLoading: {
    main: boolean;
    detail: boolean;
  } = {
    main: false,
    detail: false,
  };

  tableFilter: {
    value?: string;
    x?: string | number;
    y?: string | number;
  } = {
    value: '',
    x: 0,
    y: 0,
  };

  table: any[] = [];

  @Ref() widgetTable: WidgetTable;

  beforeGetTable() {
    this.tableLoading.main = true;
  }

  // 케이스 테이블 데이터 api 요청
  getTable(pageNumber: number) {
    this.tableLoading.main = true;
    // api request data 생성
    const data = this.tableRequestBuilder(pageNumber);

    // store action 지정
    let action = '';

    switch (this.name) {
      case 'resource.chart.event.to.duration.ratio':
      case 'originator.chart.event.to.duration.ratio': {
        action = 'getAttrTable';
        break;
      }
      default: {
        action = 'getCases';
        break;
      }
    }

    // service/run/repo.event.case.index
    // service/run/repo.event.attr.index
    this.$store
      .dispatch(`common/${action}`, data)
      .then((res: AxiosResponse) => {
        this.widgetTable.setTableData(res);
      })
      .catch((err: AxiosError) => {
        // this.setTableData(null);
        this.widgetTable.setTableData(null);
      });
  }

  // 상세 테이블 데이터 api 요청
  getCaseTableView(pageNumber: number, type: 'case' | 'er' | 'eo', value: string | number) {
    // 변수 초기화
    // this.detailRowData.totalRows = 0;
    this.tableLoading.detail = true;
    // api request data 생성
    const data = this.detailTableRequestBuilder(pageNumber, type, value);

    // service/run/repo.event.case.view
    this.$store
      .dispatch('common/getCaseView', data)
      .then((res: AxiosResponse) => {
        this.widgetTable.setCaseTableViewData(res);
      })
      .catch((err: AxiosError) => {
        this.widgetTable.setCaseTableViewData(null);
      });
    ``;
  }

  // 테이블 다운로드
  downloadCSV() {
    // api request data 생성
    const data = this.tableRequestBuilder(0);
    data[0].size = -1; // for without pagination

    // field ailas
    switch (this.name) {
      // kpi
      // chart
      case 'resource.chart.event.to.duration.ratio':
      case 'originator.chart.event.to.duration.ratio': {
        data[0].fieldAliasesOnly = true;
        data[0].fieldAliases = {
          ename: this.name.startsWith('resource') ? this.getTableTranslate('er') : this.getTableTranslate('eo'),
          ecnt: this.getTableTranslate('freq'),
          edur: this.getTableTranslate('duration'),
          edur_avg: this.getTableTranslate('edur_avg'),
          xvalue: this.getTableTranslate('countConstant', { percentage: this.widgetTableOpion.selectedBy.px * 100 }),
          yvalue: this.getTableTranslate('durationConstant', { percentage: this.widgetTableOpion.selectedBy.py * 100 }),
        };
        break;
      }
      default: {
        data[0].fieldAliases = {
          ci: this.getTableTranslate('ci'),
          ecnt: this.getTableTranslate('ecnt'),
          cdur: this.getTableTranslate('cdur'),
          cs: this.getTableTranslate('ces'),
          cc: this.getTableTranslate('cec'),
          cl: this.getTableTranslate('cl'),
        };
        break;
      }
    }

    // store action 지정, request 수정
    let action = '';

    switch (this.name) {
      case 'resource.chart.event.to.duration.ratio':
      case 'originator.chart.event.to.duration.ratio': {
        data[0]._type = 'EventRepositoryAttributeViewConfiguration';
        action = 'getAttrTableCSV';
        break;
      }
      default: {
        data[0]._type = 'EventRepositoryViewConfiguration';
        action = 'getCasesCSV';
        break;
      }
    }

    // service/download/repo.event.case.view.csv
    // service/download/repo.event.attr.index.csv
    this.$store.dispatch(`common/${action}`, data).then((res: AxiosResponse) => {
      // 파일 제목 생성
      // eventview name
      let title = this.$route.params.projectId === 'iprdemo' ? this.$t('view.' + this.eventView.name) : this.eventView.name;
      // widget name
      title += `-${this.$te(`view.dashboard.${this.name}`) ? this.$t(`view.dashboard.${this.name}`) : this.$t(`view.dashboard.${this.name}.title`)}`;

      // 케이스/리소스/담당자 목록
      switch (this.name) {
        case 'overview.chart.duration.by.case': {
          title += `-${this.$t('view.process.table.caseTitle')}`;
          title += `(${this.$t('view.process.label.duration')}_${this.widgetTableOpion.selectedBy.duration}(${this.$t(`view.dashboard.histogramChart.${this.widgetTableOpion.selectedBy.unit}`)}))`;
          break;
        }
        case 'resource.chart.event.to.duration.ratio': {
          title += `-${this.$t('view.process.table.resourceTitle')}`;
          break;
        }
        case 'originator.chart.event.to.duration.ratio': {
          title += `-${this.$t('view.process.table.originatorTitle')}`;
          break;
        }
        case 'cost.chart.avg.by.resource': {
          title += `-${this.$t('view.process.table.caseTitle')}`;
          title += `(${this.$t('view.process.label.er')}_${this.widgetTableOpion.selectedBy.resource})`;
          break;
        }
        case 'cost.chart.avg.by.originator': {
          title += `-${this.$t('view.process.table.caseTitle')}`;
          title += `(${this.$t('view.process.label.eo')}_${this.widgetTableOpion.selectedBy.originator})`;
          break;
        }
        default: {
          title += `-${this.$t('view.process.table.caseTitle')}`;
          break;
        }
      }

      // 기간
      title += `-${moment(this.filter.duration.start).format('YYYY-MM-DD')}_${moment(this.filter.duration.end).format('YYYY-MM-DD')}`;

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

  // request data 생성기
  tableRequestBuilder(pageNumber: number) {
    const data = {
      _type: 'EventRepositoryViewConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      sortBy: [] as any,
      page: pageNumber - 1,
      size: 100,
    } as any;

    // variantId 필터 추가
    if (this.variantId !== '---') {
      data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
    }

    // 추가 필터
    switch (this.name) {
      // kpi
      case 'overview.kpi.completion.rate': {
        data.maxCaseCompleted = data.eventFilters[0].maxStr;
        break;
      }
      case 'general.kpi.case.duration.over.ref.model': {
        data.eventFilters.push({
          _type: 'CaseDurationRefFilterLite',
          model: {
            id: this.eventView.referenceModel.id,
            project: {
              id: this.$route.params.projectId,
            },
            resourceGroup: {
              id: this.eventView.resourceGroup.id,
            },
          },
        });
        break;
      }
      case 'general.kpi.case.outlier': {
        data.eventFilters.push({
          _type: 'CaseDurationFilterLite',
          threshold: 0.9,
          invert: false,
        });
        break;
      }
      // chart
      case 'overview.chart.duration.by.case': {
        data.eventFilters.push({
          _type: 'DashboardWidgetFilterLite',
          widgetId: this.name,
          values: [this.tableFilter.value],
        });
        break;
      }
      case 'overview.chart.case.duration':
      case 'cost.chart.cases': {
        data.eventFilters = [
          {
            _type: 'CaseFilterLite',
            widgetId: this.name,
            values: this.table.map((item: any) => item.sname),
          },
        ];
        break;
      }
      case 'resource.chart.event.to.duration.ratio':
      case 'originator.chart.event.to.duration.ratio': {
        data._type = 'EventRepositoryAttributeViewConfiguration';
        data.classifier = this.name.startsWith('resource') ? 'er' : 'eo';
        data.constantFields = {
          xvalue: this.tableFilter.x,
          yvalue: this.tableFilter.y,
        };
        break;
      }
      case 'cost.chart.avg.by.resource':
      case 'cost.chart.avg.by.originator': {
        data.eventFilters.push({
          _type: 'AttributeFilterLite',
          attribute: this.name.endsWith('resource') ? 'er' : 'eo',
          values: [this.tableFilter.value],
        });
        break;
      }
    }
    // 정렬 필터 추가
    switch (this.name) {
      // kpi
      case 'overview.kpi.completion.rate': {
        data.sortBy.push({
          name: 'cl',
          dir: 'DESC',
        });
        data.sortBy.push({
          name: 'cdur',
          dir: 'DESC',
        });
        break;
      }
      // chart
      case 'resource.chart.event.to.duration.ratio':
      case 'originator.chart.event.to.duration.ratio': {
        data.sortBy.push({
          name: 'edur_avg',
          dir: 'DESC',
        });
        break;
      }
      case 'cost.chart.cases': {
        data.sortBy.push({
          name: 'cn',
          dir: 'DESC',
        });
        break;
      }
      case 'cost.chart.avg.by.resource':
      case 'cost.chart.avg.by.originator': {
        data.sortBy.push({
          name: 'en',
          dir: 'DESC',
        });
        break;
      }
      default: {
        data.sortBy.push({
          name: 'cdur',
          dir: 'DESC',
        });
        break;
      }
    }

    return [data];
  }

  detailTableRequestBuilder(pageNumber: number, type: 'case' | 'er' | 'eo', value: string | number) {
    const data = {
      _type: 'EventRepositoryViewConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      sortBy: [] as any,
      page: pageNumber - 1,
      size: 50,
    } as any;

    // 케이스, 리소스, 담당자 필터 추가
    switch (type) {
      case 'case': {
        data.eventFilters[0] = {
          _type: 'CaseFilterLite',
          values: [value],
        };
        break;
      }
      case 'er':
      case 'eo': {
        data.eventFilters.push({
          _type: 'AttributeFilterLite',
          attribute: type,
          values: [value],
        });
        break;
      }
    }

    return [data];
  }

  onClickTable() {
    this.showTable = !this.showTable;

    if (this.showTable === true) {
      this.getTable(1);
    }
  }

  resetTableFiler() {
    this.tableFilter = {
      value: '',
    };
    this.widgetTableOpion.selectedBy = null;
  }

  onInputPage(pageNumber: number) {
    this.getTable(pageNumber);
  }

  onDetailInputPage(pageNumber: number, type: 'case' | 'er' | 'eo', value: string | number) {
    this.getCaseTableView(pageNumber, type, value);
  }

  getTableTranslate(key: string, params?: any) {
    return this.$t(`view.process.table.${key}`, params).toString();
  }
}
