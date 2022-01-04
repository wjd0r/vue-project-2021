<template>
  <!-- 구분 -->
  <div class="topologe-component configuration-component">
    <div class="topologe-content configuration-content">
      <div class="content-header">
        <h4 class="title" desc="설정">{{ $t('view.sso.topology.label.setting') }}</h4>
      </div>
      <div class="content-body">
        <div class="list-content" v-if="topology.type2 == 'create'">
          <template v-for="step, index in topology.flow">
            
            <div class="configuration" v-if="step == type.INPUT" :class="{active : topology.flowstate === index}" @click="onClickSide('TopologyInstanceStreamInput')" :key="index">
              <div class="content-header">
                <h5 class="title" desc="Stream Input 설정">{{ $t('view.sso.topology.label.streamInput') }}</h5>
              </div>
            </div>

            <div class="configuration" v-if="step == type.PREVIEW" :class="{active : topology.flowstate === index}" :key="index">
              <div class="content-header">
                <h5 class="title" desc="Data Preview">{{ $t('view.sso.topology.label.dataPreview') }}</h5>
              </div>
            </div>
            <div class="configuration" v-if="step == type.FILTER" :class="{active : topology.flowstate === index}" :key="index">
              <div class="content-header">
                <h5 class="title" desc="Filter Stream">{{ $t('view.sso.topology.label.filterStream') }}</h5>
              </div>
            </div>
            <div class="configuration" v-if="step == type.JOIN" :class="{active : topology.flowstate === index}" :key="index">
              <div class="content-header">
                <h5 class="title" desc="Join Stream">{{ $t('view.sso.topology.label.joinStream') }}</h5>
              </div>
            </div>
            <div class="configuration" v-if="step == type.STORAGE" :class="{active : topology.flowstate === index}" :key="index">
              <div class="content-header">
                <h5 class="title" desc="Target Storage 설정">{{ $t('view.sso.topology.label.targetStorage') }}</h5>
              </div>
            </div>

          </template>

        </div>
        <!-- 토폴로기 instance 수정 list -->
        <div class="list-modify-content" v-else>
          <div class="configuration" :class="{active : topology.form === type.FORM}" @click="onClickSide(type.FORM)">
            <div class="content-header">
              <h5 class="title" desc="Properties">{{ $t('view.sso.topology.label.properties') }}</h5>
            </div>
          </div>
          <div class="sub-list">
            <div class="configuration" :class="{active : topology.form != type.FORM}">
              <div class="content-header">
                <h5 class="title" desc="Pipeline 설정">{{ $t('view.sso.topology.label.pipeline') }}</h5>
              </div>
            </div>
            <div class="content-body">
              <div class="configuration sub" :class="{active : topology.form === type.INPUT}" @click="onClickSide(type.INPUT)">
                <div class="content-header">
                  <h5 class="title" desc="Stream Input 설정">{{ $t('view.sso.topology.label.streamInput') }}</h5>
                </div>
              </div>
              <div class="configuration sub" :class="{active : topology.form === type.PREVIEW}" @click="onClickSide(type.PREVIEW)">
                <div class="content-header">
                  <h5 class="title" desc="Data Preview">{{ $t('view.sso.topology.label.dataPreview') }}</h5>
                </div>
              </div>
              <div class="configuration sub" :class="{active : topology.form === type.FILTER}" @click="onClickSide(type.FILTER)">
                <div class="content-header">
                  <h5 class="title" desc="Filter Stream">{{ $t('view.sso.topology.label.filterStream') }}</h5>
                </div>
              </div>
              <div class="configuration sub" :class="{active : topology.form === type.JOIN}" @click="onClickSide(type.JOIN)">
                <div class="content-header">
                  <h5 class="title" desc="Join Stream">{{ $t('view.sso.topology.label.joinStream') }}</h5>
                </div>
              </div>
              <div class="configuration sub" :class="{active : topology.form === type.STORAGE}" @click="onClickSide(type.STORAGE)">
                <div class="content-header">
                  <h5 class="title" desc="Target Storage 설정">{{ $t('view.sso.topology.label.targetStorage') }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 토폴로기 instance 수정 list -->
      </div>
      <div class="content-footer" v-if="topology.type2 == 'create'">
        <div class="btn-group">
          <b-button variant="primary" class="btn-next" @click="onClickNext" :disabled="nextButtonDisabled" desc="다음">{{ $t('view.sso.topology.button.next') }}</b-button>
          <b-button variant="secondary" class="btn-cancel" @click="onClickCancel" desc="취소">{{ $t('view.sso.topology.button.cancel') }}</b-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 구분 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';

import Topology, { TYPE } from '../../ts/Topology';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class TopologyFormSide extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;
  nextButtonDisabled: boolean = true;
  type = TYPE;

  created() {
    EventBus.$on('nextButtonDisabled', (disabled: boolean) => {
      this.nextButtonDisabled = disabled;
    });
  }

  beforeDestroy() {
    EventBus.$off('nextButtonDisabled');
  }

  // 사이드 메뉴 클릭
  onClickSide(form: TYPE.FLOW | TYPE.FORM | TYPE.INPUT | TYPE.PREVIEW | TYPE.FILTER | TYPE.JOIN | TYPE.STORAGE | TYPE.PROGRESS | TYPE.RESULT) {
    this.topology.form = form;
  }

  // 다음 버튼 클릭
  onClickNext() {
    this.topology.flowstate++;
    this.topology.form = this.topology.flow[this.topology.flowstate];
  }

  // 취소 버튼 클릭
  onClickCancel() {
    const title = this.$t('view.sso.topology.alert.warning').toString();
    const message = this.$t('view.sso.topology.alert.cancelCreation').toString();
    const okTitle = this.$t('view.sso.topology.alert.yes').toString();
    const cancelTitle = this.$t('view.sso.topology.alert.no').toString();

    utils.bvModalmsgBoxConfirm(this, title, message, okTitle, cancelTitle,'warning').then((res) => {
      if(res) {
        this.topology.initData();
        this.$parent.$emit('close');
      }
    });
  }
}
</script>