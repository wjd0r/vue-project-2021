const repoTranslation = {
  repo: {
    label: {
      datasetName: 'Dataset Name',
      datasetRowNum: 'Dataset Row Count',
      otherRowNum: 'Filtered Data Row Count',
      eventName: 'Event Log Name',
      loading: 'Data is uploading',
      checking: 'Data is being verified.',
      waitting: 'Please wait, data is being processed.',
      complete: 'Data verification is complete.',
      completeClick: 'Please click Complete button.',
      confirm: 'Please check your data.',
      mapping: 'Click Remapping button to configure new mapping schema.',
      creator: 'Creator',

      // 완료화면
      filter: 'Data filter',
      filterExplanation: 'Select specific values ​​from the imported data to use for analysis. You can derive the required data set by selecting only the values ​​required for analysis among multiple values ​​in each field.',
      dashboard: 'Dashboard',
      dashboardExplanation: 'You can check the dashboard by going to the data summary menu of the generated event log.',
      analysis: 'Analysis',
      analysisExplanation: 'You can analyze the process by going to the process analysis menu of the generated event log.',
      management: 'Management',
      managementExplanation: 'Redirect to data management.',

      all: 'All',
      back: 'Back',

      // 데이터셋 수정
      datasetDescription: 'Dataset description',
      classifier: 'Type',
      fileName: 'Filename/Database Type',
      number: 'Total Rows',
      relDataset: 'Related Dataset',

      // 데이터셋 생성 - 생성 과정 1 - 데이터 정보 입력 - 테스트 form
      testSuccess: 'Connection test is successful.',
      testFailure: 'Connection test is failed.',
      testWrong: 'Invalid input.',
      testName: 'Name',
      testDivision: 'Type',
      testUse: 'Use selected table/view',
      testClose: 'Close',
      sample: 'Sample Data',
      chooseFileUpload: 'Choose File',

      file: 'File',
      database: 'Database',
      databaseName: 'Database',

      required: 'Required',
    },
    // 각 메뉴마다 사용하는 폼들 여기다 모아놓기
    form: {
      dataset: 'Dataset',
      repository: 'Event Log',
      subRepository: 'Sub Event Log',
      originalInfo: 'Origin Data Properties',
      processInfo: 'Baseline Process Properties',
      processCreate: 'Create Baseline Process',
      processModify: 'Modify Baseline Process',
      processName: 'Process Name',
      processDesc: 'Process Description',
      addRepo: 'Add Event Log',
      selectRepo: 'Select Event Log',
      datasetRepo: 'Dataset - Event Log',
      selectedDatasetRepo: 'Selected Dataset - Event Log',

      standardProcess: 'Baseline Process',
      registeredStandardProcess: 'Registered Baseline Process',

      relatedRepo: 'Related Event Log',
      processEdit: 'Process Editor',
      processEditSelectRepo: 'Create baseline process from event log',
      selectDataset: 'Select Dataset',

      // placeholder
      putProcessName: 'Please enter process name.',
      putProcessDesc: 'Please enter process description.',
      putDatasetDesc: 'Please enter dataset description.',
      searchMinLength: 'Please enter 3 or more characters.',
      // filter
      all: 'All',

      sourceDataInformation: 'Dataset Properties',
      sourceDataName: 'Dataset Name',
      pleaseEnter: 'Please enter dataset name',
      sourceDataDescription: 'Dataset Description',
      pleaseEnterDesc: 'Please enter dataset description',
      eventLog: 'Event Log',
      eventLogName: 'Event Log Name',
      eventLogNameEnter: 'Please enter event log name',
      eventLogDesc: 'Event Log Description',
      eventLogDescEnter: 'Please enter event log description',

      subEventLogNameEnter: 'Please enter filtered event log name', //2021.12.10 추가했음 (리스카)
      subEventLogDescEnter: 'Please enter filtered event log description', //2021.12.10 추가했음 (리스카)

      fileUploadType: 'Data Upload Type',
      fileUpload: 'File Upload',
      dataSourceConn: 'Datasource Connection',
      dataSource: 'Datasource',
      dataSourceChoice: 'Datasource',
      dataSourceImport: 'Select Datasource',
      write: 'Create Datasource',
      create: 'Create',
      dataSourceName: 'Datasource Name',
      test: 'Test',
      testConn: 'Test (connection success)',
      confirm: 'Upload Data',
      cancel: 'Cancel',
      userInput: 'Custom delimiter',
      division: 'Delimiter',
      fileName: 'Filename',

      //datasource
      host: 'Host',
      port: 'Port',
      role: 'Role',
      username: 'Username',
      password: 'Password',
      connection: 'Connection',
      database: 'Database',
      schema: 'Schema',
      table: 'Table',
      dataList: 'Data',
      saveChanges: 'Save Changes',
      select: 'Select',
      selectedDB: 'Please select database',
      selectTable: 'Please select table',
      syncTable: 'Target Table',
      tablePk: 'Synchronization Based Field',
      tableTs: 'Timestamp Field ',
      syncToggle: 'Synchronize',
      syncRule: 'Rule',
      syncSchedule: 'Schedule',
      syncDayList: 'Days',
      syncStartTime: 'Start Time',
      selectField: 'Please select field',
      selectTime: 'Please select time',
      syncTitle: 'Synchronization Schedule',
      syncScheduleOptions: {
        daily: 'Daily',
        weekly: 'Weekly'
      },
      syncRuleOptions: {
        append_only: 'Append Only',
        replace_all: 'Replace All',
        replace_diff: 'Replace Difference'
      },
      days: {
        mon: 'MON',
        tue: 'TUE',
        wed: 'WED',
        thu: 'THU',
        fri: 'FRI',
        sat: 'SAT',
        sun: 'SUN'
      },

      //datasource placeholder
      putDataSourceName: 'Please enter data source name',
      putHostName: 'Please enter hostname',
      putPort: 'Please enter port number',
      putUsername: 'Please enter username',
      putPassword: 'Please enter password',
      putDatabase: 'Please enter database name',
      putSchema: 'Please enter schema name',

      // cancel:'cancel',

      // workspace
      workspaceName: 'Workspace',

      fileupload: 'File upload',
      databaseSelection: 'Select database',

      databaseSyncGuide: 'Periodic data synchronization can be configured at the data source page.',
      testing: 'Testing...',
      testSuccess: 'Connection test is successful.',
      testFailed: 'Connection test is failed.',
      testGuide: 'Please test connection.',
    },
    list: {
      dataset: 'Dataset',
      lastUpdated: 'Last Update',
      create: 'Creator',
      totalEvent: 'Total Event Log',
      delete: 'Delete ',
      update: 'Properties',
      dataFilter: 'Dataset Filter',
      eventFilter: 'Event Log Filter',
    },
    create: {
      datasetCreate: 'Create Dataset',
      datasetCreationSteps: 'Dataset Creation',
      datasetInfoSteps: 'Create Dataset',
      process1title: 'Create Dataset',
      process1label: 'Upload the data for analysis to the app by means of file upload or database connection',
      process2title: 'Data filter (Optional)',
      process2label: 'Select the values to use from the data. By selecting specific values of each field, you would get the dataset you need.',
      process3title: 'Map Dataset',
      process3label: 'Create the event log by mapping dataset. The perspective and result of analysis can be changed depending on how to connect the mapping properties and fileds.',
      process3labelRepo: 'Create the event log by mapping the selected dataset. The perspective and result of analysis can be changed depending on how to connect the mapping properties and fileds.',
      process4title: 'Data Creation Completed',
      process4label: 'The new event log is successfully created. You can analyze the event log using dashboard or process analysis menu.',
      process4labelRepo: 'The new event log is successfully created. You will be redirected to the dataset management menu.',
      doNotDay: 'Do not open for a day',
      flowbox: {
        standard: {
          title: 'How to create baseline process',
          create: {
            title: 'Baseline Process Properties',
            content: 'Baseline process creation. Baseline process is used as a standard comparison for the discovered process model. The registered Baseline process will be used throughout the application.'
          },
          editor: {
            title: 'Baseline Process Editor',
            content: 'Baseline process editor. Redirect to editor page.',
          },
          complete: 'Baseline process is succcessfully created. Redirect to process list.',
        }
      },
      next: 'Next',

      //Flowbox(경림)
      flowboxEventInput: {
        title: 'Event Log Properties',
        content: 'Event log properties configuration.'
      },
      flowboxEventFilter: {
        title: 'Event Log Filter',
        content: 'You can use multiple filters on the selected event log to obtain various results. Using filters user can generate several sub event logs.'
      },
    },
    upload: {
      loadingData: 'File is uploading.',
      wait: 'Please wait for a moment.',
    },
    import: {
      loadingData: 'Data upload is in progress.',
      wait: 'Please wait a moment or go to other analysis menu.',
      process: 'The data is successfully imported.',
      next: 'If you want to proceed to the next step, click the Next button.',
      confirm: 'Please check your data again.',
      back: 'Back',
      mappingBack: 'Click the back button to start a new mapping.',
      /*추가됨*/mappingBackPreview: 'Click the before button to start a new mapping.',
    },
    // 각 메뉴마다 사용하는 버튼들 여기다 모아놓기
    button: {
      yes: 'Yes',
      no: 'No',
      select: 'Select',
      create: 'Create',
      modify: 'Modify',
      delete: 'Delete',
      download: 'Download',
      export: 'Export',

      ok: 'Confirm',
      save: 'Save',
      saveForm: 'Save Properties',
      deploy: 'Deploy',
      deployCancel: 'Withdraw',
      cancel: 'Cancel',
      exit: 'Exit',
      test: 'Test',
      close: 'Close',

      processEdit: 'Process Editor',
      editBySelf: 'From scratch',
      editByRepo: 'From dataset',
      edit: 'Edit',

      next: 'Next',
      complete: 'Complete',
      remapping: 'Remapping',

      back: 'Back',

      search: 'Search',

      before: 'Before',

      //datasource create button
      dbCreate: 'Create Connection',
      createEvent: 'Create Event Log',
      dSchedule: 'Remove Synchronization',

      //repositoryfilter
      apply: 'Apply', //2021.12.10 추가했음 (리스카)
      reset: 'Reset', //2021.12.10 추가했음 (리스카)
    },
    multiSelect: {
      select: 'Select',
      download: 'Download',
      delete: 'Delete',
      cancel: 'Cancel'
    },
    cardDropDown: {
      download: 'Download',
      modify: 'Modify',
      delete: 'Delete'
    },
    demo: {
      dataset: 'Sample Data',
      finance: 'Finance', //'재무 데이터',
      healthcare: 'Healthcare', //'진료 데이터',
      machinerepair: 'Machine Repair', //'설비 데이터',
      manufacture: 'Manufacture', //'생산 데이터',
      portlogistics: 'Port Terminal', //'항만물류 데이터',
      shopping: 'Shopping', //'온라인수주 데이터'
      invoice: 'Product Sales' //'제품 판매'
    },
    project: {
      title: 'My Project',
      sampletitle: 'Sample Project',
      pminingStudyTitle: 'More on process mining',
      modal: {
        createTitle: 'Create Project',
        modifyTitle: 'Modify Project',
        projectName: 'Project Name',
        projectNamePlaceHolder: 'Please enter project name.',
        projectDesc: 'Project Description',
        projectDescPlaceHolder: 'Please enter project description',
        addEvent: 'Add Event Log',
        registerEvent: 'Register Event Log',
        selectGroup: 'Select Group',
        all: 'All',
        groupAndEvent: 'Dataset-Event Log',
        registedGroupAndEvent: 'Registered Dataset-Event Log',
        registerHelp: ''
      }
    },
    event: {
      eventGroup: {
        title: 'Dataset',
        modal: {
          createTitle: 'Create Dataset',
          groupName: 'Group Name',
          groupNamePlaceHolder: 'Please enter group name.',
          groupDesc: 'Group Description',
          groupDescPlaceHolder: 'Please enter group description.',
          fileUpload: 'File Upload',
          upload: 'Upload',
          fileUploadHelp: 'File (Only file with UTF encoding and row count more than {count} can be uploaded.) (*)',

          createEvent: 'Create event log',
          createEventHelp: ' (※ Create event log after MXML or XES file upload is completed.)',

          selectFile: 'Select File',
          fileSearch: 'Browse',
          fileErrorMessage: {
            csv: 'Select file having csv extension.',
            xlsx: 'Select file having xlsx or xls extension.',
            mxml: 'Select file having mxml or mxml.gz extension.',
            xes: 'Select file having xes or xes.gz extension.'
          },
          rowIndex: 'Header Index',
          delimeter: 'Delimiter (*)',
          delimeterPlaceHolder: 'Please enter delimiter.',
          delimeterValidation: 'Please enter up until 4 digits delimiter.',
          completeModal: {
            title: 'Dataset Upload Complete',
            msg1: 'File is successfully uploaded.',
            msg2: ' is successfully created.',
            complete: 'Complete',
            createEvent: 'Create Event Log'
          },
          modifyTitle: 'Properties',
          modifyModalTitle: 'Dataset Properties',
          fileName: 'Filename',
          infoTitle: 'Dataset Properties'
        }
      },
      eventLog: {
        title: 'Event Log',
        createBtn: 'Create Event Log',
        modal: {
          createTitle: 'Create Event Log',
          eventName: 'Event Log Name',
          eventNamePlaceHolder: 'Please enter event log name.',
          eventDesc: 'Event Log Description',
          eventDescPlaceHolder: 'Please enter event log description.',
          selectProcess: 'Select Baseline Process',
          none: 'None',

          modifyTitle: 'Modify Event Log',
          infoTitle: 'Event Log Description',
          mappingMatchList: 'Mapping Schema',
          caseId: 'Case ID',
          activity: 'Activity',
          startTime: 'Start Timestamp',
          endTime: 'End Timestamp',
          originator: 'Originator',
          resource: 'Resource',
          caseProperty: 'Case Attribute',
          eventProperty: 'Event Attribute',
          useTime: 'Timestamp Format',

          eventCost: 'Event Cost',
          caseAllCost: 'Case Cost'
        }
      },
      mapping: {
        eventName: 'Event Log Name',
        standardProcess: 'Baseline Process',

        doSelect: 'Please select',
        wrongDateFormat: 'Invalid timestamp format.',

        selectedAll: 'Select all',

        select: {
          caseId: 'Case ID',
          activity: 'Activity',
          startTime: 'Start Timestamp',
          endTime: 'End Timestamp',
          originator: 'Worker',
          resource: 'Equipment',
          eventCost: 'Event Cost',
          caseAllCost: 'Case Cost',
          caseProperty: 'Case Attribute',
          eventProperty: 'Event Attribute'
        },

        testResult: {
          isValidating: 'Validating...',
          wait: 'Please wait.',

          recheckData: 'Please check the data.',
          clickRemappingBtn: 'Please click remapping button.',
          newMappingNeeded: 'New mapping is required.',

          validationCompleted: 'Data validation is complete.',
          clickCompleteBtn: 'Click complete button.',
          completeBtnNeeded: 'The mapping process is complete once the complete button is clicked.'
        },

        errorResult: {
          wrongDateFormat: 'Wrong timestamp format.',
          noAcceptNull: 'Null value is not accepted.',
          noAcceptBlank: 'Empty value is not accepted.',
          thereIsError: ' error exist.'
        },

        moveAfterTest: {
          title: 'Redirecting Page',
          dashboard: 'Dasboard',
          processAnalysis: 'Process analysis',
          cancel: 'Cancel'
        }
      }
    },
    standard: {
      title: 'Baseline Process',
      toolTitle: 'Tool',
      inspectorTitle: 'Editor',
      activityName: 'Activity Name',
      sourceActivityName: 'Source Activity Name',
      targetActivityName: 'Target Activity Name',
      required: 'Required',
      timeValue: 'Standard Time',
      timeUnit: 'Time Unit',
      sec: 'Second',
      min: 'Minute',
      hour: 'Hour',
      day: 'Day',
      validate: {
        // 유효성 검사
        startConnectByTarget: "'START' is used as target activity",
        endConnectBySource: "'END' is used as source activity",
        unConnectedActivity: 'There are activities that disconnected: ',
        unConnectedActivityAtSource: 'These activities are disconnected with the preceding activity: ',
        unConnectedActivityAtTarget: 'These activities are disconnected with the succeeding activity: ',
        emptyNameActivity: 'There is activity having empty name',
        activityNameisStart: "Duplicated activity name 'START'",
        activityNameisEnd: "Duplicated activity name 'END'",
        activityNameBendRule: 'These activity name are not complied with the naming standard: ',
        activityTimeValueNotNumber: 'These activities contain non-numerical value for processing time field: ',
        activityTimeValueNotOverZero: 'These activities contain processing time value less than 0: ',
        linkUnConnectedSource: 'These transitions are disconnected with the preceding activity: ',
        linkUnConnectedTarget: 'These transitions are disconnected with the succeeding activity: ',
        linkHaveFromStartToEnd: "No transition connecting 'START' and 'END' activies",
        linkTargetIsStart: "'START' activity is disconnected with the succeeding activity: ",
        linkSourceIsEnd: "'END' activity is disconnected with the preceding activity: ",
        linkTimeValueNotNumber: 'These transitions contain non-numerical value for processing time field: ',
        linkTimeValueNotOverZero: 'These transitions contain processing time value less than 0: ',
        onlyStartEnd: "Baseline process only contains 'START' and 'END' activities",
        duplatedActiviy: 'Duplicated activity name: ',
        duplatedLink: 'Duplicated transition name: ',
        noHaveActivity: 'Activity not found',
        noHaveLink: 'Required at least 2 transitions are created',
        haveLinkButNotConn: 'A transition should connected to two activities',
        // inspector
        lessThenZero: 'Input value is less than 0. Please check again.'
      }
    },
    //데이터소스
    datasource: {
      title: {
        index: 'Datasource',
        create: 'Create Connection',
        modify: 'Modify Connection',
        default: 'Connection Properties'
      },
      type: {
        psql: 'PostgreSQL',
        postgres: 'PostgreSQL',
        postgresql: 'PostgreSQL',
        oracle: 'Oracle',
        mysql: 'MySQL',
        mssql: 'MSSQL',
        mariadb: 'MariaDB'
      },
      validation: {
        nameLength: 'At least 3 characters are permitted',
        duplicateName: 'Datasource name is duplicated',
        onlyNumber: 'Only number is permitted',
        mustTest: 'Click Test button and then select table',
        testFailed: 'Connection test failed',
        testSuccess: 'Connection test successful',
        tableNotFound: 'FATAL: Table not found.',
      }
    },
    // 툴팁
    tooltip: {
      undo: 'Undo',
      redo: 'Redo',
      clear: 'Reset',
      exportSvg: 'Export to SVG',
      exportPng: 'Export to PNG',
      fullscreen: 'Show fullscreen',
      toFront: 'Bring to front',
      toBack: 'Send to back',
      graphLayout: 'Auto-layout graph',
      zoomToFit: 'Zoom to fit',
      graphValidate: 'Validate graph'
    },
    // 필요한 alert 메세지 여기다 모아놓기
    alert: {
      button: {
        modify: 'Modify',
      },
      title: {
        datasetModify: 'Modify Dataset',
        save: 'Save',
        complete: 'Complete',
        validate: 'Validation',
        validateFailed: 'Validation Failed',
        cantCreateTitle: 'Creation is not allowed', //not sure about this, original 생성 불가
        delete: 'Delete',
        deleteProcess: 'Delete Baseline Process',
        info: 'Info',
        alarm: 'Warning',
        noPermission: 'No Permission',
        deleteCache: 'Delete Cache',
        success: 'Success',
        failed: 'Failed',
        error: 'Error'
      },
      wantToEdit: 'Are you sure to modify?',
      selectDataSource: 'Please select a datasource',
      eventLogMappingError: 'Error occurs during event log mapping.', 

      registerHelp: '※ You may use mouse drag or button click for register.',
      registerHelpButton: '※ You may use button to register.',
      
      notMapping: 'To create event log, you are required to do dataset mapping. If you exit without mapping, dataset mapping stage will be aborted and event log will not be created. Are you sure?',
      
      graphValidateSuccess: 'Graph validation is successful.',
      graphValidateFailButSave: 'Graph validation failed.\nDo you still want to save graph?',
      deployedGraphModify: 'Do you want to change currently deployed baseline process?\n(※ The current baseline process will replaced previously deployed baseline process.)',
      graphSaved: 'Baseline process is saved.',
      graphDeployed: 'Baseline process is successfully deployed.',
      graphDeployCancel: 'Baseline process will be withdrawn. Are you sure?',
      graphDeployCanceled: 'Baseline process is successfully withdrawn.',
      deployFailByValidate: 'Due to graph validation failure, the deployment stage cannot be continued.',
      minQualFail: 'Verification of baseline process structural requirement is failed. Please check again.',
      notSaveModifiedGraph: 'Modified baseline process is not saved.',
      noPermission: 'You do not have permission to access this feature.',
      canMoveDragAndButton: 'Move the member of the left to right side using mouse drag or (+) button, or vice versa using (-) button.',
      onlyOneSelect: 'Only one event log can be selected.',
      eventHaveProcess: 'This event log is already mapped with other baseline process. By connecting with the current baseline process, you will remove other baseline process.\nAre you sure?',
      sameNameProcess: 'Duplicate name exists.',
      nameLengthProcess: 'Please enter at least 3 characters.',
      selectWorkspace: 'Workspace other than All is required for data creation. Please select a workspace.',
      limitCount: 'Maximum workspace creation limit reached.\nOnly {count} workspace can be created.',
      // ipr error code
      IPR_ERR_403_01900201: 'IPR-API: Storage limit reached. The creation stage cannot continue.',
      IPR_ERR_409_00000001: 'IPR-API: Duplicate name exists.',

      // error 처리를 하려다 없어 보여 추가함
      SSO_ERR_500_00010001: 'Internal server error.',
      SSO_ERR_400_00010002: 'Input is null or empty.',
      SSO_ERR_400_00010003: 'Invalid input.',
      SSO_ERR_404_00010004: 'Data not found.',
      SSO_ERR_400_00020001: 'Username already exists.',
      SSO_ERR_400_00020002: 'Email address already exists.',
      SSO_ERR_400_00020003: 'Code does not match.',
      SSO_ERR_400_00020004: 'Searched password not found.',
      SSO_ERR_400_00020005: 'Confirmed password does not match.',
      SSO_ERR_400_00020006: 'User does not verify their email address.',
      SSO_ERR_401_00020007: 'Login credential is not found.',
      SSO_ERR_404_00020008: 'User not found.',
      SSO_ERR_500_00020009: 'Failed to generate redirect URL.',
      SSO_ERR_400_00030001: 'Group key already exists',
      SSO_ERR_400_00030002: 'User already registered in this group.',
      SSO_ERR_404_00030003: 'Group not found.',
      SSO_ERR_500_00040001: 'Failed to send email.',
      SSO_ERR_400_00050001: 'Invalid token.',
      SSO_ERR_400_00050002: 'Invalid user credential.',
      SSO_ERR_400_00050003: 'Invalid user credential.',
      SSO_ERR_400_00050004: 'Active flag is false',
      SSO_ERR_400_00050005: 'Authorization server internal error occurred.',
      SSO_ERR_403_00060001: 'Total number of user has reached for this group.',
      SSO_ERR_404_00060002: 'License not found.',
      SSO_ERR_404_00060003: 'Demo license not found.',
      SSO_ERR_404_00070001: 'License activation not found.',
      SSO_ERR_404_00080001: 'Permission not found.',
      SSO_ERR_404_00090001: 'Permission not found.',
      SSO_ERR_403_00100001: 'This account does not have Admin role.',
      SSO_ERR_404_00100002: 'Role not found.',
      SSO_ERR_404_00110001: 'Telemetry not found.',
      SSO_ERR_502_00120001: 'Authorization server internal error occurred.',
      SSO_ERR_502_00130001: 'License management server internal error occurred.',
      SSO_ERR_502_00140001: 'Application server internal error occurred.',
      SSO_ERR_404_00150001: 'Authorization history not found.',
      IPR_OK_200: 'Data is successfully processed.',
      IPR_OK_200_00000001: 'Data is successfully processed but returned no result.',
      IPR_ERR_401_00900001: 'Unauthorized access.',
      IPR_ERR_401_00900002: 'Unauthorized access.',
      IPR_ERR_401_01900101: 'Unauthorized workspace access.',
      IPR_ERR_401_01900102: 'Unauthorized access.',
      IPR_ERR_401_01900103: 'Unauthorized access.',
      SSO_ERR_403_00020010: 'Inactive user account.',
      IPR_ERR_413_00030001: 'Process model object size is too large',
      IPR_OK_200_00010201: 'IPR-API: Error during event log mapping. Please refer to debug message.',
      IPR_ERR_200_00010201: 'Error occurs during event log mapping',
      IPR_ERR_503_00910001: 'Peer-connection error (Ex: External database error).',
      IPR_OK_204_00010101: 'IPR-API: There only 1 column in the dataset.',
      IPR_ERR_204_00010101: 'There is only 1 column in the dataset.',
      IPR_ERR_500: 'Internal server error.',

      HTTP_500: 'Internal Server Error',

      '500 INTERNAL_SERVER_ERROR': 'Internal Server Error',

      unknownError: 'Unknown error occurred',

      deleteAllFilter: 'All selected filter configurations will be deleted. Are you sure?',
      cancelEventFilter: 'Event log filter will be canceled. Are you sure?',
      filterDurationZero: 'Selected timestamp duration is 0 seconds. Please check again the configuration.',
      startIsAfterEnd: 'The selected start timestamp is behind the complete timestamp.',
      startEndFilterNotSelected: 'No activities are selected either on the Start and/or End Activity Filter.',
      attributeFilterNotSelected: 'No attributes are selected at the Attributes Filter.',
      variantFilterNotSelected: 'No variants are selected at the Process Variants Filter.',

      noEventRegistered: 'No registered event log.',

      selectFile: 'Select file.',
      fileSizeCheck: 'The file has more than {count} rows.',
      groupCreateCheck: 'Wrong delimiter assigned or not enough column to analyze.',

      sameNameProject: 'Project name is duplicated.',
      sameNameEventGroup: 'Dataset name is duplicated.',
      sameNameEvent: 'Event log name is duplicated.',

      regexTest: 'Invalid format. Only alphabet, hangeul or numerical characters are allowed.',
      blankTest: 'Input value has only spaces.',
      letterTest: 'Please enter at least 3 characters.',
      emptyTest: 'Input value cannot be empty.',
      firstBlankTest: 'First character cannot be space.',

      noProcess: 'No associated baseline process is registered.', //(배포된 프로세스 없음)
      eventCount: 'Total Event Log',

      cancel: 'Are you sure you want to cancel?',

      selectDataset: 'Please select a dataset.',
      selectProcess: 'Please select a baseline process.',
      selectDatasource: 'Please select a datasource.',

      projectDelete: {
        title: 'Delete Project',
        content: 'This project will be deleted. Are you sure?',
        noSelect: 'No project is selected.'
      },

      projectCreate: {
        msg: 'Only {count} projects can be created.'
      },

      groupDelete: {
        title: 'Delete Dataset',
        content: 'This dataset and its related event logs will be deleted. Are you sure?',
        noSelect: 'No dataset is selected.'
      },

      groupCreate: {
        msg: 'Only {count} datasets can be created.'
      },

      eventDelete: {
        title: 'Delete Event Log',
        content: 'This event log will be deleted. Are you sure?', //'Do you want to delete this event log?',
        noSelect: 'No event log is selected.'
      },

      eventCreate: {
        wholeMsg: 'Only {count} datasets can be created.',
        perGroupMsg: 'Only {count} event logs can be created for each dataset.',
        nameLengthEvent: 'Please enter at least 3 characters.'
      },

      eventModify: {
        title: 'Modify Event Log',
        content: 'This event log properties will be modified. Are you sure?'
      },

      bookmark: {
        remove: {
          title: 'Remove Bookmark',
          content: 'Bookmark is successfully removed.',
          confirm: 'This bookmark will be removed. Are you sure?'
        },
        add: {
          button: 'Bookmark',
          title: 'Add Bookmark',
          content: 'This event log is succesfully bookmarked.'
        }
      },

      notification: {
        remove: {
          title: 'Delete Notification',
          contentRemoveAll: 'All notifications will be deleted. Are you sure?\n On going process will be continued regardless of the deletion.',
          contentRemoveOne: 'This notification will be deleted. Are you sure?\n On going process will be continued regardless of the deletion.'
        }
      },

      standard: {
        list: {
          notHave: 'Registered baseline process does not exist',
        },
        modify: {
          title: 'Modify Baseline Process',
          content: 'Baseline process will be modified. Are you sure?',
          successContent: 'Baseline process is successfully modified.',
        },
        delete: {
          title: 'Delete Baseline Process',
          content: 'Baseline process will be deleted. Are you sure?\n(Default baseline process will be deleted as well, if any.)',
          noSelectedContent: 'Selected baseline process is not exist.'
        }
      },

      datasource: {
        create: {
          title: 'Create Datasource Connection',
          content: 'Datasource connection is successfully created.'
        },
        getInfo: {
          title: 'Datasource Connection Properties'
        },
        delete: {
          title: 'Delete Datasource Connection',
          warningContent: 'All data related to this datasource will be deleted. Are you sure?',
          successContent: 'Datasource connection is successfully deleted.'
        },
        edit: {
          title: 'Modify Datasource Connection',
          warningContent: 'Database connection username and password properties are changed. If the account neither have access to the following database nor table(s) then all related data (including event logs, baseline process) could be disconnected and possible loss of data can be occurred. Are you sure?',
          successContent: 'Datasource connection is successfully modified.'
        },
        index: {
          title: 'Datasource',
          noData: 'No datasource is registered.'
        },
        validation: {
          nameLength: 'Please enter at least 3 characters.',
          onlyNumber: 'Please enter number only.',
          duplicateName: 'Datasource name is duplicated.',
          mustTest: 'The test connection must be successful in order to save the connection properties.',
          syncDayListEmpty: 'Please select at least 1 day.',
          syncStartTimeEmpty: 'Please select synchronization start time.',
          syncPkTableEmpty: 'Please select Primary Key field.',
          validationFailed: 'Validation failed. Please check your input values.',
        }
      },

      search: {
        title: 'Search result',
        content: 'Result not found.'
      },

      noBasicProcessSelected: 'Please select 1 reference model as the default model.',
      notSelected: 'No value is selected.',
      notDateApplied: 'Start or end timestamp is not set.',
      notTimeSelected: 'Time duration is not set.',
      appliedSDatetime: 'Start time is not set.',
      appliedEDatetime: 'End time is not set.',

      notKnow: 'Unknown error.',
      noDataSourceSelected: 'No datasource is selected.',
      noDataConnection: 'No data connection.',

      message: 'message',
      creationComplete:'Dataset is successfully created.\nPlease select one of the options.',
      filterNotWorking: 'Dataset filter yields no result if there is no datasets available.'
    },

    //dotted: optionsC, optionsCA(경림)
    dotted: {
      caseId: 'Case',
      activity: 'Activity',
      originator: 'Originator',
      resource: 'Resource',
    },
    //matrix: optionsX, optionsY, optionsColorBy1, optionsColorBy2, onEventViewChanged, onSelectedXChange(경림)
    matrix: {
      activity: 'Activity',
      activitySection: 'Activity Flow',

      countCases: 'Total Case',
      total: 'Duration - Total',
      min: 'Duration - Min.',
      max: 'Duration - Max.',
      average: 'Duration - Avg.',
      utilization: 'Utilization',

      originator: 'Originator',
      resource: 'Resource',
      durationMonth: 'Monthly',

      en_total: 'Event Cost - Total',
      en_min: 'Event Cost - Min.',
      en_max: 'Event Cost - Max.',
      en_average: 'Event Cost - Avg.',

      cn_total: 'Case Cost - Total',
      cn_min: 'Case Cost - Min.',
      cn_max: 'Case Cost - Max.',
      cn_average: 'Case Cost - Avg.',
    },

    //Notification.vue(경림)
    notification: {
      title: 'Notification',
      callDate: 'Request Date',
      recall: 'Resubmit',
      moveToPage: 'See More',
      lastUpdate: 'Last Update',
      noNoti: 'Notification not found.',
      reset: 'Reset',

      failed: 'Failed',
      complete: 'Completed',
      sampleData: 'Sample Data',
      //[+]setClientInfo -> label 다국어처리 필요 : Notification labels

      //에러 시 표시 모음
      client: 'client',
      clientInfoProblem: 'Error occurred in client state info.',
      clientInfoNone: 'Client state info not available.',

      noNotiMsg: 'There are no notifications.', //2021.12.10 추가했음 (리스카)
    },
    //home > components > BookMark.vue(경림)
    bookmark: {
      title: 'Bookmark',
      noList: 'Bookmark not found.',
    },
    //home > components > EventDetail.vue(경림)
    eventDetail: {
      noSelect: 'No event log is selected.',
      caseNum: 'Total Case',
      eventNum: 'Total Event Log',
      lastUpdate: 'Last Update',
      startDate: 'Start Timestamp',
      endDate: 'End Timestamp',
      workspaceName: 'Workspace Name',
      //데이터셋 이름, 이벤트로그 이름, 이벤트로그 설명 (exist but added)
      originDatasetName: 'Dataset Name',
      eventLogName: 'Event Log Name',
      eventLogDesc: 'Event Log Description',
      relatedRepository: 'Related Repository',
      //분석 버튼
      analysis: 'Analyze',
      //매핑 매칭 목록 (exist but added)
      mappingMatchingList: 'Mapping Schema',
      propertyName: 'Schema',
      columnName: 'Column Name',
      example: 'Sample Data',
      standardProcessList: 'Baseline Process',
      noProcessList: 'No baseline process is registered.',
      basic: 'Default',
      //생성자, 프로세스편집 (exist but added)
      create: 'Creator',
      processEdit: 'Process Editor',
      //닫기 버튼 (exist but added)
      close: 'Close',
    },
    //home > components > EventKpi.vue(경림)
    eventkpi: {
      datasourceAll: 'Total Datasource',
      eventlogAll: 'Total Event Log',
      standardProcessAll: 'Total Baseline Process',
    },
    //home > components > RecentEvent.vue(경림)
    recentEvents: {
      title: 'Recent Event Logs',
      noList: 'Result not available.',
    },
    //home > components > SampleEvents.vue(경림)
    sampleEvents: {
      title: 'Sample Data',
    },
    //components > cards > CardHome.vue(경림)
    cardHome: {
      //표준 프로세스, 생성자 (exist but added)
      standardProcess: 'Baseline Process',
      create: 'Creator',
    },
    //components > cards > CardRepository.vue(경림)
    cardRepository: {
      seeInfo: 'Properties',
      //삭제, 표준 프로세스, 생성자 (exist but added)
      delete: 'Delete',
      standardProcess: 'Baseline Process',
      create: 'Creator',
    },
    //event > list > EventList.vue
    /*
     * 데이터셋: 전체, 파일, 데이터베이스, 등록된 표준 프로세스가 없습니다, 검색 결과가 없습니다.[영균님 파트]
     * 이벤트: 이벤트 생성, 등록된 이벤트가 없습니다, 데이터셋을 선택해주세요 (already exists)
     */
    eventList: {
      noResults: 'Sorry, result not found. Please try again.',
    },
    //event > components > EventInformationModal.vue, EventModifyModal.vue(경림)
    eventLogModal: {
      relatedRepository: 'Related Repository',
      mappingMatchingList: 'Mapping Schema',
      propertyName: 'Schema',
      columnName: 'Column Name',
      example: 'Sample Data',
      standardProcessList: 'Baseline Process',
      // 표준 프로세스, 등록된 표준 프로세스 (already exists)
      basic: 'Default',
      basicSet: 'Set Default',
      //생성자, 닫기 버튼 (exist but added)
      create: 'Creator',
      close: 'Close',
      //마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다. (already exists)
      subEventCreate: 'Create Sub-Event Log',
    },
    //event > create > repository > CreateFlow.vue(경림)
    repoCreateFlow: {
      eventCreateProgress: 'Event Log Creation Steps',
      //하루동안 보이지 않기 (already exists)
    },
    //event > create > repository > CreateForm.vue(경림)
    repoCreateForm: {
      //(placeholder)데이터셋 이름을 입력하세요 (already exists)
      //이벤트로그 (already exists)
      //이벤트로그 이름 (already exists)
      //(placeholder)이벤트로그 이름을 입력하세요 (already exists)
      //3자리 이상 입력해 주세요 (already exists)
      //이벤트로그 설명 (already exists)
      //(placeholder)이벤트로그 설명을 입력하세요 (already exists)
      //마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다. (already exists)
      standardProcessList: 'Baseline Process',
      basicSet: 'Set Default',
      registeredByButton: '※ You may use button to register.',
      //다음 버튼 (already exists)
    },
    //event>create>repository>MappingCheck.vue (exists already)
    /*
      데이터셋 이름
      데이터를 불러오는 중
      유효성 검증중입니다.
      잠시만 기다려주세요
      유효성 검증이 완료 되었습니다.
      완료 버튼을 눌러주세요.
      데이터를 다시 확인해주십시오.
      재매핑 버튼을 눌러 새로운 매핑 작업을 해주세요.
     */
    //event>create>repository>MapingSelect.vue (exits already)
    /*
      다음
      취소
     */
    validate: {
      firstBlankTest: 'First character cannot be space.',
      onlyEnglishNumber: 'Invalid format. Only alphabet, hangeul and numeric characters are allowed.',
      excludingSpecial: 'Invalid format. Keyboard special characters are not allowed.',
      duplicate: 'Duplicated name exists',
      email: 'Please enter a valid email address.',
      password: 'Please enter 8-16 digits password including keyboard special characters.',
      digit: 'Please enter at least {min} digits.',
      maxDigit: 'Input values has exceeded maximum allowed {max} digits',
      onlyNumber: 'Please enter number only.',
      contact: 'Please enter a valid contact information.',
      ip: 'Please input correct IP address.',
      noActivity: 'Invalid activity name.',
      onlyKorEngNum: 'Please enter only alphabet, hangeul and numerical characters.',
      onlyKorEngNumPermiSpacial: `Please enter only alphabet, hangeul, numeric and keyboard special characters excluding ( ' ) & ( " )`,
      keyboardPermitSpecial: `Please enter only keyboard special characters excluding ( ' ) & ( " ).`,
    },
      //notification 메시지 = getNotificationMsg(item: any)
    notificationMsg: {
      datasetImporting: {
        queued: 'Dataset upload for [{datasetName}] is queued',
        running: 'Dataset upload for [{datasetName}] is in progress',
        error: 'Dataset upload for [{datasetName}] is failed',
        completed: 'Dataset upload for [{datasetName}] is succesfully completed'
      },
      dataFilter: {
        queued: 'Dataset filter for [{datasetName}] is queued',
        running: 'Dataset filter for [{datasetName}] is in progress',
        error: 'Dataset filter for [{datasetName}] is failed',
        completed: 'Dataset filter for [{datasetName}] is succesfully completed'
      },
      eventMapping: {
        queued: 'Event log creation for [{eventName}] is queued',
        running: 'Event log creation for [{eventName}] is in progress',
        error: 'Event log creation for [{eventName}] is failed',
        completed: 'Event log creation for [{eventName}] is  succesfully completed'
      },
      eventFilter: {
        queued: 'Event log filter for [{eventName}] is queued',
        running: 'Event log filter for [{eventName}] is in progress',
        error: 'Event log filter for [{eventName}] is failed',
        completed: 'Event log filter for [{eventName}] is succesfully completed'
      },
      dashboard: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed'
      },
      processDiscovery: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed'
      },
      deltaAnalysis: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed'
      },
      logReplay: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed'
      },
      socialAnalysis: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed'
      },
      matrixModel: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed'
      },
      dotted: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed',
      },
      processFlow: {
        queued: 'Analysis for [{eventName}] is queued',
        running: 'Analysis for [{eventName}] is in progress',
        error: 'Analysis for [{eventName}] is failed',
        completed: 'Analysis for [{eventName}] is succesfully completed',
      },
      dataSync: {
        queued: 'Data synchronization for [{datasourceName}]  is queued',
        running: 'Data synchronization for [{datasourceName}]  is in progress',
        error: 'Data synchronization for [{datasourceName}]  is failed',
        completed: 'Data synchronization for [{datasourceName}]  is succesfully completed'
      }
    },
    notificationLabel: {
      xaxis: 'X-axis',
      yaxis: 'Y-axis',
      calculate: 'Calculate',

      provider: 'Provider',

      totalDataset: 'Total Dataset',
      totalEventlog: 'Total Event Log',
      classifier: 'Classifier',
      variant: 'Variant',
      rowCount_origin: 'Row count (origin)',
      datasource: 'Datasource',

      database: 'Database',

      dataset: 'Dataset',
      rowCount_sync: 'Row count (sync.)',
      series: 'Series',
      viewMode: 'View Mode',
      layout: 'Layout',
      perspective: 'Perspective',
      groupItems: 'Group Items',
      status: 'Status',
      startTimestamp: 'Start Timestamp',
      algorithms: 'Algorithms',
      activityKPI: 'Activity',
      activitySignificance: 'Activity Significance',
      arcKPI: 'Transition',
      arcSignificance: 'Arc Significance',
      workspace: 'Workspace',
      eventlog_origin: 'Event Log (origin)',
      dependency: 'Dependency',
      eventlog: 'Event Log',
      sortBy: 'Sort By',
      values: 'Values',
      endTimestamp: 'End Timestmap',
      min_frequency: 'Min. Frequency',
      includes: 'Includes',

      table: 'Table',

      filename: 'Filename',

      host: 'Host',

      datasetOrigin: 'Dataset (origin)',

      selectedTab: 'Tab', //2021.12.10 추가했음 (리스카)
    },
      subRepoCreateFlow: { //2021.12.10 추가했음 (리스카)
      subEventCreateProgress: 'Sub Event Log Creation Steps'
    },
      subRepoCreateForm: { //2021.12.10 추가했음 (리스카)
      eventNameOrigin: 'Origin Event Log Name',
      subEventName: 'Name',
      subEventDesc: 'Description',
      
      standardProcessList: 'Baseline Process',
      basicSet: 'Set Default',
    },
      repositoryFilter: { //2021.12.13 추가했음 (리스카)
      title: 'Filter',
      timeFilter: 'Time Filter',
      startEndFilter: 'Start & End Points Filter',
      attributeFilter: 'Attributes Filter',
      variantFilter: 'Process Variant Filter',

      startEndActivity: 'Start & End Activity',

      selectFilter: 'Select Filter',
      selectField: 'Select Fieldname',

      pleaseSelectFilterMsg: 'Please select filter on the left side bar',

      time: { //2021.12.13 추가했음 (리스카)
        wholeTerm: 'Whole period',
        startDateTime: 'Start Time',
        endDateTime: 'End Time',
        caseIncludingType: 'Case Inclusion',
        caseIncludingTypeText: '(* By default follows case inclusion settings in Configuration page.)',
        startConfiguration: 'Configure Start Time',
        endConfiguration: 'Configure End Time',

        trim: `Trim: include events between start & end timestamp. Not all events in a case might be included due to the trim.`,
        started: 'Start: include cases started at the start timestamp.',
        contained: 'Contains: include cases between start & end timestamp.',
        intersecting: 'Intersects: include cases having duration between start & end timestamp.',
        completed: 'Complete: include cases ended at the complete timestamp.',
      },
      
      startEnd: { //2021.12.13 추가했음 (리스카)
        startPoint: 'Start Point',
        endPoint: 'End Point',
        allActivities: 'Activities',
        selectedStartActivities: 'Selected Start Activity',
        selectedEndActivities: 'Selected End Activity',
      },

      attribute: { //2021.12.13 추가했음 (리스카)
        allAttributes: 'Attributes',
        selectedAttributes: 'Selected Attributes',
        column: 'Fieldname',
        selectedValue: 'Selected Value',
      },

      variant: { //2021.12.13 추가했음 (리스카)
        allVariants: 'Variants',
        variantDetail: 'Variant Detail',
        selectedVariants: 'Selected Variants'
      },

      filtering: { //2021.12.13 추가했음 (리스카)
        subEventName: 'Sub Event Log Name',

        filterCondition: 'Filter',
        filterType: 'Filter Type',
        filteredValue: 'Filtered Value',

        eventFiltingNow: 'Event filtering is in progress.',

        filteringCompleted: 'Sub event log creation is successfully completed.',
        pressCompleteBtn: 'Please click on Complete button.',

        filteringFailed: 'Event filter is failed.',
        pressBeforeBtn: 'Please click on Back if you wish to reconfigure filter condition.',
      },

      filterTable: {
        startEndContent: 'Start point: {startPoints}; End point: {endPoints};',
        attributeContent: 'Fieldname: {field}; Selected value(s): {properties};',
      }
    },
      subDatasetCreateFlow: { //2021.12.10 추가했음 (리스카)
      subDatasetCreateProgress:  'Sub-Dataset Creation',
    },
      subDatasetCreateForm: { //2021.12.10 추가했음 (리스카)
      datasetInfo: 'Origin Dataset',
      datasetNameOrigin: 'Name',
      datasetDescOrigin: 'Description',
      datasetRow: 'Dataset Row Count',
      lastUpdate: 'Last Update',

      subDataset: 'Sub Dataset',
      subDatasetName: 'Name',
      subDatasetDesc: 'Description'
    },
      datasetFilter: { //2021.12.10 추가했음 (리스카)
      filterCondition: 'Filter',
      columnName: 'Column Name',
      filterCount: 'Number of Selected Values',
      filterValue: 'Selected Values',

      datasetFiltingNow: 'Dataset filtering is in progress.',
      wait: 'Please wait for a moment.',
      
      filteringCompleted: 'Data filter is successfully completed.',
      pressCompleteBtn: 'Please click on Complete button.',

      filteringFailed: 'Data filter is failed.',
      pressBeforeBtn: 'Please click on Back if you wish to reconfigure filter condition.',
    },
      flowBoxSubEvent: { //2021.12.10 추가했음 (리스카)
      title: 'Input Properties',
      content: 'Creating event logs from an origin event logs based on a certain filter configuration.',

    },
    flowBoxSubDataset: {
      title: 'Input Properties',
      content: 'Creating datasets from an origin dataset based a certain filter configurations.',
    }
  },
};

export default repoTranslation;
