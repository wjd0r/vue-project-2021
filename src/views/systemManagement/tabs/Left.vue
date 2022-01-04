<template>
  <div class="left-component col-3">
    <div class="left-content">
      <!-- 구분 -->
      <div class="configuration-component m-none">
        <div class="configuration-content">
          <div class="content-header">
            <h4 class="title">{{ $t('view.setting.side.division') }}</h4>
          </div>
          <div class="content-body">
            <div class="list-content">
              <!-- configuration -->
              <div class="configuration" @click="onClickCommon" :class="{ active: seletedActive == 'common' }">
                <div class="content-header">
                  <h5 class="title">{{ $t('view.setting.side.common') }}</h5>
                </div>
              </div>
              <!-- configuration -->
              <!-- configuration -->
              <div class="configuration" @click="onClickDashboard" :class="{ active: seletedActive == 'dashboard' }">
                <div class="content-header">
                  <h5 class="title">{{ $t('view.setting.side.dashboard') }}</h5>
                </div>
              </div>
              <!-- configuration -->
              <!-- configuration -->
              <div class="configuration dropmenu" v-b-toggle.configurationProcess>
                <div class="content-header">
                  <h5 class="title">{{ $t('view.setting.side.processSettings') }}</h5>
                  <div class="right-align">
                    <div class="ico-configuration ico-arrow-top" alt="방향 아이콘"></div>
                  </div>
                </div>
              </div>
              <b-collapse id="configurationProcess">
                <div class="sub-configuration" @click="onClickModel" :class="{ active: seletedActive == 'model' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ProcessModel') }}</h5>
                  </div>
                </div>
                <div class="sub-configuration" @click="onClickDiscovery" :class="{ active: seletedActive == 'discovery' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ProcessAnalysis') }}</h5>
                  </div>
                </div>
                <div class="sub-configuration" @click="onClickDelta" :class="{ active: seletedActive == 'delta' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ProcessComparison') }}</h5>
                  </div>
                </div>
                <div class="sub-configuration" @click="onClickAnimation" :class="{ active: seletedActive == 'animation' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ProcessAnimation') }}</h5>
                  </div>
                </div>
                <div class="sub-configuration" @click="onClickFlow" :class="{ active: seletedActive == 'flow' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ProcessFlow') }}</h5>
                  </div>
                </div>
              </b-collapse>
              <!-- configuration -->

              <!-- configuration -->
              <div class="configuration dropmenu" v-b-toggle.configurationData>
                <div class="content-header">
                  <h5 class="title">{{ $t('view.setting.side.DataAnalysisSettings') }}</h5>
                  <div class="right-align">
                    <div class="ico-configuration ico-arrow-top" alt="방향 아이콘"></div>
                  </div>
                </div>
              </div>
              <b-collapse id="configurationData">
                <div class="sub-configuration" @click="onClickSocial" :class="{ active: seletedActive == 'social' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ResourceRelationshipAnalysis') }}</h5>
                  </div>
                </div>
                <div class="sub-configuration" @click="onClickMatrix" :class="{ active: seletedActive == 'matrix' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.DataAnalysis') }}</h5>
                  </div>
                </div>
                <div class="sub-configuration" @click="onClickDotted" :class="{ active: seletedActive == 'dotted' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ActivityAnalysis') }}</h5>
                  </div>
                </div>
                <!-- <div class="sub-configuration" @click="onClickGantt" :class="{ active: seletedActive == 'gantt' }">
                  <div class="content-header">
                    <h5 class="title">{{ $t('view.setting.side.ganttChart') }}</h5>
                  </div>
                </div> -->
              </b-collapse>
              <!-- configuration -->
            </div>
          </div>
        </div>
      </div>
      <!-- 구분 -->

      <!-- 구분 : 모바일 -->
      <div class="configuration-component m-config">
        <div class="configuration-content">
          <b-dropdown id="mobileConfig" :text="$t('view.setting.side.division')">
            <b-dropdown-item @click="onClickCommon" :class="{ active: seletedActive == 'common' }">{{ $t('view.setting.side.common') }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="onClickDashboard" :class="{ active: seletedActive == 'dashboard' }">{{ $t('view.setting.side.dashboard') }}</b-dropdown-item>
            <b-dropdown-group id="processSetting" :header="$t('view.setting.side.processSettings')">
              <b-dropdown-item @click="onClickModel" :class="{ active: seletedActive == 'model' }">{{ $t('view.setting.side.ProcessModel') }}</b-dropdown-item>
              <b-dropdown-item @click="onClickDiscovery" :class="{ active: seletedActive == 'discovery' }">{{ $t('view.setting.side.ProcessAnalysis') }}</b-dropdown-item>
              <b-dropdown-item @click="onClickDelta" :class="{ active: seletedActive == 'delta' }">{{ $t('view.setting.side.ProcessComparison') }}</b-dropdown-item>
              <b-dropdown-item @click="onClickAnimation" :class="{ active: seletedActive == 'animation' }">{{ $t('view.setting.side.ProcessAnimation') }}</b-dropdown-item>
            </b-dropdown-group>
            <b-dropdown-group id="processSetting" :header="$t('view.setting.side.DataAnalysisSettings')">
              <b-dropdown-item @click="onClickSocial" :class="{ active: seletedActive == 'social' }">{{ $t('view.setting.side.ResourceRelationshipAnalysis') }}</b-dropdown-item>
              <b-dropdown-item @click="onClickMatrix" :class="{ active: seletedActive == 'matrix' }">{{ $t('view.setting.side.DataAnalysis') }}</b-dropdown-item>
              <b-dropdown-item @click="onClickDotted" :class="{ active: seletedActive == 'dotted' }">{{ $t('view.setting.side.ActivityAnalysis') }}</b-dropdown-item>
              <!-- <b-dropdown-item @click="onClickGantt" :class="{ active: seletedActive == 'gantt' }">{{ $t('view.setting.side.ganttChart') }}</b-dropdown-item> -->
            </b-dropdown-group>
          </b-dropdown>
        </div>
      </div>
      <!-- 구분 : 모바일 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';
import { ISetting } from '@/interface';

import { UtilsMixin } from '@/mixin';

@Component({
  components: {},
  computed: mapGetters({
    setting: 'sso/getSetting',
  }),
})
export default class Left extends Mixins(UtilsMixin) {
  setting!: ISetting;
  seletedActive: string = 'common';
  onClickCommon() {
    EventBus.$emit('selecteFrom', { form: 'common', title: this.$t('view.setting.side.common').toString() });
    this.seletedActive = 'common';
  }
  onClickWorkspace() {
    EventBus.$emit('selecteFrom', { form: 'workspace', title: 'workspace' });
    this.seletedActive = 'workspace';
  }
  onClickGlobal() {
    EventBus.$emit('selecteFrom', { form: 'global', title: this.$t('view.setting.side.global').toString() });
    this.seletedActive = 'global';
  }
  onClickDashboard() {
    EventBus.$emit('selecteFrom', { form: 'dashboard', title: this.$t('view.setting.side.dashboard').toString() });
    this.seletedActive = 'dashboard';
  }
  onClickModel() {
    EventBus.$emit('selecteFrom', { form: 'model', title: this.$t('view.setting.side.ProcessModel').toString() });
    this.seletedActive = 'model';
  }
  onClickDiscovery() {
    EventBus.$emit('selecteFrom', { form: 'discovery', title: this.$t('view.setting.side.ProcessAnalysis').toString() });
    this.seletedActive = 'discovery';
  }
  onClickDelta() {
    EventBus.$emit('selecteFrom', { form: 'delta', title: this.$t('view.setting.side.ProcessComparison').toString() });
    this.seletedActive = 'delta';
  }
  onClickAnimation() {
    EventBus.$emit('selecteFrom', { form: 'animation', title: this.$t('view.setting.side.ProcessAnimation').toString() });
    this.seletedActive = 'animation';
  }
  onClickFlow() {
    EventBus.$emit('selecteFrom', { form: 'flow', title: this.$t('view.setting.side.ProcessFlow').toString() });
    this.seletedActive = 'flow';
  }
  onClickSocial() {
    EventBus.$emit('selecteFrom', { form: 'social', title: this.$t('view.setting.side.ResourceRelationshipAnalysis').toString() });
    this.seletedActive = 'social';
  }
  onClickMatrix() {
    EventBus.$emit('selecteFrom', { form: 'matrix', title: this.$t('view.setting.side.DataAnalysisSettings').toString() });
    this.seletedActive = 'matrix';
  }
  onClickDotted() {
    EventBus.$emit('selecteFrom', { form: 'dotted', title: this.$t('view.setting.side.ActivityAnalysis').toString() });
    this.seletedActive = 'dotted';
  }
  onClickGantt() {
    EventBus.$emit('selecteFrom', { form: 'gantt', title: this.$t('view.setting.side.ganttChart').toString() });
    this.seletedActive = 'gantt';
  }
}
</script>