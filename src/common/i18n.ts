import Vue from 'vue';
import VueI18n from 'vue-i18n';
import LangEN from '../../public/locales/en';
import LangKR from '../../public/locales/kr';

Vue.use(VueI18n)

const messages = {
  ...LangEN,
  ...LangKR,
};

const i18n = new VueI18n({
  locale: 'kr',
  fallbackLocale: 'kr',
  messages,
});

export default i18n;
