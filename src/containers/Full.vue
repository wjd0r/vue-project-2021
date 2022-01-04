<template>
  <div class="app" :class="{ 'editor-page': $route.name === 'DashboardEditor' || $route.name === 'ProcessEditor' }">
    <AppHeader />
    <div class="app-body">
      <AppSidebar v-if="$route.name !== 'DashboardEditor' && $route.name !== 'ProcessEditor'" />
      <main class="main pusher" :class="{ 'editor-page no-transition': $route.name === 'DashboardEditor' || $route.name === 'ProcessEditor' }">
        <div class="contents-components">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <notifications group="error" :duration="5000" :width="500" position="top left" />
    <AppHelp />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppHeader, AppSidebar, AppHelp } from '../components/index';

@Component({
  components: {
    AppHeader,
    AppSidebar,
    AppHelp,
  },
})
export default class Full extends Vue {}
</script>
