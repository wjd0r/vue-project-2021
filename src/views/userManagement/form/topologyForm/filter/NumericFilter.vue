<template>
  <b-dropdown class="multiselect" :text="label" block ref="dropdown">
    <b-form-group label="Numeric Filter"/>
    <b-dropdown-divider />
    <b-dropdown-form>
      <b-form-group>
        <b-select v-model="numeric" :options="options" @change="onChange"></b-select>
        <template v-if="isBetween">
          <b-input v-model.number="fromNumber" placeholder="From" @input="onChange" type="number"/>
          <b-input v-model.number="toNumber" placeholder="To" @input="onChange" type="number"/>  
        </template>
        <b-input v-model="fromNumber" placeholder="Filter..." v-else @input="onChange"/>
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
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { UtilsMixin } from '@/mixin';
import { mapGetters } from 'vuex';
import { BDropdown } from 'bootstrap-vue';

@Component({
 components: {
 },
 computed: mapGetters({
 }),
})
export default class NumericFilter extends Mixins(UtilsMixin) {
  @Prop()
  operationType!: string;
  @Prop()
  filterValue!: number;
  @Prop()
  filterValue2!: number;

  options: any = [
    { value: '=', text: '=' },
    { value: '!=', text: '!=' },
    { value: '>', text: '>' },
    { value: '>=', text: '>=' },
    { value: '<', text: '<' },
    { value: '<=', text: '<=' },
    { value: 'Between*', text: 'Between*' },
  ];
  numeric: string = this.operationType == null ? '=' : this.operationType;

  fromNumber: number = this.filterValue;
  toNumber: number = this.filterValue2;
  label: string = 'Numeric Filter';

  isBetween: boolean = this.numeric == 'Between*';

  $refs!: {
    dropdown: BDropdown;
  }

  mounted() {
    this.label = this.isBetween && this.numeric != null && this.fromNumber != null && this.toNumber != null ? `${this.fromNumber} < value < ${this.toNumber}` :
      !this.isBetween && this.numeric != null && this.fromNumber != null ? `value ${this.numeric} ${this.fromNumber}` : 
      this.label;
  }

  onChange() {
    if(this.isBetween && this.fromNumber > this.toNumber) {
      this.fromNumber = this.toNumber;
    }
    this.isBetween = this.numeric == 'Between*';
    this.label = this.isBetween ? `${Number(this.fromNumber)} < value < ${Number(this.toNumber)}` : `value ${this.numeric} ${Number(this.fromNumber)}`;
  }

  onClick() {
    if(this.fromNumber == null || String(this.fromNumber) == '') {
      this.init();
    } else if((this.isBetween && (this.toNumber == null || String(this.toNumber) == ''))) {
      this.init();
    } else {
      if(this.isBetween && this.fromNumber > this.toNumber) {
        this.fromNumber = this.toNumber;
      }
      this.label = this.isBetween ? `${Number(this.fromNumber)} < value < ${Number(this.toNumber)}` : `value ${this.numeric} ${Number(this.fromNumber)}`;
    }

    this.$emit('onOperationType', this.numeric);
    this.$emit('onFilterValue', Number(this.fromNumber));
    this.$emit('onFilterValue2', Number(this.toNumber));
    this.$emit('change');
    this.$refs.dropdown.hide(true);
  }

  init() {
    this.fromNumber = null;
    this.toNumber = null;
    this.label = 'Numeric Filter';
    this.isBetween = false;
  }

  reset() {
    this.label = 'Numeric Filter';
    this.$emit('onOperationType', null);
    this.$emit('onFilterValue', null);
    this.$emit('onFilterValue2', null);
    this.$emit('change');
    this.$refs.dropdown.hide(true);
  }
}
</script>