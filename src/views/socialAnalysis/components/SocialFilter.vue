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

          <b-form-group :label="$t('view.process.filter.title.layout')" :label-cols="3">
            <b-form-select v-model="graphFilter.layout">
              <b-form-select-option value="d3-force">{{ $t('view.process.filter.value.d3Force') }}</b-form-select-option>
              <b-form-select-option value="circle">{{ $t('view.process.filter.value.circle') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group :label="$t('view.process.filter.title.colEventActivity')" :label-cols="3">
            <b-form-select v-model="graphFilter.colEventActivity">
              <b-form-select-option v-for="v in colEventActivityOptions" :key="v.value" :value="v.value">{{ $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
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
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { EventBus } from '@/common';
import { IClientState, IFilter } from '@/interface';

import { FilterMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

@Component({})
export default class SocialFilter extends Mixins(FilterMixin) {
  graphFilter: IFilter = {
    duration: {
      start: null,
      end: null,
    },
    variantType: 'STANDARD',
    layout: 'd3-force',
    colEventActivity: 'ea', //'er',
    nodeText: 'f',
    arcText: 'd',
    rank: 'snwdc',
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
    type layout = 'd3-force' | 'circle';

    // 설정 세팅으로 초기화
    this.graphFilter = {
      duration: {
        start: duration.start,
        end: duration.end,
      },
      variantType: this.setting.common.analysis.variantType,
      layout: this.setting.social.layout as layout,
      colEventActivity: this.setting.social.colEventActivity,
      nodeText: 'f',
      arcText: 'd',
      rank: 'snwdc',
    };

    this.$store.commit('common/setFilter', {
      duration: {
        start: this.graphFilter.duration.start,
        end: this.graphFilter.duration.end,
      },
    });
  }

  onClickGetVariant() {
    if (!this.viewDate) {
      this.showError = true;
      return;
    }

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('setGraphOption', {
      layout: this.graphFilter.layout,
      nodeText: this.graphFilter.nodeText,
      arcText: this.graphFilter.arcText,
      rank: this.graphFilter.rank,
      colEventActivity: this.graphFilter.colEventActivity,
    });

    this.$emit('setBadges', { baseByData: this.filter.colEventActivity });

    this.$emit('getVariant');
  }

  updateRoute() {
    this.min = moment(this.eventView.startTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.max = moment(this.eventView.completeTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();

    this.initFilter();
  }

  initByClientState(clientState: IClientState) {
    type layout = 'd3-force' | 'circle';
    this.graphFilter = {
      duration: {
        start: moment(clientState.socialAnalysis.filter.duration.start).toDate(),
        end: moment(clientState.socialAnalysis.filter.duration.end).toDate(),
      },
      variantType: clientState.socialAnalysis.filter.varintType,
      layout: clientState.socialAnalysis.filter.layout as layout,
      colEventActivity: clientState.socialAnalysis.filter.colEventActivity,
      nodeText: clientState.socialAnalysis.filter.nodeText,
      arcText: clientState.socialAnalysis.filter.arcText,
      rank: clientState.socialAnalysis.filter.rank,
    };

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('setGraphOption', {
      layout: this.graphFilter.layout,
      nodeText: this.graphFilter.nodeText,
      arcText: this.graphFilter.arcText,
      rank: this.graphFilter.rank,
      colEventActivity: this.graphFilter.colEventActivity,
    });

    this.$emit('setBadges', { baseByData: this.filter.colEventActivity });
  }

  get colEventActivityOptions() {
    const colEventActivityOptions = [{ value: 'ea', text: '액티비티' }];
    for (const [key, value] of Object.entries(this.eventView.fields)) {
      if (key !== 'eo' && key !== 'er') {
        continue;
      } else {
        colEventActivityOptions.push({ value: key, text: key === 'eo' ? '담당자' : '리소스' });
      }
    }
    return colEventActivityOptions;
  }
}
</script>
