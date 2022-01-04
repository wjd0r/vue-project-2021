<template>
  <!-- 도움말 : 개인 대시보드 탭 -->
  <div class="help-item">
    <div class="help-group">
      <div class="help">
        <section id="help-personal-tab">
          <div class="help-header"><h4 class="title">{{$t('view.helpTabPersonal.personalTab')}}</h4></div>
          <div class="help-middle">
            <div class="content-text" v-html="$t('view.helpTabPersonal.explainPersonalTab')">
            </div>
          </div>
          <div class="help-body">
            <div class="content-img"  style="width: 1200px; max-width: 100%;">
              <img src="../../../images/process/dashboard/help_dashboard_personal.jpg" alt="개인대시보드 이미지">
            </div>
          </div>
        </section>
      </div>

      <div class="help-sub-group">
        <div class="help">
          <section id="help-create-personal">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabPersonal.create')}}</h4></div>
            <div class="help-body">
              <div class="content-text-group d-flex-row">
                <div class="help-ico">
                  <div class="ico ico-plus"></div>
                </div>
                <div class="content-text"  v-html="$t('view.helpTabPersonal.explainCreate')">
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="help">
          <section id="help-dashboardeditor">
            <div class="help-header"><h4 class="title">{{$t('view.helpTabPersonal.edit')}}</h4></div>
            <div class="help-body">
              <div class="content-text-group d-flex-row">
                <div class="help-ico">
                  <div class="ico ico-dashbard-editor"></div>
                </div>
                <div class="content-text" v-html="$t('view.helpTabPersonal.explainEdit')">
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="help">
          <div class="help-middle pb-10">
            <div class="content-img">
              <img src="../../../images/process/dashboard/help_dashboard_editor_02.jpg" alt="개인대시보드 편집 아이콘 이미지 2">
            </div>
          </div>
          
          <div class="help">
            <section id="help-editing-function-personal">
              <div class="help-sub-header"><h4 class="title">{{$t('view.helpTabPersonal.editFunction')}}</h4></div>
              <div class="help-body overflow-x">
                <table class="table line help-table-body">
                  <thead>
                    <tr>
                      <th width="100px">{{$t('view.helpTabPersonal.function')}}</th>
                      <th>{{$t('view.helpTabPersonal.explainFunction')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.init')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainInit')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.empty')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainEmpty')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.size')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainSize')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.save')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainSave')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.removeTab')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainRemoveTab')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.exit')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainExit')}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div class="help">
            <section id="help-item-personal">
              <div class="help-sub-header"><h4 class="title">{{$t('view.helpTabPersonal.item')}}</h4></div>
              <div class="help-middle">
                <div class="content-text">
                  <p>{{$t('view.helpTabPersonal.explainItem')}}</p>
                </div>
              </div>
              <div class="help-body overflow-x">
                <table class="table line help-table-body">
                  <thead>
                    <tr>
                      <th width="100px">{{$t('view.helpTabPersonal.itemName')}}</th>
                      <th>{{$t('view.helpTabPersonal.itemExplain')}}</th>
                      <th>{{$t('view.helpTabPersonal.caseTable')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr>
                      <th>{{$t('view.helpTabPersonal.caseFlowChart')}}</th> 
                      <td>{{$t('view.helpTabPersonal.explainCaseFlowChart')}}</td>
                      <td class="text-center">{{$t('view.helpTabPersonal.noText')}}</td>
                    </tr> -->
                    <tr>
                      <th>{{$t('view.helpTabPersonal.eventFlowChart')}}</th> 
                      <td>{{$t('view.helpTabPersonal.explainEventFlowChart')}}</td>
                      <td class="text-center">{{$t('view.helpTabPersonal.noText')}}</td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.exceedCasekPI')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainExceedCaseKpi')}}</td>
                      <td>{{$t('view.helpTabPersonal.caseTableExceedCasekPI')}} </td>
                    </tr>
                    <tr>
                      <th>{{$t('view.helpTabPersonal.caseAbnormalSpentTimeKpi')}}</th>
                      <td>{{$t('view.helpTabPersonal.explainCaseAbnormalSpentTimeKpi')}}</td>
                      <td>{{$t('view.helpTabPersonal.caseTableCaseAbnormalSpentTimeKpi')}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div class="help">
            <section id="help-delete-personal">
              <div class="help-sub-header"><h4 class="title">{{$t('view.helpTabPersonal.removePersonalTab')}}</h4></div>
              <div class="help-body">
                <div class="content-text-group d-flex-row">
                  <div class="content-img">
                    <img src="../../../images/process/dashboard/help_dashboard_personal_delete.jpg" alt="개인탭 삭제 이미지">
                  </div>
                  <div class="content-text" v-html="$t('view.helpTabPersonal.explainTabRemove')">
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>

  </div>
  <!-- 도움말 : 개인 대시보드 탭 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpDashboardEditor from './HelpDashboardEdit.vue';

@Component({
  components: {
    HelpDashboardEditor,
  },
  computed: mapGetters({}),
})
export default class HelpTabPersonal extends Vue {
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