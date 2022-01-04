<template>
  <!-- 서브이벤트 생성 -->
  <form @submit.prevent="next">
  <div class="main-common-component create-component" :class="`lang-${$i18n.locale}`">
    <div class="main-common-content create-content">
      <!-- flowbar -->
      <FlowBarStepThree mode="subRepository" :stage="1"/>
      <!-- flowbar -->

      <!-- form - subevent -->
      <div class="event-create-component">
        <div class="event-create-content create-common-content">
          <div class="content-header">
            <h5 class="title">{{ $t('view.repo.form.originalInfo') }}</h5>
            <div class="right-align">
              <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
            </div>
          </div>
          <div class="content-body">
            <div class="form-content">
              <b-form-group :label="$t('view.repo.label.datasetName')" label-cols="2" label-for="dataset-name">
                <b-form-input v-model="dataSetName" disabled></b-form-input>
              </b-form-group>
              
              <b-form-group id="eventName"  :label="$t('view.repo.subRepoCreateForm.eventNameOrigin')" label-cols="2" label-for="event-name">
                <b-form-input v-model="eventName" disabled></b-form-input>
              </b-form-group>

              <div class="content-header"><h5 class="title">{{ $t('view.repo.form.subRepository') }}</h5></div>

              <b-form-group id="eventName"  :label="`${$t('view.repo.subRepoCreateForm.subEventName')} (*)`" label-cols="2" label-for="event-name" style="margin: 10px;"  :invalid-feedback="evnetLogName.text">
                <b-form-input id="nameInput" autocomplete="off" :placeholder="$t('view.repo.form.subEventLogNameEnter')" v-model="newEventName" :state="evnetLogName.state" required maxlength="255"></b-form-input>
              </b-form-group>
              
              <b-form-group id="eventDesc"  :label="$t('view.repo.subRepoCreateForm.subEventDesc')" label-cols="2" label-for="event-desc">
                <b-form-input v-model="newEventDesc" autocomplete="off" :placeholder="$t('view.repo.form.subEventLogDescEnter')" maxlength="255"></b-form-input>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
      <!-- form - subevent -->

      <!-- form - standard select -->
      <div class="standard-list-component">
        <div class="standard-list-content create-common-content">
          <div class="content-header"><h5 class="title">{{$t('view.repo.subRepoCreateForm.standardProcessList')}}<!--표준 프로세스 목록--></h5></div>
          <div class="content-body">
            <!--<b-overlay :show="processListLoading" no-fade bg-color="#fff" opacity="1">-->
            <div class="selection-list">
              <div class="left-content">
                <div class="content-header" desc="표준 프로세스">{{ $t('view.repo.form.standardProcess') }}</div>
                <b-overlay :show="processListLoading" no-fade bg-color="#fff" opacity="1">
                <draggable class="content-body" ref="leftContent" :list="processList" :group="{ name: 'repository', pull: leftPullEvent, put: false, draggable: '.event-group' }" :sort="false">
                  <!-- <div class="event-group" :class="{ active: item.id === selectedLeft.id, disabled: getRelation(item.id) }" 
                    v-for="(item, index) in processList" :key="'left_' + item.id" @click="selectProcess(item.id, index, 'left')">
                    {{ `${item.name}` }}
                  </div> -->


                  <div class="item" :class="{ active: item.id === selectedLeft.id && !getRelation(item.id), 'd-none': getRelation(item.id) }" 
                  v-for="(item, index) in processList" :key="'left_' + item.id" @click="selectProcess(item.id, index, 'left')">
                    <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                    <div class="item-text">{{ `${item.name}` }}</div>
                  </div>

                  <!--
                  <div class="item">
                    <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                    <div class="item-text">표준 프로세스 1</div>
                  </div>
                  <div class="item disabled">
                    <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                    <div class="item-text">표준 프로세스 2</div>
                  </div>-->
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
                  <div class="title right" desc="기본 설정">{{$t('view.repo.subRepoCreateForm.basicSet')}}</div>
                </div>
                <div class="content-body">
                  <draggable class="list-content" :list="registeredProcessList" :group="{ name: 'repository', draggable: '.event-group' }" :sort="false" @end="endEvent">
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
            <div class="notice-text">{{$t('view.repo.alert.registerHelp')}}<!--마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div>
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
          <b-button variant="primary" class="btn-primary" type="submit">{{ $t('view.repo.button.next') }}<!--다음--></b-button>
          <b-button variant="secondary" class="btn-secondary" @click="back()">{{ $t('view.repo.button.cancel') }}<!--취소--></b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <b-overlay :show="showOverlay" :no-wrap="true" no-fade class="overlay-flow">
      <template #overlay>
        <CreateFlow @close="showOverlay = false" @onSightDay="onSightDay" />
      </template>
    </b-overlay>
  </div>
  </form>
  <!-- 서브이벤트 생성 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Draggable from "vuedraggable";
import _ from 'lodash';
import moment from 'moment';

import CreateFlow from './CreateFlow.vue';
import { ISetting } from '@/interface';
import store from '../../store';
import { utils, ValidationCheck } from '@/common';


import FlowBarStepThree from '../components/flows/FlowBarStepThree.vue';

@Component({
 components: {
   FlowBarStepThree,
   Draggable,
   CreateFlow,
 },
 computed: mapGetters({
    setting: 'sso/getSetting',
    projectId: 'sso/getProjectId',
    subEventCreateInfo: 'eventFilter/getSubEventCreateInfo'
 }),
})
export default class SubRepositoryCreateForm extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 setting!: ISetting;
 projectId!: any;
 subEventCreateInfo!: any;


 /* 클래스 변수 선언 */
  showOverlay: boolean = true;

 dataSetId: string = '';
 dataSetName: string = '';
 eventName: string = '';

 newEventName: string = '';
 newEventDesc: string = '';

 repoEventView: any = null;

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

  //기본 표준 프로세스
  basicStandardProcess: any = null;
  basicStandardProcessList: any[] = [];

  processListLoading: boolean = true;

  deployed: any = 0;



 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  async created(){
    if(_.isUndefined(this.setting.sightDay)) {
      this.setting.sightDay = {
        dataset: null,
        repository: null,
        subrepository: null,
      }
    }

    /*const eventCreateInfo = this.$store.getters['repository/getEventCreateInfo'];

    this.dataSetId = eventCreateInfo.dataSetId;
    this.dataSetName = eventCreateInfo.dataSetName;
    this.eventName = eventCreateInfo.eventName;
    */

    this.processListLoading = true;

    const res = await this.$store.dispatch('repository/getRepoEventView', {
      eventId: this.subEventCreateInfo.repositoryId,
      projectId: this.projectId
    });

    this.repoEventView = res;

    this.dataSetName = res.data.data.relatedDatasetName;
    this.eventName = res.data.data.name;

    //this.dataSetName = this.$route.params.dataSetName;
    //this.eventName = this.$route.params.eventName;

    //프로세스 목록 불러오기
    const dataP: any = {
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
    
    dataP.selectors[0]['resourceGroup'] = {
      _type: 'ResourceGroup',
      id: this.subEventCreateInfo.resourceGroupId
    };
    await this.$store.dispatch('standard/getProcessList', [dataP]).then((res: any) => {
        const elements = res.data.data.elements;
         this.processList = [];
         for(const key in elements){
            this.processList.push(elements[key]);
         }
         
    });

      //프로세스 선택 반영
    const data = res.data.data;

    const firstDeployedModel = data.attributes["reference.model"]!=undefined ? data.attributes["reference.model"].value : null;
    const relatedModels = data.attributes["saas.relatedModels"]!=undefined ? data.attributes["saas.relatedModels"].value : null;

    const relations = relatedModels;
    //if(data.relations != null){
    if(relations != null){
      //const keys = Object.keys(data.relations); //id
      const keys = Object.keys(relations); //id
      const processItems: any = [];
      keys.forEach((element: any) => {
        //if(data.relations[element]._type == "ProcessModel"){
        if(relations[element]._type == "GraphImpl" || relations[element]._type == "ProcessModel" || relations[element]._type == "Graph"){
          //processItems.push(data.relations[element]); //프로세스 모델에 해당하는 것만
          processItems.push(relations[element]); //프로세스 모델에 해당하는 것만
        }
      });

      this.registeredProcessList = _.values(processItems);

      const deployedId = firstDeployedModel == undefined ? null : firstDeployedModel.id;

      const idx = this.registeredProcessList.findIndex((element: any)=> {
        return element.id == deployedId;
      })

      this.deployed = idx;

      if(idx != -1) this.clickedBasicProcess(idx);
            
    }
    this.processListLoading = false;

      
  
 }
 
 mounted() {
   this.showOverlay = this.setting.sightDay.subrepository != moment().format('YYYY-MM-DD');  

   //돌아가기 시 overlay 뜨지 않음
  this.showOverlay = this.$route.params.notShowOverlay == 'true' ? false : this.showOverlay;
  //정보 보존
  //1. 기본 정보: 
  if(this.$route.params.notShowOverlay == 'true') {
    this.dataSetName = this.subEventCreateInfo.dataSetName;
    this.eventName = this.subEventCreateInfo.eventName;
    this.newEventName = this.subEventCreateInfo.newEventName;
    this.newEventDesc = this.subEventCreateInfo.newEventDesc;

    this.registeredProcessList = this.subEventCreateInfo.registeredProcessList;
    //this.basicStandardProcessList = ;

    let idx = 0;
    this.registeredProcessList.forEach((process: any)=>{
      if(process.id == this.subEventCreateInfo.basicStandardProcess.id) {
         this.basicStandardProcessList = [idx];
         this.basicStandardProcess = this.subEventCreateInfo.basicStandardProcess;
      }
      idx++;
    })

  }
 }

  @Watch('registeredProcessList', {immediate: true})
  onRegisteredProcessListChanged(newValue: any, oldValue: any) {

    if(newValue.length == 1 && this.deployed != -1){
      this.basicStandardProcess = this.registeredProcessList[0];
      this.basicStandardProcessList = [0];
    }

        
  }
 

 /* 메소드 선언 */
 onSightDay(sightDay: boolean) {
    if(sightDay) {
      this.setting.sightDay.subrepository = moment().format('YYYY-MM-DD');
    } else {
      this.setting.sightDay.subrepository = '';
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
        this.deployed = 0;
      }
    }
  }
  //draganddrop end

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
          selectedDataSetId: this.subEventCreateInfo.datasetId,
          selectedWorkspace: this.subEventCreateInfo.selectedWorkspace
        }
      });
    }
	}

  async next() {

    //서브 이벤트 로그 이름 validation 필요
    //0. 첫글자 공백
    //1. 3글자 이상 입력
    //2. regex 체크
    //3. 중복이름체크
    const value = this.newEventName;

    /*if(!this.space(value)){
       
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t('view.repo.alert.firstBlankTest').toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
        if(res) return;
      });
      return;
    }
    if(value.length <3 ){
      
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.eventCreate.nameLengthEvent").toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
        if(res) return;
      });
      return;
    }
    if(this.regexTest(value)){

      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.regexTest").toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
        if(res) return;
      });
      return;
    }*/

    if(!this.evnetLogName.state){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const errorMessage = 
        this.evnetLogName.text != '' ? this.evnetLogName.text :this.$t('view.repo.alert.notKnow').toString();
        const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
        if(res) return;
    }

    const params = {
        name: this.newEventName,
        projectId: this.$store.getters['sso/getProjectId'],
        resourceGroupId: this.subEventCreateInfo.resourceGroupId
    };
    let same = false;
    await this.$store.dispatch('repository/getRepoEventSaveTest', params)
    .catch((err: any) => utils.handlerError(this, err).then(() => {

      same = true;

    }));
    if(same) return;

    //기본 표준 프로세스 체크
      if(this.registeredProcessList.length > 0 && this.basicStandardProcess == null){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.noBasicProcessSelected").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

    //표준 프로세스, 기본 표준 프로세스
    const newRelations: any = {};
    if(this.registeredProcessList.length > 0){

      this.registeredProcessList.forEach((process: any)=>{
        const pid = process.id;
        newRelations[pid] = {
          "_type" : "GraphImpl",
          "id" : pid
        }
      });
          
          /* 
                "relations" : {
                  "ipp20210316071424" : {
                    "_type" : "GraphImpl",
                    "id" : "ipp20210316071424"
                  }
                }
          */
        }

      let referenceModel = null;
      if(this.basicStandardProcess != null){
        referenceModel = {
        "_type": "GraphImpl",
        "id": this.basicStandardProcess.id
      };
    }


    const repositoryId = this.subEventCreateInfo.repositoryId;
    const datasetId = this.subEventCreateInfo.datasetId;
    const datasetName = this.subEventCreateInfo.datasetName;
    const resourceGroupId = this.subEventCreateInfo.resourceGroupId;
    const selectedWorkspace = this.subEventCreateInfo.selectedWorkspace;
    

    //event create info
    this.$store.commit('eventFilter/setSubEventCreateInfo', {

      eventName: this.eventName,

      repositoryId: repositoryId,
      datasetId: datasetId,
      datasetName: datasetName,
      newEventName: this.newEventName,
      newEventDesc: this.newEventDesc,
      repoEventView: this.repoEventView,
      resourceGroupId: resourceGroupId,
      
      relations: newRelations,
      referenceModel: referenceModel,

      registeredProcessList: this.registeredProcessList,
      basicStandardProcess: this.basicStandardProcess,

      selectedWorkspace: selectedWorkspace
    })

    this.$router.push({
      name: 'SubRepositoryFilter',
      //params:{
      //  repositoryId: this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId
      //  projectId: this.projectId
      //}
    });

  }

/*
   getValidationState({ dirty, validated, valid = null }: any, mode: string) {
        return dirty || validated ? valid : null;
      
    
  }
*/

  clickedBasicProcess(index: any) {

    if(this.basicStandardProcessList[0] == index) {
      this.basicStandardProcess = null;
      this.basicStandardProcessList = [];
      return;
    }

    this.basicStandardProcess = this.registeredProcessList[index];
    this.basicStandardProcessList = [index];
    
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

  regexTest(name: string) {
    const regex = new RegExp(this.regEx);
    return !regex.test(name); //정규표현식 일치 안할 때 true 리턴
  }

}
</script>