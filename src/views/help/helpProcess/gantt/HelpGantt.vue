<template>
  <!-- 도움말 : 간트차트 -->
  <div class="help-content help-common">
    <section id="help-gantt">
      <div class="content-header"><h3 class="title">간트 차트</h3></div>
      <div class="content-middle">
        <div class="content-text">
          <p>각 <a href="#help-variant-is" class="link">배리언트</a>의 진행 현황을 액티비티 별로 확인할 수 있습니다.</p>
          <p>값을 클릭 시 해당 값의 케이스 목록을 확인할 수 있습니다.</p>
        </div>
        <div class="content-img">
          <img src="../../images/process/help_gantt.jpg" alt="간트 차트 화면 이미지">
        </div>
      </div>
    </section>
    <div class="content-body">
      <div class="help-item">
        <div class="help-group">
          <div class="help">
            <section id="help-gantt-filter-title-properties">
              <div class="content-sub-header"><h4 class="title">분석 조건 속성</h4></div>
              <div class="content-body overflow-x">
                <table class="table line">
                  <thead>
                    <tr>
                      <th width="100px">속성 명</th>
                      <th>속성 값</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>범례</th>
                      <td>액티비티</td>
                    </tr>
                    <tr>
                      <th>정렬 기준</th>
                      <td>케이스 수, 시작/완료시간, 짧은/긴 기간</td>
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
  <!-- 도움말 : 간트차트 -->
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
export default class HelpGantt extends Vue {
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