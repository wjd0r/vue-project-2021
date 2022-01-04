<template>
  <!-- 경로 -->
  <div class="breadcrumb-component">
    <b-breadcrumb class="breadcrumb-content">
      <b-breadcrumb-item class="gray">
        <div class="ico-breadcrumb ico-folder-disabled"></div>
        {{ workspace }}
      </b-breadcrumb-item>
      <b-breadcrumb-item class="gray">
        <div class="ico-breadcrumb" :class="`ico-${datasetIcon}-disabled`"></div>
        {{ dataset }}
      </b-breadcrumb-item>
      <b-breadcrumb-item class="active">
        <div class="ico-breadcrumb" :class="`ico-log${repositoryIcon}`"></div>
        {{ repository }}
      </b-breadcrumb-item>
      <!-- <b-breadcrumb-item class="standard active">
        <div class="ico-breadcrumb ico-flow-standard"></div>
        표준 프로세스
      </b-breadcrumb-item> -->
    </b-breadcrumb>
  </div>
  <!-- 경로 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { utils } from '@/common';
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    eventView: 'repository/getRepoEventView',
  }),
})
export default class BreadcrumbRoute extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  readonly myInfo: any;
  readonly eventView: any;

  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 메소드 선언 */
  get workspace() {
    if (this.$route.params.projectId !== 'iprdemo') {
      const results = utils.getWorkspaceByRgId(this.eventView.resourceGroup.id);
      if (results) {
        return results.name;
      } else {
        return '-';
      }
    } else {
      return '-';
    }
  }

  get dataset() {
    if (this.$route.params.projectId !== 'iprdemo') {
      if (this.datasetAttr !== null) {
        return this.datasetAttr.name;
      } else {
        return '';
      }
    } else {
      return this.$t('view.repo.demo.dataset');
    }
  }

  get datasetIcon() {
    switch (this.datasetAttr.originType) {
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

  get repository() {
    if (this.$route.params.projectId !== 'iprdemo') {
      return this.eventView.name;
    } else {
      return this.$t(`view.repo.demo.${this.eventView.id.split('_')[0].substring(3)}`);
    }
  }

  get repositoryIcon() {
    switch (this.datasetAttr.originType) {
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

  get datasetAttr() {
    const attrs = this.eventView.attributes;
    if (attrs['origin.dataset'] !== undefined) {
      return this.eventView.attributes['origin.dataset'].value;
    } else if (attrs['origin.repository'] !== undefined) {
      return this.eventView.attributes['origin.repository'].value.attributes['origin.dataset'].value;
    } else {
      return null;
    }
  }
}
</script>