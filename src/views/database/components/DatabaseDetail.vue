<template>
  <ValidationObserver ref="form" tag="form">
    <!-- 정보 -->
    <div class="detail-component">
      <div class="detail-content">
        <div class="content-header">
          <h4 class="title" desc="데이터 소스 정보">{{ $t(`view.repo.datasource.title.${formTitle}`) }}</h4>
          <div v-if="!isNotEdit" class="right-align">
            <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
          </div>
        </div>
        <div class="content-body">
          <!-- desktop layout -->
          <div class="connection-content m-none">
            <div class="row row-content">
              <!-- card -->
              <div class="col-3" v-show="mode === 'create' || (mode !== 'create' && databaseProvider === 'oracle')" @click="onClickOracle">
                <div class="card db" :class="{ active: databaseProvider == 'oracle' }">
                  <div class="ico-db logo-oracle" alt="oracle 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.oracle') }}</h6>
                    <!-- <div class="sub-title">연결</div> -->
                  </div>
                </div>
              </div>
              <!-- card -->
              <!-- card -->
              <div class="col-3" v-show="mode === 'create' || (mode !== 'create' && databaseProvider === 'mssql')" @click="onClickMssql">
                <div class="card db" :class="{ active: databaseProvider == 'mssql' }">
                  <div class="ico-db logo-microsoftsql" alt="MSSQL 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.mssql') }}</h6>
                    <!-- <div class="sub-title">연결</div> -->
                  </div>
                </div>
              </div>
              <!-- card -->
              <!-- card -->
              <div class="col-3" v-show="mode === 'create' || (mode !== 'create' && databaseProvider === 'mysql')" @click="onClickMysql">
                <div class="card db" :class="{ active: databaseProvider == 'mysql' }">
                  <div class="ico-db logo-mysql" alt="mysql 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.mysql') }}</h6>
                    <!-- <div class="sub-title">연결</div> -->
                  </div>
                </div>
              </div>
              <!-- card -->
              <!-- card -->
              <div class="col-3" v-show="mode === 'create' || (mode !== 'create' && databaseProvider === 'mariadb')" @click="onClickMaria">
                <div class="card db" :class="{ active: databaseProvider == 'mariadb' }">
                  <div class="ico-db logo-maria" alt="maria 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.mariadb') }}</h6>
                    <!-- <div class="sub-title">연결</div> -->
                  </div>
                </div>
              </div>
              <!-- card -->

              <!-- card -->
              <div class="col-3" v-show="mode === 'create' || (mode !== 'create' && databaseProvider === 'postgresql')" @click="onClickPostgres">
                <div class="card db" :class="{ active: databaseProvider == 'postgresql' }">
                  <div class="ico-db logo-postgresql" alt="postgresql 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.postgres') }}</h6>
                    <!-- <div class="sub-title">연결</div> -->
                  </div>
                </div>
              </div>
              <!-- card -->
            </div>
          </div>
          <!-- dekstop layout -->
          <!-- 모바일 -->
          <div class="connection-content m-database">
            <b-dropdown id="mobileDatabase" :text="`${$t('view.repo.form.selectedDB')}: ${$t(`view.repo.datasource.type.${databaseProvider === '' ? 'oracle' : databaseProvider}`)}`" :disabled="mode == 'infoedit' || mode == 'edit' ? true : false">
              <b-dropdown-item>
                <div class="card db" @click="onClickOracle" id="oracleCard" :class="{ active: databaseProvider == 'oracle' }">
                  <div class="ico-db logo-oracle" alt="oracle 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.oracle') }}</h6>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item>
                <div class="card db" @click="onClickMssql" id="msSqlCard" :class="{ active: databaseProvider == 'mssql' }">
                  <div class="ico-db logo-microsoftsql" alt="MSSQL 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.mssql') }}</h6>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item>
                <div class="card db" @click="onClickMysql" id="mySqlCard" :class="{ active: databaseProvider == 'mysql' }">
                  <div class="ico-db logo-mysql" alt="mysql 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.mysql') }}</h6>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item>
                <div class="card db" @click="onClickMaria" id="mariaDbCard" :class="{ active: databaseProvider == 'mariadb' }">
                  <div class="ico-db logo-maria" alt="maria db 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.mariadb') }}</h6>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item>
                <div class="card db" @click="onClickPostgres" id="postGreSqlCard" :class="{ active: databaseProvider == 'postgresql' }">
                  <div class="ico-db logo-postgresql" alt="postgresql 로고"></div>
                  <div class="text-content">
                    <h6 class="title">{{ $t('view.repo.datasource.type.postgres') }}</h6>
                  </div>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <!-- 모바일 -->
          <!-- form -->
          <div class="form-content">
            <!-- databaseName -->
            <b-form-group id="databaseName" :label="getRequired($t('view.repo.form.dataSourceName'), true)" label-cols="3" desc="Database name">
              <b-form-input :value="databaseName" @input.native="databaseName = $event.target.value.trim()" :disabled="isNotEdit" :state="isNotEdit ? null : nameState.state && checkisDuplicateName" autofocus required autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putDataSourceName')" maxLength="255"></b-form-input>
              <template v-if="!isNotEdit">
                <b-form-invalid-feedback v-if="!nameState.state" :state="false">{{ nameState.feedback }}</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="nameState.state && !checkisDuplicateName" :state="false">{{ $t('view.repo.datasource.validation.duplicateName') }}</b-form-invalid-feedback>
              </template>
            </b-form-group>
            <!-- databaseName -->

            <!-- databaseHost -->
            <div class="d-flex-row">
              <b-form-group id="databaseHost" :label="getRequired($t('view.repo.form.host'), true)" label-cols="3" desc="Host">
                <b-form-input v-model="databaseHost" :disabled="!isModeCreate" :state="!isModeCreate ? null : databaseHost !== ''" required @change="inputChanges" autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putHostName')" maxLength="255"></b-form-input>
              </b-form-group>
              <!-- databaseHost -->
              <!-- databasePort -->
              <b-form-group id="databasePort" :label="getRequired($t('view.repo.form.port'), true)" label-cols="3" desc="Port">
                <b-form-input type="number" class="no-spin" v-model.number="databasePort" number :disabled="!isModeCreate" :state="!isModeCreate ? null : databasePort.toString().length > 0 && !checkisNumber" @change="inputChanges" autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putPort')" no-wheel></b-form-input>
                <b-form-invalid-feedback v-if="isModeCreate && databasePort.toString().length > 0 && checkisNumber == true" :state="false">{{ $t('view.repo.datasource.validation.onlyNumber') }}</b-form-invalid-feedback>
              </b-form-group>
              <!-- databasePort -->
            </div>
            <!-- databaseHost & databasePort -->
            <!-- databaseRole -->
            <b-form-group id="databaseRole" :label="getRequired($t('view.repo.form.role'), true)" label-cols="3" desc="Role" v-show="isShowField(['oracle'])">
              <b-form-select v-model="databaseRole" :disabled="!isModeCreate" @change="inputChanges">
                <b-form-select-option value="sysdba">SYSDBA</b-form-select-option>
                <b-form-select-option value="sysoper">SYSOPER</b-form-select-option>
                <b-form-select-option value="normal">Normal</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <!-- databaseRole -->
            <!-- databaseUsername -->
            <b-form-group id="databaseUsername" :label="getRequired($t('view.repo.form.username'), true)" label-cols="3" desc="username">
              <b-form-input v-model="databaseUsername" :disabled="isNotEdit" :state="isNotEdit ? null : databaseUsername !== ''" required @change="inputChanges" autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putUsername')" maxLength="255"></b-form-input>
            </b-form-group>
            <!-- databaseUsername -->
            <!-- databasePassword -->
            <b-form-group id="databasePassword" :label="getRequired($t('view.repo.form.password'), true)" label-cols="3" desc="password">
              <b-form-input type="password" v-model="databasePassword" :disabled="isNotEdit" :state="isNotEdit ? null : databasePassword !== ''" required @change="inputChanges" autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putPassword')" maxLength="255"></b-form-input>
            </b-form-group>
            <!-- databasePassword -->
            <!-- databaseConnection -->
            <b-form-group id="databaseConnection" :label="getRequired($t('view.repo.form.connection'), true)" label-cols="3" desc="connection" v-show="isShowField(['oracle'])">
              <b-form-select :disabled="!isModeCreate" v-model="databaseConnection" @change="inputChanges">
                <b-form-select-option value="service name">Service Name</b-form-select-option>
                <b-form-select-option value="sid">SID</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <!-- databaseConnection -->
            <!-- databaseDatabase -->
            <b-form-group id="databaseDatabase" :label="getRequired($t('view.repo.form.database'), true)" label-cols="3" desc="database">
              <b-form-input v-model="databaseDatabase" :disabled="!isModeCreate" :state="!isModeCreate ? null : databaseDatabase !== ''" required autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putDatabase')" maxLength="255"></b-form-input>
            </b-form-group>
            <!-- databaseDatabase -->
            <!-- databaseSchema -->
            <b-form-group id="databaseSchema" :label="getRequired($t('view.repo.form.schema'), true)" label-cols="3" desc="schema" v-show="isShowField(['postgresql'])">
              <b-form-input v-model="databaseSchema" :disabled="!isModeCreate" :state="!isModeCreate ? null : databaseSchema !== ''" required autocomplete="off" :placeholder="mode === 'default' ? '' : $t('view.repo.form.putSchema')" maxLength="255"></b-form-input>
            </b-form-group>
            <!-- databaseSchema -->

            <template v-if="!isNotEdit">
              <div class="btn-group d-flex">
                <div class="test-content">
                  <!-- 테스트 결과 -->
                  <template v-if="isShowTest === true">
                    <div class="test-success-content" v-if="isTestingSuccess === true">
                      <div class="success-text">{{ $t('view.repo.datasource.validation.testSuccess') }}</div>
                    </div>
                    <div class="test-fail-content" v-else-if="isTestingSuccess === false">
                      <div class="fail-text">{{ $t('view.repo.datasource.validation.testFailed') }}</div>
                      <div class="fail-content">
                        <span>{{ testErrorMessage }}</span>
                      </div>
                    </div>
                  </template>
                </div>
                <!-- 테스트 결과 -->
                <div class="button-content">
                  <!-- test -->
                  <b-button :class="{ 'd-none': isMobileBlock() }" variant="primary" class="btn-primary btn-test right" @click.prevent="onClickTest()">
                    <b-spinner small v-if="loading.test === true" class="white"></b-spinner>
                    {{ $t('view.repo.button.test') }}
                  </b-button>
                  <!-- test -->
                </div>
              </div>
            </template>

            <!-- databaseTable -->
            <b-form-group id="databaseTable" :label="getRequired($t('view.repo.form.table'), true)" label-cols="3" desc="target table">
              <b-form-input v-if="!isModeCreate" v-model="databaseTable" :disabled="true"></b-form-input>
              <b-form-select v-else v-model="databaseTable" :disabled="!isTestingSuccess" :state="databaseTable === '' ? false : true" @change="onChangeTable" required>
                <b-form-select-option v-if="isTestingSuccess === false" value="" class="d-none">{{ $t('view.repo.datasource.validation.mustTest') }}</b-form-select-option>
                <b-form-select-option v-else value="" class="d-none">{{ $t('view.repo.form.selectTable') }}</b-form-select-option>
                <b-form-select-option v-for="(item, index) in tableOptions" :key="index" :value="item.ename">{{ item.ename }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <!-- databaseTable -->
          </div>
          <!-- form -->

          <template v-if="!isNotEdit">
            <div class="test-content">
              <!-- 테스트 결과 -->
              <div class="test-fail-content" v-if="isTableTestSucess === false">
                <div class="fail-text">{{ $t('view.repo.datasource.validation.testFailed') }}</div>
                <div class="fail-content">
                  <span>{{ testErrorMessage }}</span>
                </div>
              </div>
            </div>
          </template>

          <template v-if="mode !== 'default'">
            <!-- synchronization form -->
            <b-overlay class="form-content sync-content" bg-color="#f2f2f2" opacity="1" no-fade>
              <div class="content-header">
                <h5 class="title">{{ $t('view.repo.form.syncTitle') }}</h5>
              </div>

              <!-- syncToggle -->
              <b-form-group id="syncToggle" :label="$t('view.repo.form.syncToggle')" label-cols="3" desc="synchronization toggle">
                <b-form-checkbox id="syncToggleVal" v-model="syncEnabled" switch :disabled="!isDBTestSucess() || isNotEdit"></b-form-checkbox>
              </b-form-group>
              <!-- syncToggle -->
              <!-- syncRule -->
              <b-form-group id="syncRule" :label="$t('view.repo.form.syncRule')" label-cols="3" desc="synchronization rule">
                <b-form-select v-model="syncRule" :disabled="true">
                  <b-form-select-option value="APPEND_ONLY">{{ $t('view.repo.form.syncRuleOptions.append_only') }}</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <!-- syncRule -->
              <!-- syncTable -->
              <b-form-group v-if="!isModeCreate" :label="$t('view.repo.form.syncTable')" label-cols="3" desc="target table">
                <b-form-input v-model="databaseTable" :disabled="true"></b-form-input>
              </b-form-group>
              <!-- syncTable -->
              <!-- databaseTablePk -->
              <b-form-group id="databaseTablePk" :label="$t('view.repo.form.tablePk')" label-cols="3" desc="sync column">
                <b-form-input v-if="mode === 'infoedit' || (mode === 'edit' && syncKey !== '')" v-model="syncKey" :disabled="true"></b-form-input>
                <b-form-select v-else v-model="syncKey" :state="syncEnabled ? (syncKey === '' ? false : true) : null" :disabled="!isDBTestSucess()">
                  <b-form-select-option v-show="false" value="">{{ $t('view.repo.form.selectField') }}</b-form-select-option>
                  <b-form-select-option v-for="(item, index) in columnOptions" :key="`pk-${index}`" :value="item.columnName">{{ item.columnName }}</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <!-- databaseTablePk -->
              <!-- syncSchedule -->
              <b-form-group id="syncSchedule" :label="$t('view.repo.form.syncSchedule')" label-cols="3" desc="synchronization schedule">
                <b-form-select v-model="syncSchedule" @change="syncDayList = []" :disabled="!isDBTestSucess() || isNotEdit">
                  <b-form-select-option value="daily">{{ $t('view.repo.form.syncScheduleOptions.daily') }}</b-form-select-option>
                  <b-form-select-option value="weekly">{{ $t('view.repo.form.syncScheduleOptions.weekly') }}</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <!-- syncSchedule -->
              <!-- syncDayList -->
              <template v-if="!isNotEdit || (mode === 'infoedit' && syncSchedule === 'weekly')">
                <b-form-group id="syncDayList" :label="$t('view.repo.form.syncDayList')" label-cols="3" desc="synchronization day list" required>
                  <b-form-checkbox-group id="syncDayChecklist" v-model="syncDayList" :disabled="!isDBTestSucess() || syncSchedule !== 'weekly' || mode === 'infoedit'">
                    <b-form-checkbox value="2">{{ $t('view.repo.form.days.mon') }}</b-form-checkbox>
                    <b-form-checkbox value="3">{{ $t('view.repo.form.days.tue') }}</b-form-checkbox>
                    <b-form-checkbox value="4">{{ $t('view.repo.form.days.wed') }}</b-form-checkbox>
                    <b-form-checkbox value="5">{{ $t('view.repo.form.days.thu') }}</b-form-checkbox>
                    <b-form-checkbox value="6">{{ $t('view.repo.form.days.fri') }}</b-form-checkbox>
                    <b-form-checkbox value="7">{{ $t('view.repo.form.days.sat') }}</b-form-checkbox>
                    <b-form-checkbox value="1">{{ $t('view.repo.form.days.sun') }}</b-form-checkbox>
                  </b-form-checkbox-group>
                  <b-form-invalid-feedback v-if="!isNotEdit && syncEnabled && syncSchedule === 'weekly' && syncDayList.length === 0" :state="false">{{ this.$t('view.repo.alert.datasource.validation.syncDayListEmpty').toString() }}</b-form-invalid-feedback>
                </b-form-group>
              </template>
              <!-- syncDayList -->
              <!-- syncStartTime -->
              <b-form-group id="syncStartTime" :label="$t('view.repo.form.syncStartTime')" label-cols="3" desc="synchronization start time">
                <b-form-input v-if="mode === 'infoedit' && datasourceInfo.syncSchedule === ''" :disabled="true"></b-form-input>
                <b-form-select v-else v-model="syncStartTime" :disabled="!isDBTestSucess() || isNotEdit" :state="syncEnabled ? (syncStartTime === '' ? false : true) : null" required>
                  <b-form-select-option v-show="false" value="">{{ $t('view.repo.form.selectTime') }}</b-form-select-option>
                  <b-form-select-option v-for="(item, index) in generateHours" :key="index" :value="item.value">{{ item.text }}</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <!-- syncStartTime -->
            </b-overlay>
            <!-- synchronization form -->
          </template>
        </div>
        <div class="bottom-component content-footer">
          <div class="btn-group">
            <!-- create -->
            <b-button v-if="state === 'create'" :class="{ 'd-none': isMobileBlock() }" type="submit" variant="primary" class="btn-primary btn-modify" @click.prevent="onClickSave()">
              {{ $t('view.repo.button.create') }}
            </b-button>
            <!-- create -->
            <!-- show info -->
            <b-button v-if="state === 'infoedit'" :class="{ 'd-none': isMobileBlock() }" variant="primary" class="btn-primary btn-modify" @click="onClickInfoEdit()">{{ $t('view.repo.button.modify') }}</b-button>
            <!-- show info -->
            <!-- edit -->
            <b-button v-if="state === 'edit'" :class="{ 'd-none': isMobileBlock() }" variant="primary" type="submit" class="btn-primary btn-modify" @click.prevent="onClickEdit()">
              {{ $t('view.repo.button.modify') }}
            </b-button>
            <!-- edit -->
            <!-- delete -->
            <b-button v-if="state === 'infoedit'" :class="{ 'd-none': isMobileBlock() }" variant="secondary" class="btn-secondary btn-delete" @click="onClickDelete()">
              {{ $t('view.repo.button.delete') }}
            </b-button>
            <!-- delete -->
            <!-- cancel -->
            <b-button v-if="state !== 'default' && state !== 'infoedit'" :class="{ 'd-none': isMobileBlock() }" variant="secondary" class="btn-secondary btn-cancel" @click="onClickCancel()">{{ $t('view.repo.button.cancel') }}</b-button>
            <!-- cancel -->
            <!-- close -->
            <b-button variant="primary" class="btn-secondary btn-close m-btn" @click="onClickClose()">{{ $t('view.repo.button.close') }}</b-button>
            <!-- close -->
          </div>
        </div>
      </div>
    </div>
    <!-- 정보 -->
  </ValidationObserver>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import VueI18n from 'vue-i18n';
import { utils, ValidationCheck } from '@/common';

import { UtilsMixin } from '@/mixin';

import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

@Component({
  components: {},
  computed: mapGetters({
    projectId: 'sso/getProjectId',
  }),
})
export default class DatabaseDetail extends Mixins(UtilsMixin) {
  /* Prop 선언 */
  @Prop({ default: () => ({}) })
  private datasourceLists!: any;

  @Prop({ default: () => ({}) })
  private datasourceInfo!: any;

  @Prop()
  private mode!: 'default' | 'create' | 'edit' | 'infoedit' | 'test' | 'mobile';

  @Prop({})
  private selectedWorkspace!: any;

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  projectId!: string;
  checkAuthority: boolean = true;
  formTitle: 'default' | 'create' | 'modify'; //'연결 속성 정보';

  isShowTest: boolean = false;

  databaseProvider: 'oracle' | 'mssql' | 'mysql' | 'mariadb' | 'postgresql' | '' = 'oracle';
  databaseName: string = '';
  databaseHost: string = '';
  databasePort: string = '';
  databaseRole: string = 'sysdba';
  databaseUsername: string = '';
  databasePassword: string = '';
  databaseConnection: string = 'sid';
  databaseDatabase: string = '';
  databaseSchema: string = '';
  databaseTable: string = '';
  datasourceId: string = '';
  datasourceProjectId: string = '';
  syncEnabled: boolean = false;
  syncRule: string = 'APPEND_ONLY';
  syncKey: string = '';
  syncSchedule: string = 'daily';
  syncDayList: [] = [];
  syncStartTime: string = '';

  isTestingSuccess: boolean = false;
  isTableTestSucess: boolean = null;

  state: string = '';

  testErrorMessage: string = '';
  tableOptions: any = [];
  columnOptions: any = [];
  syncToggleOptions: any = [{ value: 'sync', text: '' }];

  loading: {
    test: boolean;
    save: boolean;
    edit: boolean;
    delete: boolean;
    schedule: boolean;
  } = {
    test: false,
    save: false,
    edit: false,
    delete: false,
    schedule: false,
  };

  /* refs 선언 */

  /* Watch 선언 */
  @Watch('mode', { immediate: true })
  onStateChange(newValue: string, oldValue: string) {
    switch (newValue) {
      case 'default': {
        this.formTitle = 'default'; //'연결 속성 정보';
        this.setDefaultForm();
        break;
      }
      case 'create': {
        this.formTitle = 'create'; //'연결 속성 생성';
        this.setCreateForm();
        break;
      }
      case 'edit': {
        this.formTitle = 'modify'; //'연결 속성 수정';
        this.setEditForm();
        break;
      }
      case 'infoedit': {
        this.formTitle = 'default'; //'연결 속성 정보';
        this.state = 'infoedit';
        this.setInfo();
        break;
      }
      case 'mobile': {
        this.formTitle = 'default'; //'연결 속성 정보';
        this.setMobileForm();
        break;
      }
    }
  }

  @Watch('datasourceInfo', { immediate: true })
  onInfoChange(newValue: any, oldValue: any) {
    if (newValue != oldValue && this.mode == 'infoedit') {
      this.formTitle = 'default'; //'연결 속성 정보';
      this.state = 'infoedit';
      this.setInfo();
    }
  }

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  //  created(){

  //  }

  //  mounted() {
  //  }

  /* 메소드 선언 */
  async onClickTest() {
    if (this.checkIsValid('test') == true) {
      // this.$emit('on-test', this.getInfo());
      //  this.showTestModal = true;
      const data = this.getInfo();
      const dispatch = data.provider == 'oracle' ? 'datasource/oracleTest' : data.provider == 'mssql' ? 'datasource/mssqlTest' : data.provider == 'mysql' ? 'datasource/mysqlTest' : data.provider == 'mariadb' ? 'datasource/mysqlTest' : 'datasource/postgresTest';

      this.loading.test = true; // 버튼 로딩

      // db conn test
      this.$store
        .dispatch(dispatch, data)
        .then((res) => {
          const tables = res.data.data.results;
          const index = _.find(tables, ['ename', this.databaseTable]);
          if (this.mode == 'edit' && (index === undefined || tables.length == 0)) {
            this.isTestingSuccess = false; // 연결 실패
            this.testErrorMessage = this.$t('view.repo.datasource.validation.tableNotFound').toString(); //'FATAL: Table not found';
          } else {
            this.tableOptions = _.sortBy(tables, (x) => x.ename);
            if (this.mode !== 'edit') this.databaseTable = '';
            this.isTestingSuccess = true; // 연결 성공
            this.testErrorMessage = '';
          }
          this.isShowTest = true;
        })
        .catch((err: AxiosError) => {
          if (err) {
            const header = err.response.headers;
            this.testErrorMessage = header['x-ioc-message'];
          }
          this.isShowTest = true;
          this.isTestingSuccess = false; // 연결 실패
          this.tableOptions = [];
          this.databaseTable = 'cantSelect';
        })
        .finally(() => {
          this.loading.test = false; // 버튼 로딩 완료
        });
    }
  }

  onClickDelete() {
    this.$emit('on-delete');
  }

  onClickEdit() {
    if (this.checkIsValid('edit') == true && this.isShowTest == true && this.isTestingSuccess == true) {
      this.$emit('on-edit', this.getInfo());
    }
  }

  onClickInfoEdit() {
    this.$emit('on-edit-info');
  }

  onClickSave() {
    if (this.checkIsValid('save') == true && this.isShowTest == true && this.isTestingSuccess == true) {
      this.$emit('on-save', this.getInfo());
    }
  }

  onClickCancel() {
    this.$emit('on-cancel');
  }

  onClickClose() {
    this.$emit('on-cancel');
  }

  setDefaultForm() {
    this.state = 'default';
    this.clearAll();
    this.databaseConnection = 'sid';
    this.databaseRole = 'sysdba';
    this.isTableTestSucess = null;
    this.testErrorMessage = '';
  }

  setCreateForm() {
    this.state = 'create';
    this.onClickOracle();
  }

  setEditForm() {
    this.state = 'edit';

    // to set info if the device / window resolution changes
    this.setInfo();
  }

  setMobileForm() {
    this.state = 'mobile';
  }

  setInfo() {
    if (this.datasourceInfo == null) return;
    this.clearAll();

    const datasourceView = this.datasourceInfo;

    this.datasourceId = this.state != 'create' ? datasourceView.id : '';
    this.datasourceProjectId = this.state != 'create' ? datasourceView.project.id : this.projectId;
    this.databaseName = datasourceView.name;
    this.databaseDatabase = datasourceView.database;
    this.databaseUsername = datasourceView.username;
    this.databasePassword = datasourceView.password;
    this.databaseHost = datasourceView.hostname;
    this.databasePort = datasourceView.port;
    this.databaseTable = this.state == 'create' ? this.databaseTable : datasourceView.entity;
    this.databaseProvider = datasourceView.provider;
    this.syncEnabled = datasourceView.syncEnabled;
    this.syncRule = datasourceView.syncMethod !== 'NONE' ? datasourceView.syncMethod : 'APPEND_ONLY';
    this.syncKey = datasourceView.syncKey;

    switch (datasourceView.provider) {
      case 'oracle': {
        this.databaseConnection = datasourceView.connection;
        this.databaseRole = datasourceView.role;
        this.databaseProvider = datasourceView.provider == null || datasourceView.provider == '' ? 'oracle' : datasourceView.provider;
        break;
      }
      case 'postgresql': {
        this.databaseSchema = datasourceView.schema;
        this.databaseProvider = datasourceView.provider == null || datasourceView.provider == '' ? 'postgresql' : datasourceView.provider;
        break;
      }
      case 'mariadb': {
        this.databaseProvider = datasourceView.provider == null || datasourceView.provider == '' ? 'mariadb' : datasourceView.provider;
        break;
      }
      case 'mysql': {
        this.databaseProvider = datasourceView.provider == null || datasourceView.provider == '' ? 'mysql' : datasourceView.provider;
        break;
      }
      default: {
        this.databaseProvider = datasourceView.provider == null || datasourceView.provider == '' ? 'mssql' : datasourceView.provider;
        break;
      }
    }

    this.isTestingSuccess = true;
    this.isTableTestSucess = true;

    if (!datasourceView.syncEnabled) {
      if (this.state === 'edit' && _.isEmpty(datasourceView?.syncKey)) {
        this.onChangeTable();
      }
    } else {
      this.isTestingSuccess = true;
      this.isTableTestSucess = true;
    }

    if (datasourceView.syncSchedule !== '') {
      const syncSchedule = datasourceView.syncSchedule.split(' ');
      this.syncStartTime = `${syncSchedule[1]} ${syncSchedule[2]}`;
      if (syncSchedule[5] === '*') {
        this.syncSchedule = 'daily';
      } else {
        this.syncSchedule = 'weekly';
        this.syncDayList = syncSchedule[5].split(',');
      }
    }
  }

  getInfo() {
    const datasourceView = this.state != 'create' ? this.datasourceInfo : null;

    const data: any = {
      id: this.state != 'create' ? datasourceView.id : '',
      db: this.getDBShort(this.databaseProvider),
      projectId: this.state != 'create' ? datasourceView.project.id : this.projectId,
      provider: this.databaseProvider,
      dataSourceName: this.databaseName,
      hostname: this.databaseHost,
      port: Number(this.databasePort),
      username: this.databaseUsername,
      password: this.databasePassword,
      database: this.databaseDatabase,
      entity: this.state == 'create' ? this.databaseTable : datasourceView.entity,
      schema: this.databaseSchema,
      role: this.databaseRole,
      connection: this.databaseConnection,
      resourceGroupId: this.state == 'create' ? null : datasourceView.resourceGroup.id,
      syncDatasetId: this.state !== 'create' ? datasourceView?.syncDataset?.id : undefined,
      syncEnabled: this.syncEnabled,
      syncMethod: this.syncRule,
      syncKey: this.syncKey,
      syncSchedule: '',
    };

    let isMakeSchedule = false;

    if (this.syncStartTime !== '') {
      if (this.syncSchedule === 'daily') {
        isMakeSchedule = true;
      } else if (this.syncSchedule === 'weekly') {
        if (this.syncDayList.length !== 0) {
          isMakeSchedule = true;
        }
      }
    }

    if (isMakeSchedule) {
      if (this.syncSchedule === 'daily') {
        data.syncSchedule = `0 ${this.syncStartTime} * * *`;
      } else {
        data.syncSchedule = `0 ${this.syncStartTime} * * `;
        for (const week of _.sortBy(this.syncDayList)) {
          data.syncSchedule += `${week},`;
        }
        data.syncSchedule = data.syncSchedule.slice(0, -1);
      }
    }

    return data;
  }

  onClickOracle() {
    if (this.state == 'default' || this.state == 'infoedit' || this.state == 'edit') return;
    this.clearAll();

    this.databaseProvider = 'oracle';

    this.databaseConnection = 'sid';
    this.databaseRole = 'sysdba';
  }

  onClickPostgres() {
    if (this.state == 'default' || this.state == 'infoedit' || this.state == 'edit') return;
    this.clearAll();

    this.databaseProvider = 'postgresql';
  }

  onClickMysql() {
    if (this.state == 'default' || this.state == 'infoedit' || this.state == 'edit') return;
    this.clearAll();

    this.databaseProvider = 'mysql';
  }

  onClickMaria() {
    if (this.state == 'default' || this.state == 'infoedit' || this.state == 'edit') return;
    this.clearAll();

    this.databaseProvider = 'mariadb';
  }

  onClickMssql() {
    if (this.state == 'default' || this.state == 'infoedit' || this.state == 'edit') return;
    this.clearAll();

    this.databaseProvider = 'mssql';
  }

  getDBShort(provider: string) {
    switch (provider) {
      case 'oracle': {
        return 'oracle';
      }
      case 'mssql': {
        return 'mssql';
      }
      case 'mysql':
      case 'mariadb': {
        return 'mysql';
      }
      case 'postgresql': {
        return 'psql';
      }
    }
  }

  clearAll() {
    this.databaseProvider = '';
    this.databaseName = '';
    this.databaseHost = '';
    this.databasePort = '';
    this.databaseUsername = '';
    this.databasePassword = '';
    this.databaseConnection = '';
    this.databaseRole = '';
    this.databaseDatabase = '';
    this.databaseSchema = '';
    this.databaseTable = '';
    this.isShowTest = false;
    this.isTestingSuccess = false;
    this.isTableTestSucess = null;
    this.syncEnabled = false;
    this.syncRule = 'APPEND_ONLY';
    this.syncKey = '';
    this.syncSchedule = 'daily';
    this.syncDayList = [];
    this.syncStartTime = '';
  }

  isShowField(types: string[]) {
    let isExist = false;
    for (const type of types) {
      if (this.databaseProvider === type) {
        isExist = true;
      }
    }
    return isExist;
  }

  get isModeCreate() {
    return this.mode === 'create';
  }

  get isNotEdit() {
    return this.mode !== 'create' && this.mode !== 'edit';
  }

  get isModeInfoEditEdit() {
    return this.mode === 'infoedit' || this.mode === 'edit';
  }

  get nameState() {
    return ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.databaseName);
  }

  get checkisDuplicateName() {
    const index = _.find(this.datasourceLists, ['name', this.databaseName]);
    if (this.datasourceLists.length == 0) return true;
    if (index === undefined) return true;
    else {
      if (this.mode === 'edit' || this.mode == 'test') {
        return this.databaseName == this.datasourceInfo.name ? true : false;
      }
      return true;
    }
  }

  get checkisNumber() {
    return !isNaN(Number(this.databasePort)) == false && (this.mode == 'create' || this.mode == 'edit' || this.mode == 'test') ? true : false;
  }

  onChangeTable() {
    const data = this.getInfo();

    const workspace = utils.getWorkspaceById(this.selectedWorkspace);

    if (workspace) {
      data.resourceGroupId = workspace.iprResourceGroupId;
    }

    this.isTableTestSucess = null;

    this.$store
      .dispatch('datasource/testTable', this.getInfo())
      .then((res: AxiosResponse) => {
        const results = res.data.data;
        this.columnOptions = results.fieldInfo;
        this.syncKey = '';
        this.testErrorMessage = '';
        this.isTableTestSucess = true;
      })
      .catch((err: AxiosError) => {
        if (err) {
          const header = err.response.headers;
          this.testErrorMessage = header['x-ioc-message'];
        }
        this.isTableTestSucess = false;
      });
  }

  inputChanges() {
    this.isTestingSuccess = false;
    this.isShowTest = false;
  }

  checkIsValid(source: string) {
    let flag: boolean = true;
    let emptyFlag: boolean = false;

    if (this.databaseName.trim() == '' || this.databasePort.toString() == '' || this.databaseHost == '' || this.databaseUsername == '' || this.databasePassword == '' || this.databaseDatabase == '') {
      flag = false;
      emptyFlag = true;
    }

    if (this.databaseProvider === 'postgresql' && this.databaseSchema == '') {
      flag = false;
      emptyFlag = true;
    }

    if (!this.nameState.state) {
      flag = false;
    } else if (!this.checkisDuplicateName) {
      flag = false;
    } else if (this.checkisNumber) {
      flag = false;
    } else if (source != 'test' && this.isShowTest == false && this.isTestingSuccess == false) {
      flag = false;
    } else if (this.databaseTable == '' && source == 'save') {
      flag = false;
    } else if (this.syncEnabled) {
      if (this.syncSchedule == 'weekly' && this.syncDayList.length == 0) {
        flag = false;
      } else if (this.syncStartTime == '') {
        flag = false;
      } else if (this.syncKey == '') {
        flag = false;
      }
    }

    if (flag == false) {
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.alarm').toString(), this.$t('view.repo.alert.datasource.validation.validationFailed').toString(), 'warning');
    }

    return flag;
  }

  isDBTestSucess() {
    return this.isTestingSuccess === true && this.isTableTestSucess === true && this.databaseTable !== '';
  }

  get generateHours() {
    const options = [];
    let hour = 0;
    let minute = 0;
    for (let i = 1; i <= 48; i++) {
      options.push({ text: (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute, value: minute + ' ' + hour });
      if (i % 2 == 0) {
        minute = 30;
      } else {
        hour++;
        minute = 0;
      }
    }
    return options;
  }

  getRequired(text: string | VueI18n, isRequired: boolean) {
    if (this.isNotEdit) {
      return text;
    } else {
      if (isRequired) {
        return `${text} (*)`;
      } else {
        return text;
      }
    }
  }
}
</script>