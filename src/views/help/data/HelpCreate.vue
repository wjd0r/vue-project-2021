<template>
  <!-- 도움말 : 데이터 생성하기 -->
  <div class="help-component">
    <div class="content-header"><h2 class="title">{{$t('view.helpCreate.createData')}}</h2></div>
    <div class="content-body">
      <!-- 데이터셋 생성하기 -->
        <HelpCreateDataset/>
      <!-- 데이터셋 생성하기 -->

      <!-- 데이터 필터 -->
      <HelpDataFilter/>
      <!-- 데이터 필터 -->

      <!-- 이벤트로그 생성하기 -->
      <HelpCreateEvent/>
      <!-- 이벤트로그 생성하기 -->

      <!-- 이벤트 필터 -->
      <HelpEventFilter/>
      <!-- 이벤트 필터 -->

      <!-- 표준 프로세스 생성하기 -->
      <HelpCreateStandard/>
      <!-- 표준 프로세스 생성하기 -->

      <!-- 데이터 소스 생성하기 -->
      <HelpCreateDatabase/>
      <!-- 데이터 소스 생성하기 -->

    </div>
  </div>
  <!-- 도움말 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpCreateDataset from './create/HelpCreateDataset.vue';
import HelpCreateEvent from './create/HelpCreateEvent.vue';
import HelpCreateStandard from './create/HelpCreateStandard.vue';
import HelpCreateDatabase from './create/HelpCreateDatabase.vue';
import HelpDataFilter from './create/HelpDataFilter.vue';
import HelpEventFilter from './create/HelpEventFilter.vue';

@Component({
  components: {
    HelpCreateDataset,
    HelpCreateEvent,
    HelpCreateStandard,
    HelpCreateDatabase,
    HelpDataFilter,
    HelpEventFilter
  },
  computed: mapGetters({}),
})
export default class HelpCreate extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 메소드 선언 */
}
</script>