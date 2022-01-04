<template>
  <div class="form-content">
    <!-- <div class="preview-content"></div> -->
    <div class="content-header"><h5 class="title">Default</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.nodeKPI')" label-cols="2">
        <b-form-select v-model="setting.discovery.nodeText" :disabled="isMobileBlock()" @change="onChangeNodeText()">
          <template v-for="item, index in discovery.nodeText">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.connectorKPI')" label-cols="2">
        <b-form-select v-model="setting.discovery.arcText" :disabled="isMobileBlock()" @change="onChangeArcText()">
          <template v-for="item, index in discovery.arcText">
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
export default class Discovery extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  setting: ISetting = null;
  discovery: any;

  created() {
    this.onReset();
    this.discovery = JSON.parse(JSON.stringify($options)).default.process.discovery;
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

  onChangeNodeText() {
    if(this.setting.discovery.nodeText == 'reworks.total' && this.setting.discovery.arcText == 'bottlenecks') {
      this.setting.discovery.arcText = 'statistics.d';
    }
  }

  onChangeArcText() {
    if(this.setting.discovery.nodeText == 'reworks.total' && this.setting.discovery.arcText == 'bottlenecks') {
      this.setting.discovery.nodeText = 'statistics.count';
    }
  }
}
</script>