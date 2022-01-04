<template>
  <!-- card -->
  <div class="col-4 col-content" @click="$emit('clickCardHome', item)">
    <div class="card card-created home"  :class="{active: isActive(item)}" @click.passive="clickCard($event, '')"> <!--active-->
      <div class="content-header">
        <div class="ico-card ico-log" alt="이벤트로그 아이콘" :class="{'ico-log': getIcon('file'), 'ico-log-db': getIcon('db') }" ></div>
        <h5 class="title">{{item.name}}<!--{{type=='bookmark' ? item.name : '이벤트 로그'}}--></h5>
        <div class="right-align" v-if="type=='bookmark'" :class="{ 'd-none': isMobileBlock() }">
          <b-dropdown id="titleDropdown">
            <b-dropdown-item @click.prevent="clickRemoveBookmark">{{$t('view.repo.alert.bookmark.remove.title')}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="content-body">
        <div class="standard-inf">
          <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div><!--this.relationsRelation-->
          <div class="count-text">{{($t('view.repo.cardHome.standardProcess')+' (' + ((item.attributes["saas.relatedModels"]!=undefined && item.attributes["saas.relatedModels"].value != null) ? (Object.keys(item.attributes["saas.relatedModels"].value).length): '0') + ')')}}<!--{{ type=='bookmark' ? (this.relationsRelation +' (' + (item.attributes["reference.model"].value != null ? (Object.keys(item.attributes["saas.relatedModels"].value).length): '0') + ')') : '표준 프로세스 (1)' }}--></div>
        </div>
        
      </div>
      <div class="content-footer">
        <div class="user-inf">{{$t('view.repo.cardHome.create')}} - {{item.createdByName}}<!--{{type=='bookmark' ? item.createdByName : '홍길동'}}--></div>
        <div class="last-update">{{this.formatingModified}}<!--{{type=='bookmark' ? this.formatingModified : '2021-01-01 12:34:56' }}--></div>
      </div>
    </div>
  </div>
  <!-- card -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../../../store';
import moment from 'moment';
import { utils } from '@/common';

import { UtilsMixin } from '@/mixin';
import $ from 'jquery';

@Component({
 components: {

 },
 computed: {
    formatingModified() {
      return moment(this.$props.item.modified).format('YYYY-MM-DD HH:mm:ss')
    },
    relationsRelation() {
      return (this.$props.item.attributes["reference.model"]!=undefined && this.$props.item.attributes["reference.model"].value != null) ?
        this.$props.item.attributes["reference.model"].value.name : '';
    },
    ...mapGetters({
      projectId: 'sso/getProjectId',
    }),
 },
})
export default class CardHome extends Mixins(UtilsMixin)  {
 /* Prop 선언 */
 @Prop()
 item: any;

 @Prop()
 selectedCard!: any;

 @Prop()
  type: string;

 /* mapGetters 변수 선언 */
 projectId!: any;


 /* 클래스 변수 선언 */
 mappingList: any = [];
 titleDropDown: boolean = false;


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
 clickCard(event: any, isRefresh?: string) {

   //if(event.path[3].id == "titleDropdown"){
   //   return;
   // }

  if(this.titleDropDown) return;


  if(isRefresh=="isRefresh") {
    this.$emit('clickCard', null);
    return;
  }

   const repositoryId = this.item.id;
   this.$emit('clickCard', repositoryId);
   

   //넣어야 하는 데이터?
   //1. 원본 데이터 이름
   //2. 이벤트 로그 이름 (this.item.name)
   //3. 이벤트 로그 설명 (this.item.description)
   //4. Related Repository (아직 서브 이벤트가 없으므로 '-' 처리)
   //5. 매핑 매칭 목록
   //6. 표준 프로세스 목록: 기본 프로세스 표시
   
 }

 isActive(item: string) {
    const selected = store.getters['repository/getCardHome'];

    return item == selected.item && this.type == selected.type ;
  }

  async clickRemoveBookmark() {

    this.titleDropDown = true;

    //북마크 해제
    const title = this.$t('view.repo.alert.bookmark.remove.title').toString();
      const content = this.$t('view.repo.alert.bookmark.remove.confirm').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) {
      this.$store.dispatch('sso/removeBookmark', {preferenceId: this.item.bookmarkId})
      .then((res: any)=>{
        if(res.status=='200'){
          this.$emit('removeBookMarkInList', this.item.bookmarkId);
          this.titleDropDown = false;
          this.clickCard(null, 'isRefresh');
                    
        }
      });
      
    
    }
  }

  getIcon(type: string) { //type: file, db

    const fileList = ['csv', 'xlsx', 'xes', 'file'];
    //const dbList = ['psql'];

    const originType = this.item.originType;


    if(type == 'file'){
      if(fileList.includes(originType)) return true;
      else return false;
    }else if(type == 'db'){
      //if(dbList.includes(originType)) return true;
      if(fileList.includes(originType)) return false;
      else return true;
    }
    
  }


}
</script>