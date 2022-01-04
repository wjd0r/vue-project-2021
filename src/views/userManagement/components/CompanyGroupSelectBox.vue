<template>
  <div class="company-group">
    <b-form-group :label="$t('view.sso.label.organization')" :label-cols="3">
      <b-form-select v-model="companyId" :options="comps" @change="compChange"></b-form-select>
    </b-form-group>
    <b-form-group :label="$t('view.sso.label.department')" :label-cols="3">
      <b-form-select v-model="groupId" :options="grous" @change="vModel"></b-form-select>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { forEach } from 'lodash';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class CompanyGroupSelectBox extends Vue {
  origns: any = []; // 원본 옵션 리스트

  comps: any = []; // 원본 옵션 리스트
  grous: any = []; // 원본 옵션 리스트
  
  companyId: string = '1';
  companyName: string = '';

  groupId: string = '1';
  groupName: string = '';

  async created() {
    this.origns = (await this.$store.dispatch('company/getCompanyAll', '')).data; // 회사
    
    forEach(this.origns, (comp) => {
      this.comps.push({
        value: comp.id,
        text: comp.name,
      });
    });

    this.companyId = this.comps[0].value;
    this.companyName = this.comps[0].text;
    this.compChange();
  }

  compChange() {
    const id = this.companyId;
    const req = this.origns.find(function(comp: any) {
      return comp.id == id;
    });

    // 선택된 ID로 회사 명 세팅
    this.companyName = (this.comps.find((comp: any) => {
      return comp.value == id
    })).text;

    // 회사가 변경될 때 부서 초기화를 해주어야 함.
    this.grous = [];
    forEach(req.groups, (grou) => {
      this.grous.push({
        value: grou.id,
        text: grou.name,
      });
    });

    this.groupId = this.grous[0].value;
    this.groupName = this.grous[0].text;

    this.vModel();
  }

  vModel() {
    this.$emit('input', {
      companyId: this.companyId,
      groupId: this.groupId,
      companyName: this.companyName,
      groupName: this.groupName,
    });
  }
}
</script>
