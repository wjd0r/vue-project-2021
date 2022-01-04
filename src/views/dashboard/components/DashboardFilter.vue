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
          <!-- TODO: disabled-dates 추가해야함 -->
          <!-- <b-form-group :label="'비교 기간'" :label-cols="3">
            <DatePicker mode="range" title-position="center" :popover="{ placement: 'bottom-end', visibility: 'click' }" color="red" :min-date="min" :max-date="max" v-model="graphFilter.comparedDuration">
              <b-form-input type="text" v-model="comparedViewDate" :placeholder="$t('view.process.filter.selectDuration')" desc="기간을 선택해주세요" :state="showError ? false : null" @focus="showError = false"></b-form-input>
            </DatePicker>
          </b-form-group> -->
          <!--<b-form-group label="분석 항목" :label-cols="3">
            <b-form-select v-model="graphFilter.variantType">
              <b-form-select-option value="STANDARD">흐름 분석</b-form-select-option>
              <b-form-select-option value="ES_MONTHLY">월간 분석</b-form-select-option>
            </b-form-select>
          </b-form-group>-->
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
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';
import { IClientState, IFilter } from '@/interface';

import { FilterMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

import { DatePicker } from 'v-calendar';

@Component({
  components: {
    DatePicker,
  },
  computed: mapGetters({
    eventView: 'repository/getRepoEventView',
    filter: 'common/getFilter',
  }),
})
export default class DashboardFilter extends Mixins(FilterMixin) {
  graphFilter: IFilter = {
    duration: {
      start: null,
      end: null,
    },
    comparedDuration: {
      start: new Date(),
      end: new Date(),
    },
    variantType: 'STANDARD',
  };

  comparedViewDate: string = '';

  @Watch('graphFilter.duration', { immediate: true, deep: true })
  onDurationChange(newVal: any): void {
    if (!_.isEmpty(newVal) && (newVal.start !== '' || newVal.end !== '')) {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.viewDate = start + ' ~ ' + end;
    }
  }

  @Watch('graphFilter.comparedDuration', { immediate: true, deep: true })
  onComparedDurationChange(newVal: any): void {
    if (!_.isEmpty(newVal) && (newVal.start !== '' || newVal.end !== '')) {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.comparedViewDate = start + ' ~ ' + end;
    }
  }

  created() {
    this.initFilter();
  }

  initFilter() {
    const duration = this.getDuration();

    this.graphFilter = {
      duration: {
        start: duration.start,
        end: duration.end
      },
      variantType: this.setting.common.analysis.variantType,
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

    this.$store.commit('common/setFilter', this.graphFilter);
    EventBus.$emit('resetData');

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
        start: moment(clientState.dashboard.filter.duration.start).toDate(),
        end: moment(clientState.dashboard.filter.duration.end).toDate(),
      },
      variantType: clientState.dashboard.filter.varintType,
    };

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));
    EventBus.$emit('resetData');
  }
}
</script>
