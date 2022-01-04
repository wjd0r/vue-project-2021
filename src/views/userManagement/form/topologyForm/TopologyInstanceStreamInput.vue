<template>
<!-- stream input 설정 -->
<div class="topologe-component stream-input-component">
  <div class="topologe-content stream-input-content">
    <div class="content-header">
      <h4 class="title" desc="Stream Input 설정">{{ $t('view.sso.topology.label.streamInput') }}</h4>
    </div>
    <div class="content-body">
      <div class="form-content">
        <b-form-group :label="$t('view.sso.topology.label.host')" desc="Host" :label-cols="3" :invalid-feedback="state.host.feedback">
          <b-form-input v-model="topology.bolts.streams[topology.flowstate-1].config.host" type="text" :placeholder="$t('view.sso.topology.placeholder.enterPort')" desc="Port를 입력해주세요" :state="state.host.state" maxlength="255"></b-form-input>
        </b-form-group>

        <b-form-group :label="$t('view.sso.topology.label.protocol')" desc="통신 프로토콜" :label-cols="3" :invalid-feedback="state.protocol.feedback">
          <b-select v-model="topology.bolts.streams[topology.flowstate-1].config.protocol" :options="topology.options.protocol" :state="state.protocol.state" />
        </b-form-group>

        <b-form-group :label="$t('view.sso.topology.label.port')" desc="Port" :label-cols="3" :invalid-feedback="state.port.feedback">
          <b-form-input v-model="topology.bolts.streams[topology.flowstate-1].config.port" type="number" :placeholder="$t('view.sso.topology.placeholder.enterPort')" desc="Port를 입력해주세요" :state="state.port.state" maxlength="5" min="1024" max="49151"></b-form-input>
        </b-form-group>

        <b-form-group :label="$t('view.sso.topology.label.topic')" desc="Topic" :label-cols="3" :invalid-feedback="state.topic.feedback">
          <b-form-select v-model="topology.bolts.streams[topology.flowstate-1].config.topicId" :state="state.topic.state">
            <template v-for="item, index in topology.data.topics">
              <b-form-select-option :value="item.id" :key="index">{{item.name}}</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <div class="test-content">
          <div class="test-text success" v-if="isTestSuccess" desc="테스트를 완료하였습니다.">{{ $t('view.sso.topology.label.testComplete') }}</div>
          <div class="test-text fail" v-else desc="테스트를 실패하였습니다.">{{ $t('view.sso.topology.label.testFailure') }}</div>
          <b-button variant="primary" class="btn-test" :disabled="state.test" @click="onTest" desc="테스트">
            <b-spinner small v-if="isSpinner"></b-spinner>
            {{ $t('view.sso.topology.label.test') }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- stream input 설정 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import Topology from '../../ts/Topology';
import { ValidationCheck } from '@/common';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class TopologyInstanceStreamInput extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;
  isTestSuccess: boolean = false;
  isSpinner: boolean = false;

  created() {
    // bolt 추가
    this.topology.addBolt();

    // 방문횟수를 1추가 함.
    this.topology.flows[this.topology.flowstate].flowVisitCnt++;
  }

  onTest() {
    this.isSpinner = true;
    setTimeout(() => {
      this.isSpinner = false;
      this.isTestSuccess = !this.isTestSuccess;
    }, 1000);
    
  }

  get state() {
    // host: 
    const host = ValidationCheck.check(ValidationCheck.Type.Ip, 1, 255, this.topology.bolts.streams[this.topology.flowstate-1].config.host);
    // protocol : 3글자 첫글자 한글, 알파벳, 숫자, 중복체크
    const protocol = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.topology.bolts.streams[this.topology.flowstate-1].config.protocol);
    // port : 필수임
    const port = ValidationCheck.check(ValidationCheck.Type.Number, 1, 5, this.topology.bolts.streams[this.topology.flowstate-1].config.port);
    // topic : 필수임
    const topic = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.topology.bolts.streams[this.topology.flowstate-1].config.topicId);

    // 테스트 버튼 활성화
    //this.$parent.$data.nextButtonDisabled = !(protocol.state && port.state && topic);

    // 다음 버튼 활성화
    EventBus.$emit('nextButtonDisabled', !this.isTestSuccess);

    return {
      host: host,
      protocol : protocol,
      port : port,
      topic: topic,
      test: !(protocol.state && port.state && topic.state),
    }
  }
}
</script>