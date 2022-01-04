<template>
  <!-- card -->
  <div class="col-6" @click="onClick"><!--@click="onClick"-->
    <div class="card card-created event"  :class="{active: isActive(item.id)}" @click.passive="$emit('checkMultiSelectE', item, $event)">
      <div class="content-header">
        <div class="ico-card ico-log" alt="이벤트로그 아이콘" :class="{'ico-log': getIcon('file'), 'ico-log-db': getIcon('db') }" ></div>
        <h5 class="title">{{ item.name }}</h5>
        <div class="right-align">
          <b-dropdown id="titleDropdown">
            <b-dropdown-item @click.prevent="clickBookmarkOption">{{(existInBookmark) ? ($t('view.repo.alert.bookmark.remove.title').toString()) : ($t('view.repo.alert.bookmark.add.button').toString())}}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="clickModify" :class="{ 'd-none': isMobileBlock() }">{{$t('view.repo.cardRepository.seeInfo')}}<!--정보 보기--></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="clickFilter" :class="{ 'd-none': isMobileBlock() }">{{ $t('view.repo.list.eventFilter') }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="clickDelete" :class="{ 'd-none': isMobileBlock() }">{{$t('view.repo.cardRepository.delete')}}<!--삭제--></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="clickInfo" class="m-inf">{{$t('view.repo.cardRepository.seeInfo')}}<!--정보 보기--></b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="content-body">
        <template v-if="this.relationsRelation != ''">
          <div class="standard-inf">
            <div class="ico-card ico-flow-standard" alt="표준프로세스 아이콘"></div><!-- this.relationsRelation-->
            <div class="count-text">{{$t('view.repo.cardRepository.standardProcess')+' (' +(Object.keys(item.attributes["saas.relatedModels"].value)).length}})</div>
          </div>
        </template>
      </div>
      <div class="content-footer">
        <div class="user-inf">{{$t('view.repo.cardRepository.create')}} - {{item.createdByName}}</div>
        <div class="last-update">{{ this.formatingModified }}</div>
      </div>
    </div>

    <!-- 이벤트 수정 modal -->
    <b-modal v-model="modal.modifyShow" body-class="pt-0" size="xl" :title="$t('view.repo.event.eventLog.modal.modifyTitle')" centered hide-footer>
      <EventModifyModal :eventModal="modal" @updateEvent="$emit('rendering')" :selectedCard="selectedCard" @closeEventModifyModal="closeEventModifyModal"/>
    </b-modal>
    <!-- 이벤트 수정 modal -->

    <!-- 이벤트 정보 modal -->
    <b-modal v-model="modal.infoShow" body-class="pt-0" size="xl" :title="$t('view.repo.event.eventLog.modal.infoTitle')" centered hide-footer>
      <EventInformationModal :eventModal="modal" @updateEvent="$emit('rendering')" :selectedCard="selectedCard" @close="modal.infoShow=false"/>
    </b-modal>
    <!-- 이벤트 정보 modal -->
  </div>
  <!-- card -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { utils } from '@/common';
import { ISetting } from '@/interface';


import { UtilsMixin } from '@/mixin';

import EventModifyModal from '../../event/components/EventModifyModal.vue';
import EventInformationModal from '../../event/components/EventInformationModal.vue';

@Component({
 components: {
   EventModifyModal,
   EventInformationModal,
 },
 computed: {
    formatingModified() {
      return moment(this.$props.item.modified).format('YYYY-MM-DD HH:mm:ss')
    },
    relationsRelation() {
      /*return Object.prototype.hasOwnProperty.call(this.$props.item, "relations") ? 
        Object.entries(this.$props.item.relations)[0][1] : '';*/
      return (this.$props.item.attributes["saas.relatedModels"]!=undefined && this.$props.item.attributes["saas.relatedModels"].value != null) ?
        this.$props.item.attributes["saas.relatedModels"].value.name : '';
    },
    checkAuthority() {
      const resourceType = 'dataset';
      const action = 'edit';
      return () => utils.getRepoPermissions(this.$data.createdBy, resourceType, action);
    },
    ...mapGetters({
      projectId: 'sso/getProjectId',
      myInfo: 'sso/getMyInfo',
      readOnlySetting: 'sso/getSetting',
    }),
 },
})
export default class CardRepository extends Mixins(UtilsMixin)  {
  
  readonly readOnlySetting!: ISetting;

  projectId!: any;
  checkAuthority!: boolean;
 /* Prop 선언 */
  @Prop({ default: () => ({}) })
  private item!: any;

  @Prop({ default: () => ({}) })
  private selectedCard!: any;

  @Prop({ default: () => ({}) })
  private isMultiSelectE: boolean = false;

  @Prop({ default: () => ({}) })
  private multiSelectedE: any[];

  @Prop()
  selectedWorkspace: number;

  @Prop()
  bookmarkList: any;

  myInfo!: any;

  modal: any = {
    infoShow: false,
    modifyShow: false,
    eventCard: {},
  }

  deleteParam: any = [];

  existInBookmark: boolean = false;
  //bookmarkMenu: string = '';
  bookmarkId: string = '';

  mounted() {
    this.deleteParam = [{
      "_type" : "EventRepositorySelectConfiguration",
      "selectors" : [ {
        "id" : this.item.id, //"ids20210316010257",
        "_type" : "Dataset",
        "project" : {
          "id" : this.projectId, //"iprtest",
          "_type" : "Project"
        }
      }]
    }];

    this.existsInBookMarkList();

  }

  @Watch('item', {immediate: true})
  onItemChanged() {
    this.existsInBookMarkList();
  }

  // 삭제 버튼 클릭
  async clickDelete() {

    //if(!this.checkAuthority) { // 권한 체크
    if(!this.permissionEventLogDelete()){
      utils.noPermissionAlert(this);
    } else {
      const title = this.$t("view.repo.alert.eventDelete.title").toString();
      const content = this.$t("view.repo.alert.eventDelete.content").toString();
      const yes = this.$t('view.repo.button.yes').toString();
      const no = this.$t('view.repo.button.no').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');
      if (res) { // 삭제 진행
        const res = await this.$store.dispatch('repository/getRepoEventDelete', this.deleteParam);
        if(res.data.data == true) {
          this.$emit('renderingDS');
        }
      }
    }
  }

  async clickModify() {
    
    //if(!this.checkAuthority) { // 권한 체크
    if(!this.permissionEventLogUpdate()){
      utils.noPermissionAlert(this);
    } else {
      this.modal.modifyShow = true;
      this.modal.eventCard = this.item;
    }
  }

  
  async clickInfo() {
    //if(!this.checkAuthority) { // 권한 체크
    //  utils.noPermissionAlert(this);
    //} else {
      this.modal.infoShow = true;
      this.modal.eventCard = this.item;
    //}
  }

  onClick(event: any) {

    if(this.isMultiSelectE) return;

    if(event.path[3].id == "titleDropdown"){
      return;
    }
    
    const routerName = this.readOnlySetting.common.workspace.whenEventLogIsClicked;
    this.$router.push({ 
      name: routerName,
      params: {
        projectId: this.projectId,
        repositoryId: this.item.id,
      }
    });
  }

  isActive(id: string) {
    return this.multiSelectedE.includes(id);
  }

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
 closeEventModifyModal() {
   this.modal.modifyShow = false;
 }

 async clickBookmarkOption() {

    if(this.existInBookmark) {

      //북마크 해제 confirm
      const title = this.$t('view.repo.alert.bookmark.remove.title').toString();
      const content = this.$t('view.repo.alert.bookmark.remove.confirm').toString();
      const yes = this.$t('view.repo.button.yes').toString();
      const no = this.$t('view.repo.button.no').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');

      if(res){
        this.$store.dispatch('sso/removeBookmark', { preferenceId: this.bookmarkId})
        .then((res2: any)=>{

        if(res2.status=='200'){
          const title = this.$t('view.repo.alert.bookmark.remove.title').toString();
          const content = this.$t('view.repo.alert.bookmark.remove.content').toString();
          utils.bvModalmsgBoxOk(this, title, content, 'complete')
          .then((res2: any) =>{ 
            //this.bookmarkMenu = this.$t('view.repo.alert.bookmark.add.button').toString(); //북마크
            this.existInBookmark = false;
          });
        }
      });
      }

    }else{
      const data = 
      {
        "userId" : this.myInfo.id,
        "featureId" : this.item.id,
        "data" : "sample",
        "attribute" : {
          "name" : "sample"
        }

      };

      this.$store.dispatch('sso/saveBookmark', data)
      .then((res: any)=>{

        if(res.status=='200'){
          const title = this.$t('view.repo.alert.bookmark.add.title').toString();
          const content = this.$t('view.repo.alert.bookmark.add.content').toString();
          utils.bvModalmsgBoxOk(this, title, content, 'complete')
          .then((res2: any) =>{
            this.bookmarkId = res.data.id;
            //this.bookmarkMenu = this.$t('view.repo.alert.bookmark.remove.title').toString(); //북마크 해제
            this.existInBookmark = true;
          });

          
        }

      
      })
    }
  }

  existsInBookMarkList() {
    //this.$store.dispatch('sso/getBookmarkList', {userId: this.myInfo.id})
    //.then((res: any)=>{

      const list = this.bookmarkList.data;
      const idList = list.map((l: any) => {
        return l.featureId;
      });

      if(idList.includes(this.item.id)) {
        const idx = idList.indexOf(this.item.id);
        this.bookmarkId = list[idx].id;
        this.existInBookmark = true;
        //this.bookmarkMenu = this.$t('view.repo.alert.bookmark.remove.title').toString();
      }else{
        this.existInBookmark = false;
        //this.bookmarkMenu = this.$t('view.repo.alert.bookmark.add.button').toString();
      }

    //});
  }

  permissionEventLogUpdate() {

    if(this.item.resourceGroup == undefined) return true;
    
    const resourceGroupId = this.item.resourceGroup.id;
    const createdBy = this.item.createdBy;
    const projectId = this.$store.getters['sso/getProjectId'];
    const workspace = utils.getWorkspaceByRgId(resourceGroupId);
    const groupId = workspace.groupId;
  
    if(utils.checkPermission(projectId, groupId, resourceGroupId, 'repo.repository', 'update', createdBy)){
      return true;
    }else {
      return false;
    }
  }

  permissionEventLogDelete() {

    if(this.item.resourceGroup == undefined) return true;
    
    const resourceGroupId = this.item.resourceGroup.id;
    const createdBy = this.item.createdBy;
    const projectId = this.$store.getters['sso/getProjectId'];
    const workspace = utils.getWorkspaceByRgId(resourceGroupId);
    const groupId = workspace.groupId;
  
    if(utils.checkPermission(projectId, groupId, resourceGroupId, 'repo.repository', 'delete', createdBy)){
      return true;
    }else {
      return false;
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

  clickFilter() {

    this.$store.commit('eventFilter/setSubEventCreateInfo', {
        repositoryId: this.item.id,
        datasetId: this.selectedCard.id,
        datasetName: this.selectedCard.name,
        resourceGroupId: this.item.resourceGroup.id,
        selectedWorkspace: this.selectedWorkspace
      })
    


    this.$router.push({ 
      name: "SubRepositoryCreateForm",
      params: {
          repositoryId: this.item.id
        }
    });

  }

}
</script>