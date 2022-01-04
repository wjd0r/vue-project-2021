<template>
<!-- 파이프라인 설정 > 완료 / 실패 -->
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

  <!-- complete -->
  <div class="importing-content check-content">
    <div class="text-center complete">
      <div class="ico-mapping ico-complete" alt="완료 아이콘"></div>
      <h1 class="title" desc="Topology 생성이 완료되었습니다.">{{ $t('view.sso.topology.label.complete') }}</h1>
      <div class="notice-text">{{$t('view.repo.label.completeClick')}}</div>
    </div>
  </div>
  <!-- complete -->

  <!-- error -->
  <!-- <div class="importing-content check-content">
    <div class="text-center error">
      <div class="ico-mapping ico-error" alt="실패 아이콘"></div>
      <h1 class="title">Topologe 생성이 실패하였습니다.</h1>
      <div class="notice-text">이전을 눌러 Pipeline 설정을 다시 해주세요.</div>
    </div>
    <div class="content-body">
      <div class="error-list-content">
        <div class="colunm">
          <div class="error-text">Error code: error message</div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- error -->

  <!-- bottom -->
  <!-- <div class="content-footer">
    <b-button variant="outline-primary" class="btn-outline-primary btn-back text-left" v-show="!isError">이전</b-button>
    <b-button variant="primary" class="btn-primary btn-exit" v-show="!isError">나가기</b-button>
    <b-button variant="primary" class="btn-primary btn-complete text-right" @click="onClickComplete">완료</b-button>
  </div> -->
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
export default class TopologyInstanceResult extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;

  created() {
    return
  }

  // 완료 버튼 클릭
  onClickComplete() {
    this.topology.initData();
    this.$parent.$emit('close');
  }
}
</script>