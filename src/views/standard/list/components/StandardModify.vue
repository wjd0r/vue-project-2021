<template>
  <b-overlay :show="showLoading" class="standard-form-component" bg-color="#f2f2f2" opacity="1">
    <b-form @submit.prevent="onClickModify()">
      <div class="standard-form-content">
        <div class="content-header">
          <h4 class="title" desc="프로세스 수정">{{ $t('view.repo.form.processModify') }}</h4>
        </div>
        <StandardForm ref="form" mode="modify" @submitEvent="modifyProcess()" />
      </div>
      <div class="content-footer">
        <div class="btn-group">
          <b-button type="submit" variant="primary" class="btn-primary">{{ $t('view.repo.button.modify') }}</b-button>
          <b-button variant="secondary" class="btn-secondary" @click="$emit('close')">{{ $t('view.repo.button.cancel') }}</b-button>
        </div>
      </div>
    </b-form>
  </b-overlay>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { IKeyValueObject } from '@/interface';

import { AxiosError } from 'axios';
import _ from 'lodash';

import StandardForm from '../../components/StandardForm.vue';

@Component({
  components: {
    StandardForm,
  },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    process: 'standard/getProcess',
    byVariant: 'standard/getByVariant',
  }),
})
export default class StandardModify extends Vue {
  readonly projectId!: string;
  process!: IKeyValueObject;

  showLoading: boolean = false;

  $refs!: {
    form: StandardForm;
  };

  onClickModify() {
    if (this.showLoading) {
      return;
    }
    this.$refs.form.checkRelations();
  }

  async modifyProcess() {
    const yesTranslation = this.$t('view.repo.button.yes').toString();
    const noTranslation = this.$t('view.repo.button.no').toString();
    const title = this.$t('view.repo.alert.standard.modify.title').toString();
    const content = this.$t('view.repo.alert.standard.modify.content').toString();

    const answer = await utils.bvModalmsgBoxConfirm(this, title, content, yesTranslation, noTranslation, 'warning');
    if (answer) {
      this.$emit('input', true);
      this.showLoading = true;

      const data: IKeyValueObject = {
        _type: 'ProcessModelSaveConfiguration',
        oneReferenceProcessPerRepository: false,
        data: {
          _type: 'ProcessModel',
          id: this.$refs.form.process.id,
          name: this.$refs.form.processForm.name,
          description: this.$refs.form.processForm.description,
          nodes: this.process.nodes ? _.cloneDeep(this.process.nodes) : {},
          arcs: this.process.arcs ? _.cloneDeep(this.process.arcs) : {},
          attributes: this.process.attributes ? _.cloneDeep(this.process.attributes) : {},
          relations: {},
          project: {
            _type: 'Project',
            id: this.projectId,
          },
        },
      };

      if (this.process?.resourceGroup) {
        data.data['resourceGroup'] = {
          _type: 'ResourceGroup',
          id: this.process.resourceGroup.id,
        };
      }

      const originRelations = _.values(this.process.relations).filter((item) => !item._type.startsWith('EventRepository'));

      for (const item of originRelations) {
        data.data.relations[item.id] = item;
      }

      for (let i = 0; i < this.$refs.form.processForm.relations.length; i++) {
        if (this.$refs.form.processForm.relations[i]._type.startsWith('EventRepository')) {
          data.data.relations[this.$refs.form.processForm.relations[i].id] = {
            _type: 'EventRepositoryImpl',
            id: this.$refs.form.processForm.relations[i].id,
            name: this.$refs.form.processForm.relations[i].name,
            project: this.$refs.form.processForm.relations[i].project,
          };
        } else {
          data.data.relations[this.$refs.form.processForm.relations[i].id] = this.$refs.form.processForm.relations[i];
        }
      }

      this.$store
        .dispatch('standard/saveProcess', [data])
        .then((res) => {
          //edit complete
          utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.standard.modify.title').toString(), this.$t('view.repo.alert.standard.modify.successContent').toString(), 'complete').then((res) => {
            this.showLoading = false;
            this.$emit('finish');
          });
        })
        .catch((err: AxiosError) => {
          this.showLoading = false;
          this.$emit('input', false);
          const header = err.response.headers;
          if (header['x-ioc-code'] !== undefined && this.$te('view.repo.alert.' + header['x-ioc-code'])) {
            utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.cantModifyTitle').toString(), this.$t('view.repo.alert.' + header['x-ioc-code']).toString(), 'error');
          }
        });
    }
  }
}
</script>