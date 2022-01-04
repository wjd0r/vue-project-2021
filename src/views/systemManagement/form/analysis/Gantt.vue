<template>
  <div class="form-content">
    <!-- <div class="preview-content"></div> -->
    <div class="content-header"><h5 class="title">Default</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.analysisItems')" label-cols="2">
        <b-form-select v-model="setting.gantt.variantType" :disabled="isMobileBlock()">
          <template v-for="item, index in gantt.variantType">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.legend')" label-cols="2">
        <b-form-select v-model="setting.gantt.barSeries" :disabled="isMobileBlock()">
          <template v-for="item, index in gantt.barSeries">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.sortby')" label-cols="2">
        <b-form-select v-model="setting.gantt.sortBy" :disabled="isMobileBlock()">
          <template v-for="item, index in gantt.sortBy">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
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
export default class Gantt extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  setting: ISetting = null;
  gantt: any;

  created() {
    this.onReset();
    this.gantt = JSON.parse(JSON.stringify($options)).default.analysis.gantt;
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
    callback(_.cloneDeep(this.setting));
    this.onCompletion();
  }

  onReset() {
    this.setting = _.cloneDeep(this.readOnlySetting);
  }

  onCompletion() {
    utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.complete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete');
  }
}
</script>