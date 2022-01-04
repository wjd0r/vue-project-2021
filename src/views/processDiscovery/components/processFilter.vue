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
          <b-form-group :label="$t('view.process.filter.title.algorithm')" :label-cols="3">
            <b-form-select v-model="graphFilter.algorithm" @change="onChangeAlgorithm">
              <b-form-select-option value="fhm">{{ $t('view.process.filter.value.fhm') }}</b-form-select-option>
              <b-form-select-option value="fuzzy">{{ $t('view.process.filter.value.fuzzy') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.nodeText')" :label-cols="3">
            <b-form-select v-model="graphFilter.nodeText" @change="onChangeNodeText">
              <b-form-select-option value="statistics.count">{{ $t('view.process.filter.value.statistics.count') }}</b-form-select-option>
              <b-form-select-option value="statistics.total">{{ $t('view.process.filter.value.statistics.total') }}</b-form-select-option>
              <b-form-select-option value="statistics.min">{{ $t('view.process.filter.value.statistics.min') }}</b-form-select-option>
              <b-form-select-option value="statistics.max">{{ $t('view.process.filter.value.statistics.max') }}</b-form-select-option>
              <b-form-select-option value="statistics.average">{{ $t('view.process.filter.value.statistics.average') }}</b-form-select-option>
              <b-form-select-option value="statistics.q2">{{ $t('view.process.filter.value.statistics.q2') }}</b-form-select-option>
              <b-form-select-option v-show="graphFilter.algorithm === 'fhm'" value="reworks.total">{{ $t('view.process.filter.value.reworks.total') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.arcText')" :label-cols="3">
            <b-form-select v-model="graphFilter.arcText" @change="onChangeArcText">
              <b-form-select-option value="d">{{ $t('view.process.filter.value.d') }}</b-form-select-option>
              <b-form-select-option value="statistics.count">{{ $t('view.process.filter.value.statistics.count') }}</b-form-select-option>
              <b-form-select-option value="statistics.total">{{ $t('view.process.filter.value.statistics.total') }}</b-form-select-option>
              <b-form-select-option value="statistics.min">{{ $t('view.process.filter.value.statistics.min') }}</b-form-select-option>
              <b-form-select-option value="statistics.max">{{ $t('view.process.filter.value.statistics.max') }}</b-form-select-option>
              <b-form-select-option value="statistics.average">{{ $t('view.process.filter.value.statistics.average') }}</b-form-select-option>
              <b-form-select-option value="statistics.q2">{{ $t('view.process.filter.value.statistics.q2') }}</b-form-select-option>
              <b-form-select-option v-show="graphFilter.algorithm === 'fhm'" value="bottlenecks">{{ $t('view.process.filter.value.bottlenecks') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.tokenInclude')" :label-cols="3">
            <b-form-select v-model="graphFilter.tokenInclude" @change="onChangeTokenInclude">
              <b-form-select-option value="---">{{ $t('view.process.filter.value.all') }}</b-form-select-option>
              <!-- <b-form-select-option value="ea">{{ $t('view.process.filter.value.ea') }}</b-form-select-option> -->
              <!-- <b-form-select-option v-if="eventView.fields.eo !== undefined" value="eo">{{ $t('view.process.filter.value.eo') }}</b-form-select-option> -->
              <b-form-select-option value="ci">{{ $t('view.process.filter.value.caseId') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.tokenValue')" :label-cols="3" :invalid-feedback="tokenValueState.feedback">
            <template v-if="graphFilter.tokenInclude === '---'">
              <b-form-input type="text" :value="$t('view.process.filter.value.select')" disabled />
            </template>
            <!-- <template v-else-if="graphFilter.tokenInclude === 'ea' || graphFilter.tokenInclude === 'eo'"></template>
              <b-overlay :show="showLoading">
                <b-form-select v-model="graphFilter.tokenValue" :select-size="5" id="token-value" :state="graphFilter.tokenValue === '' ? false : null">
                  <b-form-select-option v-show="false" value="---">{{ $t('view.process.filter.value.select') }}</b-form-select-option>
                  <b-form-select-option v-for="(v, k) in lookup" :key="k" :value="v">{{ v }}</b-form-select-option>
                </b-form-select>
              </b-overlay>
            </template> -->
            <template v-else>
              <b-form-input type="text" :value="graphFilter.tokenValue" @input.native="graphFilter.tokenValue = $event.target.value" :state="tokenValueState.state" @focus="showTokenValueError = false" maxLength="255" />
            </template>
          </b-form-group>

          <b-form-group v-if="eventView.referenceModel !== undefined" :label-cols="3">
            <b-form-checkbox v-model="graphFilter.isComparedToPM" :disabled="graphFilter.algorithm === 'fuzzy'">{{ $t('view.process.filter.title.isComparedToPM') }}</b-form-checkbox>
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
export default class ProcessFilter extends Mixins(FilterMixin) {
  graphFilter: IFilter = {
    duration: {
      start: null,
      end: null,
    },
    variantType: 'STANDARD',
    algorithm: 'fhm',
    nodeText: 'statistics.count',
    arcText: 'statistics.count',
    tokenInclude: '---',
    tokenValue: '---',
    dep: -1,
    freq: 0,
    nodeSign: 0,
    arcSign: 0,
    isComparedToPM: false,
  };

  showTokenValueError: boolean = false;

  @Watch('graphFilter.duration', { immediate: true, deep: true })
  onDurationChange(newVal: any): void {
    if (newVal !== null && (newVal.start !== '' || newVal.end !== '')) {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.viewDate = start + ' ~ ' + end;
    }
  }

  created() {
    this.initFilter();
  }

  mounted() {
    if (this.$route.query.from === 'case-section-duration' || this.$route.query.from === 'tracevariant-duration') {
      switch (this.$route.query.from) {
        case 'case-section-duration': {
          this.graphFilter.nodeText = 'statistics.count';
          this.graphFilter.arcText = 'statistics.average';
          this.graphFilter.tokenInclude = 'ci';
          this.graphFilter.tokenValue = this.$route.query.caseId as string;
          break;
        }
      }

      this.graphFilter.algorithm = 'fhm';
      this.graphFilter.isComparedToPM = false;

      this.onClickGetVariant();
    }
  }

  initFilter() {
    const duration = this.getDuration();

    // 설정 적용
    this.graphFilter = {
      duration: {
        start: duration.start,
        end: duration.end,
      },
      algorithm: 'fhm',
      variantType: this.setting.common.analysis.variantType,
      nodeText: this.setting.discovery.nodeText,
      arcText: this.setting.discovery.arcText,
      tokenInclude: '---',
      tokenValue: '---',
      dep: this.setting.model.dep.complex,
      freq: this.setting.model.freq.complex,
      nodeSign: this.setting.model.nodeSign.complex,
      arcSign: this.setting.model.arcSign.complex,
      isComparedToPM: false,
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

    if (this.graphFilter.tokenInclude != '---' && this.graphFilter.tokenValue === '') {
      this.showTokenValueError = true;
      return;
    }

    this.graphFilter.dep = this.setting.model.dep.complex;
    this.graphFilter.freq = this.setting.model.freq.complex;
    this.graphFilter.nodeSign = this.setting.model.nodeSign.complex;
    this.graphFilter.arcSign = this.setting.model.arcSign.complex;

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('changeModelFilter');

    this.$emit('getVariant');
  }

  onChangeAlgorithm(event: any) {
    if (event === 'fuzzy') {
      if (this.graphFilter.nodeText === 'reworks.total') {
        this.graphFilter.nodeText = 'statistics.count';
      }
      if (this.graphFilter.arcText === 'bottlenecks') {
        this.graphFilter.arcText = 'statistics.count';
      }
      this.graphFilter.isComparedToPM = false;
    }
  }

  onChangeNodeText(event: any) {
    if (event === 'reworks.total') {
      if (this.graphFilter.arcText === 'bottlenecks') {
        this.graphFilter.arcText = 'statistics.count';
      }
    }
  }

  onChangeArcText(event: any) {
    if (event === 'bottlenecks') {
      if (this.graphFilter.nodeText === 'reworks.total') {
        this.graphFilter.nodeText = 'statistics.count';
      }
    }
  }

  onChangeTokenInclude() {
    this.showTokenValueError = false;
    this.graphFilter.tokenValue = this.setTokenValue(this.graphFilter.tokenInclude);
  }

  initByClientState(clientState: IClientState) {
    this.graphFilter = {
      duration: {
        start: moment(clientState.processDiscovery.filter.duration.start).toDate(),
        end: moment(clientState.processDiscovery.filter.duration.end).toDate(),
      },
      variantType: clientState.processDiscovery.filter.varintType,
      algorithm: clientState.processDiscovery.filter.algorithm,
      nodeText: clientState.processDiscovery.filter.nodeText,
      arcText: clientState.processDiscovery.filter.arcText,
      tokenInclude: clientState.processDiscovery.filter.tokenInclude,
      tokenValue: clientState.processDiscovery.filter.tokenValue,
      dep: clientState.processDiscovery.filter.dep,
      freq: clientState.processDiscovery.filter.freq,
      nodeSign: clientState.processDiscovery.filter.nodeSign,
      arcSign: clientState.processDiscovery.filter.arcSign,
      isComparedToPM: clientState.processDiscovery.filter.isComparedToPM,
    };

    this.$store.commit('common/setFilter', _.cloneDeep(this.graphFilter));

    EventBus.$emit('changeModelFilter');
  }

  get tokenValueState() {
    if (this.graphFilter.tokenInclude === '---') {
      return {
        state: null,
        feedback: '',
      };
    } else {
      return ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.graphFilter.tokenValue);
    }
  }
}
</script>
