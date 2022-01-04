<template>
  <div class="form-content">
    <!-- <div class="preview-content"></div> -->
    <div class="content-header"><h5 class="title">Default</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.nodeKPI')" label-cols="2">
        <b-form-select v-model="setting.animation.nodeText" :disabled="isMobileBlock()">
          <template v-for="item, index in animation.nodeText">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>

      </b-form-group>
      <b-form-group :label="$t('view.setting.label.connectorKPI')" label-cols="2">
        <b-form-select v-model="setting.animation.arcText" :disabled="isMobileBlock()">
          <template v-for="item, index in animation.arcText">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>

      </b-form-group>
      <b-form-group :label="$t('view.setting.label.caseIDLimit')" label-cols="2" description="Min = 10, Max = 500">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.animation.caseLimit" :state="caseLimitState" min="10" max="300" type="number" number :disabled="isMobileBlock()"/>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.speedLimit')" label-cols="2" description="Min = 1, Max = 100,000">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.animation.speedLimit" :state="speedLimitState" min="1" max="100000" type="number" number :disabled="isMobileBlock()"/>
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
export default class Animation extends Mixins(UtilsMixin) {
  readonly ERROR_MESSAGE: string = this.$t('view.setting.message.check').toString();
  readOnlySetting!: ISetting;
  setting: ISetting = null;
  animation: any;

  created() {
    this.onReset();
    this.animation = JSON.parse(JSON.stringify($options)).default.process.animation;
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
    const { caseLimit, speedLimit } = this.setting.animation;
    const cond1 = caseLimit >= 10;
    const cond2 = caseLimit <= 500;
    const cond3 = speedLimit >= 1;
    const cond4 = speedLimit <= 100000;

    const confBlank =
      String(caseLimit) != '' && 
      String(speedLimit) != '';

    if (cond1 && cond2 && cond3 && cond4 && confBlank) {
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

  get caseLimitState() {
    const tokenLimit = this.setting.animation.caseLimit;
    if (typeof tokenLimit !== 'number') {
      return false;
    } else {
      if (10 <= tokenLimit && tokenLimit <= 500) {
        return null;
      } else {
        return false;
      }
    }
  }

  get speedLimitState() {
    const speedLimit = this.setting.animation.speedLimit;
    if (typeof speedLimit !== 'number') {
      return false;
    } else {
      if (1 <= speedLimit && speedLimit <= 100000) {
        return null;
      } else {
        return false;
      }
    }
  }
}
</script>