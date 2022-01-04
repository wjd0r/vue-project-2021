<template>
  <!-- 이벤트 필터 -->
  <div class="main-common-component filter-importing-component evet-filter-component">
    <div class="filter-importing-content">
      <!-- flowbar -->
      <FlowBarStepThree mode="subRepository" :stage="3"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{$t('view.repo.repositoryFilter.filtering.subEventName')}}<!--서브 이벤트 이름--></div>
          <div class="content-body">{{subEventCreateInfo.newEventName}}</div>
        </div>
      </div>
      <!-- 정보 -->

      <!-- 필터 조건-->
      <div class="filter-component">
        <div class="filter-content filter-common-content">
          <div class="content-header">
            <h5 class="title">{{$t('view.repo.repositoryFilter.filtering.filterCondition')}}<!--필터 조건--></h5>
          </div>
          <div class="content-body">
            <div class="filtering">
              <table class="table line">
                <thead>
                  <tr>
                    <th>{{$t('view.repo.repositoryFilter.filtering.filterType')}}<!--Filter Type--></th>
                    <th>{{$t('view.repo.repositoryFilter.filtering.filteredValue')}}<!--필터된 값--></th>
                  </tr>
                </thead>
                <tbody>

                  <template v-for="(item, index) in filtertable">
                  <tr :key="index">
                    <td>{{getType(item.type)}}</td>
                    <td>{{getContent(item.type, item.content)}}</td>
                  </tr>
                  </template>

                  <!--<tr>
                    <td>시간 필터</td>
                    <td>2021-01-01 00:00:00~2021-01-31 23:59:9; CONTAIN</td>
                  </tr>
                  <tr>
                    <td>시작점 & 종료점 액티비티</td>
                    <td>시작점: A,B,c...;종료점: D,E,F...</td>
                  </tr>
                  <tr>
                    <td>속성 필터</td>
                    <td>컬럼: column1; 선택된 값: a,b,c,d,f...</td>
                  </tr>
                  <tr>
                    <td>프로세스 그룹 필터</td>
                    <td>그룹1, 그룹2, 그룹3</td>
                  </tr>-->
                </tbody>
              </table>
            </div>
            <!-- <template v-for="(select) in datasetCreateInfo.selectes">
              <div class="filtering" :key="select.key">
                <div class="content-header">
                  <div class="title">{{select.label}}</div>
                </div>
                <div class="content-body">
                  <div class="filtering-text">{{selectedKey(select.selected)}}</div>
                </div>
              </div>
            </template> -->
          </div>
        </div>
      </div>
      <!-- 필터 조건 -->

      <!-- 이벤트 로딩 -->
      <template v-if="isLoadingComplete">
        <div class="importing-content">
          <div class="text-center">
            <div class="progress-content">
              <div class="gauge-text">{{Math.round(realtime_notification.progress)}}%</div>
              <b-progress :value="Math.round(realtime_notification.progress)" max="100" show-progress animated></b-progress>
            </div>
            <h1 class="title">{{$t('view.repo.repositoryFilter.filtering.eventFiltingNow')}}<!--이벤트 필터 중입니다.--></h1>
            <div class="loading-text">{{ $t('view.repo.import.wait') }}</div>
          </div>
        </div>
        <div class="bottom-component">
          <div class="bottom-content">
            <b-button variant="outline-primary" class="btn-outline-primary" @click.prevent="onClickCancel">{{ $t('view.repo.button.exit') }}</b-button>
          </div>
        </div>
      </template>
      <!-- 이벤트 로딩 -->

      <!-- 이벤트 로딩 완료-->
      <template v-else-if="isLoadingFail">
        <div class="importing-content">
          <div class="text-center">
            <div class="ico-mapping ico-complete" alt="완료 아이콘"></div>
            <h1 class="title"><p class="text-success">{{$t('view.repo.repositoryFilter.filtering.filteringCompleted')}}<!--서브 이벤트 생성이 완료되었습니다.--></p></h1>
            <div class="loading-text">{{$t('view.repo.repositoryFilter.filtering.pressCompleteBtn')}}<!--완료 버튼을 눌러주세요--></div>
          </div>
        </div>
        <div class="bottom-component">
          <div class="bottom-content">
            <div class="btn-group">
              <b-button variant="outline-primary" class="btn-outline-primary" @click.prevent="onClickNext">{{ $t('view.repo.button.next') }}</b-button>
            </div>
          </div>
        </div>
      </template>
      <!-- 이벤트 로딩 완료-->

      <!-- 이벤트 로딩 실패 -->
      <!-- v-else -->
      <template v-else>
        <div class="importing-content">
          <div class="text-center">
            <div class="ico-mapping ico-error" alt="에러아이콘"></div>
            <h1 class="title"><p class="text-error">{{$t('view.repo.repositoryFilter.filtering.filteringFailed')}}<!--이벤트 필터 적용에 실패하였습니다.--></p></h1>
            <div class="notice-text">{{$t('view.repo.repositoryFilter.filtering.pressBeforeBtn')}}<!--이전을 눌러 필터를 다시 적용해주세요.--></div>
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
            <b-button variant="outline-primary" class="btn-back btn-outline-primary" @click.prevent="onClickBack" >{{ $t('view.repo.button.before') }}<!--이전--></b-button>
            <div class="btn-group">
              <b-button variant="btn-secondary" class="btn-secondary" @click.prevent="onClickCancel" >{{ $t('view.repo.button.exit') }}</b-button>
            </div>
          </div>
        </div>
      </template>
      <!-- 이벤트 로딩 실패 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import store from '../../store';
import { AxiosError } from 'axios';
import { IClientState } from '@/interface';

import _, { isEmpty } from 'lodash';

import { UtilsMixin } from '@/mixin';

import FlowBarStepThree from '../components/flows/FlowBarStepThree.vue';

@Component({
 components: {
   FlowBarStepThree
 },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
    notification: 'notification/getNotificationList',
    setting: 'sso/getSetting',
    datasetCreateInfo: 'repository/getDatasetCreateInfo',
    subEventCreateInfo: 'eventFilter/getSubEventCreateInfo'
  }),
})
export default class EventFiltering extends Mixins(UtilsMixin) {
  // Prop ---------------------------------------------
  myInfo!: any;
  projectId!: any;
  notification!: any;
  setting!: any;
  uploadDataId: string;
  datasetCreateInfo!: any;

  subEventCreateInfo!: any;

  message: any = this.$t('view.repo.alert.message').toString();

// 변수 ---------------------------------------------

  isLoadingComplete: boolean = true;
  isLoadingFail: boolean = true;
  selectedFileType: string = '';
  selectedDatabaseType: string = '';
  dataSetId: string = '';
  jdbcInfo: any = null;

  sId: string = '';

  notification_data: any = null;
  realtime_notification: any = {
    progress: 0,
  };

  dataUri: string = null;

  datasetName: string = '';
  eventName: string = '';

  isCompleted: boolean = false;

  fileUploadProgress: number = 0;

  errorMsg: string = '';

  filtertable: any[] = [];
  // mounted ---------------------------------------------

  //@Watch('isCompleted')
  //onIsCompleted(isCompleted: boolean) {
  //  if(isCompleted)
  //    this.onClickNext();
  //}

  mounted() {

    if(this.$route.query.sId != undefined){
      this.sId = String(this.$route.query.sId);

      //notification을 통해서 들어왔을 떄 데이터 전달: 다시 확인 필요
      const message = _.find(this.notification, ['serviceId', this.sId]);
      const subEventCreateInfo = JSON.parse(JSON.parse(message.notificationData).client.state).eventFilter.subEventCreateInfo;
      this.$store.commit('eventFilter/setSubEventCreateInfo', JSON.parse(subEventCreateInfo));

      this.onNotification();
    } else {
      this.filtering();
    }

    //필터 조건 테이블
    this.filtertable = [];
    this.subEventCreateInfo.filterList.forEach((filter: any)=>{
     if(filter.type == 'time') {
         const filtertype = this.$t('view.repo.repositoryFilter.timeFilter');
         const content = filter.data.start + ' ~ ' + filter.data.end + '; ' + filter.data.keepCases;

         this.filtertable.push({'type': filter.type, 'content': content});
     }else if(filter.type == 'startEnd') {
         const filtertype = this.$t('view.repo.repositoryFilter.startEndActivity');
         const startPoints = filter.data.startPoints.map((v: any)=>{ return v.name } );
         const endPoints = filter.data.endPoints.map((v: any)=>{ return v.name } );
         //content = this.$t('view.repo.repositoryFilter.startEnd.startPoint').toString()+': ' + this.shorterContent(startPoints.join(', ')) + '; '+this.$t('view.repo.repositoryFilter.startEnd.endPoint').toString()+': ' + this.shorterContent(endPoints.join(', '));

         //const content = this.$t('view.repo.repositoryFilter.filterTable.startEndContent', 
         //           {'startPoints': this.shorterContent(startPoints.join(', ')), 'endPoints': this.shorterContent(endPoints.join(', '))});


         const content = {'startPoints': this.shorterContent(startPoints.join(', ')), 'endPoints': this.shorterContent(endPoints.join(', '))};        
         this.filtertable.push({'type': filter.type, 'content': content});

     }else if(filter.type == 'property') {
         const filtertype = this.$t('view.repo.repositoryFilter.attributeFilter');
         const properties = filter.data.properties.map((v: any)=>{ return v.name } );
         //content = this.$t('view.repo.repositoryFilter.attribute.column').toString()+': ' + filter.data.field.text + '; '+this.$t('view.repo.repositoryFilter.attribute.selectedValue').toString()+': ' + this.shorterContent(properties.join(', '));
         
         //const content = this.$t('view.repo.repositoryFilter.filterTable.attributeContent', 
         //           {'field': filter.data.field.text, 'properties': this.shorterContent(properties.join(', '))});

         const content = {'field': filter.data.field.text, 'properties': this.shorterContent(properties.join(', '))};
         this.filtertable.push({'type': filter.type, 'content': content});

     }else if(filter.type == 'variant') {
         const filtertype = this.$t('view.repo.repositoryFilter.variantFilter');
         const variants = filter.data.variants.map((v: any)=>{ return v.name } );
         const content = variants.join(', ');
         
         this.filtertable.push({'type': filter.type, 'content': content});
     }
   });
}

  // method ---------------------------------------------

  getType(type: string) {
    switch(type) {
      case 'time': 
        return this.$t('view.repo.repositoryFilter.timeFilter');
      case 'startEnd': 
        return this.$t('view.repo.repositoryFilter.startEndActivity');
      case 'property': 
        return this.$t('view.repo.repositoryFilter.attributeFilter');
      case 'variant': 
        return this.$t('view.repo.repositoryFilter.variantFilter');
    }
  }

  getContent(type: string, content: any) {
    switch(type) {
      case 'time': 
        return content;
      case 'startEnd': 
        return this.$t('view.repo.repositoryFilter.filterTable.startEndContent', 
                    {'startPoints': content.startPoints, 'endPoints': content.endPoints});
      case 'property': 
        return this.$t('view.repo.repositoryFilter.filterTable.attributeContent', 
                    {'field': content.field, 'properties': content.properties});
      case 'variant': 
        return content;
    }
  }

  shorterContent(content: string) {
    if(content.length >= 30) return content.slice(0, 30)+'...';
    else return content;

  }

  onClickNext() {
    this.$router.push({
      name: 'EventList',
      params: {
        selectedDataSetId: this.subEventCreateInfo.datasetId,
        selectedWorkspace: this.subEventCreateInfo.selectedWorkspace
      }
    });
    //선택 상태일 카드 id 정보 필요함
  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'SubRepositoryFilter',
    })
  }

  // 연결 오류 시 
  async handlerError(err: AxiosError) {
    this.filteringFailed(); // 연결 실패 화면으로 변경
    this.isLoadingComplete = false;

    await utils.handlerError(this, err);

    this.errorMsg = err.response.headers["x-ioc-code"];

    this.filteringCompleted();
  }

  // 연결 성공은 했으나, 데이터가 없을 경우
  handlerDelete(res: any) {
    this.filteringFailed(); // 연결 실패 화면으로 변경
    const title = this.$t("view.repo.alert.title.alarm").toString();
    const content = this.$t("view.repo.alert.groupCreateCheck").toString();
    utils.bvModalmsgBoxOk(this, title, content, 'error').then((res: any) => {
      if(res) return;
    });
  }

  // 연결 성공 : 다시 체크
  handlerSuccess(res: any) {
    this.filteringCompleted(); // 연결 성공 화면으로
    this.isCompleted = true;

    //const fields = Object.keys(res.data.data.fields);
    //if (fields.length < 3) { // 연결 성공은 했으나, 데이터가 적음
    //  this.handlerDelete(res);
    //} else {
    //  this.isCompleted = true;
    //}
  }

  filterParam(arg: string) {

    const eventName = this.subEventCreateInfo.eventName;
    const repositoryId = this.subEventCreateInfo.repositoryId;
    const datasetId = this.subEventCreateInfo.datasetId;
    const datasetName = this.subEventCreateInfo.datasetName;
    const registeredProcessList = this.subEventCreateInfo.registeredProcessList;
    const newEventName = this.subEventCreateInfo.newEventName;
    const newEventDesc = this.subEventCreateInfo.newEventDesc;
    const repoEventView = this.subEventCreateInfo.repoEventView;
    const eventFilter = this.subEventCreateInfo.eventFilter;
    const resourceGroupId = this.subEventCreateInfo.resourceGroupId;

    const relations = this.subEventCreateInfo.relations;
    const referenceModel = this.subEventCreateInfo.referenceModel;

    const clientState = {
      title: 'view.router.eventFiltering.title',
      route: {
        from: 'SubRepositoryFiltering',
        to: 'EventList',
        failTo: 'SubRepositoryFiltering',
      },
      eventFilter: {
        workspaceName: utils.getWorkspaceByRgId(resourceGroupId).name,
        dataSetId: datasetId,
        eventlog_origin: eventName,
        dataSetName: datasetName,
        eventName: newEventName,
        state: 'get lookup | make a view',
        subEventCreateInfo: JSON.stringify(this.subEventCreateInfo),

        selectedWorkspace: this.subEventCreateInfo.selectedWorkspace
      }
    };

    return {
      serviceId: 'repo.event.cube.filter',
      data: [{
        "_type": "EventRepositoryFilterConfiguration",
        "name": newEventName,
        "repository": {
            "id": repositoryId,
            "_type": "EventRepository",
            "project": {
                "id": this.projectId, //"iprdemo",
                "_type": "Project"
            },
            "resourceGroup": {
              "id": resourceGroupId,
              "_type": "ResourceGroup"
            },
            "relations": relations,
            "referenceModel": referenceModel,
        },
        "description" : newEventDesc,
        "eventFilters": eventFilter

      }, {
        _type: "ClientImpl",
        state: JSON.stringify(clientState)
      }],
    }
  }

  toUpperCase(arg: string) { // css -> Css
    return arg == null ? '' : arg.charAt(0).toUpperCase() + arg.slice(1);
  }

  async filtering() {

    const DATA = this.filterParam('');

    const RES: any = await this.asyncServiceCall(DATA)
      .catch((err: AxiosError) => utils.handlerError(this, err)); // 1. Async Service Call
    this.sId = RES.data.info.id;

    // sid가 너무 늦게 들어 오는 경우가 있어 강제로 notification 이벤트를 발생 시킨다.
    this.onNotification();
  }

  // 3. datauri -> cache 데이터 요청
  async onDataUri(dataUri: string) {

    this.$store.dispatch('common/getCache', dataUri)
      .then(this.handlerSuccess)
      .catch(this.handlerError);
    return;
  }

  @Watch('notification', { deep: true })
  onNotification() {
    // 2. noti에서 datauri 가져오기
    this.message = _.find(this.notification, ['serviceId', this.sId]); // watch 로 체크

    if(this.message != undefined) {
      this.realtime_notification = JSON.parse(this.message.notificationData);

      const NOTIFICATION_DATA = JSON.parse(this.message.notificationData);

      const STATE = NOTIFICATION_DATA.state;
      this.dataUri = NOTIFICATION_DATA.dataUri;
      const error: AxiosError = {
        config: undefined,
        isAxiosError: false,
        toJSON: function(): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: '',
        response: {
          data: 'T',
          status: null,
          statusText: 'string',
          headers: {
            'x-ioc-code': 'IPR_ERR_200_00010201',
          },
          config: null,
          request: null,
        }
      };

      if (STATE == 'COMPLETED' && this.notification_data == null) {
        this.notification_data = {
          num: this.notification_data == null ? 0 : this.notification_data.num + 1,
          ...NOTIFICATION_DATA,
        };
        
        // 상태가 완료 되었음에도 실패가 된 경우 noti message 읽어 처리
        if (this.notification_data.messageCode != undefined && (this.notification_data.messageCode.includes('err') || this.notification_data.messageCode.includes('ERR'))) {
          error.response.headers['x-ioc-code'] = this.notification_data.messageCode;
          // 코드만 가지고는 메시지 띄우기가 불가능하여, 직접 메시지 까지 전달해야 함.

          this.handlerError(error);
        } else {
          this.onDataUri(NOTIFICATION_DATA.dataUri);
        }
      } else if (STATE == 'ERROR' && this.notification_data == null) {
        this.notification_data = {
          num: this.notification_data == null ? 0 : this.notification_data.num + 1,
          ...NOTIFICATION_DATA,
        };

        // messageCode가 있다면 messageCode를 넣어 처리
        if (this.notification_data.messageCode != undefined && (this.notification_data.messageCode.includes('err') || this.notification_data.messageCode.includes('ERR'))) {
          error.response.headers['x-ioc-code'] = this.notification_data.messageCode;
        }
        this.handlerError(error);
      }

      //if(this.notification_data != null) {
      //  const { dataSetName, eventName } = JSON.parse(this.notification_data.client.state).datasetImporting;
      //  this.datasetName = dataSetName;
      //  this.eventName = eventName;
      //}
    } 
  }

  // 1. Async Service Call()
  async asyncServiceCall (DATA: {serviceId: string; data: any}) {
    return await this.$store.dispatch('common/runAsynchronousService', DATA)
      .catch((err: AxiosError) => utils.handlerError(this, err));
  }

  // 데이터가 다 불러 와지면
  filteringCompleted() {
    this.isLoadingComplete = false;
  }

  // 데이터 불러오는 데 실패
  filteringFailed() {
    this.isLoadingFail = false;
  }

/*
  // notification 창을 눌러서들어 왔을 경우 clientState 값 유지
  get clientState() {
    return JSON.parse(this.datasetCreateInfo.clientState != undefined ? this.datasetCreateInfo.clientState : this.notification_data.client.state);
  }

  // workspace id and name 을 유지하기 위해
  get selectedWorkspaceName() {
    return JSON.parse(this.datasetCreateInfo.clientState).datasetImporting.workspaceName;
  }

  // #480 워크스페이스-전체 에서 생성 시 '워크스페이스를 선택해주세요.' 메시지 띄움(표준 프로세스 참고) 21.10.21
  get selectedWorkspaceId() {
    return (this.myInfo.workspaces.find((workspace: { name: string }) => workspace.name == this.selectedWorkspaceName)).id;
  }

  // #480 워크스페이스-전체 에서 생성 시 '워크스페이스를 선택해주세요.' 메시지 띄움(표준 프로세스 참고) 21.10.21
  get iprResourceGroupId() {
    return (this.myInfo.workspaces.find((workspace: { name: string }) => workspace.name == this.selectedWorkspaceName)).iprResourceGroupId;
  }

  get progress() {
    return Math.round(this.realtime_notification.progress);
  }
  */
}
</script>
