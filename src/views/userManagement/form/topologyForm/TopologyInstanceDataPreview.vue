<template>
<!-- data preview -->
<div class="topologe-component data-preview-component">
  <div class="topologe-content data-preview-content">
    <div class="content-header">
      <h4 class="title" desc="Data Preview">{{ $t('view.sso.topology.label.dataPreview') }}</h4>
    </div>
    <div class="content-body">
      <div class="form-content">
        <b-form-checkbox name="all-column" value="true" @change="onChangeSelectboxAll($event)" desc="전체 Column 선택">{{ $t('view.sso.topology.checkbox.selectAllColumns') }}</b-form-checkbox>
      </div>
      <div class="table-component">
        <div class="table-content">
          <b-table class="table line table-responsive" bordered :items="topology.data.preview" :fields="keys" responsive>
            <template v-slot:thead-top="">
              <b-tr>
                <b-td v-for="(item, index) in keys" :key="index">
                  <b-form-select v-model="topology.bolts.streams[topology.flowstate-1].config.columns[index].type" @change="onChangeSelectbox(index)">
                    <b-form-select-option value="" desc="선택">{{ $t('view.sso.topology.selectOption.select') }}</b-form-select-option>
                    <b-form-select-option value="STRING" desc="String (Boolean 포함)">{{ $t('view.sso.topology.selectOption.string') }}</b-form-select-option>
                    <b-form-select-option value="NUMERIC" desc="Numeric">{{ $t('view.sso.topology.selectOption.numeric') }}</b-form-select-option>
                    <b-form-select-option value="TIMESTAMP" desc="Timestamp">{{ $t('view.sso.topology.selectOption.timestamp') }}</b-form-select-option>
                  </b-form-select>
                </b-td>
              </b-tr>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- data preview -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';

import Topology from '../../ts/Topology';
import { EventBus } from '@/common';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class TopologyInstanceDataPreview extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;
  keys: any = [];

  mounted() {
    // 방문횟수를 1추가 함.
    this.topology.flows[this.topology.flowstate].flowVisitCnt++;

    // 최초 진입여부
    if(this.topology.isFirstEntry()) {
      // 다음 버튼 비활성화
      EventBus.$emit('nextButtonDisabled', true);
      // bolt 추가
      this.topology.addBolt();
      // 필드 초기화
      this.topology.initSelectedFileds();
      Object.keys(this.topology.data.preview[0]).forEach((key) => {
        this.keys.push({'key': key, 'variant': ''});
      });
    } else {
      // 다음 버튼 활성화
      EventBus.$emit('nextButtonDisabled', false);
      Object.keys(this.topology.data.preview[0]).forEach((key, index) => {
        if(this.topology.bolts.streams[this.topology.flowstate-1].config.columns[index].use) {
          this.keys.push({'key': key, 'variant': 'secondary'});  
        } else {
          this.keys.push({'key': key, 'variant': ''});
        }
      });
    }
  }

  // 선택 박스 하나만 변경
  onChangeSelectbox(index: number) {
    if(this.topology.bolts.streams[this.topology.flowstate-1].config.columns[index].type != '') {
      this.keys[index].variant = 'secondary';
      this.topology.bolts.streams[this.topology.flowstate-1].config.columns[index].use = true;
    } else {
      this.keys[index].variant = '';
      this.topology.bolts.streams[this.topology.flowstate-1].config.columns[index].use = false;
    }
    this.nextEnabled();
  }

  // 모든 선택 박스 변경
  onChangeSelectboxAll($event: number) {
    this.keys = [];
    Object.keys(this.topology.data.preview[0]).forEach((key, index) => {
      if($event) {
        this.keys.push({'key': key, 'variant': 'secondary'});
      } else {
        this.keys.push({'key': key, 'variant': ''});
      }
      this.topology.allSelectedFilters($event);
    });
    this.nextEnabled();
  }

  // 다음 버튼 활성화
  nextEnabled() {
    EventBus.$emit('nextButtonDisabled', this.topology.usedFileds().length == 0);
  }
}
</script>