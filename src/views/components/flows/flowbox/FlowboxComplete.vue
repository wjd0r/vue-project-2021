<template>
  <!-- 완료 -->
  <div class="flow green" :class="{ disabled: $attrs.disabled }">
    <div class="content-header">
      <h4 class="title">{{ $t('view.repo.create.process4title') }}</h4>
    </div>
    <div class="content-middle">
      <div class="ico-flow ico-complete" alt="폴더 아이콘"></div>
    </div>
    <div class="content-body">
      <p>
        <template v-if="completeMessage !== undefined">
          {{ $t(`view.repo.create.flowbox.${completeMessage}`) }}
        </template>
        <template v-else>
          {{ $t('view.repo.create.process4label') }}
        </template>
      </p>
    </div>
  </div>
  <!-- 완료 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class FlowboxComplete extends Vue {
  /* Prop 선언 */
  @Prop({})
  completeMessage?: string;

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