<template>
  <tr>
    <td width="20%">
      <b-form-select v-model="permission.resourceCode" :options="roleOptions"></b-form-select>
    </td>
    <td width="20%">
      <b-form-select v-model="permission.operationCode" :options="rermissionOptions"></b-form-select>
    </td>
    <td width="10%">
    </td>
    <td width="10%">
    </td>
    <td  width="10%" class="add-remove">
      <div class="btn-add ico-plus" alt="추가 아이콘" @click="onClick"></div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface IPermission { resourceCode: string; operationCode: string; isAllow: boolean }
interface IOption { value:  string | number; text: string }

@Component({})
export default class PermissionsBoxSelectBox extends Vue {
  roleOptions: IOption[] = [
    { value: 'ipr.repo.dataset', text: 'ipr.repo.dataset' },
    { value: 'ipr.repo.repository', text: 'ipr.repo.repository' },
    { value: 'ipr.repo.data.source', text: 'ipr.repo.data.source' },
    { value: 'ipr.repo.process', text: 'ipr.repo.process' },
    { value: 'ipr.user', text: 'ipr.user' },
    { value: 'ipr.workspace.resource', text: 'ipr.workspace.resource' },
  ];

  datasetRepositoryOptions: IOption[] = [
    { value: 'VIEW', text: 'view' },
    { value: 'CREATE', text: 'create' },
    { value: 'DELETE', text: 'delete' },
    { value: 'EXPORT', text: 'export' },
  ];

  dataSourceOptions: IOption[] = [
    { value: 'CREATE', text: 'create' },
    { value: 'DELETE', text: 'delete' },
    { value: 'UPDATE', text: 'update' },
    { value: 'VIEW', text: 'view' },
  ];

  processUserOptions: IOption[] = [
    { value: 'VIEW', text: 'view' },
    { value: 'CREATE', text: 'create' },
    { value: 'DELETE', text: 'delete' },
    { value: 'UPDATE', text: 'update' },
    { value: 'EXPORT', text: 'export' },
  ];

  workspaceOptions: IOption[] = [
    { value: 'VIEW', text: 'view' },
    { value: 'CREATE', text: 'create' },
    { value: 'DELETE', text: 'delete' },
    { value: 'UPDATE', text: 'update' },
    { value: 'EXPORT', text: 'export' },
    { value: 'workspace.mapping', text: 'workspace.mapping' },
    { value: 'assign.user', text: 'assign.user' },
    { value: 'remove.user', text: 'remove.user' },
    { value: 'assign.admin', text: 'assign.admin' },
    { value: 'transfer.admin', text: 'transfer.admin' },
  ];

  permission: IPermission = {
    resourceCode: "ipr.repo.dataset",
    operationCode: "CREATE",
    isAllow: true,
  }

  onClick() {
    this.permission.isAllow = this.permission.isAllow === true;
    this.$emit('add', {...this.permission});
  }

  get rermissionOptions() {
    switch(this.permission.resourceCode){
      case 'ipr.repo.dataset': {
        return this.datasetRepositoryOptions;
      } case 'ipr.repo.repository': {
        return this.datasetRepositoryOptions;
      } case 'ipr.repo.data.source': {
        return this.dataSourceOptions;
      } case 'ipr.repo.process': {
        return this.processUserOptions;
      } case 'ipr.user': {
        return this.processUserOptions;
      } case 'ipr.workspace.resource': {
        return this.workspaceOptions;
      } default: {
        return this.datasetRepositoryOptions;
      }
    }
  }
}
</script>