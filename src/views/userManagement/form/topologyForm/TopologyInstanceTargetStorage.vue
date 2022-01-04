<template>
<!-- Target Storage 설정 -->
<div class="topologe-component target-storage-component">
  <div class="topologe-content target-storage-content">
    <div class="content-header">
      <h4 class="title" desc="Target Storage 설정">{{ $t('view.sso.topology.label.targetStorage') }}</h4>
    </div>
    <div class="content-body">
      <div class="form-content">
        <div class="content-header">
          <h5 class="title" desc="Buffer">{{ $t('view.sso.topology.label.buffer') }}</h5>
        </div>
        <div class="content-body">
          <b-form-group :label="$t('view.sso.topology.label.windowType')" desc="Window type" :label-cols="3">
            <b-select v-model="topology.bolts.streams[topology.flowstate-1].config.windowType" :options="topology.options.windowType"></b-select>
          </b-form-group>

          <b-form-group :label="$t('view.sso.topology.label.timeWindow')" desc="Time window (단위: 분)" :label-cols="3">
            <b-form-input v-model="topology.bolts.streams[topology.flowstate-1].config.timeWindow" type="time" :placeholder="$t('view.sso.topology.placeholder.enterNumber')" desc="숫자를 입력해주세요"></b-form-input>
          </b-form-group>

          <b-form-group :label="$t('view.sso.topology.label.dataLength')" desc="Data length" :label-cols="3">
            <b-form-input v-model="topology.bolts.streams[topology.flowstate-1].config.dataLength" type="number" :placeholder="$t('view.sso.topology.placeholder.enterNumber')" desc="숫자를 입력해주세요"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="form-content">
        <div class="content-header">
          <h5 class="title" desc="Target Storage">{{ $t('view.sso.topology.label.storage') }}</h5>
        </div>
        <div class="content-body">
          <b-form-group>
            <b-form-checkbox v-model="topology.bolts.streams[topology.flowstate-1].config.storageDB" name="all-column" desc="Store as table (DB)">{{ $t('view.sso.topology.label.storeAsTable') }}</b-form-checkbox>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="topology.bolts.streams[topology.flowstate-1].config.storageHDFS" name="all-column" desc="Store as filesystem (HDFS)">{{ $t('view.sso.topology.label.storeAsFilesystem') }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Target Storage 설정 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';

import Topology from '../../ts/Topology';
import { EventBus } from '@/common';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class TopologyInstanceTargetStorage extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;

  created() {
    // 다음 버튼 비활성화
    EventBus.$emit('nextButtonDisabled', true);
    
    // bolt 추가
    this.topology.addBolt();
  }
}
</script>