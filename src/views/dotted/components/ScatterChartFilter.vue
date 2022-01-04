<template>
  <div class="filter-component">
    <div class="filter-content">
      <div class="content-header">
        <div class="title">{{ $t('view.process.filter.title.filterTitle') }}</div>
      </div>
      <div class="content-body">
        <div class="form-content">
          <b-form-group :label="$t('view.process.filter.title.duration')" :label-cols="3" :description="repoMinMaxDate">
            <DatePicker mode="range" title-position="center" :popover="{ placement: 'bottom-end', visibility: 'click' }" color="red" :min-date="min" :max-date="max" v-model="duration">
              <b-form-input type="text" id="basicSelect" class="filter-date" v-model="viewDate" :placeholder="$t('view.process.filter.selectDuration')" desc="기간을 선택해주세요" :state="showError ? false : null" @focus="showError = false" maxLength="255" readonly></b-form-input>
            </DatePicker>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.variantType')" :label-cols="3">
            <b-form-select v-model="variantType">
              <b-form-select-option value="STANDARD">{{ $t('view.process.filter.value.STANDARD') }}</b-form-select-option>
              <b-form-select-option value="ES_MONTHLY">{{ $t('view.process.filter.value.ES_MONTHLY') }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.C')" :label-cols="3">
            <b-form-select v-model="graphFilterC.condition">
              <b-form-select-option v-for="v in optionsC" :key="v.value" :value="v.value">{{ $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.Ca')" :label-cols="3">
            <b-form-select v-model="graphFilterCA.condition">
              <b-form-select-option v-for="v in optionsCA" :key="v.value" :value="v.value">{{ $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
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
import { EventBus } from '@/common';
import { IClientState } from '@/interface';

import { FilterMixin } from '@/mixin';

import moment from 'moment';

@Component({})
export default class ScatterChartFilter extends Mixins(FilterMixin) {
  duration = {
    start: moment() as moment.Moment | Date,
    end: moment() as moment.Moment | Date,
  };
  variantType: string = 'STANDARD';
  graphFilterC = {
    condition: 'ci',
  };
  graphFilterCA = {
    condition: 'ea',
  };

  optionsC = [
    { value: 'ci', text: this.$t('view.repo.dotted.caseId') }, //케이스 아이디
    { value: 'ea', text: this.$t('view.repo.dotted.activity') }, //액티비티
  ];
  optionsCA: any[] = [
    //{ value: 'ea', text: 'Activity' },
    //{ value: 'eo', text: 'Originator' },
    //{ value: 'er', text: 'Resource'}
  ];

  @Watch('duration', { immediate: true, deep: true })
  onDurationChange(newVal: any): void {
    if (newVal.start !== '' || newVal.end !== '') {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.viewDate = start + ' ~ ' + end;
    }
  }

  @Watch('eventView', { immediate: true, deep: true })
  onEventViewChanged(data: any) {
    this.optionsCA = [];
    for (const key in data.fields) {
      switch (key) {
        case 'ea':
          this.optionsCA.push({ value: 'ea', text: this.$t('view.repo.dotted.activity') }); //액티비티
          break;
        case 'eo':
          this.optionsCA.push({ value: 'eo', text: this.$t('view.repo.dotted.originator') }); //담당자
          break;
        case 'er':
          this.optionsCA.push({ value: 'er', text: this.$t('view.repo.dotted.resource') }); //리소스
          break;
      }
    }
  }

  created() {
    this.initFilter();
  }

  initFilter() {
    const duration = this.getDuration();

    this.duration = {
      start: duration.start,
      end: duration.end,
    };

    //설정 적용(공통설정)
    const variantType = this.setting.common.analysis.variantType;

    //설정 적용(액티비티 설정)
    const component = this.setting.dotted.component;
    const value = this.setting.dotted.value;

    //설정 적용
    this.variantType = variantType;
    this.graphFilterC.condition = component;
    this.graphFilterCA.condition = value;

    this.$store.commit('common/setFilter', {
      duration: {
        start: this.duration.start,
        end: this.duration.end,
      },
    });
  }

  getVariant() {
    if (!this.viewDate) {
      this.showError = true;
      return;
    }

    const componentData = this.optionsC.find((args: any) => args.value == this.graphFilterC.condition).value;
    const colorData = this.optionsCA.length != 0 ? this.optionsCA.find((args: any) => args.value == this.graphFilterCA.condition).value : '';

    this.$emit('setBadges', {
      componentData: componentData,
      colorData: colorData,
    });

    this.$store.commit('common/setFilter', {
      duration: this.duration,
      variantType: this.variantType,
      component: this.graphFilterC.condition,
      value: this.graphFilterCA.condition,
    });

    EventBus.$emit('setDottedGraphOption', {
      component: this.graphFilterC.condition,
      value: this.graphFilterCA.condition,
    });

    this.$emit('getVariant');
  }

  updateRoute() {
    this.min = moment(this.eventView.startTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.max = moment(this.eventView.completeTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();

    this.initFilter();
  }

  initByClientState(clientState: IClientState) {
    this.duration = {
      start: moment(clientState.dotted.filter.duration.start).toDate(),
      end: moment(clientState.dotted.filter.duration.end).toDate(),
    };
    this.variantType = clientState.dotted.filter.varintType;

    this.graphFilterC.condition = clientState.dotted.filter.component;
    this.graphFilterCA.condition = clientState.dotted.filter.value;

    this.$emit('setBadges', {
      componentData: this.graphFilterC.condition,
      colorData: this.graphFilterCA.condition,
    });

    this.$store.commit('common/setFilter', {
      duration: this.duration,
      variantType: this.variantType,
      component: this.graphFilterC.condition,
      value: this.graphFilterCA.condition,
    });

    EventBus.$emit('setDottedGraphOption', {
      component: this.graphFilterC.condition,
      value: this.graphFilterCA.condition,
    });
  }
}
</script>
