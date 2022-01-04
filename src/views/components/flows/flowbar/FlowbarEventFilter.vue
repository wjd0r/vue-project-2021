<template>
  <!-- 이벤트 필터 -->
  <div class="flowbar purple">
    <div class="content-header">
      <div class="ico-flow ico-flow-filter" alt="필터 아이콘"></div>
    </div>
    <div class="content-body">
      <div class="title">{{$t('view.repo.create.flowboxEventFilter.title')}}</div>
    </div>
    <div class="content-footer">
      <div class="bar"></div>
    </div>
  </div>
  <!-- 이벤트 필터 -->
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
export default class FlowbarEventFilter extends Vue {
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