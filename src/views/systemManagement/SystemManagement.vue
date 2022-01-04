<template>
<!-- 시스템 설정 -->
  <div class="manage-common-component user-setting-component" :class="`lang-${$i18n.locale}`">
    <div class="manage-common-content user-setting-content row">
      <div class="top-component" :class="{ 'd-none': isMobileBlock() }">
        <div class="top-content">
          <div class="left-align">
            <b-button variant="outline-primary" class="btn-outline-primary btn-clear" @click="onClickReset">{{ $t('view.setting.top.reset') }}</b-button>
          </div>
          <div class="btn-group">
            <b-button variant="primary" class="btn-primary btn-save" @click="onClickSave">{{ $t('view.setting.top.save') }}</b-button>
            <b-button variant="secondary" class="btn-secondary btn-close" @click="onClickCancel">{{ $t('view.setting.top.cancel') }}</b-button>
          </div>
        </div>
      </div>
      <Left/>
      <Right/>
    </div>
  </div>
  <!-- 시스템 설정 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';

import Right from './tabs/Right.vue';
import Left from './tabs/Left.vue';
import { ISetting } from '@/interface';

import { DefaultSetting } from '@/interface/ISetting';
import { EventBus } from '@/common';

import _ from 'lodash';

import { UtilsMixin } from '@/mixin';

@Component({
  components: {
    Right,
    Left,
  },
  computed: mapGetters({
    setting: 'sso/getSetting',
    myInfo: 'sso/getMyInfo',
  }),
})
export default class SystemManagement extends Mixins(UtilsMixin) {
  setting!: ISetting;
  myInfo!: any;

  async onClickReset() {
    const title = this.$t('view.setting.title.resetSettings').toString();
    const content = this.$t('view.setting.content.reset').toString();
    const yes = this.$t('view.setting.button.reset').toString();
    const no = this.$t('view.setting.button.cancel').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');
    if (!res) return;

    const data = {
      id: this.myInfo.id,
      config: { ...DefaultSetting },
    }
    this.$store.dispatch('sso/setSetting', data);
    
    this.$store.commit('sso/setSetting', { ...DefaultSetting });
    document.documentElement.className = 'theme-' + this.setting.common.theme;

    EventBus.$emit('resetSetting');
  }

  onClickSave() {
    EventBus.$emit('saveSetting', (arg: any) => {
      const data = {
        id: this.myInfo.id,
        config: arg,
      }
      this.$store.dispatch('sso/setSetting', data);
    });
  }

  onClickCancel() {
    EventBus.$emit('cancelSetting');
  }
}
</script>