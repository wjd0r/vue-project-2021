<template>
  <form @submit.prevent="modifyEventInfo" id="RepositoryModify" :class="`lang-${$i18n.locale}`">
    <div class="right-align">
      <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
    </div>
    <div class="content-body">
      <div class="form-content">
          <b-form-group label-cols-sm="3" label-cols-lg="2" :label="`${$t('view.repo.event.eventLog.modal.eventName')} (*)`" :invalid-feedback="evnetLogName.text">
              <b-form-input :placeholder="$t('view.repo.event.eventLog.modal.eventNamePlaceHolder')" autocomplete="off" v-model="modifyEventName" :state="evnetLogName.state" required maxlength="255"></b-form-input>
          </b-form-group>
        <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventDesc')">
          <b-form-input v-model="modifyEventDesc" autocomplete="off" :placeholder="$t('view.repo.event.eventLog.modal.eventDescPlaceHolder')" maxlength="255"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.eventLogModal.relatedRepository')">
          <b-form-textarea v-model="relRepository" placeholder="-" disabled></b-form-textarea>
        </b-form-group>
        <!-- <b-form-group  label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.selectProcess')">
          <b-form-select v-model="processForModify">
            <b-form-select-option value="none">{{$t('view.repo.event.eventLog.modal.none')}}</b-form-select-option>
            <template v-for="(v, k) in processList"><b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventDesc')">
          <b-form-textarea v-model="modifyEventDesc" :placeholder="$t('view.repo.event.eventLog.modal.eventDescPlaceHolder')"></b-form-textarea>
        </b-form-group>
              <b-form-select-option :value="k" :key="k">{{ v.name }}</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group> -->
      </div>
      <!-- matching list -->
      <div class="matching-component">
        <div class="matching-content">
          <div class="matching">
            <div class="content-header sub">
              <h5 class="title">{{$t('view.repo.eventLogModal.mappingMatchingList')}}</h5>
            </div>

            <!--<div v-if="matchingLoading" style="text-align: center;">
              <b-spinner/>
            </div>-->
            <!--<div v-else class="content-body">-->
            <!--<b-overlay :show="matchingLoading" class="content-body" no-fade bg-color="#fff" opacity="1">-->

                <!--<div v-for="item in mappingList" :key=item.key>
                <div class="mapping-matching">
                  <span class="mapping-title">{{item[0]}}</span>
                  <div class="mapping">
                    <span class="label">{{item[1]}}</span>
                  </div>
                </div>
                </div>-->

              <!--<table class="table line">
                <thead>
                  <tr >
                    <th style="position: sticky; top: 0;">속성명</th>
                    <th style="position: sticky; top: 0;">컬럼명</th>
                    <th style="position: sticky; top: 0;">예시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in mappingList" :key=item.key>
                    <td>{{item[0]}}</td>
                    <td>{{item[1]}}</td>
                    <td>{{item[2]}}</td>
                  </tr>
                </tbody>
              </table>-->

              <!--caption-top responsive sticky-header-->

              <b-table bordered class="table line" :items="mappingList" :fields="fields" responsive sticky-header :busy="matchingLoading">
                  <!--<template>
                  <b-thead>
                    <b-tr>
                      <b-th>{{$t('view.repo.eventLogModal.propertyName')}}</b-th>
                      <b-th>{{$t('view.repo.eventLogModal.columnName')}}</b-th>
                      <b-th>{{$t('view.repo.eventLogModal.example')}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="item in mappingList" :key=item.key>
                      <b-td>{{item[0]}}</b-td>
                      <b-td>{{item[1]}}</b-td>
                      <b-td>{{item[2]}}</b-td>
                    </b-tr>
                  </b-tbody>
                  </template>-->
                  <template #table-busy>
                    <div class="text-center text-danger my-2">
                      <b-spinner class="align-middle"></b-spinner>
                    </div>
                  </template>
                </b-table>

              <!--<table class="table line">
                <thead>
                  <tr>
                    <th>속성명</th>
                    <th>컬럼명</th>
                    <th>예시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>케이스 아이디</td>
                    <td>Invoice No</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>액티비티</td>
                    <td>Activity</td>
                    <td>00_START</td>
                  </tr>
                  <tr>
                    <td>종료시간</td>
                    <td>Timestamp</td>
                    <td>2020-01-13 11:46:44</td>
                  </tr>
                </tbody>
              </table>-->
            <!--</div>-->
            <!--</b-overlay>-->
          </div>
        </div>
      </div>
      <!-- matching list-->

      <!-- <div class="mapping-list-component">
        <div class="mapping-list-content">
          <div class="content-header"><h4 class="title">{{$t('view.repo.event.eventLog.modal.mappingMatchList')}}</h4></div>
          <div class="content-body">
            
            <div v-for="item in mappingList" :key=item.key>
              <div class="mapping-matching">
                <span class="mapping-title">{{item[0]}}</span>
                <div class="mapping">
                  <span class="label">{{item[1]}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- form - standard select -->
      <div class="standard-list-component">
        <div class="standard-list-content create-common-content">
          <div class="content-header"><h5 class="title">{{$t('view.repo.eventLogModal.standardProcessList')}}<!--표준 프로세스 목록--></h5></div>

          <!--<div v-if="processListLoading" style="text-align: center;">
            <b-spinner/>
          </div>-->
          <!--<div class="content-body">-->
          <!--<b-overlay :show="processListLoading" no-fade bg-color="#fff" opacity="1">-->
            <div class="selection-list">
              <div class="left-content">
                <div class="content-header" desc="표준 프로세스">{{ $t('view.repo.form.standardProcess') }}</div>
                <b-overlay :show="processListLoading" no-fade bg-color="#fff" opacity="1">
                <draggable class="content-body " ref="leftContent" :list="processList" :group="{ name: 'repository', pull: leftPullEvent, put: false, draggable: '.item' }" :sort="false" :disabled="isMobile">
                  <!--<div class="event-group" :class="{ active: item.id === selectedLeft.id, disabled: getRelation(item.id) }" 
                  v-for="(item, index) in processList" :key="'left_' + item.id" @click="selectProcess(item.id, index, 'left')">
                  {{ `${item.name}` }}</div>-->

                  <div class="item" :class="{ active: item.id === selectedLeft.id && !getRelation(item.id), 'd-none': getRelation(item.id) }" 
                  v-for="(item, index) in processList" :key="'left_' + item.id" @click="selectProcess(item.id, index, 'left')">
                    <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                    <div class="item-text">{{ `${item.name}` }}</div>
                  </div>



                  <!--<div class="item">
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
                  <div class="title right" desc="기본 설정">{{$t('view.repo.eventLogModal.basicSet')}}</div>
                </div>
                <div class="content-body">
                  <draggable class="list-content" :list="registeredProcessList" :group="{ name: 'repository', draggable: '.item' }" :sort="false" @end="endEvent" :disabled="isMobile">
                    <div class="item" :class="{ active: item.id === selectedRight.id }" v-for="(item, index) in registeredProcessList"
                      :key="'right_' + item.id" @click="selectProcess(item.id, index, 'right')">
                      <div class="ico-item ico-flow-standard" alt="표준 프로세스 아이콘"></div>
                      <div class="item-text">{{ `${item.name}` }}</div>
                    </div> 
                  </draggable>
                  <div class="form-content">
                    <div class="item defualt-setting" v-for="(item, index) in registeredProcessList" :key="item.id"><!--style="background-color: #D7B1D7;"-->
                      <b-form-checkbox v-model="basicStandardProcessList" :value="index" @change="clickedBasicProcess(index)"></b-form-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="notice-text">{{$t('view.repo.alert.registerHelp')}}<!--마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div>
          </div>
          <!--</b-overlay>-->
          
        <!--</div>-->
      </div>
      <!-- form - standard select -->

      <!-- footer -->
      <div class="content-footer">
        <div class="btn-group">
          <!--<b-button variant="outline-primary" class="btn-create" @click="goToCreateSubEvent()" :disabled="matchingLoading || processListLoading">{{$t('view.repo.eventLogModal.subEventCreate')}}</b-button>-->
          <!-- <b-button variant="outline-primary" class="btn-filter">이벤트 필터 수정</b-button> -->
          <b-button v-if="modifyLoading" variant="primary" disabled>
                <b-spinner small></b-spinner>
          </b-button>
          <b-button v-else type="submit" variant="primary" class="btn-modify" :disabled="matchingLoading || processListLoading">{{ $t('view.repo.button.modify') }}</b-button>
          <b-button type="button" @click.prevent="closeModal()" class="btn-cancel">{{ $t('view.repo.button.cancel') }}</b-button>
          <b-button type="button" @click.prevent="closeModal()" class="btn-close m-btn">{{ $t('view.repo.button.close') }}</b-button>
        </div>
      </div>
      <!-- footer -->
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import { utils, ValidationCheck } from '@/common';

import Draggable from "vuedraggable";
import { AxiosError, AxiosResponse } from 'axios';


@Component({
  computed: {
    ...mapGetters({
      projectId: 'sso/getProjectId',
      myInfo: 'sso/getMyInfo',
    })
  },
  components: {
    //vuedraggable 드래그앤드롭 위한 모듈
		Draggable
   },
})
export default class Event extends Vue {

  @Prop()
  selectedCard!: any;

  //repoEventView!: any;
  projectId!: any;
  myInfo!: any;
  metadata!: any;
  dataSetCreateLimit: number = 0;
  eventCreateLimit: number = 0;
  eventCreateTotalLimit: number = 0;

  @Prop({ default: () => ({}) })
  eventModal!: any;

  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;

  regexTest(name: string) {
    const regex = new RegExp(this.regEx);
    return !regex.test(name); //정규표현식 일치 안할 때 true 리턴
  }

  repoEventView: any;

  // 이벤트 수정의 이름, 설명
  modifyEventName: string = '';
  modifyEventDesc: string = '';

  // 프로세스 모델 : 이벤트 생성, 수정, 목록
  processForCreate: any = 'none';
  processForModify: any = 'none';
  //processList: any = [];

  // 이벤트 수정의 매핑 매칭 목록
  mappingList: any = [];

  // 이벤트 생성의 이름, 설명
  newEventName: string = '';
  newEventDesc: string = '';

  // 이벤트 수정, 삭제를 위해 선택한 이벤트 정보
  eventForModify: any = this.eventModal.eventCard;

  repoEventIndex: any = {};

  originalEventName: string = '';

  //draganddrop
  processList: any[] = [];
  registeredProcessList: any[] = [];

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

  relRepository: string = '-';

  //기본 표준 프로세스
  basicStandardProcess: any = null;
  basicStandardProcessList: any[] = [];

  //로딩
  matchingLoading: boolean = true;
  processListLoading: boolean = true;

  modifyLoading: boolean = false;

  fields: any[] = [
     this.$t('view.repo.eventLogModal.propertyName'), 
     this.$t('view.repo.eventLogModal.columnName'), 
     this.$t('view.repo.eventLogModal.example')
  ];

  deployed: any = 0;

  @Watch('registeredProcessList', {immediate: true})
  onRegisteredProcessListChanged(newValue: any, oldValue: any) {

    if(newValue.length == 1 && this.deployed != -1){
      this.basicStandardProcess = this.registeredProcessList[0];
      this.basicStandardProcessList = [0];
    }
        
  }

/*
  getValidationStateEventName({ dirty, validated, valid = null }: any, mode: string) {
    if(mode == 'create'){
      //if(this.haveSameNameEvent('create')){
      //  return false;
      //}else{
        return dirty || validated ? valid : null;
      //}
    }else{
      //(mode == 'modify')
      if(this.modifyEventName.length <3) return false;
      //if(this.haveSameNameEvent('modify')){
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
    }else{
      //(mode == 'modify')
      const elements = this.repoEventIndex.elements;
      let sameNameEvent: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if((this.eventForModify.id != id) 
          && (project.name == this.modifyEventName)){
          sameNameEvent = true;
        }
      }
      return sameNameEvent;
    }
  }

  mounted() {

    this.$store.dispatch('repository/getRepoEventIndex', {
        datasetId: this.selectedCard.id, //this.$route.params.dataSetId,
        projectId: this.$store.getters['sso/getProjectId']
      }).then((res: any) => {
        this.repoEventIndex = res.data.data;
      });

    this.whenModifyEvent();
  }

  // 내 이벤트 수정
  async modifyEventInfo() {

      // validate start
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
      if(this.modifyEventName.charAt(0) == ' '){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t('view.repo.alert.firstBlankTest').toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      if(this.modifyEventName.length != 0 && this.modifyEventName.length < 3){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.eventCreate.nameLengthEvent").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      //공백 체크
      if(this.modifyEventName.trim() == '') {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.blankTest").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      //regex 체크
      if(this.regexTest(this.modifyEventName)) {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.regexTest").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }
*/
      //event 체크
      if(!this.evnetLogName.state){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const errorMessage = 
        this.evnetLogName.text != '' ? this.evnetLogName.text :this.$t('view.repo.alert.notKnow').toString();
        const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
        if(res) return;
      }
      //이름 중복 체크
      if(this.modifyEventName != this.originalEventName) {
        const params = {
          name: this.modifyEventName,
          projectId: this.projectId,
          resourceGroupId: this.selectedCard.resourceGroup.id
        };
        let same = false;
        await this.$store.dispatch('repository/getRepoEventSaveTest', params)
        .catch((err: AxiosError) => utils.handlerError(this, err).then(() => {

          same = true;

        }));
        if(same) return;

      }
      
      //이름 중복 체크
      /*if(this.haveSameNameEvent('modify')){

          const title = this.$t("view.repo.alert.title.alarm").toString();
          const content = this.$t("view.repo.alert.sameNameEvent").toString();

          utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
          return;
        }
      */
      // validate end

    
		const title = this.$t("view.repo.alert.eventModify.title").toString();
    const content = this.$t("view.repo.alert.eventModify.content").toString();
    const modify = this.$t("view.repo.button.modify").toString();
    const cancel = this.$t("view.repo.button.cancel").toString();
		const doEdit = await utils.bvModalmsgBoxConfirm(this, title, content, modify, cancel, 'warning');
    
    if(!doEdit) return;

      this.modifyLoading = true;

      const eId = this.eventForModify.id

      if(this.repoEventView != null){

        const newRelations: any = {};
        if(this.repoEventView.relations != null){
          const originalRelations = this.repoEventView.relations;
          Object.keys(originalRelations).forEach((relId: any) => {

            //프로젝트와의 연결 보존
            if(originalRelations[relId]["_type"] == "ResourceGroup")
              newRelations[relId] = originalRelations[relId];
          });
        }
        //프로세스 선택
        /*if(this.processForModify != 'none'){
          const pid = this.processList[this.processForModify].id;
          newRelations[pid] = {
            "_type" : "GraphImpl",
            "id" : pid
          }
        }
        */

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


        //이벤트 수정
        const params = {
          eventId: eId,
          eventName: this.modifyEventName,
          eventDesc: this.modifyEventDesc,
          projectId: this.projectId,
          relations: newRelations,
          referenceModel: referenceModel,
          resourceGroupId: this.selectedCard.resourceGroup.id
        };
        //const res = await this.$store.dispatch('repository/getRepoEventSave', params);
        //if(res.data.data != null) this.$emit('updateEvent');
        //this.eventModal.modifyShow = false;

        this.$store.dispatch('repository/getRepoEventSave', params)
        .then((res: any)=>{
           if(res.data.data != null) {
              this.$emit('updateEvent');
              this.modifyLoading = false;
              this.eventModal.modifyShow = false;
              
           }
        }).catch((err: AxiosError) => {
          this.modifyLoading = false;
          const errorCode = err.response.headers['x-ioc-code'];
          const title = this.$t(`view.repo.alert.title.error`).toString();
          const message = this.$t(`view.repo.alert.${errorCode}`).toString();
          utils.bvModalmsgBoxOk(this, title, message, 'error');
        });
        
      }
  }

  // 이벤트 수정을 클릭했을때
  whenModifyEvent() {


    this.modifyEventName = this.eventForModify.name;
    this.originalEventName = this.eventForModify.name;
    this.modifyEventDesc = this.eventForModify.description;

    this.matchingLoading = true;
    this.processListLoading = true;

    this.processForModify = 'none';

    this.mappingList = [];

    const data: any = {
        "_type" : "ProcessModelSelectConfiguration",
        "selectors" : [ {
          "_type" : "ProcessModel",
          "project" : {
            "id" : this.projectId,
            "_type" : "Project"
          }
        } ]
      }; 

    data.selectors[0]['resourceGroup'] = {
      _type: 'ResourceGroup',
      id: this.eventForModify.resourceGroup.id
    };

    this.$store.dispatch('standard/getProcessList', [data]).then((res1: any) => {
        const elements = res1.data.data.elements;
        this.processList = [];
        for(const key in elements){
            this.processList.push(elements[key]);
        }
        
        // 선택한 프로세스 모델 정보 표시
        this.$store.dispatch('repository/getRepoEventView', {
          projectId: this.projectId,
          eventId: this.eventForModify.id
        }).then((res2: any) => {
          const data = res2.data.data;
          this.repoEventView = res2.data.data;

          
          this.relRepository = this.repoEventView.relatedRepositoryName != undefined ? this.repoEventView.relatedRepositoryName : '-';

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


          //매핑 매칭 목록
          //this.mappingList = [];
          this.$store.dispatch('repository/getRepoDataView', {
            datasetId: this.selectedCard.id,
            projectId: this.projectId,
          }).then((res3: any) => {
            const fields = res3.data.data.fields;

            
        /*
          "c0": "Container No"
          "c1": "Job-type"
          "c2": "Machine ID"
          "c3": "Full-Empty"
          "c4": "Vessel ID"
          "c5": "Job Start Date"
          "c6": Job End Date
        */

            const mappings = res2.data.data.origin.mappings;
        /*
            c3: "eu"
            c4: "eo"
            c5: es|YYYY-MM-DD HH24:MI:SS
            c6: ec|YYYY-MM-DD HH24:MI:SS
            c0: "ci"
            c1: "ea"
            c2: "er"
        */

            this.$store.dispatch('repository/getRepoDataViewData', {
              projectId: this.projectId,//this.$route.params.projectId,
              datasetId: this.selectedCard.id,
              page: 1,
              size: 10,
            }).then((res4: any) =>{
              //데이터 내용 변화에 반응
              const exampleData = res4.data.data.results[0];
            

              Object.keys(fields).forEach((key: any) => {
              //key = c0
              const column = fields[key]; //"Container No"
              const existingKeys = Object.keys(mappings);

              if(existingKeys.includes(key)){
                const mapped = mappings[key].split('|')[0]; //"ci"

            
                const caseId = this.$t('view.repo.event.eventLog.modal.caseId');
                const activity = this.$t('view.repo.event.eventLog.modal.activity');
                const startTime = this.$t('view.repo.event.eventLog.modal.startTime');
                const endTime = this.$t('view.repo.event.eventLog.modal.endTime');
                const originator = this.$t('view.repo.event.eventLog.modal.originator');
                const resource = this.$t('view.repo.event.eventLog.modal.resource');
                const caseProperty = this.$t('view.repo.event.eventLog.modal.caseProperty');
                const eventProperty = this.$t('view.repo.event.eventLog.modal.eventProperty');
                const useTime = this.$t('view.repo.event.eventLog.modal.useTime');

                const eventCost = this.$t('view.repo.event.eventLog.modal.eventCost');
                const caseAllCost = this.$t('view.repo.event.eventLog.modal.caseAllCost');

              /*const mapInHangul: any = {'ci': '케이스 아이디', 'ea': '액티비티', 
              'es': '시작시간', 'ec': '종료시간', 'eo': '담당자', 'er': '리소스', 'cu': '케이스 속성',
              'eu': '이벤트 속성', 'et': '운영시간', 'en': '이벤트 비용', 'cn': '케이스 총 비용'}; */
                const mapInHangul: any = {'ci': caseId, 'ea': activity, 
                'es': startTime, 'ec': endTime, 'eo': originator, 'er': resource, 'cb': caseProperty,
                'eb': eventProperty, 'et': endTime, 'en': eventCost, 'cn': caseAllCost}; //'et': useTime
                const times = ['es', 'ec', 'et'];
                const hangul = mapInHangul[mapped];
                const item: any = {};
                item[hangul] = column;

                // fields: any[] = [
                //  this.$t('view.repo.eventLogModal.propertyName'), 
                //  this.$t('view.repo.eventLogModal.columnName'), 
                //  this.$t('view.repo.eventLogModal.example')
                //];

                const c0 = this.$t('view.repo.eventLogModal.propertyName').toString();
                const c1 = this.$t('view.repo.eventLogModal.columnName').toString();
                const c2 = this.$t('view.repo.eventLogModal.example').toString();

                const m: any = {};
                m[c0] = hangul;
                m[c1] = column + (times.includes(mapped) ? ' ('+mappings[key].split('|')[1]+')' : '');
                m[c2] = exampleData[key];

                //this.mappingList.push( {c0: hangul, c1: (column + (times.includes(mapped) ? ' ('+mappings[key].split('|')[1]+')' : '')), c2: exampleData[key]} );
                this.mappingList.push(m);
                
              }
            });
            this.matchingLoading = false;
            this.processListLoading = false;

            });
          });
        });
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

  closeModal() {
    this.$emit('closeEventModifyModal');
  }

  goToCreateSubEvent() {

    //event create info
    this.$store.commit('repository/setEventCreateInfo', {
        dataSetId: this.selectedCard.id,
        dataSetName: this.selectedCard.name,
        eventName: this.modifyEventName
    });

    
    this.$router.push({
        name: 'SubRepositoryCreateForm',
        //params: {
        //  dataSetId: this.selectedCard.id,
        //  dataSetName: this.selectedCard.name,
        //  eventName: this.modifyEventName
        //}
      });
  }

  clickedBasicProcess(index: any) {

    if(this.basicStandardProcessList[0] == index){
      this.basicStandardProcess = null;
      this.basicStandardProcessList = [];
    }else{
      this.basicStandardProcess = this.registeredProcessList[index];
      this.basicStandardProcessList = [index];
    }
    
  }

  get isMobile() {
    return utils.isMobile();
  }
  
  get evnetLogName() {
    /*const evnetLogName = this.modifyEventName;
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
    const name = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.modifyEventName);

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
