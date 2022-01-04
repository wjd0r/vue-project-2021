<template>
  <!-- 이벤트 생성 -->
  <form @submit.prevent="createNewEvent">
  <div class="main-common-component create-component" :class="`lang-${$i18n.locale}`">
    <div class="create-content">
      <!-- flowbar -->
      <FlowBarStepFour mode="repository" :stage="1"/>
      <!-- flowbar -->

      <!-- form - event -->
      <div class="event-create-component">
        <div class="event-create-content create-common-content">
          <div class="content-header">
            <h5 class="title">{{ $t('view.repo.form.dataset') }}</h5>
            <div class="right-align">
              <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
            </div>
          </div>
          <div class="content-body">
            <div class="form-content">
              <b-form-group id="datasetName"  :label="$t('view.repo.form.sourceDataName')" label-cols="2" label-for="dataset-name">
                <b-form-input v-model="dataSetName" id="nameInput" :placeholder="$t('view.repo.form.pleaseEnter')" disabled></b-form-input>
              </b-form-group>

              <div class="content-header"><h5 class="title">{{$t('view.repo.form.eventLog')}}<!--이벤트로그--></h5></div>


              <b-form-group id="eventName"  :label="`${$t('view.repo.form.eventLogName')} (*)`" label-cols="2" label-for="event-name" style="margin: 10px;" :invalid-feedback="evnetLogName.text">
                <b-form-input autocomplete="off" :placeholder="$t('view.repo.form.eventLogNameEnter')"  v-model="newEventName" :state="evnetLogName.state" maxlength="255" required></b-form-input>
              </b-form-group>
  

              <b-form-group id="eventDesc"  :label="$t('view.repo.form.eventLogDesc')" label-cols="2" label-for="event-desc">
                <b-form-input autocomplete="off" v-model="newEventDesc" id="nameInput" :placeholder="$t('view.repo.form.eventLogDescEnter')" maxlength="255"></b-form-input>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
      <!-- form - event -->

      <!-- form - standard select -->
      <div class="standard-list-component">
        <div class="standard-list-content create-common-content">
          <div class="content-header"><h5 class="title">{{$t('view.repo.repoCreateForm.standardProcessList')}}<!--표준 프로세스 목록--></h5></div>
          <div class="content-body">
            <!--<b-overlay :show="processListLoading" no-fade bg-color="#fff" opacity="1">-->
            <div class="selection-list">
              <div class="left-content">
                <div class="content-header" desc="표준 프로세스">{{ $t('view.repo.form.standardProcess') }}</div>
                <b-overlay :show="processListLoading" no-fade bg-color="#fff" opacity="1">
                <draggable class="content-body" ref="leftContent" :list="processList" :group="{ name: 'repository', pull: leftPullEvent, put: false, draggable: '.event-group' }" :sort="false" :disabled="isMobile">
                  <div class="item" :class="{ active: item.id === selectedLeft.id && !getRelation(item.id), 'd-none': getRelation(item.id) }" 
                  v-for="(item, index) in processList" :key="'left_' + item.id" @click="selectProcess(item.id, index, 'left')">
                    <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                    <div class="item-text">{{ `${item.name}` }}</div>
                  </div>
                </draggable>
                </b-overlay>
              </div>
              <div class="btn-group">
                <b-button variant="outline-secondary" class="btn-move" @click="addProcess()">+</b-button>
                <b-button variant="outline-secondary" class="btn-move" @click="removeProcess()">-</b-button>
              </div>
              <div class="right-content regist-standard">
                <div class="content-header"  >
                  <div class="title left" desc="등록된 표준 프로세스">{{ $t('view.repo.form.registeredStandardProcess') }}</div>
                  <div class="title right" desc="기본 설정">{{$t('view.repo.repoCreateForm.basicSet')}}</div>
                </div>
                <div class="content-body">
                  <draggable class="list-content" :list="registeredProcessList" :group="{ name: 'repository', draggable: '.event-group' }" :sort="false" @end="endEvent" :disabled="isMobile">
                    <div class="item" :class="{ active: item.id === selectedRight.id }" v-for="(item, index) in registeredProcessList"
                        :key="'right_' + item.id" @click="selectProcess(item.id, index, 'right')">
                        <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                        <div class="item-text">{{ `${item.name}` }}</div>
                      </div> 
                    </draggable>
                  <div class="form-content">
                    <div class="item defualt-setting" v-for="(item, index) in registeredProcessList" :key="item.id"><!--style="background-color: #D7B1D7;"-->
                      <b-form-checkbox v-model="basicStandardProcessList" :value="index" @change="clickedBasicProcess(index)" ></b-form-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="notice-text m-none">{{ $t('view.repo.alert.registerHelp') }}<!--※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div>
            <div class="notice-text m-notice">{{$t('view.repo.repoCreateForm.registeredByButton')}}<!--※ 버튼을 이용하여 등록할 수 있습니다.--></div>
            <!--</b-overlay>-->
          </div>
        </div>
      </div>
      <!-- form - standard select -->
    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
        <div class="btn-group">
          <b-button variant="primary" class="btn-primary" type="submit">{{ $t('view.repo.button.next') }}</b-button>
          <b-button variant="secondary" class="btn-secondary" @click="back">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->

    <b-overlay :show="showOverlay" :no-wrap="true" no-fade class="overlay-flow">
      <template #overlay>
        <CreateFlow @close="showOverlay = false" @onSightDay="onSightDay"/>
      </template>
    </b-overlay>

  </div>
  <!-- 이벤트 생성 -->
  </form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Draggable from "vuedraggable";
import _ from 'lodash';
import moment from 'moment';

import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';
import CreateFlow from './CreateFlow.vue';
import store from '../../../../store';

import { ISetting } from '@/interface';
import { utils, ValidationCheck } from '@/common';

import { AxiosError, AxiosResponse } from 'axios';


@Component({
 components: {
   FlowBarStepFour,
    //vuedraggable 드래그앤드롭 위한 모듈
		Draggable,
    CreateFlow,
   },
 computed: mapGetters({
   setting: 'sso/getSetting',
   eventCreateInfo: 'repository/getEventCreateInfo',
   eventInfo: 'repository/getEventInfo',
 }),
})
export default class RepositoryCreateForm extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 setting!: ISetting;

 /* 클래스 변수 선언 */
 dataSetId: string = '';
 dataSetName: string = '';

 newEventName: string = '';
 newEventDesc: string = '';

 eventCreateInfo!: any;
 eventInfo!: any;

 //draganddrop

 $refs!: {
    //form: InstanceType<typeof ValidationObserver>;
    leftContent: any;
  };

  selectedDataset = '---';
  selectedLeft = {
    id: '',
    index: -1,
  };
  selectedRight = {
    id: '',
    index: -1,
  };

  //draganddrop
  processList: any[] = [];
  registeredProcessList: any[] = [];

  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;

  showOverlay: boolean = false;
  onceInReturn: boolean = false;

  repoEventIndex: any = {};

  //기본 표준 프로세스
  basicStandardProcess: any = null;
  basicStandardProcessList: any[] = [];

  processListLoading: boolean = true;

 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 
 created(){

    //파일명 불러오기
    /*
    this.$store.dispatch('repository/getRepoDataView', {
      datasetId: this.$route.params.dataSetId,
			projectId: this.$store.getters['sso/getProjectId']
    }).then((res: any) => {
         this.fileName = res.data.data.origin.orginalFilenames[0];
         
    });
    */ 
   
   this.processListLoading = true;
   const eventCreateInfo = store.getters['repository/getEventCreateInfo'];

   //this.dataSetName = this.$route.params.dataSetName;
   this.dataSetId = eventCreateInfo.dataSetId;
   this.dataSetName = eventCreateInfo.dataSetName;

   const resourceGroupId = eventCreateInfo.resourceGroupId;

   const data: any = {
      _type: 'ProcessModelSelectConfiguration',
      selectors: [
        {
          _type: 'ProcessModel',
          project: {
            _type: 'Project',
            id: this.$store.getters['sso/getProjectId']
          },
        },
      ],
    };
    
    data.selectors[0]['resourceGroup'] = {
      _type: 'ResourceGroup',
      id: resourceGroupId
    };

    //프로세스 목록 불러오기
    this.$store.dispatch('standard/getProcessList', [data]).then((res: any) => {
        const elements = res.data.data.elements;
         this.processList = [];
         for(const key in elements){
            this.processList.push(elements[key]);
         }
         this.processListLoading = false;
      });

    if(_.isUndefined(this.setting.sightDay)) {
    this.setting.sightDay = {
        dataset: null,
        repository: null,
      }
    }
  
 }

 
 mounted() {
  this.$store.dispatch('repository/getRepoEventIndex', {
        datasetId: this.$store.getters['repository/getEventCreateInfo'].dataSetId,
        projectId: this.$store.getters['sso/getProjectId']
      }).then((res: any) => {
        this.repoEventIndex = res.data.data;
      });   

  this.showOverlay = this.setting.sightDay.repository != moment().format('YYYY-MM-DD');

  //돌아가기 시 overlay 뜨지 않음
  this.showOverlay = this.$route.params.notShowOverlay == 'true' ? false : this.showOverlay;
  //정보 보존
  //1. 기본 정보: 
  if(this.$route.params.notShowOverlay == 'true') {
    this.dataSetName = this.eventCreateInfo.dataSetName;
    this.newEventName = this.eventCreateInfo.eventName;
    this.newEventDesc = this.eventCreateInfo.eventDesc;
    this.registeredProcessList = this.eventInfo.registeredProcessList;
    //this.basicStandardProcessList = ;

    let idx = 0;
    this.registeredProcessList.forEach((process: any)=>{
      if(process.id == this.eventInfo.referenceModel.id) {
         this.basicStandardProcessList = [idx];
      }
      idx++;
    })
    

  }

 }

 @Watch('registeredProcessList', {immediate: true})
  onRegisteredProcessListChanged(newValue: any, oldValue: any) {


    if(newValue.length == 1){
      this.basicStandardProcess = this.registeredProcessList[0];
      this.basicStandardProcessList = [0];
    }

        
  }

 /* 메소드 선언 */
 onSightDay(sightDay: boolean) {
    if(sightDay) {
      this.setting.sightDay.repository = moment().format('YYYY-MM-DD');
    } else {
      this.setting.sightDay.repository = '';
    }

    this.$store.dispatch('sso/setSetting', {
      id: this.$store.getters['sso/getMyInfo'].id,
      config: { ...this.setting },
    });
  }

 //draganddrop start
  addProcess() {
    if(this.selectedLeft.index != -1){
      const index = _.findIndex(this.registeredProcessList, ['id', this.selectedLeft.id]);
      if (index === -1) this.registeredProcessList.push(_.cloneDeep(this.processList[this.selectedLeft.index]));
      this.selectedLeft.id = '';
      this.selectedLeft.index = -1;
    }
    
  }

  removeProcess() {
    //if(this.selectedRight.index != -1) {
      this.registeredProcessList.splice(this.selectedRight.index, 1);
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    //}
    
  }

  selectProcess(id: string, index: number, direction: string) {
    if (direction === 'left') {
      this.selectedLeft.id = id;
      this.selectedLeft.index = index;
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    } else if (direction === 'right') {
      this.selectedRight.id = id;
      this.selectedRight.index = index;
      this.selectedLeft.id = '';
      this.selectedLeft.index = -1;
    }
  }

  getRelation(id: string) {
    const index = _.findIndex(this.registeredProcessList, ['id', id]);
    return index !== -1 ? true : false;
  }

  leftPullEvent(to: any, from: any, dragEl: Element, evt: Event) {
    return dragEl.classList.contains('disabled') ? false : 'clone';
  }

  endEvent(evt: any) {
    const originEvent = evt.originalEvent;

    //if (originEvent.path[1] === this.$refs.leftContent.$el) {
    if (originEvent.path[0] === this.$refs.leftContent.$el || originEvent.path[2] === this.$refs.leftContent.$el) {
     
      evt.item.remove();
      this.registeredProcessList.splice(evt.oldDraggableIndex, 1);

      if(Number(this.basicStandardProcessList[0]) > Number(evt.oldDraggableIndex)){
        //체크한 항목의 위의 항목을 삭제한 경우
        const newValue = Number(this.basicStandardProcessList[0])-1;
      
        this.basicStandardProcessList = [newValue];
        this.basicStandardProcess = this.registeredProcessList[newValue];
      }else if((Number(this.basicStandardProcessList[0]) == Number(evt.oldDraggableIndex)) || this.registeredProcessList.length == 0){
        this.basicStandardProcess = null;
        this.basicStandardProcessList = [];
      }
    }
  }
  //draganddrop end

  regexTest(name: string) {
    const regex = new RegExp(this.regEx);
    return !regex.test(name); //정규표현식 일치 안할 때 true 리턴
  }

  async createNewEvent() {


      //기본 표준 프로세스 체크
      if(this.registeredProcessList.length > 0 && this.basicStandardProcess == null){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.noBasicProcessSelected").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }
/*
      if(this.newEventName.length != 0 && this.newEventName.length < 3){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.eventCreate.nameLengthEvent").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      //공백 체크
      if(this.newEventName.trim() == '') {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.blankTest").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      //regex 체크
      if(this.regexTest(this.newEventName)) {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.regexTest").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }
*/
      if(!this.evnetLogName.state){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const errorMessage = 
        this.evnetLogName.text != '' ? this.evnetLogName.text :this.$t('view.repo.alert.notKnow').toString();
        const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
        if(res) return;
      }

      //이름 중복 체크
        /*
        if(this.haveSameNameEvent('create')){

          const title = this.$t("view.repo.alert.title.alarm").toString();
          const content = this.$t("view.repo.alert.sameNameEvent").toString();

          utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
          return;
        }
        */
      //});

      //중복이름 test
      const params = {
        name: this.newEventName,
        projectId: this.$store.getters['sso/getProjectId'],
        resourceGroupId: this.$store.getters['repository/getEventCreateInfo'].resourceGroupId
      };
      let same = false;
      await this.$store.dispatch('repository/getRepoEventSaveTest', params)
      .catch((err: AxiosError) => utils.handlerError(this, err).then(() => {

        same = true;

      }));
      if(same) return;

  /*
      let processName = '';
      let processId = '';
      if(this.processForCreate!='none'){
        processName = this.processList[this.processForCreate].name;
        processId = this.processList[this.processForCreate].id;
      } else {
        processName = '(없음)';
        processId = null;
      }

      this.$store.commit('repository/setEventInfo', {
        eventName: this.newEventName,
        eventDesc: this.newEventDesc,
        processName: processName,
        processId: processId,
        processIdx: this.processForCreate
      });

      
      const groupInfo = store.getters['repository/getGroupInfo'];
      if(Object.keys(this.selectedDataSet).length == 0){
        this.selectedDataSet = groupInfo;
        this.$store.commit('repository/setGroupInfo', {});
      }

      const projectId = this.selectedDataSet.project.id;
      const datasetId = this.selectedDataSet.id;
*/

      this.$store.commit('repository/setEventInfo', {
        registeredProcessList: this.registeredProcessList,
        referenceModel: this.basicStandardProcess
      });

      this.$store.commit('repository/setEventCreateInfo', {
        dataSetId: this.dataSetId,
        dataSetName: this.dataSetName, 
        eventName: this.newEventName,
        eventDesc: this.newEventDesc,
        resourceGroupId: this.$store.getters['repository/getEventCreateInfo'].resourceGroupId,
        selectedWorkspace: this.$store.getters['repository/getEventCreateInfo'].selectedWorkspace
      });

      this.$router.push({
      name: 'RepositoryMappingSelect',
      params: {
        //dataSetId: this.dataSetId,
        //projectId: this.$store.getters['sso/getProjectId']
        //dataSetName: this.dataSetName,
        //eventName: this.newEventName,
        //eventDesc: this.newEventDesc,    
      }
      
    });
  }

  async back () {
		const title = this.$t('view.sso.alert.title.alarm').toString();
    const content = this.$t('view.repo.alert.cancel').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) { 
      this.$router.push({
        name: 'EventList',
        params: {
        selectedDataSetId: this.dataSetId,
        selectedWorkspace: this.$store.getters['repository/getEventCreateInfo'].selectedWorkspace
      }
      });
    }
	}

/*
  getValidationStateEventName({ dirty, validated, valid = null }: any, mode: string) {

    if(this.newEventName.length <3) return false;
    if(mode == 'create'){
      //if(this.haveSameNameEvent('create')){
      //  return false;
      //}else{
        return dirty || validated ? valid : null;
      //}
    }
  }
*/

  haveSameNameEvent(mode: string) {
    if(mode == 'create'){
      const elements = this.repoEventIndex.elements;
      let sameNameEvent: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if(project.name == this.newEventName){
          sameNameEvent = true;
        }
      }
      return sameNameEvent;
    }
  }

  clickedBasicProcess(index: any) {
    
    if(this.basicStandardProcessList[0] == index) {
      this.basicStandardProcess = null;
      this.basicStandardProcessList = [];
      return;
    }

    this.basicStandardProcess = this.registeredProcessList[index];
    this.basicStandardProcessList = [index];
    
  }

  get isMobile() {
    return utils.isMobile();
  }


  get evnetLogName() {
    /*const evnetLogName = this.newEventName;
    const state = evnetLogName.trim() != '' && RegExp(this.regEx).test(evnetLogName) && evnetLogName.trim().length > 2 && this.space(evnetLogName);
    const text =
      evnetLogName == '' ? '' :
      !this.space(evnetLogName) ? this.$t('view.repo.alert.firstBlankTest').toString() :
      evnetLogName.trim().length < 3 ? this.$t('view.repo.alert.eventCreate.nameLengthEvent').toString() :
      evnetLogName.trim() == '' ? this.$t("view.repo.alert.blankTest").toString() :
      !RegExp(this.regEx).test(evnetLogName) ? this.$t("view.repo.alert.regexTest").toString() : '';

    return {
      state : state,
      text: text,
    }*/

    //이벤트 로그 이름 : 문자,숫자,특문, 3 ~ 255, 중복체크 (중복 체크는 api 로)
    const name = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.newEventName);

    return {
      state : name.state,
      text: name.feedback,
    }
  }

  space(value: string) {
    let space = true;
    const regEx = /^[\s][a-zA-Zㄱ-힣0-9\s]*$/;
    space = regEx.test(value) ? false : true;

    return space;
  }

}
</script>