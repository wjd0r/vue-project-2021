<template>
<!-- Join Stream -->
<div class="topologe-component join-stream-component">
  <div class="topologe-content join-stream-content">
    <div class="content-header">
      <h4 class="title">Join Stream</h4>
    </div>
    <div class="content-body">
      <div class="database-component">
        <div class="database-content">
          <div class="content-header">
            <h5 class="title">데이터 소스</h5>
          </div>
          <div class="content-body">
            <div class="list-content">
              <b-overlay :show="topology.data.datasources.length == 0" opacity="1">
                <template v-for="item in topology.data.datasources">
                  <div class="card card-created database" :key="item.id" @click="onClickDataSourceCard(item)" :class="{active: topology.data.input.selectedDatasource == item}">
                    <div class="content-header">
                      <div class="ico-card ico-database" alt="데이터베이스 아이콘"></div>
                      <h5 class="title">{{item.name}}</h5>
                      <div class="right-align">
                        <div class="type-text">{{item.provider}}</div>
                      </div>
                    </div>
                    <div class="content-footer">
                      <div class="user-inf">생성자 - {{item.username}}</div>
                      <div class="last-update">{{formating(item.modified)}}</div>
                    </div>
                  </div>
                </template>
              </b-overlay>
            </div>
          </div>
        </div>
      </div>
      <div class="form-component">
        <div class="form-content">
          <b-form-group label="Table Name" :label-cols="3">
            <b-form-input v-model="topology.data.input.selectedDatasource.name" type="text" placeholder="" disabled/>
          </b-form-group>
          <b-form-group label="Join Condition" :label-cols="3">
            <b-select v-model="selectedJoinCondition" :options="topology.options.joinCondition"></b-select>
          </b-form-group>
          <b-form-group label="Topic Name" :label-cols="3">
            <b-form-input type="text" placeholder="" disabled></b-form-input>
          </b-form-group>
        </div>
        <div class="table-form-content">
          <div class="content-header">
            <h5 class="title">타이틀</h5>
          </div>
          <div class="form-content">
            <b-form-group label="Table Field" :label-cols="3">
              <b-form-select v-model="topology.data.input.selectedDatasourceField">
                <b-form-select-option value="">선택</b-form-select-option>
                <template v-for="item in topology.data.datasourceFields">
                  <b-form-select-option :value="item" :key="item.id">{{item}}</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group label="Join Condition" :label-cols="3">
              <b-select v-model="selectedJoinCondition" :options="topology.options.joinCondition"></b-select>
            </b-form-group>
            <b-form-group label="Topic Column" :label-cols="3">
              <b-form-select>
                <b-form-select-option value="3">topic colum1</b-form-select-option>
                <b-form-select-option value="2">topic colum2</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group label="추가" :label-cols="3">
              <b-button variant="outline-secondary" class="btn-add"><div class="ico-form ico-plus" alt="추가 아이콘"></div></b-button>
            </b-form-group>
          </div>
          <div class="table-content">
            
            <table class="table line table-responsive">
              <thead>
                <tr>
                  <th>Relation Type</th>
                  <th>Table Field</th>
                  <th>Join Condition</th>
                  <th>Topic Column</th>
                  <th>제거</th>
                </tr>
              </thead>
              <tbody>
                <!-- <td colspan="5"><div class="nodata-text">목록이 없습니다.</div></td> -->

                <tr>
                  <td>
                    <b-form-select>
                      <b-form-select-option value="">선택</b-form-select-option>
                      <b-form-select-option value="">선택</b-form-select-option>
                    </b-form-select>
                  </td>
                  <td>Column name (type)</td>
                  <td>=</td>
                  <td>Filtered column (type)</td>
                  <td><div class="ico-form ico-minus" alt="제거 아이콘"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Join stream -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import moment from 'moment';

import Topology from '../../ts/Topology';
import CardDatabase from '../../../components/cards/CardDatabase.vue';
import { EventBus } from '@/common';

@Component({
  components: {
    CardDatabase,
  },
  computed: {
    formating() {
      return (modified: string) => moment(modified).format('YYYY-MM-DD')
    },
    ...mapGetters({
    }),
  }
})
export default class TopologyInstanceJoinStream extends Mixins(UtilsMixin) {
  topology: Topology = this.$parent.$parent.$parent.$data.topology;
  selectedJoinCondition: string = '';

  created() {
    // 방문횟수를 1추가 함.
    this.topology.flows[this.topology.flowstate].flowVisitCnt++;

    // 다음 버튼 비활성화
    EventBus.$emit('nextButtonDisabled', true);

    // bolt 추가
    this.topology.addBolt();
    
    this.topology.getDatasource();
    this.selectedJoinCondition = this.topology.options.joinCondition[0].value;
  }

  // 데이터 소스 카드 클릭
  onClickDataSourceCard(item: any) {
    this.topology.data.input.selectedDatasource = item;
    this.topology.getDatasourceFields();
  }
}
</script>