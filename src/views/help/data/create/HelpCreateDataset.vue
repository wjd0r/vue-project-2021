<template>
  <!-- 도움말 : 데이터셋 생성하기 -->
  <div class="help-content">
    <div class="content-header"><h3 class="title">{{$t('view.helpCreateDataSet.makeDataforProcessMining')}}</h3></div>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help">
            <section id="help-original-dataset-is">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateDataSet.originalDataIs')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateDataSet.getDatawhenProcessMining')">
                </div>
              </div>
            </section>
          </div>

          <div class="help">
            <section id="help-datasetcreateform">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateDataSet.createOriginalData')}}</h4></div>
              <div class="help-body">
                <div class="content-img">
                  <img src="../../images/data/create/help_create_dataset_01.jpg" alt="데이터 생성 과정 이미지">
                </div>
                <div class="content-text" v-html="$t('view.helpCreateDataSet.explainForDBConnect')">

                </div>
              </div>
            </section>
          </div>

          <div class="help-sub-group">
            <div class="help" >
              <section id="help-fill-data-info">
                <div class="help-header"><h4 class="title">{{$t('view.helpCreateDataSet.enterDataInfo')}}</h4></div>
                <div class="help-body">
                  <div class="content-text pt-10">
                    <p>{{$t('view.helpCreateDataSet.gradeForEnterInfo')}}</p>
                  </div>
                </div>
              </section>
            </div>

            <div class="help help-sub" >
              <section id="help-fill-info">
                <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateDataSet.enterInfo')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpCreateDataSet.explainWhenEnterInfo')">
                  </div>
                  <div class="content-img">
                  <img src="../../images/data/create/help_create_dataset_05.jpg" alt="데이터 생성 정보 입력 이미지">
                  </div>
                  <!-- <div class="content-text" v-html="$t('view.helpCreateDataSet.explainIfCompleteCreate')"></div> -->
                </div>
              </section>
            </div>
            

            <div class="help help-sub">
              <section id="help-file-upload">
                <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateDataSet.uploadFile')}}</h4></div>
                <div class="help-middle">
                  <div class="content-text">
                    <p>{{$t('view.helpCreateDataSet.typeOfFile')}}</p>
                  </div>
                  <div class="content-img">
                    <img style="width: auto;" src="../../images/data/create/help_create_dataset_02.jpg" alt="데이터 생성 중 파일 업로드의 파일 업로드 이미지">
                  </div>
                </div>
                <div class="help-body overflow-x help-table-body">
                  <table class="table line">
                    <thead>
                      <tr>
                        <th>{{$t('view.helpCreateDataSet.attrName')}}</th>
                        <th>{{$t('view.helpCreateDataSet.attrMean')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpCreateDataSet.lineShowTitle')}}</th>
                        <td>{{$t('view.helpCreateDataSet.explainColumn')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateDataSet.sepChar')}}</th>
                        <td>{{$t('view.helpCreateDataSet.explianSepChar')}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help help-sub">
              <section id="help-connect-db">
                <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateDataSet.connectDb')}}</h4></div>
                <div class="help-middle">
                  <div class="content-text" v-html="$t('view.helpCreateDataSet.explainConnectDb')">
                  </div>
                  <div class="content-img mb-10">
                    <img style="width: auto;" src="../../images/data/create/help_create_dataset_04.jpg" alt="데이터 생성 중 데이터베이스 연결 - 가져오기 이미지">
                  </div>
                  <div class="content-img">
                    <img style="width: auto;" src="../../images/data/create/help_create_dataset_03.jpg" alt="데이터 생성 중 데이터베이스 연결 - 직접입력 이미지">
                  </div>
                </div>
                <div class="help-body overflow-x help-table-body">
                  <table class="table line">
                    <thead>
                      <tr>
                        <th>{{$t('view.helpCreateDataSet.attrName')}}</th>
                        <th>{{$t('view.helpCreateDataSet.attrMean')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpCreateDataSet.bringDb')}}</th>
                        <td>{{$t('view.helpCreateDataSet.explainBringDb')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateDataSet.typeDirect')}}</th>
                        <td v-html="$t('view.helpCreateDataSet.explainDbConnect')">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help help-sub">
              <section id="help-datasetpreview">
                <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateDataSet.selectComlumType')}}</h4></div>
                <div class="help-body">
                  <div class="content-text">
                    <p v-html="$t('view.helpCreateDataSet.explainSelectColumnType')"></p>
                  </div>
                  <div class="content-img">
                    <img style="width: auto;" src="../../images/data/create/help_create_dataset_type.jpg" alt="컬럼 타입 선택 이미지">
                  </div>
                </div>
              </section>
            </div>

            <div class="help help-sub">
              <section id="help-datasetdataimporting">
                <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateDataSet.uploadData')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpCreateDataSet.explainUploadData')">

                  </div>
                  <div class="content-img">
                    <img style="width: auto;" src="../../images/data/create/help_create_importing.jpg" alt="데이터 불러오는 중 이미지">
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div class="help">
            <section id="help-datasetnextstep">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateDataSet.completeCreateOriginalData')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateDataSet.explainCompleteCreateOriginalData')">
                </div>
                <div class="content-img">
                  <img style="width: auto;" src="../../images/data/create/help_create_importing_02.jpg" alt="데이터셋 생성 완료 이미지">
                </div>
              </div>
            </section>
          </div>

          <!-- <div class="help">
            <section id="help-datasetmappingselect">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateDataSet.dataMapping')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateDataSet.explainDataMapping')">
                </div>
                <div class="content-img">
                  <img style="width: auto;" src="../../images/data/create/help_next_01.jpg" alt="이벤트 생성하기 이미지">
                </div>
              </div>
            </section>
          </div> -->

          <!-- <div class="help">
            <section id="help-datasetcreatecomplete">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateDataSet.complete')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateDataSet.explainComplete')">
                </div>
                <div class="content-img">
                  <img style="width: auto;" src="../../images/data/create/help_next_02.jpg" alt="데이터셋 생성 최종 완료 다음 이미지">
                </div>
              </div>
            </section>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {
  },
  computed: mapGetters({}),
})
export default class HelpCreateDataset extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰,는 hook은 지울 것) */
  /* 메소드 선언 */
}
</script>