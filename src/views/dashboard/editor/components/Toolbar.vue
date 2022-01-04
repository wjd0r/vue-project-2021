<template>
  <div class="top-component">
    <div class="top-content">
      <div class="content-header">
        <div class="title">{{ $t('view.dashboard.editor.title') }}</div>
      </div>
      <div class="content-body">
        <div class="btn-group">
          <b-button variant="outline-secondary" class="btn-clear" @click="onClickReset()">{{ $t('view.dashboard.button.reset') }}</b-button>
          <b-button variant="outline-secondary" class="btn-clear" @click="onClickClear()">{{ $t('view.dashboard.button.clear') }}</b-button>
          <b-button variant="outline-secondary" @click="onClickResize()">{{ $t('view.dashboard.button.size') }}</b-button>
          <b-button variant="outline-secondary" class="btn-save" @click="onClickSave()">{{ $t('view.dashboard.button.save') }}</b-button>
          <b-button variant="outline-secondary" @click="onClickDeleteTab()">{{ $t('view.dashboard.button.tabDelete') }}</b-button>
          <b-button variant="outline-secondary" class="btn-close" @click="onClickExit()">{{ $t('view.dashboard.button.exit') }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IRequestDashboard } from '@/interface/IRequest';

import { AxiosResponse } from 'axios';
import _ from 'lodash';

import { DashboardEditorService } from '../dashboard-editor-service';

@Component({
  components: {},
})
export default class Toolbar extends Vue {
  /* Prop 선언 */
  @Prop()
  service: DashboardEditorService;
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 
 created(){
   
 }
 */
  /*
 mounted() {
   
 }
 */
  /* 메소드 선언 */

  onClickReset() {
    this.service.setLayout(this.service.getOriginLayout());
  }

  onClickClear() {
    this.service.clearLayout();
  }

  onClickResize() {
    EventBus.$emit('resize');
  }

  async onClickSave() {
    if (this.service.getLayout().length === 0) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.editor.alert.save.empty').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'error');
      return;
    }
    const title = this.$t('view.repo.alert.title.save').toString();
    const content = this.$t('view.dashboard.editor.alert.save.check').toString();
    const yesTranslation = this.$t('view.repo.button.yes').toString();
    const noTranslation = this.$t('view.repo.button.no').toString();

    const confirmAnswer = await utils.bvModalmsgBoxConfirm(this, title, content, yesTranslation, noTranslation);

    if (confirmAnswer) {
      this.savePersonalTab();
    }
  }

  async onClickDeleteTab() {
    const title = this.$t('view.repo.alert.title.alarm').toString();
    const content = this.$t('view.dashboard.editor.alert.delete.check').toString();
    const yesTranslation = this.$t('view.repo.button.yes').toString();
    const noTranslation = this.$t('view.repo.button.no').toString();

    const confirmAnswer = await utils.bvModalmsgBoxConfirm(this, title, content, yesTranslation, noTranslation, 'warning');

    if (confirmAnswer) {
      this.$store.dispatch('dashboard/deletePersonalTab', [utils.buildDashboard(this)]).then((res: AxiosResponse) => {
        const okTitle = this.$t('view.repo.alert.title.complete').toString();
        const okContent = this.$t('view.dashboard.editor.alert.delete.finish').toString();
        utils.bvModalmsgBoxOk(this, okTitle, okContent, 'complete').then((res) => {
          this.goDashboard();
        });
      });
    }
  }

  async onClickExit() {
    if (!_.isEqual(this.service.getOriginLayout(), this.service.getLayout())) {
      const title = this.$t('view.dashboard.editor.alert.exit.title').toString();
      const content = this.$t('view.dashboard.editor.alert.exit.content').toString();
      const yesTranslation = this.$t('view.repo.button.yes').toString();
      const noTranslation = this.$t('view.repo.button.no').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yesTranslation, noTranslation, 'warning');

      if (!res) {
        const confirmSave = await this.savePersonalTab();
        if (confirmSave) {
          this.goDashboard();
        }
      } else {
        this.goDashboard();
      }
    } else {
      this.goDashboard();
    }
  }

  async savePersonalTab(): Promise<any> {
    const data = this.buildDashboardConfiguration();
    this.$store.dispatch('dashboard/savePersonalTab', [data]).then((res: AxiosResponse) => {
      this.service.setOriginLayout(this.service.getLayout());
      return utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.save').toString(), this.$t('view.sso.alert.saveComplete').toString(), 'complete');
    });
  }

  goDashboard() {
    this.$router.push({
      name: 'Dashboard',
      params: {
        projectId: this.$route.params.projectId,
        repositoryId: this.$route.params.repositoryId,
      },
    });
  }

  buildDashboardConfiguration() {
    const data: IRequestDashboard = utils.buildDashboard(this);

    data.data = {
      _type: 'DashboardImpl',
      pages: {
        'page-0': {
          _type: 'PageImpl',
          id: 'page-0',
          name: 'PersonalTab',
          widgets: {},
        },
      },
    };

    for (const widget of this.service.getLayout()) {
      const newWidget = _.cloneDeep(widget);
      delete newWidget.moved;
      data.data.pages['page-0'].widgets[widget.i] = newWidget;
    }

    return data;
  }
}
</script>