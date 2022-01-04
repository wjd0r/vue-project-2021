<template>
  <b-dropdown :id="'dropdown-form_'+skey" :text="selectedKey()" ref="dropdown" class="multiselect w-100">
    <b-dropdown-form>
      <div v-if="loading" class="text-center">
          <b-spinner small></b-spinner>
      </div>
      <div v-else>
        <b-form-checkbox class="multiselect" v-model="selectedAll" @change="selectAll" :style="{'white-space':'nowrap'}">Select All</b-form-checkbox>
        <b-form-checkbox class="item" v-for="(value, name) in selectes" :key="name" v-model="selectes[name]" :style="{'white-space':'nowrap'}">{{name}}</b-form-checkbox>
      </div>
    </b-dropdown-form>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item class="item-apply">
      <b-button variant="primary" class="btn-primary btn-apply" @click="onClickApplied()">{{ $t('view.repo.button.ok') }}</b-button>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style scoped>
  /* .multiselect { background: #fff !important; }
  .b-dropdown-form { padding: 0.25rem 1rem; } */
</style>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import _ from 'lodash';

import { UtilsMixin } from '@/mixin';

@Component({
  computed: {
    ...mapGetters({
      projectId: 'sso/getProjectId',
      subDatasetCreateInfo: 'dataFilter/getSubDatasetCreateInfo',
    })
  },
})
export default class MultiSelect extends Mixins(UtilsMixin) {
  //@Prop({ default: () => ({}) })
  //private selectes!: any;
  projectId!: string;
  subDatasetCreateInfo!: any;

  @Prop()
  skey: string;

  selectes: any = [];

  selectedAll: boolean = false;
  a: string = '';
  b: string = '';

  result: any[] = [];

  loading: boolean = true;

  //document.getElementById('dropdown-form').addEventListener('mousedown', this.dropdownClick);

  mounted() {
    //dropdown-form+'_'+skey
    const id = 'dropdown-form_'+this.skey;
    document.getElementById(id).addEventListener('mousedown', this.dropdownClick);
  }

  dropdownClick() {//데이터 가져오기
    if(this.selectes.length == 0) {
      this.selectOption(this.skey);
    }
  }

  async selectOption(key: string) {
    
    this.loading = true;
    const itemsByKeySetOptions: any = {};
    const res = await this.$store.dispatch('dataFilter/getRepoDataUtilLookupLite', {
      projectId: this.projectId,
      dataSetId: this.subDatasetCreateInfo.dataSetId,
      resourceGroupId: this.subDatasetCreateInfo.resourceGroupId,
      field: key,
    });

    const data = res.data.data;

    if(data==null || data==undefined) return {};
      
    await Object.keys(data).forEach((item: any)=>{
      itemsByKeySetOptions[item] = false;
    });

    this.selectes = itemsByKeySetOptions;
    this.loading = false;

  }


  selectAll() {
    this.selectedAll = !this.selectedAll;
    for(const key in this.selectes){
      this.selectes[key] = this.selectedAll;
    }
  }

  selectedKey() {

    if(this.selectedAll) return this.$t('view.repo.event.mapping.selectedAll').toString();

    const strs: string[] = [];
    _.forEach(
      _.filter(Object.entries(this.selectes), (o) => o[1] == true ),
      (a) => strs.push(a[0]),
    );

    const result = strs.join(', ');

    return result == '' ? this.$t('view.repo.event.mapping.doSelect').toString() : result;
  }

  onClickApplied() {

    this.result = [];
    Object.entries(this.selectes).forEach((s: any) => {
      if(s[1] == true) this.result.push(s[0]);  
    });

    this.$emit('onClickApplied', this.result, this.skey);
  
  }
}
</script>