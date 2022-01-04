<template>
<!-- Join Stream -->
<div class="topologe-component join-stream-component">
  <div class="topologe-content join-stream-content">
    <div class="content-header">
      <h4 class="title" desc="Join Stream">{{ $t('view.sso.topology.label.joinStream') }}</h4>
    </div>
    <div class="content-body">
      <div class="database-component">
        <div class="database-content">
          <div class="content-header">
            <h5 class="title" desc="데이터 소스">{{ $t('view.sso.topology.label.dataSource') }}</h5>
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
                      <div class="user-inf" desc="생성자">{{ $t('view.sso.topology.label.constructor') }} - {{item.username}}</div>
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
          <b-form-group :label="$t('view.sso.topology.label.tableName')" desc="Table Name" :label-cols="3">
            <b-form-input v-model="topology.data.input.selectedDatasource.name" type="text" placeholder="" disabled/>
          </b-form-group>
          <b-form-group :label="$t('view.sso.topology.label.joinCondition')" desc="Join Condition" :label-cols="3">
            <b-select v-model="selectedJoinCondition" :options="topology.options.joinCondition"></b-select>
          </b-form-group>
          <b-form-group :label="$t('view.sso.topology.label.topicName')" desc="Topic Name" :label-cols="3">
            <b-form-input type="text" placeholder="" disabled></b-form-input>
          </b-form-group>
        </div>
        <div class="table-form-content">
          <div class="content-header">
            <h5 class="title" desc="타이틀">{{ $t('view.sso.topology.label.title') }}</h5>
          </div>
          <div class="form-content">
            <b-form-group :label="$t('view.sso.topology.label.tableField')" desc="Table Field" :label-cols="3">
              <b-form-select v-model="topology.data.input.selectedDatasourceField">
                <b-form-select-option value="" desc="선택">{{ $t('view.sso.topology.selectOption.select') }}</b-form-select-option>
                <template v-for="item in topology.data.datasourceFields">
                  <b-form-select-option :value="item" :key="item.id">{{item}}</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group :label="$t('view.sso.topology.label.joinCondition')" desc="Join Condition" :label-cols="3">
              <b-select v-model="selectedJoinCondition" :options="topology.options.joinCondition"></b-select>
            </b-form-group>
            <b-form-group :label="$t('view.sso.topology.label.topicColumn')" desc="Topic Column" :label-cols="3">
              <b-form-select>
                <b-form-select-option value="3" desc="topic colum1">{{ $t('view.sso.topology.selectOption.topicColum1') }}</b-form-select-option>
                <b-form-select-option value="2" desc="topic colum2">{{ $t('view.sso.topology.selectOption.topicColum2') }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group :label="$t('view.sso.topology.label.add')" desc="추가" :label-cols="3">
              <b-button variant="outline-secondary" class="btn-add"><div class="ico-form ico-plus" alt="추가 아이콘"></div></b-button>
            </b-form-group>
          </div>
          <div class="table-content">
            
            <table class="table line table-responsive">
              <thead>
                <tr>
                  <th desc="Relation Type">{{ $t('view.sso.topology.label.relationType') }}</th>
                  <th desc="Table Field">{{ $t('view.sso.topology.label.tableField') }}</th>
                  <th desc="Join Condition">{{ $t('view.sso.topology.label.joinCondition') }}</th>
                  <th desc="Topic Column">{{ $t('view.sso.topology.label.topicColumn') }}</th>
                  <th desc="제거">{{ $t('view.sso.topology.label.remove') }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- <td colspan="5"><div class="nodata-text">목록이 없습니다.</div></td> -->

                <tr>
                  <td>
                    <b-form-select>
                      <b-form-select-option value="" desc="선택">{{ $t('view.sso.topology.selectOption.select') }}</b-form-select-option>
                    </b-form-select>
                  </td>
                  <td desc="Column name (type)">{{ $t('view.sso.topology.label.columnName') }}</td>
                  <td>=</td>
                  <td desc="Filtered column (type)">{{ $t('view.sso.topology.label.filteredColumn') }}</td>
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