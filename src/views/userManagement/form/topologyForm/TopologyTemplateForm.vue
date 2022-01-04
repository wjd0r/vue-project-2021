<template>
<!-- 토폴로지 보기 -->
<div class="template-input-component">
  <div class="template-input-content">
    <div class="content-header">
      <h4 class="title" desc="Topology Template Properties">{{ $t('view.sso.topology.label.templateProperties') }}</h4>
      <!-- <div class="right-align">
        <span class="notice-text">(*) {{ $t('view.sso.label.required') }}</span>
      </div> -->
    </div>
    <div class="content-body">
      <!-- input -->
      <div class="form-content">
        <b-form-group label="Topology Name" :label-cols="3">
          <b-form-input type="text" maxlength="20" :placeholder="$t('view.sso.topology.placeholder.enterTopologyName')" desc="Topology Name을 입력해주세요" :value="topology.data.templates[topology.bolts.templateId-1].topologyName" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Topology Description" :label-cols="3">
          <b-form-input type="text" maxlength="20" :placeholder="$t('view.sso.topology.placeholder.enterTopologyDescription')" desc="Topology Description을 입력해주세요" :value="topology.data.templates[topology.bolts.templateId-1].description" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Creation Date" :label-cols="3">
          <b-form-input type="text" maxlength="20" placeholder="" disabled></b-form-input>
        </b-form-group>
      </div>
      <!-- input -->
    </div>
    
    <!-- flow -->
    <TopologyFlowBar/>
    <!-- flow -->
  </div>

  <!-- flow decription -->
  <div class="flow-description-content">
    <div class="content-header"><h4 class="title" desc="Topology Flow Description">{{ $t('view.sso.topology.label.flowDescription') }}</h4></div>
    <div class="content-body">
      <div class="flow-description">
        <div class="content-sub-header"><h5 class="title" desc="Stream Input 설정">{{ $t('view.sso.topology.label.streamInput') }}</h5></div>
        <div class="content-sub-body" desc="Stream 설정할 수 있습니다.">
          {{ $t('view.sso.topology.label.streamSetting') }}
        </div>
      </div>
      <div class="flow-description">
        <div class="content-sub-header"><h5 class="title" desc="Data Preview">{{ $t('view.sso.topology.label.dataPreview') }}</h5></div>
        <div class="content-sub-body" desc="Data Preview에서 타입을 선택할 수 있습니다.">
          {{ $t('view.sso.topology.label.typeSelect') }}
        </div>
      </div>
      <div class="flow-description">
        <div class="content-sub-header"><h5 class="title" desc="Filter Stream">{{ $t('view.sso.topology.label.filterStream') }}</h5></div>
        <div class="content-sub-body" desc="Data Preview에서 선택된 항목을 filter 할 수 있습니다.">
          {{ $t('view.sso.topology.label.filter') }}
        </div>
      </div>
      <div class="flow-description">
        <div class="content-sub-header"><h5 class="title" desc="Join Stream">{{ $t('view.sso.topology.label.joinStream') }}</h5></div>
        <div class="content-sub-body" desc="두 개의 컨텐츠를 하나로 합칠 수 있습니다.">
          {{ $t('view.sso.topology.label.contentIntoOne') }}
        </div>
      </div>
      <div class="flow-description">
        <div class="content-sub-header"><h5 class="title" desc="Target Storage 설정">{{ $t('view.sso.topology.label.targetStorage') }}</h5></div>
        <div class="content-sub-body" desc="Target Storage 설정합니다.">
          {{ $t('view.sso.topology.label.targetStorageSetting') }}
        </div>
      </div>
    </div>
  </div>
  <!-- flow decription -->
</div>
<!-- 토폴로지 보기 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';

import Topology from '../../ts/Topology';
import TopologyFlowBar from './TopologyFlowBar.vue';

@Component({
 components: {
   TopologyFlowBar,
 },
 computed: mapGetters({
 }),
})
export default class TopologyTemplateForm extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;

  created() {
    return
  }
}
</script>