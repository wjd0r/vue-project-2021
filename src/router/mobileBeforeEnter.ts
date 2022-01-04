import { utils } from '@/common';
import { Route, NavigationGuard } from 'vue-router';
type Next = Parameters<NavigationGuard>[2];

const mobileBeforeEnter = (to: Route, from: Route, next: Next) => {
  if (utils.isMobileBlock()) {
    next({ path: '/process-mining/cant' });
  } else {
    next();
  }
};

export default mobileBeforeEnter;
