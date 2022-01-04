<template>
  <!-- 도움말 : 사이트 맵 -->
  <div class="help-content sitemap-component">
    <div class="content-header"><h3 class="title">{{$t('view.siteMap.siteMap')}}</h3></div>
    <div class="content-body sitemap-content">
      <!-- 알림창 -->
      <div class="sidemap">
        <div class="nav d-flex-col">
          <div class="nav-header">{{$t('view.sidebar.notiwindow')}}</div>
          <div class="nav-main">
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.notiwindow')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.readyExecute')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.executing')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.complete')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.fail')}}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 알림창 -->

      <!-- 데이터 생성하기 -->
      <div class="sidemap">
        <div class="nav d-flex-col">
          <div class="nav-header">{{$t('view.sidebar.createData')}}</div>
          <div class="nav-main d-flex-row">
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.originalDataIs')}}</div>
              </a>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.createOriginalData')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.enterDataInfo')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.enterInfo')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.uploadFile')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.connectDb')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.uploadData')}}</div>
                  </a>
                </div>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.completeCreateOriginalData')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.dataMapping')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.complete')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.eventIs')}}</div>
              </a>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.createEvent')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.enterEventInfo')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.standardList')}}</div>
                  </a>
                </div>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.dataMapping')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.mappingIs')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.failMapping')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.successMapping')}}</div>
                  </a>
                </div>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.completeEventCreate')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.standardProcessIs')}}</div>
              </a>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.createStandard')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.applyRealData')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.createStandardProcess')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.editFunction')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.editConnectingNode')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.editNode')}}</div>
                  </a>
                </div>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.createDataSource')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.createConnection')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.settingDataSync')}}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 데이터 생성하기 -->

      <!-- 데이터 관리하기 -->
      <div class="sidemap">
        <div class="nav d-flex-col">
          <div class="nav-header">{{$t('view.sidebar.manageData')}}</div>
          <div class="nav-main">
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.workspace')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.workspaceIs')}}</div>
                </a>
              </div>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.home')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.dataKpi')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.bookmark')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.recentList')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.eventInfo')}}</div>
                  </a>
                </div>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.sampleList')}}</div>
                </a>
              </div>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.standardProcess')}}</div>
              </a>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.datasource')}}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 데이터 생성하기 -->

      <!-- 프로세스 분석하기 -->
      <div class="sidemap">
        <div class="nav d-flex-col">
          <div class="nav-header">{{$t('view.sidebar.inspectProcess')}}</div>
          <div class="nav-main d-flex-row">
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.processCommon')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisCondition')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.allAttrInfo')}}</div>
                  </a>
                </div>
              </div>

              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.varList')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.processGroupIs')}}</div>
                  </a>
                </div>
              </div>

              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.table')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.includedMenu')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.caseList')}}</div>
                  </a>
                  <div class="nav-sub">
                    <a class="nav-link">
                      <div class="nav-title">{{$t('view.sidebar.detailList')}}</div>
                    </a>
                  </div>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.bottleNeckSectionList')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.repeatActivityList')}}</div>
                  </a>
                </div>
              </div>
            </div>
            
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.dataSummary')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.dataSummaryTab')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.activityTab')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.resourceTab')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.originatorTab')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.costTab')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.personalTab')}}</div>
                </a>
              </div>
            </div>

            
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.processDiscovery')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.icon')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.simpleOrComplex')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.processDelta')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.splitView')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.combineView')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisList')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.mutualSuitability')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.icon')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.processAnimation')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.icon')}}</div>
                </a>
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.playBar')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.controlSpeed')}}</div>
                  </a>
                  <a class="nav-link">
                    <div class="nav-title">{{$t('view.sidebar.setDate')}}</div>
                  </a>
                </div>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.resourceRelationAnalysis')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.dataAnalysis')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.activityAnalysis')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.processFlowAnalysis')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link">
                  <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 프로세스 분석하기 -->

      <!-- 설정하기 -->
      <div class="sidemap">
        <div class="nav d-flex-col">
          <div class="nav-header">{{$t('view.sidebar.support')}}</div>
          <div class="nav-main d-flex-row">
            <div class="nav-item">
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.supportDevice')}}</div>
              </a>
              <a class="nav-link">
                <div class="nav-title">{{$t('view.sidebar.supportBrowser')}}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 설정하기 -->
    </div>
  </div>
  <!-- 도움말 : 사이트 맵 -->
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
export default class SiteMap extends Vue {
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