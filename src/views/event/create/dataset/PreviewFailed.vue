<template>
    <div class="main-common-component  imporing-component">
      <div class="importing-content">

      <!-- back -->
      <Back @onClick="onClickBack()" :useCustom="true"/>
      <!-- back -->
      
      <!-- flowbar -->
      <FlowBarStepFour mode="dataset" :stage="1"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetName') }}</div>
          <div class="content-body">{{datasetCreateInfo.datasetName}}</div>
        </div>
        <!--<div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{datasetCreateInfo.eventName}} </div>
        </div>-->
      </div>
      <!-- 정보 -->

      <div class="importing-content">
        <div class="text-center">
          <div class="ico-mapping ico-error" alt="에러아이콘"></div>
          <h1 class="title"><p class="text-error">{{ $t('view.repo.import.confirm') }}</p></h1>
            <div class="notice-text">{{ $t('view.repo.import.mappingBackPreview') }}</div>
        </div>
        <div class="content-body">
            <div class="error-list-content">
              <div class="error-text">
                <div class="colunm-text">{{'[' + errorMsg + '] ' + $t('view.repo.alert.' + errorMsg)}}<!--Error code: error message--></div>
              </div>
            </div>
          </div>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <b-button variant="outline-primary" class="btn-back btn-outline-primary" @click.prevent="onClickBack">{{ $t('view.repo.button.before') }}</b-button>
          <div class="btn-group">
            <b-button variant="btn-secondary" class="btn-secondary" @click.prevent="onClickCancel">{{ $t('view.repo.button.exit') }}</b-button>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { UtilsMixin } from '@/mixin';
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';
import Back from '../../../components/Back.vue';

@Component({
 components: {
   FlowBarStepFour,
   Back,
 },
 computed: mapGetters({
   datasetCreateInfo: 'repository/getDatasetCreateInfo',
 }),
})
export default class PreviewFailed extends Mixins(UtilsMixin) {
  datasetCreateInfo!: any;

 /* Prop 선언 */
 @Prop()
 errorMsg: string;

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
 onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'DatasetCreateForm',
      params: {
        notShowOverlay: 'true'
      }
    });
  }
}
</script>