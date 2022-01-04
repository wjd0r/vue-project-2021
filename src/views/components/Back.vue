<template>
  <div class="back-component">
    <div class="back-content">
      <div class="back" v-show="!notSee">
        <div class="ico-arrow-left" alt="왼쪽 방향 아이콘"></div>
        <div class="back-text" @click="onClickBack()">{{ $t('view.repo.label.back') }}</div>
      </div>
    </div>
  </div>
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
export default class Back extends Vue {
  @Prop({ default: false })
  useCustom: boolean;
 /* Prop 선언 */
 @Prop()
 notSee: boolean;

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
  onClickBack() {
    if (this.useCustom) {
      this.$emit('onClick');
    } else {
      window.history.back();
    }
  }

}
</script>