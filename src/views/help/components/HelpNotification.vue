<template>
  <!-- 도움말 : 노티피케이션 -->
  <div class="help-component">
    <div class="content-header"><h3 class="title">{{$t('view.helpNotification.notiwindow')}}</h3></div>
    <div class="content-body">
      <div class="help-content help-common">
        <section id="help-alarm-window">
          <div class="content-header"><h3 class="title">{{$t('view.helpNotification.knowNotiWindow')}}</h3></div>
          <div class="content-middle d-flex-row">
            <div class="help-ico">
              <div class="ico ico-alarm" alt="알림 아이콘"></div>
            </div>
            <div class="content-text ml-10" v-html="$t('view.helpNotification.notiExplain')"></div>
          </div>
        </section>
        <div class="content-body">
          <div class="help-item">
            <div class="help-group">
              <section id="help-alarm-prepare-process">
                <div class="help">
                  <div class="help-header m-0"><h4 class="title">{{$t('view.helpNotification.readyExecute')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text">
                      <p>{{$t('view.helpNotification.explainCancel')}}</p>
                    </div>
                    <div class="content-img">
                      <img src="../images/component/help_noti_readying.jpg" alt="노티피케이션 - 진행 준비중 이미지">
                      <!-- <div class="card gray" style="width: 280px;">
                        <div class="notification">
                          <div class="content-header">
                            <div class="ico-notification ico-readying" alt="처리준비중 아이콘"></div>
                            <div class="title">{{$t('view.helpNotification.fileImportingReadyExecute')}}</div>
                            <div class="right-align">
                              <div class="ico-close" alt="취소 아이콘"></div>
                            </div>
                          </div>
                          <div class="content-body">
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.originalDataName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.createOriginalData')}}</div>
                            </div>
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.eventLogName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.createEventLog')}}</div>
                            </div>
                          </div>
                          <div class="content-footer">
                            <div class="request-update">{{$t('view.helpNotification.requestTime')}}</div>
                            <b-button variant="outline-primary" class="btn-close">{{$t('view.helpNotification.cancel')}}</b-button>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
                </section>
              <div class="help ml-0">
                <section id="help-alarm-processing">
                  <div class="help-header m-0"><h4 class="title">{{$t('view.helpNotification.executing')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text">
                      <p>{{$t('view.helpNotification.notiExecuteState')}}</p>
                    </div>
                    <div class="content-img">
                      <img src="../images/component/help_noti_progress.jpg" alt="노티피케이션 - 진행중 이미지">
                      <!-- <div class="card blue" style="width: 280px;">
                        <div class="notification">
                          <div class="content-header">
                            <div class="ico-notification ico-progress" alt="처리중 아이콘"></div>
                            <div class="title">{{$t('view.helpNotification.fileImportingExecuting')}}</div>
                            <div class="right-align">
                              <div class="ico-close" alt="취소 아이콘"></div>
                            </div>
                          </div>
                          <div class="content-body">
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.originalDataName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.createOriginalData')}}</div>
                            </div>
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.eventLogName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.createEventLog')}}</div>
                            </div>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </section>
              </div>

              <div class="help ml-0">
                <section id="help-alarm-done">
                  <div class="help-header m-0"><h4 class="title">{{$t('view.helpNotification.complete')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text">
                      <p>{{$t('view.helpNotification.canConfirmWhenClickCard')}}</p>
                    </div>
                    <div class="content-img">
                      <img src="../images/component/help_noti_complete.jpg" alt="노티피케이션 - 완료 이미지">
                      <!-- <div class="card green" style="width: 280px;">
                        <div class="notification">
                          <div class="content-header">
                            <div class="ico-notification ico-complete" alt="완료 아이콘"></div>
                            <div class="title">{{$t('view.helpNotification.fileImportingComplete')}}</div>
                            <div class="right-align">
                              <div class="ico-close" alt="취소 아이콘"></div>
                            </div>
                          </div>
                          <div class="content-body">
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.originalDataName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.hospitalTreatment')}}</div>
                            </div>
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.eventLogName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.hospitalTreatment')}}</div>
                            </div>
                          </div>
                          <div class="content-footer">
                            <div class="request-update">{{$t('view.helpNotification.requestTime')}}</div>
                            <b-button variant="outline-primary" class="btn-close">{{$t('view.helpNotification.shortcut')}}</b-button>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </section>
              </div>

              <div class="help ml-0">
                <section id="help-alarm-fail">
                  <div class="help-header m-0"><h4 class="title">{{$t('view.helpNotification.fail')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text">
                      <p>{{$t('view.helpNotification.explainCanRequestAgain')}}</p>
                    </div>
                    <div class="content-img">
                      <img src="../images/component/help_noti_fail.jpg" alt="노티피케이션 - 실패 이미지">
                      <!-- <div class="card red" style="width: 280px;">
                        <div class="notification">
                          <div class="content-header">
                            <div class="ico-notification ico-fail" alt="완료 아이콘"></div>
                            <div class="title">{{$t('view.helpNotification.fileImportingFail')}}</div>
                            <div class="right-align">
                              <div class="ico-close" alt="취소 아이콘"></div>
                            </div>
                          </div>
                          <div class="content-body">
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.originalDataName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.createOriginalData')}}</div>
                            </div>
                            <div class="notification-text">
                              <div class="notifi-title">{{$t('view.helpNotification.eventLogName')}}</div>
                              <div class="notifi-content">{{$t('view.helpNotification.createEventLog')}}</div>
                            </div>
                          </div>
                          <div class="content-footer">
                            <div class="request-update">{{$t('view.helpNotification.requestTime')}}</div>
                            <b-button variant="outline-primary" class="btn-close">{{$t('view.helpNotification.requestAgain')}}</b-button>
                          </div>
                        </div>
                      </div> -->
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
  <!-- 도움말 : 노티피케이션 -->
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
export default class HelpNotification extends Vue {
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