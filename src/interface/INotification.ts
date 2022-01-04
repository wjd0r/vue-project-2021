export interface INotificationActionInfo {
  _type: 'ServiceContextInfoImpl';
  id: string;
  hash: string;
  origin: string;
  dataUri?: string;
  created: number;
  started: number;
  completed: number;
  timestamp: number;
  state: 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'CANCELED' | 'ERROR';
  code: number;
  client: {
    _type: 'ClientImpl';
    state: string;
  };
  message: string;
  progress: number;
  elapsedTime?: number;
}

export interface INotificationData {
  _type: 'ServiceContextInfoImpl' | 'WorkflowContextInfoImpl';
  id: string;
  hash: string;
  dataUri?: string;
  created: number;
  started: number;
  completed: number;
  timestamp: number;
  state: 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'CANCELED' | 'ERROR';
  client: {
    _type: 'ClientImpl';
    state: string;
  };
  actionInfo?: {
    [key: string]: INotificationActionInfo;
  };
  code: number;
  messageCode?: string;
  message?: string;
  progress: number;
  progressData?: string;
  elapsedTime?: number;
}

export interface INotification {
  sseId: string;
  userId: string;
  eventType: string; // 백엔드팀에 물어봐서 쓰는 값만 넣는 걸로
  serviceId: string;
  notificationData: string;
}
