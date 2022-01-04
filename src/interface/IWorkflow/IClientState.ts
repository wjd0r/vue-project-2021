export interface IClient {
  url: string;
  name: string;
  state: string;
}
export default interface IClientState {
  title: string; // 다국어 처리를 위해 id처럼 like view.sse.title.data.importing
  route: {
    from: string; // route name
    to: string; // route name
    failTo?: string; //실패 바로가기
    params?: {
      projectId?: string;
      repositoryId?: string;
    };
  };
  datasetImporting?: {
    workspaceName?: string; //
    dataSetName: string;
    eventName: string;
    file?: {
      //
      filename: string;
    };
    db?: {
      //
      dbtype: string;
      host: string;
      db: string;
      table: string;
    };
  };
  dataFilter?: {
    //dataSetId: string;
    workspaceName?: string;
    dataSetName: string; //데이터셋
    dataSetNameOrigin: string; //원본 데이터셋
    //eventName: string;
    subDatasetCreateInfo: string;
  };
  eventMapping?: {
    workspaceName?: string; //
    dataSetId: string;
    dataSetName: string;
    eventName: string;
    state: string /* mapping test | mapping */;
    eventDesc: string; //for remapping
    resourceGroupId: string; //for remapping
    eventInfo: string; //for remapping
  };
  eventFilter?: {
    //나중에 추가
    //dataSetId: string;
    workspaceName?: string;
    eventlog_origin: string;
    dataSetName: string;
    eventName: string;
    state: string /* get lookup | make a view */;
    subEventCreateInfo: string;
  };
  variant?: {
    //워크스페이스 이름 추가할지 체크할 것!
    analysis: string; // 어느 분석 메뉴에서 보냈는지 알 수 있게, route.name 넣기
    repository: {
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      comparedDuration?: {
        start: string;
        end: string;
      };
      variantType: string;
      algorithm?: 'fhm' | 'fuzzy'; // discovery
      nodeText?: string; // discovery, delta, logReplay, social
      arcText?: string; // discovery, delta, logReplay, social
      dep?: number; // discovery, delta, logReplay
      freq?: number; // discovery, delta, logReplay
      nodeSign?: number; // discovery
      arcSign?: number; // discovery
      viewMode?: 'merged' | 'twoView'; // delta
      tokenInclude?: string; // logReplay
      tokenValue?: string; // logReplay
      layout?: 'd3-force' | 'circle'; // social
      colEventActivity?: string; // social
      rank?: string; // social
      selectedX?: string; // matrix
      selectedY?: string; // matrix, gantt
      selectedValue?: 'EXTRACT'; // matrix
      selectedColorBy?: string; // matrix
      component?: string; // dotted
      value?: string; // dotted
      barSeries?: string; // gantt
      sortBy?: string; // gantt
      sortDirection?: string; // gantt
    };
  };
  dashboard?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      comparedDuration?: {
        start: string;
        end: string;
      };
      varintType: string;
    };
    variant: {
      id: string;
      name: string; //배리언트 이름->그룹 이름 으로 변경
    };
    selectedTab: 'overview' | 'activity' | 'resource' | 'originator' | 'cost' | 'personal';
  };
  processDiscovery?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string;
      algorithm: 'fhm' | 'fuzzy';
      nodeText: string;
      arcText: string;
      tokenInclude?: string;
      tokenValue?: string;
      dep?: number;
      freq?: number;
      nodeSign?: number; //액티비티 중요도
      arcSign?: number; //연결성 중요도
      isComparedToPM?: boolean;
    };
    variant: {
      id: string;
      name: string;
    };
  };
  deltaAnalysis?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string;
      algorithm: 'fhm' | 'fuzzy';
      nodeText: string;
      arcText: string;
      viewMode: 'merged' | 'twoView';
      dep?: number;
      freq?: number;
    };
    variant?: {
      id: {
        leftId: string;
        rightId: string;
      };
      name: string;
    };
  };
  logReplay?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string;
      algorithm: 'fhm' | 'fuzzy';
      nodeText: string;
      arcText: string;
      tokenInclude?: string;
      tokenValue?: string;
      dep?: number;
      freq?: number;
    };
    variant: {
      id: string;
      name: string;
    };
  };
  socialAnalysis?: {
    //check
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string;
      layout: 'd3-force' | 'circle';
      colEventActivity: string;
      nodeText: string;
      arcText: string;
      rank: string;
    };
    variant: {
      id: string;
      name: string;
    };
  };
  matrixModel?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string; //분석 항목
      selectedX: string;
      selectedY: string;
      selectedValue: 'EXTRACT';
      selectedColorBy: string; //값 유형
      tokenInclude?: string;
      tokenValue?: string;
      graphFilter?: string;
    };
    variant: {
      id: string;
      name: string;
    };
  };
  dotted?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string; //분석 항목
      component: string;
      value: string; //구분 속성
      graphFilter?: string;
    };
    variant: {
      id: string;
      name: string;
    };
  };
  gantt?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string; //분석 항목
      barSeries: string;
      sortBy: string;
      sortDirection: string;
    };
  };
  processFlow?: {
    repository: {
      workspaceName?: string;
      datasetName: string;
      repositoryName: string;
    };
    filter: {
      duration: {
        start: string;
        end: string;
      };
      varintType: string; //분석 항목
      barSeries: string;
      sortBy: string;
      sortingBy: string;
      sortDirection: string;
    };
  };
  dataSync?: {
    workspaceName?: string;
    datasourceName: string;
    totalNum: string; //기존 총 건수
    syncedTotalNum: string; //동기화된 총 건수
    relatedDatasetNum: string; //관련 데이터셋 수
    relatedEventLogNum: string; //관련 이벤트로그 수
  };
}
