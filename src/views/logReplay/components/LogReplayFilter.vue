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
              <b-form-select-option value="bottlenecks">{{ $t('view.process.filter.value.bottlenecks') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.tokenInclude')" :label-cols="3">
            <b-form-select v-model="graphFilter.tokenInclude" @change="onChangeTokenInclude">
              <b-form-select-option value="---">{{ $t('view.process.filter.value.all') }}</b-form-select-option>
              <b-form-select-option value="ea">{{ $t('view.process.filter.value.ea') }}</b-form-select-option>
              <b-form-select-option v-if="eventView.fields.eo !== undefined" value="eo">{{ $t('view.process.filter.value.eo') }}</b-form-select-option>
              <b-form-select-option value="ci">{{ $t('view.process.filter.value.caseId') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.tokenValue')" :label-cols="3" :invalid-feedback="tokenValueState.feedback">
            <template v-if="graphFilter.tokenInclude === '---'">
              <b-form-input type="text" :value="$t('view.process.filter.value.select')" disabled />
            </template>
            <template v-else-if="graphFilter.tokenInclude === 'ea' || graphFilter.tokenInclude === 'eo'">
              <b-overlay :show="showLoading">
                <b-form-select v-model="graphFilter.tokenValue" :select-size="5" id="token-value" :state="tokenValueState.state">
                  <b-form-select-option v-show="false" value="---">{{ $t('view.process.filter.value.select') }}</b-form-select-option>
                  <b-form-select-option v-for="(v, k) in lookup" :key="k" :value="v">{{ v }}</b-form-select-option>
                </b-form-select>
              </b-overlay>
            </template>
            <template v-else>
              <b-form-input type="text" :value="graphFilter.tokenValue" @input.native="graphFilter.tokenValue = $event.target.value" :state="tokenValueState.state" @focus="showTokenValueError = false" maxLength="255" />
            </template>
          </b-form-group>
        </div>

        <div class="content-footer">
          <div v-show="showTokenValueError" class="notice-text red-text">{{ $t('view.process.alert.needTokenValue') }}</div>
          <b-button variant="primary" class="btn-apply" @click="onClickGetVariant()">{{ $t('view.process.button.getVariant') }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { EventBus, ValidationCheck } from '@/common';
import { IClientState, IFilter } from '@/interface';

import { FilterMixin } from '@/mixin';

import _ from 'lodash';
import moment from 'moment';

@Component({})
export default class LogReplayFilter extends Mixins(FilterMixin) {
  graphFilter: IFilter = {
    duration: {
      start: null,
      end: null,
    },
    variantType: 'STANDARD',
    algorithm: 'fhm',
    nodeText: 'statistics.count',
    arcText: 'bottlenecks',
    tokenInclude: '---',
    tokenValue: '---',
  };

  showTokenValueError: boolean = false;

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

  mounted() {
    if (this.$route.query.from === 'bottleneck-statistics') {
      this.graphFilter.arcText = 'bottlenecks';
      this.onClickGetVariant();
    }
  }

  initFilter() {
    const duration = this.getDuration();

    // 설정 세팅으로 초기화
    this.graphFilter = {
      duration: {
        start: duration.start,
        end: duration.end,
      },
      variantType: this.setting.common.analysis.variantType,
      nodeText: this.setting.animation.nodeText,
      arcText: this.setting.animation.arcText,
      tokenInclude: '---',
      tokenValue: '---',
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

    if (this.graphFilter.tokenInclude != '---' && ((this.graphFilter.tokenInclude === 'ci' && this.graphFilter.tokenValue === '') || (this.graphFilter.tokenInclude !== 'ci' && this.graphFilter.tokenValue === '---'))) {
      this.showTokenValueError = true;
      return;
    }

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('changeModelFilter');

    this.$emit('getVariant');
  }

  onChangeTokenInclude() {
    this.showTokenValueError = false;
    this.graphFilter.tokenValue = this.setTokenValue(this.graphFilter.tokenInclude);
  }

  initByClientState(clientState: IClientState) {
    this.graphFilter = {
      duration: {
        start: moment(clientState.logReplay.filter.duration.start).toDate(),
        end: moment(clientState.logReplay.filter.duration.end).toDate(),
      },
      variantType: clientState.logReplay.filter.varintType,
      nodeText: clientState.logReplay.filter.nodeText,
      arcText: clientState.logReplay.filter.arcText,
      tokenInclude: clientState.logReplay.filter.tokenInclude,
      tokenValue: clientState.logReplay.filter.tokenValue,
    };

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('changeModelFilter');
  }

  get tokenValueState() {
    if (this.graphFilter.tokenInclude === '---' || (this.graphFilter.tokenInclude !== '---' && this.showLoading)) {
      return {
        state: null,
        feedback: '',
      };
    } else {
      if (this.graphFilter.tokenInclude === 'ci') {
        return ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.graphFilter.tokenValue);
      } else {
        if (this.graphFilter.tokenValue === '---') {
          return {
            state: false,
            feedback: '',
          };
        } else {
          return {
            state: true,
            feedback: '',
          };
        }
      }
    }
  }
}
</script>
