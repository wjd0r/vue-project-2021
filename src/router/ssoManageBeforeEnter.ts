import { Route, NavigationGuard } from 'vue-router';
import store from '../store';
type Next = Parameters<NavigationGuard>[2];

const ssoManageBeforeEnter = (to: Route, from: Route, next: Next) => {
    const myInfo = store.getters['sso/getMyInfo'];
    if(myInfo !== null){
        if(myInfo.roleCode == 'GROUP_USER'){
            next('/');
        }
        else {
            next();
        }
    }
    else {
        next({ name: 'Login' });
    }
}

export default ssoManageBeforeEnter;
