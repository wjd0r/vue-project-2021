<template>
  <!-- 도움말 -->
  <div class="help-common-component">
    <!-- header -->
    <HelpHeader/>
    <!-- header -->
    <div class="help-common-content">
      <!-- sidebar -->
      <div class="left-component">
        <div class="left-content">
          <Sidebar />
        </div>
      </div>
      <!-- sidebar -->
      <!-- content -->
      <div class="right-component">
        <div class="right-content" @scroll="handleScroll">
          <!-- 알림창 -->
          <HelpNotification/>
          <!-- 알림창 -->

          <!-- 데이터 생성하기 -->
          <HelpCreate/>
          <!-- 데이터 생성하기 -->

          <!-- 데이터 관리하기 -->
          <HelpDataManage/>
          <!-- 데이터 관리하기 -->

          <!-- 프로세스 분석하기 -->
          <HelpProcessAnalysis/>
          <!-- 프로세스 분석하기 -->

          <!-- 지원 기기 -->
          <HelpMobile/>
          <!-- 지원 기기 -->

          <!-- 지원 브라우저 -->
          <HelpBrowsers/>
          <!-- 사이트 맵 -->

          <!-- 사이트 맵 -->
          <!-- <SiteMap/> -->
          <!-- 사이트 맵 -->
        </div>
      </div>
      <!-- content -->
    </div>
  </div>
  <!-- 도움말 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Watch} from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import HelpHeader from './components/HelpHeader.vue';
import Sidebar from './components/Sidebar.vue';
import HelpNotification from './components/HelpNotification.vue';
import HelpCreate from './data/HelpCreate.vue';
import HelpDataManage from './data/HelpDataManage.vue';
import HelpProcessAnalysis from './helpProcess/HelpProcessAnalysis.vue';
import HelpBrowsers from './components/HelpBrowsers.vue';
import HelpMobile from './components/HelpMobile.vue';

import SiteMap from './components/SiteMap.vue';
import { utils } from '@/common';

@Component({
  components: {
    HelpHeader,
    Sidebar,
    HelpNotification,
    HelpCreate,
    HelpDataManage,
    HelpProcessAnalysis,
    SiteMap,
    HelpBrowsers,
    HelpMobile
  },
  computed: mapGetters({}),
})
export default class Help extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  nowScrollTop: number = null;
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  mounted(){
    const el = document.getElementById(window.location.hash.substring(1));
    const navEl = document.getElementById('nav-' + window.location.hash.substring(1));
    if(el){
      el.scrollIntoView();
    }
    if(navEl){
      navEl.scrollIntoView();
    }

  }
  /* 메소드 선언 */
  handleScroll(event: any){
    const sections = event.target.querySelectorAll("section[id]");
    const scrollY = event.target.scrollTop;
  
    // Now we loop through sections to get height, top and ID values for each
    sections.forEach((current: any) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 34;
      const sectionId = current.getAttribute("id");
      const scrollTab =  document.querySelector(".sidebar-content .nav-menu a[href*=" + sectionId + "]");
      if ( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight ){
        if(scrollTab){
          scrollTab.classList.add("active");
          scrollTab.scrollIntoView();
        }
      } else {
        if(scrollTab){
          scrollTab.classList.remove("active");
        }
      }

      const highlightNavList =  document.querySelectorAll(".sidebar-content .nav-menu .active");
      if (highlightNavList.length > 1){
        for (let i = 0; i < highlightNavList.length; i++){
          if(highlightNavList[i].id == "nav-help-workspace-data-manage"){
            highlightNavList[i].classList.remove("active"); 
          }
          else if(highlightNavList[i].id == "nav-help-fill-data-info"){
            highlightNavList[i].classList.remove("active"); 
          }
        }
      }

    });
  }
} 
</script>