<template>
  <!-- 이벤트 생성 -->
  <div class="main-common-component flowbox-component">
    <div class="flowbox-content">
      <div class="row row-content">
        <FlowboxEventInput class="disabled"/>

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
        
        <FlowboxComplete class="disabled"/>
      </div>

      <!-- 서브이벤트 생성 -->
      <!--<div class="row row-content">
        <FlowboxSubEvent class="disabled"/>

        <div class="ico-arrow">
          <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
        </div>

        <FlowboxEventFilter :datasetId="datasetId"/>

        <div class="ico-arrow">
          <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
        </div>
        
        <FlowboxComplete class="disabled"/>
      </div>-->
      <!-- 서브이벤트 생성 -->
    </div>
  </div>
  <!-- 이벤트 생성 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import FlowboxDataInput from '../../../components/flows/flowbox/FlowboxDataInput.vue';
import FlowboxComplete from '../../../components/flows/flowbox/FlowboxComplete.vue';
import FlowboxDataFilter from '../../../components/flows/flowbox/FlowboxDataFilter.vue';
import FlowboxEventFilter from '../../../components/flows/flowbox/FlowboxEventFilter.vue';
import FlowboxEventInput from '../../../components/flows/flowbox/FlowboxEventInput.vue';
import FlowboxList from '../../../components/flows/flowbox/FlowboxList.vue';
import FlowboxMapping from '../../../components/flows/flowbox/FlowboxMapping.vue';
import FlowboxSubEvent from '../../../components/flows/flowbox/FlowboxSubEvent.vue';

@Component({
 components: {
   FlowboxDataInput,
   FlowboxComplete,
   FlowboxDataFilter,
   FlowboxEventFilter,
   FlowboxEventInput,
   FlowboxList,
   FlowboxMapping,
   FlowboxSubEvent,
 },
 computed: mapGetters({

 }),
})
export default class RepositoryNextStep extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */


 /* 클래스 변수 선언 */


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /*
 created(){
 }*/
 
 /*
 mounted() {
   
 }
 */

  onClickDataFilter() {
    this.$router.push({ 
      name: 'RepositoryDataFilterSelect',
      //params: {
      //  dataSetId: this.$route.params.dataSetId,
      //  dataSetName: this.$route.params.dataSetName,
      //  eventName:  this.$route.params.eventName,
      //  eventDesc: this.$route.params.eventDesc
      //}
    });
  }

  onClickDataMapping() {
    this.$router.push({
      name: 'RepositoryMappingSelect',
      //params: {
      //  dataSetId: this.$route.params.dataSetId,
      //  dataSetName: this.$route.params.dataSetName,
      //  eventName:  this.$route.params.eventName,
      //  eventDesc: this.$route.params.eventDesc
      //}
    });
  }

 /* 메소드 선언 */
}
</script>