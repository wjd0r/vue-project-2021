<template>
  <div class="limit-component">
    <div class="limit-content">
      <div class="content-header">
        <div class="ico-limit">
          <div class="ico-error" alt="에러 아이콘"></div>
        </div>
        <h3 class="title">{{ $t('view.common.noPermission.title') }}</h3>
      </div>
      <div class="content-body" v-html="$t('view.common.noPermission.content')">
        <!-- <p>해당 기능의 권한이 없습니다.</p> -->

        <b-btn-group>
          <b-button variant="primary" @click="onClickHome()">{{ $t('view.common.noPermission.home') }}</b-button>
        </b-btn-group>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class Name extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  //  created(){
  //  }
  //  mounted() {
  //  }
  /* 메소드 선언 */
  onClickHome() {
    this.$router.push('/');
  }
}
</script>