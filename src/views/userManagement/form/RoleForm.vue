<template>
  <div class="manage-form-content">
    <!-- form -->
    <div class="content-header">
      <h5 class="title">{{ $t('view.sso.label.roleProperties') }}</h5>
    </div>
    <div class="content-body">
      <form class="form-content">

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="false"
          v-model="roleForm.createdOn" :label="$t('view.sso.label.roleDate')" 
          :disabled="true" v-if="this.mode != 'create'"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"/>

        <validate-input type="text" :label-cols="3" :mode="mode" :essential="true"
          v-model="roleForm.name" :label="$t('view.sso.label.roleName')" 
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255" :duplicate-list="rowDataCopy" duplicate-property="name"
          @output="(arg) => output.name = arg"/>
        
        <validate-input type="text" :label-cols="3" :mode="mode" :essential="true"
          v-model="roleForm.code" :label="$t('view.sso.label.roleCode')" 
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.code = arg"/>
        
        <validate-input type="text" :label-cols="3" :mode="mode" :essential="false"
          v-model="roleForm.desc" :label="$t('view.sso.label.roleDescription')" 
          :disabled="isMobileBlock()"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.desc = arg"/>

        <b-form-group :label="$t('view.sso.label.use')" :label-cols="3">
          <b-form-select v-model="roleForm.isDeleted" :disabled="isMobileBlock()">
            <b-form-select-option value="false">{{ $t('view.sso.filter.used') }}</b-form-select-option>
            <b-form-select-option value="true">{{ $t('view.sso.filter.unUsed') }}</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </form>
    </div>
    <!-- form -->

    <!-- 권한 목록 -->
    <div class="table-list-component member-add">
      <div class="table-list-content">
        <div class="content-header">
          <h5 class="title">{{ $t('view.sso.label.roleList') }}</h5>
        </div>
        <PermissionsBox v-model="roleForm.permissions" />
      </div>
    </div>
    <!-- 권한 목록 -->
  </div>
</template>

<style lang="scss" scoped>
td {
  text-align: center;
}
</style>

<script lang="ts">
import { EventBus } from '@/common';
import { UtilsMixin } from '@/mixin';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import PermissionsBox from '../components/PermissionsBox.vue'

import ValidateInput from'@/views/components/ValidateInput.vue';

interface IRole { name: string; code: string; desc: string; isDeleted: boolean; createdOn: string; addPermissions: IPermission[]; removePermissions: IPermission[]; permissions: IPermission[] }
interface IPermission { id: number; resourceCode: string; operationCode: string; isAllow: boolean }

@Component({
  components: {
    PermissionsBox,
    ValidateInput,
  },
  computed: mapGetters({}),
})
export default class RoleForm extends Mixins(UtilsMixin) {
  /* Prop 선언 */
  @Prop()
  mode!: 'create' | 'modify';
  rowData: Array<any> = [];
  rowDataCopy: Array<any> = [];

  roleForm: IRole = {
    name: '',
    code: '',
    desc: '',
    isDeleted: false,
    createdOn: '',
    addPermissions:[],
    removePermissions:[],
    permissions: [],
  };
  
  roleList: IRole[] = [];

  output: any = {
    name: true,
    code: true,
    desc: true,
  }

  mounted() {
    EventBus.$emit('roleRowData', (rowData: any) => {
      this.rowData = rowData;
    });

    EventBus.$emit('roleForm', (roleForm: any) => {
      this.roleForm = roleForm;
    });

    if (this.mode === 'modify') {
      this.rowDataCopy = this.rowData.filter((e: any) => {
        return e.name != this.roleForm.name;
      });  
    } else {
      this.rowDataCopy = this.rowData;
    }
  }

  get validation() {
    return this.output.name && this.output.code & this.output.desc && this.roleForm.permissions.length != 0;
  }
}
</script>