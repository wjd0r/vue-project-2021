<template>
  <!-- 데이터셋 수정 -->
  <ValidationObserver v-if="showModal" ref="form" tag="form" @submit.prevent="modifyDataSetInfo" id="DatasetModify" :class="`lang-${$i18n.locale}`">
    <div class="right-align">
      <div class="notice-text">(*) 필수사항</div>
    </div>
    <div class="content-body" v-if="showModal">
      <!-- form : dataser > file -->
      <div class="form-content" v-if="isOriginType">
        <b-form-group label-cols="2" :label="`${$t('view.repo.label.datasetName')} (*)`">
          <b-input-group  :invalid-feedback="dataSetName.text"> 
            <b-form-input v-if="isOperation" :value="item.modifyGroupName" @input.native="item.modifyGroupName = $event.target.value" v-model="item.modifyGroupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" :state="dataSetName.state" :disabled="isMobileBlock()" maxlength="255"></b-form-input>
            <b-form-input v-else @change="isOperation = true" :value="item.modifyGroupName" @input.native="item.modifyGroupName = $event.target.value" v-model="item.modifyGroupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" :disabled="isMobileBlock()" maxlength="255" :state="dataSetName.state"></b-form-input>
            <!--<b-form-invalid-feedback>
              <span v-if="!stateAll">{{feedback}}</span>
            </b-form-invalid-feedback>-->
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="2" :label="$t('view.repo.label.datasetDescription')">
            <b-form-input v-model="item.modifyGroupDesc" :placeholder="$t('view.repo.form.putDatasetDesc')" autocomplete="off" :disabled="isMobileBlock()" maxlength="255"></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" :label="$t('view.repo.label.classifier')">
          <b-form-input :value="$t('view.repo.form.fileupload')" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" :label="$t('view.repo.label.fileName')">
          <b-form-input v-model="item.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" :label="$t('view.repo.label.number')">
          <b-form-input v-model="item.originalSize" autofocus required autocomplete="off" disabled></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" :label="$t('view.repo.label.relDataset')">
          <b-form-input v-model="item.relDataset" autofocus required autocomplete="off" disabled></b-form-input>
        </b-form-group>
        
      </div>
      <!-- form : dataser > file -->

      <!-- form : dataser > db -->
      <div class="form-content" v-else>
        <b-form-group label-cols="2" :label="`${$t('view.repo.label.datasetName')} (*)`">
          <b-input-group :invalid-feedback="dataSetName.text"> 
            <b-form-input v-if="isOperation" :value="item.modifyGroupName" @input.native="item.modifyGroupName = $event.target.value" v-model="item.modifyGroupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" :state="dataSetName.state" maxlength="255" :disabled="isMobileBlock()"></b-form-input>
            <b-form-input v-else @change="isOperation = true" :value="item.modifyGroupName" @input.native="item.modifyGroupName = $event.target.value" v-model="item.modifyGroupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" maxlength="255" :state="dataSetName.state" :disabled="isMobileBlock()"></b-form-input>
            <!--<b-form-invalid-feedback>
              <span v-if="!stateAll">{{feedback}}</span>
            </b-form-invalid-feedback>-->
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="2" :label="$t('view.repo.label.datasetDescription')">
            <b-form-input v-model="item.modifyGroupDesc" :placeholder="$t('view.repo.form.putDatasetDesc')" :disabled="isMobileBlock()" maxlength="255"></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" :label="$t('view.repo.label.classifier')">
          <b-form-input :value="$t('view.repo.form.dataSourceConn')" autofocus required autocomplete="off" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" :label="$t('view.repo.label.databaseName')">
          <b-form-input :value="$t(`view.repo.datasource.type.${item.dataSet.originType}`)" autofocus required autocomplete="off" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-cols="2" :label="$t('view.repo.label.number')">
          <b-form-input v-model="item.originalSize" autofocus required autocomplete="off" disabled></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" :label="$t('view.repo.label.relDataset')">
          <b-form-input v-model="item.relDataset" autofocus required autocomplete="off" disabled></b-form-input>
        </b-form-group>

        <div class="row row-content">
          <b-form-group label-cols="4" label="Host" class="col-6 col-content">
            <b-form-input :value="item.db.hostname" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label="Port" class="col-6 col-content">
            <b-form-input :value="item.db.port" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label="Username" class="col-6 col-content">
            <b-form-input :value="item.db.username" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label="Password" class="col-6 col-content">
            <b-form-input type="password" :value="item.db.password" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label="Database" class="col-6 col-content">
            <b-form-input :value="item.db.database" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label="Table" class="col-6 col-content">
            <b-form-input :value="item.db.entity" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>
        </div>
      </div>
      <!-- form : dataser > db -->
      <!-- table -->
      <div class="table-component">
        <div class="content-header">
          <h5 class="title">{{ $t('view.repo.label.sample') }}</h5>
        </div>
        <div class="content-body">
          <div class="table-content">
            <b-table bordered :items="items" :fields="fields" v-show="tableVisible" :style="{ width: tableWidth }" responsive :busy="isLoading">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                </div>
              </template>
            </b-table>
          </div>
        </div>
      </div>
      <!-- table -->

      <!-- footer -->
      <div class="content-footer">
        <div class="btn-group">
          <b-button type="submit" variant="primary" class="btn-modify" :class="{ 'd-none': isMobileBlock() }" :disabled="!showModal || !tableVisible || isLoading">{{ $t('view.repo.button.modify') }}</b-button>
          <b-button type="button" @click.prevent="item.modifyShow = false" class="btn-cancel">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
      <!-- footer -->
    </div>
  </ValidationObserver>
  <!-- 데이터셋 수정 -->
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils, ValidationCheck } from '@/common';
import { AxiosError, AxiosResponse } from 'axios';

import _, { forEach } from 'lodash';

import { UtilsMixin } from '@/mixin';

interface IDb {
  connectionString?: string;
  database?: string;
  dataset?: any;
  driver?: string;
  entity?: string;
  hostname?: string;
  limit?: number;
  loadReleation?: string;
  page?: number;
  password?: string;
  port?: number;
  provider?: string;
  schema?: string;
  size?: number;
  username?: string;
}

@Component({
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    myInfo: 'sso/getMyInfo',
    setting: 'sso/getSetting',
  }),
})
export default class DataSetModifyModal extends Mixins(UtilsMixin) {
  //repoEventView!: any;
  projectId!: any;
  myInfo!: any;

  @Prop({ default:() => ({
    dataSet: {
      _type: '',
      created: '',
      createdBy: '',
      createdByName: '',
      fieldInfo: {},
      fields: {},
      id: '',
      modified: '',
      modifiedBy: '',
      modifiedByName: '',
      name: '',
      originType: '',
      originalSize:0,
      project: {},
      relationCount:0,
      size: 0,
      sizeBytes: 0,
      values: {},
      version: ''
    }
  }) })
  item!: any;
  setting!: any;

  @Prop()
  title!: string;

  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;

  // data table
  items: any = [];
  fields: any = [];
  tableVisible: boolean = false;
  tableWidth: string = '100%';
  pageNumber: number = 1; // 1page
  size: number = 5; // 5개 행
  selectes: any = [];
  totalRows: number = 0;

  interval: any;
  isLoading: boolean = true;

  // 데이터 조작이 있는지 없는지?
  isOperation: boolean = false;

  originGroupName: string = '';

  get showModal () {
    return this.item.modifyShow && this.isDataSet;
  }

  created() {

    this.originGroupName = this.item.modifyGroupName;

    this.selectes = this.item.selectes;
    this.fields = [...this.item.fields].slice(0,5);

    this.getTableWidth();
    this.tableVisible = true;
    this.getRepoDataViewData();
  }

  get isDataSet() {
    return this.item != undefined &&
      this.item.dataSet != undefined;
  }

  get isOriginType() {
    return (
      this.item.dataSet.origin.originType == 'csv' || 
      this.item.dataSet.origin.originType == 'file' || 
      this.item.dataSet.origin.originType == 'excel' || 
      this.item.dataSet.origin.originType == 'mxml' || 
      this.item.dataSet.origin.originType == 'xes');
  }

  onModifyShow() {
    this.$emit('onModifyShow');
  }

  // getData()
  //데이터 정보 가져오기
  getRepoDataViewData() {
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.projectId,//this.$route.params.projectId,
      datasetId: this.item.dataSet.id,
      page: this.pageNumber - 1,
      size: this.size,
    }).then((res: AxiosResponse) => {
      this.isLoading = false;
      this.fields = this.item.fields;

      //데이터 내용 변화에 반응
      const data = res.data.data
      const keys = Object.keys(data.results);
      const items: any = [];
      keys.forEach((key: any) => {
        const item = data.results[key];
        items.push(item);
      });

      this.totalRows = data.totalElements;
      this.items = items;
    });
  }

  getTableWidth() {
    if (document.querySelector('div.mapping-table-frame')) {
      const frame = document.querySelector('div.mapping-table-frame').clientWidth;
      const table = this.fields.length * 200;
      if (frame > table) {
        this.tableWidth = '100%';
      } else {
        this.tableWidth = table + 'px';
      }
    }
  }

  regexTest(name: string) {
    const regex = new RegExp(this.regEx);
    return !regex.test(name); //정규표현식 일치 안할 때 true 리턴
  }

  // 내 데이터셋 수정
  async modifyDataSetInfo() {
    if(!this.permissionsUpdate) {
      utils.noPermissionAlert(this);
    } else {
      /*
      //공백 체크
      if(this.item.modifyGroupName.trim() == '') {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.blankTest").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      //regex 체크
      if(this.regexTest(this.item.modifyGroupName)) {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.regexTest").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      if(!this.stateAll) {
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = '데이터셋 이름을 확인해주세요.'; 

        utils.bvModalmsgBoxOk(this, title, content, 'warning');
        return;
      }

      //이름 중복 체크
      const elements = this.item.elements;
      let sameNameDataSet: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if((this.item.dataSet.id != id) 
          && (project.name == this.item.modifyGroupName)){
          sameNameDataSet = true;
        }
      }

      if(sameNameDataSet){

        this.item.modifyGroupName = this.item.originalGroupName;
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.sameNameDataSet").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }*/

      //validation
      if(!this.dataSetName.state){
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const errorMessage = 
        this.dataSetName.text != '' ? this.dataSetName.text :this.$t('view.repo.alert.notKnow').toString();
        const res = await utils.bvModalmsgBoxOk(this, title, errorMessage, 'warning');
        if(res) return;
      }

      //이름중복체크
      if(this.originGroupName != this.item.modifyGroupName){
        const params = {
          name: this.item.modifyGroupName,
          projectId: this.projectId,
          resourceGroupId: this.resourceGroupId
        };
        let same = false;
        await this.$store.dispatch('repository/getRepoDataSaveTest', params)
        .catch((err: any) => utils.handlerError(this, err).then(() => {

          same = true;

        }));
        if(same) return;
      }
      

      const title = this.$t('view.repo.alert.title.datasetModify').toString();
      const content = this.$t('view.repo.alert.wantToEdit').toString();
      const yes = this.$t('view.repo.alert.button.modify').toString();
      const no = this.$t('view.repo.button.cancel').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');
      if(!res) return;
      const egroupId = this.item.dataSet.id;
      this.$store.dispatch('repository/getRepoDataSave', {
        datasetId: egroupId,
        datasetName: this.item.modifyGroupName,
        datasetDesc: this.item.modifyGroupDesc,
        projectId: this.projectId,
        resourceGroupId: (_.find(this.myInfo.workspaces, ['id', this.setting.common.workspace.defaultWorkspace])).iprResourceGroupId,
      }).then((res: any) => {
        this.onModifyShow();
        if(res.data.data != null){
          this.$emit('renderingDataSet');
          //데이터셋 표시 해제
          /* this.userDataSet.forEach((element: any) => {
            const uid = '#egroup-' + element.id;
            $(uid).attr('class', 'card group');
          }); */

          this.item.groupModifyShow = false;

          //this.groupModal.dataSet = null;
          //this.selectedDataSet = {};
        }
      }).catch((err: AxiosError) => {
        const errorCode = err.response.headers['x-ioc-code'];
        const title = this.$t(`view.repo.alert.title.error`).toString();
        const message = this.$t(`view.repo.alert.${errorCode}`).toString();
        utils.bvModalmsgBoxOk(this, title, message, 'error');
      });
    }
  }


  get permissionsUpdate() {
    if(Array.isArray(this.resourceGroupId)) {
      let result = false;
      forEach(this.resourceGroupId, resourceGroupId => {
        if(utils.checkPermission(this.projectId, this.groupId, resourceGroupId, 'repo.dataset', 'update'))
          result = true;
      });
      return result;
    }
    return utils.checkPermission(this.projectId, this.groupId, this.resourceGroupId, 'repo.dataset', 'update');
  }

  get groupId() {
    return this.myInfo.groupId;
  }

  get resourceGroupId() {
    const { defaultWorkspace } = this.$store.getters['sso/getSetting'].common.workspace;
    if ( defaultWorkspace == null || defaultWorkspace == 'ALL') {
      
      return this.myInfo.workspaces.map((workspace: any) => {
        if(workspace.iprResourceGroupId != undefined)
          return workspace.iprResourceGroupId;
      });
    } else {
      return this.myInfo.workspaces.find((workspace: any) => workspace.id == defaultWorkspace).iprResourceGroupId;
    }
  }

  get stateAll() {
    return this.stateFirstBlank && 
      this.stateBlank &&
      this.stateRegex &&
      this.state3Characters;
  }

  get feedback() {
    return !this.stateFirstBlank ? this.$t('view.repo.alert.firstBlankTest').toString(): 
    !this.stateBlank ? this.$t('view.repo.alert.emptyTest').toString(): 
    !this.stateRegex ? this.$t('view.repo.alert.regexTest').toString(): 
    !this.state3Characters ? this.$t('view.repo.alert.letterTest').toString(): '';
  }

  get stateFirstBlank() {
    return this.item.modifyGroupName.charAt(0) != ' ';
  }

  get stateBlank() {
    return this.item.modifyGroupName != '';
  }

  get stateRegex() {
    return !this.regexTest(this.item.modifyGroupName);
  }

  get state3Characters() {
    return this.item.modifyGroupName.length > 2;
  }

  get dataSetName() {
    // 원본 데이터 이름 : 문자,숫자,특문, 3 ~ 255, 중복체크 (중복 체크는 api 로)
    const name = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.item.modifyGroupName);
    return {
      state : name.state,
      text: name.feedback,
    }
  }
}
</script>

