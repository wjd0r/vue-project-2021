<template>
  <!-- 데이터 매핑 -->
  <div class="main-common-component dataset-table-component mapping-component">
    <div class="dataset-table-content mapping-content">
      <!-- back -->
      <!--<Back @onClick="onClickBack()" :useCustom="true"/>-->
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFour mode="dataset" :stage="3"/>
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
        <div class="notice-text">(*) 필수사항</div>
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
                    <b-form-select v-model="item.mappingColumn" :options="selectedOption" @change.native="selectChangeCheck($event)" @input="selectChange">
                      <template v-slot:first>
                        <b-form-select-option selected value="">{{$t('view.repo.event.mapping.doSelect')}}</b-form-select-option>
                      </template>
                    </b-form-select>
                    <ValidationObserver ref="form" tag="form" @submit.prevent="" class="no-valid">
                      <b-form-input class="mt-2" v-show="item.mappingColumn === 'es' || item.mappingColumn === 'ec'" v-model="item.mappingFormat" :state="getValidationState(item.mappingFormat)"></b-form-input>
                      <b-form-invalid-feedback>{{$t('view.repo.event.mapping.wrongDateFormat')}}</b-form-invalid-feedback>
                    </ValidationObserver>
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
          <b-button variant="primary" class="btn-primary" @click="onClickNext" :disabled="disabled">{{ $t('view.repo.button.next') }}</b-button>
          <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->

    <b-overlay :show="busy" :no-wrap="true" no-fade class="overlay-flow">
      <template #overlay>
        <MappingLoading/>
      </template>
    </b-overlay>

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

import Back from '../../../components/Back.vue';
import FlowBarStepFour from '../../../components/flows/FlowBarStepFour.vue';
import MappingLoading from './MappingLoading.vue';

import { UtilsMixin } from '@/mixin';

@Component({
 components: {
   Back,
   FlowBarStepFour,
   MappingLoading
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',
   datasetCreateInfo: 'repository/getDatasetCreateInfo',
 }),
})
export default class DatasetMappingSelect extends Mixins(UtilsMixin) {
  projectId!: string;
  datasetCreateInfo!: any;
  
  tableVisible: boolean = false;
  showTooltip: boolean = false;

  items: any = [];
  fields: any = [{"key":"c0","label":"column 1","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c1","label":"column 2","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c2","label":"column 3","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c3","label":"column 4","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c4","label":"column 5","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c5","label":"column 6","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c6","label":"column 7","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"},
    {"key":"c7","label":"column 8","sortable":true,"mappingColumn":"","mappingFormat":"yyyy-MM-dd HH:mm:ss"}];
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

    { value: 'cb', text: this.$t('view.repo.event.mapping.select.caseProperty') },
    { value: 'eb', text: this.$t('view.repo.event.mapping.select.eventProperty') },
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

  created() {
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
    const datasetId = this.datasetCreateInfo.dataSetId;
    this.$router.push({
      name: 'eventList',
    });

  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.$router.push({
      name: 'DatasetNextStep',
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
}
</script>