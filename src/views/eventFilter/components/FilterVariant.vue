<template>
  <!-- 프로세스 그룹 필터 -->
  <div class="filter-setting-component">
    <div class="filter-setting-content">
      <div class="content-header">
        <h4 class="title">{{$t('view.repo.repositoryFilter.variantFilter')}}<!--프로세스 그룹 필터--></h4>
      </div>
      <div class="content-body">
        <b-overlay :show="busy" no-fade bg-color="#fff" opacity="1">
        <div class="setting-content">
          <!-- 프로세스 그룹 -->
          <div class="variant-filter-content"><!--"variant-filter-content"-->
            <div class="selection-list">
              <div class="left-content">
                <div class="content-header" desc="전체 그룹">{{$t('view.repo.repositoryFilter.variant.allVariants')}}<!--전체 그룹--></div>
                <div class="content-body">
                  <table class="table line">
                    <draggable id="div1" ref="leftContent" :list="variantList" :group="{ name: 'variant', pull: leftPullEvent, put: false, draggable: '.item' }" :sort="false">
                      <tr v-for="(item, index) in variantList" :key="'left_' + item.id"
                      :class="{ active: item.id === selectedLeft.id && !getRelation(item.id), 'd-none': getRelation(item.id) }" @click="selectVariant(item.id, index, 'left')">
                        <td class="item-text variant-text">{{item.name}}</td>
                        <td class="item-text cast-text">{{ $t('view.process.variant.title.caseCount') }} : {{ numberWithCommas(item.count) }} ({{ ((item.count / totalCount) * 100).toFixed(2) }}%) {{numberWithCommas((item.duration/(60*60)).toFixed(0))}}hr</td>
                        <td class="item-text detail-text">{{item.signature}}</td>
                      </tr>
                    </draggable>
                  </table>
                </div>
              </div>
              <div class="btn-group btn-multi">
                <b-button variant="outline-secondary" class="btn-move btn-plus ico-plus" @click="addVariant()" alt="더하기 아이콘"></b-button>
                <b-button variant="outline-secondary" class="btn-move btn-minus ico-minus" @click="removeVariant()" alt="빼기 아이콘"></b-button>
                <b-button variant="outline-secondary" class="btn-move btn-bothsides" @click="switchVariant()"><div class="ico-bothsides" alt="양방향 아이콘"></div></b-button>
              </div>
              <div class="right-content">
                <div class="content-header" desc="선택된 그룹">{{$t('view.repo.repositoryFilter.variant.selectedVariants')}}</div>
                <draggable class="content-body" :list="includedVariantList" :group="{ name: 'variant', draggable: '.item' }" :sort="false" @end="endEvent">
                  <div class="item" :class="{ active: item.id === selectedRight.id }" v-for="(item, index) in includedVariantList"
                        :key="'right_' + item.id" @click="selectVariant(item.id, index, 'right')">
                    <div class="item-text">{{item.name}}</div>
                  </div>
                </draggable>
              </div>
            </div>
            <div class="notice-text m-none">{{$t('view.repo.alert.registerHelp')}}<!--※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div>
            <div class="notice-text m-notice">{{$t('view.repo.alert.registerHelpButton')}}<!--※ 버튼을 이용하여 등록할 수 있습니다.--></div>
          </div>
          <!-- 배리언트 -->
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import $ from 'jquery';
import Draggable from "vuedraggable";
import _ from 'lodash';
import { utils } from '@/common';
import store from '../../../store';

@Component({
 components: {
   Draggable
 },
 computed: mapGetters({
   projectId: 'sso/getProjectId',

 }),
})
export default class FilterVariant extends Vue {
 /* Prop 선언 */
 @Prop()
 selectedItem: any;

 /* mapGetters 변수 선언 */
  projectId!: any;



 /* 클래스 변수 선언 */
  variantList: any[] =[];
  // {id: 1, name: '그룹1', signature: 'A > B > C'},
  // {id: 2, name: '그룹2', signature: 'A > B > C > D'}
  //];
  includedVariantList: any[] = [];

  $refs!: {
    leftContent: any;
  };

  selectedDataset = '---';
  selectedLeft = {
    id: '',
    index: -1,
  };
  selectedRight = {
    id: '',
    index: -1,
  };

  traceVariants: any[] = [];

  totalCount: number = 0;

  busy: boolean = true;

 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

 /* 
 created(){
   
 }
 */
 
 mounted() {
   this.busy = true;
   const data = {
      _type: 'TraceVariantDiscoveryLiteConfiguration',
      repository: {
        _type: 'EventRepository',
        id: this.$store.getters['eventFilter/getSubEventCreateInfo'].repositoryId,
        project: {
          _type: 'Project',
          id: this.projectId,
        },
      },
      option: 'STANDARD',
      eventFilters: [] as any,
      sortBy: 'ccnt',
      sortDirection: 'DESC',
      showSignature: true,
    };

   this.$store.dispatch('common/getVariant', [data]).then((res: any) => {

     this.traceVariants = res.data.data.traceVariants;
     this.variantList = Object.values(this.traceVariants);

     this.totalCount = res.data.data.totalCount;

     this.busy = false;

   });

   $("#div1").scroll(function () {
      $("#div2").scrollTop($("#div1").scrollTop());
      $("#div2").scrollLeft($("#div1").scrollLeft());
   });
   $("#div2").scroll(function () {
      $("#div1").scrollTop($("#div2").scrollTop());
      $("#div1").scrollLeft($("#div2").scrollLeft());
   });
 }
 

 /* 메소드 선언 */

 @Watch('includedVariantList',{immediate: true})
 variantListChanged(newValue: any){
   this.onClickApply();
 }


 setData(item: any) {
   if(item == null || item.data == null) {
     this.includedVariantList = [];

     return;
   }
   this.includedVariantList = item.data.variants;
   
 }
 
 onClickApply() {

   const input: any = {};

   //const caseNum = 100;
   const variants = this.includedVariantList;

   //input.caseNum = caseNum;
   input.variants = variants;

   this.$emit('apply', input);
 }

 //배리언트에 hover하면 상세보기에도 hover 적용하는 메소드
 initHover() {

   const includedVariantListId = this.includedVariantList.map(v=>v.id);
   let index = 0;
   this.variantList.forEach((v: any)=>{
     if(!includedVariantListId.includes(v.id)) 
      $('#detail_'+index).attr('class', 'item');
     index++;
   })
 }
 
 applyHover(idx: any){

   const includedVariantListId = this.includedVariantList.map(v=>v.id);

   let index = 0;
   this.variantList.forEach((v: any)=>{
     if(!includedVariantListId.includes(v.id)) 
      $('#detail_'+index).attr('class', 'item');
     index++;
   })

   $('#detail_'+idx).attr('class', 'item disabled');
 }

 //draganddrop start
  addVariant() {
    if(this.selectedLeft.index != -1){
      const index = _.findIndex(this.includedVariantList, ['id', this.selectedLeft.id]);
      if (index === -1) this.includedVariantList.push(_.cloneDeep(this.variantList[this.selectedLeft.index]));
      this.selectedLeft.id = '';
      this.selectedLeft.index = -1;
    }
    
  }

  removeVariant() {
    //if(this.selectedRight.index != -1) {
      this.includedVariantList.splice(this.selectedRight.index, 1);
      this.selectedRight.id = '';
      this.selectedRight.index = -1;
    //}
    
  }

  selectVariant(id: string, index: number, direction: string) {
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
    const index = _.findIndex(this.includedVariantList, ['id', id]);
    return index !== -1 ? true : false;
  }

  leftPullEvent(to: any, from: any, dragEl: Element, evt: Event) {
    return dragEl.classList.contains('disabled') ? false : 'clone';
  }

  endEvent(evt: any) {
    const originEvent = evt.originalEvent;

    //if (originEvent.path[0] === this.$refs.leftContent.$el) {
    if (originEvent.path[0] === this.$refs.leftContent.$el || originEvent.path[2] === this.$refs.leftContent.$el) {
      evt.item.remove();
      this.includedVariantList.splice(evt.oldDraggableIndex, 1);
      
    }
  }

  switchVariant() {
    const all = _.clone(this.variantList);
    const included = _.clone(this.includedVariantList);
    const includedId = included.map(x => x.id);
    
    const results = all.filter((one: any) => {
      return !includedId.includes(one.id);
    });

    this.includedVariantList = results;

    //this.variantList = included;
    //this.includedVariantList = all;
  }
  //draganddrop end

  shorterStr(signature: string) {
    if(signature.length >= 30) return signature.slice(0, 30)+'...';
    else return signature;

  }

  numberWithCommas(x: number | string): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

}
</script>