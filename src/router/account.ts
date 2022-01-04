import { RouteConfig } from 'vue-router';
import BaseContainer from '../containers/Full.vue';
import BaseNoSideContainer from '../containers/FullNoSidebar.vue';

import Login from '../views/account/Login.vue';
import AcountAuth from '../views/account/AcountAuth.vue';
import MeModify from '../views/account/Me.vue';
import ForgotPassword from '../views/account/ForgotPassword.vue';

const route = [
  {
    path: '/process-mining',
    component: BaseContainer,
    children:[
      {
        path: 'me/modify',
        name: 'MeModify',
        component: MeModify
      }
    ]
  },
  {
    path: '/process-mining/account',
    component: BaseNoSideContainer,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'auth/:id/:code/:state',
        name: 'AcountAuthentication',
        component: AcountAuth
      },
      {
        path: 'forgot/:email/:code',
        name: 'ForgotPassword',
        component: ForgotPassword
      },
     
    ]
  }
] as RouteConfig[];
export default route;
