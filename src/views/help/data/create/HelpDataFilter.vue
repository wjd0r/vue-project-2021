<template>
  <!-- 도움말 : 데이터 필터 -->
  <div class="help-content">
    <div class="content-header"><h3 class="title">{{$t('view.helpDataFilter.saveRequireDataFromDataset')}}</h3></div>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help">
            <section id="help-datasetfiltercreateform">
              <div class="help-header"><h4 class="title">{{$t('view.helpDataFilter.datafilter')}}</h4></div>
              <div class="help-body">
                <div class="content-text">
                  <p>{{$t('view.helpDataFilter.dataFilterSelection')}}</p>
                </div>
                <div class="content-img">
                  <img src="../../images/data/help_data_filter_01.jpg" alt="데이터 셋 카드의 데이터 필터 이미지">
                </div>

                <div class="content-text mt-10" v-html="$t('view.helpDataFilter.explainDataFilter')"></div>
                <div class="content-img">
                  <img src="../../images/data/create/help_create_data_filter_01.jpg" alt="데이터 필터 생성 과정 이미지">
                </div>
                <section id="help-datasetdatafilterselect">
                <div class="content-text mt-10">
                  {{$t('view.helpDataFilter.explainDataFilterSelect')}}
                </div>
                <div class="content-img">
                  <img src="../../images/data/create/help_data_filter.jpg" alt="데이터 필터 생성 과정 이미지">
                </div></section>
              </div>
            </section>
          </div>

          <div class="help">
            <section id="help-datasetdatafiltering">
              <div class="help-header"><h4 class="title">{{$t('view.helpDataFilter.dataFilterPreview')}}</h4></div>
              <div class="help-body">
                <div class="content-text">
                  <p>{{$t('view.helpDataFilter.explainDataFilterPreview')}}</p>
                </div>
                <div class="content-img">
                  <img src="../../images/data/create/help_data_filter_preview.jpg" alt="데이터 필터의 프리뷰 확인 이미지">
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 도움말 : 데이터 필터 -->
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
export default class HelpDataFilter extends Vue {
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