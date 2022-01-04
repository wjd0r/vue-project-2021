import { IKeyValueObject } from '..';

// 'variant' | 'graph' | 'token' | 'chart' | 'case' | 'bottleneck' | 'rework'

export interface IWorkFlowRequestAction {
  _type: 'ServiceAction';
  id: string;
  serviceId: string;
  client?: {
    url: string;
    name: string;
    state: string;
  };
  configurations: IKeyValueObject[] | IKeyValueObject;
}

export interface IWorkFlowRequest {
  _type: 'ConcurrentWorkflowContext';
  namespace: string; // projectId
  client: {
    url: string;
    name: string;
    state: string;
    visible?: boolean;
  };
  actions: {
    [key: string]: IWorkFlowRequestAction;
  };
}
