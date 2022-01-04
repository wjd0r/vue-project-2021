<template>
  <div class="modal-common-component topologe-instance-component" :class="`lang-${$i18n.locale}`">
    <div class="modal-common-content topologe-instance-content">
      <div class="top-component">
        <div class="top-content">
          <div class="back" @click.prevent="$emit('close')">
            <div class="ico-arrow-left" alt="왼쪽 방향 아이콘"></div>
            <div class="back-text">{{ $t('view.repo.label.back') }}</div>
          </div>
        </div>
      </div>
      <div class="manage-form-component template-component">
        <TopologyTemplateForm ref="form" @close="$emit('close')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import Topology from '../ts/Topology';
import TopologyTemplateForm from '../form/topologyForm/TopologyTemplateForm.vue';

@Component({
  components: {
    TopologyTemplateForm,
  },
  computed: mapGetters({
  }),
})
export default class TopologyTemplateModal extends Vue {
  topology: Topology = this.$parent.$parent.$data.topology;

  created() {
    return
  }
}
</script>
