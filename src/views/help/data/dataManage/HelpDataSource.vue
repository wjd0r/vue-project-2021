<template>
  <!-- 도움말 : 데이터 관리하기 > 데이터소스 -->
  <div class="help-content help-common">
    <section id="help-databasesource">
      <div class="content-header"><h3 class="title">{{$t('view.helpDataSource.checkDataSource')}}</h3></div>
      <div class="content-body">
        <div class="help-item">
          <div class="help-group">
            <div class="help">
              <div class="help-header"><h4 class="title">{{$t('view.helpDataSource.datasource')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpDataSource.explainDatasource')">
                </div>
                <div class="content-img">
                  <img src="../../images/data/help_datasource_01.jpg" alt="데이터 소스 화면 이미지">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 도움말 : 데이터 관리하기 > 표준프로세스 -->
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
export default class HelpDataSource extends Vue {
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