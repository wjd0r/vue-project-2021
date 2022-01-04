<template>
  <div v-if="open">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class WindowPortal extends Vue {
  @Model('close', { type: Boolean })
  readonly open!: boolean;
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  windowRef: Window = null;

  /* refs 선언 */

  /* Watch 선언 */
  @Watch('open', { immediate: true })
  onOpenChanged(newValue: boolean) {
    if (newValue) {
      this.openPortal();
    } else {
      this.closePortal();
    }
  }

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  // created() {}

  mounted() {
    if (this.open) {
      this.openPortal();
    }
  }

  beforeDestroy() {
    if (this.windowRef) {
      this.closePortal();
    }
  }

  /* 메소드 선언 */

  openPortal() {
    const maxHeight = document.body.clientHeight;
    this.windowRef = window.open(this.modifyUrl(), '', `width=1200,height=${maxHeight},left=200,top=5`);
    if (this.windowRef == null || this.windowRef == undefined) {
      utils.bvModalmsgBoxOk(this, this.$t('view.common.alert.allowPopup').toString(), 'warning');
    }
    this.windowRef.document.body.appendChild(this.$el);
    this.windowRef.addEventListener('beforeunload', this.closePortal);
  }

  modifyUrl() {
    const baseURL = window.location.href.split('/process-mining')[0];
    let openUrl = `${baseURL}/process-mining/help`;
    switch (this.$route.name) {
      case 'ProcessEditor':
      case 'Dashboard':
      case 'DashboardEditor':
      case 'Home':
      case 'EventList':
      case 'StandardList':
      case 'DatabaseSource':
      case 'ProcessDiscovery': //프로세스 분석
      case 'DeltaAnalysis': // 프로세스 비교
      case 'LogReplay': // 프로세스 애니메이션
      case 'SocialAnalysis': // 리소스 관계 분석
      case 'MatrixModel': // 데이터 분석
      case 'Dotted': // 액티비티 분석
      case 'ProcessFlow':
      case 'Gantt': // 간트 차트
      case 'DatasetCreateForm':
      case 'DatasetPreview':
      case 'DatasetDataImporting':
      case 'DatasetNextStep':
      case 'RepositoryCreateForm':
      case 'RepositoryMappingCheck':
      case 'RepositoryCreateComplete':
      case 'DatasetFilterCreateForm': // 서브 데이터셋 정보 입력
      case 'DatasetDataFilterSelect':
      case 'DatasetDataFiltering':
      case 'SubRepositoryCreateForm':
      case 'SubRepositoryFilter':
      case 'SubRepositoryFiltering':
        openUrl += '#help-' + this.$route.name.toLowerCase();
        break;
      case 'DatasetMappingSelect':
        openUrl += '#help-' + 'DatasetMappingSelect'.toLowerCase();
        break;
      case 'DatasetMappingCheck':
      case 'DatasetCreateComplete':
        openUrl += '#help-' + 'DatasetCreateComplete'.toLowerCase();
        break;
      case 'RepositoryNextStep':
      case 'RepositoryMappingSelect':
        openUrl += '#help-' + 'RepositoryMappingSelect'.toLowerCase();
        break;
      case 'StandardCreateForm':
      case 'StandardCreateNextStep':
        openUrl += '#help-' + 'StandardCreateForm'.toLowerCase();
        break;
    }
    return openUrl;
  }

  closePortal() {
    if (this.windowRef) {
      this.windowRef.removeEventListener('beforeunload', this.closePortal);
      this.windowRef.close();
      this.windowRef = null;
      this.$emit('close', false);
    }
  }
}
</script>