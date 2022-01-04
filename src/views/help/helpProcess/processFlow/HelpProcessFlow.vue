<template>
  <!-- 도움말 : 프로세스 흐름 분석 -->
  <div class="help-content help-common">
    <section id="help-processflow">
      <div class="content-header"><h3 class="title">{{$t('view.helpProcessFlow.processFlowAnalysis')}}</h3></div>
      <div class="content-middle">
        <div class="content-text" v-html="$t('view.helpProcessFlow.explainProcessFlowAnalysis')">
        </div>
        <div class="content-img">
          <img src="../../images/process/help_process_flow_01.jpg" alt="프로세스 흐름 분석 화면 이미지">
        </div>
      </div>
    </section>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help-sub-group">
            <div class="help">
              <section id="help-processflow-filter-title-properties">
                <div class="help-header"><h4 class="title">{{$t('view.helpProcessFlow.analysisConditionAttr')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="100px">{{$t('view.helpProcessFlow.attrName')}}</th>
                        <th>{{$t('view.helpProcessFlow.attrValue')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpProcessFlow.legend')}}</th>
                        <td>{{$t('view.helpProcessFlow.activity')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpProcessFlow.sortedBy')}}</th>
                        <td>{{$t('view.helpProcessFlow.explainSortedBy')}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 리소스 관계 -->
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
export default class HelpProcessFlow extends Vue {
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