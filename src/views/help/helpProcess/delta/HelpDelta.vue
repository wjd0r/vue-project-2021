<template>
  <!-- 도움말 : 프로세스 비교 -->
  <div class="help-content help-common">
    <section id="help-deltaanalysis">
      <div class="content-header"><h3 class="title">{{$t('view.helpDelta.processDelta')}}</h3></div>
      <div class="content-middle">
        <div class="content-text" v-html="$t('view.helpDelta.explainProcessDelta')">
        </div>
      </div>
    </section>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help-sub-group">
            <div class="help">
              <section id="help-delta-analysis-filter-title-properties">
                <div class="help-header"><h4 class="title">{{$t('view.helpDelta.analysisConditionAttr')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="100px">{{$t('view.helpDelta.attrName')}}</th>
                        <th>{{$t('view.helpDelta.attrValue')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpDelta.wayToSee')}}</th>
                        <td v-html="$t('view.helpDelta.explainWayToSee')">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-delta-analysis-two-view">
                <div class="help-header"><h4 class="title">{{$t('view.helpDelta.splitView')}}</h4></div>
                <div class="help-body">
                  <div class="content-text">
                  <p>{{$t('view.helpDelta.explainSplitView')}}</p>
                  </div>
                  <div class="content-img">
                    <img src="../../images/process/help_delta.jpg" alt="프로세스 비교 중 나눠서 보기 화면 이미지">
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-delta-analysis-merged">
                <div class="help-header"><h4 class="title">{{$t('view.helpDelta.combineView')}}</h4></div>
                <div class="help-body pt-10">
                  <div class="content-img">
                    <img src="../../images/process/help_delta_02.jpg" alt="프로세스 비교 중 합쳐서 보기 화면 이미지">
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-delta-analysis-vairant-title">
                <div class="help-header"><h4 class="title">{{$t('view.helpDelta.analysisList')}}</h4></div>
                <div class="help-body">
                  <div class="content-text">
                    <p>{{$t('view.helpDelta.explainAnalysisList')}}</p>
                  </div>
                  <div class="content-img">
                    <img src="../../images/process/help_delta_variant.jpg" alt="프로세스 비교 분석목록 이미지">
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-label-kpi-is">
                <div class="help-header"><h4 class="title">{{$t('view.helpDelta.mutualSuitability')}}</h4></div>
                <div class="help-body">
                  <div class="content-text">
                    <p>{{$t('view.helpDelta.explainMutualSuitability')}}</p>
                  </div>
                  <div class="content-img">
                    <img src="../../images/process/help_delta_info.jpg" alt="프로세스 비교 분석목록 이미지">
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-delta-analysis-icon">
                <div class="help-header"><h4 class="title">{{$t('view.helpDelta.icon')}}</h4></div>
                <div class="help-body">
                  <div class="content-body overflow-x">
                    <table class="table line help-table-body">
                      <thead>
                        <tr>
                          <th width="80px">{{$t('view.helpDelta.icon')}}</th>
                          <th>{{$t('view.helpDelta.iconName')}}</th>
                          <th>{{$t('view.helpDelta.iconExplain')}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="ico-map-hide m-auto" alt="미니맵 숨기기 아이콘"></div>
                            <div class="ico-map-show m-auto" alt="미니맵 보이기 아이콘"></div>
                          </td>
                          <td>{{$t('view.helpDelta.seeOrHideMiniMap')}}</td>
                          <td>
                            <p>{{$t('view.helpDelta.explainSeeOrHideMiniMap')}}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 프로세스 비교 -->
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
export default class HelpDelta extends Vue {
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