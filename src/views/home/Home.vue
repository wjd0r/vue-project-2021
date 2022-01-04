<template>
  <div class="main-common-component home-component">
    <div class="main-common-content home-content row">
      <!-- left -->
      <div class="left-component col-6">
        <div class="left-content">
          <!-- kpi -->
          <EventKpi/>
          <!-- kpi -->

          <!-- search -->
          <div class="search-component">
            <div class="search-content">
              <b-input-group class="search">
                <b-form-input type="search" :placeholder="$t('view.repo.form.searchMinLength')" v-model="searchWord" @keypress.enter="onEnter()"></b-form-input>
                <b-input-group-append>
                  <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="onSearch()">{{$t('view.repo.button.search')}}</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <!-- search -->
          
          <!-- bookmark -->
          <BookMark @clickCard="clickCard" ref="bookmark" :basicEventIndex="basicEventIndex"/>
          <!-- bookmark -->

          <!-- new -->
          <RecentRepository @clickCard="clickCard" ref='recent' :basicEventIndex="basicEventIndex"/>
          <!-- new -->

          <!-- sample -->
          <SampleRepository/>
          <!-- sample -->
        </div>
      </div>
      <!-- left -->

      <!-- right -->
      <div class="right-component col-6">
        <div class="right-content">
          <RepositoryDetail ref="detail"/>
        </div>
      </div>
      <!-- right -->
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import EventKpi from './components/EventKpi.vue';
import BookMark from './components/BookMark.vue';
import RecentRepository from './components/RecentEvents.vue';
import SampleRepository from './components/SampleEvent.vue';
import RepositoryDetail from './components/EventDetail.vue';

@Component({
 components: {
   EventKpi,
   BookMark,
   RecentRepository,
   SampleRepository,
   RepositoryDetail
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',
 }),
})
export default class Home extends Vue {
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 projectId!: any;


 /* 클래스 변수 선언 */
 searchWord: string = '';
 basicEventIndex: any = null;


 /* refs 선언 */
 $refs!: {
    detail: any;
    bookmark: any;
    recent: any;
  };


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
 
 mounted() {
    this.$store.dispatch('repository/getRepoEventIndex', {
        projectId: this.projectId,
    }).then((res: any)=>{
      this.basicEventIndex = res;
    });

    this.$refs.detail.showDetail(null);

 }
 

 /* 메소드 선언 */
 clickCard(repositoryId: any){

   this.$refs.detail.showDetail(repositoryId);

 }

 destroyed() {
   this.$store.commit('repository/setCardHome', {});
 }

 onSearch() {
    if (this.searchWord.length !== 0 && this.searchWord.length < 3) {
      return;
    }

    this.$refs.bookmark.search(this.searchWord);
    this.$refs.recent.search(this.searchWord);
  }

  onEnter() {
    this.onSearch();
  }

}
</script>