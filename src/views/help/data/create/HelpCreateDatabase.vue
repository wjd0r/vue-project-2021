<template>
  <!-- 도움말 : 데이터 소스 -->
  <div class="help-content">
    <div class="content-header"><h3 class="title">{{$t('view.helpCreateDatabase.createDatasourceForProcessDiscovery')}}</h3></div>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help">
            <section id="help-create-data-source">
              <div class="help-header"><h4 class="title">{{$t('view.helpCreateDatabase.createDatasource')}}</h4></div>
              <div class="help-body">
                <div class="content-img"></div>
                <div class="content-text" v-html="$t('view.helpCreateDatabase.explainCreateDatasource')">
                </div>
              </div>
            </section>
          </div>

          <div class="help-sub-group">
            <div class="help">
              <section id="help-create-data-source-connection">
                <div class="help-header"><h4 class="title">{{$t('view.helpCreateDatabase.createConnection')}}</h4></div>
                <div class="help-body">
                  <div class="content-img pt-10">
                    <img src="../../images/data/help_datasource_02.jpg" alt="데이터 소스 연결생성 이미지">
                  </div>
                </div>
              </section>
              <div class="help">
                <section id="help-setting-data-source-sync">
                  <div class="help-sub-header"><h4 class="title">{{$t('view.helpCreateDatabase.settingDataSync')}}</h4></div>
                  <div class="help-body">
                    <div class="content-text" v-html="$t('view.helpCreateDatabase.explainSettingDataSync1')">
                    </div>
                    <div class="content-img">
                      <img src="../../images/data/help_datasource_03.jpg" alt="데이터 소스 연결생성 중 동기화 일정 설정 2 이미지">
                    </div>
                    <div class="content-text pt-10" v-html="$t('view.helpCreateDatabase.explainSettingDataSync2')">
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
  <!-- 도움말 : 데이터 소스 -->
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
export default class HelpCreateDatabase extends Vue {
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