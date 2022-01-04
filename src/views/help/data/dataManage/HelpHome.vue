<template>
  <!-- 도움말 : 데이터 관리하기 > 홈 -->
  <div class="help-content help-common">
    <div class="content-header"><h3 class="title">{{$t('view.helpHome.checkPrimeData')}}</h3></div>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <section id="help-home">
            <div class="help">
              <div class="help-header"><h4 class="title">{{$t('view.helpHome.home')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpHome.explainHome')">
                </div>
                <div class="content-img">
                  <img src="../../images/data/help_home.jpg" alt="홈 화면 이미지">
                </div>
              </div>
            </div>
          </section>

          <div class="help-sub-group">
            <div class="help">
              <section id="help-data-kpi">
                <div class="help-header"><h4 class="title">{{$t('view.helpHome.dataKpi')}}</h4></div>
                <div class="help-body">
                  <div class="content-text">
                    <p>{{$t('view.helpHome.explainDataKpi')}}</p>
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-bookmark-events">
                <div class="help-header"><h4 class="title">{{$t('view.helpHome.bookMark')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpHome.explainBookMark')">
                  </div>
                </div>
              </section>
            </div>

            <div class="help ">
              <section id="help-recent-event-list">
                <div class="help-header"><h4 class="title">{{$t('view.helpHome.recentList')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpHome.explainRecentList')">
                  </div>
                </div>
              </section>
                <div class="help">
                  <section id="help-recent-event-info">
                    <div class="help-sub-header"><h4 class="title">{{$t('view.helpHome.eventInfo')}}</h4></div>
                    <div class="help-body pl-10">
                      <div class="content-text" v-html="$t('view.helpHome.explainEventInfo')">
                      </div>
                    </div>
                  </section>
                </div>
            </div>

            <div class="help" >
              <section id="help-sample-event-list">
                <div class="help-header"><h4 class="title">{{$t('view.helpHome.sampleList')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpHome.explainSampleList')">
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 데이터 관리하기 > 홈 -->
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
export default class HelpHome extends Vue {
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