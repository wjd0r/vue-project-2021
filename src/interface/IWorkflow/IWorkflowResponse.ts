import { IKeyValueObject } from '..';

// 'variant' | 'graph' | 'token' | 'chart' | 'case' | 'bottleneck' | 'rework'

export interface IWorkFlowResponseAction {
  _type: 'ServiceAction';
  id: string;
  serviceId: string;
  hash: string;
  dataUri: string;
  info: {
    id: string;
    dataUri: string;
    state: 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'ERROR';
    code: number;
  };
  client?: {
    state: string;
  };
  configurations: IKeyValueObject[];
}

export interface IWorkFlowResponse {
  _type: 'ConcurrentWorkflowContext';
  id: string;
  hash: string;
  namespace: string;
  info: {
    _type: 'WorkflowContextInfoImpl';
    id: string;
    hash: string;
    state: 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'ERROR';
    code: number;
    created: number;
    completed: number;
    elapsedTime: number;
    progress: number;
    progressData: string;
  };
  client: {
    _type: 'ClientImpl';
    name: string;
    state: string;
  };
  actions: {
    [key: string]: IWorkFlowResponseAction;
  };
}
