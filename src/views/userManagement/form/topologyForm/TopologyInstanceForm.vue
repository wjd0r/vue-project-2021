<template>
  <!-- Topology Instance 정보 입력 -->
  <div class="topologe-content instance-form-component">
    <div class="instance-form-content">
      <!-- template -->
      <div class="template-input-component">
        <div class="template-input-content">
          <div class="content-header">
            <h4 class="title" desc="Topology Template Properties">{{ $t('view.sso.topology.label.templateProperties') }}</h4>
          </div>
          <div class="content-body">
            <!-- input -->
            <div class="form-content">
              <b-form-group label="Template Name" :label-cols="3" :invalid-feedback="state.templateName.feedback">
                <b-form-select v-model="topology.bolts.templateId" :state="state.templateName.state" @change="onChage">
                  <template v-for="item, index in topology.data.templates">
                    <b-form-select-option :value="item.id" :key="index" :disabled="index == 8">{{item.topologyName}}</b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>
              <b-form-group label="Template Description " :label-cols="3">
                <b-form-input type="text" v-model="topology.data.input.templateDescription" desc="Template Description을 입력해주세요" :placeholder="$t('view.sso.topology.placeholder.templateDescription')" disabled></b-form-input>
              </b-form-group>
            </div>
            <!-- input -->
          </div>
          
          <!-- flow -->
          <TopologyFlowBar/>
          <!-- flow -->
        </div>

        <!-- flow decription -->
        <div class="flow-description-content">
          <div class="content-header"><h4 class="title" desc="Topology Flow Description">{{ $t('view.sso.topology.label.flowDescription') }}</h4></div>
          <div class="content-body">
            <div class="flow-description">
              <div class="content-sub-header"><h5 class="title" desc="Stream Input 설정">{{ $t('view.sso.topology.label.streamInput') }}</h5></div>
              <div class="content-sub-body" desc="Stream 설정할 수 있습니다.">
                {{ $t('view.sso.topology.label.streamSetting') }}
              </div>
            </div>
            <div class="flow-description">
              <div class="content-sub-header"><h5 class="title" desc="Data Preview">{{ $t('view.sso.topology.label.dataPreview') }}</h5></div>
              <div class="content-sub-body" desc="Data Preview에서 타입을 선택할 수 있습니다.">
                {{ $t('view.sso.topology.label.typeSelect') }}
              </div>
            </div>
            <div class="flow-description">
              <div class="content-sub-header"><h5 class="title" desc="Filter Stream">{{ $t('view.sso.topology.label.filterStream') }}</h5></div>
              <div class="content-sub-body" desc="Data Preview에서 선택된 항목을 filter 할 수 있습니다.">
                {{ $t('view.sso.topology.label.filter') }}
              </div>
            </div>
            <div class="flow-description">
              <div class="content-sub-header"><h5 class="title" desc="Join Stream">{{ $t('view.sso.topology.label.joinStream') }}</h5></div>
              <div class="content-sub-body" desc="두 개의 컨텐츠를 하나로 합칠 수 있습니다.">
                {{ $t('view.sso.topology.label.contentIntoOne') }}
              </div>
            </div>
            <div class="flow-description">
              <div class="content-sub-header"><h5 class="title" desc="Target Storage 설정">{{ $t('view.sso.topology.label.targetStorage') }}</h5></div>
              <div class="content-sub-body" desc="Target Storage 설정합니다.">
                {{ $t('view.sso.topology.label.targetStorageSetting') }}
              </div>
            </div>
          </div>
        </div>
        <!-- flow decription -->
      </div>
      <!-- template -->

      <!-- Instance create -->
      <div class="form-component">
        <div class="content-header">
          <h4 class="title" desc="Topology Instance Properties">{{ $t('view.sso.topology.label.instanceProperties') }}</h4>
        </div>
        <div class="content-body">
          <div class="form-content">
            <b-form-group label="Instance Name" :label-cols="3" :invalid-feedback="state.instanceName.feedback">
              <b-form-input type="text" v-model="topology.bolts.instanceName" desc="Instance Name을 입력해주세요" :placeholder="$t('view.sso.topology.placeholder.instanceName')" :state="state.instanceName.state"></b-form-input>
            </b-form-group>
            <b-form-group label="Instance Description " :label-cols="3" :invalid-feedback="state.instanceDescription.feedback">
              <b-form-input type="text" v-model="topology.bolts.instanceDescription" desc="Instance Description을 입력해주세요" :placeholder="$t('view.sso.topology.placeholder.instanceDescription')" :state="state.instanceDescription.state"></b-form-input>
            </b-form-group>
          </div>
        </div>
      </div>
      <!-- Instance create -->
    </div>
  </div>
  <!-- Topology Instance 정보 입력 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { ValidationCheck } from '@/common';
import { ISetting } from '@/interface';

import _ from 'lodash';
import moment from 'moment';

import TopologyInstanceFlow from './TopologyInstanceFlow.vue';
import Topology from '../../ts/Topology';
import TopologyFlowBar from './TopologyFlowBar.vue';

@Component({
 components: {
   TopologyFlowBar,
 },
 computed: mapGetters({
   setting: 'sso/getSetting',
 }),
})
export default class TopologyInstanceForm extends Mixins(UtilsMixin) {
  setting!: ISetting;

  topology: Topology = this.$parent.$parent.$parent.$data.topology;
  showOverlay: boolean = false;
  mounted() {
    // default로 첫번째 선택
    this.onChage();

    // Topology 생성과정 하루동안 보이지 않기
    this.showOverlay = this.setting.sightDay.topology != moment().format('YYYY-MM-DD');
  }

  // Template Name 변경시
  // 1. description 지정
  // 2. flow 도 변경되어야 함.
  // 3. bolts 초기화 initBolts
  // 4. flows 도 초기화
  onChage() {
    const selectedTemplate = _.find(this.topology.data.templates, ['id', this.topology.bolts.templateId]);
    this.topology.data.input.templateDescription = selectedTemplate.description;
    this.topology.flow = this.topology.flowtypes[Number(selectedTemplate.id)-1];
    this.topology.initBolts();
    this.topology.flows = Array.from({length:this.topology.flow.length}, (v, i) => {return{
      flowVisitCnt: i == 0? 1 : 0,
    }});
  }

  get state() {
    const selectedTemplate = _.find(this.topology.data.templates, ['id', this.topology.bolts.templateId]);

    // instanceName : 3글자 첫글자 한글, 알파벳, 숫자, 중복체크
    const templateName = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, selectedTemplate.topologyName);
    // templateDescription : 자동 선택

    // instanceName : 필수임
    const instanceName = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number, 3, 255, this.topology.bolts.instanceName);
    // instanceDescription : 옵션
    const instanceDescription = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 0, 255, this.topology.bolts.instanceName);

    // 버튼 활성화
    this.$parent.$data.nextButtonDisabled = !(templateName.state && instanceName.state);

    return {
      templateName : templateName,
      instanceName : instanceName,
      instanceDescription: instanceDescription,
      next: templateName.state && instanceName.state,
    }
  }
}
</script>