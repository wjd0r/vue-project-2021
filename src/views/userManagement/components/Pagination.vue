<template>
  <div class="btn-pagination">
    <b-button  variant="outline-secondary" class="btn-prev" v-if="hasPrev()" @click="onClickPage(prevPage)">prev</b-button>
    <template v-if="hasFirst()">
      <b-button variant="outline-secondary" @click="onClickPage(1)">1</b-button>
      <span>...</span>
    </template>
    <b-button variant="outline-secondary" v-for="page in pages" :key="page" @click="onClickPage(page)" :class="{active: current == page}">{{ page }}</b-button>
    <template v-if="hasLast()">
      <span>...</span>
      <b-button variant="outline-secondary" @click="onClickPage(totalPages)">{{ totalPages }}</b-button>
    </template>
    <b-button variant="outline-secondary" class="btn-next" v-if="hasNext()" @click="onClickPage(nextPage)">next</b-button>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class Pagination extends Vue {
  /* Prop 선언 */
  @Prop({ default: 1 })
  current!: number;

  @Prop({ default: 0 })
  total!: number;

  @Prop({ default: 50 })
  perPage?: number;

  @Prop({ default: 2 })
  pageRange?: number;

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */

  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 메소드 선언 */
  get pages() {
    const pages: number[] = [];
    for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
      pages.push(i);
    }
    return pages;
  }
  get rangeStart() {
    const start = this.current - this.pageRange;
    return start > 0 ? start : 1;
  }
  get rangeEnd() {
    const end = this.current + this.pageRange;
    return end < this.totalPages ? end : this.totalPages;
  }
  get totalPages() {
    return Math.ceil(this.total / this.perPage);
  }
  get nextPage() {
    return this.current + 1;
  }
  get prevPage() {
    return this.current - 1;
  }

  hasFirst() {
    return this.rangeStart !== 1;
  }
  hasLast() {
    return this.rangeEnd < this.totalPages;
  }
  hasPrev() {
    return this.current > 1 && this.totalPages > 1;
  }
  hasNext() {
    return this.current < this.totalPages;
  }
  onClickPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.$emit('pageChanged', page);
    }
  }
}
</script>