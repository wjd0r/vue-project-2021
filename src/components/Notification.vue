<template>
  <!-- notification -->
  <div class="notification-component">
    <div class="notification-content">
      <div class="content-header">
        <h5 class="title">{{$t('view.repo.notification.title')}}</h5>
        <div class="count-text">({{notificationList.length}})</div>
        <div class="right-align">
          <div class="ico-close" alt="닫기 아이콘" @click="closeAllNotiWindow(); $emit('closeNoti');"></div><!--$emit('closeNoti')-->
        </div>
      </div>
      <div class="content-body">
        <div class="list-content">
          <div v-for="(item, index) in notificationList" :key="item.serviceId+'_'+index" class="notifi">
            <div v-if="isVisible(item) && (JSON.parse(item.notificationData)).state == 'QUEUED'" class="card gray">
              <div class="notification">
                <div class="content-header">
                  <div class="d-flex-row" v-b-toggle = "'moreDropReady_' + item.serviceId">
                    <div class="request-update">{{$t('view.repo.notification.callDate')}} : {{getDateString(item)}}</div>
                    <div class="ico-notification ico-arrow-top-bold ml-5" alt="방향 아이콘"></div>
                  </div>
                  <div class="right-align">
                    <div class="ico-notification ico-close-bold" alt="취소 아이콘" @click="onClickDeleteNoti(item)"></div>
                  </div>
                </div>
                <div class="content-middle">
                  <div class="d-flex-row">
                    <div class="ico-notification ico-readying" alt="준비중 아이콘"></div>
                    <div class="title">{{ (JSON.parse(item.notificationData)).client != undefined && IsJsonString((JSON.parse(item.notificationData)).client.state) ?
                                        ($te(JSON.parse((JSON.parse(item.notificationData)).client.state).title) ? 
                                        ( JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard != null ?  
                                          $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title)+' - '+ $t('view.dashboard.'+JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard.selectedTab + '.title')
                                        : $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title) )
                                        : JSON.parse((JSON.parse(item.notificationData)).client.state).title)
                                        : $t('view.repo.notification.clientInfoProblem')}}</div>
                  </div>
                  <div class="notification-content">{{getNotificationMsg(item)}}</div>
                </div>

                <b-collapse :id="'moreDropReady_'+item.serviceId" v-model="cardShow[item.serviceId]">
                  <div class="content-body">

                    <div class="notification-text" v-if="Object.keys(setClientInfo(item)).length == 0">
                      <div class="notifi-title">{{$t('view.repo.notification.client')}}</div><!--client-->
                      <div class="notifi-content">{{(JSON.parse(item.notificationData)).client != null ? (JSON.parse(item.notificationData)).client.state : $t('view.repo.notification.clientInfoNone') }}</div>
                    </div>

                    <div class="notification-text" v-for="(k, index) in Object.keys(setClientInfo(item))" :key="'QUEUED_'+index">
                      <div class="notifi-title">{{k}}</div>
                      <div class="notifi-content">{{setClientInfo(item)[k]}}</div>
                    </div>

                  </div>
                  <div class="content-footer">
                    <!--<b-button variant="outline-primary" class="btn-close">{{$t('view.repo.button.cancel')}}</b-button>-->
                  </div>
                </b-collapse>
              </div>
            </div>

            <!-- 진헹중 -->
            <div v-else-if="isVisible(item) && (JSON.parse(item.notificationData)).state == 'RUNNING'" class="card blue">
              <div class="notification">
                <div class="content-header">
                  <div class="d-flex-row" v-b-toggle = "'moreDropRunning_' + item.serviceId">
                    <div class="request-update">{{$t('view.repo.notification.callDate')}} : {{getDateString(item)}}</div>
                    <div class="ico-notification ico-arrow-top-bold ml-5" alt="방향 아이콘"></div>
                  </div>
                  <div class="right-align">
                    <div class="ico-notification ico-close-bold" alt="취소 아이콘" @click="onClickDeleteNoti(item)"></div>
                  </div>
                </div>
                <div class="content-middle">
                  <div class="d-flex-row">
                    <div class="ico-notification ico-progress" alt="진행중 아이콘"></div>
                    <div class="title">{{ (JSON.parse(item.notificationData)).client != undefined && IsJsonString((JSON.parse(item.notificationData)).client.state) ?
                                        ($te(JSON.parse((JSON.parse(item.notificationData)).client.state).title) ? 
                                        ( JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard != null ?  
                                          $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title)+' - '+ $t('view.dashboard.'+JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard.selectedTab + '.title')
                                        : $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title) )
                                        : JSON.parse((JSON.parse(item.notificationData)).client.state).title)
                                        : $t('view.repo.notification.clientInfoProblem')}} 
                                        <!--{{'[ '+Number((JSON.parse(item.notificationData)).progress).toFixed(2) + '% ]'}}-->
                    </div>
                  </div>
                  <div class="notification-content">{{getNotificationMsg(item)}}</div>
                </div>
                <b-collapse :id="'moreDropRunning_'+item.serviceId" v-model="cardShow[item.serviceId]">
                  <div class="content-body">

                    <div class="notification-text" v-if="Object.keys(setClientInfo(item)).length == 0">
                      <div class="notifi-title">{{$t('view.repo.notification.client')}}</div><!--client-->
                      <div class="notifi-content">{{(JSON.parse(item.notificationData)).client != null ? (JSON.parse(item.notificationData)).client.state : $t('view.repo.notification.clientInfoNone') }}</div>
                    </div>

                    <div class="notification-text" v-for="(k, index) in Object.keys(setClientInfo(item))" :key="'RUNNING_'+index">
                      <div class="notifi-title">{{k}}</div>
                      <div class="notifi-content">{{setClientInfo(item)[k]}}</div>
                    </div>

                  </div>
                  <div class="content-footer">
                    <!--<b-button variant="outline-primary" class="btn-close">{{$t('view.repo.button.cancel')}}</b-button>-->
                  </div>
                </b-collapse>
              </div>
            </div>
            <!-- 진행중 -->

            <!-- 실패 -->
            <div v-else-if="isVisible(item) && ((JSON.parse(item.notificationData)).state == 'ERROR' || (JSON.parse(item.notificationData)).client == null) 
                                            || ((JSON.parse(item.notificationData)).messageCode != null
                                            ||  (JSON.parse(item.notificationData)).messageCode != undefined)" 
            class="card red">
              <div class="notification">
                <div class="content-header">
                  <div class="d-flex-row" v-b-toggle = "'moreDropError_' + item.serviceId">
                    <div class="request-update">{{$t('view.repo.notification.callDate')}} : {{getDateString(item)}}</div>
                    <div class="ico-notification ico-arrow-top-bold ml-5" alt="방향 아이콘"></div>
                  </div>
                  <div class="right-align">
                    <div class="ico-notification ico-close-bold" alt="취소 아이콘" @click="onClickDeleteNoti(item)"></div>
                  </div>
                </div>
                <div class="content-middle">
                  <div class="d-flex-row">
                    <div class="ico-notification ico-fail" alt="실패 아이콘"></div>
                    <div class="title">{{ (JSON.parse(item.notificationData)).client != undefined && IsJsonString((JSON.parse(item.notificationData)).client.state) ?
                                            ($te(JSON.parse((JSON.parse(item.notificationData)).client.state).title) ? 
                                            ( JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard != null ?  
                                              $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title)+' - '+ $t('view.dashboard.'+JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard.selectedTab + '.title')
                                            : $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title) )
                                            : JSON.parse((JSON.parse(item.notificationData)).client.state).title)
                                            : $t('view.repo.notification.clientInfoProblem')}} <!--[{{$t('view.repo.notification.failed')}}]--></div>
                    </div>
                  <div class="notification-content">{{getNotificationMsg(item)}}</div>          
                </div>

                <b-collapse :id="'moreDropError_'+item.serviceId" v-model="cardShow[item.serviceId]">
                  <div class="content-body">
                    <div class="notification-text" v-if="Object.keys(setClientInfo(item)).length == 0">
                      <div class="notifi-title">{{$t('view.repo.notification.client')}}</div><!--client-->
                      <div class="notifi-content">{{(JSON.parse(item.notificationData)).client != null ? (JSON.parse(item.notificationData)).client.state : $t('view.repo.notification.clientInfoNone') }}</div>
                    </div>

                    <template v-else>
                      <div class="notification-text" v-for="(k, index) in Object.keys(setClientInfo(item))" :key="'ERROR_'+index">
                        <div class="notifi-title">{{k}}</div>
                        <div class="notifi-content">{{setClientInfo(item)[k]}}</div>
                      </div>
                    </template>

                    <div class="notification-text error" v-for="(k, index) in getErrorMessage(item)" :key="'errormsg_'+index">
                      <div class="error-text"> {{k}}</div>
                    </div>
                  </div>
                </b-collapse>
                <div class="content-footer">
                  <b-button variant="outline-primary" class="btn-close" @click="onClickRetry(item)" v-if="!isItEventMapping(item) && !isItDataImport(item) && !isItFiltering(item) && showRetryBtn(item)">{{$t('view.repo.notification.recall')}}</b-button><!-- @click="test(item)"-->
                  <b-button variant="outline-primary" class="btn-go"  :class="{ 'd-none': isMobileBlock() }" @click="onClickComplete(item, $event)" v-if="isItEventMapping(item) || isItDataImport(item) || isItFiltering(item) || showMoveToPageBtn(item)">{{$t('view.repo.notification.moveToPage')}}</b-button>
                </div>
              </div>
            </div>
            <!-- 실패 -->
            
            <!-- 완료 -->
            <div v-else-if="isVisible(item) && (JSON.parse(item.notificationData)).state == 'COMPLETED'" class="card green">
              <div class="notification" @click="if($mq.phone) onClickNotiCard(item)">
                <div class="content-header pointer">
                  <div class="d-flex-row" v-b-toggle = "'moreDropComplate_' + item.serviceId">
                    <div class="request-update">{{$t('view.repo.notification.callDate')}} : {{getDateString(item)}}</div>
                    <div class="ico-notification ico-arrow-top-bold ml-5" alt="방향 아이콘"></div>
                  </div>
                  <div class="right-align">
                    <div class="ico-notification ico-close-bold" alt="취소 아이콘"  @click="onClickDeleteNoti(item)" ></div><!--@click="onClickClose(item)"-->
                  </div>
                </div>
                <div class="content-middle">
                  <div class="d-flex-row">
                    <div class="ico-notification ico-complete" alt="완료 아이콘"></div>
                    <div class="title">{{ (JSON.parse(item.notificationData)).client != undefined && IsJsonString((JSON.parse(item.notificationData)).client.state) ?
                                        ($te(JSON.parse((JSON.parse(item.notificationData)).client.state).title) ? 
                                          ( JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard != null ?  
                                          $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title)+' - '+ $t('view.dashboard.'+JSON.parse((JSON.parse(item.notificationData)).client.state).dashboard.selectedTab + '.title')
                                        : $t(JSON.parse((JSON.parse(item.notificationData)).client.state).title) )
                                        : JSON.parse((JSON.parse(item.notificationData)).client.state).title)
                                        : $t('view.repo.notification.clientInfoProblem')}} <!--[{{$t('view.repo.notification.complete')}}]--></div>
                  </div>
                  <div class="notification-content">{{getNotificationMsg(item)}}</div>
                </div>
                <b-collapse :id="'moreDropComplate_'+item.serviceId" v-model="cardShow[item.serviceId]">
                  <div class="content-body pointer">

                    <div class="notification-text" v-if="Object.keys(setClientInfo(item)).length == 0">
                      <div class="notifi-title">{{$t('view.repo.notification.client')}}</div><!--client-->
                      <div class="notifi-content">{{(JSON.parse(item.notificationData)).client != null ? (JSON.parse(item.notificationData)).client.state : $t('view.repo.notification.clientInfoNone') }}</div>
                    </div>

                    <div class="notification-text" v-for="(k, index) in Object.keys(setClientInfo(item))" :key="'COMPLETED_'+index">
                      <div class="notifi-title">{{k}}</div>
                      <div class="notifi-content">{{setClientInfo(item)[k]}}</div>
                    </div>
                  </div>
                </b-collapse>
                <div class="content-footer pointer">
                  <b-button variant="outline-primary" class="btn-go"  :class="{ 'd-none': isMobileBlock() }" @click="onClickComplete(item, $event)" v-if="true">{{$t('view.repo.notification.moveToPage')}}</b-button>
                </div>
              </div>
            </div>
            <!-- 완료 -->
          </div>
          <div v-if="notificationList.length == 0 " class="nodata-text" style="margin: 50px 50px 50px 50px;">
            {{$t('view.repo.notification.noNotiMsg')}}<!--알림 내용이 없습니다.-->
          </div>
        </div>
      </div>
    </div>
    <div class="content-footer">
      <div class="last-update">{{$t('view.repo.notification.lastUpdate')}} : {{notificationList.length > 0 ? getDateString(notificationList[0]) : $t('view.repo.notification.noNoti')}}</div>
      <b-button variant="outline-secondary" class="btn-reset" @click="onClickReset">{{$t('view.repo.notification.reset')}}</b-button>
    </div>
  </div>
  <!-- notification -->
</template>

<style lang="scss" scoped>
.pointer{
	cursor:pointer;
}
</style>

<script lang="ts">
import { Vue, Component, Watch, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { EventBus, utils } from '@/common';
import { INotificationData } from '@/interface';
import moment from 'moment';
import { UtilsMixin } from '@/mixin';


import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import group from '@/store/sso/group';
import { split } from 'lodash';

@Component({
 components: {

 },
 computed: mapGetters({
    //myInfo: 'sso/getMyInfo',
    notificationList: 'notification/getNotificationList',
 }),
 ...utils.getMq(),
} as any)
export default class Nofitication extends Mixins(UtilsMixin){
 /* Prop 선언 */

 /* mapGetters 변수 선언 */
 //myInfo!: any;
 notificationList!: any;


 /* 클래스 변수 선언 */
 //'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'ERROR'
 tempList: any[] = ['QUEUED', 'RUNNING', 'COMPLETED', 'ERROR'];

 lastTimestamp: string = '';

 es: any;

 cardShow: boolean[] = [];



 /* refs 선언 */
 

 /* Watch 선언 */
      

 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  
 created(){

  this.$store.dispatch('notification/setNotificationEmpty', null);

   EventBus.$on('initNotification', this.initNotification);
 }
 
 /*
 mounted() {
   
 }
 */

  beforeDestroy() {
    EventBus.$off('initNotification');
  }

 /* 메소드 선언 */

  // init notification
  initNotification() {
    this.$store.dispatch('notification/setNotificationEmpty', null);

    this.$store.dispatch('notification/getNotificationInit', null).then((res: any)=>{

      const reversed = Array.from(res.data).reverse();

      reversed.forEach((element: any) => {
        this.$store.dispatch('notification/addNotification', element);
      });
    });

    const token = this.$store.getters['oauth/getToken'].access_token;
    this.sseSubscribe(token);

  }

  //sse subscribe
  sseSubscribe(accessToken: string) {

    const token = 'Bearer ' + accessToken;

    const url = window.env.IPR_SSO_BASE_URL + '/ipr/sso/v3/sse/subscribe'

     this.es = new EventSourcePolyfill(url,
      {
        headers: {
          Authorization: token,
          //uuid: 111,
        }
      },
    )
     this.es.addEventListener("open", ()=>{
       this.$store.commit('notification/setConnectState', true);
     });

    this.es.onmessage = function (event: any) {
      // 이벤트 설정이안된 기본 데이터 처리
    };
    this.es.addEventListener('notice', ((e: any) => {
      // 'notice' 이벤트의 데이터 처리
      const data = (JSON.parse(e.data));
      const contextId = data.contextId;
      const contextType = data.contextType;
      const notificationData = JSON.parse(data.notificationData);
      const read = data.read;
      const id = data.id;
      const userId = data.userId;

      if(e?.data) {
        console.debug(JSON.parse(e.data))
      } else {
        console.debug(e)
      }

      this.$store.dispatch('notification/addNotification', data);


    }), false);

    this.es.onerror = function (event: any) {

      if(event.status == '406'){
        this.$router.push({
        name: 'Login',
      });
      }

      this.es.close();
    };

    EventBus.$on('closeSSE', () =>{
      this.es.close();    
    });
  }


 async onClickDeleteNoti(item: any) {

    const title = this.$t('view.repo.alert.notification.remove.title').toString();
    const content = this.$t('view.repo.alert.notification.remove.contentRemoveOne').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    const sseId = item.id;

    if(res) this.$store.dispatch('notification/deleteNotification', {sseId : sseId, serviceId: item.serviceId});

 }

 async onClickReset() {

    const title = this.$t('view.repo.alert.notification.remove.title').toString();
    const content = this.$t('view.repo.alert.notification.remove.contentRemoveAll').toString();
    const yes = this.$t('view.repo.button.yes').toString();
    const no = this.$t('view.repo.button.no').toString();
    const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

    if(res) this.$store.dispatch('notification/deleteNotificationAll');
 }

 onClickComplete(item: any, event: any){
   const target = event.target as Element;

   if(target.classList.contains('ico-close')) return;

   this.onClickCompleteMessage(item);

 }

 //complete function from md
 onClickCompleteMessage(item: any) {

   

    /*
    const message: INotificationData = JSON.parse(item.notificationData);

    const state = (JSON.parse(item.notificationData)).state;

    if(message.client == null) return;
    const serviceId = item.serviceId;
    const clientState = JSON.parse(message.client.state);
    const routeName = clientState.route.to;
    const routeParams = clientState.route.params;
    
    this.$router.push({
      name: routeName,
      params: routeParams,
      query: {
          sId: serviceId,
          state: message.state
      }
    });

    this.$emit('closeNoti');
    */

    const message: INotificationData = JSON.parse(item.notificationData);
    const state = (JSON.parse(item.notificationData)).state;

    if(message.client == null) return;

    if(state == 'ERROR' || message.client == null || message.messageCode != null || message.messageCode != undefined){
      const serviceId = item.serviceId;
      const clientState = JSON.parse(message.client.state);
      const routeName = clientState.route.failTo;
      const routeParams = clientState.route.params;
    
      this.$router.push({
        name: routeName,
        params: routeParams,
        query: {
          sId: serviceId,
          state: message.state
        }
      });

    }else if(state == 'COMPLETED'){
      const serviceId = item.serviceId;
      const clientState = JSON.parse(message.client.state);
      const routeName = clientState.route.to;
      const routeParams = clientState.route.params;
    
      this.$router.push({
        name: routeName,
        params: routeParams,
        query: {
          sId: serviceId,
          state: message.state
        }
      });

    }
    

    this.$emit('closeNoti');
  } 

  handleSampleEventLogWS(name: string, repoName: string) {

    if(repoName == undefined) return name;

    if (repoName.includes('repo.demo')) {
      
      return '-';
    }else {
      return name;
    }

  }

  
  handleSampleEventLogDS(name: string, repoName: string) {

    if(repoName == undefined) return name;

    if (repoName.includes('repo.demo')) {
      
      return this.$t('view.repo.notification.sampleData'); //'샘플 데이터';
    }else {
      return name;
    }

  }
  
  handleSampleEventLog(name: string) {

    if(name == undefined){
      return name;
    }

    if(name.includes('ds.demo')) {
      const sample = name.split('.')[2];
      return this.$t('view.repo.demo.' + sample);
    }else if (name.includes('repo.demo')) {
      const sample = name.split('.')[2];
      return this.$t('view.repo.demo.' + sample);
    }else {
      return name;
    }

  }
/*
  handleVariant(variant: string) {
    if(variant == '전체' || variant == 'All') return this.$t('view.repo.notificationLabel.whole').toString();
    else if(variant.includes('그룹')) {
      const newVariant = variant.replace('그룹', this.$t('view.repo.notificationLabel.group').toString());
      return newVariant;

    }else if(variant.includes('Variant')){
      const newVariant = variant.replace('Variant', this.$t('view.repo.notificationLabel.group').toString());
      return newVariant;
    }else if(variant.includes('Baseline Process')) {
      const newVariant = variant.replace('Baseline Process', this.$t('view.repo.notificationLabel.baselineProcess').toString());
      return newVariant;
    }else if(variant.includes('표준 프로세스')) {
      const newVariant = variant.replace('표준 프로세스', this.$t('view.repo.notificationLabel.baselineProcess').toString());
      return newVariant;
    }
  }
*/
  handleVariant(variant: string) {
    if(variant == '전체' || variant == 'All') return this.$t('view.process.variant.title.allTitle').toString();
    else if(variant.includes('그룹')) {
      const newVariant = variant.replace('그룹', this.$t('view.process.variant.title.variantName').toString());
      return newVariant;

    }else if(variant.includes('Variant')){
      const newVariant = variant.replace('Variant', this.$t('view.process.variant.title.variantName').toString());
      return newVariant;
    }else if(variant.includes('Baseline Process')) {
      const newVariant = variant.replace('Baseline Process', this.$t('view.process.variant.title.variantProcess').toString());
      return newVariant;
    }else if(variant.includes('표준 프로세스')) {
      const newVariant = variant.replace('표준 프로세스', this.$t('view.process.variant.title.variantProcess').toString());
      return newVariant;
    }
  }

  handleVariantDelta(variants: string) {
    const splitedVariants = variants.split(', ');
    const first = splitedVariants[0];
    const second = splitedVariants[1];

    const newFirst = this.handleVariant(first);
    const newSecond = this.handleVariant(second);

    const newVariants = newFirst  +', ' + newSecond;
    
    return newVariants;
  }


  //client에 따른 출력할 내용 구성 function 필요
  setClientInfo(item: any) {

    //label start
    const  xaxis = this.$t('view.repo.notificationLabel.xaxis').toString();
    const  yaxis = this.$t('view.repo.notificationLabel.yaxis').toString();
    const  calculate = this.$t('view.repo.notificationLabel.calculate').toString();

    const provider = this.$t('view.repo.notificationLabel.provider').toString();

    const  totalDataset = this.$t('view.repo.notificationLabel.totalDataset').toString();
    const  totalEventlog = this.$t('view.repo.notificationLabel.totalEventlog').toString();
    const  classifier = this.$t('view.repo.notificationLabel.classifier').toString();
    const  variant = this.$t('view.repo.notificationLabel.variant').toString();
    const  rowCount_origin = this.$t('view.repo.notificationLabel.rowCount_origin').toString();
    const  datasource = this.$t('view.repo.notificationLabel.datasource').toString();

    const database = this.$t('view.repo.notificationLabel.database').toString();

    const  dataset = this.$t('view.repo.notificationLabel.dataset').toString();
    const  rowCount_sync = this.$t('view.repo.notificationLabel.rowCount_sync').toString();
    const  series = this.$t('view.repo.notificationLabel.series').toString();
    const  viewMode = this.$t('view.repo.notificationLabel.viewMode').toString();
    const  layout = this.$t('view.repo.notificationLabel.layout').toString();
    const  perspective = this.$t('view.repo.notificationLabel.perspective').toString();
    const  groupItems = this.$t('view.repo.notificationLabel.groupItems').toString();
    const  status = this.$t('view.repo.notificationLabel.status').toString();
    const  startTimestamp = this.$t('view.repo.notificationLabel.startTimestamp').toString();
    const  algorithms = this.$t('view.repo.notificationLabel.algorithms').toString();
    const  activityKPI = this.$t('view.repo.notificationLabel.activityKPI').toString();
    const  activitySignificance = this.$t('view.repo.notificationLabel.activitySignificance').toString();
    const  arcKPI = this.$t('view.repo.notificationLabel.arcKPI').toString();
    const  arcSignificance = this.$t('view.repo.notificationLabel.arcSignificance').toString();
    const  workspace = this.$t('view.repo.notificationLabel.workspace').toString();
    const  eventlog_origin = this.$t('view.repo.notificationLabel.eventlog_origin').toString();
    const  dependency = this.$t('view.repo.notificationLabel.dependency').toString();
    const  eventlog = this.$t('view.repo.notificationLabel.eventlog').toString();
    const  sortBy = this.$t('view.repo.notificationLabel.sortBy').toString();
    const  values = this.$t('view.repo.notificationLabel.values').toString();
    const  endTimestamp = this.$t('view.repo.notificationLabel.endTimestamp').toString();
    const  min_frequency = this.$t('view.repo.notificationLabel.min_frequency').toString();
    const  includes = this.$t('view.repo.notificationLabel.includes').toString();

    const table = this.$t('view.repo.notificationLabel.table').toString();

    const  filename = this.$t('view.repo.notificationLabel.filename').toString();

    const host = this.$t('view.repo.notificationLabel.host').toString();

    const  datasetOrigin = this.$t('view.repo.notificationLabel.datasetOrigin').toString();

    const selectedTab = this.$t('view.repo.notificationLabel.selectedTab').toString();

    //label end

    const clientInfo: any = {};

    const nData = JSON.parse(item.notificationData);

    if(nData.client == null && nData.client == undefined) return {};
    else if(!nData.client.state.includes('{')) return {};

    const clientState = JSON.parse(nData.client.state);

    if(clientState.datasetImporting != null) { //데이터셋 Importing
    
      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.datasetImporting.workspaceName, clientState.datasetImporting.eventName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.datasetImporting.dataSetName, clientState.datasetImporting.eventName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.datasetImporting.eventName);

      if(clientState.datasetImporting.file != null){
        clientInfo[filename] = clientState.datasetImporting.file.filename;
      }
      if(clientState.datasetImporting.db != null){
        clientInfo[provider] = clientState.datasetImporting.db.dbtype;
        clientInfo[host] = clientState.datasetImporting.db.host;
        clientInfo[database] = clientState.datasetImporting.db.db;
        clientInfo[table] = clientState.datasetImporting.db.table;
      }

    }else if(clientState.dataFilter != null) { 

      clientInfo[workspace] = clientState.dataFilter.workspaceName;
      
      //원본 데이터셋
      clientInfo[datasetOrigin] = clientState.dataFilter.dataSetNameOrigin; //확인할 것!
      //데이터셋
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.dataFilter.dataSetName, clientState.dataFilter.eventName);

    }else if(clientState.eventMapping != null) {
      
      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.eventMapping.workspaceName, clientState.eventMapping.eventName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.eventMapping.dataSetName, clientState.eventMapping.eventName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.eventMapping.eventName);
      clientInfo[status] = clientState.eventMapping.state;

    }else if(clientState.eventFilter != null) { 

      clientInfo[workspace] = clientState.eventFilter.workspaceName;

      //수정 필요: 데이터 아이디 -> 원본 이벤트로그
      clientInfo[eventlog_origin] = clientState.eventFilter.eventlog_origin;
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.eventFilter.dataSetName, clientState.eventFilter.eventName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.eventFilter.eventName);
      clientInfo[status] = clientState.eventFilter.state;

    }else if(clientState.variant != null) { //사용안함
     
      clientInfo['데이터셋 이름'] = this.handleSampleEventLogDS(clientState.variant.repository.datasetName, clientState.variant.repository.repositoryName);
      clientInfo['이벤트로그 이름'] = this.handleSampleEventLog(clientState.variant.repository.repositoryName);

      clientInfo['시작일자'] = clientState.variant.filter.duration.start.split(' ')[0];
      clientInfo['종료일자'] = clientState.variant.filter.duration.end.split(' ')[0];
      //clientInfo['비교 시작일자'] = clientState.variant.filter.comparedDuration.start;
      //clientInfo['비교 종료일자'] = clientState.variant.filter.comparedDuration.end;

      clientInfo['분석 항목'] = this.$t('view.process.filter.value.'+clientState.variant.filter.variantType);

      //variant.analysis(route.name) 따라서 표시할 것 작성
      //"view.router.matrixModel.title"
      const analysis = this.$t(clientState.variant.analysis);

      clientInfo['메뉴 항목'] = analysis;

      /*
       * discovery, delta, logReplay, social, matrix, dotted, gantt

          clientInfo['알고리즘'] = this.$t('view.process.filter.value.'+clientState.variant.filter.algorithm); //discovery
          clientInfo['액티비티'] = this.$t('view.process.filter.value.'+clientState.variant.filter.nodeText); // discovery, delta, logReplay (+social)
          clientInfo['연결선'] = this.$t('view.process.filter.value.'+clientState.variant.filter.arcText); // discovery, delta, logReplay (+social)
          clientInfo['의존도'] = clientState.variant.filter.dep; // discovery, delta, logReplay
          clientInfo['최소 빈도'] = clientState.variant.filter.freq; // discovery, delta, logReplay
          clientInfo['nodeSign'] = clientState.variant.filter.nodeSign; // discovery
          clientInfo['arcSign'] = clientState.variant.filter.arcSign; // discovery

          clientInfo['보기 모드'] = this.$t('view.process.filter.value.'+clientState.variant.filter.viewMode); // delta

          clientInfo['추가조건'] = clientState.variant.filter.tokenInclude=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.variant.filter.tokenInclude); // logReplay
          clientInfo['조건값'] = clientState.variant.filter.tokenValue=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.variant.filter.tokenValue); // logReplay

          clientInfo['보기 방법'] = this.$t('view.process.filter.value.'+(clientState.variant.filter.layout=='d3-force' ? 'd3Force' : clientState.variant.filter.layout)); // social
          
          clientInfo['분석 기준'] = this.$t('view.process.filter.value.'+clientState.variant.filter.colEventActivity); // social
          clientInfo['rank'] = clientState.variant.filter.rank; // social
          clientInfo['X축'] = this.$t('view.process.filter.value.'+clientState.variant.filter.selectedX); // matrix
          clientInfo['Y축'] = this.$t('view.process.filter.value.'+clientState.variant.filter.selectedY); // matrix
          clientInfo['selectedValue'] = clientState.variant.filter.selectedValue; // matrix, gantt
          clientInfo['값 유형'] = this.$t('view.process.filter.value.statistics.'+clientState.variant.filter.selectedColorBy); // matrix
          clientInfo['Y축'] = this.$t('view.process.filter.value.'+clientState.variant.filter.component); // dotted
          clientInfo['구분 속성'] = this.$t('view.process.filter.value.'+clientState.variant.filter.value); // dotted
          clientInfo['범례'] = this.$t('view.process.filter.value.'+clientState.variant.filter.barSeries); // gantt
          clientInfo['정렬 기준'] = clientState.variant.filter.sortBy; // gantt
          clientInfo['sortDirection'] = clientState.variant.filter.sortDirection; // gantt      
       */

      switch(analysis) {
        case "프로세스 분석": //discovery

          clientInfo['알고리즘'] = this.$t('view.process.filter.value.'+clientState.variant.filter.algorithm); //discovery
          clientInfo['액티비티'] = this.$t('view.process.filter.value.'+clientState.variant.filter.nodeText); // discovery, delta, logReplay
          clientInfo['연결선'] = this.$t('view.process.filter.value.'+clientState.variant.filter.arcText); // discovery, delta, logReplay
          clientInfo['의존도'] = clientState.variant.filter.dep; // discovery, delta, logReplay
          clientInfo['최소 빈도'] = clientState.variant.filter.freq; // discovery, delta, logReplay
          clientInfo['nodeSign'] = clientState.variant.filter.nodeSign; // discovery
          clientInfo['arcSign'] = clientState.variant.filter.arcSign; // discovery

          break; 
        case "프로세스 비교": //delta

          clientInfo['액티비티'] = this.$t('view.process.filter.value.'+clientState.variant.filter.nodeText); // discovery, delta, logReplay
          clientInfo['연결선'] = this.$t('view.process.filter.value.'+clientState.variant.filter.arcText); // discovery, delta, logReplay
          clientInfo['의존도'] = clientState.variant.filter.dep; // discovery, delta, logReplay
          clientInfo['최소 빈도'] = clientState.variant.filter.freq; // discovery, delta, logReplay
          clientInfo['보기 모드'] = this.$t('view.process.filter.value.'+clientState.variant.filter.viewMode); // delta

          break; 
        case "프로세스 애니메이션": //logReplay

          clientInfo['액티비티'] = this.$t('view.process.filter.value.'+clientState.variant.filter.nodeText); // discovery, delta, logReplay
          clientInfo['연결선'] = this.$t('view.process.filter.value.'+clientState.variant.filter.arcText); // discovery, delta, logReplay
          clientInfo['의존도'] = clientState.variant.filter.dep; // discovery, delta, logReplay
          clientInfo['최소 빈도'] = clientState.variant.filter.freq; // discovery, delta, logReplay
          if(clientState.variant.filter.tokenInclude != '---') {
            clientInfo['추가조건'] = clientState.variant.filter.tokenInclude=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.variant.filter.tokenInclude); // logReplay
            clientInfo['조건값'] = clientState.variant.filter.tokenValue; //=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.variant.filter.tokenValue); // logReplay 
          }
          
          break;
        case "리소스 관계 분석": //social

          clientInfo['액티비티'] = this.$t('view.process.filter.value.'+clientState.variant.filter.nodeText); // discovery, delta, logReplay (+social)
          clientInfo['연결선'] = this.$t('view.process.filter.value.'+clientState.variant.filter.arcText); // discovery, delta, logReplay (+social)

          clientInfo['보기 방법'] = this.$t('view.process.filter.value.'+(clientState.variant.filter.layout=='d3-force' ? 'd3Force' : clientState.variant.filter.layout)); // social
          clientInfo['분석 기준'] = this.$t('view.process.filter.value.'+clientState.variant.filter.colEventActivity); // social
        
          break;
        case "데이터 분석": //matrix

          clientInfo['X축'] = this.$t('view.process.filter.value.'+clientState.variant.filter.selectedX); // matrix
          clientInfo['Y축'] = this.$t('view.process.filter.value.'+clientState.variant.filter.selectedY); // matrix
          clientInfo['값 유형'] = this.$t('view.process.filter.value.statistics.'+clientState.variant.filter.selectedColorBy); // matrix

          break;
        case "액티비티 분석": //dotted

          clientInfo['Y축'] = this.$t('view.process.filter.value.'+clientState.variant.filter.component); // dotted
          clientInfo['구분 속성'] = this.$t('view.process.filter.value.'+clientState.variant.filter.value); // dotted

          break;
        case "간트 차트": //gantt

          clientInfo['범례'] = this.$t('view.process.filter.value.'+clientState.variant.filter.barSeries); // gantt
          clientInfo['정렬 기준'] = clientState.variant.filter.sortBy; // gantt
          clientInfo['sortDirection'] = clientState.variant.filter.sortDirection; // gantt      

          break;
        case "프로세스 흐름 분석": //processFlow
          clientInfo['범례'] = this.$t('view.process.filter.value.'+clientState.variant.filter.barSeries); // gantt
          clientInfo['정렬 기준'] = clientState.variant.filter.sortBy; // gantt
          clientInfo['sortDirection'] = clientState.variant.filter.sortDirection; // gantt    
          break;
      }


    }else if(clientState.dashboard != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.dashboard.repository.workspaceName, clientState.dashboard.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.dashboard.repository.datasetName, clientState.dashboard.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.dashboard.repository.repositoryName);

      clientInfo[selectedTab] = this.$t('view.dashboard.'+clientState.dashboard.selectedTab + '.title');
    
      clientInfo[startTimestamp] = clientState.dashboard.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.dashboard.filter.duration.end.split(' ')[0];

      clientInfo[variant] = this.handleVariant(clientState.dashboard.variant.name);

    }else if(clientState.processDiscovery != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.processDiscovery.repository.workspaceName, clientState.processDiscovery.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.processDiscovery.repository.datasetName, clientState.processDiscovery.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.processDiscovery.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.processDiscovery.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.processDiscovery.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.processDiscovery.filter.varintType);
      clientInfo[algorithms] = this.$t('view.process.filter.value.'+clientState.processDiscovery.filter.algorithm);
      clientInfo[activityKPI] = this.$t('view.process.filter.value.'+clientState.processDiscovery.filter.nodeText);
      clientInfo[arcKPI] = this.$t('view.process.filter.value.'+clientState.processDiscovery.filter.arcText);

      //추가조건, 조건값 추가
      if(clientState.processDiscovery.filter.tokenInclude != '---') {
        clientInfo[includes] = clientState.processDiscovery.filter.tokenInclude=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.processDiscovery.filter.tokenInclude);
        clientInfo[values] = clientState.processDiscovery.filter.tokenValue;
      }
      

      //algorithm = heuristic 만 보여주기
      if(clientState.processDiscovery.filter.algorithm == 'fhm'){
        clientInfo[dependency] = clientState.processDiscovery.filter.dep;
        clientInfo[min_frequency] = clientState.processDiscovery.filter.freq;
      }

      //algorithm = fuzzy 만 보여주기
      if(clientState.processDiscovery.filter.algorithm == 'fuzzy'){
        clientInfo[activitySignificance] = clientState.processDiscovery.filter.nodeSign;
        clientInfo[arcSignificance] = clientState.processDiscovery.filter.arcSign;
      }

      clientInfo[variant] = this.handleVariant(clientState.processDiscovery.variant.name);

    }else if(clientState.deltaAnalysis != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.deltaAnalysis.repository.workspaceName, clientState.deltaAnalysis.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.deltaAnalysis.repository.datasetName, clientState.deltaAnalysis.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.deltaAnalysis.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.deltaAnalysis.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.deltaAnalysis.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.deltaAnalysis.filter.varintType);
      clientInfo[activityKPI] = this.$t('view.process.filter.value.'+clientState.deltaAnalysis.filter.nodeText);
      clientInfo[arcKPI] = this.$t('view.process.filter.value.'+clientState.deltaAnalysis.filter.arcText);
      clientInfo[viewMode] = this.$t('view.process.filter.value.'+clientState.deltaAnalysis.filter.viewMode);
      clientInfo[dependency] = clientState.deltaAnalysis.filter.dep;
      clientInfo[min_frequency] = clientState.deltaAnalysis.filter.freq;

      clientInfo[variant] = this.handleVariantDelta(clientState.deltaAnalysis.variant.name);

    }else if(clientState.logReplay != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.logReplay.repository.workspaceName, clientState.logReplay.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.logReplay.repository.datasetName, clientState.logReplay.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.logReplay.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.logReplay.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.logReplay.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.logReplay.filter.varintType);
      clientInfo[activityKPI] = this.$t('view.process.filter.value.'+clientState.logReplay.filter.nodeText);
      clientInfo[arcKPI] = this.$t('view.process.filter.value.'+clientState.logReplay.filter.arcText);  
      
      if(clientState.logReplay.filter.tokenInclude != '---') {
        clientInfo[includes] = clientState.logReplay.filter.tokenInclude=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.logReplay.filter.tokenInclude);
        clientInfo[values] = clientState.logReplay.filter.tokenValue; //=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.logReplay.filter.tokenValue); 
      }
      
      
      clientInfo[dependency] = clientState.logReplay.filter.dep;
      clientInfo[min_frequency] = clientState.logReplay.filter.freq;

      clientInfo[variant] = this.handleVariant(clientState.logReplay.variant.name);

    }else if(clientState.socialAnalysis != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.socialAnalysis.repository.workspaceName, clientState.socialAnalysis.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.socialAnalysis.repository.datasetName, clientState.socialAnalysis.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.socialAnalysis.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.socialAnalysis.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.socialAnalysis.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.socialAnalysis.filter.varintType);
      clientInfo[layout] = this.$t('view.process.filter.value.'+(clientState.socialAnalysis.filter.layout=='d3-force' ? 'd3Force' : clientState.socialAnalysis.filter.layout));
      clientInfo[perspective] = this.$t('view.process.filter.value.'+clientState.socialAnalysis.filter.colEventActivity);
      clientInfo[activityKPI] = this.$t('view.process.filter.value.'+clientState.socialAnalysis.filter.nodeText);
      clientInfo[arcKPI] = this.$t('view.process.filter.value.'+clientState.socialAnalysis.filter.arcText);

      clientInfo[variant] = this.handleVariant(clientState.socialAnalysis.variant.name);

    }else if(clientState.matrixModel != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.matrixModel.repository.workspaceName, clientState.matrixModel.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.matrixModel.repository.datasetName, clientState.matrixModel.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.matrixModel.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.matrixModel.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.matrixModel.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.matrixModel.filter.varintType);

      const basicOptions = ['ea', 'edf', 'eo', 'er', 'esm'];

      clientInfo[xaxis] = basicOptions.includes(clientState.matrixModel.filter.selectedX) ? this.$t('view.process.filter.value.'+clientState.matrixModel.filter.selectedX) : clientState.matrixModel.filter.selectedX;
      clientInfo[yaxis] = basicOptions.includes(clientState.matrixModel.filter.selectedY) ? this.$t('view.process.filter.value.'+clientState.matrixModel.filter.selectedY) : clientState.matrixModel.filter.selectedY;
      
      clientInfo[calculate] = this.$t('view.process.filter.value.statistics.'+clientState.matrixModel.filter.selectedColorBy);

      //추가조건, 조건값 추가
      if(clientState.matrixModel.filter.tokenInclude != '---') {
        clientInfo[includes] = clientState.matrixModel.filter.tokenInclude=='---' ? '---' : this.$t('view.process.filter.value.'+clientState.matrixModel.filter.tokenInclude);
        clientInfo[values] = clientState.matrixModel.filter.tokenValue;
      }
      
      //if(clientState.matrixModel.filter.graphFilter)
      //  clientInfo['graphFilter'] = clientState.matrixModel.filter.graphFilter;

      clientInfo[variant] = this.handleVariant(clientState.matrixModel.variant.name);

    }else if(clientState.dotted != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.dotted.repository.workspaceName, clientState.dotted.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.dotted.repository.datasetName, clientState.dotted.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.dotted.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.dotted.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.dotted.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.dotted.filter.varintType);
      clientInfo[yaxis] = this.$t('view.process.filter.value.'+clientState.dotted.filter.component);
      clientInfo[classifier] = this.$t('view.process.filter.value.'+clientState.dotted.filter.value);
      
      //if(clientState.dotted.filter.graphFilter)
      //  clientInfo['graphFilter'] = clientState.dotted.filter.graphFilter;

      clientInfo[variant] = this.handleVariant(clientState.dotted.variant.name);

    }else if(clientState.gantt != null) { //사용안함

      clientInfo['워크스페이스 이름'] = this.handleSampleEventLogWS(clientState.gantt.repository.workspaceName, clientState.gantt.repository.repositoryName);
      clientInfo['데이터셋 이름'] = this.handleSampleEventLogDS(clientState.gantt.repository.datasetName, clientState.gantt.repository.repositoryName);
      clientInfo['이벤트로그 이름'] = this.handleSampleEventLog(clientState.gantt.repository.repositoryName);

      clientInfo['시작일자'] = clientState.gantt.filter.duration.start.split(' ')[0];
      clientInfo['종료일자'] = clientState.gantt.filter.duration.end.split(' ')[0];

      clientInfo['분석 항목'] = this.$t('view.process.filter.value.'+clientState.gantt.filter.varintType);
      clientInfo['범례'] = this.$t('view.process.filter.value.'+clientState.gantt.filter.barSeries);
      clientInfo['정렬 기준'] = clientState.gantt.filter.sortingBy;

      if(clientState.gantt.filter.graphFilter)
        clientInfo['graphFilter'] = clientState.gantt.filter.graphFilter;
      
    }else if(clientState.processFlow != null) {

      clientInfo[workspace] = this.handleSampleEventLogWS(clientState.processFlow.repository.workspaceName, clientState.processFlow.repository.repositoryName);
      clientInfo[dataset] = this.handleSampleEventLogDS(clientState.processFlow.repository.datasetName, clientState.processFlow.repository.repositoryName);
      clientInfo[eventlog] = this.handleSampleEventLog(clientState.processFlow.repository.repositoryName);

      clientInfo[startTimestamp] = clientState.processFlow.filter.duration.start.split(' ')[0];
      clientInfo[endTimestamp] = clientState.processFlow.filter.duration.end.split(' ')[0];

      clientInfo[groupItems] = this.$t('view.process.filter.value.'+clientState.processFlow.filter.varintType);
      clientInfo[series] = this.$t('view.process.filter.value.'+clientState.processFlow.filter.barSeries);
      clientInfo[sortBy] = this.$t('view.process.filter.value.'+ clientState.processFlow.filter.sortingBy);

      //if(clientState.processFlow.filter.graphFilter)
      //  clientInfo['graphFilter'] = clientState.processFlow.filter.graphFilter;
      
    }else if(clientState.dataSync != null) {
      //데이터 동기화 추가하기
      clientInfo[workspace] = clientState.dataSync.workspaceName;

      clientInfo[datasource] = clientState.dataSync.datasourceName;
      clientInfo[rowCount_origin] = clientState.dataSync.totalNum;
      clientInfo[rowCount_sync] = clientState.dataSync.syncedTotalNum;
      clientInfo[totalDataset] = clientState.dataSync.relatedDatasetNum;
      clientInfo[totalEventlog] = clientState.dataSync.relatedEventLogNum;
      

    }

    // if(nData.state === 'ERROR') {
    //   clientInfo['에러 메세지'] = nData.message
    // }

    return clientInfo;
  }

  checkDemoForTitle(item: any) {

    const clientInfo = (JSON.parse(item.notificationData)).client;

    if(clientInfo == null || clientInfo == undefined) return false;
    else if(!clientInfo.state.includes("{")) return false;
    else return true;
  }

  getDateString(item: any) {
    //return moment((JSON.parse(item.notificationData).created)).format('YYYY-MM-DD HH:mm:ss');
    //return item.createdOn;
    return moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss');
  }

  destroyed() {
    if(this.es != undefined) this.es.close();
  }

  isVisible(item: any) {


    if(this.IsJsonString(item.notificationData)) {
       const client = JSON.parse(item.notificationData).client;
    
      if (client != null && client.visible != undefined && client.visible === false) {
        return false;
      }else {
        return true;
      }
    }else {
      return false;
    }

  }

  IsJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  onClickNotiCard(item: any) {
    this.onClickCompleteMessage(item);
  }


  getErrorMessage(item: any) {

    const nData = JSON.parse(item.notificationData);
    if(nData.client == undefined) return '';

    if((JSON.parse(item.notificationData))._type == "ServiceContextInfoImpl") { //Service 에러

      const a = JSON.parse(item.notificationData);

      let msg = '[' + a.messageCode + '] ' + this.getGeneralErrorMessage(a.messageCode);

      if(a.messageCode == 'IPR_ERR_200_00010201') msg = '[' + a.messageCode + '] ' + a.message.split(': ')[1];
      
      return [msg];
      
    }else if((JSON.parse(item.notificationData))._type == "WorkflowContextInfoImpl"){ //Workflow 에러

      const messages: any[] = [];
      const actionInfo = (JSON.parse(item.notificationData)).actionInfo;
      Object.keys(actionInfo).forEach((key: any) => {
          const a = actionInfo[key];
          if(a.state == "ERROR"){

            let msg = key + ' : [' + a.messageCode + '] ' + this.getGeneralErrorMessage(a.messageCode);

            if(a.messageCode == 'IPR_ERR_200_00010201') msg = '[' + a.messageCode + '] ' + a.message.split(': ')[1];

            messages.push(msg);
          }        
      });

      return messages;
    }else{
      return [];
    }
  }

  getGeneralErrorMessage(messageCode: string) {

    return this.$t('view.repo.alert.' + messageCode);

  }

  showRetryBtn(item: any) {
    const a = JSON.parse(item.notificationData);

    const code = a.messageCode;

    //"ServiceContextInfoImpl", "WorkflowContextInfoImpl" 일때 나눠서 적용해야한다

    // 50
    if(code == undefined) return false;
    const numcode = code == 'HTTP_500' ? '500' : code.split('_')[3]
    if(code.substring(0, 2) == '50') return true;
    else return false; //'40' +  그외 에러
  }

  showMoveToPageBtn(item: any) {
    const a = JSON.parse(item.notificationData);

    const code = a.messageCode;

    //"ServiceContextInfoImpl", "WorkflowContextInfoImpl" 일때 나눠서 적용해야한다

    // 50
    if(code == undefined) return false;
    const numcode = code == 'HTTP_500' ? '500' : code.split('_')[3]
    if(code.substring(0, 2) == '50' || code.substring(0, 2) == '40' ) return false;
    else return true;
  }
  
  onClickRetry(item: any) {

    if((JSON.parse(item.notificationData))._type == "ServiceContextInfoImpl") {

      this.$store.dispatch('notification/retryNotificationService', {serviceId: item.serviceId});

    }
    else if((JSON.parse(item.notificationData))._type == "WorkflowContextInfoImpl"){

      this.$store.dispatch('notification/retryNotificationWorkflow', {serviceId: item.serviceId});

    }
  }

  isItEventMapping(item: any) { 

    if((JSON.parse(item.notificationData)).client == undefined){
      return false;
    }

    const title = (JSON.parse((JSON.parse(item.notificationData)).client.state)).title;

    if(title == 'view.router.repositoryMappingCheck.title'
      || title == 'view.router.datasetMappingCheck.title') return true;
    else return false;
  }

  isItDataImport(item: any) { 

    if((JSON.parse(item.notificationData)).client == undefined){
      return false;
    }

    const title = (JSON.parse((JSON.parse(item.notificationData)).client.state)).title;

    if(title == 'view.router.fileImporting.title'
      || title == 'view.router.databaseImporting.title') return true;
    else return false;
  }

  isItFiltering(item: any) { 

    if((JSON.parse(item.notificationData)).client == undefined){
      return false;
    }

    const title = (JSON.parse((JSON.parse(item.notificationData)).client.state)).title;

    if(title == 'view.router.eventFiltering.title'
      || title == 'view.router.dataFiltering.title') return true;
    else return false;
  }

  getNotificationMsg(item: any) {

    //1. type: (JSON.parse(item.notificationData)).state = 'QUEUED', 'RUNNING', 'ERROR', 'COMPLETED'
    //2. menu: const clientState = JSON.parse(nData.client.state);
    //

    const nData = JSON.parse(item.notificationData);

    const type = (JSON.parse(item.notificationData)).state;

    if(nData.client == undefined) return 'client undefined';
    const clientState = JSON.parse(nData.client.state);

    // this.$t('view.repo.notificationMsg.' + '' + '', {})
    let realType = type;
    if(((JSON.parse(item.notificationData)).state == 'ERROR' 
      || (JSON.parse(item.notificationData)).client == null) 
      || ((JSON.parse(item.notificationData)).messageCode != null
      ||  (JSON.parse(item.notificationData)).messageCode != undefined)) {
            realType = 'ERROR';
    }
    
    if(clientState.datasetImporting != null) {

      //데이터셋 이름
      const datasetName = this.handleSampleEventLogDS(clientState.datasetImporting.dataSetName, clientState.datasetImporting.eventName);

      //완료: 바로가기 -> 데이터셋 목록
      //실패: 바로가기 -> 업로드 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'datasetImporting.' + '', {datasetName: })

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'datasetImporting.' + 'queued', {datasetName: datasetName});//`[${datasetName}] 업로드를 준비 중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'datasetImporting.' + 'running', {datasetName: datasetName});//`[${datasetName}] 을/를 업로드 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'datasetImporting.' + 'error', {datasetName: datasetName});//`[${datasetName}] 생성에 실패하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'datasetImporting.' + 'completed', {datasetName: datasetName});//`[${datasetName}] 생성이 완료되었습니다.`;
      }
    

    }else if(clientState.dataFilter != null) {

      //데이터셋 이름
      const datasetName = this.handleSampleEventLogDS(clientState.dataFilter.dataSetName, clientState.dataFilter.eventName);

      //완료: 바로가기->데이터셋 목록
      //실패: 바로가기->데이터 필터 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'dataFilter.' + '', {datasetName: datasetName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'dataFilter.' + 'queued', {datasetName: datasetName}); //`[${datasetName}] 에 대한 필터 적용을 준비 중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'dataFilter.' + 'running', {datasetName: datasetName}); //`[${datasetName}] 에 대한 필터 적용을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'dataFilter.' + 'error', {datasetName: datasetName}); //`[${datasetName}] 에 대한 필터 적용이 실패하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'dataFilter.' + 'completed', {datasetName: datasetName}); //`[${datasetName}] 에 대한 필터 적용이 완료되었습니다.`;
      }


    }else if(clientState.eventMapping != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.eventMapping.eventName);

      //완료: 바로가기 -> 데이터셋 목록에서 데이터셋 선택 상태로 설정함
      //실패: 바로가기 -> 매핑 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'eventMapping.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'eventMapping.' + 'queued', {eventName: eventName}); //`[${eventName}] 생성을 준비 중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'eventMapping.' + 'running', {eventName: eventName}); //`[${eventName}] 을/를 생성 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'eventMapping.' + 'error', {eventName: eventName}); //`[${eventName}] 생성에 실패하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'eventMapping.' + 'completed', {eventName: eventName}); //`[${eventName}] 생성이 완료되었습니다.`;
      }
      

    }else if(clientState.eventFilter != null) { 

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.eventFilter.eventName);

      //완료: 바로가기 -> 데이터셋 목록에서 데이터 셋 선택 상태로 설정함
      //실패: 바로가기 -> 이벤트 필터 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'eventFilter.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'eventFilter.' + 'queued', {eventName: eventName}); //`[${eventName}] 에 대한 필터 적용을 준비 중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'eventFilter.' + 'running', {eventName: eventName}); //`[${eventName}] 에 대한 필터 적용을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'eventFilter.' + 'error', {eventName: eventName}); //`[${eventName}] 에 대한  필터 적용이 실패하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'eventFilter.' + 'completed', {eventName: eventName}); //`[${eventName}] 에 대한  필터 적용이 완료되었습니다.`;
      }


    }else if(clientState.dashboard != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.dashboard.repository.repositoryName);

      //완료: 바로가기 -> 데이터 요약 페이지
      //실패: 조건에 따라 재요청

      // this.$t('view.repo.notificationMsg.' + 'dashboard.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'dashboard.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비 중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'dashboard.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'dashboard.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'dashboard.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.processDiscovery != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.processDiscovery.repository.repositoryName);

      //완료: 바로가기 -> 프로세스 분석 페이지 
      //실패: 조건에 따라 재요청 -> 프로세스 분석 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'processDiscovery.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'processDiscovery.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비 중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'processDiscovery.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'processDiscovery.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'processDiscovery.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.deltaAnalysis != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.deltaAnalysis.repository.repositoryName);

      //완료: 바로가기 -> 프로세스 비교 페이지
      //실패: 조건에 따라 재요청 -> 프로세스 비교 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'deltaAnalysis.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'deltaAnalysis.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'deltaAnalysis.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'deltaAnalysis.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'deltaAnalysis.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.logReplay != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.logReplay.repository.repositoryName);

      //완료: 바로가기 -> 프로세스 애니메이션 페이지
      //실패: 조건에 따라 재요청 -> 프로세스 애니메이션 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'logReplay.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'logReplay.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'logReplay.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'logReplay.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'logReplay.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.socialAnalysis != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.socialAnalysis.repository.repositoryName);

      //완료: 바로가기 -> 리소스 관계 분석 페이지
      //실패: 조건에 따라 재요청 -> 리소스 관계 분석 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'socialAnalysis.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'socialAnalysis.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'socialAnalysis.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'socialAnalysis.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'socialAnalysis.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.matrixModel != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.matrixModel.repository.repositoryName);

      //완료: 바로가기 -> 데이터 분석 페이지
      //실패: 조건에 따라 재요청 -> 데이터 분석 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'matrixModel.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'matrixModel.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'matrixModel.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'matrixModel.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'matrixModel.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.dotted != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.dotted.repository.repositoryName);

      //완료: 바로가기 -> 액티비티 분석 페이지
      //실패: 조건에 따라 재요청 -> 액티비티 분석 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'dotted.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'dotted.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'dotted.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'dotted.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'dotted.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }


    }else if(clientState.processFlow != null) {

      //이벤트 이름
      const eventName = this.handleSampleEventLog(clientState.processFlow.repository.repositoryName);

      //완료: 바로가기 -> 프로세스 흐름 분석 페이지
      //실패: 조건에 따라 재요청 -> 프로세스 흐름 분석 실패 페이지

      // this.$t('view.repo.notificationMsg.' + 'processFlow.' + '', {eventName: eventName}); //

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'processFlow.' + 'queued', {eventName: eventName}); //`[${eventName}] 의 분석을 준비중입니다.`;
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'processFlow.' + 'running', {eventName: eventName}); //`[${eventName}] 의 분석을 진행 중입니다.`;
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'processFlow.' + 'error', {eventName: eventName}); //`[${eventName}] 의 분석에 오류가 발생하였습니다.`;
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'processFlow.' + 'completed', {eventName: eventName}); //`[${eventName}] 의 분석이 완료되었습니다.`;
      }

      
    }else if(clientState.dataSync != null) {

      //데이터셋 이름 -> 데이터 소스 이름 아닌가?
      const datasourceName = clientState.dataSync.datasourceName;

      //완료: X
      //실패: X

      // this.$t('view.repo.notificationMsg.' + 'dataSync.' + '', {datasourceName: datasourceName});

      switch(realType) {
        case 'QUEUED':
          return this.$t('view.repo.notificationMsg.' + 'dataSync.' + 'queued', {datasourceName: datasourceName});
        case 'RUNNING':
          return this.$t('view.repo.notificationMsg.' + 'dataSync.' + 'running', {datasourceName: datasourceName});
        case 'ERROR':
          return this.$t('view.repo.notificationMsg.' + 'dataSync.' + 'error', {datasourceName: datasourceName});
        case 'COMPLETED':
          return this.$t('view.repo.notificationMsg.' + 'dataSync.' + 'completed', {datasourceName: datasourceName});
      }

      
    }

  }

  closeAllNotiWindow() {

    this.notificationList.forEach((item: any) => {
      this.cardShow[item.serviceId] = false;
    });

  }

  
}
</script>