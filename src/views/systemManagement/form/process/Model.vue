<template>
  <div class="form-content">
    <!-- <div class="preview-content"></div> -->
    <div class="content-header"><h5 class="title">Heuristics</h5></div>
    <div class="content-body">
      <div class="content-sub"><h5 class="title">complex</h5></div>
      <b-form-group :label="$t('view.setting.processModel.dependency')" label-cols="2" description="Min = -1.0, Max = 1.0">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.dep.complex" min="-1.0" max="1.0" :state="depState(setting.model.dep.complex)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('view.setting.processModel.minimumFrequency')" label-cols="2" :description="$t('view.setting.processModel.accordingToData')">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.freq.complex" min="0" :state="freqState(setting.model.freq.complex)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
      <div class="content-sub"><h5 class="title">simple</h5></div>
      <b-form-group :label="$t('view.setting.processModel.dependency')" label-cols="2" description="Min = -1.0, Max = 1.0">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.dep.simple" min="-1.0" max="1.0" :state="depState(setting.model.dep.simple)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('view.setting.processModel.minimumFrequency')" label-cols="2" :description="$t('view.setting.processModel.accordingToData')">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.freq.simple" min="0" :state="freqState(setting.model.freq.simple)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">Fuzzy</h5></div>
    <div class="content-body">
      <div class="content-sub"><h5 class="title">complex</h5></div>
      <b-form-group :label="$t('view.setting.processModel.nodeSignificance')" label-cols="2" description="Min = 0, Max = 100">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.nodeSign.complex" min="0" max="100" :state="signState(setting.model.nodeSign.complex)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('view.setting.processModel.arcSignificance')" label-cols="2" description="Min = 0, Max = 100">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.arcSign.complex" min="0" max="100" :state="signState(setting.model.arcSign.complex)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
      <div class="content-sub"><h5 class="title">simple</h5></div>
      <b-form-group :label="$t('view.setting.processModel.nodeSignificance')" label-cols="2" description="Min = 0, Max = 100">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.nodeSign.simple" min="0" max="100" :state="signState(setting.model.nodeSign.simple)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('view.setting.processModel.arcSignificance')" label-cols="2" description="Min = 0, Max = 100">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.model.arcSign.simple" min="0" max="100" :state="signState(setting.model.arcSign.simple)" type="number" number :disabled="isMobileBlock()"></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';
import { utils } from '@/common';
import { ISetting } from '@/interface';

import _ from 'lodash';
import * as $options from '../../options.json';

import { UtilsMixin } from '@/mixin';

@Component({
  components: {},
  computed: mapGetters({
    readOnlySetting: 'sso/getSetting',
  }),
})
export default class Model extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  readonly ERROR_MESSAGE: string = this.$t('view.setting.message.check').toString();
  setting: ISetting = null;
  model: any = {};

  created() {
    this.onReset();
    this.model = JSON.parse(JSON.stringify($options)).default.process.model;
  }

  mounted() {
    EventBus.$on('saveSetting', (callback: any) => this.onSave(callback));
    EventBus.$on('cancelSetting', () => this.onReset());
    EventBus.$on('resetSetting', () => this.onReset());
  }

  beforeDestroy() {
    EventBus.$off('saveSetting');
    EventBus.$off('cancelSetting');
    EventBus.$off('resetSetting');
  }

  onSave(callback: any) {
    const { dep, freq, nodeSign, arcSign } = this.setting.model;

    const confDepMin = dep.complex >= -1 && dep.simple >= -1;
    const confDepMax = dep.complex <= 1 && dep.simple <= 1;
    
    const confFreqMin = freq.complex >= 0 && freq.simple >= 0;

    const confNodeSignMin = nodeSign.complex >= 0 && nodeSign.simple >= 0;
    const confNodeSignMax = nodeSign.complex <= 100 && nodeSign.simple <= 100;

    const confArcSignMin = arcSign.complex >= 0 && arcSign.simple >= 0;
    const confArcSignMax = arcSign.complex <= 100 && arcSign.simple <= 100;

    const confBlank =
      String(dep.complex) != '' && 
      String(dep.simple) != '' && 
      String(freq.complex) != '' && 
      String(freq.simple) != '' && 
      String(nodeSign.complex) != '' && 
      String(nodeSign.simple) != '' && 
      String(arcSign.complex) != '' && 
      String(arcSign.simple) != '';

    if (confDepMin && confDepMax && confFreqMin && confNodeSignMin && confNodeSignMax && confArcSignMin && confArcSignMax && confBlank) {
      // 검증 성공
      callback(_.cloneDeep(this.setting));
      this.onCompletion();
    } else {
      // 검증 실패
      utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.ERROR_MESSAGE, 'warning');
    }
  }

  onReset() {
    this.setting = _.cloneDeep(this.readOnlySetting);
  }

  onCompletion() {
    utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.complete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete');
  }

  depState(value: number) {
    if (typeof value !== 'number') {
      return false;
    } else {
      if (-1 <= value && value <= 1) {
        return null;
      } else {
        return false;
      }
    }
  }

  freqState(value: number) {
    if (typeof value !== 'number') {
      return false;
    } else {
      if (0 <= value) {
        return null;
      } else {
        return false;
      }
    }
  }

  signState(value: number) {
    if (typeof value !== 'number') {
      return false;
    } else {
      if (0 <= value && value <= 100) {
        return null;
      } else {
        return false;
      }
    }
  }
}
</script>