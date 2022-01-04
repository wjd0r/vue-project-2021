<template>
  <!-- 데이터 필터 확인 -->
  <div class="main-common-component dataset-filter-component filter-check-component">
    <div class="dataser-filter-content filter-check-content">
      <!-- back -->
      <Back @onClick="onClickBack()" :useCustom="true"/>
      <!-- back -->

      <!-- flowbar -->
      <FlowBarStepFour mode="dataset" :stage="2"/>
      <!-- flowbar -->

      <!-- 정보 -->
      <div class="inf-component row">
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetName') }}</div>
          <div class="content-body">{{datasetCreateInfo.datasetName}}</div>
        </div>
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.datasetRowNum') }}</div>
          <div class="content-body">{{datasetCreateInfo.totalRows}}</div>
        </div>
        <div class="inf-content col-3">
          <div class="content-header">{{ $t('view.repo.label.otherRowNum') }}</div>
          <div class="content-body">100,000</div>
        </div>
      </div>
      <!-- 정보 -->

      <!-- 필터 확인-->
      <div class="filter-component">
        <div class="filter-content filter-common-content">
          <div class="content-header">
            <h5 class="title">필터된 목록</h5>
          </div>
          <div class="content-body">
            <div coass="filtering">
              <table class="table line">
                <thead>
                  <tr>
                    <th>컬럼 이름</th>
                    <th>필터된 값 건수</th>
                    <th>필터된 값</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Invoice No</td>
                    <td>3</td>
                    <td>Alice Mutton, Boston Crab Meat, Nunuca nu-</td>
                  </tr>
                  <tr>
                    <td>Activity</td>
                    <td>2</td>
                    <td>Boston crab meat, nunuca nu-</td>
                  </tr>
                  <tr>
                    <td>Original</td>
                    <td>2</td>
                    <td>Raclette courdavault, wimmers gute</td>
                  </tr>
                  <tr>
                    <td>Branch name</td>
                    <td>2</td>
                    <td>Wimmers gute</td>
                  </tr>
                  <tr>
                    <td>Cost</td>
                    <td>-</td>
                    <td>Greater than 100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <template v-for="(select) in datasetCreateInfo.selectes">
              <div class="filtering" :key="select.key">
                <div class="content-header">
                  <div class="title">{{select.label}}</div>
                </div>
                <div class="content-body">
                  <div class="filtering-text">{{selectedKey(select.selected)}}</div>
                </div>
              </div>
            </template> -->
          </div>
        </div>
      </div>
      <!-- 필터 확인 -->

      <!-- 테이블 -->
      <div class="table-component">
        <div class="content-header"><h5 class="title">포함된 데이터</h5></div>
        <div class="table-content filter-common-content">
          <b-table class="table line" bordered :items="items" :fields="fields" v-show="tableVisible" :style="{ width: tableWidth }" responsive />
        </div>
      </div>
      <!-- 테이블 -->
    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
        <div class="btn-group">
          <b-button variant="primary" class="btn-primary" @click="onClickNext">{{ $t('view.repo.button.next') }}</b-button>
          <b-button variant="secondary" class="btn-secondary" @click="onClickCancel">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->
  </div>
  <!-- 데이터 필터 확인 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import Back from '../components/Back.vue';
import FlowBarStepFour from '../components/flows/FlowBarStepFour.vue';
import _ from 'lodash';
import { AxiosResponse } from 'axios';

import { UtilsMixin } from '@/mixin';

@Component({
  components: {
    Back,
    FlowBarStepFour
  },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    datasetCreateInfo: 'repository/getDatasetCreateInfo',
  }),
})
export default class DatasetDataFilterCheck extends Mixins(UtilsMixin) {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
  projectId!: string;
  datasetCreateInfo!: any;

 /* 클래스 변수 선언 */
  items: any = [];
  pageNumber: number = 1;
  size: number = 15;
  totalPage: number = 1;
  totalRows: number = 0;

  fields: any = [];
  tableVisible: boolean = false;
  tableWidth: string = '100%';

  selectes: any = [];

 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */

 /* 메소드 선언 */
  async created() {
    await this.getField();
    this.getRepoDataViewData();
  }

  getField() {
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

        if(this.datasetCreateInfo.selectes != undefined) {
          this.selectes = this.datasetCreateInfo.selectes;
        } else {
          this.selectes.push({
            key: key,
            label: value,
            selected: {
              alice:'false',
              boston:'false',
              nunuca:'false',
              raclette:'false',
              wimmers:'false',
            }
          });
        }
      }

      this.fields = fields;
      this.getTableWidth();
      this.tableVisible = true;
    });
  }

  //데이터 정보 가져오기
  getRepoDataViewData() {
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.projectId,//this.datasetCreateInfo.projectId,
      datasetId: this.datasetCreateInfo.dataSetId,
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

  getValidationState({ dirty, validated, valid = null }: any) {
    return dirty || validated ? valid : null;
  }

  onPageMove() {
    this.getRepoDataViewData();
  }


  selectedKey(selecte: object) {
    const strs: string[] = [];
    _.forEach(
      _.filter(Object.entries(selecte), (o) => o[1] == true ),
      (a) => strs.push(a[0]),
    );

    const result = strs.join(', ');
    return result == '' ? this.$t('view.repo.label.all').toString() : result;
  }
   
  onClickPrev() {
    this.$router.push({
      name: 'DatasetDataFilterSelect',
    });
  }

  onClickNext() {
      this.$router.push({
        name: 'DatasetCreateComplete',
      });
  }

  onClickCancel() {
    this.$router.push({
      name: 'EventList'
    });
  }

  onClickBack() {
    this.onClickPrev();
  }
}
</script>