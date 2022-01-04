<template>
  <b-modal v-model="item.infoShow" centered size="xl" :title="title" hide-footer>
    <!-- 원본데이터 정보 -->
    <ValidationObserver v-if="item.infoShow" ref="form" tag="form" @submit.prevent="modifyDataSetInfo" id="DatasetModify">
      <div class="content-body" v-if="item.infoShow">
        <!-- form : dataser > file -->
        <div class="form-content">
            <b-form-group label-cols="2" :label="$t('view.repo.label.datasetName')">
              <b-input-group> 
                <b-form-input disabled :value="item.modifyGroupName" @input.native="item.modifyGroupName = $event.target.value" v-model="item.modifyGroupName" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')"></b-form-input>
              </b-input-group>
            </b-form-group>
          <b-form-group label-cols="2" :label="$t('view.repo.label.datasetDescription')">
              <b-form-input v-model="item.modifyGroupDesc" :placeholder="$t('view.repo.form.putDatasetDesc')" disabled></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" :label="$t('view.repo.label.classifier')">
            <b-form-input v-model="item.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="2" :label="$t('view.repo.label.fileName')">
            <b-form-input v-model="item.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" :label="$t('view.repo.label.relDataset')">
            <b-form-input v-model="item.relDataset" autofocus required autocomplete="off" disabled></b-form-input>
          </b-form-group>

        </div>
        <!-- form : dataser > file -->

        <!-- form : dataser > db -->
        <!-- <div class="form-content">
            <b-form-group label-cols="2" label="원본데이터 이름">
              <b-input-group> 
                <b-form-input :value="groupModal.modifyGroupName" @input.native="groupModal.modifyGroupName = $event.target.value" v-model="groupModal.modifyGroupName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.groupNamePlaceHolder')" :state="getValidationStateEgroupName(validationContext)"></b-form-input>
                <b-form-invalid-feedback>
                  <span v-if="haveSameNameEgroup()">{{$t("view.repo.alert.sameNameDataSet")}}</span>
                  <span v-if="groupModal.modifyGroupName != '' && regexTest(groupModal.modifyGroupName)">{{$t("view.repo.alert.regexTest")}}</span>
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          <b-form-group label-cols="2" label="원본데이터 설명">
              <b-form-input v-model="groupModal.modifyGroupDesc" placeholder="원본데이터 셜명을 입력하세요"></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="구분">
            <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
          </b-form-group>
          <b-form-group label-cols="2" label="DB 연결">
            <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
          </b-form-group>

          <div class="row row-content">
            <b-form-group label-cols="3" label="Host" class="col-6 col-content">
              <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
            </b-form-group>
            <b-form-group label-cols="3" label="Port" class="col-6 col-content">
              <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
            </b-form-group>

            <b-form-group label-cols="3" label="Rloe" class="col-6 col-content">
              <b-form-select v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-select>
            </b-form-group>
            <b-form-group label-cols="3" label="Username" class="col-6 col-content">
              <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="3" label="Password" class="col-6 col-content">
              <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="3" label="connection" class="col-6 col-content">
              <b-form-select v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-select>
            </b-form-group>

            <b-form-group label-cols="3" label="Database" class="col-6 col-content">
              <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
            </b-form-group>
            <b-form-group label-cols="3" label="Target Table" class="col-6 col-content">
              <b-form-input v-model="groupModal.fileName" autofocus required autocomplete="off" :placeholder="$t('view.repo.event.eventGroup.modal.fileName')" disabled></b-form-input>
            </b-form-group>
          </div>
        </div> -->
        <!-- form : dataser > db -->

        <!-- table -->
        <div class="table-component">
          <div class="content-header">
            <h5 class="title">{{ $t('view.repo.form.dataList') }}</h5>
            <div class="count-text">({{totalRows}})</div>
          </div>
          <div class="content-body">
            <div class="table-content">
                <b-table bordered :items="items" :fields="fields" v-show="tableVisible" :style="{ width: tableWidth }" responsive />
            </div>
          </div>
        </div>
        <!-- table -->

        <!-- footer -->
        <div class="content-footer">
          <div class="btn-group">
            <b-button type="submit" variant="primary" class="btn-modify">{{ $t('view.repo.button.modify') }}</b-button>
            <b-button type="button" @click.prevent="item.modifyShow = false" class="btn-cancel">{{ $t('view.repo.button.cancel') }}</b-button>
            <b-button type="button" @click.prevent="item.modifyShow = false" class="btn-close m-btn" @click="$emit('close')">{{ $t('view.repo.button.close') }}</b-button>
          </div>
        </div>
        <!-- footer -->
      </div>
    </ValidationObserver>
    <!-- 원본데이터 수정 -->
  </b-modal>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { utils } from '@/common';
import { AxiosResponse } from 'axios';

import _ from 'lodash';

import { UtilsMixin } from '@/mixin';

@Component({
  computed: mapGetters({
    projectId: 'sso/getProjectId',
    myInfo: 'sso/getMyInfo',
  }),
})
export default class DataSetInformationModal extends Mixins(UtilsMixin) {

  //repoEventView!: any;
  projectId!: any;
  myInfo!: any;

  @Prop()
  item!: any;

  regEx: any = /^[ㄱ-ㅎ|ㅏ-ㅡ|가-힣|a-z|A-Z|0-9|\s]+$/;

  // data table
  items: any = [];
  fields: any = [];
  tableVisible: boolean = false;
  tableWidth: string = '100%';
  pageNumber: number = 1; // 1page
  size: number = 5; // 5개 행
  selectes: any = [];
  totalRows: number = 0;

  created() {
    /* setTimeout(() => {
      this.getFields();
    }, 2000); */
  }

  onModifyShow() {
    this.$emit('onModifyShow');
  }

  // getData()
  //데이터 정보 가져오기
  getRepoDataViewData() {
    this.$store.dispatch('repository/getRepoDataViewData', {
      projectId: this.projectId,//this.$route.params.projectId,
      datasetId: this.item.dataSet.id,
      page: this.pageNumber - 1,
      size: this.size,
    }).then((res: AxiosResponse) => {
      //데이터 내용 변화에 반응
      const data = res.data.data
      const keys = Object.keys(data.results);
      const items: any = [];
      keys.forEach((key: any) => {
        const item = data.results[key];
        items.push(item);
      });

      this.totalRows = data.totalElements;
      this.items = items;
    });
  }

  getFields() {
    if(this.item.dataSet == undefined || this.item.dataSet == null)
      return 0;
    this.$store.dispatch('repository/getRepoDataView', {
      projectId: this.projectId, //this.$route.params.projectId,
      datasetId: this.item.dataSet.id,
    }).then((res: AxiosResponse) => {
      //필드 정보 변화에 반응
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
          this.selectes = this.$route.params.selectes;
        } else {
          this.selectes.push({
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

      this.fields = fields;
      this.getTableWidth();
      this.tableVisible = true;
      this.getRepoDataViewData();
    });
  }

  getTableWidth() {
    if (document.querySelector('div.mapping-table-frame')) {
      const frame = document.querySelector('div.mapping-table-frame').clientWidth;
      const table = this.fields.length * 200;
      if (frame > table) {
        this.tableWidth = '100%';
      } else {
        this.tableWidth = table + 'px';
      }
    }
  }

  getValidationStateEgroupName({ dirty, validated, valid = null }: any) {
    if(this.haveSameNameEgroup()){
      return false;
    }else{
      return dirty || validated ? valid : null;
    }
  }

  haveSameNameEgroup() {
    const elements = this.item.elements;
    let sameNameDataSet: boolean = false;

    if(this.item.dataSet !== undefined) {
      for(const id in elements){
        const project = elements[id];

        if((this.item.dataSet.id != id) 
          && (project.name == this.item.modifyGroupName)){
          sameNameDataSet = true;
        }
      }
    }
    return sameNameDataSet;
  }

  regexTest(name: string) {
    const regex = new RegExp(this.regEx);
    return !regex.test(name); //정규표현식 일치 안할 때 true 리턴
  }

  // 내 원본 데이터 수정
  async modifyDataSetInfo() {
    //공백 체크
		if(this.item.modifyGroupName.trim() == '') {
			const title = this.$t("view.repo.alert.title.alarm").toString();
			const content = this.$t("view.repo.alert.blankTest").toString();

			utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
			return;
		}

    //regex 체크
    if(this.regexTest(this.item.modifyGroupName)) {
      const title = this.$t("view.repo.alert.title.alarm").toString();
      const content = this.$t("view.repo.alert.regexTest").toString();

      utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
				if(res) return;
			});
      return;
    }


      //이름 중복 체크
      const elements = this.item.elements;
      let sameNameDataSet: boolean = false;
      for(const id in elements){
        const project = elements[id];
        if((this.item.dataSet.id != id) 
          && (project.name == this.item.modifyGroupName)){
          sameNameDataSet = true;
        }
      }

      if(sameNameDataSet){

        this.item.modifyGroupName = this.item.originalGroupName;
        const title = this.$t("view.repo.alert.title.alarm").toString();
        const content = this.$t("view.repo.alert.sameNameDataSet").toString();

        utils.bvModalmsgBoxOk(this, title, content, 'warning').then((res: any) => {
          if(res) return;
        });
        return;
      }

      
      const title = this.$t('view.repo.alert.title.datasetModify').toString();
      const content = this.$t('view.repo.alert.wantToEdit').toString();
      const yes = this.$t('view.repo.alert.button.modify').toString();
      const no = this.$t('view.repo.button.cancel').toString();
      const res = await utils.bvModalmsgBoxConfirm(this, title, content, yes, no, 'warning');
      if(!res) return;
      const egroupId = this.item.dataSet.id;
      this.$store.dispatch('repository/getRepoDataSave', {
        datasetId: egroupId,
        datasetName: this.item.modifyGroupName,
        datasetDesc: this.item.modifyGroupDesc,
        projectId: this.projectId
      }).then((res: any) => {
        this.onModifyShow();
        if(res.data.data != null){
          this.$emit('renderingDataSet');
          //원본 데이터 표시 해제
          /* this.userDataSet.forEach((element: any) => {
            const uid = '#egroup-' + element.id;
            $(uid).attr('class', 'card group');
          }); */

          this.item.groupModifyShow = false;

          //this.groupModal.dataSet = null;
          //this.selectedDataSet = {};
        }
          
      });
  }
}
</script>
