<template>
  <!-- notification -->
  <div class="form-content">
    <div class="content-header"><h5 class="title">{{ $t('view.setting.common.theme') }}</h5></div>
    <div class="content-body theme-select">
      <b-form-group :label="$t('view.setting.common.theme')" label-cols="2" >
        <!-- test -->
        <template v-if="env.IPR_MODE == 'TEST'">
          <b-form-radio v-model="setting.common.theme" value="gray" :disabled="isMobileBlock()">{{ $t('view.setting.common.entTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="blue" :disabled="isMobileBlock()">{{ $t('view.setting.common.proTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="purple" :disabled="isMobileBlock()">{{ $t('view.setting.common.saasTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="brown" :disabled="isMobileBlock()">{{ $t('view.setting.common.brownTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="dark" :disabled="isMobileBlock()">{{ $t('view.setting.common.darkTheme') }}</b-form-radio>
        </template>

        <!-- IPR-PRO packaging -->
        <template v-if="env.IPR_MODE == 'PRO'">
          <b-form-radio v-model="setting.common.theme" value="blue" :disabled="isMobileBlock()">{{ $t('view.setting.common.defaultTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="brown" :disabled="isMobileBlock()">{{ $t('view.setting.common.brownTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="dark" :disabled="isMobileBlock()">{{ $t('view.setting.common.darkTheme') }}</b-form-radio>
        </template>

        <!-- IPR-PRO packaging -->
        <template v-if="env.IPR_MODE == 'ENT'">
          <b-form-radio v-model="setting.common.theme" value="gray" :disabled="isMobileBlock()">{{ $t('view.setting.common.defaultTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="brown" :disabled="isMobileBlock()">{{ $t('view.setting.common.brownTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="dark" :disabled="isMobileBlock()">{{ $t('view.setting.common.darkTheme') }}</b-form-radio>
        </template>

        <template v-if="env.IPR_MODE == 'SAAS'">
          <b-form-radio v-model="setting.common.theme" value="purple" :disabled="isMobileBlock()">{{ $t('view.setting.common.defaultTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="brown" :disabled="isMobileBlock()">{{ $t('view.setting.common.brownTheme') }}</b-form-radio>
          <b-form-radio v-model="setting.common.theme" value="dark" :disabled="isMobileBlock()">{{ $t('view.setting.common.darkTheme') }}</b-form-radio>
        </template>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.label.notifiLimit') }} </h5></div>
    <div class="content-body">
      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-form-checkbox v-model="setting.common.notifiLimit.use" value="day" :disabled="isMobileBlock()">{{ $t('view.setting.label.days') }}</b-form-checkbox>
          </b-input-group-prepend>
          <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.common.notifiLimit.day" min="1" max="30" :state="dayState" type="number" number aria-label="Text input with checkbox" :disabled="isMobileBlock()"/>
          <b-input-group-append class="text-muted">{{ $t('view.setting.label.min') }} = 1, {{ $t('view.setting.label.max') }} = 30</b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <b-form-checkbox v-model="setting.common.notifiLimit.use" value="count">{{ $t('view.setting.label.count') }}</b-form-checkbox>
          </b-input-group-prepend>
          <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.common.notifiLimit.count" min="1" max="100" :state="countState" type="number" number :disabled="isMobileBlock()"/>
          <b-input-group-append class="text-muted">{{ $t('view.setting.label.min') }} = 1, {{ $t('view.setting.label.max') }} = 30</b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-button variant="outline-primary" class="btn-cache" @click="onClickCacheDelete" :class="{ 'd-none': isMobileBlock() }" :disabled="isMobileBlock()">{{ $t('view.setting.common.clearCache') }}</b-button>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.common.workspace') }}</h5></div>
    <div class="content-body">
      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.common.movingScreenWhenClickingEventLog') }}</template>
          </b-input-group-prepend>
          <b-form-select v-model="setting.common.workspace.whenEventLogIsClicked" :disabled="isMobileBlock()">
            <template v-for="item, index in workspace.whenEventLogIsClicked">
              <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
            </template>
          </b-form-select>
          <b-input-group-append class="text-muted"></b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.common.defaultWorkspace') }}</template>
          </b-input-group-prepend>
          <b-form-select v-model="setting.common.workspace.defaultWorkspace" :options="workspace.defaultWorkspace" :disabled="isMobileBlock()"/>
          <b-input-group-append class="text-muted"></b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.label.maxStorage') }} (MB)</template>
          </b-input-group-prepend>
          <b-form-input :placeholder="$t('view.setting.placeholder.pleaseEnterAnumber')" v-model="setting.common.workspace.maxStorage" min="250" type="number" readonly :disabled="isMobileBlock()"/>
          <b-input-group-append class="text-muted">{{ $t('view.setting.label.min') }} = 250</b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>

    <div class="content-header"><h5 class="title">{{ $t('view.setting.common.fullAnalysis') }}</h5></div>
    <div class="content-body">
      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.common.basicAnalysisPeriod') }}</template>
          </b-input-group-prepend>
          <b-form-select v-model="setting.common.analysis.defaultAnalysisPeriod" :disabled="isMobileBlock()">
            <template v-for="item, index in global.defaultAnalysisPeriod">
              <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
            </template>
          </b-form-select>
          <b-input-group-append class="text-muted"></b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.common.typeWithCase') }}</template>
          </b-input-group-prepend>
          <b-form-select v-model="setting.common.analysis.keepCases" :options="global.keepCases" :disabled="isMobileBlock()"/>
          <b-input-group-append class="text-muted"></b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.common.basicAnalysisItems') }}</template>
          </b-input-group-prepend>
          <b-form-select v-model="setting.common.analysis.variantType" :disabled="isMobileBlock()">
            <template v-for="item, index in global.variantType">
              <b-form-select-option :value="item.value" :key="index">{{ $t(`view.setting.selectbox.${item.text}`) }}</b-form-select-option>
            </template>
          </b-form-select>
          <b-input-group-append class="text-muted"></b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group>
        <b-input-group>
          <b-input-group-prepend>
            <template>{{ $t('view.setting.common.algorithms') }}</template>
          </b-input-group-prepend>
          <b-form-select v-model="setting.common.analysis.eventBag" :options="model.eventBag" :disabled="isMobileBlock()"></b-form-select>
          <b-input-group-append class="text-muted"></b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
  </div>
  <!-- notification -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { ISetting } from '@/interface';

import * as $options from '../options.json';
import _, { forEach } from 'lodash';

import { UtilsMixin } from '@/mixin';
import { AxiosError } from 'axios';

@Component({
  components: {},
  computed: mapGetters({
    readOnlySetting: 'sso/getSetting',
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
  }),
})
export default class Common extends Mixins(UtilsMixin) {
  readonly readOnlySetting!: ISetting;
  myInfo!: any;
  projectId!: string;

  readonly ERROR_MESSAGE: string = this.$t('view.setting.message.check').toString();
  setting: ISetting = null;
  workspace: any = {};
  global: any = {};
  model: any = {};

  created() {
    this.onReset();
    this.workspace = JSON.parse(JSON.stringify($options)).default.workspace;
    this.workspace.defaultWorkspace.push({text: this.$t('view.setting.title.all').toString(), value: null});

    forEach(this.myInfo.workspaces, (workspace) => {
      this.workspace.defaultWorkspace.push({
        text: workspace.name,
        value: workspace.id,
      });
    });

    this.global = JSON.parse(JSON.stringify($options)).default.global;
    this.model = JSON.parse(JSON.stringify($options)).default.process.model;

    this.setting.common.workspace.defaultWorkspace = isNaN(this.setting.common.workspace.defaultWorkspace) ? null : this.setting.common.workspace.defaultWorkspace;
  }

  mounted() {
    EventBus.$on('saveSetting', (callback: any) => this.onSave(callback));
    EventBus.$on('cancelSetting', () => this.onReset());
    EventBus.$on('resetSetting', () => this.onReset());
  }

  beforeDestroy() {
    EventBus.$off('saveSetting');
    EventBus.$off('cancelSetting');
    EventBus.$off('resetSetting');
  }

  async onSave(callback: any) {
    const { day, count } = this.setting.common.notifiLimit;
    const { maxStorage } = this.setting.common.workspace;

    const cond1 = day >= 1 && day <= 30;
    const cond2 = count >= 1 && count <= 100;

    const confBlank =
      String(day) != '' && 
      String(count) != '' && 
      String(maxStorage) != '';

    if (cond1 && cond2 && confBlank) {
      callback(_.cloneDeep(this.setting));
      this.onCompletion();
    } else {
      const res = await utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.ERROR_MESSAGE, 'warning');
      if (res) return;
    }
  }

  changeTheme() {
    document.documentElement.className = 'theme-' + this.setting.common.theme;
  }

  onReset() {
    this.setting = _.cloneDeep(this.readOnlySetting);
  }

  async onCompletion() {
    const res = await utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.complete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete');
    // 완료 후 테마 변경
    if(res) this.changeTheme();
  }

  // 캐시 삭제 버튼 클릭
  async onClickCacheDelete() {
    const title = this.$t('view.setting.title.delete').toString();
    const content = this.$t('view.setting.content.delete').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) {
      const res = await this.$store.dispatch('common/clearCacheWorkflow', this.projectId)
      .then((res: any) => {

        //notification 초기화
        this.$store.dispatch('notification/deleteNotificationAll');

        utils.bvModalmsgBoxOk(this, this.$t('view.setting.title.complete').toString(), this.$t('view.setting.content.complete').toString(), 'complete');
      }).catch((err: AxiosError) => utils.handlerError(this, err));
    }
  }

  get dayState() {
    const day = this.setting.common.notifiLimit.day;
    if (typeof day !== 'number') {
      return false;
    } else {
      if (1 <= day && day <= 30) {
        return null;
      } else {
        return false;
      }
    }
  }

  get countState() {
    const count = this.setting.common.notifiLimit.count;
    if (typeof count !== 'number') {
      return false;
    } else {
      if (1 <= count && count <= 100) {
        return null;
      } else {
        return false;
      }
    }
  }

  get env() {
    return window.env.app;
  }
}
</script>