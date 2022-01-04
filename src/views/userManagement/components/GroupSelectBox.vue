<template>
  <b-form-select v-model="content" :options="groupOptions" @change="vModel"></b-form-select>
</template>

<script lang="ts">
import { forEach } from 'lodash';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class GroupSelectBox extends Vue {
  @Prop()
  value!: number;
  content: number = this.value;

  @Prop()
  companyId!: number;

  companys: any = []; // 원본 옵션 리스트
  groupOptions: any = []; // 원본 옵션 리스트

  async created() {
    this.companys = (await this.$store.dispatch('company/getCompanyAll', '')).data; // 회사
    this.onCompanyId(this.companyId);
  }

  @Watch('value')
  onValue() {
    this.content = this.value;
  }

  @Watch('companyId')
  onCompanyId(companyId: number) {
    const req = this.companys.find(function(comp: any) {
      if(comp.id == companyId)  {
        return true;
      }
    });

    if(req != null && req != undefined && req.groups != undefined) {
      this.groupOptions = [];
      forEach(req.groups, (grou) => {
        this.groupOptions.push({
          value: grou.id,
          text: grou.name,
        });
      });

      this.content = this.groupOptions[0].value;
    }
    this.vModel();
  }

  vModel() {
    this.$emit('input', this.content);
  }
}
</script>
