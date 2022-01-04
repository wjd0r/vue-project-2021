<template>
  <!-- 도움말 : 분석 목록 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-process-variant-list">
          <div class="help-header"><h4 class="title">{{$t('view.helpVariant.varList')}}</h4></div>
          <div class="help-body">
            <div class="content-text-group d-flex-row">
              <div class="help-ico">
                <div class="ico ico-list" alt="분석 목록 아이콘"></div>
              </div>
              <div class="content-text" v-html="$t('view.helpVariant.explainVarList')">
              </div>
            </div>
            <div class="content-img">
              <img src="../../images/process/common/help_variant.jpg" alt="분석 목록 이미지">
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-variant-is">
            <div class="help-header"><h4 class="title">{{$t('view.helpVariant.processGroupIs')}}</h4></div>
            <div class="help-body pt-10">
              <div class="content-text">
                <p>{{$t('view.helpVariant.explainProcessGroupIs')}}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  </div>
  <!-- 도움말 : 분석 목록 -->
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
export default class HelpVariant extends Vue {
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