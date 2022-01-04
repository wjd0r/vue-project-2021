<template>
  <!-- bookmark -->
  <div class="bookmark-component">
    <div class="bookmark-content">
      <div class="content-header btn-toggle" v-b-toggle.bookmark>
        <h4 class="title">{{$t('view.repo.bookmark.title')}}</h4>
        <div class="count-text">({{bookMarkList.length}})</div>
        <div class="right-align">
          <div class="ico-header ico-arrow-top" alt="드롭다운 버튼"></div>
        </div>
      </div>
      <b-collapse id="bookmark" class="나오라고" :visible="this.bookMarkList.length!=0 || isLoading">
        <div style="text-align: center;" v-if="this.bookMarkList.length==0 && !isLoading" class="nodata-text">
            {{$t('view.repo.bookmark.noList')}}
        </div>
        <div class="content-body row" v-else>
          <template v-if="isLoading">
              <b-spinner/>
          </template>
          <!-- card -->
          <template v-else v-for="(item, index) in this.bookMarkList">
            <CardHome :key="index" :item="item" @clickCard="clickCard" @clickCardHome="clickCardHome" :type="type" @removeBookMarkInList="removeBookMarkInList"/>
          </template>
          <!-- card -->
        </div>
      </b-collapse>
    </div>
  </div>
  <!-- bookmark -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { UtilsMixin } from '@/mixin';
import CardHome from '../../components/cards/CardHome.vue';

import _ from 'lodash';

@Component({
 components: {
   CardHome
 },
 computed: mapGetters({
   myInfo: 'sso/getMyInfo',
   projectId: 'sso/getProjectId',
 }),
})
export default class BookMark extends Mixins(UtilsMixin) {
 /* Prop 선언 */
 @Prop()
 basicEventIndex: any;

 /* mapGetters 변수 선언 */
 myInfo!: any;
 projectId!: any;


 /* 클래스 변수 선언 */
  list: any[] = [1,2,3,4,5];
  selectedCard: any = null;
  type: string = 'bookmark';

  bookMarkList: any[] = [];
  bookMarkListCopy: any[] = [];

  isLoading: boolean = true;


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
 @Watch('basicEventIndex', { immediate: true }) 
 basicEventIndexChanged(newValue: any){

   if(newValue==null) return;

   this.isLoading = true;
   this.$store.dispatch('sso/getBookmarkList', {userId: this.myInfo.id}).then((res: any)=>{
     
      const list = res.data;

      this.bookMarkList = [];

      
      const idList = list.map((l: any) => {
        return l.featureId;
      });



        const res2 = newValue;
        const eventKeys = (res2.data.data.elements == null || res2.data.data.elements == undefined)
                          ? [] : Object.keys(res2.data.data.elements);

        eventKeys.forEach((ek: any) => {
          if(idList.includes(ek)){
            const idx = idList.findIndex((l: any) => { return l == ek; });
            const event = _.clone(res2.data.data.elements[ek]);
            event.bookmarkId = list[idx].id;
            this.bookMarkList.push(event);
          }
        });
        this.bookMarkListCopy = [];
        this.bookMarkListCopy = this.bookMarkList.slice();

        this.isLoading = false;


        if(this.bookMarkList.length > 0 && !this.isMobile()){
        
          this.clickCard(this.bookMarkList[0].id);
          this.clickCardHome(this.bookMarkList[0]);
        }

   });
  

 }


 

 /* 메소드 선언 */
 clickCard(repositoryId: any) {

   this.$emit('clickCard', repositoryId);
 }

 clickCardHome(item: any) {
   //this.selectedCard = item;

   this.$store.commit('repository/setCardHome', {"item": item, 'type': 'bookmark'});

 }

 // 검색
  search(searchWord: string) {
    this.bookMarkList = [];
    if(searchWord == '') {
      this.bookMarkList = this.bookMarkListCopy.slice();
    } else {
      _.forEach(this.bookMarkListCopy, (event: any) => {
        const cEventName = event.name.toUpperCase();
        const cSearchWord = searchWord.toUpperCase();
        if(cEventName.includes(cSearchWord)) {
          this.bookMarkList.push(event);
        }
      });
    }
  }

  removeBookMarkInList(bookmarkId: string) {


    const idx = this.bookMarkList.findIndex((bm: any)=>{
      return bm.bookmarkId == bookmarkId;
    });

    this.bookMarkList.splice(idx, 1);
  }

}
</script>