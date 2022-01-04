<template>
  <b-dropdown class="multiselect" :text="label" block ref="dropdown">
    <b-form-group label="String Filter"/>
    <b-dropdown-divider />
    <b-dropdown-form>
      <b-form-group>
        <b-form-checkbox v-model="allSelected" :indeterminate="indeterminate" aria-describedby="options" aria-controls="options" @change="toggleAll">
          {{ allSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
        <b-form-checkbox-group v-model="selected" :options="options" class="ml-1" aria-label="Individual options" stacked />
      </b-form-group>
    </b-dropdown-form>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item class="item-apply">
      <b-button class="btn-outline-primary btn-cancel" variant="outline-primary" size="sm" @click="reset" desc="필터 취소">{{ $t('view.sso.topology.button.filterCancel') }}</b-button>
      <b-button class="btn-primary btn-apply" variant="primary" size="sm" @click="onClick" desc="확인">{{ $t('view.sso.topology.button.confirm') }}</b-button>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Mixins, Component, Watch, Prop } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { BDropdown } from 'bootstrap-vue';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class StringFilter extends Mixins(UtilsMixin) {
  @Prop()
  value!: string;

  @Prop()
  options!: Array<string>;
  
  selected: any = [];
  allSelected: boolean = false;
  indeterminate: boolean = false;
  label: string = this.value == '' || this.value == null ? 'String Filter' : this.value;

  mounted() {
    if(this.label == 'all') {
      this.toggleAll(true);
    } else if(this.label != 'String Filter') {
      this.selected = this.label.split(',');
    }

    this.$refs.dropdown.$on('hide', () => {
      this.label = this.value == '' || this.value == null ? 'String Filter' : this.value;
      if(this.label == 'all') {
        this.toggleAll(true);
      } else if(this.label != 'String Filter') {
        this.selected = this.label.split(',');
      } else {
        this.selected = [];
      }
    });
  }

  $refs!: {
    dropdown: BDropdown;
  };

  toggleAll(checked: boolean) {
    this.selected = checked ? this.options.slice() : [];
  }

  onClick() {
    this.$emit('input', this.label == 'String Filter' ? null : this.label);
    this.$emit('change');
    this.$refs.dropdown.hide(true);
  }

  @Watch('selected', { deep: true })
  onSelected(newValue: any) {
    // Handle changes in individual flavour checkboxes
    if (newValue.length === 0) {
      this.indeterminate = false
      this.allSelected = false
      this.label = 'String Filter';
    } else if (newValue.length === this.options.length) {
      this.indeterminate = false
      this.allSelected = true
      this.label = 'all';
    } else {
      this.indeterminate = true
      this.allSelected = false
      this.label = this.selected.join();
    }
  }

  reset() {
    this.label = 'String Filter';
    this.selected = [];
    this.allSelected = false;
    this.indeterminate = false;
    this.$emit('input', null);
    this.$emit('change');
    this.$refs.dropdown.hide(true);
  }
}
</script>