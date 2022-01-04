<template>
  <div class="sample-component">
    <div class="content-header btn-toggle" v-b-toggle.sample visible>
      <h4 class="title">{{$t('view.repo.sampleEvents.title')}}<!--샘플 목록--></h4>
      <div class="count-text">({{sampleProject.length}})</div>
      <div class="right-align">
        <div class="ico-header ico-arrow-top" alt="드롭다운 버튼"></div>
      </div>
    </div>
    <b-collapse id="sample" visible>
      <div class="content-body row">
        <!-- <div class="nodata-text">목록이 없습니다.</div> -->


          <template v-if="isLoading">
              <b-spinner/>
          </template>
          <!-- card -->
          <div class="col-3 col-content" v-for="item in sampleProject" :key=item.key>
            <div class="card card-created sample" @click="clickSample(item)">
              <div class="content-header">
                <h5 class="title">{{$t('view.' + item.name)}}</h5>
              </div>
            </div>
          </div>
        <!-- card -->
        

        <!-- card -->
        <!--
        <div class="col-3 col-content">
          <div class="card card-created sample">
            <div class="content-header">
              <h5 class="title">금융대출</h5>
            </div>
          </div>
        </div>-->
        <!-- card -->

        <!-- card -->
        <!--
        <div class="col-3 col-content">
          <div class="card card-created sample">
            <div class="content-header">
              <h5 class="title">병원진료</h5>
            </div>
          </div>
        </div>-->
        <!-- card -->

        <!-- card -->
        <!--
        <div class="col-3 col-content">
          <div class="card card-created sample">
            <div class="content-header">
              <h5 class="title">항만물류</h5>
            </div>
          </div>
        </div>-->
        <!-- card -->

        <!-- card -->
        <!--
        <div class="col-3 col-content">
          <div class="card card-created sample">
            <div class="content-header">
              <h5 class="title">영업관리</h5>
            </div>
          </div>
        </div>-->
        <!-- card -->
      </div>
    </b-collapse>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { ISetting } from '@/interface';

@Component({
 components: {

 },
 computed: mapGetters({
   readOnlySetting: 'sso/getSetting',
 }),
})
export default class SampleRepository extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 readonly readOnlySetting!: ISetting;
 projectId!: any;


 /* 클래스 변수 선언 */
 sampleProject: any[] = [];

 isLoading: boolean = true;


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 
 created(){
   this.isLoading = true;
   this.$store.dispatch('repository/getRepoEventIndexSample', {}).then((res: any) => {
         const elements = res.data.data.elements;
         this.sampleProject = [];
         for(const key in elements){
            //const id = elements[key].project.id;
            this.sampleProject.push(elements[key]);
         }
         this.isLoading = false;
      });
   
 }
 
 /*
 mounted() {
   
 }
 */

 /* 메소드 선언 */
 clickSample(item: any) {
    
    /*this.$router.push({
      name: 'ProcessDiscovery',
      params: {
        projectId: 'iprdemo',
        repositoryId: item.id
      }
    });
    */


    const routerName = this.readOnlySetting.common.workspace.whenEventLogIsClicked;
    this.$router.push({ 
      name: routerName,
      params: {
        projectId: 'iprdemo',
        repositoryId: item.id
      }
    });
 }
}
</script>