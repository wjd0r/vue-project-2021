<template>
  <div class="form-content">
    <b-form-group :label="$t('view.repo.standard.activityName')" desc="액티비티 이름" :invalid-feedback="nameState.feedback">
      <b-form-input :value="name" @input.native="changeCellName($event.target.value.trim())" autocomplete="off" maxlength="255" :state="nameState.state"></b-form-input>
    </b-form-group>
    <b-form-group label-cols="4" :label="$t('view.repo.standard.required')" desc="필수 여부" v-slot="{ ariaDescribedby }" class="checkbox">
      <b-form-checkbox v-model="required" :value="1" :unchecked-value="0" @input="changeRequired(required)" :aria-describedby="ariaDescribedby"></b-form-checkbox>
    </b-form-group>
    <b-form-group :label="$t('view.repo.standard.timeValue')" desc="소요시간" :invalid-feedback="timeState.feedback">
      <b-form-input type="number" class="no-spin" v-model.number="timeValue" min="0" number @input="changeCellProp(props.data.timeValue, timeValue)" :state="timeState.state"></b-form-input>
    </b-form-group>
    <b-form-group :label="$t('view.repo.standard.timeUnit')" desc="시간 단위">
      <b-form-select v-model="timeUnit" @change="changeCellProp(props.data.timeUnit, timeUnit)">
        <b-form-select-option value="sec" desc="초">{{ $t('view.repo.standard.sec') }}</b-form-select-option>
        <b-form-select-option value="min" desc="분">{{ $t('view.repo.standard.min') }}</b-form-select-option>
        <b-form-select-option value="hour" desc="시">{{ $t('view.repo.standard.hour') }}</b-form-select-option>
        <b-form-select-option value="day" desc="일">{{ $t('view.repo.standard.day') }}</b-form-select-option>
      </b-form-select>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { ValidationCheck } from '@/common';
import { BaseInspector } from '../ts/base-inspector';
import { dia, Theme } from '@iochord/ipr-fre-ent-core';
import _ from 'lodash';

@Component({})
export default class ActivityInspector extends BaseInspector {
  @Prop() rappid: any;
  @Prop() declare cell: dia.Cell;

  props: any = Theme.props;
  name: string = '';
  required: number = 0;
  timeValue: number = 0;
  timeUnit: string = 'day';

  protected assignFormFields(): void {
    const { cell, props } = this;
    this.name = cell.prop(props.data.name);
    this.required = cell.prop(props.data.required);
    this.timeValue = cell.prop(props.data.timeValue);
    this.timeUnit = cell.prop(props.data.timeUnit);
  }

  changeCellName(name: string) {
    const { cell, props } = this;
    this.changeCellProp(props.attrs.label, name);
    this.changeCellProp(props.data.name, name);

    this.rappid.graph.getConnectedLinks(cell).forEach((link: joint.dia.Link) => {
      if (link.getSourceCell() === cell) link.prop(props.data.source, name);
      if (link.getTargetCell() === cell) link.prop(props.data.target, name);
    });
  }

  changeRequired(value: number) {
    this.changeCellProp(this.props.attrs.required, value === 1 ? 'visible' : 'hidden');
    this.changeCellProp(this.props.data.required, value);
  }

   get nameState() {
    // 액티비티 이름 : 문자, 숫자, 특문 1~255, 중복체크, (옵션)
    const validate = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.name);

    if (!validate.state) {
      return validate;
    }

    if(!this.duplication) {
      return {
        state: false,
        feedback: this.$t('view.repo.validate.duplicate')
      }
    }

    return {
      state: true,
      feedback: '',
    };
  }

  get timeState() {
    // 액티비티 - 표준 시간 : 0 ~
    const validate = ValidationCheck.check(ValidationCheck.Type.Number, 1, 255, this.timeValue);

    if (validate.state === false) {
      return validate;
    }

    if (this.timeValue < 0) {
      return {
        state: false,
        feedback: this.$t('view.repo.standard.validate.lessThenZero'),
      };
    }

    return {
      state: true,
      feedback: '',
    };
  }

  // 중복 체크 : false 가 중복
  get duplication() {
    let cnt = 0;
    _.find(this.rappid.getElements(), (cell: dia.Cell) => {
      if (cell.prop(this.props.data.name) === this.name) {
        cnt++;
      }
    });

    if (cnt > 1) {
      return false;
    } else {
      return true;
    }
  }
}
</script>
