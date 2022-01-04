<template>
  <!-- 도움말 : 담당자 탭 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-originator-tab">
          <div class="help-header"><h4 class="title">{{$t('view.helpTabOriginator.originatorTab')}}</h4></div>
          <div class="help-body">
            <div class="content-text" v-html="$t('view.helpTabOriginator.explainOriginatorTab')">
            </div>
            <div class="content-img-group">
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_originator.jpg" alt="담당자 탭 이미지 1">
              </div>
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_originator_02.jpg" alt="담당자 탭 이미지 2">
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-originator-kpi">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabOriginator.kpi')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.kpiName')}}</th>
                    <th>{{$t('view.helpTabOriginator.kpiExplain')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th width="100px">{{$t('view.helpTabOriginator.originatorCount')}}</th>
                    <td>{{$t('view.helpTabOriginator.explainOriginatorCount')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.minOriginatorCountByCase')}}</th>
                    <td>{{$t('view.helpTabOriginator.explainMinOriginatorCountByCase')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.meanOriginatorCountByCase')}}</th>
                    <td>{{$t('view.helpTabOriginator.explainMeanOriginatorCountByCase')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.maxOriginatorCountByCase')}}</th>
                    <td>{{$t('view.helpTabOriginator.explainMaxOriginatorCountByCase')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-originator-chart">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabOriginator.chart')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabOriginator.chartName')}}</th>
                    <th>{{$t('view.helpTabOriginator.chartExplain')}}</th>
                    <th>{{$t('view.helpTabOriginator.caseTable')}}</th>
                    <th>{{$t('view.helpTabOriginator.associatedMenu')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.originatorByActivity')}}</th>
                    <td>{{$t('view.helpTabOriginator.explainOriginatorByActivity')}}</td>
                    <td class="text-center">{{$t('view.helpTabOriginator.noText')}}</td>
                    <td>{{$t('view.helpTabOriginator.associatedMenuOriginatorByActivity')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.ratioSpendTimeOnOriginatorCount')}}</th>
                    <td v-html="$t('view.helpTabOriginator.expalinRatioSpendTimeOnOriginatorCount')"></td>
                    <td>{{$t('view.helpTabOriginator.caseTableRatioSpendTimeOnOriginatorCount')}}</td>
                    <td class="text-center">{{$t('view.helpTabOriginator.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.occurCountByOriginator')}}</th>
                    <td>{{$t('view.helpTabOriginator.explainOccurCountByOriginator')}}</td>
                    <td class="text-center">{{$t('view.helpTabOriginator.noText')}}</td>
                    <td class="text-center">{{$t('view.helpTabOriginator.noText')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabOriginator.meanSpentTimeOnOriginator')}}</th>
                    <td v-html="$t('view.helpTabOriginator.meanSpentTimeOnOriginator')"></td>
                    <td class="text-center">{{$t('view.helpTabOriginator.noText')}}</td>
                    <td class="text-center">{{$t('view.helpTabOriginator.noText')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 담당자 탭 -->
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
export default class HelpTabOriginator extends Vue {
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