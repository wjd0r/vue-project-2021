<template>
  <!-- 이벤트 정보 입력 -->
  <div class="flow brown">
    <div class="content-header">
      <h4 class="title">{{$t('view.repo.create.flowboxEventInput.title')}}</h4><!--이벤트 정보 입력-->
    </div>
    <div class="content-middle">
      <div class="ico-flow ico-log" alt="이벤트 아이콘"></div>
    </div>
    <div class="content-body">
      <p>
        {{$t('view.repo.create.flowboxEventInput.content')}}<!--생성할 이벤트 정보를 입력합니다.-->
      </p>
    </div>
  </div>
  <!-- 이벤트 정보 입력 -->
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
export default class FlowboxEventInput extends Vue {
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