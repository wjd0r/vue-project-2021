<template>
  <!-- 도움말 : 프로세스 애니메이션 -->
  <div class="help-content help-common">
    <section id="help-logreplay">
      <div class="content-header"><h3 class="title">{{$t('view.helpLogReplay.processAnimation')}}</h3></div>
      <div class="content-middle">
        <div class="content-text" v-html="$t('view.helpLogReplay.explainProcessAnimation')">
        </div>
        <div class="content-img">
          <img src="../../images/process/help_logreplay.jpg" alt="프로세스 애니메이션 화면 이미지">
        </div>
      </div>
    </section>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help-sub-group">
            <div class="help">
              <section id="help-log-replay-filter-title-properties">
                <div class="help-header"><h4 class="title">{{$t('view.helpLogReplay.analysisConditionAttr')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="100px">{{$t('view.helpLogReplay.attrName')}}</th>
                        <th>{{$t('view.helpLogReplay.attrValue')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpLogReplay.additionalCondition')}}</th>
                        <td v-html="$t('view.helpLogReplay.explainAdditionalCondition')">
                        </td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpLogReplay.conditionValue')}}</th>
                        <td>{{$t('view.helpLogReplay.explainConditionValue')}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-log-replay-icon">
                <div class="help-header"><h4 class="title">{{$t('view.helpLogReplay.icon')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="80px">{{$t('view.helpLogReplay.icon')}}</th>
                        <th>{{$t('view.helpLogReplay.iconName')}}</th>
                        <th>{{$t('view.helpLogReplay.iconExplain')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="ico-map-hide m-auto" alt="미니맵 숨기기 아이콘"></div>
                          <div class="ico-map-show m-auto" alt="미니맵 보이기 아이콘"></div>
                        </td>
                        <td>{{$t('view.helpLogReplay.seeOrHideMiniMap')}}</td>
                        <td>
                          <p>{{$t('view.helpLogReplay.explainSeeOrHideMiniMap')}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="ico-play m-auto" alt="정지 아이콘" style="background-size: 24px;"></div>
                          <div class="ico-pause m-auto" alt="재생 아이콘" style="background-size: 24px;"></div>
                        </td>
                        <td>{{$t('view.helpLogReplay.stopOrPlay')}}</td>
                        <td>
                          <p>{{$t('view.helpLogReplay.explainStopOrPlay')}}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-log-replay-play-bar">
                <div class="help-header"><h4 class="title">{{$t('view.helpLogReplay.playBar')}}</h4></div>
              </section>
              <div class="help-body">
                <div class="help">
                  <section id="help-log-replay-speed-control">
                    <div class="help-sub-header"><h4 class="title">{{$t('view.helpLogReplay.controlSpeed')}}</h4></div>
                    <div class="help-body">
                      <div class="content-text">
                        <p>{{$t('view.helpLogReplay.explainControlSpeed')}}</p>
                      </div>
                      <div class="content-img">
                        <img src="../../images/process/help_logreplay_02.jpg" alt="플레이 프레임 중 속도 조절기 이미지">
                      </div>
                    </div>
                  </section>
                </div>
                <div class="help">
                  <section id="help-log-replay-select-date">
                    <div class="help-sub-header"><h4 class="title">{{$t('view.helpLogReplay.setDate')}}</h4></div>
                    <div class="help-body">
                      <div class="content-text">
                        <p>{{$t('view.helpLogReplay.explainSetDate')}}</p>
                      </div>
                      <div class="content-img">
                        <img src="../../images/process/help_logreplay_03.jpg" alt="플레이 프레임 중 일시 선택 이미지">
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 프로세스 애니메이션 -->
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
export default class HelpLogReplay extends Vue {
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