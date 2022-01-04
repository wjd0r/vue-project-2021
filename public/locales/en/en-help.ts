const helpTranslation = {
    siteMap: 'Sitemap',
    header: {
        help: 'Help'
    },
    sidebar: {
        notiwindow: 'Notification',
        readyExecute: 'In queue',
        executing: 'In progress',
        complete: 'Completed',
        fail: 'Failed',
        createData: 'Create dataset',
        originalDataIs: 'What is dataset?',
        createOriginalData: 'Create dataset',
        enterDataInfo: 'Data properties',
        enterInfo: 'Properties',
        uploadFile: 'File upload',
        connectDb:'Database connection',
        selectColumnType: 'Column type configuration',
        uploadData: 'Data upload',
        completeCreateOriginalData : 'Dataset created completed',
        dataFilter : 'Data filter',
        dataMapping: 'Data mapping',
        mappingIs: 'What is dataset mapping?',
        eventIs: 'What is event log?',
        createEvent: 'Create event log',
        enterEventInfo: 'Event log properties',
        standardList: 'Baseline process',
        mappingAttr: 'Mapping schema',
        failMapping: 'Mapping failed',
        successMapping: 'Mapping successful',
        completeEventCreate: 'Event log creation is completed',
        eventFilter: 'Event log filter',
        durationfilter: 'Duration filter',
        caseInclusionCriteria: 'What is case inclusion?',
        startEndActivityFilter: 'Start and end point filter',
        startActivity: 'What is start activity?',
        endActivity: 'What is end activity?',
        attributeFilter: 'Attribute filter',
        variantFilter: 'Variant filter',
        eventConditionPriview: 'Event filter preview',
        standardProcessIs: 'What is baseline process?',
        createStandard: 'Create baseline process',
        applyRealData: 'Associated event log',
        createStandardProcess: 'Create baseline process',
        editFunction :'Process editor',
        editConnectingNode: 'Transition editor',
        editNode: 'Node editor',
        createDataSource: 'Create datasource',
        createConnection: 'Create connection',
        settingDataSync: 'Configure data synchronization',
        manageData: 'Manage data',
        workspace:'Workspace',
        workspaceIs:'What is workspace?',
        home: 'Home',
        dataKpi: 'Statistics',
        bookmark: 'Bookmark',
        recentList: 'Recent event logs',
        eventInfo: 'Event log properties',
        sampleList: 'Sample Data',
        data: 'Data',
        standardProcess: 'Baseline process',
        datasource: 'Datasource',
        inspectProcess: 'Analyze process', ///
        processCommon: 'Process general settings',
        analysisCondition: 'Filter',
        allAttrInfo : 'Filter properties',
        varList: 'Results',
        processGroupIs: 'What is process variant?',
        table: 'Table',
        includedMenu: 'Menu availability',
        caseList: 'Case table',
        detailList: 'Activity table',
        bottleNeckSectionList: 'Bottleneck region table',
        repeatActivityList: 'Reworks activity table',
        dataSummary: 'Overview',
        dataSummaryTab : 'Overview tab',
        kpi: 'KPI',
        chart: 'Chart',
        activityTab: 'Activity tab',
        resourceTab: 'Resource tab',
        originatorTab: 'Originator tab',
        costTab: 'Cost tab',
        personalTab: 'Personalized tab',
        create:'Creation',
        edit:'Editor',
        item: 'Widget',
        removePersonalTab: 'Remove personalized tab',
        processDiscovery: 'Process analysis',
        analysisConditionAttr: 'Filter properties',
        icon: 'Icon',
        simpleOrComplex: 'Simple/Complex',
        processDelta:'Process comparison',
        splitView: 'Split View',
        combineView: 'Integrated',
        analysisList: 'Results',
        mutualSuitability: 'What is cross-fitness?',
        processAnimation: 'Process animation',
        playBar: 'Play bar',
        controlSpeed: 'Animation speed',
        setDate : 'Set time mode',
        resourceRelationAnalysis: 'Resource analysis',
        dataAnalysis: 'Matrix analysis',
        activityAnalysis: 'Event analysis',
        processFlowAnalysis: 'Variant analysis',
        support: 'Support',
        supportDevice:'Supported device',
        supportBrowser: 'Supported browser'
    },
    helpNotification:{
        notiwindow: 'Notification',
        knowNotiWindow: 'Get to know notification',
        notiExplain : `   <p>When analysis request is in progress or takes time, user can move to other menu. In the notication window, user can check the status of request or navigate to the analysis page.</p>
        <p>In general, the requested data and timestamp is available in the notification window. Notification card is designed based on the processing status, such that In Queue, In Progress, Completed or Failed status is differed by color. The detail info of the notification card can be accessed by expanding the notification.</p>`,
        // <p>- During dataset import or event log mapping, eventhough you exit the page, you can still check the progress of your process via notification window.</p>
        // <p>- In the process related menus, selected <a class="link" href="#help-variant-is">process variant</a>and <a class="link" href="#help-process-filter-title">filter condition</a> infos are also available.</p>`,
        readyExecute: 'In queue',
        explainCancel: 'Queue state is indicated using grey line. In this state, the request has entered application job manager queue and waiting to be processed.',
        fileImportingReadyExecute: 'File-Import',
        fileImportingExecuting: 'File-Import',
        fileImportingComplete: 'File-Import',
        fileImportingFail: 'File-Import',
        originalDataName: 'Dataset Name',
        createOriginalData: 'Create Dataset',
        eventLogName:'Event Log Name',
        createEventLog: 'Create Event Log',
        requestTime: 'Request Date : 2021-01-01 12:34:56',
        cancel: 'Cancel',
        executing: 'In Progress',
        notiExecuteState: 'In Progress state is indicated using blue line. Request progression is shown in percentage.',
        complete: 'Completed',
        canConfirmWhenClickCard: 'Completed state is indicated using green line. On click See More button, user will be redirected to associated analysis page.',
        hospitalTreatment: 'Healthcare',
        shortcut: 'See More',
        fail: 'Failed',
        requestAgain: 'Resubmit',
        explainCanRequestAgain: 'Failed state is indicated using red line. Error message will be displayed for failed process. This way, it is possible to request again by clicking Resubmit button.'
    },
    helpCreate: {
        createData: 'Data Creation',
    },
    helpCreateDatabase:{
        createDatasourceForProcessDiscovery: 'Create datasource connection for process analysis',
        createDatasource: 'Create Datasource',
        explainCreateDatasource: ` <p>Datasource can be created in datasource menu or during dataset import. </p>
        <p>The following databases are available for datasource connection, namely Oracle, MSSQL, MySQL, PostgreSQL, MariaDB. Connection Test must be successful in order to save datasource information.</p>
        <p>Periodic data synchronization can be configured in data synchronization menu. </p>
        <p>Registered datasource list is available in <a href="#help-databasesource" class="link">Datasource</a> menu. </p>`,
        createConnection: 'Create Connection',
        settingDataSync: 'Data Synchronization Configuration',
        explainSettingDataSync1: `<p>Data synchronization is available for dataset having datasource as its origin.</p>
        <p>When the data synchronization is enabled, you may configure synchronization rule and schedule.</p>`,
        explainSettingDataSync2: `<p>Synchronization rule is the type of synchronization for your dataset, for example in 'append only' our systems only takes the new records from the datasource origin database.Currently, only 'append only' rule is available for the synchronization rule. </p>
        <p>For synchronization schedule, you may select daily or monthly synchronization period. If you select monthly period, you must select on which day the synchronization will occur. </p>
        <p>When the data synchronization is disabled, only datasource will be created while data synchronization is non-functional.</p>`,
    },
    helpDataFilter: {
        saveRequireDataFromDataset: 'Only saving required data from a dataset',
        datafilter: 'Data Filter',
        explainDataFilter: `<p>In dataset filter, user can create a new <a href="#help-original-dataset-is" class="link">dataset</a> based on the filtered/selected column's values of an origin dataset.</p><p>For categorical datatype, user can select each of the attribute values. </p>`,
        explainDataFilterSelect: 'For numerical value, user can use mathematical operators filter the data. In case of dataset having origin from database, from the moment the filtered dataset is created it will not retrieve periodic data synchronization.',
        dataFilterSelection: `User can navigate to dataset filter by clicking on the upper-right side of the dataset's card at the dataset menu.`,
        dataFilterPreview: 'Filter condition preview',
        explainDataFilterPreview : 'Users are provided with filter conditions when event filtering is in progress.'

        // dataFilterAttr: 'Filter for data attribute',
        // attrName: 'Name',
        // attrMean: 'Description',
        // caseId: 'Case ID*',
        // explainCaseId: '각 케이스를 고유하게 식별할 수 있는 코드입니다. 여러 컬럼을 하나의 케이스 아이디로 선택할 수 있습니다. ',
        // activity: 'Activity*',
        // processGrade: 'A sequence of jobs, working units or stages in a business process model.',
        // timeStamp : 'Timestamp*',
        // explainTimeStamp: 'Activity occurrence time. Start timestamp and end timestamp can be mapped, however, if the data contains only one timestamp, it is required to map it as the end timestamp. More KPI related to duration can be explored if you map the start and end timestamp, for example the activity, resource and/or originator duration. ',
        // originator:'Originator',
        // explainOriginator: 'Activity executor.',
        // resource: 'Resource',
        // explainResource: 'Resources required to execute an activity, i.e., systems, equipment, etc.',
        // cost: 'Cost',
        // explainCost: 'Cost or expense incurred during activity execution.',
        // caseAttr: 'Case Attribute',
        // explainCaseAttr: 'Attributes related to the case. The value of case attributes are the same throughout the case. For example, in case of healthcare data, the patient name is the same for each patient case.',
        // eventAttr: 'Event Attribute',
        // explainEventAttr: 'Attributes related to the activity. The value of such attribute depends on the activity. For example, the activity Payment Receipt has cost attribute, while Register does not. ',

    },
    helpCreateDataSet: {
        makeDataforProcessMining: 'Dataset creation for process analysis',
        originalDataIs: 'What is dataset?',
        getDatawhenProcessMining: `<p>User need to upload data in order to use our process analysis application.</p>
        <p>Dataset is a data that imported to our process analysis application by ways of creating a database connection or uploading a file into the application.</p>`,
        createOriginalData: 'Dataset creation',
        explainForDBConnect: `<p>User can create a dataset by means of <a class="link" href="#help-file-upload">file upload</a> or <a class="link" href="#help-connect-db">database connection</a> in a <a class="link" href="#help-workspace-data-manage">workspace</a>.</p>
        <p>User can create a new dataset from <a class="link" href="#help-data-filter">filtered dataset</a>.</p>
        <p>User can find the tutorial on the data creation page.</p>
        <p>When user click on Create Dataset stage, user will be redirected to the following page.</p>`,
        enterDataInfo: 'Dataset Properties',
        enterInfo: 'Input properties',
        gradeForEnterInfo: 'Please enter the dataset properties, afterwards, user can select import data type.',
        explainWhenEnterInfo: `<p>Please enter dataset and <a href="#help-repositorycreateform" class="link">event logs</a>' properties including name and description.</p>
        <p>Creating a dataset as well as an event log in a one-stop wizards.</p>`,
        // explainIfCompleteCreate: `  <p>데이터 정보 입력 단계에서 생성을 완료할 시 데이터셋만 생성됩니다. </p>
        // <p>In this stage, user can create a dataset as well as an event log in a one-stop wizards.</p>`,
        uploadFile: 'File upload',
        typeOfFile: 'The following filetype can be uploaded to the application, such as CSV, XLSX, MXML and XES. ',
        attrName: 'Name',
        attrMean: 'Description',
        lineShowTitle: 'Header',
        explainColumn: `User enters the header's column name.`,
        sepChar : 'Delimiter',
        explianSepChar: 'User enters column delimiter value.',
        connectDb:'Database connection',
        explainConnectDb: `<p>User can connect to a database via create a new datasource or select a datasource from a registered list.</p>
        <p>Select 'Create datasource' if user wishes create to connection in this stage, or 'Select datasource' if user wishes to select a datasource from a registered list.</p>`,
        bringDb: 'Select datasource',
        explainBringDb: 'Select a datasource from datasources that already registered in the application.',
        typeDirect: 'Create datasource',
        explainDbConnect: `<p>'User can connect to the following database type: Oracle, MSSQL, MySQL, PostgreSQL, MariaDB. Test connection must be successful in order for a new datasource creation.</p>
        <p>Periodic <a href="#help-setting-data-source-sync" class="link">data synchronization</a> can be configured at the datasource page. Detail datasource properties is available at the datasource page. </p>
        <p>Test : checking whether the connection properties is correctly input or not.</p>`,
        selectComlumType: 'Data type configuration (Optional)',
        explainSelectColumnType: '<p>User can set the data type for each of the column. After configuring the column type, the  data upload stage will proceed.</p>',
        uploadData: 'Data upload',
        explainUploadData: ` <p>After user configures the data type for each column and click on the next page, data will start uploading. This is the last stage for data upload.</p>
        <p>During upload, user can go to other menu by clicking Exit button. This way, user can analyze while waiting for data upload.</p>
        <p>When the upload process is completed, user will get notify via notification menu.</p`,
        completeCreateOriginalData : 'Dataset creation is completed',
        explainCompleteCreateOriginalData: `<p>Dataset creation is successfully completed. </p>
        <p>At this stage, user can exit and go to the dataset page, or user can go to mapping page for event log creation.</p>`,

        // dataMapping: '데이터 매핑',
        // explainDataMapping: `<p>데이터셋 생성 완료 후 다음 버튼을 클릭 시 매핑하여 <a href="#help-repositorycreateform" class="link">이벤트로그</a>까지 생성 완료 할 수 있습니다.</p>`,
        // complete: '완료',
        // explainComplete: ` <p>데이터셋과 이벤트로그 생성이 완료되었습니다.</p>
        // <p>데이터셋 목록으로 이동하거나, 생성된 이벤트로그의 대시보드 혹은 프로세스 분석 메뉴로 이동할 수 있습니다.</p>`

    },
    helpCreateEvent:{
        makeDataForProcessMining: 'Event log creation for process analysis',
        eventIs: 'What is event log?',
        explainEvent: `  <p>Event log is created by transforming <a class="link" href="#help-datasetcreateform">dataset</a> by following a schematic guideline required in process mining.</p>
        <p>Event log is used for process analysis purposes.</p>`,
        createEvent: 'Create event log',
        explainCreateEvent: `<p>User are provided three methods to create an event log.</p>`,
        explainCtreateEventFirst: 'First, following the wizards, user can create both the dataset and follow through until the <a href="#help-repositorymappingselect" class="link">mapping</a> stage and, eventually, creating an event log.',
        explainCtreateEventSecond: 'Second, from dataset page, user can create an event log.',
        explainCtreateEventThird: `Third, using <a class="link" href="#help-event-filter">event log filter</a>, user can create a new event log from another event log based on process-based filtering criteria.
        <p>Process analysis can be conducted once an event log is created.</p>`,
        explainCtreateEventThird02: 'User can find the tutorial on the event log creation page.',
        enterEventInfo: 'Event log properties',
        explainEnterEventInfo: 'Please enter event log properties.',
        standardList: 'Pair with a baseline process',
        explainStandardList: `<p>User can complete this stage only if user have created a <a class="link" href="#help-standardcreateform">baseline process</a>. Event log can be paired with one or more baseline processes.</p>
        <p>In case of multiple baseline processes are available, user must set one process as the default baseline process.</p>
        <p>- For web version, we recommend at least 1920 width resolution. In this version, user can pair a baseline process by mouse drag operation or clicking (+,-) button.</p>
        <p>- For mobile and table version, user can pair a baseline process by clicking (+,-) button.</p>`,
        completeEventCreate: 'Event log creation is completed',
        explainCompleteEventCreate: `<p>When event log creation is successfully completed, user can navigate to the next stage.</p>
        <p>At this stage, user can exit and go to the dataset page, or user can go to dashboard or process analysis page.</p>`
    },
    helpEventFilter:{
        ctreatEventFiltering: 'Various event log filter functionality',
        eventFilter: 'Event log filter',
        explainEventFilter : 'A new event log can be created from another event log by applying some filtering criteria.',
        eventFilterSelection : `User can navigate to event log filter by clicking on the upper-right side of the event log's card at the dataset menu.`,
        durationFilter: 'Duration filter',
        explainDurationFilter: `Filter based on event log duration. The default case inclusion type is follows the application configuration. If user wish to use other case inclusion type, user can change at the configuration page.`,
        caseInclusionInfo : 'What is case inclusion criteria?',
        explainCaseInclusionInfo : `<p>Case inclusion criteria is a constraint used to determine whether a certain cases can be included in the analysis.</p>
        <p>Cases can be included or excluded based on the selected case inclusion type.</p>
        <p>Case inclusion is closely related to duration filter.</p>`,
        startEndActivityFilter: 'Start and end activity filter',
        explainStartEndActivityFilter: `<p>Filter the start and end activities for the process.</p>
        <p>Only cases having the selected start and end activities will be remaining after filter condition is applied. Start and end activities, each can have multiple values.</p>`,
        startActivity: 'What is start activity?',
        explainStartActivity: `Process' first activity`,
        entActivity: 'What is end activity?',
        explainEndActivity: `Process' last activity`,
        attributeFilter: 'Attribute filter',
        explainAttributeFilter: 'Filter the attribute values included in the event logs.',
        variantFilter: 'Process variant filter',
        explainVariantFilter: 'Filter the process variants included in the event logs.',
        eventFilterPreview : 'Filter condition preview',
        explainEeventFilterPreview : 'Users are provided with filter conditions when event filtering is in progress.'
    },
    helpCreateStandard:{
        makeStandardForProcessMining: 'Baseline process creation for process analysis',
        standardProcessIs: 'What is baseline process?',
        explainStandardProcessIs:  `<p>User can create a baseline process by drawing it at the process editor page.</p>
        <p>Later on, the created baseline process can be paired with an <a class="link" href="#help-repositorycreateform">event log</a> thus enabling process comparison between both data.</p>`,
        createStandard: 'Create baseline process',
        explainCreateStandard: 'Baseline process menu can be entered from baseline process page or process analyis page.',
        applyRealData: 'Pairing a baseline process with an event log',
        explainApplyRealData: `<p>Registered baseline process can be paired with an event log.</p>
        <p>After pairing a baseline process and an event log, process comparison can be conducted to compare the real execution of process in the event log with a baseline process. Thus, ensuring more interesting insights can be discovered from user data.</p>
        <p>One event log can be paired with multiple baseline process.</p>`,
        RepresentativeStandard: `Set default configuration in baseline process`,    // explainRepresentativeStandard: `<p>For event logs paired with multiple baseline model, a default process must be set.</p>    // <p>The default baseline process will be the used as base comparison in the analysis menus.</p>`,
        createStandardProcess: 'Baseline Process Editing',
        editStandardProcessDirect: 'Directly create baseline process by drawing it in the editor page.',
        editFunction :'Editing Tool',
        function :'Tool',
        explainFunction: 'Description',
        cancelExecute: 'Undo',
        explainCancelExecute: 'User can cancel or reverse one step graph editing function.',
        reexecute: 'Redo',
        explainReexecute: 'User can restore editing action that were previously undone using undo.',
        init: 'Reset',
        explainInit: 'User can restore the baseline process into its basic structure.',
        exportSvg: 'Export to SVG',
        explainExportSvg: 'User can export the baseline process as SVG format.',
        exportPng: 'Export to PNG',
        explainExportPng: 'User can export the baseline process as PNG format.',
        wholeScreen: 'Show fullscreen',
        explainWholeScreen: `Show graph as fullscreen. <br/>This function is similar to F11 shortkeys.`,
        bringFirst: 'Bring to front',
        explainBringFirst: 'Bring the selected object forward as foreground.',
        sendBack : 'Send to back',
        explainSendBack: 'Bring the selected object backward as background.',
        sortGraph: 'Set auto-layout',
        explainSortGraph: 'Reorder the graph for simplified visualization.',
        seeInOne: 'Zoom to fit',
        explainSeeInOne: 'Reorder the graph visualization such that it fits into one page.',
        validCheck: 'Validate graph',
        explainValidCheck: 'Validate the structural integrity of a baseline process.',
        save: 'Save',
        explainSave: 'While this action will save the graph structure, this baseline process is yet associated with its paired event logs. To do so, user must use deploy function.',
        deploy: 'Deploy',
        explainDeploy: `Once user click on Deploy button, the graph will be saved, if graph's structural integrity is successfully verified, then its paired event logs will be associated with the baseline process. Deployed baseline process thus used in charts and process comparison to compare it with the event logs.<br/>
        To remove the baseline process, user can click the Withdrawn. Once the baseline process is withdrawn, that baseline process will not appear in the charts and process comparison.`,
        exit: 'Exit',
        explainExit: 'Upon exit the process editor, user will be redirected to baseline process page.',
        editConnectingNode: 'Modify options for transitions',
        editName: 'Option',
        explainEditName: 'Description',
        startActivityName: 'Start activity name',
        explainStartActivityName: `The transition's source activity.`,
        endActivityName: 'End activity name',
        explainEndActivityName: `The transition's target activity.`,
        standardTime: 'Baseline duration',
        explainStandardTime: `Transition's baseline duration.`,
        timeUnit: 'Time unit',
        explainTimeUnit: 'Time unit of the baseline duration.',
        editNode: 'Modify options for transitions',
        activityName: 'Activity name',
        explainActivityName: 'Configure the activity name and its type.',
        isRequired: 'Activity type',
        explainIsRequired: 'Configure whether the activity is a required or an optional activity.',
        explainStandardTimeOfActivity: 'Activity baseline duration.',
    },
    helpDataMapping:{
        dataMapping : 'Dataset Mapping',
        explainDataMapping: `<p>Create the event log by dataset mapping. The perspective and result of analysis can be changed depending on how to connect the mapping properties and fileds.</p>
        <p>The resulting event log of a dataset mapping can be used for process analysis.</p>`,
        mappingIs: 'What is dataset mapping?',
        explainMappingIs: `<p>In order to conduct a process analysis, 
        it is required to transform a dataset into an event logs following a process mining mapping schema guidelines.</p>
        <p>In this schema, user pairs the dataset's column(s) with a predefined schema.</p>
        <p>Based on this pairings, the process analysis perspective is different, hence, the result of the analysis will also be different.</p>`,
        attrName: 'Mapping schema',
        attrMean: 'Description',
        caseId: 'Case ID*',
        explainCaseId: 'A pivot key by means of analysis perspective of the data. For example, in the container handling process, the possible case ID would be container IDs, while in the healthcare process, the possible case ID would be patient IDs, doctor IDs or nurse IDs depending on the analysis perspective of the process. Multiple columns in a dataset can be assigned as a Case ID.',
        activity: 'Activity*',
        processGrade: 'A sequence of jobs, working units or stages in a business process model.',
        timeStamp : 'Timestamp*',
        explainTimeStamp: 'Time when an activity is executed/occurred. In an activity, user can define the start and end timestamp. However, if userr activity only have one timestamp user can assign it to the end timestamp. If both start and end timestamp exist activity duration, resource/originator duration and so on can be calculated, therefore more insights can be gathered from the analysis result.',
        originator:'Originator',
        explainOriginator: 'the activity executor (e.g., person or worker)',
        resource: 'Resource',
        explainResource: 'The resources (e.g., machine, systems, etc.) required to execute and activity.',
        cost: 'Cost',
        explainCost: 'Cost or expense incurred during activity execution.',
        caseAttr: 'Case attribute',
        explainCaseAttr: 'Attributes related to the case. The value of case attributes are the same throughout the case. For example, in case of healthcare data, the patient name is the same for each patient case.',
        eventAttr: 'Event attribute',
        explainEventAttr: 'Attributes related to the activity. The value of such attribute depends on the activity. For example, the activity Payment Receipt has cost attribute, while Register does not.',
        mappingAttr: 'Remark',
        explainMappingAttr: ` <p>Required schemas for dataset mapping are marked with (*) sign.</p> <p>Whereas, the unmarked schemas are optional.</p><p>However, we recommend to map as many schema as possible to ensure a thorough process analysis.</p>`,
        failMapping: 'Failed mapping',
        explainFailMapping: `<p>The following page is shown when dataset mapping stage is failed.</p>
        <p>If user wish to reconfigure the mapping schema, user can navigate to the mapping stage by clicking Remapping button.</p>`,
        successMapping: 'Successful mapping',
        explainSuccessMapping: `<p>The following page is shown when dataset mapping stages is successful.</p>
        <p>The dataset mapping is completed once the Complete button is clicked.</p>`
    },
    helpDataManage: {
        dataManageForProcessInspect: 'Managing workspaces',
        workspace: 'Workspace',
        workspaceIs: 'What is a workspace?',
        explainWorkSpace1: `<p>A space where data is classified based on group, project or team.</p>
        <p>One user can have multiple workspaces wherein data belong to each workspace are classified accordingly. 
        This to ensure clean organization of data.</p>`,
        explainWorkSpace2: ` <p>Search function is available to locate user data in a workspace. All workspace option can be selected if user wish to locate user data across workspaces.</p>
        <p>In application configuration, user can set the default workspace.</p>`

    },
    helpHome: {
        checkPrimeData: 'One-stop data summary',
        home: 'Home',
        explainHome: `<p>This page provides data summary including  data statistics, bookmark and recent files.</p>
        <p>A selected <a class="link" href="#help-repositorycreateform">event log</a>'s properties are available on the opposite section and, from there, user can navigate to process analysis page or process editor.</p>
        <p>For the new user that yet upload any data, we provide sample data for process analysis.</p>`,
        dataKpi: 'Data KPI',
        explainDataKpi: `Data summary overview for total datasource, event log, baseline process exist in user's workspace`,
        bookMark: 'Bookmark',
        explainBookMark: `<p>Bookmarked event logs are shown in the bookmark section of the page.</p>
        <p>When user clicks an event log, the properties will be appeared on the opposite side of the page.</p>`,
        recentList: 'Recent files',
        explainRecentList: `<p>Event logs that have been accessed for the last 4 hours are available in the recent files.</p>
        <p>When user clicks an event log, the properties will be appeared on the opposite side of the page.</p>`,
        eventInfo: 'Event log properties',
        explainEventInfo : `<p>When user clicks an event log shown in bookmark or recent files section, the properties will be appeared on the opposite side of the page.</p>
        <p>In the properties, the information such as last synchronization date, statistical KPIs, mapping schema list, paired baseline process model and so on are available.</p>
        <p>Here, user can navigate to process analysis page or process editor.</p>`,
        sampleList: 'Sample data',
        explainSampleList: ` <p>Sample data section containing several event logs from various domain.</p>
        <p>These event logs are available for user that are yet to upload their data.</p>        <p>User can use the sample event log for process analysis.</p>`,
    },
    helpData: {
        checkAllData: `Let's check on concept of data`,
        data: 'Data',
        dataExplain: `<p>Related <a href="#help-datasetcreateform" class="link">dataset</a> and <a href="#help-repositorycreateform" class="link">event logs</a> information are available in user's <a href="#help-workspace-data-manage" class="link">workspace</a>.</p>
        <p>In this page, user can also create or modify dataset and event logs.</p>
        <p>If several workspaces are exist, by  selecting a workspace, user can see each data that belongs to the workspace.</p>
        <p>Based on user's role and permissions, user can read the properties, edit or delete.</p>
        <p>The dataset properties is available at <a href="#help-activity-kpi" class="link">datasource</a> page for datasets having origin from <a href="#help-connect-db" class="link">database</a> connection.</p>        <p>- Access from mobile device is limited for viewing properties and analysis only, therefore, data creation and modifying properties functionality are not available.</p>`,
    },
    helpStandard: {
        checkAllDataInStandardProcess: `Let's check on baseline process`,
        standardProcess: 'Baseline process',
        explainStandardProcess: `  <p>Related baseline process information are available in user's <a href="#help-workspace-data-manage" class="link">workspace.</a></p>
        <p>In this page, user can also create  and modify baseline process properties.</p>
        <p>If several workspaces are exist, by  selecting a workspace, user can see each data that belongs to the workspace.</p>
        <p>Based on user's role and permissions, user can read the properties, edit or delete.</p>
        <p>On modify properties, user can remove or add new baseline process as needed.</p>        <p>- Access from mobile device is limited for viewing properties only, therefore, data creation and modifying properties functionality are not available.</p>`,
    },

    helpProcessAnalysis:{
        inspectProcess: 'Analyzing process'
    },
    helpCommon: {
        processCommon: "Common configuration for process",
    },
    helpFilter: {
        analysisCondition: 'Filter',
        explainAnalysisCondition: `<p>Filter section is used to visualize the analysis result on an <a class="link" href="#help-repositorycreateform">event log</a> based on the selected filter options.</p>
        <p>The filter section are available throughout the analysis menus. It located on the top left position of the analysis page. User can click on the filter icon, configure the filter options and then analyze based on the selected filter options.</p>
        <p>However, the filter options available on the filter section differs depending on user selected analysis menu.</p>`,
        additionalExplainAnalysisCondition: 'Process analysis',
        allAttrInfo : 'Filter option properties',
        explainAllAttrInfo : 'Options available in the filter menu. These options will influence the result of your process and adata analysis.',
        attrName: 'Attributes',
        attrMean: 'Description',
        attrValue: 'Attribute Values',
        analysisMenu: 'Analysis menu',
        period: 'Duration',
        dataPeriod: 'Event log data duration',
        explainDataPeriod: 'The event logs data and process analysis based on the selected duration',
        allMenu: 'All menu',
        analysisItem: 'Group items',
        caseSpentTime: 'Case duration',
        activitySpentTime: 'Duration between activities',
        analysisMonthly: 'Monthly variant',
        analysisMonthlyFlow: 'Groups process monthly',
        analysisFlow: 'Trace variant',
        wholeFlow: 'Overall process',
        menuExceptDashboard: 'Available throughout all menus except dashboard.',
        algorithm: 'Algorithm',
        algorithmApplyToData: 'Algorithms used to discover process model',
        explainHeuristicsMiner: 'Heuristics Miner: a straightforward process model visualization by setting up minimum threshold for its frequency and dependency.',
        explainFuzzyMiner: 'Fuzzy Miner : simplifying a complex process model visualization by way of clustering its activities and transitions.',
        processAnalysis: 'Process analysis',
        activity: 'Activity ',
        explainActivity: 'Activity related KPIs',
        spentTime: 'Duration : total, average, minimum, maximum and median duration',
        occurCount: 'Freqency : Number of occurrence',
        iterCount: 'Rework : Repeated number of occurrence',
        processAnalysisAnimation:'Process analysis, comparison and animation',
        connectLine : 'Transition',
        explainConnectLine : 'Transition related KPIs',
        bottleNeckCount: 'Bottleneck : transition based bottleneck occurrence',
        dependency: 'Dependency : transition based occurrence dependency',
        processAnalysisThreeItem: 'Process analysis, comparison and animation',
        xAxis: 'X-axis',
        yAxis: 'Y-axis',
        explainAxis: `Chart's x-axis and y-axis`,
        mappingProperties: 'Mapping schema',
        dataAnalysis: 'Matrix Analysis',
        activityAnalysis: 'Event Analysis',
        typeOfValue: 'Calculate',
        typeOfValueOfAxis: 'Cell value calculation type for selected x-/y-axis value',
        caseAndCaseCount: 'Case count : total case number',
        spentTimeAndTime: 'Duration : period of processing time',
        useRate: 'Utilization : dimension usage over time'
    },

    helpVariant: {
        varList: 'Results',
        explainVarList: `<p>The results section shows the current <a class="link" href="#help-repositorycreateform">event logs<a/>' process variant result.</p>
        <p>By default, All is selected, however, user can select one of the variants from the list and analyze it.</p>
        <p>The result section is available throughout the analysis menus.</p>
        <p>It located on the top left position of the analysis page.</p>        <p>User can click on the result icon and select one of the variants.</p>        <p>On the process comparison page, user can select at most two variants to compare both variants.</p>`,
        processGroupIs: 'What is process variant?',
        explainProcessGroupIs: 'Classification of cases based on its execution sequence.'
    },

    helpTable: {
        table: 'Table',
        explainTable: `<p>Data table containing cases based on the selected filter options.</p>
        <p>Except dashboard and process comparison menus, data table is available throughout the analysis menus.</p>
        <p>However, the information presented on the data table differs based on the selected analysis scenario.</p>
        <p>Data download functionality is available on the data table, but inavailable for activity table.</p>        <p>During dataset <a class="link" href="#help-repositorymappingselect">mapping</a>, if user maps the optional attributes, those attributes will present on data table.</p>`,
        includedMenu: 'Available in the following menus',
        analysisMenuName: 'Analysis menu',
        caseList: 'Case Table',
        bottleNeckSectionList: 'Bottleneck Table',
        repeatActivityList: 'Rework Table',
        dataSummary: 'Dashboard',
        x: 'X',
        processAnalysis:'Process analysis',
        o: 'O',
        processDelta:'Process comparison',
        processAnimation: 'Process animation',
        resourceRelationAnalysis: 'Resource analysis',
        activityAnalysis: 'Matrix analysis',
        dataManage: 'Data management',
        ganttChart: 'Variant analysis',
        explainCaseList: `<p>Case table contains detail info on the cases and its attributes, for example: case ID, number of events, case processing time, and other case related attributes.</p>
        <p>On process graph, if user selected an activity or an arc, the cases contain on that selected objects will be shown in the case table.</p>
        <p>The information presented on the data table differs based on the selected analysis scenario.</p>        <p>If user clicks on a row of the case table, a detail activity table will be shown.</p>`,
        detailList: 'Activity Table',
        explainDetailList: `<p>Activity table contains detail info of events and its attributes from a selected case, for example: activity name, activity start and end timestamp, activity processing time and other event related attributes.</p>
        <p>Activity table only shows if user selects a case (row) in the case table.</p>`,
        explainBottleNeckSectionList: `<p>Bottleneck table contains bottleneck transitions and its properties, such as avg. processing time, bottleneck threshold, number of cases, and so on.</p>        <p>The table can be used as the summary of all bottlenecks possibly occur in the event logs.</p>        <p>Bottleneck table only shows if user selects bottleneck as activity or arc's KPI on the filter section.</p>`,
        expalinRepeatActivityList: `<p>Rework table contains the rework cases and its properties, such as rework activities, number of repetitions, avg. processing time and so on.</p>        <p>Currently IPR analyzes 1 loop, it means activity occurs repeatedly to itself. Example: in AAAAB case, activity A is 1 loop reworks occur 3 times.</p>        <p>Rework table only shows if user selects rework as activity or arc's KPI on the filter section.</p>`,

    },
    helpDashboard:{
        dataSummary: 'Dashboard',
        explainDataSummary: `<p>Statistical data analysis visualization in the form of charts and KPIs. The dashboard's tab structure is classified based on the process' components.</p>
        <p>Such that a more focus and integrated information can be presented based on each of the process' component.</p>
        <p>By default, the overview and activity tab are always visible. However, the remaining tabs' visibility depends on the dataset mapping schema.</p>
        <p>In addition, a personalized tab is also available for user to configure based on his analysis requirements.</p>`
    },
    helpTabOverview: {
        dataSummaryTab : 'Overview Tab',
        dataflow: 'Overall data summary of an event log',
        kpi: 'KPI',
        kpiName: 'KPI',
        kpiExplain: 'Description',
        caseCount: 'Total Case',
        explainCaseCount : 'Total case occurrence.',
        eventCount : 'Total Event',
        explainEventCount: 'Total event occurrence.',
        startTime: 'Start Timestamp',
        explainStartTime: `The earliest event log's timestamp`,
        endTime: 'End Timestamp',
        explainEndTime: `The latest event log's timestamp`,
        successRate: 'Completion rate (this month)',
        explainSuccessRate: `Calculating the completion rate of cases. This KPI only available if the event logs is associated with a baseline process.`,
        caseTableSuccessRate: 'In this case table, besides the default case table information, user can also check the completion property of the cases.',
        chart: 'Chart',
        chartName: 'Chart Name',
        explainChart: 'Description',
        caseTable: 'Case Table',
        associatedMenu: 'Associated Menu',
        noText: '-',
        caseSpentTime: 'Case group per range duration',
        explainCaseSpentTime: `Based on specified range duration, user can see the distribution of the cases. <br/>
        When user clicks on the configuration icon, user can configure the chart properties including the number of series, each series' range duration and the time unit. <br/>
        By default, the data is divided into an equal 25% duration range (Q1~Q4 of the data). <br/>`,
        caseTableCaseSpentTime: 'Case table will be generated based on the selected bar on the chart. In order to do that, the user must click on the bar and then click on the case table icon to show the cases contains in that selected bar.',
        averageSpendChart: 'Top variants avg. duration',
        explainAverageSpendChart: 'The chart shows the information of top 10 <a class="link" href="#help-variant-is">process variants</a> having the longest average process time.',
        caseTableAverageSpendChart: 'Case table will be generated based on the selected bar on the chart. In order to do that, the user must click on the bar and then click on the case table icon to show the cases contains in that selected bar.',
        associatedMenuAverageSpendChart: `Variant analysis menu: on click icon, user will be redirected to variant analysis menu. 
        Process analysis menu: on click icon,  user will be redirected to process analysis menu. By default, the selected variant for the process analysis will be the bar selected by user.`,
        spentTimeTop10: 'Top 10 Case Duration',
        explainSpentTimeTop10 : `<p>The chart shows the top 10 cases having the longest duration and its activity duration.</p><br/>
        <p>On click on the case (row), the associated activity duration will be displayed as chart on the opposite of the table.</p>`,
        caseTableSpentTimeTop10: 'Case table will be generated based on the data shown in the top 10 case duration table.',
        associatedMenuSpentTimeTop10: 'Process analysis menu: on click icon, user will be redirected to the process analysis menu. Firstly, user must click on the case (row) and then click on the icon. By default, the process analysis will show process model of the selected case.',
        bottleNeckState: 'Bottleneck Region Analysis',
        explainBottleNeckState: `Boxplot chart visualization for each transition's statistical duration.<br/>
        If baseline process available, only transitions exist in it will be shown. <br/>
        Otherwise, among transitions available in the event logs, only 25 will be shown in the chart. `,
        monthlyCaseCount: 'Case Over Time',
        checkCaseCountForMonth: 'In the case over time chart, user can select the visualization granularity by selecting either monthly, daily or hourly options.'
    },
    helpTabActivity: {
        activityTab: 'Activity tab',
        explainActivityTab: 'Activity tab contains activity related statistical performance indicators. ',
        kpi: 'KPI',
        kpiName: 'KPI',
        kpiExplain: 'Description',
        activityCount: 'Total Activity',
        explainActivityCount: 'Total activity occurrence.',
        minActivityCount: 'Min. Activity per Case.',
        explainMinActivityCount: 'The smallest number of activities occurred in a case.',
        meanActivityCountByCase: 'Avg. Activity per Case',
        explainMeanActivityCountByCase: 'The average number of activities occurred per case.',
        maxActivityCount: 'Max. Activity per Case.',
        explainMaxActivityCount: 'The biggest number of activities occurred in a case.',
        chart: 'Chart',
        chartName: 'Chart Name',
        explainChart: 'Description',
        caseTable: 'Case Table',
        associatedMenu: 'Associated menu',
        noText: '-',
        occurCount : 'Total Events per Activity',
        explainOccurCount : 'This chart shows the total number of events occured per activity.',
        spentTimeByActivity: 'Avg. Duration per Activity',
        explainSpentTimeByActivity: `<p>This chart shows the information of average duration per activity.</p>
        <p>If there is an associated baseline process paired with the data, the baseline activity duration will be shown in the chart.</p>
        <p>* The chart only shows if user mapped two timestamps during dataset mapping.</p>`,
        activityFlow: 'Event Over Time',
        explainActivityFlow: `In the event over time chart, user can select the visualization granularity by selecting either monthly, daily or hourly options.<br/> User can show or hide series by clicking on the chart's series item.`,
        startActivityRatio: 'Start Activity Compliance',
        explainStartActivityRatio: `The chart shows process' first activities proportion.<br/>
        If user configures the baseline process model, using this chart user can compare the start activity compliance between the baseline process and the event logs.`,
        endActivityRatio: 'End Activity Compliance',
        explainEndActivityRatio: `The chart shows process' last activities proportion.<br/>
        If user configures the baseline process model, using this chart user can compare the end activity compliance between the baseline process and the event logs.`
    },
    helpTabResource: {
        resourceTab: 'Resource Tab',
        explainResourceTab: `<p>The resource tab will only visible if resource schema is mapped during <a class="link" href="#help-repositorymappingselect">dataset mapping</a>. Resource tab contains resource related statistical performance indicators. </p>`,
        kpi: 'KPI',
        kpiName: 'KPI',
        kpiExplain: 'Description',
        allResourceCount: 'Total Resource',
        explainAllResourceCount: 'Total resource occurrence.',
        resourceCountByCase: 'Min. Resource per Case',
        explainResourceCountByCase: 'The smallest number of resources occurred in a case.',
        meanResourceCountByCase: 'Avg. Resource per Case',
        explainMeanResourceCountByCase: 'The average number of resources occurred per case.',
        maxResourceCountByCase: 'Max. Resource per Case',
        explainMaxResourceCountByCase: 'The biggest number of resources occurred in a case.',
        chart: 'Chart',
        chartName: 'Chart Name',
        explainChart: 'Description',
        caseTable: 'Case Table',
        associatedMenu: 'Associated Menu',
        noText: '-',
        resourceByActivity: 'Resource per Activity',
        explainResourceByActivity: 'This chart shows the number of resources occured per activity.',
        associatedMenuResourceByActivity: 'Matrix analysis menu: on click icon, user will be redirected to the matrix analysis menu.',
        ratioSpendTimeOnResourceCount: 'Count vs. Avg. Duration per Resource',
        explainRatioSpendTimeOnResourceCount: `The chart consist of x-axis, y-axis and series item wherein the X-axis shows the resource's average duration, the Y-axis shows the frequency, and the series item shows the resource.<br/>
        By dividing the chart region into four quadrants, user can differentiate resources having different combination of duration and frequency.<br/>
        By default, the threshold for the quadrant is median value of the data (Q2 or 50%).`,
        caseTableRatioSpendTimeOnResourceCount: 'In this case table, user can see the resource information.',
        occurCountByResource: 'Total Event per Resource',
        explainOccurCountByResource: 'The chart shows a number of events per resource. The resources are sorted in descending order.',
        meanSpentTimeOnResource: 'Mean Duration per Resource',
        explainMeanSpentTimeOnResource: `<p>This chart shows mean duration per resource.</p>
        <p>* The chart only shows if user mapped two timestamps during dataset mapping.</p>`,
    },
    helpTabOriginator:{
        originatorTab: 'Originator Tab',
        explainOriginatorTab: `<p>The originator tab will only visible if originator schema is mapped during <a class="link" href="#help-repositorymappingselect">dataset mapping</a>. Originator tab contains originator related statistical performance indicators. </p>`,
        kpi: 'KPI',
        kpiName: 'KPI',
        kpiExplain: 'Description',
        originatorCount: 'Total Originator',
        explainOriginatorCount: 'Total originator occurrence.',
        minOriginatorCountByCase: 'Min. Originator per Case',
        explainMinOriginatorCountByCase: 'The smallest number of originators occurred in a case.',
        meanOriginatorCountByCase: 'Avg. Originator per Case',
        explainMeanOriginatorCountByCase: 'The average number of originators occurred per case.',
        maxOriginatorCountByCase: 'Max. Originator per Case',
        explainMaxOriginatorCountByCase: 'The biggest number of originators occurred in a case.',
        chart: 'Chart',
        chartName: 'Chart Name',
        explainChart: 'Description',
        caseTable: 'Case Table',
        associatedMenu: 'Associated Menu',
        noText: '-',
        originatorByActivity:'Originator per Activity',
        explainOriginatorByActivity:'This chart shows the originators occured per activity.',
        associatedMenuOriginatorByActivity: 'Matrix analysis menu: on click icon, user will be redirected to the matrix analysis menu.',
        ratioSpendTimeOnOriginatorCount: 'Count vs. Avg. Duration per Originator',
        expalinRatioSpendTimeOnOriginatorCount: `The chart consist of x-axis, y-axis and series item wherein the X-axis shows the originator's average duration, the Y-axis shows the frequency, and the series item shows the resource.<br/>
        By dividing the chart region into four quadrants, user can differentiate originators having different combination of duration and frequency.<br/>
        By default, the threshold for the quadrant is median value of the data (Q2 or 50%).`,
        caseTableRatioSpendTimeOnOriginatorCount: 'In this case table, user can see the originator information.',
        occurCountByOriginator: 'Total Events per Originator',
        explainOccurCountByOriginator: 'The chart shows a number of events per originator. The originators are sorted in descending order.',
        meanSpentTimeOnOriginator: 'Mean Duration per Originator',
        explainMeanSpentTimeOnOriginator: `<p>This chart shows mean duration per originator.</p>
        <p>* The chart only shows if user mapped two timestamps during dataset mapping.</p>`
    },
    helpTabCost: {
        costTab: 'Cost Tab',
        explainCostTab : `<p>The cost tab will only visible if cost schema is mapped during <a class="link" href="#help-repositorymappingselect">dataset mapping</a>. Cost tab contains cost or expense related statistical performance indicators. </p>`,
        kpi: 'KPI',
        kpiName: 'KPI',
        kpiExplain: 'Description',
        allCost: 'Total cost',
        explainAllCost: 'Total cost or expense incurred in an event log.',
        caseMinCost: 'Min. Cost per Case',
        explainCaseMinCost: 'The smallest total cost or expense incurred in a case.',
        caseMeanCost: 'Avg. Cost per Case',
        explainCaseMeanCost: 'The average cost or expense incurred per case.',
        caseMaxCost: 'Max. Cost per Case',
        explainCaseMaxCost: 'The highest total cost or expense incurred in a case.',
        chart: 'Chart',
        chartName: 'Chart Name',
        explainChart: 'Description',
        caseTable: 'Case Table',
        associatedMenu: 'Associated Menu',
        noText: '-',
        costOccurTop10Chart: 'Top 10 Case Total Cost',
        explainCostOccurTop10Chart: `The chart shows the top 10 cases having the highest cost and its activity individual cost.<br/>
        On click on the case (row), the associated activity cost will be displayed as chart on the opposite of the table.`,
        caseTableCostOccurTop10Chart: 'Case table will be generated based on the data shown in the top 10 cases.',
        associatedMenuCostOccurTop10Chart: 'Matrix analysis menu: on click icon, user will be redirected to the matrix analysis menu. Firstly, user must click on the case (row) and then click on the icon in order to be redirected to the matrix analysis menu. ',
        occurRatioByActivity: 'Cost per Activity',
        explainOccurRatioByActivity: 'The chart shows the information of the proportion of cost incurred in each of the activities.',
        meanCostPerResource: `Top 10 Avg. Cost per Resource`,
        explainmeanCostPerResource : `The chart shows the top 10 resources having the highest average cost.`,
        // caseTableCostPerResource: 'Case table will be generated based on the selected bar on the chart. In order to do that, the user must click on the bar and then click on the case table icon to show the cases contains in that selected bar.',
        associatedMenuCostPerResource: `Matrix analysis menu: on click icon, user will be redirected to the matrix analysis menu for further analysis related to resource's cost.`,
        meanCostPerOriginator: `Top 10 Avg. Cost per Originator`,
        explainmeanCostPerOriginator : `The chart shows the top 10 originators having the highest average cost.`,
        // caseTableCostPerOriginator: 'Case table will be generated based on the selected bar on the chart. In order to do that, the user must click on the bar and then click on the case table icon to show the cases contains in that selected bar.',
        associatedMenuCostPerOriginator: `Matrix analysis menu: on click icon, user will be redirected to the matrix analysis menufor further analysis related to originator's cost.`,
    },
    helpTabPersonal: {
        personalTab: 'Personalized Tab',
        explainPersonalTab: `<p>Personalized dashboard, as its named, is used to configure charts and KPIs based on personal preference and analysis requirement.</p>
        <p>Not only the selected items will be shown here, user can also customized the title and series color.</p>`,
        create: 'Create',
        explainCreate: `<p>In the default setting, the personalized dashboard is not automatically created.</p>
        <p>User can create the personalized dashboard by clicking the plus button on the dashboard page and redirect to dashboard editor page.</p>
        <p>On creating the dashboard, user will be given a default layout and, from there, user can start to customize it.</p>`,
        edit: 'Editing',
        explainEdit: `<p>User can navigate to the dashboard editor page by clicking on the editing icon.</p>
        <p>In the dashboard editor page, user can customize the chart and kpi configuration.</p>
        <p>On click widget, user can customized the title and color scheme at the right side sidebar.</p>
        <p>User can also resize the widget during editing.</p>         <p>Once editing is done, user can click on the save button and, finally, the personalized dashboard is created.</p>`,
        editFunction : 'Editing Tools',
        function : 'Tool',
        explainFunction : 'Description',
        init : 'Reset',
        explainInit: 'Reset to basic charts / KPIs layout configuration.',
        empty: 'Clear',
        explainEmpty: 'Clear the selected charts / KPIs layout configuration.',
        size: 'Resize',
        explainSize: 'Resizing chart and KPI widget.',
        save: 'Save',
        explainSave: 'Save current personalized tab configuration',
        removeTab: 'Delete Tab',
        explainRemoveTab: 'Delete personalized tab.',
        exit: 'Exit',
        explainExit: 'Exit the dashboard editor without saving the configuration.',
        item : 'Chart & KPI Items',
        explainItem: 'The following items are only available in the personalized chart.',
        itemName : 'Name',
        itemExplain: 'Description',
        caseTable: 'Case Table',
        associatedMenu: 'Associated Menu',
        noText: '-',
        //caseFlowChart: '케이스 추이 차트',
        //explainCaseFlowChart: '시간 흐름에 따른 케이스 건수의 추이를 확인 할 수 있습니다.',
        eventFlowChart: 'Event over time',
        explainEventFlowChart: 'The chart shows the trends of event in the event logs. User can select whether to show the trends in monthly, daily or hourly unit.',
        exceedCasekPI: 'Case over baseline duration',
        explainExceedCaseKpi: 'This KPI shows the information of the number of cases having duration over the baseline duration and its proportion.',
        caseTableExceedCasekPI: 'In this case table, user can see the cases having duration over the baseline duration.',
        caseAbnormalSpentTimeKpi:'Top 10% quartile case duration',
        explainCaseAbnormalSpentTimeKpi:'This KPI shows the information of the number of cases having the top 10% of the longest case duration and its proportion.',
        caseTableCaseAbnormalSpentTimeKpi: 'In this case table, user can see the cases having top 10% of case duration.',
        removePersonalTab: 'Removing Personal Tab',
        tabRemove: 'Remove Tab',
        explainTabRemove: `<p>On dashboard editor page, user can click on the delete button in order to delete the personalized tab./</p>
        <p>But no worry, user can recreate the personalized tab again.</p>`
    },

    helpDashboardEdit: {
        editDashboard:'Dashboard Editor',
        explainEditDashboard: ` <p>User can navigate to the dashboard editor page by clicking the following button.</p>
        <p>As a starting point, user is provided with a recommended template to work with. And afterwards, user can modify the template or even make it from scratch.</p>
        <p>User can configure each widget's properties on the right sidebar by selecting the widget. Each of widget has different configuration such as chart type and color settings.</p>
        <p>Widget's size and location can be set as per user wishes. Once finished the configuration, user can click on Save button and personalized tab is completed.</p>`
    },

    helpDiscovery: {
        processDiscovery: 'Process Analysis',
        explainProcessDiscovery: `<p>Overall process analysis for an event logs. As well as creating <a class="link" href="#help-standardcreateform">baseline process</a> based on the selected filter options.</p>        <p>By configuring the filter options, user can gather various process analysis insights.</p>
        <p>Including bottleneck and rework analysis in order to discover outlier process.</p>        <p>By default, case table will be generated.</p>
        <p>However, if user selects reworks or bottleneck, a rework table or a bottleneck table will be generated, accordingly.</p>
        <p>Based on the configuration, when user clicks an activity or an arc, a case table, a rework table or a bottleneck table will be generated containing selected item.</p>`,
        analysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        algorithm: 'Algorithm',
        explainAlgorithm: `<p>All of the options are available in the menus</p>
        <p>- Example: Heuristics Miner, Fuzzy Miner </p>`,
        activity: 'Activity',
        explainActivity: 'Frequency, duration (total/min./max./avg./median), rework',
        connectionLine: 'Transition',
        explainConnectionLine: 'Dependency, frequency, duration (total/min./max./avg./median), bottleneck region',
        additionalCondition: 'Include Condition',
        explainAdditionalCondition: `Case ID`,
        conditionValue: 'Condition Value',
        explainConditionValue: 'Case ID values',
        icon: 'Icon',
        iconName: 'Icon',
        iconExplain: 'Description',
        ediStandardProcess: 'Baseline Process Editor',
        explainEdiStandardProcess:`<p>Baseline process can be created in the process editor page.</p>
        <p>On click on the icon, user will be redirected to the process editor page.</p>`,
        seeHorizontalOrVertically: 'Horizontal/Vertical View',
        explainSeeHorizontalOrVertically: 'Change the process graph layout into vertical or horizontal view.',
        graphSort: 'Set auto-layout',
        explainGraphSort: 'Reorder the graph for simplified visualization.',
        seeOrHideMiniMap: 'Show/Hide Minimap',
        explainSeeOrHideMiniMap: 'Show or hide minimap functionality.',
        simpleOrComplex: 'Simple/Complex',
        explainSimpleOrComplex: `<p>Set the abstraction level of the graph visualization.</p>
        <p>On the configuration page, user can customize the threshold for simple and complex visualization</p>`,
    },
    helpDelta:{
        processDelta:'Process Comparison',
        explainProcessDelta: `<p>Comparing two process graphs from the <a class="link" href="#help-variant-is">process variants</a> results.</p>
        <p>The structural similary of both processes are quantify using cross-fitness function.</p>
        <p>This way, different structure in the graph will be highlighted in red.</p>
        <p>If a baseline process is selected as one of the process, the process comparison shows how much current event logs deviate from the baseline process.</p>`,
        analysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        wayToSee: 'View Mode',
        explainWayToSee: `<p>Show two process graphs as one (integrated view), or as separate graphs (split view).</p>
        <p>Integrated view : the selected two processes are visualized as one process.</p>
        <p>Split view : the selected two processes are visualized as separate process in side-by-side view.</p>
        <p>* The differences between two processes are highlighted in red.</p>`,
        splitView: 'Split view',
        explainSplitView: 'Show or hide opposite process graph. The different between two process graphs are highlighted in red.',
        combineView: 'Integrated view',
        analysisList: 'Process variant results',
        explainAnalysisList: 'Show the selected two process variants as one (integrated view), or as separate graphs (split view)',
        mutualSuitability: 'What is cross-fitness?',
        explainMutualSuitability: 'Shows the degree of process fitness between the two selected processes as a percentage.',
        icon: 'Icon',
        iconName: 'Icon',
        iconExplain: 'Description',
        seeOrHideMiniMap: 'Show/Hide Minimap',
        explainSeeOrHideMiniMap: 'Show or hide minimap functionality.',
    },
    helpLogReplay:{
        processAnimation: 'Process Animation',
        explainProcessAnimation: ` <p>Animate the execution of each case on top of the process graph.</p>
        <p>User can animate specific cases based on selected filter options.</p>
        <p>Using play bar available at the bottom of the page, user can set the animation speed and go to a specific time for animation.</p>
        <p>User can see the detail information of a token by clicking it and a case table will be generated based on the selected token.</p>
        <p>A bottleneck table will be generated if user set the filter option as bottleneck.</p>`,
        analysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        additionalCondition: 'Include Condition (tokens)',
        explainAdditionalCondition: `<p>Case ID, activity, originator*</p>
        <p>* Only available if the respective attributes are mapped</p>`,
        conditionValue: 'Condition Value',
        explainConditionValue: 'Values can be set based on the include conditions.',
        icon: 'Icon',
        iconName: 'Icon',
        iconExplain: 'Description',
        seeOrHideMiniMap: 'Show/Hide Minimap',
        explainSeeOrHideMiniMap: 'Show or hide minimap functionality.',
        stopOrPlay: 'Stop/Play',
        explainStopOrPlay: 'Stop or play the process animation.',
        playBar: 'Play bar',
        controlSpeed: 'Animation Speed',
        explainControlSpeed: 'Animation speed can be configured between 1x until 100K.',
        setDate : 'Set time mode',
        explainSetDate : 'Animate tokens based on the selected time.',
    },
    helpSocial:{
        resourceRelationAnalysis: 'Resource Analysis',
        helpResourceRelationAnalysis: `<p>Relation analysis between activities, resources* or originators*.</p>
        <p>Case table will be generated based on the selected node. At the same time the associated nodes and arcs of the selected node will also be highlighted.</p>
        <p>* This options will only available if user mapped the respected attributes during <a class="link" href="#help-repositorymappingselect">dataset mapping.</a></p>`,
        analysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        wayToSee: 'Layout',
        explainWayToSee: 'Graph visualization layout options.',
        nodeAttr:'Perspective for node',
        explainNodeAttr:` <p>Activity, originator*, resource*</p>        <p>* Only available if the respective attributes are mapped</p>`,
    },
    helpMatrix: {
        dataAnalysis: 'Matrix Analysis',
        explainDataAnalysis: `<p>Heat-map data analysis can be conducted by configuring the x-axis, y-axis and cell value.</p>
        <p>By combining the x-axis, y-axis and cell value options, the co-relationship insight between attributes can be gathered.</p>
        <p>Case table will be generated based on the selected chart's cell.</p>`,
        analysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        xAxis: 'X-axis',
        yAxis: 'Y-axis',
        periodAsMonth: 'Monthly',
        explainYAxis: `<p>Activity, activity flow, originator*, resource*</p>
        <p>* Only available if the respective attributes are mapped</p>`,
        typeOfValue: 'Calculate',
        explainTypeOfValue: `<p>Case count, duration (total/min./max./avg.), utilization, event based cost*, case based cost*</p>
        <p>* Only available if the respective attributes are mapped</p>`,
        additionalCondition: 'Include Condition',
        explainAdditionalCondition: `Case ID`,
        conditionValue: 'Condition Values',
        explainConditionValue: 'Case ID value',
    },
    helpDotted:{
        activityAnalysis: 'Event Analysis',
        explainActivityAnalysis: `<p>Scatter like visualization chart will be generated when user configures the X-axis, Y-axis and the series classifier value.</p>
        <p>The perspective of the data differ based on the classifier setting.</p>
        <p>Case table will be generated when user clicks on the dot (data point) in the chart.</p>`,
        aanalysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        yAxis: 'Y-axis',
        explainYAxis: 'Case ID, activity',
        dottAttrAsDistinguishAttr: 'Classifier (dot value)',
        explainDottAttrAsDistinguishAttr: `<p>Activity, Originator*, Resource*</p>
        <p>* Only available if the respective attributes are mapped</p>`,
    },
    helpProcessFlow:{
        processFlowAnalysis: 'Variant analysis',
        explainProcessFlowAnalysis: `<p>This chart displays each <a href="#help-variant-is" class="link>process variant</a>'s fitness value and its events execution sequence.</p>
        <p>Case table will be generated when user selects a process variant.</p>`,
        analysisConditionAttr: 'Filter conditions',
        attrName: 'Attribute',
        attrValue: 'Description',
        legend: 'Series',
        activity: 'Activity',
        sortedBy: 'Sort By',
        explainSortedBy: 'Case count, start/end timestamp, the shortest/longest duration'
    },
    helpDataSource:{
        checkDataSource:`Let's check on datasource`,
        datasource: 'Datasource',
        explainDatasource: `<p>Related datasources information are available in user's <a href="#help-workspace-data-manage" class="link">workspace</a>.</p>
        <p>In this page, user can also create  and modify datasource properties.</p>
        <p>If several workspaces are exist, by  selecting a workspace, user can see each data that belongs to the workspace.</p>
        <p>Based on user's role and permissions, user can read the properties, edit or delete.</p>
        <p>On modify properties, once the datasource properties changed it is possible the changes will also affect related datasets and the <a href="#help-repositorycreateform" class="link">event logs</a> properties.</p>
        <p>- Access from mobile device is limited for viewing properties and analysis only, therefore, data creation and modifying properties functionality are not available.</p>`
 
    },

    helpMobile:{
        supportDevice: 'Supported device',
        supportDeviceAndDisplay: 'Recommended screen resolution',
        explainSupportDeviceAndDisplay:  `<p>IPR is a web based application and we recommend the use of 1920 x 1080 screen resolution for maximum user experience.</p>
        <p>Service is also available for tablet and mobile device.</p>`,
        create: 'Create',
        modify: 'Modify',
        delete: 'Delete',
        edit: 'Editor',
        viewer: 'Viewer',
        pc: 'PC',
        o: 'O',
        tablet: 'Tablet',
        mobile: 'Mobile',
        x: 'X',
        limitedDisplay: 'Recommended resolution',
        explainLimitedDisplay: 'Display quality depends on the device type and screen resolution.',
        device:'Device',
        over1920: 'over 1920',
        below1099: 'below 1099',
        below767OnlyViewerFunctionEnable:'below 767 (only viewer functionality is available)'
    },
    helpBrowsers:{
        supportBrowser: 'Supported browser',
        browsers: 'Chrome, Edge, Firefox and Safari browsers',
        explainSupportBrowser: `<p>The supported browsers are as follows Chrome, Edge, Firefox and Safari.</p>
        <p>We recommend to use Chrome browser for the best experience in using our application.</p>`,
        edge: 'Edge',
        chrome: 'Chrome',
        firefox: 'Firefox',
        safari: 'Safari'
    }
};

export default helpTranslation;
