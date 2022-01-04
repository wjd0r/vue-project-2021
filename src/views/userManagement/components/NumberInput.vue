<template>
  <b-input-group>
    <b-input class="spin" type="number" min="-1" v-model="data" ref="numberInput" :state="state" :disabled="disabled" @change="vmodel"></b-input>
    <b-input-group-append>
      <b-button variant="outline-secondary" @click="up"><b-icon icon="arrow-up"/></b-button>
      <b-button variant="outline-secondary" @click="down"><b-icon icon="arrow-down" /></b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

@Component({
  name: 'numberInput',
})
export default class NumberInput extends Vue {
  @Prop()
  value!: number;

  @Prop()
  disabled!: boolean;

  @Prop()
  state!: boolean;

  // ref
  $refs!: { numberInput: any }

  // 클래스 변수
  data: number = this.value == null ? -1 : this.value;

  mounted() {
    setTimeout(() => this.data = this.value == null ? -1 : this.value, 300);
  }

  up() {
    this.$refs.numberInput.focus();

    if (this.data < -1) {
      this.data = -1;
    } else if (this.data == -1) {
      this.data = Number(this.data) + 2;  
    } else {
      this.data = Number(this.data) + 1;
    }

    this.vmodel();
  }

  down() {
    this.$refs.numberInput.focus();

    if (this.data <= -1) {
      this.data = -1;
    } else if (this.data == 1) {
      this.data = Number(this.data) - 2;
    } else {
      this.data = Number(this.data) - 1;
    }

    this.vmodel();
  }

  vmodel() {
    this.$emit('input', this.data);
  }

  get validate() {
    return this.data != null && this.data != 0 && this.data >= -1;
  }
}
</script>
