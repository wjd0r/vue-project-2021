<template>
  <!-- 속성 필터 -->
  <div class="filter-setting-component">
    <div class="filter-setting-content">
      <div class="content-header">
        <h4 class="title">{{$t('view.repo.repositoryFilter.attributeFilter')}}<!--속성 필터--></h4>
      </div>
      <div class="content-body">
        <b-overlay :show="busy" no-fade bg-color="#fff" opacity="1">
        <div class="setting-content">
          <!--속성-->
          <div class="attribute-content">
            <div class="form-content">
              <b-form-group id="FieldSelect"  :label="$t('view.repo.repositoryFilter.selectField')" label-cols="2" label-for="event-name">
                <b-form-select v-model="field" :options="fields"></b-form-select>
              </b-form-group>
            </div>
            <div class="selection-list">
              <div class="left-content">
                <div class="content-header" desc="전체 속성">{{$t('view.repo.repositoryFilter.attribute.allAttributes')}}<!--전체 속성--></div>
                <draggable class="content-body " ref="leftContent" :list="propertyList" :group="{ name: 'property', pull: leftPullEvent, put: false, draggable: '.item' }" :sort="false">
                  <!--<div class="item" v-for="(item, index) in propertyList" :key="index">-->
                  <div class="item" :class="{ active: item.id === selectedLeft.id && !getRelation(item.id), 'd-none': getRelation(item.id) }" 
                  v-for="(item, index) in propertyList" :key="'left_' + item.id" @click="selectProperty(item.id, index, 'left')">
                    <div class="item-text">{{item.name}}</div>
                  </div>
                </draggable>
              </div>
              <div class="btn-group btn-multi">
                <b-button variant="outline-secondary" class="btn-move btn-plus ico-plus" @click="addProperty()" alt="더하기 아이콘"></b-button>
                <b-button variant="outline-secondary" class="btn-move btn-minus ico-minus" @click="removeProperty()" alt="빼기 아이콘"></b-button>
                <b-button variant="outline-secondary" class="btn-move btn-bothsides" @click="switchProperty()"><div class="ico-bothsides" alt="양방향 아이콘"></div></b-button>
              </div>
              <div class="right-content">
                <div class="content-header" desc="선택된 속성">{{$t('view.repo.repositoryFilter.attribute.selectedAttributes')}}<!--선택된 속성--></div>
                <draggable class="content-body" :list="includedPropertyList" :group="{ name: 'property', draggable: '.item' }" :sort="false" @end="endEvent">
                  <!--<div class="item" v-for="(item, index) in includedPropertyList" :key="index">-->
                  <div class="item" :class="{ active: item.id === selectedRight.id }" v-for="(item, index) in includedPropertyList"
                        :key="'right_' + item.id" @click="selectProperty(item.id, index, 'right')">
                    <div class="item-text">{{item.name}}</div>
                  </div>
                </draggable>
              </div>
            </div>
            <div class="notice-text m-none">{{$t('view.repo.alert.registerHelp')}}<!--※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div>
            <div class="notice-text m-notice">{{$t('view.repo.alert.registerHelpButton')}}<!--※ 버튼을 이용하여 등록할 수 있습니다.--></div>
          </div>
          <!--속성-->
        </div>
        </b-overlay>
      </div>
    </div>
  </div>
  <!-- 속성 필터 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Draggable from "vuedraggable";
import _ from 'lodash';
import { utils } from '@/common';

import { UtilsMixin } from '@/mixin';
import store from '../../../store';

@Component({
 components: {
   Draggable
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',

 }),
})
export default class FilterAttribute extends Mixins(UtilsMixin) {
 /* Prop 선언 */
 @Prop()
 selectedItem: any;

 @Prop()
 repoEventView: any;

 /* mapGetters 변수 선언 */
 projectId!: any;


 /* 클래스 변수 선언 */

 //draganddrop
  propertyList: any[] =[{id: 1, name: 'Value1'}, {id: 2, name: 'Value2'}];
  includedPropertyList: any[] = [];

  $refs!: {
    
    leftContent: any;
  };

  selectedLeft = {
    id: '',
    index: -1,
  };
  selectedRight = {
    id: '',
    index: -1,
  };

  fields: any[] = [{text: 'column 1', value: 0},{text: 'column 2', value: 1}];
  field: any = 0;

  busy: boolean = false;

 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 
 created(){

   const res = this.$store.dispatch('repository/getRepoEventView', {
      eventId: this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId,
      projectId: this.projectId
   }).then((res: any)=>{

     const caseAttributes = res.data.data.caseAttributes;
     const eventAttributes = res.data.data.eventAttributes;
     const caseAttributeKeys = Object.keys(res.data.data.caseAttributes);
     const eventAttributeKeys = Object.keys(res.data.data.eventAttributes);
     const fieldAliases = res.data.data.fieldAliases;

     //caseAttributes {ci: "ci", c5: "cb", c10: "cb", c11: "cb", c19: "cb", c20: "cb"}
     //eventAttributes {ea: "ea", eo: "eo", c12: "eb", c13: "eb", c14: "eb", c15: "eb", c16: "eb", c17: "eb", c18: "eb",…}

     const attributesList = ['ci', 'ea', 'er', 'eo', 'eb', 'cb'];
     //속성 필터: ea, er, eo + eb, cb -> fieldAliases
     const included: any[] = [];
     const fieldsList: any[] = [];
     
     caseAttributeKeys.forEach((attribute: any)=>{
       if(attributesList.includes(caseAttributes[attribute])){
         included.push(attribute);
       }
     });
     eventAttributeKeys.forEach((attribute: any)=>{
       if(attributesList.includes(eventAttributes[attribute])){
         included.push(attribute);
       }
     });
     //let idx = 0;
     included.forEach((attribute: any)=>{
       if(['ci', 'ea', 'er', 'eo'].includes(attribute)){
         const textinput = this.$t('view.process.filter.value.' + attribute);
         fieldsList.push({value: attribute, text: textinput, key: attribute});
       }else{
         fieldsList.push({value: attribute, text: fieldAliases[attribute], key: attribute});
       } 
       //idx++;
     });
     this.fields = fieldsList;
     this.field = this.fields[0].value;
   });

   
 }
 
 /*
 mounted() {
   
 }
 */

 /* 메소드 선언 */

 
 @Watch('field',{immediate: true})
 async fieldChanged(newValue: any, oldValue: any){


    this.busy = true;
    //해당하는 속성 불러오기
    //getRepoEventUtilLookupLite
    await this.$store.dispatch('eventFilter/getRepoEventUtilLookupLite', [ {
        "_type" : "EventRepositoryLookupConfiguration",
        "repository" : {
          "id" : this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId,
          "_type" : "EventRepository",
          "project" : {
            "id" : this.projectId,
            "_type" : "Project"
          },
          "relations" : { }
        },
        "eventFilters" : [ ],
        "field": this.fields.filter(f=>f.value == this.field)[0].key
      } ]
    ).then((res: any)=>{

      //let idx = 0;
      const properties: any[] = [];
      (Object.keys(res.data.data)).forEach((element: any) => {
         properties.push({name: element , id: element});
         //idx++;
      });
      this.propertyList = properties;
      
    });


    this.busy = false;

    if(oldValue == 0 || newValue == 0) return;
    this.includedPropertyList = [];

    this.onClickApply();
 }

 @Watch('includedPropertyList',{immediate: true})
 propertyListChanged(newValue: any){
   this.onClickApply();
 }

  setData(item: any) {
   if(item == null || item.data == null) {
     this.includedPropertyList = [];
     this.field = this.fields[0].value;

     return;
   }
   this.includedPropertyList = item.data.properties;
   this.field = item.data.field.value;
   
 }

 
 onClickApply() {

   const input: any = {};

   //const caseNum = 100;

   const field = this.fields.filter(f=>f.value == this.field)[0]
   const properties = this.includedPropertyList;

   //input.caseNum = caseNum;
   input.field = field;
   input.properties = properties;

   this.$emit('apply', input);
 }

 //draganddrop start
  addProperty() {
    if(this.selectedLeft.index != -1){
      const index = _.findIndex(this.includedPropertyList, ['id', this.selectedLeft.id]);
      if (index === -1) this.includedPropertyList.push(_.cloneDeep(this.propertyList[this.selectedLeft.index]));
      this.selectedLeft.id = '';
      this.selectedLeft.index = -1;
    }
    
  }

  removeProperty() {
    //if(this.selectedRight.index != -1) {
      this.includedPropertyList.splice(this.selectedRight.index, 1);
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    //}
    
  }

  selectProperty(id: string, index: number, direction: string) {
    if (direction === 'left') {
      this.selectedLeft.id = id;
      this.selectedLeft.index = index;
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    } else if (direction === 'right') {
      this.selectedRight.id = id;
      this.selectedRight.index = index;
      this.selectedLeft.id = '';
      this.selectedLeft.index = -1;
    }
  }

  getRelation(id: string) {
    const index = _.findIndex(this.includedPropertyList, ['id', id]);
    return index !== -1 ? true : false;
  }

  leftPullEvent(to: any, from: any, dragEl: Element, evt: Event) {
    return dragEl.classList.contains('disabled') ? false : 'clone';
  }

  endEvent(evt: any) {
    const originEvent = evt.originalEvent;

    if (originEvent.path[0] === this.$refs.leftContent.$el) {
      evt.item.remove();
      this.includedPropertyList.splice(evt.oldDraggableIndex, 1);
    }
  }

  switchProperty() {
    const all = _.clone(this.propertyList);
    const included = _.clone(this.includedPropertyList);
    const includedId = included.map(x => x.id);
    
    const results = all.filter((one: any) => {
      return !includedId.includes(one.id);
    });

    this.includedPropertyList = results;

    //this.propertyList = included;
    //this.includedPropertyList = all;
  }
  //draganddrop end

}
</script>