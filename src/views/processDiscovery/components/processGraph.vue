<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component d-flex align-items-center justify-content-center" no-fade bg-color="#fff" opacity="1">
    <ipr-process-graph ref="graph" :options="graphOptions" @nodeClick="nodeClick" @arcClick="arcClick" @done="done" />
    <!-- control -->
    <div class="btn-control">
      <b-form-group id="btnControl">
        <div class="col-form-label">Simple</div>
        <b-form-checkbox switch v-model="graphSilder" value="complex" unchecked-value="simple" @change="onChangeGraphToggle" :disabled="showOverlay()">Complex</b-form-checkbox>
      </b-form-group>
    </div>
    <!-- control -->
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
import { IClient, IRequestDeltaAnalysis, ITimeEventFilter, IWorkFlowRequestAction } from '@/interface';

import { AnalysisMixin } from '@/mixin';

import { INode, IArc, IprProcessGraph, IProcessState } from '@iochord/ipr-fre-ent-core';

import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

@Component({})
export default class ProcessGraph extends Mixins(AnalysisMixin) {
  graphOptions = {
    mode: 'delta',
    haveCompare: false,
    height: '95%',
    nodeText: 'statistics.count',
    arcText: 'statistics.count',
    graphDirect: 'TB' as 'TB' | 'LR',
    navigator: true,
  };

  graphSilder: 'complex' | 'simple' = 'complex';

  caseId: string = '';

  highlight: IProcessState = null;
  iocCode: string = '';

  $refs!: {
    graph: IprProcessGraph;
  };

  mounted() {
    EventBus.$on('changeModelFilter', () => {
      this.graphOptions['nodeText'] = this.filter.nodeText;
      this.graphOptions['arcText'] = this.filter.arcText;
      this.graphOptions['haveCompare'] = this.filter.isComparedToPM;
    });
  }

  beforeDestroy() {
    EventBus.$off('changeModelFilter');
  }

  getGraph() {
    this.clear();
    this.caseId = '';
    this.highlight = null;

    this.graphSilder = 'complex';

    this.isNoData = false;
    this.showLoading = true;

    // service/run/process.discovery.model.fhm | service/run/process.discovery.model.fuzzy
    this.$store
      .dispatch('process/getProcessGraph', { algorithm: this.filter.algorithm, data: this.requestBuilder() })
      .then((res: AxiosResponse) => {
        this.drawGraph(res);
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.headers !== undefined && err.response.headers['x-ioc-code'] !== undefined) {
          const header = err.response.headers;
          this.iocCode = header['x-ioc-code'];
          this.$emit('setIocCode', this.iocCode);
        }
      });
  }

  getGraphByCaseId(caseId: string) {
    this.caseId = caseId;

    // service/run/process.discovery.model.fhm | service/run/process.discovery.model.fuzzy
    this.$store.dispatch('process/getProcessGraph', { algorithm: this.filter.algorithm, data: this.requestBuilder(caseId) }).then((res: AxiosResponse) => {
      this.highlight = res.data.data;
      this.$refs.graph.onHighlight(res.data.data, 'caseId');
    });
  }

  getByDataUri(dataUri: string) {
    this.clear();
    this.caseId = '';
    this.highlight = null;

    this.graphSilder = 'complex';

    this.isNoData = false;
    this.showLoading = true;

    this.$store
      .dispatch('common/getCache', dataUri)
      .then((res: AxiosResponse) => {
        this.drawGraph(res);
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.headers !== undefined && err.response.headers['x-ioc-code'] !== undefined) {
          const header = err.response.headers;
          this.iocCode = header['x-ioc-code'];
          this.$emit('setIocCode', this.iocCode);
        }
      });
  }

  drawGraph(res: any) {
    this.iocCode = '';
    this.$emit('setIocCode', this.iocCode);

    const data = res.data;
    if (data === null || data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data.results)) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data.results[this.filter.algorithm])) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data.results[this.filter.algorithm].baseline)) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    if (!this.isNoData) {
      this.$refs.graph.setData(data.data.results[this.filter.algorithm]);
    }
  }

  requestBuilder(caseId?: string) {
    const haveCaseId = this.haveCaseIdFilter() ? true : caseId ? true : false;

    const request: IRequestDeltaAnalysis[] = [];

    const data: IRequestDeltaAnalysis = {
      _type: 'DeltaAnalysisConfiguration',
      project: {
        _type: 'Project',
        id: this.$route.params.projectId,
      },
      compares: {},
    };

    const config = this.graphConfigBuilder(haveCaseId);

    data.compares[this.filter.algorithm] = {
      _type: 'ProcessComparatorConfiguration',
      serviceId: this.filter.algorithm === 'fhm' ? 'process.discovery.model.fhm' : 'process.discovery.model.fuzzy',
      configurations: [
        {
          ...config,
        },
      ],
    };

    if (this.filter.algorithm === 'fhm') {
      data.compares[this.filter.algorithm].configurations[0]._type += 'Impl';
    }

    data.baseline = {
      _type: 'EventRepositoryDependentConfiguration',
      repository: utils.buildRepository(this),
      option: this.filter.variantType,
      eventFilters: [utils.buildTimeEventFilter()],
    };

    // 추가 조건 필터 추가
    if (this.filter.tokenInclude && this.filter.tokenInclude !== '---') {
      data.baseline.eventFilters.push(utils.buildTokenFilter());
      if (this.filter.tokenInclude !== 'ci') {
        data.baseline.eventFilters.push(utils.buildVariantFilter(data.baseline.repository, data.baseline.eventFilters[0] as ITimeEventFilter, this.variantId));
      }
    } else {
      // 추가 조건이 없으면 variantId 필터 추가
      if (this.variantId !== '---') {
        data.baseline.eventFilters.push(utils.buildVariantFilter(data.baseline.repository, data.baseline.eventFilters[0] as ITimeEventFilter, this.variantId));
      }
    }

    if (!this.haveCaseIdFilter() && caseId) {
      data.baseline.eventFilters.push({
        _type: 'CaseFilterLite',
        values: [caseId],
      });
    }

    if (this.filter.isComparedToPM) {
      data.compared = utils.buildProcess(this, this.eventView.referenceModel.id);
    } else {
      data.compared = null;
    }

    request.push(data);

    return request;
  }

  graphConfigBuilder(caseId: boolean) {
    let config: any = {};
    if (this.filter.algorithm === 'fhm') {
      config = {
        _type: 'FhmProcessDiscoveryLiteConfiguration',
        positiveObservationThreshold: !caseId ? this.filter.freq : 0,
        dependencyThreshold: this.filter.dep,
      };
      this.$store.commit('process/setArcSlider', {
        dep: config.dependencyThreshold,
        freq: config.positiveObservationThreshold,
      });
    } else if (this.filter.algorithm === 'fuzzy') {
      config = {
        _type: 'FuzzyProcessDiscoveryLiteConfiguration',
        graphRecomMaxNodes: -1,
        nodeSigMin: this.filter.nodeSign / 100,
        nodeSigMax: 1,
        arcSigMin: this.filter.arcSign / 100,
        arcSigMax: 1,
      };
    }
    return _.merge(config, {
      addArtificialStartEnd: true,
      displayLimit: 1000,
      useEventBag: this.setting.common.analysis.eventBag,
      calculateNodeRework: this.filter.nodeText === 'reworks.total' ? true : false,
      calculateBottleneck: this.filter.arcText === 'bottlenecks' ? true : false,
    });
  }

  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'graph',
      serviceId: 'process.analysis.delta',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  onChangeGraphToggle(evt: 'complex' | 'simple') {
    const filter = _.cloneDeep(this.filter);
    if (filter.algorithm === 'fhm') {
      filter.dep = this.setting.model.dep[evt];
      filter.freq = this.setting.model.freq[evt];
    } else {
      filter.nodeSign = this.setting.model.nodeSign[evt];
      filter.arcSign = this.setting.model.arcSign[evt];
    }

    this.$store.commit('common/setFilter', filter);

    if (this.filter.nodeText === 'reworks.total' || this.filter.arcText === 'bottlenecks') this.$emit('updateSlider');
    this.showLoading = true;
    this.$emit('offHighlight');
    this.$store
      .dispatch('process/getDeltaGraph', this.requestBuilder())
      .then((res: AxiosResponse) => {
        this.drawGraph(res);
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.headers !== undefined && err.response.headers['x-ioc-code'] !== undefined) {
          const header = err.response.headers;
          this.iocCode = header['x-ioc-code'];
          this.$emit('setIocCode', this.iocCode);
        }
      });
  }

  onReworkHighlight(data: string) {
    this.$refs.graph.onHighlight(data, 'rework');
  }

  onBottleneckHighlight(link: any) {
    this.$refs.graph.onHighlight(link, 'bottleneck');
  }

  offHighlight(offCaseBy?: boolean) {
    this.caseId = '';
    this.highlight = null;
    this.$refs.graph.offHighlight(offCaseBy);
  }

  clear() {
    if (this.$refs.graph === undefined) return;
    this.$refs.graph.clear();
  }

  changeLayoutDirect(direct: 'TB' | 'LR') {
    this.graphOptions.graphDirect = direct;
    if (this.$refs.graph === undefined) return;
    this.$refs.graph.changeLayoutDirect(direct);
  }

  toggleMinimap(toggle: boolean) {
    this.graphOptions.navigator = toggle;
    if (this.$refs.graph === undefined) return;
    const navigator = this.$refs.graph.$refs.navigator as HTMLDivElement;
    navigator.style.display = toggle === true ? 'block' : 'none';
  }

  nodeClick(event: Event, node: INode) {
    this.$emit('graphDoubleClick', node.name, this.graphConfigBuilder(this.haveCaseIdFilter()), 'NODE');
  }

  arcClick(event: Event, arc: IArc) {
    const arcName = arc.name.split(' --> ');
    this.$emit('graphDoubleClick', arcName[0] + '-->' + arcName[1], this.graphConfigBuilder(this.haveCaseIdFilter()), 'ARC');
  }

  done() {
    if (this.caseId !== '') {
      this.$refs.graph.onHighlight(this.highlight, 'caseId');
    }
    this.showLoading = false;
  }

  showOverlay() {
    return this.variantId === '' || this.variant.totalCount === 0 || this.isNoData || this.showLoading || this.variantLoading || this.iocCode !== '' || this.checkFilterHaveOnlyDuration;
  }
}
</script>
