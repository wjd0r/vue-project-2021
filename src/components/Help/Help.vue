<template>
  <WindowPortal v-model="open">
    <Help />
  </WindowPortal>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import WindowPortal from '../WindowPortal.vue';
import Help from '../../views/help/Help.vue';

@Component({
  components: { WindowPortal, Help },
  computed: mapGetters({}),
})
export default class AppHelp extends Vue {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  open: boolean = false;

  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  // created() {}

  mounted() {
    EventBus.$on('showHelp', () => {
      if(this.open == true){
        this.open = false;
        setTimeout(()=> this.open = true, 100);
      }else {
        this.open = true;
        return;
      }
    });
  }

  beforeDestroy() {
    EventBus.$off('showHelp');
  }

  /* 메소드 선언 */
}
</script>