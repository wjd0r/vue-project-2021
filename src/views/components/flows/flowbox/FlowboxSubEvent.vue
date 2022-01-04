<template>
  <!-- 서브 이벤트 -->
  <div class="flow brown">
    <div class="content-header">
      <h4 class="title">{{$t('view.repo.flowBoxSubEvent.title')}}<!--서브 이벤트 정보 입력--></h4>
    </div>
    <div class="content-middle">
      <div class="ico-flow ico-log" alt="이벤트 아이콘"></div>
    </div>
    <div class="content-body">
      <p>
        {{$t('view.repo.flowBoxSubEvent.content')}}
        <!--하나의 이벤트로그를 여러개로 세분화하여 보기 원할 시 원하는 이벤트로그를 선택하여 서브이벤트를 생성합니다.-->
      </p>
    </div>
  </div>
  <!-- 서브 이벤트 -->
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

 }),
})
export default class FlowboxSubEvent extends Vue {
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

}
</script>