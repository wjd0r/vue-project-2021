<template>
  <div class="animated fadeIn main-common-component event-group-component">
    <b-row class="event-group-content">
      <!-- left -->
      <b-col cols="3" class="left-component">
        <div class="left-content">
          <div class="group-component">
            <div class="group-content">
              <div class="content-header">
                <div class="title">{{ $t('view.repo.event.eventGroup.title') }}</div>
                <span class="count-text">({{eventGroupCount+'/'+eventGroupCreateLimit}})</span>
                <div class="right-align">
                  <!-- 멀티 선택 -->
                  <template v-if="isMultiSelectEG">
                    <span class="delete-selected text-right" @click="exportMultiEG">{{ $t('view.repo.button.export') }}</span>
                    <span class="delete-selected text-right" v-if="roleApplied()" @click="whenDeleteMultiEGModalShow()">{{ $t('view.repo.multiSelect.delete') }}</span>
                    <span class="delete-selected text-right" @click="isMultiSelectEG = false">{{ $t('view.repo.multiSelect.cancel') }}</span>
                  </template>
                  <!-- 멀티 선택 -->
                  <span class="delete-selected text-right" v-else @click="isMultiSelectEG = true; setEventGroupCards();">{{ $t('view.repo.multiSelect.select') }}</span>
                </div>
              </div>
              <!-- 목록 -->
              <div class="content-body">
                <div class="list-component">
                  <div class="list-content">
                    <div class="list">

                      <div class="card group new-create" @click="whenCreateEgroup()">
                        <b-icon-plus></b-icon-plus>
                      </div>

                      <!-- content -->
                      <div v-for="(item, index) in userEventGroup" :key=index class="group" :class="{ active: selectedEventGroup.id === item.id && !isMultiSelectEG }" @click.passive="checkMultiSelectEG(item, $event)">
                      <div class="card group"  :id="'egroup-'+item.id" @click="clickEventGroup(item)">
                        <div class="content-header"><!--new -> item -->
                          <b-form-checkbox v-if="isMultiSelectEG" v-model="multiSelectedEG" :value="item.id"></b-form-checkbox>
                          <h4 class="title">{{item.name}}<!--원본 데이터 2--></h4>
                          <b-dropdown size="sm"  variant="link" toggle-class="text-decoration-none" no-caret>
                              <template v-slot:button-content>
                                  <div class="ico-title-menu" alt="메뉴 드롭다운 아이콘"></div>
                              </template>
                              <b-dropdown-item @click.prevent="exportDataset(item)"><span>{{ $t('view.repo.button.export') }}</span></b-dropdown-item>
                              <b-dropdown-divider></b-dropdown-divider>
                              <b-dropdown-item @click.prevent="clickEGroupModify(item);"><span>{{ $t('view.repo.cardDropDown.modify') }}</span></b-dropdown-item>
                              <b-dropdown-divider></b-dropdown-divider>
                              <b-dropdown-item @click.prevent="clickEgroupDelete(item);"><span>{{ $t('view.repo.cardDropDown.delete') }}</span></b-dropdown-item>
                          </b-dropdown>
                        </div>
                        <div class="content-body">
                          <span class="date-text">{{item.modified != null ? item.modified.split('T')[0] : '0000-00-00'}}<!--2021-01-23--></span>
                        </div>
                      </div>
                      </div>
                      <!-- content -->
                    </div>

                  </div>
                </div>
              </div>
              <!-- 목록 -->
            </div>
          </div>
        </div>
      </b-col>
      <!-- left -->

      <!-- right -->
      <b-col cols="9" class="right-component">
        <div class="right-content">
          <div class="event-component">
            <div class="event-content">
              <div class="content-header">
                <div class="title">{{ $t('view.repo.event.eventLog.title') }}</div>
                <span class="count-text">({{eventCount+'/'+eventCreateLimit}})</span>
                <div class="right-align">
                  <!-- 멀티 선택 -->
                  <template v-if="isMultiSelectE">
                    <span class="delete-selected text-right" @click="exportMultiE">{{ $t('view.repo.button.export') }}</span>
                    <span class="delete-selected text-right" v-if="roleApplied()" @click="whenDeleteMultiEventModalShow()">{{ $t('view.repo.multiSelect.delete') }}</span>
                    <span class="delete-selected text-right" @click="isMultiSelectE = false">{{ $t('view.repo.multiSelect.cancel') }}</span>
                  </template>
                  <!-- 멀티 선택 -->
                  <span class="delete-selected text-right" v-else-if="Object.keys(selectedEventGroup).length != 0 && !isMultiSelectEG" @click="isMultiSelectE = true">{{ $t('view.repo.multiSelect.select') }}</span>
                </div>
              </div>
              <div class="content-middle">
                <b-button variant="primary" @click="whenCreateEvent()" :disabled="Object.keys(selectedEventGroup).length == 0">{{ $t('view.repo.event.eventLog.createBtn') }}</b-button>
              </div>
              <!-- 목록 -->
              <div class="content-body">
                <div class="list-component">
                  <div class="list-content">
                    <div class="list">
                      <!-- content -->
                      <div v-for="item in userEvent" :key=item.key class="event" :class="{ active: selectedEvent.id === item.id && !isMultiSelectE }" @click.passive="checkMultiSelectE(item, $event)">
                      <div class="card event">
                        <div class="content-header">
                          <b-form-checkbox v-if="isMultiSelectE" v-model="multiSelectedE" :value="item.id"></b-form-checkbox>
                          <h4 class="title" @click.once="clickEvent(item)">{{item.name}}</h4>
                          <b-dropdown size="sm"  variant="link" toggle-class="text-decoration-none" no-caret>
                              <template v-slot:button-content>
                                  <div class="ico-title-menu" alt="메뉴 드롭다운 아이콘"></div>
                              </template>
                              <b-dropdown-item @click.prevent="exportRepository(item)"><span>{{ $t('view.repo.button.export') }}</span></b-dropdown-item>
                              <b-dropdown-divider></b-dropdown-divider>
                              <b-dropdown-item @click.prevent="clickEventModify(item);"><span>{{ $t('view.repo.cardDropDown.modify') }}</span></b-dropdown-item>
                              <b-dropdown-divider></b-dropdown-divider>
                              <b-dropdown-item @click.prevent="clickEventDelete(item);"><span>{{ $t('view.repo.cardDropDown.delete') }}</span></b-dropdown-item>
                          </b-dropdown>
                        </div>
                        <div class="content-body" @click.once="clickEvent(item)">
                          <!--<div class="discription">{{item.description}}</div>-->
                          <div class="discription">{{getProcessModelName(item)}}</div>
                          <span class="date-text">{{item.modified != null ? item.modified.split('T')[0] : '0000-00-00'}}<!--2021-01-23--></span>
                        </div>
                      </div>
                      </div>
                      <!-- content -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- 목록 -->
            </div>
          </div>
        </div>
      </b-col>
      <!-- right -->
    </b-row>

    <!-- 그룹 생성 modal -->
    <b-modal id="groupShow" v-model="groupCreateShow" size="xl" :title="$t('view.repo.event.eventGroup.modal.createTitle')" hide-footer>
      <EventGroupCreate @setEventGroupCards="setEventGroupCards" @closeGroupCreateShow="closeGroupCreateShow" @whenCreateEvent="whenCreateEvent" @setSelectedEventGroup="setSelectedEventGroup" @clickCreateEGroup="clickCreateEGroup" :repoDataIndex="repoDataIndex"/>
    </b-modal>
    <!-- 그룹 생성 modal -->

    <!-- 그룹 수정 modal -->
    <b-modal v-model="groupModifyShow" size="xl" :title="$t('view.repo.event.eventGroup.modal.modifyTitle')" hide-footer>
      <ValidationObserver ref="form" tag="form" @submit.prevent="modifyEventGroupInfo">
        <div class="content-body">
          <div class="form-content">
            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventGroup.modal.groupName')">
              <b-input-group prepend="[D]"> 
                <b-form-input :value="modifyGroupName" @input.native="modifyGroupName = $event.target.value" v-model="modifyGroupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" :state="getValidationStateEgroupName(validationContext)"></b-form-input>
                <b-form-invalid-feedback>
                  <span v-if="haveSameNameEgroup()">{{$t("view.repo.alert.sameNameEventGroup")}}</span>
                  <span v-if="modifyGroupName != '' && regexTest(modifyGroupName)">{{$t("view.repo.alert.regexTest")}}</span>
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventGroup.modal.groupDesc')">
                <b-form-textarea v-model="modifyGroupDesc" :placeholder="$t('view.repo.event.eventGroup.modal.groupDescPlaceHolder')"></b-form-textarea>
            </b-form-group>

            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventGroup.modal.fileName')">
              <b-form-input v-model="fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
            </b-form-group>
          </div>

          <div class="btn-footer-broup"> 
            <b-button type="submit" variant="primary">{{ $t('view.repo.button.modify') }}</b-button>
            <b-button type="button" @click="groupModifyShow = false">{{ $t('view.repo.button.cancel') }}</b-button>
          </div>
        </div>
      </ValidationObserver>
    </b-modal>
    <!-- 그룹 수정 modal -->

    <!-- 그룹 삭제 modal -->
    <!--<b-modal v-model="deleteEGroupShow"  title="원본 데이터 삭제" @ok="deleteEventGroupInfo()" ok-variant="danger" centered>
      <span>원본 데이터을 삭제하시겠습니까?</span>
    </b-modal>-->

    <!--<b-modal v-model="deleteMultiEGroupShow"  title="원본 데이터 삭제" @ok="deleteMultiEG()" ok-variant="danger" centered>
      <span>원본 데이터을 삭제하시겠습니까?</span>
    </b-modal>-->
    <!-- 그룹 삭제 modal -->
      
    <!-- 이벤트 생성 modal -->
    <b-modal id="eventShow" v-model="eventCreateShow" size="xl" :title="$t('view.repo.event.eventLog.modal.createTitle')" hide-footer>
      <ValidationObserver ref="form" tag="form" @submit.prevent="createNewEvent">
        <div class="content-body">
          <div class="form-content">
            <b-form-group  label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventName')">
              <b-input-group prepend="[L]"> 
                <b-form-input :value="newEventName" @input.native="newEventName = $event.target.value" v-model="newEventName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventLog.modal.eventNamePlaceHolder')" :state="getValidationStateEventName(validationContext, 'create')"></b-form-input>
                <b-form-invalid-feedback>
                  <span v-if="haveSameNameEvent('create')">{{$t("view.repo.alert.sameNameEvent")}}</span>
                  <span v-if="newEventName != '' && regexTest(newEventName)">{{$t("view.repo.alert.regexTest")}}</span>
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventDesc')">
                <b-form-textarea v-model="newEventDesc" :placeholder="$t('view.repo.event.eventLog.modal.eventDescPlaceHolder')"></b-form-textarea>
            </b-form-group>

            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.selectProcess')" >
              <b-form-select v-model="processForCreate">
                <b-form-select-option value ="none">{{$t('view.repo.event.eventLog.modal.none')}}</b-form-select-option>
                <template v-for="(v, k) in processList">
                  <b-form-select-option :value="k" :key="k">{{ v.name }}</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
              
          </div>

          <div class="btn-footer-broup"> 
            <b-button type="submit" variant="primary">{{ $t('view.repo.button.create') }}</b-button>
            <b-button type="button" @click="eventCreateShow = false">{{ $t('view.repo.button.cancel') }}</b-button>
          </div>
        </div>
      </ValidationObserver>
    </b-modal>
    <!-- 이벤트 생성 modal -->

    <!-- 이벤트 수정 modal -->
    <b-modal id="eventShow" v-model="eventModifyShow" size="xl" :title="$t('view.repo.event.eventLog.modal.modifyTitle')" hide-footer>
      <ValidationObserver ref="form" tag="form" @submit.prevent="modifyEventInfo">
        <div class="content-body">
          <div class="form-content">
            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventName')">
              <b-input-group prepend="[L]"> 
                <b-form-input :value="modifyEventName" @input.native="modifyEventName = $event.target.value" v-model="modifyEventName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventLog.modal.eventNamePlaceHolder')" :state="getValidationStateEventName(validationContext, 'modify')"></b-form-input>
                <b-form-invalid-feedback>
                  <span v-if="haveSameNameEvent('modify')">{{$t("view.repo.alert.sameNameEvent")}}</span>
                  <span v-if="modifyEventName != '' && regexTest(modifyEventName)">{{$t("view.repo.alert.regexTest")}}</span>
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.eventDesc')">
                <b-form-textarea v-model="modifyEventDesc" :placeholder="$t('view.repo.event.eventLog.modal.eventDescPlaceHolder')"></b-form-textarea>
            </b-form-group>

            <b-form-group  label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventLog.modal.selectProcess')">
              <b-form-select v-model="processForModify">
                <b-form-select-option value="none">{{$t('view.repo.event.eventLog.modal.none')}}</b-form-select-option>
                <template v-for="(v, k) in processList">
                  <b-form-select-option :value="k" :key="k">{{ v.name }}</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </div>

          <div class="mapping-list-component">
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
          </div>

          <div class="btn-footer-broup"> 
            <b-button type="submit" variant="primary">{{ $t('view.repo.button.modify') }}</b-button>
            <b-button type="button" @click.prevent="eventModifyShow = false">{{ $t('view.repo.button.cancel') }}</b-button>
          </div>
        </div>
      </ValidationObserver>
    </b-modal>
    <!-- 이벤트 수정 modal -->

    <!-- 이벤트 삭제 modal -->
    <!--<b-modal v-model="deleteEventShow"  title="이벤트 삭제" @ok="deleteEventInfo()" ok-variant="danger" centered>
      <span>이벤트를 삭제하시겠습니까?</span>
    </b-modal>-->

    <!--<b-modal v-model="deleteMultiEventShow"  title="이벤트 삭제" @ok="deleteMultiE()" ok-variant="danger" centered>
      <span>이벤트를 삭제하시겠습니까?</span>
    </b-modal>-->
    <!-- 이벤트 삭제 modal -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import $ from 'jquery';
import _ from 'lodash';
import EventGroupCreate from './components/EventGroupCreate.vue';

import { utils } from '@/common';
import store from '../../store';

@Component({
  components: {
    EventGroupCreate
  },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    myInfo: 'sso/getMyInfo',
  }),
})
export default class Event extends Vue {

  projectId!: any;
  myInfo!: any;
  repoDataIndex: any;
  repoEventIndex: any;


  repoEventView: any;
  // 내 원본 데이터 목록, 갯수
  userEventGroup: any = [];
  eventGroupCount: number = 0;

  // 내 이벤트 목록, 갯수
  userEvent: any = [];
  eventCount: number = 0;

  // 원본 데이터 생성 modal 표시
  groupCreateShow: boolean = false; 

  // 원본 데이터 수정 modal 표시
  groupModifyShow: boolean = false;
  // 원본 데이터 수정 그룹 이름, 설명, 파일이름
  modifyGroupName: string = '';
  modifyGroupDesc: string = '';
  fileName: string = '';

  // 원본 데이터 수정, 삭제를 위한 선택한 원본 데이터 정보
  groupForModify: any;
  // 이벤트 수정, 삭제를 위해 선택한 이벤트 정보
  eventForModify: any;

  // 원본 데이터 삭제 modal 표시
  //deleteEGroupShow: boolean = false;
  //deleteMultiEGroupShow: boolean = false;

  // 이벤트 생성 modal 표시
  eventCreateShow: boolean = false;

  // 선택한 원본 데이터 정보
  selectedEventGroup: any = {};

  selectedEvent: any = {};

  // 이벤트 수정 modal 표시
  eventModifyShow: boolean = false;

  // 이벤트 생성의 이름, 설명
  newEventName: string = '';
  newEventDesc: string = '';

  // 이벤트 수정의 이름, 설명
  modifyEventName: string = '';
  modifyEventDesc: string = '';

  // 이벤트 삭제 modal 표시
  //deleteEventShow: boolean = false;
  //deleteMultiEventShow: boolean = false;

  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };

  // 프로세스 모델 : 이벤트 생성, 수정, 목록
  processForCreate: any = 'none';
  processForModify: any = 'none';
  processList: any = [];

  // 이벤트 수정의 매핑 매칭 목록
  mappingList: any = [];

  //demo create limit of event-group and event
  eventGroupCreateLimit: number = 0;
  eventCreateLimit: number = 0;
  eventCreateTotalLimit: number = 0;

  isMultiSelectEG: boolean = false;
  multiSelectedEG: any[] = [];

  isMultiSelectE: boolean = false;
  multiSelectedE: any[] = [];

  isSelectShow: boolean = false;
  isSelectShowEvent: boolean = false;

  clickEventOnce: boolean = false;

  originalGroupName: string = '';
  originalEventName: string = '';
  
  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;


  @Watch('isMultiSelectEG')
  onIsMultiSelectEGChange(newVal: boolean) {
    if (newVal) this.multiSelectedEG = [];
  }

  @Watch('isMultiSelectE')
  onIsMultiSelectEChange(newVal: boolean) {
    if (newVal) this.multiSelectedE = [];
  }

  constructor() {
    super();

    this.repoEventView = [];
    this.repoDataIndex = [];
  }

  mounted() {
    // 내 원본 데이터 목록 가져와 표시하기
    this.setEventGroupCards();

    const metadata = JSON.parse(this.myInfo.metadata);
    this.eventGroupCreateLimit = metadata.limitations.dataset.total;
    this.eventCreateLimit = metadata.limitations.dataset.eventRepositoryTotal;
    this.eventCreateTotalLimit = metadata.limitations.eventRepository.total;

  }

  // 내 원본 데이터 목록 가져와 표시하기
  setEventGroupCards() {

      // 내 원본 데이터 목록 가져오기(API)
      const params = {
        projectId:  this.projectId,
      };

      this.$store.dispatch('repository/getRepoDataIndex', params).then((res: any) => {
         
         const elements = res.data.data.elements;
         this.repoDataIndex = res.data.data;
        /*
        "ipg20210316071441" : {
        "id" : "ipg20210316071441",
        "name" : "Test resource group",
        "created" : "2021-03-16T07:14:41.550+0000",
        "modified" : "2021-03-16T07:14:41.550+0000",
        "_type" : "ResourceGroupImpl",
        "project" : {
          "_type" : "ProjectImpl",
          "id" : "iprtest"
          }
        }
        */
         this.userEventGroup = [];
         for(const key in elements){
            this.userEventGroup.push(elements[key]);
            this.userEventGroup.sort((a: any, b: any) => {
               return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
         }
         // 내 원본 데이터 개수 setting
         this.setEventGroupCount();
         this.userEvent = [];
         this.setEventCount();
         this.selectedEventGroup = {};

          this.userEventGroup.forEach((element: any) => {
            const uid = '#egroup-' + element.id;
            $(uid).attr('class', 'card group');
          });
         
      });
      
      
  }

  // 내 원본 데이터 개수
  setEventGroupCount() {
      this.eventGroupCount = this.userEventGroup.length;
  }

  // 내 원본 데이터 선택
  clickEventGroup(item: any) {

    if(this.isMultiSelectEG) return;

    //선택한 원본 데이터
    if(this.selectedEventGroup.id == item.id) return;
    this.selectedEventGroup = item;
    //이벤트 목록 표시
    this.setEventCards(item.id);

    //원본 데이터 표시
    this.userEventGroup.forEach((element: any) => {
      const uid = '#egroup-' + element.id;
      $(uid).attr('class', 'card group');
    });
    $('#egroup-'+item.id).attr('class', 'card group active');

  }

  //원본 데이터 생성 + 버튼 클릭 시
  whenCreateEgroup() {

    //원본 데이터 생성 수 제한
    if(this.eventGroupCount >= this.eventGroupCreateLimit){
      //modal
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const msg = this.$t("view.repo.alert.groupCreate.msg", {count: this.eventGroupCreateLimit}).toString();
      //"원본 데이터은 " + this.eventGroupCreateLimit + "개 까지 생성 가능합니다."
      utils.bvModalmsgBoxOk(this, title, msg);
      return;
    }

    this.groupCreateShow = true; 
    this.selectedEventGroup = {};
    this.userEvent = [];
    this.setEventCount();

    //원본 데이터 표시 해제
    this.userEventGroup.forEach((element: any) => {
      const uid = '#egroup-' + element.id;
      $(uid).attr('class', 'card group');
    });
  }

  // 원본 데이터 수정을 위한 데이터 전달
  setGroupForModify(item: any) {
    this.groupForModify = item;

    const egroupId = item.id;

    // 원본 데이터 수정 창 그룹 이름, 설명, 파일이름
    this.$store.dispatch('repository/getRepoDataView', {
      datasetId: egroupId,
			projectId: this.projectId
      }).then((res: any) => {
         this.modifyGroupName = (res.data.data.name).replace('[D]', '');
         this.originalGroupName = (res.data.data.name).replace('[D]', '');
         this.modifyGroupDesc = res.data.data.description;
         this.fileName = res.data.data.origin.orginalFilenames[0];
         
      });

  }

  haveSameNameEgroup() {
      const elements = this.repoDataIndex.elements;
      let sameNameEventGroup: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if((this.groupForModify.id != id) 
          && (project.name == "[D]"+this.modifyGroupName)){
          sameNameEventGroup = true;
        }
      }
      return sameNameEventGroup;
  }

  regexTest(name: string) {
    const regex = new RegExp(this.regEx);
    return !regex.test(name); //정규표현식 일치 안할 때 true 리턴
  }

  // 내 원본 데이터 수정
  modifyEventGroupInfo() {

    //공백 체크
		if(this.modifyGroupName.trim() == '') {
			const title = this.$t("view.repo.alert.title.alarm").toString();
			const content = this.$t("view.repo.alert.blankTest").toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});

			return;
		}

    //regex 체크
    if(this.regexTest(this.modifyGroupName)) {
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.regexTest").toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
      return;
    }


      //이름 중복 체크
      const elements = this.repoDataIndex.elements;
      let sameNameEventGroup: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if((this.groupForModify.id != id) 
          && (project.name == "[D]"+this.modifyGroupName)){
          sameNameEventGroup = true;
        }
      }

      if(sameNameEventGroup){

        this.modifyGroupName = this.originalGroupName;
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.sameNameEventGroup").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
        return;
      }
      
      const egroupId = this.groupForModify.id;
      this.$store.dispatch('repository/getRepoDataSave', {
        datasetId: egroupId,
        datasetName: this.modifyGroupName,
        datasetDesc: this.modifyGroupDesc,
        projectId: this.projectId
      }).then((res: any) => {
        if(res.data.data != null){
          this.setEventGroupCards();
          //원본 데이터 표시 해제
          this.userEventGroup.forEach((element: any) => {
            const uid = '#egroup-' + element.id;
            $(uid).attr('class', 'card group');
          });

          this.groupModifyShow = false;

          this.groupForModify = null;
          this.selectedEventGroup = {};
        }
          
      });

     
  }

  // 내 원본 데이터 삭제
  deleteEventGroupInfo() {
      
      // 삭제API
      this.$store.dispatch('repository/getRepoDataDelete', [ {
        "_type" : "DatasetSelectConfiguration",
        "selectors" : [ {
          "id" : this.groupForModify.id, //"ids20210316010257",
          "_type" : "Dataset",
          "project" : {
            "id" : this.projectId, //"iprtest",
            "_type" : "Project"
          }
        } ]
      } ]).then((res: any) => {
          if(res.data.data == true){
            this.setEventGroupCards();

            //원본 데이터 표시 해제
            this.userEventGroup.forEach((element: any) => {
              const uid = '#egroup-' + element.id;
              $(uid).attr('class', 'card group');
            });

            this.groupForModify = null;
            this.selectedEventGroup = {};
          }
      });
      
  }

  // 이벤트 목록 표시(id?)
  setEventCards(id: any) {
      
      // 내 원본 데이터 목록 가져오기(API)
      this.$store.dispatch('repository/getRepoEventIndex', {
        projectId: this.projectId,
        datasetId: this.selectedEventGroup.id
      }).then((res: any) => {
        this.repoEventIndex = res.data.data;
         const elements = res.data.data.elements;
         this.userEvent = [];
         for(const key in elements){
          this.userEvent.push(elements[key]); 
        }

        this.userEvent.sort((a: any, b: any) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        // 내 원본 데이터 개수 setting
        this.setEventCount();
      });      
  }

  getProcessModelName(repository: any) {
      
      if(repository.attributes["saas.firstDeployedModel"].value != undefined
        || repository.attributes["saas.firstDeployedModel"].value != null){
         const name = repository.attributes["saas.firstDeployedModel"].value.name;
         return name;
      }else{
         return this.$t('view.repo.alert.noProcess');
      }
   }

  
  // 내 이벤트 개수
  setEventCount() {
      this.eventCount = this.userEvent.length;
  }

  // 이벤트 생성 버튼 클릭 시
  whenCreateEvent() {

    //이벤트 생성 수 제한
    this.$store.dispatch('repository/getRepoEventIndex', {
        projectId: this.projectId,
    }).then((res: any) => {

      this.repoEventIndex = res.data.data;

      const totalEventCount = Object.keys(res.data.data.elements).length; 

      const title = this.$t("view.repo.alert.title.alarm").toString();
      if(totalEventCount >= this.eventCreateTotalLimit){
        // 전체 이벤트 생성 수 제한
        //모달
        //"전체 이벤트는 총 " + this.eventCreateTotalLimit + "개 까지 생성 가능합니다."
        const msg = this.$t("view.repo.alert.eventCreate.wholeMsg", {count: this.eventCreateTotalLimit }).toString();
        utils.bvModalmsgBoxOk(this, title, msg);
        return;
      }else if(this.eventCount >= this.eventCreateLimit){
        // 그룹당 이벤트 생성 수 제한 
        //모달
        //"그룹 당 이벤트는 " + this.eventCreateLimit + "개 까지 생성 가능합니다."
        const msg = this.$t("view.repo.alert.eventCreate.perGroupMsg", {count: this.eventCreateLimit }).toString();
        utils.bvModalmsgBoxOk(this, title, msg);
        return;
      }
      this.eventCreateShow = true;

      this.newEventName = '';
      this.newEventDesc = '';

      this.$store.dispatch('standard/getProcessList', [ {
        "_type" : "ProcessModelSelectConfiguration",
        "selectors" : [ {
          "_type" : "ProcessModel",
          "project" : {
            "id" : this.projectId,
            "_type" : "Project"
          }
        } ]
      } ]).then((res: any) => {
        const elements = res.data.data.elements;
         this.processList = [];
         for(const key in elements){
            this.processList.push(elements[key]);
         }
      });
      this.processForCreate = 'none';
    });
  }

  haveSameNameEvent(mode: string) {
    if(mode == 'create'){
      const elements = this.repoEventIndex.elements;
      let sameNameEvent: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if(project.name == "[L]"+this.newEventName){
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
          && (project.name == "[L]"+this.modifyEventName)){
          sameNameEvent = true;
        }
      }
      return sameNameEvent;
    }
  }

  // 이벤트 생성 창에서 확인 버튼 클릭 시
  createNewEvent() {

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

      //이름 중복 체크
      const elements = this.repoEventIndex.elements;
      let sameNameEvent: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if(project.name == "[L]"+this.newEventName){
          sameNameEvent = true;
        }
      }

      if(sameNameEvent){

        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.sameNameEvent").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
        return;
      }

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
        eventName: "[L]" + this.newEventName,
        eventDesc: this.newEventDesc,
        processName: processName,
        processId: processId,
        processIdx: this.processForCreate
      });

      
      const groupInfo = store.getters['repository/getGroupInfo'];
      if(Object.keys(this.selectedEventGroup).length == 0){
        this.selectedEventGroup = groupInfo;
        this.$store.commit('repository/setGroupInfo', {});
      }

      const projectId = this.selectedEventGroup.project.id;
      const datasetId = this.selectedEventGroup.id;

      this.$router.push({
      name: 'eventMapping',
      params: {
        projectId: projectId,
        datasetId: datasetId,
      }
    });
  }

  setEventForModify(item: any) {
    this.eventForModify = item;
  }

  // 이벤트 수정을 클릭했을때
  whenModifyEvent() {
    this.modifyEventName = (this.eventForModify.name).replace('[L]','');
    this.originalEventName = (this.eventForModify.name).replace('[L]','');
    this.modifyEventDesc = this.eventForModify.description;

    this.processForModify = 'none';

    this.mappingList = [];

    this.$store.dispatch('standard/getProcessList', [ {
        "_type" : "ProcessModelSelectConfiguration",
        "selectors" : [ {
          "_type" : "ProcessModel",
          "project" : {
            "id" : this.projectId,
            "_type" : "Project"
          }
        } ]
      } ]).then((res1: any) => {
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
          if(data.relations != null){
            const keys = Object.keys(data.relations); //id
            let key: any = null;
            keys.forEach((element: any) => {
              if(data.relations[element]._type == "ProcessModel"){
                key = element;
              }
            });

            if(key != null){
              let index = 0;
              this.processList.forEach((element: any) => {
                if(element.id == key){
                  this.processForModify = index;
                  return;
                }
                index++;
              });
            }
            
          }

          //매핑 매칭 목록
          //this.mappingList = [];
          this.$store.dispatch('repository/getRepoDataView', {
            datasetId: this.selectedEventGroup.id,
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

              /*const mapInHangul: any = {'ci': '케이스 아이디', 'ea': '액티비티', 
              'es': '시작시간', 'ec': '종료시간', 'eo': '담당자', 'er': '리소스', 'cu': '케이스 속성',
              'eu': '이벤트 속성', 'et': '운영시간'}; */
                const mapInHangul: any = {'ci': caseId, 'ea': activity, 
                'es': startTime, 'ec': endTime, 'eo': originator, 'er': resource, 'cu': caseProperty,
                'eu': eventProperty, 'et': endTime}; //'et': useTime
                const times = ['es', 'ec', 'et'];
                const hangul = mapInHangul[mapped];
                const item: any = {};
                item[hangul] = column;
                this.mappingList.push( [hangul, column + (times.includes(mapped) ? ' ('+mappings[key].split('|')[1]+')' : '')] );
              }
            });
          });
        });
      });

      

    
  }

  // 내 이벤트 수정
  modifyEventInfo() {

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

      //이름 중복 체크
      const elements = this.repoEventIndex.elements;
      let sameNameEvent: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if((this.eventForModify.id != id) 
          && (project.name == "[L]"+this.modifyEventName)){
          sameNameEvent = true;
        }
      }

      if(sameNameEvent){

        this.modifyEventName = this.originalEventName;
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.sameNameEvent").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      this.selectedEvent = {};

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
        if(this.processForModify != 'none'){
          const pid = this.processList[this.processForModify].id;
          newRelations[pid] = {
            "_type" : "GraphImpl",
            "id" : pid
          }
          /* 
                "relations" : {
                  "ipp20210316071424" : {
                    "_type" : "GraphImpl",
                    "id" : "ipp20210316071424"
                  }
                }
          */
        }
        
        //이벤트 수정
        const params = {
          eventId: eId,
          eventName: this.modifyEventName,
          eventDesc: this.modifyEventDesc,
          projectId: this.projectId,
          relations: newRelations,
        };
        this.$store.dispatch('repository/getRepoEventSave', params).then((res: any) => {
          if(res.data.data != null){
            this.setEventCards(this.selectedEventGroup.id);
          }
        });

        this.eventForModify = null;
        this.eventModifyShow = false;
      }
  }

  // 내 이벤트 삭제
  deleteEventInfo() {

      //item = this.eventForModify
      this.selectedEvent = {};
      
      this.$store.dispatch('repository/getRepoEventDelete', [ {
        "_type" : "EventRepositorySelectConfiguration",
        "selectors" : [ {
          "id" : this.eventForModify.id,
          "_type" : "EventRepository",
          "project" : {
          "id" : this.projectId,
          "_type" : "Project"
        }
      } ],
      "page" : 0,
      "size" : 100
    } ]).then((res: any) => {
          if(res.data.data == true)
            this.setEventCards(this.selectedEventGroup.id);
      });
      
  }

  getValidationState({ dirty, validated, valid = null }: any) {
    return dirty || validated ? valid : null;
  }

  getValidationStateEgroupName({ dirty, validated, valid = null }: any) {
    if(this.haveSameNameEgroup()){
      return false;
    }else{
      return dirty || validated ? valid : null;
    }
  }

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

  //이벤트 카드 클릭 시
  clickEvent(item: any) {

    if(this.isMultiSelectE || this.clickEventOnce) return;
    this.clickEventOnce = true;

    this.$router.push({
      name: 'processDiscovery',
      params: {
        projectId: this.projectId,
        repositoryId: item.id,
      }
    });
  }

  //원본 데이터 생성 창 닫기
  closeGroupCreateShow() {
    this.groupCreateShow = false;
  }

  checkMultiSelectEG(pitem: any, event: any) {
    const target = event.target as Element;
    if (target.classList.contains('custom-control-input') || target.classList.contains('custom-control-label')) return;
    /*if (!this.isMultiSelect){
      this.openProject(item); 
      this.setSelectedItem(item);
    }*/
    if (this.isMultiSelectEG) {
      const index = _.findIndex(this.multiSelectedEG, (item) => {
        return item === pitem.id;
      });
    if (index !== -1) this.multiSelectedEG.splice(index, 1);
      else this.multiSelectedEG.push(pitem.id);
    }
  }

  deleteMultiEG() {
    const data = {
      _type: 'DatasetSelectConfiguration',
      selectors: [] as any[],
    };
    
    this.multiSelectedEG.forEach((item: any) => {
      data.selectors.push({
        _type: 'Dataset',
        id: item,
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      });
    });
    this.$store.dispatch('repository/getRepoDataDelete', [data]).then((res) => {
      if(res.data.data == true){
        this.isMultiSelectEG = false;
        //프로젝트 목록 가져오기
        this.setEventGroupCards();
      }
    });
   }

   exportMultiEG() {
     if(this.multiSelectedEG.length == 0){
        const info = this.$t("view.repo.alert.title.info").toString();
        const noSelect = this.$t("view.repo.alert.groupDelete.noSelect").toString();
        utils.bvModalmsgBoxOk(this, info, noSelect);
      }else{
        const items: any[] = [];
        this.multiSelectedEG.forEach((item: any) => {
          const index = _.findIndex(this.userEventGroup, (egroup: any) => {
            return egroup.id === item;
          });
          items.push({id: item, name: this.userEventGroup[index].name});
        });

        items.forEach((element: any) => {
          this.exportDataset(element);
        });
      }
     
   }



    checkMultiSelectE(pitem: any, event: any) {
    const target = event.target as Element;
    if (target.classList.contains('custom-control-input') || target.classList.contains('custom-control-label')) return;
    /*if (!this.isMultiSelectE){
      this.selectedEvent.id = pitem.id;
      //this.clickEvent(item);
      
    }*/
    if(this.isMultiSelectE){
      const index = _.findIndex(this.multiSelectedE, (item) => {
        return item === pitem.id;
      });
    if (index !== -1) this.multiSelectedE.splice(index, 1);
      else this.multiSelectedE.push(pitem.id);
    }
  }

  deleteMultiE() {
    const data = {
      _type: 'EventRepositorySelectConfiguration',
      selectors: [] as any[],
    };
    
    this.multiSelectedE.forEach((item: any) => {
      data.selectors.push({
        _type: 'EventRepository',
        id: item,
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      });
    });
    this.$store.dispatch('repository/getRepoEventDelete', [data]).then((res: any) => {
          if(res.data.data == true){
            this.isMultiSelectE = false;
            this.setEventCards(this.selectedEventGroup.id);
            this.selectedEvent = {};
          }
      });
  }

  exportMultiE() {
    if(this.multiSelectedE.length == 0){
        const info = this.$t("view.repo.alert.title.info").toString();
        const noSelect = this.$t("view.repo.alert.eventDelete.noSelect").toString();
        utils.bvModalmsgBoxOk(this, info, noSelect);
      }else{
        const items: any[] = [];
        this.multiSelectedE.forEach((item: any) => {
          const index = _.findIndex(this.userEvent, (egroup: any) => {
            return egroup.id === item;
          });
          items.push({id: item, name: this.userEvent[index].name});
        });

        items.forEach((element: any) => {
          this.exportRepository(element);
        });
      }
     
   }

  roleApplied() {
    const isNotGroupUser = this.myInfo.roleCode != "GROUP_USER";
    return isNotGroupUser;
  }
   
  exportDataset(item: any) {
    this.$store.dispatch('repository/getRepoDataView', {
      datasetId: item.id,
			projectId: this.projectId
      }).then((res: any) => {
         this.$store.dispatch('repository/getRepoDataExportFileCsvLite', [ {
        "_type" : "DatasetExportFileCsvConfiguration",
        "dataset" : {
          "id" : item.id, //"ids20210331095637",
          "_type" : "Dataset",
          "project" : {
            "id" : this.projectId, //"ipr20210331095637",
            "_type" : "Project"
          }
        },
        "delimeter" : res.data.data.origin.delimeter,//"|",
        "linebreak" : "\n"
      } ]).then((res2: any) => {

        const a = res2.data;
        const downloadLink = document.createElement("a");
        const blob = new Blob(["\ufeff"+a], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = this.projectId + '_' + item.name +'.csv';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    });
  }

  exportRepository(item: any) {
    
      this.$store.dispatch('repository/getRepoDataView', {
      datasetId: this.selectedEventGroup.id,
			projectId: this.projectId
      }).then((res: any) => {
         const delimeter = res.data.data.origin.delimeter;
         this.$store.dispatch('repository/getRepoEventExportFileCsvLite', [ {
          "_type" : "EventRepositoryExportFileCsvConfiguration",
          "repository" : {
            "id" : item.id, //"ids20210331095637_ier20210331095638",
            "_type" : "EventRepository",
            "project" : {
              "id" : this.projectId,//"ipr20210331095637",
              "_type" : "Project"
            }
          },
          "eventFilters" : [ ],
          "delimeter" : delimeter,//"|",
          "linebreak" : "\n"
        } ]).then((res2: any) => {

          const a = res2.data;
          const downloadLink = document.createElement("a");
          const blob = new Blob(["\ufeff"+a], { type: "text/csv;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = this.projectId + '_' + item.name +'.csv';

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      });
    });
  }

  setSelectedEventGroup(group: any) {
    this.selectedEventGroup = group;
  }

  clickEGroupModify(item: any) {
    //권한 체크
      const createdBy = item.createdBy;
      const resourceType = 'dataset';
      const action = 'edit';

      if(!utils.getRepoPermissions(createdBy, resourceType, action)){
         utils.noPermissionAlert(this);
      }else{
         this.groupModifyShow = true; 
         this.setGroupForModify(item);
      }
  }

  clickEgroupDelete(item: any) {
    //권한 체크
      const createdBy = item.createdBy;
      const resourceType = 'dataset';
      const action = 'delete';

      if(!utils.getRepoPermissions(createdBy, resourceType, action)){
         utils.noPermissionAlert(this);
      }else{
        
        this.setGroupForModify(item);
        //this.deleteEGroupShow = true; 
        const title = this.$t("view.repo.alert.groupDelete.title").toString();
        const content = this.$t("view.repo.alert.groupDelete.content").toString();
        const yes = this.$t('view.repo.button.yes').toString();
        const no = this.$t('view.repo.button.no').toString();
        utils.bvModalmsgBoxConfirm(this, title, content, yes, no).then((res) => {
          if(res) this.deleteEventGroupInfo();  
         });
      }
  }

  clickEventModify(item: any) {
    //권한 체크
      const createdBy = item.createdBy;
      const resourceType = 'repository';
      const action = 'delete';

      if(!utils.getRepoPermissions(createdBy, resourceType, action)){
         utils.noPermissionAlert(this);
      }else{
        this.eventModifyShow = true; 
        this.setEventForModify(item); 
        this.whenModifyEvent();
      }
  }

  clickEventDelete(item: any) {
    //권한 체크
      const createdBy = item.createdBy;
      const resourceType = 'repository';
      const action = 'delete';

      if(!utils.getRepoPermissions(createdBy, resourceType, action)){
         utils.noPermissionAlert(this);
      }else{
        this.setEventForModify(item);
        //this.deleteEventShow = true; 
        const title = this.$t("view.repo.alert.eventDelete.title").toString();
        const content = this.$t("view.repo.alert.eventDelete.content").toString();
        const yes = this.$t('view.repo.button.yes').toString()
        const no = this.$t('view.repo.button.no').toString()
        utils.bvModalmsgBoxConfirm(this, title, content, yes, no).then((res) => {
          if(res) this.deleteEventInfo();  
         });
      }
  }

  clickCreateEGroup() {
    this.isMultiSelectEG = false;
  }

  whenDeleteMultiEGModalShow() {
      if(this.multiSelectedEG.length == 0){
        const info = this.$t("view.repo.alert.title.info").toString();
        const noSelect = this.$t("view.repo.alert.groupDelete.noSelect").toString();
        utils.bvModalmsgBoxOk(this, info, noSelect);
      }else{
         //this.deleteMultiEGroupShow = true; 
        const title = this.$t("view.repo.alert.groupDelete.title").toString();
        const content = this.$t("view.repo.alert.groupDelete.content").toString();
        const yes = this.$t('view.repo.button.yes').toString()
        const no = this.$t('view.repo.button.no').toString()
        utils.bvModalmsgBoxConfirm(this, title, content, yes, no).then((res) => {
          if(res) this.deleteMultiEG();  
        });
      }
   }

   whenDeleteMultiEventModalShow() {
      if(this.multiSelectedE.length == 0){
        const info = this.$t("view.repo.alert.title.info").toString();
        const noSelect = this.$t("view.repo.alert.eventDelete.noSelect").toString();
        utils.bvModalmsgBoxOk(this, info, noSelect);
      }else{
         //this.deleteMultiEventShow = true; 
        const title = this.$t("view.repo.alert.eventDelete.title").toString();
        const content = this.$t("view.repo.alert.eventDelete.content").toString();
        const yes = this.$t('view.repo.button.yes').toString()
        const no = this.$t('view.repo.button.no').toString()
        utils.bvModalmsgBoxConfirm(this, title, content, yes, no).then((res) => {
          if(res) this.deleteMultiE();  
        });
      }
   }

}
</script>