<template>
  <div class="database-test-component">
    <div class="database-test-content">
      <div class="content-body">
        <!-- 테스트 중 -->
        <div class="test-content" v-if="isTesting.dbLoading">
          <div class="notice-text"><b-spinner small></b-spinner></div>
        </div>
        
        <!-- 테스트 성공 -->
        <div class="test-success-content" v-if="isTesting.isSuccess && !isTesting.dbLoading">
        <!-- <div class="test-success-content"> -->
          <div class="success-text">{{ $t('view.repo.label.testSuccess')}}</div>
          <div class="content-header">
            <h5 class="title">{{ $t('view.repo.form.dataSource') }}</h5>
            <div class="count-text">({{Object.keys(tableList).length}})</div>
          </div>
          <div class="table-content">
            <table class="table line">
              <thead>
                <tr>
                  <th>{{ $t('view.repo.label.testName')}}</th>
                  <th>{{ $t('view.repo.label.testDivision') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableList" :key="index" @click="onClickTr(item, index)" :class="{'table-active': selectedIndex == index}">
                  <td>{{ item.ename }}</td>
                  <td>{{ item.etype }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 테스트 성공 -->

        <!-- 테스트 실패 -->
        <div class="test-fail-content" v-if="!isTesting.isSuccess && !isTesting.dbLoading">
          <div class="fail-text">{{  $t('view.repo.label.testFailure') }}</div>
          <div class="fail-content">
            <div class="">{{ $t('view.repo.label.testWrong') }}</div>
          </div>
        </div>
        <!-- 테스트 실패 -->
      </div>
    </div>
    <div class="content-tooer" v-if="!isTesting.dbLoading">
    <!-- <div class="content-tooer"> -->
      <div class="btn-group">
        <b-button v-if="isTesting.isSuccess" variant="primary" class="btn" @click="$emit('dataSourceUse', selectedItem)">{{ $t('view.repo.label.testUse') }}</b-button>
        <b-button v-else variant="outline-secondary" class="btn-close" @click="$emit('close')">{{ $t('view.repo.label.testClose') }}</b-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
 components: {},
 computed: mapGetters({}),
})
export default class DatabaseTestModal extends Vue {
  /* Prop 선언 */
  @Prop()
  private isTesting!: {
    dbLoading: boolean;
    isSuccess: boolean;
  };

  @Prop()
  private tableList: any;

  selectedItem: any = null;
  selectedIndex: number = null;

  /* 메소드 선언 */
  onClickBack() {
    window.history.back();
  }

  onClickTr(item: any, index: number) {
    this.selectedItem = item;
    this.selectedIndex = index;
  }

  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 
  created(){}
  */
  /*
  mounted() {}
  */

}
</script>