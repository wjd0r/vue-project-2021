import { Vue, Component, Ref } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import _ from 'lodash';

import Breadcrumb from '../views/components/Breadcrumb.vue';
import { IKeyValueObject } from '@/interface';
import { AxiosError } from 'axios';

@Component({
  components: {
    Breadcrumb,
  },
  computed: mapGetters({
    eventView: 'repository/getRepoEventView',
  }),
})
export default class AnalysisMixin extends Vue {
  readonly eventView!: IKeyValueObject;

  repositoryLoading: boolean = false;

  @Ref('breadcrumb') breadcrumbRef: Breadcrumb;

  beforeCreate() {
    this.$store.commit('common/setVariant', null);
    this.$store.commit('common/setVariantId', this.$route.name !== 'DeltaAnalysis' ? '' : { leftId: '', rightId: '' });
  }

  created() {
    const params = this.$route.params;
    if (_.isEmpty(this.eventView) || params.projectId !== this.eventView.project.id || params.repositoryId !== this.eventView.id) {
      this.repositoryLoading = true;
      this.getRepository(params.projectId, params.repositoryId).then((res) => {
        this.repositoryLoading = false;
      });
    } else {
      this.putProcessMenuHistory(this.getHistoryCode());
    }
  }

  getRepository(projectId: string, repositoryId: string) {
    return this.$store
      .dispatch('repository/getRepoEventView', {
        projectId: projectId,
        eventId: repositoryId,
        loadRelation: 'FULL',
      })
      .then((res) => {
        return res;
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 404) {
          this.$router.push('*');
        }
      });
  }

  putProcessMenuHistory(featureId: string) {
    this.$store.dispatch('menuHistory/useProessMenu', {
      featureId: `process.${featureId}`,
      workspaceId: this.eventView?.resourceGroup ? this.eventView.resourceGroup.id : null,
      eventLogId: this.eventView.id,
      data: {
        workspaceId: this.eventView?.resourceGroup ? this.eventView.resourceGroup.id : null,
        workspaceName: this.eventView?.resourceGroup ? this.eventView.resourceGroup.name : null,
        eventLogId: this.eventView.id,
        eventLogName: this.eventView.name,
      },
    });
  }

  getHistoryCode() {
    switch (this.$route.name) {
      case 'Dashboard': {
        return 'dashboard';
      }
      case 'ProcessDiscovery': {
        return 'discovery';
      }
      case 'DeltaAnalysis': {
        return 'delta';
      }
      case 'LogReplay': {
        return 'logReplay';
      }
      case 'SocialAnalysis': {
        return 'social';
      }
      case 'MatrixModel': {
        return 'matrix';
      }
      case 'Dotted': {
        return 'dotted';
      }
      case 'Gantt': {
        return 'gantt';
      }
      case 'ProcessFlow': {
        return 'flow';
      }
    }
  }
}
