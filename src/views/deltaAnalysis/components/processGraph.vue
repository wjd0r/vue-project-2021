<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component d-flex align-items-center justify-content-center" no-fade bg-color="#fff" opacity="1">
    <template v-if="viewMode === 'merged'">
      <ipr-process-compared-merged-graph ref="mergedGraph" :options="graphOptions" @done="done" />
    </template>
    <template v-else-if="viewMode === 'twoView'">
      <div class="d-flex" :style="{ width: '100%', height: '100%' }">
        <ipr-process-compared-two-view-graph ref="leftGraph" :options="graphOptions" position="left" @done="done" />
        <div class="divider"></div>
        <ipr-process-compared-two-view-graph ref="rightGraph" :options="graphOptions" position="right" @done="done" />
      </div>
    </template>
    <div class="graph-info" v-if="leftKpi && rightKpi && deltaVariantId.leftId && deltaVariantId.rightId">
      <h5>{{ $t('view.process.delta.labelKpi') }}</h5>
      <label>{{ getVariantName(deltaVariantId.leftId) }}</label>
      : {{ leftKpi }}%
      <br />
      <label>{{ getVariantName(deltaVariantId.rightId) }}</label>
      : {{ rightKpi }}%
    </div>
    <div class="process-slider" :class="viewMode">
      <b-row v-if="viewMode === 'merged' && deltaVariantId.leftId && deltaVariantId.rightId">
        <b-col>
          <b-button :class="{ 'btn-secondary': !left, 'btn-primary': left }" variant="primary" @click="onClickHighlight('left')">
            {{ getVariantName(deltaVariantId.leftId) }}
          </b-button>
          <b-button :class="{ 'btn-secondary': !right, 'btn-primary': right }" variant="primary" @click="onClickHighlight('right')">
            {{ getVariantName(deltaVariantId.rightId) }}
          </b-button>
        </b-col>
      </b-row>
      <b-row v-else-if="viewMode === 'twoView' && deltaVariantId.leftId && deltaVariantId.rightId">
        <b-col>
          <b-button :class="{ 'btn-secondary': left, 'btn-primary': !left }" variant="primary" @click="onClickOverlayToggle('left')">{{ getVariantName(deltaVariantId.rightId) }} {{ $t('view.process.delta.labelProcess') }} {{ $t(`view.process.button.${left ? 'hide' : 'show'}`) }}</b-button>
        </b-col>
        <b-col>
          <b-button :class="{ 'btn-secondary': right, 'btn-primary': !right }" variant="primary" @click="onClickOverlayToggle('right')">{{ getVariantName(deltaVariantId.leftId) }} {{ $t('view.process.delta.labelProcess') }} {{ $t(`view.process.button.${right ? 'hide' : 'show'}`) }}</b-button>
        </b-col>
      </b-row>
    </div>
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
        <template v-else-if="variantLoading">{{ $t('view.process.alert.loadingVariantList') }}</template>
        <template v-else-if="variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
        <template v-else-if="deltaVariantId.leftId === '' && deltaVariantId.rightId === ''">{{ $t('view.process.alert.chooseVariant') }}</template>
      </template>
      <div v-else-if="iocCode !== ''" class="no-data d-flex align-items-center justify-content-center">{{ $t('view.process.alert.' + iocCode) }}</div>
      <template v-else-if="isNoData">{{ $t('view.process.alert.Nodata') }}</template>
      <b-spinner v-else label="Spinning"></b-spinner>
    </template>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { IClient, IWorkFlowRequestAction } from '@/interface';

import { AnalysisMixin } from '@/mixin';

import { IprProcessComparedGraph } from '@iochord/ipr-fre-ent-core';

import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

@Component({
  computed: mapGetters({
    deltaVariantId: 'common/getVariantId',
  }),
})
export default class ProcessGraph extends Mixins(AnalysisMixin) {
  @Prop()
  getVariantName!: Function;

  deltaVariantId!: { leftId: string; rightId: string };

  viewMode: 'merged' | 'twoView' = 'merged';

  graphOptions = {
    height: '93%',
    nodeText: 'statistics.count',
    arcText: 'statistics.count',
    navigator: true,
  };

  caseId: string = '';

  left: boolean = false;
  right: boolean = false;

  leftKpi: string = null;
  rightKpi: string = null;

  iocCode: string = '';

  showLoading: boolean = false;

  $refs!: {
    mergedGraph: IprProcessComparedGraph;
    leftGraph: IprProcessComparedGraph;
    rightGraph: IprProcessComparedGraph;
  };

  mounted() {
    EventBus.$on('changeModelFilter', () => {
      this.viewMode = this.filter.viewMode;
      this.graphOptions['nodeText'] = this.filter.nodeText;
      this.graphOptions['arcText'] = this.filter.arcText;

      if (this.viewMode === 'merged') {
        this.graphOptions.height = '93%';
      } else if (this.viewMode === 'twoView') {
        this.graphOptions.height = '100%';
      }
    });
  }

  beforeDestroy() {
    EventBus.$off('changeModelFilter');
  }

  getGraph() {
    this.showLoading = true;
    this.isNoData = false;

    if (this.viewMode === 'merged') {
      this.left = true;
      this.right = false;
    } else if (this.viewMode === 'twoView') {
      this.left = true;
      this.right = true;
    }

    this.clear();

    const data = this.requestBuilder();

    // process.analysis.delta
    this.$store
      .dispatch('process/getDeltaGraph', data)
      .then((res: AxiosResponse) => {
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

  getByDataUri(dataUri: string) {
    this.clear();

    this.showLoading = true;
    this.isNoData = false;

    if (this.viewMode === 'merged') {
      this.left = true;
      this.right = false;
    } else if (this.viewMode === 'twoView') {
      this.left = true;
      this.right = true;
    }

    this.$store
      .dispatch('common/getCache', dataUri)
      .then((res: AxiosResponse) => {
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

  drawGraph(res: any) {
    this.iocCode = '';
    const results = res.data.data.results;
    if (results) {
      if (results.fhm) {
        // kpi crossfitness
        this.leftKpi = (results.fhm.baselineCrossFitness * 100).toFixed(2);
        this.rightKpi = (results.fhm.comparedCrossFitness * 100).toFixed(2);
        // 보기 방법에 따라 setData
        if (this.viewMode === 'merged') {
          this.$refs.mergedGraph.setData(results.fhm);
        } else if (this.viewMode === 'twoView') {
          this.$refs.leftGraph.setData({
            baseline: results.fhm.baseline,
            overlay: results.fhm.baselineOverlay,
            crossFitness: results.fhm.baselineCrossFitness,
          });
          this.$refs.rightGraph.setData({
            baseline: results.fhm.compared,
            overlay: results.fhm.comparedOverlay,
            crossFitness: results.fhm.comparedCrossFitness,
          });
        }
      } else {
        this.isNoData = true;
      }
    } else {
      this.isNoData = true;
    }
  }

  requestBuilder() {
    const data = {
      _type: 'DeltaAnalysisConfiguration',
      project: {
        _type: 'Project',
        id: this.$route.params.projectId,
      },
      baseline: {} as any,
      compared: {} as any,
      compares: {
        fhm: {
          _type: 'ProcessComparatorConfiguration',
          serviceId: 'process.discovery.model.fhm',
          configurations: [
            {
              // 프로세스 그래프 config
              _type: 'FhmProcessDiscoveryLiteConfigurationImpl',
              positiveObservationThreshold: this.setting.model.freq.complex,
              dependencyThreshold: this.setting.model.dep.complex,
              addArtificialStartEnd: true,
              displayLimit: 1000,
              useEventBag: this.setting.common.analysis.eventBag,
              calculateNodeRework: false,
              calculateBottleneck: false,
            },
          ],
        },
      },
    };

    // leftId variant가 표준 프로세스일 때
    if (this.deltaVariantId.leftId.startsWith('Standard')) {
      const pm = _.find(this.eventView.relations, ['_type', 'ProcessModel']);
      data.baseline = utils.buildProcess(this, this.deltaVariantId.leftId.split('|')[1]);
    }
    // leftId variant가 표준 프로세스가 아닐 때
    else {
      data.baseline = {
        _type: 'EventRepositoryDependentConfiguration',
        repository: utils.buildRepository(this),
        eventFilters: [utils.buildTimeEventFilter()],
      };

      // '전체' variant가 아닐 때
      if (this.deltaVariantId.leftId !== '---') {
        data.baseline.eventFilters.push(utils.buildVariantFilter(data.baseline.repository, data.baseline.eventFilters[0], this.deltaVariantId.leftId));
      }
    }

    // rightId variant가 표준 프로세스일 때
    if (this.deltaVariantId.rightId.startsWith('Standard')) {
      const pm = _.find(this.eventView.relations, ['_type', 'ProcessModel']);
      data.compared = utils.buildProcess(this, this.deltaVariantId.rightId.split('|')[1]);
    }
    // rightId variant가 표준 프로세스가 아닐 때
    else {
      data.compared = {
        _type: 'EventRepositoryDependentConfiguration',
        repository: utils.buildRepository(this),
        eventFilters: [utils.buildTimeEventFilter()],
      };
      // '전체' variant가 아닐 때
      if (this.deltaVariantId.rightId !== '---') {
        data.compared.eventFilters.push(utils.buildVariantFilter(data.compared.repository, data.compared.eventFilters[0], this.deltaVariantId.rightId));
      }
    }

    const request = [data];
    return request;
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

  onClickHighlight(p: 'left' | 'right') {
    if (p === 'left') {
      this.left = true;
      this.right = false;
    } else {
      this.left = false;
      this.right = true;
    }
    if (this.left || this.right) {
      this.$refs.mergedGraph.onHighlight(p);
    } else {
      this.$refs.mergedGraph.offHighlight();
    }
  }

  onClickOverlayToggle(p: string) {
    if (p === 'left') {
      this.left = !this.left;
      this.$refs.leftGraph.overlayToggle(this.left);
    } else {
      this.right = !this.right;
      this.$refs.rightGraph.overlayToggle(this.right);
    }
  }

  clear() {
    if (this.$refs.mergedGraph !== undefined && this.viewMode === 'merged') this.$refs.mergedGraph.clear();
    else if (this.$refs.leftGraph !== undefined && this.$refs.rightGraph !== undefined && this.viewMode === 'twoView') {
      this.$refs.leftGraph.clear();
      this.$refs.rightGraph.clear();
    }
  }

  toggleMinimap(toggle: boolean) {
    this.graphOptions.navigator = toggle;
    if (this.$refs.mergedGraph !== undefined && this.viewMode === 'merged') {
      const navigator = this.$refs.mergedGraph.$refs.navigator as HTMLDivElement;
      navigator.style.display = toggle === true ? 'block' : 'none';
    } else if (this.$refs.leftGraph !== undefined && this.$refs.rightGraph !== undefined && this.viewMode === 'twoView') {
      const lNavigator = this.$refs.leftGraph.$refs.navigator as HTMLDivElement;
      const rNavigator = this.$refs.rightGraph.$refs.navigator as HTMLDivElement;
      lNavigator.style.display = toggle === true ? 'block' : 'none';
      rNavigator.style.display = toggle === true ? 'block' : 'none';
    }
  }

  done() {
    this.showLoading = false;
  }

  showOverlay() {
    return this.deltaVariantId.leftId === '' || this.deltaVariantId.rightId === '' || this.variant.totalCount === 0 || this.showLoading || this.variantLoading || this.checkFilterHaveOnlyDuration;
  }
}
</script>
