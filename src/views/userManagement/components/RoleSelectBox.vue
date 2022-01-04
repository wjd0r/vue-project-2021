<template>
  <div>
    <b-form-select v-model="content" :options="roleOptions" @change="vModel" v-if="gray"></b-form-select>
    <b-form-select v-model="content" :options="roleOptions" @change="vModel" :state="state" v-else-if="state" :style="{ 'border-color': '#05A66B !important' }"></b-form-select>
    <b-form-select v-model="content" :options="roleOptions" @change="vModel" :state="state" v-else :style="{ 'border-color': '#F23005 !important' }"></b-form-select>
  </div>
</template>

<script lang="ts">
import { forEach } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';

interface IRole { id: number; name: string; code: string; desc: string; isDeleted: boolean }
interface IOption { value: number; text: string }

@Component({})
export default class RoleSelectBox extends Vue {
  @Prop()
  value!: number;

  @Prop()
  state!: boolean;

  @Prop()
  gray!: boolean;

  content: number = this.value;
  roleOptions: IOption[] = [];

  async created() {
    const roles = this.$parent.$parent.$parent.$parent.$parent.$data.roles; // 권한 데이터 가져오기
    
    forEach(roles, (role: IRole) => {
      this.roleOptions.push({
        value: role.id,
        text: role.name,
      });
    });
  }

  vModel() {
    this.$emit('input', this.content);
  }
}
</script>
