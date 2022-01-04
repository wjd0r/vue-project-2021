<template>
  <!-- 도움말 : 표준 프로세스 생성하기 -->
  <div class="help-content help-common">
    <div class="content-header"><h3 class="title">{{$t('view.helpCreateStandard.makeStandardForProcessMining')}}</h3></div>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help">
          <section id="help-standard-process-is">
            <div class="help-header"><h4 class="title">{{$t('view.helpCreateStandard.standardProcessIs')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateStandard.explainStandardProcessIs')">
                </div>
              </div>
            </section>
          </div>

          <div class="help">
            <section id="help-standardcreateform">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateStandard.createStandard')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateStandard.explainCreateStandard')">
</div>
                <div class="content-img">
                  <img src="../../images/data/create/help_create_standard_01.jpg" alt="표준 프로세스 생성 과정 이미지">
                </div>
              </div>
            </section>
          </div>

          <div class="help">
            <section id="help-apply-to-real-data">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateStandard.applyRealData')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpCreateStandard.explainApplyRealData')">
                </div>
                <div class="content-img">
                  <img src="../../images/data/create/help_create_standard_02.jpg" alt="실제 데이터에 적용하기 이미지">
                </div>
              </div>
            </section>
          </div>

          <div class="help-sub-group">
            <div class="help">
              <section id="help-processeditor">
                <div class="help-header"><h4 class="title">{{$t('view.helpCreateStandard.createStandardProcess')}}</h4></div>
                <div class="help-body">
                  <div class="content-text">
                    <p>{{$t('view.helpCreateStandard.editStandardProcessDirect')}}</p>
                  </div>
                  <div class="content-img">
                    <img src="../../images/data/create/help_standard_editor.jpg" alt="프로세스 편집 이미지">
                  </div>
                </div>
              </section>
            </div>

            <div class="help">
              <section id="help-editing-function">
                <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateStandard.editFunction')}}</h4></div>
                <div class="help-body overflow-x">
                  <table class="table line help-table-body">
                    <thead>
                      <tr>
                        <th width="100px">{{$t('view.helpCreateStandard.function')}}</th>
                        <th>{{$t('view.helpCreateStandard.explainFunction')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.cancelExecute')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainCancelExecute')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.reexecute')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainReexecute')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.init')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainInit')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.exportSvg')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainExportSvg')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.exportPng')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainExportPng')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.wholeScreen')}}</th>
                        <td v-html="$t('view.helpCreateStandard.explainWholeScreen')">
                        </td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.bringFirst')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainBringFirst')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.sendBack')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainSendBack')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.sortGraph')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainSortGraph')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.seeInOne')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainSeeInOne')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.validCheck')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainValidCheck')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.save')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainSave')}}</td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.deploy')}}</th>
                        <td v-html="$t('view.helpCreateStandard.explainDeploy')">
                        </td>
                      </tr>
                      <tr>
                        <th>{{$t('view.helpCreateStandard.exit')}}</th>
                        <td>{{$t('view.helpCreateStandard.explainExit')}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div class="help-sub-group d-flex-row">
              <div class="help">
                <div class="content-img " style="min-width: auto;">
                  <img src="../../images/data/create/help_standard_editor_02.jpg" alt="연결선과 노드 이미지">
                </div>
              </div>

              <div class="help-sub">
                <div class="help">
                  <section id="help-edit-connection-line">
                    <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateStandard.editConnectingNode')}}</h4></div>
                    <div class="help-body overflow-x">
                      <table class="table line">
                        <thead>
                          <tr>
                            <th width="100px">{{$t('view.helpCreateStandard.editName')}}</th>
                            <th>{{$t('view.helpCreateStandard.explainEditName')}}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.startActivityName')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainStartActivityName')}}</td>
                          </tr>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.endActivityName')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainEndActivityName')}}</td>
                          </tr>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.standardTime')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainStandardTime')}}</td>
                          </tr>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.timeUnit')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainTimeUnit')}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>

                <div class="help">
                  <section id="help-edit-node">
                    <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateStandard.editNode')}}</h4></div>
                    <div class="help-body overflow-x p-0 mt-10">
                      <table class="table line">
                        <thead>
                          <tr>
                            <th width="100px">{{$t('view.helpCreateStandard.editName')}}</th>
                            <th>{{$t('view.helpCreateStandard.explainEditName')}}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.activityName')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainActivityName')}}</td>
                          </tr>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.isRequired')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainIsRequired')}}</td>
                          </tr>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.standardTime')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainStandardTimeOfActivity')}}</td>
                          </tr>
                          <tr>
                            <th>{{$t('view.helpCreateStandard.timeUnit')}}</th>
                            <td>{{$t('view.helpCreateStandard.explainTimeUnit')}}</td>
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
    </div>
  </div>
  <!-- 도움말 : 표준 프로세스 생성하기 -->
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
export default class HelpCreateStandard extends Vue {
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