<template>
  <!-- 표준프로세스 -->
  <div class="main-common-component flowbox-component">
    <div class="flowbox-content">
      <div class="row row-content">
        <FlowboxStandard class="disabled" />

        <div class="ico-arrow">
          <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
        </div>

        <FlowboxProcessEditor @click.passive.native="onClickGoProcessEditor()" />

        <div class="ico-arrow">
          <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
        </div>

        <FlowboxComplete completeMessage="standard.complete" @click.passive.native="onClickGoStandardList()" />
      </div>
    </div>
  </div>
  <!-- 표준프로세스 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { IKeyValueObject } from '@/interface';

import FlowboxStandard from '../../components/flows/flowbox/FlowboxStandard.vue';
import FlowboxComplete from '../../components/flows/flowbox/FlowboxComplete.vue';
import FlowboxProcessEditor from '../../components/flows/flowbox/FlowboxProcessEditor.vue';

@Component({
  components: {
    FlowboxStandard,
    FlowboxComplete,
    FlowboxProcessEditor,
  },
  computed: mapGetters({
    process: 'standard/getProcess',
  }),
})
export default class StandardNextStep extends Vue {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */
  process!: IKeyValueObject;

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

  onClickGoProcessEditor() {
    this.$router.push({
      name: 'ProcessEditor',
      params: {
        processId: this.process.id,
      },
    });
  }

  onClickGoStandardList() {
    this.$router.push({
      name: 'StandardList',
    });
  }
}
</script>