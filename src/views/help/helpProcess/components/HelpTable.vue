<template>
  <!-- 도움말 : 테이블(케이스, 병목, 반복) -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-filtered-event-data-list">
          <div class="help-header"><h4 class="title">{{$t('view.helpTable.table')}}</h4></div>
          <div class="help-middle">
            <div class="content-text" v-html="$t('view.helpTable.explainTable')">
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-included-menu">
            <div class="help-header"><h4 class="title">{{$t('view.helpTable.includedMenu')}}</h4></div>
            <div class="help-body overflow-x" >
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="300px">{{$t('view.helpTable.analysisMenuName')}}</th>
                    <th>{{$t('view.helpTable.caseList')}}</th>
                    <th>{{$t('view.helpTable.bottleNeckSectionList')}}</th>
                    <th>{{$t('view.helpTable.repeatActivityList')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTable.dataSummary')}}</th>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.processAnalysis')}}</th>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.processDelta')}}</th>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.processAnimation')}}</th>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.resourceRelationAnalysis')}}</th>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.dataManage')}}</th>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.activityAnalysis')}}</th>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTable.ganttChart')}}</th>
                    <td class="active">{{$t('view.helpTable.o')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                    <td>{{$t('view.helpTable.x')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-filtered-data-case-list">
            <div class="help-header"><h4 class="title">{{$t('view.helpTable.caseList')}}</h4></div>
            <div class="help-body">
              <div class="content-text-group d-flex-row">
                <div class="help-ico">
                  <div class="ico ico-table" alt="케이스 목록 아이콘"></div>
                </div>
                <div class="content-text" v-html="$t('view.helpTable.explainCaseList')">
                </div>
              </div>
              <div class="content-img">
                <img src="../../images/process/common/help_case_table.jpg" alt="케이스 목록 이미지">
              </div>
            </div>
          </section>

          <div class="help">
            <section id="help-filtered-data-case-detail">
              <div class="help-sub-header"><h4 class="title">{{$t('view.helpTable.detailList')}}</h4></div>
              <div class="help-body pl-10">
                <div class="content-text" v-html="$t('view.helpTable.explainDetailList')">
                </div>
                <div class="content-img">
                  <img src="../../images/process/common/help_case_detail.jpg" alt="케이스 디테일 목록 이미지">
                </div>
              </div>
            </section>
          </div>
        </div>

        <div class="help">
          <section id="help-list-of-bottlenecks">
            <div class="help-header"><h4 class="title">{{$t('view.helpTable.bottleNeckSectionList')}}</h4></div>
            <div class="help-body">
              <div class="content-text-group d-flex-row">
                <div class="help-ico">
                  <div class="ico ico-bottleneck" alt="병목 구간 목록 아이콘"></div>
                </div>
                <div class="content-text" v-html="$t('view.helpTable.explainBottleNeckSectionList')"></div>
              </div>
              <div class="content-img">
                <img src="../../images/process/common/help_bottleneck.jpg" alt="분석 조건 이미지">
              </div>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-repeated-activity-list">
            <div class="help-header"><h4 class="title">{{$t('view.helpTable.repeatActivityList')}}</h4></div>
            <div class="help-body">
              <div class="content-text-group d-flex-row">
                <div class="help-ico">
                  <div class="ico ico-rework" alt="반복 액티비티 목록  아이콘"></div>
                </div>
                <div class="content-text"  v-html="$t('view.helpTable.expalinRepeatActivityList')"></div>
              </div>
              <div class="content-img">
                <img src="../../images/process/common/help_rework.jpg" alt="분석 조건 이미지">
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  </div>
  <!-- 도움말 : 테이블(케이스, 병목, 반복) -->
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
export default class HelpTable extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 메소드 선언 */
}
</script>