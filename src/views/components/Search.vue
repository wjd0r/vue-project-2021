<template>
  <div class="top-component">
    <div class="top-content">
      <!-- group -->
      <div class="group-content">
        <b-form-group id="groupSelect" label="" label-for="group-select">
          <b-select v-model="selectedWorkspace" @change="onChangeWorkspace()" :disabled="isLoading">
            <b-select-option :value="null">{{ $t('view.repo.form.all') }}</b-select-option>
            <b-select-option v-for="item in filteredWorkspace" :key="item.id" :value="item.id">{{ item.name }}</b-select-option>
          </b-select>
        </b-form-group>
      </div>
      <!-- group -->

      <!-- search -->
      <div class="search-component">
        <div class="search-content">
          <b-input-group class="search form-content">
            <validate-input type="text" v-model="searchWord" :placeholder="$t('view.repo.form.searchMinLength')" @keyup.enter="searchSatate && onEnter()" :disabled="isLoading"
                :isGroup="false" :essential="false" :permit-string="true" :permit-number="true" :permit-special="true" minlength="3" maxlength="255"
                @output="(arg) => searchSatate = arg" />
            <b-input-group-append>
              <b-button variant="outline-secondary" class="btn-outline-secondary btn-search" @click="onClickSearch()" :disabled="isLoading">{{ $t('view.repo.button.search') }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <!-- search -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { ISetting } from '@/interface';
import _ from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import ValidateInput from '@/views/components/ValidateInput.vue';

@Component({
  components: {
    ValidateInput,
  },
  computed: mapGetters({
    myInfo: 'sso/getMyInfo',
    setting: 'sso/getSetting',
  }),
})
export default class Search extends Vue {
  /* Prop 선언 */
  @Prop()
  readonly isLoading: boolean;

  /* mapGetters 변수 선언 */
  readonly myInfo!: any;
  readonly setting!: ISetting;

  /* 클래스 변수 선언 */
  selectedWorkspace: number = 0;
  searchWord: string = '';

  searchSatate: boolean = true;

  created() {
    this.selectedWorkspace = isNaN(this.setting.common.workspace.defaultWorkspace) ? null : this.setting.common.workspace.defaultWorkspace;
  }
  
  /*
 mounted() {
   
 }
 */

  /* 메소드 선언 */
  onClickSearch() {
    if (this.searchSatate === false) {
      return;
    }

    this.$emit('search', this.searchWord);
  }

  onEnter() {
    this.onClickSearch();
  }

  getSelectedResourceGroupId() {
    const result = _.find(this.myInfo.workspaces, ['id', this.selectedWorkspace]);
    if (result) {
      return result.iprResourceGroupId;
    } else {
      return null;
    }
  }

  onChangeWorkspace() {
    this.$emit('changeWorkspace', this.selectedWorkspace);
  }

  get filteredWorkspace() {
    return this.myInfo.workspaces.filter((el: any) => !el.isDeleted);
  }
}
</script>