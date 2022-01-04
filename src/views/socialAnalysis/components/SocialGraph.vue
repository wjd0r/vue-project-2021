<template>
  <b-overlay :show="showOverlay()" class="overlay-process chart-component d-flex align-items-center justify-content-center" no-fade bg-color="#fff" opacity="1">
    <ipr-social-graph ref="graph" :options="graphOptions" @nodeClick="nodeClick"></ipr-social-graph>
    <template #overlay>
      <template v-if="!workflowService && !workflowState">
        <template v-if="checkFilterHaveOnlyDuration">{{ $t('view.process.alert.chooseFilter') }}</template>
        <template v-else-if="variantLoading">{{ $t('view.process.alert.loadingVariantList') }}</template>
        <template v-else-if="variant.totalCount === 0">{{ $t('view.process.alert.variantNodata') }}</template>
        <template v-else-if="variantId === ''">{{ $t('view.process.alert.chooseVariant') }}</template>
      </template>
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

import { AxiosResponse } from 'axios';
import _ from 'lodash';

import { INode, IprSocialGraph } from '@iochord/ipr-fre-ent-core';

@Component({})
export default class SocialGraph extends Mixins(AnalysisMixin) {
  graphOptions = {
    nodeNormalColor: '#fbbc42',
    nodeActiveColor: '#fbbc42',
    layout: 'd3-force',
    nodeText: 'snindc',
    arcText: 'f',
    rank: 'snwdc',
    navigator: false,
  };

  $refs!: {
    graph: IprSocialGraph;
  };

  mounted() {
    EventBus.$on('setGraphOption', (option: any) => {
      this.graphOptions['layout'] = option.layout;
      this.graphOptions['rank'] = option.rank;
      this.graphOptions['nodeText'] = option.rank;
      this.graphOptions['arcText'] = option.arcText;
    });
  }

  getGraph() {
    this.showLoading = true;
    this.isNoData = false;
    this.$store.dispatch('social/getSocialGraph', this.requestBuilder()).then((res: AxiosResponse) => {
      this.drawGraph(res);
    });
  }

  getGraphByCaseId(caseId: string) {
    this.showLoading = true;
    this.isNoData = false;
    this.$store.dispatch('social/getSocialGraph', this.requestBuilder(caseId)).then((res: AxiosResponse) => {
      this.drawGraph(res);
    });
  }

  drawGraph(res: any) {
    const data = res.data;
    if (data === null || data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoData = true;
    } else if (data.data.nodeCount === 0) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }
    if (!this.isNoData) {
      this.$refs.graph.setData(res.data.data);
    }
    this.showLoading = false;
  }

  getByDataUri(dataUri: string) {
    this.showLoading = true;
    this.isNoData = false;
    this.$store.dispatch('common/getCache', dataUri).then((res: AxiosResponse) => {
      this.drawGraph(res);
    });
  }

  requestBuilder(caseId?: string) {
    const data = {
      _type: 'FhmProcessDiscoveryLiteConfiguration',
      repository: utils.buildRepository(this),
      eventFilters: [utils.buildTimeEventFilter()] as any,
      colEventActivity: this.filter.colEventActivity,
      positiveObservationThreshold: 0,
      dependencyThreshold: 0,
      useEventBag: this.setting.common.analysis.eventBag,
      calculateNodeRework: false,
      calculateBottleneck: false,
    };

    if (this.variantId !== '---') {
      data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.variantId));
    }

    if (caseId) {
      data.eventFilters.push({
        _type: 'CaseFilterLite',
        values: [caseId],
      });
    }

    const request = [data];

    return request;
  }

  workflowActionBuilder(client: IClient): IWorkFlowRequestAction {
    return {
      _type: 'ServiceAction',
      id: 'graph',
      serviceId: 'process.discovery.model.fhm.social',
      client: {
        ...client,
      },
      configurations: this.requestBuilder(),
    };
  }

  nodeClick(event: Event, node: INode) {
    const config = {
      _type: 'FhmProcessDiscoveryLiteConfiguration',
      colEventActivity: this.filter.colEventActivity,
      positiveObservationThreshold: 0,
      dependencyThreshold: 0,
      useEventBag: this.setting.common.analysis.eventBag,
    };
    this.$emit('graphDoubleClick', node.name, config, 'NODE');
  }

  offHighlight() {
    return;
  }

  showOverlay() {
    return this.variantId === '' || this.variant.totalCount === 0 || this.isNoData || this.showLoading || this.variantLoading || this.checkFilterHaveOnlyDuration;
  }
}
</script>
