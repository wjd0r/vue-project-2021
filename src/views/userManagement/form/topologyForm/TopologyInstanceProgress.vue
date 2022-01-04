<template>
<!-- 파이프라인 설정 > 로딩 -->
<div class="topologe-content plipeline-check-content">
  <!-- inf -->
  <div class="inf-component">
    <div class="inf-content">
      <div class="content-header" desc="Topology Template Name">{{ $t('view.sso.topology.label.templateName') }}</div>
      <div class="content-body">{{topology.data.templates[topology.bolts.templateId-1].topologyName}}</div>
    </div>
    <div class="inf-content">
      <div class="content-header" desc="Topology Instance Name">{{ $t('view.sso.topology.label.instanceName') }}</div>
      <div class="content-body">{{topology.bolts.instanceName}}</div>
    </div>
  </div>
  <!-- inf -->

  <!-- progress -->
  <div class="importing-content check-content">
    <div class="text-center">
      <h1 class="title" desc="Topology를 생성하는 중입니다.">{{ $t('view.sso.topology.label.createing') }}</h1>
      <div class="loading-text" >{{ $t('view.repo.upload.wait') }}</div>
    </div>
  </div>
  <!-- progress -->
</div>
<!-- 파이프라인 설정 > 로딩 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';

import Topology from '../../ts/Topology';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class TopologyInstanceProgress extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;

  created() {
    return
  }
}
</script>