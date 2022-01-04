<template>
  <div class="form-content">
    <div class="content-header"><h5 class="title">Default</h5></div>
      <div class="content-body">
      <b-form-group :label="$t('view.setting.label.eventClickMove')" label-cols="2">
        <b-form-select v-model="setting.workspace.whenEventLogIsClicked" :options="workspace.whenEventLogIsClicked"/>
      </b-form-group>
      <b-form-group :label="$t('view.setting.common.defaultWorkspace')" label-cols="2">
        <b-form-select v-model="setting.workspace.defaultWorkspace" :options="workspace.defaultWorkspace"/>
      </b-form-group>
      <b-form-group :label="`${$t('view.setting.label.maxStorage')} (MB)`" label-cols="2" :description="`${$t('view.setting.label.min')} = 250`">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.maxStorage" min="250" type="number" readonly/>
      </b-form-group>
    </div>
    
    <div class="content-header"><h5 class="title">{{ $t('view.setting.label.resultCache') }}</h5></div>
    <div class="content-body">
      <b-form-group :label="`${$t('view.setting.label.size')} (MB)`" label-cols-sm="2">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.resultCacheSize" type="number" readonly/>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.label.project') }}</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.count')" label-cols-sm="2" :description="`${$t('view.setting.label.min')} = 10`">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.projectCount" min="10" type="number" readonly/>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.label.dataset') }}</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.count')" label-cols-lg="2" :description="`${$t('view.setting.label.min')} = 10`">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.datasetCount" min="10" type="number" readonly/>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.eventRepoPerDataset')" label-cols-lg="2" :description="`${$t('view.setting.label.min')} = 3`">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.datasetEventRepoPerDataset" min="3" type="number" readonly/>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.label.eventRepo') }}</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.maxRowUpload')" label-cols-lg="2" :description="`${$t('view.setting.label.min')} = 100,000`">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.eventRepoMaxRowUpload" min="100000" type="number" readonly/>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.label.processModel') }}</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.count')" label-cols-lg="2" :description="`${$t('view.setting.label.min')} = 30`">
        <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.workspace.processModelCount" min="30" type="number" readonly/>
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
    myInfo: 'sso/getMyInfo',
  }),
})
export default class Workspace extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  myInfo!: any;

  setting: ISetting = null;
  workspace: any = {};

  created() {
    this.onReset();
    this.workspace = JSON.parse(JSON.stringify($options)).default.workspace;
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