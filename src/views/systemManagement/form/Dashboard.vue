<template>
  <div class="form-content">
    <div class="content-header"><h5 class="title">Default</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.dashboard.defaultTab')" label-cols="2">
        <b-form-select v-model="setting.dashboard.defaultTab" :disabled="isMobileBlock()" @change="onChangeTab">
          <template v-for="item, index in dashboard.defaultTab">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group :label="$t('view.setting.dashboard.fixedTab')" label-cols="2">
        <b-form-checkbox v-model="setting.dashboard.activeTab.overview" :disabled="disabled('OverviewTab') || isMobileBlock()">{{ $t('view.setting.dashboard.dataSummary') }}</b-form-checkbox>
        <b-form-checkbox v-model="setting.dashboard.activeTab.activity" :disabled="disabled('ActivityTab') || isMobileBlock()">{{ $t('view.setting.dashboard.activity') }}</b-form-checkbox>
        <b-form-checkbox v-model="setting.dashboard.activeTab.resource" :disabled="isMobileBlock()">{{ $t('view.setting.dashboard.resource') }}</b-form-checkbox>
        <b-form-checkbox v-model="setting.dashboard.activeTab.originator" :disabled="isMobileBlock()">{{ $t('view.setting.dashboard.contactPerson') }}</b-form-checkbox>
        <b-form-checkbox v-model="setting.dashboard.activeTab.cost" :disabled="isMobileBlock()">{{ $t('view.setting.dashboard.cost') }}</b-form-checkbox>
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
import * as $options from '../options.json';

import { UtilsMixin } from '@/mixin';

@Component({
  components: {},
  computed: mapGetters({
    readOnlySetting: 'sso/getSetting',
  }),
})
export default class Dashboard extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  readonly ERROR_MESSAGE: string = this.$t('view.setting.message.check').toString();
  setting: ISetting = null;
  dashboard: any;

  created() {
    this.onReset();
    this.dashboard = JSON.parse(JSON.stringify($options)).default.dashboard;
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

  async onSave(callback: any) {
    const { defaultTab, activeTab } = this.setting.dashboard;

    if ( defaultTab == 'ActivityTab' && activeTab.activity || defaultTab == 'OverviewTab' && activeTab.overview ) {
      callback(_.cloneDeep(this.setting));
      this.onCompletion();
    } else {
      const res = await utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.ERROR_MESSAGE, 'warning');
      if (res) return;
    }
  }

  onReset() {
    this.setting = _.cloneDeep(this.readOnlySetting);
  }

  onCompletion() {
    utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.complete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete');
  }

  onChangeTab() {
    if(this.setting.dashboard.defaultTab == 'ActivityTab') {
      this.setting.dashboard.activeTab.activity = true;
    } // 액티비티

    if(this.setting.dashboard.defaultTab == 'OverviewTab') {
      this.setting.dashboard.activeTab.overview = true;
    } // 데이터 요약

    return
  }

  disabled(arg: string) {
    return this.setting.dashboard.defaultTab == arg;
  }
}
</script>