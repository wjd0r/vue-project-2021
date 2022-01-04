<template>
  <div class="toolbar-container">
    <div class="btn-group">
      <b-button variant="outline-secondary" @click="onClickUndo" id="tooltip-undo">
        <div class="ico-undo" alt="실행 취소 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickRedo" id="tooltip-redo">
        <div class="ico-redo" alt="다시 실행 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickClear" id="tooltip-clear">
        <div class="ico-clear" alt="초기화 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickOpenAsSVG" id="tooltip-svg">
        <div class="ico-svg" alt="SVG 파일 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickOpenAsPNG" id="tooltip-png">
        <div class="ico-png" alt="Png 파일 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickToggleFullScreen" id="tooltip-full-screen">
        <div class="ico-full-screen" alt="전체화면 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickApplyOnSelection('toFront')" id="tooltip-front">
        <div class="ico-front" alt="맨 앞으로 보내기 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickApplyOnSelection('toBack')" id="tooltip-back">
        <div class="ico-back" alt="맨 뒤로 보내기 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickLayoutDirectedGraph" id="tooltip-graph-align">
        <div class="ico-graph-align" alt="그래프 정렬 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickZoomToFit" id="tooltip-zoom-fit">
        <div class="ico-zoom-fit" alt="한번에 보기 아이콘"></div>
      </b-button>
      <b-button variant="outline-secondary" @click="onClickReport" id="tooltip-error-report">
        <div class="ico-error-report" alt="유효성 검사 아이콘"></div>
      </b-button>
    </div>
    <b-modal id="showReport" v-model="showReport" :title="$t('view.repo.alert.title.validateFailed').toString()" desc="유효성 검사 실패" centered hide-footer>
      <div class="content-body">
        <template v-for="(item, i) in errorReport">
          <li v-if="item.message !== ''" :key="i" class="error-text">{{ item.message }}</li>
        </template>
      </div>
      <b-button variant="primary" class="btn-event" @click="showReport = false">{{ $t('view.repo.button.ok') }}</b-button>
    </b-modal>

    <b-tooltip target="tooltip-undo" triggers="hover" desc="실행 취소">{{ $t('view.repo.tooltip.undo') }}</b-tooltip>
    <b-tooltip target="tooltip-redo" triggers="hover" desc="다시 실행">{{ $t('view.repo.tooltip.redo') }}</b-tooltip>
    <b-tooltip target="tooltip-clear" triggers="hover" desc="초기화">{{ $t('view.repo.tooltip.clear') }}</b-tooltip>
    <b-tooltip target="tooltip-svg" triggers="hover" desc="SVG로 내보내기">{{ $t('view.repo.tooltip.exportSvg') }}</b-tooltip>
    <b-tooltip target="tooltip-png" triggers="hover" desc="PNG로 내보내기">{{ $t('view.repo.tooltip.exportPng') }}</b-tooltip>
    <b-tooltip target="tooltip-full-screen" triggers="hover" desc="전체화면">{{ $t('view.repo.tooltip.fullscreen') }}</b-tooltip>
    <b-tooltip target="tooltip-front" triggers="hover" desc="맨 앞으로 가져오기">{{ $t('view.repo.tooltip.toFront') }}</b-tooltip>
    <b-tooltip target="tooltip-back" triggers="hover" desc="맨 뒤로 보내기">{{ $t('view.repo.tooltip.toBack') }}</b-tooltip>
    <b-tooltip target="tooltip-graph-align" triggers="hover" desc="그래프 정렬">{{ $t('view.repo.tooltip.graphLayout') }}</b-tooltip>
    <b-tooltip target="tooltip-zoom-fit" triggers="hover" desc="한번에 보기">{{ $t('view.repo.tooltip.zoomToFit') }}</b-tooltip>
    <b-tooltip target="tooltip-error-report" triggers="hover" desc="유효성 검사">{{ $t('view.repo.tooltip.graphValidate') }}</b-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils, ValidationCheck } from '@/common';
import { IKeyValueObject } from '@/interface';
import { dia, Theme } from '@iochord/ipr-fre-ent-core';
import _ from 'lodash';

@Component({
  computed: mapGetters({
    process: 'standard/getProcess',
  }),
})
export default class Toolbar extends Vue {
  @Prop()
  rappid: any;

  process!: IKeyValueObject;

  errorReport: any[] = [];
  showReport: boolean = false;

  onClickUndo() {
    EventBus.$emit('createInspector', null);
    this.rappid.toolbarService.undo();
  }

  onClickRedo() {
    EventBus.$emit('createInspector', null);
    this.rappid.toolbarService.redo();
  }

  onClickClear() {
    this.rappid.initializeGraph();
    this.rappid.zoomToFit(150);
  }

  onClickOpenAsSVG() {
    this.rappid.toolbarService.openAsSVG(this.process.name);
  }

  onClickOpenAsPNG() {
    this.rappid.toolbarService.openAsPNG(this.process.name);
  }

  onClickToggleFullScreen() {
    if (window.innerHeight === screen.height) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  onClickApplyOnSelection(method: string) {
    this.rappid.toolbarService.applyOnSelection(method);
  }

  onClickLayoutDirectedGraph() {
    this.rappid.layoutDirectedGraph();
    this.rappid.zoomToFit(150);
  }

  onClickZoomToFit() {
    this.rappid.zoomToFit(50);
  }

  validation() {
    const elements = this.rappid.getElements();
    const links = this.rappid.getLinks();

    this.errorReport = [];

    let activityReport: any[] = [];
    let arcReport: any[] = [];

    let hasActivity = false;
    const activities: any[] = [];
    const arcs: any[] = [];

    // 중복 값 가져오기
    const count = (names: any) => names.reduce((a: any, b: any) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});
    const duplicates = (dict: any) => Object.keys(dict).filter((a) => dict[a] > 1);

    // 액티비티 (노드) 검사
    _.forEach(elements, (element: joint.dia.Element) => {
      // Start, End 아닌 element 찾기
      if (element.get('type') !== Theme.ProcessTypeEnum.START && element.get('type') !== Theme.ProcessTypeEnum.END) hasActivity = true;
      const id = element.get('id');
      const name = element.prop(Theme.props.data.name);

      // 중복된 이름 찾기 위한 이름 array
      activities.push(name);

      // 아크가 없는 노드 찾기
      const getConnectedLinks = this.rappid.graph.getConnectedLinks(element);
      if (_.isEmpty(getConnectedLinks)) {
        activityReport.push({ message: this.$t('view.repo.standard.validate.unConnectedActivity') + name, id: id });
      }

      let hasSource = false;
      let hasTarget = false;

      _.forEach(getConnectedLinks, (link: joint.dia.Link) => {
        if (link.prop(Theme.props.data.source) === name) hasSource = true;
        if (link.prop(Theme.props.data.target) === name) hasTarget = true;
      });

      // 시작 노드인데 종료 액티비티로 연결되었을 때
      if (id === 'VNODE-START' && hasTarget) {
        activityReport.push({ message: this.$t('view.repo.standard.validate.startConnectByTarget'), id: id });
      }

      // 종료 노드인데 시작 액티비티로 연결되었을 때
      if (id === 'VNODE-END' && hasSource) {
        activityReport.push({ message: this.$t('view.repo.standard.validate.endConnectBySource'), id: id });
      }

      // 일반 노드 중 시작, 종료 액티비티로 연결되지 않았을 때
      if (id !== 'VNODE-START' && id !== 'VNODE-END') {
        if (!hasSource) activityReport.push({ message: this.$t('view.repo.standard.validate.unConnectedActivityAtSource') + name, id: id });
        if (!hasTarget) activityReport.push({ message: this.$t('view.repo.standard.validate.unConnectedActivityAtTarget') + name, id: id });
      }

      if (id === 'VNODE-START' || id === 'VNODE-END') return;

      // 이름 체크: 빈값
      if (_.isEmpty(name)) {
        activityReport.push({ message: this.$t('view.repo.standard.validate.emptyNameActivity') + id, id: id });
      }
      // // 이름 체크: 기본 이름
      // if (name === 'Activity') {
      //   errorReport.push({ message: 'Default Name Activity: ' + id, id: id });
      // }
      // // 이름 체크: START
      if (name === 'START') {
        activityReport.push({ message: this.$t('view.repo.standard.validate.activityNameisStart'), id: id });
      }
      // // 이름 체크: END
      if (name === 'END') {
        activityReport.push({ message: this.$t('view.repo.standard.validate.activityNameisEnd'), id: id });
      }
      // 이름 체크: 정규식 (한글, 영어, 숫자, single, double quote를 제외한 키보드에서 쓸 수 있는 특수문자)
      const validate = ValidationCheck.checkRegExp(ValidationCheck.Type.English_Koreanm_Number_Special, name);
      if (validate.state === false) {
        activityReport.push({ message: this.$t('view.repo.standard.validate.activityNameBendRule') + name, id: id });
      }

      // 소요시간 기준 값 체크: 숫자인지
      if (typeof element.prop(Theme.props.data.timeValue) !== 'number') {
        activityReport.push({ message: this.$t('view.repo.standard.validate.activityTimeValueNotNumber') + name, id: id });
      }
      // 소요시간 기준 값 체크: 0 보다 작은 수
      if (element.prop(Theme.props.data.timeValue) < 0) {
        activityReport.push({ message: this.$t('view.repo.standard.validate.activityTimeValueNotOverZero') + name, id: id });
      }
    });

    //중복된 액티비티 error 추가
    const duplActReports: any[] = [];
    const duplicatedActivities = duplicates(count(activities));

    if (!hasActivity) duplActReports.push({ message: this.$t('view.repo.standard.validate.onlyStartEnd') });

    duplicatedActivities.forEach((item: string) => {
      const duplicatedCells = elements.filter((cell: dia.Element) => {
        return cell.prop(Theme.props.data.name) === item;
      });
      duplicatedCells.forEach((cell: dia.Cell, index: number) => {
        duplActReports.push({
          message: index !== 0 ? '' : this.$t('view.repo.standard.validate.duplatedActiviy') + item,
          id: cell.get('id'),
        });
      });
    });

    activityReport = _.concat(duplActReports, activityReport);

    links.forEach((link: dia.Link) => {
      const source = link.getSourceElement();
      const target = link.getTargetElement();
      const dataSource = link.prop(Theme.props.data.source);
      const dataTarget = link.prop(Theme.props.data.target);
      const id = link.get('id');
      // source가 연결되지 않은 link 찾기
      if (!source) {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkUnConnectedSource') + dataSource + ' -> ' + dataTarget, id: id });
      }
      // target가 연결되지 않은 link 찾기
      if (!target) {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkUnConnectedTarget') + dataSource + ' -> ' + dataTarget, id: id });
      }
      // START->END link 있는지
      if (source && target && source.id === 'VNODE-START' && target.id === 'VNODE-END') {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkHaveFromStartToEnd'), id: id });
      }
      // source에 END로 되어있는지
      if (link.prop(Theme.props.data.source) === 'END') {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkSourceIsEnd') + dataSource + ' -> ' + dataTarget, id: id });
      }
      // target에 START로 되어있는지
      if (link.prop(Theme.props.data.target) === 'START') {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkTargetIsStart') + dataSource + ' -> ' + dataTarget, id: id });
      }
      // 소요시간 기준 값 체크: 숫자인지
      if (typeof link.prop(Theme.props.data.timeValue) !== 'number') {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkTimeValueNotNumber') + dataSource + ' -> ' + dataTarget, id: id });
      }
      // 소요시간 기준 값 체크: 0 보다 작은 수
      if (link.prop(Theme.props.data.timeValue) < 0) {
        arcReport.push({ message: this.$t('view.repo.standard.validate.linkTimeValueNotOverZero') + dataSource + ' -> ' + dataTarget, id: id });
      }
      // 중복된 연결 찾기 위한 이름 array (같은 이름의 activity가 있을 수 있으니 element.id가 동일한지를 체크한다)
      arcs.push(`${source?.id}->${target?.id}`);
    });

    // 중복된 아크 error 추가
    const duplArcReports: any[] = [];
    const duplicatedLinks = duplicates(count(arcs));

    if (arcs.length < 2) {
      duplArcReports.push({ message: this.$t('view.repo.standard.validate.noHaveLink') });
    } else if (arcs.length === 2) {
      const result = _.find(arcs, (item: string) => {
        return item.includes('undefined');
      });
      if (result) {
        duplArcReports.push({ message: this.$t('view.repo.standard.validate.haveLinkButNotConn') });
      }
    }
    duplicatedLinks.forEach((item: string) => {
      const arrows = item.split('->');
      const duplicatedCells = links.filter((cell: dia.Link) => {
        const source = cell.getSourceElement();
        const target = cell.getTargetElement();
        return source ? source.id : 'undefined' === arrows[0] && target ? target.id : 'undefined' === arrows[1];
      });
      duplicatedCells.forEach((cell: dia.Link, index: number) => {
        duplArcReports.push({
          message: index !== 0 ? '' : this.$t('view.repo.standard.validate.duplatedLink') + cell.prop(Theme.props.data.source) + ' -> ' + cell.prop(Theme.props.data.target),
          id: cell.id,
        });
      });
    });

    arcReport = _.concat(duplArcReports, arcReport);

    const errorReport = _.concat(activityReport, arcReport);

    return errorReport;
  }

  onClickReport() {
    this.errorReport = this.validation();

    this.rappid.unhighlightError();

    if (this.errorReport.length > 0) {
      this.showReport = true;

      this.errorReport.forEach((err: any) => {
        if (err.id) this.rappid.paper.findViewByModel(this.rappid.graph.getCell(err.id)).highlight(null, this.rappid.errorHighlighter);
      });
    } else {
      // 유효성 검사 성공
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.validate').toString(), this.$t('view.repo.alert.graphValidateSuccess', 'complete').toString());
    }
  }
}
</script>