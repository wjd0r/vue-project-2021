<template>
  <!-- help : sidebar -->
  <div class="sidebar-component help-sidebar" id="HelpSidebar">
    <div class="sidebar-content">
      <div class="nav">
        <div class="nav-menu">
          <!-- 알림창 -->
          <div class="nav-item">
            <div class="nav-header">{{$t('view.sidebar.notiwindow')}}</div>
              <a class="nav-link" href="#help-alarm-window">
                <div class="nav-title">{{$t('view.sidebar.notiwindow')}}</div>
              </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-alarm-prepare-process">
                <div class="nav-title">{{$t('view.sidebar.readyExecute')}}</div>
              </a>
              <a class="nav-link" href="#help-alarm-processing">
                <div class="nav-title" >{{$t('view.sidebar.executing')}}</div>
              </a>
              <a class="nav-link" href="#help-alarm-done">
                <div class="nav-title">{{$t('view.sidebar.complete')}}</div>
              </a>
              <a class="nav-link" href="#help-alarm-fail">
                <div class="nav-title">{{$t('view.sidebar.fail')}}</div>
              </a>
            </div>
          </div>
          <!-- 알림창 -->
          <!-- 데이터 생성하기 -->
          <div class="nav-item">
            <div class="nav-header">{{$t('view.sidebar.createData')}}</div>
            <a class="nav-link" id="nav-help-original-dataset-is" href="#help-original-dataset-is">
              <div class="nav-title">{{$t('view.sidebar.originalDataIs')}}</div>
            </a>
            <a class="nav-link" id="nav-help-datasetcreateform" href="#help-datasetcreateform">
              <div class="nav-title">{{$t('view.sidebar.createOriginalData')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" id="nav-help-fill-data-info" href="#help-fill-data-info">
                <div class="nav-title" >{{$t('view.sidebar.enterDataInfo')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" id="nav-help-fill-info" href="#help-fill-info">
                  <div class="nav-title">{{$t('view.sidebar.enterInfo')}}</div>
                </a>
                <a class="nav-link" href="#help-file-upload">
                  <div class="nav-title">{{$t('view.sidebar.uploadFile')}}</div>
                </a>
                <a class="nav-link" href="#help-connect-db">
                  <div class="nav-title">{{$t('view.sidebar.connectDb')}}</div>
                </a>
                <a class="nav-link" href="#help-datasetpreview">
                  <div class="nav-title">{{$t('view.sidebar.selectColumnType')}}</div>
                </a>
                <a class="nav-link" id="nav-help-datasetdataimporting" href="#help-datasetdataimporting">
                  <div class="nav-title">{{$t('view.sidebar.uploadData')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-datasetnextstep">
                <div class="nav-title">{{$t('view.sidebar.completeCreateOriginalData')}}</div>
              </a>
              <!-- <a class="nav-link" id="nav-help-datasetmappingselect" href="#help-datasetmappingselect">
                <div class="nav-title">{{$t('view.sidebar.dataMapping')}}</div>
              </a> -->
              <!-- <a class="nav-link" id="nav-help-datasetcreatecomplete" href="#help-datasetcreatecomplete">
                <div class="nav-title">{{$t('view.sidebar.complete')}}</div>
              </a> -->
            </div>
            <a class="nav-link" id="nav-help-data-filter" href="#help-datasetfiltercreateform">
              <div class="nav-title">{{$t('view.sidebar.dataFilter')}}</div>
            </a>
            
            <b-dropdown-divider></b-dropdown-divider>

            <a class="nav-link" id="nav-help-repository-data-is" href="#help-repository-data-is">
              <div class="nav-title">{{$t('view.sidebar.eventIs')}}</div>
            </a>
            <a class="nav-link" id="nav-help-repositorycreateform" href="#help-repositorycreateform">
              <div class="nav-title">{{$t('view.sidebar.createEvent')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-fill-event-info">
                <div class="nav-title">{{$t('view.sidebar.enterEventInfo')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-standard-process-list">
                  <div class="nav-title">{{$t('view.sidebar.standardList')}}</div>
                </a>
              </div>
              <a class="nav-link" id="nav-help-repositorymappingselect" href="#help-repositorymappingselect">
                <div class="nav-title">{{$t('view.sidebar.dataMapping')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-repository-mapping-is">
                  <div class="nav-title">{{$t('view.sidebar.mappingIs')}}</div>
                </a>
                <a class="nav-link" href="#help-mapping-properties">
                  <div class="nav-title">{{$t('view.sidebar.mappingAttr')}}</div>
                </a>
                <a class="nav-link" href="#help-fail-mapping">
                  <div class="nav-title">{{$t('view.sidebar.failMapping')}}</div>
                </a>
                <!-- <a class="nav-link"  id="nav-help-repositorymappingcheck" href="#help-repositorymappingcheck">
                  <div class="nav-title">{{$t('view.sidebar.successMapping')}}</div>
                </a> -->
              </div>
              <a class="nav-link" id="nav-help-repositorycreatecomplete" href="#help-repositorycreatecomplete">
                <div class="nav-title">{{$t('view.sidebar.completeEventCreate')}}</div>
              </a>
            </div>
            <a class="nav-link" id="nav-help-event-filter" href="#help-subrepositorycreateform">
              <div class="nav-title">{{$t('view.sidebar.eventFilter')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" id="nav-help-duration-filter" href="#help-duration-filter">
                <div class="nav-title">{{$t('view.sidebar.durationfilter')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" id="nav-help-case-inclusion-criteria" href="#help-case-inclusion-criteria">
                  <div class="nav-title">{{$t('view.sidebar.caseInclusionCriteria')}}</div>
                </a>
              </div>
              <a class="nav-link" id="nav-help-start-end-activity-filter" href="#help-start-end-activity-filter">
                <div class="nav-title">{{$t('view.sidebar.startEndActivityFilter')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" id="nav-help-start-activity" href="#help-start-activity">
                  <div class="nav-title">{{$t('view.sidebar.startActivity')}}</div>
                </a>
                <a class="nav-link" id="nav-help-end-activity" href="#help-end-activity">
                  <div class="nav-title">{{$t('view.sidebar.endActivity')}}</div>
                </a>
              </div>
              <a class="nav-link" id="nav-help-attribute-filter" href="#help-attribute-filter">
                <div class="nav-title">{{$t('view.sidebar.attributeFilter')}}</div>
              </a>
              <a class="nav-link" id="nav-help-variant-filter" href="#help-variant-filter">
                <div class="nav-title">{{$t('view.sidebar.variantFilter')}}</div>
              </a>
              <a class="nav-link" id="nav-filter-condition-preview" href="#help-subrepositoryfiltering">
                <div class="nav-title">{{$t('view.sidebar.eventConditionPriview')}}</div>
              </a>
            </div>

            <b-dropdown-divider></b-dropdown-divider>
            <a class="nav-link" href="#help-standard-process-is">
              <div class="nav-title">{{$t('view.sidebar.standardProcessIs')}}</div>
            </a>
            <a class="nav-link" id="nav-help-standardcreateform" href="#help-standardcreateform">
              <div class="nav-title">{{$t('view.sidebar.createStandard')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-apply-to-real-data">
                <div class="nav-title">{{$t('view.sidebar.applyRealData')}}</div>
              </a>
              <a class="nav-link" id="nav-help-processeditor" href="#help-processeditor">
                <div class="nav-title">{{$t('view.sidebar.createStandardProcess')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-editing-function">
                  <div class="nav-title">{{$t('view.sidebar.editFunction')}}</div>
                </a>
                <a class="nav-link" href="#help-edit-connection-line">
                  <div class="nav-title">{{$t('view.sidebar.editConnectingNode')}}</div>
                </a>
                <a class="nav-link" href="#help-edit-node">
                  <div class="nav-title">{{$t('view.sidebar.editNode')}}</div>
                </a>
              </div>
            </div>

            <b-dropdown-divider></b-dropdown-divider>
            <a class="nav-link" id="nav-help-create-data-source" href="#help-create-data-source">
              <div class="nav-title">{{$t('view.sidebar.createDataSource')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" id="nav-help-create-data-source-connection" href="#help-create-data-source-connection">
                <div class="nav-title">{{$t('view.sidebar.createConnection')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" id="nav-help-setting-data-source-sync" href="#help-setting-data-source-sync">
                  <div class="nav-title">{{$t('view.sidebar.settingDataSync')}}</div>
                </a>
              </div>
            </div>
          </div>
          <!-- 데이터 생성하기 -->

          <!-- 데이터 관리하기 -->
          <div class="nav-item">
            <div class="nav-header">{{$t('view.sidebar.manageData')}}</div>
            <a class="nav-link" id="nav-help-workspace-data-manage" href="#help-workspace-data-manage">
              <div class="nav-title">{{$t('view.sidebar.workspace')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" id="nav-help-workspace-is" href="#help-workspace-is">
                <div class="nav-title">{{$t('view.sidebar.workspaceIs')}}</div>
              </a>
            </div>
            <a class="nav-link" id="nav-help-home" href="#help-home">
              <div class="nav-title">{{$t('view.sidebar.home')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-data-kpi">
                <div class="nav-title">{{$t('view.sidebar.dataKpi')}}</div>
              </a>
              <a class="nav-link" href="#help-bookmark-events">
                <div class="nav-title">{{$t('view.sidebar.bookmark')}}</div>
              </a>
              <a class="nav-link" href="#help-recent-event-list">
                <div class="nav-title">{{$t('view.sidebar.recentList')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-recent-event-info">
                  <div class="nav-title">{{$t('view.sidebar.eventInfo')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-sample-event-list">
                <div class="nav-title">{{$t('view.sidebar.sampleList')}}</div>
              </a>
            </div>
            <a class="nav-link" id="nav-help-eventlist" href="#help-eventlist">
              <div class="nav-title">{{$t('view.sidebar.data')}}</div>
            </a>
            <a class="nav-link" id="nav-help-standardlist" href="#help-standardlist">
              <div class="nav-title">{{$t('view.sidebar.standardProcess')}}</div>
            </a>
            <a class="nav-link" id="nav-help-databasesource" href="#help-databasesource">
              <div class="nav-title">{{$t('view.sidebar.datasource')}}</div>
            </a>
          </div>
          <!-- 데이터 관리하기 -->

          <!-- 프로세스 분석하기 -->
          <div class="nav-item">
            <div class="nav-header">{{$t('view.sidebar.inspectProcess')}}</div>
            <a class="nav-link" href="#help-process-common">
              <div class="nav-title">{{$t('view.sidebar.processCommon')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-process-filter-title">
                <div class="nav-title">{{$t('view.sidebar.analysisCondition')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-process-full-attribute-info">
                  <div class="nav-title">{{$t('view.sidebar.allAttrInfo')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-process-variant-list">
                <div class="nav-title">{{$t('view.sidebar.varList')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-variant-is">
                  <div class="nav-title">{{$t('view.sidebar.processGroupIs')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-filtered-event-data-list">
                <div class="nav-title">{{$t('view.sidebar.table')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-included-menu">
                  <div class="nav-title">{{$t('view.sidebar.includedMenu')}}</div>
                </a>
                <a class="nav-link" href="#help-filtered-data-case-list">
                  <div class="nav-title">{{$t('view.sidebar.caseList')}}</div>
                </a>
                <div class="nav-sub">
                  <a class="nav-link" href="#help-filtered-data-case-detail">
                    <div class="nav-title">{{$t('view.sidebar.detailList')}}</div>
                  </a>
                </div>
                <a class="nav-link" href="#help-list-of-bottlenecks">
                  <div class="nav-title">{{$t('view.sidebar.bottleNeckSectionList')}}</div>
                </a>
                <a class="nav-link" href="#help-repeated-activity-list">
                  <div class="nav-title">{{$t('view.sidebar.repeatActivityList')}}</div>
                </a>
              </div>
            </div>

            <b-dropdown-divider></b-dropdown-divider>

            <a class="nav-link" id="nav-help-dashboard" href="#help-dashboard">
              <div class="nav-title">{{$t('view.sidebar.dataSummary')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-data-summary-tab">
                <div class="nav-title">{{$t('view.sidebar.dataSummaryTab')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-data-summary-kpi">
                  <div class="nav-title">{{$t('view.sidebar.kpi')}}</div>
                </a>
                <a class="nav-link" href="#help-data-summary-chart">
                  <div class="nav-title">{{$t('view.sidebar.chart')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-activity-tab">
                <div class="nav-title">{{$t('view.sidebar.activityTab')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-activity-kpi">
                  <div class="nav-title">{{$t('view.sidebar.kpi')}}</div>
                </a>
                <a class="nav-link" href="#help-activity-chart">
                  <div class="nav-title">{{$t('view.sidebar.chart')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-resource-tab">
                <div class="nav-title">{{$t('view.sidebar.resourceTab')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-resource-kpi">
                  <div class="nav-title">{{$t('view.sidebar.kpi')}}</div>
                </a>
                <a class="nav-link" href="#help-resource-chart">
                  <div class="nav-title">{{$t('view.sidebar.chart')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-originator-tab">
                <div class="nav-title">{{$t('view.sidebar.originatorTab')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-originator-kpi">
                  <div class="nav-title">{{$t('view.sidebar.kpi')}}</div>
                </a>
                <a class="nav-link" href="#help-originator-chart">
                  <div class="nav-title">{{$t('view.sidebar.chart')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-cost-tab">
                <div class="nav-title">{{$t('view.sidebar.costTab')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-cost-kpi">
                  <div class="nav-title">{{$t('view.sidebar.kpi')}}</div>
                </a>
                <a class="nav-link" href="#help-cost-chart">
                  <div class="nav-title">{{$t('view.sidebar.chart')}}</div>
                </a>
              </div>
              <a class="nav-link" href="#help-personal-tab">
                <div class="nav-title">{{$t('view.sidebar.personalTab')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-create-personal">
                  <div class="nav-title">{{$t('view.sidebar.create')}}</div>
                </a>
                <a class="nav-link" id="nav-help-dashboardeditor" href="#help-dashboardeditor">
                  <div class="nav-title">{{$t('view.sidebar.edit')}}</div>
                </a>
                <a class="nav-link" href="#help-editing-function-personal">
                  <div class="nav-title">{{$t('view.sidebar.editFunction')}}</div>
                </a>
                <a class="nav-link" href="#help-item-personal">
                  <div class="nav-title">{{$t('view.sidebar.item')}}</div>
                </a>
                <a class="nav-link" href="#help-delete-personal">
                  <div class="nav-title">{{$t('view.sidebar.removePersonalTab')}}</div>
                </a>
              </div>
            </div>

            <b-dropdown-divider></b-dropdown-divider>


            <a class="nav-link" id="nav-help-processdiscovery" href="#help-processdiscovery">
              <div class="nav-title">{{$t('view.sidebar.processDiscovery')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
              <a class="nav-link" href="#help-process-discovery-icon">
                <div class="nav-title">{{$t('view.sidebar.icon')}}</div>
              </a>
              <a class="nav-link" href="#help-process-discovery-simple-complex">
                <div class="nav-title">{{$t('view.sidebar.simpleOrComplex')}}</div>
              </a>
            </div>

            <b-dropdown-divider></b-dropdown-divider>


            <a class="nav-link" id="nav-help-deltaanalysis" href="#help-deltaanalysis">
              <div class="nav-title">{{$t('view.sidebar.processDelta')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-delta-analysis-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
              <a class="nav-link" href="#help-delta-analysis-two-view">
                <div class="nav-title">{{$t('view.sidebar.splitView')}}</div>
              </a>
              <a class="nav-link" href="#help-delta-analysis-merged">
                <div class="nav-title">{{$t('view.sidebar.combineView')}}</div>
              </a>
              <a class="nav-link" href="#help-delta-analysis-vairant-title">
                <div class="nav-title">{{$t('view.sidebar.analysisList')}}</div>
              </a>
              <a class="nav-link" href="#help-label-kpi-is">
                <div class="nav-title">{{$t('view.sidebar.mutualSuitability')}}</div>
              </a>
              <a class="nav-link" href="#help-delta-analysis-icon">
                <div class="nav-title">{{$t('view.sidebar.icon')}}</div>
              </a>
            </div>

            <b-dropdown-divider></b-dropdown-divider>


            <a class="nav-link" id="nav-help-logreplay" href="#help-logreplay">
              <div class="nav-title">{{$t('view.sidebar.processAnimation')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-log-replay-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
              <a class="nav-link" href="#help-log-replay-icon">
                <div class="nav-title">{{$t('view.sidebar.icon')}}</div>
              </a>
              <a class="nav-link" href="#help-log-replay-play-bar">
                <div class="nav-title">{{$t('view.sidebar.playBar')}}</div>
              </a>
              <div class="nav-sub">
                <a class="nav-link" href="#help-log-replay-speed-control">
                  <div class="nav-title">{{$t('view.sidebar.controlSpeed')}}</div>
                  </a>
                  <a class="nav-link" href="#help-log-replay-select-date">
                    <div class="nav-title">{{$t('view.sidebar.setDate')}}</div>
                  </a>
              </div>
            </div>

            <b-dropdown-divider></b-dropdown-divider>


            <a class="nav-link" id="nav-help-socialanalysis" href="#help-socialanalysis">
              <div class="nav-title">{{$t('view.sidebar.resourceRelationAnalysis')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-social-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
            </div>

            <b-dropdown-divider></b-dropdown-divider>

            <a class="nav-link" id="nav-help-matrixmodel" href="#help-matrixmodel">
              <div class="nav-title">{{$t('view.sidebar.dataAnalysis')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-matrix-model-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
            </div>

            <b-dropdown-divider></b-dropdown-divider>

            <a class="nav-link" id="nav-help-dotted" href="#help-dotted">
              <div class="nav-title">{{$t('view.sidebar.activityAnalysis')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-dotted-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
            </div>

            <b-dropdown-divider></b-dropdown-divider>

            <a class="nav-link" id="nav-help-processflow" href="#help-processflow">
              <div class="nav-title">{{$t('view.sidebar.processFlowAnalysis')}}</div>
            </a>
            <div class="nav-sub">
              <a class="nav-link" href="#help-processflow-filter-title-properties">
                <div class="nav-title">{{$t('view.sidebar.analysisConditionAttr')}}</div>
              </a>
            </div>
          </div>
          <!-- 프로세스 분석하기 -->
          <!-- 기타 -->
          <div class="nav-item">
            <div class="nav-header">{{$t('view.sidebar.support')}}</div>
            <a class="nav-link" href="#help-support-device">
              <div class="nav-title">{{$t('view.sidebar.supportDevice')}}</div>
            </a>
            <a class="nav-link" href="#help-support-browser">
              <div class="nav-title">{{$t('view.sidebar.supportBrowser')}}</div>
            </a>
          </div>
          <!-- 기타 -->
        </div>
      </div>
    </div>
  </div>
  <!-- help : sidebar -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { EventBus } from '@/common';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
@Component({
  components: {},
})
export default class Sidebar extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */

  /* refs 선언 */

  /* Watch 선언 */
  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  // created() {}

  /* 메소드 선언 */
}
</script>