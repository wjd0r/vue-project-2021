<template>
  <!-- 데이터 필터 -->
  <div class="main-common-component dataset-filter-component filter-importing-component">
    <div class="dataset-filter-content filter-importing-content">

      <!-- flowbar -->
      <FlowBarStepFourFilter mode="dataset" :stage="4"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.subDatasetCreateForm.subDatasetName') }}</div>
          <div class="content-body">{{subDatasetCreateInfo.dataSetName}}</div>
        </div>
      </div>
      <!-- 정보 -->

      <!-- 필터 조건-->
      <div class="filter-component">
        <div class="filter-content filter-common-content">
          <div class="content-header">
            <h5 class="title">{{$t('view.repo.datasetFilter.filterCondition')}}<!--필터 조건--></h5>
          </div>
          <div class="content-body">
            <div class="filtering">
              <table class="table line">
                <thead>
                  <tr>
                    <th>{{$t('view.repo.datasetFilter.columnName')}}<!--컬럼 이름--></th>
                    <th>{{$t('view.repo.datasetFilter.filterCount')}}<!--필터된 값 건수--></th>
                    <th>{{$t('view.repo.datasetFilter.filterValue')}}<!--필터된 값--></th>
                  </tr>
                </thead>
                <tbody>

                  <template v-for="(item, index) in filterConditionTable">
                  <tr :key="index">
                    <td>{{item[0]}}</td>
                    <td>{{item[1]}}</td>
                    <td><div class="word-break">{{item[2]}}</div></td>
                  </tr>
                  </template>

                  <!--
                  <tr>
                    <td>Invoice No</td>
                    <td>3</td>
                    <td>Alice Mutton, Boston Crab Meat, Nunuca nu-</td>
                  </tr>
                  <tr>
                    <td>Activity</td>
                    <td>2</td>
                    <td>Boston crab meat, nunuca nu-</td>
                  </tr>
                  <tr>
                    <td>Original</td>
                    <td>2</td>
                    <td>Raclette courdavault, wimmers gute</td>
                  </tr>
                  <tr>
                    <td>Branch name</td>
                    <td>2</td>
                    <td>Wimmers gute</td>
                  </tr>
                  <tr>
                    <td>Cost</td>
                    <td>-</td>
                    <td>Greater than 100</td>
                  </tr>
                  -->
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

      <!-- 데이터 필터 로딩 -->
      <template v-if="isLoadingComplete">
        <div class="importing-content">
          <div class="text-center">
            <div class="progress-content">
              <div class="gauge-text">{{Math.round(realtime_notification.progress)}}%</div>
              <b-progress :value="Math.round(realtime_notification.progress)" max="100" show-progress animated></b-progress>
            </div>
            <h1 class="title">{{$t('view.repo.datasetFilter.datasetFiltingNow')}}<!--데이터셋 필터 중입니다.--></h1>
            <div class="loading-text">{{ $t('view.repo.datasetFilter.wait') }}<!--잠시만 기다려주세요.--></div>
          </div>
        </div>
        <div class="bottom-component">
          <div class="bottom-content">
            <b-button variant="outline-primary" class="btn-outline-primary" @click.prevent="onClickCancel">{{ $t('view.repo.button.exit') }}</b-button>
          </div>
        </div>
      </template>
      <!-- 데이터 필터 로딩 -->

      <!-- 데이터 필터 완료 -->
      <template v-else-if="isLoadingFail">
        <div class="importing-content">
          <div class="text-center">
            <div class="ico-mapping ico-complete" alt="완료 아이콘"></div>
            <h1 class="title"><p class="text-success">{{ $t('view.repo.datasetFilter.filteringCompleted') }}<!--데이터 필터 완료하였습니다--></p></h1>
            <div class="loading-text">{{ $t('view.repo.datasetFilter.pressCompleteBtn') }}<!--완료 버튼을 눌러주세요--></div>
          </div>
        </div>
        <div class="bottom-component">
          <div class="bottom-content">
            <div class="btn-group">
              <b-button variant="primary" class="btn-primary" @click.prevent="onClickNext">{{ $t('view.repo.button.complete') }}</b-button>
            </div>
          </div>
        </div>
      </template>
      <!-- 데이터 필터 완료 -->

      <!-- 데이터 필터 실패 -->
      <template v-else>
        <div class="importing-content error-content">
          <div class="text-center">
            <div class="ico-mapping ico-error" alt="에러아이콘"></div>
            <h1 class="title"><p class="text-error">{{ $t('view.repo.datasetFilter.filteringFailed') }}<!--데이터 필터 적용에 실패하였습니다--></p></h1>
            <div class="notice-text">{{ $t('view.repo.datasetFilter.pressBeforeBtn') }}<!--이전을 눌러 필터를 다시 적용해주세요.--></div>
          </div>
          <div class="content-body">
            <div class="error-list-content">
              <div class="error-text">
                <div class="colunm-text">{{'[' + errorMsg + '] ' + $t('view.repo.alert.' + errorMsg)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-component">
          <div class="bottom-content">
            <b-button variant="outline-primary" class="btn-back btn-outline-primary" @click.prevent="onClickBack" >{{ $t('view.repo.button.before') }}</b-button>
            <div class="btn-group">
              <b-button variant="btn-secondary" class="btn-secondary" @click.prevent="onClickCancel" >{{ $t('view.repo.button.exit') }}</b-button>
            </div>
          </div>
        </div>
      </template>
      <!-- 데이터 필터 실패 -->
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

import FlowBarStepFourFilter from '../components/flows/FlowBarStepFourFilter.vue';

@Component({
 components: {
    FlowBarStepFourFilter
 },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
    notification: 'notification/getNotificationList',
    setting: 'sso/getSetting',
    datasetCreateInfo: 'repository/getDatasetCreateInfo',
    subDatasetCreateInfo: 'dataFilter/getSubDatasetCreateInfo',
  }),
})
export default class DataFiltering extends Mixins(UtilsMixin) {
  // Prop ---------------------------------------------
  myInfo!: any;
  projectId!: any;
  notification!: any;
  setting!: any;
  uploadDataId: string;
  subDatasetCreateInfo!: any;
  datasetCreateInfo!: any;

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

  filterConditionTable: any[] = [];

  errorMsg: string = '';
  // mounted ---------------------------------------------

  //@Watch('isCompleted')
  //onIsCompleted(isCompleted: boolean) {
  //  if(isCompleted)
  //    this.onClickNext();
  //}

  mounted() {

    // 상단의 테이블 출력 start: 나중에 위치 조정

    const fields = this.subDatasetCreateInfo.fields;
    fields.forEach((field: any) => {

      if(field.key[0] != 't'){
        const options = this.subDatasetCreateInfo.checkedOptions[field.key]

        if(options.length != 0) {
          if(field.key[0] == 'n') {

            if(options.length == 2){
              const text = options[0] + ' ' + options[1];
              this.filterConditionTable.push([field.label, '-', text]);
            }
            
          }else {
            this.filterConditionTable.push([field.label, options.length, options.toString()]);
          }
        }
      }
      
    });

    // 상단의 테이블 출력 end

    if(this.$route.query.sId != undefined){
      this.sId = String(this.$route.query.sId);

      //subDatasetInfo 추가하기
      //notification을 통해서 들어왔을 떄 데이터 전달: 다시 확인 필요
      const message = _.find(this.notification, ['serviceId', this.sId]);
      const subDatasetCreateInfo = JSON.parse(JSON.parse(message.notificationData).client.state).dataFilter.subDatasetCreateInfo;

      this.$store.commit('dataFilter/setSubDatasetCreateInfo', subDatasetCreateInfo);

      

      this.onNotification();
    } else {
      this.filtering();
    }
}

  // method ---------------------------------------------

  onClickNext() {
    this.$router.push({
      name: 'EventList',
      params: {
        selectedDataSetId: this.subDatasetCreateInfo.datasetId,
        selectedWorkspace: this.subDatasetCreateInfo.selectedWorkspace
      }
    });
  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'DatasetDataFilterSelect',
    })
  }

  // 연결 오류 시 
  async handlerError(err: AxiosError) {
    this.filteringFailed(); // 연결 실패 화면으로 변경
    this.isLoadingComplete = false;

    await utils.handlerError(this, err);

    //나중에 수정
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

  // 연결 성공: 다시 체크
  handlerSuccess(res: any) {
    this.filteringCompleted(); // 연결 성공 화면으로

    //const fields = Object.keys(res.data.data.fields);
    //if (fields.length < 3) { // 연결 성공은 했으나, 데이터가 적음
    //  this.handlerDelete(res);
    //} else {
    this.isCompleted = true;
    
  }

  filterParam(arg: string) {

    const dataSetId = this.subDatasetCreateInfo.dataSetId;
    const dataSetName = this.subDatasetCreateInfo.dataSetName;
    const dataSetDesc = this.subDatasetCreateInfo.dataSetDesc;
    const dataSetNameOrigin = this.subDatasetCreateInfo.dataSetNameOrigin;
    const resourceGroupId = this.subDatasetCreateInfo.resourceGroupId;

    const clientState = {
      title: 'view.router.dataFiltering.title',
      route: {
        from: 'DatasetDataFiltering',
        to: 'EventList',
        failTo: 'DatasetDataFiltering',
      },
      dataFilter: {
        workspaceName: utils.getWorkspaceByRgId(resourceGroupId).name,
        dataSetName: dataSetName, //데이터셋
        dataSetNameOrigin: dataSetNameOrigin, //원본 데이터셋
        subDatasetCreateInfo: this.subDatasetCreateInfo,
        selectedWorkspace: this.subDatasetCreateInfo.selectedWorkspace
      },
    };

    const dataFilters: any[] = this.getDataFilters();
    /*
    [
          DATASET_FILTER_HERE (If column is filtered = add dataset filter)
          // For categorical / boolean (c/b column)
          {
            "_type": "DatasetValueFilterLite",
            "field": "c0",
            "values": ["1", "2", "3"]
          },
          // For numerical / timestamp column (n/t column)
          {
            "_type": "DatasetValueRangeFilterLite",
            "field": "n1",
            "minValue": "100",
            "maxValue": "200"
          }
    ]
    */

    return {
      serviceId: 'repo.data.cube.filter',
      data: [{
        "_type" : "DatasetFilterConfiguration",
        "dataset" : {
          "id" : dataSetId,
          "project" : {
            "id" : this.projectId,
          },
          "resourceGroup": {
            "id": resourceGroupId
          }
        },
        "name": dataSetName,
        "description" : dataSetDesc,
        "dataFilters" : dataFilters,
      }
      , {
        _type: "ClientImpl",
        state: JSON.stringify(clientState)
      }],
    }
  }

  getDataFilters() {
    //{"c0":["17A122811111A","17A122811112A","17A122811113A","17D122621111A"],"c1":["AN","CR"],"c4":["AN1","ANA","CR1"],"n5":["Greater than","100"]}
    const result: any[] = [];
    const checkedOptions = this.subDatasetCreateInfo.checkedOptions;

    //cb
    Object.keys(checkedOptions).forEach((key: any) => {
      if((key[0] == 'c' || key[0] == 'b') && checkedOptions[key].length != 0){
        const filter = {
            "_type": "DatasetValueFilterLite",
            "field": key,
            "values": checkedOptions[key]
        };
        result.push(filter);

      }else if(key[0] == 'n' && checkedOptions[key].length == 2){
        const filter: any = {
            "_type": "DatasetValueRangeFilterLite",
            "field": key,
            //"minOperator": ">=",
            //"minValue": "100",
            //"maxOperator": "<=",
            //"maxValue": "200"
        };
        //숫자 처리 (min, max)
        const values = this.calculateNumericField(checkedOptions[key]);
        if(values["minOperator"] != undefined) filter["minOperator"] = values["minOperator"];
        if(values["minValue"] != undefined) filter["minValue"] = values["minValue"];
        if(values["maxOperator"] != undefined) filter["maxOperator"] = values["maxOperator"];
        if(values["maxValue"] != undefined) filter["maxValue"] = values["maxValue"];
        result.push(filter);
      }
    });


    return result;
  }

  calculateNumericField(option: any) {
    //["Greater than","100"]

    const text = option[0];
    const number = option[1]*= 1;

    const values: any = {};

    switch(text) {
      case "Equals":
        values["minValue"] = number;
        values["minOperator"] = '=';
        values["maxValue"] = undefined;
        values["maxOperator"] = undefined;
        break;
      case "Not Equals":
        values["minValue"] = number;
        values["minOperator"] = '<>';
        values["maxValue"] = undefined;
        values["maxOperator"] = undefined;
        break;
      case "Greater than":
        values["minValue"] = number;
        values["minOperator"] = '>';
        values["maxValue"] = undefined;
        values["maxOperator"] = undefined;
        break;
      case "Greater than equals":
        values["minValue"] = number;
        values["minOperator"] = '>=';
        values["maxValue"] = undefined;
        values["maxOperator"] = undefined;
        break;
      case "Less than":
        values["minValue"] = undefined;
        values["minOperator"] = undefined;
        values["maxValue"] = number;
        values["maxOperator"] = '<';
        break;
      case "Less than equals":
        values["minValue"] = undefined;
        values["minOperator"] = undefined;
        values["maxValue"] = number;
        values["maxOperator"] = '<=';
        break;
    }
    return values;
  }

  toUpperCase(arg: string) { // css -> Css
    return arg == null ? '' : arg.charAt(0).toUpperCase() + arg.slice(1);
  }

  async filtering() {

    const DATA = this.filterParam('');

    const RES: any = await this.asyncServiceCall(DATA)
      .catch((err: AxiosError) => {
        utils.handlerError(this, err);
      }); // 1. Async Service Call
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
    } 
  }

  // 1. Async Service Call()
  async asyncServiceCall (DATA: {serviceId: string; data: any}) {
    return await this.$store.dispatch('common/runAsynchronousService', DATA)
      .catch((err: AxiosError) =>{
        utils.handlerError(this, err);
      });
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
