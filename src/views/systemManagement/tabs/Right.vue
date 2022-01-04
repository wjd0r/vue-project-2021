<template>
  <div class="right-component col-9">
    <div class="right-content">
      <!-- 설정 -->
      <div class="setting-component">
        <div class="setting-content">
          <div class="content-header">
            <h4 class="title">{{ selectedFormTitle }}</h4>
          </div>
          <div class="content-body">
            <component :is="formComponent" />
          </div>
        </div>
      </div>
      <!-- 설정 -->
    </div>
    <!-- bottom -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import Common from '../form/Common.vue';
import Workspace from '../form/Workspace.vue';
import Dashboard from '../form/Dashboard.vue';
import Global from '../form/Global.vue';

import Model from '../form/process/Model.vue';
import Discovery from '../form/process/Discovery.vue';
import Delta from '../form/process/Delta.vue';
import Animation from '../form/process/Animation.vue';
import Flow from '../form/process/Flow.vue'; // 프로세스 흐름 분석

import Social from '../form/analysis/Social.vue';
import Matrix from '../form/analysis/Matrix.vue';
import Dotted from '../form/analysis/Dotted.vue';
import Gantt from '../form/analysis/Gantt.vue';

import { UtilsMixin } from '@/mixin';

@Component({
  components: {
    Common,
    Workspace,
    Dashboard,
    Global,
    Model,
    Discovery,
    Delta,
    Animation,
    Social,
    Matrix,
    Dotted,
    Gantt,
    Flow,
  },
  computed: mapGetters({}),
})
export default class Right extends Mixins(UtilsMixin) {
  selectedForm: string = 'common';
  selectedFormTitle: string = this.$t('view.setting.side.common').toString();

  mounted() {
    EventBus.$on('selecteFrom', (selected: any) => {
      this.selectedForm = selected.form;
      this.selectedFormTitle = selected.title;
    });
  }

  beforeDestroy() {
    EventBus.$off('selecteFrom');
  }

  get formComponent() {
    return `${this.selectedForm.charAt(0).toUpperCase()}${this.selectedForm.slice(1)}`;
  }
}
</script>