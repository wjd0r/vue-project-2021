<template>
  <tr>
    <td width="20%" class="value-content">
      <b-form-input type="text" v-model="permission.resourceCode" disabled></b-form-input>
    </td>
    <td width="20%" class="value-content">
      <b-form-input type="text" v-model="permission.operationCode" disabled></b-form-input>
    </td>
    <td width="10%">
      <b-form-checkbox :id="permission.resourceCode+permission.operationCode" v-model="permission.isAllow" value="true" />
    </td>
    <td width="10%">
      <b-form-checkbox :id="permission.resourceCode+permission.operationCode" v-model="permission.isAllow" value="false" />
    </td>
    <td  width="10%" class="add-remove">
      <div class="btn-remove ico-minus" alt="빼기 아이콘" @click="$emit('sub');"></div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

interface IPermission { resourceCode: string; operationCode: string; isAllow: boolean }

@Component({})
export default class Permission extends Vue {
  @Prop()
  permission!: IPermission;
}
</script>