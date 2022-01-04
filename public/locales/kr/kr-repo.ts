const repoTranslation = {
  repo: {
    label: {
      datasetName: '데이터셋 이름',
      datasetRowNum: '원본 데이터셋 행 수',
      otherRowNum: '필터된 데이터 행 수',
      eventName: '이벤트로그 이름',
      loading: '데이터를 불러오는 중',
      checking: '유효성 검증중입니다.',
      waitting: '잠시만 기다려주세요',
      complete: '유효성 검증이 완료 되었습니다.',
      completeClick: '완료 버튼을 눌러주세요.',
      confirm: '데이터를 다시 확인해주십시오.',
      mapping: '재매핑 버튼을 눌러 새로운 매핑 작업을 해주세요.',
      creator: '생성자',

      // 완료화면
      filter: '데이터 필터',
      filterExplanation: '불러온 데이터에서 분석에 사용할 특정값을 선택합니다. 각 필드의 여러 값 중 분석에 필요한 값만 선택하여 필요한 데이터 셋을 도출할 수 있습니다.',
      /* 수정됨 */dashboard: '데이터 요약',
      dashboardExplanation: '생성된 이벤트로그의 데이터 요약 메뉴로 이동하여 대시보드를 확인할 수 있습니다.',
      analysis: '프로세스 분석',
      analysisExplanation: '생성된 이벤트로그의 프로세스 분석 메뉴로 이동하여 프로세스를 분석할 수 있습니다.',
      management: '데이터 관리 목록',
      managementExplanation: '데이터 관리 목록으로 이동합니다.',

      all: '전체',
      back: '돌아가기',

      // 데이터셋 수정
      datasetDescription: '데이터셋 설명',
      classifier: '구분',
      fileName: '파일 이름',
      number: '총 건수',
      relDataset: '관련 데이터셋',

      // 데이터셋 생성 - 생성 과정 1 - 데이터 정보 입력 - 테스트 form
      testSuccess: '테스트에 성공하였습니다.',
      testFailure: '테스트에 실패하였습니다.',
      testWrong: '입력값이 잘못되었습니다.',
      testName: '이름',
      testDivision: '구분',
      testUse: '선택된 테이블/뷰를 사용',
      testClose: '닫기',
      sample: '샘플데이터',
      chooseFileUpload: '파일업로드 선택',

      file: '파일',
      database: '데이터베이스',
      databaseName: '데이터베이스 이름',

      required: '필수사항',
    },
    // 각 메뉴마다 사용하는 폼들 여기다 모아놓기
    form: {
      dataset: '데이터셋',
      repository: '이벤트로그',
      subRepository: '서브 이벤트로그',
      originalInfo: '원본 정보',
      processInfo: '표준 프로세스 정보',
      processCreate: '표준 프로세스 생성',
      processModify: '표준 프로세스 수정',
      processName: '표준 프로세스 이름',
      processDesc: '표준 프로세스 설명',
      addRepo: '이벤트로그 추가',
      selectRepo: '이벤트로그 등록',
      datasetRepo: '데이터셋 - 이벤트로그',
      selectedDatasetRepo: '등록된 데이터셋 - 이벤트로그',

      standardProcess: '표준 프로세스',
      registeredStandardProcess: '등록된 표준 프로세스',

      relatedRepo: '등록된 이벤트로그',
      processEdit: '프로세스 편집',
      processEditSelectRepo: '자동 편집 : 이벤트로그 선택',
      selectDataset: '데이터셋 선택',

      // placeholder
      putProcessName: '프로세스 이름을 입력하세요.',
      putProcessDesc: '프로세스 설명을 입력하세요.',
      putDatasetDesc: '데이터셋 셜명을 입력하세요',
      searchMinLength: '3글자 이상 입력하세요.',
      // filter
      all: '전체',

      sourceDataInformation: '데이터셋 정보',
      sourceDataName: '데이터셋 이름',
      pleaseEnter: '데이터셋 이름을 입력하세요',
      sourceDataDescription: '데이터셋 설명',
      pleaseEnterDesc: '데이터셋 설명을 입력하세요',
      eventLog: '이벤트로그',
      eventLogName: '이벤트로그 이름',
      eventLogNameEnter: '이벤트로그 이름을 입력하세요',
      eventLogDesc: '이벤트로그 설명',
      eventLogDescEnter: '이벤트로그 설명을 입력하세요',

      subEventLogNameEnter: '서브 이벤트로그 이름을 입력하세요',
      subEventLogDescEnter: '서브 이벤트로그 설명을 입력하세요',

      fileUploadType: '데이터 업로드 방식',
      fileUpload: '파일 업로드',
      dataSourceConn: '데이터베이스 연결',
      dataSource: '데이터 소스',
      dataSourceChoice: '데이터 소스 선택',
      dataSourceImport: '데이터 소스 가져오기',
      write: '직접 입력',
      create: '생성자',
      dataSourceName: '데이터 소스 이름',
      test: '테스트',
      testConn: '테스트 (연결 성공)',
      confirm: '데이터 업로드',
      cancel: '취소',
      userInput: '사용자 입력값',
      division: '구분',
      fileName: '파일 이름',

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
      dataList: '데이터 목록',
      saveChanges: '수정',
      select: '선택',
      selectedDB: '데이터베이스 선택',
      selectTable: '테이블을 선택하세요',
      syncTable: '동기화 테이블',
      tablePk: '동기화 기준 칼럼',
      tableTs: '시간 필드 ',
      syncToggle: '동기화',
      syncRule: '동기화 규칙',
      syncSchedule: '동기화 일정',
      syncDayList: '동기화 일',
      syncStartTime: '동기화 시작시간',
      selectField: '필드 선택하세요',
      selectTime: '시간 선택하세요',
      syncTitle: '동기화 일정 설정',
      syncScheduleOptions: {
        daily: '일간',
        weekly: '주간',
      },
      syncRuleOptions: {
        append_only: 'Append Only',
        replace_all: 'Replace All',
        replace_diff: 'Replace Difference',
      },
      days: {
        mon: '월',
        tue: '화',
        wed: '수',
        thu: '목',
        fri: '금',
        sat: '토',
        sun: '일',
      },

      //datasource placeholder
      putDataSourceName: '데이터 소스 이름 입력하세요',
      putHostName: '데이터베이스 Host 입력하세요',
      putPort: '데이터베이스 Port 입력하세요',
      putUsername: '데이터베이스 Username 입력하세요',
      putPassword: '데이터베이스 Password 입력하세요',
      putDatabase: '데이터베이스 이름 입력하세요',
      putSchema: '데이터베이스 스키마 입력하세요',

      // cancel:'취소',

      // workspace
      workspaceName: '워크스페이스',

      fileupload: '파일업로드',
      databaseSelection: '데이터베이스 선택',

      databaseSyncGuide: '데이터 동기화 기능은 데이터 소스 관리 화면에서 사용할 수 있습니다.',
      testing: '테스트 중...',
      testSuccess: '테스트에 성공하였습니다.',
      testFailed: '테스트에 실패하였습니다.',
      testGuide: '테스트를 진행하세요.',
    },
    list: {
      dataset: '데이터셋',
      lastUpdated: '마지막 업데이트',
      create: '생성자',
      totalEvent: '이벤트로그 수',
      delete: '삭제',
      update: '정보 보기',
      dataFilter: '데이터 필터',
      eventFilter: '이벤트 필터',
    },
    create: {
      datasetCreate: '데이터셋 생성',
      datasetCreationSteps: '데이터셋 생성 과정',
      datasetInfoSteps: '데이터 정보 입력',
      process1title: '데이터셋 업로드', //수정
      process1label: '파일 업로드 혹은 데이터베이스 연동을 통해 분석하고자 하는 데이터를 앱으로 볼러옵니다.',
      process2title: '데이터 필터 (옵션)',
      process2label: '불러온 데이터에서 분석에 사용할 특정값을 선택합니다. 각 필드의 여러 값 중 분석에 필요한 값만 선택하여 필요한 데이터 셋을 도출할 수 있습니다.',
      process3title: '데이터셋 매핑',
      process3label: '생성된 데이터셋을 매핑하여 이벤트로그를 생성합니다. 매핑 속성과 데이터의 필드를 어떻게 연결하는지에 따라 분석의 관점과 결과가 달라질 수 있습니다.',
      process3labelRepo: '선택된 데이터셋을 매핑하여 이벤트로그를 생성합니다. 매핑 속성과 데이터의 필드를 어떻게 연결하는지에 따라 분석의 관점과 결과가 달라질 수 있습니다.',
      process4title: '완료',
      process4label: '데이터셋 생성이 완료됩니다. 데이터셋 목록으로 이동할 수 있습니다. 데이터 매핑까지 완료하였을 경우 이벤트로그도 함께 생성됩니다. ',
      process4labelRepo: '이벤트로그 생성이 완료됩니다. 해당하는 데이터셋이 선택된 이벤트로그 목록으로 이동할 수 있습니다. ',
      doNotDay: '하루동안 보이지 않기',
      flowbox: {
        standard: {
          title: '표준 프로세스 생성 과정',
          create: {
            title: '표준 프로세스 정보 입력',
            content: '표준 프로세스를 생성합니다. 표준이 되는 프로세스로, 여러 종류의 분석에 적용될 수 있습니다.',
          },
          editor: {
            title: '표준 프로세스 작성',
            content: '표준 프로세스를 편집할 수 있습니다. 프로세스 편집으로 이동합니다.',
          },
          complete: '표준 프로세스 생성이 완료됩니다. 목록으로 돌아갑니다.',
        },
      },
      next: '다음',

      //Flowbox(경림)
      flowboxEventInput: {
        title: '이벤트로그 정보 입력',
        content: '생성할 이벤트로그 정보를 입력합니다.',
      },
      flowboxEventFilter: {
        title: '이벤트 필터',
        content: '선택한 이벤트로그에 여러 필터를 사용하여 유동적인 결과를 확인할 수 있습니다. 하나의 이벤트로그에 대한 다양한 결과값을 저장하게에 효과적입니다.'
      },
    },
    upload: {
      loadingData: '파일을 업로드 하는 중입니다.',
      wait: '잠시만 기다려주세요.',
    },
    import: {
      loadingData: '데이터를 불러오는 중입니다.',
      wait: '잠시만 기다려주시거나 다른 작업을 진행하세요.',
      process: '데이터를 정상적으로 처리하였습니다.',
      next: '다음 진행을 원할 시 다음 버튼을 눌러주세요.',
      confirm: '데이터 업로드에 실패하였습니다.',
      back: '뒤로가기',
      mappingBack: '뒤로가기 버튼을 눌러 데이터를 다시 확인해주십시오. ',
      /*추가됨*/mappingBackPreview: '이전 버튼을 눌러 데이터를 다시 확인해주십시오. ',
    },
    // 각 메뉴마다 사용하는 버튼들 여기다 모아놓기
    button: {
      yes: '예',
      no: '아니오',
      select: '선택',
      create: '생성',
      modify: '수정',
      delete: '삭제',
      download: '다운로드',
      export: '내보내기',

      ok: '확인',
      save: '저장',
      saveForm: '정보 저장',
      deploy: '배포',
      deployCancel: '배포 취소',
      cancel: '취소',
      exit: '나가기',
      test: '테스트',
      close: '닫기',

      processEdit: '프로세스 편집',
      editBySelf: '수동 편집',
      editByRepo: '자동 편집',
      edit: '편집',

      next: '다음',
      complete: '완료',
      remapping: '재매핑',

      back: '뒤로가기',

      search: '검색',

      before: '이전',

      //datasource create button
      dbCreate: '연결 생성',
      createEvent: '이벤트로그 생성',
      dSchedule: '동기화 삭제',

      //repositoryfilter
      apply: '적용',
      reset: '리셋',
    },
    multiSelect: {
      select: '선택',
      download: '다운로드',
      delete: '삭제',
      cancel: '취소',
    },
    cardDropDown: {
      download: '다운로드',
      modify: '수정',
      delete: '삭제',
    },
    demo: {
      dataset: '샘플 데이터',
      finance: '금융대출', //'재무 데이터',
      healthcare: '병원진료', //'진료 데이터',
      machinerepair: '설비보전', //'설비 데이터',
      manufacture: '기준정보', //'생산 데이터',
      portlogistics: '항만물류', //'항만물류 데이터',
      shopping: '영업관리', //'온라인수주 데이터'
      invoice: '제품판매', //'제품판매'
    },
    project: {
      title: '내 프로젝트',
      sampletitle: '샘플 프로젝트',
      pminingStudyTitle: '프로세스 마이닝 알아보기',
      modal: {
        createTitle: '프로젝트 생성',
        modifyTitle: '프로젝트 수정',
        projectName: '프로젝트 이름',
        projectNamePlaceHolder: '프로젝트 이름을 입력하세요',
        projectDesc: '프로젝트 설명',
        projectDescPlaceHolder: '프로젝트 설명을 입력하세요',
        addEvent: '이벤트로그 추가',
        registerEvent: '이벤트로그 등록',
        selectGroup: '그룹 선택',
        all: '전체',
        groupAndEvent: '그룹 - 이벤트',
        registedGroupAndEvent: '등록된 그룹 - 이벤트',
        registerHelp: '',
      },
    },
    event: {
      eventGroup: {
        title: '그룹',
        modal: {
          createTitle: '그룹 생성',
          groupName: '그룹 이름',
          groupNamePlaceHolder: '그룹 이름을 입력하세요',
          groupDesc: '그룹 설명',
          groupDescPlaceHolder: '그룹 설명을 입력하세요',
          fileUpload: '파일 업로드',
          upload: '업로드',
          fileUploadHelp: '파일(파일의 데이터가 1건 이상이며 인코딩이 UTF로 설정되어 있을 시 업로드 가능합니다) (*)',

          createEvent: '이벤트로그 생성',
          createEventHelp: '(※ MXML 또는 XES 파일 업로드 시 이벤트로그 자동 생성 여부를 선택할 수 있습니다.)',

          selectFile: '파일을 선택하세요',
          fileSearch: '파일 찾기',
          fileErrorMessage: {
            csv: '파일을 선택하세요. 파일 형식은 csv 이어야 합니다.',
            xlsx: '파일을 선택하세요. 파일 형식은 xlsx 또는 xls 이어야 합니다.',
            mxml: '파일을 선택하세요. 파일 형식은 mxml 또는 mxml.gz 이어야 합니다.',
            xes: '파일을 선택하세요. 파일 형식은 xes 또는 xes.gz 이어야 합니다',
          },
          rowIndex: '제목 표시 줄',
          delimeter: '구분문자 (*)',
          delimeterPlaceHolder: '구분자를 입력하세요.',
          delimeterValidation: '구분자를 입력하세요. 4 글자까지의 구분자가 가능합니다.',
          completeModal: {
            title: '그룹 생성 완료',
            msg1: '파일 업로드 성공하였습니다.',
            msg2: ' 이 생성 되었습니다.',
            complete: '완료',
            createEvent: '이벤트로그 생성',
          },
          modifyTitle: '정보 보기',
          modifyModalTitle: '데이터셋 정보',
          fileName: '파일 이름',
          infoTitle: '그룹 정보',
        },
      },
      eventLog: {
        title: '이벤트로그',
        createBtn: '이벤트로그 생성',
        modal: {
          createTitle: '이벤트로그 생성',
          eventName: '이벤트로그 이름',
          eventNamePlaceHolder: '이벤트로그 이름을 입력하세요',
          eventDesc: '이벤트로그 설명',
          eventDescPlaceHolder: '이벤트로그 설명을 입력하세요',
          selectProcess: '표준 프로세스 선택',
          none: '없음',

          modifyTitle: '이벤트로그 정보 보기',
          infoTitle: '이벤트로그 정보 보기',
          mappingMatchList: '매핑 매칭 목록',
          caseId: '케이스 아이디',
          activity: '액티비티',
          startTime: '시작시간',
          endTime: '종료시간',
          originator: '담당자',
          resource: '리소스',
          caseProperty: '케이스 속성',
          eventProperty: '이벤트 속성',
          useTime: '운영시간',

          eventCost: '이벤트 비용',
          caseAllCost: '케이스 총 비용',
        },
      },
      mapping: {
        eventName: '이벤트로그 이름',
        standardProcess: '표준 프로세스',

        doSelect: '선택하세요',
        wrongDateFormat: '잘못된 시간 형식입니다.',

        selectedAll: '전체 선택함',

        select: {
          caseId: '케이스 아이디',
          activity: '액티비티',
          startTime: '시작 시간',
          endTime: '종료 시간',
          originator: '담당자',
          resource: '리소스',
          eventCost: '이벤트 비용',
          caseAllCost: '케이스 총 비용',
          caseProperty: '케이스 속성',
          eventProperty: '이벤트 속성',
        },

        testResult: {
          isValidating: '유효성 검증 중입니다.',
          wait: '잠시만 기다려 주시길 바랍니다.',

          recheckData: '데이터를 다시 확인해주세요.',
          clickRemappingBtn: '다시 만들기 버튼을 눌러주세요.',
          newMappingNeeded: '새로운 매핑 작업이 필요합니다.',

          validationCompleted: '유효성 검증을 완료하였습니다.',
          clickCompleteBtn: '완료 버튼을 눌러주세요.',
          completeBtnNeeded: '완료 버튼을 누르셔야 매핑이 완료됩니다.',
        },

        errorResult: {
          wrongDateFormat: '날짜 형식이 잘못되었습니다.',
          noAcceptNull: 'null은 허용하지 않습니다.',
          noAcceptBlank: '빈 값은 허용하지 않습니다.',
          thereIsError: ' 에 에러가 있습니다.',
        },

        moveAfterTest: {
          title: '이벤트로그 생성 완료: 페이지 이동',
          dashboard: '데이터 요약',
          processAnalysis: '프로세스 분석',
          cancel: '이벤트',
        },
      },
    },
    standard: {
      title: '표준 프로세스',
      toolTitle: '툴',
      inspectorTitle: '편집',
      activityName: '액티비티 이름',
      sourceActivityName: '시작 액티비티 이름',
      targetActivityName: '종료 액티비티 이름',
      required: '필수 여부',
      timeValue: '표준 시간',
      timeUnit: '시간 단위',
      sec: '초',
      min: '분',
      hour: '시',
      day: '일',
      validate: {
        // 유효성 검사
        startConnectByTarget: "'START'에 도착하는 연결선 있음",
        endConnectBySource: "'END'에서 출발하는 연결선 있음",
        unConnectedActivity: '연결되지 않은 액티비티가 있음: ',
        unConnectedActivityAtSource: '이전 액티비티와 연결되지 않은 액티비티가 있음: ',
        unConnectedActivityAtTarget: '다음 액티비티와 연결되지 않은 액티비티가 있음: ',
        emptyNameActivity: '이름이 비어있는 액티비티가 있음',
        activityNameisStart: "'START'란 이름을 가진 액티비티가 있음",
        activityNameisEnd: "'END'란 이름을 가진 액티비티가 있음",
        activityNameBendRule: '이름 규칙에 맞지 않은 액티비티가 있음: ',
        activityTimeValueNotNumber: '숫자가 아닌 소요시간 기준값을 가진 액티비티가 있음: ',
        activityTimeValueNotOverZero: '소요시간 기준값이 0 보다 작은 액티비티가 있음: ',
        linkUnConnectedSource: '이전 액티비티와 연결하지 않은 연결선이 있음: ',
        linkUnConnectedTarget: '다음 액티비티와 연결하지 않은 연결선이 있음: ',
        linkHaveFromStartToEnd: "'START' 와 'END' 액티비티를 연결하는 연결선 있음",
        linkTargetIsStart: "'START' 액티비티가 다음 액티비티로 연결된 연결선이 있음: ",
        linkSourceIsEnd: "'END' 액티비티가 이전 액티비티로 연결된 연결선이 있음: ",
        linkTimeValueNotNumber: '숫자가 아닌 소요시간 기준값을 가진 연결선이 있음: ',
        linkTimeValueNotOverZero: '소요시간 기준값이 0 보다 작은 연결선이 있음: ',
        onlyStartEnd: "표준 프로세스에 'START'와 'END' 액티비티만 있음",
        duplatedActiviy: '중복된 액티비티 이름이 있음: ',
        duplatedLink: '중복된 연결선이 있음: ',
        noHaveActivity: '등록된 액티비티가 없음',
        noHaveLink: '최소 2개의 연결선이 필요함',
        haveLinkButNotConn: '최소 2개의 연결선이 제대로 연결되어 있어야 함',
        // inspector
        lessThenZero: '0 보다 작습니다.'
      },
    },
    //데이터소스
    datasource: {
      title: {
        index: '데이터 소스',
        create: '연결 속성 생성',
        modify: '연결 속성 수정',
        default: '연결 속성 정보',
      },
      type: {
        psql: 'PostgreSQL',
        postgres: 'PostgreSQL',
        postgresql: 'PostgreSQL',
        oracle: 'Oracle',
        mysql: 'MySQL',
        mssql: 'MSSQL',
        mariadb: 'MariaDB',
      },
      validation: {
        nameLength: '데이터 소스명은 최소 3글자입니다.',
        duplicateName: '같은 이름의 데이터 소스가 있습니다.',
        onlyNumber: '숫자만 입력 가능합니다.',
        mustTest: '테스트 성공 시 선택할 수 있습니다.',
        testFailed: '테스트에 실패하였습니다.',
        testSuccess: '테스트에 성공하였습니다.',
        tableNotFound: 'FATAL: Table not found.',
      },
    },
    // 툴팁
    tooltip: {
      undo: '실행 취소',
      redo: '다시 실행',
      clear: '초기화',
      exportSvg: 'SVG로 내보내기',
      exportPng: 'PNG로 내보내기',
      fullscreen: '전체화면',
      toFront: '맨 앞으로 가져오기',
      toBack: '맨 뒤로 보내기',
      graphLayout: '그래프 정렬',
      zoomToFit: '한번에 보기',
      graphValidate: '유효성 검사',
    },
    // 필요한 alert 메세지 여기다 모아놓기
    alert: {
      button: {
        modify: '수정',
      },
      title: {
        datasetModify: '데이터셋 수정',
        save: '저장',
        complete: '완료',
        validate: '유효성 검사',
        validateFailed: '유효성 검사 실패',
        cantCreateTitle: '생성 불가',
        cantModifyTitle: '수정 불가',
        delete: '삭제',
        info: '알림',
        alarm: '경고',
        noPermission: '권한 없음',
        deleteCache: '캐시 삭제',
        success: '성공',
        failed: '실패',
        error: '에러',
      },
      wantToEdit: '수정하시겠습니까?',
      selectDataSource: '데이터소스를 선택해주세요',
      eventLogMappingError: '이벤트로그 매핑 중 에러가 발생했습니다.', //(경림)

      registerHelp: '※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.',
      registerHelpButton: '※ 버튼을 이용하여 등록할 수 있습니다.',

      notMapping: '매핑을 진행하지 않을 시 이벤트로그가 생성되지 않습니다. 종료하시겠습니까?',

      graphValidateSuccess: '그래프 유효성 검사에 성공하였습니다.',
      graphValidateFailButSave: '그래프 유효성 검사에 실패하였습니다.\n그래도 저장하시겠습니까?',
      deployedGraphModify: '배포 중인 표준 프로세스를 변경하시겠습니까?\n(※ 연결된 이벤트에 변경된 표준 프로세스가 적용됩니다.)',
      graphSaved: '표준 프로세스를 저장하였습니다.',
      graphDeployed: '표준 프로세스를 배포하였습니다.',
      graphDeployCancel: '표준 프로세스를 배포 취소하시겠습니까?',
      graphDeployCanceled: '표준 프로세스를 배포 취소하였습니다.',
      deployFailByValidate: '그래프 유효성 검사에 실패하여 배포할 수 없습니다.',
      minQualFail: '표준 프로세스 최소 조건을 만족하지 못하였습니다.',
      notSaveModifiedGraph: '수정된 프로세스를 저장하지 않았습니다.',
      noPermission: '해당 기능에 대해 권한이 없습니다.',
      canMoveDragAndButton: '※ 마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다.',
      onlyOneSelect: '하나의 이벤트만 선택 가능합니다.',
      eventHaveProcess: '해당 이벤트에 이미 연결된 표준 프로세스가 있습니다.\n현재 표준 프로세스로 변경하시겠습니까?',
      sameNameProcess: '같은 이름의 표준 프로세스가 있습니다.',
      nameLengthProcess: '표준 프로세스 명은 최소 3글자 이상입니다.',
      selectWorkspace: '데이터 생성 시 지정 워크스페이스(전체 워크스페이스 제의)가 필요합니다. 워크스페이스를 선택해주세요.',
      limitCount: '최대 개수를 초과하여 생성할 수 없습니다.\n생성 가능한 개수는 {count}개 입니다.',
      // ipr error code
      IPR_ERR_403_01900201: 'IPR-API: 데이터 사용량을 초과하여 생성할 수 없습니다.',
      IPR_ERR_409_00000001: 'IPR-API: 중복된 이름입니다.',

      // error 처리를 하려다 없어 보여 추가함
      SSO_ERR_500_00010001: 'IPR-SSO: 인터넷 서버 오류', //Internal server error',
      SSO_ERR_400_00010002: '값을 입력하지 않았거나 NULL을 포함하고 있습니다.', //Input is null or empty',
      SSO_ERR_400_00010003: '입력값이 잘못되었습니다.', //Input is not logically appropriate',
      SSO_ERR_404_00010004: 'IPR-SSO: 찾을 수 없음', //Not found',
      SSO_ERR_400_00020001: '이미 등록된 사용자입니다.', //User already exists',
      SSO_ERR_400_00020002: '이미 등록된 이메일입니다.', //Email already exists',
      SSO_ERR_400_00020003: 'IPR-SSO: 코드가 일치하지 않습니다', //Code does not match',
      SSO_ERR_400_00020004: 'IPR-SSO: 비밀번호 찾기가 일치하지 않습니다.', //Forgot password does not match',
      SSO_ERR_400_00020005: 'IPR-SSO: 확인된 비밀번호가 일치하지 않습니다', //Confirmed password does not match',
      SSO_ERR_400_00020006: 'IPR-SSO: 사용자가 이메일 주소를 확인하지 않음',
      SSO_ERR_401_00020007: 'IPR-SSO: 로그인 자격 증명을 찾을 수 없습니다',
      SSO_ERR_404_00020008: 'IPR-SSO: 사용자를 찾을 수 없음',
      SSO_ERR_500_00020009: 'IPR-SSO: 리디렉션 URL을 생성하지 못했습니다.',
      SSO_ERR_400_00030001: 'IPR-SSO: 그룹 키가 이미 있습니다.',
      SSO_ERR_400_00030002: '그룹에 이미 등록된 사용자입니다.',
      SSO_ERR_404_00030003: 'IPR-SSO: 그룹을 찾을 수 없음',
      SSO_ERR_500_00040001: '이메일 전송에 실패하였습니다.',
      SSO_ERR_400_00050001: 'IPR-SSO: 토큰이 잘못되었습니다.',
      SSO_ERR_400_00050002: 'IPR-SSO: 사용자 자격 증명이 잘못되었습니다.',
      SSO_ERR_400_00050003: 'IPR-SSO: 클라이언트 자격 증명이 잘못되었습니다.',
      SSO_ERR_400_00050004: 'IPR-SSO: 활성 플래그가 false입니다.',
      SSO_ERR_400_00050005: 'IPR-SSO: SSO 서버 통신 실패',
      SSO_ERR_403_00060001: '그룹에 등록할 수 있는 사용자 수를 초과하였습니다.',
      SSO_ERR_404_00060002: 'IPR-SSO: 라이센스를 찾을 수 없음',
      SSO_ERR_404_00060003: 'IPR-SSO: 데모 라이센스 ID를 찾을 수 없습니다.',
      SSO_ERR_404_00070001: 'IPR-SSO: 라이선스 활성화를 찾을 수 없음',
      SSO_ERR_404_00080001: 'IPR-SSO: 권한을 찾을 수 없음',
      SSO_ERR_404_00090001: 'IPR-SSO: 권한을 찾을 수 없음',
      SSO_ERR_403_00100001: 'IPR-SSO: 이 계정에는 관리자 역할이 없습니다.',
      SSO_ERR_404_00100002: 'IPR-SSO: 역할을 찾을 수 없음',
      SSO_ERR_404_00110001: 'IPR-SSO: 원격 측정을 찾을 수 없음',
      SSO_ERR_502_00120001: 'IPR-SSO: SSO-클라이언트 통신 실패',
      SSO_ERR_502_00130001: 'IPR-SSO: KMS 통신 실패',
      SSO_ERR_502_00140001: 'IPR-SSO: IPR 서비스 통신 실패',
      SSO_ERR_404_00150001: 'IPR-SSO: 승인 내역을 찾을 수 없습니다.',
      IPR_OK_200: 'IPR-API: 성공',
      IPR_OK_200_00000001: 'IPR-API: 성공적으로 처리되었지만 결과가 반환되지 않았습니다.',
      IPR_ERR_401_00900001: 'IPR-API: 승인되지 않은 오류',
      IPR_ERR_401_00900002: 'IPR-API: 승인되지 않은 오류입니다. 디버그 메시지를 참조하십시오.',
      IPR_ERR_401_01900101: '해당 데이터에 대한 접근 권한이 없습니다.',
      IPR_ERR_401_01900102: 'IPR-API: 계정에 리소스 액세스 권한이 없습니다.',
      IPR_ERR_401_01900103: 'IPR-API: 계정에 리소스 액세스 권한이 없습니다.',
      SSO_ERR_403_00020010: 'IPR-SSO: 계정이 비활성화되었습니다.',
      IPR_ERR_413_00030001: '프로세스 모델의 데이터 용량이 커서 오류가 발생하였습니다.',
      IPR_OK_200_00010201: '이벤트로그 매핑 중 오류가 발생하였습니다.',
      IPR_ERR_200_00010201: '이벤트로그 매핑 중 오류가 발생하였습니다.',
      IPR_ERR_503_00910001: 'IPR-API: 피어를 사용할 수 없음(예: 외부 데이터베이스 오류)',
      IPR_OK_204_00010101: '업로드한 데이터에 컬럼이 한 개 이하입니다. ',
      IPR_ERR_204_00010101: '업로드한 데이터에 컬럼이 한 개 이하입니다. ',
      IPR_ERR_500: '서버에 오류가 발생하였습니다.',

      HTTP_500: 'HTTP Status 500 - 내부 서버 오류',

      '500 INTERNAL_SERVER_ERROR': '내부 서버 오류입니다.',

      unknownError: '알 수 없는 에러',

      deleteAllFilter: '현재 적용된 필터를 모두 삭제하시겠습니까?',
      cancelEventFilter: '서브 이벤트로그 만들기를 취소 하시겠습니까?',
      filterDurationZero: "선택 된 필터 기간은 0초 입니다. 입력 기간 확인 하세요",
      startIsAfterEnd: "시작 일시가 종료 일시보다 나중으로 설정되었습니다.",
      startEndFilterNotSelected: "시작점 및 종료점 필터에 시작점 또는 종료점이 선택되지 않았습니다.",
      attributeFilterNotSelected: "속성 필터에 속성이 선택되지 않았습니다.",
      variantFilterNotSelected: "프로세스 그룹 필터에 프로세스 그룹이 선택되지 않았습니다.",
      
      noEventRegistered: '등록된 이벤트로그가 없습니다.',

      selectFile: '파일을 선택하세요.',
      fileSizeCheck: '파일 건수가 {count}건을 초과합니다.',
      groupCreateCheck: '구분문자가 잘못되거나 컬럼 수가 한개입니다.',

      sameNameProject: '같은 이름의 프로젝트가 있습니다.',
      sameNameEventGroup: '같은 이름의 데이터셋이 있습니다.',
      sameNameEvent: '같은 이름의 이벤트가 있습니다.',

      regexTest: '잘못된 이름입니다. 한글, 영어, 숫자만 입력해주세요.',
      blankTest: '이름에 공백만 있습니다.',
      letterTest: '3글자 이상 입력해주세요.',
      emptyTest: '빈값을 입력할 수 없습니다.',
      firstBlankTest: '첫 자리는 공백이 올 수 없습니다',

      noProcess: '(표준 프로세스가 없거나 배포중이 아닙니다)', //(배포된 프로세스 없음)
      eventCount: '이벤트 수',

      cancel: '취소하시겠습니까?',

      selectDataset: '데이터셋을 선택해주세요.',
      selectProcess: '표준 프로세스를 선택해주세요.',
      selectDatasource: '데이터 소스를 선택해주세요.',

      projectDelete: {
        title: '프로젝트 삭제',
        content: '프로젝트를 삭제하시겠습니까?',
        noSelect: '선택한 프로젝트가 없습니다.',
      },

      projectCreate: {
        msg: '프로젝트는 {count} 개 까지 생성 가능합니다.',
      },

      groupDelete: {
        title: '데이터셋 삭제',
        content: '데이터셋을 삭제하시겠습니까?',
        noSelect: '선택한 데이터셋이 없습니다.',
      },

      groupCreate: {
        msg: '데이터셋 생성은 {count}개로 제한되어 있습니다.',
      },

      eventDelete: {
        title: '이벤트로그 삭제',
        content: '이벤트로그를 삭제하시겠습니까?',
        noSelect: '선택한 이벤트로그가 없습니다.',
      },

      eventCreate: {
        wholeMsg: '전체 이벤트로그 생성은 총 {count}개로 제한되어 있습니다.',
        perGroupMsg: '그룹 당 이벤트로그 생성은 {count}개로 제한되어 있습니다.',
        nameLengthEvent: '3자리 이상 입력해주세요',
      },

      eventModify: {
        title: '이벤트로그 수정',
        content: '이벤트로그를 수정하시겠습니까?',
      },

      bookmark: {
        remove: {
          title: '북마크 해제',
          content: '북마크가 해제되었습니다.',
          confirm: '해당 북마크를 해제하시겠습니까?',
        },
        add: {
          button: '북마크 등록',
          title: '북마크 등록',
          content: '북마크가 등록되었습니다.',
        },
      },

      notification: {
        remove: {
          title: '알림 삭제',
          contentRemoveAll: '모든 알림을 삭제하시겠습니까? 알림을 삭제해도 작업은 계속 진행됩니다.',
          contentRemoveOne: '해당 알림을 삭제하시겠습니까? 알림을 삭제해도 작업은 계속 진행됩니다.',
        },
      },

      standard: {
        list: {
          notHave: '등록된 표준 프로세스가 없습니다.',
        },
        modify: {
          title: '표준 프로세스 수정',
          content: '표준 프로세스를 수정하시겠습니까?',
          successContent: '표준 프로세스를 수정하였습니다.',
        },
        delete: {
          title: '표준 프로세스 삭제',
          content: '표준 프로세스를 삭제하시겠습니까?\n(기본 표준 프로세스도 같이 삭제됩니다.)', //2021.12.14 변경 사항 (장유정)
          noSelectedContent: '선택한 표준 프로세스가 없습니다.',
        },
      },

      datasource: {
        create: {
          title: '연결 속성 생성',
          content: '연결된 데이터 소스를 생성하였습니다.',
        },
        getInfo: {
          title: '연결 속성 정보',
        },
        delete: {
          title: '연결 속성 삭제',
          warningContent: '현재 데이터 소스에 연결된 모든 데이터가 삭제됩니다. 삭제하시겠습니까? ',
          successContent: '연결된 데이터 소스를 삭제하였습니다.',
        },
        edit: {
          title: '연결 속성 수정',
          warningContent: '등록된 데이터베이스의 사용자 정보가 변경됩니다. 변경한 사용자 정보가 기존 데이터 소스에 대한 접근 권한이 없을 시 기존 데이터 소스와 연결된 워크스페이스 데이터(이벤트,표준 프로세스 등)가 모두 삭제됩니다. 변경하시겠습니까? ',
          successContent: '연결된 데이터 소스를 수정하였습니다.',
        },
        index: {
          title: '데이터 소스 목록',
          noData: '등록된 데이터 소스가 없습니다.',
        },
        validation: {
          nameLength: '데이터 소스명은 3글자 이상 입력해주세요.',
          onlyNumber: '숫자만 입력할 수 있습니다.',
          duplicateName: '같은 이름의 데이터 소스가 있습니다.',
          mustTest: '테스트 성공 시 데이터소스 생성이 가능합니다.',
          syncDayListEmpty: '동기화 요일을 선택해주세요.',
          syncStartTimeEmpty: '동기화 시작 시간을 선택해주세요.',
          syncPkTableEmpty: 'Primary Key 값을 선택해주세요.',
          validationFailed: '검증이 실패하였습니다. 입력값을 확인해주세요.',
        },
      },

      search: {
        title: '검색 결과',
        content: '검색 결과 없습니다.',
      },

      noBasicProcessSelected: '기본 표준 프로세스가 선택되지 않았습니다.',
      notSelected: '선택한 항목이 없습니다.',
      notDateApplied: '시작일시 또는 종료일시가 적용되지 않았습니다.',
      notTimeSelected: '시간이 선택되지 않았습니다.',
      appliedSDatetime: '시작일시가 적용되었습니다.',
      appliedEDatetime: '종료일시가 적용되었습니다.',

      notKnow: '알수 없는 애러입니다.',
      noDataSourceSelected: '데이터 소스 선택이 되지 않았습니다.',
      noDataConnection: '데이터 연결이 되지 않았습니다.',

      message: 'message 입니다',
      creationComplete:'데이터셋 생성이 완료되었습니다.\n이동할 화면을 선택해주세요.',
      filterNotWorking: '목록이 없을 시 필터를 사용할 수 없습니다.'
    },

    //dotted: optionsC, optionsCA(경림)
    dotted: {
      caseId: '케이스 아이디',
      activity: '액티비티',
      originator: '담당자',
      resource: '리소스',
    },
    //matrix: optionsX, optionsY, optionsColorBy1, optionsColorBy2, onEventViewChanged, onSelectedXChange(경림)
    matrix: {
      activity: '액티비티',
      activitySection: '액티비티 구간',

      countCases: '케이스 수',
      total: '소요시간 - 합계',
      min: '소요시간 - 최소',
      max: '소요시간 - 최대',
      average: '소요시간 - 평균',
      utilization: '사용률',

      originator: '담당자',
      resource: '리소스',
      durationMonth: '기간(월)',

      en_total: '이벤트 비용 - 합계',
      en_min: '이벤트 비용 - 최소',
      en_max: '이벤트 비용 - 최대',
      en_average: '이벤트 비용 - 평균',

      cn_total: '케이스 총 비용 - 합계',
      cn_min: '케이스 총 비용 - 최소',
      cn_max: '케이스 총 비용 - 최대',
      cn_average: '케이스 총 비용 - 평균',
    },

    //Notification.vue(경림)
    notification: {
      title: '알림',
      callDate: '요청일시',
      recall: '재요청',
      moveToPage: '바로가기',
      lastUpdate: '마지막 업데이트',
      noNoti: '알림 없음',
      reset: '초기화',

      failed: '실패',
      complete: '완료',
      sampleData: '샘플 데이터',
      //[+]setClientInfo -> label 다국어처리 필요 : Notification labels

      //에러 시 표시 모음
      client: 'client',
      clientInfoProblem: 'client 정보에 문제있음',
      clientInfoNone: 'client 정보 없음 ',

      noNotiMsg: '알림 내용이 없습니다.',
    },
    //home > components > BookMark.vue(경림)
    bookmark: {
      title: '북마크',
      noList: '검색 결과가 없습니다.',
    },
    //home > components > EventDetail.vue(경림)
    eventDetail: {
      noSelect: '선택된 이벤트로그가 없습니다.',
      caseNum: '케이스 수',
      eventNum: '이벤트 수',
      lastUpdate: '최근 업데이트',
      startDate: '시작 일시',
      endDate: '종료 일시',
      workspaceName: '워크스페이스 이름',
      //데이터셋 이름, 이벤트로그 이름, 이벤트로그 설명 (exist but added)
      originDatasetName: '데이터셋 이름',
      eventLogName: '이벤트로그 이름',
      eventLogDesc: '이벤트로그 설명',
      relatedRepository: '관련 이벤트로그',
      //분석 버튼
      analysis: '분석',
      //매핑 매칭 목록 (exist but added)
      mappingMatchingList: '매핑 매칭 목록',
      propertyName: '속성명',
      columnName: '컬럼명',
      example: '예시',
      standardProcessList: '표준 프로세스 목록',
      noProcessList: '등록된 표준 프로세스가 없습니다.',
      basic: '기본',
      //생성자, 프로세스편집 (exist but added)
      create: '생성자',
      processEdit: '프로세스 편집',
      //닫기 버튼 (exist but added)
      close: '닫기',
    },
    //home > components > EventKpi.vue(경림)
    eventkpi: {
      datasourceAll: '총 데이터 소스',
      eventlogAll: '총 이벤트로그',
      standardProcessAll: '총 표준 프로세스',
    },
    //home > components > RecentEvent.vue(경림)
    recentEvents: {
      title: '최근 목록',
      noList: '검색 결과가 없습니다.',
    },
    //home > components > SampleEvents.vue(경림)
    sampleEvents: {
      title: '샘플 목록',
    },
    //components > cards > CardHome.vue(경림)
    cardHome: {
      //표준 프로세스, 생성자 (exist but added)
      standardProcess: '표준 프로세스',
      create: '생성자',
    },
    //components > cards > CardRepository.vue(경림)
    cardRepository: {
      seeInfo: '정보 보기',
      //삭제, 표준 프로세스, 생성자 (exist but added)
      delete: '삭제',
      standardProcess: '표준 프로세스',
      create: '생성자',
    },
    //event > list > EventList.vue
    /*
     * 데이터셋: 전체, 파일, 데이터베이스, 등록된 표준 프로세스가 없습니다, 검색 결과가 없습니다.[영균님 파트]
     * 이벤트: 이벤트 생성, 등록된 이벤트가 없습니다, 데이터셋을 선택해주세요 (already exists)
     */
    eventList: {
      noResults: '검색 결과가 없습니다',
    },
    //event > components > EventInformationModal.vue, EventModifyModal.vue(경림)
    eventLogModal: {
      relatedRepository: '관련 이벤트로그 ',
      mappingMatchingList: '매핑 매칭 목록',
      propertyName: '속성명',
      columnName: '컬럼명',
      example: '예시',
      standardProcessList: '표준 프로세스 목록',
      // 표준 프로세스, 등록된 표준 프로세스 (already exists)
      basic: '기본',
      basicSet: '기본 설정',
      //생성자, 닫기 버튼 (exist but added)
      create: '생성자',
      close: '닫기',
      //마우스 드래그 또는 버튼을 이용하여 등록할 수 있습니다. (already exists)
      subEventCreate: '서브 이벤트로그 생성',
    },
    //event > create > repository > CreateFlow.vue(경림)
    repoCreateFlow: {
      eventCreateProgress: '이벤트로그 생성 과정',
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
      standardProcessList: '표준 프로세스 목록',
      basicSet: '기본 설정',
      registeredByButton: '※ 버튼을 이용하여 등록할 수 있습니다.',
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
      firstBlankTest: '첫 자리는 공백이 올 수 없습니다.',
      onlyEnglishNumber: '영문, 숫자만 입력해주세요.',
      excludingSpecial: '특수문자는 입력할 수 없습니다.',
      duplicate: '중복된 값입니다.',
      email: '올바른 이메일 주소를 입력하세요.',
      password: '영문, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요',
      digit: '{min}자리 이상을 입력해주세요',
      maxDigit: '{max}자리를 초과하여 입력할 수 없습니다.',
      onlyNumber: '숫자만 입력해주세요.',
      contact: '올바른 연락처를 입력해주세요',
      ip: '올바른 IP 주소를 입력해주세요',
      noActivity: '해당 액티비티는 존재하지 않습니다.',
      onlyKorEngNum: '한글, 영문, 숫자만 입력해주세요',
      onlyKorEngNumPermiSpacial: `한글, 영문, 숫자, 특수문자는 키보드 자판 상 문자만 입력해주세요 ( ' ), ( " ) 제외`,
      keyboardPermitSpecial: `특수문자는 키보드 자판 상 문자만 입력해주세요. ( ' ), ( " ) 제외`,
    },
    //notification 메시지 = getNotificationMsg(item: any)
    notificationMsg: {
      datasetImporting: {
        queued: '[{datasetName}] 업로드를 준비 중입니다.',
        running: '[{datasetName}] 을/를 업로드 중입니다.',
        error: '[{datasetName}] 생성에 실패하였습니다.',
        completed: '[{datasetName}] 생성이 완료되었습니다.',
      },
      dataFilter: {
        queued: '[{datasetName}] 에 대한 필터 적용을 준비 중입니다.',
        running: '[{datasetName}] 에 대한 필터 적용을 진행 중입니다.',
        error: '[{datasetName}] 에 대한 필터 적용이 실패하였습니다.',
        completed: '[{datasetName}] 에 대한 필터 적용이 완료되었습니다.',
      },
      eventMapping: {
        queued: '[{eventName}] 생성을 준비 중입니다.',
        running: '[{eventName}] 을/를 생성 중입니다.',
        error: '[{eventName}] 생성에 실패하였습니다.',
        completed: '[{eventName}] 생성이 완료되었습니다.',
      },
      eventFilter: {
        queued: '[{eventName}] 에 대한 필터 적용을 준비 중입니다.',
        running: '[{eventName}] 에 대한 필터 적용을 진행 중입니다.',
        error: '[{eventName}] 에 대한  필터 적용이 실패하였습니다.',
        completed: '[{eventName}] 에 대한  필터 적용이 완료되었습니다.',
      },
      dashboard: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      processDiscovery: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      deltaAnalysis: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      logReplay: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      socialAnalysis: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      matrixModel: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      dotted: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      processFlow: {
        queued: '[{eventName}] 의 분석을 준비 중입니다.',
        running: '[{eventName}] 의 분석을 진행 중입니다.',
        error: '[{eventName}] 의 분석에 오류가 발생하였습니다.',
        completed: '[{eventName}] 의 분석이 완료되었습니다.',
      },
      dataSync: {
        queued: '[{datasourceName}] 동기화를 준비 중입니다',
        running: '[{datasourceName}] 이/가 동기화 중입니다',
        error: '[{datasourceName}]의 동기화에 실패하였습니다.',
        completed: '[{datasourceName}]의 동기화가 완료되었습니다.',
      },
    },
    notificationLabel: {
      xaxis: 'X축',
      yaxis: 'Y축',
      calculate: '값 유형',

      provider: '공급자',

      totalDataset: '관련 데이터셋 수 ',
      totalEventlog: '관련 이벤트로그 수',
      classifier: '구분 속성',
      variant: '그룹 이름',
      rowCount_origin: '기존 총 건수',
      datasource: '데이터 소스',

      database: '데이터베이스',

      dataset: '데이터셋',
      rowCount_sync: '동기화 된 총 건수 ',
      series: '범례',
      viewMode: '보기 모드',
      layout: '보기 방법',
      perspective: '분석 기준',
      groupItems: '분석 항목',
      status: '상태',
      startTimestamp: '시작일자',
      algorithms: '알고리즘',
      activityKPI: '액티비티',
      activitySignificance: '액티비티 중요도',
      arcKPI: '연결선',
      arcSignificance: '연결선 중요도',
      workspace: '워크스페이스',
      eventlog_origin: '원본 이벤트로그',
      dependency: '의존도',
      eventlog: '이벤트로그',
      sortBy: '정렬 기준',
      values: '조건값',
      endTimestamp: '종료일자',
      min_frequency: '최소 빈도',
      includes: '추가조건',

      table: '테이블',

      filename: '파일 이름',

      host: '호스트',

      datasetOrigin: '원본 데이터셋',

      selectedTab: '탭',
    },
    subRepoCreateFlow: {
      subEventCreateProgress: '서브 이벤트로그 생성 과정',
    },
    subRepoCreateForm: {
      eventNameOrigin: '원본 이벤트로그 이름',
      subEventName: '서브 이벤트로그 이름',
      subEventDesc: '서브 이벤트로그 설명',

      standardProcessList: '표준 프로세스 목록',
      basicSet: '기본 설정',
    },
    repositoryFilter: {
      title: '필터',
      timeFilter: '시간 필터',
      startEndFilter: '시작점 및 종료점 필터',
      attributeFilter: '속성 필터',
      variantFilter: '프로세스 그룹 필터',

      startEndActivity: '시작점 & 종료점 액티비티',

      selectFilter: '필터 선택',
      selectField: '필드명 선택',

      pleaseSelectFilterMsg: '왼쪽 옵션에서 필터를 선택해주세요. ',

      time: {
        wholeTerm: '전체 기간',
        startDateTime: '시작 일시',
        endDateTime: '종료 일시',
        caseIncludingType: '케이스 포함 타입',
        caseIncludingTypeText: '(*현재 설정을 따름. 설정 페이지에서 변경 가능)',
        startConfiguration: '시작 일시 설정',
        endConfiguration: '종료 일시 설정',

        trim: 'Trim within 시작 & 종료점',
        started: 'Starts At The 시작점',
        contained: 'Contains within 시작 & 종료점',
        intersecting: 'Intersects within 시작 & 종료점',
        completed: 'Finish at the 종료점',
      },

      startEnd: {
        startPoint: '시작점',
        endPoint: '종료점',
        allActivities: '전체 액티비티',
        selectedStartActivities: '선택된 시작 액티비티',
        selectedEndActivities: '선택된 종료 액티비티',
      },

      attribute: {
        allAttributes: '전체 속성',
        selectedAttributes: '선택된 속성',
        column: '컬럼',
        selectedValue: '선택된 값',
      },

      variant: {
        allVariants: '전체 그룹',
        variantDetail: '그룹 상세',
        selectedVariants: '선택된 그룹',
      },

      filtering: {
        subEventName: '서브 이벤트로그 이름',

        filterCondition: '필터 조건',
        filterType: 'Filter Type',
        filteredValue: '필터된 값',

        eventFiltingNow: '이벤트 필터 중입니다.',

        filteringCompleted: '서브 이벤트 생성이 완료되었습니다.',
        pressCompleteBtn: '완료 버튼을 눌러주세요.',

        filteringFailed: '이벤트 필터 적용에 실패하였습니다.',
        pressBeforeBtn: '이전을 눌러 필터를 다시 적용해주세요.',
      },

      filterTable: {
        startEndContent: '시작점: {startPoints}; 종료점: {endPoints};',
        attributeContent: '컬럼: {field}; 선택된 값: {properties};',
      }
    },
    subDatasetCreateFlow: {
      subDatasetCreateProgress: '서브 데이터셋 생성 과정',
    },
    subDatasetCreateForm: {
      datasetInfo: '원본 데이터셋',
      datasetNameOrigin: '원본 데이터셋 이름',
      datasetDescOrigin: '원본 데이터셋 설명',
      datasetRow: '원본 데이터셋 행 수',
      lastUpdate: '마지막 업데이트',

      subDataset: '서브 데이터셋',
      subDatasetName: '서브 데이터셋 이름',
      subDatasetDesc: '서브 데이터셋 설명',
    },
    datasetFilter: {
      filterCondition: '필터 조건',
      columnName: '컬럼 이름',
      filterCount: '필터된 값 건수',
      filterValue: '필터된 값',

      datasetFiltingNow: '데이터셋 필터 중입니다.',
      wait: '잠시만 기다려주세요.',

      filteringCompleted: '데이터 필터 완료하였습니다.',
      pressCompleteBtn: '완료 버튼을 눌러주세요.',

      filteringFailed: '데이터 필터 적용에 실패하였습니다.',
      pressBeforeBtn: '이전을 눌러 필터를 다시 적용해주세요.',
    },
    flowBoxSubEvent: {
      title: '서브 이벤트로그 정보 입력',
      content: '선택한 이벤트로그의 데이터 중 여러 조건에 따른 특정 데이터를 선택하여 새로운 이벤트로그를 생성합니다.',

    },
    flowBoxSubDataset: {
      title: '서브 데이터셋 정보 입력',
      content: '선택한 데이터셋에서 사용할 값을 선택하여 새로운 데이터셋을 생성합니다.',
    },
  },
};

export default repoTranslation;
