<template>
<div class="main-common-component event-filter-component create">
  <div class="main-common-content event-filter-content">
    <!-- back -->
    <Back @onClick="onClickBack()" :useCustom="true"/>
    <!-- back -->

    <!-- flowbar -->
    <FlowBarStepThree mode="subRepository" :stage="2"/>
    <!-- flowbar -->

    <!-- inf -->
    <!-- <div class="inf-component row">
      <div class="inf-content col-3">
        <div class="content-header">데이터셋 이름</div>
        <div class="content-body">데이터셋</div>
      </div>
      <div class="inf-content col-3">
        <div class="content-header">이벤트로그 이름</div>
        <div class="content-body">서브 이벤트로그 1</div>
      </div>
    </div> -->
    <!-- inf -->

    <!-- filter -->
    <div class="filter-component">
      <div class="filter-content row">
        <!-- left -->
        <div class="left-component col-3">
          <div class="left-content">
            <div class="content-header">
              <h4 class="title">{{$t('view.repo.repositoryFilter.title')}}</h4>
            </div>
            <div class="content-middle">
              <b-dropdown id="EventfilterSelect" :text="$t('view.repo.repositoryFilter.selectFilter')">
                <b-dropdown-item @click="onClickFilterMenu('time')">{{$t('view.repo.repositoryFilter.timeFilter')}}<!--시간 필터--></b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="onClickFilterMenu('startEnd')">{{$t('view.repo.repositoryFilter.startEndFilter')}}<!--시작점 및 종료점 필터--></b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="onClickFilterMenu('property')">{{$t('view.repo.repositoryFilter.attributeFilter')}}<!--속성 필터--></b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="onClickFilterMenu('variant')">{{$t('view.repo.repositoryFilter.variantFilter')}}<!--프로세스 그룹 필터--></b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="content-body">
              <div class="list-content">


                <template v-for="(item, index) in filterList">

                  <div v-if="item.type=='time'" :key="index">
                    <div class="event-filter" :class="{active: selectedItem != undefined && item.id==selectedItem.id }" @click="onClickFilterItem($event, item, 'time')" :id='"filter_"+item.id'><!--@click="selectTimeFilter('example')" -->
                      <div class="content-header">
                        <div class="title">{{$t('view.repo.repositoryFilter.timeFilter')}}<!--시간 필터--></div>
                        <div class="right-align">
                          <div class="ico-close" alt="닫기 아이콘" @click.prevent="closeFilterItem(item.id)"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else-if="item.type=='startEnd'" :key="index">
                    <div class="event-filter" :class="{active: selectedItem != undefined && item.id==selectedItem.id }"  @click="onClickFilterItem($event, item, 'startEnd')"  :id='"filter_"+item.id'><!-- @click="selectStartEndFilter('example')"-->
                      <div class="content-header">
                        <div class="title">{{$t('view.repo.repositoryFilter.startEndFilter')}}<!--시작점 및 종료점 필터--></div>
                        
                        <div class="right-align">
                          <div class="ico-close" alt="닫기 아이콘" @click="closeFilterItem(item.id)"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else-if="item.type=='property'" :key="index">
                    <div class="event-filter" :class="{active: selectedItem != undefined && item.id==selectedItem.id }"  @click="onClickFilterItem($event, item, 'property')" :id='"filter_"+item.id'><!-- @click="selectPropertyFilter('example')"-->
                      <div class="content-header">
                        <div class="title">{{$t('view.repo.repositoryFilter.attributeFilter')}}<!--속성 필터--></div>
                        
                        <div class="right-align">
                          <div class="ico-close" alt="닫기 아이콘" @click="closeFilterItem(item.id)"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="item.type=='variant'" :key="index">
                    <div class="event-filter" :class="{active: selectedItem != undefined && item.id==selectedItem.id }" @click="onClickFilterItem($event, item, 'variant')" :id='"filter_"+item.id'><!-- @click="selectVariantFilter('example')"-->
                      <div class="content-header">
                        <div class="title">{{$t('view.repo.repositoryFilter.variantFilter')}}<!--프로세스 그룹 필터--></div>
                        
                        <div class="right-align">
                          <div class="ico-close" alt="닫기 아이콘" @click="closeFilterItem(item.id)"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

              </div>
            </div>
            <div class="content-footer">
              <div class="btn-group">
                <b-button variant="primary" class="btn-primary" style="margin: 0px 12px 0px 0px" @click="onClickSave()" :disabled="filterList.length == 0">{{ $t('view.repo.button.apply') }}<!--적용--></b-button>
                <b-button variant="outline-primary" class="btn-outline-primary" @click="onClickReset()" :disabled="filterList.length == 0">{{ $t('view.repo.button.reset') }}<!--리셋--></b-button>
                <b-button variant="outline-primary" class="btn-outline-primary" @click="onClickExit()">{{ $t('view.repo.button.exit') }}<!--나가기--></b-button>
              </div>
            </div>
          </div>
        </div>
        <!-- left -->
        <!-- right -->
        <div class="right-component col-9">
          <div class="right-content">
            <div v-if="filterList.length == 0" class="loading d-flex align-items-center justify-content-center">
              {{$t('view.repo.repositoryFilter.pleaseSelectFilterMsg')}}<!--Please select filter on the left options-->
            </div>
            <!-- 시간 필터 -->
            <div v-show="showTimeFilter">
            <FilterTimes
              @apply="applyTimeFilter"
              :selectedItem = "selectedItem"
              ref="filterTimes"
            />
            </div>
            <!-- 시간 필터 -->

            <!-- 시작점및종료점 필터 -->
            <div v-show="showStartEndFilter">
            <FilterStartEndActive
              @apply="applyStartEndFilter"
              :selectedItem = "selectedItem"
              ref="filterStartEnd"
            />
            </div>
            <!-- 시작점및종료점 필터 -->

            <!-- 속성 필터 -->
            <div v-show="showPropertyFilter">
            <FilterAttribute
              @apply="applyPropertyFilter"
              :selectedItem = "selectedItem"
              ref="filterProperty"
            />
            </div>
            <!-- 속성 필터 -->

            <!-- 베리언트 필터 -->
            <div v-show="showVariantFilter">
            <FilterVariant
              @apply="applyVariantFilter"
              :selectedItem = "selectedItem"
              ref="filterVariant"
            />
            </div>
            <!-- 베리언트 필터 -->
          </div>
        </div>
        <!-- right -->
      </div>
    </div>
    <!-- filter -->
  </div>
</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import Back from '../components/Back.vue';
import FlowBarStepThree from '../components/flows/FlowBarStepThree.vue';

import FilterTimes from './components/FilterTimes.vue';
import FilterStartEndActive from './components/FilterStartEndActive.vue';
import FilterAttribute from './components/FilterAttribute.vue';
import FilterVariant from './components/FilterVariant.vue';
import _, { reverse } from 'lodash';
import $ from 'jquery';
import { EventBus, utils } from '@/common';
import { V } from '@iochord/ipr-fre-ent-core/src/rappid/rappid';
import moment from 'moment';

@Component({
 components: {
   Back,
   FlowBarStepThree,
   FilterTimes,
   FilterStartEndActive,
   FilterAttribute,
   FilterVariant
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',

 }),
})
export default class SubRepositoryFilter extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 projectId!: any;

 /* 클래스 변수 선언 */
 dataSetId: string = '';
 dataSetName: string = '';
 relEventName: string = '';
 eventName: string = '';
 eventDesc: string = '';

 showTimeFilter: boolean = false;
 showStartEndFilter: boolean = false;
 showPropertyFilter: boolean = false;
 showVariantFilter: boolean = false;

 //timeFilter: boolean = false;
 //startEndFilter: boolean = false;
 //propertyFilter: boolean = false;
 //variantFilter: boolean  = false;

 filterList: any[] = [];
 filterId: number = 0;

 selectedItem: any = null;

 /* refs 선언 */
 $refs!: {
    filterTimes: FilterTimes;
    filterStartEnd: FilterStartEndActive;
    filterProperty: FilterAttribute;
    filterVariant: FilterVariant;
  };

 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 
 async created(){

   const repoEventView = this.$store.getters['eventFilter/getSubEventCreateInfo'].repoEventView;

   this.filterId = 0;
   this.filterList = [];
   const template = repoEventView.data.data.origin.eventFilters;

   if(template) {

     template.forEach((filter: any) => {

       if(filter._type == 'TimeframeFilterLite'){

          const minStr = filter['minStr'];
          const maxStr = filter['maxStr'];
          const keepCases = this.keepCasesFromAPIuse(filter['keepCases']);

          const data1 = { start: minStr, end: maxStr, keepCases: keepCases};
          
          const item1 = {id: this.filterId, type: 'time', caseNum: '', str: '', data: data1};
          this.filterList.push(item1);
          this.filterId++;

       }else if(filter._type == 'StartEndAttributeFilterLite') {

          const startPoints: any = [];
          filter['startedByValues'].forEach((e: any)=>{
              startPoints.push({id: e, name: e});
          });
          const endPoints: any = [];
          filter['completedByValues'].forEach((e: any)=>{
              endPoints.push({id: e, name: e});
          });

          const data2 = { 'startPoints': startPoints, 'endPoints': endPoints};
          
          const item2 = {id: this.filterId, type: 'startEnd', caseNum: '', str: '', data: data2};
          this.filterList.push(item2);
          this.filterId++;

       }else if(filter._type == 'AttributeFilterLite') {

          this.$store.dispatch('repository/getRepoEventView', {
          eventId: this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId,
          projectId: this.projectId
          }).then((res: any)=>{

            const fieldAliases = res.data.data.fieldAliases;

            const attribute = filter['attribute'];
            const field = {value: attribute, text: fieldAliases[attribute], key: attribute}
            const properties: any = [];
            filter['values'].forEach((e: any)=>{
                properties.push({id: e, name: e});
            });

            const data3 = { 'field': field, 'properties': properties};

            const item3 = {id: this.filterId, type: 'property', caseNum: '', str: '', data: data3};

            this.filterList.push(item3);
            this.filterId++;
          });

       }else if(filter._type == 'TraceVariantFilterLite') {

          const data = {
              _type: 'TraceVariantDiscoveryLiteConfiguration',
              repository: {
                _type: 'EventRepository',
                id: this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId,
                project: {
                  _type: 'Project',
                  id: this.projectId,
                },
              },
              option: 'STANDARD',
              eventFilters: [] as any,
              sortBy: 'ccnt',
              sortDirection: 'DESC',
              showSignature: true,
            };

          const variants: any = [];
          this.$store.dispatch('common/getVariant', [data]).then((res: any) => {

              const variantList = Object.values(res.data.data.traceVariants);

              filter['values'].forEach((v: any)=>{

                const id = v;
                variantList.forEach((variant: any)=>{
                  if(variant.id == id){
                    variants.push(variant);
                  }
                });
              });

              const data4 = { variants: variants};
            
              const item4 = {id: this.filterId, type: 'variant', caseNum: '', str: '', data: data4};
              this.filterList.push(item4);
              this.filterId++;

              
          });
       }
       
     });

   }

 }

 keepCasesFromAPIuse(keepCases: string) {
   switch(keepCases){
      case 'TRIM':
        return 'TRIM';
      case 'STARTED':
        return 'START';
      case 'CONTAINED':
        return 'CONTAINED';
      case 'INTERSECTING':
        return 'INTERSECT';
      case 'COMPLETED':
        return 'COMPLETE';
   }
 }
 
 /*
 mounted() {
   
 }
 */

 /* 메소드 선언 */

 //필터 새로 열기
  onClickFilterMenu(typeStr: string, item?: any) {


    //오른쪽 화면 표시
    this.showTimeFilter = typeStr=='time' ? true : false; 
    this.showStartEndFilter = typeStr=='startEnd' ? true : false; 
    this.showPropertyFilter = typeStr=='property' ? true : false; 
    this.showVariantFilter = typeStr=='variant' ? true : false; 

    this.filterList.push({id: this.filterId, type: typeStr, caseNum: '', str: '', data: null});
    const reverseList = (_.clone(this.filterList)).reverse();
    this.selectedItem = reverseList.length > 0 ? reverseList[0] : null;
    this.filterId++;

    switch(typeStr){
      case 'time':
        if(this.$refs.filterTimes != undefined) this.$refs.filterTimes.setData(null);
        break;
      case 'startEnd':
        if(this.$refs.filterStartEnd != undefined) this.$refs.filterStartEnd.setData(null);
        break;
      case 'property':
        if(this.$refs.filterProperty != undefined) this.$refs.filterProperty.setData(null);
        break;
      case 'variant':
        if(this.$refs.filterVariant != undefined) this.$refs.filterVariant.setData(null);
        break; 
    }

    

 }

 //열려진 필터 하나 삭제하기
 closeFilterItem(id: string) {

    //오른쪽 창 일괄 닫기
    this.showTimeFilter = false;
    this.showStartEndFilter = false;
    this.showPropertyFilter = false;
    this.showVariantFilter = false;

    //목록에서 제거하기
    let idx = 0;
    const list = _.clone(this.filterList);
    list.forEach((l: any)=>{
      if(l.id == id){
        this.filterList.splice(idx, 1);
      }
      idx++;
    });
    const reverseList = (_.clone(this.filterList)).reverse();
    this.selectedItem = reverseList.length > 0 ? reverseList[0] : null;

    this.showTimeFilter = this.selectedItem.type=='time' ? true : false; 
    this.showStartEndFilter = this.selectedItem.type=='startEnd' ? true : false; 
    this.showPropertyFilter = this.selectedItem.type=='property' ? true : false; 
    this.showVariantFilter = this.selectedItem.type=='variant' ? true : false; 

    switch(this.selectedItem.type){
      case 'time':
        if(this.$refs.filterTimes != undefined) this.$refs.filterTimes.setData(this.selectedItem);
        break;
      case 'startEnd':
        if(this.$refs.filterStartEnd != undefined) this.$refs.filterStartEnd.setData(this.selectedItem);
        break;
      case 'property':
        if(this.$refs.filterProperty != undefined) this.$refs.filterProperty.setData(this.selectedItem);
        break;
      case 'variant':
        if(this.$refs.filterVariant != undefined) this.$refs.filterVariant.setData(this.selectedItem);
        break; 
    }
 }

 //필터 하나 클릭해서 열기
 onClickFilterItem(event: any, item: any, type: string) {

    //닫기 버튼 누르는 것은 제외
    const target = event != undefined ? event.target as Element : null;
    if(target != null && target.classList.contains('ico-close')){
      return;
    }
 
    this.selectedItem = item;
   
    //오른쪽 화면 표시
    this.showTimeFilter = type=='time' ? true : false; 
    this.showStartEndFilter = type=='startEnd' ? true : false; 
    this.showPropertyFilter = type=='property' ? true : false; 
    this.showVariantFilter = type=='variant' ? true : false; 


    switch(type){
      case 'time':
        if(this.$refs.filterTimes != undefined) this.$refs.filterTimes.setData(item);
        break;
      case 'startEnd':
        if(this.$refs.filterStartEnd != undefined) this.$refs.filterStartEnd.setData(item);
        break;
      case 'property':
        if(this.$refs.filterProperty != undefined) this.$refs.filterProperty.setData(item);
        break;
      case 'variant':
        if(this.$refs.filterVariant != undefined) this.$refs.filterVariant.setData(item);
        break; 
    }

 }

 //timefilter 적용
 applyTimeFilter(input: any) {

   if(this.selectedItem == null) return;

   //저장 적용 용도
   this.selectedItem.data = input;

 }
 
 //startendfilter 적용
 applyStartEndFilter(input: any) {

   if(this.selectedItem == null) return;

   //저장 적용 용도
   this.selectedItem.data = input;

 }

 //propertyfilter 적용
 applyPropertyFilter(input: any) {

   if(this.selectedItem == null) return;

   //저장 적용 용도
   this.selectedItem.data = input;

 }

 //variantfilter 적용
 applyVariantFilter(input: any) {

   if(this.selectedItem == null) return;

   //저장 적용 용도
   this.selectedItem.data = input;


 }

 //리셋 버튼
 async onClickReset() {

   const title = this.$t('view.repo.alert.title.info').toString();
   const content = this.$t('view.repo.alert.deleteAllFilter').toString();
   const yes = this.$t('view.repo.button.yes').toString();
   const no = this.$t('view.repo.button.no').toString();
   const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

   if(!res) return;

   this.filterList = [];
   this.selectedItem = null;
   this.filterId = 0;
   
   //오른쪽 화면 전부 닫기
   this.showTimeFilter = false;
   this.showStartEndFilter = false;
   this.showPropertyFilter = false;
   this.showVariantFilter = false;

 }

 async onClickExit() {

    const title = this.$t('view.repo.alert.title.info').toString();
    const content = this.$t('view.repo.alert.cancelEventFilter').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) {
      this.$router.push({
        name: 'EventList'
      });
    }
 }
  
 //저장 버튼
 async onClickSave() { //validation 처리 필요

   let zeroTerm = false;
   let startIsLater = false;
   let startDateTime: any = null;
   let endDateTime: any = null;
   const validationList: any[] = [];
   const eventFilter: any[] = [];
   this.filterList.forEach((filter: any)=>{
     switch(filter.type){
       case 'time':
         //시간 차가 0
         //if(filter.data.start == filter.data.end) zeroTerm = true;
         //end-start < 0
         startDateTime = moment(filter.data.start, 'YYYY-MM-DD HH:mm:ss');
         endDateTime = moment(filter.data.end, 'YYYY-MM-DD HH:mm:ss');
         if(startDateTime == endDateTime) zeroTerm = true;
         if(!startDateTime.isBefore(endDateTime)) startIsLater = true;
         eventFilter.push(this.makeTimeFilter(filter.data));
         break;
       case 'startEnd':
         //validation
         if(filter.data.startPoints.length == 0 || filter.data.endPoints.length == 0) {
           validationList.push('startEnd');
         }
         eventFilter.push(this.makeStartEndFilter(filter.data));
         break;
       case 'property':
         //validation
         if(filter.data.properties.length == 0) {
           validationList.push('property');
         }
         eventFilter.push(this.makePropertyFilter(filter.data));
         break;
       case 'variant':
         //validation
         if(filter.data.variants.length == 0) {
           validationList.push('variant');
         }
         eventFilter.push(this.makeVariantFilter(filter.data));
         break;
     }
   });

   //time validation
   if(zeroTerm){
      const title = this.$t('view.repo.alert.title.info').toString(); //"알림";
      const content = this.$t('view.repo.alert.filterDurationZero').toString();
      await utils.bvModalmsgBoxOk(this, title, content, 'warning');
      return;
   }

   //time validation
   if(startIsLater){
      const title = this.$t('view.repo.alert.title.info').toString(); //"알림";
      const content = this.$t('view.repo.alert.startIsAfterEnd').toString();
      await utils.bvModalmsgBoxOk(this, title, content, 'warning');
      return;
   }

   //validation
   if(validationList.length != 0) {
     const firstValidation = validationList[0];

     let title, content;
     switch(firstValidation) {
       case 'startEnd':
           title = this.$t('view.repo.alert.title.info').toString(); //"알림";
           content = this.$t('view.repo.alert.startEndFilterNotSelected').toString();
           await utils.bvModalmsgBoxOk(this, title, content, 'warning');
           break;
       case 'property':
           title = this.$t('view.repo.alert.title.info').toString(); //"알림";
           content = this.$t('view.repo.alert.attributeFilterNotSelected').toString();
           await utils.bvModalmsgBoxOk(this, title, content, 'warning');
           break;
       case 'variant':
           title = this.$t('view.repo.alert.title.info').toString(); //"알림";
           content = this.$t('view.repo.alert.variantFilterNotSelected').toString();
           await utils.bvModalmsgBoxOk(this, title, content, 'warning');
           break;
     }
     return;
     
   }

   const eventName = this.$store.getters['eventFilter/getSubEventCreateInfo'].eventName;

   const repositoryId = this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId;
   const datasetId = this.$store.getters['eventFilter/getSubEventCreateInfo'].datasetId;
   const datasetName = this.$store.getters['eventFilter/getSubEventCreateInfo'].datasetName;
   const registeredProcessList = this.$store.getters['eventFilter/getSubEventCreateInfo'].registeredProcessList;
   const newEventName = this.$store.getters['eventFilter/getSubEventCreateInfo'].newEventName;
   const newEventDesc = this.$store.getters['eventFilter/getSubEventCreateInfo'].newEventDesc;
   const repoEventView = this.$store.getters['eventFilter/getSubEventCreateInfo'].repoEventView;
   const resourceGroupId = this.$store.getters['eventFilter/getSubEventCreateInfo'].resourceGroupId;

   const relations = this.$store.getters['eventFilter/getSubEventCreateInfo'].relations;
   const referenceModel = this.$store.getters['eventFilter/getSubEventCreateInfo'].referenceModel;

   const selectedWorkspace = this.$store.getters['eventFilter/getSubEventCreateInfo'].selectedWorkspace;


   this.$store.commit('eventFilter/setSubEventCreateInfo', {

      eventName: eventName,

      repositoryId: repositoryId,
      datasetId: datasetId,
      datasetName: datasetName,
      registeredProcessList: registeredProcessList,
      newEventName: newEventName,
      newEventDesc: newEventDesc,
      repoEventView: repoEventView,
      eventFilter: eventFilter,
      resourceGroupId: resourceGroupId,

      relations: relations,
      referenceModel: referenceModel,

      filterList: this.filterList,

      selectedWorkspace: selectedWorkspace
    });

   this.$router.push({
      name: 'SubRepositoryFiltering',
    });
  
 }
/*
 shorterContent(content: string) {
    if(content.length >= 30) return content.slice(0, 30)+'...';
    else return content;

  }
*/
 //time filter
 makeTimeFilter(data: any) {
   /*
    {
    "_type": "TimeframeFilterLite",
    "minStr": "2019-01-01 01:00:00",
    "maxStr": "2019-01-11 23:59:59",
    "keepCases": "CONTAINED"
    }
    */
   /*
   data = {caseNum: 100, start: "2017-10-07 10:20:00", end: "2017-10-30 14:49:00"}
   */

  const filter =
    {
      "_type": "TimeframeFilterLite",
      "minStr": data.start,
      "maxStr": data.end,
      "keepCases": data.keepCases
    }

  return filter;

 }

 //startEnd filter(아직 API가 구현되지 않음)
 makeStartEndFilter(data: any){
   /*
    {
      "_type": "StartEndAttributeFilterLite",
      "field": "ea",
      "startedByValues": [ "ACTIVITY_A", "ACTIVITY_B", "ACTIVITY_C" ],
      "notStartedBy": false,
      "completedByValues": [ "ACTIVITY_A", "ACTIVITY_B", "ACTIVITY_C" ],
      "notCompletedBy": false
    }
    */
   /*
   data = {caseNum: 100, startPoints: [{"id":2,"name":"act2"},{"id":1,"name":"act1"}], endPoints: [{"id":2,"name":"act2"},{"id":1,"name":"act1"}]}
   */

  const startedByValues: any[] = [];

  data.startPoints.forEach((p: any)=>{
    startedByValues.push(p.name);
  })

  const completedByValues: any[] = [];

  data.endPoints.forEach((p: any)=>{
    completedByValues.push(p.name);
  })

  const filter =
    {
      "_type": "StartEndAttributeFilterLite",
      "field": "ea",
      "startedByValues": startedByValues,
      "notStartedBy": false,
      "completedByValues": completedByValues,
      "notCompletedBy": false
    }

  return filter;

 }

 //property filter
 makePropertyFilter(data: any){
   /*
    {  
      "_type": "AttributeFilterLite",
      "attribute": "er",
      "values": [ "RESOURCE_X", "RESOURCE_Y" ]
    }
    */
   /*
   data = {caseNum: 100, field: {value: 0, text: "PRC_CD1", key: "ea"}, properties: [{"name":"AN","id":0},{"name":"MV","id":2},{"name":"PK","id":4}]}
   */

  const values: any[] = [];

  data.properties.forEach((p: any)=>{
    values.push(p.name);
  })
  const filter =
    {
      "_type": "AttributeFilterLite",
      "attribute": data.field.key,
      "values": values
    }

  return filter;

 }

 //variant filter
 makeVariantFilter(data: any){
   /*
    {
      "_type": "TraceVariantFilterLite",
      "config": { ... },
      "values": [ "HASH01", "HASH02" ]
    }
    */
   /*
   data = {caseNum: 100, variants: {id: 1, name: '그룹1', detail: 'A>B>C'}}
   */
  const values: any[] = [];
  data.variants.forEach((v: any)=>{
    values.push(v.id);
  })

  const config = {
      _type: 'TraceVariantDiscoveryLiteConfiguration',
      repository: {
        _type: 'EventRepository',
        id: this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId,
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      },
      option: 'STANDARD',
      eventFilters: [] as any,
      sortBy: 'ccnt',
      sortDirection: 'DESC',
      showSignature: false,
    };

  const filter =
    {
       "_type": "TraceVariantFilterLite",
      "config": config, 
      "values": values //id, name?
    }

  return filter;

 }

 onClickBack() {
    this.$router.push({
      name: 'SubRepositoryCreateForm',
      params: {
        notShowOverlay: 'true'
      }
    });
  }
}
</script>