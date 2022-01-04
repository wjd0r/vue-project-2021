import Vue from 'vue';
import Vuex from 'vuex';

// 웹 새로고침 시 vuex가 내용이 날아가지 않기 위한 라이브러리 (localStorage)
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
const ls = new SecureLS({ isCompression: false });
// tab 끼리 vuex share
import createMutationsSharer from 'vuex-shared-mutations';

import common from './common';
import dashboard from './dashboard';
import datasource from './datasource';
import repository from './repository';
import standard from './standard';
import process from './process';
import logreplay from './logreplay';
import social from './social';
import matrix from './matrix';
import dotted from './dotted';
import gantt from './gantt';

import oauth from './oauth';
import sso from './sso/common';
import company from './sso/company';
import userManage from './sso/user';
import groupManage from './sso/group';
import roleManage from './sso/role';
import menuHistory from './sso/menuHistory';
import loginHistory from './sso/loginHistory';
import workspaceManage from './sso/workspace';

import dataFilter from './dataFilter';
import eventFilter from './eventFilter';

import notification from './notification';
import streaming from './streaming';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    common,
    dashboard,
    datasource,
    repository,
    standard,
    process,
    logreplay,
    social,
    matrix,
    dotted,
    gantt,
    oauth,
    sso,
    company,
    userManage,
    groupManage,
    roleManage,
    menuHistory,
    loginHistory,
    workspaceManage,

    dataFilter,
    eventFilter,

    notification,
    streaming,
  },
  plugins: [
    createPersistedState({
      // prettier-ignore
      paths: [
        'oauth.token',
        'oauth.isRemember',
        'oauth.userAccess',
        'sso.projectId',
        'sso.myInfo',
        'sso.setting',
        'common.eventlog',
        'common.filter',
        'repository.repoEventView',
        'repository.eventInfo',
        'repository.mappings',
        'repository.groupInfo',
        'repository.eventCreateInfo',
        'repository.datasetCreateInfo',
        'repository.uploadDataId',
        'repository.fieldsToImport',
        'repository.datasourceId',
        'standard.filter',
        'eventFilter',
        'dataFilter'
    ],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
    createMutationsSharer({
      predicate: ['oauth/setToken', 'sso/setMyInfo'],
    }),
  ],
});

export default store;
