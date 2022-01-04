<template>
<!-- topologe flowbar -->
<div class="flowbar-component">
  <div class="flowbar-content">
    <template v-if="topology.bolts.templateId >= 5">
      <div class="flowbar-group">
        <div class="flowbar flow-topologe">
          <div class="ico-topologe ico-folder" alt="폴더 아이콘"></div>
          <div class="content-header"><h5 class="title" desc="Stream Input 설정 1">{{ $t('view.sso.topology.label.streamInput1') }}</h5></div>
        </div>
        <div class="flowbar flow-topologe">
          <div class="ico-topologe ico-folder" alt="폴더 아이콘"></div>
          <div class="content-header"><h5 class="title" desc="Stream Input 설정 2">{{ $t('view.sso.topology.label.streamInput2') }}</h5></div>
        </div>
      </div>
      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <template v-if="topology.bolts.templateId <= 4">
      <div class="flowbar flow-topologe">
        <div class="ico-topologe ico-folder" alt="폴더 아이콘"></div>
        <div class="content-header"><h5 class="title" desc="Stream Input 설정">{{ $t('view.sso.topology.label.streamInput') }}</h5></div>
      </div>

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <template v-if="topology.bolts.templateId == 6 || topology.bolts.templateId == 8">
      <div class="flowbar-group">
        <div class="flowbar flow-topologe">
          <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
          <div class="content-header"><h5 class="title" desc="Data Preview 1">{{ $t('view.sso.topology.label.dataPreview1') }}</h5></div>
        </div>

        <div class="flowbar flow-topologe">
          <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
          <div class="content-header"><h5 class="title" desc="Data Preview 2">{{ $t('view.sso.topology.label.dataPreview2') }}</h5></div>
        </div>
      </div>
      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <template v-if="topology.bolts.templateId == 2 || topology.bolts.templateId == 4">
      <div class="flowbar flow-topologe">
        <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
        <div class="content-header"><h5 class="title" desc="Data Preview">{{ $t('view.sso.topology.label.dataPreview') }}</h5></div>
      </div>

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <template v-if="topology.bolts.templateId == 7 || topology.bolts.templateId == 8">
      <div class="flowbar-group">
        <div class="flowbar flow-topologe">
          <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
          <div class="content-header"><h5 class="title" desc="Filter Stream 1">{{ $t('view.sso.topology.label.filterStream1') }}</h5></div>
        </div>

        <div class="flowbar flow-topologe">
          <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
          <div class="content-header"><h5 class="title" desc="Filter Stream 2">{{ $t('view.sso.topology.label.filterStream2') }}</h5></div>
        </div>
      </div>
      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <template v-if="topology.bolts.templateId == 3 || topology.bolts.templateId == 4">
      <div class="flowbar flow-topologe">
        <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
        <div class="content-header"><h5 class="title" desc="Filter Stream">{{ $t('view.sso.topology.label.filterStream') }}</h5></div>
      </div>

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <template v-if="topology.bolts.templateId >= 5">
      <div class="flowbar flow-topologe">
        <div class="ico-topologe ico-flow-filter" alt="필터 아이콘"></div>
        <div class="content-header"><h5 class="title" desc="Join Stream">{{ $t('view.sso.topology.label.joinStream') }}</h5></div>
      </div>

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
    </template>

    <div class="flowbar flow-topologe">
      <div class="ico-topologe ico-database" alt="데이터베이스 아이콘"></div>
      <div class="content-header"><h5 class="title" desc="Target Storage 설정">{{ $t('view.sso.topology.label.targetStorage') }}</h5></div>
    </div>
  </div>
</div>
<!-- topologe flowbar -->
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
export default class TopologyFlowBar extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$parent.$data.topology;
  
}
</script>