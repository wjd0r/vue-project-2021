const helpTranslation = {
    siteMap: '사이트 맵',
    header: {
        help: '도움말'
    },
    sidebar: {
        notiwindow: '알림창',
        readyExecute: '진행 준비중',
        executing: '진행중',
        complete: '완료',
        fail: '실패',
        createData: '데이터 생성하기',
        originalDataIs: '데이터셋이란?',
        createOriginalData: '데이터셋 생성하기',
        enterDataInfo: '데이터 정보 입력',
        enterInfo: '정보 입력',
        uploadFile: '파일 업로드',
        connectDb:'데이터베이스 연결',
        selectColumnType: '컬럼 타입 지정',
        uploadData: '데이터 업로드',
        completeCreateOriginalData : '데이터셋 생성 완료',
        dataFilter : '데이터 필터',
        dataMapping: '데이터 매핑',
        mappingIs: '매핑이란?',
        eventIs: '이벤트로그란?',
        createEvent: '이벤트로그 생성하기',
        enterEventInfo: '이벤트로그 정보 입력',
        standardList: '표준 프로세스 연결하기',
        mappingAttr: '매핑 속성',
        failMapping: '매핑 실패',
        successMapping: '매핑 성공',
        completeEventCreate: '이벤트로그 생성 완료',
        eventFilter: '이벤트 필터',
        durationfilter: '기간 필터',
        caseInclusionCriteria: '케이스 포함 유형이란?',
        startEndActivityFilter: '시작점 및 종료점 필터',
        startActivity: '시작 액티비티란?',
        endActivity: '종료 액티비티란?',
        attributeFilter: '속성 필터',
        variantFilter: '프로세스 그룹 필터',
        eventConditionPriview: '이벤트 필터 진행',
        standardProcessIs: '표준 프로세스란?',
        createStandard: '표준 프로세스 생성하기',
        applyRealData: '실제 데이터에 적용하기',
        createStandardProcess: '표준 프로세스 작성하기',
        editFunction :'편집 기능',
        editConnectingNode: '연결선 편집',
        editNode: '노드 편집',
        createDataSource: '데이터 소스 생성하기',
        createConnection: '연결 생성',
        settingDataSync: '데이터 동기화 설정',
        manageData: '데이터 관리하기',
        workspace:'워크스페이스',
        workspaceIs:'워크스페이스란?',
        home: '홈',
        dataKpi: '데이터 통계',
        bookmark: '북마크',
        recentList: '최근 목록',
        eventInfo: '이벤트로그 정보',
        sampleList: '샘플 목록',
        data: '데이터',
        standardProcess: '표준 프로세스',
        datasource: '데이터 소스',
        inspectProcess: '프로세스 분석하기', 
        processCommon: '프로세스 공통',
        analysisCondition: '분석 조건',
        allAttrInfo : '전체 속성 정보',
        varList: '분석 목록',
        processGroupIs: '프로세스 그룹이란?',
        table: '테이블',
        includedMenu: '포함된 메뉴',
        caseList: '케이스 목록',
        detailList: '상세 목록',
        bottleNeckSectionList: '병목 구간 목록',
        repeatActivityList: '반복 액티비티 목록',
        dataSummary: '데이터 요약',
        dataSummaryTab : '데이터 요약 탭',
        kpi: 'KPI',
        chart: '차트',
        activityTab: '액티비티 탭',
        resourceTab: '리소스 탭',
        originatorTab: '담당자 탭',
        costTab: '비용 탭',
        personalTab: '개인 탭',
        create:'생성',
        edit:'편집',
        item: '아이템',
        removePersonalTab: '개인 탭 제거',
        processDiscovery: '프로세스 분석',
        analysisConditionAttr: '분석 조건 속성',
        icon: '아이콘',
        simpleOrComplex: 'Simple/Complex',
        processDelta:'프로세스 비교',
        splitView: '나눠서 보기',
        combineView: '합쳐서 보기',
        analysisList: '분석 목록',
        mutualSuitability: '상호 적합도란?',
        processAnimation: '프로세스 애니메이션',
        playBar: '플레이 바',
        controlSpeed: '속도 조절',
        setDate : '일시 선택',
        resourceRelationAnalysis: '리소스 관계 분석',
        dataAnalysis: '데이터 분석',
        activityAnalysis: '액티비티 분석',
        processFlowAnalysis: '프로세스 흐름 분석',
        support: '지원',
        supportDevice:'지원 기기',
        supportBrowser: '지원 브라우저'
    },
    helpNotification:{
        notiwindow: '알림창',
        knowNotiWindow: '알림창 알아보기',
        notiExplain : `   <p>로딩 시간이 길어질 시 페이지를 벗어나도 작업이 진행됩니다. 알림창을 통해 진행 현황을 확인하거나 해당 페이지로 이동할 수 있습니다.</p>
        <p>메시지에는 진행 상태, 데이터의 정보와 요청일시 등이 표시됩니다. 진행 상태에 따라 라인 색상으로 구분되며 데이터 상세 정보는 상세 버튼 클릭 시 확인할 수 있습니다. </p>`,
        //<p>- 데이터셋 임포트, 매핑 시에는 나가기 버튼을 클릭 시 알림 메시지가 생성됩니다.</p>
        //<p>- 프로세스 메뉴의 경우 선택한 <a class="link" href="#help-variant-is">프로세스 그룹</a>와 <a class="link" href="#help-process-filter-title">분석 조건</a> 값도 함께 표시됩니다.</p>`, //line 105 변경 필요, 기능 설명은 안맞음
        readyExecute: '진행 준비중',
        explainCancel: '회색 라인으로 표현됩니다. 취소 버튼을 클릭 시 요청을 취소할 수 있습니다.',
        fileImportingReadyExecute: 'File-Import [진행 준비중]',
        fileImportingExecuting: 'File-Import [진행 준비중]',
        fileImportingComplete: 'File-Import [완료]',
        fileImportingFail: 'File-Import [실패]',
        originalDataName: '데이터셋 이름',
        createOriginalData: '데이터셋 생성하기',
        eventLogName:'이벤트로그 이름',
        createEventLog: '이벤트로그 생성하기',
        requestTime: '요청일시 : 2021-01-01 12:34:56',
        cancel: '취소',
        executing: '진행중',
        notiExecuteState: '파란색 라인으로 표현됩니다. 진행 정도가 퍼센트 값으로 표시됩니다.',
        complete: '완료',
        canConfirmWhenClickCard: '초록색 라인으로 표현됩니다. 정보를 확인하거나 해당 페이지로 이동하여 데이터를 확인할 수 있습니다.',
        hospitalTreatment: '병원 진료',
        shortcut: '바로가기',
        fail: '실패',
        requestAgain: '재요청',
        explainCanRequestAgain: '빨간색 라인으로 표현됩니다. 요청 실패 원인이 표시되며 해당 페이지로 이동하거나 작업을 다시 요청할 수 있습니다.'
    },
    helpCreate: {
        createData: '데이터 생성하기'
    },
    helpCreateDatabase:{
        createDatasourceForProcessDiscovery: '프로세스 분석을 위한 데이터 소스 만들기',
        createDatasource: '데이터 소스 생성하기',
        explainCreateDatasource: ` <p>데이터 소스 관리 화면 혹은 <a href="#help-original-dataset-is" class="link">데이터셋</a> 생성 시에 데이터베이스를 연동하여 데이터를 불러올 수 있습니다. </p>
        <p>Oracle, MSSQL, MySQL, PostgreSQL, MariaDB 를 연동할 수 있으며, 테스트가 성공적으로 완료 되었을 시 새로운 데이터 소스를 생성할 수 있습니다.</p>
        <p>주기적으로 데이터를 동기화하기 원할 시, <a href="#help-setting-data-source-sync" class="link">동기화 설정</a>을 할 수 있습니다. </p>
        <p>연동된 데이터베이스 정보는 <a href="#help-databasesource" class="link">데이터 소스</a> 목록에서 확인할 수 있습니다. </p>`,
        createConnection: '연결 생성',
        settingDataSync: '데이터 동기화 설정',
        explainSettingDataSync1: `<p>데이터베이스를 연동하여 데이터셋을 생성하는 경우, 데이터 동기화에 대한 설정을 할 수 있습니다.</p>
        <p>동기화를 활성화할 경우, 동기화 규칙과 주기, 시작 시간을 설정할 수 있습니다.</p>`,
        explainSettingDataSync2: `<p>동기화 규칙은 동기화 시 데이터의 변경 정도를 설정하는 항목이며, 현재 기존의 데이터에 새로운 데이터를 추가하는 'append only'옵션이 기본값으로 설정됩니다. </p>
        <p>주기는 일간, 주간 중 선택 가능하며 주간 선택 시 동기화 요일을 선택할 수 있습니다. </p>
        <p>동기화를 활성화하지 않은 경우, 데이터베이스를 연동한 일시의 데이터가 데이터셋으로 생성되며, 데이터에 대한 실시간 처리는 불가합니다.</p>`,
    },
    helpDataFilter: {
        saveRequireDataFromDataset: '데이터셋에서 필요한 값만 저장하기',
        datafilter:'데이터 필터',
        explainDataFilter: `<p>기존 <a href="#help-original-dataset-is" class="link">데이터셋</a>의 데이터 중 각 필드 별로 사용할 값을 선택하여 새로운 데이터셋을 생성할 수 있습니다. </p>`,
        explainDataFilterSelect: '필드 값의 유형이 범주형일 경우 각 값을 선택하며, 숫자일 경우 숫자 범위로 선택할 수 있습니다. 원본 데이터셋의 데이터 유형이 데이터베이스 일 경우에도 그로부터 생성된 데이터셋의 데이터는 동기화되지 않습니다.',
        dataFilterSelection: '데이터셋 목록에서 해당 데이터셋 우클릭 시 데이터 필터 버튼을 확인할 수 있습니다.',
        dataFilterPreview:'데이터 필터 진행',
        explainDataFilterPreview : '필터 적용 진행 화면에서도 선택한 데이터 필터 값을 확인할 수 있습니다.'
        
        /*dataFilterAttr: '데이터 필터 속성',
        attrName: '속성 명',
        attrMean: '속성 의미',
        caseId: '케이스 아이디*',
        explainCaseId: '각 케이스를 고유하게 식별할 수 있는 코드입니다. 여러 컬럼을 하나의 케이스 아이디로 선택할 수 있습니다. ',
        activity: '액티비티*',
        processGrade: '프로세스의 각 단계입니다.',
        timeStamp : '타임스탬프*',
        explainTimeStamp: '액티비티가 발생한 시간입니다. 시작 시간, 종료 시간을 매핑할 수 있으며, 타임스탬프가 하나일 경우 필수 항목인 종료 시간으로 지정해야 합니다. 시작 시간, 종료 시간을 모두 매핑할 시 액티비티 소요시간, 리소스/담당자 소요시간 등 더욱 다양한 분석 결과를 확인할 수 있습니다. ',
        originator:'담당자',
        explainOriginator: '액티비티를 수행한 담당자입니다.',
        resource: '리소스',
        explainResource: '액티비티를 수행한 시스템,장비 등입니다.',
        cost: '비용',
        explainCost: '액티비티에서 발생한 비용입니다.',
        caseAttr: '케이스 속성',
        explainCaseAttr: '케이스 아이디와 관련된 속성입니다.',
        eventAttr: '이벤트 속성',
        explainEventAttr: '이벤트 아이디와 관련된 속성입니다. ',
        */
    },
    helpCreateDataSet: {
        makeDataforProcessMining: '프로세스 분석을 위한 데이터셋 만들기',
        originalDataIs: '데이터셋이란?',
        getDatawhenProcessMining: `<p>프로세스 분석을 위해서는 먼저 분석하고자 하는 데이터를 앱으로 가져와야 합니다.</p>
        <p>이때 파일을 업로드하거나 데이터베이스 연동을 통하여 앱으로 불러온 사용자의 데이터를 데이터셋이라고 합니다.</p>`,
        createOriginalData: '데이터셋 생성하기',
        explainForDBConnect: `<p><a class="link" href="#help-file-upload">파일 업로드</a> 혹은 <a class="link" href="#help-connect-db">데이터베이스 연동</a>을 통해 <a class="link" href="#help-workspace-data-manage">워크스페이스</a>에 데이터셋을 생성할 수 있습니다.</p>
        <p>이미 생성된 데이터셋에 <a class="link" href="#help-datasetfiltercreateform">데이터 필터</a>를 적용하여 새로운 데이터셋을 생성할 수도 있습니다. </p>
        <p>상세 튜토리얼은 데이터 생성 화면에서 확인할 수 있습니다. </p>
        <p>데이터 정보 입력 단계를 클릭 시 다음 화면으로 이동합니다.</p>`,
        enterDataInfo: '데이터 정보 입력',
        enterInfo: '정보 입력',
        gradeForEnterInfo: '데이터셋의 정보를 입력하고 불러올 데이터를 선택하는 단계입니다. ',
        explainWhenEnterInfo: `<p>데이터셋과 <a href="#help-repositorycreateform" class="link">이벤트로그</a>의 이름, 설명을 입력합니다. </p>
        <p>데이터셋 생성 시 이벤트로그 한 개를 함께 생성할 수 있습니다.</p>`,
        //explainIfCompleteCreate: `  <p>데이터 정보 입력 단계에서 생성을 완료할 시 데이터셋만 생성됩니다. </p>
        //<p>데이터 매핑 단계까지 완료할 시 데이터셋과 이벤트로그 한 개가 생성됩니다. </p>`,
        uploadFile: '파일 업로드',
        typeOfFile: 'CSV, XLSX, MXML, XES 형식의 파일을 업로드 할 수 있습니다. ',
        attrName: '속성 명',
        attrMean: '속성 의미',
        lineShowTitle: '제목 표시줄',
        explainColumn: '컬럼 이름으로 사용할 행을 선택할 수 있습니다.',
        sepChar : '구분 문자',
        explianSepChar: '각 컬럼을 구분하는 문자를 직접 입력할 수 있습니다.',
        connectDb:'데이터베이스 연결',
        explainConnectDb: `<p>Oracle, MSSQL, MySQL, PostgreSQL, MariaDB 를 연동할 수 있습니다.</p>
        <p>'직접 입력'을 선택 시 새로운 데이터베이스를 연동할 수 있고, '데이터 소스에서 가져오기' 선택 시 기존의 <a href="#help-create-data-source" class="link">데이터 소스</a> 목록에서 불러올 수 있습니다.</p>`,
        bringDb: '데이터 소스 가져오기',
        explainBringDb: '데이터 소스에서 미리 생성된 항목을 가져옵니다.',
        typeDirect: '직접 입력',
        explainDbConnect: `<p>Oracle, MSSQL, MySQL, PostgreSQL, MariaDB 를 연동할 수 있으며, 테스트가 성공적으로 완료 되었을 시 새로운 데이터 소스를 생성할 수 있습니다.</p>
        <p>주기적으로 데이터를 동기화하기 원할 시, <a href="#help-setting-data-source-sync" class="link">동기화 설정</a>을 할 수 있습니다. 연동된 데이터베이스 정보는 데이터 소스 목록에서 확인할 수 있습니다. </p>
        <p>테스트 : 입력값에 대한 테스트 성공 또는 실패 여부를 확인 할 수 있습니다.</p>`,
        selectComlumType: '컬럼 타입 지정(옵션)', 
        explainSelectColumnType: '일부 데이터를 확인하고 각 컬럼의 데이터 타입을 지정하는 단계입니다. 컬럼 타입 지정 단계까지 완료 시 데이터 업로드를 진행할 수 있습니다.',
        uploadData: '데이터 업로드',
        explainUploadData: ` <p>컬럼 타입 지정 단계까지 완료 시 데이터가 업로드됩니다. 데이터셋을 생성하기 위한 마지막 단계입니다.</p>
        <p>업로드 시 로딩이 길어질 수 있으므로 나가기 버튼을 눌러 다른 작업을 진행할 수 있습니다.</p>
        <p>업로드가 완료되면 알림창에서 확인할 수 있습니다.</p`,
        completeCreateOriginalData : '데이터셋 생성 완료',
        explainCompleteCreateOriginalData: `<p>데이터셋 생성이 완료되었습니다. </p>
        <p>데이터셋 목록으로 이동하거나, 매핑 단계로 바로 이동하여 <a href="#help-repository-data-is" class="link">이벤트로그</a>를 생성할 수 있습니다.</p>`,
        /*
        dataMapping: '데이터 매핑',
        explainDataMapping: `<p>데이터셋 생성 완료 후 다음 버튼을 클릭 시 매핑하여 <a href="#help-repositorycreateform" class="link">이벤트로그</a>까지 생성 완료 할 수 있습니다.</p>`,
        complete: '완료',
        explainComplete: ` <p>데이터셋과 이벤트로그 생성이 완료되었습니다.</p>
        <p>데이터셋 목록으로 이동하거나, 생성된 이벤트로그의 대시보드 혹은 프로세스 분석 메뉴로 이동할 수 있습니다.</p>`
        */
    },
    helpCreateEvent:{
        makeDataForProcessMining: '프로세스 분석을 위한 이벤트로그 만들기',
        eventIs: '이벤트로그란?',
        explainEvent: `  <p>이벤트로그는 <a class="link" href="#help-datasetcreateform">데이터셋</a>에서 파생한 데이터입니다.</p>
        <p>사용자가 데이터셋을 프로세스 분석에 활용하기 위해 처리한 데이터를 이벤트로그라고 합니다.</p>`,
        createEvent: '이벤트로그 생성하기',
        explainCreateEvent: `<p>이벤트로그는 세 가지 방법으로 생성할 수 있습니다.</p>`,
        explainCtreateEventFirst: '첫번째, 데이터셋 생성 시 <a href="#help-repositorymappingselect" class="link">매핑</a> 단계를 바로 진행하여 이벤트로그를 함께 생성할 수 있습니다.',
        explainCtreateEventSecond: '두번째, 기존의 데이터셋에서 이벤트로그를 새로 생성할 수 있습니다.',
        explainCtreateEventThird: `세번째, 기존 이벤트로그에 <a class="link" href="#help-subrepositorycreateform">이벤트 필터</a>를 적용하여 새로운 이벤트로그를 생성할 수도 있습니다.
        <p>상세 튜토리얼은 각 화면에서 확인할 수 있습니다.</p>`,
        explainCtreateEventThird02: '생성된 이벤트로그를 통해 분석을 시작할 수 있습니다.',
        enterEventInfo: '이벤트로그 정보 입력',
        explainEnterEventInfo: '이벤트로그의 정보를 입력하는 단계입니다.',
        standardList: '표준 프로세스 연결하기',
        explainStandardList: `<p><a class="link" href="#help-standardcreateform">표준 프로세스</a>가 생성되어 있을 시 이벤트로그와 연결할 수 있습니다. 한 이벤트로그 당 한 개 이상의 표준 프로세스를 연결할 수 있습니다.</p>
        <p>여러 개의 표준 프로세스를 연결할 경우, 대표적인 표준 프로세스 한 개를 선택해야 합니다. </p>
        <p>- 웹(해상도 1920 권장) 상에서는 마우스 드래그 또는 버튼(+,-)을 클릭하여 선택할 수 있습니다.</p>
        <p>- 모바일 및 태블릿 상에서는 버튼(+,- 버튼)을 클릭하여 선택할 수 있습니다.</p>`,
        completeEventCreate: '이벤트로그 생성 완료',
        explainCompleteEventCreate: `<p>이벤트로그 생성이 완료되면 다음 화면을 선택할 수 있습니다.</p>
        <p>이벤트로그 목록으로 이동하거나, 생성된 이벤트로그의 대시보드 혹은 프로세스 분석 메뉴로 이동할 수 있습니다.</p>`,
    },
    helpEventFilter:{
        ctreatEventFiltering: '하나의 이벤트로그를 다양하게 필터링하기',
        eventFilter: '이벤트 필터',
        explainEventFilter : '기존 이벤트로그의 데이터 중 여러 조건에 따른 특정 데이터를 선택하여 새로운 이벤트로그를 생성할 수 있습니다.',
        eventFilterSelection : '이벤트로그 목록에서 해당 이벤트로그 우클릭 시 이벤트 필터 버튼을 확인할 수 있습니다.',
        durationFilter: '기간 필터',
        explainDurationFilter: '생성할 이벤트로그의 총 기간을 선택할 수 있습니다. 현재 설정된 케이스 포함 유형을 함께 확인할 수 있습니다. ',
        caseInclusionInfo : '케이스 포함 유형이란?',
        explainCaseInclusionInfo : `<p>선택된 기간 내 케이스를 더욱 상세하게 분류하는 조건입니다.</p>
        <p>유형 선택에 따라 케이스의 시작/종료 일시가 포함되거나 제외되어 분석에 사용할 케이스를 필터링합니다.</p>
        <p>케이스 포함 유형은 설정에서 변경할 수 있습니다.</p>`,
        startEndActivityFilter: '시작점 및 종료점 필터',
        explainStartEndActivityFilter: `<p>생성할 이벤트로그의 시작 액티비티와 종료 액티비티로 사용할 액티비티를 선택할 수 있습니다.</p>
        <p>선택한 시작 액티비티로 시작하고, 선택한 종료 액티비티로 종료되는 케이스만 도출됩니다.</p>`,
        startActivity: '시작 액티비티란?',
        explainStartActivity: '프로세스가 시작되는 첫번째 액티비티입니다.',
        entActivity: '시작 액티비티란?',
        explainEndActivity: '프로세스가 종료되는 마지막 액티비티입니다.',
        attributeFilter: '속성 필터',
        explainAttributeFilter: '생성할 이벤트로그에서 각 필드 별로 사용할 값을 선택할 수 있습니다. ',
        variantFilter: '프로세스 그룹 필터',
        explainVariantFilter: '생성할 이벤트로그에서 확인하고자 하는 프로세스 그룹을 선택할 수 있습니다. ',
        eventFilterPreview : '이벤트 필터 진행', 
        explainEeventFilterPreview : '필터 적용 진행 화면에서도 선택한 이벤트 필터 값을 확인할 수 있습니다.'
    },
    helpCreateStandard:{
        makeStandardForProcessMining: '프로세스 분석을 위한 표준 프로세스 만들기',
        standardProcessIs: '표준 프로세스란?',
        explainStandardProcessIs:  `<p>표준 프로세스를 사용자가 직접 생성할 수 있습니다.</p>
        <p>생성된 표준 프로세스를 <a class="link" href="#help-repositorycreateform">이벤트로그</a>와 연결하여 표준 프로세스와 실제 데이터를 비교할 수 있습니다. </p>`,
        createStandard: '표준 프로세스 생성하기',
        explainCreateStandard: '표준 프로세스는 표준 프로세스 관리 화면, <a class="link" href="#help-processdiscovery">프로세스 분석</a> 메뉴 화면에서 생성할 수 있습니다.',
        applyRealData: '실제 데이터에 적용하기',
        explainApplyRealData: `<p>표준 프로세스 생성/수정 화면에서 표준 프로세스를 기존의 이벤트로그에 연결하여 사용할 수 있습니다. </p>
        <p>연결된 이벤트로그를 분석 시 실제 데이터와 표준 프로세스 비교가 가능하여 더욱 다양한 인사이트를 도출해낼 수 있습니다.  </p>
        <p>한 이벤트로그 당 표준 프로세스를 여러 개 등록할 수 있습니다. </p>`,
        RepresentativeStandard: `기본 표준 프로세스 설정하기`,
        createStandardProcess: '표준 프로세스 작성하기',
        editStandardProcessDirect: '표준 프로세스를 직접 편집할 수 있습니다.',
        editFunction :'편집 기능',
        function :'기능',
        explainFunction: '기능 설명',
        cancelExecute: '실행 취소',
        explainCancelExecute: '이전 단계로 작업을 되돌립니다.',
        reexecute: '다시 실행',
        explainReexecute: '되돌리기를 취소합니다.',
        init: '초기화',
        explainInit: '기본 제공 화면으로 초기화됩니다.',
        exportSvg: 'SVG로 내보내기',
        explainExportSvg: 'SVG 파일로 저장할 수 있습니다.',
        exportPng: 'PNG로 내보내기',
        explainExportPng: 'PNG 파일로 저장할 수 있습니다.',
        wholeScreen: '전체화면',
        explainWholeScreen: `전체화면으로 전환됩니다. <br/>윈도우 F11의 효과와 동일합니다.`,
        bringFirst: '맨 앞으로 가져오기',
        explainBringFirst: '선택된 아이템을 맨 앞으로 가져옵니다.',
        sendBack : '맨 뒤로 보내기',
        explainSendBack: '선택된 아이템을 맨 뒤로 보냅니다.',
        sortGraph: '그래프 정렬',
        explainSortGraph: '그래프 모양이 복잡할 시 사용자가 확인하기에 편리하도록 정리하여 보여줍니다.',
        seeInOne: '한번에 보기',
        explainSeeInOne: '그래프를 편집 영역 크기에 맞추어 보여줍니다.',
        validCheck: '유효성 검사',
        explainValidCheck: '작성한 프로세스가 사용 가능한 프로세스 형식인지 확인합니다.',
        save: '저장',
        explainSave: '해당 내용이 저장되며, 연결된 이벤트로그에 적용이 되지 않습니다.',
        deploy: '배포',
        explainDeploy: `해당 내용이 저장되며, 유효성 검증 성공 시 연결된 이벤트로그의 분석 결과에 적용됩니다.<br/>
        배포 취소하면 연결된 이벤트로그의 분석 결과에 적용되지 않습니다.`,
        exit: '나가기',
        explainExit: '편집이 취소되며, 프로세스 목록으로 돌아갑니다.',
        editConnectingNode: '연결선 편집',
        editName: '편집 이름',
        explainEditName: '편집 설명',
        startActivityName: '시작 액티비티 이름',
        explainStartActivityName: '해당 연결선이 출발하는 액티비티를 설정할 수 있습니다.',
        endActivityName: '종료 액티비티 이름',
        explainEndActivityName: '해당 연결선이 도착하는 액티비티를 설정할 수 있습니다.',
        standardTime: '표준 시간', 
        explainStandardTime: '해당 구간의 표준 시간을 입력할 수 있습니다.',
        timeUnit: '시간 단위',
        explainTimeUnit: '표준 시간에 대한 시간 단위를 선택할 수 있습니다.',
        editNode: '노드 편집',
        activityName: '액티비티 이름',
        explainActivityName: '액티비티 이름과 필수 액티비티 여부를 설정할 수 있습니다.',
        isRequired: '필수 여부',
        explainIsRequired: '필수 여부를 선택할 수 있습니다.',
        explainStandardTimeOfActivity: '해당 액티비티의 표준 시간을 입력할 수 있습니다.',
    },
    helpDataMapping:{
        dataMapping : '데이터 매핑',
        explainDataMapping: `<p>데이터셋의 데이터를 분석하고자 하는 관점에 따라 분석 속성과 연결하는 단계입니다.</p>
        <p>매핑 단계가 완료될 시 이벤트로그 생성이 완료됩니다.</p>`,
        mappingIs: '매핑이란?',
        explainMappingIs: `<p>분석 관점에 따라 컬럼을 선택하고 분석 속성과 연결하는 단계입니다.</p>
        <p>프로세스 분석을 위해 사용자의 데이터에서 사용할 특정 컬럼을 선택해야 합니다. </p>
        <p>프로세스 분석을 진행하기 위해 필요한 속성이 있습니다. 그 속성을 실제 데이터에서 사용자가 선택한 컬럼과 매핑하여 분석을 진행합니다.</p>
        <p>어떠한 관점으로 분석하기를 원하는지에 따라 선택 컬럼이 달라질 수 있습니다. </p>`,
        attrName: '속성 명',
        attrMean: '속성 의미',
        caseId: '케이스 아이디*',
        explainCaseId: '각 케이스를 고유하게 식별할 수 있는 코드입니다. 여러 컬럼을 하나의 케이스 아이디로 선택할 수 있습니다. ',
        activity: '액티비티*',
        processGrade: '프로세스의 각 단계입니다.',
        timeStamp : '타임스탬프*',
        explainTimeStamp: '액티비티가 발생한 시간입니다. 시작 시간, 종료 시간을 매핑할 수 있으며, 타임스탬프가 하나일 경우 필수 항목인 종료 시간으로 지정해야 합니다. 시작 시간, 종료 시간을 모두 매핑할 시 액티비티 소요시간, 리소스/담당자 소요시간 등 더욱 다양한 분석 결과를 확인할 수 있습니다. ',
        originator:'담당자',
        explainOriginator: '액티비티를 수행한 담당자입니다.',
        resource: '리소스',
        explainResource: '액티비티를 수행한 시스템,장비 등입니다.',
        cost: '비용',
        explainCost: '액티비티에서 발생한 비용입니다.',
        caseAttr: '케이스 속성',
        explainCaseAttr: '케이스 아이디와 관련된 속성입니다.',
        eventAttr: '이벤트 속성',
        explainEventAttr: '이벤트 아이디와 관련된 속성입니다. ',
        mappingAttr: '매핑 속성',
        explainMappingAttr: ` <p>(*)표시 된 속성은 필수로 매핑해야 하는 속성입니다.</p> <p>이외 속성 매핑은 옵션 항목이며 매핑할 시 더욱 다양한 분석이 가능합니다.</p>`,
        failMapping: '매핑 실패',
        explainFailMapping: `<p>유효성 검증에 실패할 시 아래의 화면이 나타나게 됩니다.</p>
        <p>하단의 재매핑 버튼을 누르면 다시 매핑할 수 있습니다.</p>`,
        successMapping: '매핑 성공',
        explainSuccessMapping: `<p>유효성 검증에 성공할 시 아래의 화면이 나타나게 됩니다. </p>
        <p>하단의 완료 버튼을 누르면 다음 화면을 선택할 수 있습니다.</p>`
    },
    helpDataManage: {
        dataManageForProcessInspect: '프로세스 분석을 위한 데이터 관리하기',
        workspace: '워크스페이스',
        workspaceIs: '워크스페이스란?',
        explainWorkSpace1: `<p>사용자 그룹(프로젝트/팀 등) 별로 데이터를 저장하고 활용하는 공간입니다.</p>
        <p>한 사용자는 여러 워크스페이스에 소속될 수 있습니다. </p>
        <p>워크스페이스가 여러 개일 시, 각 관리 화면에서 워크스페이스 별로 나누어 데이터를 확인할 수 있습니다.</p>`,
        explainWorkSpace2: `<p>전체 워크스페이스 혹은 선택한 워크스페이스에서 데이터를 검색하여 확인할 수 있습니다.  </p>
        <p>설정 창에서 기본 워크스페이스를 선택할 수 있습니다.</p>`

    },
    helpHome: {
        checkPrimeData: '주요 데이터 한 눈에 확인하기',
        home: '홈',
        explainHome: `<p>홈 화면에서는 사용자의 총 데이터 수와, 북마크 목록 및 최근 목록 등 주요 데이터가 나타납니다. </p>
        <p>목록의 <a class="link" href="#help-repositorycreateform">이벤트로그</a> 정보를 확인할 수 있으며 분석 메뉴로 바로 이동하거나 <a class="link" href="#help-standardcreateform">표준 프로세스</a>를 편집할 수 있습니다.</p>
        <p>사용자가 업로드 한 데이터가 없을 경우 샘플 데이터로 먼저 분석해볼 수 있습니다.  </p>`,
        dataKpi: '데이터 KPI',
        explainDataKpi: '사용자의 워크스페이스 상 총 데이터 소스, 총 이벤트로그, 총 표준 프로세스 수를 확인할 수 있습니다.',
        bookMark: '북마크',
        explainBookMark: `<p>북마크한 이벤트로그 목록을 확인할 수 있습니다. </p>
        <p>목록에서 해당 이벤트로그를 클릭 시 오른쪽 화면에 이벤트로그 정보 화면이 업데이트 됩니다.</p>`,
        recentList: '최근 목록',
        explainRecentList: `<p>사용자가 최근 4시간 동안 확인한 이벤트로그 목록을 확인할 수 있습니다. </p>
                    <p>목록에서 해당 이벤트로그를 클릭 시 오른쪽 화면에 이벤트로그 정보 화면이 업데이트 됩니다.</p>`,
        eventInfo: '이벤트로그 정보',
        explainEventInfo : `<p>북마크, 최근 목록에서 해당 이벤트로그를 클릭 시 오른쪽 화면에 이벤트로그의 정보가 나타납니다.</p>
        <p>최근 업데이트 일자 및 해당 이벤트로그의 총 케이스 수, 이벤트 수, 시작일, 종료일과 매핑된 속성 목록, 연결된 표준 프로세스를 확인할 수 있습니다.</p>
        <p>연결된 표준 프로세스를 편집하거나 해당 이벤트로그의 분석 메뉴로 이동할 수 있습니다. </p>`,
        sampleList: '샘플 목록',
        explainSampleList: ` <p>샘플 <a class="link" href="#help-repositorycreateform">이벤트로그</a> 목록입니다. 이벤트로그 클릭 시 분석 메뉴로 이동합니다.</p>
        <p>사용자가 업로드 한 데이터가 아직 없을 시 샘플 이벤트로그로 프로세스 분석을 경험 할 수 있습니다.</p>`,
    },
    helpData: {
        checkAllData: '모든 데이터 확인하기',
        data: '데이터',
        dataExplain: `<p>내가 속한 <a href="#help-workspace-data-manage" class="link">워크스페이스</a>의 <a href="#help-datasetcreateform" class="link">데이터셋</a>과 <a href="#help-repositorycreateform" class="link">이벤트로그</a>를 확인 및 생성할 수 있습니다.</p>
        <p>속한 워크스페이스가 여러 개일 시, 워크스페이스를 선택하여 데이터를 확인하고 생성할 수 있습니다. </p>
        <p>권한에 따라 정보 보기, 생성, 수정, 삭제 등이 가능합니다.</p>
        <p>데이터베이스를 연동한 경우 연결 정보는 <a href="#help-databasesource" class="link">데이터 소스</a> 화면에서 확인할 수 있습니다. </p>
        <p>- 모바일에서는 데이터에 대한 생성,수정이 불가능하며 정보 확인 및 분석 메뉴 사용만 가능합니다.</p>`,
    },
    helpStandard: {
        checkAllDataInStandardProcess: '표준 프로세스의 모든 데이터 확인하기',
        standardProcess: '표준 프로세스',
        explainStandardProcess: `  <p>내가 속한 <a href="#help-workspace-data-manage" class="link">워크스페이스</a>의 표준 프로세스를 확인 및 생성할 수 있습니다.</p>
        <p>속한 워크스페이스가 여러 개일 시, 워크스페이스를 선택하여 데이터를 확인하고 생성할 수 있습니다.</p>
        <p>권한에 따라 정보 보기, 수정, 삭제 등이 가능합니다.</p>
        <p>수정 시 연결된 이벤트로그를 해제하거나 새로운 이벤트로그를 등록할 수 있습니다.</p>
        <p>- 모바일에서는 데이터에 대한 생성,수정이 불가능하며 정보 확인 및 분석 메뉴 사용만 가능합니다.</p>`,
    },

    helpProcessAnalysis:{
        inspectProcess: '프로세스 분석하기'
    },
    helpCommon: {
        processCommon: "프로세스 공통",
    },
    helpFilter: {
        analysisCondition: '분석 조건',
        explainAnalysisCondition: `<p>선택한 <a class="link" href="#help-repositorycreateform">이벤트로그 </a>를 분석할 때 특정 조건으로 필터링하여 보기 위한 항목입니다.</p>
        <p>모든 프로세스 메뉴에 포함되어 있으며 왼쪽 상단의 해당 아이콘 클릭 시 조건을 설정하여 적용할 수 있습니다.</p>
        <p>프로세스 메뉴에 따라 분석 조건이 다를 수 있습니다.</p>`,
        additionalExplainAnalysisCondition: '[참고] 프로세스 분석',
        allAttrInfo : '전체 속성 정보',
        explainAllAttrInfo : '기본 속성값은 설정 화면에서 직접 설정 가능합니다.',
        attrName: '속성 명',
        attrMean: '속성 의미',
        attrValue: '속성 값',
        analysisMenu: '분석 메뉴',
        period: '기간',
        dataPeriod: '데이터의 기간',
        explainDataPeriod: '데이터 기간에 맞는 프로세스를 확인 할 수 있습니다.',
        allMenu: '전 메뉴',
        analysisItem: '분석 항목',
        caseSpentTime: '케이스 소요시간',
        activitySpentTime: '액티비티 간의 소요시간',
        analysisMonthly: '월간 분석',
        analysisMonthlyFlow: '월 별 흐름',
        analysisFlow: '흐름 분석',
        wholeFlow: '전체 흐름',
        menuExceptDashboard: '대시보드 제외한 전 메뉴',
        algorithm: '알고리즘',
        algorithmApplyToData: '데이터에 적용할 알고리즘',
        explainHeuristicsMiner: 'Heuristics Miner: 이상적인 프로세스를 확인할 수 있습니다.',
        explainFuzzyMiner: 'Fuzzy Miner : 복잡한 프로세스를 단순화하여 확인할 수 있습니다.',
        processAnalysis: '프로세스 분석',
        activity: '액티비티',
        explainActivity: '액티비티에 표시되는 값',
        spentTime: '소요시간 : 전체, 평균, 최소, 최대, 중간값 소요시간',
        occurCount: '빈도 : 발생 건수',
        iterCount: '반복 : 반복 건수',
        processAnalysisAnimation:'프로세스 분석, 비교, 애니메이션',
        connectLine : '연결선',
        explainConnectLine : '액티비티 간 연결선에 표시되는 값',
        bottleNeckCount: '병목 : 병목 구간 별 건수',
        dependency: '의존도 : 액티비티 간의 관계 비율',
        processAnalysisThreeItem: '프로세스 분석, 비교, 애니메이션',
        xAxis: 'X축',
        yAxis: 'Y축',
        explainAxis: '차트의 X축,Y축 속성',
        mappingProperties: '매핑 속성',
        dataAnalysis: '데이터 분석',
        activityAnalysis: '액티비티 분석',
        typeOfValue: '값 유형',
        typeOfValueOfAxis: 'X축,Y축에 대한 값 유형',
        caseAndCaseCount: '케이스 수 : 케이스 건수',
        spentTimeAndTime: '소요시간 : 시간',
        useRate: '사용률 : 케이스 건수 비율'
    },
    
    helpVariant: {
        varList: '분석 목록',
        explainVarList: `<p>현재 <a class="link" href="#help-repositorycreateform">이벤트로그<a/>의 <a class="link" href="#help-variant-is">프로세스 그룹</a> 목록입니다. </p>
        <p>모든 프로세스 메뉴(프로세스 흐름 분석 메뉴 제외) 화면에서 왼쪽 상단의 해당 아이콘을 클릭하면 나타납니다. </p>
        <p>그룹 별 정보를 확인하고 특정 그룹을 선택하여 데이터를 확인할 수 있습니다. </p>
        <p>프로세스 비교 메뉴에서는 그룹 두 개, 이외 프로세스 메뉴에서는 그룹 한 개를 선택하여 볼 수 있습니다. </p>`,
        processGroupIs: '프로세스 그룹이란?',
        explainProcessGroupIs: '프로세스가 유사한 케이스 별로 분류한 각 그룹을 의미합니다. '
    },

    helpTable: {
        table: '테이블',
        explainTable: `<p>현재 이벤트로그의 데이터 중 특정 조건을 가진 데이터의 목록입니다.</p>
        <p>대시보드,프로세스 비교 메뉴를 제외한 모든 프로세스 메뉴에서 확인할 수 있습니다.</p>
        <p>프로세스 메뉴에 따라 각자 다른 조건의 데이터를 확인할 수 있으며, 다운로드할 수 있습니다. (상세 목록 제외).</p>
        <p>옵션 속성을 <a class="link" href="#help-repositorymappingselect">매핑</a>하였을 시 테이블에서 옵션 속성에 대한 데이터도 확인할 수 있습니다.</p>`,
        includedMenu: '포함된 메뉴',
        analysisMenuName: '분석 메뉴명',
        caseList: '케이스 목록',
        bottleNeckSectionList: '병목 구간 목록',
        repeatActivityList: '반복 액티비티 목록',
        dataSummary: '데이터 요약',
        x: 'X',
        processAnalysis:'프로세스 분석',
        o: 'O',
        processDelta:'프로세스 비교',
        processAnimation: '프로세스 애니메이션',
        resourceRelationAnalysis: '리소스 관계 분석',
        activityAnalysis: '액티비티 분석',
        dataManage: '데이터 관리',
        ganttChart: '프로세스 흐름 분석',
        explainCaseList: `<p>분석 조건에서 액티비티 혹은 연결선 값을 소요시간,빈도로 설정했을 때, 분석 조건과 목록에 따라 필터링 된 데이터의 전체 케이스 목록입니다. </p>
        <p>프로세스 메뉴에 따라 다양한 데이터를 확인할 수 있습니다.</p>
        <p>행을 클릭할 시 하단에 상세 목록이 나타납니다.</p>`,
        detailList: '상세 목록',
        explainDetailList: `<p>해당 케이스에 대한 상세 이벤트로그 목록입니다.</p>
        <p>케이스 목록에서 행을 클릭할 시 상세 목록이 하단에 나타납니다.</p>`,
        explainBottleNeckSectionList: '분석 조건에서 액티비티 혹은 연결선 값을 병목으로 설정했을 때, 병목에 해당하는 액티비티 혹은 연결선 목록입니다.',
        expalinRepeatActivityList: '분석 조건에서 액티비티 혹은 연결선 값을 반복으로 설정했을 때, 반복에 해당하는 액티비티 혹은 연결선 목록입니다.',

    },
    helpDashboard:{
        dataSummary: '데이터 요약',
        explainDataSummary: `<p>상단의 KPI와 다양한 시각화 차트를 통하여 전체적인 데이터 통계를 확인할 수 있습니다. </p>
        <p>속성에 따라 탭이 나누어지며, 각 탭에서 각 속성에 대한 데이터를 더욱 자세히 확인할 수 있습니다.</p>
        <p>매핑한 속성에 대한 탭이 보여지며, 데이터 요약 탭과 액티비티 탭은 기본적으로 나타납니다.</p>
        <p>각 탭에서 내게 필요한 아이템만 모아 개인탭을 생성할 수도 있습니다.</p>`,
    },
    helpTabOverview: {
        dataSummaryTab : '데이터 요약 탭',
        dataflow: '데이터 전체 흐름 및 현황을 확인할 수 있습니다.',
        kpi: 'KPI',
        kpiName: 'KPI 이름',
        kpiExplain: 'KPI 설명',
        caseCount: '총 케이스 수',
        explainCaseCount : '총 케이스 건수입니다.',
        eventCount : '총 이벤트 수',
        explainEventCount: '총 이벤트 건수입니다.',
        startTime: '시작시간',
        explainStartTime: '데이터의 최소 시간입니다.',
        endTime: '종료시간',
        explainEndTime: '데이터의 최대 시간입니다.',
        successRate: '이번달 완료율',
        explainSuccessRate: `완료된 케이스 비율을 확인할 수 있습니다.<br/> 
        표준 프로세스가 연결되어 있을 시 값이 나타납니다. `,
        caseTableSuccessRate: '완료 여부에 따른 케이스 목록을 확인할 수 있습니다. ',
        chart: '차트',
        chartName: '차트 이름',
        explainChart: '차트 설명',
        caseTable: '케이스 목록',
        associatedMenu: '연동 메뉴',
        noText: '-',
        caseSpentTime: '케이스 별 소요시간',
        explainCaseSpentTime: `소요시간 별 케이스 건수를 확인할 수 있습니다.<br/> 
        설정 아이콘을 클릭 시 소요시간 범위 및 범례 개수, 시간 단위를 설정할 수 있습니다.<br/>
        기본 범례는 전체 소요시간을 4분위 단위로 나누어 보여집니다.`,
        caseTableCaseSpentTime: '차트의 bar를 선택하고 케이스 테이블 아이콘을 클릭 시 선택된 bar의 소요시간 범위에 해당하는 케이스 목록을 확인할 수 있습니다.',
        averageSpendChart: '평균 소요시간 상위 프로세스 그룹 차트',
        explainAverageSpendChart: '평균 소요시간이 가장 높은 <a class="link" href="#help-variant-is">프로세스 그룹</a> 10개를 확인할 수 있습니다.',
        caseTableAverageSpendChart: '차트의 bar를 선택하고 케이스 테이블 아이콘을 클릭 시 선택된 bar의 프로세스 그룹에 포함된 케이스 목록을 확인할 수 있습니다.',
        associatedMenuAverageSpendChart: `<p>프로세스 흐름 분석 메뉴 : 해당 아이콘을 클릭할 시 프로세스 흐름 분석 메뉴로 이동합니다. </p>
        <p>프로세스 분석 메뉴 : 차트 목록에서 bar를 선택하고 해당 아이콘을 클릭 시 선택된 bar의 프로세스 분석 메뉴로 이동합니다.</p>`,
        spentTimeTop10: '소요시간 Top 10 케이스 구간별 소요시간',
        explainSpentTimeTop10 : `<p>소요시간 상위 케이스 10개의 목록과 구간별 소요시간을 확인할 수 있습니다. </p><br/>
        <p>목록에서 특정 케이스를 클릭할 시 해당 케이스의 구간 별 소요시간 차트를 확인할 수 있습니다.</p>`,
        caseTableSpentTimeTop10: '차트 목록에 포함된 케이스 목록을 확인할 수 있습니다.',
        associatedMenuSpentTimeTop10: '프로세스 분석 메뉴 : 차트 목록에서 케이스를 선택하고 해당 아이콘을 클릭 시 선택된 케이스의 프로세스 분석 메뉴로 이동합니다.',
        bottleNeckState: '병목 구간 현황',
        explainBottleNeckState: `구간 별 소요시간 통계를 박스플롯 차트로 확인할 수 있습니다.<br/>
        표준 소요시간이 있을 경우 표준 프로세스가 있는 구간의 데이터가 나타납니다.<br/>
        표준 소요시간이 없을 경우 평균 소요시간이 긴 상위 25개 구간의 데이터가 나타납니다.`,
        monthlyCaseCount: '케이스 추이',
        checkCaseCountForMonth: '케이스 건수 추이를 월별/일별/시간대 별로 확인할 수 있습니다.'
    },
    helpTabActivity: {
        activityTab: '액티비티 탭',
        explainActivityTab: '액티비티에 대한 통계를 확인할 수 있습니다. ',
        kpi: 'KPI',
        kpiName: 'KPI 이름',
        kpiExplain: 'KPI 설명',
        activityCount: '총 액티비티 수',
        explainActivityCount: '액티비티 건수입니다.',
        minActivityCount: '케이스 별 최소 액티비티 수',
        explainMinActivityCount: '액티비티가 제일 적은 케이스의 액티비티 건수입니다.',
        meanActivityCountByCase: '케이스 별 평균 액티비티 수',
        explainMeanActivityCountByCase: '총 케이스의 평균 액티비티 건수입니다.',
        maxActivityCount: '케이스 별 최대 액티비티 수',
        explainMaxActivityCount: '액티비티가 제일 많은 케이스의 액티비티 건수입니다.',
        chart: '차트',
        chartName: '차트 이름',
        chartExplain: '차트 설명',
        caseTable: '케이스 목록',
        associatedMenu: '연동 메뉴',
        noText: '-',
        occurCount : '액티비티 별 발생 건수',
        explainOccurCount : '액티비티 별 건수를 확인 할 수 있습니다.',
        spentTimeByActivity: '액티비티 별 소요시간',
        explainSpentTimeByActivity: `<p>액티비티 별 평균 소요시간을 확인할 수 있습니다. 표준 소요시간이 있을 경우 함께 표시됩니다. </p>
        <p>* 타임스탬프를 두 개 이상 매핑하였을 시 해당 차트에 데이터가 나타납니다.</p>`,
        activityFlow: '액티비티 추이',
        explainActivityFlow: `액티비티 별 건수 추이를 월 별/일 별/시간대  별로 확인할 수 있습니다. <br/>
        각 항목 클릭 시 그래프에서 해당 액티비티를 보이거나 숨길 수 있습니다.`,
        startActivityRatio: '시작 액티비티 비율',
        explainStartActivityRatio: `시작 액티비티 별 비율을 확인할 수 있습니다.<br/>
        표준 프로세스가 있을 시 매치되는 시작 액티비티를 확인할 수 있습니다.`,
        endActivityRatio: '종료 액티비티 비율',
        explainEndActivityRatio: `종료 액티비티 별 비율을 확인할 수 있습니다.<br/>
        표준 프로세스가 있을 시 매치되는 시작 액티비티를 확인할 수 있습니다.`
    },
    helpTabResource: {
        resourceTab: '리소스 탭',
        explainResourceTab: `<p>리소스 속성을 <a class="link" href="#help-repositorymappingselect">매핑</a>하였을 시, 리소스에 대한 통계를 확인할 수 있습니다. </p>`,
        kpi: 'KPI',
        kpiName: 'KPI 이름',
        kpiExplain: 'KPI 설명',
        allResourceCount: '총 리소스 수',
        explainAllResourceCount: '총 리소스 건수입니다.',
        resourceCountByCase: '케이스 별 최소 리소스 수',
        explainResourceCountByCase: '리소스가 제일 적은 케이스의 리소스 건수입니다.',
        meanResourceCountByCase: '케이스 별 평균 리소스 수',
        explainMeanResourceCountByCase: '총 케이스의 평균 리소스 건수입니다.',
        maxResourceCountByCase: '케이스 별 최대 리소스 수',
        explainMaxResourceCountByCase: '리소스가 제일 많은 케이스의 리소스 건수입니다.',
        chart: '차트',
        chartName: '차트 이름',
        chartExplain:'차트 설명',
        caseTable: '케이스 목록',
        associatedMenu: '연동 메뉴',
        noText: '-',
        resourceByActivity: '액티비티 별 리소스',
        explainResourceByActivity: '액티비티 별 리소스를 확인할 수 있습니다.',
        associatedMenuResourceByActivity: '데이터 분석 메뉴 : 해당 아이콘을 클릭 시 리소스에 대한 데이터 분석 메뉴로 이동합니다.',
        ratioSpendTimeOnResourceCount: '리소스 별 건수 대비 평균 소요시간',
        explainRatioSpendTimeOnResourceCount: `X축이 소요시간, Y축이 건수, 값이 리소스인 그래프입니다.<br/>
        사분면을 통해 건수에 비례하여 평균 소요시간이 높고 낮은 리소스를 확인할 수 있습니다.<br/> 
        사분면은 소요시간, 건수 각 50% 지점을 기준으로 나누어집니다.`,
        caseTableRatioSpendTimeOnResourceCount: '전체 리소스 목록을 확인할 수 있습니다.',
        occurCountByResource: '리소스 별 발생 건수',
        explainOccurCountByResource: '리소스 별 케이스 처리 건수를 확인할 수 있습니다. 건수는 내림차순으로 정렬됩니다.',
        meanSpentTimeOnResource: '리소스 별 평균 소요시간',
        explainMeanSpentTimeOnResource: `<p>리소스 별 평균 소요시간을 확인할 수 있습니다. </p>
        <p>* 타임스탬프를 두 개 이상 매핑하였을 시 해당 차트에 데이터가 나타납니다.</p> `,
    },
    helpTabOriginator:{
        originatorTab: '담당자 탭',
        explainOriginatorTab: `<p>담당자 속성을 <a class="link" href="#help-repositorymappingselect">매핑</a>하였을 시, 담당자에 대한 통계를 확인할 수 있습니다. </p>`,
        kpi: 'KPI',
        kpiName:'KPI 이름',
        kpiExplain:'KPI 설명',
        originatorCount: '총 담당자 수',
        explainOriginatorCount: '총 담당자 수입니다.',
        minOriginatorCountByCase: '케이스 별 최소 담당자 수',
        explainMinOriginatorCountByCase: '담당자가 제일 적은 케이스의 담당자 수입니다.',
        meanOriginatorCountByCase: '케이스 별 평균 담당자 수',
        explainMeanOriginatorCountByCase: '총 케이스의 평균 담당자 수입니다.',
        maxOriginatorCountByCase: '케이스별 최대 담당자 수',
        explainMaxOriginatorCountByCase: '담당자가 제일 많은 케이스의 담당자 수입니다.',
        chart: '차트',
        chartName: '차트 이름',
        chartExplain: '차트 설명',
        caseTable: '케이스 목록',
        associatedMenu: '연동 메뉴',
        noText: '-',
        originatorByActivity:'액티비티 별 담당자',
        explainOriginatorByActivity:'액티비티 별 담당자를 확인할 수 있습니다.',
        associatedMenuOriginatorByActivity: '데이터 분석 메뉴 : 해당 아이콘을 클릭 시 담당자 대한 데이터 분석 메뉴로 이동합니다.',
        ratioSpendTimeOnOriginatorCount: '담당자 별 건수 대비 평균 소요시간',
        expalinRatioSpendTimeOnOriginatorCount: `X축이 소요시간, Y축이 건수, 값이 담당자인 그래프입니다.<br/>
        사분면을 통해 건수에 비례하여 평균 소요시간이 높고 낮은 담당자를 확인할 수 있습니다.<br/>
        사분면은 소요시간, 건수 각 50% 지점을 기준으로 나누어집니다.`,
        caseTableRatioSpendTimeOnOriginatorCount: '전체 담당자 목록을 확인할 수 있습니다.',
        occurCountByOriginator: '담당자 별 발생 건수',
        explainOccurCountByOriginator: '담당자 별 케이스 처리 건수를 확인 할 수 있습니다. 건수는 내림차순으로 정렬됩니다.',
        meanSpentTimeOnOriginator: '담당자 별 평균 소요시간',
        explainMeanSpentTimeOnOriginator: `<p>담당자 별 평균 소요시간을 확인할 수 있습니다. </p>
        <p>* 타임스탬프를 두 개 이상 매핑하였을 시 해당 차트에 데이터가 나타납니다.  </p>`
    },
    helpTabCost: {
        costTab: '비용 탭',
        explainCostTab : `<p>비용 속성을 <a class="link" href="#help-repositorymappingselect">매핑</a>하였을 시, 비용에 대한 통계를 확인할 수 있습니다. </p>`,
        kpi: 'KPI',
        kpiName: 'KPI 이름',
        kpiExplain: 'KPI 설명',
        allCost: '총 비용',
        explainAllCost: '전체 케이스의 총 비용입니다.',
        caseMinCost: '케이스 최소 비용',
        explainCaseMinCost: '최소 비용이 들어간 케이스의 비용입니다.',
        caseMeanCost: '케이스 평균 비용',
        explainCaseMeanCost: '총 케이스의 평균 비용입니다.',
        caseMaxCost: '케이스 최대 비용',
        explainCaseMaxCost: '최대 비용이 들어간 케이스의 비용 입니다.',
        chart: '차트',
        chartName: '차트 이름',
        chartExplain: '차트 설명',
        caseTable: '케이스 목록',
        associatedMenu: '연동 메뉴',
        noText: '-',
        costOccurTop10Chart: '비용 발생 Top 10 케이스 구간별 비용 차트',
        explainCostOccurTop10Chart: `비용이 가장 높은 케이스 10개의 목록과 구간 별 비용 차트를 확인할 수 있습니다.<br/>
        목록에서 특정 케이스를 더블 클릭할 시 해당 케이스의 구간 별 비용 차트를 확인할 수 있습니다.`,
        caseTableCostOccurTop10Chart: '차트 목록에 포함된 케이스 목록을 확인할 수 있습니다.',
        associatedMenuCostOccurTop10Chart: '데이터 분석 메뉴 : 차트 목록에서 케이스를 선택하고 해당 아이콘을 클릭 시 선택된 케이스의 데이터 분석 메뉴로 이동합니다.',
        occurRatioByActivity: '액티비티 별 비용 발생 비율 차트',
        explainOccurRatioByActivity: '액티비티 별 발생 비용과 그 비율을 확인할 수 있습니다.',
        meanCostPerResource: `리소스 별 평균 발생 비용 차트`,
        explainmeanCostPerResource : `리소스 별 평균 발생 비용을 확인할 수 있습니다.`,
        // caseTableCostPerResource: '차트의 bar를 선택하고 케이스 테이블 아이콘을 클릭 시 선택된 bar(리소스)가 수행한 케이스 목록을 확인할 수 있습니다.',
        associatedMenuCostPerResource: '데이터 분석 메뉴 : 해당 아이콘을 클릭 시 리소스 별 비용에 대한 데이터 분석 메뉴로 이동합니다.',
        meanCostPerOriginator: `담당자 별 평균 발생 비용 차트`,
        explainmeanCostPerOriginator : `담당자 별 평균 발생 비용을 확인할 수 있습니다.`,
        // caseTableCostPerOriginator: '차트의 bar를 선택하고 케이스 테이블 아이콘을 클릭 시 선택된 bar(담당자)가 수행한 케이스 목록을 확인할 수 있습니다.',
        associatedMenuCostPerOriginator: '데이터 분석 메뉴 : 해당 아이콘을 클릭 시 담당자 별 비용에 대한 데이터 분석 메뉴로 이동합니다.',
    },
    helpTabPersonal: {
        personalTab: '개인 탭',
        explainPersonalTab: `<p>개인 탭은 내게 필요한 KPI와 차트만으로 직접 구성하여 사용할 수 있는 탭입니다.</p>
        <p>선택한 아이템들을 한 눈에 볼 수 있을 뿐만 아니라, 제목이나 타입, 색 등을 직접 설정하여 맞춤형 데이터로 확인할 수 있습니다. </p>`,
        create: '생성',
        explainCreate: `<p>개인 탭을 생성하지 않았을 경우, 대시보드 화면에 생성 버튼이 나타납니다.</p>
        <p>개인 탭에는 기본적으로 추천 아이템이 설정되어 있으며, 사용자가 직접 수정할 수 있습니다.</p>
        <p>생성 버튼을 누르면 바로 아이템을 편집할 수 있도록 편집창으로 이동합니다.</p>`,
        edit: '편집',
        explainEdit: `<p>생성한 기본 탭에서 편집 아이콘을 클릭할 시 편집창으로 이동합니다. 개인 탭은 자유롭게 수정하여 사용할 수 있습니다.</p>
        <p>오른쪽 사이드바에서 KPI 및 차트를 클릭하면 화면에 나타나며, 제목을 변경할 수 있습니다. 아이템에 따라 차트 유형과 색을 변경할 수 있습니다. </p>
        <p>화면에서 아이템의 크기나 위치를 자유롭게 설정할 수 있습니다.</p>
        <p>설정을 마치고 저장 버튼을 누르면, 개인 탭 생성이 완료됩니다.</p>`,
        editFunction : '편집 기능',
        function : '기능',
        explainFunction : '기능 설명',
        init : '초기화',
        explainInit: '기본 화면 구성으로 초기화됩니다.',
        empty: '비우기',
        explainEmpty: '빈 화면으로 전환됩니다.',
        size: '차트 정렬',
        explainSize: '아이템 영역에 맞게 차트 사이즈가 조정됩니다. ',
        save: '저장',
        explainSave: '현재 구성된 화면을 저장합니다.',
        removeTab: '탭 제거',
        explainRemoveTab: '대시보드 화면에서 개인 탭을 제거합니다.',
        exit: '나가기',
        explainExit: '변경 사항을 저장하지 않고 편집을 종료합니다.',
        item : '아이템',
        explainItem: '해당 아이템은 개인 탭에서만 확인 할 수 있습니다.',
        itemName : '아이템 이름',
        itemExplain: '아이템 설명',
        caseTable: '케이스 목록',
        associatedMenu: '연동 메뉴',
        noText: '-',
        //caseFlowChart: '케이스 추이 차트',
        //explainCaseFlowChart: '시간 흐름에 따른 케이스 건수의 추이를 확인 할 수 있습니다.',
        eventFlowChart: '이벤트 추이 차트',
        explainEventFlowChart: '액티비티 별 건수의 추이를 월별로 확인 할 수 있습니다.',
        exceedCasekPI: '표준 소요시간 초과 케이스 KPI',
        explainExceedCaseKpi: '표준 소요시간을 초과한 케이스의 수와 비율, 표준시간이 표시됩니다.',
        caseTableExceedCasekPI: '표준 소요시간을 초과한 케이스 목록을 확인할 수 있습니다.',
        caseAbnormalSpentTimeKpi:'소요시간 상위 10% 케이스 KPI',
        explainCaseAbnormalSpentTimeKpi:'전체 케이스 중 소요시간이 상위 10%에 속하는 케이스의 수와 평균 소요시간이 표시됩니다.',
        caseTableCaseAbnormalSpentTimeKpi: '소요시간이 상위 10%인 케이스 목록을 확인할 수 있습니다.',
        removePersonalTab: '개인 탭 제거',
        tabRemove: '탭 제거',
        explainTabRemove: `<p>대시보드 편집 내부에 탭 제거 버튼을 누를 시 개인 탭이 제거됩니다.</p>
        <p>필요할 경우 다시 생성할 수 있습니다.</p>`
    },

    helpDashboardEdit: {
        editDashboard:'대시보드 편집',
        explainEditDashboard: ` <p>버튼을 누르면 바로 아이템을 편집할 수 있도록 편집창으로 이동합니다.</p>
        <p>개인 탭에는 기본적으로 추천 아이템이 설정되어 있으며, 사용자가 직접 수정할 수 있습니다.</p>
        <p>오른쪽 사이드바에서 KPI 및 차트를 클릭하면 화면에 나타나며, 제목을 변경할 수 있습니다. 아이템에 따라 차트 유형과 색을 변경할 수 있습니다. </p>
        <p>화면에서 아이템의 크기나 위치를 자유롭게 설정할 수 있습니다. 설정을 마치고 저장 버튼을 누르면, 개인 탭 편집이 완료됩니다.</p>`
    },

    helpDiscovery: {
        processDiscovery: '프로세스 분석',
        explainProcessDiscovery: `<p>이벤트로그의 전체 프로세스를 한 눈에 확인할 수 있습니다.</p>
        <p>다양한 조건으로 분석해볼 수 있으며, 화면의 프로세스로 <a class="link" href="#help-standardcreateform">표준 프로세스</a>를 생성할 수 있습니다.</p>
        <p>분석 조건에서 선택할 시 병목, 반복 등의 이상 프로세스도 확인할 수 있습니다. 노드나 아크를 클릭 시 해당 케이스 테이블을 확인할 수 있습니다. </p>
        <p>분석 조건에서 옵션값으로 병목,반복을 선택하였을 경우 병목 구간 목록, 반복 액티비티 목록 아이콘이 나타납니다.</p>`,
        analysisConditionAttr: '분석 조건 속성',
        attrName: '속성 명',
        attrValue: '속성 값',
        algorithm: '알고리즘',
        explainAlgorithm: `<p>해당 메뉴에 있는 속성의 옵션 전체</p>
        <p>- 예시) Heuristics Miner, Fuzzy Miner </p>`,
        activity: '액티비티',
        explainActivity: '빈도, 소요시간(합계/최소/최대/평균/중간값), 반복',
        connectionLine: '연결선',
        explainConnectionLine: '의존도, 빈도, 소요시간(합계/최소/최대/평균/중간값), 병목 구간 ',
        additionalCondition: '추가 조건',
        explainAdditionalCondition: `케이스 검색 기능`,
        conditionValue: '조건값',
        explainConditionValue: '추가 조건 값에 따름',
        icon: '아이콘',
        iconName: '아이콘 이름',
        iconExplain: '아이콘 설명',
        ediStandardProcess: '표준프로세스 편집',
        explainEdiStandardProcess:`<p>화면의 프로세스 맵을 편집하여 <a class="link" href="#help-standard-process-is">표준 프로세스</a>를 생성할 수 있습니다.</p>
        <p>클릭 시 표준 프로세스 생성 화면으로 이동합니다.</p>`,
        seeHorizontalOrVertically: '가로로 보기/세로로 보기',
        explainSeeHorizontalOrVertically: '그래프를 가로/세로 중 선택하여 원하는 방향으로 볼 수 있습니다.',
        graphSort: '그래프 정렬',
        explainGraphSort: '그래프를 드래그하여 모양이 변경되었을 경우 원래의 그래프 모양으로 되돌릴 수 있습니다. ',
        seeOrHideMiniMap: '미니맵 숨기기/보이기',
        explainSeeOrHideMiniMap: '그래프에 대한 미니맵을 숨기거나 보일 수 있습니다.',
        simpleOrComplex: 'Simple/Complex',
        explainSimpleOrComplex: `<p>그래프에 나타나는 액티비티와 연결선을 감소시키거나 증가시켜서 각자 다른 모양의 그래프를 볼 수 있습니다.</p>
        <p>설정 화면의 프로세스 모델 항목에서 Simple/complex 버튼에 대한 값을 직접 설정할 수 있습니다.</p>`,
    },
    helpDelta:{
        processDelta:'프로세스 비교',
        explainProcessDelta: `<p><a class="link" href="#help-variant-is">프로세스 그룹</a> 두 개를 선택하여 서로 같거나 다른 프로세스를 비교할 수 있습니다.</p>
        <p> 상호적합도를 통해 두 그룹 간 적합 정도를 수치화하여 확인할 수 있습니다. </p>
        <p>분석 목록에서 두 개의 그룹을 선택하여 비교할 수 있으며, 서로 다른 프로세스는 빨간 색으로 표시됩니다. </p>`,
        analysisConditionAttr: '분석 조건 속성',
        attrName: '속성 명',
        attrValue: '속성 값',
        wayToSee: '보기 방법',
        explainWayToSee: `<p>선택한 두 프로세스 그룹을 하나의 프로세스 그래프로 합치거나 두 개로 나누어서 볼 수 있습니다.</p>
        <p>합쳐서 보기 : 선택한 두 프로세스 그룹을 하나의 프로세스 그래프로 합쳐서 비교할 수 있습니다.</p>
        <p>나눠서 보기 : 선택한 두 프로세스 그룹을 두 개의 프로세스 그래프로 나누어 비교할 수 있습니다.</p>
        <p>* 서로 다른 부분은 붉은 색으로 표시 됩니다.</p>`,
        splitView: '나눠서 보기',
        explainSplitView: '서로 다른 프로세스를 숨기거나 보일 수 있습니다. 서로 다른 프로세스는 빨간 색으로 표시됩니다.',
        combineView: '합쳐서 보기',
        analysisList: '분석 목록',
        explainAnalysisList: '선택한 두 프로세스 그룹을 하나의 프로세스 그래프로 합치거나 두 개로 나누어서 볼 수 있습니다.',
        mutualSuitability: '상호 적합도란?',
        explainMutualSuitability: '선택한 두 개의 프로세스의 일치 정도를 비율로 나타냅니다.',
        icon: '아이콘',
        iconName: '아이콘 이름',
        iconExplain: '아이콘 설명',
        seeOrHideMiniMap: '미니맵 숨기기/보이기',
        explainSeeOrHideMiniMap: '그래프에 대한 미니맵을 숨기거나 보일 수 있습니다.',
    },
    helpLogReplay:{
        processAnimation: '프로세스 애니메이션',
        explainProcessAnimation: ` <p>프로세스 진행을 토큰의 흐름으로 확인할 수 있습니다. </p>
        <p>추가 조건에서 속성을 선택할 시 해당 속성에 대한 프로세스만을 확인할 수 있습니다.</p>
        <p>화면 하단의 기능을 통해 토큰 흐름의 속도를 조절하거나 특정 일시의 흐름을 확인할 수 있습니다. </p>
        <p>토큰을 클릭 시 해당 토큰의 케이스 목록을 확인할 수 있습니다. </p>
        <p>분석 조건에서 옵션값으로 병목을 선택 하였을 경우 병목 구간 목록 아이콘이 나타납니다. 클릭 시 병목 구간에 대한 데이터를 확인할 수 있습니다.</p>`,
        analysisConditionAttr: '분석 조건 속성',
        attrName: '속성 명',
        attrValue: '속성 값',
        additionalCondition: '추가 조건(토큰 속성)',
        explainAdditionalCondition: `<p>액티비티, 케이스 아이디, 담당자*</p>
        <p>* 매핑했을 시 사용 가능</p>`,
        conditionValue: '조건값',
        explainConditionValue: '추가조건 값에 따름',
        icon : '아이콘',
        iconName: '아이콘 이름',
        iconExplain: '아이콘 설명',
        seeOrHideMiniMap: '미니맵 숨기기/보이기',
        explainSeeOrHideMiniMap: '그래프에 대한 미니맵을 숨기거나 보일 수 있습니다.',
        stopOrPlay: '정지/재생',
        explainStopOrPlay: '애니메이션을 정지하거나 재생할 수 있습니다.',
        playBar: '플레이 바',
        controlSpeed: '속도 조절',
        explainControlSpeed: '기본 속도부터 10만 배까지 속도를 조절할 수 있습니다.',
        setDate : '일시 선택',
        explainSetDate : '특정 일시로 드래그하여 토큰 흐름을 볼 수 있습니다.',
    },
    helpSocial:{
        resourceRelationAnalysis: '리소스 관계 분석',
        helpResourceRelationAnalysis: `<p>액티비티 간 혹은 리소스,담당자* 간 관계를 확인할 수 있습니다. </p>
        <p>노드를 클릭 시 해당 노드와 연결된 노드가 하이라이트되며, 해당 노드의 케이스 목록을 확인할 수 있습니다.</p>
        <p>* <a class="link" href="#help-repositorymappingselect">매핑</a> 시 사용 가능함</p>`,
        attrName: '속성 명',
        attrValue: '속성 값',
        analysisConditionAttr: '분석 조건 속성',
        wayToSee: '보기 방법',
        explainWayToSee: '그래프의 모양을 설정할 수 있습니다.',
        nodeAttr:'분석 기준(노드 속성)',
        explainNodeAttr:` <p>액티비티, 담당자*, 리소스* </p><p>* 매핑했을 시 사용 가능</p>`,
    },
    helpMatrix: {
        dataAnalysis: '데이터 분석',
        explainDataAnalysis: `<p>X축과 Y축, 값 유형을 직접 설정하여 그 결과값을 히트맵으로 확인할 수 있습니다.</p>
        <p>다양한 속성 간 관계와 빈도,소요시간을 확인하는 데에 유용합니다.</p>
        <p>셀(값)을 클릭 시 해당 셀의 케이스 테이블을 확인할 수 있습니다.</p>`,
        analysisConditionAttr: '분석 조건 속성',
        attrName: '속성 명',
        attrValue: '속성 값',
        xAxis: 'X축',
        yAxis: 'Y축',
        periodAsMonth: `<p>리소스, 담당자, 기간(월), 케이스 속성* </p>
        <p>* 매핑했을 시 사용 가능</p>`,
        explainYAxis: `<p>액티비티, 액티비티 구간, 담당자*, 리소스*</p>
        <p>* 매핑했을 시 사용 가능</p>`,
        typeOfValue: '값 유형',
        explainTypeOfValue: `<p>케이스 수, 소요시간(합계/최소/최대/평균), 사용률, 이벤트 비용*, 케이스 총 비용*</p>
        <p>* 매핑했을 시 사용 가능</p>`,
        additionalCondition: '추가 조건',
        explainAdditionalCondition: `케이스 검색 기능`,
        conditionValue: '조건값',
        explainConditionValue: '추가 조건 값에 따름',
    },
    helpDotted:{
        activityAnalysis: '액티비티 분석',
        explainActivityAnalysis: `<p>X축과 Y축, 값 유형을 직접 설정하여 결과값의 밀집도 및 흐름을 도트 차트로 확인할 수 있습니다.</p>
        <p>구분 속성을 직접 선택하여 해당 속성에 대한 결과값을 볼 수 있습니다. </p>
        <p>도트(값)을 클릭 시 해당 도트의 케이스 테이블을 확인할 수 있습니다.</p>`,
        analysisConditionAttr: '분석 조건 속성',
        attrName: '속성 명',
        attrValue: '속성 값',
        yAxis: 'Y축',
        explainYAxis: '케이스 아이디, 액티비티',
        dottAttrAsDistinguishAttr: '구분속성(도트 속성)',
        explainDottAttrAsDistinguishAttr: `<p>액티비티, 담당자*, 리소스*</p>
        <p>* 매핑했을 시 사용 가능</p>`,
    },
    helpProcessFlow:{
        processFlowAnalysis: '프로세스 흐름 분석',
        explainProcessFlowAnalysis: `<p>각 <a href="#help-variant-is" class="link">프로세스 그룹</a>의 진행 현황과 적합도를 확인할 수 있습니다.</p>
        <p>그룹을 클릭 시 해당 값의 케이스 테이블을 확인할 수 있습니다.</p>`,
        analysisConditionAttr: '분석 조건 속성',
        attrName: '속성 명',
        attrValue: '속성 값',
        legend: '범례',
        activity: '액티비티',
        sortedBy: '정렬 기준',
        explainSortedBy: '케이스 수, 시작/완료시간, 짧은/긴 기간'
    },
    helpDataSource:{
        checkDataSource:'데이터 소스의 데이터 확인하기',
        datasource: '데이터 소스',
        explainDatasource: `<p>내가 속한 <a href="#help-workspace-data-manage" class="link">워크스페이스</a>의 데이터 소스를 확인 및 생성할 수 있습니다.</p>
        <p>속한 워크스페이스가 여러 개일 시, 워크스페이스를 선택하여 데이터를 확인하고 생성할 수 있습니다. </p>
        <p>권한에 따라 정보 보기, 수정, 삭제 등이 가능합니다.</p>
        <p>데이터 소스 정보를 변경할 시 해당 데이터 소스로 생성한 <a href="#help-repositorycreateform" class="link">이벤트로그</a>가 함께 변경될 수 있을 수 있습니다.</p>
        <p>- 모바일에서는 데이터에 대한 생성,수정이 불가능하며 정보 확인만 가능합니다.  </p>`
        
    },

    helpMobile:{
        supportDevice: '지원 기기',
        supportDeviceAndDisplay: '지원 기기 및 제한 해상도',
        explainSupportDeviceAndDisplay:  `<p>IPR은 웹 브라우저 서비스로 웹 브라우저(해상도 1920 X 1080)에서 서비스 이용을 권장하고 있습니다.</p>
        <p>태블릿, 모바일에서도 서비스 이용이 가능합니다. </p>`,
        create: '생성',
        modify: '수정',
        delete: '삭제',
        edit: '편집',
        viewer: '뷰어',
        pc: 'PC',
        o: 'O',
        tablet: '태블릿',
        mobile: '모바일',
        x: 'X',
        limitedDisplay: '제한 해상도',
        explainLimitedDisplay: '기기에 따라 이용 시 해상도가 다를 수 있습니다.',
        device:'기기',
        over1920: '1920 이상',
        below1099: '1099 이하',
        below767OnlyViewerFunctionEnable:'767 이하 (뷰어 기능만 가능)'       
    },
    helpBrowsers:{
        supportBrowser: '지원 브라우저',
        browsers: 'Chrome, Edge, Firefox, Safari 브라우저',
        explainSupportBrowser: `<p>IPR은 크롬(Chrome), 엣지(Edge), 파이어폭스(Firefox), 사파리(Safari) 브라우저를 지원합니다.</p>
        <p>IPR에서는 크롬(Chrome) 브라우저를 권장하고 있습니다.</p>`,
        edge: 'Edge',
        chrome: 'Chrome',
        firefox: 'Firefox',
        safari: 'Safari'
    }
};

export default helpTranslation;
