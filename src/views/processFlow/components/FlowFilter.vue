<template>
  <div class="filter-component">
    <div class="filter-content">
      <div class="content-header">
        <div class="title">{{ $t('view.process.filter.title.filterTitle') }}</div>
      </div>
      <div class="content-body">
        <div class="form-content">
          <b-form-group :label="$t('view.process.filter.title.duration')" :label-cols="3" :description="repoMinMaxDate">
            <DatePicker mode="range" title-position="center" :popover="{ placement: 'bottom-end', visibility: 'click' }" color="red" :min-date="min" :max-date="max" v-model="graphFilter.duration">
              <b-form-input type="text" id="basicSelect" class="filter-date" v-model="viewDate" :placeholder="$t('view.process.filter.selectDuration')" desc="기간을 선택해주세요" :state="showError ? false : null" @focus="showError = false" maxLength="255" readonly></b-form-input>
            </DatePicker>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.variantType')" :label-cols="3">
            <b-form-select v-model="graphFilter.variantType">
              <b-form-select-option value="STANDARD">{{ $t('view.process.filter.value.STANDARD') }}</b-form-select-option>
              <b-form-select-option value="ES_MONTHLY">{{ $t('view.process.filter.value.ES_MONTHLY') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.legend')" :label-cols="3">
            <b-form-select v-model="graphFilter.barSeries">
              <b-form-select-option v-for="v in colEventActivityOptions" :key="v.value" :value="v.value">{{ $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.sortBy')" :label-cols="3">
            <b-form-select v-model="graphFilter.sortBy">
              <b-form-select-option v-for="v in optionSortBy" :key="v.value" :value="v.value">{{ $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <b-btn-group>
          <b-button variant="primary" @click="getVariant()">{{ $t('view.process.button.getVariant') }}</b-button>
        </b-btn-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { IClientState, IFilter } from '@/interface';

import { FilterMixin } from '@/mixin';

import moment from 'moment';

@Component({})
export default class FlowFilter extends Mixins(FilterMixin) {
  graphFilter: IFilter = {
    duration: {
      start: null,
      end: null,
    },
    variantType: 'STANDARD',
    barSeries: 'ea', //'eo', 'er'
    sortBy: 'ccnt',
    sortDirection: 'DESC',
  };

  optionSortBy = [
    { value: 'ccnt', text: '케이스 수' },
    { value: 'vs', text: '시작시간' },
    { value: 'vc', text: '완료시간' },
    { value: 'aduravgASC', text: '짧은 기간' },
    { value: 'aduravgDESC', text: '긴 기간' },
  ];

  showError: boolean = false;

  @Watch('graphFilter.duration', { immediate: true, deep: true })
  onDurationChange(newVal: any): void {
    if (newVal.start !== '' || newVal.end !== '') {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.viewDate = start + ' ~ ' + end;
    }
  }

  @Watch('graphFilter.sortBy', { immediate: true, deep: true })
  onChangeFilter(data: string) {
    switch (data) {
      case 'vs':
      case 'vc':
      case 'aduravgASC': {
        this.graphFilter.sortDirection = 'ASC';
        break;
      }
      case 'ccnt':
      case 'aduravgDESC': {
        this.graphFilter.sortDirection = 'DESC';
        break;
      }
    }
  }

  created() {
    this.initFilter();
  }

  mounted() {
    if (this.$route.query.from === 'tracevariant-duration') {
      this.graphFilter.barSeries = 'ea';
      this.graphFilter.sortBy = 'aduravgDESC';
      this.graphFilter.sortDirection = 'DESC';
      this.getVariant();
    }
  }

  initFilter() {
    const duration = this.getDuration();

    this.graphFilter = {
      duration: {
        start: duration.start,
        end: duration.end,
      },
      variantType: this.setting.gantt.variantType,
      barSeries: this.setting.gantt.barSeries,
      sortBy: this.setting.gantt.sortBy,
    };

    this.$store.commit('common/setFilter', {
      duration: {
        start: this.graphFilter.duration.start,
        end: this.graphFilter.duration.end,
      },
    });
  }

  getVariant() {
    if (!this.viewDate) {
      this.showError = true;
      return;
    }

    this.$store.commit('common/setFilter', {
      duration: this.graphFilter.duration,
      variantType: this.graphFilter.variantType,
      barSeries: this.graphFilter.barSeries,
      sortBy: this.graphFilter.sortBy == 'aduravgASC' || this.graphFilter.sortBy == 'aduravgDESC' ? 'aduravg' : this.graphFilter.sortBy,
      sortingBy: this.graphFilter.sortBy,
      sortDirection: this.graphFilter.sortDirection,
    });

    this.$emit('getVariant');
  }

  updateRoute() {
    this.min = moment(this.eventView.startTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.max = moment(this.eventView.completeTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();

    this.initFilter();
  }

  initByClientState(clientState: IClientState) {
    this.graphFilter = {
      duration: {
        start: moment(clientState.processFlow.filter.duration.start).toDate(),
        end: moment(clientState.processFlow.filter.duration.end).toDate(),
      },
      variantType: clientState.processFlow.filter.varintType,
      barSeries: clientState.processFlow.filter.barSeries,
      sortBy: clientState.processFlow.filter.sortBy === 'aduravg' ? `${clientState.processFlow.filter.sortBy}${clientState.processFlow.filter.sortDirection}` : clientState.processFlow.filter.sortBy,
      sortDirection: clientState.processFlow.filter.sortDirection,
    };

    this.$store.commit('common/setFilter', {
      duration: this.graphFilter.duration,
      variantType: this.graphFilter.variantType,
      barSeries: this.graphFilter.barSeries,
      sortBy: this.graphFilter.sortBy == 'aduravgASC' || this.graphFilter.sortBy == 'aduravgDESC' ? 'aduravg' : this.graphFilter.sortBy,
      sortDirection: this.graphFilter.sortDirection,
    });
  }

  get colEventActivityOptions() {
    const colEventActivityOptions = [{ value: 'ea', text: '액티비티' }];
    // for (const [key, value] of Object.entries(this.eventView.fields)) {
    //   if (key !== 'eo' && key !== 'er') {
    //     continue;
    //   } else {
    //     colEventActivityOptions.push({ value: key, text: key === 'eo' ? '담당자' : '리소스' });
    //   }
    // }
    return colEventActivityOptions;
  }
}
</script>
