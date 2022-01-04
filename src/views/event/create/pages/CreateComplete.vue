<template>
  <div class="main-common-component flowbox-component complete-component mapping-component">
    <div class="flowbox-content complete-content mapping-content">

      <div v-if="which == 'dataset'">
      <!-- flowbar -->
      <FlowBarStepFour mode="dataset" :stage="4"/><!--isSuccess ? 4 : 3-->
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetName') }}</div>
          <div class="content-body">{{datasetCreateInfo.datasetName}}</div>
        </div>
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{datasetCreateInfo.eventName}} </div>
        </div>
      </div>
      <!-- 정보 -->
      </div>

      <div v-else-if="which == 'repository'">
      <!-- flowbar -->
      <FlowBarStepFour mode="repository" :stage="4"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{eventCreateInfo.eventName}}</div>
        </div>
      </div>
      <!-- 정보 -->
      </div>
      
      <div class="row row-content">
        <!-- 데이터 요약 -->
        <FlowboxDashboard @click.native="onClickDashboard" />
        <!-- 데이터 요약 -->

        <!-- 프로세스 분석 -->
        <FlowboxDiscovery @click.native="onClickDiscovery" />
        <!-- 프로세스 분석 -->

        <!-- 목록 -->
        <FlowboxList @click.native="onClickList" />
        <!-- 목록 -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { UtilsMixin } from '@/mixin';
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import FlowboxDashboard from '../../../components/flows/flowbox/FlowboxDashboard.vue';
import FlowboxDiscovery from '../../../components/flows/flowbox/FlowboxDiscovery.vue';
import FlowboxList from '../../../components/flows/flowbox/FlowboxList.vue';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';

@Component({
 components: {
   FlowboxDashboard,
   FlowboxDiscovery,
   FlowboxList,
   FlowBarStepFour
 },
 computed: mapGetters({
   datasetCreateInfo: 'repository/getDatasetCreateInfo',
   eventCreateInfo: 'repository/getEventCreateInfo',
 }),
})
export default class EventCreateComplete extends Mixins(UtilsMixin) {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 datasetCreateInfo!: any;
 eventCreateInfo!: any;

 /* 클래스 변수 선언 */
  dataSetName: string = '';
  dataSetId: string = '';
  eventName: string = '';
  eventDesc: string = '';
  repositoryId: string = '';
  resourceGroupId: string = '';
  selectedWorkspace: string = null;

  which: string = '';


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 
 created(){
    const eventCreateInfo = this.$store.getters['repository/getEventCreateInfo'];

    //this.dataSetId = eventCreateInfo.dataSetId;
    //this.dataSetName = eventCreateInfo.dataSetName;
    //this.eventName = eventCreateInfo.eventName;
    //this.eventDesc = eventCreateInfo.eventDesc;
    //this.repositoryId = eventCreateInfo.repositoryId;

    const datasetCreateInfo = this.$store.getters['repository/getDatasetCreateInfo'];

    this.which = this.$store.getters['repository/getWhich'];

    // if(this.$route.params.which == 'dataset') {
    if(this.which == 'dataset') {
      this.repositoryId = datasetCreateInfo.repositoryId;
      this.dataSetId = datasetCreateInfo.dataSetId;
      this.selectedWorkspace = datasetCreateInfo.selectedWorkspace;
    // }else if(this.$route.params.which == 'repository') {
    }else if(this.which == 'repository') {
      this.repositoryId = eventCreateInfo.repositoryId;
      this.dataSetId = eventCreateInfo.dataSetId;
      this.selectedWorkspace = eventCreateInfo.selectedWorkspace;
    }

 }
 
 /*
 mounted() {
   
 }
 */

  /* 메소드 선언 */
  onClickDashboard() {
    this.$router.push({
      name: 'Dashboard',
      params: {
        projectId: this.$store.getters['sso/getProjectId'],//this.$route.params.projectId,
        repositoryId: this.repositoryId, //this.$route.params.repositoryId,
      },
    });
  }

  onClickDiscovery() {
    this.$router.push({
      name: 'ProcessDiscovery',
      params: {
        projectId: this.$store.getters['sso/getProjectId'],//this.$route.params.projectId,
        repositoryId: this.repositoryId,//this.$route.params.repositoryId,
      },
    });
  }

  onClickList() {
    this.$router.push({
      name: 'EventList',
      params: {
        selectedDataSetId: this.dataSetId,
        selectedWorkspace: this.selectedWorkspace
      }
    });
  }
}
</script>