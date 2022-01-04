<template>
  <div class="content-body">
    <div class="content-header">
      <h5 class="title">{{ $t('view.repo.form.standardProcess') }}</h5>
      <div class="right-align">
        <div class="notice-text">(*) {{ $t('view.repo.label.required') }}</div>
      </div>
    </div>
    <div class="form-content">
      <b-form-group id="standard-name" :label="`${$t('view.repo.form.processName')} (*)`" label-cols="2" desc="표준 프로세스 이름" :invalid-feedback="nameState.feedback">
        <b-form-input :value="processForm.name" @input.native="processForm.name = $event.target.value.trim()" :state="nameState.state" autofocus required :placeholder="$t('view.repo.form.putProcessName')" maxlength="255" autocomplete="off"></b-form-input>
      </b-form-group>
      <b-form-group id="standard-desc" :label="$t('view.repo.form.processDesc')" label-cols="2" desc="표준 프로세스 설명" :invalid-feedback="descState.feedback">
        <b-form-input :value="processForm.description" @input.native="processForm.description = $event.target.value.trim()" :placeholder="$t('view.repo.form.putProcessDesc')" :state="descState.state" maxlength="255"></b-form-input>
      </b-form-group>
      <b-form-group v-if="$route.query.id" id="selected-repository" label="선택한 이벤트로그" label-cols="2" desc="선택한 이벤트로그">
        <b-form-input :value="selectedRepository" disabled></b-form-input>
      </b-form-group>
    </div>

    <!-- 이벤트 등록 -->
    <div class="standard-list-component">
      <div class="standard-list-content create-common-content">
        <div class="content-header">
          <h5 class="title">{{ $t('view.repo.form.selectRepo') }}</h5>
        </div>
        <div class="content-middle">
          <div class="form-content">
            <b-form-group id="group-select" :label="$t('view.repo.form.selectDataset')" label-cols="2" desc="그룹 선택">
              <b-form-select v-model="selectedDataset" class="mb-1" @change="getRepositoryList()" :disabled="(mode === 'create' && showDatasetLoading) || showLoading">
                <b-form-select-option value="---" desc="전체">{{ $t('view.repo.form.all') }}</b-form-select-option>
                <template v-for="(v, k) in sortedDatasetList">
                  <b-form-select-option v-if="isSameWorkspace(v)" :key="k" :value="v.id">{{ v.name }}</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </div>
        </div>
        <div class="content-body">
          <div class="selection-list" :class="{ 'w-100': mode === 'modify' }">
            <div class="left-content">
              <div class="content-header" desc="데이터셋 - 이벤트로그">{{ $t('view.repo.form.datasetRepo') }}</div>
              <b-overlay :show="(mode === 'create' && showDatasetLoading) || showLoading || repositoryList.length === 0" no-fade bg-color="#fff" opacity="1">
                <draggable class="content-body conent-body-left" ref="leftContent" :list="repositoryList" :group="{ name: 'repository', pull: leftPullEvent, put: false, draggable: '.item' }" :sort="false" :disabled="isMobile">
                  <div class="item" :class="{ active: item.id === selectedLeft.id && !getRelation(item.id), 'd-none': getRelation(item.id) }" v-for="(item, index) in repositoryList" :key="'left_' + item.id" @click="onClickRepository(item.id, index, 'left')">
                    <div class="ico-item" :class="`ico-${getDatasetIcon(item.id)}`"></div>
                    <div class="item-text">{{ getDatasetName(item) }}</div>
                    <div class="ico-item" :class="`ico-log${getRepositoryIcon(item)}`"></div>
                    <div class="item-text">{{ item.name }}</div>
                  </div>
                </draggable>
                <template #overlay>
                  <div v-if="repositoryList.length === 0" class="nodata-text w-max-content">{{ $t('view.repo.alert.noEventRegistered') }}</div>
                </template>
              </b-overlay>
            </div>
            <div class="btn-group">
              <b-button variant="outline-secondary" class="btn-move" @click="onClickAddRepository()">+</b-button>
              <b-button variant="outline-secondary" class="btn-move" @click="onClickRemoveRepository()">-</b-button>
            </div>
            <div class="right-content">
              <div class="content-header" desc="등록된 데이터셋 - 이벤트로그">{{ $t('view.repo.form.selectedDatasetRepo') }}</div>
              <draggable class="content-body conent-body-right" :list="processForm.relations" :group="{ name: 'repository', draggable: '.item' }" :sort="false" @end="endEvent" :disabled="isMobile">
                <template v-for="(item, index) in processForm.relations">
                  <div class="item" :class="{ active: item.id === selectedRight.id }" :key="'right_' + item.id" @click="onClickRepository(item.id, index, 'right')">
                    <div class="ico-item" :class="`ico-${getDatasetIcon(item.id)}`" alt="표준 프로세스 아이콘"></div>
                    <div class="item-text">{{ getDatasetName(item) }}</div>
                    <div class="ico-item" :class="`ico-log${getRepositoryIcon(item)}`"></div>
                    <div class="item-text">{{ item.name }}</div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
        <div class="notice-text m-none">{{ $t('view.repo.alert.registerHelp') }}</div>
        <div class="notice-text m-notice">{{ $t('view.repo.alert.registerHelpButton') }}</div>
      </div>
    </div>
    <!-- 이벤트 등록 -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils, ValidationCheck } from '@/common';
import { IKeyValueObject } from '@/interface';

import _ from 'lodash';

import Draggable from 'vuedraggable';

@Component({
  components: {
    Draggable,
  },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    process: 'standard/getProcess',
    byVariant: 'standard/getByVariant',
    datasetList: 'repository/getRepoDataIndex',
    filter: 'standard/getFilter',
  }),
})
export default class StandardForm extends Vue {
  @Prop({})
  mode!: 'create' | 'modify';

  @Prop({})
  showDatasetLoading?: boolean;

  projectId!: string;
  process!: IKeyValueObject;
  datasetList!: IKeyValueObject;
  byVariant!: boolean;
  filter!: IKeyValueObject;

  processForm = {
    name: '',
    description: '',
    relations: [] as any[],
  };

  repositoryList: any[] = [];

  selectedDataset: string = '---';
  selectedLeft = {
    id: '',
    index: -1,
  };
  selectedRight = {
    id: '',
    index: -1,
  };

  showLoading: boolean = false;

  $refs!: {
    leftContent: any;
  };

  @Watch('toggleResource')
  onToggleResourceChanged() {
    this.selectedLeft.id = '';
    this.selectedLeft.index = -1;
    this.selectedRight.id = '';
    this.selectedRight.index = -1;
  }

  created() {
    this.getRepositoryList();
    if (this.mode === 'modify') {
      let name = '';
      if (this.process.name !== null) {
        name = this.process.name;
      }
      this.processForm.name = name;
      this.processForm.description = this.process.description !== null ? this.process.description : '';
      this.processForm.relations = _.values(this.process.relations).filter((item) => item._type.startsWith('EventRepository'));
    }
  }

  get sortedDatasetList() {
    return _.orderBy(this.datasetList.elements, ['name'], 'asc');
  }

  getRepositoryList() {
    this.showLoading = true;
    this.$store.dispatch('repository/getRepoEventIndex', { projectId: this.projectId, datasetId: this.selectedDataset !== '---' ? this.selectedDataset : null, resourceGroupId: this.mode === 'create' ? this.$route.params.rgId : this.process.resourceGroup.id }).then((res) => {
      const data = res.data.data;
      this.repositoryList = data?.elements ? _.values(data.elements) : [];
      this.showLoading = false;
    });
  }

  checkRelations() {
    if (!this.nameState.state) {
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.alarm').toString(), this.nameState.feedback, 'warning');
      return;
    }

    if (this.descState.state === false) {
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.alarm').toString(), this.descState.feedback, 'warning');
      return;
    }

    this.$emit('submitEvent');
  }

  onClickAddRepository() {
    if (this.selectedLeft.index === -1) return;
    const index = _.findIndex(this.processForm.relations, ['id', this.selectedLeft.id]);
    if (index === -1) this.processForm.relations.push(_.cloneDeep(this.repositoryList[this.selectedLeft.index]));
    this.selectedLeft.id = '';
    this.selectedLeft.index = -1;
  }

  onClickRemoveRepository() {
    this.processForm.relations.splice(this.selectedRight.index, 1);
    this.selectedRight.id = '';
    this.selectedRight.index = -1;
  }

  onClickRepository(id: string, index: number, direction: string) {
    if (direction === 'left') {
      this.selectedLeft.id = id;
      this.selectedLeft.index = index;
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    } else if (direction === 'right') {
      this.selectedRight.id = id;
      this.selectedRight.index = index;
      this.selectedLeft.id = '';
      this.selectedLeft.index = -1;
    }
  }

  getRelation(id: string) {
    const index = _.findIndex(this.processForm.relations, ['id', id]);
    return index !== -1 ? true : false;
  }

  getDatasetName(repo: any) {
    if (repo?.attributes && repo.attributes['origin.dataset']) {
      return repo.attributes['origin.dataset'].value.name;
    } else {
      const _id = repo.id.split('_');
      return !_.isEmpty(this.datasetList) ? this.datasetList.elements[_id[0]].name : '';
    }
  }

  getDatasetIcon(id: string) {
    const _id = id.split('_');
    const dataset = !_.isEmpty(this.datasetList) ? this.datasetList.elements[_id[0]] : undefined;
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
    let haveType;
    if (!repo.attributes) {
      if (repo.originType) {
        haveType = repo.originType;
      }
    } else {
      if (repo.attributes['origin.dataset'] !== undefined) {
        haveType = repo.attributes['origin.dataset'].value.originType;
      }
    }

    if (haveType) {
      switch (haveType) {
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
    } else {
      return '';
    }
  }

  leftPullEvent(to: any, from: any, dragEl: Element, evt: Event) {
    return dragEl.classList.contains('disabled') ? false : 'clone';
  }

  endEvent(evt: any) {
    const originEvent = evt.originalEvent;

    if (this.$refs.leftContent.$el.contains(originEvent.target)) {
      evt.item.remove();
      this.processForm.relations.splice(evt.oldDraggableIndex, 1);
    }
  }

  get nameState() {
    return ValidationCheck.check(ValidationCheck.Type.English_Koreanm_Number_Special, 3, 255, this.processForm.name);
  }

  get descState() {
    if (_.isEmpty(this.processForm.description)) {
      return {
        state: null,
        feedback: '',
      };
    } else {
      return ValidationCheck.checkRegExp(ValidationCheck.Type.English_Koreanm_Number_Special, this.processForm.description);
    }
  }

  close() {
    if (this.mode === 'create' && this.byVariant) {
      this.$store.commit('standard/setByVariant', false);
    }
    this.$emit('close');
  }

  finish() {
    if (this.mode === 'create' && this.byVariant) {
      this.$store.commit('standard/setByVariant', false);
    }
    this.$emit('finish');
  }

  get selectedRepository() {
    if (this.filter.projectId === 'iprdemo') {
      return this.$t('view.repo.demo.' + (this.$route.query.id as string).split('_')[0].split('ids')[1]);
    } else {
      const index = this.repositoryList.findIndex((item) => item.id === this.$route.query.id);
      if (index !== -1) {
        return this.repositoryList[index].name;
      } else {
        return '';
      }
    }
  }

  getProcessCount(repository: IKeyValueObject) {
    if (repository.relationCount === 0) {
      return '';
    } else {
      if (repository.relations !== undefined) {
        let count = 0;
        const relations: IKeyValueObject = repository.relations;
        for (const [key, value] of Object.entries(relations)) {
          if (value._type === 'ProcessModel') {
            count++;
          }
        }
        return `(${count})`;
      } else {
        return '';
      }
    }
  }

  isSameWorkspace(dataset: any) {
    if (this.mode === 'create') {
      return dataset?.resourceGroup?.id === this.$route.params.rgId;
    } else {
      return dataset?.resourceGroup?.id === this.process.resourceGroup.id;
    }
  }

  get isMobile() {
    return utils.isMobile();
  }
}
</script>