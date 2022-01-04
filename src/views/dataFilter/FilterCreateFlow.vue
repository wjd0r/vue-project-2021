<template>
  <div class="main-common-component flowbox-component" :class="`lang-${$i18n.locale}`">
    <div class="flowbox-content row">
      <!-- 생성 과정 -->
      <div class="create-flow-component">
        <div class="create-flow-content" v-on:click.stop="hide=null">
          <div class="content-header">
            <h4 class="title">{{$t('view.repo.subDatasetCreateFlow.subDatasetCreateProgress')}}</h4>
          </div>
          <div class="content-body">
            <div class="row row-content create-flow">
              <FlowboxSubDataset/>

              <div class="ico-arrow">
                <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
              </div>

              <FlowboxDataFilter :disabled="'disabled'"/>

              <!--<div class="ico-arrow">
                <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
              </div>
              
              <FlowboxMapping :disabled="'disabled'"/>-->

              <div class="ico-arrow">
                <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
              </div>

              <FlowboxComplete :disabled="'disabled'"/>
            </div>
          </div>
          <div class="content-footer">
            <div class="day-hide">
              <b-form-checkbox  id="dayHide" name="day-hide" v-model="sightDay" :disabled="isLoading">{{ $t('view.repo.create.doNotDay') }}</b-form-checkbox>
            </div>
            <b-button variant="primary" class="btn-primary btn-next" @click="$emit('close')">{{ $t('view.repo.create.next') }}</b-button>
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
import { UtilsMixin } from '@/mixin';
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import FlowboxSubDataset from '../components/flows/flowbox/FlowboxSubDataset.vue';
import FlowboxComplete from '../components/flows/flowbox/FlowboxComplete.vue';
import FlowboxDashboard from '../components/flows/flowbox/FlowboxDashboard.vue';
import FlowboxDataFilter from '../components/flows/flowbox/FlowboxDataFilter.vue';
import FlowboxDiscovery from '../components/flows/flowbox/FlowboxDiscovery.vue';
import FlowboxEventFilter from '../components/flows/flowbox/FlowboxEventFilter.vue';
import FlowboxEventInput from '../components/flows/flowbox/FlowboxEventInput.vue';
import FlowboxList from '../components/flows/flowbox/FlowboxList.vue';
import FlowboxMapping from '../components/flows/flowbox/FlowboxMapping.vue';
import FlowboxProcessEditor from '../components/flows/flowbox/FlowboxProcessEditor.vue';
import FlowboxStandard from '../components/flows/flowbox/FlowboxStandard.vue';
import FlowboxSubEvent from '../components/flows/flowbox/FlowboxSubEvent.vue';
import FlowboxEditorManual from '../components/flows/flowbox/FlowboxEditorManual.vue';
import FlowboxEditorAuto from '../components/flows/flowbox/FlowboxEditorAuto.vue';

@Component({
 components: {
   FlowboxSubDataset,
   FlowboxComplete,
   FlowboxDashboard,
   FlowboxDataFilter,
   FlowboxDiscovery,
   FlowboxEventFilter,
   FlowboxEventInput,
   FlowboxList,
   FlowboxMapping,
   FlowboxProcessEditor,
   FlowboxStandard,
   FlowboxSubEvent,
   FlowboxEditorManual,
   FlowboxEditorAuto
 },
 computed: mapGetters({

 }),
})
export default class FilterCreateFlow extends Mixins(UtilsMixin) {
  sightDay: boolean = false;

  @Watch('sightDay')
  onSightDay() {
    this.$emit('onSightDay', this.sightDay);
  }


 /* Prop 선언 */
  @Prop()
  isLoading!: boolean;

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