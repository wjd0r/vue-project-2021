<template>
  <b-dropdown class="multiselect" :text="label" ref="dropdown">
    <b-form-group label="Timestamp Filter"/>
    <b-dropdown-divider />
    <b-dropdown-form>
      <b-form-input v-model="label" />
    </b-dropdown-form>
    <b-dropdown-divider />
    <b-dropdown-item class="item-apply">
      <b-button class="btn-outline-primary btn-cancel" variant="outline-primary" size="sm" @click="reset" desc="필터 취소">{{ $t('view.sso.topology.button.filterCancel') }}</b-button>
      <b-button class="btn-primary btn-apply" variant="primary" size="sm" @click="onClick" desc="확인">{{ $t('view.sso.topology.button.confirm') }}</b-button>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { BDropdown } from 'bootstrap-vue';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class TimestampFilter extends Mixins(UtilsMixin) {
  @Prop()
  value!: string;
  label: string = this.value == '' || this.value == null ? 'Timestamp Filter' : this.value;

  $refs!: {
    dropdown: BDropdown;
  };

  mounted() {
    this.$refs.dropdown.$on('show', () => {
      this.label = this.value == '' || this.value == null ? 'yyyy-mm-dd HH:mm:ss' : this.value;
    });

    this.$refs.dropdown.$on('hide', () => {
      this.label = this.value == '' || this.value == null ? 'Timestamp Filter' : this.value;
    });
  }

  onClick() {
    if(this.label == '') {
      this.label = 'Timestamp Filter';
      this.$emit('input', null);
    } else {
      this.$emit('input', this.label);
    }

    this.$emit('change');
    this.$refs.dropdown.hide(true);
  }

  reset() {
    this.label = 'Timestamp Filter';
    this.$emit('input', null);
    this.$emit('change');
    this.$refs.dropdown.hide(true);
  }
}
</script>