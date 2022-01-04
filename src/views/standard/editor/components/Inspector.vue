<template>
  <div class="sidebar-editor">
    <div class="content-header" block v-b-toggle.sidebarEditor>
      <div class="title" desc="편집">{{ $t('view.repo.standard.inspectorTitle') }}</div>
      <div class="right-align">
        <div class="ico-arrow-top" alt="방향 아이콘"></div>
      </div>
    </div>
    <b-collapse id="sidebarEditor" visible>
      <div class="content-body">
        <template v-if="cell">
          <ActivityInspector :rappid="rappid" :cell="cell" v-if="cell.get('type') === processTypeEnum.ACTIVITY" />
          <LinkInspector :rappid="rappid" :cell="cell" v-if="cell.get('type') === processTypeEnum.LINK" />
        </template>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { EventBus } from '@/common';
import { dia, Theme } from '@iochord/ipr-fre-ent-core';
import ActivityInspector from './ActivityInspector.vue';
import LinkInspector from './LinkInspector.vue';

@Component({
  components: {
    ActivityInspector,
    LinkInspector,
  },
})
export default class Inspector extends Vue {
  @Prop()
  rappid: any;
  cell: dia.Cell = null;
  processTypeEnum: any = Theme.ProcessTypeEnum;

  mounted() {
    EventBus.$on('createInspector', (selection: dia.Cell) => {
      this.setCell(selection);
    });
  }

  beforeDestroy() {
    EventBus.$off('createInspector');
  }

  private setCell(selection: dia.Cell) {
    const cell = selection;
    this.cell = cell;
  }
}
</script>
