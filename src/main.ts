import './common/class-component-hooks';
import 'core-js/stable';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Notifications from 'vue-notification';
import * as $ from 'jquery';
import ipr from '@iochord/ipr-fre-ent-core';

import { i18n } from './common';

import { draggable, droppable } from './directives';

import { ValidationObserver } from 'vee-validate';

import MQ from 'vue-match-media';

Vue.component('ValidationObserver', ValidationObserver);

Vue.directive('draggable', draggable);
Vue.directive('droppable', droppable);

Vue.use(MQ);

Vue.config.productionTip = false;
Vue.config.performance = true;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications);
Vue.use(ipr.vuePlugin);

const W: any = window;
W.$ = W.jQuery = $;

W.instance = new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
