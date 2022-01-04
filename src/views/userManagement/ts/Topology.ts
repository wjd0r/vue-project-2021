import Vue from "vue";

// 화면 정보?
export interface ITopology {
  templateName: string;
  templateDescription: string;
  instanceName: string; // 3글자, 첫 자 공백 x, 한글 영문 숫자, 중복 체크
  instanceDescription: '';
  protocol: 'udp' | 'tcp';
  port: number; // 1024~49151 : Registered Port, 잘 알려져 있는 프로그램들이 아닌 다른 용도의 프로그램들이 사용합니다.
  topic: string;
}

// 업로드시 필요한 정보
export interface IUploadInstance {
  instanceName: string; // 3글자, 첫 자 공백 x, 한글 영문 숫자, 중복 체크
  instanceDescription: '';
  protocol: 'udp' | 'tcp';
  port: number; // 1024~49151 : Registered Port, 잘 알려져 있는 프로그램들이 아닌 다른 용도의 프로그램들이 사용합니다.
  topic: string;
}

// 검색시 사용할 정보
export interface ISearch {
  a: string;
}

// 템플릿 리스트
export interface ITemplates {
  a: string;
}

// 인스턴스 리스트
export interface IInstances {
  a: string;
}

// 템플릿
export interface ITemplate {
  a: string;
}

// 인스턴스
export interface IInstance {
  a: string;
}

// 데이터 소스
export interface IDataSource {
  _type: string;
  project: {
    id: string;
    _type: string;
  };
  resourceGroup: {
    createdBy: string;
  };
  excludeUsed: boolean;
}

// 데이터 소스 필드
export interface IDataSourceField {
  db: string;
  hostname: string;
  port: string;
  username: string;
  password: string;
  database: string;
  schema: string;
  entity: string;
  projectId: string;
  resourceGroupId: string;
}

// Form Type
export enum TYPE {
  FLOW = 'TopologyInstanceFlow',
  FORM = 'TopologyInstanceForm',
  INPUT = 'TopologyInstanceStreamInput',
  PREVIEW = 'TopologyInstanceDataPreview',
  FILTER = 'TopologyInstanceFilterStream',
  JOIN = 'TopologyInstanceJoinStream',
  STORAGE = 'TopologyInstanceTargetStorage',
  PROGRESS = 'TopologyInstanceProgress',
  RESULT = 'TopologyInstanceResult',
}

export enum FLOWTYPE {
  FLOW1,
  FLOW2,
  FLOW3,
  FLOW4,
  FLOW5,
  FLOW6,
  FLOW7,
  FLOW8,
}

export default class Topology {
  type: 'template' | 'instance' = 'template';
  type2: 'create' | 'modify' = 'create';
  form: TYPE.FLOW | TYPE.FORM | TYPE.INPUT | TYPE.PREVIEW | TYPE.FILTER | TYPE.JOIN | TYPE.STORAGE | TYPE.PROGRESS | TYPE.RESULT = TYPE.FLOW;
  vue: Vue;

  flow: Array<TYPE.FLOW | TYPE.FORM | TYPE.INPUT | TYPE.PREVIEW | TYPE.FILTER | TYPE.JOIN | TYPE.STORAGE | TYPE.PROGRESS | TYPE.RESULT> = [];

  // 현제 화면 번호
  flowstate: number = 0;

  // 화면에 임시로 저장할 데이터
  flows: Array<any> = [];

  flowtypes: Array<any> = [ // this.flowtypes[FLOWTYPE.FLOW1];
    // FLOW1
    [TYPE.FORM, TYPE.INPUT, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW2
    [TYPE.FORM, TYPE.INPUT, TYPE.PREVIEW, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW3
    [TYPE.FORM, TYPE.INPUT, TYPE.FILTER, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT], 
    
    // FLOW4
    [TYPE.FORM, TYPE.INPUT, TYPE.PREVIEW, TYPE.FILTER, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW5
    [TYPE.FORM, TYPE.INPUT, TYPE.INPUT, TYPE.JOIN, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW6
    [TYPE.FORM, TYPE.INPUT, TYPE.PREVIEW, TYPE.INPUT, TYPE.PREVIEW, TYPE.JOIN, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW7
    [TYPE.FORM, TYPE.INPUT, TYPE.FILTER, TYPE.INPUT, TYPE.FILTER, TYPE.JOIN, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW8
    [TYPE.FORM, TYPE.INPUT, TYPE.PREVIEW, TYPE.FILTER, TYPE.INPUT, TYPE.PREVIEW, TYPE.FILTER, TYPE.JOIN, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT],

    // FLOW9
    [TYPE.FORM, TYPE.FLOW, TYPE.FORM, TYPE.INPUT, TYPE.PREVIEW, TYPE.STORAGE, TYPE.PROGRESS, TYPE.RESULT], 
  ];

  projectId: string;
  myInfo: any;

  constructor(_type: 'template' | 'instance' = 'template', _projectId?: string, _myInfo?: any) {
    this.type = _type;
    this.projectId = _projectId;
    this.myInfo = _myInfo;
  }

  setVue(_vue: Vue) {
    this.vue = _vue;
  }

  // 리스트 조회 & 검색
  async getTemplates() {
    //const res: Array<ITemplates> = (await this.vue.$store.dispatch('streaming/getTemplates', this.data.search)).data;
    //this.data.templates = res;
    return
  }
  // 리스트 조회 & 검색
  async getInstances() {
    //const res: Array<IInstances> = (await this.vue.$store.dispatch('streaming/getTemplates', this.data.search)).data;
    //this.data.instance = res;
    return
  }
  // 상세 조회
  getTemplate(seq: number) {
    const res: ITemplate = null;
    this.data.template = res;
  }
  // 상세 조회
  getInstance(seq: number) {
    const res: IInstance = null;
    this.data.instance = res;
  }
  // instance 생성
  setInstance() {
    return
  }
  // topic 조회
  getTopic() {
    return
  }
  // previe 조회
  getPreview(seq: number) {
    return
  }
  // 필터 리스트 조회
  getFilter(seq: number) {
    return
  }
  // 선택된 필터 옵션
  getFilterSelected() {
    return
  }
  // 데이터 소스 리스트 조회
  async getDatasource() {
    if(this.data.datasources.length == 0) {
      const dataSource: IDataSource = {
        _type: 'DbDataSourceInfoImpl',
        project: {
          id: this.projectId,
          _type: 'Project',
        },
        resourceGroup: {
          createdBy: this.myInfo.id,
        },
        excludeUsed: true,
      };
      this.data.datasources = (await this.vue.$store.dispatch('datasource/dsList', dataSource)).data.data.elements;
    }
  }
  // 데이터 소스 컬럼 조회
  async getDatasourceFields() {
    const { provider, hostname, port, username, password, database, schema, entity, resourceGroup } = this.data.input.selectedDatasource;
    const dataSource: IDataSourceField = {
      db: provider == 'mariadb' ? 'mysql' : provider == 'postgresql' ? 'psql' : provider,
      hostname: hostname,
      port: port,
      username: username,
      password: password,
      database: database,
      schema: schema,
      entity: entity,
      projectId: this.projectId,
      resourceGroupId: resourceGroup.id,
    };
    this.data.datasourceFields = (await this.vue.$store.dispatch('datasource/testTable', dataSource)).data.data.fields;
  }
  // data 초기화
  initData() {
    this.flowstate = 0;
    this.data.input = {
      templateName: '1. kafka raw data -> persistence storage',
      templateDescription: '',
      instanceName: '',
      instanceDescription: '', 
      protocol: 'tcp',
      port: '',
      topic: '',
      selectedFilters: [],
      selectedDatasource: {
        name: '',
      },
      datasourceField: [],
      selectedQuerys: [],
    }
    this.bolts = {
      instanceId: 0,
      instanceName: '',
      instanceDescription: '',
      templateId: 1,
      streams: [
      ],
    }
  }
  // 선택된 필드 초기화
  initSelectedFileds() {
    this.bolts.streams[this.flowstate-1].config.columns = [];
    Object.keys(this.data.preview[0]).forEach((e) => {
      this.bolts.streams[this.flowstate-1].config.columns.push({ name: e, type: '', timestampFormat: '', use: false });
    });
  }
  // 사용하는 필드만 보기
  usedFileds() {
    return this.bolts.streams[this.flowstate-1].config.columns.filter((e: any) => e.use);
  }
  // 모든 필드 선택
  allSelectedFilters(event: any) {
    this.bolts.streams[this.flowstate-1].config.columns.forEach((e: any, index: number) => {
      e.use = Boolean(event);
      e.type = !event ? '' : e.type == '' ? 'STRING' : e.type;
      this.bolts.streams[this.flowstate-1].config.columns[index] = e;
    });
  }

  // 선택된 필터 초기화
  initSelectedFilters() {
    this.bolts.streams[this.flowstate-1].config.filters = [];
    if(this.bolts.streams[this.flowstate-2].config.columns == undefined) {
      // columns 가 있으면 preview 를 하지 않았기 때문에 전체 column 기준으로 데이터 생성
      this.bolts.streams[this.flowstate-1].config.filters = [];
      Object.keys(this.data.preview[0]).forEach((e) => {
        this.bolts.streams[this.flowstate-1].config.filters.push({
          column: {name: e, type: 'STRING', timestampFormat: '', use: true},
          /* operationType: '',
          filterValue: '', */
        });
      });

    } else {
      // columns 가 있으면 preview 에서 선택된 item을 가지고 세팅
      this.bolts.streams[this.flowstate-2].config.columns.forEach((column: any) => {
        const filter = {
          column: column,
          /* operationType: column.type == 'NUMERIC' ? '=' : null,
          filterValue: column.type == 'STRING' ? null : column.type == 'NUMERIC' ? null : column.type == 'TIMESTAMP' ? 'yyyy-MM-dd HH:mm:ss' : null,
          filterValue2: 1 == Number('1') ? null : '', */
        };
        this.bolts.streams[this.flowstate-1].config.filters.push(filter);
      });
    }
  }

  // 최초진입 여부
  isFirstEntry() {
    // flowVisitCnt는 방문 횟수 이다.
    return this.flows[this.flowstate].flowVisitCnt == 1;
  }

  options = {
    template: [
      { value: 'topology name', text: '토폴로지 name' },
    ],
    instance: [
      { value: 'pipeline name', text: '파이프라인 name' },
      { value: 'topology name', text: '토폴로지 name' },
      { value: 'state', text: '상태' },
    ],
    protocol: [
      { value: 'UDP', text: 'UDP' },
      { value: 'TCP', text: 'TCP' },
    ],
    preview: [
      { value: 'string', text: 'String (Boolena 포함)' },
      { value: 'numeric', text: 'Numeric' },
      { value: 'timestamp', text: 'Timestamp' },
    ],
    joinCondition: [
      { value: 'full inner join', text: 'full inner join' },
      { value: 'full outer join', text: 'full outer join' },
      { value: 'left join', text: 'left join' },
      { value: 'left outer join', text: 'left outer join' },
      { value: 'right join', text: 'right join' },
      { value: 'right outer join', text: 'right outer join' },
    ],
    windowType: [
      { value: 'TIME', text: 'time window' },
      { value: 'DATA', text: 'data lenght' },
    ],
  }

  data: any = {
    // 검색어
    searchword: null, // ISearch
    // 토폴로지 template 관리 리스트
    templates: [
      { id: 1, topologyName: '1. kafka raw data -> persistence storage', source: 'KAFKA TOPIC 1', target: 'HDFS', description: 'description kafka raw data -> persistence storage' },
      { id: 2, topologyName: '2. kafka raw data -> filter column (include only selected columns)', source: 'KAFKA TOPIC 1', target: 'HDFS & Greenplum', description: 'description kafka raw data -> filter column (include only selected columns)' },
      { id: 3, topologyName: '3. kafka raw data -> filter value (include only selected data values)', source: 'KAFKA TOPIC 1', target: 'HDFS & Greenplum', description: 'description kafka raw data -> filter value (include only selected data values)' },
      { id: 4, topologyName: '4. kafka raw data -> filter column & value', source: 'KAFKA TOPIC 1', target: 'HDFS & Greenplum', description: 'description kafka raw data -> filter column & value' },
      { id: 5, topologyName: '5. 2 kafka raw data -> join raw data', source: 'KAFKA TOPIC 1 & KAFKA TOPIC 2', target: 'HDFS', description: 'description 2 kafka raw data -> join raw data' },
      { id: 6, topologyName: '6. 2 kafka raw data -> column filter & join', source: 'KAFKA TOPIC 1 & KAFKA TOPIC 2', target: 'HDFS & Greenplum', description: 'description 2 kafka raw data -> column filter & join' },
      { id: 7, topologyName: '7. 2 kafka raw data -> value filter & join', source: 'KAFKA TOPIC 1 & KAFKA TOPIC 2', target: 'HDFS & Greenplum', description: 'description 2 kafka raw data -> value filter & join' },
      { id: 8, topologyName: '8. 2 kafka raw data -> column & value filter then  join', source: 'KAFKA TOPIC 1 & KAFKA TOPIC 2', target: 'HDFS & Greenplum', description: 'description 2 kafka raw data -> column & value filter then  join' },
      { id: 9, topologyName: '9. hdfs bolt raw data -> persistence storage', source: 'HDFS', target: 'Greenplum', description: 'description hdfs bolt raw data -> persistence storage' },
    ],
    // 토폴로지 template 상세 내용
    templateProperties: {},
    // 토폴로지 instance 관리 리스트
    instances: [
      { templateName: '7. 2 kafka raw data -> value filter & join', instanceName: '건강보험심사평가원_병원코드정보서비스', state: 'true', source: 'KAFKA TOPIC 1 & KAFKA TOPIC 2', target: 'HDFS & Greenplum' },
      { templateName: '4. kafka raw data -> filter column & value', instanceName: '코로나19 예방접종센터 현황', state: 'false', source: 'KAFKA TOPIC 1', target: 'HDFS & Greenplum' }
    ],
    // 토픽 셀렉트 박스 리스트
    topics: [
      // 임시 데이터 입니다.
      {id: 0, name: '건강보험심사평가원_병원코드정보서비스'},
      {id: 1, name: '코로나19 예방접종센터 현황'},
      {id: 2, name: '코로나19 예방접종센터 조회서비스'},
      {id: 3, name: '국립해양생물자원관_바다거북 이동경로'},
      {id: 4, name: '코로나19 선별진료소_현황'},
      {id: 5, name: '재해위험지구 정비사업 현황'},
      {id: 6, name: '음식물 쓰레기 발생 현황'},
      {id: 7, name: '중앙선거관리위원회_무투표선거구 정보'},
    ],
    // 토픽 컬럼 리스트
    topicFields: [
      // 임시 데이터 입니다.
      "ISU_CD",
      "ISU_SRT_CD",
      "ISU_NM",
      "ISU_ABBRV",
      "ISU_ENG_NM",
      "LIST_DD",
      "MKT_TP_NM",
      "SECUGRP_NM",
      "SECT_TP_NM",
      "KIND_STKCERT_TP_NM",
      "PARVAL",
      "LIST_SHRS",
    ],
    // 미리보기 리스트
    preview: [
      {"ISU_CD":"KR7098120009","ISU_SRT_CD":"098120","ISU_NM":"(주)마이크로컨텍솔루션","ISU_ABBRV":"마이크로컨텍솔","ISU_ENG_NM":"Micro Contact Solution Co.,Ltd.","LIST_DD":"2008/09/23","MKT_TP_NM":"KOSDAQ","SECUGRP_NM":"주권","SECT_TP_NM":"벤처기업부","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"8,312,766"},{"ISU_CD":"KR7131100000","ISU_SRT_CD":"131100","ISU_NM":"(주)스카이이앤엠","ISU_ABBRV":"스카이이앤엠","ISU_ENG_NM":"SKY E&M Co., Ltd.","LIST_DD":"2011/06/14","MKT_TP_NM":"KOSDAQ","SECUGRP_NM":"주권","SECT_TP_NM":"관리종목(소속부없음)","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"11,642,629"},{"ISU_CD":"KR7009520008","ISU_SRT_CD":"009520","ISU_NM":"(주)포스코엠텍","ISU_ABBRV":"포스코엠텍","ISU_ENG_NM":"POSCO M-TECH CO.,LTD.","LIST_DD":"1997/11/10","MKT_TP_NM":"KOSDAQ","SECUGRP_NM":"주권","SECT_TP_NM":"우량기업부","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"41,642,703"},{"ISU_CD":"KR7095570008","ISU_SRT_CD":"095570","ISU_NM":"AJ네트웍스보통주","ISU_ABBRV":"AJ네트웍스","ISU_ENG_NM":"AJ Networks Co.,Ltd.","LIST_DD":"2015/08/21","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"1,000","LIST_SHRS":"46,822,295"},{"ISU_CD":"KR7006840003","ISU_SRT_CD":"006840","ISU_NM":"AK홀딩스보통주","ISU_ABBRV":"AK홀딩스","ISU_ENG_NM":"AK Holdings, Inc.","LIST_DD":"1999/08/11","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"13,247,561"},{"ISU_CD":"KR7282330000","ISU_SRT_CD":"282330","ISU_NM":"BGF리테일보통주","ISU_ABBRV":"BGF리테일","ISU_ENG_NM":"BGF Retail","LIST_DD":"2017/12/08","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"1,000","LIST_SHRS":"17,283,906"},{"ISU_CD":"KR7027410000","ISU_SRT_CD":"027410","ISU_NM":"BGF보통주","ISU_ABBRV":"BGF","ISU_ENG_NM":"BGF","LIST_DD":"2014/05/19","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"1,000","LIST_SHRS":"95,716,791"},{"ISU_CD":"KR7138930003","ISU_SRT_CD":"138930","ISU_NM":"BNK금융지주보통주","ISU_ABBRV":"BNK금융지주","ISU_ENG_NM":"BNK Financial Group Inc.","LIST_DD":"2011/03/30","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"325,935,246"},{"ISU_CD":"KR7001461003","ISU_SRT_CD":"001465","ISU_NM":"BYC1우선주","ISU_ABBRV":"BYC우","ISU_ENG_NM":"BYC(1P)","LIST_DD":"1989/09/05","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"구형우선주","PARVAL":"5,000","LIST_SHRS":"215,385"},{"ISU_CD":"KR7001460005","ISU_SRT_CD":"001460","ISU_NM":"BYC보통주","ISU_ABBRV":"BYC","ISU_ENG_NM":"BYC","LIST_DD":"1975/06/02","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"624,615"},{"ISU_CD":"KR7001041003","ISU_SRT_CD":"001045","ISU_NM":"CJ1우선주","ISU_ABBRV":"CJ우","ISU_ENG_NM":"CJ(1P)","LIST_DD":"1989/08/18","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"구형우선주","PARVAL":"5,000","LIST_SHRS":"2,260,223"},{"ISU_CD":"KR700104K010","ISU_SRT_CD":"00104K","ISU_NM":"CJ4우선주(전환)","ISU_ABBRV":"CJ4우(전환)","ISU_ENG_NM":"CJ(4PC)","LIST_DD":"2019/08/09","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"신형우선주","PARVAL":"5,000","LIST_SHRS":"4,226,512"},{"ISU_CD":"KR7001040005","ISU_SRT_CD":"001040","ISU_NM":"CJ보통주","ISU_ABBRV":"CJ","ISU_ENG_NM":"CJ Corp.","LIST_DD":"1973/06/29","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"29,176,998"},{"ISU_CD":"KR7011151008","ISU_SRT_CD":"011155","ISU_NM":"CJ씨푸드1우선주","ISU_ABBRV":"CJ씨푸드1우","ISU_ENG_NM":"CJSEAFOODCORPORATION(1P)","LIST_DD":"1990/01/13","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"구형우선주","PARVAL":"500","LIST_SHRS":"200,000"},{"ISU_CD":"KR7011150000","ISU_SRT_CD":"011150","ISU_NM":"CJ씨푸드보통주","ISU_ABBRV":"CJ씨푸드","ISU_ENG_NM":"CJSEAFOODCORPORATION","LIST_DD":"1988/11/26","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"35,930,773"},{"ISU_CD":"KR7058820002","ISU_SRT_CD":"058820","ISU_NM":"CMG제약","ISU_ABBRV":"CMG제약","ISU_ENG_NM":"CMG Pharmaceutical Co., Ltd.","LIST_DD":"2001/08/31","MKT_TP_NM":"KOSDAQ","SECUGRP_NM":"주권","SECT_TP_NM":"우량기업부","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"138,892,244"},{"ISU_CD":"KR7000590000","ISU_SRT_CD":"000590","ISU_NM":"CS홀딩스보통주","ISU_ABBRV":"CS홀딩스","ISU_ENG_NM":"CSHOLDINGS","LIST_DD":"1975/12/22","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"1,154,482"},{"ISU_CD":"KR7012030003","ISU_SRT_CD":"012030","ISU_NM":"DB Inc.보통주","ISU_ABBRV":"DB","ISU_ENG_NM":"DB Inc.","LIST_DD":"1993/01/06","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"201,173,933"},{"ISU_CD":"KR7016610008","ISU_SRT_CD":"016610","ISU_NM":"DB금융투자보통주","ISU_ABBRV":"DB금융투자","ISU_ENG_NM":"DB Financial Investment Co., LTD.","LIST_DD":"1988/06/27","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"42,446,389"},{"ISU_CD":"KR7005830005","ISU_SRT_CD":"005830","ISU_NM":"DB손해보험보통주","ISU_ABBRV":"DB손해보험","ISU_ENG_NM":"DB INSURANCE","LIST_DD":"1973/06/28","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"500","LIST_SHRS":"70,800,000"},{"ISU_CD":"KR7000991000","ISU_SRT_CD":"000995","ISU_NM":"DB하이텍1우선주","ISU_ABBRV":"DB하이텍1우","ISU_ENG_NM":"DB HiTek Co.,LTD(1P)","LIST_DD":"2007/05/21","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"구형우선주","PARVAL":"5,000","LIST_SHRS":"112,316"},{"ISU_CD":"KR7000990002","ISU_SRT_CD":"000990","ISU_NM":"DB하이텍보통주","ISU_ABBRV":"DB하이텍","ISU_ENG_NM":"DB HiTek Co.,LTD","LIST_DD":"1975/12/12","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"44,398,588"},{"ISU_CD":"KR7139130009","ISU_SRT_CD":"139130","ISU_NM":"DGB금융지주보통주","ISU_ABBRV":"DGB금융지주","ISU_ENG_NM":"DGB Financial Group","LIST_DD":"2011/06/07","MKT_TP_NM":"KOSPI","SECUGRP_NM":"주권","SECT_TP_NM":"","KIND_STKCERT_TP_NM":"보통주","PARVAL":"5,000","LIST_SHRS":"169,145,833"}
    ],
    // 필터즈?
    filters: [],
    // 데이터 소스
    datasources: [],
    // 데이터 소스 필드
    datasourceFields: [],
    // 에러 목록
    erros: {},

    // insert or update 할때 사용
    input: {
      templateName: '1. kafka raw data -> persistence storage',
      templateDescription: '',
      instanceName: '', // 3글자, 첫 자 공백 x, 한글 영문 숫자, 중복 체크
      instanceDescription: '', 
      protocol: 'tcp', // udp, tcp
      port: '', // 1024~49151 : Registered Port, 잘 알려져 있는 프로그램들이 아닌 다른 용도의 프로그램들이 사용합니다.
      topic: '',

      selectedFields: [
        // { name: 'isu_cd', type: 'string, numeric, timestamp', use: true & false }
      ], // 선택된 필드
      selectedFilters: [
        // { name: 'isu_cd', type: 'string, numeric, timestamp', use: true & false }
      ], // 선택된 필터
      selectedDatasource: {
        name: '',
      }, // 선택된 데이터 소스
      selectedDatasourceField: '', // 선택된 데이터 소스 테이블의 컬럼

      // 선택된 query?
      selectedQuerys: [],
    }
  }

  bolts: any = {
    instanceId: 0,
    instanceName: '',
    instanceDescription: '',
    templateId: 1,
    streams: [
    ],
  }

  // 볼트 초기화
  initBolts() {
    this.bolts.streams = [];
  }

  // 볼트 추가
  addBolt() {
    // 볼트가 추가 되어 있는지 확인
    // 현제스탭 과 this.bolts.length() 같으면 볼트가 없어서 추가 해야됨

    // 볼트가 추가 되어 있다면...
    // 그냥 둠

    // 볼트가 추가 되어 있지 않다면...
    // 볼트 추가
    const { streams } = this.bolts;
    const { input, preview, colum, filter, join, storage } = this.temporaryBolt;

    if(this.flowstate == (streams.length + 1)) { // 현제스탭 과 this.bolts.length() + 1 같으면 볼트가 없어서 추가 해야됨
      switch(this.flow[this.flowstate]) { // 볼트 추가
        case TYPE.INPUT:
          streams.push(input);
          break;
        case TYPE.PREVIEW:
          streams.push(preview);
          break;
        case TYPE.FILTER:
          streams.push(filter);
          break;
        case TYPE.JOIN:
          streams.push(join);
          break;
        case TYPE.STORAGE:
          streams.push(storage);
          break;
      }
    }
  }

  // 임시 볼트에 자신 순서의 볼트가 저장되어 있는지
  // 임시 볼트에 볼트 추가
  // 

  // 임시 볼트
  temporaryBolt: any = {
    input: {
      type: "STREAM_INPUT_CONFIG",
      config: {
        host: "123.123.123.123",
        port: 123,
        protocol: "TCP",
        topicId: 1,
      },
    },
    preview: {
      type: "PARSE_STREAM_CONFIG",
      config: {
        delimeter: ",",
        columns: [
          {
            name: "col1",
            type: "NUMERIC", // NUMERIC, STRING, TIMESTAMP
            timestampFormat: "",
          },
        ],
      },
    },
    colum: {
      type: "COLUMN_FILTER_CONFIG",
      config: {
        filterColumns: [
          {
            name: "col1",
            type: "NUMERIC", // NUMERIC, STRING, TIMESTAMP
            timestampFormat: "",
          },
        ],
      },
    },
    filter: {
      type: "COLUMN_FILTER_CONFIG",
      config: {
        filters: [
          {
            column: {
              name: "col1",
              type: "NUMERIC", // NUMERIC, STRING, TIMESTAMP
              timestampFormat: "",
            },
            operationType: ">",
            filterValue: 10,
          },
        ],
      },
    },
    join: {
      type: "JOIN_STREAM_CONFIG",
      config: {
        "columns": [
          {
            "name": "col1",
            "type": "NUMERIC",
            "timestampFormat": ""
          },
          {
            "name": "col2",
            "type": "STRING",
            "timestampFormat": ""
          },
          {
            "name": "col3",
            "type": "TIMESTAMP",
            "timestampFormat": "yyyy-MM-dd HH:mm:ss"
          }
        ]
      },
    },
    storage: {
      type: "TARGET_STORAGE_CONFIG",
      config: {
        windowType: "TIME",
        timeWindow: "19:43",
        dataLength: 4,
        storageDB: true,
        storageHDFS: true,
      },
    },
  }
}