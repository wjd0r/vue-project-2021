<template>
  <!-- 도움말 : 데이터 매핑 -->
  <div class="help-group">
    <div class="help">
      <section id="help-repositorymappingselect">
        <div class="help-header"><h4 class="title">{{$t('view.helpDataMapping.dataMapping')}}</h4></div>
        <div class="help-body">
          <div class="content-text pt-10" v-html="$t('view.helpDataMapping.explainDataMapping')">
          </div>
        </div>
      </section>
    </div>
    
    <div class="help help-sub">
      <section id="help-repository-mapping-is">
        <div class="help-sub-header"><h4 class="title">{{$t('view.helpDataMapping.mappingIs')}}</h4></div>
        <div class="help-body">
          <div class="content-text" v-html="$t('view.helpDataMapping.explainMappingIs')"></div>
          <div class="content-img">
            <img style="width: auto;" src="../../images/data/create/help_create_mapping_01.jpg" alt="매핑 이미지">
          </div>
        </div>
      </section>
    </div>

    <div class="help">
      <section id="help-mapping-properties">
      <div class="help-sub-header"><h4 class="title">{{$t('view.helpDataMapping.mappingAttr')}}</h4></div>
      <div class="help-middle">
        <div class="content-text" v-html="$t('view.helpDataMapping.explainMappingAttr')">
        </div>
      </div>
      <div class="help-body overflow-x help-table-body">
        <table class="table line">
          <thead>
            <tr>
              <th>{{$t('view.helpDataMapping.attrName')}}</th>
              <th>{{$t('view.helpDataMapping.attrMean')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{{$t('view.helpDataMapping.caseId')}}</th>
              <td>{{$t('view.helpDataMapping.explainCaseId')}}</td>
            </tr>
            <tr>
                <th>{{$t('view.helpDataMapping.activity')}}</th>
                <td>{{$t('view.helpDataMapping.processGrade')}}</td>
            </tr>
            <tr>
                <th>{{$t('view.helpDataMapping.timeStamp')}}</th>
                <td>{{$t('view.helpDataMapping.explainTimeStamp')}}</td>
            </tr>
            <tr>
              <th>{{$t('view.helpDataMapping.originator')}}</th>
              <td>{{$t('view.helpDataMapping.explainOriginator')}}</td>
            </tr>
            <tr>
              <th>{{$t('view.helpDataMapping.resource')}}</th>
              <td>{{$t('view.helpDataMapping.explainResource')}}</td>
            </tr>
            <tr>
              <th>{{$t('view.helpDataMapping.cost')}}</th>
              <td>{{$t('view.helpDataMapping.explainCost')}}</td>
            </tr>
            <tr>
              <th>{{$t('view.helpDataMapping.caseAttr')}}</th>
              <td>{{$t('view.helpDataMapping.explainCaseAttr')}}</td>
            </tr>
            <tr>
              <th>{{$t('view.helpDataMapping.eventAttr')}}</th>
              <td>{{$t('view.helpDataMapping.explainEventAttr')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </section>
    </div>
    
    <div class="help">
      <section id="help-fail-mapping">
        <div class="help-sub-header"><h4 class="title">{{$t('view.helpDataMapping.failMapping')}}</h4></div>
        <div class="help-body">
          <div class="content-text" v-html="$t('view.helpDataMapping.explainFailMapping')">
          </div>
          <div class="content-img">
            <img style="width: auto;" src="../../images/data/create/help_create_mapping_02.jpg" alt="데이터 매핑 중 유효성 검사 실패 이미지">
          </div>
        </div>
      </section>
    </div>

    <!-- <div class="help">
      <section id="help-repositorymappingcheck">
        <div class="help-sub-header"><h4 class="title">{{$t('view.helpDataMapping.successMapping')}}</h4></div>
        <div class="help-body">
          <div class="content-text" v-html="$t('view.helpDataMapping.explainSuccessMapping')">
          </div>
          <div class="content-img">
            <img style="width: auto;" src="../../images/data/create/help_create_mapping_03.jpg" alt="데이터 매핑 중 유효성 검사 성공 이미지">
          </div>
        </div>
        </section>
      </div> -->
  </div>
  <!-- 도움말 : 데이터 매핑 -->
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
export default class HelpDataMapping extends Vue {
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