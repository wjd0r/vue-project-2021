<template>
  <!-- 데이터 로딩 -->
  <div class="main-common-component imporing-component">
    <template v-if="isLoadingComplete">
      <div class="importing-content">
        <div class="text-center">
          <div class="progress-content">
            <div v-if="state == 'fileUpload'" class="gauge-text">{{ fileUploadProgress }}%</div>
            <b-progress v-if="state == 'fileUpload'" :value="fileUploadProgress" max="100" animated></b-progress>

            <div v-if="state != 'fileUpload'" class="gauge-text">{{Math.round(realtime_notification.progress)}}%</div>
            <b-progress v-if="state != 'fileUpload'" :value="Math.round(realtime_notification.progress)" max="100" animated></b-progress>
          </div>
          <h1 class="title" v-if="state == 'fileUpload'">{{ $t('view.repo.upload.loadingData') }}</h1>
          <h1 class="title" v-if="state != 'fileUpload'">{{ $t('view.repo.import.loadingData') }}</h1>
          <div class="loading-text" v-if="state == 'fileUpload'">{{ $t('view.repo.upload.wait') }}</div>
          <div class="loading-text" v-if="state != 'fileUpload'">{{ $t('view.repo.import.wait') }}</div>
        </div>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <b-button variant="outline-primary" class="btn-outline-primary" @click.prevent="onClickCancel">{{ $t('view.repo.button.exit') }}</b-button>
        </div>
      </div>
    </template>
  <!-- 데이터 로딩 -->
  <!-- 데이터 로딩 완료 -->
    <template v-else-if="isLoadingFail">
      <div class="importing-content">
        <div class="text-center">
          <div class="ico-mapping ico-complete" alt="완료 아이콘"></div>
          <h1 class="title"><p class="text-success">{{ $t('view.repo.import.process') }}</p></h1>
          <div class="loading-text">{{ $t('view.repo.import.next') }}</div>
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
    <!-- 데이터 로딩 실패 -->
    <template v-else>
      <div class="importing-content">
        <div class="text-center">
          <div class="ico-mapping ico-error" alt="에러아이콘"></div>
          <h1 class="title"><p class="text-error">{{ $t('view.repo.import.confirm') }}</p></h1>
            <div class="notice-text">{{ $t('view.repo.import.mappingBack') }}</div>
        </div>
      </div>
      <div class="bottom-component">
        <div class="bottom-content">
          <b-button variant="outline-primary" class="btn-back btn-outline-primary" @click.prevent="onClickBack" :disabled="state == 'fileUpload'">{{ $t('view.repo.import.back') }}</b-button>
          <div class="btn-group">
            <b-button variant="btn-secondary" class="btn-secondary" @click.prevent="onClickCancel" :disabled="state == 'fileUpload'">{{ $t('view.repo.button.exit') }}</b-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import store from '../../../../store';
import { AxiosError } from 'axios';
import { IClientState } from '@/interface';

import _, { isEmpty } from 'lodash';

import { UtilsMixin } from '@/mixin';

@Component({
 components: {

 },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
    notification: 'notification/getNotificationList',
    setting: 'sso/getSetting',
    datasetCreateInfo: 'repository/getDatasetCreateInfo',
  }),
})
export default class DatasetDataImporting extends Mixins(UtilsMixin) {
  // Prop ---------------------------------------------
  myInfo!: any;
  projectId!: any;
  notification!: any;
  setting!: any;
  uploadDataId: string;
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
  //state: 'fileUpload' | 'fileImport' | 'dbImport' = 'fileUpload';
  state: 'fileImport' | 'dbImport' = 'fileImport';

  notification_data: any = null;
  realtime_notification: any = {
    progress: 0,
  };

  dataUri: string = null;

  datasetName: string = '';
  eventName: string = '';

  isCompleted: boolean = false;

  fileUploadProgress: number = 0;
  // mounted ---------------------------------------------

  @Watch('isCompleted')
  onIsCompleted(isCompleted: boolean) {
    if(isCompleted)
      this.onClickNext();
  }

  mounted() {

    const fieldsToImport = this.$store.getters['repository/getFieldsToImport'];

    this.selectedFileType = this.datasetCreateInfo.selectedFileType;
    this.selectedDatabaseType = this.datasetCreateInfo.selectedDatabaseType;

    if(!isEmpty(this.$route.query)){
      this.sId = String(this.$route.query.sId);
      this.onNotification();
    }

    // 파일 업로드 진행시
    else if(this.datasetCreateInfo.type == 'file') {
      //this.fileUpload();
      this.uploadDataId = store.getters['repository/getUploadDataId'];
      this.fileImport();
    // 데이터 베이스 연결 진행시
    } else {
      this.dbImport();
    }
}

  // method ---------------------------------------------

  onClickNext() {
    this.$router.push({
      name: 'DatasetNextStep',
    });
  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'DatasetPreview',//'DatasetCreateForm',
    })
  }

  // 연결 오류 시 
  async handlerError(err: AxiosError) {
    this.dataLoadingFailed(); // 연결 실패 화면으로 변경
    this.isLoadingComplete = false;

    await utils.handlerError(this, err);

    this.dataLoadingCompleted();
  }

  // 연결 성공은 했으나, 데이터가 없을 경우
  handlerDelete(res: any) {
    this.dataLoadingFailed(); // 연결 실패 화면으로 변경
    const title = this.$t("view.repo.alert.title.alarm").toString();
    const content = this.$t("view.repo.alert.groupCreateCheck").toString();
    utils.bvModalmsgBoxOk(this, title, content, 'error').then((res: any) => {
      if(res) return;
    });

    this.$store.dispatch('repository/getRepoDataDelete', [{
      "_type" : "DatasetSelectConfiguration",
      "selectors" : [ {
        "id" : res.data.data.id,//"ids20210331095614",
        "_type" : "Dataset",
        "project" : {
          "id" : this.projectId, //"ipr20210331095614",
          "_type" : "Project"
        }
      }],
      "page" : 0,
      "size" : 100
    }]);
  }

  // 연결 성공
  handlerSuccess(res: any) {
    this.dataLoadingCompleted(); // 연결 성공 화면으로

    const fields = Object.keys(res.data.data.fields);
    if (fields.length < 3) { // 연결 성공은 했으나, 데이터가 적음
      this.handlerDelete(res);
    } else {
      // this.$emit('setDataSetCards');
      this.dataSetId = res.data.data.id;
      this.datasetCreateInfo.dataSetId = res.data.data.id;
      this.$store.commit('repository/setDatasetCreateInfo', this.datasetCreateInfo);
      if (this.selectedFileType == 'mxml' || this.selectedFileType == 'xes')
        this.$store.commit('repository/setGroupInfo', res.data.data);

      this.isCompleted = true;
    }
  }

  // 데이터 베이스 연결
  async databaseUpload() {
    this.jdbcInfo = JSON.parse(this.datasetCreateInfo.jdbcInfo);
    this.jdbcInfo.datasetName = this.datasetCreateInfo.datasetName;
    this.jdbcInfo.projectId = this.projectId;

    // 2.10 database import
    const res = await this.$store.dispatch('datasource/postgresUpload', this.jdbcInfo)
      .then(this.handlerSuccess)
      .catch(this.handlerError);
  }

  databaseParam(arg: string) {
    arg = arg == 'postgresql' || arg == 'postgres' ? 'psql' : arg;

    const { hostname, port, username, password, database, schema, table, entity } = JSON.parse(this.datasetCreateInfo.jdbcInfo);
    const { datasetName } = this.datasetCreateInfo;
    const resourceGroup = this.iprResourceGroupId;

    const fieldsToImport = this.$store.getters['repository/getFieldsToImport'];

    return {
      serviceId: `repo.data.import.db.${arg}.lite`,
      data: [{
        _type: `DatasetImportDb${this.toUpperCase(arg)}Configuration`,
        fields: fieldsToImport,
        hostname: hostname,
        port: String(port),
        username: username,
        password: password,
        database: database,
        schema: schema,
        entity: table ? table : entity,
        dataset: {
          _type: 'DatasetImpl',
          name: datasetName,
          project: {
            _type: 'ProjectImpl',
            id: this.projectId,
          },
          resourceGroup: {
            id: resourceGroup,
          },
        },
        // 데이터 소스 임포트시 info 추가
        // 데이터 소스 ID 필요
        info: {
          _type: 'DbDataSourceInfoImpl',
          id: this.$store.getters['repository/getDatasourceId']
        },
      }, {
        _type: "ClientImpl",
        state: this.datasetCreateInfo.clientState,
      }]
    }
  }

  fileParam(arg: string) {
    const { datasetName, datasetDesc, delimeter, headerRowIdx } = this.datasetCreateInfo;

    arg = arg == 'excel' ? 'xlsx' : arg;

    const resourceGroup = this.iprResourceGroupId;

    const fieldsToImport = this.$store.getters['repository/getFieldsToImport'];

    return {
      serviceId: 'repo.data.import.file.'+arg+'.lite',
      data: [{
        _type: 'DatasetImportFile' + this.toUpperCase(arg) + 'Configuration',
        fields: fieldsToImport,
        dataset: {
          name: datasetName,
          _type: 'Dataset',
          description: datasetDesc,
          project: {
            id: this.projectId,
            _type: 'Project',
          },
          resourceGroup: {
            id: resourceGroup,
          },
          relations : { },
        },
        dataFilters: [] as string[],
        filenames : [this.uploadDataId],
        delimeter: delimeter,
        headerRowIdx: headerRowIdx,
        limit: -1,
      }, {
        _type: "ClientImpl",
        state: this.datasetCreateInfo.clientState,
      }],
    };
  }

  toUpperCase(arg: string) { // css -> Css
    return arg == null ? '' : arg.charAt(0).toUpperCase() + arg.slice(1);
  }

/*
  // 1. file upload
  async fileUpload() {
    //this.state = 'fileUpload';

    const DATA: any = {
        datasetName: this.datasetCreateInfo.datasetName,
        datasetDesc: this.datasetCreateInfo.datasetDesc,
        projectId:  this.projectId,
        mapToEventRepository: true,
        uploadDataId: '',
        ...{
          file: this.datasetCreateInfo.file,
          headerRowIdx: this.datasetCreateInfo.headerRowIdx,
          delimeter: this.datasetCreateInfo.delimeter,
        },
        //mapToEventRepository: this.datasetCreateInfo.mapToEventRepository,
    };

    DATA.progress = (progress: number) => {
      this.fileUploadProgress = progress;
    }

    const resfile = await this.$store.dispatch(`repository/${this.selectedFileType == 'excel' ? 'xlsx' : this.selectedFileType}FileUpload`, DATA);
    this.uploadDataId = resfile.data.data.id;

    this.fileImport();
  }
  */

  // 2. file import
  async fileImport() {
    this.state = 'fileImport';

    const DATA = this.fileParam(this.selectedFileType);

    const RES: any = await this.asyncServiceCall(DATA)
      .catch((err: AxiosError) => { 
        utils.handlerError(this, err);
      }); // 1. Async Service Call

    if(RES.data == undefined) return;
    this.sId = RES.data.info.id;

    // sid가 너무 늦게 들어 오는 경우가 있어 강제로 notification 이벤트를 발생 시킨다.
    this.onNotification();
  }

  // 3. db import
  async dbImport() {
    this.state = 'dbImport';

    const DATA = this.databaseParam(this.selectedDatabaseType);

    const RES: any = await this.asyncServiceCall(DATA)
      .catch((err: AxiosError) => {
        utils.handlerError(this, err)
      }); // 1. Async Service Call

    if(RES.data == undefined) return;
    this.sId = RES.data.info.id;

    // sid가 너무 늦게 들어 오는 경우가 있어 강제로 notification 이벤트를 발생 시킨다.
    this.onNotification();
  }

  // 3. datauri -> cache 데이터 요청
  async onDataUri(dataUri: string) {
    this.state = JSON.parse(this.notification_data.client.state).title == 'Database-Import' ? 'dbImport' : 'fileImport';

    switch (this.state) {
      case 'fileImport': {
        this.$store.dispatch('common/getCache', dataUri)
          .then(this.handlerSuccess)
          .catch(this.handlerError);
        return;
      }
      case 'dbImport': {
        this.$store.dispatch('common/getCache', dataUri)
          .then(this.handlerSuccess)
          .catch(this.handlerError);
        return;
      }
    }
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

      if(this.notification_data != null) {
        const { dataSetName, eventName } = JSON.parse(this.notification_data.client.state).datasetImporting;
        this.datasetName = dataSetName;
        this.eventName = eventName;
      }
    } 
  }

  // 1. Async Service Call()
  async asyncServiceCall (DATA: {serviceId: string; data: any}) {
    return await this.$store.dispatch('common/runAsynchronousService', DATA)
      .catch((err: AxiosError) => utils.handlerError(this, err));
  }

  // 데이터가 다 불러 와지면
  dataLoadingCompleted() {
    this.isLoadingComplete = false;
  }

  // 데이터 불러오는 데 실패
  dataLoadingFailed() {
    this.isLoadingFail = false;
  }

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
}
</script>
