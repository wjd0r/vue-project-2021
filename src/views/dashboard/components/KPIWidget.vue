<template>
  <div class="card kpi editor" :class="variation().color">
    <!--blue / red-->
    <div class="content-header">
      <div class="title">{{ title }}</div>
      <div class="right-align">
        <slot name="right-align">
          <b-button v-if="isEditor" @click="onClickDeleteWidget()" class="btn-clear">
            <div class="ico-header ico-clear"></div>
          </b-button>
          <template v-else-if="!isEditor && !notHaveField && !notHavePM && !isNoData && !showLoading">
            <div v-if="haveTable" @click="onClickTable" class="ico-header ico-table"></div>
          </template>
        </slot>
      </div>
    </div>
    <b-overlay :show="notHaveField || notHavePM || isNoData || showLoading" bg-color="#fff" opacity="1" class="content-body overlay-dashboard-widget">
      <div v-if="variation().color !== ''" class="ico-arrow-dashboard" :class="`ico-arrow-${variation().color} trans-${variation().directive} `" alt="방향 화살표 아이콘 - 빨강"></div>
      <h2 class="content-text" :class="{ 'long-value': widget && widget.kpiFormat === 'custom' }" v-html="!isEditor ? getValue() : getValueForDashboardEditor()"></h2>
      <template v-if="!isEditor">
        <widget-table v-if="haveTable" ref="widgetTable" v-model="showTable" :option="widgetTableOpion" :tableLoading.sync="tableLoading" @getCaseTableView="getCaseTableView" @onInputPage="onInputPage" @onDetailInputPage="onDetailInputPage" @downloadCSV="downloadCSV"></widget-table>
      </template>
      <template #overlay>
        <div v-if="notHaveField || isNoData" class="nodata-text w-100">{{ $t('view.process.alert.Nodata') }}</div>
        <div v-else-if="notHavePM" class="nodata-text w-100">{{ $t('view.dashboard.alert.noProcess') }}</div>
        <b-spinner v-else label="Spinning"></b-spinner>
      </template>
    </b-overlay>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';

import { UtilsMixin, WidgetMixin, WidgetTableMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

import { IKeyValueObject, IWidgetDataConfiguration, IWidgetTableOption } from '@/interface';
import { AxiosResponse } from 'axios';

import WidgetTable from './WidgetTable.vue';

@Component({
  components: {
    WidgetTable,
  },
  computed: mapGetters({
    variantId: 'common/getVariantId',
  }),
})
export default class KPIWidget extends Mixins(WidgetMixin, UtilsMixin, WidgetTableMixin) {
  /* Prop 선언 */
  @Prop({
    default: () => {
      return {
        id: 'kpi-0-activities',
        name: 'dashboard.activity.count',
        value: '0',
        valueFormat: 'number',
      };
    },
  })
  kpi?: {
    id: string;
    name: string;
    value: string | number;
    valueFormat: string;
    prevValue?: string | number;
    dataParams?: IKeyValueObject;
  };

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */

  data: IWidgetDataConfiguration = {
    _type: 'StatisticsWidgetLiteImpl',
    id: this.kpi.name,
    widgetType: 'KPI',
    dataParams: {},
  };

  result: {
    [key: string]: {
      _type: 'SimpleKpi';
      id: string;
      name: string;
      prevValue: string | number;
      nextValue: string | number;
      value: string | number;
      valueFormat: string;
    };
  } = {
    kpi: {
      _type: 'SimpleKpi',
      id: '',
      name: '',
      prevValue: null,
      nextValue: null,
      value: null,
      valueFormat: 'number',
    },
  };

  isNoData: boolean = false;
  showLoading: boolean = false;

  widgetTableOpion: IWidgetTableOption = {
    widgetName: this.kpi.name,
    title: this.title,
    detail: false,
    custom: false,
  };

  /* refs 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  created() {
    if (!_.isEmpty(this.widget)) {
      this.data.id = this.widget.templateId;
      this.name = this.widget.templateId;
      this.data.dataParams = this.widget.dataParams;
    } else {
      this.data.id = this.kpi.name;
      this.name = this.kpi.name;
      this.data.dataParams = this.kpi.dataParams;
    }
    this.widgetTableOpion.widgetName = this.name;

    if (!this.isEditor) {
      let field: boolean = true;

      if (this.name.startsWith('resource')) {
        field = this.isFieldExist('er');
      } else if (this.name.startsWith('originator')) {
        field = this.isFieldExist('eo');
      } else if (this.name.startsWith('cost')) {
        field = this.isFieldExist('en') || this.isFieldExist('cn');
      }

      this.notHaveField = !field;

      // 표준 프로세스가 필요한 KPI 체크 (케이스 완료율, 표준 소요시간 초과 케이스)
      if (this.name === 'overview.kpi.completion.rate' || this.name === 'general.kpi.case.duration.over.ref.model') {
        this.notHavePM = !this.haveReferenceModel(this.eventView);
      }
    }
  }

  /* 메소드 선언 */

  getWidgetData() {
    if (this.notHaveField || this.notHavePM) {
      return;
    }

    this.isNoData = false;
    this.showLoading = true;

    // TODO: kpi 마다 dataParams 확인 필요, 기준이 달라짐
    this.$store.dispatch('dashboard/getWidgetData', this.widgetConfigBuilder('data')).then((res: AxiosResponse) => {
      this.setKPIValue(res);
    });
  }

  getByDataUri(dataUri: string) {
    if (this.notHaveField || this.notHavePM) {
      return;
    }

    this.isNoData = false;
    this.showLoading = true;

    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.setKPIValue(res);
    });
  }

  setKPIValue(res: AxiosResponse) {
    const data = res.data.data;
    if (data === null || data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    if (!this.isNoData) {
      this.result = _.cloneDeep(data.data);
    }

    this.showLoading = false;
  }

  get title() {
    const { kpi, widget } = this;
    if (_.isEmpty(this.widget)) {
      return this.$te(`view.dashboard.${kpi.name}.title`) ? this.$t(`view.dashboard.${kpi.name}.title`) : this.$te('view.dashboard.' + kpi.name) ? this.$t('view.dashboard.' + kpi.name) : kpi.name;
    } else {
      if (this.widget.widgetTitle && this.widget.widgetTitle !== '') {
        return widget.widgetTitle;
      } else {
        return this.$te(`view.dashboard.${widget.templateId}.title`) ? this.$t(`view.dashboard.${widget.templateId}.title`) : this.$te('view.dashboard.' + widget.templateId) ? this.$t('view.dashboard.' + widget.templateId) : widget.templateId;
      }
    }
  }

  variation() {
    if (this.isEditor) {
      return {
        color: '',
        directive: '',
      };
    }
    const format = _.isEmpty(this.widget) ? this.kpi.valueFormat : this.widget.kpiFormat;
    let currValue = this.result[this.data.id]?.value;
    let prevValue = this.result[this.data.id]?.prevValue;
    let nextValue = this.result[this.data.id]?.nextValue;

    // 이번달 완료율일 경우 up, down 없음
    if (this.data.id === 'overview.kpi.completion.rate') {
      prevValue = null;
    }

    if ((format !== 'number' && format !== 'percentage') || _.isEmpty(currValue) || (!_.isEmpty(currValue) && _.isEmpty(prevValue))) {
      return {
        color: '',
        directive: '',
      };
    } else {
      currValue = Number(currValue);
      prevValue = Number(prevValue);
      nextValue = Number(nextValue);
      if (currValue >= prevValue) {
        return {
          color: nextValue == 1 ? 'blue' : 'red',
          directive: 'up',
        };
      } else if (currValue < prevValue) {
        return {
          color: nextValue == 1 ? 'red' : 'blue',
          directive: 'down',
        };
      } else {
        return {
          color: '',
          directive: '',
        };
      }
    }
  }

  getValue() {
    if (this.notHaveField || this.notHavePM) {
      return '';
    }

    const format = _.isEmpty(this.widget) ? this.kpi.valueFormat : this.widget.kpiFormat;
    switch (format) {
      case 'string': {
        const value = this.result[this.data.id]?.value;
        if (!_.isEmpty(value)) {
          return value;
        } else {
          return '-';
        }
      }
      case 'number': {
        const value = this.result[this.data.id]?.value;
        if (!_.isEmpty(value)) {
          return utils.numberWithCommas(Number(value).toFixed(0));
        } else {
          return 0;
        }
      }
      case 'percentage': {
        const value = this.result[this.data.id]?.value;
        if (!_.isEmpty(value)) {
          return `${utils.numberWithCommas(Number(value).toFixed(2))}%`;
        } else {
          return 0;
        }
      }
      case 'duration': {
        const value = this.result[this.data.id]?.value;
        if (!_.isEmpty(value)) {
          return moment(value, 'X').format('nY mM dD HH:mm:ss');
        } else {
          return '-';
        }
      }
      case 'custom': {
        if (this.widget.templateId === 'general.kpi.case.duration.over.ref.model') {
          const count = this.result['general.kpi.case.duration.over.ref.model.case']?.value;
          const percentage = this.result['general.kpi.case.duration.over.ref.model']?.value;
          const duration = this.result['general.kpi.case.duration.over.ref.model.standard']?.value;
          return this.$t(`view.dashboard.${this.widget.templateId}.value`, { count: count ? this.numberWithCommas(count) : '-', percentage: percentage ? Number(percentage).toFixed(2) + '%' : '-', duration: duration ? this.toDDHHMMSS(duration, this.$t('view.process.table.dayUnit').toString()) : '-' });
        } else if (this.widget.templateId === 'general.kpi.case.outlier') {
          // const value = this.result['general.kpi.case.outlier']?.value;
          const threshold = this.result['general.kpi.case.outlier.threshold']?.value;
          const count = this.result['general.kpi.case.outlier']?.value;

          return this.$t(`view.dashboard.${this.widget.templateId}.value`, { count: count ? this.numberWithCommas(count) : '-', threshold: threshold ? this.toDDHHMMSS(threshold, this.$t('view.process.table.dayUnit').toString()) : '-' });
        } else {
          return '';
        }
      }
      default: {
        return '';
      }
    }
  }

  getValueForDashboardEditor() {
    const format = this.widget.kpiFormat;
    switch (format) {
      case 'string': {
        return '-';
      }
      case 'number': {
        return 0;
      }
      case 'percentage': {
        return '0%';
      }
      case 'duration': {
        return '-';
      }
      case 'custom': {
        if (this.widget.templateId === 'general.kpi.case.duration.over.ref.model') {
          return this.$t(`view.dashboard.${this.widget.templateId}.value`, { count: 100, percentage: '30%', duration: this.toDDHHMMSS(2, this.$t('view.process.table.dayUnit').toString()) });
        } else if (this.widget.templateId === 'general.kpi.case.outlier') {
          return this.$t(`view.dashboard.${this.widget.templateId}.value`, { count: 10, threshold: this.toDDHHMMSS(9, this.$t('view.process.table.dayUnit').toString()) });
        } else {
          return '';
        }
      }
      default: {
        return '';
      }
    }
  }

  get haveTable() {
    switch (this.name) {
      case 'overview.kpi.completion.rate': // 이번 달 완료율
      case 'general.kpi.case.duration.over.ref.model': // 표준 소요시간 초과 케이스
      case 'general.kpi.case.outlier': /* 소요시간 상위 10% 케이스 */ {
        return true;
      }
      default: {
        return false;
      }
    }
  }

  onClickDeleteWidget() {
    EventBus.$emit('onClickDeleteWidget', this.widget.i);
  }
}
</script> 