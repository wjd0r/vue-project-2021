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
          <b-form-group :label="$t('view.process.filter.title.selectX')" :label-cols="3">
            <!--<label class="mr-sm-2" for="inline-form-custom-select-pref">X축: </label>-->
            <b-form-select v-model="graphFilter.selectedX" @change="onChnageSelectedX">
              <b-form-select-option v-for="v in optionsX" :key="v.value" :value="v.value" :disabled="v.disabled">{{ v.useText ? v.text : $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.selectY')" :label-cols="3">
            <!--<label class="mr-sm-2" for="inline-form-custom-select-pref">Y축: </label>-->
            <b-form-select v-model="graphFilter.selectedY" @change="onChnageSelectedY">
              <b-form-select-option v-for="v in optionsY" :key="v.value" :value="v.value" :disabled="v.disabled">{{ v.useText ? v.text : $t('view.process.filter.value.' + v.value) }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('view.process.filter.title.selectedColorby')" :label-cols="3">
            <!--<label class="mr-sm-2" for="inline-form-custom-select-pref">Color By: </label>-->
            <b-form-select v-model="graphFilter.selectedColorBy">
              <b-form-select-option v-for="v in optionsColorBy" :key="v.value" :value="v.value">{{ $t('view.process.filter.value.statistics.' + v.value) }}</b-form-select-option>
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
        </div>

        <div class="content-footer">
          <div v-show="showTokenValueError" class="notice-text red-text">{{ $t('view.process.alert.needTokenValue') }}</div>
          <b-button variant="primary" class="btn-apply" @click="getVariant()">{{ $t('view.process.button.getVariant') }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { EventBus, ValidationCheck } from '@/common';
import { IClientState } from '@/interface';

import { FilterMixin } from '@/mixin';

import moment from 'moment';
import _ from 'lodash';

@Component({})
export default class HeatmapChartFilter extends Mixins(FilterMixin) {
  duration = {
    start: moment() as moment.Moment | Date,
    end: moment() as moment.Moment | Date,
  };
  variantType: string = 'STANDARD';
  graphFilter = {
    selectedX: 'esm', //'ea',
    selectedY: 'ea', //'eo',
    selectedValue: 'EXTRACT',
    selectedColorBy: 'countCases', //total',
    tokenInclude: '---',
    tokenValue: '---',
  };

  enExists: boolean = false;
  cnExists: boolean = false;

  optionsX = [
    { value: 'ea', text: this.$t('view.repo.matrix.activity'), disabled: false }, //액티비티
    { value: 'edf', text: this.$t('view.repo.matrix.activitySection'), disabled: false }, //액티비티 구간
    // { value: 'eo', text: '담당자', disabled: false },
    // { value: 'er', text: '리소스', disabled: false}

    // { value: 'ea', text: 'Activity', disabled: false },
    // { value: 'eo', text: 'Originator', disabled: false },
    // { value: 'er', text: 'Resource', disabled: false}
  ];
  optionsY = [
    { value: 'ea', text: this.$t('view.repo.matrix.activity'), disabled: false }, //액티비티
    { value: 'edf', text: this.$t('view.repo.matrix.activitySection'), disabled: false }, //액티비티 구간
    // { value: 'eo', text: '담당자', disabled: false },
    // { value: 'er', text: '리소스', disabled: false}

    // { value: 'ea', text: 'Activity', disabled: false },
    // { value: 'eo', text: 'Originator', disabled: false },
    // { value: 'er', text: 'Resource', disabled: false}
  ];
  optionsValue = [{ value: 'EXTRACT', text: 'EXTRACT' }];
  optionsColorBy: any[] = [];
  optionsColorBy1 = [
    { value: 'countCases', text: this.$t('view.repo.matrix.countCases') }, //케이스 수
    { value: 'total', text: this.$t('view.repo.matrix.total') }, //소요시간 - 합계
    { value: 'min', text: this.$t('view.repo.matrix.min') }, //소요시간 - 최소
    { value: 'max', text: this.$t('view.repo.matrix.max') }, //소요시간 - 최대
    { value: 'average', text: this.$t('view.repo.matrix.average') }, //소요시간 - 평균
  ];
  optionsColorBy2 = [
    { value: 'countCases', text: this.$t('view.repo.matrix.countCases') }, //케이스 수
    { value: 'total', text: this.$t('view.repo.matrix.total') }, //소요시간 - 합계
    { value: 'min', text: this.$t('view.repo.matrix.min') }, //소요시간 - 최소
    { value: 'max', text: this.$t('view.repo.matrix.max') }, //소요시간 - 최대
    { value: 'average', text: this.$t('view.repo.matrix.average') }, //소요시간 - 평균
    { value: 'total2', text: this.$t('view.repo.matrix.utilization') }, //사용률
  ];

  attributeOption: any[] = [];

  showTokenValueError: boolean = false;

  @Watch('eventView', { immediate: true, deep: true })
  onEventViewChanged(data: any) {
    this.optionsX = [
      { value: 'ea', text: this.$t('view.repo.matrix.activity'), disabled: false }, //액티비티
      { value: 'edf', text: this.$t('view.repo.matrix.activitySection'), disabled: false }, //액티비티 구간
    ];
    this.optionsY = [
      { value: 'ea', text: this.$t('view.repo.matrix.activity'), disabled: false }, //액티비티
      { value: 'edf', text: this.$t('view.repo.matrix.activitySection'), disabled: false }, //액티비티 구간
    ];
    for (const key in data.fields) {
      //const valueData = data.fields[key];
      const valueData = key;
      switch (valueData) {
        case 'eo':
          this.optionsX.push({ value: 'eo', text: this.$t('view.repo.matrix.originator'), disabled: false }); //담당자
          this.optionsY.push({ value: 'eo', text: this.$t('view.repo.matrix.originator'), disabled: false }); //담당자
          //this.graphFilter.selectedY = 'eo';
          break;
        case 'er':
          this.optionsX.push({ value: 'er', text: this.$t('view.repo.matrix.resource'), disabled: false }); //리소스
          this.optionsY.push({ value: 'er', text: this.$t('view.repo.matrix.resource'), disabled: false }); //리소스
          //this.graphFilter.selectedY = 'er';
          break;

        //비용항목이 있을 경우에?
        case 'en': //'이벤트 비용'이 있을 경우에
          this.enExists = true;
          break;
        case 'cn': //'케이스 총 비용' 이 있을 경우에
          this.cnExists = true;
          break;
      }
    }
    this.optionsX.push({ value: 'esm', text: this.$t('view.repo.matrix.durationMonth'), disabled: false }); //기간(월)

    //attributeOptions start
    const caseAttributes = this.eventView.caseAttributes;

    //{ value: 'eo', text: this.$t('view.repo.matrix.originator'), disabled: false }

    const attributes: any[] = [];
    Object.keys(caseAttributes).forEach((key: any) => {
      if (caseAttributes[key] == 'cb') attributes.push(key);
    });

    const fieldAliases = this.eventView.fieldAliases;

    this.attributeOption = [];
    attributes.forEach((a: any) => {
      this.attributeOption.push({ value: a, text: fieldAliases[a], disabled: false, useText: true });
    });

    this.attributeOption.forEach((option: any) => {
      this.optionsX.push(option);
      this.optionsY.push(option);
    });
    //attributeOptions end

    /*
    if(this.optionsY.length == 1){
      this.graphFilter.selectedX = 'esm';
      this.graphFilter.selectedY = 'ea';
    }
    */

    // selectedY: 'ea'
    this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'ea')].disabled = true;
    //this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'arc')].disabled = true;
    this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'edf')].disabled = true;
  }

  created() {
    this.initFilter();
  }

  mounted() {
    if (this.$route.query.from !== undefined) {
      switch (this.$route.query.from) {
        case 'cost-cases': {
          this.graphFilter.selectedX = 'esm';
          this.graphFilter.selectedY = 'ea';
          this.graphFilter.tokenInclude = 'ci';
          this.graphFilter.tokenValue = this.$route.query.caseId as string;

          if (this.eventView.fileds?.en && this.eventView.fields?.cn) {
            this.graphFilter.selectedColorBy = 'en_total';
          } else if (this.eventView.fiels?.en && !this.eventView.fields?.cn) {
            this.graphFilter.selectedColorBy = 'en_total';
          } else if (!this.eventView.fiels?.en && this.eventView.fields?.cn) {
            this.graphFilter.selectedColorBy = 'cn_total';
          }

          break;
        }
        case 'resource-activity': {
          this.graphFilter.selectedX = 'er';
          this.graphFilter.selectedY = 'ea';
          this.graphFilter.selectedColorBy = 'average';
          break;
        }
        case 'originator-activity': {
          this.graphFilter.selectedX = 'eo';
          this.graphFilter.selectedY = 'ea';
          this.graphFilter.selectedColorBy = 'average';
          break;
        }
        case 'cost-mean-resource': {
          this.graphFilter.selectedX = 'er';
          this.graphFilter.selectedY = 'ea';
          this.graphFilter.selectedColorBy = 'en_total';
          break;
        }
        case 'cost-mean-originator': {
          this.graphFilter.selectedX = 'eo';
          this.graphFilter.selectedY = 'ea';
          this.graphFilter.selectedColorBy = 'en_total';
          break;
        }
      }

      this.getVariant();
    }
  }

  @Watch('duration', { immediate: true, deep: true })
  onDurationChange(newVal: any): void {
    if (newVal.start !== '' || newVal.end !== '') {
      const start = moment(newVal.start).format('YYYY-MM-DD');
      const end = moment(newVal.end).format('YYYY-MM-DD');
      this.viewDate = start + ' ~ ' + end;
    }
  }

  @Watch('graphFilter.selectedX', { immediate: true, deep: true })
  onSelectedXChange(newVal: any): void {
    if (newVal == 'esm') {
      //X: 기간(월) 선택 -> 데이터에 사용률 표시
      this.optionsColorBy = _.clone(this.optionsColorBy2);
    } else {
      //X: 기간(월) 선택안함 -> 데이터에 사용률 표시 안함
      this.optionsColorBy = _.clone(this.optionsColorBy1);

      if (this.graphFilter.selectedColorBy == 'total2') {
        this.graphFilter.selectedColorBy = 'total';
      }
    }

    if (this.enExists) {
      this.optionsColorBy.push({ value: 'en_total', text: this.$t('view.repo.matrix.en_total') }); //이벤트 비용 - 합계
      this.optionsColorBy.push({ value: 'en_min', text: this.$t('view.repo.matrix.en_min') }); //이벤트 비용 - 최소
      this.optionsColorBy.push({ value: 'en_max', text: this.$t('view.repo.matrix.en_max') }); //이벤트 비용 - 최대
      this.optionsColorBy.push({ value: 'en_average', text: this.$t('view.repo.matrix.en_average') }); //이벤트 비용 - 평균
    }
    if (this.cnExists) {
      this.optionsColorBy.push({ value: 'cn_total', text: this.$t('view.repo.matrix.cn_total') }); //케이스 총 비용 - 합계
      this.optionsColorBy.push({ value: 'cn_min', text: this.$t('view.repo.matrix.cn_min') }); //케이스 총 비용 - 최소
      this.optionsColorBy.push({ value: 'cn_max', text: this.$t('view.repo.matrix.cn_max') }); //케이스 총 비용 - 최대
      this.optionsColorBy.push({ value: 'cn_average', text: this.$t('view.repo.matrix.cn_average') }); //케이스 총 비용 - 평균
    }
  }

  initFilter() {
    const duration = this.getDuration();

    // 설정 세팅으로 초기화
    this.duration = {
      start: duration.start,
      end: duration.end,
    };
    this.variantType = this.setting.common.analysis.variantType;
    this.graphFilter = {
      selectedX: this.setting.matrix.selectedX,
      selectedY: this.setting.matrix.selectedY,
      selectedValue: 'EXTRACT',
      selectedColorBy: this.setting.matrix.selectedColorBy,
      tokenInclude: '---',
      tokenValue: '---',
    };

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

    if (this.graphFilter.tokenInclude != '---' && this.graphFilter.tokenValue === '') {
      this.showTokenValueError = true;
      return;
    }

    const xData = this.optionsX.find((args: any) => args.value == this.graphFilter.selectedX).value;

    let yData = 'ea';
    if (this.optionsY.length == 1) {
      this.graphFilter.selectedX = 'esm';
      this.graphFilter.selectedY = 'ea';
    } else {
      yData = this.optionsY.find((args: any) => args.value == this.graphFilter.selectedY).value;
    }
    const valueData = this.optionsColorBy.find((args: any) => args.value == this.graphFilter.selectedColorBy).value;

    this.$emit('setBadges', {
      xData: xData,
      yData: yData,
      valueData: valueData,
    });

    this.$store.commit('common/setFilter', {
      duration: this.duration,
      variantType: this.variantType,
      selectedX: this.graphFilter.selectedX,
      selectedY: this.graphFilter.selectedY,
      selectedValue: this.graphFilter.selectedValue,
      selectedColorBy: this.graphFilter.selectedColorBy,
      tokenInclude: this.graphFilter.tokenInclude,
      tokenValue: this.graphFilter.tokenValue,
    });

    EventBus.$emit('setMatrixGraphOption', {
      dimensionFrom: this.graphFilter.selectedX,
      dimensionTo: this.graphFilter.selectedY,
      dimensionValue: this.graphFilter.selectedValue,
      colorByInput: this.graphFilter.selectedColorBy,
    });

    this.$emit('getVariant');
  }

  onChnageSelectedX() {
    //when x, y selected is equal
    const xData = this.optionsX.find((args: any) => args.value == this.graphFilter.selectedX).value;
    const yData = this.optionsY.find((args: any) => args.value == this.graphFilter.selectedY).value;
    const keyToDisable = this.optionsY.findIndex((args: any) => args.value == this.graphFilter.selectedX);
    /*
    if (this.optionsY.length == 1) {
      this.graphFilter.selectedX = 'esm';
      this.graphFilter.selectedY = 'ea';
    } else if (xData == yData) {
      const newYIndex = keyToDisable == this.optionsY.length - 1 ? 0 : keyToDisable + 1;
      this.graphFilter.selectedY = this.optionsY[newYIndex].value;
    }
    */
    this.optionsY.forEach((element: any) => {
      element.disabled = false;
    });
    this.optionsY[keyToDisable].disabled = true;

    // 2nd
    if (xData == 'ea' || xData == 'edf') {
      this.optionsY[this.optionsY.findIndex((args: any) => args.value == 'ea')].disabled = true;
      //this.optionsY[this.optionsY.findIndex((args: any) => args.value == 'arc')].disabled = true;
      this.optionsY[this.optionsY.findIndex((args: any) => args.value == 'edf')].disabled = true;
    } else {
      this.optionsY[this.optionsY.findIndex((args: any) => args.value == 'ea')].disabled = false;
      //this.optionsY[this.optionsY.findIndex((args: any) => args.value == 'arc')].disabled = false;
      this.optionsY[this.optionsY.findIndex((args: any) => args.value == 'edf')].disabled = false;
    }

    // // y disable
    // if(this.optionsY.length > 2){
    //   for(const key in this.optionsY)
    //     this.optionsY[key].disabled = false;
    //   this.optionsY[keyToDisable].disabled = true;
    // }
  }

  onChnageSelectedY() {
    //when x, y selected is equal
    const xData = this.optionsX.find((args: any) => args.value == this.graphFilter.selectedX).value;
    const yData = this.optionsY.find((args: any) => args.value == this.graphFilter.selectedY).value;
    const keyToDisable = this.optionsX.findIndex((args: any) => args.value == this.graphFilter.selectedY);
    /*
    if (xData == yData) {
      const newXIndex = keyToDisable == this.optionsX.length - 1 ? 0 : keyToDisable + 1;
      this.graphFilter.selectedX = this.optionsX[newXIndex].value;
    }
    */

    this.optionsX.forEach((element: any) => {
      element.disabled = false;
    });
    this.optionsX[keyToDisable].disabled = true;

    // 2nd
    if (yData == 'ea' || yData == 'edf') {
      this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'ea')].disabled = true;
      //this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'arc')].disabled = true;
      this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'edf')].disabled = true;
    } else {
      this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'ea')].disabled = false;
      //this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'arc')].disabled = false;
      this.optionsX[this.optionsX.findIndex((args: any) => args.value == 'edf')].disabled = false;
    }

    // // y disable
    // if(this.optionsX.length > 2){
    //   for(const key in this.optionsX)
    //     this.optionsX[key].disabled = false;
    //   this.optionsX[keyToDisable].disabled = true;

    // }
  }

  onChangeTokenInclude() {
    this.graphFilter.tokenValue = this.setTokenValue(this.graphFilter.tokenInclude);
  }

  updateRoute() {
    this.min = moment(this.eventView.startTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.max = moment(this.eventView.completeTimeStr, 'YYYY-MM-DD HH:mm:ss').toDate();

    this.initFilter();
  }

  initByClientState(clientState: IClientState) {
    this.duration = {
      start: moment(clientState.matrixModel.filter.duration.start).toDate(),
      end: moment(clientState.matrixModel.filter.duration.end).toDate(),
    };
    this.variantType = clientState.matrixModel.filter.varintType;

    this.graphFilter = {
      selectedX: clientState.matrixModel.filter.selectedX,
      selectedY: clientState.matrixModel.filter.selectedY,
      selectedValue: clientState.matrixModel.filter.selectedValue,
      selectedColorBy: clientState.matrixModel.filter.selectedColorBy,
      tokenInclude: clientState.matrixModel.filter.tokenInclude,
      tokenValue: clientState.matrixModel.filter.tokenValue,
    };

    this.$emit('setBadges', {
      xData: this.graphFilter.selectedX,
      yData: this.graphFilter.selectedY,
      valueData: this.graphFilter.selectedColorBy,
    });

    this.$store.commit('common/setFilter', {
      duration: this.duration,
      variantType: this.variantType,
      selectedX: this.graphFilter.selectedX,
      selectedY: this.graphFilter.selectedY,
      selectedValue: this.graphFilter.selectedValue,
      selectedColorBy: this.graphFilter.selectedColorBy,
      tokenInclude: this.graphFilter.tokenInclude,
      tokenValue: this.graphFilter.tokenValue,
    });

    EventBus.$emit('setMatrixGraphOption', {
      dimensionFrom: this.graphFilter.selectedX,
      dimensionTo: this.graphFilter.selectedY,
      dimensionValue: this.graphFilter.selectedValue,
      colorByInput: this.graphFilter.selectedColorBy,
    });
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
