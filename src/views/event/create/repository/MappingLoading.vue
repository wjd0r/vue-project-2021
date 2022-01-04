<template>
    <div class="main-common-component filter-importing-component">
      <div class="filter-importing-content">
      
      <!-- back -->
      <Back @onClick="onClickBack()" :useCustom="true"/>
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFour mode="repository" :stage="3"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{eventCreateInfo.eventName}}</div>
        </div>
      </div>
      <!-- 정보 -->

      <div class="mapping-check-component">
        <div class="mapping-check-content">
          <!-- 검증중 -->
          <div class="text-center mapping-loading">
            <b-spinner :label="$t('view.repo.label.loading')"></b-spinner>
            <h1 class="title">{{$t('view.repo.label.loading')}}<!--데이터를 불러오는 중--></h1>
            <div class="notice-text">{{$t('view.repo.upload.wait')}}<!--잠시만 기다려주세요--></div>
          </div>
          <!-- 검증중 -->
        </div>
      </div>
      <!--<div class="bottom-component">
        <div class="bottom-content">
          <b-button variant="outline-primary" class="btn-back btn-outline-primary" @click.prevent="onClickBack">{{ $t('view.repo.button.before') }}</b-button>
          <div class="btn-group">
            <b-button variant="btn-secondary" class="btn-secondary" @click.prevent="onClickCancel">{{ $t('view.repo.button.exit') }}</b-button>
          </div>
        </div>
      </div>-->
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { UtilsMixin } from '@/mixin';
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Back from '../../../components/Back.vue';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';

@Component({
 components: {
   Back,
   FlowBarStepFour,
 },
 computed: mapGetters({
   eventCreateInfo: 'repository/getEventCreateInfo'
 }),
})
export default class MappingLoading extends Mixins(UtilsMixin) {

 /* Prop 선언 */
 @Prop()
 dataSetName: string;

 /* mapGetters 변수 선언 */
 eventCreateInfo!: any;


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
      name: 'RepositoryCreateForm',
      params: {
        notShowOverlay: 'true'
      }
    });
  }
}
</script>