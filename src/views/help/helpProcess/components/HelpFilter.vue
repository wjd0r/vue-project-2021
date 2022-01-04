<template>
  <!-- 도움말 : 분석 조건 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-process-filter-title">
          <div class="help-header"><h4 class="title">{{$t('view.helpFilter.analysisCondition')}}</h4></div>
          <div class="help-body">
            <div class="content-text-group d-flex-row">
              <div class="help-ico">
                <div class="ico ico-filter" alt="분석 조건 아이콘"></div>
              </div>
              <div class="content-text" v-html="$t('view.helpFilter.explainAnalysisCondition')">
              </div>
            </div>
            <div class="content-img">
              <img src="../../images/process/common/help_filter.jpg" alt="분석 조건 이미지">
              <div class="notice-text">{{$t('view.helpFilter.additionalExplainAnalysisCondition')}}</div>
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-process-full-attribute-info">
            <div class="help-header"><h4 class="title">{{$t('view.helpFilter.allAttrInfo')}}</h4></div>
            <div class="conhelptent-middle help-middle pt-10">
              <div class="content-text">
                <p>{{$t('view.helpFilter.explainAllAttrInfo')}}</p>
              </div>
            </div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpFilter.attrName')}}</th>
                    <th>{{$t('view.helpFilter.attrMean')}}</th>
                    <th>{{$t('view.helpFilter.attrValue')}}</th>
                    <th>{{$t('view.helpFilter.analysisMenu')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpFilter.period')}}</th>
                    <td>{{$t('view.helpFilter.dataPeriod')}}</td>
                    <td>{{$t('view.helpFilter.explainDataPeriod')}}</td>
                    <td>{{$t('view.helpFilter.allMenu')}}</td>
                  </tr>
                  <tr>
                    <th>분석 항목</th>
                    <td>{{$t('view.helpFilter.caseSpentTime')}} / {{$t('view.helpFilter.activitySpentTime')}}</td>
                    <td>
                      <p>{{$t('view.helpFilter.analysisMonthly')}} : {{$t('view.helpFilter.analysisMonthlyFlow')}} </p>
                      <p>{{$t('view.helpFilter.analysisFlow')}} : {{$t('view.helpFilter.wholeFlow')}}</p>
                    </td>
                    <td>{{$t('view.helpFilter.menuExceptDashboard')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpFilter.algorithm')}}</th>
                    <td>{{$t('view.helpFilter.algorithmApplyToData')}}</td>
                    <td>
                      <p>{{$t('view.helpFilter.explainHeuristicsMiner')}}</p> 
                      <p>{{$t('view.helpFilter.explainFuzzyMiner')}}</p>
                    </td>
                    <td>{{$t('view.helpFilter.processAnalysis')}}</td>
                  <tr>
                    <th>{{$t('view.helpFilter.activity')}}</th>
                    <td>{{$t('view.helpFilter.explainActivity')}}</td>
                    <td>
                      <p>{{$t('view.helpFilter.spentTime')}}</p>
                      <p>{{$t('view.helpFilter.occurCount')}}</p>
                      <p>{{$t('view.helpFilter.iterCount')}}</p>
                    </td>
                    <td>{{$t('view.helpFilter.processAnalysisAnimation')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpFilter.connectLine')}}</th>
                    <td>{{$t('view.helpFilter.explainConnectLine')}}</td>
                    <td>
                      <p>{{$t('view.helpFilter.spentTime')}}</p>
                      <p>{{$t('view.helpFilter.occurCount')}}</p>
                      <p>{{$t('view.helpFilter.bottleNeckCount')}} </p>
                      <p>{{$t('view.helpFilter.dependency')}}</p>
                    </td>
                    <td>{{$t('view.helpFilter.processAnalysisThreeItem')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpFilter.xAxis')}}/{{$t('view.helpFilter.yAxis')}}</th>
                    <td>{{$t('view.helpFilter.explainAxis')}}</td>
                    <td>{{$t('view.helpFilter.mappingProperties')}}</td>
                    <td>{{$t('view.helpFilter.dataAnalysis')}}, {{$t('view.helpFilter.activityAnalysis')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpFilter.typeOfValue')}}</th>
                    <td>{{$t('view.helpFilter.typeOfValueOfAxis')}}</td>
                    <td>
                      <p>{{$t('view.helpFilter.caseAndCaseCount')}}</p>
                      <p>{{$t('view.helpFilter.spentTimeAndTime')}}</p>
                      <p>{{$t('view.helpFilter.useRate')}}</p>
                    </td>
                    <td>{{$t('view.helpFilter.dataAnalysis')}}, {{$t('view.helpFilter.activityAnalysis')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

    </div>
  </div>
  <!-- 도움말 : 분석 조건 -->
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
export default class HelpFilter extends Vue {
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