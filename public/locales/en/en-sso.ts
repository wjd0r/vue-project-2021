const ssoTranslation = {
  sso: {
    // 필터 라벨, 폼 라벨, 칼럼 명, 타이틀
    // :label="$t('view.sso.label.menuName')"
    // :placeholder="$t('view.sso.label.search')"
    // {{ $t('view.sso.button.search') }}
    // this.$t('view.sso.filter.unApproved')
    label: {
      // 2021.10.28 add
      description: 'Description',
      roleCode: 'Role Code',
      roleProperties: 'Properties',
      roleDate: 'Registered Date',
      roleDescription: 'Description',
      use: 'Use',
      roleList: 'Roles',
      role: 'Role',
      permission: 'Permission',
      active: 'Allowed',
      inactive: 'Disallowed',

      // 테이블, 라벨
      groupKey: 'Group ID',
      groupName: 'Group Name',
      organization: 'Affiliation',
      department: 'Department',
      position: 'Position',
      name: 'Name',
      email: 'Email',
      contactNumber: 'Contact',
      roleName: 'Role Name',
      password: 'Password',
      confirmPW: 'Verify Password',
      createdOn: 'Registered Date',
      storage: 'Data Usage',
      adminUsername: 'Admin username',

      isApproveGroup: 'Approval State',
      isDeleted: 'Active/Inactive',

      countMembers: 'Group Members',
      managerEmail: 'Group Admin Email',
      managerName: 'Group Admin Name',
      managerPosition: 'Group Admin Position',
      newManagerEmail: 'New Admin Email',

      licenseDuration: 'License Duration',
      licenseActiveOn: 'License Activation Date',
      licenseExpireOn: 'License Expiration Date',
      licenseType: 'License Type',
      licenseStatus: 'License Status',
      durationExtension: 'Extends License Period',
      activeDate: 'Registered Date',
      expireDate: 'Expired Date',

      userName: 'Name',
      userEmail: 'Email',
      userRoleName: 'Role',

      resourceType: 'Type',
      action: 'Function',
      permissionCode: 'Permission',
      permissionName: 'Permission Name',
      permissionList: 'Permission List',

      menuName: 'Menu Name',
      featureId: 'Menu ID',
      activeOn: 'Accessed Date',

      ipAddress: 'Login IP',
      signInOn: 'Login Date',
      signOutOn: 'Logout Date',

      changePassword: 'New Password',
      changeGroup: 'Change Group',

      actionCreate: 'create',
      actionImport: 'import',
      actionMapping: 'mapping',
      actionEdit: 'modify',
      actionExport: 'export',
      actionDelete: 'delete',

      // title
      userManage: 'User Management',
      userForm: 'User Information',
      createUserForm: 'User Properties',
      modifyUserForm: 'Modify User Properties',
      groupManage: 'Group Management',
      gruopForm: 'Group Information',
      createGroupForm: 'Group Registration',
      modifyGroupForm: 'Modify Group ',
      roleManage: 'Role & Permission Management',
      roleForm: 'Role Properties',
      modifyRoleForm: 'Modify Role Properties',
      menuHistory: 'Menu History',
      loginHistory: 'Login History',

      login: 'Login',
      modifyMyInfo: 'Account Information',
      saveID: 'Save ID',
      forgotPassword: 'Forgot Password',
      join: 'Signup',
      resetPassword: 'Reset Password',
      newPassword: 'New Password',
      resourceGroupCount: 'Project',
      datasetCount: 'Dataset',
      eventRepositoryCount: 'Event Log',
      processModelCount: 'Baseline Process',

      title: 'Title',
      content: 'Content',

      required: 'Required',

      // placeholder
      selectDuration: 'Select Duration',
      search: 'Search',
      startDate: 'Start Date',
      passwordValidate: 'Please enter 8-16 digits password including keyboard special character.',
      putTitle: 'Please enter title.',
      putQAContent: 'Write down your questions.',
      putEmailForAnswer: 'Enter your email address.',
      putImageFile: 'Please attach image.',


      totalUsers: 'Total Users',
      totalDatasource: 'Total Datasource',
      totalDataset: 'Total Dataset',
      totalEventLog: 'Total Event Log',
      totalBaselineProcess: 'Total Baseline Process',

    },

    // 각 메뉴마다 사용하는 필터 옵션들 여기다 모아놓기
    filter: {
      all: 'All',
      select: 'Select',
      used: 'Active',
      unUsed: 'Inactive',
      approved: 'Approved',
      unApproved: 'Disapproved',
      CREATED_ON: 'Registered Date',
      LICENSE_ACTIVE_ON: 'License Activation Date',
      LICENSE_EXPIRE_ON: 'License Expiration Date',
      GROUP_MANAGER: 'Group Admin',
      GROUP_VIEWER: 'User',
      GROUP_NAME: 'Group Name',
      USER_FULLNAME: 'Name',
      USER_EMAIL: 'Email',
      ORGANIZATION: 'Affiliation',
      ORGANIZATIONS: 'Affiliation',
      MANAGER_EMAIL: 'Admin Email',
      MANAGER_NAME: 'Admin Name',
      WAITING: 'Waiting for Approval',
      DISAPPROVAL: 'Disapproved',
      APPROVAL: 'Approved',
      EXPIRED: 'Expired',
      create: 'Create',
      edit: 'Modify',
      export: 'Export',
      delete: 'Delete',
      import: 'Import',
      mapping: 'Mapping',
      repo: {
        process: 'Baseline Process',
        repository: 'Event Log',
        dataset: 'Dataset',
        group: 'Project'
      },
      SELF: 'N',
      GROUP: 'Y',
      GROUP_USER: 'User',
      SYSTEM_MANAGER: 'System Admin',
      DEMO: 'Demo user',
      ACTIVE_ON: 'Accessed Date',
      SIGN_IN_ON: 'Login Date',
      SIGN_OUT_ON: 'Logout Date',
      process: {
        dashboard: 'Dashboard',
        discovery: 'Process Analysis',
        delta: 'Process Comparison',
        logReplay: 'Process Animation',
        social: 'Resource Analysis',
        matrix: 'Matrix Analysis',
        dotted: 'Event Analysis',
        gantt: 'Variant Analysis',
        detla: '',
        flow: 'Variant Analysis',
      },
      null: '-',
      ipr: {
        repo: {
          dataset: {
            create: 'Create Dataset',
          },
        },
      },
    },
    // 각 메뉴마다 사용하는 버튼들 여기다 모아놓기
    button: {
      create: 'New',
      search: 'Search',
      register: 'Register',
      save: 'Save',
      request: 'Request',
      cancel: 'Cancel',
      qna: 'Inquire',
      join: 'Membership',
      ok: 'OK',
      close: 'Close',
      sendEmail: 'Send Email',
      apply: 'Apply',

      // 2021-10-28
      editRole: 'Modify Role',
      createRole: 'Create Role',
    },
    login: {
      footerTitle: '<p>Are you still not an IPR member?</p>',
      footerItem: '<p>Sign up for the free cloud process mining platform now.</p>\n<p>We analyze your process and help you in business process innovation.</p>',
      forgotDesc: 'A password reset link will be sent to the email address you signed up for.'
    },
    join: {
      noticeText: 'E-mail verification is required when registering as a member, and membership registration is completed once verification is completed.'
    },
    qna: {
      title: 'Q&A',
      subTitle: 'Feel free to contact us.',
      noticeText: 'Please write below your inquiries.',
      companyName: 'IOChord Inc.',
      addressBusan: 'R&D Center (Busan) : NSN Building No. 301 (Woo-dong), Centum 5-ro 41, Haeundae-gu, Busan (47340)',
      addressSeoul: 'R&D Center (Seoul) : Nonhyeon Jaeil Building 4th Floor, Nonhyeon-dong, Gangnam-daero 136-gil 11, Gangnam-gu, Seoul (06043)',
      companyEmail: 'E-Mail : ipr@iochord.com',
      companyDigits: 'Tel. : 070-4323-0717'
    },
    // 필요한 alert 메세지 여기다 모아놓기
    alert: {
      title: {
        registerComplete: 'Register Complete',
        registerFail: 'Register Failed',
        modifyComplete: 'Modify Complete',
        saveComplete: 'Save Complete',
        saveFail: 'Save Failed',
        requestComplete: 'Request Complete',
        requestFail: 'Request Failed',
        reportComplete: 'Report Complete',
        reportFail: 'Report Failed',
        warning: 'Warning',
        alarm: 'Warning',
        joinFail: 'Join Membership Failed',
        oneMorePermissions: 'One or more Roles are required.'
      },
      checkEmail: 'Please enter correct email address',
      duplicateEmail: 'Email already used.',
      id:'Please enter user ID.',
      duplicateId:'User ID already used.',
      checkName:'Please enter name.',
      checkPassword:'Input password is not match. Please check again.',
      checkBlank: 'Please check empty value',
      same: 'Duplicated values exist',
      noRegisteredMembers: 'No member found',
      noRowsToShow: 'Sorry, no result found. Please try again.',
      createSucess: 'Registered success.',
      saveComplete: 'Save complete.',
      modifyComplete: 'Modify complete.',
      saveFail: 'Failed on save.\nPlease try again.',
      requestComplete: 'Requested change has been modified successfully.',
      requestFail: 'Request failed.\nPlease try again.',
      wrongRequest: 'Wrong request.\nPlease try again.',
      reportComplete: 'Inquiries have been registered.\nWe will contact you at the earliest convenience.',
      reportFail: 'Inquiries request error. Please try again. ',
      reportRequired: 'Please fill in required fields. Afterwards press confirm button.',
      loginFail: 'Account does not exist or input username/password is incorrect.',
      forgotRequestComplete: 'Request sent. Please check your email.',
      resetPasswordComplete: 'Password has been reset. Redirecting to login page.',

      joinComplete: '<h3 style="margin-bottom: 10px !important;}">Mr/Ms. {name}, thank you for joining IPR.</h3>\nPlease validate the account using the following {email}.\n<br />\nThe membership registration is completed once the email validation is completed.',
      joinFail: 'Registration failed.\nPlease try again.',

      authOk: '<h1 class="title">Email validation is complete</h1>\n<div class="content-body">\n<h4>Welcome.</h4>\n<h4>Membership registration has been completed.</h4>\n</div>',
      authAlready: '<h1 class="title">Validation Complete</h1>\n<div class="content-body">\n<h4>Redirecting to Login page.</h4>\n</div>',
      authError: '<h1 class="title">Wrong Information</h1>\n<div class="content-body">\n  <h4>Please check again membership info.</h4>\n<h4>Redirecting to Login page.</h4>\n</div>',

      wrongMember: 'Member addition failed due to no user is selected.\nPlease select users.',

      // sso error code
      SSO_ERR_400_00020001: 'User already exist.',
      SSO_ERR_400_00020002: 'Duplicated email address.',
      SSO_ERR_400_00030001: 'Duplicated Group ID.',
      SSO_ERR_400_00030002: 'Duplicated group.',
      SSO_ERR_404_00030003: 'Cannot find group.',

      passwordConfirm: 'Please check password.',
      oldPasswordConfirm: 'Please enter current password.',
      newPasswordConfirm: 'Please verify new password.',
      newPasswordConfirm2: 'To change password, please enter current password.',

      userIdConfirm: 'Please enter 5-20 digits username including alphabet and numeric characters.',
      contactConfirm: 'Please enter a valid contact information.',
      idNotSame: 'The same username and password are not allowed. Please check your input.',
      deletedWorkspace: 'This workspace has been deleted.',
    },
    other: {
      searchPlaceholder: 'Search'
    },
    account: {
      account: 'Account',
      profile: 'Profile',
      name: 'Name',
      email: 'E-mail',
      employee: 'Worker ID',
      registration: 'Registration Date',
      accountInformation: 'Account Information',
      company: 'Company',
      department: 'Department',
      rank: 'Position',
      contact: 'Contact',
      editPassword: 'Edit Password',
      password: 'Current Password',
      newPassword: 'New Password',
      verifyPassword: 'Verify Password',
      verifyNewPassword: 'Verify Password',
      save: 'Save',
      cancel: 'Cancel',
      workspace: 'Workspace',
      numberOfDataSources: 'Total Datasource',
      numberOfEventLogs: 'Total Event Logs',
      standardNumberOfProcesses: 'Total Baseline Process'
    },
    user: {
      employeenumber: 'Worker ID',
      name: 'Name',
      department: 'Department',
      isUse: 'Active/Inactive',
      noData: 'Result not found',
      userManagement: 'User Management',
      company: 'Company',
      // department:'부서',
      rank: 'Position',
      // name:'이름',
      email: 'E-mail',
      contact: 'Tel',
      since: 'Registered Date',
      authority: 'Role',
      userEdit: 'Modify User',
      userNew: 'New User',
      goBack: 'Back',
      accountInformation: 'Account Properties',
      // name:'이름',
      use: 'Active',
      unused: 'Inactive',
      editPassword: 'Edit Password',
      newPassword: 'New Password',
      verifyPassword: 'Verify Password',
      // authority:'권한' ,
      workspace: 'Workspace',
      all: 'All',
      manager: 'Admin',
      user: 'User',
      generalManager: 'Super Admin',
      username: 'Username',
      isDelete: 'Active/Inactive'
    },
    workspace: {
      //해당 데이터가 없습니다.
      workspaceManagement: 'Workspace Management',
      //회사
      workspaceName: 'Workspace Name',
      adminWorkerID: 'Admin Worker ID',
      // 관리자 이름
      numberOfUsers: 'Total Users',
      numberOfDataSources: 'Total Datasource',
      numberOfOriginalData: 'Total Dataset',
      numberOfEventLogs: 'Total Event Log',
      standardNumberOfProcesses: 'Total Baseline Process',
      // 가입일
      // 사용 여부
      editWorkspace: 'Modify Workspace',
      newWorkspace: 'New Workspace',
      // 돌아가기
      // newWorkspace:'워크스페이스 생성',
      workspaceProperties: 'Workspace Properties ',
      // workspaceName:'워크스페이스 이름',
      workspaceDescription: 'Workspace Description',
      // 사용 여부
      // 사용 여부
      // 미사용
      workspaceOwner: 'Workspace Owner',
      // 회사
      // 부서
      workspaceSetting: 'Workspace setting (Maximum Limit)',
      meansNoLimit: 'Enter -1 for unlimited configuration',
      dataset: 'Dataset',
      datasetRows: 'Max. Rows',
      event: 'Event Log',
      referenceProcess: 'Baseline Process',
      // 멤버 추가
      workerID: 'Worker ID',
      searchMember: 'Please search members.',
      // 이름
      // 부서
      // 사용 여부
      // workerID:'사원 번호',
      workerName: 'Name',
      addAllMembers: 'Add all members',
      addThisMember: 'Add a single member',
      memberList: 'Member List',
      // workerID:'사원 번호',
      // 사원 명
      // 권한
      // workspaceOwner:'워크스페이스 관리자',
      // 사용자
      // 저장
      // 돌아가기
      // newWorkspace:'워크스페이스 수정',
      workspaceproperties: 'Workspace Properties',
      // workspaceName:'워크스페이스 이름',
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
      addMembers: 'Add Member',
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
      workerID: 'Worker ID',
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
      role: 'Role',
      iprRepoDataset: 'ipr.repo.dataset',
      iprRepoRepository: 'ipr.repo.repository',
      iprRepoProcess: 'ipr.repo.process',
      iprUser: 'ipr.user',
      iprWorkspaceResource: 'ipr.workspace.resource',
      permission: 'Permission',
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
      workerID: 'Worker ID',
      name: 'Name',
      department: 'Department',
      notUse: 'Active/Inactive',
      menuUsageHistory: 'Menu History',
      company: 'Affiliation',
      // department:'부서',
      // workerID:'사원번호',
      rank: 'Position',
      // name:'이름',
      accessDate: 'Accessed Date',
      menu: 'Menu',
      workspace: 'Workspace',
      eventLog: 'Event Log',
      time: 'Processing Time'
    },
    loginHistory: {
      workerID: 'Worker ID',
      name: 'Name',
      department: 'Department',
      notUse: 'Active/Inactive',
      loginHistory: 'Login History',
      company: 'Affiliation',
      // department:'부서',
      employeeNumber: 'Worker ID',
      rank: 'Position',
      userEmail: 'Email',
      // name:'이름',
      LoginIP: 'Login IP',
      loginDate: 'Login Date'
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
