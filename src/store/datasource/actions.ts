import { AxiosResponse } from 'axios';
import { http } from '../../common';
import _ from 'lodash';

export default {
  // 1. Create / save database data source info. (New !)
  dsCreate({ commit, dispatch }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr
      .post('/service/run/repo.data.source.save', [
        {
          _type: 'DataSourceInfoSaveConfiguration',
          data: {
            _type: 'DbDataSourceInfoImpl',
            id: data.id,
            name: data.dataSourceName,
            provider: data.provider,
            hostname: data.hostname,
            port: data.port, // number
            username: data.username,
            password: data.password,
            database: data.database,
            schema: data.schema,
            entity: data.entity,
            connection: data.connection,
            role: data.role,
            project: {
              id: data.projectId,
              _type: 'Project',
            },
            resourceGroup: {
              id: data.resourceGroupId,
            },
            syncDataset: {
              id: data.syncDatasetId,
            },
            syncEnabled: data.syncEnabled,
            syncMethod: data.syncMethod,
            syncSchedule: data.syncSchedule,
            syncKey: data.syncKey,
          },
          saveRelation: 'REPLACE',
        },
      ])
      .then((res: any) => {
        return res;
      });
  },

  //2. Get list of all database data source info. (New !)
  dsList({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    const requestParam: any = {
      _type: 'DataSourceInfoSelectConfiguration',
      selectors: [],
    };

    if (data.excludeUsed != undefined) {
      requestParam.excludeUsed = true;
      delete data.excludeUsed;
    }

    requestParam.selectors.push(data);

    return http.ipr.post('/service/run/repo.data.source.index', [requestParam]).then((res: any) => {
      return res;
    });
  },

  dsListSearch({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    const requestParam: any = {
      _type: 'DataSourceInfoSelectConfiguration',
      mode: 'SEARCH_NAME_PREFIX',
      selectors: [],
    };

    requestParam.selectors.push(data); //add selector(s)

    return http.ipr.post('/service/run/repo.data.source.index', [requestParam]).then((res: any) => {
      return res;
    });
  },

  //3. View database data source info. (New !)
  dsInfo({ commit, dispatch }: any, data: any = {}): Promise<any> {
    return http.ipr
      .post('/service/run/repo.data.source.view', [
        {
          _type: 'DataSourceInfoSelectConfiguration',
          selectors: [
            {
              id: data.id,
              _type: 'DbDataSourceInfoImpl',
              project: {
                id: data.projectId,
                _type: 'Project',
              },
              resourceGroup: {
                id: data.resourceGroupId,
              },
            },
          ],
        },
      ])
      .then((res) => {
        return res;
      });
  },

  //4. Delete database data source info. (New !)
  dsDelete({ commit, dispatch }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr
      .post('/service/run/repo.data.source.delete', [
        {
          _type: 'DataSourceInfoSelectConfiguration',
          selectors: [
            {
              id: data.id,
              _type: 'DbDataSourceInfoImpl',
              project: {
                id: data.projectId,
                _type: 'Project',
              },
              resourceGroup: {
                id: data.resourceGroupId,
              },
            },
          ],
        },
      ])
      .then((res: any) => {
        return res;
      });
  },

  // db Test (postgres)
  postgresTest({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/repo.data.import.db.psql.list.lite', [
      {
        _type: 'DatasetImportDbPsqlConfiguration',
        hostname: data.hostname,
        port: data.port,
        username: data.username,
        password: data.password,
        database: data.database,
        schema: data.schema,
        table: data.table,
      },
    ]);
  },

  // db Test (mysql)
  mysqlTest({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/repo.data.import.db.mysql.list.lite', [
      {
        _type: 'DatasetImportDbMysqlConfiguration',
        hostname: data.hostname,
        port: data.port,
        username: data.username,
        password: data.password,
        database: data.database,
        table: data.table,
      },
    ]);
  },

  // db Test (mssql)
  mssqlTest({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/repo.data.import.db.mssql.list.lite', [
      {
        _type: 'DatasetImportDbMssqlConfiguration',
        hostname: data.hostname,
        port: data.port,
        username: data.username,
        password: data.password,
        database: data.database,
        table: data.table,
      },
    ]);
  },

  // db Test (oracle)
  oracleTest({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/repo.data.import.db.oracle.list.lite', [
      {
        _type: 'DatasetImportDbOracleConfiguration',
        hostname: data.hostname,
        port: data.port,
        username: data.username,
        password: data.password,
        database: data.database,
        table: data.table,
        connection: data.connection,
        role: data.role,
      },
    ]);
  },

  testTable({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr
      .post(`/service/run/repo.data.import.db.${data.db}.preview.lite`, [
        {
          _type: `DatasetImportDb${_.upperFirst(data.db)}Configuration`,
          hostname: data.hostname,
          port: data.port,
          username: data.username,
          password: data.password,
          database: data.database,
          schema: data.schema,
          entity: data.entity,
          dataset: {
            project: {
              id: data.projectId,
            },
            resourceGroup: {
              id: data.resourceGroupId,
            },
          },
        },
      ])
      .then((res) => {
        return res;
      });
  },

  // db upload (postgres)
  postgresUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr.post('/service/run/repo.data.import.db.psql.lite', [
      {
        _type: 'DatasetImportDbPsqlConfiguration',
        hostname: data.hostname,
        port: data.port,
        username: data.username,
        password: data.password,
        database: data.database,
        schema: data.schema,
        table: data.table,
        dataset: {
          _type: 'DatasetImpl',
          name: data.datasetName,
          project: {
            _type: 'ProjectImpl',
            id: data.projectId,
          },
          resourceGroup: {
            id: data.resourceGroupId,
          },
        },
      },
    ]);
  },

  // db upload (mysql)
  mysqlUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr
      .post('/service/run/repo.data.import.db.mysql.lite', [
        {
          _type: 'DatasetImportDbMysqlConfiguration',
          hostname: data.hostname,
          port: data.port,
          username: data.username,
          password: data.password,
          database: data.database,
          schema: data.schema,
          table: data.table,
          dataset: {
            _type: 'DatasetImpl',
            name: data.datasetName,
            project: {
              _type: 'ProjectImpl',
              id: data.projectId,
            },
            resourceGroup: {
              id: data.resourceGroupId,
            },
          },
        },
      ])
      .then((res: any) => {
        return res;
      });
  },

  // db upload (mssql)
  mssqlUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr
      .post('/service/run/repo.data.import.db.mssql.lite', [
        {
          _type: 'DatasetImportDbMssqlConfiguration',
          hostname: data.hostname,
          port: data.port,
          username: data.username,
          password: data.password,
          database: data.database,
          schema: data.schema,
          table: data.table,
          dataset: {
            _type: 'DatasetImpl',
            name: data.datasetName,
            project: {
              _type: 'ProjectImpl',
              id: data.projectId,
            },
            resourceGroup: {
              id: data.resourceGroupId,
            },
          },
        },
      ])
      .then((res: any) => {
        return res;
      });
  },

  // db upload (oracle)
  oracleUpload({ commit }: any, data: any = {}): Promise<AxiosResponse> {
    return http.ipr
      .post('/service/run/repo.data.import.db.oracle.lite', [
        {
          _type: 'DatasetImportDbOracleConfiguration',
          hostname: data.hostname,
          port: data.port,
          username: data.username,
          password: data.password,
          database: data.database,
          schema: data.schema,
          table: data.table,
          dataset: {
            _type: 'DatasetImpl',
            name: data.datasetName,
            project: {
              _type: 'ProjectImpl',
              id: data.projectId,
            },
            resourceGroup: {
              id: data.resourceGroupId,
            },
          },
        },
      ])
      .then((res: any) => {
        return res;
      });
  },
};
