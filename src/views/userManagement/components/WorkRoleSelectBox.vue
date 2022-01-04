<template>
  <div class="table-list-component role-add">
    <div class="table-list-content">
      <div class="content-header">
        <h5 class="title">{{ $t('view.sso.user.authority') }}</h5>
      </div>
      <div class="content-body">
        <div class="table-group">
          <table class="table line">
            <thead>
              <tr>
                <th width="23%">{{ $t('view.sso.user.company') }}</th>
                <th width="23%">{{ $t('view.sso.user.department') }}</th>
                <th width="23%">{{ $t('view.sso.user.workspace') }}</th>
                <th width="23%">{{ $t('view.sso.user.authority') }}</th>
                <th width="8%"></th>
              </tr>
            </thead>
            <tbody>
              <tr :class="{disabled: showLoading}">
                <td width="23%"> {{companyName}} </td>
                <td width="23%"> {{groupName}} </td>
                <td width="23%">
                  <b-overlay :show="showLoading" no-fade class="overlay-form">
                    <b-form-select v-model="selected.scopeTargetId" :options="workOptions"></b-form-select>
                  </b-overlay>
                </td>
                <td width="23%">
                  <b-overlay :show="showLoading" no-fade class="overlay-form">
                    <b-form-select v-model="selected.roleId" :options="roleOptions"></b-form-select>
                  </b-overlay>
                </td>
                <td width="8%" class="add-remove">
                  <div class="btn-add ico-plus" alt="추가 아이콘" @click="push"></div>
                </td>
              </tr>
              <template v-for="(select, index) in selectes">
                <tr :key="index">
                  <td width="23%" class="value-content" :class="{disabled: isNull(workspace(select.scopeTargetId).companyName)}">{{isNullStr(workspace(select.scopeTargetId).companyName)}}</td> <!-- 워크스페이스 -->
                  <td width="23%" class="value-content" :class="{disabled: isNull(workspace(select.scopeTargetId).companyName)}">{{workspace(select.scopeTargetId).groupName}}</td> <!-- 워크스페이스 -->
                  <td width="23%" class="value-content" :class="{disabled: isNull(workspace(select.scopeTargetId).companyName)}">{{workspace(select.scopeTargetId).workspaceName}}</td> <!-- 워크스페이스 -->
                  <td width="23%" class="value-content" :class="{disabled: isNull(workspace(select.scopeTargetId).companyName)}">{{role(select.roleId).name}}</td> <!-- 권한 -->
                  <td  width="8%" class="add-remove" :class="{disabled: isNull(workspace(select.scopeTargetId).companyName)}">
                    <div class="btn-remove ico-minus" alt="빼기 아이콘" @click="splice(index)"></div>
                  </td>
                </tr>
              </template>
              <template v-if="selectes.length == 0">
                <tr><td colspan="5" class="value-content red-text text-center" variant="primary">{{ $t('view.sso.alert.title.oneMorePermissions') }}</td></tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { find, forEach } from 'lodash';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { utils } from '@/common';

interface IUserRoles {
  roleId?: number;
  scopeTargetId?: number;
}

@Component({})
export default class WorkRoleSelectBox extends Vue {
  @Prop()
  value!: IUserRoles[];

  @Prop()
  companyId!: string;

  @Prop() groupName!: string;
  @Prop() companyName!: string;

  @Watch('companyId')
  onCompanyId() {
    this.init();
  }

  workspaceAlls: any = [];
  workspaces: any = [];
  roles: any = [];

  workOptionsCopy: any = [];
  workOptions: any = []; // 원본 리스트
  roleOptions: any = []; // 원본 리스트

  selected: IUserRoles = {
    scopeTargetId: 0,
    roleId: 0,
  }; // 현제 선택 아이탬
  selectes: Array<IUserRoles> = []; // 추가된 아이탬

  showLoading: boolean = true;

  async created() {
    this.roles = (await this.$store.dispatch('roleManage/getRoles', {})).data.content; // 권한 데이터 가져오기
    forEach(this.roles, (role) => {
      this.roleOptions.push({
        value: role.id,
        text: role.name,
      });
    });

    this.init();
  }

  async init() {
    this.showLoading = true;
    this.workspaces = [];
    this.workOptions = [];

    const data: any = {};
    // 회사 아이디로 검색
    if(this.companyId != null) {
      data.search = `companyId:${this.companyId}`;
    }
    data.size = 50;

    this.workspaces = (await this.$store.dispatch('workspaceManage/getWorkspaces', data)).data.content; // 워크스페이스 데이터 가져오기
    this.workspaceAlls = (await this.$store.dispatch('workspaceManage/getWorkspaces', {size:50})).data.content; // 다른 회사의 워크스페이스의 데이터도 가져오기
    
    forEach(this.workspaces, (work, index: number) => {
      this.workOptions.push({
        value: work.id,
        text: work.workspaceName,
        companyName: work.companyName,
      });
    });

    // options 가 처음 세팅하고나서 companyName 로 한번 걸러내기 위하여 호출
    //this.onCompanyName(this.companyName, '');

    // 자동 선택
    this.selected.scopeTargetId = this.workOptions[0].value;

    // 자동 선택
    this.selected.roleId = this.roleOptions[0].value;

    setTimeout(() => {
      if(this.value != undefined)
        this.selectes = this.value.slice();
    }, 100);
    this.showLoading = false;
  }

  workspace(id: number) {
    const workspace = find(this.workspaceAlls, (workspace: any) => {
      if(workspace.id === id)  {
        return true;
      }
    })

    return workspace != null ? workspace : { workspaceName : ''};
  }

  role(id: number) {
    return find(this.roles, (role: any) => {
      if(role.id === id)  {
        return true;
      }
    });
  }

  push() {
    if(!this.showLoading) {
      if(!this.validation(this.selectes, this.selected)) { // 같은게 없을때만 푸시
        this.selectes.push({...this.selected});
      } else {
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.warning').toString(), this.$t('view.sso.alert.same').toString(), 'warning');
      }

      this.vModel();
    }
  }

  splice(index: number) {
    this.selectes.splice(index, 1);

    this.vModel();
  }

  // 똑같은게 있는지 검증
  validation(items: any, obj: any) {
    let bool = false;
    forEach(items, (item, index) => {
      if(JSON.stringify(item) == JSON.stringify(obj)) {
        bool = true;
      }
    });
    return bool;
  }
  vModel() {
    const reulst: any = [];
    forEach(this.selectes, (selecte: IUserRoles) => {
      reulst.push({
        scopeTargetType: 'workspace',
        ...selecte,
      });
    });

    this.$emit('input', reulst);
  }

  isNull(str: string) {
    return str == null || str == '';
  }

  isNullStr(str: string) {
    return str == null || str == '' ? this.$t('view.sso.alert.deletedWorkspace').toString() : str;
  }
}
</script>