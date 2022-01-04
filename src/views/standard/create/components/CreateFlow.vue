<template>
  <div class="main-common-component flowbox-component standard-flowbox" :class="`lang-${$i18n.locale}`">
    <div class="flowbox-content row">
      <!-- 생성 과정 -->
      <div class="create-flow-component">
        <div class="create-flow-content">
          <div class="content-header">
            <h4 class="title">{{ $t('view.repo.create.flowbox.standard.title') }}</h4>
          </div>
          <div class="content-body">
            <div class="row row-content create-flow">
              <FlowboxStandard />

              <div class="ico-arrow">
                <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
              </div>

              <FlowboxProcessEditor class="disabled" />

              <div class="ico-arrow">
                <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
              </div>

              <FlowboxComplete class="disabled" completeMessage="standard.complete" />
            </div>
          </div>
          <div class="content-footer">
            <div class="day-hide">
              <b-form-checkbox id="dayHide" v-model="sightDay" name="day-hide">{{$t('view.repo.create.doNotDay')}}</b-form-checkbox>
            </div>
            <b-button variant="primary" class="btn-primary btn-next" @click="$emit('close')">{{ $t('view.repo.button.next') }}</b-button>
          </div>
        </div>
      </div>
      <!-- 생성 과정 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import FlowboxComponent from '@/views/components/flows/flowbox';

@Component({
  components: {
    ...FlowboxComponent,
  },
  computed: mapGetters({}),
})
export default class StandardCreateFlow extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  sightDay: boolean = false;

  /* refs 선언 */
  /* Watch 선언 */
  @Watch('sightDay')
  onSightDay() {
    this.$emit('onSightDay', this.sightDay);
  }
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