<template>
  <div class="animated fadeIn main-common-component mapping-component validating-component">
    <div class="mapping-content">
      <!-- 매핑 정보 -->
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
      <!-- 매핑 정보 -->

      <!-- 매핑 유효성 검증 -->
      <div class="mapping-check-content">
        <div class="d-flex justify-content-center mb-3 validating-content" v-if="isValidating">
          <b-spinner style="width: 8rem; height: 8rem;" alt="스피너"></b-spinner>
        </div>

        <div class="d-flex justify-content-center mb-3 error-content" v-if="isError">
          <div class="ico-error" alt="에러 아이콘"></div>
        </div>

        <div class="d-flex justify-content-center mb-3 success-content" v-if="isSuccess">
          <div class="ico-success" alt="성공 아이콘"></div>
        </div>

        <div class="mapping-validating" v-if="isValidating">
          <h4 class="title text-center">{{$t('view.repo.event.mapping.testResult.isValidating')}}<!--유효성 검증 중입니다.--></h4>
          <div class="notice-text">
            <p class="text-center">{{$t('view.repo.event.mapping.testResult.wait')}}<!--잠시만 기다려 주시길 바랍니다.--></p>
          </div>
        </div>

        <div class="mapping-error" v-if="isError">
          <h4 class="title text-center error-text">{{$t('view.repo.event.mapping.testResult.recheckData')}}<!--데이터를 다시 확인해주세요--></h4>
          <div class="notice-text">
            <p class="text-center">{{$t('view.repo.event.mapping.testResult.clickRemappingBtn')}}<!--다시 만들기 버튼을 눌러주세요.--></p>
            <p class="text-center">{{$t('view.repo.event.mapping.testResult.newMappingNeeded')}}<!--새로운 매핑 작업이 필요합니다.--></p>
          </div>
        </div>

        <div class="mapping-success" v-if="isSuccess">
          <h4 class="title text-center success-text">{{$t('view.repo.event.mapping.testResult.validationCompleted')}}<!--유효성 검증을 완료하였습니다--></h4>
          <div class="notice-text">
            <p class="text-center">{{$t('view.repo.event.mapping.testResult.clickCompleteBtn')}}<!--완료 버튼을 눌러주세요.--></p>
            <p class="text-center">{{$t('view.repo.event.mapping.testResult.completeBtnNeeded')}}<!--완료 버튼을 누르셔야 매핑이 완료됩니다.--></p>
          </div>
        </div>

        <div class="validating" v-if="isValidating"></div>

        <div class="failure-error" v-if="isError">
          <b-container>
            <div class="card">
              <div class="error-list">
                <div class="colunm" v-for="result in results" :key="result.rowNumber">
                  <span style="font-weight: 600;" class="error-text">[row {{ result.rowNumber }}]</span>
                  <span v-for="child in result.children" :key="child.columnName">
                    (
                    <span style="font-weight: 500;">{{ child.columnName }}</span>
                    ="{{ child.columnValue }}"
                    <span v-if="/et/.test(mappings[child.dbColumnName])">{{$t('view.repo.event.mapping.errorResult.wrongDateFormat')}}<!--날짜 형식이 잘 못 되었습니다.--></span>
                    <span v-else-if="child.columnValue === 'null'">{{$t('view.repo.event.mapping.errorResult.noAcceptNull')}}<!--null은 허용하지 않습니다.--></span>
                    <span v-else-if="child.columnValue === ''">{{$t('view.repo.event.mapping.errorResult.noAcceptBlank')}}<!--빈 값은 허용하지 않습니다.--></span>
                    <span v-else>{{$t('view.repo.event.mapping.errorResult.thereIsError')}}<!--에 에러가 있습니다.--></span>
                    )
                  </span>
                </div>
              </div>
            </div>
          </b-container>
        </div>

        <div class="validating-success" v-if="isSuccess"></div>

        <footer class="content-footer">
          <b-button @click.prevent="remapping" v-show="isError" variant="secondary">{{ $t('view.repo.button.remapping') }}</b-button>
          <b-button @click.prevent="save()" v-show="isSuccess" variant="primary" class="right" >{{ $t('view.repo.button.complete') }}</b-button>
        </footer>
      </div>
      <!-- 매핑 유효성 검증 v-b-modal.pageSelected-->

      <!-- 모달 : 경로 선택 -->
      <b-modal v-model="pageSelected" id="pageSelected" :title="$t('view.repo.event.mapping.moveAfterTest.title')" @hide ="onHide" hide-footer>
        <b-btn-group>
          <b-button variant="primary" @click="moveToEventList()">{{$t('view.repo.event.mapping.moveAfterTest.cancel')}}</b-button>
          <b-button variant="outline-primary" @click="moveToDashboard()">{{$t('view.repo.event.mapping.moveAfterTest.dashboard')}}</b-button>
          <b-button variant="outline-primary" @click="moveToProcessDiscovery()">{{$t('view.repo.event.mapping.moveAfterTest.processAnalysis')}}</b-button>
        </b-btn-group>
      </b-modal>
      <!-- 모달 : 경로 선택 -->
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../../store';
import { AxiosError, AxiosResponse } from 'axios';

@Component({
  computed: mapGetters({
    mappings: 'repository/getMappingData',//'eventLog/getMappingData',
    repoDataView: 'repository/getRepoDataView',
  }),
})
export default class EventMappingTest extends Vue {
  isError: boolean = false;
  isValidating: boolean = true;
  isSuccess: boolean = false;

  mappings!: any;
  repoDataView!: any;

  results: any[] = [];

  totalRow: number = 0;

  eventName: string = '';
  eventDesc: string = '';
  processName: string = '';
  processId: string = '';

  pageSelected: boolean = false;

  gRespositoryId: string = null;

  created() {
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.$route.params.projectId,
      datasetId: this.$route.params.datasetId,
      page: 1,
      size: 10,
    }).then((res: AxiosResponse)=>{
      this.totalRow = res.data.data.totalElements
    });

    const eventInfo = store.getters['repository/getEventInfo'];
    this.eventName = eventInfo.eventName;
    this.eventDesc = eventInfo.eventDesc;
    this.processName = eventInfo.processName;
    this.processId = eventInfo.processId;

    this.mappingTest();
  }

  mappingTest() {

    this.$store
      .dispatch('repository/getRepoDataMappingTest', {
        projectId: this.$route.params.projectId,
        datasetId: this.$route.params.datasetId,
        repositoryName: this.eventName,
        repositoryDesc: this.eventDesc,
        mappings: this.mappings,
      })
      .then((res) => {
        const newVal = res.data.data;
        const nullCheck = newVal.results[0];
        const errorCheck = newVal.results[1];

        const nullErr = [];
        for (const attr in nullCheck) {
          if (/_err/.test(attr)) {
            if (nullCheck[attr] > 0) {
              //error
              nullErr.push({
                columnName: attr.replace('_err', ''),
                value: nullCheck[attr],
              });
            }
          }
        }

        const err = [];
        for (const attr in errorCheck) {
          if (/_err/.test(attr)) {
            //if (nullCheck[attr] > 0) {
            if (errorCheck[attr] > 0) {
              //error
              err.push({
                columnName: attr.replace('_err', ''),
                value: errorCheck[attr],
              });
            }
          }
        }

        if (nullErr.length < 1 && err.length < 1) {
          //에러 없음
          this.isError = false;
          this.isSuccess = true;
        } else {
          //에러 있음
          const keys = Object.keys(newVal.results);
          
          
          keys.forEach((i) => {
            //if (newVal.results[i].eid > -1) {
            if (i != '0' && i != '1') {
              const children: any = [];
              const items = Object.keys(newVal.results[i]);
              items.forEach((col) => {
                if (/_err/.test(col)) {
                  if (newVal.results[i][col] > 0) {
                    children.push({
                      dbColumnName: col.replace('_err', ''),
                      columnName: this.repoDataView.fields[col.replace('_err', '')],
                      columnValue: newVal.results[i][col.replace('_err', '')],
                    });
                  }
                }
              });
              this.results.push({
                rowNumber: newVal.results[i].eid,
                children: children,
              });
            }
          });

          this.isError = true;
        }
        this.isValidating = false;
      })
      .catch((err: AxiosError) => {

          const code = err.response.headers["x-ioc-code"];
          const message = err.response.headers["x-ioc-message"];

          if (code == 'IPR_ERR_403_01900201') {

            const mtitle = this.$t("view.repo.alert.title.cantCreateTitle").toString();
            const mcontent = this.$t("view.repo.alert.IPR_ERR_403_01900201").toString();

            this.$bvModal
              .msgBoxOk(mcontent, {
                title: mtitle, 
                size: 'sm',
                buttonSize: 'sm',
                centered: true,
            }).then((res: any) => {
                if(res==true) this.moveToEventList();
            });
          }
        });
  }

  remapping() {
    this.$router.push({
      name: 'eventMapping',
      params: {
        projectId: this.$route.params.projectId,
        datasetId: this.$route.params.datasetId,
      }
    });
  }

  save() {
    const relationsInput: any = {};//processId
    if(this.processId != null)
      relationsInput[this.processId] = {"_type": "GraphImpl", "id": this.processId };

    this.$store
      .dispatch('repository/getRepoDataMapping', {
        projectId: this.$route.params.projectId,
        datasetId: this.$route.params.datasetId,
        repositoryName: this.eventName,
        repositoryDesc: this.eventDesc,
        mappings: this.mappings,
      })
      .then((res: any) => {

        if(res.data.data != null){
          this.$store
          .dispatch('repository/getRepoEventSave', {
            eventId: res.data.data.id,
            eventName: this.eventName, 
            eventDesc: this.eventDesc,
            projectId: this.$route.params.projectId,
            relations: relationsInput,
          }).then((res2: any) => {
            //생성된 레포지토리 아이디
            this.gRespositoryId = res.data.data.id;
            this.pageSelected=true; 
          });
        }
      });
  }

  numberWithCommas(x: number | string): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  //대시보드로 이동
  moveToDashboard() {
    this.$router.push({
      name: 'dashboard',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.gRespositoryId,
      }
    });
  }

  //프로세스 분석으로 이동
  moveToProcessDiscovery() {
    this.$router.push({
      name: 'processDiscovery',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.gRespositoryId,
      }
    });
  }

  //취소(이벤트목록으로 이동)
  moveToEventList() {
    this.$router.push({
      name: 'eventList',
    });
  }

  onHide(evt: any) { 
    if(evt.trigger === "backdrop"){ 
      evt.preventDefault(); 
    } 
  }

}
</script>
