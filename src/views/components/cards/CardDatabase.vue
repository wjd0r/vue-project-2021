<template>
  <!-- card -->
  <div class="col-4" @click="$emit('clickCardDB', item)"><!--:class="{active: isActive()}" -->
    <div class="card card-created database" :class="{active: isActive(item)}">
       <!-- @click.passive="clickCard" -->
      <div class="content-header">
        <div class="ico-card ico-database" alt="데이터베이스 아이콘"></div>
        <h5 class="title">{{item.name}}</h5>
        <div class="right-align">
          <div class="type-text">{{item.provider}}</div>
        </div>
      </div>
      <div class="content-footer">
        <div class="user-inf">{{this.$t('view.repo.list.create').toString()}} - {{item.createdByName}}</div>
        <div class="last-update">{{getDate(item.modified)}}</div>
      </div>
    </div>
  </div>
  <!-- card -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

@Component({
 components: {

 },
 computed: mapGetters({
  projectId: 'sso/getProjectId',
 }),
})
export default class CardDatabase extends Vue {
 /* Prop 선언 */
  @Prop()
  item: any;

  @Prop()
  list: any;

  @Prop()
  selectedDBCard: any;


  projectId!: string;


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

 isActive(item: string) {
    return this.selectedDBCard == item;
  }

  getDate(date: string) {
    return moment(date).format(moment.HTML5_FMT.DATE);
  }

}
</script>