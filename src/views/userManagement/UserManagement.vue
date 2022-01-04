<template>
  <!-- 유저관리 -->
  <div class="manage-common-component manage-component">
    <component :is="tabComponent"></component>
  </div>
  <!-- 유저관리 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import TopologyTemplateTab from './tabs/TopologyTemplateTab.vue';
import TopologyInstanceTab from './tabs/TopologyInstanceTab.vue';
import UserTab from './tabs/UserTab.vue';
import RoleTab from './tabs/RoleTab.vue';
import WorkspaceTab from './tabs/WorkspaceTab.vue';
import MenuHistoryTab from './tabs/MenuHistoryTab.vue';
import LoginHistoryTab from './tabs/LoginHistoryTab.vue';

@Component({
  components: {
    TopologyTemplateTab,
    TopologyInstanceTab,
    UserTab,
    RoleTab,
    WorkspaceTab,
    MenuHistoryTab,
    LoginHistoryTab,
  },
  computed: mapGetters({}),
})
export default class UserManagement extends Vue {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */

  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 메소드 선언 */
  get tabComponent() {
    switch (this.$route.query.tab) {
      case 'topologyTemplate': {
        return 'TopologyTemplateTab';
      }
      case 'topologyInstance': {
        return 'TopologyInstanceTab';
      }
      case 'user': {
        return 'UserTab';
      }
      case 'role': {
        return 'RoleTab';
      }
      case 'workspace': {
        return 'WorkspaceTab';
      }
      case 'menuHistory': {
        return 'MenuHistoryTab';
      }
      case 'loginHistory': {
        return 'LoginHistoryTab';
      }
      default: {
        return 'UserTab';
      }
    }
  }
}
</script>