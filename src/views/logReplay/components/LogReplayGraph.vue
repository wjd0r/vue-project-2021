<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component d-flex align-items-center justify-content-center" no-fade bg-color="#fff" opacity="1">
    <ipr-process-log-replay-graph ref="graph" :options="graphOptions" @ready="getByDataUriTokenView" @tokenClick="tokenClick" @done="done" />
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
        <template v-else-if="variantLoading">{{ $t('view.process.alert.loadingVariantList') }}</template>
        <template v-else-if="variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
        <template v-else-if="variantId === ''">{{ $t('view.process.alert.chooseVariant') }}</template>
      </template>
      <template v-else-if="iocCode !== ''">{{ $t('view.process.alert.' + iocCode) }}</template>
      <template v-else-if="isNoData">{{ $t('view.process.alert.Nodata') }}</template>
      <b-spinner v-else label="Spinning"></b-spinner>
    </template>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IClient, IWorkFlowRequestAction } from '@/interface';

import { AnalysisMixin } from '@/mixin';

import { IprLogReplayGraph, IToken } from '@iochord/ipr-fre-ent-core';

import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

@Component({})
export default class LogReplayGraph extends Mixins(AnalysisMixin) {
  graphOptions = {
    height: '95%',
    nodeText: 'statistics.count',
    arcText: 'statistics.count',
    navigator: true,
    speedLimit: 100000,
  };

  caseId: string = '';

  tokenViewDataUri: string = '';

  iocCode: string = '';

  $refs!: {
    graph: IprLogReplayGraph;
  };

  created() {
    this.graphOptions.speedLimit = this.setting.animation.speedLimit;
  }

  mounted() {
    EventBus.$on('changeModelFilter', () => {
      this.graphOptions['nodeText'] = this.filter.nodeText;
      this.graphOptions['arcText'] = this.filter.arcText;
    });
  }

  beforeDestroy() {
    EventBus.$off('changeModelFilter');
  }

  getLogReplayGraph() {
    this.showLoading = true;
    this.isNoData = false;

    this.caseId = '';

    this.$refs.graph.stop();
    this.clear();

    // service/run/process.discovery.model.fhm
    // service/run/process.discovery.model.fhm.token.index
    this.$store
      .dispatch('logreplay/getLogReplayGraph', { graphParam: this.graphRequestBuilder(), tokenParam: this.tokenRequstBuilder() })
      .then((res: AxiosResponse[]) => {
        this.drawGraph(res);
      })
      .catch((err: AxiosError) => {
        if (err.response.headers !== undefined && err.response.headers['x-ioc-code'] !== undefined) {
          const header = err.response.headers;
          this.iocCode = header['x-ioc-code'];
          this.$emit('setIocCode', this.iocCode);
        }
      });
  }

  getGraphByCaseId(caseId: string) {
    this.caseId = caseId;

    // service/run/process.discovery.model.fhm
    this.$store
      .dispatch('process/getProcessGraph', {
        algorithm: this.filter.algorithm,
        data: this.graphRequestBuilder(caseId),
      })
      .then((res: AxiosResponse) => {
        this.$refs.graph.onHighlight(res.data.data, 'caseId');
      });
  }

  getTokens(min: number) {
    if (this.$refs.graph.isGraphEmpty()) {
      this.isNoData = true;
      this.showLoading = false;
      return;
    }

    // service/run/process.discovery.model.fhm.token.view
    this.$store.dispatch('logreplay/getToken', this.tokenRequstBuilder()).then((res: AxiosResponse) => {
      this.$refs.graph.setTokenData(res.data.data);
    });
  }

  getByDataUriGraph(graphDataUri: string, tokenIndexDataUri: string) {
    this.caseId = '';

    this.$refs.graph.stop();
    this.clear();

    this.showLoading = true;
    this.isNoData = false;

    const getGraph = this.$store.dispatch('common/getCache', graphDataUri).then((res) => {
      return res;
    });

    const getTokenIndex = this.$store.dispatch('common/getCache', tokenIndexDataUri).then((res) => {
      return res;
    });

    Promise.all([getGraph, getTokenIndex])
      .then((results: AxiosResponse[]) => {
        this.drawGraph(results);
      })
      .catch((err: AxiosError) => {
        if (err.response.headers !== undefined && err.response.headers['x-ioc-code'] !== undefined) {
          const header = err.response.headers;
          this.iocCode = header['x-ioc-code'];
          this.$emit('setIocCode', this.iocCode);
        }
      });
  }

  getByDataUriTokenView() {
    if (this.$refs.graph.isGraphEmpty()) {
      this.isNoData = true;
      this.showLoading = false;
      return;
    }

    this.$store.dispatch('common/getCache', this.tokenViewDataUri).then((res: AxiosResponse) => {
      this.$refs.graph.setTokenData(res.data.data);
    });
  }

  drawGraph(res: AxiosResponse[]) {
    this.iocCode = '';
    this.$emit('setIocCode', this.iocCode);

    if (res[0].data === null || res[0].data === undefined || res[1].data === null || res[1].data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(res[0].data.data) || _.isEmpty(res[1].data.data)) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    const data: any = {
      graph: {},
      token: {},
    };
    if (res[0].config.url.includes('token.index')) {
      data.token = res[0].data.data;
      data.graph = res[1].data.data;
    } else {
      data.token = res[1].data.data;
      data.graph = res[0].data.data;
    }

    if (data.graph.nodeCount === 0) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    if (!this.isNoData) {
      this.$refs.graph.setGraphData(data);
    }
  }

  graphRequestBuilder(caseId?: string) {
    const data = {
      _type: 'FhmProcessDiscoveryLiteConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      positiveObservationThreshold: !this.haveCaseIdFilter() ? this.setting.model.freq.complex : 0,
      dependencyThreshold: this.setting.model.dep.complex,
      addArtificialStartEnd: true,
      displayLimit: 1000,
      useEventBag: this.setting.common.analysis.eventBag,
      calculateNodeRework: false,
      calculateBottleneck: this.filter.arcText === 'bottlenecks' ? true : false,
    };

    // 토큰 필터 추가
    if (this.filter.tokenInclude && this.filter.tokenInclude !== '---') {
      data.eventFilters.push(utils.buildTokenFilter());
      if (this.filter.tokenInclude !== 'ci') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    } else {
      // 토큰 필터 없으면 variantId 필터 추가
      if (this.variantId !== '---') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    }

    if (!this.haveCaseIdFilter() && caseId) {
      data.eventFilters.push({
        _type: 'CaseFilterLite',
        values: [caseId],
      });
    }

    return [data];
  }

  tokenRequstBuilder() {
    const data = {
      _type: 'FhmProcessReplayLiteConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      addArtificialStartEnd: true,
      config: {
        _type: 'FhmProcessDiscoveryLiteConfigurationImpl',
        addArtificialStartEnd: true,
        positiveObservationThreshold: !this.haveCaseIdFilter() ? this.setting.model.freq.complex : 0,
        dependencyThreshold: this.setting.model.dep.complex,
        calculateNodeRework: false,
        calculateBottleneck: this.filter.arcText === 'bottlenecks' ? true : false,
      },
      addPerformanceLag: true,
      artificialStartEndDuration: 600,
      useEventBag: this.setting.common.analysis.eventBag,
    };

    // 토큰 필터 추가
    if (this.filter.tokenInclude && this.filter.tokenInclude !== '---') {
      data.eventFilters.push(utils.buildTokenFilter());
      if (this.filter.tokenInclude !== 'ci') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    } else {
      // 토큰 필터 없으면 variantId 필터 추가
      if (this.variantId !== '---') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
      }
    }

    if (this.filter.arcText === 'bottlenecks') {
      data.eventFilters.push({
        _type: 'CaseWithBottleneckFilterLite',
        config: {
          _type: 'FhmProcessDiscoveryLiteConfiguration',
          repository: utils.buildRepository(this),
          positiveObservationThreshold: !this.haveCaseIdFilter() ? this.setting.model.freq.complex : 0,
          dependencyThreshold: this.setting.model.dep.complex,
          calculateNodeRework: false,
          calculateBottleneck: this.filter.arcText === 'bottlenecks' ? true : false,
        },
      });
    }

    if (this.filter.tokenInclude !== 'ci') {
      data.eventFilters.push({
        _type: 'CaseTopFilterLite',
        limit: this.setting.animation.caseLimit,
        random: true,
      });
    }

    return [data];
  }

  workflowGraphActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'graph',
      serviceId: 'process.discovery.model.fhm',
      client: {
        ...client,
      },
      configurations: this.graphRequestBuilder(),
    };
  }

  workflowTokenIndexActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'token-index',
      serviceId: 'process.discovery.model.fhm.token.index',
      client: {
        ...client,
      },
      configurations: this.tokenRequstBuilder(),
    };
  }

  workflowTokenViewActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'token-view',
      serviceId: 'process.discovery.model.fhm.token.view',
      client: {
        ...client,
      },
      configurations: this.tokenRequstBuilder(),
    };
  }

  onBottleneckHighlight(link: any) {
    this.$refs.graph.onHighlight(link, 'bottleneck');
  }

  clear() {
    if (this.$refs.graph === undefined) return;
    this.$refs.graph.clear();
  }

  toggleMinimap(toggle: boolean) {
    this.graphOptions.navigator = toggle;
    if (this.$refs.graph === undefined) return;
    const navigator = this.$refs.graph.$refs.navigator as HTMLDivElement;
    navigator.style.display = toggle === true ? 'block' : 'none';
  }

  offHighlight(offCaseBy?: boolean) {
    this.$refs.graph.offHighlight(offCaseBy);
  }

  tokenClick(event: Event, token: IToken) {
    this.$emit('graphDoubleClick', token);
  }

  done(point: string) {
    if (point === 'token') {
      this.showLoading = false;
    }
  }

  setTokenViewDataUri(value: string) {
    this.tokenViewDataUri = value;
  }

  showOverlay() {
    return this.variantId === '' || this.variant.totalCount === 0 || this.isNoData || this.showLoading || this.variantLoading || this.iocCode !== '' || this.checkFilterHaveOnlyDuration;
  }
}
</script>
