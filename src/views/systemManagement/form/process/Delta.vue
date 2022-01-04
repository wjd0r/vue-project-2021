<template>
  <div class="form-content">
    <!-- <div class="preview-content"></div> -->
    <div class="content-header"><h5 class="title">Default</h5></div>
    <div class="content-body">
      <b-form-group :label="$t('view.setting.label.nodeKPI')" label-cols="2">
        <b-form-select v-model="setting.delta.nodeText" :disabled="isMobileBlock()">
          <template v-for="item, index in delta.nodeText">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.connectorKPI')" label-cols="2">
        <b-form-select v-model="setting.delta.arcText" :disabled="isMobileBlock()">
          <template v-for="item, index in delta.arcText">
            <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group :label="$t('view.setting.label.howToView')" label-cols="2">
        <b-form-select v-model="setting.delta.viewMode" :disabled="isMobileBlock()">
          <template v-for="item, index in delta.viewMode">
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
export default class Delta extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  setting: ISetting = null;
  delta: any;

  created() {
    this.onReset();
    this.delta = JSON.parse(JSON.stringify($options)).default.process.delta;
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