<template>
  <b-form-select v-model="content" :options="comps" @change="vModel"></b-form-select>
</template>

<script lang="ts">
import { forEach } from 'lodash';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class CompanyGroupSelectBox extends Vue {
  @Prop()
  value!: number;
  content: number = this.value;

  comps: any = []; // 원본 옵션 리스트

  @Watch('value')
  onVlaue() {
    this.content = this.value;
  }

  async created() {
    const res = (await this.$store.dispatch('company/getCompanyAll', '')).data; // 회사
    
    forEach(res, (comp) => {
      this.comps.push({
        value: comp.id,
        text: comp.name,
      });
    });

    // defalt 설정
    if(this.content == 0)
      this.content = this.comps[0].value;

    this.vModel();
  }

  vModel() {
    this.$emit('input', this.content);
  }
}
</script>
