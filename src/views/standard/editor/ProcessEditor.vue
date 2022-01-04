<template>
  <div class="main-common-component editor-component">
    <div class="main-common-content editor-content">
      <!-- editor -->
      <div class="left-component">
        <div class="left-content">
          <b-overlay :show="showLoading || repositoryLoading" class="editor-component chart-component d-flex align-items-center justify-content-center w-100 h-100" bg-color="#fff" opacity="1">
            <div id="graph-frame" class="iochord-ipr-graph-container" :style="{ height: '100%', background: 'white' }">
              <div class="top-component">
                <div class="top-content">
                  <div class="content-body">
                    <Toolbar ref="toolbar" :rappid="rappid" />
                    <div class="btn-group">
                      <b-button variant="outline-secondary" class="btn-save" @click="onClickSubmit('save')" desc="저장">{{ $t('view.repo.button.save') }}</b-button>
                      <b-button variant="outline-secondary" v-if="!isDeployed()" class="btn-save" @click="onClickSubmit('deploy')" desc="배포">{{ $t('view.repo.button.deploy') }}</b-button>
                      <b-button variant="outline-secondary" v-else class="btn-save" @click="onClickSubmit('cancel')" desc="배포 취소">{{ $t('view.repo.button.deployCancel') }}</b-button>
                      <b-button variant="outline-secondary" class="btn-close" @click="onClickExit" desc="나가기">{{ $t('view.repo.button.exit') }}</b-button>
                    </div>
                  </div>
                </div>
              </div>
              <Paper ref="paper" id="graph-content" class="iochord-ipr-graph" v-droppable :rappid="rappid" :style="{ position: 'absolute', top: '37px', left: 0, height: 'calc(100% - 37px) !important' }" />
              <div id="graph-navigator" class="iochord-ipr-graph-navigator" :style="{ display: 'block !important' }" />
            </div>
          </b-overlay>
        </div>
      </div>
      <!-- editor -->
      <!-- sidebar -->
      <div class="right-component">
        <div class="right-content">
          <div class="editor-sidebar-component">
            <div class="editor-sidebar-content">
              <!-- 정보 -->
              <div class="sidebar-inf side">
                <div class="content-header" block v-b-toggle.sidebarInf>
                  <div class="title" desc="프로세스 정보">{{ $t('view.repo.form.processInfo') }}</div>
                  <div class="right-align">
                    <div class="ico-arrow-bottom" alt="방향 아이콘"></div>
                  </div>
                </div>
                <b-collapse id="sidebarInf" visible>
                  <div class="content-body">
                    <div class="form-content">
                      <b-form-group id="process-workspace" :label="$t('view.repo.form.workspaceName')" desc="워크스페이스">
                        <b-form-input v-model="processForm.workspace" readonly></b-form-input>
                      </b-form-group>
                      <b-form-group id="process-name" :label="$t('view.repo.form.processName')" desc="프로세스 이름">
                        <b-form-input v-model="processForm.name" readonly></b-form-input>
                      </b-form-group>
                      <b-form-group id="process-desc" :label="$t('view.repo.form.processDesc')" desc="프로세스 설명">
                        <b-form-input v-model="processForm.description" readonly></b-form-input>
                      </b-form-group>
                      <b-form-group v-if="$route.query.id" id="event-group-name" :label="$t('view.repo.form.datasetRepo')" desc="그룹/이벤트">
                        <b-form-input :value="getEventRepositoryName()" readonly></b-form-input>
                      </b-form-group>
                    </div>
                  </div>
                </b-collapse>
              </div>
              <!-- 정보 -->

              <!-- 툴 -->
              <Palette ref="palette" :rappid="rappid" />
              <!-- 툴 -->

              <!-- 편집-->
              <Inspector ref="inspector" :rappid="rappid" />
              <!-- 편집 -->
            </div>
          </div>
          <div class="nav-bottom">
            <div class="help-content" @click="onClickHelp()">
              <div class="nav-ico ico-help" alt="도움말 아이콘"></div>
              <div class="nav-title">{{ $t('view.common.help.title') }}</div>
            </div>
            <div class="logout-content" @click="onClickLogout()">
              <div class="nav-ico ico-logout" alt="로그아웃 아이콘"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- sidebar -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Route } from 'vue-router';
import store from '@/store';
import { EventBus, utils } from '@/common';
import { IKeyValueObject, ISetting } from '@/interface';

import { EditorService, dia, Theme } from '@iochord/ipr-fre-ent-core';

import { AxiosResponse } from 'axios';
import _ from 'lodash';

import Paper from './components/Paper.vue';
import Palette from './components/Palette.vue';
import Inspector from './components/Inspector.vue';
import Toolbar from './components/Toolbar.vue';

interface ISubmitEvent extends Event {
  submitter: HTMLInputElement | HTMLButtonElement;
}

interface IHTMLFormElement {
  onsubmit: (this: GlobalEventHandlers, ev: ISubmitEvent) => any | null;
}

@Component({
  components: {
    Paper,
    Palette,
    Inspector,
    Toolbar,
  },
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    process: 'standard/getProcess',
    dataset: 'repository/getRepoDataView',
    repository: 'repository/getRepoEventView',
    filter: 'standard/getFilter',
    routeFrom: 'standard/getRouteFrom',
    setting: 'sso/getSetting',
  }),
})
export default class ProcessEditor extends Vue {
  readonly projectId!: string;
  readonly process!: IKeyValueObject;
  readonly repository!: IKeyValueObject;
  readonly filter!: IKeyValueObject;
  readonly routeFrom!: Route;
  readonly setting!: ISetting;

  processForm = {
    name: '',
    description: '',
    workspace: '',
  };

  rappid: any = null;

  graphJson: IKeyValueObject = null;

  showLoading: boolean = false;
  repositoryLoading: boolean = false;

  yesTranslation = this.$t('view.repo.button.yes');
  noTranslation = this.$t('view.repo.button.no');

  $refs!: {
    paper: Paper;
    toolbar: Toolbar;
    palette: Palette;
    inspector: Inspector;
  };

  created() {
    if (this.$route.query.byVariant !== undefined) {
      this.getRepository();
    }
    this.getProcess();
  }

  mounted() {
    this.rappid = new EditorService(this.$el, EventBus);

    this.rappid.startRappid();
  }

  getProcess() {
    this.showLoading = true;
    const data = {
      _type: 'ProcessModelSelectConfiguration',
      selectors: [
        {
          _type: 'ProcessModel',
          id: this.$route.params.processId,
          project: {
            _type: 'Project',
            id: this.projectId,
          },
        },
      ],
    };

    this.$store.dispatch('standard/getProcess', [data]).then((res) => {
      const process = res.data.data;
      this.processForm.name = process.name !== null ? process.name : '';
      this.processForm.description = process.description !== null ? process.description : '';
      if (process?.resourceGroup) {
        const workspace = utils.getWorkspaceByRgId(process.resourceGroup.id);
        if (workspace) {
          this.processForm.workspace = workspace.name;
        } else {
          this.processForm.workspace = '-';
        }
      }

      if (!this.$route.query.id) {
        if (process.nodeCount === 0) {
          this.rappid.initializeGraph();
          this.showLoading = false;
        } else {
          this.getGraphJson();
        }
      } else {
        this.getGraph();
      }
    });
  }

  getGraphJson() {
    const data = {
      _type: 'IprResourceSelectConfiguration',
      selectors: [
        {
          id: 'etc' + this.$route.params.processId,
          _type: 'IprResource',
          project: {
            _type: 'Project',
            id: this.projectId,
          },
        },
      ],
    };
    this.$store.dispatch('standard/getGraphJson', [data]).then((res) => {
      if (res.data.data !== null) {
        this.graphJson = res.data.data;
        this.rappid.drawByJson(JSON.parse(res.data.data.remarks));
        this.rappid.zoomToFit();
      } else this.rappid.initializeGraph();
      this.showLoading = false;
    });
  }

  getRepository() {
    this.repositoryLoading = true;
    store.dispatch('repository/getRepoEventView', { projectId: this.projectId, eventId: this.$route.query.id }).then((res) => {
      this.repositoryLoading = false;
    });
  }

  getGraph() {
    const data: any = {
      _type: 'FhmProcessDiscoveryLiteConfiguration',
      repository: {
        _type: 'EventRepository',
        id: this.$route.query.id,
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      },
      positiveObservationThreshold: 0,
      dependencyThreshold: 0,
      addArtificialStartEnd: true,
      displayLimit: 1000,
      useEventBag: this.setting.common.analysis.eventBag,
      calculateNodeRework: false,
      calculateBottleneck: false,
    };
    let algorithm = 'fhm';

    if (this.$route.query.byVariant) {
      data.repository['relations'] = this.filter.relations;
      data.repository.project.id = this.filter.projectId;
      data.eventFilters = [
        {
          _type: 'TimeframeFilterLite',
          minStr: this.filter.min,
          maxStr: this.filter.max,
        },
      ];

      if (this.filter.variantId !== '---') {
        data.eventFilters.push(utils.buildVariantFilter(data.repository, data.eventFilters[0], this.filter.variantId));
      }
      if (this.filter.algorithm === 'fuzzy') {
        delete data.positiveObservationThreshold;
        delete data.dependencyThreshold;
        algorithm = 'fuzzy';
        data._type = 'FuzzyProcessDiscoveryLiteConfiguration';
        data.graphRecomMaxNodes = -1;
        data.nodeSigMin = 0;
        data.nodeSigMax = 1;
        data.arcSigMin = 0;
        data.arcSigMax = 1;
      }
    }

    this.showLoading = true;
    this.$store.dispatch('process/getProcessGraph', { algorithm: algorithm, data: [data] }).then((res: AxiosResponse) => {
      const done = this.rappid.drawGraph(res.data.data);
      if (done) this.showLoading = false;
    });
  }

  /*
   저장/배포 시 validation check할 것
   when 저장
    if error => highlighting and 계속 저장하시겠습니까 alert
      if 계속 저장 yes -> saveGraphJson 
      else not save
    
    when 배포
    if error => only highlighting
  */

  onClickSubmit(type: string) {
    switch (type) {
      case 'save':
      case 'deploy': {
        this.validation(type);
        break;
      }
      case 'cancel': {
        const title = this.$t('view.repo.alert.title.alarm').toString();
        const content = this.$t('view.repo.alert.graphDeployCancel').toString();
        utils.bvModalmsgBoxConfirm(this, title, content, this.yesTranslation.toString(), this.noTranslation.toString(), 'warning').then((res) => {
          if (res) {
            this.cancalDeploy();
          }
        });
        break;
      }
    }
  }

  validation(type: string) {
    const error = this.$refs.toolbar.validation();

    const yesTranslation = this.yesTranslation.toString();
    const noTranslation = this.noTranslation.toString();

    if (error.length > 0) {
      const minQual = _.find(error, (item: any) => {
        if (item.message === this.$t('view.repo.standard.validate.onlyStartEnd') || item.message === this.$t('view.repo.standard.validate.noHaveLink') || item.message === this.$t('view.repo.standard.validate.haveLinkButNotConn')) {
          return item;
        }
      });
      if (minQual !== undefined) {
        utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.validateFailed').toString(), this.$t('view.repo.alert.minQualFail').toString(), 'error');
      } else {
        if (type === 'save') {
          if (this.isDeployed()) {
            utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.validateFailed').toString(), this.$t('view.repo.alert.deployFailByValidate').toString(), 'error');
          } else {
            utils.bvModalmsgBoxConfirm(this, this.$t('view.repo.alert.title.validateFailed').toString(), this.$t('view.repo.alert.graphValidateFailButSave').toString(), yesTranslation, noTranslation, 'warning').then((res) => {
              if (res) {
                this.modifyProcess(false, type);
              }
            });
          }
        } else if (type === 'deploy') {
          utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.validateFailed').toString(), this.$t('view.repo.alert.deployFailByValidate').toString(), 'error');
        }
      }
    } else {
      if (type === 'save') {
        if (this.isDeployed()) {
          const title = this.$t('view.repo.alert.title.alarm').toString();
          const content = this.$t('view.repo.alert.deployedGraphModify').toString();
          utils.bvModalmsgBoxConfirm(this, title, content, yesTranslation, noTranslation, 'warning').then((res) => {
            if (res) {
              this.modifyProcess(true, type);
            } else {
              utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.info').toString(), this.$t('view.repo.alert.notSaveModifiedGraph').toString(), 'warning');
            }
          });
        } else {
          this.modifyProcess(false, type);
        }
      } else if (type === 'deploy') {
        this.modifyProcess(true, type);
      }
    }
  }

  saveGraphJson(type: string) {
    const data: IKeyValueObject = {
      _type: 'IprResourceSaveConfiguration',
      preferredId: this.process.id,
      data: {
        name: 'Custom resource example',
        _type: 'IprResource',
        id: this.graphJson ? this.graphJson.id : null,
        remarks: JSON.stringify(this.rappid.toolbarService.getJson()),
        project: {
          id: this.projectId,
          _type: 'Project',
        },
      },
      saveRelation: 'SKIP',
    };

    if (this.process?.resourceGroup) {
      data.data['resourceGroup'] = {
        _type: 'ResourceGroup',
        id: this.process.resourceGroup.id,
      };
    }

    this.$store.dispatch('standard/saveGraphJson', [data]).then((res) => {
      let content = '';
      if (type === 'save') {
        content = 'graphSaved';
      } else if (type === 'deploy') {
        content = 'graphDeployed';
      }
      this.showLoading = false;
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.complete').toString(), this.$t('view.repo.alert.' + content).toString(), 'complete');
    });
  }

  modifyProcess(isDeploy: boolean, type: string) {
    this.showLoading = true;
    const data: IKeyValueObject = {
      _type: 'ProcessModelSaveConfiguration',
      data: {
        _type: 'ProcessModel',
        id: this.process.id,
        name: this.processForm.name,
        description: this.processForm.description,
        nodes: {} as any,
        arcs: {} as any,
        attributes: this.process.attributes ? _.cloneDeep(this.process.attributes) : {},
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      },
      oneReferenceProcessPerRepository: false,
      saveRelation: 'SKIP',
    };

    if (this.process?.resourceGroup) {
      data.data['resourceGroup'] = {
        _type: 'ResourceGroup',
        id: this.process.resourceGroup.id,
      };
    }

    if (data.data.attributes.isDeployed !== undefined) {
      data.data.attributes.isDeployed.value = isDeploy;
    }

    let index = 0;
    const elements = this.rappid.getElements();
    const links = this.rappid.getLinks();

    _.forEach(elements, (element: dia.Element) => {
      const node = {
        id: element.id === 'VNODE-START' || element.id === 'VNODE-END' ? element.id : 'NODE-' + index,
        elementType: element.id.toString().startsWith('VNODE') ? 'NODE_' + element.id.toString().split('-')[1] : 'NODE',
        name: element.id === 'VNODE-START' || element.id === 'VNODE-END' ? element.id : element.prop(Theme.props.data.name),
        attributes: {} as any,
        style: {
          _type: 'StyleImpl',
          shape: 'rect',
          x: element.get('position').x,
          y: element.get('position').y,
        },
        virtual: element.id === 'VNODE-START' || element.id === 'VNODE-END' ? true : false,
        startNode: false,
        endNode: false,
      };

      if (!node.virtual) {
        node.attributes['std.duration.max'] = {
          _type: 'AttributeImpl',
          id: 'std.duration.max',
          value: element.prop(Theme.props.data.timeValue) * this.getSecondsByTimeUnit(element.prop(Theme.props.data.timeUnit)),
        };

        if (element.prop(Theme.props.data.required) === 0) {
          node.attributes.isOptional = {
            _type: 'AttributeImpl',
            id: 'isOptional',
            value: 1,
          };
        }
      }

      data.data.nodes[node.id] = node;
      if (!node.virtual) index++;
    });

    index = 0;
    let vindex = 0;

    _.forEach(links, (link: dia.Link) => {
      const sourceElement = link.source();
      const targetElement = link.target();
      const arc = {
        id: sourceElement.id === 'VNODE-START' || targetElement.id === 'VNODE-END' ? 'VARC-' + vindex : 'ARC-' + index,
        elementType: sourceElement.id === 'VNODE-START' || targetElement.id === 'VNODE-END' ? 'ARC_ARTIFICIAL' : 'ARC',
        name: `${sourceElement.id === 'VNODE-START' ? 'VNODE-START' : link.prop(Theme.props.data.source)} --> ${targetElement.id === 'VNODE-END' ? 'VNODE-END' : link.prop(Theme.props.data.target)}`,
        sourceRef: '',
        targetRef: '',
        attributes: {
          'std.duration.max': {
            _type: 'AttributeImpl',
            id: 'std.duration.max',
            value: 0,
          },
        } as any,
        virtual: sourceElement.id === 'VNODE-START' || targetElement.id === 'VNODE-END' ? true : false,
      };

      const source = _.find(data.data.nodes, (item: any) => {
        if (sourceElement.id === 'VNODE-START') {
          return item.name === sourceElement.id;
        } else {
          return item.name === link.getSourceElement().prop(Theme.props.data.name);
        }
      });
      const target = _.find(data.data.nodes, (item: any) => {
        if (targetElement.id === 'VNODE-END') {
          return item.name === targetElement.id;
        } else {
          return item.name === link.getTargetElement().prop(Theme.props.data.name);
        }
      });

      arc.sourceRef = source.id;
      arc.targetRef = target.id;

      if (sourceElement.id === 'VNODE-START') {
        data.data.nodes[target.id].startNode = true;
      }
      if (targetElement.id === 'VNODE-END') {
        data.data.nodes[source.id].endNode = true;
      }

      arc.attributes['std.duration.max'].value = link.prop(Theme.props.data.timeValue) * this.getSecondsByTimeUnit(link.prop(Theme.props.data.timeUnit));

      data.data.arcs[arc.id] = arc;
      arc.virtual ? vindex++ : index++;
    });

    this.$store.dispatch('standard/saveProcess', [data]).then((res) => {
      this.saveGraphJson(type);
    });
  }

  cancalDeploy() {
    this.showLoading = true;
    const data: IKeyValueObject = {
      _type: 'ProcessModelSaveConfiguration',
      data: {
        _type: 'ProcessModel',
        id: this.process.id,
        name: this.processForm.name,
        description: this.processForm.description,
        nodes: this.process.nodes ? this.process.nodes : {},
        arcs: this.process.arcs ? this.process.arcs : {},
        attributes: _.cloneDeep(this.process.attributes),
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      },
      oneReferenceProcessPerRepository: false,
      saveRelation: 'SKIP',
    };

    if (this.process?.resourceGroup) {
      data['resourceGroup'] = {
        _type: 'ResourceGroup',
        id: this.process.resourceGroup.id,
      };
    }

    data.data.attributes.isDeployed.value = false;
    this.$store.dispatch('standard/saveProcess', [data]).then((res) => {
      this.showLoading = false;
      utils.bvModalmsgBoxOk(this, this.$t('view.repo.alert.title.complete').toString(), this.$t('view.repo.alert.graphDeployCanceled').toString(), 'complete');
    });
  }

  isDeployed() {
    if (!this.process || this.process.attributes === undefined) {
      return false;
    } else {
      if (this.process.attributes.isDeployed === undefined) {
        return false;
      } else {
        return this.process.attributes.isDeployed.value;
      }
    }
  }

  getSecondsByTimeUnit(unit: string) {
    switch (unit) {
      case 'sec': {
        return 1;
      }
      case 'min': {
        return 60;
      }
      case 'hour': {
        return 3600;
      }
      case 'day': {
        return 86400;
      }
    }
  }

  getEventRepositoryName() {
    if (this.$route.query.byVariant && this.filter.projectId === 'iprdemo') {
      return this.$t('view.' + this.repository.name);
    } else {
      if (this.repository && this.repository.id === this.$route.query.id) {
        let dataset = '';
        if (this.repository.attributes['origin.dataset'] !== undefined) {
          dataset = this.repository.attributes['origin.dataset'].value.name;
        } else if (this.repository.attributes['origin.repository']) {
          dataset = this.repository.attributes['origin.repository'].value.attributes['origin.dataset'].value.name;
        }
        return `${dataset} - ${this.repository.name}`;
      } else {
        return '';
      }
    }
  }

  onClickHelp() {
    EventBus.$emit('showHelp');
  }

  onClickExit() {
    if (this.routeFrom === null) {
      this.$router.push({ name: 'StandardList' });
    } else if (this.routeFrom.name !== 'StandardList' && this.routeFrom.name !== 'StandardCreateForm') {
      this.$router.go(-1);
    } else {
      this.$router.push({ name: 'StandardList' });
    }
  }

  nameState() {
    return this.processForm.name.length > 0;
  }

  onClickLogout() {
    EventBus.$emit('closeSSE');

    this.$store.dispatch('oauth/logout');
    this.$store.dispatch('sso/logout');
    this.$router.push({ name: 'Login' });
  }
}
</script>