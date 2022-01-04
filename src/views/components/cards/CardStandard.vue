<template>
  <!-- card -->
  <div class="col-4">
    <div class="card card-created standard" :class="{ active: isActive() }">
      <div class="content-header">
        <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div>
        <h5 class="title">{{ process.name }}</h5>
      </div>
      <div class="content-footer">
        <div class="user-inf">{{$t('view.repo.form.create')}} - {{ process.createdByName }}</div>
        <div class="last-update">{{ getDate(process.modified) }}</div>
      </div>
    </div>
  </div>
  <!-- card -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IKeyValueObject } from '@/interface';
import moment from 'moment';

@Component({})
export default class CardStandard extends Vue {
  /* Prop 선언 */
  @Prop()
  process!: IKeyValueObject;

  @Prop()
  isMultiSelect!: boolean;

  @Prop()
  selectedProcess!: string;

  @Prop()
  multiSelected!: string[];

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */

  /* refs 선언 */

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 
 created(){
   
 }
 */
  /*
 mounted() {
   
 }
 */

  /* 메소드 선언 */
  isActive() {
    if (!this.isMultiSelect) {
      return this.selectedProcess === this.process.id;
    } else {
      return this.multiSelected.findIndex((item) => item === this.process.id) !== -1;
    }
  }

  getDate(date: string) {
    return moment(date).format(moment.HTML5_FMT.DATE);
  }
}
</script>