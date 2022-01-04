<template>
  <!-- 도움말 : 지원 브라우저 -->
  <div class="help-component">
    <section id="help-support-browser">
      <div class="content-header"><h3 class="title">{{$t('view.helpBrowsers.supportBrowser')}}</h3></div>
      <div class="content-body">
        <div class="help-content">
          <div class="content-header"><h4 class="title">{{$t('view.helpBrowsers.browsers')}}</h4></div>
          <div class="content-middle">
            <div class="content-text">
            </div>
          </div>
          <div class="content-body">
            <div class="help-item">
              <div class="help-group">
                <div class="help">
                  <div class="help-body">
                    <div class="logo-component">
                      <div class="logo-content">
                        <div class="logo-edge" alt="엣지 로고"></div>
                        <span>{{$t('view.helpBrowsers.edge')}}</span>
                      </div>
                      <div class="logo-content">
                        <div class="logo-chrome" alt="크롬 로고"></div>
                        <span>{{$t('view.helpBrowsers.chrome')}}</span>
                      </div>
                      <div class="logo-content">
                        <div class="logo-firefox" alt="파이어폭스 로고"></div>
                        <span>{{$t('view.helpBrowsers.firefox')}}</span>
                      </div>
                      <div class="logo-content">
                        <div class="logo-safari" alt="사파리 로고"></div>
                        <span>{{$t('view.helpBrowsers.safari')}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 도움말 : 지원 브라우저 -->
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
export default class HelpBrowsers extends Vue {
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