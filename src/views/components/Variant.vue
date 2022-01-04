<template>
  <div class="variant-component">
    <div class="variant-content">
      <div class="content-header">
        <div class="title">{{ $t('view.process.variant.title.variantTitle') }}</div>
        <span class="count-text" v-if="variant.totalCount !== 0">({{ Object.keys(variant.traceVariants).length }})</span>
      </div>
      <b-overlay :show="filter === null || variantLoading || variant.totalCount === 0" class="content-body" bg-color="#fff" opacity="1" no-fade style="min-height: 70px">
        <!-- variant : 전체 -->
        <div v-if="!haveTokenInclude() || (haveTokenInclude() && filter.tokenInclude === '---')" class="variant" :class="{ active: selectedVariant === '---' }" @click="onClickVariant('---')">
          <div class="content-header">{{ $t('view.process.variant.title.allTitle') }}</div>
          <div class="content-body">
            <div class="count-text">{{ $t('view.process.variant.title.caseCount') }}: {{ numberWithCommas(variant.totalCount) }} (100%)</div>
            <b-progress :max="variant.totalCount" show-progress>
              <b-progress-bar :value="variant.totalCount" label="100%"></b-progress-bar>
            </b-progress>
          </div>
        </div>
        <!-- variant : 전체 -->

        <!-- variant -->
        <template v-for="(item, index) in variant.traceVariants">
          <div class="variant" :class="{ active: selectedVariant === item.id }" :key="index" @click="onClickVariant(item.id)">
            <div class="content-header">
              <template v-if="filter.tokenInclude && filter.tokenInclude === 'ci'">{{ filter.tokenValue }}</template>
              <template v-else-if="filter.variantType === 'STANDARD'">{{ $t('view.process.variant.title.variantName') }} {{ item.name.split(' ')[1] }}</template>
              <template v-else-if="filter.variantType === 'ES_MONTHLY'">{{ item.name }}</template>
            </div>
            <div class="content-body">
              <div class="count-text">{{ $t('view.process.variant.title.caseCount') }} : {{ numberWithCommas(item.count) }} ({{ ((item.count / variant.totalCount) * 100).toFixed(0) }}%)</div>
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
        <div v-show="showError" class="notice-text red-text">{{ $t('view.process.alert.variant.choose.one') }}</div>
        <b-button variant="primary" class="btn-apply" @click="onClickAnalysis" :disabled="variant.totalCount === 0 || variantLoading">{{ $t('view.process.button.analysis') }}</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { utils } from '@/common';
import { IClient, IClientState, IWorkFlowRequestAction } from '@/interface';

import { AnalysisMixin, UtilsMixin } from '@/mixin';

import _ from 'lodash';
import { AxiosResponse } from 'axios';

@Component({})
export default class Variant extends Mixins(AnalysisMixin, UtilsMixin) {
  selectedVariant: string = '';

  isFirst: boolean = true;

  showError: boolean = false;

  // 단순 분석 목록인지, workflow인지 구분
  getBy: 'standard' | 'workflow' = 'standard';

  @Watch('variant', { deep: true })
  onVariantChange(newVal: any) {
    if (newVal !== null && newVal.totalCount !== 0) {
      this.initVariantId();
    }
  }

  // 분석 목록 (variant list) api 요청
  getVariant() {
    this.setVariantLoading(true);
    this.showError = false;
    this.getBy = 'standard';
    // 선택된 variantId 초기화
    this.$store.commit('common/setVariantId', '');
    this.$store.commit('common/setVariant', null);
    this.selectedVariant = '';

    // service/run/process.analysis.trace.variant
    this.$store.dispatch('common/getVariant', this.requestBuilder()).then((res: AxiosResponse) => {
      this.setVariantLoading(false);
    });
  }

  // dataUri로 분석 목록 요청
  getByDataUri(dataUri: string) {
    this.getBy = 'workflow';
    if (this.isFirst && this.$route.query.sId && this.$route.query.sId === this.message.serviceId) {
      this.setVariantLoading(true);
    }
    this.initVariantId();
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      if (res && res.data) {
        this.$store.commit('common/setVariant', res.data.data);
      }
      this.setVariantLoading(false);
    });
  }

  // variant standard service request data 생성
  requestBuilder() {
    const data = {
      _type: 'TraceVariantDiscoveryLiteConfiguration',
      repository: utils.buildRepository(this),
      option: this.filter.variantType,
      eventFilters: [utils.buildTimeEventFilter()] as any,
      sortBy: 'ccnt',
      sortDirection: 'DESC',
      showSignature: false,
    };

    // 토큰 필터 추가
    if (!_.isEmpty(this.filter.tokenInclude) && this.filter.tokenInclude !== '---') {
      data.eventFilters.push(utils.buildTokenFilter());
    }

    const request = [data];
    return request;
  }

  // workflow action data 생성
  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    const clientState: IClientState = JSON.parse(client.state);
    const routeName = _.camelCase(this.$route.name) as 'dashboard' | 'processDiscovery' | 'deltaAnalysis' | 'logReplay' | 'socialAnalysis' | 'matrixModel' | 'dotted';
    delete clientState[routeName].variant;
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
      const routeName = _.camelCase(this.$route.name) as 'dashboard' | 'processDiscovery' | 'deltaAnalysis' | 'logReplay' | 'socialAnalysis' | 'matrixModel' | 'dotted';
      if (clientState[routeName] === undefined) {
        this.getGraphVariantAll();
      } else if (routeName !== 'deltaAnalysis') {
        this.selectedVariant = clientState[routeName].variant.id;
        if (this.isFirst) {
          this.isFirst = false;
        }
      }
      this.$store.commit('common/setVariantId', this.selectedVariant);
    } else {
      this.getGraphVariantAll();
    }
  }

  // 전체 클릭
  getGraphVariantAll() {
    if (this.isFirst && this.isFromDashboard() !== null) {
      switch (this.isFromDashboard()) {
        case 'case': {
          this.selectedVariant = Object.keys(this.variant.traceVariants)[0];
          break;
        }
        case 'variant': {
          this.selectedVariant = this.$route.query.variantId as string;
          break;
        }
        case 'max-duration': {
          const maxDuration = _.maxBy(_.values(this.variant.traceVariants), 'duration');
          this.selectedVariant = maxDuration.id;
          break;
        }
      }
    } else {
      if (!_.isEmpty(this.filter.tokenInclude) && this.filter.tokenInclude !== '---') {
        this.selectedVariant = Object.keys(this.variant.traceVariants)[0];
      } else {
        this.selectedVariant = '---';
      }
    }

    if (this.isFirst) {
      this.isFirst = false;
    }

    if (this.getBy === 'standard') {
      this.onClickAnalysis();
    }
  }

  // variant 클릭
  onClickVariant(id: string) {
    this.showError = false;
    if (this.selectedVariant === id) {
      this.selectedVariant = '';
    } else {
      this.selectedVariant = id;
    }
  }

  // 분석 클릭
  onClickAnalysis() {
    if (this.selectedVariant === '') {
      this.showError = true;
      return;
    }

    // if (this.variantId === this.selectedVariant) return;

    this.$store.commit('common/setVariantId', this.selectedVariant);
    this.$emit('clickVariant');
  }

  // 왼쪽 상단의 선택한 variant 이름 띄우기
  getVariantTitle(id: string) {
    if (this.variant.totalCount === 0 || this.variantId === '') {
      return '';
    } else {
      if (id === '---') {
        return this.$t('view.process.variant.title.allTitle');
      } else {
        if (this.filter.tokenInclude && this.filter.tokenInclude === 'ci') {
          return this.filter.tokenValue;
        } else if (this.filter.variantType === 'STANDARD') {
          return this.$t('view.process.variant.title.variantName') + this.variant.traceVariants[id].name.split(' ')[1];
        } else if (this.filter.variantType === 'ES_MONTHLY') {
          return this.variant.traceVariants[id].name;
        }
      }
    }
  }

  haveTokenInclude() {
    if (this.filter === null) {
      return false;
    } else {
      return !this.isEmpty(this.filter?.tokenInclude);
    }
  }

  isFromDashboard(): 'case' | 'variant' | 'max-duration' | null {
    if (this.$route.query.from) {
      switch (this.$route.query.from) {
        case 'case-section-duration':
        case 'cost-cases': {
          return 'case';
        }
        case 'tracevariant-duration':
        case 'bottleneck-statistics':
        case 'resource-activity':
        case 'originator-activity':
        case 'cost-mean-resource':
        case 'cost-mean-originator': {
          return 'variant';
        }
      }
    } else {
      return null;
    }
  }
}
</script>
