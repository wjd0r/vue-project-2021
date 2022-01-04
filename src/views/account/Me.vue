<template>
  <!-- 계정 정보 -->
  <div class="sso-common-component user-component">
    <div class="sso-common-content user-content">
      <div class="container user">
        <div class="content-header">
          <h3 class="title">{{ $t('view.sso.account.account') }}</h3>
        </div>
        <div class="content-body">
          <div class="profil-component">
            <div class="profil-content">
              <div class="content-header">
                <h4 class="title">{{ $t('view.sso.account.profile') }}</h4>
              </div>
              <div class="content-body">
                <div class="form-content">
                  <div class="inf">
                    <div class="title">{{ $t('view.sso.account.name') }}</div>
                    <div class="inf-text">{{myInfo.fullname}}</div>
                  </div>
                  <div class="inf">
                    <div class="title">{{ $t('view.sso.account.email') }}</div>
                    <div class="inf-text">{{myInfo.email}}</div>
                  </div>
                  <div class="inf">
                    <div class="title">{{ $t('view.sso.account.employee') }}</div>
                    <div class="inf-text">{{myInfo.employeeNumber}}</div>
                  </div>
                  <div class="inf">
                    <div class="title">{{ $t('view.sso.account.registration') }}</div>
                    <div class="inf-text">{{format(myInfo.createdOn)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modify-component">
            <div class="modify-content">
              <div class="content-header">
                <h4 class="title">{{ $t('view.sso.account.accountInformation') }}</h4>
              </div>
              <div class="content-body">
                <b-form class="form-content" @submit.prevent="meUpdate">
                  <b-form-group :label="$t('view.sso.account.company')" :label-cols="3" desc="회사">
                    <b-form-input type="text" :placeholder="$t('view.sso.account.company')" v-model="form.companyName" maxlength="100" disabled />
                  </b-form-group>
                  <b-form-group :label="$t('view.sso.account.department')" :label-cols="3" desc="부서">
                    <b-form-input type="text" :placeholder="$t('view.sso.account.department')" v-model="form.groupName" maxlength="100" disabled />
                  </b-form-group>

                  <validate-input type="text" :label-cols="3" mode="modify" :essential="false" :isGroup="true" desc="직급"
                    v-model="form.position" :label="$t('view.sso.account.rank')" :placeholder="$t('view.sso.account.rank')"
                    :permit-string="true" :permit-en="true" :permit-number="true" :permit-special="true" minlength="0" maxlength="100" />

                  <validate-input type="tel" :label-cols="3" mode="modify" :essential="false" :isGroup="true" desc="연락처"
                    v-model="form.contactNumber" :label="$t('view.sso.account.contact')" :placeholder="$t('view.sso.account.contact')"
                    regexp="contact" minlength="0" maxlength="50" />

                  <div class="content-header">
                    <h5 class="title">{{$t('view.sso.account.editPassword')}}</h5>
                  </div>

                  <b-form-group :label="$t('view.sso.account.newPassword')" :label-cols="3" :invalid-feedback="$t('view.sso.label.passwordValidate')" desc="신규 비밀번호">
                    <b-form-input type="password" :placeholder="$t('view.sso.account.newPassword')" v-model="form.rawPassword" :state="passwordState(form.rawPassword)" :required="form.rawPassword !== '' || confirmPassword !== ''" maxlength="16" />
                  </b-form-group>
                  <b-form-group :label="$t('view.sso.account.verifyNewPassword')" :label-cols="3" desc="신규 비밀번호 확인">
                    <b-form-input type="password" :placeholder="$t('view.sso.account.verifyNewPassword')" v-model="confirmPassword" :state="confirmPwState" :required="form.rawPassword !== '' || confirmPassword !== ''" maxlength="16" />
                  </b-form-group>

                  <div class="content-footer">
                    <div class="btn-group">
                      <b-button type="submit" variant="primary" :class="{ 'd-none': isMobileBlock() }">{{ $t('view.sso.account.save') }}</b-button>
                      <b-button type="button" @click="$router.go(-1)" :class="{ 'd-none': isMobileBlock() }">{{ $t('view.sso.account.cancel') }}</b-button>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
          <div class="usage-status-component">
            <div class="usage-status-content">
              <div class="content-header">
                <h4 class="title">{{ $t('view.sso.account.workspace') }}</h4>
              </div>
              <div class="content-body">
                <div class="list-content row">
                  <!-- <div class="nodata-text">목록이 없습니다.</div> -->
                  <template v-for="(workspace, index) in myInfo.workspaces">
                    <div class="col-3 col-content" :key="index">
                      <div class="card usage-status">
                        <div class="content-header">
                          <h5 class="title">{{workspace.name}}</h5>
                        </div>
                        <div class="content-body">
                          <div class="datasource-status status">
                            <div class="title">{{ $t('view.sso.account.numberOfDataSources') }}</div>
                            <div class="count-text">
                              <h4 class="count">{{workspace.dataSourceInfoCount}}</h4>
                            </div>
                          </div>
                          <div class="event-status status">
                            <div class="title">{{ $t('view.sso.account.numberOfEventLogs') }}</div>
                            <div class="count-text">
                              <h4 class="count">{{workspace.eventRepositoryCount}}</h4>
                            </div>
                          </div>
                          <div class="standard-status status">
                            <div class="title">{{ $t('view.sso.account.standardNumberOfProcesses') }}</div>
                            <div class="count-text">
                              <h4 class="count">{{workspace.processModelCount}}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 계정 정보 -->
</template>

<style lang="scss" scoped>
.form-group {
  margin: 0px;
  input.is-invalid {
    margin-bottom: 0px;
  }

  .invalid-feedback {
    margin-top: calc(0.5px);
    margin-bottom: calc(0.5px);
  }

  .d-block {
    line-height: 22px;

    h3 {
      margin-bottom: 20px !important;
    }
  }
}
</style>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';

import _, { forEach } from 'lodash';
import { IKeyValueObject } from '@/interface';
import workspace from '@/store/sso/workspace';

import { UtilsMixin } from '@/mixin';
import { AxiosResponse } from 'axios';
import moment from 'moment';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    ValidateInput,
  },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
  }),
})
export default class MeUpdate extends Mixins(UtilsMixin) {
  myInfo!: IKeyValueObject;
  projectId!: string;

  form = {
    id: '',
    companyName: '',
    groupName: '',
    position: '',
    contactNumber: '',
    password: '',
    rawPassword: '',
    username: '',
  };

  count = {
    resouceGroup: '0',
    dataset: '0/0',
    repository: '0/0',
    process: '0/0',
  };

  groupKey: string = '';

  confirmPassword: string = '';

  showModal: boolean = false;
  isError: boolean = false;

  workspaces: any;

  user: any = null;

  passwordCheck: boolean = false;
  passwordCheckLoading: boolean = false;

  onPasswordCheck() {
    this.passwordCheckLoading = true;
    setTimeout(() => {
      this.passwordCheck = Boolean(Math.floor(Math.random() * 2));
      this.passwordCheckLoading = false;
    },2000);
  }

  created() {
    this.getMyInfo();
  }

  async getMyInfo() {

    // 아이디 id
    // 회사 companyName
    // 부서 groupName
    // 직급 position
    // 연락처 contactNumber

    // 워크스페이스 네임? workspaces[0].name

    // workspaces[0].iprResourceGroupId:"ipg20210927043414" << 이걸로 한번더 조회

    //const me = await this.$store.dispatch('sso/getMyInfo');

    

    this.form = {
      id: this.myInfo.id,
      companyName: this.myInfo.companyName,
      groupName: this.myInfo.groupName,
      position: this.myInfo.position,
      contactNumber: this.myInfo.contactNumber,
      password: '',
      rawPassword: '',
      username: this.myInfo.username,
    };
    
    forEach(this.myInfo.workspaces, async (workspace, index) => {
      this.$store.dispatch('repository/getRepoProjectGroupView', {
        ipg: workspace.iprResourceGroupId,
        ipr: this.myInfo.iprProjectId,
      }).then((res: any) => {
        if(res != null && res != undefined && res.resourceStatistics != undefined) {
          const { dataSourceInfoCount, datasetCount, etcCount, eventRepositoryCount, processModelCount, resourceGroupCount } = res.resourceStatistics;
          this.$set(this.myInfo.workspaces, index, {
            ...this.myInfo.workspaces[index],
            dataSourceInfoCount: dataSourceInfoCount,
            datasetCount: datasetCount,
            etcCount: etcCount,
            eventRepositoryCount: eventRepositoryCount,
            processModelCount: processModelCount,
            resourceGroupCount: resourceGroupCount,
          });
        }
      });
    })
  }

  get meUpdateForm() {
    return {
      id: Number(this.user.id),
      companyId: Number(this.user.companyId),
      groupId: Number(this.user.groupId),
      employeeNumber: this.user.employeeNumber,
      fullname: this.user.fullname,
      position: this.form.position,
      contactNumber: this.form.contactNumber,
      email: this.user.email,
      password: this.form.rawPassword != null && this.form.rawPassword != '' ? this.form.rawPassword : this.form.password,
      username: this.user.username,
      isDelete: this.user.isDeleted,
      userRoles: this.user.userRoles,
    }
  }

  async meUpdate() {
    if ( (this.form.password == '' && this.form.rawPassword == '' && this.confirmPassword == '') || // 조건1 비밀번호들이 모두 비어 있으면 저장
      (this.passwordCheck && this.passwordState(this.form.rawPassword) && this.confirmPwState) ) { // 조건2 기존 비밀번호 검증 && 비밀번호 규칙 검증 && 신규비밀번호 == 신규 비밀번호 확인
        this.$store
          .dispatch('userManage/putUser', {...this.meUpdateForm})
          .then((res) => {
            utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.saveComplete').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete');
          })
          .catch((err) => {
            const header = err.response.headers;
            let errorMessage;
            if (header['x-ioc-code'] !== undefined && this.$te('view.sso.alert.' + header['x-ioc-code'])) errorMessage = this.$t('view.sso.alert.' + header['x-ioc-code']).toString();
            else errorMessage = this.$t('view.sso.alert.saveFail').toString();
            utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.saveFail').toString(), errorMessage, 'error');
          });
    } else {
      if (!this.passwordCheck) {
        await utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.$t('view.sso.alert.passwordConfirm').toString(), 'warning');
        return
      }

      if (this.form.password == '') {
        await utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.$t('view.sso.alert.oldPasswordConfirm').toString(), 'warning');
        return
      }

      if ( this.form.rawPassword != '' || !this.passwordState(this.form.rawPassword) || !this.confirmPwState ) {
        await utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.$t('view.sso.alert.newPasswordConfirm').toString(), 'warning');
        return
      }
    }
  }

  requestChangeGroup() {
    this.$store
      .dispatch('sso/requestChangeGroup', { id: this.form.id, groupKey: this.groupKey })
      .then((res) => {
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.requestComplete').toString(), this.$t('view.sso.alert.requestModifyComplete').toString());
      })
      .catch((res) => {
        utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.requestFail').toString(), this.$t('view.sso.alert.requestModiyFail').toString());
      });
  }

  goLogin() {
    if (this.isError) {
      this.showModal = false;
    } else {
      this.$router.push('/');
    }
  }

  passwordState(password: string) {
    const regEx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!password) {
      return null;
    } else if (!regEx.test(password)) {
      return false;
    } else {
      return true;
    }
  }

  get confirmPwState() {
    if (!this.form.rawPassword && !this.confirmPassword) {
      return null;
    } else if (!this.form.rawPassword && this.confirmPassword) {
      return false;
    } else if (this.form.rawPassword !== this.confirmPassword || !this.passwordState(this.form.rawPassword)) {
      return false;
    } else {
      return true;
    }
  }

  processFormater() {
    return utils.percentFormatter(this.myInfo.usedStorage, this.myInfo.storageSize);
  }

  bytesFormatter(bytes: number) {
    return utils.bytesFormatter(bytes);
  }

  getAttribute(attribute: string, type: string) {
    const { workspace_maximum_limit } = JSON.parse(attribute);
    const { event, dataset, datasetRow } = workspace_maximum_limit;

    switch (type) {
      case 'event': {
        return event;
      }
      case 'dataset': {
        return dataset;
      }
      case 'datasetRow': {
        return datasetRow;
      }
    }
  }

  format(test: string) {
    return moment(test).format('YYYY-MM-DD');
  }
}
</script>
