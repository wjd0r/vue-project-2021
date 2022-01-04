<template>
<div class="main-common-component flowbox-component">
  <div class="flowbox-content row">
    <!-- 생성 과정 -->
    <div class="create-flow-component">
      <div class="create-flow-content" v-on:click.stop="hide=null">
        <div class="content-header">
          <h4 class="title" desc="Topologe 생성 과정">{{ $t('view.sso.topology.label.creationProcess') }}</h4>
        </div>
        <div class="content-body">
          <div class="row row-content create-flow">
            <FlowboxTopologeInput/>

            <div class="ico-arrow">
              <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
            </div>

            <FlowboxPipeline class="disabled" :disabled="'disabled'"/>

            <div class="ico-arrow">
              <div class="ico-flow-arrow ico-arrow-right" alt="오른쪽 방향 아이콘"></div>
            </div>

            <FlowboxComplete :disabled="'disabled'"/>
          </div>
        </div>
        <div class="content-footer">
          <div class="day-hide">
            <b-form-checkbox  id="dayHide" name="day-hide" v-model="sightDay" @change="onChangeSightDay">{{ $t('view.repo.create.doNotDay') }}</b-form-checkbox>
          </div>
          <b-button variant="primary" class="btn-primary btn-next" @click="$emit('close')">{{ $t('view.repo.create.next') }}</b-button>
        </div>
      </div>
    </div>
    <!-- 생성 과정 -->
  </div>
</div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { ISetting } from '@/interface';

import FlowboxTopologeInput from '../../../components/flows/flowbox/FlowboxTopologeInput.vue';
import FlowboxPipeline from '../../../components/flows/flowbox/FlowboxPipeline.vue';
import FlowboxComplete from '../../../components/flows/flowbox/FlowboxComplete.vue';
import moment from 'moment';

@Component({
 components: {
   FlowboxTopologeInput,
   FlowboxPipeline,
   FlowboxComplete
 },
 computed: mapGetters({
   setting: 'sso/getSetting',
 }),
})
export default class TopologyInstanceFlow extends Mixins(UtilsMixin) {
  setting!: ISetting;
  sightDay: boolean = false;

  onChangeSightDay() {
    if(!this.sightDay) {
      this.setting.sightDay.topology = moment().format('YYYY-MM-DD');
    } else {
      this.setting.sightDay.topology = '';
    }

    this.$store.dispatch('sso/setSetting', {
      id: this.$store.getters['sso/getMyInfo'].id,
      config: { ...this.setting },
    });
  }
}
</script>