<template>
<!-- filter stream -->
<div class="topologe-component filter-stream-component">
  <div class="topologe-content filter-stream-content">
    <div class="content-header">
      <h4 class="title">Filter Stream</h4>
    </div>
    <div class="content-body">
      <div class="table-component">
        <div class="table-content">
          <b-table class="table line table-responsive" bordered :items="topology.data.preview" :fields="keys" responsive>
            <template v-slot:thead-top="">
              <b-tr>
                <b-th v-for="(item, index) in keys" :key="index">
                  <template v-if="topology.bolts.streams[topology.flowstate-1].config.filters[index].column.type == 'STRING'">
                    <StringFilter v-model="topology.bolts.streams[topology.flowstate-1].config.filters[index].filterValue" :options="options" @change="onChange(index)"/>
                  </template>

                  <template v-if="topology.bolts.streams[topology.flowstate-1].config.filters[index].column.type == 'NUMERIC'">
                    <NumericFilter
                      :operationType="topology.bolts.streams[topology.flowstate-1].config.filters[index].operationType"
                      :filterValue="topology.bolts.streams[topology.flowstate-1].config.filters[index].filterValue"
                      :filterValue2="topology.bolts.streams[topology.flowstate-1].config.filters[index].filterValue2"
                      @onOperationType="(value) => { topology.bolts.streams[topology.flowstate-1].config.filters[index].operationType = value}"
                      @onFilterValue="(value) => { topology.bolts.streams[topology.flowstate-1].config.filters[index].filterValue = value }"
                      @onFilterValue2="(value) => { topology.bolts.streams[topology.flowstate-1].config.filters[index].filterValue2 = value }" @change="onChange(index)"/>
                  </template>
                
                  <template v-if="topology.bolts.streams[topology.flowstate-1].config.filters[index].column.type == 'TIMESTAMP'">
                    <TimestampFilter v-model="topology.bolts.streams[topology.flowstate-1].config.filters[index].filterValue"  @change="onChange(index)"/>
                  </template>
                </b-th>
              </b-tr>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- filter stream -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { EventBus } from '@/common';

import Topology from '../../ts/Topology';
import StringFilter from './filter/StringFilter.vue';
import NumericFilter from './filter/NumericFilter.vue';
import TimestampFilter from './filter/TimestampFilter.vue';

@Component({
  components: {
    StringFilter,
    NumericFilter,
    TimestampFilter,
  },
    computed: mapGetters({
  }),
})
export default class TopologyInstanceFilterStream extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;
  keys: Array<any> = [];
  previewClone: any = [];

  options: any = ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry'];
  selected: any = [];

  created() {
    // 방문횟수를 1추가 함.
    this.topology.flows[this.topology.flowstate].flowVisitCnt++;

    // 최초 진입여부
    if(this.topology.isFirstEntry()) {
      // 다음 버튼 비활성화
      EventBus.$emit('nextButtonDisabled', true);

      // bolt 추가
      this.topology.addBolt();

      // 필트 초기화
      this.topology.initSelectedFilters();

      Object.keys(this.topology.data.preview[0]).forEach((key) => {
        this.keys.push({'key': key, 'variant': ''});
      });
    } else {
      Object.keys(this.topology.data.preview[0]).forEach((key, index) => {
        if(this.topology.bolts.streams[this.topology.flowstate-1].config.filters[index].filterValue != null) {
          this.keys.push({'key': key, 'variant': 'secondary'});  
        } else {
          this.keys.push({'key': key, 'variant': ''});
        }
      });
    }
  }

  // 버튼 활성화 여부 체크

  // 선택 박스 변경
  onChangeSelectbox() {
    return
  }

  onChange(index: number) {
    if(this.topology.bolts.streams[this.topology.flowstate-1].config.filters[index].filterValue != null) {
      this.keys[index].variant = 'secondary';
    } else {
      this.keys[index].variant = '';
    }
  }
}
</script>