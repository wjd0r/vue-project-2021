<template>
  <!-- 도움말 : 리소스 탭 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-resource-tab">
          <div class="help-header"><h4 class="title">{{$t('view.helpTabResource.resourceTab')}}</h4></div>
          <div class="help-body">
            <div class="content-text" v-html="$t('view.helpTabResource.explainResourceTab')">
            </div>
            <div class="content-img-group">
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_resource.jpg" alt="리소스 탭 이미지 1">
              </div>
              <div class="content-img">
                <img src="../../../images/process/dashboard/help_dashboard_resource_02.jpg" alt="리소스 탭 이미지 2">
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-resource-kpi">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabResource.kpi')}}</h4></div>
            <div class="help-body overflow-x">
              <table class="table line help-table-body">
                <thead>
                  <tr>
                    <th width="100px">{{$t('view.helpTabResource.kpiName')}}</th>
                    <th>{{$t('view.helpTabResource.kpiExplain')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{$t('view.helpTabResource.allResourceCount')}}</th>
                    <td>{{$t('view.helpTabResource.explainAllResourceCount')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabResource.resourceCountByCase')}}</th>
                    <td>{{$t('view.helpTabResource.explainResourceCountByCase')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabResource.meanResourceCountByCase')}}</th>
                    <td>{{$t('view.helpTabResource.explainMeanResourceCountByCase')}}</td>
                  </tr>
                  <tr>
                    <th>{{$t('view.helpTabResource.maxResourceCountByCase')}}</th>
                    <td>{{$t('view.helpTabResource.explainMaxResourceCountByCase')}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-resource-chart">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabResource.chart')}}</h4></div>
              <div class="help-body overflow-x">
                <table class="table line help-table-body">
                  <thead>
                    <tr>
                      <th width="100px">{{$t('view.helpTabResource.chartName')}}</th>
                      <th>{{$t('view.helpTabResource.chartExplain')}}</th>
                      <th>{{$t('view.helpTabResource.caseTable')}}</th>
                      <th>{{$t('view.helpTabResource.associatedMenu')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{{$t('view.helpTabResource.resourceByActivity')}}</th>
                      <td>{{$t('view.helpTabResource.explainResourceByActivity')}}</td>
                      <td class="text-center">{{$t('view.helpTabResource.noText')}}</td>
                      <td>{{$t('view.helpTabResource.associatedMenuResourceByActivity')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabResource.ratioSpendTimeOnResourceCount')}}</th>
                      <td v-html="$t('view.helpTabResource.explainRatioSpendTimeOnResourceCount')"></td>
                      <td>{{$t('view.helpTabResource.caseTableRatioSpendTimeOnResourceCount')}}</td>
                      <td class="text-center">{{$t('view.helpTabResource.noText')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabResource.occurCountByResource')}}</th>
                      <td>{{$t('view.helpTabResource.explainOccurCountByResource')}}</td>
                      <td class="text-center">{{$t('view.helpTabResource.noText')}}</td>
                      <td class="text-center">{{$t('view.helpTabResource.noText')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabResource.meanSpentTimeOnResource')}}</th>
                      <td v-html="$t('view.helpTabResource.explainMeanSpentTimeOnResource')"></td>
                      <td class="text-center">{{$t('view.helpTabResource.noText')}}</td>
                      <td class="text-center">{{$t('view.helpTabResource.noText')}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 리소스 탭 -->
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
export default class HelpTabResource extends Vue {
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