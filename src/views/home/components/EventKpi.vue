<template>
  <div class="kpi-component">
    <div class="kpi-content row">
      <!-- 총 데이터소스 -->
      <div class="col-4 col-content">
        <div class="card kpi blue">
          <div class="content-header">
            <div class="title">{{$t('view.repo.eventkpi.datasourceAll')}}<!--총 데이터 소스--></div>
          </div>
          <div class="content-body">
            <h1 class="value-text">{{dataSourceInfoCount.toLocaleString()}}</h1>
          </div>
        </div>
      </div>
      <!-- 총 데이터소스 -->

      <!-- 총 데이터소스 -->
      <div class="col-4 col-content">
        <div class="card kpi blue">
          <div class="content-header">
            <div class="title">{{$t('view.repo.eventkpi.eventlogAll')}}<!--총 이벤트로그--></div>
          </div>
          <div class="content-body">
            <h1 class="value-text">{{eventRepositoryCount.toLocaleString()}}</h1>
          </div>
        </div>
      </div>
      <!-- 총 데이터소스 -->

      <!-- 총 데이터소스 -->
      <div class="col-4 col-content">
        <div class="card kpi blue">
          <div class="content-header">
            <div class="title">{{$t('view.repo.eventkpi.standardProcessAll')}}<!--총 표준 프로세스--></div>
          </div>
          <div class="content-body">
            <h1 class="value-text">{{processModelCount.toLocaleString()}}</h1>
          </div>
        </div>
      </div>
      <!-- 총 데이터소스 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
 components: {

 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',
 }),
})
export default class EventKpi extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 projectId!: string;


 /* 클래스 변수 선언 */
 dataSourceInfoCount: number = 0;
 eventRepositoryCount: number = 0;
 processModelCount: number = 0;


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
 
 mounted() {
   

   this.$store.dispatch('repository/getRepoProjectView', {projectId: this.projectId })
   .then((res: any) => {
     this.eventRepositoryCount = res.data.data.resourceStatistics.eventRepositoryCount;
     this.processModelCount = res.data.data.resourceStatistics.processModelCount;
     this.dataSourceInfoCount = res.data.data.resourceStatistics.dataSourceInfoCount;

   });
 }
 

 /* 메소드 선언 */

}
</script>