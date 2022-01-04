import { IKeyValueObject } from '..';

export interface IAsyncServiceResponse {
  _type: 'ServiceContextWebLiteImpl';
  id: string;
  hash: string;
  dataUri?: string;
  info: {
    _type: 'ServiceContextInfoImpl';
    id: string;
    hash: string;
    dataUri?: string;
    state: 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'ERROR';
    client: {
      _type: 'ClientImpl';
      state: string;
    };
    code: number;
    created: number;
    completed: number;
    elapsedTime: number;
    progress: number;
    progressData: string;
  };
  client: {
    _type: 'ClientImpl';
    state: string;
  };
  createdBy: string;
  data?: IKeyValueObject;
}
