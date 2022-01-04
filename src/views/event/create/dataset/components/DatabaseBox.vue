<template>
<!-- 업로드 방식 : 데이터베이스 연결 -->
<div class="connection-component">
  <div class="connection-content">
    <div class="form-content">
      <b-form-group :label="$t('view.repo.form.dataSourceChoice')" label-cols="2" class="database-auto">
        <b-form-select v-model="selectedBoxDataSource" @change="onSelectedBoxDataSource">
          <b-select-option :value=0>{{ $t('view.repo.form.dataSourceImport') }}</b-select-option>
          <b-select-option :value=1>{{ $t('view.repo.form.write') }}</b-select-option>
        </b-form-select>
      </b-form-group>
    </div>

    <!-- 가져오기 -->
    <div class="auto-content" v-if="isselectedBoxDataSource(0)">
      <div class="list-content row row-content">
        <template v-if="isLoading">
          <b-spinner/>
        </template>
        <template v-else v-for="(item, index) in dataSource">
          <div class="col-3" :key="index" @click="onClickSelecteDataSource(item)">
            <div class="card card-created database" :class="{active: JSON.stringify(selectedDataSource) == JSON.stringify(item)}">
              <div class="content-header">
                <div class="ico-card ico-database" alt="데이터베이스 아이콘"></div>
                <h5 class="title">{{item.name}}</h5>
                <div class="right-align">
                  <div class="type-text">{{item.provider}}</div>
                </div>
              </div>
              <div class="content-footer">
                <div class="user-inf">{{ $t('view.repo.form.create') }} - {{item.createdByName}}</div>
                <div class="last-update">{{toFormat(item.created)}}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 가져오기 -->

    <!-- 직접 -->
    <div class="manual-content m-none" v-if="isselectedBoxDataSource(1)">
      <div class="row row-content">
        <div class="card db" @click="onSelecteJdbc('oracle')" :class="{active : isActive('oracle')}">
          <div class="ico-db logo-oracle" alt="oracle 로고"></div>
          <div class="text-content">
            <h6 class="title">Oracle</h6>
          </div>
        </div>

        <div class="card db" @click="onSelecteJdbc('mssql')" :class="{active : isActive('mssql')}">
          <div class="ico-db logo-microsoftsql" alt="MSSQL 로고"></div>
          <div class="text-content">
            <h6 class="title">MSSQL</h6>
          </div>
        </div>

        <div class="card db" @click="onSelecteJdbc('mysql')" :class="{active : isActive('mysql')}">
          <div class="ico-db logo-mysql" alt="mysql 로고"></div>
          <div class="text-content">
            <h6 class="title">MySQL</h6>
          </div>
        </div>

        <div class="card db" @click="onSelecteJdbc('mariadb')" :class="{active : isActive('mariadb')}">
          <div class="ico-db logo-maria" alt="maria db 로고"></div>
          <div class="text-content">
            <h6 class="title">MariaDB</h6>
          </div>
        </div>

        <div class="card db" @click="onSelecteJdbc('postgresql')" :class="{active : isActive('postgresql')}">
          <div class="ico-db logo-postgresql" alt="postgresql 로고"></div>
          <div class="text-content">
            <h6 class="title">PostgreSQL</h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 직접 -->

    <!-- 직접 : 모바일 -->
    <div class="manual-content m-database"  v-if="isselectedBoxDataSource(1)">
      <b-dropdown id="mobileDatabase" :text="`${$t('view.repo.form.databaseSelection')} : ${selectedJdbc}`">
        <b-dropdown-item>
          <div class="card db" @click="onSelecteJdbc('oracle')" :class="{active : isActive('oracle')}">
            <div class="ico-db logo-oracle" alt="oracle 로고"></div>
            <div class="text-content">
              <h6 class="title">Oracle</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="card db" @click="onSelecteJdbc('mssql')" :class="{active : isActive('mssql')}">
            <div class="ico-db logo-microsoftsql" alt="MSSQL 로고"></div>
            <div class="text-content">
              <h6 class="title">MSSQL</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="card db" @click="onSelecteJdbc('mysql')" :class="{active : isActive('mysql')}">
            <div class="ico-db logo-mysql" alt="mysql 로고"></div>
            <div class="text-content">
              <h6 class="title">MySQL</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="card db" @click="onSelecteJdbc('mariadb')" :class="{active : isActive('mariadb')}">
            <div class="ico-db logo-maria" alt="maria db 로고"></div>
            <div class="text-content">
              <h6 class="title">MariaDB</h6>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="card db" @click="onSelecteJdbc('postgresql')" :class="{active : isActive('postgresql')}">
            <div class="ico-db logo-postgresql" alt="postgresql 로고"></div>
            <div class="text-content">
              <h6 class="title">PostgreSQL</h6>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown> 
    </div>
    <!-- 직접 : 모바일 -->

    <!-- 직접 : form > oracle -->
    <div class="form-content row row-content" v-if="isActive('oracle')">
      <div class="col-12 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.dataSourceName" :label="$t('view.repo.form.dataSourceName')"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="3" maxlength="255" :duplicate-list="dataSource" duplicate-property="name"
          @output="(arg) => output.dataSourceName = arg || this.selectedBoxDataSource == 0"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.hostname" label="Host"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.hostname = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="number" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.port" label="Port"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.port = arg"
          @change="onChange"/>
      </div>
      
      <div class="col-6 col-content">
        <b-form-group label="Role (*)" label-cols="3" desc="Role" :invalid-feedback="state.role.feedback">
          <b-form-select v-model="jdbcInfo.role" @change="onChange" :state="state.role.state" autocomplete="off">
            <template #first>
              <b-select-option value="" disabled>{{ $t('view.repo.form.select') }}</b-select-option>
            </template>
            <template v-for="(item, index) in oracleRole">
              <b-form-select-option :value="item" :key="index">{{item}}</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </div>
      
      <div class="col-6 col-content">
        <b-form-group label="Connection (*)" label-cols="3" desc="connection" :invalid-feedback="state.connection.feedback">
          <b-form-select v-model="jdbcInfo.connection" @change="onChange" :state="state.connection.state" autocomplete="off">
            <template #first>
              <b-select-option value="" disabled>{{ $t('view.repo.form.select') }}</b-select-option>
            </template>
            <template v-for="(item, index) in oracleConnection">
              <b-form-select-option :value="item" :key="index">{{item}}</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.username" label="Username"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.username = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="password" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.password" label="Password" autocomplete="new-password"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.password = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.database" label="Database"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.database = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <b-form-group label="Table (*)" label-cols="3" desc="target table" :invalid-feedback="state.entity.feedback">
          <b-select v-model="jdbcInfo.entity" :state="state.entity.state" autocomplete="off" @change="onChageTable">
            <template #first>
              <b-select-option value="" disabled>{{ $t('view.repo.form.select') }}</b-select-option>
            </template>
            <b-select-option v-for="item, index in tableList" :key="index" :value="item.ename">{{ item.ename }}</b-select-option>
          </b-select>
        </b-form-group>
      </div>
    </div>
    <!-- 직접 : form > oracle -->

    <!-- 직접 : form > MSSQL, MYSQL, MriaDB -->
    <div class="form-content row row-content" v-if="isActive('mssql', 'mysql', 'mariadb')">
      <div class="col-12 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.dataSourceName" :label="$t('view.repo.form.dataSourceName')"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="3" maxlength="255" :duplicate-list="dataSource" duplicate-property="name"
          @output="(arg) => output.dataSourceName = arg || this.selectedBoxDataSource == 0"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.hostname" label="Host"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.hostname = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="number" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.port" label="Port"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.port = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.username" label="Username"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.username = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="password" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.password" label="Password" autocomplete="new-password"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.password = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.database" label="Database"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.database = arg"
          @change="onChange"/>
      </div>
      
      <div class="col-6 col-content">
        <b-form-group label="Table (*)" label-cols="3" desc="target table" :invalid-feedback="state.entity.feedback">
          <b-select v-model="jdbcInfo.entity" :state="state.entity.state" autocomplete="off" @change="onChageTable">
            <template #first>
              <b-select-option value="" disabled>{{ $t('view.repo.form.select') }}</b-select-option>
            </template>
            <b-select-option v-for="item, index in tableList" :key="index" :value="item.ename">{{ item.ename }}</b-select-option>
          </b-select>
        </b-form-group>
      </div>
    </div>
    <!-- 직접 : form > MSSQL -->

    <!-- 직접 : form > PostgreSQL -->
    <div class="form-content row row-content" v-if="isActive('postgresql')">
      <div class="col-12 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.dataSourceName" :label="$t('view.repo.form.dataSourceName')"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="3" maxlength="255" :duplicate-list="dataSource" duplicate-property="name"
          @output="(arg) => output.dataSourceName = arg || this.selectedBoxDataSource == 0"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.hostname" label="Host"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.hostname = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="number" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.port" label="Port"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.port = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.username" label="Username"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.username = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="password" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.password" label="Password" autocomplete="new-password"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.password = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.database" label="Database"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.database = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <validate-input type="text" :label-cols="3" mode="create" :essential="true"
          v-model="jdbcInfo.schema" label="Schema"
          :permit-string="true" :permit-number="true" :permit-special="true" minlength="1" maxlength="255"
          @output="(arg) => output.schema = arg"
          @change="onChange"/>
      </div>

      <div class="col-6 col-content">
        <b-form-group label="Table (*)" label-cols="3" desc="target table" :invalid-feedback="state.entity.feedback">
          <b-select v-model="jdbcInfo.entity" :state="state.entity.state" autocomplete="off" @change="onChageTable">
            <template #first>
              <b-select-option value="" disabled>{{ $t('view.repo.form.select') }}</b-select-option>
            </template>
            <b-select-option v-for="item, index in tableList" :key="index" :value="item.ename">{{ item.ename }}</b-select-option>
          </b-select>
        </b-form-group>
      </div>
    </div>

    <!-- 직접 : form > 테스트 -->
    <div class="manual-content d-flex" v-if="isActive('oracle','mssql', 'mysql', 'mariadb','postgresql')">
      <b-button v-if="testing.dbLoading" variant="success" @click="onClickTestConnection" disabled><b-spinner small></b-spinner></b-button>
      <b-button v-else-if="testing.isSuccess" variant="success" @click="onClickTestConnection" class="btn-test" disabled>{{ $t('view.repo.form.test') }}</b-button>
      <b-button v-else variant="primary" @click="onClickTestConnection" class="btn-test" :disabled="!state.all">{{ $t('view.repo.form.test') }}</b-button>
      <div class="database-test-content">
        <div class="test-content">
          <div class="loading-content">
            <template v-if="testing.dbLoading && isTest">{{$t('view.repo.form.testing')}}</template>
            <template v-else-if="testing.isSuccess && isTest">{{$t('view.repo.form.testSuccess')}}</template>
            <template v-else-if="!testing.isSuccess && !isDbConn && isTest">{{$t('view.repo.form.testFailed')}}</template>
            <template v-else>{{$t('view.repo.form.testGuide')}}</template>
          </div>
        </div>
      </div>
    </div>
    <!-- 직접 : form > 테스트 -->
  </div>
  <div v-if="isselectedBoxDataSource(1) && selectedJdbc != null">
    <div class="notice-text ml-5">※ {{$t('view.repo.form.databaseSyncGuide')}}</div>
  </div>
</div>
<!-- 업로드 방식 : 데이터베이스 연결 -->
</template>

<script lang="ts">
import { Mixins, Component, Watch, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { AxiosError } from 'axios';

import DatabaseTestModal from '@/views/components/DatabaseTestModal.vue';
import _ from 'lodash';

import { UtilsMixin } from '@/mixin';
import { ValidationCheck } from '@/common';

import ValidateInput from'@/views/components/ValidateInput.vue';

@Component({
  components: {
    DatabaseTestModal,
    ValidateInput,
  },
  computed: {
    oracleRole() {
      return [
        'SYSDBA',
        'SYSOPER',
        'Normal',
      ];
    },
    oracleConnection() {
      return [
        'SID',
        'Service Name'
      ];
    },
    isselectedBoxDataSource() {
      return (selectedSource: number) => selectedSource == this.$data.selectedBoxDataSource;
    },
    toFormat() {
      return (date: string) => date.replace('T', ' ').substring(0, 19);
    },
    ...mapGetters({
      projectId: 'sso/getProjectId',
      myInfo: 'sso/getMyInfo',
      // ORACLE ROLE 가져오기
      // ORACLE CONNECTION 가져오기
    }),
  }
})
export default class DatabaseBox extends Mixins(UtilsMixin) {
  oracleRole!: [];
  oracleConnection!: [];
  projectId!: any;

  @Prop()
  workspaceResourceGroupId!: string;

  // 데이터 소스
  dataSource: any = [];

  // 데이터 소스 선택 셀렉트 박스 : 데이터 소스 가져오기 : 0, 직접 입력 : 1
  selectedBoxDataSource: number = 0;

  // 데이터 소스 선택
  selectedDataSource: any = {};
  
  // 데이터 jdbc 선택
  selectedJdbc: string = null;

  jdbcInfo?: {
    dataSourceName?: string;
    hostname?: string;
    port?: number;
    role?: string;
    username?: string;
    password?: string;
    connection?: string;
    database?: string;
    schema?: string;
    entity?: string;
    provider? : string;
    projectId? : string;
  } = {
    dataSourceName: '',
    hostname: null,
    port: null,
    role: '',
    username: null,
    password: null,
    connection: '',
    database: null,
    schema: null,
    entity: '',
  };

  testing: {
    dbLoading: boolean;
    isSuccess: boolean;
  } = {
    dbLoading : false,
    isSuccess : false,
  }
  variant: string;
  showModal: boolean= false;

  tableList: any = [];

  // db가 연결이 되었는지?
  isDbConn: boolean = false;
  isTest: boolean = false;

  isLoading: boolean = false;

  output: any = {
    dataSourceName: true,
    hostname: true,
    port: true,
    username: true,
    password: true,
    database: true,
    entity: true,
    schema: true,

  };

  created() {
    this.getDataSources();
  }

  // Watch ----------------------------------------------

  @Watch('jdbcInfo.dataSourceName', { deep:true })
  onJdbcInfoChanged() {
    this.$emit('change', this.jdbcInfo);
    this.$emit('input', {
      selectedJdbc: this.selectedJdbc,
      dsSelected: this.selectedBoxDataSource,
      validate: this.output.dataSourceName,
      invalidFeedback: this.output.dataSourceName,
    });
  }
  // 메소드 ----------------------------------------------

  // 등록되어 있는 데이터 소스의 list를
  // 가져오는 로직
  async getDataSources() {
    this.isLoading = true;

    const data: any = {
      "_type": "DbDataSourceInfoImpl",
      "project": {
        "id": this.projectId,
        "_type": "Project"
      },
      "resourceGroup": {
        "id": this.workspaceResourceGroupId,
      },
      "excludeUsed": true,
    };

    const res = await this.$store.dispatch('datasource/dsList', data);
    
    //this.dataSource = res.data.data.elements;
    const dataSource = res.data.data.elements;
    const dataSourceLength = res.data.data.totalElements;

    if(dataSourceLength > 0) {
      Object.entries(dataSource).forEach((element: any) => {
        this.dataSource.push(element[1]);
      });
    }
    this.$forceUpdate();
    this.isLoading = false;
  }

  // "데이터소스 선택" 이 변경 될 때
  onSelectedBoxDataSource() {
    // selectedJdbc 초기화
    this.selectedJdbc = null;

    // jdbcInfo 초기화
    this.jdbcInfo = {
      dataSourceName: '',
      hostname: null,
      port: null,
      role: '',
      username: null,
      password: null,
      connection: '',
      database: null,
      schema: null,
      entity: '',
    };
    // selectedDataSoruce 초기화
    this.selectedDataSource = {};
    // 초기화
    this.$emit('input', {
      selectedJdbc: null,
      dsSelected: 0,
      validate: null,
      invalidFeedback: null,
    });
  }
  
  // "데이터소스 가져오기"에서 "데이터 소스 박스?"  클릭시
  async onClickSelecteDataSource(dataSource: object) {
    this.selectedDataSource = dataSource;
    this.selectedJdbc = this.selectedDataSource.provider;
    this.$emit('input', {
      selectedJdbc: this.selectedJdbc,
      dsSelected: this.selectedBoxDataSource,
      validate: this.output.dataSourceName,
      invalidFeedback: this.output.dataSourceName,
    });
    this.$emit('change', this.selectedDataSource);
    this.$emit('conn', true);
  }

  // table 선택시
  async onChageTable() {
    this.$emit('conn', true);
  }

  // 상단 의
  // "jdbc" 버튼 클릭시 (Oracle, MSSQL, MySQL, MariaDB, PostgreSQL)
  onSelecteJdbc(jdbc: string) {
    this.selectedJdbc = jdbc;
    this.jdbcInfo = {
      dataSourceName: '',
      hostname: null,
      port: null,
      role: '',
      username: null,
      password: null,
      connection: '',
      database: null,
      schema: null,
      entity: '',
    };
    this.$emit('input', {
      selectedJdbc: jdbc,
      dsSelected: this.selectedBoxDataSource,
      validate: this.output.dataSourceName,
      invalidFeedback: this.output.dataSourceName,
    });
    this.onChange();
  }

  // 중단 form 의
  // input 값들이 변경되었을 시
  onChange() {
    this.testing.isSuccess = false;
    this.isDbConn = false;
    this.isLoading = false;
    this.$emit('conn', this.testing.isSuccess);
  }

  // 하단 의
  // "테스트" 버튼 클릭시
  async onClickTestConnection() {

    if(!this.output.dataSourceName) {
      const res = await utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.output.dataSourceName, 'warning');
      return;
    }

    this.jdbcInfo = {
      ...this.jdbcInfo,
      provider: this.selectedJdbc,
      projectId: this.projectId,
    }

    const dispatch =
      (this.selectedJdbc == 'oracle') ? 'datasource/oracleTest' :
      (this.selectedJdbc == 'mssql') ? 'datasource/mssqlTest' :
      (this.selectedJdbc == 'mysql') ? 'datasource/mysqlTest' :
      (this.selectedJdbc == 'mariadb') ? 'datasource/mysqlTest' : 'datasource/postgresTest';

    this.showModal = true; // 팝업 뛰우기
    this.testing.dbLoading = true; // 버튼 로딩

    // db conn test
    this.$store.dispatch(dispatch, this.jdbcInfo)
    .then((res) => {
      this.tableList = _.values(res.data.data.results);
      this.tableList.sort((a: any, b: any) => {
        return a.ename < b.ename ? -1 : a.ename > b.ename ? 1 : 0;
      });

      this.testing.isSuccess = true; // 연결 성공
      this.isDbConn = true;
    })
    .catch((err: AxiosError) => utils.handlerError(this, err).then(() => {
      this.testing.isSuccess = false; // 연결 실패
      this.isDbConn = false;
    }))
    .finally(() => {
      this.testing.dbLoading = false; // 버튼 로딩 완료
      this.isTest = true;
    });
  }

  // 모달 의
  // "닫기"
  // 버튼 클릭시
  onCloseModal() {
    this.showModal = false; // 모달 닫기
  }

  // 모달 의
  // "선택된 data source 사용"
  // 버튼 클릭시
  onDataSourceUse(item: any) {
    if(item != null) {
      this.jdbcInfo.entity = item.ename;
      this.onCloseModal();
      this.$emit('conn', this.testing.isSuccess);
    } else {
      utils.bvModalmsgBoxOk(this, this.$t('view.sso.alert.title.alarm').toString(), this.$t('view.repo.alert.selectDataSource').toString(), 'warning');
    }
  }

  // 모달 의
  // 배경을 클릭시
  onHide(evt: any) {
    if(evt.trigger === "backdrop") {
      // 모달창이 꺼지는 것을 막기 위한 로직
      evt.preventDefault();
    }
  }

  // 선택 된 "jdbc" 버튼과 일치 여부 확인
  isActive(...jdbc: string[]) {
    let result = false;
    for (const item of jdbc) {
      if(item == this.selectedJdbc) {
        result = true;
      }
    }
    return result && this.selectedBoxDataSource == 1;
  }

  get state() {
    const { hostname, port, username, database, password, dataSourceName, schema } = this.output;
    const role = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.jdbcInfo.role);
    const connection = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.jdbcInfo.connection);
    const entity = ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 1, 255, this.jdbcInfo.entity);

    let all: boolean = false;
    const common: boolean = hostname && port && username && database && password && dataSourceName;
    if(this.isActive('oracle')) {
      all = common && role.state && connection.state;
    } else if (this.isActive('mssql', 'mysql', 'mariadb')) {
      all = common;
    } else if (this.isActive('postgresql')) {
      all = common && schema;
    }

    return {
      role: role,
      connection: connection,
      entity: entity,
      all: all,
    };
  }

  // 테스트 버튼 활성화
  get testButtonEnabled() {
    return true;
  }
}
</script>