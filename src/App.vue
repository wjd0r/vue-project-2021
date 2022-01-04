<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  beforeCreate() {
    document.documentElement.className = 'theme-' + this.$store.getters['sso/getSetting'].common.theme;
    if (this.$store.getters['oauth/getToken'] !== null) {
      this.$store.dispatch('sso/getMyInfo', true).then((res) => {
        if (this.$store.getters['sso/getSetting'] != undefined) {
          document.documentElement.className = 'theme-' + this.$store.getters['sso/getSetting'].common.theme;
        }
      });
    }
  }
}
</script>

<style lang="scss">
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';

/* Import Bootstrap Styles */
@import 'bootstrap/dist/css/bootstrap.css';

/* Import Bootstrap Vue Styles */
@import 'bootstrap-vue/dist/bootstrap-vue.css';

/* Import Ag-grid Styles */
@import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.min.css';
@import '@ag-grid-community/all-modules/dist/styles/ag-grid.min.css';

/* Import Ipr Core Styles */
@import '@iochord/ipr-fre-ent-core/dist/ipr-fre-ent-core.min.css';

// Import Main styles for this application
@import './assets/scss/style';

// Table header center-align
.ag-header-cell-label {
  justify-content: center;
}

div.ag-root .ag-cell-focus {
  -webkit-touch-callout: text !important; /* iOS Safari */
  -webkit-user-select: text !important; /* Safari */
  -khtml-user-select: text !important; /* Konqueror HTML */
  -moz-user-select: text !important; /* Old versions of Firefox */
  -ms-user-select: text !important; /* Internet Explorer/Edge */
  user-select: text !important; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>
