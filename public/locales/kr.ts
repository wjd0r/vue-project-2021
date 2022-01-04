/**
 * @module   ipr/locales/kr
 */
/**
 *
 * @author   Iq Reviessay Pulshashi <pulshashi@ideas.web.id>
 * @since    2019
 *
 */
import commonTranlation from './kr/kr-common';
import routerTranslation from './kr/kr-router';
import repoTranslation from './kr/kr-repo';
import dashboardTranslation from './kr/kr-dashboard';
import processTranslation from './kr/kr-process';
import ssoTranslation from './kr/kr-sso';
import settingTranslation from './kr/kr-setting';
import helpTranslation from './kr/kr-help';

const koreanTranslation = {
  kr: {
    language: {
      title: '한국어'
    },
    view: {
      ...commonTranlation,
      ...routerTranslation,
      ...repoTranslation,
      ...dashboardTranslation,
      ...processTranslation,
      ...ssoTranslation,
      ...settingTranslation,
      ...helpTranslation
    }
  }
};
export default koreanTranslation;
