import Vue from 'vue';
import store from '../store';
import { i18n } from '../common';
import { IAttributeFilter, ICaseFilter, IKeyValueObject, IRequestDashboard, IRequestProcess, IRequestRepository, ITimeEventFilter, IVariantFilter } from '@/interface';
import { AxiosError } from 'axios';
import moment from 'moment';
import _ from 'lodash';

function numberWithCommas(x: number | string): string {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
function toDDHHMMSS(time: string | number, dayUnit: string): string {
  const timeNumber = typeof time === 'string' ? parseInt(time, 10) : Number(time.toFixed(0));
  const sec_num = Math.abs(timeNumber); // don't forget the second param
  const days: number = Math.floor(sec_num / 86400);
  let hours: any = Math.floor((sec_num - days * 86400) / 3600);
  let minutes: any = Math.floor((sec_num - (days * 86400 + hours * 3600)) / 60);
  let seconds: any = sec_num - days * 86400 - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const minus = timeNumber < 0 ? '-' : '';
  const string = hours + ':' + minutes + ':' + seconds;
  return days === 0 ? minus + string : minus + days + dayUnit + ' ' + string;
}
function toYYYYMMDDHHMMSSbyDuration(time: string) {
  const timeNumber = parseInt(time, 10);
  let sec_num = Math.abs(timeNumber);
  const years: any = Math.floor(sec_num / 31536000);
  sec_num -= years * 31536000;
  const months: any = Math.floor(sec_num / 2592000);
  sec_num -= months * 2592000;
  const days: any = Math.floor(sec_num / 86400);
  sec_num -= days * 86400;
  let hours: any = Math.floor(sec_num / 3600);
  sec_num -= hours * 3600;
  let minutes: any = Math.floor(sec_num / 60);
  let seconds: any = (sec_num -= minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const minus = timeNumber < 0 ? '-' : '';
  return minus + (years > 0 ? years + 'Y ' : '') + (months > 0 ? months + 'M ' : '') + (days > 0 ? days + 'D ' : '') + hours + ':' + minutes + ':' + seconds;
}
function bvModalmsgBoxOk(vue: Vue, title: string, message: string, iconClass?: string) {
  const h = vue.$createElement;
  // Using HTML string
  const titleVNode = h('div', { domProps: { innerHTML: `${iconClass ? `<div class="ico-${iconClass}"></div>` : ''}<h4 class="title">${title}</h4` }, class: 'd-flex-row' });
  return vue.$bvModal
    .msgBoxOk(message, {
      title: [titleVNode],
      size: 'sm',
      buttonSize: 'sm',
      bodyClass: 'warning-message',
      centered: true,
      okTitle: i18n.t('view.repo.button.ok').toString(),
    })
    .then((res) => {
      return res;
    });
}
function bvModalmsgBoxConfirm(vue: Vue, title: string, message: string, okTitle: string = '예', cancelTitle: string = '아니오', iconClass?: string): Promise<any> {
  const h = vue.$createElement;
  // Using HTML string
  const titleVNode = h('div', { domProps: { innerHTML: `${iconClass ? `<div class="ico-${iconClass}"></div>` : ''}<h4 class="title">${title}</h4` }, class: 'd-flex-row' });
  return vue.$bvModal
    .msgBoxConfirm(message, {
      title: [titleVNode],
      size: 'sm',
      buttonSize: 'sm',
      bodyClass: 'warning-message',
      centered: true,
      okTitle: okTitle,
      cancelTitle: cancelTitle,
    })
    .then((res) => {
      return res;
    });
}
function haveReferenceModel(eventView: IKeyValueObject) {
  const referenceModel = eventView.referenceModel;
  if (referenceModel !== undefined) {
    return referenceModel._type.endsWith('Model') || referenceModel._type.endsWith('Graph') || referenceModel._type.endsWith('GraphImpl');
  } else {
    return false;
  }
}
function isPMDeployed(eventView: IKeyValueObject) {
  let haveDeployedPM = false;
  const referenceModel = eventView.referenceModel;
  const relations: IKeyValueObject = eventView.relations;
  if (referenceModel !== undefined) {
    if (referenceModel._type.endsWith('Model') || referenceModel._type.endsWith('Graph') || referenceModel._type.endsWith('GraphImpl')) {
      haveDeployedPM = true;
    }
  } else {
    if (relations !== undefined) {
      for (const [key, item] of Object.entries(relations)) {
        if (item._type.endsWith('Model') || item._type.endsWith('Graph') || item._type.endsWith('GraphImpl')) {
          if (item.attributes === undefined || item.attributes.isDeployed === undefined) {
            continue;
          } else {
            if (item.attributes.isDeployed.value === true) {
              haveDeployedPM = true;
              break;
            }
          }
        }
      }
    }
  }
  return haveDeployedPM;
}
function isFieldExist(eventView: IKeyValueObject, field: string | string[]) {
  if (typeof field === 'string') {
    return eventView.fields[field] !== undefined;
  } else {
    // array에 다 존재할 시
    let result = true;
    for (const item of field) {
      if (eventView.fields[item] === undefined) {
        result = false;
        break;
      }
    }
    return result;
  }
}
function buildRepository(vue: Vue): IRequestRepository {
  return {
    _type: 'EventRepository',
    id: vue.$route.params.repositoryId,
    project: {
      _type: 'Project',
      id: vue.$route.params.projectId,
    },
    resourceGroup: {
      _type: 'ResourceGroup',
      id: store.getters['repository/getRepoEventView'].resourceGroup.id,
    },
  };
}
function buildProcess(vue: Vue, processId: string): IRequestProcess {
  return {
    _type: 'ProcessDependentConfiguration',
    process: {
      _type: 'ProcessModel',
      id: processId,
      project: {
        _type: 'Project',
        id: vue.$route.params.projectId,
      },
    },
  };
}
function buildTimeEventFilter(): ITimeEventFilter {
  return {
    _type: 'TimeframeFilterLite',
    minStr: moment(store.getters['common/getFilter'].duration.start).format('YYYY-MM-DD HH:mm:ss'),
    maxStr: moment(store.getters['common/getFilter'].duration.end)
      .endOf('days')
      .format('YYYY-MM-DD HH:mm:ss'),
    keepCases: store.getters['sso/getSetting'].common.analysis.keepCases,
  };
}
function buildTokenFilter(): IAttributeFilter | ICaseFilter {
  const filter = store.getters['common/getFilter'];
  switch (filter.tokenInclude) {
    case 'ea':
    case 'eo':
    case 'er': {
      return {
        _type: 'AttributeFilterLite',
        attribute: filter.tokenInclude,
        values: [filter.tokenValue],
      };
    }
    case 'ci': {
      return {
        _type: 'CaseFilterLite',
        values: [filter.tokenValue],
      };
    }
  }
}
function buildVariantFilter(repository: IRequestRepository, tiemEventFilter: ITimeEventFilter, id: string): IVariantFilter {
  const filter = store.getters['common/getFilter'];
  const request: IVariantFilter = {
    _type: 'TraceVariantFilterLite',
    config: {
      _type: 'TraceVariantDiscoveryLiteConfiguration',
      repository: repository,
      option: store.getters['common/getFilter'].variantType,
      eventFilters: [tiemEventFilter],
    },
    values: [id],
  };

  if (filter.tokenInclude && filter.tokenInclude !== '---') {
    request.config.eventFilters.push(buildTokenFilter());
  }

  return request;
}
function buildDashboard(vue: Vue): IRequestDashboard {
  return {
    _type: 'DashboardConfigurationLiteImpl',
    repository: {
      _type: 'EventRepository',
      project: {
        _type: 'Project',
        id: store.getters['sso/getProjectId'],
      },
    },
  };
}
function getRepoPermissions(createdBy: number | string, resourceType: string, action: string) {
  let isCandoit = false;
  const myInfo = store.getters['sso/getMyInfo'];
  if (createdBy == myInfo.id) isCandoit = true;
  else {
    const permissions = myInfo.permissions[`repo.${resourceType}.${action}`];
    if (permissions === 'GROUP') isCandoit = true;
  }
  return isCandoit;
}
function getPermissionCode(projectId: string, groupId: string, resourceGroupId: string, resourceCode: string, operationCode: string) {
  return `provider.ipr.iprProjectId.${projectId}.group.${groupId}.IprResourceGroupId.${resourceGroupId}/ipr.${resourceCode}.${operationCode}`;
}
function checkPermission(projectId: string, groupId: string, resourceGroupId: string, resourceCode: string, operationCode: string, createdBy?: number | string) {
  let isCandoit = false;
  const myInfo = store.getters['sso/getMyInfo'];
  if ((operationCode === 'view' || operationCode === 'update' || operationCode === 'delete') && createdBy == myInfo.id) isCandoit = true;
  else {
    if (myInfo.permissions[getPermissionCode('*', '*', '*', resourceCode, operationCode)]) {
      isCandoit = true;
    } else if (myInfo.permissions[getPermissionCode(projectId, '*', '*', resourceCode, operationCode)]) {
      isCandoit = true;
    } else if (myInfo.permissions[getPermissionCode(projectId, groupId, resourceGroupId, resourceCode, operationCode)]) {
      const permissions = myInfo.permissions[getPermissionCode(projectId, groupId, resourceGroupId, resourceCode, operationCode)];
      isCandoit = permissions.isAllow;
    }
  }
  return isCandoit;
}
function noPermissionAlert(vue: Vue) {
  bvModalmsgBoxOk(vue, i18n.t('view.repo.alert.title.noPermission').toString(), i18n.t('view.repo.alert.noPermission').toString());
}
function isNoNeedTokenSSO(name: string) {
  switch (name) {
    case 'Login':
    case 'userRegister':
    case 'acountAuthentication':
    case 'forgotPassword':
    case 'Help': {
      return true;
    }
    default: {
      return false;
    }
  }
}
function getWorkspaceById(id: number) {
  return _.find(store.getters['sso/getMyInfo'].workspaces, ['id', id]);
}
function getWorkspaceByRgId(rgId: string) {
  return _.find(store.getters['sso/getMyInfo'].workspaces, ['iprResourceGroupId', rgId]);
}
function bytesFormatter(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function percentFormatter(value: number, max: number) {
  const percent = (value / max) * 100;

  if (percent < 100) {
    return percent.toFixed(2) + '%';
  } else {
    return '100%';
  }
}

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)) {
    return true;
  } else {
    if (/MacIntel/i.test(navigator.platform) && navigator.maxTouchPoints === 5) {
      return true;
    } else {
      return false;
    }
  }
}

function isMaxWidth991() {
  if (window.matchMedia('(max-width: 991.98px)').matches) {
    /* 뷰포트 너비가 991.98px 픽셀 이하 */
    return true;
  } else {
    /* 뷰포트 너비가 991.98px 픽셀 초과 */
    return false;
  }
}

function isMaxWidth767() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    /* 뷰포트 너비가 767px 픽셀 이하 */
    return true;
  } else {
    /* 뷰포트 너비가 768px 픽셀 이상 */
    return false;
  }
}

function isMaxWidth1099() {
  if (window.matchMedia('(max-width: 1099px)').matches) {
    /* 뷰포트 너비가 1099px 픽셀 이하 */
    return true;
  } else {
    /* 뷰포트 너비가 1099px 픽셀 초과 */
    return false;
  }
}

function isMobileBlock() {
  return isMobile() && isMaxWidth767();
}

function getMq() {
  return {
    mq: {
      phone: '(max-width: 767px)',
      tablet: '(max-width: 1099px)',
      desktop: '(min-width: 1100px)',
    },
  };
}

function handlerError(vue: Vue, err: AxiosError) {
  return new Promise(function(resolve, reject) {
    let code: string = '';
    let message: string = null;

    // 메시지를 api에서 직접 넣어주는 경우가 있음
    if (err.response != undefined && 
        err.response.data != undefined &&
        err.response.data.info != undefined &&
        err.response.data.info.description != undefined &&
        err.response.data.info.description.employeeNumber != undefined) {
      code = err.response.data.info.messageCode;
      message = err.response.data.info.description.employeeNumber
    }

    else if (err.response != undefined) {
      code = err.response.headers['x-ioc-code'];
      message = null;
    } else {
      code = null;
      message = null;
    }

    const title = i18n.t('view.repo.alert.title.error').toString();
    message =
      code == null ? i18n.t(`view.repo.alert.SSO_ERR_500_00010001`).toString() :
      message == null ? i18n.t(`view.repo.alert.${code}`).toString() :
      message;
    
    bvModalmsgBoxOk(vue, title, message, 'error');

    resolve({
      title: title,
      message: message,
    });
  });
}

export default {
  numberWithCommas,
  toDDHHMMSS,
  toYYYYMMDDHHMMSSbyDuration,
  bvModalmsgBoxOk,
  bvModalmsgBoxConfirm,
  haveReferenceModel,
  isPMDeployed,
  isFieldExist,
  buildRepository,
  buildProcess,
  buildTimeEventFilter,
  buildVariantFilter,
  buildTokenFilter,
  buildDashboard,
  getRepoPermissions,
  checkPermission,
  noPermissionAlert,
  isNoNeedTokenSSO,
  getWorkspaceById,
  getWorkspaceByRgId,
  bytesFormatter,
  percentFormatter,
  isMobile,
  isMaxWidth991,
  isMaxWidth767,
  isMaxWidth1099,
  isMobileBlock,
  getMq,
  handlerError,
};
