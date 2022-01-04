<template>
  <div class="filter-component">
    <div clas="filter-content">
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
          <b-form-group :label="$t('view.process.filter.title.nodeText')" :label-cols="3">
            <b-form-select v-model="graphFilter.nodeText">
              <b-form-select-option value="statistics.count">{{ $t('view.process.filter.value.statistics.count') }}</b-form-select-option>
              <b-form-select-option value="statistics.total">{{ $t('view.process.filter.value.statistics.total') }}</b-form-select-option>
              <b-form-select-option value="statistics.min">{{ $t('view.process.filter.value.statistics.min') }}</b-form-select-option>
              <b-form-select-option value="statistics.max">{{ $t('view.process.filter.value.statistics.max') }}</b-form-select-option>
              <b-form-select-option value="statistics.average">{{ $t('view.process.filter.value.statistics.average') }}</b-form-select-option>
              <b-form-select-option value="statistics.q2">{{ $t('view.process.filter.value.statistics.q2') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.arcText')" :label-cols="3">
            <b-form-select v-model="graphFilter.arcText">
              <b-form-select-option value="d">{{ $t('view.process.filter.value.d') }}</b-form-select-option>
              <b-form-select-option value="statistics.count">{{ $t('view.process.filter.value.statistics.count') }}</b-form-select-option>
              <b-form-select-option value="statistics.total">{{ $t('view.process.filter.value.statistics.total') }}</b-form-select-option>
              <b-form-select-option value="statistics.min">{{ $t('view.process.filter.value.statistics.min') }}</b-form-select-option>
              <b-form-select-option value="statistics.max">{{ $t('view.process.filter.value.statistics.max') }}</b-form-select-option>
              <b-form-select-option value="statistics.average">{{ $t('view.process.filter.value.statistics.average') }}</b-form-select-option>
              <b-form-select-option value="statistics.q2">{{ $t('view.process.filter.value.statistics.q2') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.viewMode')" :label-cols="3">
            <b-form-select v-model="graphFilter.viewMode">
              <b-form-select-option value="merged">{{ $t('view.process.filter.value.merged') }}</b-form-select-option>
              <b-form-select-option value="twoView">{{ $t('view.process.filter.value.twoView') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <b-btn-group>
          <b-button variant="primary" @click="onClickGetVariant()">{{ $t('view.process.button.getVariant') }}</b-button>
        </b-btn-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { EventBus } from '@/common';
import { IClientState, IFilter } from '@/interface';

import { FilterMixin } from '@/mixin';

import _ from 'lodash';
import moment from 'moment';

@Component({})
export default class ProcessFilter extends Mixins(FilterMixin) {
  graphFilter: IFilter = {
    duration: {
      start: null,
      end: null,
    },
    variantType: 'STANDARD',
    nodeText: 'statistics.count',
    arcText: 'statistics.count',
    algorithm: 'fhm',
    viewMode: 'merged',
  };

  @Watch('graphFilter.duration', { immediate: true, deep: true })
  onDurationChange(newVal: any): void {
    if (newVal.start !== '' || newVal.end !== '') {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.viewDate = start + ' ~ ' + end;
    }
  }

  created() {
    this.initFilter();
  }

  initFilter() {
    const duration = this.getDuration();
    type viewMode = 'merged' | 'twoView';

    // 설정 세팅으로 초기화
    this.graphFilter = {
      duration: {
        start: duration.start,
        end: duration.end,
      },
      variantType: this.setting.common.analysis.variantType,
      nodeText: this.setting.delta.nodeText,
      arcText: this.setting.delta.arcText,
      dep: this.setting.model.dep.complex,
      freq: this.setting.model.freq.complex,
      viewMode: this.setting.delta.viewMode as viewMode,
    };

    this.$store.commit('common/setFilter', {
      duration: {
        start: this.graphFilter.duration.start,
        end: this.graphFilter.duration.end,
      },
    });
  }

  updateRoute() {
    this.min = moment(this.eventView.startTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.max = moment(this.eventView.completeTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();

    this.initFilter();
  }

  onClickGetVariant() {
    if (!this.viewDate) {
      this.showError = true;
      return;
    }

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('changeModelFilter');

    this.$emit('getVariant');
  }

  initByClientState(clientState: IClientState) {
    this.graphFilter = {
      duration: {
        start: moment(clientState.deltaAnalysis.filter.duration.start).toDate(),
        end: moment(clientState.deltaAnalysis.filter.duration.end).toDate(),
      },
      variantType: clientState.deltaAnalysis.filter.varintType,
      nodeText: clientState.deltaAnalysis.filter.nodeText,
      arcText: clientState.deltaAnalysis.filter.arcText,
      dep: clientState.deltaAnalysis.filter.dep,
      freq: clientState.deltaAnalysis.filter.freq,
      viewMode: clientState.deltaAnalysis.filter.viewMode,
    };

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('changeModelFilter');
  }
}
</script>
