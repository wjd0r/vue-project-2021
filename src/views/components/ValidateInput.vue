/*******************************************************************************************************************
 *
 *                       ValidateInput
 *
 * 생성 화면과 수정 화면을 다르게 rendering을 함
 *
 * 각각의 "input" 을 개별로 수정하다 어느정도 통일을 위하여 만들게 되었습니다.
 *
 * 기존의 "b-form-input" 가장 큰 차이점은 [mode] 라는 속성이 있다는 것 입니다.
 * 현 버전에서 [mode] 는 'create', 'modify' 을 지원하고 있습니다. 
 *
 * modify : 입력 변동 감지(detection)전에는 회색으로 표시, 감지 후에는 validate , 필수(essential) 값이 아니고 tempValue = '' 일경우 validate 안함, 감지 했더라도 tempValue == '' 가 validate 안함
 * create : validate, 단 필수(essential) 값이 아니고 tempValue = '' 일경우 validate 안함
 *
 * 그리고 [essential] 이라는 속성이 존재합니다.
 * 필수 값이라면 'true', 필수 값이 아니라면 'false'로 지정하면 됩니다.
 *
 * 지원하는 event
 *   @change
 *
 * 지원하는 property
 *   mode
 *   validaion-check
 *   label
 *   label-cols
 *   invalid-feedback
 *   type
 *   v-model
 *   disabled
 *   maxlength
 *   autocomplete
 *   min
 *   state
 *
 * event 및 property 는 더 추가 하셔도 무방하며,
 * Prop 에서 defalt는 항상 설정하셔야 합니다.
 *
 *******************************************************************************************************************
 * 추가 2021-12-06
 *
 * [permit-string] 추가
 *  - 문자 허용
 *
 * [permit-en] 추가
 *  - 영어 허용
 *
 * [permit-number] 추가
 *  - 숫자 허용
 *
 * [permit-special] 추가
 *  - 특수문자 허용
 *
 * [regexp] 추가
 *  - 'password', 'email', 'contact', 'ip'
 *
 * [duplicate-list] 추가
 *  - 배열을 넣으면 체크 동일한 값이 있는지 확인함
 *
 * [duplicate-property] 추가
 *  - 중복 속성값
 * 
 * [minlength] 추가
 *  - 3자이상, 5자 이상 같은 조건을 만족하기 위함
 *
 * [max] 추가
 *
 * [output]
 *  - 상태를 리턴한다.
 *
 *******************************************************************************************************************
 * 변경 2021-12-06
 * [isGroup] 추가
 *  - 범용성을 위하여 추가
 *
 * v-bind="$attrs" v-on="$listeners" 추가
 *  - 기존 이벤트 제거
 *  - 기존 속성 제거 (일부)
 *
 *******************************************************************************************************************
 * 변경 2021-12-10
 *
 * 사용자 정의 [state] 가 제대로 동작하지 않아 코드 수정
 *
 *******************************************************************************************************************/
<template>
  <!-- form-group 박스가 필요한 경우 -->
  <b-form-group :label="`${label} ${essential ? '(*)' : ''}`" :label-cols="labelCols" :invalid-feedback="tempInvalidFeedback" v-if="isGroup">                         
    <b-form-input v-model="tempValue" :disabled="disabled" :maxlength="maxlength" @input="onChange" :autocomplete="autocomplete" v-bind="$attrs" v-on="$listeners"
      :state="rendering" />
  </b-form-group>

  <!-- input 박스만 필요한 경우 -->
  <b-form-input v-model="tempValue" :disabled="disabled" :maxlength="maxlength" @input="onChange" :autocomplete="autocomplete" v-bind="$attrs" v-on="$listeners" v-else
    :state="rendering" /> 
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { ValidationCheck } from "@/common";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class ValidateInput extends Vue {
  /* Prop 선언 */
  @Prop({ default: '' }) value!: string;

  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: 0 }) minlength!: number;
  @Prop({ default: 255 }) maxlength!: number;
  @Prop({ default: null }) state!: boolean; // 사용자 정의 state
  @Prop({ default: 'create' }) mode!: 'create' | 'modify';
  @Prop({ default: true }) essential!: boolean;
  @Prop({ default: '' }) invalidFeedback!: string;
  @Prop({ default: '' }) label!: string;
  @Prop({ default: 0 }) labelCols!: number;
  @Prop({ default: 'off' }) autocomplete!: string;

  // state 관련
  @Prop({ default: '' }) regexp: string;
  @Prop({ default: false }) permitString: boolean;
  @Prop({ default: false }) permitEn: boolean;
  @Prop({ default: false }) permitNumber: boolean;
  @Prop({ default: false }) permitSpecial: boolean;
  @Prop() duplicateList: any;
  @Prop({ default: '' }) duplicateProperty: string;

  @Prop({ default: true }) isGroup: boolean;

  tempValue: string = this.value;
  tempState: boolean = this.state;
  tempInvalidFeedback: string = this.invalidFeedback;

  detection: boolean = false;

  created() {
    if(this.tempState == null) {
      this.tempState = false;
    }

    // 시작과 동시에 체크 한번은 해야함.
    this.onTempValue();
  }

  get rendering() {
    return (this.mode == 'modify' // 수정화면 일때
                  && (!this.detection // 입력 감지 전에는 회색
                  || (this.detection && !this.essential && (this.tempValue == '' || this.tempValue == null))) // 입력 감지를 했더라도 값이 비었고, 필수 값이 아니라면 회색
            )||(this.mode == 'create' // 입력화면 일때
                  && !this.essential && (this.tempValue == '' || this.tempValue == null)) ? null // 값이 비었고, 필수 값이 아니라면 회색
                                                                                          : this.tempState; // 그 외 경우에는 state가 동작함.
  }

  // input의 v-model 변경될 때 실행되는 이벤트 
  @Watch('tempValue', {deep: true})
  onTempValue() {
    // 사용자 정의 state가 있는 경우 사용자 정의를 따른다.
    if(this.state != null) {
      this.tempState = this.state;
      this.tempInvalidFeedback = this.invalidFeedback;

    // 사용자 정의 state가 없는 경우는 아래의 validate를 적용한다.
    } else if(this.regexp == 'password'){
      const arg = ValidationCheck.check(ValidationCheck.Type.Password, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
      this.tempState = arg.state;
      this.tempInvalidFeedback = arg.feedback;
    } else if(this.regexp == 'email') {
      const arg = ValidationCheck.check(ValidationCheck.Type.Email, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
      this.tempState = arg.state;
      this.tempInvalidFeedback = arg.feedback;
    } else if(this.regexp == 'contact') {
      const arg = ValidationCheck.check(ValidationCheck.Type.Contact, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
      this.tempState = arg.state;
      this.tempInvalidFeedback = arg.feedback;
    } else if(this.regexp == 'ip') {
      const arg = ValidationCheck.check(ValidationCheck.Type.Ip, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
      this.tempState = arg.state;
      this.tempInvalidFeedback = arg.feedback;
    } else if(this.state == null) {
      if(this.permitString && this.permitNumber && this.permitSpecial) {
        const arg = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
        this.tempState = arg.state;
        this.tempInvalidFeedback = arg.feedback;
      } else if (this.permitString && this.permitNumber) {
        const arg = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
        this.tempState = arg.state;
        this.tempInvalidFeedback = arg.feedback;
      } else if (this.permitEn && this.permitNumber) {
        const arg = ValidationCheck.check(ValidationCheck.Type.English_Number, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
        this.tempState = arg.state;
        this.tempInvalidFeedback = arg.feedback;
      } else if (this.permitNumber) {
        const arg = ValidationCheck.check(ValidationCheck.Type.Number, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
        this.tempState = arg.state;
        this.tempInvalidFeedback = arg.feedback;
      } else if (this.permitSpecial) {
        const arg = ValidationCheck.check(ValidationCheck.Type.Special, this.minlength, this.maxlength, this.tempValue, this.duplicateList, this.duplicateProperty);
        this.tempState = arg.state;
        this.tempInvalidFeedback = arg.feedback;
      }
    }

    // 필수가 아니면서 비어 있는 경우 true 리턴
    if(!this.essential && this.tempValue == '') {
      this.$emit('output', true);
    } else {
      this.$emit('output', this.tempState);
    }
    this.$emit('feedback', this.tempInvalidFeedback);
  }

  @Watch('value', { immediate: true })
  onValueImmediate() {
    if(this.value == null) {
      this.tempValue = '';
    }
    else {
      this.tempValue = this.value.toString();
    }
  }

  onChange() {
    this.detection = true;
    this.$emit('input', this.tempValue);
  }
}
</script>