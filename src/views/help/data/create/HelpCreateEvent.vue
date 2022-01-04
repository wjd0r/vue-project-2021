<template>
  <!-- 도움말 : 이벤트 생성하기 -->
    <div class="help-content help-common">
      <div class="content-header"><h3 class="title">{{$t('view.helpCreateEvent.makeDataForProcessMining')}}</h3></div>
      <div class="content-body">
        <div class="help-item">
          <div class="help-group">
            <div class="help">
              <section id="help-repository-data-is">
                <div class="help-header"><h4 class="title">{{$t('view.helpCreateEvent.eventIs')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpCreateEvent.explainEvent')">
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-repositorycreateform">
                <div class="help-header"><h4 class="title">{{$t('view.helpCreateEvent.createEvent')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpCreateEvent.explainCreateEvent')"></div>
                  
                  <div class="content-text"  v-html="$t('view.helpCreateEvent.explainCtreateEventFirst')"></div>
                  <div class="content-img">
                    <img src="../../images/data/create/help_next_01.jpg" alt="이벤트 생성 과정 이미지">
                  </div>

                  <div class="content-text mt-10">{{$t('view.helpCreateEvent.explainCtreateEventSecond')}}</div>
                  <div class="content-img">
                    <img src="../../images/data/help_data_02.jpg" alt="이벤트 생성 과정 이미지">
                  </div>

                  <div class="content-text mt-10" v-html="$t('view.helpCreateEvent.explainCtreateEventThird')"></div>
                  <div class="content-img">
                    <img src="../../images/data/help_event_filter_01.jpg" alt="이벤트로그 카드의 데이터 필터 이미지">
                  </div>
                  <div class="content-text mt-10">{{$t('view.helpCreateEvent.explainCtreateEventThird02')}}</div>
                </div>
              </section>
            </div>

            <div class="help-sub-group">
              <div class="help">
                <section id="help-fill-event-info">
                  <div class="help-header"><h4 class="title" >{{$t('view.helpCreateEvent.enterEventInfo')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text pt-10">
                      <p>{{$t('view.helpCreateEvent.explainEnterEventInfo')}}</p>
                    </div>
                  </div>
                </section>
              </div>
              
              <div class="help help-sub">
                <section id="help-standard-process-list">
                  <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateEvent.standardList')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text" v-html="$t('view.helpCreateEvent.explainStandardList')">
                    </div>
                    <div class="content-img">
                      <img src="../../images/data/create/help_create_event_02.jpg" alt="이벤트 생성 과정 이미지">
                    </div>
                  </div>
                </section>
              </div>
              
              <!-- 데이터 매핑 -->
                <HelpDataMapping/>
              <!-- 데이터 매핑 -->
            </div>      
            
            <div class="help">
              <section id="help-repositorycreatecomplete">
                <div class="help-header"><h4 class="title">{{$t('view.helpCreateEvent.completeEventCreate')}}</h4></div>
                <div class="help-body">
                  <div class="content-text" v-html="$t('view.helpCreateEvent.explainCompleteEventCreate')">
              
                  </div>
                  <div class="content-img">
                    <img style="width: auto;" src="../../images/data/create/help_next_02.jpg" alt="이벤트 생성 완료 후 다음 이미지">
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- 도움말 : 이벤트 생성하기-->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpDataMapping from './HelpDataMapping.vue';

@Component({
  components: {
    HelpDataMapping,
  },
  computed: mapGetters({}),
})
export default class HelpCreateEvent extends Vue {
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