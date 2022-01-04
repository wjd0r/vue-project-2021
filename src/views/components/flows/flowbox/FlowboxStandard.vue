<template>
  <!-- 표준 프로세스 -->
  <div class="flow purple">
    <div class="content-header">
      <h4 class="title">{{ $t('view.repo.create.flowbox.standard.create.title') }}</h4>
    </div>
    <div class="content-middle">
      <div class="ico-flow ico-flow-standard" alt="표준 프로세스 아이콘"></div>
    </div>
    <div class="content-body">
      <p>
        {{ $t('view.repo.create.flowbox.standard.create.content') }}
      </p>
    </div>
  </div>
  <!-- 표준 프로세스 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class FlowboxStandard extends Vue {
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