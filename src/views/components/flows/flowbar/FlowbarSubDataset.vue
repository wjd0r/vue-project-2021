<template>
  <!-- 데이터 정보 입력 -->
  <div class="flowbar blue" :class="{position: selected, 'position-none': !selected}">
    <div class="content-header">
      <div class="ico-flow ico-folder" alt="폴더 아이콘"></div>
    </div>
    <div class="content-body">
      <div class="title">{{$t('view.repo.flowBoxSubDataset.title')}}</div>
    </div>
    <div class="content-footer">
      <div class="bar"></div>
    </div>
  </div>
  <!-- 데이터 정보 입력 -->
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
export default class FlowbarSubDataset extends Vue {
  @Prop({})
  selected: boolean;
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