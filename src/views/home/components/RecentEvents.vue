<template>
  <div class="update-component">
    <div class="content-header btn-toggle" v-b-toggle.update visible>
      <h4 class="title">{{$t('view.repo.recentEvents.title')}}<!--최근 목록--></h4>
      <div class="count-text">({{recentList.length}})</div>
      <div class="right-align">
        <div class="ico-header ico-arrow-top" alt="드롭다운 버튼"></div>
      </div>
    </div>
    <b-collapse id="update" :visible="this.recentList.length!=0 || isLoading">
      <div style="text-align: center;" v-if="this.recentList.length==0 && !isLoading" class="nodata-text">
            {{$t('view.repo.recentEvents.noList')}}
      </div>
      <div class="content-body row" v-else>
        <template v-if="isLoading">
              <b-spinner/>
        </template>
        <!-- card -->
        <template v-else v-for="(item, index) in recentList">
            <CardHome :key="index" :item="item" @clickCard="clickCard" @clickCardHome="clickCardHome" :type="type"/>
          </template>
        <!-- card -->
      </div>
    </b-collapse>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Watch, Prop, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { UtilsMixin } from '@/mixin';
import { AxiosResponse } from 'axios';
import _ from 'lodash';

import CardHome from '../../components/cards/CardHome.vue';


@Component({
 components: {
  CardHome
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',
   myInfo: 'sso/getMyInfo',
 }),
})
export default class RecentRepository extends Mixins(UtilsMixin) {
 /* Prop 선언 */
 @Prop()
 basicEventIndex: any;

 /* mapGetters 변수 선언 */
 projectId!: any;
 myInfo!: any;


 /* 클래스 변수 선언 */
 list: any[] = [1,2,3,4,5];
 selectedCard: any = null;
 type: string = "recent";

 isLoading: boolean = true;

 recentList: any[] = [];
 recentListCopy: any[] = [];


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

   const userId = this.myInfo.id;

   //const date = new Date();
   //date.setHours(date.getHours() - 4);
   //const before4Hours = "activeOn>" + moment(date); 
   
   const searchStr = "userId:1&size=10&page=0";

   this.recentList = [];

   this.isLoading = true;
   this.$store.dispatch('menuHistory/searchTelemetryListByTime', searchStr).then((res: AxiosResponse) => {

     //eventLogId
     const list = res.data.content;
     const idList = list.map((l: any) => {
        return l.eventLogId;
      });

      this.$store.dispatch('repository/getRepoEventIndex', {
        projectId: this.projectId,
      }).then((res2: any) => {

        //const res2 = this.basicEventIndex;
        const eventKeys = (res2.data.data.elements == null || res2.data.data.elements == undefined)
                          ? [] : Object.keys(res2.data.data.elements);

        eventKeys.forEach((ek: any) => {
          if(idList.includes(ek)){
            const idx = idList.findIndex((l: any) => { return l == ek; });
            const event = _.clone(res2.data.data.elements[ek]);
            event.bookmarkId = list[idx].id;
            this.recentList.push(event);
          }
        });
        this.recentListCopy = [];
        this.recentListCopy = this.recentList.slice();

        this.isLoading = false;

      });

   });
   
 }
 */

 @Watch('basicEventIndex', { immediate: true }) 
 basicEventIndexChanged(newValue: any){

   if(newValue==null) return;

   
   const userId = this.myInfo.id;

   //const date = new Date();
   //date.setHours(date.getHours() - 4);
   //const before4Hours = "activeOn>" + moment(date); 
   
   const searchStr = "userId:"+userId+"&size=10&page=0";

   this.recentList = [];

   this.isLoading = true;
   this.$store.dispatch('menuHistory/searchTelemetryListByTime', userId).then((res: AxiosResponse) => {

        //eventLogId
        const list = res.data.content;
        if(list == undefined) {
          this.recentList = [];
          this.recentListCopy = [];
          this.isLoading = false;
          return;
        }
        const idList = list.map((l: any) => {
            return l.eventLogId;
        });

      
        const res2 = newValue;
        //const eventKeys = (res2.data.data.elements == null || res2.data.data.elements == undefined)
        //                  ? [] : Object.keys(res2.data.data.elements);
        
        const fe = Object.values(res2.data.data.elements).filter((v: any)=>v.createdBy == userId);
        const eventKeys = (res2.data.data.elements == null || res2.data.data.elements == undefined)
                          ? [] : fe.map((l: any)=>{ return l.id});

        eventKeys.forEach((ek: any) => {
          if(idList.includes(ek)){
            const idx = idList.findIndex((l: any) => { return l == ek; });
            const event = _.clone(res2.data.data.elements[ek]);
            event.bookmarkId = list[idx].id;
            this.recentList.push(event);
          }
        });
        if(this.recentList.length > 10) this.recentList = _.clone(this.recentList).slice(0, 10);
        this.recentListCopy = [];
        this.recentListCopy = this.recentList.slice();

        this.isLoading = false;

        //북마크 체크
        const bmList = [];
        this.$store.dispatch('sso/getBookmarkList', {userId: this.myInfo.id})
        .then((res3: any)=>{
          const list = res3.data;

          const idList = list.map((l: any) => {
          return l.featureId;
        });



        const res2 = newValue;
        const eventKeys = (res2.data.data.elements == null || res2.data.data.elements == undefined)
                          ? [] : Object.keys(res2.data.data.elements);

        const bookMarkList = [];
        eventKeys.forEach((ek: any) => {
          if(idList.includes(ek)){
            const idx = idList.findIndex((l: any) => { return l == ek; });
            const event = _.clone(res2.data.data.elements[ek]);
            event.bookmarkId = list[idx].id;
            bookMarkList.push(event);
          }
        });


          if(this.recentList.length > 0 && bookMarkList.length == 0 &&  !this.isMobile()){
            this.clickCard(this.recentList[0].id);
            this.clickCardHome(this.recentList[0]);
          }

        });
        
        
        

   });
 }

 IsJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
 

 /* 메소드 선언 */
 clickCard(input: any) {

   this.$emit('clickCard', input);
 }

 clickCardHome(item: any) {
   //this.selectedCard = item;

   this.$store.commit('repository/setCardHome', {"item": item, 'type': 'recent'});

 }

 // 검색
  search(searchWord: string) {
    this.recentList = [];
    if(searchWord == '') {
      this.recentList = this.recentListCopy.slice();
    } else {
      _.forEach(this.recentListCopy, (event: any) => {
        const cEventName = event.name.toUpperCase();
        const cSearchWord = searchWord.toUpperCase();
        if(cEventName.includes(cSearchWord)) {
          this.recentList.push(event);
        }
      });
    }
  }


}
</script>