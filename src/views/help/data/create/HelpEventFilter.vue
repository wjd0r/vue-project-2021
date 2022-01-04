<template>
  <!-- 도움말 : 이벤트 필터 -->
  <div class="help-content">
    <div class="content-header"><h3 class="title">{{$t('view.helpEventFilter.ctreatEventFiltering')}}</h3></div>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help">
            <section id="help-subrepositorycreateform">
              <div class="help-header"><h4 class="title">{{$t('view.helpEventFilter.eventFilter')}}</h4></div>
              <div class="help-body">
                <div class="content-text">
                  <p>{{$t('view.helpEventFilter.eventFilterSelection')}}</p>
                </div>
                <div class="content-img">
                  <img src="../../images/data/help_event_filter_01.jpg" alt="이벤트로그 카드의 데이터 필터 이미지">
                </div>
                <div class="content-text mt-10">
                  <p>{{$t('view.helpEventFilter.explainEventFilter')}}</p>
                </div>
                <div class="content-img">
                  <img src="../../images/data/create/help_create_event_filter_01.jpg" alt="이벤트 필터 생성 과정 이미지">
                </div>
              </div>
            </section>
          </div>

          <div class="help-sub-group">
            <section id="help-subrepositoryfilter" class="p-0">
              <div class="help" >
                <section id="help-duration-filter">
                  <div class="help-header"><h4 class="title">{{$t('view.helpEventFilter.durationFilter')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">{{$t('view.helpEventFilter.explainDurationFilter')}}</div>
                    <div class="content-img">
                      <img src="../../images/data/help_event_filter_02.jpg" alt="기간 필터 이미지">
                    </div>
                  </div>
                </section>
              </div>

              <div class="help help-sub">
                <section id="help-case-inclusion-criteria">
                  <div class="help-sub-header"><h4 class="title">{{$t('view.helpEventFilter.caseInclusionInfo')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10"  v-html="$t('view.helpEventFilter.explainCaseInclusionInfo')"></div>
                  </div>
                </section>
              </div>

              <div class="help" >
                <section id="help-start-end-activity-filter">
                  <div class="help-header"><h4 class="title">{{$t('view.helpEventFilter.startEndActivityFilter')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10"  v-html="$t('view.helpEventFilter.explainStartEndActivityFilter')"></div>
                    <div class="content-img">
                      <img src="../../images/data/help_event_filter_03.jpg" alt="기간 필터 이미지">
                    </div>
                  </div>
                </section>
              </div>

              <div class="help help-sub">
                <section id="help-start-activity">
                  <div class="help-sub-header"><h4 class="title">{{$t('view.helpEventFilter.startActivity')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">{{$t('view.helpEventFilter.explainStartActivity')}}</div>
                  </div>
                </section>
              </div>

              <div class="help help-sub">
                <section id="help-end-activity">
                  <div class="help-sub-header"><h4 class="title">{{$t('view.helpEventFilter.entActivity')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">{{$t('view.helpEventFilter.explainEndActivity')}}</div>
                  </div>
                </section>
              </div>

              <div class="help" >
                <section id="help-attribute-filter">
                  <div class="help-header"><h4 class="title">{{$t('view.helpEventFilter.attributeFilter')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">{{$t('view.helpEventFilter.explainAttributeFilter')}}</div>
                    <div class="content-img">
                      <img src="../../images/data/help_event_filter_04.jpg" alt="속성 필터 이미지">
                    </div>
                  </div>
                </section>
              </div>

              <div class="help">
                <section id="help-variant-filter">
                  <div class="help-header"><h4 class="title">{{$t('view.helpEventFilter.variantFilter')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">{{$t('view.helpEventFilter.explainVariantFilter')}}</div>
                    <div class="content-img">
                      <img src="../../images/data/help_event_filter_05.jpg" alt="프로세스 그룹 필터 이미지">
                    </div>
                  </div>
                </section>
              </div>
              
              <div class="help">
                <section id="help-subrepositoryfiltering">
                  <div class="help-header"><h4 class="title">{{$t('view.helpEventFilter.eventFilterPreview')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">{{$t('view.helpEventFilter.explainEeventFilterPreview')}}</div>
                    <div class="content-img">
                      <img src="../../images/data/help_event_filter_preview.jpg" alt="이벤트 필터 진행 이미지">
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 -->
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
export default class HelpEventFilter extends Vue {
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