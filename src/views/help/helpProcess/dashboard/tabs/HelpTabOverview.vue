<template>
  <!-- 도움말 : 데이터 요약 탭 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-data-summary-tab">
          <div class="help-header"><h4 class="title">{{$t('view.helpTabOverview.dataSummaryTab')}}</h4></div>
          <div class="help-body">
            <div class="content-text">
              <p>{{$t('view.helpTabOverview.dataflow')}}</p>
            </div>
            <div class="content-img-group">
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_default.jpg" alt="데이터 요약 탭 이미지 1">
              </div>
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_default_02.jpg" alt="데이터 요약 탭 이미지 2">
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-data-summary-kpi">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabOverview.kpi')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabOverview.kpiName')}}</th>
                    <th>{{$t('view.helpTabOverview.kpiExplain')}}</th>
                    <th>{{$t('view.helpTabOverview.caseTable')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabOverview.caseCount')}}</th>
                    <td>{{$t('view.helpTabOverview.explainCaseCount')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.eventCount')}}</th>
                    <td>{{$t('view.helpTabOverview.explainEventCount')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.startTime')}}</th>
                    <td>{{$t('view.helpTabOverview.explainStartTime')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.endTime')}}</th>
                    <td>{{$t('view.helpTabOverview.explainEndTime')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.successRate')}}</th>
                    <td v-html="$t('view.helpTabOverview.explainSuccessRate')"></td>
                    <td>{{$t('view.helpTabOverview.caseTableSuccessRate')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-data-summary-chart">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabOverview.chart')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabOverview.chartName')}}</th>
                    <th>{{$t('view.helpTabOverview.explainChart')}}</th>
                    <th>{{$t('view.helpTabOverview.caseTable')}}</th>
                    <th>{{$t('view.helpTabOverview.associatedMenu')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabOverview.caseSpentTime')}}</th>
                    <td v-html="$t('view.helpTabOverview.explainCaseSpentTime')"></td>
                    <td>{{$t('view.helpTabOverview.caseTableCaseSpentTime')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.averageSpendChart')}}</th>
                    <td v-html="$t('view.helpTabOverview.explainAverageSpendChart')"></td>
                    <td>{{$t('view.helpTabOverview.caseTableAverageSpendChart')}}</td>
                    <td v-html="$t('view.helpTabOverview.associatedMenuAverageSpendChart')"></td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.spentTimeTop10')}}</th>
                    <td v-html="$t('view.helpTabOverview.explainSpentTimeTop10')"></td>
                    <td>{{$t('view.helpTabOverview.caseTableSpentTimeTop10')}}</td>
                    <td>{{$t('view.helpTabOverview.associatedMenuSpentTimeTop10')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.bottleNeckState')}}</th>
                    <td v-html="$t('view.helpTabOverview.explainBottleNeckState')"></td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOverview.monthlyCaseCount')}}</th>
                    <td>
                      <p>{{$t('view.helpTabOverview.checkCaseCountForMonth')}}</p>
                    </td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                    <td class="text-center">{{$t('view.helpTabOverview.noText')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 데이터 요약 탭 -->
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
export default class HelpTabOverview extends Vue {
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