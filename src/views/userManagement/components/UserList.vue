<template>
  <div class="content-body">
    <div class="table-group">
      <table class="table line">
        <thead>
          <tr>
            <th width="20%">{{ $t('view.sso.workspace.workerID') }}</th>
            <th width="40%">{{ $t('view.sso.workspace.workerName') }}</th>
            <th width="20%">{{ $t('view.sso.label.role') }}</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="value != undefined && value.length === 0">
            <tr>
              <td width="100%" class="value-content">{{ $t('view.sso.alert.noRegisteredMembers') }}</td>
            </tr>
          </template>
          <template v-for="(userRole, index) in value">
            <tr :key="index">
              <td width="20%" class="value-content">{{employeeNumber(userRole.userId)}}</td>
              <td width="40%" class="value-content">{{fullname(userRole.userId)}}</td>
              <td width="20%" class="value-content"><RoleSelectBox v-model="userRole.roleId" :state="state" :gray="cnt == 1"/></td>
              <td  width="20%" class="add-remove">
                <div class="btn-remove ico-minus" alt="빼기 아이콘" @click="onClick(index)"></div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { find } from 'lodash';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import RoleSelectBox from './RoleSelectBox.vue'

interface IUserRole {
  userId: number;
  roleId: number;
}

interface IUser {
  id: number;
  companyName: string;
  groupName: string;
  employeeNumber: string;
  position: string;
  fullname: string;
  email: string;
  contactNumber: string;
  createdOn: string;
  isDeleted: false;
  roleName: string;
}

@Component({
  components: {
    RoleSelectBox,
  },
})
export default class UserList extends Vue {
  @Prop()
  value!: IUserRole[];

  @Prop()
  state!: boolean;

  users: IUser[] = [];

  cnt: number = 0;

  async created() {
    this.users = (await this.$store.dispatch('userManage/getUsers', {size: 100})).data.content;
  }

  @Watch('value')
  onValue() {
    this.cnt++;
  }

  user(userId: number) {
    return find(this.users, (user: IUser) => {
      if(user.id === userId)  {
        return true;
      }
    });
  }

  employeeNumber(userId: number) {
    return this.user(userId) != undefined && this.user(userId).employeeNumber != undefined ? this.user(userId).employeeNumber : '-';
  }

  fullname(userId: number) {
    return this.user(userId) != undefined && this.user(userId).fullname != undefined ? this.user(userId).fullname : '-';
  }

  onClick(index: number) {
    const content: IUserRole[] = this.value;
    content.splice(index, 1);
    this.$emit('input', content);
  }
}
</script>