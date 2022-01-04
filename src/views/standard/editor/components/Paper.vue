<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import $ from 'jquery';

@Component({})
export default class Paper extends Vue {
  @Prop()
  rappid: any;

  add(event: JQuery.Event, ui: any) {
    const dragEl = $(ui.draggable);
    this.rappid.drawActivity(ui.position.left, ui.position.top);
  }
}
</script>