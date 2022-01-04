<template>
  <!-- 데이터 매핑 확인 -->
  <div class="main-common-component mapping-component mapping-check-component">
    <div class="mapping-content mapping-check-content">
      <!-- back -->
      <!--<Back @onClick="onClickBack()" :useCustom="true"/>-->
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFour mode="dataset" :stage="3"/><!--isSuccess ? 4 : 3-->
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetName') }}</div>
          <div class="content-body">{{datasetCreateInfo.datasetName}}</div>
        </div>
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{datasetCreateInfo.eventName}} </div>
        </div>
      </div>
      <!-- 정보 -->

      <!-- 유효성 검증 완료 -->
      <div class="mapping-check-component" v-if="!isError">
        <div class="mapping-check-content">
          <!-- 검증중 -->
          <div class="text-center mapping-loading" v-if="isValidating">
            <b-spinner :label="$t('view.repo.label.loading')"></b-spinner>
            <h1 class="title">{{$t('view.repo.label.checking')}}</h1>
            <div class="notice-text">{{$t('view.repo.label.waitting')}}</div>
          </div>
          <!-- 검증중 -->

          <!-- 검증 완료 -->
          <div class="text-center mapping-complete" v-if="isSuccess">
            <b-overlay :show="true" bg-color="#F2F2F2" small opacity="1">
              <!--<div class="ico-mapping ico-complete" alt="완료 아이콘"></div>
              <h1 class="title">{{$t('view.repo.label.complete')}}</h1>
              <div class="notice-text">{{$t('view.repo.label.completeClick')}}</div>-->
            </b-overlay>
          </div>
          <!-- 검증 완료 -->
        </div>
      </div>
      <!-- 유효성 검증 완료 -->

      <!-- 유효성 검증 실패 -->
      <div class="mapping-check-component" v-if="isError">
        <div class="mapping-check-content">
          <div class="text-center mapping-error">
            <div class="ico-mapping ico-error" alt="에러아이콘"></div>
            <h1 class="title">{{$t('view.repo.label.confirm')}}</h1>
            <div class="notice-text">{{$t('view.repo.label.mapping')}}</div>
          </div>

          <div class="content-body">
            <div class="error-list-content">
              <div class="colunm" v-for="result in results" :key="result.rowNumber">
                <div class="error-text">[row {{ result.rowNumber }}]</div>
                <span v-for="child in result.children" :key="child.columnName">
                  <div class="colunm-text">{{ child.columnName }} = {{ child.columnValue }}</div>
                  <span v-if="checkDateFormat(child.dbColumnName)" desc="날짜 형식이 잘 못 되었습니다.">{{$t('view.repo.event.mapping.errorResult.wrongDateFormat')}}</span>
                  <span v-else-if="child.columnValue === 'null'" desc="null은 허용하지 않습니다.">{{$t('view.repo.event.mapping.errorResult.noAcceptNull')}}</span>
                  <span v-else-if="child.columnValue === ''" desc="빈 값은 허용하지 않습니다.">{{$t('view.repo.event.mapping.errorResult.noAcceptBlank')}}</span>
                  <span v-else desc="에 에러가 있습니다.">{{$t('view.repo.event.mapping.errorResult.thereIsError')}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 유효성 검증 실패 -->
    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
          <!--<b-button variant="secondary" class="btn-secondary text-left">다시 만들기</b-button>--><!--!isError ||-->
          <b-button variant="primary" class="btn-primary btn-remapping" @click.prevent="onClickReMapping" v-show="isError">{{ $t('view.repo.button.remapping') }}</b-button>
          <b-button variant="outline-primary" class="btn-outline-primary text-right btn-exit"  @click.prevent="onClickCancel" v-show="!isSuccess || isValidating">{{ $t('view.repo.button.exit') }}</b-button>
          <b-button variant="primary" class="btn-primary text-right btn-complete" @click.prevent="onClickComplete" v-show="isSuccess">{{ $t('view.repo.button.complete') }}</b-button>
      </div>
    </div>
    <!-- bottom -->
  </div>
  <!-- 데이터 매핑 확인 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../../../../store';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { utils } from '@/common';

import Back from '../../../components/Back.vue';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';

import { UtilsMixin } from '@/mixin';
import _, { isEmpty } from 'lodash';

@Component({
 components: {
   Back,
   FlowBarStepFour
 },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    mappings: 'repository/getMappingData',//'eventLog/getMappingData',
    repoDataView: 'repository/getRepoDataView',
    notification: 'notification/getNotificationList',
    projectId: 'sso/getProjectId',
    datasetCreateInfo: 'repository/getDatasetCreateInfo',
  }),
})
export default class DatasetMappingCheck extends Mixins(UtilsMixin) {
 /* Prop 선언 */
  myInfo!: any;
  notification!: any;
  projectId!: any;
  datasetCreateInfo!: any;

 /* mapGetters 변수 선언 */

  processId: string = '';

 /* 클래스 변수 선언 */
  isError: boolean = false;
  isValidating: boolean = true;
  isSuccess: boolean = false;

  mappings!: any;
  repoDataView!: any;

  results: any[] = [];

  totalRow: number = 0;

  pageSelected: boolean = false;
  gRespositoryId: string = null;

  // sid 는 notification ID 라고 생각하면 됨
  sId: string = '';

  notification_data: any = null;

  comeInFromExit: boolean = false;
  showOverlay: boolean = false;

  convertedMappings: any;
  
 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

/*  
 created(){
   
 }
  */
 
  mounted() {
    if(!isEmpty(this.$route.query)){
      // 나가기에서 들어 왔을때 -> sid로 노티피케이션의 데이터 읽음 -> datauri로 cache 데이터 요청
      this.comeInFromExit = true;
      this.sId = String(this.$route.query.sId);
      this.onNotification();
    } else {
      // import 후 들어 왔을때 -> 매핑 비동기 요청 하여 sid를 얻은후 -> 노티피케이션의 데이터 읽음 -> dataurl cache 데이터 요청
      this.mappingTest();
    }
  }

  @Watch('notification', { deep: true })
  onNotification() {
    // 2. noti에서 datauri 가져오기
    const message = _.find(this.notification, ['serviceId', this.sId]); // watch 로 체크

    if(message != undefined) {
      const NOTIFICATION_DATA = JSON.parse(message.notificationData);

      const STATE = NOTIFICATION_DATA.state;
      const DataUri = NOTIFICATION_DATA.dataUri;
      const MESSAGE_CODE = NOTIFICATION_DATA.messageCode;
      const MESSAGE = NOTIFICATION_DATA.message;
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

      if (STATE == 'COMPLETED' && this.notification_data == null) { // 성공시 dataurl를 읽어 캐시 요청
        // COMPLETED 라도 에러가 올 수 있어서 추가
        /* if(MESSAGE_CODE.includes('ERR') || MESSAGE_CODE.includes('err')) {
          error.response.headers['x-ioc-code'] = MESSAGE_CODE;
          this.handlerError(error);
        } else { */
          this.notification_data = {
            num: this.notification_data == null ? 0 : this.notification_data.num + 1,
            ...NOTIFICATION_DATA,
          };

          this.onCache(NOTIFICATION_DATA.dataUri);
        //}
      } else if (STATE == 'ERROR' && this.notification_data == null) { // 에러시 바로 에러 처리
        this.notification_data = {
          num: this.notification_data == null ? 0 : this.notification_data.num + 1,
          ...NOTIFICATION_DATA,
        };
        // noti에서 에러라고 표시하는 경우 강제로 AxiosError code 삽입하여 처리
        this.handlerError(error);    
      }

      // const { dataSetName, eventName } = JSON.parse(this.notification_data.client.state).datasetImporting;
      // this.datasetName = dataSetName;
      // this.eventName = eventName;
    } 
  }

  async mappingTest(){
    // 'DataSet Mapping';
    const RES: any = await this.$store.dispatch('common/runAsynchronousService', {
      serviceId: `repo.event.mapping.test`,
      data:[{
        "_type" : "EventMappingConfiguration",
        "repository" : {
          "name" : this.clientState.eventMapping.eventName,
          "_type" : "EventRepository",
          "description" : this.clientState.eventMapping.eventDesc,
          "project" : {
            "id" : this.projectId,
            "_type" : "Project"
          },
          "relations" : {},
        },
        "dataset" : {
          "id" : this.clientState.eventMapping.dataSetId,
          "_type" : "Dataset",
          "project" : {
            "id" : this.projectId,
            "_type" : "Project"
          }
        },
        "mappings" : this.mappings,
      }, {
        "_type": "ClientImpl",
        "state": JSON.stringify(this.clientState),
      }],
    });
    this.sId = RES.data.info.id;

    // sid가 너무 늦게 들어 오는 경우가 있어 강제로 notification 이벤트를 발생 시킨다.
    this.onNotification();
  }

  async onCache(dataUri: string) {
    this.$store.dispatch('common/getCache', dataUri)
      .then(this.handlerSuccess)
      .catch(this.handlerError);
  }

  handlerSuccess(res: any) {
    const newVal = res.data.data;
    const nullCheck = newVal.results[0];
    const errorCheck = newVal.results[1];

    const nullErr = [];
    for (const attr in nullCheck) {
      if (/_err/.test(attr)) {
        if (nullCheck[attr] > 0) {
          //error
          nullErr.push({
            columnName: attr.replace('_err', ''),
            value: nullCheck[attr],
          });
        }
      }
    }

    const err = [];
    for (const attr in errorCheck) {
      if (/_err/.test(attr)) {
        //if (nullCheck[attr] > 0) {
        if (errorCheck[attr] > 0) {
          //error
          err.push({
            columnName: attr.replace('_err', ''),
            value: errorCheck[attr],
          });
        }
      }
    }

    if (nullErr.length < 1 && err.length < 1) {
      //에러 없음
      this.isError = false;
      this.isSuccess = true;
      this.onClickComplete();
    } else {
      //에러 있음
      const keys = Object.keys(newVal.results);

      //mappings:{"c0":"ci","c1":"ea","c3":"et|yyyy-MM-dd HH:mm:ss"}

      this.convertedMappings = {};
      Object.keys(this.mappings).forEach((m: any)=>{
        const key = m;
        const value = this.mappings[m].split('|')[0];

        this.convertedMappings[value] = key;
      });
      
      
      keys.forEach((i) => {
        //if (newVal.results[i].eid > -1) {
        if (i != '0' && i != '1') {
          const children: any = [];
          const items = Object.keys(newVal.results[i]);
          items.forEach((col) => {
            if (/_err/.test(col)) {
              if (newVal.results[i][col] > 0) {
                children.push({
                  dbColumnName: col.replace('_err', ''), //es, ec
                  //fields: {c0: "REPLICA_1", c1: "PROJECT_ID", c2: "BLOCK_ID", c3: "MOVE_ID", c4: "MOVE_TYPE", c5: "AREA_ID",…}
                  columnName: this.repoDataView.fields[this.convertedMappings[col.replace('_err', '')]],
                  columnValue: newVal.results[i][col.replace('_err', '')],
                });
              }
            }
          });
          this.results.push({
            rowNumber: newVal.results[i].eid,
            children: children,
          });
        }
      });

      this.isError = true;
    }
    this.isValidating = false;
  }

  checkDateFormat(dbColumnName: any) {
    if(dbColumnName == 'et') {
      return /et/.test(this.mappings[this.convertedMappings[dbColumnName]]);
    }else if(dbColumnName == 'es') {
      return /es/.test(this.mappings[this.convertedMappings[dbColumnName]]);
    }else if(dbColumnName == 'ec') {
      return /ec/.test(this.mappings[this.convertedMappings[dbColumnName]]);
    }
  }


  handlerError(err: AxiosError) {
    this.isError = true;
    this.isValidating = false;

    const header = err.response.headers;

    // 유정님 처리 방식으로 메시지 처리
    if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
      utils.bvModalmsgBoxOk(this,
        this.$t('view.repo.alert.datasource.index.title').toString(),
        this.$t('view.repo.alert.' + header['x-ioc-code']).toString(),
        'error');
    }
  }

  onClickReMapping() {
    this.$router.push({
      name: 'DatasetMappingSelect',
    });
  }

  async onClickComplete() {
    this.showOverlay = true;
    const relationsInput: any = {};//processId
    if(this.processId != null)
      relationsInput[this.processId] = {"_type": "GraphImpl", "id": this.processId };

    const res = await this.$store.dispatch('repository/getRepoDataMapping', {
      projectId: this.projectId,
      datasetId: this.clientState.eventMapping.dataSetId,
      repositoryName: this.clientState.eventMapping.eventName,
      repositoryDesc: this.clientState.eventMapping.eventDesc,
      mappings: this.mappings,
    }).catch((err: AxiosError) => utils.handlerError(this, err));

    if(res.data.data != null){
      await this.$store.dispatch('repository/getRepoEventSave', {
        eventId: res.data.data.id,
        eventName: this.clientState.eventMapping.eventName.replace('[L]', ''),
        eventDesc: this.clientState.eventMapping.eventDesc,
        projectId: this.projectId,
        relations: relationsInput,
        resourceGroupId: this.iprResourceGroupId,
      }).catch((err: AxiosError) => utils.handlerError(this, err).then(() => {
        return null
      }));

      this.gRespositoryId = res.data.data.id;

      const newDatasetCreateInfo = _.clone(this.datasetCreateInfo);
      newDatasetCreateInfo["repositoryId"] = this.gRespositoryId;
      this.$store.commit('repository/setDatasetCreateInfo', newDatasetCreateInfo);

      this.$store.commit('repository/setWhich', 'dataset');

      this.pageSelected=true;
      this.$router.push({
        name: 'DatasetCreateComplete',
        params: {
          which: 'dataset'
        }
      });
    }
  }

  numberWithCommas(x: number | string): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  //대시보드로 이동
  moveToDashboard() {
    this.$router.push({
      name: 'dashboard',
      params: {
        projectId: this.projectId,
        repositoryId: this.gRespositoryId,
      }
    });
  }

  //프로세스 분석으로 이동
  moveToProcessDiscovery() {
    this.$router.push({
      name: 'processDiscovery',
      params: {
        projectId: this.projectId,
        repositoryId: this.gRespositoryId,
      }
    });
  }

  //취소(이벤트목록으로 이동)
  moveToEventList() {
    this.$router.push({
      name: 'EventList',
    });
  }

  onHide(evt: any) { 
    if(evt.trigger === "backdrop"){ 
      evt.preventDefault(); 
    } 
  }

  /*onClickBack() {
    this.$router.push({
      name: 'DatasetMappingSelect',
    });
  }*/

  async onClickCancel() {

    const title = this.$t('view.repo.alert.title.info').toString();
    const content = this.$t('view.repo.alert.notMapping').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) {
      this.$router.push({
        name: 'EventList'
      });
    }
  }

  get iprResourceGroupId() {
    return (this.myInfo.workspaces.find((workspace: { name: string }) => workspace.name == this.clientState.eventMapping.workspaceName)).iprResourceGroupId;
  }

  // notification 창을 눌러서들어 왔을 경우 clientState 값 유지
  get clientState() {
    let { clientState }: any = this.datasetCreateInfo;
    clientState = JSON.parse(clientState);

    if( clientState != undefined && clientState.datasetImporting != undefined ) { // 일반 진행
      const { datasetImporting } = clientState;
      
      return {
        title: 'view.router.datasetMappingCheck.title',
        route: {
          from: 'DatasetMappingCheck',
          to: 'EventList', 
          failTo: 'DatasetMappingCheck'
        },
        eventMapping: {
          workspaceName: datasetImporting.workspaceName,
          dataSetId: this.datasetCreateInfo.dataSetId,
          dataSetName: datasetImporting.dataSetName,
          eventName: datasetImporting.eventName,
          eventDesc: datasetImporting.eventDesc,
          state: 'mapping test',

          resourceGroupId: this.datasetCreateInfo.resourceGroupId,
          //eventInfo: store.getters['repository/getEventInfo'],
          selectedWorkspace: this.datasetCreateInfo.selectedWorkspace
        }
      }
    } else if ( clientState != undefined && clientState.datasetImporting == undefined ) { // 뒤로갔다 왔을 경우
      return clientState;
    } else { // notification 창에서 진행
      if(this.notification_data != null && this.notification_data != undefined && this.notification_data.client != null && this.notification_data.client != undefined) {
        return JSON.parse(this.notification_data.client.state);
      } else {
        return null;
      }
    }
  }
  /* 메소드 선언 */
}
</script>