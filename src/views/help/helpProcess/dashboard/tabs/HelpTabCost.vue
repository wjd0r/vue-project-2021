<template>
  <!-- 도움말 : 비용 탭 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-cost-tab">
          <div class="help-header"><h4 class="title">{{$t('view.helpTabCost.costTab')}}</h4></div>
          <div class="help-body">
            <div class="content-text" v-html="$t('view.helpTabCost.explainCostTab')">
            </div>
            <div class="content-img">
              <img src="../../../images/process/dashboard/help_dashboard_cost.jpg" alt="비용 탭 이미지">
            </div>
            <div class="content-img mt-10">
              <img src="../../../images/process/dashboard/help_dashboard_cost_02.jpg" alt="비용 탭 2 이미지">
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-cost-kpi">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabCost.kpi')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabCost.kpiName')}}</th>
                    <th>{{$t('view.helpTabCost.kpiExplain')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabCost.allCost')}}</th>
                    <td>{{$t('view.helpTabCost.explainAllCost')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabCost.caseMinCost')}}</th>
                    <td>{{$t('view.helpTabCost.explainCaseMinCost')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabCost.caseMeanCost')}}</th>
                    <td>{{$t('view.helpTabCost.explainCaseMeanCost')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabCost.caseMaxCost')}}</th>
                    <td>{{$t('view.helpTabCost.explainCaseMaxCost')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-cost-chart">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabCost.chart')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabCost.chartName')}}</th>
                    <th>{{$t('view.helpTabCost.chartExplain')}}</th>
                    <th>{{$t('view.helpTabCost.caseTable')}}</th>
                    <th>{{$t('view.helpTabCost.associatedMenu')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabCost.costOccurTop10Chart')}}</th>
                    <td v-html="$t('view.helpTabCost.explainCostOccurTop10Chart')" ></td>
                    <td>{{$t('view.helpTabCost.caseTableCostOccurTop10Chart')}}</td>
                    <td>{{$t('view.helpTabCost.associatedMenuCostOccurTop10Chart')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabCost.occurRatioByActivity')}}</th>
                    <td>{{$t('view.helpTabCost.explainOccurRatioByActivity')}}</td>
                    <td class="text-center">{{$t('view.helpTabCost.noText')}}</td>
                    <td class="text-center">{{$t('view.helpTabCost.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabCost.meanCostPerResource')}}</th>
                    <td>{{$t('view.helpTabCost.explainmeanCostPerResource')}}</td>
                    <td class="text-center">{{$t('view.helpTabCost.noText')}}</td>
                    <td>{{$t('view.helpTabCost.associatedMenuCostPerResource')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabCost.meanCostPerOriginator')}}</th>
                    <td>{{$t('view.helpTabCost.explainmeanCostPerOriginator')}}</td>
                    <td class="text-center">{{$t('view.helpTabCost.noText')}}</td>
                    <td>{{$t('view.helpTabCost.associatedMenuCostPerOriginator')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 비용 탭 -->
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
export default class HelpTabCost extends Vue {
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