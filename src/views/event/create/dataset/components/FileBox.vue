<template>
  <!-- 업로드 방식 : 파일 업로드 -->
  <div class="file-component" ref="form" @submit.prevent="createNewDataSet">
    <div class="file-content row row-content m-none">
      <div class="card upload" :class="{'active': isActive('csv')}" @click.prevent="selecteFileType('csv')" id="filetypeCsv">
        <div class="ico-flieup ico-csv" alt="csv 파일"></div>
        <div class="text-content">
          <h6 class="title">CSV</h6>
        </div>
      </div>
      <div class="card upload" :class="{'active': isActive('excel')}" @click.prevent="selecteFileType('excel')" id="filetypeExcel">
        <div class="ico-flieup ico-xlsx" alt="xlsx 파일"></div>
        <div class="text-content">
          <h6 class="title">XLSX</h6>
        </div>
      </div>

      <div class="card upload" :class="{'active': isActive('mxml')}" @click.prevent="selecteFileType('mxml')" id="filetypeMxml">
        <div class="ico-flieup ico-mxml" alt="mxml 파일"></div>
        <div class="text-content">
          <h6 class="title">MXML</h6>
        </div>
      </div>

      <div class="card upload" :class="{'active': isActive('xes')}" @click.prevent="selecteFileType('xes')" id="filetypeXes">
        <div class="ico-flieup ico-xes" alt="xes 파일"></div>
        <div class="text-content">
          <h6 class="title">XES</h6>
        </div>
      </div>
    </div>

    <!-- 파일 업로드 : 모바일 -->
    <div class="file-content m-flie">
      <b-dropdown id="mobileFlie" :text="`${$t('view.repo.label.chooseFileUpload')} : ${selectedFileType}`">
        <b-dropdown-item>
          <div class="card upload" :class="{'active': isActive('csv')}" @click.prevent="selecteFileType('csv')" id="filetypeCsv">
            <div class="ico-flieup ico-csv" alt="csv 파일"></div>
            <div class="text-content">
              <h6 class="title">CSV</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>
          <div class="card upload" :class="{'active': isActive('excel')}" @click.prevent="selecteFileType('excel')" id="filetypeExcel">
            <div class="ico-flieup ico-xlsx" alt="xlsx 파일"></div>
            <div class="text-content">
              <h6 class="title">XLSX</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="card upload" :class="{'active': isActive('mxml')}" @click.prevent="selecteFileType('mxml')" id="filetypeMxml">
            <div class="ico-flieup ico-mxml" alt="mxml 파일"></div>
            <div class="text-content">
              <h6 class="title">MXML</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="card upload" :class="{'active': isActive('xes')}" @click.prevent="selecteFileType('xes')" id="filetypeXes">
            <div class="ico-flieup ico-xes" alt="xes 파일"></div>
            <div class="text-content">
              <h6 class="title">XES</h6>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- 파일 업로드 : 모바일 -->

    <template v-if="selectedFileType != null">
      <div v-if="selectedFileType == 'csv'">
        <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2" class="file-up-content">
          <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".csv" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" @change="fileChange" :state="csvValidate"></b-form-file>
          <b-form-invalid-feedback desc="파일을 선택하세요. 파일 형식은 csv 이어야 합니다.">{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.csv')}}
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div v-if="selectedFileType == 'excel'">
        <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2" class="file-up-content">
          <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".xlsx, .xls" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" @change="fileChange" :state="xlsValidate"></b-form-file>
          <b-form-invalid-feedback desc="파일을 선택하세요. 파일 형식은 xlsx 또는 xls 이어야 합니다.">{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.xlsx')}}
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div v-if="selectedFileType == 'mxml'">
        <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2" class="file-up-content">
          <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".mxml, .mxml.gz" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" @change="fileChange" :state="mxmlValidate"></b-form-file>
          <b-form-invalid-feedback desx="파일을 선택하세요. 파일 형식은 mxml 또는 mxml.gz 이어야 합니다.">{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.mxml')}}
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div v-if="selectedFileType == 'xes'">
        <b-form-group :label="$t('view.repo.event.eventGroup.modal.fileUploadHelp', {count: fileRowTotal})" label-for="input-2" class="file-up-content">
          <b-form-file :browse-text="$t('view.repo.event.eventGroup.modal.fileSearch')" v-model="fileInfo.file" required accept=".xes, .xes.gz" :placeholder="$t('view.repo.event.eventGroup.modal.selectFile')" @change="fileChange" :state="xesValidate"></b-form-file>
          <b-form-invalid-feedback desc="파일을 선택하세요. 파일 형식은 xes 또는 xes.gz 이어야 합니다.">{{$t('view.repo.event.eventGroup.modal.fileErrorMessage.xes')}}
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      
      <div class="form-content">
        <div class="file-filter" v-if="selectedFileType == 'csv' || selectedFileType == 'excel'">
          <div class="row">
            <div class="col-6 left-content">
              <b-form-group label-cols-sm="4" label-cols-lg="3" :label="$t('view.repo.event.eventGroup.modal.rowIndex')" label-for="input-2">
                <div class="select-editable">
                  <b-form-select v-model="fileInfo.headerRowIdx" :disabled="selectedFileType == 'mxml' || selectedFileType == 'xes'">
                    <option v-for="i in 11" :value="i - 1" :key="i">{{ i - 1 }}</option>
                  </b-form-select>
                </div>
              </b-form-group>
              <div class="img-header-row-index" alt="제목 표시줄 가이드라인"></div>
            </div>
            <div class="col-6 right-content" v-if="selectedFileType == 'csv'">
              <b-form-group class="delimeter-content" label-cols-sm="4" label-cols-lg="3" :label="$t('view.repo.event.eventGroup.modal.delimeter')" label-for="input-2">
                <div class="select-editable">
                  <b-form-select v-model="delimeterDropDown" @change="delimeterDropDownChanged()" :state="fileInfo.delimeter !== '' ? null : false" :disabled="selectedFileType == 'excel'">
                    <b-form-select-option value="personalInput">{{ $t('view.repo.form.userInput') }}</b-form-select-option>
                    <b-form-select-option value=",">,</b-form-select-option>
                    <b-form-select-option value=";">;</b-form-select-option>
                    <b-form-select-option value="|">|</b-form-select-option>
                  </b-form-select>
                  <validate-input type="text" mode="create" :essential="true" class="delimeterInput" :isGroup="false"
                    v-model="fileInfo.delimeter" :placeholder="$t('view.repo.event.eventGroup.modal.delimeterPlaceHolder')"
                    :permit-special="true" minlength="1" maxlength="1"
                    @output="(arg) => { $emit('delimeter', arg); output.delimeter = arg; }"
                    @feedback="(arg) => output.feedback = arg"/>
                  <b-form-invalid-feedback v-if="!output.delimeter">{{ output.feedback }}</b-form-invalid-feedback>
                </div>
              </b-form-group>
              <div class="img-delimeter" alt="구분 문자 가이드라인"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <b-form-checkbox v-model="creatEventMXMLnXES" :value=true :unchecked-value=false>{{$t('view.repo.event.eventGroup.modal.createEvent')+' '+$t('view.repo.event.eventGroup.modal.createEventHelp')}}</b-form-checkbox>
        </div>
      </div>
    </template>
  </div>
  <!-- 업로드 방식 : 파일 업로드 -->
</template>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import $ from 'jquery';

import { UtilsMixin } from '@/mixin';
import _ from 'lodash';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    ValidateInput,
  },
  computed: {
    ...mapGetters({
      myInfo: 'sso/getMyInfo',
    })
  },
})
export default class FileBox extends Mixins(UtilsMixin) {
  @Prop({ default: () => ({}) })
  selectedFileType: string;

  fileInfo: { file: File | null; headerRowIdx: number; delimeter: string } = {
    file: null,
    headerRowIdx: 0,
    delimeter: ',',
  };

  @Watch('creatEventMXMLnXES')
  onCreatEventMXMLnXES() {
    this.$emit('setCreatEventMXMLnXES', this.creatEventMXMLnXES);
  }

  @Watch('fileInfo')
  onFileInfo() {
    this.$emit('onFileInfo', this.fileInfo);
  }

  //demo create limit of event-group and event
  fileRowTotal: number = 0;

  // 데이터셋 생성 파일 업로드
  fileType: string = '';
  fileSize: any = 0;

  creatEventMXMLnXES: boolean = true;

  //delimeterDropDown
  delimeterDropDown: string = 'personalInput';

  output: any = {
    delimeter: true,
    feedback: '',
  };

  selecteFileType(type: string) {
    this.$emit('selecteFileTypeChange', type);
    //this.selectedFileType = type;

    this.fileInfo = {
      file: null,
      headerRowIdx: 0,
      delimeter: ','
    };

    this.onFileInfo();
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

  fileChange(event: any) {
    this.$emit('fileChange', event);
  }

  isActive(type: string) {
    return this.selectedFileType == type ? 'active' : '';
  }

  delimeterDropDownChanged() {
    if(this.delimeterDropDown == 'personalInput'){
      $('.delimeterInput').removeAttr('readonly');
      //this.fileInfo.delimeter = '';
    }else{
      $('.delimeterInput').attr('readonly', 'true');
      this.fileInfo.delimeter = this.delimeterDropDown;
      this.onFileInfo();
    }
  }
}
</script>