<template>
  <div class="form-content">
    <div class="content-header"><h5 class="title">Default</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.common.basicAnalysisPeriod')" label-cols="2">
        <b-form-select v-model="setting.global.defaultAnalysisPeriod" :options="global.defaultAnalysisPeriod"/>
      </b-form-group>
      <b-form-group :label="$t('view.setting.common.typeWithCase')" label-cols="2">
        <b-form-select v-model="setting.global.keepCases" :options="global.keepCases"/>
      </b-form-group>
      <b-form-group :label="$t('view.setting.common.basicAnalysisItems')" label-cols="2">
        <b-form-select v-model="setting.global.variantType" :options="global.variantType"/>
      </b-form-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { ISetting } from '@/interface';

import _ from 'lodash';
import * as $options from '../options.json';

@Component({
  components: {},
  computed: mapGetters({
    readOnlySetting: 'sso/getSetting',
  }),
})
export default class Global extends Vue {
  readonly readOnlySetting!: ISetting;
  setting: ISetting = null;
  global: any;

  created() {
    this.onReset();
    this.global = JSON.parse(JSON.stringify($options)).default.global;
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