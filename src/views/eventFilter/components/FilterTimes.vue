<template>
  <!-- 시간 필터 -->
  <div class="filter-setting-component">
    <div class="filter-setting-content">
      <div class="content-header">
        <h4 class="title">{{$t('view.repo.repositoryFilter.timeFilter')}}<!--시간 필터--></h4>
      </div>
      <div class="content-body setting-content">
        <div class="timestamp-component">
          <!-- 일시 표현 -->
          <div class="timestamp-content">
            <div class="content-header"><div class="title">{{$t('view.repo.repositoryFilter.time.wholeTerm')}}<!--전체 기간--></div></div>
            <div class="card timestamp">
              <div class="content-header">
                <div class="title">{{$t('view.repo.repositoryFilter.time.startDateTime')}}<!--시작 일시--></div>
              </div>
              <div class="content-body">
                <h2 class="content-text">{{startDateTime}}</h2>
              </div>
            </div>
            <div class="card timestamp">
              <div class="content-header">
                <div class="title">{{$t('view.repo.repositoryFilter.time.endDateTime')}}<!--종료 일시--></div>
              </div>
              <div class="content-body">
                <h2 class="content-text">{{endDateTime}}</h2>
              </div>
            </div>
          </div>
          <!-- 일시 표현 -->

          <!-- 케이스 포함 타입 -->
          <div class="type-content">
            <div class="content-header">
              <div class="title">{{$t('view.repo.repositoryFilter.time.caseIncludingType')}}<!--케이스 포함 타입--></div>
              <div class="type-text">{{keepCasesText}}<!--Sarts at the 시작점--></div>
            </div>
            <div class="content-body">
              <div class="img-timestamp">
                <div class="img-filter img-filter-time-01" alt="Trim" v-if="keepCases == 'TRIM'"></div>
                  <div class="img-filter img-filter-time-02" alt="Starts At The 시작점" v-if="keepCases == 'STARTED'"></div>
                  <div class="img-filter img-filter-time-03" alt="Contains within 시작 & 종료점" v-if="keepCases == 'CONTAINED'"></div>
                  <div class="img-filter img-filter-time-04" alt="Intersects within 시작 & 종료점" v-if="keepCases == 'INTERSECTING'"></div>
                  <div class="img-filter img-filter-time-05" alt="Finish at the 종료점" v-if="keepCases == 'COMPLETED'"></div>
              </div>
            </div>
            {{$t('view.repo.repositoryFilter.time.caseIncludingTypeText')}}<!--(*현재 설정을 따름. 설정 페이지에서 변경 가능)-->
          </div>
          <!-- 케이스 포함 타입 -->
        </div>

        <!-- 일시 설정 -->
        <div class="select-content">
          <div class="start-timestamp timestamp">
            <div class="content-header">
              <div class="title">{{$t('view.repo.repositoryFilter.time.startConfiguration')}}<!--시작 일시 설정--></div>
            </div>
            <div class="content-body">
              <DatePicker :is-inline="true" mode="date" title-position="center" color="red" v-model="durationStart" :from-date="durationStart" :min-date="min" :max-date="max"/>
              <b-form-input type="time" step="2" v-model="startTime"></b-form-input>
            </div>
            <!-- <div class="content-footer">
              <b-button @click="onClickStart()" variant="primary" class="btn-apply">적용</b-button>
            </div> -->
          </div>
          <div class="end-timestamp timestamp">
            <div class="content-header">
              <div class="title">{{$t('view.repo.repositoryFilter.time.endConfiguration')}}<!--종료 일시 설정--></div>
            </div>
            <div class="content-body">
              <DatePicker :is-inline="true" mode="date" title-position="center" color="red" v-model="durationEnd" :from-date="durationEnd" :min-date="min" :max-date="max"/>
              <b-form-input type="time" step="2" v-model="endTime"></b-form-input>
            </div>
            <!-- <div class="content-footer">
              <b-button @click="onClickEnd()" variant="primary" class="btn-apply">적용</b-button>
            </div> -->
          </div>
        </div>
        <!-- 일시 설정 -->
      </div>
    </div>
  </div>
  <!-- 시간 필터 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { DatePicker } from 'v-calendar';
import { utils } from '@/common';
import moment from 'moment';
import { IFilter, IKeyValueObject } from '@/interface';
import { BFormDatepicker } from 'bootstrap-vue';
import { ISetting } from '@/interface';
import _ from 'lodash';



@Component({
  components: {
    DatePicker,
  },
 computed: mapGetters({
    eventView: 'repository/getRepoEventView',
    readOnlySetting: 'sso/getSetting',

 }),
})
export default class FilterTimes extends Vue {
 /* Prop 선언 */
 @Prop()
 selectedItem: any;

 /* mapGetters 변수 선언 */
 eventView!: IKeyValueObject;
 readonly readOnlySetting!: ISetting;


 /* 클래스 변수 선언 */
  durationStart: any = null;

  durationEnd: any = null;

  min: Date = null;
  max: Date = null;

  minTime: string = '';
  maxTime: string = '';

  viewDate: string = '';

  showError: boolean = false;

  selected: boolean = false;

  startTime: string = '';
  endTime: string = '';

  startDateTime: string = '';
  endDateTime: string = '';

  keepCases: string = '';
  keepCasesText: string = '';

 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /*
 created(){
 }
 */
 
 
 mounted() {
   
    this.setDefaultDateTime();



 }
 

 /* 메소드 선언 */
 setDefaultDateTime() {

    const startDate = moment(this.eventView.startTimeStr).format('YYYY-MM-DD');
    const endDate = moment(this.eventView.completeTimeStr).format('YYYY-MM-DD');

    const sYear = startDate.split('-')[0];
    const sMonth = startDate.split('-')[1][0] == '0' ? startDate.split('-')[1][1] : startDate.split('-')[1];
    const sDay = startDate.split('-')[2][0] == '0' ? startDate.split('-')[2][1] : startDate.split('-')[2];

    const eYear = endDate.split('-')[0];
    const eMonth = endDate.split('-')[1][0] == '0' ? endDate.split('-')[1][1] : endDate.split('-')[1];
    const eDay = endDate.split('-')[2][0] == '0' ? endDate.split('-')[2][1] : endDate.split('-')[2];

    this.durationStart = new Date(Number(sYear), Number(sMonth)-1, Number(sDay));
    this.durationEnd = new Date(Number(eYear), Number(eMonth)-1, Number(eDay));

    this.min = _.clone(this.durationStart);
    this.max = _.clone(this.durationEnd);


    ///

    this.startTime = moment(this.eventView.startTimeStr).format('HH:mm:ss');
    this.endTime =  moment(this.eventView.completeTimeStr).format('HH:mm:ss');

    this.startDateTime = moment(this.eventView.startTimeStr).format('YYYY-MM-DD HH:mm:ss');
    this.endDateTime = moment(this.eventView.completeTimeStr).format('YYYY-MM-DD HH:mm:ss');

    this.keepCases = this.readOnlySetting.common.analysis.keepCases; 
    //케이스 포함 타입 {START, COMPLETE, INTERSECT, CONTAINED, TRIM}
    switch(this.keepCases){
      case 'TRIM':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.trim').toString();//'Trim within 시작 & 종료점'; 
        break;
      case 'STARTED':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.started').toString();//'Starts At The 시작점';
        break;
      case 'CONTAINED':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.contained').toString();//'Contains within 시작 & 종료점';
        break;
      case 'INTERSECTING':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.intersecting').toString();//'Intersects within 시작 & 종료점';
        break;
      case 'COMPLETED':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.completed').toString();//'Finish at the 종료점';
        break;
    }

 }

 setData(item: any) {
   if(item == null || item.data == null) {
     
     this.setDefaultDateTime();

     return;
   }
   
  const startDate = moment(item.data.start.split(' ')[0]).format('YYYY-MM-DD');
  const endDate = moment(item.data.end.split(' ')[0]).format('YYYY-MM-DD');

  const sYear = startDate.split('-')[0];
  const sMonth = startDate.split('-')[1][0] == '0' ? startDate.split('-')[1][1] : startDate.split('-')[1];
  const sDay = startDate.split('-')[2][0] == '0' ? startDate.split('-')[2][1] : startDate.split('-')[2];

  const eYear = endDate.split('-')[0];
  const eMonth = endDate.split('-')[1][0] == '0' ? endDate.split('-')[1][1] : endDate.split('-')[1];
  const eDay = endDate.split('-')[2][0] == '0' ? endDate.split('-')[2][1] : endDate.split('-')[2];

  this.durationStart = new Date(Number(sYear), Number(sMonth)-1, Number(sDay));
  this.durationEnd = new Date(Number(eYear), Number(eMonth)-1, Number(eDay));

  this.startTime = item.data.start.split(' ')[1];
  this.endTime = item.data.end.split(' ')[1];

  //this.keepCases = this.keepCasesFromAPIuse(item.data.keepCases);
  this.keepCases = item.data.keepCases;
  this.keepCasesToText(this.keepCases);

 }

 keepCasesToText(keepCases: string) {
   switch(keepCases){
      case 'TRIM':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.trim').toString();//'Trim within 시작 & 종료점'; 
        break;
      case 'START':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.started').toString();//'Starts At The 시작점';
        break;
      case 'CONTAINED':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.contained').toString();//'Contains within 시작 & 종료점';
        break;
      case 'INTERSECT':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.intersecting').toString();//'Intersects within 시작 & 종료점';
        break;
      case 'COMPLETE':
        this.keepCasesText = this.$t('view.repo.repositoryFilter.time.completed').toString();//'Finish at the 종료점';
        break;
    }
 }

 onClickApply() {

   const input: any = {};

   const dateS = moment(this.durationStart).format('YYYY-MM-DD');
   const dateE = moment(this.durationEnd).format('YYYY-MM-DD');


   //const caseNum = 100;
   const start = dateS + ' ' + this.startTime;
   const end = dateE + ' ' + this.endTime;
   //const keepCases = this.keepCasesToAPIuse(this.keepCases);
   const keepCases = this.keepCases;

   //input.caseNum = caseNum;
   input.start = start;
   input.end = end;
   input.keepCases = keepCases;


   this.$emit('apply', input);
 }

 @Watch('durationStart', {immediate: true}) 
 async onChangeDurationStart() {

   const start = moment(this.durationStart).format('YYYY-MM-DD'); //시작날짜
   const startLimit = moment(this.min).format('YYYY-MM-DD'); // 허용 시작날짜
   const end = moment(this.durationEnd).format('YYYY-MM-DD'); //종료날짜 
   const endLimit = moment(this.max).format('YYYY-MM-DD'); //허용 종료날짜

   const sTime = start + ' ' + this.startTime; //시작일자의 startTime
   const sLimit = this.eventView.startTimeStr; //허용 시작일시

   const sTime2 = end + ' ' + this.startTime; //종료일자의 startTime
   const eLimit = this.eventView.completeTimeStr; //허용 종료일시
   
   if(start == startLimit && moment(sLimit).isAfter(moment(sTime))) {
     //날짜는 시작제한날짜인데 시간이 제한 이전
     this.startTime = await moment(sLimit).format('HH:mm:ss');
     
   }else if(start == endLimit && moment(sTime2).isAfter(moment(eLimit))) {
     //날짜는 종료제한날짜인데 시간이 제한 이후
     this.startTime = await moment(eLimit).format('HH:mm:ss');
    
   }

   this.onClickApply();
 }

 @Watch('durationEnd', {immediate: true}) 
 async onChangeDurationEnd() {

   const start = moment(this.durationStart).format('YYYY-MM-DD'); //시작날짜
   const startLimit = moment(this.min).format('YYYY-MM-DD'); // 허용 시작날짜
   const end = moment(this.durationEnd).format('YYYY-MM-DD'); //종료날짜 
   const endLimit = moment(this.max).format('YYYY-MM-DD'); //허용 종료날짜

   const eTime = end + ' ' + this.endTime; //시작일자의 startTime
   const sLimit = this.eventView.startTimeStr; //허용 시작일시

   const eTime2 = end + ' ' + this.endTime; //종료일자의 startTime
   const eLimit = this.eventView.completeTimeStr; //허용 종료일시

   if(end == startLimit && moment(sLimit).isAfter(moment(eTime))) {
     //날짜는 시작제한날짜인데 시간이 제한 이전
     this.endTime = await moment(sLimit).format('HH:mm:ss');
     
   }else if(end == endLimit && moment(eTime2).isAfter(moment(eLimit))) {
     //날짜는 종료제한날짜인데 시간이 제한 이후
     this.endTime = await moment(eLimit).format('HH:mm:ss');
     
   }

   this.onClickApply();
 }

 //startTime
 @Watch('startTime', {immediate: true}) 
 async onChangeStartTime() {

   const start = moment(this.durationStart).format('YYYY-MM-DD'); //시작날짜
   const startLimit = moment(this.min).format('YYYY-MM-DD'); // 허용 시작날짜
   const end = moment(this.durationEnd).format('YYYY-MM-DD'); //종료날짜 
   const endLimit = moment(this.max).format('YYYY-MM-DD'); //허용 종료날짜

   const sTime = start + ' ' + this.startTime; //시작일자의 startTime
   const sLimit = this.eventView.startTimeStr; //허용 시작일시

   const sTime2 = end + ' ' + this.startTime; //종료일자의 startTime
   const eLimit = this.eventView.completeTimeStr; //허용 종료일시
   
   if(start == startLimit && moment(sLimit).isAfter(moment(sTime))) {
     //날짜는 시작제한날짜인데 시간이 제한 이전
     this.startTime = await moment(sLimit).format('HH:mm:ss');
     
   }else if(start == endLimit && moment(sTime2).isAfter(moment(eLimit))) {
     //날짜는 종료제한날짜인데 시간이 제한 이후
     this.startTime = await moment(eLimit).format('HH:mm:ss');
    
   }


   this.onClickApply();
 }

 //endTime
 @Watch('endTime', {immediate: true}) 
 async onChangeEndTime() {

   const start = moment(this.durationStart).format('YYYY-MM-DD'); //시작날짜
   const startLimit = moment(this.min).format('YYYY-MM-DD'); // 허용 시작날짜
   const end = moment(this.durationEnd).format('YYYY-MM-DD'); //종료날짜 
   const endLimit = moment(this.max).format('YYYY-MM-DD'); //허용 종료날짜

   const eTime = end + ' ' + this.endTime; //시작일자의 startTime
   const sLimit = this.eventView.startTimeStr; //허용 시작일시

   const eTime2 = end + ' ' + this.endTime; //종료일자의 startTime
   const eLimit = this.eventView.completeTimeStr; //허용 종료일시

   if(end == startLimit && moment(sLimit).isAfter(moment(eTime))) {
     //날짜는 시작제한날짜인데 시간이 제한 이전
     this.endTime = await moment(sLimit).format('HH:mm:ss');
     
   }else if(end == endLimit && moment(eTime2).isAfter(moment(eLimit))) {
     //날짜는 종료제한날짜인데 시간이 제한 이후
     this.endTime = await moment(eLimit).format('HH:mm:ss');
     
   }


   this.onClickApply();
 }
/*
 startValidState() {
   
   const start = moment(this.durationStart).format('YYYY-MM-DD'); //시작날짜
   const startLimit = moment(this.min).format('YYYY-MM-DD'); // 허용 시작날짜
   const end = moment(this.durationEnd).format('YYYY-MM-DD'); //종료날짜 
   const endLimit = moment(this.max).format('YYYY-MM-DD'); //허용 종료날짜

   const sTime = start + ' ' + this.startTime; //시작일자의 startTime
   const sLimit = this.eventView.startTimeStr; //허용 시작일시

   const sTime2 = end + ' ' + this.startTime; //종료일자의 startTime
   const eLimit = this.eventView.completeTimeStr; //허용 종료일시
   
   if(start == startLimit && moment(sLimit).isAfter(moment(sTime))) {
     //날짜는 시작제한날짜인데 시간이 제한 이전
     //this.startTime = await moment(sLimit).format('HH:mm:ss');
     return false;
   }else if(start == endLimit && moment(sTime2).isAfter(moment(eLimit))) {
     //날짜는 종료제한날짜인데 시간이 제한 이후
     //this.startTime = await moment(eLimit).format('HH:mm:ss');
     return false;
   }else {
     return true;
   }

 }

 endValidState() {
   
   const start = moment(this.durationStart).format('YYYY-MM-DD'); //시작날짜
   const startLimit = moment(this.min).format('YYYY-MM-DD'); // 허용 시작날짜
   const end = moment(this.durationEnd).format('YYYY-MM-DD'); //종료날짜 
   const endLimit = moment(this.max).format('YYYY-MM-DD'); //허용 종료날짜

   const eTime = end + ' ' + this.endTime; //시작일자의 startTime
   const sLimit = this.eventView.startTimeStr; //허용 시작일시

   const eTime2 = end + ' ' + this.endTime; //종료일자의 startTime
   const eLimit = this.eventView.completeTimeStr; //허용 종료일시

   if(end == startLimit && moment(sLimit).isAfter(moment(eTime))) {
     //날짜는 시작제한날짜인데 시간이 제한 이전
     //this.endTime = await moment(sLimit).format('HH:mm:ss');
     return false;
   }else if(end == endLimit && moment(eTime2).isAfter(moment(eLimit))) {
     //날짜는 종료제한날짜인데 시간이 제한 이후
     //this.endTime = await moment(eLimit).format('HH:mm:ss');
     return false;
   }else {
     return true;
   }
 }

 
 startValidCheck(start: any) {

   if(moment(this.eventView.startTimeStr).isAfter(moment(start))) return false;
   else if(moment(start).isAfter(moment(this.eventView.completeTimeStr))) return false;
   else return true;
 }

 endValidCheck(end: any) {
   if(moment(this.eventView.startTimeStr).isAfter(moment(end))) return false;
   else if(moment(end).isAfter(moment(this.eventView.completeTimeStr))) return false;
   else return true;
 }*/


}
</script>