<template>
  <b-overlay :show="!process || showLoading" class="standard-form-component" :bg-color="$mq.desktop ? '#F2F2F2' : '#FFF'" opacity="1" no-fade>
    <div class="standard-form-content">
      <div class="content-header">
        <h4 class="title" desc="프로세스 정보">{{ $t('view.repo.form.processInfo') }}</h4>
      </div>
      
      <div class="content-body">
        <div class="content-header">
          <h5 class="title">{{ $t('view.repo.standard.title') }}</h5>
        </div>
        <div class="form-content">
          <b-form-group id="standard-name" :label="$t('view.repo.form.processName')" label-cols="2" desc="프로세스 이름">
            <b-form-input v-if="process" v-model="process.name" readonly></b-form-input>
            <b-form-input v-else disabled></b-form-input>
          </b-form-group>
          <b-form-group id="standard-desc" :label="$t('view.repo.form.processDesc')" label-cols="2" desc="프로세스 설명">
            <b-form-input v-if="process" v-model="process.description" readonly></b-form-input>
            <b-form-input v-else disabled></b-form-input>
          </b-form-group>
        </div>

        <div class="event-table-component">
          <div class="event-table-content">
            <div class="content-header" :label="$t('view.repo.form.relatedRepo')" desc="등록된 이벤트"><h5 class="title">{{ $t('view.repo.form.relatedRepo') }}</h5></div>
            <div class="content-body">
              <div class="table-component">
                <div class="table-content">
                  <table class="table line">
                    <thead>
                      <tr>
                        <th desc="원본 데이터">{{ $t('view.repo.form.dataset') }}</th>
                        <th desc="이벤트">{{ $t('view.repo.form.repository') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="process && process.relations">
                        <template v-for="(v, k) in process.relations">
                          <tr v-if="v._type.startsWith('EventRepository')" :key="k">
                            <td>
                              <div class="ico-item" :class="`ico-${getDatasetIcon(v.id)}`"></div>
                              <div class="item-text">{{ getDatasetName(v.id) }}</div>
                            </td>
                            <td>
                              <div class="ico-item" :class="`ico-log${getRepositoryIcon(v)}`"></div>
                              <div class="item-text">{{ v.name }}</div>
                            </td>
                          </tr>
                        </template>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content-footer">
          <div class="btn-group" v-if="process">
            <b-button variant="outline-primary" class="btn-eidtor" :class="{ 'd-none': isMobileBlock() }" @click="onClickGoEditor()" desc="프로세스 편집">{{ $t('view.repo.button.processEdit') }}</b-button>
            <b-button variant="outline-primary" class="btn-modify" :class="{ 'd-none': isMobileBlock() }" @click="onClickModify()" desc="수정">{{ $t('view.repo.button.modify') }}</b-button>
            <b-button class="btn-delete" :class="{ 'd-none': isMobileBlock() }" @click="onClickDelete()" desc="삭제">{{ $t('view.repo.button.delete') }}</b-button>
            <b-button class="btn-cencle m-btn" :class="{ 'd-none': !isMobileBlock() }" @click="$emit('close')" desc="닫기">{{ $t('view.repo.button.close') }}</b-button>
          </div>
        </div>
      </div>
    </div>

    <template #overlay>
      <b-spinner v-if="showLoading" label="Spinning"></b-spinner>
      <div v-else>{{ $t('view.repo.alert.selectProcess') }}</div>
    </template>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { IKeyValueObject } from '@/interface';

import { UtilsMixin } from '@/mixin';

@Component({
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
    process: 'standard/getProcess',
    datasetList: 'repository/getRepoDataIndex',
  }),
  ...utils.getMq(),
} as any)
export default class StandardDetail extends Mixins(UtilsMixin) {
  @Prop({})
  showLoading: boolean;

  myInfo: IKeyValueObject;
  projectId!: string;
  process!: any;
  datasetList!: any;

  getDatasetName(id: string) {
    const _id = id.split('_');
    return this.datasetList.elements[_id[0]] ? this.datasetList.elements[_id[0]].name : '';
  }

  getDatasetIcon(id: string) {
    const _id = id.split('_');
    const dataset = this.datasetList.elements[_id[0]];
    if (!dataset) {
      return 'file';
    } else {
      switch (dataset.originType) {
        case 'csv':
        case 'xlsx':
        case 'mxml':
        case 'xes': {
          return 'file';
        }
        case 'database':
        case 'psql':
        case 'oracle':
        case 'mssql':
        case 'mysql':
        case 'mariadb': {
          return 'database';
        }

        default: {
          return 'file';
        }
      }
    }
  }

  getRepositoryIcon(repo: any) {
    if (!repo.originType) {
      return '';
    } else {
      switch (repo.originType) {
        case 'file':
        case 'csv':
        case 'xlsx':
        case 'mxml':
        case 'xes': {
          return '';
        }
        case 'database':
        case 'psql':
        case 'oracle':
        case 'mssql':
        case 'mysql':
        case 'mariadb': {
          return '-db';
        }
        default: {
          return '';
        }
      }
    }
  }

  onClickModify() {
    const workspace = utils.getWorkspaceByRgId(this.process.resourceGroup.id);

    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.process', 'update', this.process.createdBy)) {
      this.$emit('showModify');
    } else {
      utils.noPermissionAlert(this);
    }
  }

  onClickGoEditor() {
    const workspace = utils.getWorkspaceByRgId(this.process.resourceGroup.id);

    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.process', 'update', this.process.createdBy)) {
      this.$router.push({ name: 'ProcessEditor', params: { projectId: this.projectId, rgId: this.process.resourceGroup.id, processId: this.process.id } });
    } else {
      utils.noPermissionAlert(this);
    }
  }

  onClickDelete() {
    const workspace = utils.getWorkspaceByRgId(this.process.resourceGroup.id);

    if (workspace && utils.checkPermission(this.projectId, workspace.groupId, workspace.iprResourceGroupId, 'repo.process', 'delete', this.process.createdBy)) {
      utils.bvModalmsgBoxConfirm(this, this.$t('view.repo.alert.standard.delete.title').toString(), this.$t('view.repo.alert.standard.delete.content').toString(), this.$t('view.repo.button.yes').toString(), this.$t('view.repo.button.no').toString(), 'warning').then((res) => {
        if (res) {
          this.$emit('input', true);
          const data = {
            _type: 'ProcessModelSelectConfiguration',
            selectors: [
              {
                _type: 'ProcessModel',
                id: this.process.id,
                project: {
                  _type: 'Project',
                  id: this.projectId,
                },
              },
            ],
          };
          this.$store
            .dispatch('standard/deleteProcess', [data])
            .then((res) => {
              this.$emit('deleteProcess');
            })
            .finally(() => {
              this.$emit('input', false);
            });
        }
      });
    } else {
      utils.noPermissionAlert(this);
    }
  }
}
</script>