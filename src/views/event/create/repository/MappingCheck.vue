<template>
  <!-- 데이터 매핑 확인 -->
  <div class="main-common-component mapping-component">
    <div class="mapping-content">
      <!-- back -->
      <!--<Back :notSee="true"/>-->
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFour mode="repository" :stage="3"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{eventCreateInfo.eventName}}</div>
        </div>
      </div>
      <!-- 정보 -->

      <!--<b-overlay :show="showOverlay"  no-fade bg-color="#f2f2f2" opacity="1">-->
      <!-- 유효성 검증 완료 -->
      <div class="mapping-check-component" v-if="!isError">
        <div class="mapping-check-content">
          <!-- 검증중 -->
          <div class="text-center mapping-loading" v-if="isValidating">
            <b-spinner :label="$t('view.repo.label.loading')"></b-spinner><!--데이터를 불러오는 중-->
            <h1 class="title">{{$t('view.repo.label.checking')}}<!--유효성 검증중입니다.--></h1>
            <div class="notice-text">{{$t('view.repo.label.waitting')}}<!--잠시만 기다려주세요--></div>
          </div>
          <!-- 검증중 -->

          <!-- 검증 완료 -->
          <div class="text-center mapping-complete" v-if="isSuccess">
            <b-overlay :show="true" bg-color="#F2F2F2" small opacity="1">
            <!--<div class="ico-mapping ico-complete" alt="완료 아이콘"></div>-->
            <!--<h1 class="title">{{$t('view.repo.label.complete')}}--><!--유효성 검증이 완료 되었습니다.--><!--</h1>-->
            <!--<div class="notice-text">{{$t('view.repo.label.completeClick')}}--><!--완료 버튼을 눌러주세요.--><!--</div>-->
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
            <h1 class="title">{{$t('view.repo.label.confirm')}}<!--데이터를 다시 확인해주십시오.--></h1>
            <div class="notice-text">{{$t('view.repo.label.mapping')}}<!--재매핑 버튼을 눌러 새로운 매핑 작업을 해주세요.--></div>
          </div>

          <div class="content-body">
            <div class="error-list-content">
              
              <div class="colunm" v-for="result in results" :key="result.rowNumber">
                
                <div class="error-text">[row {{ result.rowNumber }}]</div>

                <span v-for="child in result.children" :key="child.columnName">
                  <div class="colunm-text">{{ child.columnName }} = {{ child.columnValue }}</div>
                  <!--<span v-if="/et/.test(mappings[convertedMappings(child.dbColumnName)])">{{$t('view.repo.event.mapping.errorResult.wrongDateFormat')}}</span>-->
                  <span v-if="checkDateFormat(child.dbColumnName)">{{$t('view.repo.event.mapping.errorResult.wrongDateFormat')}}<!--날짜 형식이 잘 못 되었습니다.--></span>
                  <span v-else-if="child.columnValue === 'null'">{{$t('view.repo.event.mapping.errorResult.noAcceptNull')}}<!--null은 허용하지 않습니다.--></span>
                  <span v-else-if="child.columnValue === ''">{{$t('view.repo.event.mapping.errorResult.noAcceptBlank')}}<!--빈 값은 허용하지 않습니다.--></span>
                  <span v-else>{{$t('view.repo.event.mapping.errorResult.thereIsError')}}<!--에 에러가 있습니다.--></span>
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <!-- 유효성 검증 실패 -->
      <!-- spinner-small spinner-type="grow">-->
      

    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
        <b-button variant="primary" class="btn-primary btn-remapping" @click.prevent="onClickReMapping" v-show="isError">{{ $t('view.repo.button.remapping') }}</b-button>
        <b-button variant="outline-primary" class="btn-outline-primary text-right btn-exit" @click.prevent="onClickCancel" v-show="!isSuccess || isValidating">{{ $t('view.repo.button.exit') }}</b-button><!--!isError && !isSuccess-->
        <b-button variant="primary" class="btn-primary text-right btn-complete" @click.once="onClickComplete" v-show="isSuccess">{{ $t('view.repo.button.complete') }}</b-button>
      </div>
    </div>
    <!-- bottom -->
  
  </div>
  <!-- 데이터 매핑 확인 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../../../../store';
import { AxiosError, AxiosResponse } from 'axios';

import Back from '../../../components/Back.vue';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';
import { IClientState } from '@/interface';

import { utils } from '@/common';
import _, { isEmpty } from 'lodash';

@Component({
 components: {
   Back,
   FlowBarStepFour
 },
  computed: mapGetters({
    mappings: 'repository/getMappingData',//'eventLog/getMappingData',
    repoDataView: 'repository/getRepoDataView',

    notification:'notification/getNotificationList',
    eventCreateInfo: 'repository/getEventCreateInfo',

  }),
})
export default class RepositoryMappingCheck extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 notification!: any;
 eventCreateInfo!: any;
 /* 클래스 변수 선언 */


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
 /*
 mounted() {
   
 }
 */

  dataSetName: string = '';
  dataSetId: string = '';
  eventName: string = '';
  eventDesc: string = '';
  resourceGroupId: string = '';

  eventInfo: any = null;
  
  isError: boolean = false;
  isValidating: boolean = true;
  isSuccess: boolean = false;

  mappings!: any;
  repoDataView!: any;

  results: any[] = [];

  totalRow: number = 0;

  //eventName: string = '';
  //eventDesc: string = '';
  processName: string = '';
  processId: string = '';

  pageSelected: boolean = false;

  gRespositoryId: string = null;

  sId: string = '';
  notification_data: any = null;

  showOverlay: boolean = false;
  
  selectedWorkspace: string = null;

  convertedMappings: any;

  mounted() {

    const eventCreateInfo = this.$store.getters['repository/getEventCreateInfo'];

    this.dataSetId = eventCreateInfo.dataSetId;
    this.dataSetName = eventCreateInfo.dataSetName;
    this.eventName = eventCreateInfo.eventName;
    this.eventDesc = eventCreateInfo.eventDesc;
    this.resourceGroupId = eventCreateInfo.resourceGroupId;
    this.selectedWorkspace = eventCreateInfo.selectedWorkspace;

    if(this.$route.query.sId == undefined) {
      this.mappingTest2();
    }else{
      this.sId = String(this.$route.query.sId);

      //forRemapping
      const message = _.find(this.notification, ['serviceId', this.sId]);
      const eventMapping = JSON.parse(JSON.parse(message.notificationData).client.state).eventMapping;
      
      this.dataSetId = eventMapping.dataSetId;
      this.dataSetName = eventMapping.dataSetName;
      this.eventName = eventMapping.eventName;
      this.eventDesc = eventMapping.eventDesc;
      this.resourceGroupId = eventMapping.resourceGroupId;
      this.selectedWorkspace = eventMapping.selectedWorkspace;

      this.eventInfo = eventMapping.eventInfo;

      this.$store.commit('repository/setEventCreateInfo', {
        dataSetId: this.dataSetId,
        dataSetName: this.dataSetName, 
        eventName: this.eventName,
        eventDesc: this.eventDesc,
        resourceGroupId: this.resourceGroupId,
        selectedWorkspace: this.selectedWorkspace
      });

      this.$store.commit('repository/setEventInfo', {
        registeredProcessList: this.eventInfo.registeredProcessList,
        referenceModel: this.eventInfo.referenceModel
      });

      
      this.onNotification();
    }


    //this.mappingTest();
  }

  @Watch('notification', { deep: true })
  onNotification() {
    // 2. noti에서 datauri 가져오기
    const message = _.find(this.notification, ['serviceId', this.sId]); // watch 로 체크

    if(message != undefined) {
      const NOTIFICATION_DATA = JSON.parse(message.notificationData);

      const STATE = NOTIFICATION_DATA.state;
      const DataUri = NOTIFICATION_DATA.dataUri;

      if (STATE == 'COMPLETED' && this.notification_data == null) { // 성공시 dataurl를 읽어 캐시 요청
        this.notification_data = {
          num: this.notification_data == null ? 0 : this.notification_data.num + 1,
          ...NOTIFICATION_DATA,
        };

        this.onCache(NOTIFICATION_DATA.dataUri);
      } else if (STATE == 'ERROR' && this.notification_data == null) { // 에러시 바로 에러 처리
        this.notification_data = {
          num: this.notification_data == null ? 0 : this.notification_data.num + 1,
          ...NOTIFICATION_DATA,
        };
        this.handlerError({ error : NOTIFICATION_DATA.message });
      }

      // const { dataSetName, eventName } = JSON.parse(this.notification_data.client.state).datasetImporting;
      // this.datasetName = dataSetName;
      // this.eventName = eventName;
    } 
  }

  async mappingTest2(){
    // 'DataSet Mapping';

    const RES: any = await this.$store.dispatch('common/runAsynchronousService', {
      serviceId: `repo.event.mapping.test`,
      data:[{
        "_type" : "EventMappingConfiguration",
        "repository" : {
          "name" : this.eventName,
          "_type" : "EventRepository",
          "description" : this.eventDesc,
          "project" : {
            "id" : this.$store.getters['sso/getProjectId'],
            "_type" : "Project"
          },
          "relations" : {},
        },
        "dataset" : {
          "id" : this.dataSetId,
          "_type" : "Dataset",
          "project" : {
            "id" : this.$store.getters['sso/getProjectId'],
            "_type" : "Project"
          }
        },
        "mappings" : this.mappings,
      }, {
        "_type": "ClientImpl",
        "state": JSON.stringify({
          "title": 'view.router.repositoryMappingCheck.title',//'Repository Mapping Check',
          "route": {
            "from": 'RepositoryMappingCheck',
            "to": 'EventList',
            "failTo": 'RepositoryMappingCheck',
          },
          eventMapping: {
            workspaceName: utils.getWorkspaceByRgId(this.resourceGroupId)?.name,
            dataSetId: this.dataSetId,
            dataSetName: this.dataSetName,
            eventName: this.eventName,
            state: "mapping test",

            eventDesc: this.eventDesc,
            resourceGroupId: this.resourceGroupId,
            eventInfo: store.getters['repository/getEventInfo'],
            selectedWorkspace: this.selectedWorkspace
          }
        }),
      }],
    });
    this.sId = RES.data.info.id;
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

  handlerError(err: any) {
    //const code = err.response.headers["x-ioc-code"];
    //const message = err.response.headers["x-ioc-message"];

    //if (code == 'IPR_ERR_403_01900201') {
      //const mtitle = this.$t("view.repo.alert.title.cantCreateTitle").toString();
      //const mcontent = this.$t("view.repo.alert.IPR_ERR_403_01900201").toString();

      const mtitle = this.$t("view.repo.alert.title.cantCreateTitle").toString();
      const mcontent = this.$t("view.repo.alert.eventLogMappingError").toString();

      utils.bvModalmsgBoxOk(this, mtitle, mcontent, 'error').then((res: any) => {
        if(res==true) this.moveToEventList();
      });
    //}
  }

  //옛날 method
  mappingTest() {

    this.$store
      .dispatch('repository/getRepoDataMappingTest', { //sse mapping test
        projectId: this.$store.getters['sso/getProjectId'],
        datasetId: this.dataSetId,
        repositoryName: this.eventName,
        repositoryDesc: this.eventDesc,
        mappings: this.mappings,
      })
      .then((res) => {
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
        } else {
          //에러 있음
          const keys = Object.keys(newVal.results);
          
          
          keys.forEach((i) => {
            //if (newVal.results[i].eid > -1) {
            if (i != '0' && i != '1') {
              const children: any = [];
              const items = Object.keys(newVal.results[i]);
              items.forEach((col) => {
                if (/_err/.test(col)) {
                  if (newVal.results[i][col] > 0) {
                    children.push({
                      dbColumnName: col.replace('_err', ''),
                      columnName: this.repoDataView.fields[col.replace('_err', '')],
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
      })
      .catch((err: AxiosError) => {

          const code = err.response.headers["x-ioc-code"];
          const message = err.response.headers["x-ioc-message"];

          if (code == 'IPR_ERR_403_01900201') {

            const mtitle = this.$t("view.repo.alert.title.cantCreateTitle").toString();
            const mcontent = this.$t("view.repo.alert.IPR_ERR_403_01900201").toString();

            this.$bvModal
              .msgBoxOk(mcontent, {
                title: mtitle, 
                size: 'sm',
                buttonSize: 'sm',
                centered: true,
            }).then((res: any) => {
                if(res==true) this.moveToEventList();
            });
          }
        });
  }

  onClickReMapping() {
    this.$router.push({
      name: 'RepositoryMappingSelect',
      //params: {
      //  dataSetId: this.$route.params.dataSetId,
        //projectId: this.$store.getters['sso/getProjectId']
      //  fileName: this.$route.params.fileName,
      //  eventName:  this.$route.params.eventName
      //}
    });
  }

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

  async onClickComplete() {

    this.showOverlay = true;

    /*
    let eventInfo = null;
    let registeredProcessList = null;

    if(this.$route.query.sId == undefined){
      eventInfo = store.getters['repository/getEventInfo'];
      registeredProcessList = eventInfo.registeredProcessList;
    }else{
      eventInfo = this.eventInfo;
      registeredProcessList = this.eventInfo.registeredProcessList;
    }
    */

    const eventInfo = store.getters['repository/getEventInfo'];
    const registeredProcessList = eventInfo.registeredProcessList;
        
    

    const relationsInput: any = {};//processId
    
    //if(this.processId != null)
    //  relationsInput[this.processId] = {"_type": "GraphImpl", "id": this.processId };

    registeredProcessList.forEach((process: any) => {
      relationsInput[process.id] = {"_type": "GraphImpl", "id": process.id };
      
    });

    let referenceModel = {};
    if(eventInfo.referenceModel != null) {
      referenceModel = {
          "_type": "GraphImpl",
          "id": eventInfo.referenceModel.id
      };
    }
    

    const res = await this.$store.dispatch('repository/getRepoDataMapping', { //sse mapping
      projectId: this.$store.getters['sso/getProjectId'],
      datasetId: this.dataSetId,
      repositoryName: this.eventName,
      repositoryDesc: this.eventDesc,
      mappings: this.mappings,
    });

    if(res.data.data != null){

      let saveInput = {};
      if(eventInfo.referenceModel != null) {
        saveInput = {
          eventId: res.data.data.id,
          eventName: this.eventName,
          eventDesc: this.eventDesc,
          projectId: this.$store.getters['sso/getProjectId'],
          relations: relationsInput,
          referenceModel: referenceModel,
          resourceGroupId: this.resourceGroupId
        };
      }
      else {
        saveInput = {
          eventId: res.data.data.id,
          eventName: this.eventName,
          eventDesc: this.eventDesc,
          projectId: this.$store.getters['sso/getProjectId'],
          relations: relationsInput,
          resourceGroupId: this.resourceGroupId
        };
      }
      
      const res2 = await this.$store.dispatch('repository/getRepoEventSave', saveInput);

      this.gRespositoryId = res.data.data.id;
      this.pageSelected=true;

      this.$store.commit('repository/setEventCreateInfo', {
        dataSetId: this.dataSetId,
        dataSetName: this.dataSetName, 
        eventName: this.eventName,
        eventDesc: this.eventDesc,
        repositoryId: this.gRespositoryId,
        selectedWorkspace: this.selectedWorkspace
      });

      this.showOverlay = false;
      this.$store.commit('repository/setWhich', 'repository');


      this.$router.push({ 
        name: 'RepositoryCreateComplete',
        params: {
          //projectId: this.$store.getters['sso/getProjectId'],
          //repositoryId: this.gRespositoryId,
          which: 'repository'
      }
      });
    }
  }

  numberWithCommas(x: number | string): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
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

  /* 메소드 선언 */
  requestBuilderMappingTest() {

    const request = {
        "_type" : "DatasetMappingConfiguration",
        "repository" : {
          "name" : this.eventName, 
          "_type" : "EventRepository",
          "description" : this.eventDesc, 
          "project" : {
            "id" : this.$store.getters['sso/getProjectId'],
            "_type" : "Project"
          },
          "relations" : {},
        },
        "dataset" : {
          "id" : this.dataSetId,
          "_type" : "Dataset",
          "project" : {
            "id" : this.$store.getters['sso/getProjectId'], 
            "_type" : "Project"
          }
        },
        "mappings" : this.mappings,
    };
  
    return request;
  
  }

  requestBuilderMapping() {
    
    const request = {
        "_type" : "DatasetMappingConfiguration",
        "repository" : {
          "name" : this.eventName, 
          "_type" : "EventRepository",
          "description" : this.eventDesc, 
          "project" : {
            "id" : this.$store.getters['sso/getProjectId'], 
            "_type" : "Project"
          },
          "relations" : {},
        },
        "dataset" : {
          "id" : this.dataSetId, 
          "_type" : "Dataset",
          "project" : {
            "id" : this.$store.getters['sso/getProjectId'], 
            "_type" : "Project"
          }
        },
        "mappings" : this.mappings,
    };

    return request;
  
  }

/*
  clientBuilder() {
    const clientState: IClientState = {
        title: 'EventMapping', // 다국어 처리를 위해 id처럼 like view.sse.title.data.importing
        route: {
          from: 'RepositoryMappingCheck', // route name
          to: 'RepositoryMappingCheck', // route name
          params: {
            projectId: this.$store.getters['sso/getProjectId'],
            //repositoryId?: string;
          },
        },
        eventMapping: {
          dataSetId: this.dataSetId, 
          dataSetName: this.dataSetName, 
          eventName: this.eventName, 
          state: 'mapping',
        },
    };

    const clientRequest = {
      _type: 'ClientImpl',
      state: JSON.stringify(clientState)
    };

    return clientRequest;
  }
*/

}
</script>