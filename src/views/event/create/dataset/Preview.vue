<template>
  <!-- 데이터 매핑 -->
  <div class="main-common-component dataset-table-component preview-component">
    <div v-show="!showLoading">
    <div class="dataset-table-content preview-content">
      <!-- back -->
      <Back @onClick="onClickBack()" :useCustom="true"/>
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFour mode="dataset" :stage="1"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetName') }}</div>
          <div class="content-body">{{datasetCreateInfo.datasetName}}</div>
        </div>
        <!--<div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.eventName') }}</div>
          <div class="content-body">{{datasetCreateInfo.eventName}} </div>
        </div>-->
      </div>
      <!-- 정보 -->

      <!-- 테이블 -->
      <div class="table-component">
        <div class="table-content">
          <b-overlay :show="busy" no-fade bg-color="#fff" opacity="0">
            <b-table class="table line" bordered :items="items" :fields="fields" :style="{ width: tableWidth }" responsive>
              <template v-slot:thead-top="">
                <b-tr>
                  <b-th v-for="item in fields" :key="item.key">
                    <b-form-select v-model="item.mappingColumn" @change.native="selectChangeCheck($event)" @input="selectChange">
                      <template v-slot:first>
                        <b-form-select-option selected value="">{{$t('view.repo.event.mapping.doSelect')}}</b-form-select-option>

                        <b-form-select-option selected value="c">Categorical</b-form-select-option>
                        <b-form-select-option selected value="n">Numerical</b-form-select-option>
                        <b-form-select-option selected value="t">Timestamp</b-form-select-option>
                        <b-form-select-option selected value="b">Boolean</b-form-select-option>
                      </template>
                    </b-form-select>
                    <!--<ValidationObserver ref="form" tag="form" @submit.prevent="" class="no-valid">
                      <validation-provider immediate :rules="{ required: true ,regex: regexStr }" v-slot="validationContext">
                        <b-form-input class="mt-2" v-show="item.mappingColumn === 'es' || item.mappingColumn === 'ec'" v-model="item.mappingFormat" :state="getValidationState(validationContext)"></b-form-input>
                        <b-form-invalid-feedback>{{$t('view.repo.event.mapping.wrongDateFormat')}}</b-form-invalid-feedback>
                      </validation-provider>
                    </ValidationObserver>-->
                  </b-th>
                </b-tr>
              </template>
            </b-table>
          </b-overlay>
        </div>
        <!--<div class="ag-pagination btn-pagination">
          <b-pagination v-model="pageNumber" :total-rows="totalRows" :per-page="size" :hide-ellipsis="true" @input="onPageMove()" :limit="10"></b-pagination>
        </div>-->
      </div>
      <!-- 테이블 -->
    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
        <div class="btn-group">
          <b-button variant="primary" class="btn-primary" @click="onClickNext" >{{ $t('view.repo.button.next') }}</b-button>
          <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->
  </div>

    <b-overlay :show="showLoading || showOverlay" :no-wrap="true" no-fade class="overlay-flow">
      <template #overlay>
        <PreviewLoading v-show="showLoading"/>
        <PreviewFailed v-show="!showLoading && showOverlay" :errorMsg="errorMsg"/>
      </template>
    </b-overlay>

    <!--<b-overlay :show="showOverlay" :no-wrap="true" no-fade class="overlay-flow">
      <template #overlay>
        <PreviewFailed :errorMsg="errorMsg"/>
      </template>
    </b-overlay>-->

  </div>
  <!-- 데이터 매핑 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../../../../store';
import $ from 'jquery';
import { AxiosResponse } from 'axios';
import { utils, ValidationCheck } from '@/common';
import PreviewFailed from './PreviewFailed.vue';
import PreviewLoading from './PreviewLoading.vue';

import Back from '../../../components/Back.vue';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';

import { UtilsMixin } from '@/mixin';

@Component({
 components: {
   Back,
   FlowBarStepFour,
   PreviewFailed,
   PreviewLoading,
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',
   datasetCreateInfo: 'repository/getDatasetCreateInfo',
   myInfo: 'sso/getMyInfo',
 }),
})
export default class DatasetMappingSelect extends Mixins(UtilsMixin) {
  projectId!: string;
  datasetCreateInfo!: any;
  myInfo!: any;
  
  tableVisible: boolean = false;
  showTooltip: boolean = false;

  items: any = [];
  fields: any = [{"key":"c0","label":"ci","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c1","label":"ea","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c2","label":"es","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c3","label":"ec","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c4","label":"eocode","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c5","label":"companycode","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c6","label":"plantcode","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c7","label":"workinggroupcode","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"}];
  selectedOption: any = [
    { value: 'ci', text: this.$t('view.repo.event.mapping.select.caseId')+'*' },
    { value: 'ea', text: this.$t('view.repo.event.mapping.select.activity')+'*' },
    { value: 'es', text: this.$t('view.repo.event.mapping.select.startTime') },
    { value: 'ec', text: this.$t('view.repo.event.mapping.select.endTime')+'*' },
    { value: 'eo', text: this.$t('view.repo.event.mapping.select.originator') },
    { value: 'er', text: this.$t('view.repo.event.mapping.select.resource') },

    // 이벤트 비용
    { value: 'en', text: this.$t('view.repo.event.mapping.select.eventCost') },

    // 케이스 총 비용
    { value: 'cn', text: this.$t('view.repo.event.mapping.select.caseAllCost') },

    { value: 'cu', text: this.$t('view.repo.event.mapping.select.caseProperty') },
    { value: 'eu', text: this.$t('view.repo.event.mapping.select.eventProperty') },
  ];
  disabled: boolean = true;

  tableWidth: string = '100%';

  pageNumber: number = 1;
  totalPage: number = 1;
  totalRows: number = 0;
  size: number = 100;

  projectType: string = '';

  eventName: string = '';
  processName: string = '';

  regexStr: RegExp = /^[yYmMdDhHsSTZI:+,/\-"'.0123456789\s]+$/;
  busy: boolean = false;

  dataSourceId: string = '';

  showOverlay: boolean = false;
  errorMsg: string = '';
  showLoading: boolean = true;

  async created() {

/*
    //필드정보
    this.$store.dispatch('repository/getRepoDataView', {
      projectId: this.projectId, //this.datasetCreateInfo.projectId,
      datasetId: this.datasetCreateInfo.dataSetId,
    }).then((res: AxiosResponse)=>{
      //필드 정보 변화에 반응
      const fields: any[] = [];
      for (const [key, value] of Object.entries(res.data.data.fields)) {
        fields.push({
          key: key,
          label: value,
          sortable: true,
          mappingColumn: '',
          mappingFormat: 'yyyy-MM-dd HH:mm:ss', //'yyyy/MM/dd HH:mm:ss', //'YYYY/MM/DD HH24:MI:SS',
        });
      }

      this.fields = fields;
      this.getTableWidth();
      this.tableVisible = true;
    });

    //데이터내용
    this.getRepoDataViewData();

    const eventInfo = store.getters['repository/getEventInfo'];

    this.eventName = eventInfo.eventName;
    this.processName = eventInfo.processName;

  */  

    const uploadDataId = store.getters['repository/getUploadDataId'];

    let errorOccured = false;
    let errorCode = '';
    if(JSON.stringify(uploadDataId) != '{}'){
      //file
        await this.$store.dispatch('repository/getDataImportFilePreviewLite', {
          projectId: this.projectId,
          datasetName: this.datasetCreateInfo.datasetName,
          datasetDesc: this.datasetCreateInfo.datasetDesc,
          fileName: uploadDataId,
          delimeter: this.datasetCreateInfo.delimeter,
          headerRowIdx: this.datasetCreateInfo.headerRowIdx,
          filetype: this.datasetCreateInfo.selectedFileType == 'excel' ? 'xlsx' : this.datasetCreateInfo.selectedFileType,
          filetypeUppercase: this.toUpperCase(this.datasetCreateInfo.selectedFileType == 'excel' ? 'xlsx' : this.datasetCreateInfo.selectedFileType)
        }).then((res: any)=>{

          if(res==undefined) {
            errorOccured = true;
            errorCode = 'IPR_OK_204_00010101';
            return;
          }

          const fields: any[] = [];
          for (const [key, value] of Object.entries(res.fields)) {
            fields.push({
              key: key,
              label: value,
              sortable: true,
              mappingColumn: '',
              mappingFormat: 'yyyy-MM-dd HH:mm:ss', //'yyyy/MM/dd HH:mm:ss', //'YYYY/MM/DD HH24:MI:SS',
            });
          }

          this.fields = fields;
          this.getTableWidth();
          this.tableVisible = true;

          this.busy = false;
          //데이터 내용 변화에 반응
          const data = res.data;
          const keys = Object.keys(data);
          const items: any = [];
          keys.forEach((key: any) => {
            const item = data[key];
            items.push(item);
          })

          //this.totalRows = data.totalElements;
          //this.totalPage = data.totalPages;

          this.items = items;
        })
        .catch((err: any) => {

          errorOccured = true;
          
          if(err.response != undefined) {
            const header = err.response.headers;
            errorCode = header['x-ioc-code'];
          }else{
            errorCode = this.$t('view.repo.alert.unknownError').toString();
          }
          
        });

    }else{
      //db
        const dbtypeText = this.datasetCreateInfo.selectedDatabaseType
        const dbtype: any = dbtypeText == 'postgresql' || dbtypeText == 'postgres' ? 'psql' : dbtypeText;
        const { id, hostname, port, username, password, database, schema, table, entity } = JSON.parse(this.datasetCreateInfo.jdbcInfo);

        this.dataSourceId = id;
        await this.$store.dispatch('repository/getDataImportDBPreviewLite', {

          hostname: hostname,
          port: String(port),
          username: username,
          password: password,
          database: database,
          schema: schema,
          entity: entity,

          table: table, 
          
          projectId: this.projectId,
          datasetName: this.datasetCreateInfo.datasetName,
          resourceGroup: this.workspaceResourceGroupId,

          //clientState: this.datasetCreateInfo.clientState,

          dbtype: dbtype,
          dbtypeUppercase: this.toUpperCase(dbtype),

          datasourceId: id,
        }).then((res: any)=>{

          if(res==undefined) {
            errorOccured = true;
            errorCode = 'IPR_OK_204_00010101';
            return;
          }

          const fields: any[] = [];
          for (const [key, value] of Object.entries(res.data.data.fields)) {
            fields.push({
              key: key,
              label: value,
              sortable: true,
              mappingColumn: '',
              mappingFormat: 'yyyy-MM-dd HH:mm:ss', //'yyyy/MM/dd HH:mm:ss', //'YYYY/MM/DD HH24:MI:SS',
            });
          }

          this.fields = fields;
          this.getTableWidth();
          this.tableVisible = true;

          this.busy = false;
          //데이터 내용 변화에 반응
          const data = res.data.data.data;
          const keys = Object.keys(data);
          const items: any = [];
          keys.forEach((key: any) => {
            const item = data[key];
            items.push(item);
          });

          //this.totalRows = data.totalElements;
          //this.totalPage = data.totalPages;

          this.items = items;
        })
        .catch((err: any) => {

          errorOccured = true;

          if(err.response != undefined) {
            const header = err.response.headers;
            errorCode = header['x-ioc-code'];
          }else{
            errorCode = this.$t('view.repo.alert.unknownError').toString();
          }

          
        });

    }

    
    this.showLoading = false;
    if(errorOccured) {
        //const title = this.$t('view.repo.alert.title.alarm').toString();
        //const content = this.$t('view.repo.alert.' + errorCode).toString();
        //await utils.bvModalmsgBoxOk(this, title, content, 'error');
        //this.onClickBack();

        this.errorMsg = errorCode;
        this.showOverlay = true;
    }    

    
    //데이터내용
    //this.getRepoDataViewData();

    //const eventInfo = store.getters['repository/getEventInfo'];

    //this.eventName = eventInfo.eventName;
    //this.processName = eventInfo.processName;
    
  }

  get workspaceName() {
    if (this.$route.params.workspaceName != undefined) {
      return this.$route.params.workspaceName;
    } else {
      return JSON.parse(this.datasetCreateInfo.clientState).datasetImporting.workspaceName;
    }
  }
  
  get workspaceResourceGroupId() {
    return (this.myInfo.workspaces.find((workspace: { name: string }) => workspace.name == this.workspaceName)).iprResourceGroupId;
  }

  toUpperCase(arg: string) { // css -> Css
    return arg == null ? '' : arg.charAt(0).toUpperCase() + arg.slice(1);
  }

  mounted() {
    this.getTableWidth();
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getTableWidth);
  }

  /* 메소드 선언 */

  //데이터 정보 가져오기
  //getRepositoryData()
  getRepoDataViewData() {
    this.busy = true;
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.projectId,//this.datasetCreateInfo.projectId,
      datasetId: this.datasetCreateInfo.dataSetId,
      page: this.pageNumber - 1,
      size: this.size,
    }).then((res: AxiosResponse) =>{
      this.busy = false;
      //데이터 내용 변화에 반응
      const data = res.data.data
      const keys = Object.keys(data.results);
      const items: any = [];
      keys.forEach((key: any) => {
        const item = data.results[key];
        items.push(item);
      });

      this.totalRows = data.totalElements;
      this.totalPage = data.totalPages;

      this.items = items;
    });
  }

  selectChangeCheck(event: any) {
		//select 에서 선택 못하도록 하는 기능
    if(event.target.value === 'es') {
      const oldValue = event.target.dataset['old_value'];
      if(oldValue === 'ec') {
				$('select').not(event.target).find('option[value=' + oldValue + ']').removeAttr('disabled');
			}
			event.target.dataset["old_value"] = event.target.value;
			$('select').not(event.target).find('option[value=' + event.target.value + ']').attr('disabled', 'disabled');

		} else if(event.target.value === 'ec') {
      const oldValue = event.target.dataset['old_value'];
      if(oldValue === 'es') {
				$('select').not(event.target).find('option[value=' + oldValue + ']').removeAttr('disabled');
			}
			event.target.dataset["old_value"] = event.target.value;
			$('select').not(event.target).find('option[value=' + event.target.value + ']').attr('disabled', 'disabled');

		} else {
			const oldValue = event.target.dataset['old_value'];
			if(oldValue === 'es' || oldValue === 'ec') {
				$('select').not(event.target).find('option[value=' + oldValue + ']').removeAttr('disabled');
			}

			event.target.dataset['old_value'] = '';
		}
		
    const index: number = $('select').index(event.target);
    if (event.target.value) {
      this.fields[index].variant = 'secondary';
    } else {
      this.fields[index].variant = '';
    }
  }

  selectChange() {
    let caseIdCount: number = 0;
    let activityCount: number = 0;
    let timestampCount: number = 0;
    this.fields.forEach((item: any) => {
      if (item.mappingColumn === 'ci') {
        caseIdCount++;
      } else if (item.mappingColumn === 'ea') {
        activityCount++;
      } else if (item.mappingColumn === 'ec') {
        timestampCount++;
      } 
    });
    
    if (caseIdCount > 0 && activityCount > 0 && timestampCount > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  onClickNext() {
    
    const fieldsToImport: any = {};
    this.fields.forEach((item: any) => {

      if(item.mappingColumn != ''){
        fieldsToImport[item.key] = item.mappingColumn;
      }
    });

    this.$store.commit('repository/setFieldsToImport', fieldsToImport);
    this.$store.commit('repository/setDatasourceId', this.dataSourceId);


   this.$router.push({
      name: 'DatasetDataImporting',
      //params: {
      //  uploadDataId: this.$route.params.uploadDataId
      //}
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

  /*onPageMove() {
    this.getRepoDataViewData();
  }*/

  numberWithCommas(x: number | string): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  /*back() {
    //const projectId = this.datasetCreateInfo.projectId;
    const datasetId = this.datasetCreateInfo.dataSetId;
    this.$router.push({
      name: 'eventList',
    });

  }*/

  getValidationState({ dirty, validated, valid = null }: any) {
    return dirty || validated ? valid : null;
  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'DatasetCreateForm',
      params: {
        notShowOverlay: 'true'
      }
    });
  }
}
</script>