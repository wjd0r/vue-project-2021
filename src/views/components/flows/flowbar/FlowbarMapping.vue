<template>
  <!-- 데이터 매핑 -->
  <div class="flowbar brown" :class="{position: selected, 'position-none': !selected}">
    <div class="content-header">
      <div class="ico-flow ico-flow-mapping" alt="데이터 매핑 아이콘"></div>
    </div>
    <div class="content-body">
      <div class="title">{{ $t('view.repo.create.process3title') }}</div>
    </div>
    <div class="content-footer">
      <div class="bar"></div>
    </div>
  </div>
  <!-- 데이터 매핑 -->
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
export default class FlowbarMapping extends Vue {
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