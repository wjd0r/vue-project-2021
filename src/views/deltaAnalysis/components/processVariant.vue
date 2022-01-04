<template>
  <div class="variant-component">
    <div class="variant-content">
      <div class="content-header">
        <div class="title">{{ $t('view.process.variant.title.variantTitle') }}</div>
        <span class="count-text" v-if="variant.totalCount !== 0">({{ Object.keys(variant.traceVariants).length }})</span>
      </div>
      <b-overlay :show="filter === null || variantLoading || variant.totalCount === 0" class="content-body" bg-color="#fff" opacity="1" no-fade sytle="min-height: 70px">
        <!-- variant : 표준 프로세스 -->
        <template v-if="isPMDeployed(eventView)">
          <template v-for="(item, index) in standardProecesList">
            <div class="variant" :class="{ active: leftId === `Standard|${item.id}` || rightId === `Standard|${item.id}` }" :key="'process-' + index" @click="onClickVariant(`Standard|${item.id}`)">
              <div class="content-header">{{ $t('view.process.variant.title.variantProcess') }} ({{ index + 1 }})</div>
              <div class="content-body">
                <div class="count-text">{{ item.name }}</div>
              </div>
            </div>
          </template>
        </template>
        <!-- variant : 표준 프로세스 -->

        <!-- variant : 전체 -->
        <div class="variant" :class="{ active: leftId === '---' || rightId === '---' }" @click="onClickVariant('---')">
          <div class="content-header">{{ $t('view.process.variant.title.allTitle') }}</div>
          <div class="content-body">
            <div class="count-text">{{ $t('view.process.variant.title.caseCount') }}: {{ numberWithCommas(variant.totalCount) }} (100%)</div>
            <b-progress :max="variant.totalCount" show-progress class="mb-3">
              <b-progress-bar :value="variant.totalCount" label="100%"></b-progress-bar>
            </b-progress>
          </div>
        </div>
        <!-- variant : 전체 -->

        <!-- variant -->
        <template v-for="(item, index) in variant.traceVariants">
          <div class="variant" :class="{ active: leftId === item.id || rightId === item.id }" :key="index" @click="onClickVariant(item.id)">
            <div v-if="filter.variantType === 'STANDARD'" class="content-header">{{ $t('view.process.variant.title.variantName') }} {{ item.name.split(' ')[1] }}</div>
            <div v-else-if="filter.variantType === 'ES_MONTHLY'" class="content-header">{{ item.name }}</div>
            <div class="content-body">
              <div class="count-text">{{ $t('view.process.variant.title.caseCount') }}: {{ numberWithCommas(item.count) }} ({{ ((item.count / variant.totalCount) * 100).toFixed(0) }}%)</div>
              <b-progress :max="variant.totalCount" show-progress class="mb-3">
                <b-progress-bar :value="item.count" :label="`${((item.count / variant.totalCount) * 100).toFixed(0)}%`"></b-progress-bar>
              </b-progress>
            </div>
          </div>
        </template>
        <!-- variant -->
        <template #overlay>
          <div class="nodata-text w-max-content" v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</div>
          <b-spinner v-else-if="variantLoading" label="Spinning"></b-spinner>
          <div v-else class="nodata-text w-max-content">{{ $t('view.process.alert.variantNodata') }}</div>
        </template>
      </b-overlay>
      <div class="content-footer">
        <div v-show="showError" class="notice-text red-text">{{ $t('view.process.alert.variant.choose.two') }}</div>
        <b-button variant="primary" class="btn-apply" @click="onClickAnalysis" :disabled="variant.totalCount === 0 || variantLoading">{{ $t('view.process.button.analysis') }}</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';

import { AnalysisMixin, UtilsMixin } from '@/mixin';

import _ from 'lodash';
import { IClient, IClientState, IKeyValueObject, IWorkFlowRequestAction } from '@/interface';
import { AxiosResponse } from 'axios';

@Component({
  computed: mapGetters({
    deltaVariantId: 'common/getVariantId',
  }),
})
export default class DeltaVariant extends Mixins(AnalysisMixin, UtilsMixin) {
  deltaVariantId!: { leftId: string; rightId: string };

  leftId: string = '';
  rightId: string = '';

  showError: boolean = false;

  // 단순 분석 목록인지, workflow인지 구분
  getBy: 'standard' | 'workflow' = 'standard';

  @Watch('variant', { deep: true })
  onVariantChange(newVal: any) {
    if (newVal.totalCount !== 0) {
      this.initVariantId();
    }
  }

  // 분석 목록 (variant list) api 요청
  getVariant() {
    this.setVariantLoading(true);
    this.showError = false;
    this.getBy = 'standard';
    // 선택된 variantId 초기화
    this.leftId = '';
    this.rightId = '';
    this.$store.commit('common/setVariantId', { leftId: '', rightId: '' });
    this.$store.commit('common/setVariant', null);

    // service/run/process.analysis.trace.variant
    this.$store.dispatch('common/getVariant', this.requestBuilder()).then((res: AxiosResponse) => {
      this.setVariantLoading(false);
    });
  }

  // dataUri로 분석 목록 요청
  getByDataUri(dataUri: string) {
    this.getBy = 'workflow';
    this.initVariantId();
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.$store.commit('common/setVariant', res.data.data);
      this.setVariantLoading(false);
    });
  }

  // variant standard service request data 생성
  requestBuilder() {
    const data = {
      _type: 'TraceVariantDiscoveryLiteConfiguration',
      repository: utils.buildRepository(this),
      option: this.filter.variantType,
      eventFilters: [utils.buildTimeEventFilter()],
      sortBy: 'ccnt',
      sortDirection: 'DESC',
      showSignature: false,
    };

    const request = [data];
    return request;
  }

  // workflow action data 생성
  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    const clientState: IClientState = JSON.parse(client.state);
    delete clientState.deltaAnalysis.variant;
    client.state = JSON.stringify(clientState);
    return {
      id: 'variant',
      _type: 'ServiceAction',
      serviceId: 'process.analysis.trace.variant',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  // variant list 도착 시 실행
  initVariantId() {
    if (this.getBy === 'workflow') {
      let clientState: IClientState;
      if (this.message) {
        clientState = JSON.parse(JSON.parse(this.message.notificationData).client.state);
      } else {
        clientState = JSON.parse(this.workFlowResponse.client.state);
      }
      if (clientState?.deltaAnalysis !== undefined) {
        this.leftId = clientState.deltaAnalysis.variant.id.leftId;
        this.rightId = clientState.deltaAnalysis.variant.id.rightId;
      } else {
        this.getGraphVariantAll();
      }
      const variantId = {
        leftId: this.leftId,
        rightId: this.rightId,
      };

      this.$store.commit('common/setVariantId', variantId);
    } else {
      this.getGraphVariantAll();
    }
  }

  getGraphVariantAll() {
    this.leftId = '---';
    if (this.isPMDeployed(this.eventView)) {
      if (this.eventView.referenceModel !== undefined) {
        this.rightId = this.eventView.referenceModel.id;
      } else {
        this.rightId = this.standardProecesList[0].id;
      }
      this.rightId = `Standard|${this.rightId}`;
    } else {
      this.rightId = this.variant.traceVariants[Object.keys(this.variant.traceVariants)[0]].id;
    }

    if (this.getBy === 'standard') {
      this.onClickAnalysis();
    }
  }

  // variant 클릭 이벤트
  onClickVariant(id: string) {
    this.showError = false;
    if (this.leftId !== '' && this.rightId !== '' && this.leftId !== id && this.rightId !== id) {
      return;
    }

    if (this.leftId === '' && this.rightId === '') {
      this.leftId = id;
    } else if (this.leftId === id) {
      if (this.rightId !== '') {
        this.leftId = this.rightId;
        this.rightId = '';
      } else {
        this.leftId = '';
      }
    } else if (this.leftId !== id && this.rightId === '') {
      this.rightId = id;
    } else if (this.rightId === id) {
      this.rightId = '';
    }
  }

  // 분석 클릭 이벤트
  onClickAnalysis() {
    if (this.leftId === '' || this.rightId === '') {
      this.showError = true;
      return;
    }

    const variantId = {
      leftId: this.leftId,
      rightId: this.rightId,
    };

    this.$store.commit('common/setVariantId', variantId);
    this.$emit('clickVariant');
  }

  // getter 이벤트 로그가 가지고 있는 표준 프로세스 목록
  get standardProecesList() {
    const list: any = [];
    if (!_.isEmpty(this.eventView?.referenceModel)) {
      const referenceModel: IKeyValueObject = this.eventView.referenceModel;
      list.push(referenceModel);
    }
    if (!_.isEmpty(this.eventView?.relations)) {
      const relations: IKeyValueObject = this.eventView.relations;
      for (const [key, item] of Object.entries(relations)) {
        if (item._type.endsWith('Model') || item._type.endsWith('Graph') || item._type.endsWith('GraphImpl')) {
          if (_.find(list, ['id', item.id]) === undefined) {
            if (item.attributes === undefined || item.attributes.isDeployed === undefined) {
              continue;
            } else {
              if (item.attributes.isDeployed.value === true) {
                list.push(item);
              }
            }
          }
        }
      }
    }
    return list;
  }
}
</script>
