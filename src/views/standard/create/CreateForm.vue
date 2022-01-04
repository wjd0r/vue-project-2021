<template>
  <!-- 표준 프로세스 생성 -->
  <b-form class="main-common-commponent create-component" @submit.prevent="onClickNext()">
    <div class="main-common-content create-content">
      <!-- flowbar -->
      <FlowBarStepThree mode="standard" :stage="1" />
      <!-- flowbar -->

      <!-- form - standard -->
      <div class="standard-create-component">
        <div class="standard-create-content create-common-content">
          <StandardForm ref="form" mode="create" :showDatasetLoading="datasetLoading" @submitEvent="createProcess()" />
        </div>
      </div>
      <!-- form - standard -->
    </div>
    <!-- bottom -->
    <div class="bottom-component">
      <div class="bottom-content">
        <div class="btn-group">
          <b-button type="submit" variant="primary" class="btn-primary" :disabled="showLoading">
            <b-spinner v-if="showLoading" small></b-spinner>
            <template v-else>
              {{ $t('view.repo.button.saveForm') }}
            </template>
          </b-button>
          <b-button variant="secondary" class="btn-secondary" @click="onClickCancel()">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <b-overlay :show="showFlowBox" no-wrap no-fade class="overlay-flow">
      <template #overlay><CreateFlow @onSightDay="onSightDay" @close="showFlowBox = false" /></template>
    </b-overlay>
  </b-form>
  <!-- 표준 프로세스 생성 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { IKeyValueObject, ISetting } from '@/interface';

import { AxiosError } from 'axios';
import _ from 'lodash';
import moment from 'moment';

import FlowBarStepThree from '../../components/flows/FlowBarStepThree.vue';
import CreateFlow from './components/CreateFlow.vue';
import StandardForm from '../components/StandardForm.vue';

@Component({
  components: {
    FlowBarStepThree,
    CreateFlow,
    StandardForm,
  },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    projectId: 'sso/getProjectId',
    byVariant: 'standard/getByVariant',
    setting: 'sso/getSetting',
  }),
})
export default class StandardCreateForm extends Vue {
  /* Prop 선언 */
  readonly myInfo!: IKeyValueObject;
  readonly projectId!: string;
  readonly byVariant!: boolean;
  readonly setting!: ISetting;
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  processList: IKeyValueObject = {};

  showLoading: boolean = false;
  datasetLoading: boolean = true;

  showFlowBox: boolean = true;

  /* refs 선언 */
  $refs!: {
    form: StandardForm;
  };

  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    // 하루동안 보이지 않기
    this.showFlowBox = this.setting.sightDay.dataset != moment().format('YYYY-MM-DD');

    this.getDatasetList();
  }

  /* 메소드 선언 */
  getDatasetList() {
    this.$store.dispatch('repository/getRepoDataIndex', { projectId: this.projectId, iprResourceGroupId: this.$route.params.rgId }).then((res) => {
      this.datasetLoading = false;
    });
  }

  onClickNext() {
    if (this.showLoading) {
      return;
    }
    this.$refs.form.checkRelations();
  }

  createProcess() {
    this.showLoading = true;
    const data: IKeyValueObject = {
      _type: 'ProcessModelSaveConfiguration',
      oneReferenceProcessPerRepository: false,
      data: {
        _type: 'ProcessModel',
        name: this.$refs.form.processForm.name,
        description: this.$refs.form.processForm.description,
        nodes: {},
        arcs: {},
        attributes: {
          isDeployed: {
            _type: 'AttributeImpl',
            id: 'isDeployed',
            value: false,
          },
        },
        relations: {},
        project: {
          _type: 'Project',
          id: this.projectId,
        },
        resourceGroup: {
          _type: 'ResourceGroup',
          id: this.$route.params.rgId,
        },
      },
    };

    for (let i = 0; i < this.$refs.form.processForm.relations.length; i++) {
      data.data.relations[this.$refs.form.processForm.relations[i].id] = {
        _type: 'EventRepositoryImpl',
        id: this.$refs.form.processForm.relations[i].id,
        name: this.$refs.form.processForm.relations[i].name,
        project: this.$refs.form.processForm.relations[i].project,
      };
    }

    this.$store
      .dispatch('standard/saveProcess', [data])
      .then((res) => {
        if (this.byVariant) {
          this.$router
            .push({
              name: 'ProcessEditor',
              params: { projectId: this.projectId, rgId: this.$route.params.rgId, processId: res.data.data.id },
              query: { id: this.$route.query.id, byVariant: 'yes' },
            })
            .then((res) => {
              this.$store.commit('standard/setByVariant', false);
            });
        } else {
          this.$router.push({
            name: 'ProcessEditor',
            params: {
              processId: res.data.data.id,
            },
          });
        }
      })
      .catch((err: AxiosError) => {
        const header = err.response.headers;
        if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
          utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.cantCreateTitle').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
        }
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  onSightDay(sightDay: boolean) {
    if (sightDay) {
      this.setting.sightDay.process = moment().format('YYYY-MM-DD');
    } else {
      this.setting.sightDay.process = '';
    }

    this.$store.dispatch('sso/setSetting', {
      id: this.myInfo.id,
      config: { ...this.setting },
    });
  }

  onClickCancel() {
    this.$router.push({
      name: 'StandardList',
    });
  }
}
</script>