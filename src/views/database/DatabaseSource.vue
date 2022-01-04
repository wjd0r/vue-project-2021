<template>
  <div class="main-common-component database-component" :class="`lang-${$i18n.locale}`">
    <!-- top -->
    <Search @search="searchDatabaseSource" @changeWorkspace="updateWorkspace" :isLoading="showLoading || showFormLoading" />
    <!-- top -->
    <div class="main-common-content database-content row">
      <!-- left -->
      <div class="left-component col-6">
        <div class="left-content">
          <div class="data-component">
            <div class="data-content">
              <div class="content-header">
                <div class="left-align">
                  <h4 class="title" desc="데이터 소스">{{ this.$t('view.repo.datasource.title.index').toString() }}</h4>
                  <!--데이터 소스-->
                  <span class="count-text">({{ datasourceCount }})</span>
                </div>
                <div class="right-align">
                  <b-button variant="primary" class="btn-primary btn-create" :class="{ 'd-none': isMobileBlock() }" @click="onCreateConnection">{{ this.$t('view.repo.button.dbCreate').toString() }}</b-button>
                  <!-- 연결 생성 -->
                </div>
              </div>
              <div class="content-body row">
                <template v-if="showLoading">
                  <div class="loading d-flex align-items-center justify-content-center">
                    <b-spinner />
                  </div>
                </template>
                <template v-else>
                  <template v-for="item in this.dsList">
                    <CardDatabase @clickCardDB="onClickCardDB" :key="item.id" :item="item" :list="dsList" :selectedDBCard="selectedDBCard"></CardDatabase>
                  </template>
                  <div class="nodata-text w-100">
                    <template v-if="this.datasourceCount == 0">
                      {{ message }}
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- left -->

      <!-- right -->
      <div v-if="$mq.desktop" class="right-component col-6">
        <b-overlay :show="showLoading || showFormLoading || mode === 'default'" class="right-content h-100" bg-color="#F2F2F2" opacity="1" no-fade>
          <!-- 정보 -->
          <DatabaseDetail ref="form" :mode="mode" :datasourceInfo="datasourceInfos" :datasourceLists="dsList" :selectedWorkspace="selectedWorkspaceNo" @on-cancel="onClickCancel" @on-save="onClickSave" @on-edit="onClickEdit" @on-edit-info="onClickInfoEdit" @on-delete="onClickDelete" :class="`lang-${$i18n.locale}`"/>
          <!-- 정보 -->
          <template #overlay>
            <div v-if="mode === 'default'">{{ $t('view.repo.alert.selectDatasource') }}</div>
          </template>
        </b-overlay>
      </div>
      <b-modal v-else v-model="showCreateModal" id="DatabaseDetail" @hide="selectedDBCard = null" centered hide-header hide-footer>
        <!--  정보-->
        <b-overlay :show="showLoading || showFormLoading || mode === 'default'" class="right-content h-100" bg-color="#FFF" opacity="1" no-fade>
          <DatabaseDetail ref="form" :mode="mode" :datasourceInfo="datasourceInfos" :datasourceLists="dsList" @on-cancel="onClickCancel" @on-save="onClickSave" @on-edit="onClickEdit" @on-edit-info="onClickInfoEdit" @on-delete="onClickDelete" :class="`lang-${$i18n.locale}`"/>
          <!-- 정보 -->
          <template #overlay>
            <div v-if="mode === 'default'">{{ $t('view.repo.alert.selectDatasource') }}</div>
          </template>
        </b-overlay>
      </b-modal>
      <!-- right -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { ISetting } from '@/interface';

import { AxiosError, AxiosResponse } from 'axios';
import { UtilsMixin } from '@/mixin';
import _ from 'lodash';

import Search from '../components/Search.vue';
import CardDatabase from '../components/cards/CardDatabase.vue';
import DatabaseDetail from './components/DatabaseDetail.vue';
import DatabaseTestModal from '../components/DatabaseTestModal.vue';

@Component({
  components: {
    Search,
    CardDatabase,
    DatabaseTestModal,
    DatabaseDetail,
  },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    myInfo: 'sso/getMyInfo',
    setting: 'sso/getSetting',
  }),
  ...utils.getMq(),
} as any)
export default class DatabaseSource extends Mixins(UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  projectId!: string;
  readonly myInfo!: any;
  readonly setting!: ISetting;

  dsList: any = {};

  datasourceInfos: any = {};

  selectedDBCard: any = null;

  mode: 'default' | 'create' | 'edit' | 'infoedit' | 'test' | 'mobile' = 'default';
  message: string = '';

  showLoading: boolean = false;
  showFormLoading: boolean = false;
  showCreateModal: boolean = false;

  datasourceCount: number = 0;

  isSearchWord: boolean = false;

  selectedWorkspaceNo: number = null;

  /* refs 선언 */
  $refs!: {
    form: DatabaseDetail;
  };

  $mq!: {
    phone: boolean;
    tablet: boolean;
    desktop: boolean;
  };

  /* Watch 선언 */
  @Watch('$mq', { deep: true })
  onMQChanged(newVal: any) {
    const deskToMobile = newVal.desktop === false && (newVal.tablet === true || newVal.phone === true);
    const mobileToDesk = newVal.desktop === true && (newVal.tablet === false || newVal.phone === false);

    if (deskToMobile || mobileToDesk) {
      switch (this.mode) {
        case 'create': {
          this.mode = 'default';
          break;
        }
        case 'edit': {
          this.mode = 'infoedit';
          break;
        }
      }
    }
  }

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    this.selectedWorkspaceNo = this.setting.common.workspace.defaultWorkspace;
    this.getDatasourceList(this.selectedWorkspaceNo);
    this.mode = 'default';
  }

  //  mounted() {
  //   //  this.deactivateConnectDB();
  //  }

  /* 메소드 선언 */

  onCreateConnection() {
    const workspace = utils.getWorkspaceById(this.selectedWorkspaceNo);

    if (!workspace) {
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.info').toString(), this.$t('view.repo.alert.selectWorkspace').toString(), 'warning');
      return;
    }

    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.data.source', 'create')) {
      this.mode = 'create';
      this.selectedDBCard = null;
      this.showCreateModal = true;
    } else {
      utils.noPermissionAlert(this);
    }
  }

  onClickCardDB(item: any) {
    const workspace = utils.getWorkspaceByRgId(item.resourceGroup.id);
    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.data.source', 'view')) {
      this.selectedDBCard = item;
      this.getDatasourceInfo();
      this.showCreateModal = true;
    } else {
      utils.noPermissionAlert(this);
    }
  }

  /* API call */
  updateWorkspace(workspaceNo: number) {
    this.getDatasourceList(workspaceNo);
    this.selectedWorkspaceNo = workspaceNo;
    this.mode = 'default';
  }

  getResourceGroupId(workspace: number) {
    const result = _.find(this.myInfo.workspaces, ['id', workspace == null || workspace == undefined ? this.setting.common.workspace.defaultWorkspace : workspace]);
    if (result) {
      return result.iprResourceGroupId;
    } else {
      return null;
    }
  }

  getDatasourceList(workspaceNo: any) {
    //populate request parameter
    const data: any = {
      _type: 'DbDataSourceInfoImpl',
      project: {
        id: this.projectId,
        _type: 'Project',
      },
      resourceGroup: {},
    };

    if (workspaceNo == null) {
      data.resourceGroup.createdBy = this.myInfo.id;
    } else {
      data.resourceGroup.id = this.getResourceGroupId(workspaceNo);
    }

    //set loading
    this.isSearchWord = false;
    this.showLoading = true;
    this.datasourceCount = 0;

    this.$store
      .dispatch('datasource/dsList', data)
      .then((res: AxiosResponse) => {
        this.dsList = res.data.data.elements;

        this.datasourceCount = res.data.data.totalElements;

        this.message = this.datasourceCount == 0 ? this.$t('view.repo.alert.datasource.index.noData').toString() : '';
      })
      .catch((err: AxiosError) => {
        if (!err) {
          const header = err.response.headers;
          if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
            utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.index.title').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
          }
        }
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  getDatasourceInfo() {
    this.showFormLoading = true;
    const data = {
      id: this.selectedDBCard.id,
      projectId: this.selectedDBCard.project.id,
      resourceGroupId: this.selectedDBCard.resourceGroup.id,
      syncEnabled: this.selectedDBCard.syncEnabled,
      db: this.getDBShort(this.selectedDBCard.provider),
    };

    this.$store
      .dispatch('datasource/dsInfo', data)
      .then((res: AxiosResponse) => {
        // set data
        this.datasourceInfos = res.data.data;
        this.mode = 'infoedit';
      })
      .catch((err: AxiosError) => {
        const header = err.response.headers;
        if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
          utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.getInfo.title').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
        }
      })
      .finally(() => {
        this.showFormLoading = false;
      });
  }

  onClickSave(data: any) {
    //add workspace
    data.resourceGroupId = this.getResourceGroupId(this.selectedWorkspaceNo);

    //put loading
    this.showFormLoading = true;

    this.$store
      .dispatch('datasource/dsCreate', data)
      .then((res: AxiosResponse) => {
        //refresh data source list
        this.getDatasourceList(this.selectedWorkspaceNo);

        //edit complete
        utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.create.title').toString(), this.$t('view.repo.alert.datasource.create.content').toString());

        //return state to default
        this.mode = 'default';

        this.showCreateModal = false;
      })
      .catch((err: AxiosError) => {
        const header = err.response.headers;
        if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
          utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.create.title').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
        }
      })
      .finally(() => {
        this.showFormLoading = false;
      });
  }

  async onClickDelete() {
    const workspace = utils.getWorkspaceByRgId(this.selectedDBCard.resourceGroup.id);
    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.data.source', 'delete', this.myInfo.id)) {
      const title = this.$t('view.repo.alert.datasource.delete.title').toString();
      const content = this.$t('view.repo.alert.datasource.delete.warningContent').toString();
      const yes = this.$t('view.repo.button.yes').toString();
      const no = this.$t('view.repo.button.no').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

      if (res) {
        //put loading
        this.showFormLoading = true;

        //populate request
        const data = {
          id: this.selectedDBCard.id,
          projectId: this.selectedDBCard.project.id,
          resourceGroupId: this.selectedDBCard.resourceGroup.id,
          syncEnabled: this.selectedDBCard.syncEnabled,
          db: this.getDBShort(this.selectedDBCard.provider),
        };

        this.$store
          .dispatch('datasource/dsDelete', data)
          .then((res: AxiosResponse) => {
            //refresh data source list
            this.getDatasourceList(this.selectedWorkspaceNo);

            //edit complete
            utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.delete.title').toString(), this.$t('view.repo.alert.datasource.delete.successContent').toString(), 'complete');

            this.mode = 'default';
          })
          .catch((err: AxiosError) => {
            const header = err.response.headers;
            if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
              utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.delete.title').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
            }
          })
          .finally(() => {
            this.showFormLoading = false;
          });
      }
    } else {
      utils.noPermissionAlert(this);
    }
  }

  onClickCancel() {
    switch (this.mode) {
      case 'create': {
        this.mode = 'default';
        break;
      }
      case 'edit':
      case 'infoedit': {
        if (this.$mq.desktop) {
          this.mode = 'infoedit';
        } else {
          this.showCreateModal = false;
          this.mode = 'default';
          this.selectedDBCard = null;
        }
        break;
      }
    }
  }

  onClickInfoEdit() {
    const workspace = utils.getWorkspaceByRgId(this.selectedDBCard.resourceGroup.id);
    if (workspace && (utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.data.source', 'update') || utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.data.source', 'delete'))) {
      this.mode = 'edit';
    } else {
      utils.noPermissionAlert(this);
    }
  }

  async onClickEdit(data: any) {
    const workspace = utils.getWorkspaceByRgId(this.selectedDBCard.resourceGroup.id);
    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.data.source', 'update', this.myInfo.id)) {
      const title = this.$t('view.repo.alert.datasource.edit.title').toString();
      const content = this.$t('view.repo.alert.datasource.edit.warningContent').toString();
      const yes = this.$t('view.repo.button.yes').toString();
      const no = this.$t('view.repo.button.no').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

      if (res) {
        this.showCreateModal = true;
        this.showFormLoading = true;

        //when edit, no need to update workspace
        //skip adding workspace

        this.$store
          .dispatch('datasource/dsCreate', data)
          .then((res: AxiosResponse) => {
            //return state to default
            this.mode = 'default';

            //refresh data source list
            this.getDatasourceList(this.selectedWorkspaceNo);

            //edit complete
            utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.datasource.edit.title').toString(), this.$t('view.repo.alert.datasource.edit.successContent').toString(), 'complete');

            this.showCreateModal = false;
          })
          .catch((err: AxiosError) => {
            this.showCreateModal = false;
            const header = err.response.headers;
            if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
              utils.bvModalmsgBoxOk(
                this,
                this.$t('view.repo.alert.datasource.edit.title').toString(), //'연결 소스 수정'
                this.$t('view.repo.alert.' + header['x-ioc-code']).toString(),
                'error'
              );
            }
          })
          .finally(() => {
            this.showFormLoading = false;
          });
      }
    } else {
      utils.noPermissionAlert(this);
    }
  }

  searchDatabaseSource(searchWord: string) {
    this.datasourceCount = 0;

    if (searchWord == '') {
      this.getDatasourceList(this.selectedWorkspaceNo);
      this.isSearchWord = false;
    } else {
      //show loading
      this.isSearchWord = true;
      this.showLoading = true;

      //populate request parameter
      const data: any = {
        _type: 'DbDataSourceInfoImpl',
        name: searchWord,
        project: {
          id: this.projectId,
          _type: 'Project',
        },
        resourceGroup: {},
      };

      if (this.selectedWorkspaceNo == null) {
        data.resourceGroup.createdBy = this.myInfo.id;
      } else {
        data.resourceGroup.id = this.getResourceGroupId(this.selectedWorkspaceNo);
      }

      this.$store
        .dispatch('datasource/dsListSearch', data)
        .then((res: AxiosResponse) => {
          this.datasourceCount = res.data.data.totalElements;

          //if no result is return -- show 'no result'
          if (this.datasourceCount == 0) {
            this.message = this.$t('view.repo.alert.search.content').toString();

            this.dsList = {};
          } else {
            this.dsList = res.data.data.elements;
          }

          this.showLoading = false;
        })
        .catch((err: AxiosError) => {
          this.showLoading = false;
          const header = err.response.headers;
          if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
            utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.search.title').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
          }
        });
    }
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
}
</script>