<template>
  <!-- 도움말 : 액티비티 분석 -->
  <div class="help-content help-common">
    <section id="help-dotted">
      <div class="content-header"><h3 class="title">{{$t('view.helpDotted.activityAnalysis')}}</h3></div>
      <div class="content-middle">
        <div class="content-text" v-html="$t('view.helpDotted.explainActivityAnalysis')">
        </div>
        <div class="content-img">
          <img src="../../images/process/help_dotted.jpg" alt="액티비티 분석 화면 이미지">
        </div>
      </div>
    </section>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help-sub-group">
            <div class="help">
              <section id="help-dotted-filter-title-properties">
                <div class="help-header"><h4 class="title"></h4>{{$t('view.helpDotted.analysisConditionAttr')}}</div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="100px">{{$t('view.helpDotted.attrName')}}</th>
                        <th>{{$t('view.helpDotted.attrValue')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpDotted.yAxis')}}</th>
                        <td>{{$t('view.helpDotted.explainYAxis')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpDotted.dottAttrAsDistinguishAttr')}}</th>
                        <td v-html="$t('view.helpDotted.explainDottAttrAsDistinguishAttr')">
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
    </div>
  </div>
  <!-- 도움말 : 액티비티 분석 -->
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
export default class HelpDotted extends Vue {
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