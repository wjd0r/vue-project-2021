<template>
  <div class="sidebar-tool">
    <div class="content-header" block v-b-toggle.processTool>
      <div class="title" desc="툴">{{ $t('view.repo.standard.toolTitle') }}</div>
      <div class="right-align">
        <div class="ico-arrow-bottom" alt="방향 아이콘"></div>
      </div>
    </div>
    <b-collapse id="processTool" visible>
      <div class="content-body">
        <div class="action-block" v-draggable data-type="process.Activity">
          <svg width="200" height="65">
            <g data-type="process.Activity" transform="translate(2,2)">
              <rect joint-selector="body" rx="5" ry="5" fill="white" stroke="#8f8f8f" stroke-width="2" stroke-dasharray="0" width="196" height="61"></rect>
              <text joint-selector="label" font-size="17" xml:space="preserve" fill="black" text="" transform="matrix(1,0,0,1,18,10)" font-weight="700"><tspan dy="0.8em">Activity</tspan></text>
            </g>
          </svg>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import $ from 'jquery';
import Hammer from 'hammerjs';
import { utils } from '@/common';

let isDragging = false;
let clone: JQuery<HTMLElement> = null;

@Component({
  components: {},
})
export default class Palette extends Vue {
  @Prop()
  rappid: any;

  mounted() {
    if (utils.isMobile()) {
      this.initHammer();
    }
  }

  initHammer() {
    const self = this;
    $('.action-block').each(function () {
      // create a simple instance on our object
      const mc = new Hammer(this);

      // add a "PAN" recognizer to it (all directions)
      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

      // poor choice here, but to keep it simple
      // setting up a few vars to keep track of things.
      // at issue is these values need to be encapsulated
      // in some scope other than global.

      // tie in the handler that will be called
      mc.on('pan', (evt: HammerInput) => {
        // DRAG STARTED
        // here, let's snag the current position
        // and keep track of the fact that we're dragging
        if (!isDragging) {
          clone = $(this).clone();
          clone.appendTo(document.body);
          clone.css('position', 'absolute');
          clone.css('z-index', '99999');
          clone.css('top', 0);
          isDragging = true;
        }

        // move our element to that position
        const posX = evt.center.x;
        const posY = evt.center.y;

        if (isDragging) {
          clone.css('left', evt.center.x + 'px');
          clone.css('top', evt.center.y + 'px');
        }

        // DRAG ENDED
        // this is where we simply forget we are dragging
        if (evt.isFinal) {
          self.rappid.drawActivity(posX, posY);
          isDragging = false;
          clone.remove();
          clone = null;
        }
      });
    });
  }
}
</script>