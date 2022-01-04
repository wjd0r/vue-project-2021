<template>
  <form id="RepositoryModify">
    <div class="right-align">
      <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
    </div>
    <div class="content-body">
      <div class="form-content">
          <b-form-group label-cols-sm="3" label-cols-lg="2" :label="`${$t('view.repo.event.eventLog.modal.eventName')} (*)`">
            <b-input-group> 
              <b-form-input disabled :value="modifyEventName" @input.native="modifyEventName = $event.target.value" v-model="modifyEventName" :placeholder="$t('view.repo.event.eventLog.modal.eventNamePlaceHolder')"></b-form-input>
            </b-input-group>
          </b-form-group>
        <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventDesc')">
          <b-form-input v-model="modifyEventDesc" :placeholder="$t('view.repo.event.eventLog.modal.eventDescPlaceHolder')" disabled></b-form-input>
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
            <div class="content-body">

                <!--<div v-for="item in mappingList" :key=item.key>
                <div class="mapping-matching">
                  <span class="mapping-title">{{item[0]}}</span>
                  <div class="mapping">
                    <span class="label">{{item[1]}}</span>
                  </div>
                </div>
                </div>-->

              <!--<div v-if="isLoadingMappings" style="text-align: center">
                <b-spinner/>
              </div>
              <div v-else>-->
              <b-table bordered class="table line" :items="mappingList" :fields="fields" responsive sticky-header :busy="isLoadingMappings">
                <!--<thead>
                  <tr>
                    <th>{{$t('view.repo.eventLogModal.propertyName')}}</th>
                    <th>{{$t('view.repo.eventLogModal.columnName')}}</th>
                    <th>{{$t('view.repo.eventLogModal.example')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in mappingList" :key=item.key>
                    <td>{{item[0]}}</td>
                    <td>{{item[1]}}</td>
                    <td>{{item[2]}}</td>
                  </tr>
                </tbody>-->


                <template #table-busy>
                    <div class="text-center text-danger my-2"> <!--class="text-center text-danger my-2">-->
                      <b-spinner ></b-spinner>
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
          <div class="content-body">
            
            <div v-if="isLoadingProcessList" style="text-align: center">
              <b-spinner/>
            </div>
            <div v-else>
            <div class="card card-created standard list" v-for="(item, index) in processList" :key="index">
                <div class="content-header">
                  <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                  <h5 class="title">{{item.name}}</h5>
                  <div class="defaulf-stadard" v-if="item.isDeployed">
                    <b-badge variant="primary" class="default">{{$t('view.repo.eventLogModal.basic')}}<!--기본--></b-badge>
                  </div>
                </div>
                <div class="content-footer">
                  <div class="user-inf">{{$t('view.repo.eventLogModal.create')}} - {{item.createdByName}}</div>
                </div>
            </div>
            </div>
            

          </div>
          </div>
        </div>
      </div>
      <!-- form - standard select -->

      <!-- footer -->
      <div class="content-footer">
        <div class="btn-group">
          <b-button type="button" @click.prevent="$emit('close')" class="btn-close m-btn">{{$t('view.repo.eventLogModal.close')}}<!--닫기--></b-button>
        </div>
      </div>
      <!-- footer -->
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import { utils } from '@/common';

import Draggable from "vuedraggable";

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

  // 선택한 원본 데이터 정보
  //selectedDataSet: any = {};

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
    index: 0,
  };
  selectedRight = {
    id: '',
    index: 0,
  };

  relRepository: string = '-';

  //기본 표준 프로세스
  basicStandardProcess: any = null;
  basicStandardProcessList: any[] = [];

  //로딩
  isLoadingMappings = true;
  isLoadingProcessList = true;

  fields: any[] = [
     this.$t('view.repo.eventLogModal.propertyName'), 
     this.$t('view.repo.eventLogModal.columnName'), 
     this.$t('view.repo.eventLogModal.example')
  ];

  getValidationStateEventName({ dirty, validated, valid = null }: any, mode: string) {
    if(mode == 'create'){
      if(this.haveSameNameEvent('create')){
        return false;
      }else{
        return dirty || validated ? valid : null;
      }
    }else{
      //(mode == 'modify')
      if(this.haveSameNameEvent('modify')){
        return false;
      }else{
        return dirty || validated ? valid : null;
      }
    }
  }

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
    const metadata = JSON.parse(this.myInfo.metadata);
    this.dataSetCreateLimit = metadata.limitations.dataset.total;
    this.eventCreateLimit = metadata.limitations.dataset.eventRepositoryTotal;
    this.eventCreateTotalLimit = metadata.limitations.eventRepository.total;

    this.$store.dispatch('repository/getRepoEventIndex', {
        datasetId: this.selectedCard.id, //this.$route.params.dataSetId,
        projectId: this.$store.getters['sso/getProjectId']
      }).then((res: any) => {
        this.repoEventIndex = res.data.data;
      });

    this.whenModifyEvent();
  }

  // 이벤트 수정 창 띄우기
  whenModifyEvent() {

    this.isLoadingMappings = true;
    this.isLoadingProcessList = true;

    this.modifyEventName = this.eventForModify.name;
    this.originalEventName = this.eventForModify.name;
    this.modifyEventDesc = this.eventForModify.description;

    this.processForModify = 'none';

    this.mappingList = [];
        
    // 선택한 프로세스 모델 정보 표시
       this.$store.dispatch('repository/getRepoEventView', {
          projectId: this.projectId,
          eventId: this.eventForModify.id
    }).then((res0: any) => {
      const data = res0.data.data;

      this.relRepository = data.relatedRepositoryName != undefined ? data.relatedRepositoryName : '-';

      //매핑 매칭 목록
      
      const datasetId = this.eventForModify.id.split('_')[0];
      this.$store.dispatch('repository/getRepoDataView', {
          datasetId: datasetId,
          projectId: this.projectId,
      }).then((res1: any) => {

        const fields = res1.data.data.fields;
        const mappings = data.origin.mappings;

        this.$store.dispatch('repository/getRepoDataViewData', {
            projectId: this.projectId,
            datasetId: datasetId,
            page: 1,
            size: 10,
        }).then((res2: any) =>{

            const exampleData = res2.data.data.results[0];

            this.mappingList = [];
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
            this.isLoadingMappings = false;

            //표준 프로세스
            const relations = (data.relations != null && data.relations != undefined) ? Object.values(data.relations) : []; //_type= "ProcessModel | Graph | GraphImpl"
            const referenceModelId = data.referenceModel != undefined ? data.referenceModel.id : null;

            this.processList = [];
            const processType = ["ProcessModel", "Graph", "GraphImpl"]; 
            relations.forEach((relation: any) => {
              if(processType.includes(relation._type))
              {
                const id = relation.id;
                const name = relation.name;
                const createdByName = relation.createdByName;
                const isDeployed = relation.id == referenceModelId;
                const process = {id: id, name: name, createdByName: createdByName, isDeployed: isDeployed};
                this.processList.push(process);
              }
            });
            this.isLoadingProcessList = false;

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
    if(this.selectedRight.index != -1) {
      this.registeredProcessList.splice(this.selectedRight.index, 1);
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    }
    
  }

  selectProcess(id: string, index: number, direction: string) {
    if (direction === 'left') {
      this.selectedLeft.id = id;
      this.selectedLeft.index = index;
      this.selectedRight.id = '';
    } else if (direction === 'right') {
      this.selectedRight.id = id;
      this.selectedRight.index = index;
      this.selectedLeft.id = '';
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

    if (originEvent.path[1] === this.$refs.leftContent.$el) {
      evt.item.remove();
      this.registeredProcessList.splice(evt.oldDraggableIndex, 1);
      
      this.basicStandardProcessList = [];
    }
  }
  //draganddrop end

  closeModal() {
    this.$emit('closeEventModifyModal');
  }

  goToCreateSubEvent() {
  
    //this.$router.push({
    //  name: 'SubRepositoryNextStep',
    //  params: {
    //    datasetId: this.selectedCard.id
    //  }
    //}); 

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

    this.basicStandardProcess = this.registeredProcessList[index];
    this.basicStandardProcessList = [index];
    
  }

  get isMobile() {
    return utils.isMobile();
  }
}
</script>
