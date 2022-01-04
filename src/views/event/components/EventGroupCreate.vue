<template>
  <div class="animated fadeIn">
  <ValidationObserver ref="form" tag="form" @submit.prevent="createNewDataSet">
    <div class="content-body">
      <div class="form-content">
        <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventGroup.modal.groupName')">
          <b-input-group> 
            <b-form-input :value="groupName" @input.native="groupName = $event.target.value" v-model="groupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" :state="getValidationState(groupName)"></b-form-input>
            <b-form-invalid-feedback>
              <span v-if="haveSameNameEG()">{{$t("view.repo.alert.sameNameDataSet")}}</span>
              <span v-if="groupName != '' && regexTest()">{{$t("view.repo.alert.regexTest")}}</span>
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label-cols-lg="2" :label="$t('view.repo.event.eventGroup.modal.groupDesc')">
          <b-form-textarea v-model="groupDesc" :placeholder="$t('view.repo.event.eventGroup.modal.groupDescPlaceHolder')"></b-form-textarea>
        </b-form-group>
      </div>

      <div class="file-component">
        <div class="file-content">
          <div class="content-header"><h4 class="title">{{$t('view.repo.event.eventGroup.modal.fileUpload')}}</h4></div>
            <div class="content-body">

              <b-row class="file-selected">
                <b-col cols="3">
                  <div class="card file" @click.prevent="goFileUploadViewCSV" id="filetypeCsv">
                    <div class="img-excel" alt="img_csv"></div>
                    <div class="text-content">
                      <h4>CSV</h4>
                      <small>{{$t('view.repo.event.eventGroup.modal.upload')}}</small>
                    </div>
                  </div>
                </b-col>

                <b-col cols="3">
                  <div class="card file" @click.prevent="goFileUploadViewExcel" id="filetypeExcel">
                    <div class="img-excel" alt="img_XLSX"></div>
                    <div class="text-content">
                      <h4>XLSX</h4>
                      <small>{{$t('view.repo.event.eventGroup.modal.upload')}}</small>
                    </div>
                  </div>
                </b-col>

                <b-col cols="3">
                  <div class="card file" @click.prevent="goFileUploadViewMxml" id="filetypeMxml">
                    <div class="img-mxml" alt="img_MXML"></div>
                    <div class="text-content">
                      <h4>MXML</h4>
                      <small>{{$t('view.repo.event.eventGroup.modal.upload')}}</small>
                    </div>
                  </div>
                </b-col>

                <b-col cols="3">
                  <div class="card file" @click.prevent="goFileUploadViewXes" id="filetypeXes">
                    <div class="img-xes" alt="img_XES"></div>
                    <div class="text-content">
                      <h4>XES</h4>
                      <small>{{$t('view.repo.event.eventGroup.modal.upload')}}</small>
                    </div>
                  </div>
                </b-col>
              </b-row>
                            
            </div>
          </div>
        </div>

        <div class="file-stting-content" v-show="fileInputShow">

          <div class="form-content">
                            
            <div v-if="selectedFileType == 'csv'">
              <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2">
                <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".csv" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" :state="csvValidate" v-on:change="fileSelect"></b-form-file>
                <b-form-invalid-feedback>{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.csv')}}<!--파일을 선택하세요. 파일 형식은 csv 이어야 합니다.-->
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

            <div v-if="selectedFileType == 'excel'"> <!--ext check-->
              <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2">
                <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".xlsx, .xls" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" :state="xlsValidate" v-on:change="fileSelect"></b-form-file>
                <b-form-invalid-feedback>{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.xlsx')}}<!--파일을 선택하세요. 파일 형식은 xlsx 또는 xls 이어야 합니다.-->
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

            <div v-if="selectedFileType == 'mxml'">
              <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2">
                <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".mxml, .mxml.gz" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" :state="mxmlValidate" v-on:change="fileSelect"></b-form-file>
                <b-form-invalid-feedback>{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.mxml')}}<!--파일을 선택하세요. 파일 형식은 mxml 또는 mxml.gz 이어야 합니다.-->
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

            <div v-if="selectedFileType == 'xes'">
              <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2">
                <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".xes, .xes.gz" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" :state="xesValidate" v-on:change="fileSelect"></b-form-file>
                <b-form-invalid-feedback>{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.xes')}}<!--파일을 선택하세요. 파일 형식은 xes 또는 xes.gz 이어야 합니다.-->
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

          </div>
          <!--<div v-if="selectedFileType == 'excel' || selectedFileType == 'mxml' || selectedFileType == 'xes'">-->
                
          <div v-if="selectedFileType == 'csv' || selectedFileType == 'excel'">
          <b-row>
            <b-col cols="6" class="left-content">
              <b-form-group label-cols-sm="4" label-cols-lg="3" :label="$t('view.repo.event.eventGroup.modal.rowIndex')" label-for="input-2">
                <div class="select-editable">
                  <b-form-select v-model="fileInfo.headerRowIdx" :disabled="selectedFileType == 'mxml' || selectedFileType == 'xes'">
                    <option v-for="i in 11" :value="i - 1" :key="i">{{ i - 1 }}</option>
                  </b-form-select>
                </div>
              </b-form-group>
              <div class="img-header-row-index" alt="제목 표시줄 가이드라인"></div>
            </b-col>
            <b-col cols="6" class="right-content">
                <b-form-group class="delimeter-content" label-cols-sm="4" label-cols-lg="3" :label="$t('view.repo.event.eventGroup.modal.delimeter')" label-for="input-2">
                  <b-form-select v-model="delimeterDropDown" @change="delimeterDropDownChanged()" :state="fileInfo.delimeter !== '' ? null : false" :disabled="selectedFileType == 'excel'">
                    <b-form-select-option value="personalInput">{{ $t('view.repo.form.userInput') }}</b-form-select-option>
                    <b-form-select-option value=",">,</b-form-select-option>
                    <b-form-select-option value=";">;</b-form-select-option>
                    <b-form-select-option value="|">|</b-form-select-option>
                  </b-form-select>
                  <b-form-input class="delimeterInput" v-model="fileInfo.delimeter" required :placeholder="$t('view.repo.event.eventGroup.modal.delimeterPlaceHolder')" autocomplete="off" :state="delimeterValidate"></b-form-input>
                </b-form-group>
              <div class="img-delimeter" alt="구분 문자 가이드라인"></div>
            </b-col>
          </b-row>
          </div>
          <div v-else>
            <b-form-checkbox v-model="creatEventMXMLnXES" :value=true :unchecked-value=false>{{$t('view.repo.event.eventGroup.modal.createEvent')+' '+$t('view.repo.event.eventGroup.modal.createEventHelp')}}</b-form-checkbox>
          </div>
        </div>
        <div class="btn-footer-broup">
          <b-button type="submit" variant="primary" :disabled="checkRegex()|| !checkFileExtension() || ((fileObj == null||fileObj==undefined) ? false : fileObj.type!=fileType) || ((selectedFileType == 'csv') && (fileInfo.delimeter==''))">
            <template v-if="loading == false">{{ $t('view.repo.button.ok') }}</template>
            <template v-else><b-spinner label="Spinning"></b-spinner></template>
          </b-button>
          <b-button type="button" @click="closeGroupCreateShow()">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
  </ValidationObserver>

  <!-- 생성 완료 modal -->
  <b-modal v-model="groupCreateCompleteShow" :title="$t('view.repo.event.eventGroup.modal.completeModal.title')" @hide ="onHide" centered hide-footer>
    <div class="content-body group-success">
      <p class="text-center">{{$t('view.repo.event.eventGroup.modal.completeModal.msg1')}}<!--파일 업로드 성공하였습니다.--></p>
      <p class="text-center">'{{groupName}}'{{$t('view.repo.event.eventGroup.modal.completeModal.msg2')}}<!--이 생성 되었습니다.--></p>

      <div class="btn-footer-broup"> 
        <b-button variant="primary" @click="groupCreateCompleteShow=false;closeGroupCreateShow();" >{{$t('view.repo.event.eventGroup.modal.completeModal.complete')}}</b-button>
        <b-button variant="outline-primary" @click="groupCreateCompleteShow=false;closeGroupCreateShow();whenCreateEvent()">{{$t('view.repo.event.eventGroup.modal.completeModal.createEvent')}}</b-button>
      </div>
    </div>
  </b-modal>
  <!-- 생성 완료 modal -->
  </div>
</template>

<style>
/*.nogreenborder:valid {
  border: 1px solid #CECECE !important;
  background: #FFFFFF;
}*/
</style>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import $ from 'jquery';

import axios from 'axios';
import { AxiosError } from 'axios';
import { EventBus, utils } from '@/common';
import Loading from '../../../components/Loading.vue';
import _ from 'lodash';

import { UtilsMixin } from '@/mixin';

@Component({
  computed: mapGetters({
    //repoEventView: 'repository/getRepoEventView',
    projectId: 'sso/getProjectId',
    myInfo: 'sso/getMyInfo',
    //repoDataIndex: 'repository/getRepoDataIndex',
  }),
})
export default class DataSetCreate extends Mixins(UtilsMixin) {

  //repoEventView!: any;
  projectId!: any;
  myInfo!: any;

  @Prop()
  repoDataIndex!: any;

  // 내 원본 데이터 목록, 갯수
  //userDataSet: any;
  //dataSetCount: number;

  // 내 이벤트 목록, 갯수
  //userEvent: any;
  //eventCount: number;

  // 원본 데이터 생성 modal 표시
  groupCreateShow: boolean = false; 
  // 원본 데이터 생성 그룹 이름, 설명
  groupName: string = '';
  groupDesc: string = '';

  //원본 데이터 생성에서 파일 정보 입력 표시
  fileInputShow: boolean = false;

  // 원본 데이터 생성 파일 업로드
  fileType: string = '';
  fileInfo: { file: File | null; headerRowIdx: number; delimeter: string } = {
    file: null,
    headerRowIdx: 0,
    delimeter: ',',
  };
  fileObj: File = null;

  //원본 데이터 생성 완료 창
  groupCreateCompleteShow: boolean = false;

  // 선택한 원본 데이터 정보
  selectedDataSet: any = null;

  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };

  //demo create limit of event-group and event
  dataSetCreateLimit: number = 0;
  eventCreateLimit: number = 0;
  eventCreateTotalLimit: number = 0;
  fileRowTotal: number = 0;

  fileSize: any = 0;

  selectedFileType: string = '';

  delimeterDropDown: string = 'personalInput';

  creatEventMXMLnXES: boolean = true;

  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;

  loading: boolean = false;

  createdEGroupId: any = null;

  constructor() {
    super();
  }

  mounted() {
    this.$emit('clickCreateEGroup');

    const metadata = JSON.parse(this.myInfo.metadata);
    this.dataSetCreateLimit = metadata.limitations.dataset.total;
    this.eventCreateLimit = metadata.limitations.dataset.eventRepositoryTotal;
    this.eventCreateTotalLimit = metadata.limitations.eventRepository.total;
    this.fileRowTotal = metadata.limitations.dataset.rowTotal;
  }

  checkFileExtension() {
    if(this.fileObj == null || this.fileObj == undefined) return true;

    let extension: string[] | string = this.fileObj.name.split('.');
    const extension2 = extension[extension.length-2]
    extension = extension[extension.length-1];
    switch(this.selectedFileType) {
      case 'csv':
        return (extension == 'csv');
      case 'excel'://xlsx|xls
        return (extension == 'xlsx' || extension == 'xls')
      case 'mxml'://mxml|mxml.gz
        return (extension == 'mxml' || extension2+'.'+extension == 'mxml.gz')
      case 'xes'://xes|xes.gz
        return (extension == 'xes' || extension2+'.'+extension == 'xes.gz')
    }
  }

  getValidationStateName({ dirty, validated, valid = null }: any) {
    if(this.haveSameNameEG()){
      return false;
    }else{
      return dirty || validated ? valid : null;
    }
    
  }

  haveSameNameEG() {
    const elements = this.repoDataIndex.elements;
    let sameNameDataSet: boolean = false;
		for(const id in elements){
			const project = elements[id];
			if(project.name == this.groupName && (this.createdEGroupId != id)){
				sameNameDataSet = true;
			}
		}
    return sameNameDataSet;
  }

  regexTest() {
    const regex = new RegExp(this.regEx);
    return !regex.test(this.groupName); //정규표현식 일치 안할 때 true 리턴
  }

  // 내 원본 데이터 생성(생성 창 확인 버튼)
  createNewDataSet() {

    //공백 체크
		if(this.groupName.trim() == '') {
			const title = this.$t("view.repo.alert.title.alarm").toString();
			const content = this.$t("view.repo.alert.blankTest").toString();

			utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
			return;
		}


    this.loading = true;
    //regex 체크
    if(this.regexTest()) {
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.regexTest").toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
      this.loading = false;
      return;
    }

    

    //이름 중복 체크
    const elements = this.repoDataIndex.elements;
    let sameNameDataSet: boolean = false;
		for(const id in elements){
			const project = elements[id];
			if(project.name == this.groupName){
				sameNameDataSet = true;
			}
		}

    if(sameNameDataSet){

			const title = this.$t("view.repo.alert.title.alarm").toString();
			const content = this.$t("view.repo.alert.sameNameDataSet").toString();

			utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
      this.loading = false;
			return;
		}

    

    //파일 선택 체크
    if(this.fileObj == null || this.fileObj == undefined){

      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.selectFile").toString();
      utils.bvModalmsgBoxOk(this, title, content, 'complete');
      this.loading = false;
      return;
    }

    //파일 건수 체크
    if(this.fileSize > this.fileRowTotal){

      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.fileSizeCheck", {count: this.fileRowTotal}).toString();
      utils.bvModalmsgBoxOk(this, title, content, 'complete');
      this.loading = false;
      return;
    }

    if(this.delimeterDropDown != 'personalInput'){
      this.fileInfo.delimeter = this.delimeterDropDown;
    }

    //원본 데이터 생성
    const params = {
        datasetName: this.groupName,
        datasetDesc: this.groupDesc,
        projectId:  this.projectId,
        ...this.fileInfo,
        mapToEventRepository: true,
    };

    if(this.selectedFileType == 'csv'){
      //CSV 파일형식

      this.$store.dispatch('repository/getRepoDataImportFileCSVLite', params).then((res: any) => {
        if(res.data.data != null){
          const fields = Object.keys(res.data.data.fields);
          if(fields.length < 3){

            const title = this.$t("view.repo.alert.title.alarm").toString();
            const content = this.$t("view.repo.alert.groupCreateCheck").toString();
            utils.bvModalmsgBoxOk(this, title, content, 'complete');

            this.$store.dispatch('repository/getRepoDataDelete', [ {
              "_type" : "DatasetSelectConfiguration",
              "selectors" : [ {
                "id" : res.data.data.id,//"ids20210331095614",
                "_type" : "Dataset",
                "project" : {
                  "id" : this.projectId, //"ipr20210331095614",
                  "_type" : "Project"
                }
              } ],
              "page" : 0,
              "size" : 100
            } ]);
            this.loading = false;
          }else{
            //this.setDataSetCards();
            this.$emit('setDataSetCards');
            //this.selectedDataSet = res.data.data;
            //this.$emit('setSelectedDataSet', res.data.data);

            this.$store.commit('repository/setGroupInfo', res.data.data);

            this.createdEGroupId = res.data.data.id;
            this.loading = false;
            this.groupCreateCompleteShow = true;
          }
        }
      }).catch((err: AxiosError) => {

        const code = err.response.headers["x-ioc-code"];
        const message = err.response.headers["x-ioc-message"];

        if (code == 'IPR_ERR_403_01900201') { //check?

            const title = this.$t("view.repo.alert.title.cantCreateTitle").toString();
            const content = this.$t("view.repo.alert.IPR_ERR_403_01900201").toString();

            utils.bvModalmsgBoxOk(this, title, content, 'error');
            this.loading = false;
        }
      });

    }else if(this.selectedFileType == 'excel'){
      // XLXS 파일형식
      this.$store.dispatch('repository/getRepoDataImportFileXlsxLite', params).then((res: any) => {
        if(res.data.data != null){
          const fields = Object.keys(res.data.data.fields);
          if(fields.length < 3){
            
            const title = this.$t("view.repo.alert.title.alarm").toString();
            const content = this.$t("view.repo.alert.groupCreateCheck").toString();
            utils.bvModalmsgBoxOk(this, title, content, 'complete');

            this.$store.dispatch('repository/getRepoDataDelete', [ {
              "_type" : "DatasetSelectConfiguration",
              "selectors" : [ {
                "id" : res.data.data.id,//"ids20210331095614",
                "_type" : "Dataset",
                "project" : {
                  "id" : this.projectId, //"ipr20210331095614",
                  "_type" : "Project"
                }
              } ],
              "page" : 0,
              "size" : 100
            } ]);
            this.loading = false;
          }else{
            //this.setDataSetCards();
            this.$emit('setDataSetCards');
            //this.selectedDataSet = res.data.data;
            //this.$emit('setSelectedDataSet', res.data.data);

            this.$store.commit('repository/setGroupInfo', res.data.data);

            this.createdEGroupId = res.data.data.id;
            this.loading = false;
            this.groupCreateCompleteShow = true;
          }
        }
      }).catch((err: AxiosError) => {

        const code = err.response.headers["x-ioc-code"];
        const message = err.response.headers["x-ioc-message"];

        if (code == 'IPR_ERR_403_01900201') {

            const title = this.$t("view.repo.alert.title.cantCreateTitle").toString();
            const content = this.$t("view.repo.alert.IPR_ERR_403_01900201").toString();

            utils.bvModalmsgBoxOk(this, title, content, 'error');
            this.loading = false;
        }
      });
    }else if(this.selectedFileType == 'mxml' || this.selectedFileType == 'xes'){

      params.mapToEventRepository = this.creatEventMXMLnXES;
      
      // MXML, MXML.GZ, XES, XES.GZ
      this.$store.dispatch('repository/getRepoDataImportFileXesLite', params).then((res: any) => {
        if(res.data.data != null){
          const fields = Object.keys(res.data.data.fields);
          if(fields.length < 3){
            
            const title = this.$t("view.repo.alert.title.alarm").toString();
            const content = this.$t("view.repo.alert.groupCreateCheck").toString();
            utils.bvModalmsgBoxOk(this, title, content, 'complete');

            this.$store.dispatch('repository/getRepoDataDelete', [ {
              "_type" : "DatasetSelectConfiguration",
              "selectors" : [ {
                "id" : res.data.data.id,//"ids20210331095614",
                "_type" : "Dataset",
                "project" : {
                  "id" : this.projectId, //"ipr20210331095614",
                  "_type" : "Project"
                }
              } ],
              "page" : 0,
              "size" : 100
            } ]);
            this.loading = false;
          }else{
            //this.setDataSetCards();
            this.$emit('setDataSetCards');
            //this.selectedDataSet = res.data.data;
            //this.$emit('setSelectedDataSet', res.data.data);

            this.$store.commit('repository/setGroupInfo', res.data.data);
            
            this.createdEGroupId = res.data.data.id;
            this.loading = false;
            this.groupCreateCompleteShow = true;
          }
        }
      }).catch((err: AxiosError) => {

        const code = err.response.headers["x-ioc-code"];
        const message = err.response.headers["x-ioc-message"];

        if (code == 'IPR_ERR_403_01900201') {

            const title = this.$t("view.repo.alert.title.cantCreateTitle").toString();
            const content = this.$t("view.repo.alert.IPR_ERR_403_01900201").toString();

            utils.bvModalmsgBoxOk(this, title, content, 'error');
            this.loading = false;
        }
      });
    }
  }
 
  // 파일 업로드 CSV
  goFileUploadViewCSV() {

    this.selectedFileType = 'csv';

    // CSV 패널 및 나머지 색상 변화
    $('#filetypeCsv').attr('class', "card file active")
    $('#filetypeExcel').attr('class', "card file")
    $('#filetypeMxml').attr('class', "card file")
    $('#filetypeXes').attr('class', "card file")

    // file setting
    //this.fileType = 'application/vnd.ms-excel';
    this.fileInfo = {
      file: null,
      headerRowIdx: 0,
      delimeter: ',',
    };

    //$('#fileDelimeter').removeAttr("disabled");

    this.fileInputShow = true;
  }


  //파일 업로드 Excel
  goFileUploadViewExcel() {

    this.selectedFileType = 'excel';

    // XLXS 패널 및 나머지 색상 변화
    $('#filetypeCsv').attr('class', "card file")
    $('#filetypeExcel').attr('class', "card file active")
    $('#filetypeMxml').attr('class', "card file")
    $('#filetypeXes').attr('class', "card file")

    // file setting
    //this.fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    this.fileInfo = {
      file: null,
      headerRowIdx: 0,
      delimeter: ',',
    };

    //$('#fileDelimeter').attr('disabled', "true");

    this.fileInputShow = true;
  }

  //파일 업로드 MXML
  goFileUploadViewMxml() {

    this.selectedFileType = 'mxml';

    // XLXS 패널 및 나머지 색상 변화
    $('#filetypeCsv').attr('class', "card file")
    $('#filetypeExcel').attr('class', "card file")
    $('#filetypeMxml').attr('class', "card file active")
    $('#filetypeXes').attr('class', "card file")

    // file setting
    //this.fileType = 'application/xv+xml';
    this.fileInfo = {
      file: null,
      headerRowIdx: 0,
      delimeter: ',',
    };

    //$('#fileDelimeter').attr('disabled', "true");

    this.fileInputShow = true;
  }

  //파일 업로드 XES
  goFileUploadViewXes() {

    this.selectedFileType = 'xes';

    // XLXS 패널 및 나머지 색상 변화
    $('#filetypeCsv').attr('class', "card file")
    $('#filetypeExcel').attr('class', "card file")
    $('#filetypeMxml').attr('class', "card file")
    $('#filetypeXes').attr('class', "card file active")

    // file setting
    //this.fileType = 'application/x-gzip';
    this.fileInfo = {
      file: null,
      headerRowIdx: 0,
      delimeter: ','
    };

    //$('#fileDelimeter').attr('disabled', "true");

    this.fileInputShow = true;
  }

  fileSelect(event: any) {

    this.fileObj = event.target.files[0];
    if(this.fileObj == null || this.fileObj == undefined) {
      this.fileType = null;
      return;
    }

    this.fileType = event.target.files[0].type;

    const reader = new FileReader();
    reader.readAsText(this.fileObj);
    reader.onload = ((e) => {
      const length = e.target.result.toString().split('\n').length;
      this.fileSize = length - 2;
    });   
  }

  closeGroupCreateShow() {
    this.$emit('closeGroupCreateShow');
  }

  whenCreateEvent() {
    this.$emit('whenCreateEvent');
  }

  onHide(evt: any) { 
    if(evt.trigger === "backdrop"){ 
      evt.preventDefault(); 
    } 
  }

  checkRegex() {
    const myRe = RegExp(/[^?^\\]/);
    const matches = myRe.exec(this.fileInfo.delimeter);
    return !matches;
  }

  delimeterDropDownChanged() {
    if(this.delimeterDropDown == 'personalInput'){
      $('.delimeterInput').removeAttr('readonly');
      this.fileInfo.delimeter = '';
    }else{
      $('.delimeterInput').attr('readonly', 'true');
      this.fileInfo.delimeter = this.delimeterDropDown;
      
    }

    
    
  }

  required(val: any) { // 필수 값
    return val != '';
  }

  max(val: string, max: number) { // 자릿수
    return val.length <= max;
  }

  regex(val: string, reg: any) { // 정규식
    return reg.test(val);
  }

  ext(val: any, exts: string) { // 포함 여부
    const arr: any = exts.split('|');
    const result = arr.find((ext: any) => {
      return val.includes(ext);
    });
    return result != null;
  }

  get csvValidate() {
    return this.fileInfo.file == undefined ? false : this.required(this.fileInfo.file) &&
                                                    this.ext(this.fileInfo.file.name, 'csv');
  }

  get xlsValidate() {
    return this.fileInfo.file == undefined ? false : this.required(this.fileInfo.file) &&
                                                    this.ext(this.fileInfo.file.name, 'xlsx|xls');
  }

  get mxmlValidate() {
    return this.fileInfo.file == undefined ? false : this.required(this.fileInfo.file) &&
                                                    this.ext(this.fileInfo.file.name, 'mxml|mxml.gz');
  }

  get xesValidate() {
    return this.fileInfo.file == undefined ? false : this.required(this.fileInfo.file) &&
                                                    this.ext(this.fileInfo.file.name, 'xes|xes.gz');
  }

  get delimeterValidate() {
    const { delimeter } = this.fileInfo;
    return this.required(delimeter) &&
          this.max(delimeter, 4) &&
          this.regex(delimeter, /[^?^\\]/);
  }

  getValidationState(arg: any) {
    return this.required(arg) &&
            this.regex(arg, this.regEx);
  }
}
</script>
