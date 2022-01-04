<template>
  <!-- 도움말 : 프로세스 분석 -->
  <div class="help-content help-common">
    <section id="help-processdiscovery">
      <div class="content-header"><h3 class="title">{{$t('view.helpDiscovery.processDiscovery')}}</h3></div>
      <div class="content-middle">
        <div class="content-text" v-html="$t('view.helpDiscovery.explainProcessDiscovery')">
        </div>
        <div class="content-img">
          <img src="../../images/process/help_discovery.jpg" alt="프로세스 분석 화면 이미지">
        </div>
      </div>
    </section>
    <div class="content-body">

      <div class="help-item">
        <div class="help-group">

          <div class="help-sub-group">
            <div class="help">
              <section id="help-filter-title-properties">
                <div class="help-header"><h4 class="title">{{$t('view.helpDiscovery.analysisConditionAttr')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="100px">{{$t('view.helpDiscovery.attrName')}}</th>
                        <th>{{$t('view.helpDiscovery.attrValue')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpDiscovery.algorithm')}}</th>
                        <td v-html="$t('view.helpDiscovery.explainAlgorithm')">
                        </td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpDiscovery.activity')}}</th>
                        <td>{{$t('view.helpDiscovery.explainActivity')}}
                        </td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpDiscovery.connectionLine')}}</th>
                        <td>{{$t('view.helpDiscovery.explainConnectionLine')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpDiscovery.additionalCondition')}}</th>
                        <td>{{$t('view.helpDiscovery.explainAdditionalCondition')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpDiscovery.conditionValue')}}</th>
                        <td>{{$t('view.helpDiscovery.explainConditionValue')}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            
            <div class="help">
              <section id="help-process-discovery-icon">
                <div class="help-header"><h4 class="title">{{$t('view.helpDiscovery.icon')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="80px">{{$t('view.helpDiscovery.icon')}}</th>
                        <th>{{$t('view.helpDiscovery.iconName')}}</th>
                        <th>{{$t('view.helpDiscovery.iconExplain')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="ico-standard-editor m-auto" alt="표준프로세스 작성 아이콘"></div>
                        </td>
                        <td>{{$t('view.helpDiscovery.ediStandardProcess')}}</td>
                        <td v-html="$t('view.helpDiscovery.explainEdiStandardProcess')">
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="ico-horizontal m-auto" alt="가로 정렬 아이콘"></div>
                          <div class="ico-vertical m-auto" alt="세로 정렬 아이콘"></div>
                        </td>
                        <td>{{$t('view.helpDiscovery.seeHorizontalOrVertically')}}</td>
                        <td>
                          <p>{{$t('view.helpDiscovery.explainSeeHorizontalOrVertically')}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="ico-option-align m-auto" alt="한눈에 보기 아이콘"></div>
                        </td>
                        <td>{{$t('view.helpDiscovery.graphSort')}}</td>
                        <td>
                          <p>{{$t('view.helpDiscovery.explainGraphSort')}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="ico-map-hide m-auto" alt="미니맵 숨기기 아이콘"></div>
                          <div class="ico-map-show m-auto" alt="미니맵 보이기 아이콘"></div>
                        </td>
                        <td>{{$t('view.helpDiscovery.seeOrHideMiniMap')}}</td>
                        <td>
                          <p>{{$t('view.helpDiscovery.explainSeeOrHideMiniMap')}}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-process-discovery-simple-complex">
                <div class="help-header"><h4 class="title">{{$t('view.helpDiscovery.simpleOrComplex')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpDiscovery.explainSimpleOrComplex')">
                  </div>
                  <div class="content-img">
                    <img src="../../images/process/help_discovery_02.jpg" alt="프로세스 분석 연결선 조정 이미지">
                  </div>
                </div>
              </section>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 프로세스 분석 -->
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
export default class HelpDiscovery extends Vue {
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