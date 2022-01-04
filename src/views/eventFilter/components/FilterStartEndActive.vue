<template>
  <!-- 시작점 및 종료점 필터 -->
  <div class="filter-setting-component">
    <div class="filter-setting-content">
      <div class="content-header">
        <h4 class="title">{{$t('view.repo.repositoryFilter.startEndFilter')}}<!--시작점 및 종료점 필터--></h4>
      </div>
      <div class="content-body">
        <b-overlay :show="busy" no-fade bg-color="#fff" opacity="1">
        <div class="setting-content">
          <div class="start-end-content">
            <!-- 시작점 -->
            <div class="start-content start-end">
              <div class="content-header">
                <div class="title">{{$t('view.repo.repositoryFilter.startEnd.startPoint')}}<!--시작점--></div>
              </div>
              <div class="content-body">
                <!--<b-overlay :show="busy" no-fade bg-color="#fff" opacity="0.5">-->
                <div class="selection-list">
                  <div class="left-content" >
                    <div class="content-header" desc="전체 액티비티">{{$t('view.repo.repositoryFilter.startEnd.allActivities')}}<!--전체 액티비티--></div>
                    <draggable class="content-body " ref="leftContent1" :list="allActivityStarts" :group="{ name: 'start', pull: leftPullEventStart, put: false, draggable: '.item' }" :sort="false">
                      <div class="item" v-for="(item, index) in allActivityStarts" :class="{ active: item.id === selectedLeftStart.id && !getRelationStart(item.id), 'd-none': getRelationStart(item.id) }" 
                      :key="'left_' + item.id" @click="selectStart(item.id, index, 'left')">
                        <div class="item-text">{{item.name}}</div>
                      </div>
                    </draggable>
                  </div>
                  <div class="btn-group btn-multi">
                    <b-button variant="outline-secondary" class="btn-move btn-plus ico-plus" @click="addStart()" alt="더하기 아이콘"></b-button>
                    <b-button variant="outline-secondary" class="btn-move btn-minus ico-minus" @click="removeStart()" alt="빼기 아이콘"></b-button>
                    <b-button variant="outline-secondary" class="btn-move btn-bothsides" @click="switchStart()"><div class="ico-bothsides" alt="양방향 아이콘"></div></b-button>
                  </div>
                  <div class="right-content">
                    <div class="content-header" desc="선택된 시작 액티비티">{{$t('view.repo.repositoryFilter.startEnd.selectedStartActivities')}}<!--선택된 시작 액티비티--></div>
                    <draggable class="content-body" :list="includedStarts" :group="{ name: 'start', draggable: '.item' }" :sort="false" @end="endEventStart">
                      <div class="item" v-for="(item, index) in includedStarts" :class="{ active: item.id === selectedRightStart.id }"
                          :key="'right_' + item.id" @click="selectStart(item.id, index, 'right')">
                        <div class="item-text">{{item.name}}</div>
                      </div>
                    </draggable>
                  </div>
                </div>
                <!--</b-overlay>-->
              </div>
              <div class="notice-text m-none">{{$t('view.repo.alert.registerHelp')}}<!--※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div>
              <div class="notice-text m-notice">{{$t('view.repo.alert.registerHelpButton')}}<!--※ 버튼을 이용하여 등록할 수 있습니다.--></div>
            </div>
            <!-- 시작점 -->
            <!-- 종료점 -->
            <div class="end-content start-end">
              <div class="content-header">
                <div class="title">{{$t('view.repo.repositoryFilter.startEnd.endPoint')}}<!--종료점--></div>
              </div>
              <div class="content-body">
                <!--<b-overlay :show="busy" no-fade bg-color="#fff" opacity="0.5">-->
                <div class="selection-list">
                  <div class="left-content">
                    <div class="content-header" desc="전체 액티비티">{{$t('view.repo.repositoryFilter.startEnd.allActivities')}}<!--전체 액티비티--></div>
                    <draggable class="content-body " ref="leftContent2" :list="allActivityEnds" :group="{ name: 'end', pull: leftPullEventEnd, put: false, draggable: '.item' }" :sort="false">
                      <div class="item" v-for="(item, index) in allActivityEnds" :class="{ active: item.id === selectedLeftEnd.id && !getRelationEnd(item.id), 'd-none': getRelationEnd(item.id) }" 
                        :key="'left_' + item.id" @click="selectEnd(item.id, index, 'left')">
                        <div class="item-text">{{item.name}}</div>
                      </div>
                    </draggable>
                  </div>
                  <div class="btn-group btn-multi">
                    <b-button variant="outline-secondary" class="btn-move btn-plus ico-plus" @click="addEnd()" alt="더하기 아이콘"></b-button>
                    <b-button variant="outline-secondary" class="btn-move btn-minus ico-minus" @click="removeEnd()" alt="빼기 아이콘"></b-button>
                    <b-button variant="outline-secondary" class="btn-move btn-bothsides" @click="switchEnd()"><div class="ico-bothsides" alt="양방향 아이콘"></div></b-button>
                  </div>
                  <div class="right-content">
                    <div class="content-header" desc="선택된 종료 액티비티">{{$t('view.repo.repositoryFilter.startEnd.selectedEndActivities')}}<!--선택된 종료 액티비티--></div>
                    <draggable class="content-body" :list="includedEnds" :group="{ name: 'end', draggable: '.item' }" :sort="false" @end="endEventEnd">
                      <div class="item" v-for="(item, index) in includedEnds" :class="{ active: item.id === selectedRightEnd.id }"
                        :key="'right_' + item.id" @click="selectEnd(item.id, index, 'right')">
                        <div class="item-text">{{item.name}}</div>
                      </div>
                    </draggable>
                  </div>
                </div>
                <!--</b-overlay>-->
              </div>
              <div class="notice-text m-none">{{$t('view.repo.alert.registerHelp')}}<!--※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.--></div> <!--체크-->
              <div class="notice-text m-notice">{{$t('view.repo.alert.registerHelpButton')}}<!--※ 버튼을 이용하여 등록할 수 있습니다.--></div>
            </div>
            <!-- 종료점 -->
          </div>
        </div>
        </b-overlay>
      </div>
    </div>
  </div>
  <!-- 시작점 및 종료점 필터 -->
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Draggable from "vuedraggable";
import _ from 'lodash';

@Component({
 components: {
   Draggable
 },
 computed: mapGetters({
  projectId: 'sso/getProjectId',
 }),
})
export default class FilterStartEndActive extends Vue {
 /* Prop 선언 */
@Prop()
 selectedItem: any;


 /* mapGetters 변수 선언 */
  projectId!: any;


 /* 클래스 변수 선언 */
 //allActivityStarts: any[] =[{id: 1, name: 'act1'}, {id: 2, name: 'act2'}];
 //allActivityEnds: any[] = [{id: 1, name: 'act1'}, {id: 2, name: 'act2'}];
 //includedStarts: any[] = [{id: 2, name: 'act2'}];
 //includedEnds: any[] = [{id: 2, name: 'act2'}];

 allActivityStarts: any[] =[];
 allActivityEnds: any[] = [];
 includedStarts: any[] = [];
 includedEnds: any[] = [];

 originIncludedStarts: any[] = [];
 originIncludedEnds: any[] = [];

 
 //draganddrop
 //1. 시작점

 $refs!: {
    //form: InstanceType<typeof ValidationObserver>;
    leftContent1: any;
    leftContent2: any;
  };

  selectedLeftStart = {
    id: '',
    index: -1,
  };
  selectedRightStart = {
    id: '',
    index: -1,
  };

//2. 종료점
 selectedLeftEnd = {
    id: '',
    index: -1,
  };
  selectedRightEnd = {
    id: '',
    index: -1,
  };


//draganddrop

busy: boolean = true;


 /* refs 선언 */


 /* Watch 선언 */


 /* navigator guard 선언 */


 /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  
 async created(){

    //전체 액티비티
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
      "field": "ea"
    } ]).then((res: any)=>{

      


      const activies = Object.keys(res.data.data);

      //allActivityStarts: any[] =[{id: 1, name: 'act1'}, {id: 2, name: 'act2'}];
      //allActivityEnds: any[] = [{id: 1, name: 'act1'}, {id: 2, name: 'act2'}];

      this.allActivityStarts = [];
      this.allActivityEnds = [];

      activies.forEach((e: any)=>{
        this.allActivityStarts.push({id: e, name: e});
        this.allActivityEnds.push({id: e, name: e});
      });
    });
    
    //시작점 & 종료점 액티비티
      await this.$store.dispatch('eventFilter/getRepoEventUtilLookupStartEndLite', [ {
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
        "field": "ea"
      } ]).then((res: any)=>{


        const startEvents = Object.keys(res.data.data.startEvents);
        const completedEvents = Object.keys(res.data.data.completedEvents);

        //allActivityStarts: any[] =[{id: 1, name: 'act1'}, {id: 2, name: 'act2'}];
        //allActivityEnds: any[] = [{id: 1, name: 'act1'}, {id: 2, name: 'act2'}];

        this.includedStarts = [];
        this.includedEnds = [];

        startEvents.forEach((e: any)=>{
          this.includedStarts.push({id: e, name: e});
        });

        completedEvents.forEach((e: any)=>{
          this.includedEnds.push({id: e, name: e});
        });

        this.originIncludedStarts = _.clone(this.includedStarts);
        this.originIncludedEnds = _.clone(this.includedEnds);

      
      });
   

    

    this.busy = false;
   
 }

 /* 메소드 선언 */

 @Watch('includedStarts',{immediate: true})
 startChanged(newValue: any){
   this.onClickApply();
 }

 @Watch('includedEnds',{immediate: true})
 endChanged(newValue: any){
   this.onClickApply();
 }


 async setData(item: any) {
   if(item == null || item.data == null) {
      this.includedStarts = this.originIncludedStarts;
      this.includedEnds = this.originIncludedEnds;

      return;
   }

   //this.includedStarts = item.data.startPoints;
   //this.includedEnds = item.data.endPoints;

   item.data.startPoints.forEach((point: any) => { //input start 값

      const alreadyIn = this.includedStarts.filter(s => s.id == point.id);
      if(alreadyIn.length == 0) this.includedStarts.push(point);

   });
   item.data.endPoints.forEach((point: any) => { //input end 값

      const alreadyIn = this.includedEnds.filter(s => s.id == point.id);
      if(alreadyIn.length == 0) this.includedEnds.push(point);

   });
   
 }
 

 onClickApply() {
   const input: any = {};

   //const caseNum = 100;
   const startPoints = this.includedStarts;
   const endPoints = this.includedEnds;

   //input.caseNum = caseNum;
   input.startPoints = startPoints;
   input.endPoints = endPoints;

   this.$emit('apply', input);
 }
 
 //draganddrop start(시작점)
  addStart() {
    if(this.selectedLeftStart.index != -1){
      const index = _.findIndex(this.includedStarts, ['id', this.selectedLeftStart.id]);
      if (index === -1) this.includedStarts.push(_.cloneDeep(this.allActivityStarts[this.selectedLeftStart.index]));
      this.selectedLeftStart.id = '';
      this.selectedLeftStart.index = -1;
    }
    
  }

  removeStart() {
    //if(this.selectedRightStart.index != -1) {
      this.includedStarts.splice(this.selectedRightStart.index, 1);
      this.selectedRightStart.id = '';
      this.selectedRightStart.index = -1;
    //}
    
  }

  selectStart(id: string, index: number, direction: string) {
    if (direction === 'left') {
      this.selectedLeftStart.id = id;
      this.selectedLeftStart.index = index;
      this.selectedRightStart.id = '';
      this.selectedRightStart.index = -1;
    } else if (direction === 'right') {
      this.selectedRightStart.id = id;
      this.selectedRightStart.index = index;
      this.selectedLeftStart.id = '';
      this.selectedLeftStart.index = -1;
    }
  }

  getRelationStart(id: string) {
    const index = _.findIndex(this.includedStarts, ['id', id]);
    
    return index !== -1 ? true : false;
  }

  leftPullEventStart(to: any, from: any, dragEl: Element, evt: Event) {
    return dragEl.classList.contains('disabled') ? false : 'clone';
  }

  endEventStart(evt: any) {
    const originEvent = evt.originalEvent;

    if (originEvent.path[0] === this.$refs.leftContent1.$el) {
      evt.item.remove();
      this.includedStarts.splice(evt.oldDraggableIndex, 1);

    }

  }


  switchStart() {

    const all = _.clone(this.allActivityStarts);
    const included = _.clone(this.includedStarts);
    const includedId = included.map(x => x.id);
    
    const results = all.filter((one: any) => {
      return !includedId.includes(one.id);
    });


    this.includedStarts = results;

    //this.allActivityStarts = included;
    //this.includedStarts = all;
  }

  //draganddrop end(시작점)

  //draganddrop start(종료점)
  addEnd() {
    if(this.selectedLeftEnd.index != -1){
      const index = _.findIndex(this.includedEnds, ['id', this.selectedLeftEnd.id]);
      if (index === -1) this.includedEnds.push(_.cloneDeep(this.allActivityEnds[this.selectedLeftEnd.index]));
      this.selectedLeftEnd.id = '';
      this.selectedLeftEnd.index = -1;
    }
    
  }

  removeEnd() {
    //if(this.selectedRightEnd.index != -1) {
      this.includedEnds.splice(this.selectedRightEnd.index, 1);
      this.selectedRightEnd.id = '';
      this.selectedRightEnd.index = -1;
    //}
    
  }

  selectEnd(id: string, index: number, direction: string) {
    if (direction === 'left') {
      this.selectedLeftEnd.id = id;
      this.selectedLeftEnd.index = index;
      this.selectedRightEnd.id = '';
      this.selectedRightEnd.index = -1;
    } else if (direction === 'right') {
      this.selectedRightEnd.id = id;
      this.selectedRightEnd.index = index;
      this.selectedLeftEnd.id = '';
      this.selectedLeftEnd.index = -1;
    }
  }

  getRelationEnd(id: string) {
    const index = _.findIndex(this.includedEnds, ['id', id]);
    return index !== -1 ? true : false;
  }

  leftPullEventEnd(to: any, from: any, dragEl: Element, evt: Event) {
    return dragEl.classList.contains('disabled') ? false : 'clone';
  }

  endEventEnd(evt: any) {
    const originEvent = evt.originalEvent;

    if (originEvent.path[0] === this.$refs.leftContent2.$el) {
      evt.item.remove();
      this.includedEnds.splice(evt.oldDraggableIndex, 1);
    }

  }

  switchEnd() {
    const all = _.clone(this.allActivityEnds);
    const included = _.clone(this.includedEnds);
    const includedId = included.map(x => x.id);

    const results = all.filter((one: any) => {
      return !includedId.includes(one.id);
    });

    this.includedEnds = results;

    //this.allActivityEnds = included;
    //this.includedEnds = all;
  }
  //draganddrop end(종료점)

}
</script>