<template>
  <!-- 데이터셋 생성 -->
  <div class="main-common-component create-component">
    <b-form @submit.prevent="onSubmit">
      <div class="create-content">
        <!-- flowbar -->
        <FlowBarStepFourFilter mode="dataset" :stage="1"/>
        <!-- flowbar -->

        <!-- form - dataset -->
        <div class="dataset-create-component">
          <div class="dataset-create-content create-common-content">
            <div class="content-header">
              <h5 class="title">{{$t('view.repo.subDatasetCreateForm.datasetInfo')}}<!--데이터셋 현황--></h5>
              <div class="right-align">
                <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
              </div>
            </div>
            <div class="content-body">
              <div class="form-content">
                <b-form-group :label="$t('view.repo.subDatasetCreateForm.datasetNameOrigin')" label-cols="2">
                  <b-form-input type="text" :placeholder="$t('view.repo.form.pleaseEnter')" v-model="form.input.originalDataName" disabled></b-form-input>
                </b-form-group>
                <b-form-group id="datasetDesc"  :label="$t('view.repo.subDatasetCreateForm.datasetDescOrigin')" label-cols="2" label-for="dataset-desc">
                  <b-form-input id="nameInput" :placeholder="$t('view.repo.form.pleaseEnterDesc')" v-model="form.input.originalDataDesc" disabled></b-form-input>
                </b-form-group>
                <b-form-group id="datasetRow"  :label="$t('view.repo.subDatasetCreateForm.datasetRow')" label-cols="2" label-for="dataset-desc">
                  <b-form-input id="nameInput" :placeholder="$t('view.repo.form.pleaseEnter')" v-model="form.input.originalDataRow" disabled></b-form-input>
                </b-form-group>
                <b-form-group id="datasetRow"  :label="$t('view.repo.subDatasetCreateForm.lastUpdate')" label-cols="2" label-for="dataset-desc" v-if="isDb">
                  <b-form-input id="nameInput" :placeholder="$t('view.repo.form.pleaseEnter')" v-model="form.input.originalDataUpdateDate" disabled></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <!-- form - dataset -->

        <!-- form - event -->
        <div class="event-create-component">
          <div class="event-create-content create-common-content">
            <div class="content-header"><h5 class="title">{{$t('view.repo.subDatasetCreateForm.subDataset')}}<!--서브 데이터셋--></h5></div>
            <div class="content-body">
              <div class="form-content">
                <b-form-group :label="`${$t('view.repo.subDatasetCreateForm.subDatasetName')} (*)`" label-cols="2" :invalid-feedback="subDataSetName.text">
                  <b-form-input type="text" :placeholder="$t('view.repo.form.pleaseEnter')" autocomplete="off" v-model="form.input.subDataSetName" :state="subDataSetName.state" required maxlength="255"></b-form-input>
                </b-form-group>
                <b-form-group id="eventDesc"  :label="$t('view.repo.subDatasetCreateForm.subDatasetDesc')" label-cols="2" label-for="event-desc">
                  <b-form-input id="nameInput" :placeholder="$t('view.repo.form.pleaseEnterDesc')" autocomplete="off" v-model="form.input.subDataSetDesc" maxlength="255"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <!-- form - event -->
        
      </div>
      <!-- bottom -->
      <div class="bottom-component">
        <div class="bottom-content">
          <div class="btn-group">
            <template>
              <b-button v-if="dbLoading" variant="primary" disabled>
                <b-spinner small></b-spinner>
              </b-button>
              <b-button v-else type="submit" variant="primary" class="btn-primary">{{ $t('view.repo.button.next') }}</b-button>
            </template>
            <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.form.cancel') }}</b-button>
          </div>
        </div>
      </div>
      <!-- bottom -->
    </b-form>

    <b-overlay :show="showOverlay" :no-wrap="true" class="overlay-flow" no-fade>
      <template #overlay>
        <FilterCreateFlow @close="showOverlay = false" @onSightDay="onSightDay" :isLoading="isLoading"/>
      </template>
    </b-overlay>
  </div>
  <!-- 데이터셋 생성 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils, ValidationCheck } from '@/common';
import moment from 'moment';
import _ from 'lodash';

import FlowBarStepFourFilter from '../components/flows/FlowBarStepFourFilter.vue';
import FlowboxDataInput from '../components/flows/flowbox/FlowboxDataInput.vue';
import FlowboxDataFilter from '../components/flows/flowbox/FlowboxDataFilter.vue';
import FlowboxMapping from '../components/flows/flowbox/FlowboxMapping.vue';
import FlowboxComplete from '../components/flows/flowbox/FlowboxComplete.vue';

import { forEach } from 'lodash';

import FilterCreateFlow from './FilterCreateFlow.vue';
import { ISetting } from '@/interface';
import { IClientState } from '@/interface';

import { UtilsMixin } from '@/mixin';

interface IForm {
  input: {
    originalDataName: string;
    originalDataDesc: string;
    originalDataRow: string;
    originalDataUpdateDate: string;
    subDataSetName: string;
    subDataSetDesc: string;
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
    FlowBarStepFourFilter,
    FlowboxDataInput,
    FlowboxDataFilter,
    FlowboxMapping,
    FlowboxComplete,
    FilterCreateFlow,
  },
  computed: {
    ...mapGetters({
      projectId: 'sso/getProjectId',
      myInfo: 'sso/getMyInfo',
      setting: 'sso/getSetting',
      //datasetCreateInfo: 'repository/getDatasetCreateInfo',
      subDatasetCreateInfo: 'dataFilter/getSubDatasetCreateInfo',
    })
  },
})
export default class DatasetCreateForm extends Mixins(UtilsMixin) {
 /* Prop 선언 */
 /* mapGetters 변수 선언 */
  projectId!: any;
  myInfo!: any;
  setting!: ISetting;
  //datasetCreateInfo!: any;
  subDatasetCreateInfo!: any;

  userForm?: any = {
    email: '',
  };

 /* 클래스 변수 선언 */
  form: IForm = {
    input: {
      originalDataName: '', // 데이터셋 이름
      originalDataDesc: '', // 데이터셋 설명
      originalDataRow: '', // 데이터셋 이름
      originalDataUpdateDate: '', // 데이터셋 설명
      subDataSetName: '', // 이벤트로그 이름
      subDataSetDesc: '', // 이벤트로그 이름
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

  originType: string = '';

  showOverlay: boolean = false;

  resourceGroupId: string = '';

/*

  get clientState() {
    // #480 워크스페이스-전체 에서 생성 시 '워크스페이스를 선택해주세요.' 메시지 띄움(표준 프로세스 참고) 21.10.21
    const workspaceName = this.workspaceName;
    const clientState = {
      title: 'view.router.fileImporting.title',
      route: {
        from: 'DatasetDataImporting',
        to: 'DatasetDataImporting',
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
        }
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

  */

  async onSightDay(sightDay: boolean) {
    if(sightDay) {
      this.setting.sightDay.dataFilter = moment().format('YYYY-MM-DD');
    } else {
      this.setting.sightDay.dataFilter = '';
    }

    this.$store.dispatch('sso/setSetting', {
      id: this.myInfo.id,
      config: { ...this.setting },
    });
  }


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
  async created() {
    /*if(_.isUndefined(this.setting.sightDay)) {
      this.setting.sightDay = {
        dataset: null,
        repository: null,
        subrepository: null,
      }
    }*/

    const res = await this.$store.dispatch('repository/getRepoDataView', {
      datasetId: this.subDatasetCreateInfo.dataSetId,
      projectId: this.projectId
    });

    this.originType = res.data.data.originType;

    this.form.input.originalDataName = res.data.data.name;
    this.form.input.originalDataDesc = res.data.data.description;
    this.form.input.originalDataRow = res.data.data.originalSize;
    this.form.input.originalDataUpdateDate = res.data.data.lastSynced;

    this.resourceGroupId = res.data.data.resourceGroup.id;

  }

  

  get isDb() {
    return this.originType == 'database' ||
          this.originType == 'psql' ||
          this.originType == 'oracle' ||
          this.originType == 'mssql' ||
          this.originType == 'mysql' ||
          this.originType == 'mariadb';
  }
  

 
  mounted() {
    //const metadata = JSON.parse(this.myInfo.metadata);
    //this.form.fileTotal = metadata.limitations.dataset.rowTotal;

    // 하루동안 보이지 않기
    this.showOverlay = this.setting.sightDay.dataset != moment().format('YYYY-MM-DD');

    //돌아가기 시 overlay 뜨지 않음
    this.showOverlay = this.$route.params.notShowOverlay == 'true' ? false : this.showOverlay;
    //정보 보존
    //1. 기본 정보: 
    if(this.$route.params.notShowOverlay == 'true') {
      this.form.input.subDataSetName = this.subDatasetCreateInfo.dataSetName;
      this.form.input.subDataSetDesc = this.subDatasetCreateInfo.dataSetDesc;
    }
  }


  async onClickCancel() {
    const title = this.$t('view.sso.alert.title.alarm').toString();
    const content = this.$t('view.repo.alert.cancel').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) { 
      this.$router.push({
        name: 'EventList',
        params: {
        selectedWorkspace: this.subDatasetCreateInfo.selectedWorkspace
      }
      });
    }
  }

  get originalDataName() {
    const { originalDataName } = this.form.input;
    const state = originalDataName.trim() != '' && RegExp(this.regEx).test(originalDataName) && originalDataName.trim().length > 2 && this.space(originalDataName);
    const text =
      originalDataName == '' ? '' :
      !this.space(originalDataName) ? this.$t('view.repo.alert.firstBlankTest').toString() :
      originalDataName.trim().length < 3 ? this.$t('view.repo.alert.eventCreate.nameLengthEvent').toString() :
      originalDataName.trim() == '' ? this.$t("view.repo.alert.blankTest").toString() :
      !RegExp(this.regEx).test(originalDataName) ? this.$t("view.repo.alert.regexTest").toString() : '';

    return {
      state : state,
      text: text,
    }
  }

  get subDataSetName() {
    /*const { subDataSetName } = this.form.input;
    const state = subDataSetName.trim() != '' && RegExp(this.regEx).test(subDataSetName) && subDataSetName.trim().length > 2 && this.space(subDataSetName);
    const text =
      subDataSetName == '' ? '' :
      !this.space(subDataSetName) ? this.$t('view.repo.alert.firstBlankTest').toString() :
      subDataSetName.trim().length < 3 ? this.$t('view.repo.alert.eventCreate.nameLengthEvent').toString() :
      subDataSetName.trim() == '' ? this.$t("view.repo.alert.blankTest").toString() :
      !RegExp(this.regEx).test(subDataSetName) ? this.$t("view.repo.alert.regexTest").toString() : '';

    return {
      state : state,
      text: text,
    }*/

    const name = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.form.input.subDataSetName);

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

  selectFileCheck() { // 파일 & 데이터 베이스 연결 검증
    return !(this.form.file == null || this.form.file == undefined);
  }

  //numberFilesCheck() {
  //  return !(this.form.fileszie > this.form.fileTotal);
  //}


  // 다음 버튼 클릭
  async onSubmit() {

    //서브 데이터셋 이름 validation 필요
    //0. 첫글자 공백
    //1. 3글자 이상 입력
    //2. regex 체크
    //3. 중복이름체크(API 있는지 확인: 아이큐님)
    const value = this.form.input.subDataSetName;

/*
    if(!this.space(value)){

      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t('view.repo.alert.firstBlankTest').toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
        if(res) return;
      });
      return; 
    }
    if(value.length < 3){

      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t('view.repo.alert.eventCreate.nameLengthEvent').toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
        if(res) return;
      });
      return;
    }
    if(!this.special(value)){

      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t('view.repo.alert.regexTest').toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
        if(res) return;
      });
      return;
    }
*/  

    //validation 체크
    if(!this.subDataSetName.state){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const errorMessage = 
        this.subDataSetName.text != '' ? this.subDataSetName.text :this.$t('view.repo.alert.notKnow').toString();
        const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
        if(res) return;
      }
    //이름중복체크
    const params = {
        name: this.form.input.subDataSetName,
        projectId: this.projectId,
        resourceGroupId: this.resourceGroupId
    };
    let same = false;
    await this.$store.dispatch('repository/getRepoDataSaveTest', params)
    .catch((err: any) => utils.handlerError(this, err).then(() => {

      same = true;

    }));
    if(same) return;

    //새로고침해도 사용할 수 있게 vuex storage 저장

    const subDatasetCreateInfo: any = {};
    subDatasetCreateInfo.dataSetId = this.subDatasetCreateInfo.dataSetId;
    subDatasetCreateInfo.dataSetNameOrigin = this.form.input.originalDataName;
    subDatasetCreateInfo.dataSetName = this.form.input.subDataSetName;
    subDatasetCreateInfo.dataSetDesc = this.form.input.subDataSetDesc;
    subDatasetCreateInfo.resourceGroupId = this.resourceGroupId;
    subDatasetCreateInfo.selectedWorkspace = this.subDatasetCreateInfo.selectedWorkspace;
    this.$store.commit('dataFilter/setSubDatasetCreateInfo', subDatasetCreateInfo);

    this.$router.push({
        name: 'DatasetDataFilterSelect'
      });
  }

  validate() {
    const value = this.form.input.originalDataName;
    return this.empty(value) && this.special(value);
  }

  validateEvent() {
    const value = this.form.input.subDataSetName;
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
    const value = this.form.input.subDataSetName;
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

/*
  get workspaceName() {
    if (this.$route.params.workspaceName != undefined) {
      return this.$route.params.workspaceName;
    } else {
      return JSON.parse(this.datasetCreateInfo.clientState).datasetImporting.workspaceName;
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
  */
}
</script>