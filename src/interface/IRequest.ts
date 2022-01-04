import { IWidget } from '@/views/dashboard/editor/dashboard-editor-service';

export interface IRequestRepository {
  _type: 'EventRepository';
  id: string;
  project: {
    _type: 'Project';
    id: string;
  };
  resourceGroup?: {
    _type: 'ResourceGroup';
    id: string;
  };
}

export interface IRequestProcess {
  _type: 'ProcessDependentConfiguration';
  process: {
    _type: 'ProcessModel';
    id: string;
    project: {
      _type: 'Project';
      id: string;
    };
    resourceGroup?: {
      _type: 'ResourceGroup';
      id: string;
    };
  };
}

export interface ITimeEventFilter {
  _type: 'TimeframeFilterLite';
  minStr: string;
  maxStr: string;
  keepCases?: 'START' | 'COMPLETE' | 'INTERSECT' | 'CONTAINED';
}

export interface IVariantFilter {
  _type: 'TraceVariantFilterLite';
  config: {
    _type: 'TraceVariantDiscoveryLiteConfiguration';
    repository: IRequestRepository;
    option: string; // 'STANDARD' | 'ES_MONTHLY'
    eventFilters: (ITimeEventFilter | IAttributeFilter | ICaseFilter)[];
  };
  values: string[];
}

export interface IAttributeFilter {
  _type: 'AttributeFilterLite';
  attribute: string;
  values: string[];
}

export interface ICaseFilter {
  _type: 'CaseFilterLite';
  values: string[];
}

export interface IRequestDashboard {
  _type: 'DashboardConfigurationLiteImpl';
  repository: {
    _type: 'EventRepository';
    id?: string;
    project: {
      _type: 'Project';
      id: string;
    };
  };
  data?: {
    _type: 'DashboardImpl';
    pages?: {
      [key: string]: {
        _type: 'PageImpl';
        id: string;
        name: string;
        widgets: { [key: string]: IWidget };
      };
    };
  };
}

export interface IRequestProcessFhm {
  // _type?: 'FhmProcessDiscoveryLiteConfiguration';
  positiveObservationThreshold?: number;
  dependencyThreshold?: number;
}

export interface IRequestProcessFuzzy {
  // _type?: 'FuzzyProcessDiscoveryLiteConfiguration';
  graphRecomMaxNodes?: number;
  nodeSigMin?: number;
  nodeSigMax?: number;
  arcSigMin?: number;
  arcSigMax?: number;
}

export interface IRequestProcessDisocovery extends IRequestProcessFhm, IRequestProcessFuzzy {
  _type?: 'FhmProcessDiscoveryLiteConfiguration' | 'FuzzyProcessDiscoveryLiteConfiguration';
  // filter
  repository: IRequestRepository;
  eventFilters: (ITimeEventFilter | IVariantFilter | IAttributeFilter | ICaseFilter)[];
  // graph config
  addArtificialStartEnd: boolean;
  calculateNodeRework: boolean;
  calculateBottleneck: boolean;
  useEventBag: boolean;
  displayLimit: number;
}

export interface IRequestDeltaAnalysisItem {
  _type: 'EventRepositoryDependentConfiguration';
  repository: IRequestRepository;
  option: string;
  eventFilters: (ITimeEventFilter | IVariantFilter | IAttributeFilter | ICaseFilter)[];
}

export interface IRequestDelaAnalysisFhm {
  fhm: {
    _type: 'ProcessComparatorConfiguration';
    serviceId: 'process.discovery.model.fhm';
    configurations: [
      {
        // 프로세스 그래프 config
        _type: 'FhmProcessDiscoveryLiteConfigurationImpl';
        positiveObservationThreshold?: number;
        dependencyThreshold?: number;
        addArtificialStartEnd: boolean;
        displayLimit: number;
        useEventBag: boolean;
        calculateNodeRework: boolean;
        calculateBottleneck: boolean;
      }
    ];
  };
}

export interface IRequestDelaAnalysisFuzzy {
  fuzzy: {
    _type: 'ProcessComparatorConfiguration';
    serviceId: 'process.discovery.model.fuzzy';
    configurations: [
      {
        // 프로세스 그래프 config
        _type: 'FuzzyProcessDiscoveryLiteConfigurationImpl';
        graphRecomMaxNodes?: number;
        nodeSigMin?: number;
        nodeSigMax?: number;
        arcSigMin?: number;
        arcSigMax?: number;
        addArtificialStartEnd: boolean;
        displayLimit: number;
        useEventBag: boolean;
        calculateNodeRework: boolean;
        calculateBottleneck: boolean;
      }
    ];
  };
}

export interface IRequestDeltaAnalysis {
  _type: 'DeltaAnalysisConfiguration';
  project: {
    _type: 'Project';
    id: string;
  };
  baseline?: IRequestDeltaAnalysisItem | IRequestProcess;
  compared?: IRequestDeltaAnalysisItem | IRequestProcess;
  compares?: {
    [key: string]: {
      _type: 'ProcessComparatorConfiguration';
      serviceId?: 'process.discovery.model.fhm' | 'process.discovery.model.fuzzy';
      configurations: [
        {
          // 프로세스 그래프 config
          _type?: 'FhmProcessDiscoveryLiteConfigurationImpl' | 'FuzzyProcessDiscoveryLiteConfigurationImpl';
          // fhm
          positiveObservationThreshold?: number;
          dependencyThreshold?: number;
          // fuzzy
          graphRecomMaxNodes?: number;
          nodeSigMin?: number;
          nodeSigMax?: number;
          arcSigMin?: number;
          arcSigMax?: number;
          addArtificialStartEnd: boolean;
          displayLimit: number;
          useEventBag: boolean;
          calculateNodeRework: boolean;
          calculateBottleneck: boolean;
        }
      ];
    };
  };
}
