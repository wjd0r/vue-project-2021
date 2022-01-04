<template>
  <!-- 데이터 필터 설정 -->
  <!--<div class="main-common-component dataset-table-component dataset-filter-component">
    <div class="dataset-table-content dataser-filter-content">-->
  <div class="main-common-component dataset-table-component dataset-filter-component mapping-component" :class="`lang-${$i18n.locale}`">
    <div class="dataset-table-content dataser-filter-content mapping-content">
      <!-- back -->
      <Back @onClick="onClickBack()" :useCustom="true"/>
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFourFilter mode="dataset" :stage="2"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.subDatasetCreateForm.subDatasetName') }}</div>
          <div class="content-body">{{subDatasetCreateInfo.dataSetName}}</div>
        </div>
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetRowNum') }}</div>
          <div class="content-body">{{totalRows}}</div>
        </div>
      </div>
      <!-- 정보 -->

      <!-- 테이블 -->
      <div class="table-component">
        <div class="table-content">
          <b-overlay :show="busy" no-fade bg-color="#fff" opacity="0">
          <b-table class="table line" bordered :items="items" :fields="fields" v-show="tableVisible" :style="{ width: tableWidth }" responsive>
            <!--<template #table-busy>
              <div class="text-center my-2">
                <b-spinner class="align-middle"/>
              </div>
            </template>-->
            <template v-slot:thead-top="">
              <b-tr>
                <b-th v-for="(item) in fields" :key="item.key"><!--v-model="checkedOptions[item.key]"-->
                  <!-- <Multiselect :selectes="selectes[index].selected" /> --><!-- :selectes="selectOptions[item.key]" -->
                  <Multiselect :skey="item.key" v-show="item.key[0] == 'c' || item.key[0] == 'b'" @onClickApplied="getCBselect"/> <!--selectedOption(item.key,index)--><!--"selectOption(item.key)"-->

                  <!--numeric multiselect-->
                  <template v-if="item.key[0] == 'n'">
                    <b-form-select style="width: 50%; float: left; " v-model="checkedOptions[item.key][0]">
                      <b-form-select-option selected value="Equals">Equals</b-form-select-option>
                      <b-form-select-option value="Not Equals">Not Equals</b-form-select-option>
                      <b-form-select-option value="Greater than">Greater than</b-form-select-option>
                      <b-form-select-option value="Greater than equals">Greater than equals</b-form-select-option>
                      <b-form-select-option value="Less than">Less than</b-form-select-option>
                      <b-form-select-option value="Less than equals">Less than equals</b-form-select-option>
                      <!--<b-form-select-option selected value="">Between</b-form-select-option>-->
                    </b-form-select>
                    <b-form-input style="width: 50%; float: left; " type="number" v-model="checkedOptions[item.key][1]"></b-form-input>
                  </template>
                  <!---->

                  

                  <!--<ValidationObserver ref="form" tag="form" @submit.prevent="" class="no-valid">
                    <b-form-input class="mt-2" v-show="item.mappingColumn === 'es' || item.mappingColumn === 'ec'" v-model="item.mappingFormat" :state="getValidationState(item.mappingFormat)"></b-form-input>
                    <b-form-invalid-feedback>{{$t('view.repo.event.mapping.wrongDateFormat')}}</b-form-invalid-feedback>
                  </ValidationObserver>-->
                </b-th>
              </b-tr>
            </template>
          </b-table>
          </b-overlay>
        </div>
        <div class="ag-pagination btn-pagination">
          <b-pagination v-model="pageNumber" :total-rows="totalRows" :per-page="size" :hide-ellipsis="true" @input="onPageMove()" :limit="10"></b-pagination>
        </div>
      </div>
      <!-- 테이블 -->
    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
        <div class="btn-group">
          <!-- <b-button variant="primary" class="btn-primary" @click="onClickNext">{{ $t('view.repo.button.next') }}</b-button> -->
          <!-- <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.button.cancel') }}</b-button> -->
          <b-button variant="primary" class="btn-primary" @click="onClickNext">{{ $t('view.repo.button.apply') }}<!--적용--></b-button>
          <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.button.exit') }}<!--나가기--></b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->

    <b-overlay :show="busy" :no-wrap="true" no-fade class="overlay-flow">
      <template #overlay>
        <FilteringLoading :dataSetName="dataSetName" :totalRows="totalRows"/>
      </template>
    </b-overlay>

  </div>
  <!-- 데이터 필터 설정 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Multiselect from './components/MultiSelect.vue'
import store from '../../store';
import $ from 'jquery';
import { AxiosResponse } from 'axios';

import Back from '../components/Back.vue';
import FlowBarStepFourFilter from '../components/flows/FlowBarStepFourFilter.vue';
import FilteringLoading from './FilteringLoading.vue';

import { UtilsMixin } from '@/mixin';

@Component({
 components: {
   Back,
   FlowBarStepFourFilter,
   Multiselect,
   FilteringLoading,
 },
  computed: {
    ...mapGetters({
      projectId: 'sso/getProjectId',
      subDatasetCreateInfo: 'dataFilter/getSubDatasetCreateInfo',
    })
  },
})
export default class DatasetDataFilterSelect extends Mixins(UtilsMixin) {
  projectId!: string;
  subDatasetCreateInfo!: any;

  selectes: any = [];

  selectOptions: any = {};
  checkedOptions: any = {};

  test: any = [];

  //numericSelect: string = 'Equals';

 /* Prop 선언 */
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
  disabled: boolean = true;

  tableWidth: string = '100%';

  pageNumber: number = 1;
  totalPage: number = 1;
  totalRows: number = 0;
  size: number = 100;

  projectType: string = '';

  dataSetName: string = '';
  eventName: string = '';
  processName: string = '';

  regexStr: RegExp = /^[yYmMdDhHsSTZI:+,/\-"'.0123456789\s]+$/;
  busy: boolean = false;

  keyForDBselect: string = '';

  created() {

    //필드정보
    this.$store.dispatch('repository/getRepoDataView', {
      projectId: this.projectId, //this.datasetCreateInfo.projectId,
      datasetId: this.subDatasetCreateInfo.dataSetId,
    }).then((res: AxiosResponse)=>{
      //필드 정보 변화에 반응
      const fields: any[] = [];
      this.fields = [];
      this.selectOptions = {};
      for (const [key, value] of Object.entries(res.data.data.fields)) {
        fields.push({
          key: key,
          label: value, 
          sortable: true,
          mappingColumn: '',
          mappingFormat: 'yyyy-MM-dd HH:mm:ss', //'yyyy/MM/dd HH:mm:ss', //'YYYY/MM/DD HH24:MI:SS',
        });

        //if(key[0] == 'c' || key[0] == 'b'){
        //  this.selectOption(key);
        //}   
        if(key[0] != 't') this.checkedOptions[key] = []; 
        if(key[0] == 'n') {
          this.checkedOptions[key][0] = 'Equals';
        }
      }

      

      this.dataSetName = res.data.data.name;
      this.fields = fields;
      this.getTableWidth();
      this.tableVisible = true;

      

    });

    //데이터내용
    this.getRepoDataViewData();
  }

  mounted() {
    this.getTableWidth();
  }

  isDb(originType: string) {
    return originType == 'database' ||
          originType == 'psql' ||
          originType == 'oracle' ||
          originType == 'mssql' ||
          originType == 'mysql' ||
          originType == 'mariadb';
  }

  toUpperCase(arg: string) { // css -> Css
    return arg == null ? '' : arg.charAt(0).toUpperCase() + arg.slice(1);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getTableWidth);
  }

  //데이터 정보 가져오기
  //getRepositoryData()
  getRepoDataViewData() {
    this.busy = true;
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.projectId,//this.datasetCreateInfo.projectId,
      datasetId: this.subDatasetCreateInfo.dataSetId,
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

  selectedOption(key: string, index: number) {


    const itemsByKey: any[] = [];
    this.items.forEach((item: any) => {
      itemsByKey.push(item[key]);
    });

    let itemsByKeySet: any = [];
    itemsByKeySet = new Set(itemsByKey);
    const itemsByKeySetOptions: any = {};

    itemsByKeySet.forEach((item: any) => {
      itemsByKeySetOptions[item] = false;
    });

    return itemsByKeySetOptions;
  }

  async selectOption(key: string) {

    const itemsByKeySetOptions: any = {};
    const res = await this.$store.dispatch('dataFilter/getRepoDataUtilLookupLite', {
      projectId: this.projectId,
      dataSetId: this.subDatasetCreateInfo.dataSetId,
      resourceGroupId: this.subDatasetCreateInfo.resourceGroupId,
      field: key,
    });

    const data = res.data.data;

    if(data==null || data==undefined) return {};
      
    Object.keys(data).forEach((item: any)=>{
      itemsByKeySetOptions[item] = false;
    });

    this.$set(this.selectOptions, key, itemsByKeySetOptions)

    //return itemsByKeySetOptions;

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

/*
  save() {
    const mappings: any = {};
    const timestamp: any = [];
    for (let j = 0; j < this.fields.length; j++) {
      if (!this.fields[j].mappingColumn) continue;
      if (this.fields[j].mappingColumn === 'es' || this.fields[j].mappingColumn === 'ec') {
        timestamp.push({
          key: this.fields[j].key,
          type: this.fields[j].mappingColumn,
          format: this.fields[j].mappingFormat,
        });
      } else {
        mappings[this.fields[j].key] = this.fields[j].mappingColumn;
      }
    }

    if (timestamp.length === 1) {
      mappings[timestamp[0].key] = 'et|' + timestamp[0].format;
    } else {
      mappings[timestamp[0].key] = timestamp[0].type + '|' + timestamp[0].format;
      mappings[timestamp[1].key] = timestamp[1].type + '|' + timestamp[1].format;
    }

    this.$store.dispatch('repository/setMappingData', mappings);//'eventLog/setMappingData'
    this.$router.push({
      name: 'DatasetMappingCheck',
      params: {
        projectId: this.projectId,
        dataSetId: this.datasetCreateInfo.dataSetId,
        dataSetName: this.dataSetName,
        eventName: this.datasetCreateInfo.eventName,
      }
    });
  }
  */

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

  onPageMove() {
    this.getRepoDataViewData();
  }

  numberWithCommas(x: number | string): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  back() {
    //const projectId = this.datasetCreateInfo.projectId;
    const datasetId = this.subDatasetCreateInfo.dataSetId;
    this.$router.push({
      name: 'eventList',
    });

  }

 /* mapGetters 변수 선언 */


 /* 클래스 변수 선언 */


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /*
 mounted() {
   
 }
 */

  /* 메소드 선언 */
  onClickNext() {

    const subDatasetCreateInfo: any = {};
    subDatasetCreateInfo.dataSetId = this.subDatasetCreateInfo.dataSetId;
    subDatasetCreateInfo.dataSetNameOrigin = this.subDatasetCreateInfo.dataSetNameOrigin;
    subDatasetCreateInfo.dataSetName = this.subDatasetCreateInfo.dataSetName;
    subDatasetCreateInfo.dataSetDesc = this.subDatasetCreateInfo.dataSetDesc;
    subDatasetCreateInfo.resourceGroupId = this.subDatasetCreateInfo.resourceGroupId;
    subDatasetCreateInfo.checkedOptions = this.checkedOptions;
    subDatasetCreateInfo.selectedWorkspace = this.subDatasetCreateInfo.selectedWorkspace;
    
    subDatasetCreateInfo.fields = this.fields;
    this.$store.commit('dataFilter/setSubDatasetCreateInfo', subDatasetCreateInfo);

    this.$router.push({
      name: 'DatasetDataFiltering',
      //params: {
      //  selectes: this.selectes,
      //  dataSetId: this.datasetCreateInfo.dataSetId,
      //  dataSetName: this.dataSetName,
      //  eventName: this.datasetCreateInfo.eventName,
      //  totalRows: this.totalRows.toString(),
      //},
    });
    
  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'DatasetFilterCreateForm',
      params: {
        notShowOverlay: 'true'
      }
      //params: {
      //  dataSetId: this.datasetCreateInfo.dataSetId,
      //  dataSetName: this.dataSetName,
      //  eventName: this.datasetCreateInfo.evnetName,
     //}
    });
  }

  required(val: any) { // 필수 값
    return val != '';
  }

  regex(val: string, reg: any) { // 정규식
    return reg.test(val);
  }

  getValidationState(arg: any) {
    return this.required(arg) &&
            this.regex(arg, this.regexStr);
  }

  getCBselect(result: any, skey: string) {
    this.checkedOptions[skey] = result;
  }
}
</script>