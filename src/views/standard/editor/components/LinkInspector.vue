<template>
  <div class="form-content">
    <b-form-group :label="$t('view.repo.standard.sourceActivityName')" :invalid-feedback="activityState(source).feedback" desc="시작 액티비티 이름">
      <b-form-input :value="source" @input.native="changeSource(props.data.source, $event.target.value.trim())" :state="activityState(source).state" autocomplete="off" maxlength="255"></b-form-input>
    </b-form-group>
    <b-form-group :label="$t('view.repo.standard.targetActivityName')" :invalid-feedback="activityState(target).feedback" desc="종료 액티비티 이름">
      <b-form-input :value="target" @input.native="changeTarget(props.data.target, $event.target.value.trim())" :state="activityState(target).state" autocomplete="off" maxlength="255"></b-form-input>
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
export default class LinkInspector extends BaseInspector {
  @Prop() rappid: any;
  @Prop() declare cell: dia.Link;

  props: any = Theme.props;
  source: string = '';
  target: string = '';
  timeValue: number = 0;
  timeUnit: string = 'day';

  protected assignFormFields(): void {
    const { cell, props } = this;
    this.source = cell.prop(props.data.source);
    this.target = cell.prop(props.data.target);
    this.timeValue = cell.prop(props.data.timeValue);
    this.timeUnit = cell.prop(props.data.timeUnit);
  }

  changeSource(sourceProp: any, sourceString: string) {
    this.source = sourceString;
    const sourceCell = this.haveActivity(sourceString);
    if (sourceCell) {
      this.cell.source({ id: sourceCell.get('id') });
      this.changeCellProp(sourceProp, sourceString);
    }
  }

  changeTarget(targetProp: any, targetString: string) {
    this.target = targetString;
    const targetCell = this.haveActivity(targetString);
    if (targetCell) {
      this.cell.target({ id: targetCell.get('id') });
      this.changeCellProp(targetProp, targetString);
    }
  }

  activityState(name: string) {
    const validate = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, name);

    if (!validate.state) {
      return validate;
    }

    if (this.haveActivity(name) === false) {
      return {
        state: false,
        feedback: this.$t('view.repo.validate.noActivity'),
      };
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

  haveActivity(name: string) {
    const results = _.find(this.rappid.getElements() as dia.Cell[], (cell: dia.Cell) => {
      return cell.prop(this.props.data.name) === name;
    });

    return results !== undefined ? results : false;
  }
}
</script>