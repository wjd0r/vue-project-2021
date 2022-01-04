<template>
  <div class="main-common-component event-component" :class="`lang-${$i18n.locale}`">
    <!-- top -->
    <Search ref="search" @search="search" @changeWorkspace="changeWorkspace()" :isLoading="isLoading" />
    <!-- top -->
    <div class="main-common-content event-content row">
      <!-- left -->
      <div class="left-component col-6">
        <div class="left-content">
          <div class="dataset-component">
            <div class="dataset-content">
              <div class="content-header">
                <div class="left-align">
                  <h4 class="title">{{ $t('view.repo.list.dataset') }}</h4>
                  <div class="count-text">({{dataLength}})</div>
                </div>
                <div class="right-align">
                  <b-dropdown id="titleDropdown" :disabled="dataSet.length == 0">
                    <b-dropdown-item @click.prevent="filter(0)" class="card-created" :class="{active: filterType == 0}">{{ $t('view.repo.label.all') }}</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click.prevent="filter(1)" class="card-created" :class="{active: filterType == 1}">{{ $t('view.repo.label.file') }}</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click.prevent="filter(2)" class="card-created" :class="{active: filterType == 2}">{{ $t('view.repo.label.database') }}</b-dropdown-item>
                  </b-dropdown>
                  <!-- 멀티 선택 -->
                  <!-- <div class="multi-select">
                    <template v-if="isMultiSelectEG">
                      <span class="selected text-right" v-if="roleApplied()" @click="whenDeleteMultiEGModalShow()">{{ $t('view.repo.multiSelect.delete') }}</span>
                      <span class="selected text-right" @click="isMultiSelectEG = false; multiSelectedEG = []">{{ $t('view.repo.multiSelect.cancel') }}</span>
                    </template>
                    <span class="selected text-right" v-else @click="isMultiSelectEG = true;">{{ $t('view.repo.multiSelect.select') }}</span>
                  </div> -->
                  <!-- 멀티 선택 -->
                  <b-button variant="primary" class="btn-primary btn-create" :class="{ 'd-none': isMobileBlock() }" @click="clickButtonDatasetCreate" desc="데이터셋 생성">{{ $t('view.repo.create.datasetCreate') }}</b-button>
                </div>
              </div>
              <div class="content-body row">
                <template v-if="isLoading">
                  <div class="loading d-flex align-items-center justify-content-center">
                    <b-spinner/>
                  </div>
                </template>
                <template v-else-if="this.dataSetCopy === 0">
                  <div class="nodata-text w-100">
                    {{ $t('view.repo.alert.standard.list.notHave') }}
                  </div>
                </template>
                <template v-else-if="this.dataSet.length === 0">
                  <div class="nodata-text w-100">
                    {{ $t('view.repo.eventList.noResults') }}
                  </div>
                </template>
                <template v-else v-for="(item, index) in this.dataSet">
                  <CardDataset
                    :key="index"
                    :item="item"
                    :isMultiSelectEG="isMultiSelectEG"
                    :multiSelectedEG="multiSelectedEG"
                    :selected-card="selected.group"
                    @checkMultiSelectEG="onCheckMultiSelectEG"
                    @clickDataSet="onClickDataSet" 
                    @rendering="onRenderingDataSet"
                    :selectedWorkspace="selectedWorkspace"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- left -->

      <!-- right -->
      <div class="right-component col-6">
        <div class="right-content">
          <div class="repository-component">
            <div class="repository-content">
              <div class="content-header">
                <div class="left-align">
                  <h4 class="title" desc="이벤트 로그">{{ $t('view.repo.event.eventLog.title') }}</h4>
                <div class="count-text">({{eventLength}})</div>
                </div>
                <div class="right-align">
                  <!-- 멀티 선택 -->
                  <div class="multi-select">
                    <template v-if="isMultiSelectE">
                      <span class="selected text-right" v-if="roleApplied()" @click="whenDeleteMultiEModalShow()">{{ $t('view.repo.multiSelect.delete') }}</span>
                      <span class="selected text-right" @click="isMultiSelectE = false; multiSelectedE = []">{{ $t('view.repo.multiSelect.cancel') }}</span>
                    </template>
                    <span class="selected text-right" v-else-if="this.eventCard.length != 0 && Object.keys(selected.group).length != 0" @click="isMultiSelectE = true; "  :class="{ 'd-none': isMobileBlock() }">{{ $t('view.repo.multiSelect.select') }}</span>
                  </div>
                  <!-- 멀티 선택 -->
                  <b-button variant="primary" class="btn-primary btn-create" @click="clickButtonRepositorCreate" :class="{ 'd-none': isMobileBlock() }" :disabled="Object.keys(selected.group).length == 0">{{$t('view.repo.button.createEvent')}}</b-button>
                </div>
              </div>
                <b-overlay :show="getShowOverlay()" class="overlay-repo-list content-body row" :class="{tablet: $mq.tablet, phone: $mq.phone}" bg-color="#F2F2F2" opacity="1">
                  <CardRepository
                    v-for="(item, index) in eventCard"
                    :key="index" 
                    :item="item" 
                    :isMultiSelectE="isMultiSelectE"
                    :multiSelectedE="multiSelectedE"
                    @checkMultiSelectE="onCheckMultiSelectE"
                    @renderingDS="onRenderingDataSet('eventDelete')"
                    @rendering="onRenderingEventCards" 
                    :selected-card="selected.group"
                    :bookmarkList="bookmarkList"
                    :selectedWorkspace="selectedWorkspace"
                  />
                  <template #overlay>
                    <template v-if="isLoadingEvent && Object.keys(selected.group).length != 0">
                        <b-spinner/>
                    </template>
                    <template v-else-if="eventCard.length === 0 && Object.keys(selected.group).length != 0">
                      <div class="nodata-text w-100">
                        {{$t('view.repo.alert.noEventRegistered')}}<!--등록된 이벤트가 없습니다.-->
                      </div>
                    </template>
                    <template v-if="Object.keys(selected.group).length == 0">
                      <div class="nodata-text w-100">
                          {{$t('view.repo.alert.selectDataset')}}<!-- 데이터셋을 선택해주세요-->
                      </div>
                    </template>
                  </template>
                </b-overlay>
            </div>
          </div>
        </div>
      </div>
      <!-- right -->
    </div>

    <b-overlay :show="showOverlay.event" :no-wrap="true" @click.native="showOverlay.event = !showOverlay.event" class="overlay-flow">
      <template #overlay>
        <CreateFlow2 :datasetId="selected.group.id"/>
      </template>
    </b-overlay>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import { utils } from '@/common';
import { mapGetters } from 'vuex';

import { UtilsMixin } from '@/mixin';
import { IKeyValueObject, ISetting } from '@/interface';

import Search from '../../components/Search.vue';
import CardDataset from '../../components/cards/CardDataset.vue';
import CardRepository from '../../components/cards/CardRepository.vue';
import CreateFlow2 from '../create/repository/CreateFlow.vue';
import _, { forEach } from 'lodash';


@Component({
 components: {
   Search,
   CardDataset,
   CardRepository,
   CreateFlow2
 },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    myInfo: 'sso/getMyInfo',
    setting: 'sso/getSetting',
    process: 'standard/getProcess',
    notification: 'notification/getNotificationList',
  }),
  ...utils.getMq(),
})
export default class EventList extends Mixins(UtilsMixin) {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 notification!: any;

  readonly myInfo!: IKeyValueObject;
  readonly projectId!: string;
  readonly setting!: ISetting;

  /*
  projectId!: string;
  myInfo!: {
    contactNumber: string;
    department: string;
    email: string;
    fullname: string;
    groupId: number;
    groupKey: string;
    groupName: string;
    id: number;
    iprProjectId: string;
    isApproved: boolean;
    isDeleted: boolean;
    licenseActiveOn: string;
    licenseExpireOn: string;
    licenseTermDays: number;
    metadata: string;
    organization: string;
    permissions: {};
    position: string;
    roleCode: string;
    roleId: number;
    roleName: string;
    roleType: string;
    storageSize: number;
    usedStorage: number;
    workspaces: any;
  };
  */
  process!: any;

  eventLimit: number = 0;


 /* 클래스 변수 선언 */
  dataSet: any = [];
  dataSetCopy: any = [];

  eventCard: any = [];
  isMultiSelectEG: boolean = false;
  multiSelectedEG: any[] = [];

  isMultiSelectE: boolean = false;
  multiSelectedE: any[] = [];

  groupModal: {
    groupModifyShow: boolean;
    modifyGroupName: string;
    originalGroupName: string;
    modifyGroupDesc: string;
    fileName: string;
    dataSet: {};
    elements: {};
  } = {
    groupModifyShow: false,
    modifyGroupName: '',
    originalGroupName: '',
    modifyGroupDesc: '',
    fileName: '',
    dataSet: {},
    elements: {},
  };

  // 모드 : basic, delect
  mode: string = 'basic';

  /* 선택된 카드 */
  selected: any = {
    groups: [],
    group: {},
    event: {},
  };

  showOverlay: {
    data: boolean;
    event: boolean;
  } = {
    data: false,
    event: false,
  };

  isLoading: boolean = true;
  isLoadingEvent: boolean = true;

  bookmarkList: any = [];

  filterType: number = 0;

 /* refs 선언 */
  $refs!: {
    search: Search;
  };

  searchWord: string = '';

 /* Watch 선언 */

 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */

  mounted() {

    //정보 언제 비울지 제대로 정의해야...
    //this.$store.commit('repository/setEventCreateInfo', {});
    //this.$store.commit('eventFilter/setSubEventCreateInfo', {});
    //this.$store.commit('repository/setDatasetCreateInfo', {});
    
    if(this.$route.params.selectedWorkspace != undefined) {
      this.$refs.search.selectedWorkspace = Number(this.$route.params.selectedWorkspace);
    }else {
      if(this.$route.query.sId != undefined){
        const message = _.find(this.notification, ['serviceId', String(this.$route.query.sId)]);
        
        if(message != undefined){
          const clientState = JSON.parse(JSON.parse(message.notificationData).client.state);

          if(clientState.eventMapping != null){
            this.$refs.search.selectedWorkspace = clientState.eventMapping.selectedWorkspace;
          }else if(clientState.eventFilter != null){
            this.$refs.search.selectedWorkspace = clientState.eventFilter.selectedWorkspace;
          }else if(clientState.dataFilter != null){
            this.$refs.search.selectedWorkspace = clientState.dataFilter.selectedWorkspace;
          }else if(clientState.datasetImporting != null){
            this.$refs.search.selectedWorkspace = clientState.datasetImporting.selectedWorkspace;
          }
        }
        
      }
    }
    
    this.onRenderingDataSet()
    .then(()=>{
      if(this.$route.params.selectedDataSetId != undefined){
        this.dataSet.forEach((dataset: any) => {
          if(dataset.id == this.$route.params.selectedDataSetId) {
            this.selected.group = dataset;
            this.onClickDataSet(this.selected.group);
            return;
          }
        });
      }

      if(this.$route.query.sId != undefined){
        const message = _.find(this.notification, ['serviceId', String(this.$route.query.sId)]);
        const clientState = JSON.parse(JSON.parse(message.notificationData).client.state);
        let dataSetId: any = undefined;

        if(clientState.eventFilter != null){
          dataSetId = clientState.eventFilter.dataSetId;
        }else if(clientState.eventMapping != null){
          dataSetId = clientState.eventMapping.dataSetId;
        }else if(clientState.dataFilter != null){
          dataSetId = clientState.dataFilter.dataSetId;
        }

        if(dataSetId != undefined){
          this.dataSet.forEach((dataset: any) => {
            if(dataset.id == dataSetId) {
              this.selected.group = dataset;
              this.onClickDataSet(this.selected.group);
              return;
            }
          });
        }
      }
    });

    
  }

  /* 메소드 선언 */
  // 원본 데이터 렌더링
  async onRenderingDataSet(type='default') {
    let datasetTemp = [];

    this.isLoading = true;
    this.dataSet = [];
    this.eventCard = [];

    const param: any = {
      search: true,
      searchWord: this.searchWord,
      projectId:  this.projectId,
      iprResourceGroupId: this.$refs.search.getSelectedResourceGroupId(),
    }

    if(this.$refs.search.getSelectedResourceGroupId() == null) {
      delete param.iprResourceGroupId;
      param.createdBy = 1;
    }

    const dataSet = await this.$store.dispatch('repository/getRepoDataIndex', param);

    this.isLoading = false;
    this.groupModal.elements = {...dataSet.data.data.elements};

    const elements = dataSet.data.data.elements;
    for(const key in elements){
      datasetTemp.push(elements[key]);
    }

    // 정렬
    datasetTemp = datasetTemp.sort(function(a: any, b: any) {
      const upperCaseA = a.name.toUpperCase();
      const upperCaseB = b.name.toUpperCase();
      
      if(upperCaseA > upperCaseB) return 1;
      if(upperCaseA < upperCaseB) return -1;
      if(upperCaseA === upperCaseB) return 0;
    });

    this.dataSet = [...datasetTemp];

    this.dataSetCopy = [];
    this.dataSetCopy = datasetTemp.slice();

    this.selected.event={};

    // selected.group 초기화 하는 로직을 이벤트 로그 삭제 할때는 막아야 함..
    if(type != 'eventDelete'){
      this.selected.group={};
    }else{
      this.onClickDataSet(this.selected.group);
    }
      
    this.multiSelectedEG = [];

    //if(this.$refs.search.searchWord != undefined)
    //  this.search(this.$refs.search.searchWord);
  }

  // 이벤트 렌더링
  async onRenderingEventCards() {
    this.isLoadingEvent = true;
    await this.$store.dispatch('repository/getRepoEventIndex', {
      projectId: this.projectId,
      datasetId: this.selected.group.id,
    }).then((res: any) => {
      const eventCard = res;
      const elements = eventCard.data.data.elements;
      this.eventCard = [];
      for(const key in elements){
        this.eventCard.push(elements[key]);
      }
    });
    this.isLoadingEvent = false;
  }

  // 원본 데이터 선택
  async onClickDataSet(item: any) {
    if(this.isMultiSelectEG) return;

    // 삭제 모드
    if(this.mode == 'delete') {
      this.selected.groups.push(item);
    } else {
      this.selected.group = item;
      this.bookmarkList = await this.$store.dispatch('sso/getBookmarkList', {userId: this.myInfo.id});
      this.onRenderingEventCards();
    }

    this.isMultiSelectE = false; 
    this.multiSelectedE = [];
  }

  /* 데이터 생성 버튼 클릭 */
  clickButtonDatasetCreate() {
    // #480 워크스페이스-전체 에서 생성 시 '워크스페이스를 선택해주세요.' 메시지 띄움(표준 프로세스 참고) 21.10.21
    if(this.selectedWorkspace == null) {
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.info').toString(), '워크스페이스를 선택해주세요', 'warning');
      return 
    }
    if(!this.permissionsCreate) {
      utils.noPermissionAlert(this);
    } else {

      this.$store.commit('repository/setDatasetCreateInfo', {
        selectedWorkspace: this.selectedWorkspace,
        resourceGroupId: this.resourceGroupId, //워크스페이스
      });

      this.$router.push({
        name: 'DatasetCreateForm',
        params: {
          workspace: String(this.selectedWorkspace),
          workspaceName: this.selectedWorkspaceName,
        },
      });
    }
  }

  /* 이벤트 생성 버튼 클릭 */
  clickButtonRepositorCreate() {

    //권한 체크(생성)
    if(!this.permissionEventLogCreate()) {
      utils.noPermissionAlert(this);
      return;
    }


    if(Object.keys(this.selected.group).length === 0) {

      
			const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.selectDataset").toString();

      //나올 경우 없음
      utils.bvModalmsgBoxOk(this, title, content, 'warning');

    } else {

      //event create info
      this.$store.commit('repository/setEventCreateInfo', {
        dataSetId: this.selected.group.id,
        dataSetName: this.selected.group.name, 
        resourceGroupId: this.selected.group.resourceGroup.id, //워크스페이스
        selectedWorkspace: this.selectedWorkspace
      })


      this.$router.push({
        name: 'RepositoryCreateForm',
        //params: {
        //  dataSetId: this.selected.group.id,
        //  dataSetName: this.selected.group.name, 
        //},
      });
    }
  }

  // 데이터의 수정할 데이터 가져오기
  async setGroupForModify(group: any) {
    const param = {
      datasetId: group.id,
			projectId: this.projectId
    };

    // 원본 데이터 수정 창 그룹 이름, 설명, 파일이름
    const res = await this.$store.dispatch('repository/getRepoDataView', param);
  
    this.groupModal.modifyGroupName = res.data.data.name;
    this.groupModal.originalGroupName = res.data.data.name;
    this.groupModal.modifyGroupDesc = res.data.data.description;
    this.groupModal.fileName = res.data.data.origin.orginalFilenames === undefined ? '' : res.data.data.origin.orginalFilenames[0];
    this.groupModal.dataSet = group;
  }

  // 검색
  async search(searchWord: string) {
    this.searchWord = searchWord;
    await this.onRenderingDataSet();
  }

  async filter(type: number) {
    if(this.filterType == 0 && this.dataSet.length == 0) {

      //나올 경우 없음
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.alarm').toString(), this.$t('view.repo.alert.filterNotWorking').toString(), 'warning')
      return
    }

    this.filterType = type;
    // 검색 먼저 돌고
    await this.search(this.$refs.search.searchWord);

    if(!this.isLoading) {
      switch(type) {
        case 0: // all
          break;
        case 1: // file
          this.dataSet = this.dataSet.filter((data: any) => {
            return !this.isOIriginTypeDatabase(data.origin.originType);
          });
          break;
        case 2: // database
          this.dataSet = this.dataSet.filter((data: any) => {
            return this.isOIriginTypeDatabase(data.origin.originType);
          });
          break;
      }
    }
  }

  isOIriginTypeDatabase(originType: string) {
    return originType == 'database' || originType == 'psql' || originType == 'oracle' || originType == 'mssql' || originType == 'mysql' || originType == 'mariadb';
  }

  changeWorkspace() {
    this.onRenderingDataSet();
  }

  onCheckMultiSelectEG(pitem: any, event: any) {
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

  onCheckMultiSelectE(pitem: any, event: any) {
    const target = event.target as Element;
    //if (target.classList.contains('custom-control-input') || target.classList.contains('custom-control-label')) return;
    /*if (!this.isMultiSelect){
      this.openProject(item); 
      this.setSelectedItem(item);
    }*/
    if (this.isMultiSelectE) {
      const index = _.findIndex(this.multiSelectedE, (item) => {
        return item === pitem.id;
      });
    if (index !== -1) this.multiSelectedE.splice(index, 1);
      else this.multiSelectedE.push(pitem.id);
    }
  }
  

  //권한 체크
  roleApplied() {
    const isNotGroupUser = this.myInfo.roleCode != "GROUP_USER";
    return isNotGroupUser;
  }

  //선택에 삭제 클릭 시
  /*
  whenDeleteMultiEGModalShow() {
    if(this.multiSelectedEG.length == 0){
      const info = this.$t("view.repo.alert.title.info").toString();
      const noSelect = this.$t("view.repo.alert.groupDelete.noSelect").toString();
      utils.bvModalmsgBoxOk(this, info, noSelect, 'complete');
    }else{
        //this.deleteMultiEGroupShow = true; 
      const title = this.$t("view.repo.alert.groupDelete.title").toString();
      const content = this.$t("view.repo.alert.groupDelete.content").toString();
      const yes = this.$t('view.repo.button.yes').toString()
      const no = this.$t('view.repo.button.no').toString()
      utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning').then((res) => {
        if(res) this.deleteMultiEG();  
      });
    }
  }
  */

  //선택한 것 삭제
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
        this.onRenderingDataSet();
      }
    });
  }


  whenDeleteMultiEModalShow() {

      //권한 체크(생성)
      if(!this.permissionEventLogDelete()) {
        utils.noPermissionAlert(this);
        return;
      }

      if(this.multiSelectedE.length == 0){
        const info = this.$t("view.repo.alert.title.info").toString();
        const noSelect = this.$t("view.repo.alert.eventDelete.noSelect").toString();
        utils.bvModalmsgBoxOk(this, info, noSelect, 'complete').then((res) => {
            this.isMultiSelectE = false; 
            this.multiSelectedE = []; 
        });
      }else{
         //this.deleteMultiEventShow = true; 
        const title = this.$t("view.repo.alert.eventDelete.title").toString();
        const content = this.$t("view.repo.alert.eventDelete.content").toString();
        const yes = this.$t('view.repo.button.yes').toString()
        const no = this.$t('view.repo.button.no').toString()
        utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning').then((res) => {
          if(res) {
            this.deleteMultiE();
          }  
          this.isMultiSelectE = false; 
          this.multiSelectedE = [];
        });
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
        // 원본 데이터 렌더링도 같이 해줘야 함..
        this.onRenderingDataSet('eventDelete');
      }
    });

    
  }

  checkPermissions(resourceCode: string, operationCode: string) {
    if(Array.isArray(this.resourceGroupId)) {
      let result = false
      forEach(this.resourceGroupId, resourceGroupId => {
        const bool = utils.checkPermission(this.projectId, String(this.groupId), resourceGroupId, resourceCode, operationCode);
        if(bool)
          result = true;
      });
      return result;
    }
    return utils.checkPermission(this.projectId, String(this.groupId), this.resourceGroupId, resourceCode, operationCode);
  }

  get permissionsCreate() {
    return this.checkPermissions('repo.dataset', 'create');
  }

  get groupId() {
    return this.myInfo.groupId;
  }

  get resourceGroupId() {
    const { defaultWorkspace } = this.$store.getters['sso/getSetting'].common.workspace;
    if ( defaultWorkspace == null || defaultWorkspace == 'ALL' ) {
      return this.myInfo.workspaces.map((workspace: any) => workspace.iprResourceGroupId);
    } else {
      return this.myInfo.workspaces.find((workspace: any) => workspace.id == defaultWorkspace).iprResourceGroupId;
    }
  }

  permissionEventLogCreate() {

    const resourceGroupId = this.selected.group.resourceGroup.id;
    const createdBy = this.selected.group.createdBy;
    const projectId = this.$store.getters['sso/getProjectId'];
    const workspace = utils.getWorkspaceByRgId(resourceGroupId);
    const groupId = workspace.groupId;
  
    if(utils.checkPermission(projectId, groupId, resourceGroupId, 'repo.repository', 'create', createdBy)){
      return true;
    }else {
      return false;
    }
  }

  permissionEventLogDelete() {

    //임시로 resourceId 없음 처리
    if(this.selected.group.resourceGroup == undefined || this.selected.group.resourceGroup == null) {
      return true;
    }
    
    const resourceGroupId = this.selected.group.resourceGroup.id;
    const createdBy = this.selected.group.createdBy;
    const projectId = this.$store.getters['sso/getProjectId'];
    const workspace = utils.getWorkspaceByRgId(resourceGroupId);
    const groupId = workspace.groupId;
  
    if(utils.checkPermission(projectId, groupId, resourceGroupId, 'repo.repository', 'delete', createdBy)){
      return true;
    }else {
      return false;
    }
  }
  
  get selectedWorkspace() {
    return this.$refs.search.selectedWorkspace;
  }

  get selectedWorkspaceName() {
    if(this.selectedWorkspace == null) return this.$t('view.repo.label.all').toString();
    return (this.myInfo.workspaces.find((workspace: { id: number }) => workspace.id == this.selectedWorkspace)).name;
  }

  get dataLength() {
    return this.dataSet.length;
  }

  get eventLength() {
    return this.eventCard.length;
  }

  getShowOverlay() {
    if(this.isLoadingEvent && Object.keys(this.selected.group).length != 0) {
      return true;
    } else if(this.eventCard.length === 0 && Object.keys(this.selected.group).length != 0) {
      return true;
    } else if(Object.keys(this.selected.group).length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
</script>