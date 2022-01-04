import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { IFilter, IKeyValueObject, ISetting } from '@/interface';

import { AxiosResponse } from 'axios';
import _ from 'lodash';
import moment, { Moment } from 'moment';

import { DatePicker } from 'v-calendar';
@Component({
  components: {
    DatePicker,
  },
  computed: mapGetters({
    filter: 'common/getFilter',
    eventView: 'repository/getRepoEventView',
    setting: 'sso/getSetting',
  }),
})
export default class FilterMixin extends Vue {
  readonly filter!: IFilter;
  readonly eventView!: IKeyValueObject;
  readonly setting!: ISetting;

  min: Date = null;
  max: Date = null;
  viewDate: string = '';

  lookup: IKeyValueObject = {};

  showLoading: boolean = false;

  showError: boolean = false;

  created() {
    this.min = moment(this.eventView.startTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.max = moment(this.eventView.completeTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
  }

  getDuration(): { start: Moment | Date; end: Moment | Date } {
    if (this.filter) {
      return this.filter.duration;
    } else {
      const min = moment(this.min);
      const max = moment(this.max);

      const period = this.setting.common.analysis.defaultAnalysisPeriod;
      let start;
      switch (period) {
        case 'all':
          start = _.cloneDeep(this.min);
          break;
        case 'month': {
          if (min.get('year') === max.get('year')) {
            if (min.get('month') === max.get('month')) {
              start = _.cloneDeep(this.min);
            } else {
              start = moment(this.max)
                .startOf(period)
                .toDate();
            }
          } else {
            start = moment(this.max)
              .startOf(period)
              .toDate();
          }
          break;
        }
        case 'year': {
          if (min.get(period) === max.get(period)) {
            start = _.cloneDeep(this.min);
          } else {
            start = moment(this.max)
              .startOf(period)
              .toDate();
          }
          break;
        }

        default:
          start = _.cloneDeep(this.min);
          break;
      }

      return {
        start: start,
        end: _.cloneDeep(this.max),
      };
    }
  }

  get repoMinMaxDate() {
    if (this.min && this.max) {
      const min = moment(this.min).format('YYYY-MM-DD');
      const max = moment(this.max).format('YYYY-MM-DD');
      return `${this.$t('view.process.filter.startDate')}: ${min}, ${this.$t('view.process.filter.endDate')}: ${max}`;
    } else {
      return '';
    }
  }

  setTokenValue(tokenInclude: string) {
    if (tokenInclude === '---') {
      return '---';
    } else if (tokenInclude === 'ea' || tokenInclude === 'eo') {
      this.lookup = {};
      this.getLookUp(tokenInclude);
      return '---';
    } else if (tokenInclude === 'ci') {
      return '';
    }
  }

  getLookUp(tokenInclude: string) {
    this.showLoading = true;
    const data = {
      _type: 'EventRepositoryLookupConfiguration',
      repository: utils.buildRepository(this),
      key: tokenInclude,
      value: tokenInclude,
    };
    this.$store.dispatch('common/getLookUp', [data]).then((res: AxiosResponse) => {
      this.lookup = res.data.data;
      this.showLoading = false;
    });
  }
}
