<template>
  <!-- 도움말 : 액티비티 탭 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-activity-tab">
          <div class="help-header"><h4 class="title">{{$t('view.helpTabActivity.activityTab')}}</h4></div>
          <div class="help-body">
            <div class="content-text">
              <p>{{$t('view.helpTabActivity.explainActivityTab')}}</p>
            </div>
            <div class="content-img-group">
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_activity.jpg" alt="액티비티 탭 이미지 1">
              </div>
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_activity_02.jpg" alt="액티비티 탭 이미지 2">
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-activity-kpi">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabActivity.kpi')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabActivity.kpiName')}}</th>
                    <th>{{$t('view.helpTabActivity.kpiExplain')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabActivity.activityCount')}}</th>
                    <td>{{$t('view.helpTabActivity.explainActivityCount')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabActivity.minActivityCount')}}</th>
                    <td>{{$t('view.helpTabActivity.explainMinActivityCount')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabActivity.meanActivityCountByCase')}}</th>
                    <td>{{$t('view.helpTabActivity.explainMeanActivityCountByCase')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabActivity.maxActivityCount')}}</th>
                    <td>{{$t('view.helpTabActivity.explainMaxActivityCount')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-activity-chart">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabActivity.chart')}}</h4></div>
              <div class="help-body overflow-x">
                <table class="table line help-table-body">
                  <thead>
                    <tr>
                      <th width="100px">{{$t('view.helpTabActivity.chartName')}}</th>
                      <th>{{$t('view.helpTabActivity.chartExplain')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{{$t('view.helpTabActivity.occurCount')}}</th>
                      <td>
                        <p>{{$t('view.helpTabActivity.explainOccurCount')}}</p>
                      </td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabActivity.spentTimeByActivity')}}</th>
                      <td v-html="$t('view.helpTabActivity.explainSpentTimeByActivity')">
                      </td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabActivity.activityFlow')}}</th>
                      <td v-html="$t('view.helpTabActivity.explainActivityFlow')">
                      </td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabActivity.startActivityRatio')}}</th>
                      <td v-html="$t('view.helpTabActivity.explainStartActivityRatio')">
                      </td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabActivity.endActivityRatio')}}</th>
                      <td v-html="$t('view.helpTabActivity.explainEndActivityRatio')">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 액티비티 탭 -->
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
export default class HelpTabActivity extends Vue {
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