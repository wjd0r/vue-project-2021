<template>
  <!-- 원본데이터 생성 -->
  <div class="main-common-component create-component">
    <b-form @submit.prevent="onSubmit">
      <div class="create-content">
        <!-- flowbar -->
        <FlowBarStepFour mode="dataset" :stage="1"/>
        <!-- flowbar -->

        <!-- form - dataset -->
        <div class="dataset-create-component">
          <div class="dataset-create-content create-common-content">
            <div class="content-header">
              <h5 class="title">{{ $t('view.repo.form.dataset') }}</h5>
              <div class="right-align">
                <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
              </div>
            </div>
            <div class="content-body">
              <div class="form-content">
                <b-form-group :label="`${$t('view.repo.form.sourceDataName')} (*)`" label-cols="2" :invalid-feedback="originalDataName.text">
                  <b-form-input type="text" :placeholder="$t('view.repo.form.pleaseEnter')" autocomplete="off" v-model="form.input.originalDataName" :state="originalDataName.state" maxlength="255" required></b-form-input>
                </b-form-group>
                <validate-input type="text" :label-cols="2" mode="create" :essential="false" :isGroup="true"
                  v-model="form.input.originalDataDesc" :label="$t('view.repo.form.sourceDataDescription')" :placeholder="$t('view.repo.form.pleaseEnterDesc')"
                  :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="0" maxlength="255" />
              </div>
            </div>
          </div>
        </div>
        <!-- form - dataset -->

        <!-- form - event -->
        <div class="event-create-component">
          <div class="event-create-content create-common-content">
            <div class="content-header"><h5 class="title">{{ $t('view.repo.form.eventLog') }}</h5></div>
            <div class="content-body">
              <div class="form-content">
                <b-form-group :label="`${$t('view.repo.form.eventLogName')} (*)`" label-cols="2" :invalid-feedback="evnetLogName.text">
                  <b-form-input type="text" :placeholder="$t('view.repo.form.eventLogNameEnter')" autocomplete="off" v-model="form.input.evnetLogName" :state="evnetLogName.state" maxlength="255" required></b-form-input>
                </b-form-group>
                <validate-input type="text" :label-cols="2" mode="create" :essential="false" :isGroup="true"
                  v-model="form.input.eventLogDesc" :label="$t('view.repo.form.eventLogDesc')" :placeholder="$t('view.repo.form.eventLogDescEnter')"
                  :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="0" maxlength="255" />
              </div>
            </div>
          </div>
        </div>
        <!-- form - event -->
        
        <!-- 업로드 방식 -->
        <div class="selection-component">
          <div class="selection-content">
            <div class="content-header"><h5 class="title">{{ $t('view.repo.form.fileUploadType') }}</h5></div>
            <div class="content-body">
              <!-- 업로드 선택 -->
              <div class="form-content">
                <b-form-group class="optoin-selection" v-slot="{ ariaDescribedby }">
                  <b-form-radio v-model="form.radioBtn.uploadMethod" :aria-describedby="ariaDescribedby" value="file">{{ $t('view.repo.form.fileUpload') }}</b-form-radio>
                  <b-form-radio v-model="form.radioBtn.uploadMethod" :aria-describedby="ariaDescribedby" value="database">{{ $t('view.repo.form.dataSourceConn') }}</b-form-radio>
                </b-form-group>
              </div>
              <!-- 업로드 선택 -->

              <template v-if="form.radioBtn.uploadMethod === 'file'">
                <FileBox
                  @fileChange="onFileSelect" 
                  @selecteFileTypeChange="selecteFileTypeChange" 
                  @setCreatEventMXMLnXES="setCreatEventMXMLnXES"
                  @onFileInfo="onFileInfo"
                  :selectedFileType="selectedFileType"
                  @delimeter="onDelimeter"/>
              </template>
              <template v-else-if="form.radioBtn.uploadMethod === 'database'">
                <DatabaseBox
                  @conn="onConn"
                  @change="onChageJdbcInfo"
                  v-model="selectedDatabaseType"
                  :workspaceResourceGroupId="workspaceResourceGroupId" />
              </template>
            </div>
          </div>
        </div>
        <!-- 업로드 방식 -->

      </div>
      <!-- bottom -->
      <div class="bottom-component">
        <div class="bottom-content">
          <div class="btn-group">
            <template>
              <b-button v-if="dbLoading || uploadLoading" variant="primary" disabled>
                <b-spinner small></b-spinner>
              </b-button>
              <b-button v-else type="submit" variant="primary" class="btn-primary" :disabled="nextDisabled">{{ $t('view.repo.button.next') }}</b-button>
            </template>
            <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.form.cancel') }}</b-button>
          </div>
        </div>
      </div>
      <!-- bottom -->
    </b-form>

    <b-overlay :show="showOverlay" :no-wrap="true" class="overlay-flow" no-fade>
      <template #overlay>
        <CreateFlow @close="showOverlay = false" @onSightDay="onSightDay" :isLoading="isLoading"/>
      </template>
    </b-overlay>
  </div>
  <!-- 원본데이터 생성 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils, ValidationCheck } from '@/common';
import { ISetting } from '@/interface';
import { UtilsMixin } from '@/mixin';
import moment from 'moment';
import _ from 'lodash';

import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';
import FlowboxDataInput from '../../../components/flows/flowbox/FlowboxDataInput.vue';
import FlowboxDataFilter from '../../../components/flows/flowbox/FlowboxDataFilter.vue';
import FlowboxMapping from '../../../components/flows/flowbox/FlowboxMapping.vue';
import FlowboxComplete from '../../../components/flows/flowbox/FlowboxComplete.vue';

import FileBox from './components/FileBox.vue';
import DatabaseBox from './components/DatabaseBox.vue';
import CreateFlow from './CreateFlow.vue';
import ValidateInput from'@/views/components/ValidateInput.vue';

interface IForm {
  input: {
    originalDataName: string;
    originalDataDesc: string;
    evnetLogName: string;
    eventLogDesc: string;
  };
  radioBtn: {
    uploadMethod: string;
  };
  file: File;
  fileszie: number;
  fileTotal: number;
}

interface IJdbcInfo {
  dataSourceName?: string;
  hostname?: string;
  port?: number;
  role?: string;
  username?: string;
  password?: string;
  connection?: string;
  database?: string;
  schema?: string;
  entity?: string;
  provider? : string;
  projectId? : string;
  id? : string;
}

@Component({
  components: {
    FlowBarStepFour,
    FlowboxDataInput,
    FlowboxDataFilter,
    FlowboxMapping,
    FlowboxComplete,
    FileBox,
    DatabaseBox,
    CreateFlow,
    ValidateInput,
  },
  computed: {
    ...mapGetters({
      projectId: 'sso/getProjectId',
      myInfo: 'sso/getMyInfo',
      setting: 'sso/getSetting',
      datasetCreateInfo: 'repository/getDatasetCreateInfo',
    })
  },
})
export default class DatasetCreateForm extends Mixins(UtilsMixin) {
 /* Prop 선언 */
 /* mapGetters 변수 선언 */
  projectId!: any;
  myInfo!: any;
  setting!: ISetting;
  datasetCreateInfo!: any;

  userForm?: any = {
    email: '',
  };

 /* 클래스 변수 선언 */
  form: IForm = {
    input: {
      originalDataName: '', // 원본데이터 이름
      originalDataDesc: '', // 원본데이터 설명
      evnetLogName: '', // 이벤트로그 이름
      eventLogDesc: '', // 이벤트로그 이름
    },
    radioBtn: {
      uploadMethod: 'file', // 업로드 방식 : file, database
    },
    file: null,
    fileszie: 0,
    fileTotal: 0,
  }

  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;
  fileTotal: number;
  fileInfo: any = {
    file: {
      name: null,
    },
    headerRowIdx: 0,
    delimeter: ',',
  };

  isConn: boolean = false;

  jdbcInfo: IJdbcInfo = {
    hostname: null,
    database: null,
    entity: null,
  };

  selectedDatabaseType: { selectedJdbc: string; dsSelected: number; validate: boolean; invalidFeedback: any } = {
    selectedJdbc: null,
    dsSelected: 0,
    validate: null,
    invalidFeedback: null,
  };
  selectedFileType: string = null;

  dbLoading: boolean = false;
  isLoading: boolean = false;

  uploadLoading: boolean = false;

  uploadDataId: string = '';

  stateDelimeter: boolean = false;

  onConn(isConn: boolean) {
    this.isConn = isConn;
  }

  // 파일 업로드 | 데이터베이스 연결 라디오 버튼 클릭시
  @Watch("form.radioBtn.uploadMethod")
  initialization() {
    this.form.file = null;
    this.selectedFileType = null;
    this.initSelectedDatabaseType();
    this.initJdbcInfo();
  }

  initSelectedDatabaseType() {
    this.selectedDatabaseType = {
      selectedJdbc: null,
      dsSelected: 0,
      validate: null,
      invalidFeedback: null,
    };
  }

  initJdbcInfo() {
    this.jdbcInfo = {
      hostname: null,
      database: null,
      entity: null,
    };
  }

  onDelimeter(delimeter: boolean) {
    this.stateDelimeter = delimeter;
  }

  get selected() {
    return this.form.radioBtn.uploadMethod;
  }

  get selectedDb() {
    return this.selected == 'database' &&
      this.selectedDatabaseType.selectedJdbc != null &&
      this.selectedDatabaseType.validate;
  }

  get selectedFile() {
    return this.selected == 'file' &&
      this.selectedFileType != null &&
      this.fileInfo.file != null;
  }

  get clientState() {
    // #480 워크스페이스-전체 에서 생성 시 '워크스페이스를 선택해주세요.' 메시지 띄움(표준 프로세스 참고) 21.10.21
    const workspaceName = this.workspaceName;
    const clientState = {
      title: 'view.router.fileImporting.title',
      route: {
        from: 'DatasetDataImporting',
        to: 'EventList',
        failTo: 'DatasetDataImporting', //실패 바로가기
      },
      datasetImporting: {
        workspaceName: workspaceName,
        dataSetName: this.form.input.originalDataName,
        eventName: this.form.input.evnetLogName,
        eventDesc: this.form.input.eventLogDesc,
        file: {
          filename: this.fileInfo.file == null ? '' : this.fileInfo.file.name,
        },
        db: {
          dbtype: this.selectedDatabaseType.selectedJdbc,
          host: this.jdbcInfo.hostname,
          db: this.jdbcInfo.database,
          table: this.jdbcInfo.entity,
        },
        selectedWorkspace: this.datasetCreateInfo.selectedWorkspace
      }
    };

    if (this.form.radioBtn.uploadMethod == 'file') {
      delete clientState.datasetImporting.db;
    } else if (this.form.radioBtn.uploadMethod == 'database') {
      clientState.title = 'view.router.databaseImporting.title';
      delete clientState.datasetImporting.file;
    }

    return clientState;
  }

  onChageJdbcInfo(jdbcInfo: IJdbcInfo) {
    this.jdbcInfo = jdbcInfo;
  }

  async onSightDay(sightDay: boolean) {
    if(sightDay) {
      this.setting.sightDay.dataset = moment().format('YYYY-MM-DD');
    } else {
      this.setting.sightDay.dataset = '';
    }

    this.$store.dispatch('sso/setSetting', {
      id: this.myInfo.id,
      config: { ...this.setting },
    });
  }

  selecteFileTypeChange(type: string) {
    this.form.file = null;
    this.selectedFileType = type;
  }

  showOverlay: boolean = false;

  creatEventMXMLnXES: boolean = true;
  setCreatEventMXMLnXES(creatEventMXMLnXES: boolean) {
    this.creatEventMXMLnXES = creatEventMXMLnXES;
  }

  onFileInfo(fileInfo: any) {
    this.fileInfo = fileInfo;
  }

  created() {

    if(_.isUndefined(this.setting.sightDay)) {
      this.setting.sightDay = {
        dataset: null,
        repository: null,
        subrepository: null,
      }
    }
  }
 
  mounted() {
    const metadata = JSON.parse(this.myInfo.metadata);
    this.form.fileTotal = metadata.limitations.dataset.rowTotal;

    // 하루동안 보이지 않기
    this.showOverlay = this.setting.sightDay.dataset != moment().format('YYYY-MM-DD');

    //돌아가기 했을 때, datasetCreateInfo 비우는 작업 잊지 말것 #####
    //돌아가기 시 overlay 뜨지 않음
    this.showOverlay = this.$route.params.notShowOverlay == 'true' ? false : this.showOverlay;
    //정보 보존
    //1. 기본 정보: 데이터셋 이름, 데이터셋 설명, 이벤트로그 이름, 이벤트로그 설명
    if(this.$route.params.notShowOverlay == 'true') {
      this.form.input.originalDataName = this.datasetCreateInfo.datasetName;
      this.form.input.originalDataDesc = this.datasetCreateInfo.datasetDesc;
      this.form.input.evnetLogName = this.datasetCreateInfo.eventName;
      this.form.input.eventLogDesc = this.datasetCreateInfo.eventDesc;
    }

  }

  async onClickNext() {

    //데이터셋 이름 중복 체크
    const params2 = {
        name: this.form.input.originalDataName,
        projectId: this.projectId,
        resourceGroupId: this.datasetCreateInfo.resourceGroupId
    };
    let same2 = false;
    await this.$store.dispatch('repository/getRepoDataSaveTest', params2)
    .catch((err: any) => utils.handlerError(this, err).then(() => {
      same2 = true;
    }));
    if(same2) return;

    //이벤트로그 이름 중복 체크
    const params = {
        name: this.form.input.evnetLogName,
        projectId: this.projectId,
        resourceGroupId: this.datasetCreateInfo.resourceGroupId
    };
    let same = false;
    await this.$store.dispatch('repository/getRepoEventSaveTest', params)
    .catch((err: any) => utils.handlerError(this, err).then(() => {
      same = true;
    }));
    if(same) return;

    // $router.params 의 경우 새로고침을 하면 데이터가 날아가 vuex에 저장하는 형태로 바꿈..
    // 단 create 화면에서 빠져 나갈때 반드시 초기화를 해야 함.
    this.datasetCreateInfo.selectedFileType = this.selectedFileType;
    this.datasetCreateInfo.datasetName = this.form.input.originalDataName;
    this.datasetCreateInfo.datasetDesc = this.form.input.originalDataDesc;
    this.datasetCreateInfo.eventName = this.form.input.evnetLogName;
    this.datasetCreateInfo.eventDesc = this.form.input.eventLogDesc;
    this.datasetCreateInfo.clientState = JSON.stringify(this.clientState);

    this.$store.commit('repository/setUploadDataId', {});

    if (this.form.radioBtn.uploadMethod == 'file') {
      this.datasetCreateInfo.type = 'file';
      this.datasetCreateInfo.file = this.fileInfo.file;
      this.datasetCreateInfo.headerRowIdx = this.fileInfo.headerRowIdx;
      this.datasetCreateInfo.delimeter = this.fileInfo.delimeter;
      this.datasetCreateInfo.creatEventMXMLnXES = this.creatEventMXMLnXES.toString();

      this.$store.commit('repository/setDatasetCreateInfo', this.datasetCreateInfo);

      const errorOccured = await this.fileUpload();
      if(errorOccured) return;

      this.$store.commit('repository/setUploadDataId', this.uploadDataId);

      this.$router.push({
        name: 'DatasetPreview',
      });
      
    } else {
      // 직접 입력일때 (데이터 소스 가져오기 : 0, 직접 입력 : 1)
      let errorOccured = false;
      let errorCode = '';
      if(this.selectedDatabaseType.dsSelected == 1) {
        // 데이터 베이스 임포트 진행 데이터 소스 생성
        // IPR Enterprise API Reference v1.0 > 2. 데이터 관리 > 2.3. 데이터 소스 > 1. Create new data source info.
        // url POST /ipr/api/v1/service/run/repo.data.source.save

        const param: any = {
          provider: this.selectedDatabaseType.selectedJdbc,
          entity: this.jdbcInfo.entity,
          projectId: this.projectId,
          ...this.jdbcInfo,
        }

        //add workspace
        param.resourceGroupId = this.workspaceResourceGroupId;

        this.dbLoading = true;

        
        await this.$store.dispatch('datasource/dsCreate', param)
        .then((res) => {
          this.dbLoading = false;
        })
        .catch((err: any) => {
          this.dbLoading = false;

          errorOccured = true;

          const header = err.response.headers;
          errorCode = header['x-ioc-code'];
        });
      }

      if(errorOccured) {
        const title = this.$t('view.repo.alert.title.alarm').toString();
        const content = this.$t('view.repo.alert.' + errorCode).toString();
        await utils.bvModalmsgBoxOk(this, title, content, 'error');
        return;
      }



      this.datasetCreateInfo.type = 'database';
      this.datasetCreateInfo.selectedDatabaseType = this.selectedDatabaseType.selectedJdbc;
      this.datasetCreateInfo.jdbcInfo = JSON.stringify(this.jdbcInfo);

      this.$store.commit('repository/setDatasetCreateInfo', this.datasetCreateInfo);

      this.$router.push({
        name: 'DatasetPreview',
      });
    }
  }

  async fileUpload() {
    //this.state = 'fileUpload';

    this.uploadLoading = true;

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
    };

    let errorOccured = false;
    let errorCode = '';
    const resfile = await this.$store.dispatch(`repository/${this.selectedFileType == 'excel' ? 'xlsx' : this.selectedFileType}FileUpload`, DATA)
    .catch((err: any)=>{

      errorOccured = true;

      const header = err.response.headers;
      errorCode = header['x-ioc-code'];

    });

    if(errorOccured) {
        const title = this.$t('view.repo.alert.title.alarm').toString();
        const content = this.$t('view.repo.alert.' + errorCode).toString();
        await utils.bvModalmsgBoxOk(this, title, content, 'error');
    }

    this.uploadDataId = resfile.data.data.id;

    //return resfile.data.data.id;

    //this.fileImport();

    this.uploadLoading = false;

    return errorOccured;
  }

  async onClickCancel() {
    const title = this.$t('view.sso.alert.title.alarm').toString();
    const content = this.$t('view.repo.alert.cancel').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) { // 삭제 진행
      this.$router.push({
        name: 'EventList',
        params: {
        selectedWorkspace: this.datasetCreateInfo.selectedWorkspace
      }
      });
    }
  }

  get originalDataName() {
    // 원본 데이터 이름 : 문자,숫자,특문, 3 ~ 255, 중복체크 (중복 체크는 api 로)
    const name = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.form.input.originalDataName);
    return {
      state : name.state,
      text: name.feedback,
    }
  }

  get evnetLogName() {
    //이벤트 로그 이름 : 문자,숫자,특문, 3 ~ 255, 중복체크 (중복 체크는 api 로)
    const name = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.form.input.evnetLogName);

    return {
      state : name.state,
      text: name.feedback,
    }
  }

  blankCheck() {
    return !(this.form.input.originalDataName.trim() == '');
  }

  regexCheck() {
    const regex = new RegExp(this.regEx);
    return regex.test(this.form.input.originalDataName);
  }

  get selectFileCheck() { // 파일 & 데이터 베이스 연결 검증
    return !(this.form.file == null || this.form.file == undefined);
  }

  //numberFilesCheck() {
  //  return !(this.form.fileszie > this.form.fileTotal);
  //}

  onFileSelect(event: any) {
    this.form.file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(this.form.file);
    reader.onload = ((e) => {
      const length = e.target.result.toString().split('\n').length;
      this.form.fileszie = length - 2;
    });
  }

  // 다음 버튼 클릭
  onSubmit() {
    if (this.form.radioBtn.uploadMethod == 'file') {
      // 파일 업로드를 선택하였을 시
      this.nextFileUpload();
    } else {
      // 데이터 소스 직접 입력시
      this.nextDatabaseUpload();
    }
  }

  async nextFileUpload() {
    if ( this.originalDataName.state
        && this.evnetLogName.state
        && this.selectFileCheck // 파일 선택 체크
        // && this.numberFilesCheck() //파일 건수 체크
    ) {
      this.onClickNext();
    } else {
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const errorMessage = this.originalDataName.text != '' ? this.originalDataName.text :
        this.evnetLogName.text != '' ? this.evnetLogName.text :
        !this.selectFileCheck ? this.$t("view.repo.alert.selectFile").toString() :
        //!this.numberFilesCheck() ? this.$t("view.repo.alert.fileSizeCheck", {count: this.fileTotal}).toString() :
        this.$t('view.repo.alert.notKnow').toString();
      const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
      if(res) return;
    }
  }

  async nextDatabaseUpload() {
    if ( this.originalDataName.state
        && this.evnetLogName.state
        && (this.selectedDatabaseType.dsSelected == 0 || this.selectedDatabaseType.validate) // 직접입력
        && (this.selectedDatabaseType.dsSelected == 0 || this.isConn) // 데이터 베이스 연결 검증
        && this.selectedDb
        // && this.numberFilesCheck() //파일 건수 체크
    ) {
      this.onClickNext();
    } else {
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const errorMessage = !this.selectedDb ? this.$t('view.repo.alert.noDataSourceSelected').toString() :
        !(this.selectedDatabaseType.dsSelected == 0 || this.selectedDatabaseType.validate) ? this.selectedDatabaseType.invalidFeedback :
        !(this.selectedDatabaseType.dsSelected == 0 || this.isConn) ? this.$t('view.repo.alert.noDataConnection').toString() :
        this.originalDataName.text != '' ? this.originalDataName.text :
        this.evnetLogName.text != '' ? this.evnetLogName.text :
        //!this.numberFilesCheck() ? this.$t("view.repo.alert.fileSizeCheck", {count: this.fileTotal}).toString() :
        this.$t('view.repo.alert.notKnow').toString();
      const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
      if(res) return;
    }
  }

  validate() {
    const value = this.form.input.originalDataName;
    return this.empty(value) && this.special(value);
  }

  validateEvent() {
    const value = this.form.input.evnetLogName;
    return this.empty(value) && this.special(value);
  }

  invalidFeedback() {
    const value = this.form.input.originalDataName;
    if (!this.empty(value)) {
      return '';
    } else if (!this.space(value)) {
      return this.$t('view.repo.alert.firstBlankTest').toString();
    } else if (!this.special(value)) {
      return this.$t('view.repo.alert.regexTest').toString();
    }
  }

  invalidFeedbackEvent() {
    const value = this.form.input.evnetLogName;
    if (!this.empty(value)) {
      return '';
    } else if (!this.space(value)) {
      return this.$t('view.repo.alert.firstBlankTest').toString();
    } else if (!this.special(value)) {
      return this.$t('view.repo.alert.regexTest').toString();
    }
  }

  space(value: string) {
    let space = true;
    const regEx = /^[\s][a-zA-Zㄱ-힣0-9\s]*$/;
    space = regEx.test(value) ? false : true;

    return space;
  }

  empty(value: string) {
    let empty = true;

    empty = value != '';

    return empty;
  }

  special(value: string) {
    let special = true;

    const regEx = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9\s]*$/;
    special = (!value) || (!regEx.test(value)) ? false : true;

    return special;
  }

  get workspaceName() {
    if (this.$route.params.workspaceName != undefined) {
      return this.$route.params.workspaceName;
    } else {
      return this.myInfo.workspaces.find((workspace: any) => workspace.id == this.datasetCreateInfo.selectedWorkspace).name;
    }
  }

  get workspaceId() {
    if (this.datasetCreateInfo.workspace != undefined) {
      return this.datasetCreateInfo.workspace;
    } else {
      return (this.myInfo.workspaces.find((workspace: { name: string }) => workspace.name == this.workspaceName)).id;
    }
  }

  get workspaceResourceGroupId() {
    return (this.myInfo.workspaces.find((workspace: { name: string }) => workspace.name == this.workspaceName)).iprResourceGroupId;
  }

  get nextDisabled() {
    return !(this.form.radioBtn.uploadMethod == 'file' ?
      // 파일 업로드를 선택하였을 시
      this.originalDataName.state && this.evnetLogName.state &&
      this.selectFileCheck && (this.selectedFileType == 'csv' ? this.stateDelimeter : true):
      // 데이터 소스 직접 입력시
      this.originalDataName.state && this.evnetLogName.state &&
      (this.selectedDatabaseType.dsSelected == 0 || this.selectedDatabaseType.validate) // 직접입력
      && (this.selectedDatabaseType.dsSelected == 0 || this.isConn) // 데이터 베이스 연결 검증
      && this.selectedDb);
  }
}
</script>