<template>
  <div class="main-common-component process-standard-component">
    <!-- top -->
    <Search ref="search" :isLoading="showLoading || showFormLoading || showDatasetLoading" @search="onSearch" @changeWorkspace="changeWorkspace()" />
    <!-- top -->
    <div class="main-common-content process-standard-content row">
      <!-- left -->
      <div class="left-component col-6">
        <div class="left-content">
          <div class="standard-component">
            <div class="standard-content">
              <div class="content-header">
                <div class="left-align">
                  <h4 class="title" desc="표준 프로세스">{{ $t('view.repo.standard.title') }}</h4>
                  <span class="count-text">({{ processList.totalElements }})</span>
                </div>
                <div class="right-align">
                  <!-- 멀티 선택 -->
                  <div class="multi-select">
                    <template v-if="$refs.search && $refs.search.selectedWorkspace !== null">
                      <template v-if="isMultiSelect">
                        <span class="selected text-right" @click="onClickDeleteProcess" desc="삭제">{{ $t('view.repo.button.delete') }}</span>
                        <span class="selected text-right" @click="isMultiSelect = false" desc="취소">{{ $t('view.repo.button.cancel') }}</span>
                      </template>
                      <span class="selected text-right" :class="{ 'd-none': isMobileBlock() }" v-else @click="onClickMultiSelectMode" desc="선택">{{ $t('view.repo.button.select') }}</span>
                    </template>
                  </div>
                  <!-- 멀티 선택 -->
                  <b-button variant="primary" class="btn-primary btn-create" :class="{ 'd-none': isMobileBlock() }" @click="onClickCreateProcess()">{{ $t('view.repo.form.processCreate') }}</b-button>
                </div>
              </div>
              <div class="content-body row">
                <template v-if="showLoading || showDatasetLoading">
                  <div class="loading d-flex align-items-center justify-content-center">
                    <b-spinner />
                  </div>
                </template>
                <template v-else>
                  <template v-if="processList.totalElements !== 0">
                    <CardStandard v-for="item in sortedProcesList" :key="item.id" :process="item" @click.passive.native="onClickCard(item, $event)" :isMultiSelect="isMultiSelect" :selectedProcess="selectedProcess" :multiSelected="multiSelected"></CardStandard>
                  </template>
                  <template v-else>
                    <div class="nodata-text w-100">
                      <template v-if="keyword !== ''">{{ $t('view.repo.alert.search.content') }}</template>
                      <template v-else>{{ $t('view.repo.alert.standard.list.notHave') }}</template>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- left -->

      <!-- right -->
      <div v-if="$mq.desktop" class="right-component col-6">
        <div class="right-content h-100">
          <!-- 정보 -->
          <StandardDetail v-if="mode === 'detail'" ref="detail" v-model="showFormLoading" :showLoading="showFormLoading" @showModify="showProcessModify" @deleteProcess="finish" />
          <!-- 정보 -->
          <!-- 수정 -->
          <StandardModify v-if="mode === 'form'" v-model="showFormLoading" @finish="finish" @close="changeMode('detail')" />
          <!-- 수정 -->
        </div>
      </div>
      <!-- right -->
      <!-- modal -->
      <b-modal v-else v-model="showModal" centered hide-header hide-footer id="StandardDetail">
        <!-- 정보 -->
        <StandardDetail v-if="mode === 'detail'" ref="detail" v-model="showFormLoading" :showLoading="showFormLoading" @showModify="showProcessModify" @deleteProcess="finish" @close="closeDetail" />
        <!-- 정보 -->
        <!-- 수정 -->
        <StandardModify v-if="mode === 'form'" v-model="showFormLoading" @finish="finish" @close="changeMode('detail')" />
        <!-- 수정 -->
      </b-modal>
      <!-- modal -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { IKeyValueObject, ISetting } from '@/interface';

import { UtilsMixin } from '@/mixin';

import { AxiosResponse } from 'axios';
import _ from 'lodash';

import CardStandard from '../../components/cards/CardStandard.vue';
import Search from '../../components/Search.vue';
import StandardDetail from './components/StandardDetail.vue';
import StandardModify from './components/StandardModify.vue';

@Component({
  components: {
    Search,
    CardStandard,
    StandardDetail,
    StandardModify,
  },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
    setting: 'sso/getSetting',
  }),
  ...utils.getMq(),
} as any)
export default class StandardList extends Mixins(UtilsMixin) {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */
  readonly myInfo!: IKeyValueObject;
  readonly projectId!: string;
  readonly setting!: ISetting;
  /* 클래스 변수 선언 */
  processList: {
    totalElements: number;
    elements: { [key: string]: any };
  } = {
    totalElements: 0,
    elements: {},
  };
  selectedProcess: string = '';

  keyword: string = '';

  mode: 'detail' | 'form' = 'detail';

  resourceCode = 'repo.process';

  isMultiSelect: boolean = false;
  multiSelected: any[] = [];

  showLoading: boolean = false;
  showFormLoading: boolean = false;
  showDatasetLoading: boolean = false;

  showModal: boolean = false;
  /* refs 선언 */
  $refs!: {
    search: Search;
    detail: StandardDetail;
  };
  $mq!: {
    phone: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  /* Watch 선언 */
  @Watch('isMultiSelect')
  onIsMultiSelectedChange(newVal: boolean) {
    if (newVal) this.multiSelected = [];
  }

  @Watch('$mq', { deep: true })
  onMQChanged(newVal: any, oldVal: any) {
    if (this.mode === 'form') {
      const deskToMobile = newVal.desktop === false && (newVal.tablet === true || newVal.phone === true);
      const mobileToDesk = newVal.desktop === true && (newVal.tablet === false || newVal.phone === false);
      if (deskToMobile || mobileToDesk) {
        this.mode = 'detail';
      }
    }
  }

  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  beforeCreate() {
    this.$store.commit('standard/setProcess', null);
  }

  created() {
    this.getDatasetList();
    this.getProcessList();
  }
  /* 메소드 선언 */

  getProcessList(keyword?: string) {
    this.showLoading = true;
    this.processList = {
      totalElements: 0,
      elements: {},
    };
    const data: any = {
      _type: 'ProcessModelSelectConfiguration',
      selectors: [
        {
          _type: 'ProcessModel',
          project: {
            _type: 'Project',
            id: this.projectId,
          },
        },
      ],
    };

    data.selectors[0]['resourceGroup'] = {
      _type: 'ResourceGroup',
    };

    if (this.$refs.search) {
      if (this.$refs.search.selectedWorkspace !== null) {
        data.selectors[0]['resourceGroup'].id = this.$refs.search.getSelectedResourceGroupId();
      } else {
        data.selectors[0]['resourceGroup'].createdBy = this.myInfo.id;
      }
    } else {
      if (!isNaN(this.setting.common.workspace.defaultWorkspace) && this.setting.common.workspace.defaultWorkspace !== null) {
        const workspace = utils.getWorkspaceById(this.setting.common.workspace.defaultWorkspace);
        if (workspace) {
          data.selectors[0]['resourceGroup'].id = workspace.iprResourceGroupId;
        }
      } else {
        data.selectors[0]['resourceGroup'].createdBy = this.myInfo.id;
      }
    }

    if (keyword) {
      this.keyword = keyword;
      data['mode'] = 'SEARCH_NAME_PREFIX';
      data.selectors[0]['name'] = keyword;
    } else {
      this.keyword = '';
    }

    this.mode = 'detail';
    this.selectedProcess = '';
    this.$store.commit('standard/setProcess', null);

    this.$store.dispatch('standard/getProcessList', [data]).then((res: AxiosResponse) => {
      this.processList = {
        totalElements: res.data.data.totalElements,
        elements: res.data.data.elements,
      };

      this.showLoading = false;
      if (!this.$mq.desktop) {
        this.showModal = false;
      }
    });
  }

  onSearch(keyword: string) {
    this.getProcessList(keyword);
  }

  changeWorkspace() {
    this.getProcessList();
    this.getDatasetList();
  }

  get sortedProcesList() {
    let elements = _.values(this.processList.elements);
    elements = _.orderBy(elements, ['name'], ['asc']);
    return elements;
  }

  getDatasetList() {
    this.showDatasetLoading = true;
    const data: any = {
      projectId: this.projectId,
    };

    if (this.$refs.search) {
      if (this.$refs.search.selectedWorkspace !== null) {
        data.iprResourceGroupId = this.$refs.search.getSelectedResourceGroupId();
      } else {
        data.createdBy = this.myInfo.id;
      }
    } else {
      if (!isNaN(this.setting.common.workspace.defaultWorkspace) && this.setting.common.workspace.defaultWorkspace !== null) {
        const workspace = utils.getWorkspaceById(this.setting.common.workspace.defaultWorkspace);
        if (workspace) {
          data.iprResourceGroupId = workspace.iprResourceGroupId;
        }
      } else {
        data.createdBy = this.myInfo.id;
      }
    }

    this.$store.dispatch('repository/getRepoDataIndex', data).then((res) => {
      this.showDatasetLoading = false;
    });
  }

  onClickCard(process: any, event: Event) {
    if (!this.isMultiSelect) {
      const workspace = utils.getWorkspaceByRgId(process?.resourceGroup.id);
      if (workspace && utils.checkPermission(this.projectId, workspace.groupId, process.resourceGroup.id, this.resourceCode, 'view')) {
        this.showProcessDetail(process);
        this.showModal = true;
      } else {
        utils.noPermissionAlert(this);
      }
    } else {
      const index = _.findIndex(this.multiSelected, (item) => item === process.id);
      if (index !== -1) this.multiSelected.splice(index, 1);
      else this.multiSelected.push(process.id);
    }
  }

  showProcessDetail(process: any) {
    if (this.selectedProcess === process.id || (this.$refs.detail && this.$refs.detail.showLoading)) return;
    this.selectedProcess = process.id;
    this.mode = 'detail';
    this.showFormLoading = true;

    const data: IKeyValueObject = {
      _type: 'ProcessModelSelectConfiguration',
      selectors: [
        {
          _type: 'ProcessModel',
          id: process.id,
          project: {
            _type: 'Project',
            id: this.projectId,
          },
        },
      ],
    };

    if (process?.resourceGroup) {
      data.selectors[0]['resourceGroup'] = {
        _type: 'ResourceGroup',
        id: process.resourceGroup.id,
      };
    }

    this.$store.dispatch('standard/getProcess', [data]).then((res) => {
      this.showFormLoading = false;
    });
  }

  showProcessModify() {
    this.changeMode('form');
  }

  deleteProcess() {
    this.isMultiSelect = false;
    this.selectedProcess = '';
    this.getProcessList();
  }

  changeMode(mode: 'detail' | 'form') {
    this.mode = mode;
  }

  goStandardCreateForm() {
    this.$store.commit('standard/setProcess', null);
    this.$router.push({
      name: 'StandardCreateForm',
      params: {
        projectId: this.projectId,
        rgId: this.$refs.search.getSelectedResourceGroupId(),
      },
    });
  }

  onClickCreateProcess() {
    this.isMultiSelect = false;
    const workspace = utils.getWorkspaceByRgId(this.$refs.search.getSelectedResourceGroupId());

    if (this.$refs.search.selectedWorkspace === null || !workspace) {
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.info').toString(), this.$t('view.repo.alert.selectWorkspace').toString(), 'warning');
      return;
    }

    if (utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.process', 'create')) {
      this.goStandardCreateForm();
    } else {
      utils.noPermissionAlert(this);
    }
  }

  closeDetail() {
    this.showModal = false;
    this.selectedProcess = '';
    this.$store.commit('standard/setProcess', null);
  }

  finish() {
    this.isMultiSelect = false;
    this.showModal = false;
    this.showFormLoading = false;
    this.changeMode('detail');
    this.getProcessList();
  }

  onClickMultiSelectMode() {
    if (this.mode === 'form' || this.showLoading === true || this.processList.totalElements === 0) return;
    this.$store.commit('standard/setProcess', null);
    this.selectedProcess = '';
    this.isMultiSelect = true;
  }

  onClickDeleteProcess() {
    const workspace = utils.getWorkspaceById(this.$refs.search.selectedWorkspace);

    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.process', 'delete')) {
      if (this.multiSelected.length < 1) {
        utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.info').toString(), this.$t('view.repo.alert.standard.delete.noSelectedContent', 'warning').toString());
      } else {
        utils.bvModalmsgBoxConfirm(this, this.$t('view.repo.alert.standard.delete.title').toString(), this.$t('view.repo.alert.standard.delete.content').toString(), this.$t('view.repo.button.yes').toString(), this.$t('view.repo.button.no').toString(), 'warning').then((res) => {
          if (res) {
            this.showLoading = true;
            const data = {
              _type: 'ProcessModelSelectConfiguration',
              selectors: [] as any[],
            };

            this.multiSelected.forEach((item) => {
              data.selectors.push({
                _type: 'ProcessModel',
                id: item,
                project: {
                  _type: 'Project',
                  id: this.projectId,
                },
              });
            });

            this.$store.dispatch('standard/deleteProcess', [data]).then((res) => {
              this.selectedProcess = '';
              this.$store.commit('standard/setProcess', null);
              this.isMultiSelect = false;
              this.getProcessList();
            });
          }
        });
      }
    } else {
      utils.noPermissionAlert(this);
    }
  }
}
</script>