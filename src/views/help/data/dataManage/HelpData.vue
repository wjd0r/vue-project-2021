<template>
  <!-- 도움말 : 데이터 관리하기 > 데이터셋 -->
  <div class="help-content help-common">
    <section id="help-eventlist">
      <div class="content-header"><h3 class="title">{{$t('view.helpData.checkAllData')}}</h3></div>
      <div class="content-body">
        <div class="help-item">
          <div class="help-group">
            <div class="help">
              <div class="help-header"><h4 class="title">{{$t('view.helpData.data')}}</h4></div>
              <div class="help-body">
                <div class="content-text" v-html="$t('view.helpData.dataExplain')">
                </div>
                <div class="content-img">
                  <img src="../../images/data/help_data_01.jpg" alt="데이터 목록 이미지">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 도움말 : 데이터 관리하기 > 데이터셋 -->
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
export default class HelpData extends Vue {
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