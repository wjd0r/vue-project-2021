<template>
  <div class="content-body">
    <div class="table-group">
      <table class="table line">
        <thead>
          <tr>
            <th width="20%">{{ $t('view.sso.label.role') }}</th>
            <th width="20%">{{ $t('view.sso.label.permission') }}</th>
            <th width="10%">{{ $t('view.sso.label.active') }}</th>
            <th width="10%">{{ $t('view.sso.label.inactive') }}</th>
            <th width="10%"></th>
          </tr>
        </thead>
        <tbody>
          <PermissionsBoxSelectBox @add="onAdd" />
          <template v-for="permission, index in permissions">
            <Permission :permission="permission" :key="index" @sub="onSub(index)"/>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import PermissionsBoxSelectBox from './PermissionsBoxSelectBox.vue';
import Permission from './Permission.vue';
import { find } from 'lodash';
import { utils } from '@/common';

interface IPermission { resourceCode: string; operationCode: string; isAllow: boolean }

@Component({
  components: {
    PermissionsBoxSelectBox,
    Permission,
  },
})
export default class PermissionsBox extends Vue {
  @Prop()
  value!: IPermission[];
  permissions: IPermission[] = [];

  @Watch('value', {deep: true, immediate: true})
  onValue() {
    this.permissions = [...this.value];
  }

  vModel() {
    this.$emit('input', this.permissions);
  }

  onAdd(permission: IPermission) {
    if(find(this.permissions, (o) => {
      return o.resourceCode == permission.resourceCode && o.operationCode == permission.operationCode
    }) == undefined) {
      this.permissions.push({...permission});
      this.vModel();  
    } else {
      utils.bvModalmsgBoxOk(this, this.$t('view.setting.title.warning').toString(), this.$t('view.setting.message.already').toString());
    }
  }

  onSub(index: number) {
    this.permissions.splice(index, 1);
    this.vModel();
  }
}
</script>