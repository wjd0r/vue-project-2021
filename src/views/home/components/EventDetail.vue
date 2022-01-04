<template>
  <div class="detail-component">
    <div class="detail-content">
      <div v-if="$mq.desktop">
        <div v-if="!showRepositoryDetail" class="loading d-flex align-items-center justify-content-center">{{$t('view.repo.eventDetail.noSelect')}}</div>
        <div v-else>
        <!-- kpi -->
        <div v-if="isLoading">
          <div class="loading d-flex align-items-center justify-content-center">
            <b-spinner/>
          </div>
        </div>
        <div v-else>
        <div class="kpi-component">
          <div class="kpi-content row">
            <!-- 케이스 수 -->
            <div class="col-4 col-content">
              <div class="card kpi blue">
                <div class="content-header">
                  <div class="title">{{$t('view.repo.eventDetail.caseNum')}}<!--케이스 수--></div>
                </div>
                <div class="content-body">
                  <h2 class="value-text">{{caseCount.toLocaleString()}}</h2>
                </div>
              </div>
            </div>
            <!-- 케이스 수 -->
            
            <!-- 이벤트 수 -->
            <div class="col-4 col-content">
              <div class="card kpi blue">
                <div class="content-header">
                  <div class="title">{{$t('view.repo.eventDetail.eventNum')}}<!--이벤트 수--></div>
                </div>
                <div class="content-body">
                  <h2 class="value-text">{{eventCount.toLocaleString()}}</h2>
                </div>
              </div>
            </div>
            <!-- 이벤트 수 -->

            <!-- 최근 업데이트 -->
            <div class="col-4 col-content">
              <div class="card kpi blue">
                <div class="content-header">
                  <div class="title">{{$t('view.repo.eventDetail.lastUpdate')}}<!--최근 업데이트--></div>
                </div>
                <div class="content-body">
                  <h2 class="value-text">{{lastSyncedFormat(lastSynced)}}</h2>
                </div>
              </div>
            </div>
            <!-- 최근 업데이트 -->

            <!-- 시작일 -->
            <div class="col-6 col-content">
              <div class="card kpi">
                <div class="content-header">
                  <div class="title">{{$t('view.repo.eventDetail.startDate')}}<!--시작 일시--></div>
                </div>
                <div class="content-body">
                  <h2 class="value-text">{{startTimeStr}}</h2>
                </div>
              </div>
            </div>
            <!-- 시작일 -->

            <!-- 종료일 -->
            <div class="col-6 col-content">
              <div class="card kpi">
                <div class="content-header">
                  <div class="title">{{$t('view.repo.eventDetail.endDate')}}<!--종료 일시--></div>
                </div>
                <div class="content-body">
                  <h2 class="value-text">{{completeTimeStr}}</h2>
                </div>
              </div>
            </div>
            <!-- 종료일 -->
          </div>
        </div>
        <!-- kpi -->

        <!-- event inf -->
        <div class="inf-component">
          <div class="inf-content">
            <div class="inf">
              <b-form class="inf-form">
                <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.workspaceName')" label-for="name" label-cols="3" ><!--원본 데이터 이름--><!--:label="$t('view.repo.eventDetail.workspaceName')"-->
                  <b-form-input v-model="workspaceName" type="text" disabled></b-form-input>
                </b-form-group>

                <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.originDatasetName')" label-for="name" label-cols="3" ><!--원본 데이터 이름-->
                  <b-form-input v-model="originalDataName" type="text" disabled></b-form-input>
                </b-form-group>

                <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.eventLogName')" label-for="name" label-cols="3"><!--이벤트 로그 이름-->
                  <b-form-input v-model="eventLogName" type="text" disabled></b-form-input>
                </b-form-group>

                <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.eventLogDesc')" label-for="name" label-cols="3"><!--이벤트 로그 설명-->
                  <b-form-input v-model="eventLogDesc" type="text" disabled></b-form-input>
                </b-form-group>

                <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.relatedRepository')" label-for="name" label-cols="3"><!--Related Repository-->
                  <b-form-input v-model="relRepository" type="text" disabled></b-form-input>
                </b-form-group>
              </b-form>
            </div>
          </div>
          <div class="content-footer">
            <b-button variant="primary" class="btn-primary btn-analysis" @click="clickAnalysis()">{{$t('view.repo.eventDetail.analysis')}}<!--분석--></b-button>
          </div>
        </div>
        <!-- event inf -->

        <!-- matching list -->
        <div class="matching-component">
          <div class="matching-content">
            <div class="matching">
              <div class="content-header">
                <h5 class="title">{{$t('view.repo.eventDetail.mappingMatchingList')}}<!--매핑 매칭 목록--></h5>
              </div>
              <div class="content-body d-flex">
                <b-table-simple class="table line" caption-top responsive sticky-header>
                  <b-thead>
                    <b-tr>
                      <b-th>{{$t('view.repo.eventDetail.propertyName')}}<!--속성명--></b-th>
                      <b-th>{{$t('view.repo.eventDetail.columnName')}}<!--컬럼명--></b-th>
                      <b-th>{{$t('view.repo.eventDetail.example')}}<!--예시--></b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="item in mappingList" :key=item.key>
                      <b-td>{{item[0]}}</b-td>
                      <b-td>{{item[1]}}</b-td>
                      <b-td>{{item[2]}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </div>
            </div>
          </div>
        </div>
        <!-- matching list-->

        <!-- standard list -->
        <div class="standard-component">
          <div class="standard-content">
            <div class="content-header">
              <h5 class="title">{{$t('view.repo.eventDetail.standardProcessList')}}<!--표준 프로세스 목록--></h5>
              <div class="count-text">({{processList.length}})</div>
            </div>
            <div class="content-body">
              <div v-if="processList.length==0" class="position-relative">
                <div class="nodata-text">{{$t('view.repo.eventDetail.noProcessList')}}<!--등록된 표준 프로세스가 없습니다.--></div>
              </div>
              <div v-else class="card card-created standard list" v-for="(item, index) in processList" :key="index">
                <div class="content-header">
                  <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                  <h5 class="title">{{item.name}}</h5>
                  <div class="defaulf-stadard" v-if="item.isDeployed">
                    <b-badge variant="primary" class="default">{{$t('view.repo.eventDetail.basic')}}<!--기본--></b-badge>
                  </div>
                </div>
                <div class="content-footer">
                  <div class="user-inf">{{$t('view.repo.eventDetail.create')}} - {{item.createdByName}}</div>
                  <b-button variant="outline-primary" class="btn-outline-primary" @click="clickProcessEdit(item.id)" :class="{ 'd-none': isMobileBlock() }">{{$t('view.repo.eventDetail.processEdit')}}<!--프로세스 편집--></b-button>
                </div>
              </div>

              <!--<div class="card card-created standard list">
                <div class="content-header">
                  <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                  <h5 class="title">표준 프로세스 1</h5>
                  <div class="defaulf-stadard">
                    <b-badge variant="primary" class="default">기본</b-badge>
                  </div>
                </div>
                <div class="content-footer">
                  <div class="user-inf">생성자 - 홍길동</div>
                  <b-button variant="outline-primary" class="btn-outline-primary">프로세스 편집</b-button>
                </div>
              </div>

              <div class="card card-created standard list">
                <div class="content-header">
                  <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                  <h5 class="title">표준 프로세스 1</h5>
                </div>
                <div class="content-footer">
                  <div class="user-inf">생성자 - 홍길동</div>
                  <b-button variant="outline-primary" class="btn-outline-primary">프로세스 편집</b-button>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <!-- standard list -->
        </div>
      </div>
    </div>

    <div v-else>
      <b-modal v-model="showRepositoryDetail" size="xl" centered hide-header hide-footer id="HomeDetail">
        <b-overlay :show="isLoading"  no-fade bg-color="#fff" opacity="1">
        <div  style="overflow-y: auto; height: 800px">
          <!--<div v-if="isLoading">
          <div class="loading d-flex align-items-center justify-content-center">
            <b-spinner/>
          </div>
          </div>
          <div v-else>-->
          <div>
          <!-- kpi -->
          <div class="kpi-component">
            <div class="kpi-content row">
              <!-- 케이스 수 -->
              <div class="col-4 col-content">
                <div class="card kpi blue">
                  <div class="content-header">
                    <div class="title">{{$t('view.repo.eventDetail.caseNum')}}<!--케이스 수--></div>
                  </div>
                  <div class="content-body">
                    <h2 class="value-text">{{caseCount.toLocaleString()}}</h2>
                  </div>
                </div>
              </div>
              <!-- 케이스 수 -->
              
              <!-- 이벤트 수 -->
              <div class="col-4 col-content">
                <div class="card kpi blue">
                  <div class="content-header">
                    <div class="title">{{$t('view.repo.eventDetail.eventNum')}}<!--이벤트 수--></div>
                  </div>
                  <div class="content-body">
                    <h2 class="value-text">{{eventCount.toLocaleString()}}</h2>
                  </div>
                </div>
              </div>
              <!-- 이벤트 수 -->

              <!-- 최근 업데이트 -->
              <div class="col-4 col-content">
                <div class="card kpi blue">
                  <div class="content-header">
                    <div class="title">{{$t('view.repo.eventDetail.lastUpdate')}}<!--최근 업데이트--></div>
                  </div>
                  <div class="content-body">
                    <h2 class="value-text">{{lastSyncedFormat(lastSynced)}}</h2>
                  </div>
                </div>
              </div>
              <!-- 최근 업데이트 -->

              <!-- 시작일 -->
              <div class="col-6 col-content">
                <div class="card kpi">
                  <div class="content-header">
                    <div class="title">{{$t('view.repo.eventDetail.startDate')}}<!--시작일--></div>
                  </div>
                  <div class="content-body">
                    <h2 class="value-text">{{startTimeStr}}</h2>
                  </div>
                </div>
              </div>
              <!-- 시작일 -->

              <!-- 종료일 -->
              <div class="col-6 col-content">
                <div class="card kpi">
                  <div class="content-header">
                    <div class="title">{{$t('view.repo.eventDetail.endDate')}}<!--종료일--></div>
                  </div>
                  <div class="content-body">
                    <h2 class="value-text">{{completeTimeStr}}</h2>
                  </div>
                </div>
              </div>
              <!-- 종료일 -->
            </div>
          </div>
          <!-- kpi -->

          
          <!-- event inf -->
          <div class="inf-component">
            <div class="inf-content">
              <div class="inf">
                <b-form class="inf-form" style="width: 70vw;">
                  <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.workspaceName')" label-for="name" label-cols="3" ><!--원본 데이터 이름--><!--:label="$t('view.repo.eventDetail.workspaceName')"-->
                  <b-form-input v-model="workspaceName" type="text" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.originDatasetName')" label-for="name" label-cols="5" >
                    <b-form-input v-model="originalDataName" type="text" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.eventLogName')" label-for="name" label-cols="5">
                    <b-form-input v-model="eventLogName" type="text" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.eventLogDesc')" label-for="name" label-cols="5">
                    <b-form-input v-model="eventLogDesc" type="text" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group id="datasetName" :label="$t('view.repo.eventDetail.relatedRepository')" label-for="name" label-cols="5">
                    <b-form-input v-model="relRepository" type="text" disabled></b-form-input>
                  </b-form-group>
                </b-form>
              </div>
            </div>
          </div>
          <!-- event inf -->

          <!-- matching list -->
          <div class="matching-component">
            <div class="matching-content">
              <div class="matching">
                <div class="content-header">
                  <h5 class="title">{{$t('view.repo.eventDetail.mappingMatchingList')}}<!--매핑 매칭 목록--></h5>
                </div>
                <div class="content-body d-flex">
                  <b-table-simple class="table line" caption-top responsive sticky-header>
                    <b-thead>
                      <b-tr>
                        <b-th>{{$t('view.repo.eventDetail.propertyName')}}<!--속성명--></b-th>
                        <b-th>{{$t('view.repo.eventDetail.columnName')}}<!--컬럼명--></b-th>
                        <b-th>{{$t('view.repo.eventDetail.example')}}<!--예시--></b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="item in mappingList" :key=item.key>
                        <b-td>{{item[0]}}</b-td>
                        <b-td>{{item[1]}}</b-td>
                        <b-td>{{item[2]}}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </div>
          </div>
          <!-- matching list-->

          <!-- standard list -->
          <div class="standard-component">
            <div class="standard-content">
              <div class="content-header">
                <h5 class="title">{{$t('view.repo.eventDetail.standardProcessList')}}<!--표준 프로세스 목록--></h5>
                <div class="count-text">({{processList.length}})</div>
              </div>
              <div class="content-body">

                <div v-if="processList.length==0" class="position-relative">
                  <div class="nodata-text">{{$t('view.repo.eventDetail.noProcessList')}}<!--등록된 표준 프로세스가 없습니다.--></div>
                </div>
                <div v-else class="card card-created standard list" v-for="(item, index) in processList" :key="index">
                <div class="content-header">
                  <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                  <h5 class="title">{{item.name}}</h5>
                  <div class="defaulf-stadard" v-if="item.isDeployed">
                    <b-badge variant="primary" class="default">{{$t('view.repo.eventDetail.basic')}}<!--기본--></b-badge>
                  </div>
                </div>
                <div class="content-footer">
                  <div class="user-inf">{{$t('view.repo.eventDetail.create')}} - {{item.createdByName}}</div>
                  <b-button variant="outline-primary" class="btn-outline-primary"  @click="clickProcessEdit(item.id)" :class="{ 'd-none': isMobileBlock() }">{{$t('view.repo.eventDetail.processEdit')}}<!--프로세스 편집--></b-button>
                </div>
                </div>

                <!--<div class="card card-created standard list">
                  <div class="content-header">
                    <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                    <h5 class="title">표준 프로세스 1</h5>
                    <div class="defaulf-stadard">
                      <b-badge variant="primary" class="default">기본</b-badge>
                    </div>
                  </div>
                  <div class="content-footer">
                    <div class="user-inf">생성자 - 홍길동</div>
                    <b-button variant="outline-primary" class="btn-outline-primary">프로세스 편집</b-button>
                  </div>
                </div>

                <div class="card card-created standard list">
                  <div class="content-header">
                    <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
                    <h5 class="title">표준 프로세스 1</h5>
                  </div>
                  <div class="content-footer">
                    <div class="user-inf">생성자 - 홍길동</div>
                    <b-button variant="outline-primary" class="btn-outline-primary">프로세스 편집</b-button>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
          <!-- standard list -->
          </div>
        </div>

        <!-- bottom -->
        <div class="bottom-component">
          <div class="bottom-content" style="float: right;">
            <b-button variant="primary" class="btn-primary btn-analysis" style="margin: 0px 10px 0px 0px;" @click="clickAnalysis()" v-show="!isLoading">{{$t('view.repo.eventDetail.analysis')}}</b-button>
            <b-button variant="secondary" class="btn-secondary btn-close" @click="onClickClose()" v-show="!isLoading">{{$t('view.repo.eventDetail.close')}}<!--닫기--></b-button>
          </div>
        </div>
        <!-- bottom -->
        </b-overlay>
        </b-modal>
        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { ISetting } from '@/interface';

import { UtilsMixin } from '@/mixin';
import { utils } from '@/common';

import { AxiosError, AxiosResponse } from 'axios';

@Component({
 components: {

 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',
   readOnlySetting: 'sso/getSetting',

 }),
 ...utils.getMq(),
} as any)
export default class RepositoryDetail extends Mixins(UtilsMixin)  {
 /* Prop 선언 */


 /* mapGetters 변수 선언 */
 projectId!: any;



 /* 클래스 변수 선언 */
 showRepositoryDetail: boolean = false;

 workspaceName: string = '';
 originalDataName: string = '';
 eventLogName: string = '';
 eventLogDesc: string = '';
 relRepository: string = '';

 mappingList: any[] = [];

 //상단 KPI
 caseCount: number = 0;
 eventCount: number = 0;
 startTimeStr: string = '0000-00-00 00:00:00';
 completeTimeStr: string = '0000-00-00 00:00:00';
 lastSynced: string = '0000-00-00 00:00:00';

 //표준 프로세스
 processList: any[] = [];

 isLoading: boolean = true;

 readonly readOnlySetting!: ISetting;
 repositoryId: string = '';
 rgId: string = '';

 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
 /*
 mounted() {
   
 }
 */

 /* 메소드 선언 */
 showDetail(repositoryId: any) {

   if(repositoryId == null) {
     this.showRepositoryDetail = false;
     return;
   }
   this.repositoryId = repositoryId;

    this.showRepositoryDetail = true;

    this.isLoading = true;

    /*
    if(repositoryId == null){
      this.caseCount = 0;
      this.eventCount = 0;
      this.startTimeStr = '0000-00-00 00:00:00';
      this.completeTimeStr = '0000-00-00 00:00:00';
      this.lastSynced = '0000-00-00 00:00:00';

      this.originalDataName = '원본 데이터';
      this.eventLogName = '이벤트 로그 1';
      this.eventLogDesc = '이벤트 로그 설명 1';
      this.relRepository = '-';

      this.mappingList = [];

      this.processList = [
        {id: null, name: '표준 프로세스 1', createdByName: '', isDeployed: true},
        {id: null, name: '표준 프로세스 1', createdByName: '', isDeployed: false}
      ];

      this.isLoading = false;
      return;

    }
    */

    const res0 = this.$store.dispatch('repository/getRepoEventView', { projectId: this.projectId, eventId: repositoryId}).then((res)=> {return res;});
    const datasetId = repositoryId.split('_')[0];
    const res1 = this.$store.dispatch('repository/getRepoDataView', { datasetId: datasetId, projectId: this.projectId,}).then((res)=> {return res;});
    const res2 = this.$store.dispatch('repository/getRepoDataViewData', { projectId: this.projectId, datasetId: datasetId, page: 1, size: 10,}).then((res)=> {return res;});

    Promise.all([res0, res1, res2])
      .then((results: AxiosResponse[]) => {
        //repo.event.view
        //repo.data.view
        //repo.data.view.view

        const res0_url = results[0].config.url.split('/')[3];
        const res1_url = results[1].config.url.split('/')[3];
        const res2_url = results[2].config.url.split('/')[3];

        const urls = [res0_url, res1_url, res2_url];

        let res0: any = {};
        let res1: any = {};
        let res2: any = {};

        let idx = 0;
        urls.forEach((u: any)=>{
          switch(u) {
            case 'repo.event.view':
              res0 = results[idx];
              break;
            case 'repo.data.view':
              res1 = results[idx];
              break;
            case 'repo.data.view.data':
              res2 = results[idx];
              break;
          }
          idx++;
        });

        const data = res0.data.data;

        //상단 KPI
        this.caseCount = data.caseCount;
        this.eventCount = data.eventCount;
        this.startTimeStr = data.startTimeStr;
        this.completeTimeStr = data.completeTimeStr;
        this.lastSynced = data.lastSynced;

        //중간 항목
        this.workspaceName = utils.getWorkspaceByRgId(data.resourceGroup.id)?.name;
        this.originalDataName = data.relatedDatasetName;
        this.eventLogName = data.name;
        this.eventLogDesc = data.description;
        this.relRepository = data.relatedRepositoryName==null ? '-' : data.relatedRepositoryName;
        
        //resourcegroupId
        this.rgId = data.resourceGroup.id;

        //매핑 매칭 목록
        this.originalDataName = res1.data.data.name;

        const fields = res1.data.data.fields;
        const mappings = data.origin.mappings;

        const exampleData = res2.data.data.results[0];

            this.mappingList = [];
            Object.keys(fields).forEach((key: any) => {
              //key = c0
              const column = fields[key]; //"Container No"
              const existingKeys = Object.keys(mappings);

              if(existingKeys.includes(key)){
                const mapped = mappings[key].split('|')[0]; //"ci"
                
                const caseId = this.$t('view.repo.event.eventLog.modal.caseId');
                const activity = this.$t('view.repo.event.eventLog.modal.activity');
                const startTime = this.$t('view.repo.event.eventLog.modal.startTime');
                const endTime = this.$t('view.repo.event.eventLog.modal.endTime');
                const originator = this.$t('view.repo.event.eventLog.modal.originator');
                const resource = this.$t('view.repo.event.eventLog.modal.resource');
                const caseProperty = this.$t('view.repo.event.eventLog.modal.caseProperty');
                const eventProperty = this.$t('view.repo.event.eventLog.modal.eventProperty');
                const useTime = this.$t('view.repo.event.eventLog.modal.useTime');

                const eventCost = this.$t('view.repo.event.eventLog.modal.eventCost');
                const caseAllCost = this.$t('view.repo.event.eventLog.modal.caseAllCost');

                //const mapInHangul: any = {'ci': '케이스 아이디', 'ea': '액티비티', 
                //'es': '시작시간', 'ec': '종료시간', 'eo': '담당자', 'er': '리소스', 'cu': '케이스 속성',
                //'eu': '이벤트 속성', 'et': '운영시간', 'en': '이벤트 비용', 'cn': '케이스 총 비용'}; 
                const mapInHangul: any = {'ci': caseId, 'ea': activity, 
                  'es': startTime, 'ec': endTime, 'eo': originator, 'er': resource, 'cb': caseProperty,
                  'eb': eventProperty, 'et': endTime, 'en': eventCost, 'cn': caseAllCost}; //'et': useTime
                const times = ['es', 'ec', 'et'];
                const hangul = mapInHangul[mapped];
                const item: any = {};
                item[hangul] = column;
                this.mappingList.push( [hangul, column + (times.includes(mapped) ? ' ('+mappings[key].split('|')[1]+')' : ''), exampleData[key]] );
                    
              }
            });

            //표준 프로세스
            const attributes = data.attributes;
            const relations = (attributes["saas.relatedModels"] != undefined && attributes["saas.relatedModels"].value != null && attributes["saas.relatedModels"].value != undefined) 
                              ? Object.values(attributes["saas.relatedModels"].value) 
                              : []; //_type= "ProcessModel | Graph | GraphImpl"
                              
            const referenceModelId = (attributes["reference.model"] != undefined && attributes["reference.model"].value != undefined) 
                                      ? attributes["reference.model"].value.id 
                                      : null;

            this.processList = [];
            const processType = ["ProcessModel", "Graph", "GraphImpl"]; 
            relations.forEach((relation: any) => {
              if(processType.includes(relation._type))
              {
                const id = relation.id;
                const name = relation.name;
                const createdByName = relation.createdByName;
                const isDeployed = relation.id == referenceModelId;
                const process = {id: id, name: name, createdByName: createdByName, isDeployed: isDeployed};
                this.processList.push(process);
              }
            });

            this.isLoading = false;

      });

    /*
    this.$store.dispatch('repository/getRepoEventView', {
          projectId: this.projectId,
          eventId: repositoryId
    }).then((res0: any) => {
      const data = res0.data.data;

      //상단 KPI
      this.caseCount = data.caseCount;
      this.eventCount = data.eventCount;
      this.startTimeStr = data.startTimeStr;
      this.completeTimeStr = data.completeTimeStr;
      this.lastSynced = data.lastSynced;

      //중간 항목
      this.workspaceName = utils.getWorkspaceByRgId(data.resourceGroup.id)?.name;
      this.originalDataName = data.relatedDatasetName;
      this.eventLogName = data.name;
      this.eventLogDesc = data.description;
      this.relRepository = data.relatedRepositoryName==null ? '-' : data.relatedRepositoryName;
      
      //resourcegroupId
      this.rgId = data.resourceGroup.id;

      //매핑 매칭 목록
      
      const datasetId = repositoryId.split('_')[0];
      this.$store.dispatch('repository/getRepoDataView', {
          datasetId: datasetId,
          projectId: this.projectId,
      }).then((res1: any) => {

        this.originalDataName = res1.data.data.name;

        const fields = res1.data.data.fields;
        const mappings = data.origin.mappings;

        this.$store.dispatch('repository/getRepoDataViewData', {
            projectId: this.projectId,
            datasetId: datasetId,
            page: 1,
            size: 10,
        }).then((res2: any) =>{

            const exampleData = res2.data.data.results[0];

            this.mappingList = [];
            Object.keys(fields).forEach((key: any) => {
              //key = c0
              const column = fields[key]; //"Container No"
              const existingKeys = Object.keys(mappings);

              if(existingKeys.includes(key)){
                const mapped = mappings[key].split('|')[0]; //"ci"
                
                const caseId = this.$t('view.repo.event.eventLog.modal.caseId');
                const activity = this.$t('view.repo.event.eventLog.modal.activity');
                const startTime = this.$t('view.repo.event.eventLog.modal.startTime');
                const endTime = this.$t('view.repo.event.eventLog.modal.endTime');
                const originator = this.$t('view.repo.event.eventLog.modal.originator');
                const resource = this.$t('view.repo.event.eventLog.modal.resource');
                const caseProperty = this.$t('view.repo.event.eventLog.modal.caseProperty');
                const eventProperty = this.$t('view.repo.event.eventLog.modal.eventProperty');
                const useTime = this.$t('view.repo.event.eventLog.modal.useTime');

                const eventCost = this.$t('view.repo.event.eventLog.modal.eventCost');
                const caseAllCost = this.$t('view.repo.event.eventLog.modal.caseAllCost');

                //const mapInHangul: any = {'ci': '케이스 아이디', 'ea': '액티비티', 
                //'es': '시작시간', 'ec': '종료시간', 'eo': '담당자', 'er': '리소스', 'cu': '케이스 속성',
                //'eu': '이벤트 속성', 'et': '운영시간', 'en': '이벤트 비용', 'cn': '케이스 총 비용'}; 
                const mapInHangul: any = {'ci': caseId, 'ea': activity, 
                  'es': startTime, 'ec': endTime, 'eo': originator, 'er': resource, 'cu': caseProperty,
                  'eu': eventProperty, 'et': endTime, 'en': eventCost, 'cn': caseAllCost}; //'et': useTime
                const times = ['es', 'ec', 'et'];
                const hangul = mapInHangul[mapped];
                const item: any = {};
                item[hangul] = column;
                this.mappingList.push( [hangul, column + (times.includes(mapped) ? ' ('+mappings[key].split('|')[1]+')' : ''), exampleData[key]] );
                    
              }
            });

            //표준 프로세스
            const attributes = data.attributes;
            const relations = (attributes["saas.relatedModels"] != undefined && attributes["saas.relatedModels"].value != null && attributes["saas.relatedModels"].value != undefined) 
                              ? Object.values(attributes["saas.relatedModels"].value) 
                              : []; //_type= "ProcessModel | Graph | GraphImpl"
                              
            const referenceModelId = (attributes["reference.model"] != undefined && attributes["reference.model"].value != undefined) 
                                      ? attributes["reference.model"].value.id 
                                      : null;

            this.processList = [];
            const processType = ["ProcessModel", "Graph", "GraphImpl"]; 
            relations.forEach((relation: any) => {
              if(processType.includes(relation._type))
              {
                const id = relation.id;
                const name = relation.name;
                const createdByName = relation.createdByName;
                const isDeployed = relation.id == referenceModelId;
                const process = {id: id, name: name, createdByName: createdByName, isDeployed: isDeployed};
                this.processList.push(process);
              }
            });

            this.isLoading = false;

        });
      
      });
      
     
    });*/
 }

 //"2021-09-30T06:52:55.109+0000"
 lastSyncedFormat(lastSynced: string) {
   //const mock = "2021-09-30T06:52:55.109+0000"

   if(lastSynced == '0000-00-00 00:00:00') return lastSynced;

   const yyyyMMdd = lastSynced.split('T')[0];
   const HHmmss = lastSynced.split('T')[1].substring(0, 8);

   return yyyyMMdd + ' ' + HHmmss;

 }

 clickProcessEdit(processId: string) {
   this.$router.push({
      name: 'ProcessEditor',
      params: {
        projectId: this.projectId,
        rgId: this.rgId,
        processId: processId
      }
    });
 }

 //분석 버튼 누를 시
 clickAnalysis() {
   const routerName = this.readOnlySetting.common.workspace.whenEventLogIsClicked;
    this.$router.push({ 
      name: routerName,
      params: {
        projectId: this.projectId,
        repositoryId: this.repositoryId
      }
    });
 }

 //모바일 닫기 버튼 누를 시
 onClickClose() {
  this.showRepositoryDetail=false;

  this.$store.commit('repository/setCardHome', {});
 }

}
</script>