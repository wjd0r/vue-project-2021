<template>
  <!-- card -->
  <div class="col-6" @click="$emit('clickDataSet', item)">
    <div class="card card-created dataset" :class="{active: isActive(item.id)}"><!-- @click.passive="$emit('checkMultiSelectEG', item, $event)">-->
      <div class="content-header">
        <div v-if="isDb" class="ico-card ico-database" alt="데이터베이스 아이콘"></div>
        <div v-else class="ico-card ico-file" alt="파일 아이콘"></div>
        <h5 class="title">{{ item.name }}</h5>
        <div class="right-align">
          <b-dropdown id="titleDropdown">
            <b-dropdown-item @click.stop.prevent="clickModify">{{ $t('view.repo.list.update') }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.stop.prevent="clickFilter" :class="{ 'd-none': isMobileBlock() }">{{ $t('view.repo.list.dataFilter') }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.stop.prevent="clickDelete" :class="{ 'd-none': isMobileBlock() }">{{ $t('view.repo.list.delete') }}</b-dropdown-item>
            <!-- <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="clickInfo" class="m-inf">정보</b-dropdown-item> -->
          </b-dropdown>
        </div>
      </div>
      <div class="content-body">
        <p class="last-update">{{ $t('view.repo.list.lastUpdated') }} {{ this.formatingModified }}</p>
      </div>
      <div class="content-footer">
        <div class="user-inf">{{ $t('view.repo.list.create') }} - {{item.createdByName}}</div>
        <div class="count-text">{{ $t('view.repo.list.totalEvent') }} ({{this.item.size}})</div>
      </div>
    </div>

    <!-- 수정 modal -->
    <b-modal v-model="modal.modifyShow" body-class="pt-0" centered size="xl" :title="$t('view.repo.event.eventGroup.modal.modifyModalTitle')" hide-footer>
      <DataSetModifyModal ref="modal" :item="modal" @onModifyShow="() => {this.modal.modifyShow = false; $emit('rendering');}" />
    </b-modal>
    <!-- 수정 modal -->

    <!-- 정보 modal -->
    <!-- <b-modal v-model="modal.infoShow" centered size="xl" :title="$t('view.repo.event.eventGroup.modal.infoTitle')" hide-footer>
      <DataSetInfoModal :item="modal" @close="modal.infoShow=false"/>
    </b-modal> -->
    <!-- 정보 modal -->

    <b-overlay :show="showOverlay" :no-wrap="true" @click.native="showOverlay = !showOverlay">
      <template #overlay>
        <b-spinner></b-spinner>
      </template>
    </b-overlay>

  </div>
  <!-- card -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { utils } from '@/common';

import DataSetModifyModal from '../../event/components/DataSetModifyModal.vue';
import DataSetInfoModal from '../../event/components/DataSetInformationModal.vue';

import { UtilsMixin } from '@/mixin';
import { forEach } from 'lodash';
import $ from 'jquery';

@Component({
 components: {
  DataSetModifyModal,
  DataSetInfoModal
 },
 computed: {
    formatingModified() {
      return moment(this.$props.item.modified).format('YYYY-MM-DD HH:mm:ss')
    },
    checkAuthority() {
      const resourceType = 'dataset';
      const action = 'edit';
      return () => utils.getRepoPermissions(this.$data.createdBy, resourceType, action);
    },
    ...mapGetters({
      projectId: 'sso/getProjectId',
      myInfo: 'sso/getMyInfo',
    }),
  },
})
export default class CardDataset extends Mixins(UtilsMixin) {
 /* Prop 선언 */
  @Prop({ default: () => ({}) })
  private item!: any;

  @Prop({ default: () => ({}) })
  private selectedCard!: any;

  @Prop({ default: () => ({}) })
  private isMultiSelectEG: boolean = false;

  @Prop({ default: () => ({}) })
  private multiSelectedEG: any[];

  @Prop()
  selectedWorkspace: number;

  $refs!: {
    modal: DataSetModifyModal;
  }

  projectId!: any;
  checkAuthority!: boolean;
  myInfo!: any;
  deleteParam: any = [];
  modifyParam: object = {};
  modal: {
    modifyShow: boolean;
    infoShow: boolean;
    modifyGroupName: string;
    originalGroupName: string;
    modifyGroupDesc: string;
    fileName: string;
    dataSet: any;
    originalSize: number;
    relDataset: string;
    db: any;
    selectes: any;
    fields: any;
  } = {
    modifyShow: false,
    infoShow: false,
    modifyGroupName: '',
    originalGroupName: '',
    modifyGroupDesc: '',
    fileName: '',
    dataSet: null,
    originalSize: 0,
    relDataset: '-',
    db: null,
    selectes: [],
    fields: [],
  };

  showOverlay: boolean = false;

  created() {
    this.deleteParam = [{
      "_type" : "DatasetSelectConfiguration",
      "selectors" : [{
        "id" : this.item.id, //"ids20210316010257",
        "_type" : "Dataset",
        "project" : {
          "id" : this.projectId, //"iprtest",
          "_type" : "Project"
        }
      }]
    }];
    this.modifyParam = {
      datasetId: this.item.id,
      projectId: this.projectId
    };
  }

  updated() {
    this.deleteParam = [{
      "_type" : "DatasetSelectConfiguration",
      "selectors" : [{
        "id" : this.item.id, //"ids20210316010257",
        "_type" : "Dataset",
        "project" : {
          "id" : this.projectId, //"iprtest",
          "_type" : "Project"
        }
      }]
    }];
    this.modifyParam = {
      datasetId: this.item.id,
      projectId: this.projectId
    };
  }

  async clickDelete() {
    if(!this.permissionsDelete) { // 권한 체크
      utils.noPermissionAlert(this);
    } else {
      const title = this.$t("view.repo.alert.groupDelete.title").toString();
      const content = this.$t("view.repo.alert.groupDelete.content").toString();
      const yes = this.$t('view.repo.button.yes').toString();
      const no = this.$t('view.repo.button.no').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');
      if(res) { // 삭제 진행
        const res = await this.$store.dispatch('repository/getRepoDataDelete', this.deleteParam);
        if(res.data.data == true) {
          this.$emit('rendering');
        }
      }
    }
  }

  async clickModify() {
    if(!this.permissionsSelete) {
      utils.noPermissionAlert(this);
    } else {
      this.showOverlay = true;
      const res = await this.$store.dispatch('repository/getRepoDataView', this.modifyParam);

      this.modal.modifyGroupName = res.data.data.name;
      this.modal.originalGroupName = res.data.data.name;
      this.modal.modifyGroupDesc = res.data.data.description;
      this.modal.originalSize = res.data.data.originalSize;
      this.modal.relDataset = res.data.data.relatedDatasetName == undefined ? '-' : res.data.data.relatedDatasetName;
      this.modal.fileName = res.data.data.origin.filenames === undefined ? '' : res.data.data.origin.filenames[0].split('/').slice(-1)[0];
      this.modal.dataSet = this.item;
      this.modal.db = {...res.data.data.origin};

      const fields: any[] = [];
      for (const [key, value] of Object.entries(res.data.data.fields)) {
        fields.push({
          key: key,
         label: value, 
          sortable: true,
          mappingColumn: '',
          mappingFormat: 'yyyy-MM-dd HH:mm:ss', //'yyyy/MM/dd HH:mm:ss', //'YYYY/MM/DD HH24:MI:SS',
        });

        if(this.$route.params.selectes != undefined) {
          this.modal.selectes = this.$route.params.selectes;
        } else {
          this.modal.selectes.push({
            key: key,
            label: value,
            selected: {
              alice:'false',
              boston:'false',
              nunuca:'false',
              raclette:'false',
              wimmers:'false',
            }
          });
        }
      }

      this.modal.fields = fields;


      this.showOverlay = false;
      this.modal.modifyShow = true; 
    }
  }

  //쓰이지 않음
  async clickInfo() {
    if(!this.checkAuthority) { // 권한 체크
      utils.noPermissionAlert(this);
    } else {
      const res = await this.$store.dispatch('repository/getRepoDataView', this.modifyParam);
  
      this.modal.modifyGroupName = res.data.data.name;
      this.modal.originalGroupName = res.data.data.name;
      this.modal.modifyGroupDesc = res.data.data.description;
      this.modal.originalSize = res.data.data.originalSize;
      this.modal.fileName = res.data.data.origin.filenames === undefined ? '' : res.data.data.origin.filenames[0].split('/').slice(-1)[0];
      this.modal.dataSet = this.item;
      this.modal.infoShow = true; 
    }
  }

  clickFilter() {

    const subDatasetCreateInfo: any = {}; 
    subDatasetCreateInfo.dataSetId = this.item.id;
    subDatasetCreateInfo.selectedWorkspace = this.selectedWorkspace;
    this.$store.commit('dataFilter/setSubDatasetCreateInfo', subDatasetCreateInfo);

    this.$router.push({
        name: 'DatasetFilterCreateForm',
        params: {
          datasetId: this.item.id
        }
      });
  }


  isActive(id: string) {
    return this.selectedCard.id == id || this.multiSelectedEG.includes(id);
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
  checkPermissions(resourceCode: string, operationCode: string) {
    if(Array.isArray(this.resourceGroupId)) {
      let result = false
      forEach(this.resourceGroupId, resourceGroupId => {
        const bool = utils.checkPermission(this.projectId, String(this.groupId), resourceGroupId, resourceCode, operationCode);
        if(bool)
          result = true;
      });
      return result;
    }
    return utils.checkPermission(this.projectId, String(this.groupId), this.resourceGroupId, resourceCode, operationCode);
  }

  get permissionsSelete() {
    return this.checkPermissions('repo.dataset', 'view');
  }

  get permissionsDelete() {
    return this.checkPermissions('repo.dataset', 'delete');
  }

  get groupId() {
    return this.myInfo.groupId;
  }

  get resourceGroupId() {
    const { defaultWorkspace } = this.$store.getters['sso/getSetting'].common.workspace;
    if ( defaultWorkspace == null || defaultWorkspace == 'ALL' ) {
      return this.myInfo.workspaces.map((workspace: any) => workspace.iprResourceGroupId);
    } else {
      return this.myInfo.workspaces.find((workspace: any) => workspace.id == defaultWorkspace).iprResourceGroupId;
    }
  }

  get isDb() {
    return this.item.origin.originType == 'database' ||
          this.item.origin.originType == 'psql' ||
          this.item.origin.originType == 'oracle' ||
          this.item.origin.originType == 'mssql' ||
          this.item.origin.originType == 'mysql' ||
          this.item.origin.originType == 'mariadb';
  }

  

}
</script>