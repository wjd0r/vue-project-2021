<template>
  <div class="modal-common-component topologe-instance-component" :class="`lang-${$i18n.locale} ${topology.type2}`"> <!-- 생성 : create / 수정 : modify-->
    <div class="modal-common-content topologe-instance-content">
      <div class="top-component">
        <div class="top-content">
          <div class="back" @click.prevent="onClickBack">
            <div class="ico-arrow-left" alt="왼쪽 방향 아이콘"></div>
            <div class="back-text">{{ $t('view.repo.label.back') }}</div>
          </div>
          <div class="right-align">
            <!-- <b-button variant="primary" class="btn-save">저장</b-button> -->
          </div>
          <!-- button -->
          <div class="btn-group" v-if="topology.type2 == 'modify'">
            <b-button variant="primary" class="btn-create" :class="`lang-${$i18n.locale}`" desc="저장"> {{ $t('view.sso.topology.button.save') }} </b-button>
          </div>
          <!-- button -->
        </div>
      </div>

      <FlowBarStepThree mode="topology" :stage="flowBarStepState" v-if="topology.type2 == 'create'"/>
      
      <!-- 파이프라인 -->
      <div class="manage-form-component instance-component" v-if="isPipelineForm() || topology.type2 == 'modify'">
        <div class="left-component col-3">
          <div class="left-content">
            <TopologyFormSide/>
          </div>
        </div>
        <div class="right-component col-9">
          <div class="right-content">
            <component :is="topology.form"></component>
          </div>
        </div>
      </div>
      <!-- 파이프라인 -->

      <!-- not 파이프라인 : 생성과정, 정보입력, 로딩, 완료, 실패 -->
      <div class="topologe-component plipeline-check-component" v-else>
        <component :is="topology.form"></component>
        <!-- bottom -->
        <div class="bottom-component">
          <div class="bottom-content">
            <div class="btn-group">
              <b-button v-if="!isLastScreen()" variant="primary" class="btn-primary" @click.prevent="onClickNext" :disabled="nextButtonDisabled">{{ $t('view.repo.button.next') }}</b-button>
              <b-button v-if="!isLastScreen()" variant="secondary" class="btn-secondary" @click.prevent="onClickCancel">{{ $t('view.repo.button.cancel') }}</b-button>

              <b-button v-if="isLastScreen()" variant="primary" class="btn-primary btn-complete text-right" @click.prevent="end" desc="완료">{{ $t('view.sso.topology.button.complete') }}</b-button>
              <b-button v-if="isLastScreen()" variant="outline-primary" class="btn-secondary" @click.prevent="onClickBack" desc="이전">{{ $t('view.sso.topology.button.previous') }}</b-button>
            </div>
          </div>
        </div>
        <!-- bottom -->
      </div>
      <!-- not 파이프라인 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import Topology, { TYPE } from '../ts/Topology';

import TopologyFormSide from '../form/topologyForm/TopologyFormSide.vue';

import TopologyInstanceDataPreview from '../form/topologyForm/TopologyInstanceDataPreview.vue';
import TopologyInstanceFilterStream from '../form/topologyForm/TopologyInstanceFilterStream.vue';
import TopologyInstanceFlow from '../form/topologyForm/TopologyInstanceFlow.vue';
import TopologyInstanceForm from '../form/topologyForm/TopologyInstanceForm.vue';
import TopologyInstanceJoinStream from '../form/topologyForm/TopologyInstanceJoinStream.vue';
import TopologyInstanceProgress from '../form/topologyForm/TopologyInstanceProgress.vue';
import TopologyInstanceResult from '../form/topologyForm/TopologyInstanceResult.vue';
import TopologyInstanceStreamInput from '../form/topologyForm/TopologyInstanceStreamInput.vue';
import TopologyInstanceTargetStorage from '../form/topologyForm/TopologyInstanceTargetStorage.vue';

import FlowBarStepThree from '../../components/flows/FlowBarStepThree.vue';
import { utils } from '@/common';

@Component({
  components: {
    TopologyFormSide,
    TopologyInstanceDataPreview,
    TopologyInstanceFilterStream,
    TopologyInstanceFlow,
    TopologyInstanceForm,
    TopologyInstanceJoinStream,
    TopologyInstanceProgress,
    TopologyInstanceResult,
    TopologyInstanceStreamInput,
    TopologyInstanceTargetStorage,
    FlowBarStepThree
  },
  computed: {...mapGetters({})}
})
export default class TopologyInstanceModal extends Vue {
  topology: Topology = this.$parent.$parent.$data.topology;
  nextButtonDisabled: boolean = true;

  created() {
    this.topology.form = TYPE.FORM;
  }

  // 다음 버튼 클릭
  onClickNext() {
    this.topology.flowstate++;
    this.topology.form = this.topology.flow[this.topology.flowstate];
  }

  // 뒤로가기버튼 클릭
  onClickBack() {
    if(this.topology.flowstate == 0)
      this.onClickCancel();
    else {
      this.topology.flowstate--;
      this.topology.form = this.topology.flow[this.topology.flowstate];
    }
  }

  // 취소버튼 클릭
  onClickCancel() {
    const title = this.$t('view.sso.topology.alert.warning').toString();
    const message = this.$t('view.sso.topology.alert.cancelCreation').toString();
    const okTitle = this.$t('view.sso.topology.alert.yes').toString();
    const cancelTitle = this.$t('view.sso.topology.alert.no').toString();

    if(this.topology.type2 == 'modify') {
      this.end();
    } else {
      utils.bvModalmsgBoxConfirm(this, title, message, okTitle, cancelTitle, 'warning').then((res) => {
        if(res) {
          this.end();
        }
      });
    }
  }

  // 종료
  end() {
    this.topology.initData();
    this.$emit('close');
  }

  // 파이프 라인이 적용되어야 할 form
  isPipelineForm() {
    const { form } = this.topology;
    switch(form) {
      case TYPE.INPUT: return true;
      case TYPE.PREVIEW: return true;
      case TYPE.FILTER: return true;
      case TYPE.JOIN: return true;
      case TYPE.STORAGE: return true;
    }
    return false;
  }

  isLastScreen() {
    return this.topology.flow.length-1 == this.topology.flowstate;
  }

  // 상단 Flow Step 상태 번호 리턴
  get flowBarStepState() {
    const { form } = this.topology;
    switch(form) {
      case TYPE.FORM: return 1;
      case TYPE.RESULT: return 3;
      default: return 2;
    }
  }
}
</script>