<template>
  <div class="animated fadeIn main-common-component mapping-component">
    <div class="mapping-content">
      <div class="mapping-inf-content">
        <div class="form-content">
            <div class="content-title">{{$t('view.repo.event.mapping.eventName')}}</div>
            <div class="content-data">{{eventName}}</div>
        </div>

        <div class="form-content">
            <div class="content-title">{{$t('view.repo.event.mapping.standardProcess')}}</div>
            <div class="content-data">{{processName}}</div>
        </div>

      </div>

      <div class="mapping-table-content">
        <div class="table-component">
          <div class="table-content">
            <b-table bordered :items="items" :fields="fields" v-show="tableVisible" :style="{ width: tableWidth }" responsive>
            <template v-slot:thead-top="">
              <b-tr>
                <b-th v-for="item in fields" :key="item.key">
                  <b-form-select v-model="item.mappingColumn" :options="selectedOption" @change.native="selectChangeCheck($event)" @input="selectChange">
                    <template v-slot:first>
                      <b-form-select-option selected value="">{{$t('view.repo.event.mapping.doSelect')}}</b-form-select-option>
                    </template>
                  </b-form-select>
                  <ValidationObserver ref="form" tag="form" @submit.prevent="" class="no-valid">
                    <b-form-input class="mt-2" v-if="item.mappingColumn === 'es' || item.mappingColumn === 'ec'" v-model="item.mappingFormat" :state="getValidationState(validationContext)"></b-form-input>
                    <b-form-invalid-feedback>{{$t('view.repo.event.mapping.wrongDateFormat')}}</b-form-invalid-feedback>
                  </ValidationObserver>
                </b-th>
              </b-tr>
            </template>
            </b-table>
          </div>
        </div>
      </div>

      <div class="btn-group">
        <!--<b-button variant="outline-primary" @click.prevent="back">이전</b-button>-->
        <div class="ag-pagination">
          <b-pagination v-model="pageNumber" :total-rows="totalRows" :per-page="size" :hide-ellipsis="true" @input="onPageMove()" :limit="10"></b-pagination>
        </div>
        <b-button variant="primary" @click.prevent="save" :disabled="disabled">{{ $t('view.repo.button.next') }}</b-button>
        <b-button variant="secondary" @click.prevent="back">{{ $t('view.repo.button.cancel') }}</b-button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../../store';
import $ from 'jquery';
import { AxiosResponse } from 'axios';

@Component({
  computed: mapGetters({
    projectId: 'sso/getProjectId',
  }),
})
export default class EventMapping extends Vue {

  projectId!: string;
  
  tableVisible: boolean = false;
  showTooltip: boolean = false;

  items: any = [];
  fields: any = [];
  selectedOption: any = [
    { value: 'ci', text: this.$t('view.repo.event.mapping.select.caseId')+'*' },
    { value: 'ea', text: this.$t('view.repo.event.mapping.select.activity')+'*' },
    { value: 'es', text: this.$t('view.repo.event.mapping.select.startTime') },
    { value: 'ec', text: this.$t('view.repo.event.mapping.select.endTime')+'*' },
    { value: 'eo', text: this.$t('view.repo.event.mapping.select.originator') },
    { value: 'er', text: this.$t('view.repo.event.mapping.select.resource') },
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


  created() {
    //필드정보
    this.$store.dispatch('repository/getRepoDataView', {
      projectId: this.projectId, //this.$route.params.projectId,
      datasetId: this.$route.params.datasetId,
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

  //데이터 정보 가져오기
  //getRepositoryData()
  getRepoDataViewData() {
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.projectId,//this.$route.params.projectId,
      datasetId: this.$route.params.datasetId,
      page: this.pageNumber - 1,
      size: this.size,
    }).then((res: AxiosResponse) =>{
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
		//case id, activity모두 여러개 선택가능해서 일단 기능 삭제
		/*if(event.target.value === 'es' || event.target.value === 'ec') {
			event.target.dataset["old_value"] = event.target.value;
			$('select').not(event.target).find('option[value=' + event.target.value + ']').attr('disabled', 'disabled');
		} else {
*/

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
      name: 'mappingTest',
      params: {
        projectId: this.$route.params.projectId,
        datasetId: this.$route.params.datasetId,
      }
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
    //const projectId = this.$route.params.projectId;
    const datasetId = this.$route.params.datasetId;
    this.$router.push({
      name: 'eventList',
    });

  }

  getValidationState({ dirty, validated, valid = null }: any) {
    return dirty || validated ? valid : null;
  }
}
</script>