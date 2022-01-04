<template>
<!-- 데이터셋 생성 -->
  <div class="main-common-component flowbox-component">
    <div class="flowbox-content">
      <div class="row row-content">
        <FlowboxDataInput class="disabled"/>

      <!-- <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>

      <FlowboxDataFilter @click.native="onClickDataFilter" /> -->

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>
      
      <FlowboxMapping @click.native="onClickDataMapping" />

      <div class="ico-arrow">
        <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
      </div>

      <FlowboxComplete @click.native="onClickComplete" />
      </div>
    </div>
  </div>
<!-- 데이터셋 생성 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import FlowboxDataInput from '../../../components/flows/flowbox/FlowboxDataInput.vue';
import FlowboxComplete from '../../../components/flows/flowbox/FlowboxComplete.vue';
import FlowboxDataFilter from '../../../components/flows/flowbox/FlowboxDataFilter.vue';
import FlowboxMapping from '../../../components/flows/flowbox/FlowboxMapping.vue';

import { UtilsMixin } from '@/mixin';

@Component({
 components: {
   FlowboxDataInput,
   FlowboxComplete,
   FlowboxDataFilter,
   FlowboxMapping,
 },
 computed: mapGetters({

 }),
})
export default class DatasetNextStep extends Mixins(UtilsMixin) {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */


 /* 클래스 변수 선언 */


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
 /*
 mounted() {
   
 }
 */

  /* 메소드 선언 */
  /*onClickDataFilter() {
    this.$router.push({
      name: 'DatasetDataFilterSelect',
    });
  }*/

  onClickDataMapping() {
    this.$router.push({
      name: 'DatasetMappingSelect',
    });
  }

  onClickComplete() {
    const datasetCreateInfo = this.$store.getters['repository/getDatasetCreateInfo'];
    const dataSetId = datasetCreateInfo.dataSetId;
    const selectedWorkspace = datasetCreateInfo.selectedWorkspace;

    this.$router.push({
      name: 'EventList',
      params: {
        selectedDataSetId: dataSetId,
        selectedWorkspace: selectedWorkspace
      }
    });
  }
}
</script>