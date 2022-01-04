/**
 * @module   ipr/locales/en
 */
/**
 *
 * @author   Iq Reviessay Pulshashi <pulshashi@ideas.web.id>
 * @since    2019
 *
 */
import commonTranslation from './en/en-common';
import routerTranslation from './en/en-router';
import dashboardTranslation from './en/en-dashboard';
import repoTranslation from './en/en-repo';
import processTranslation from './en/en-process';
import ssoTranslation from './en/en-sso';
import settingTranslation from './en/en-setting';
import helpTranslation from './en/en-help';


const englishTranslation = {
  en: {
    language: {
      title: 'English',
    },
    view: {
      ...commonTranslation,
      ...routerTranslation,
      ...repoTranslation,
      ...dashboardTranslation,
      ...processTranslation,
      ...ssoTranslation,
      ...settingTranslation,
      ...helpTranslation
    },
  },
};
export default englishTranslation;
