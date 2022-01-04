<template>
  <!-- 이벤트 필터 -->
  <div class="flow purple" @click="move()">
    <div class="content-header">
      <h4 class="title">{{$t('view.repo.create.flowboxEventFilter.title')}}</h4>
    </div>
    <div class="content-middle">
      <div class="ico-flow ico-flow-filter" alt="필터 아이콘"></div>
    </div>
    <div class="content-body">
      <p>
        {{$t('view.repo.create.flowboxEventFilter.content')}}<!--선택한 이벤트로그에 여러 필터를 사용하여 유동적인 결과를 확인할 수 있습니다. 하나의 이벤트로그에 대한 다양한 결과값을 저장하게에 효과적입니다.-->
      </p>
    </div>
  </div>
  <!-- 프로세스 분석 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
 components: {

 },
 computed: mapGetters({

 }),
})
export default class FlowboxEventFilter extends Vue {
 /* Prop 선언 */
 @Prop()
 datasetId: string;

 @Prop()
 dataSetName: string;

 @Prop()
 disabled: boolean;

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
 move() {

   if(this.disabled) return;

   this.$router.push({
    name: 'SubRepositoryFilter',
    //params: {
    // dataSetId: this.datasetId,
    //  dataSetName: this.dataSetName
    //}
  });
 }

}
</script>