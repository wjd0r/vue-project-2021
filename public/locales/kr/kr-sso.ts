const ssoTranslation = {
  sso: {
    // 필터 라벨, 폼 라벨, 칼럼 명, 타이틀
    // :label="$t('view.sso.label.menuName')"
    // :placeholder="$t('view.sso.label.search')"
    // {{ $t('view.sso.button.search') }}
    // this.$t('view.sso.filter.unApproved')
    label: {
      // 2021.10.28 add
      description: '설명',
      roleCode: '권한 코드',
      roleProperties: '권한 정보',
      roleDate: '권한 등록일',
      roleDescription: '권한 설명',
      use: '사용 여부',
      roleList: '권한 목록',
      role: '권한',
      permission: '기능',
      active: '허용',
      inactive: '미허용',

      // 테이블, 라벨
      groupKey: '그룹 ID',
      groupName: '그룹명',
      organization: '회사',
      department: '부서',
      position: '직급',
      name: '이름',
      email: '이메일',
      contactNumber: '연락처',
      roleName: '권한 이름',
      password: '비밀번호',
      confirmPW: '비밀번호 확인',
      createdOn: '등록일',
      storage: '데이터 사용 현황',
      adminUsername: '관리자 유저 ID',

      isApproveGroup: '승인 상태',
      isDeleted: '사용 여부',

      countMembers: '그룹 회원 수',
      managerEmail: '그룹 관리자 이메일',
      managerName: '그룹 관리자 이름',
      managerPosition: '그룹 관리자 직급',
      newManagerEmail: '새 관리자 이메일',

      licenseDuration: '라이선스 기간',
      licenseActiveOn: '라이선스 시작일',
      licenseExpireOn: '라이선스 만료일',
      licenseType: '라이선스 타입',
      licenseStatus: '라이선스 상태',
      durationExtension: '기간 연장',
      activeDate: '가입일',
      expireDate: '만료일',

      userName: '유저 이름',
      userEmail: '유저 이메일',
      userRoleName: '유저 권한',

      resourceType: '구분',
      action: '기능',
      permissionCode: '권한',
      permissionName: '권한 이름',
      permissionList: '권한 목록',

      menuName: '메뉴 이름',
      featureId: '메뉴',
      activeOn: '접속 일자',

      ipAddress: '로그인IP',
      signInOn: '로그인 일자',
      signOutOn: '로그아웃 일자',

      changePassword: '신규 비밀번호',
      changeGroup: '그룹 변경',

      actionCreate: '생성',
      actionImport: '불러오기',
      actionMapping: '매핑',
      actionEdit: '수정',
      actionExport: '내보내기',
      actionDelete: '삭제',

      // title
      userManage: '사용자 관리',
      userForm: '사용자 정보',
      createUserForm: '사용자 등록',
      modifyUserForm: '사용자 정보 수정',
      groupManage: '그룹 관리',
      gruopForm: '그룹 정보',
      createGroupForm: '그룹 등록',
      modifyGroupForm: '그룹 정보 수정',
      roleManage: '권한 관리',
      roleForm: '권한 정보',
      modifyRoleForm: '권한 정보 수정',
      menuHistory: '메뉴 사용 이력 관리',
      loginHistory: '로그인 이력 관리',

      login: '로그인',
      modifyMyInfo: '계정 정보 수정',
      saveID: '아이디 저장',
      forgotPassword: '비밀번호 찾기',
      join: '회원가입',
      resetPassword: '비밀번호 재설정',
      newPassword: '새 비밀번호',
      resourceGroupCount: '프로젝트 수',
      datasetCount: '데이터셋 수',
      eventRepositoryCount: '이벤트로그 수',
      processModelCount: '표준 프로세스 수',

      title: '제목',
      content: '내용',

      required: '필수사항',

      // placeholder
      selectDuration: '기간을 선택해주세요.',
      search: '검색',
      startDate: '시작일',
      passwordValidate: '영문, 숫자, 특수문자를 포함한 8~16자리를 입력하세요.',
      putTitle: '제목을 입력하세요.',
      putQAContent: '문의 내용을 적어주세요.',
      putEmailForAnswer: '답변을 받을 이메일을 입력하세요.',
      putImageFile: '첨부할 이미지 파일을 선택하세요.',


      totalUsers: '사용자 수',
      totalDatasource: '데이터 소스 수',
      totalDataset: '데이터셋 수',
      totalEventLog: '이벤트로그 수',
      totalBaselineProcess: '표준 프로세스 수',

    },

    // 각 메뉴마다 사용하는 필터 옵션들 여기다 모아놓기
    filter: {
      all: '전체',
      select: '선택',
      used: '사용',
      unUsed: '미사용',
      approved: '승인',
      unApproved: '미승인',
      CREATED_ON: '가입일',
      LICENSE_ACTIVE_ON: '라이선스 시작일',
      LICENSE_EXPIRE_ON: '라이선스 만료일',
      GROUP_MANAGER: '그룹 관리자',
      GROUP_VIEWER: '사용자',
      GROUP_NAME: '그룹명',
      USER_FULLNAME: '이름',
      USER_EMAIL: '이메일',
      ORGANIZATION: '회사',
      ORGANIZATIONS: '회사',
      MANAGER_EMAIL: '관리자 이메일',
      MANAGER_NAME: '관리자 이름',
      WAITING: '승인 대기',
      DISAPPROVAL: '승인 거부',
      APPROVAL: '사용중',
      EXPIRED: '만료',
      create: '생성',
      edit: '수정',
      export: '내보내기',
      delete: '삭제',
      import: '불러오기',
      mapping: '매핑',
      repo: {
        process: '표준 프로세스',
        repository: '이벤트로그',
        dataset: '데이터셋',
        group: '프로젝트'
      },
      SELF: '없음',
      GROUP: '있음',
      GROUP_USER: '사용자',
      SYSTEM_MANAGER: '시스템 관리자',
      DEMO: '데모 사용자',
      ACTIVE_ON: '접속 일자',
      SIGN_IN_ON: '로그인 일자',
      SIGN_OUT_ON: '로그아웃 일자',
      process: {
        dashboard: '데이터 요약',
        discovery: '프로세스 분석',
        delta: '프로세스 비교',
        logReplay: '프로세스 애니메이션',
        social: '리소스 관계 분석',
        matrix: '데이터 분석',
        dotted: '액티비티 분석',
        gantt: '간트 차트',
        detla: '',
        flow: '흐름 분석',
      },
      null: '-',
      ipr: {
        repo: {
          dataset: {
            create: '데이터셋 생성',
          },
        },
      },
    },
    // 각 메뉴마다 사용하는 버튼들 여기다 모아놓기
    button: {
      create: '신규',
      search: '조회',
      register: '등록',
      save: '저장',
      request: '요청',
      cancel: '취소',
      qna: '문의하기',
      join: '회원가입',
      ok: '확인',
      close: '닫기',
      sendEmail: '이메일 전송',
      apply: '적용',

      // 2021-10-28
      editRole: '권한 수정',
      createRole: '권한 생성',
    },
    login: {
      footerTitle: '<p>아직 IPR</p>\n<p>회원이 아니신가요?</p>',
      footerItem: '<p>지금 무료 클라우드 프로세스 마이닝 플랫폼에 가입하세요.</p>\n<p>귀사의 업무를 분석하여 경영 혁신에 도움을 드립니다.</p>',
      forgotDesc: '가입하신 이메일 주소로 비밀번호 재설정 링크가 전송됩니다.'
    },
    join: {
      noticeText: '회원가입 시 이메일 인증이 필요하며 인증 완료 시 회원가입이 완료됩니다.'
    },
    qna: {
      title: '도움이 필요하신가요?',
      subTitle: '도움이 필요하면 언제든지 문의 바랍니다.',
      noticeText: '도움이 필요한 내용을 아래에 작성해주세요.',
      companyName: '(주)아이오코드',
      addressBusan: '기술 연구소(부산) : (47340) 부산광역시 해운대구 센텀5로 41, NSN 빌딩 301호 (우동)',
      addressSeoul: '기술 연구소(서울) : (06043) 서울특별시 강남구 강남대로136길 11, 4층 (논현동, 논현제일빌딩)',
      companyEmail: 'E-Mail : ipr@iochord.com',
      companyDigits: 'Tel : 070-4323-0717'
    },
    // 필요한 alert 메세지 여기다 모아놓기
    alert: {
      title: {
        registerComplete: '등록 완료',
        registerFail: '등록 실패',
        modifyComplete: '수정 완료',
        saveComplete: '저장 완료',
        saveFail: '저장 실패',
        requestComplete: '요청 완료',
        requestFail: '요청 실패',
        reportComplete: '접수 완료',
        reportFail: '접수 실패',
        warning: '경고',
        alarm: '경고',
        joinFail: '가입 실패',
        oneMorePermissions: '권한 하나 이상은 등록이 필요합니다.'
      },
      checkEmail: '올바른 이메일 주소를 입력하세요',
      duplicateEmail: '중복 email 입니다.',
      id:'유저 ID 를 입력하세요.',
      duplicateId:'중복 id 입니다.',
      checkName:'이름을 입력하세요.',
      checkPassword:'비밀번호가 일치하지 않습니다.',
      checkBlank: '빈 값 체크 해주세요',
      same: '같은 값이 존재합니다',
      noRegisteredMembers: '등록된 맴버가 없습니다',
      noRowsToShow: '해당 데이터가 없습니다.',
      createSucess: '등록되었습니다.',
      saveComplete: '저장되었습니다.',
      modifyComplete: '수정되었습니다.',
      saveFail: '저장에 실패하였습니다.\n다시 시도 해주세요.',
      requestModiyFail: '변경 요청에 실패하였습니다.\n다시 시도 해주세요.',
      requestModifyComplete: '변경 요청이 완료되었습니다.',
      wrongRequest: '요청에 실패하였습니다.\n다시 시도 해주세요.',
      reportComplete: '문의 내용이 접수되었습니다.\n빠른 시일 내에 답신을 드리겠습니다.',
      reportFail: '에러로 인해 문의가 접수되지 않았습니다. 다시 전송해 주세요. ',
      reportRequired: '누락된 내용이 있습니다. 확인 후 문의하기 버튼을 눌러주세요. ',
      loginFail: '계정 정보와 일치하지 않거나 계정 정보가 없습니다.',
      forgotRequestComplete: '요청이 확인되었습니다. 이메일함을 확인해주세요.',
      resetPasswordComplete: '변경이 완료되었습니다. 로그인 화면으로 이동합니다.',

      joinComplete: '<h3 style="margin-bottom: 10px !important;}">{name}님, IPR 가입 감사합니다.</h3>\n{email}에 전송된 인증 메일을 확인바랍니다.\n<br />\n인증 완료 시 회원가입이 완료됩니다.',
      joinFail: '가입에 실패하였습니다.\n다시 시도해주세요.',

      authOk: '<h1 class="title">이메일 인증을 완료하셨습니다</h1>\n<div class="content-body">\n<h4>환영합니다.</h4>\n<h4>회원가입이 완료되었습니다.</h4>\n</div>',
      authAlready: '<h1 class="title">이미 인증을 완료하셨습니다</h1>\n<div class="content-body">\n<h4>로그인 화면으로 넘어갑니다.</h4>\n</div>',
      authError: '<h1 class="title">잘못된 정보입니다</h1>\n<div class="content-body">\n  <h4>가입정보를 확인해보시기 바랍니다.</h4>\n<h4>로그인 화면으로 넘어갑니다.</h4>\n</div>',

      wrongMember: '추가가 되지 않았습니다.\n맴버를 선택해 주세요.',

      // sso error code
      SSO_ERR_400_00020001: '이미 존재하는 유저입니다.',
      SSO_ERR_400_00020002: '중복된 이메일 주소입니다.',
      SSO_ERR_400_00030001: '이미 존재하는 그룹 ID입니다.',
      SSO_ERR_400_00030002: '이미 존재하는 그룹니다.',
      SSO_ERR_404_00030003: '그룹을 찾을 수 없습니다.',

      passwordConfirm: '비밀번호 확인하여 주세요.',
      oldPasswordConfirm: '기존 비밀번호를 입력하세요.',
      newPasswordConfirm: '신규 비밀번호를 확인하여 주세요.',
      newPasswordConfirm2: '신규 비밀번호를 설정하려면 비밀번호 확인을 해야합니다.',

      userIdConfirm: '5~20자 사이의 영문, 숫자로 입력해주세요.',
      contactConfirm: '올바른 연락처를 입력하세요.',
      idNotSame: '아이디와 같은 비밀번호는 설정 할수 없습니다.',
      deletedWorkspace: '삭제된 워크스페이스 입니다.',
    },
    other: {
      searchPlaceholder: '검색하세요'
    },
    account: {
      account: '계정',
      profile: '프로필',
      name: '이름',
      email: '이메일',
      employee: '사원번호',
      registration: '사용자 등록일',
      accountInformation: '계정 정보 변경',
      company: '회사',
      department: '부서',
      rank: '직급',
      contact: '연락처',
      editPassword: '비밀번호 수정',
      password: '기존 비밀번호',
      newPassword: '신규 비밀번호',
      verifyPassword: '비밀번호 확인',
      verifyNewPassword: '신규 비밀번호 확인',
      save: '저장',
      cancel: '취소',
      workspace: 'Workspace',
      numberOfDataSources: '데이터 소스 수',
      numberOfEventLogs: '이벤트로그 수',
      standardNumberOfProcesses: '표준 프로세스 수'
    },
    user: {
      employeenumber: '사원번호',
      name: '이름',
      department: '부서',
      isUse: '사용 여부',
      noData: '해당 데이터가 없습니다.',
      userManagement: '사용자 관리',
      company: '회사',
      // department:'부서',
      rank: '직급',
      // name:'이름',
      email: '이메일',
      contact: '연락처',
      since: '가입일',
      authority: '권한',
      userEdit: '사용자 수정',
      userNew: '사용자 등록',
      goBack: '돌아가기',
      accountInformation: '계정 정보',
      // name:'이름',
      use: '사용',
      unused: '미사용',
      editPassword: '비밀번호 수정',
      newPassword: '신규 비밀번호',
      verifyPassword: '비밀번호 확인',
      // authority:'권한' ,
      workspace: '워크스페이스',
      all: '전체',
      manager: '관리자',
      user: '사용자',
      generalManager: '총 관리자',
      username: '유저ID',
      isDelete: '사용 여부'
    },
    workspace: {
      //해당 데이터가 없습니다.
      workspaceManagement: '워크스페이스 관리',
      //회사
      workspaceName: '워크스페이스 이름',
      adminWorkerID: '관리자 사원번호',
      // 관리자 이름
      numberOfUsers: '사용자 수',
      numberOfDataSources: '데이터 소스 수',
      numberOfOriginalData: '데이터셋 수',
      numberOfEventLogs: '이벤트로그 수',
      standardNumberOfProcesses: '표준 프로세스 수',
      // 가입일
      // 사용 여부
      editWorkspace: '워크스페이스 수정',
      newWorkspace: '워크스페이스 등록',
      // 돌아가기
      // newWorkspace:'워크스페이스 생성',
      workspaceProperties: '워크스페이스 정보',
      // workspaceName:'워크스페이스 이름',
      workspaceDescription: '워크스페이스 설명',
      // 사용 여부
      // 사용 여부
      // 미사용
      workspaceOwner: '워크스페이스 관리자',
      // 회사
      // 부서
      workspaceSetting: '워크스페이스 설정 (최대 개수 제한)',
      meansNoLimit: '-1 입력 시 제한 없음',
      dataset: '데이터셋',
      datasetRows: '최대 행 수',
      event: '이벤트',
      referenceProcess: '표준 프로세스',
      // 멤버 추가
      workerID: '사원번호',
      searchMember: '맴버를 검색해 주세요.',
      // 이름
      // 부서
      // 사용 여부
      // workerID:'사원 번호',
      workerName: '사원 명',
      addAllMembers: '전체 멤버 추가',
      addThisMember: '단일 멤버 추가',
      memberList: '멤버 목록',
      // workerID:'사원 번호',
      // 사원 명
      // 권한
      // workspaceOwner:'워크스페이스 관리자',
      // 사용자
      // 저장
      // 돌아가기
      // newWorkspace:'워크스페이스 수정',
      workspaceproperties: '워크스페이스 정보',
      //workspaceName:'워크스페이스 이름',
      // workspaceDescription:'워크스페이스 설명',
      // 사용 여부
      // 사용
      // 미사용
      // workspaceOwner:'워크스페이스 관리자',
      // 회사
      // 부서
      // workspaceSetting:'워크스페이스 설정 (최대 개수 제한)',
      // meansNoLimit:'-1 입력 시 제한 없음',
      // dataset:'데이터셋',
      // datasetRows:'데이터셋 로우',
      // event:'이벤트',
      // referenceProcess:'표준 프로세스',
      // 멤버 추가
      addMembers: '멤버 추가',
      // workerID:'사원번호',
      // 이름
      // 부서
      // 사용 여부
      // workerID:'사원 번호',
      // workerName:'사원 명',
      // addAllMembers:'전체 멤버 추가',
      // addThisMember:'단일 멤버 추가',
      // memberList:'멤버 목록',
      // workerID:'사원 번호',
      // 사원 명
      // 권한
      // workspaceOwner:'워크스페이스 관리자'
      // 사용자
      // 수정
    },
    role: {
      workerID: '사원번호',
      // :`권한명
      // :권한 관리
      // :권한 ID
      // :이름
      // :설명
      // :가입일
      // :사용 여부
      // :권한 수정
      // :권한 생성
      // :돌아가기
      // :권한 생성
      // :"권한 properties
      // 권한 정보"
      // :권한 명
      // :권한 설명
      // :사용 여부
      // :사용
      // :미사용
      // :
      // "Role 목록 권한 목록"
      role: '기능',
      iprRepoDataset: 'ipr.repo.dataset',
      iprRepoRepository: 'ipr.repo.repository',
      iprRepoProcess: 'ipr.repo.process',
      iprUser: 'ipr.user',
      iprWorkspaceResource: 'ipr.workspace.resource',
      permission: '권한',
      view: 'view',
      create: 'create',
      delete: 'delete',
      update: 'update',
      export: 'export',
      workspaceMapping: 'workspace.mapping',
      assignUser: 'assign.user',
      removeUser: 'remove.user',
      assignAdmin: 'assign.admin',
      transferAdmin: 'transfer.admin'
      // 허용
      // 미허용
      // 저장
      // 돌아가기
      // 권한 수정
      // "권한 properties 권한 정보"
      // 권한 명
      // 권한 설명
      // 사용 여부
      // 사용
      // 미사용
      // "Role 목록 권한 목록"
      // role:'권한',
      // iprRepoDataset:'권한',
      // iprRepoRepository:'권한',
      // iprRepoProcess:'권한',
      // iprUser:'권한',
      // iprWorkspaceResource:'권한',
      // permission:'기능',
      // view:'기능',
      // create:'기능',
      // delete:'기능',
      // update:'기능',
      // export:'기능',
      // workspaceMapping:'기능',
      // assignUser:'기능',
      // removeUser:'기능',
      // assignAdmin:'기능',
      // transferAdmin:'기능',
      // 허용
      // 미허용
      // "저장 수정"`
    },
    menuHistory: {
      workerID: '사원번호',
      name: '이름',
      department: '부서',
      notUse: '사용 여부',
      menuUsageHistory: '메뉴 사용 이력 관리',
      company: '회사',
      // department:'부서',
      // workerID:'사원번호',
      rank: '직급',
      // name:'이름',
      accessDate: '접속 일자',
      menu: '메뉴',
      workspace: '워크스페이스',
      eventLog: '이벤트로그',
      time: '소요시간'
    },
    loginHistory: {
      workerID: '사원번호',
      name: '이름',
      department: '부서',
      notUse: '사용 여부',
      loginHistory: '로그인 이력 관리',
      company: '회사',
      // department:'부서',
      employeeNumber: '사원번호',
      rank: '직급',
      userEmail: '유저 이메일',
      // name:'이름',
      LoginIP: '로그인IP',
      loginDate: '로그인 일자'
    },
    /* 추가됨 */topology: {
      /* 추가됨 */label: {
        /* 추가됨 */enterInfor: 'Topology 정보 입력',
        /* 추가됨 */enterInforContents: 'Topology 정보 입력 내용',
        /* 추가됨 */streamInput1: 'Stream Input 설정 1',
        /* 추가됨 */streamInput2: 'Stream Input 설정 2',
        /* 추가됨 */streamInput: 'Stream Input 설정',
        /* 추가됨 */dataPreview1: 'Data Preview 1',
        /* 추가됨 */dataPreview2: 'Data Preview 2',
        /* 추가됨 */dataPreview: 'Data Preview',
        /* 추가됨 */filterStream1: 'Filter Stream 1',
        /* 추가됨 */filterStream2: 'Filter Stream 2',
        /* 추가됨 */filterStream: 'Filter Stream',
        /* 추가됨 */joinStream: 'Join Stream',
        /* 추가됨 */targetStorage: 'Target Storage 설정',
        /* 추가됨 */setting: '설정',
        /* 추가됨 */properties: 'Properties',
        /* 추가됨 */pipeline: 'Pipeline 설정',
        /* 추가됨 */creationProcess: 'Topologe 생성 과정',
        /* 추가됨 */templateProperties: 'Topology Template Properties',
        /* 추가됨 */flowDescription: 'Topology Flow Description',
        /* 추가됨 */streamSetting: 'Stream 설정할 수 있습니다.',
        /* 추가됨 */typeSelect: 'Data Preview에서 타입을 선택할 수 있습니다.',
        /* 추가됨 */filter: 'Data Preview에서 선택된 항목을 filter 할 수 있습니다.',
        /* 추가됨 */contentIntoOne: '두 개의 컨텐츠를 하나로 합칠 수 있습니다.',
        /* 추가됨 */targetStorageSetting: 'Target Storage 설정합니다.',
        /* 추가됨 */instanceProperties: 'Topology Instance Properties',
        /* 추가됨 */dataSource: '데이터 소스',
        /* 추가됨 */constructor: '생성자',
        /* 추가됨 */title: '타이틀',
        /* 추가됨 */relationType: 'Relation Type',
        /* 추가됨 */tableField: 'Table Field',
        /* 추가됨 */joinCondition: 'Join Condition',
        /* 추가됨 */topicColumn: 'Topic Column',
        /* 추가됨 */remove: '제거',
        /* 추가됨 */columnName: 'Column name (type)',
        /* 추가됨 */filteredColumn: 'Filtered column (type)',
        /* 추가됨 */tableName: 'Table Name',
        /* 추가됨 */topicName: 'Topic Name',
        /* 추가됨 */add: '추가',
        /* 추가됨 */templateName: 'Topology Template Name',
        /* 추가됨 */instanceName: 'Topology Instance Name',
        /* 추가됨 */createing: 'Topology를 생성하는 중입니다.',
        /* 추가됨 */complete: 'Topology 생성이 완료되었습니다.',
        /* 추가됨 */host: 'Host',
        /* 추가됨 */protocol: '통신 프로토콜',
        /* 추가됨 */port: 'Port',
        /* 추가됨 */topic: 'Topic',
        /* 추가됨 */testComplete: '테스트를 완료하였습니다.',
        /* 추가됨 */testFailure: '테스트를 실패하였습니다.',
        /* 추가됨 */test: '테스트',
        /* 추가됨 */buffer: 'Buffer',
        /* 추가됨 */windowType: 'Window type',
        /* 추가됨 */timeWindow: 'Time window (단위: 분)',
        /* 추가됨 */dataLength: 'Data length',
        /* 추가됨 */storage: 'Target Storage',
        /* 추가됨 */storeAsTable: 'Store as table (DB)',
        /* 추가됨 */storeAsFilesystem: 'Store as filesystem (HDFS)',
        /* 추가됨 */instanceManagement: '토폴로지 instance 관리',
        /* 추가됨 */templateManagement: '토폴로지 template 관리',
        /* 추가됨 */name: '토폴로지 Name',
      },
      /* 추가됨 */button: {
        /* 추가됨 */next: '다음',
        /* 추가됨 */cancel: '취소',
        /* 추가됨 */filterCancel: '필터 취소',
        /* 추가됨 */confirm: '확인',
        /* 추가됨 */save: '저장',
        /* 추가됨 */complete: '완료',
        /* 추가됨 */previous: '이전',
        /* 추가됨 */select: '토폴로지 보기',
        /* 추가됨 */update: '토폴로지 수정',
        /* 추가됨 */insert: '토폴로지 등록',
      },
      /* 추가됨 */alert: {
        /* 추가됨 */warning: '경고',
        /* 추가됨 */cancelCreation: 'topology instance 생성을 취소 하시겠습니까?',
        /* 추가됨 */yes: '예',
        /* 추가됨 */no: '아니오',
      },
      /* 추가됨 */checkbox: {
        /* 추가됨 */selectAllColumns: '전체 Column 선택',
      },
      /* 추가됨 */selectOption: {
        /* 추가됨 */select: '선택',
        /* 추가됨 */string: 'String (Boolean 포함)',
        /* 추가됨 */numeric: 'Numeric',
        /* 추가됨 */timestamp: 'Timestamp',
        /* 추가됨 */topicColum1: 'topic colum1',
        /* 추가됨 */topicColum2: 'topic colum2',
      },
      /* 추가됨 */placeholder: {
        /* 추가됨 */templateDescription: 'Template Description을 입력해주세요',
        /* 추가됨 */instanceName: 'Instance Name을 입력해주세요',
        /* 추가됨 */instanceDescription: 'Instance Description을 입력해주세요',
        /* 추가됨 */enterPort: 'Port를 입력해주세요',
        /* 추가됨 */enterNumber: '숫자를 입력해주세요',
        /* 추가됨 */enterTopologyName: 'Topology Name을 입력해주세요',
        /* 추가됨 */enterTopologyDescription: 'Topology Description을 입력해주세요',
      }
    }
  }
};

export default ssoTranslation;
