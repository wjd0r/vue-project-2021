import { Vue, Component } from 'vue-property-decorator';
import { IKeyValueObject } from '@/interface';

import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColDef, GridApi, GridOptions } from '@ag-grid-community/core';

import Pagination from '../views/userManagement/components/Pagination.vue';

@Component({
  components: {
    AgGridVue,
    Pagination
  }
})
export default class UserManagementMixin extends Vue {
  keywordOptions: IKeyValueObject[] = [];

  keyword = {
    hasKeyword: false,
    type: 'USER_FULLNAME',
    word: ''
  };

  columnDefs: ColDef[] = [];
  gridOptions: GridOptions = {
    rowHeight: 36,
    rowStyle: { cursor: 'pointer' },
    animateRows: false,
    suppressColumnVirtualisation: true,
    defaultColDef: {
      sortable: true,
      resizable: true
    },
    localeTextFunc: (key: string, defaultValue: string) => {
      if (this.$te('view.sso.alert.' + key)) return this.$t('view.sso.alert.' + key).toString();
      else return defaultValue;
    },
    overlayLoadingTemplate: '<span></span>',
  };
  modules = AllCommunityModules;
  gridApi: GridApi = null;

  pageNumber: number = 1;
  totalRows: number = 0;

  selectedId: number = -1;

  showOverlay: boolean = false;

  form: 'create' | 'modify' = 'create';

  created() {
    this.initColumns();
  }

  mounted() {
    this.gridApi = this.gridOptions.api;
  }

  initColumns() {
    return;
  }
}
