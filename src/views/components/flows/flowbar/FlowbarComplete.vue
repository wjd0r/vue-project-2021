<template>
  <!-- 완료 -->
  <div class="flowbar green" :class="{position: selected, 'position-none': !selected}">
    <div class="content-header">
      <div class="ico-flow ico-complete" alt="완료 아이콘"></div>
    </div>
    <div class="content-body">
      <div class="title">{{ $t('view.repo.create.process4title') }}</div>
    </div>
    <div class="content-footer">
      <div class="bar"></div>
    </div>
  </div>
  <!-- 완료 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component,Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
 components: {

 },
 computed: mapGetters({

 }),
})
export default class FlowbarComplete extends Vue {
 /* Prop 선언 */
  @Prop({})
  selected: boolean;

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