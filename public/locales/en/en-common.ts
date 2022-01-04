const commonTranslation = {
  // {{ $t('view.common.header.projectList') }}
  common: {
    // 상단 모든 내용 여기 모아놓기
    header: {
      projectList: 'Project',
      eventList: 'Event Log',
      standardList: 'Baseline Process',
      loginUserName: '{name}',
      updateMe: 'My Account',
      management: 'History',
      purple: 'Purple Theme',
      brown: 'Brown Theme',
      green: 'Green Theme',
      QnA: 'Q&A',
      logout: 'Logout'
    },
    sidebar: {},
    help: {
      title: 'Help',
      dashboard: 'Dashboard',
      discovery: 'Process Analysis',
      delta: 'Process Comparison',
      logReplay: 'Process Animation',
      social: 'Resource Analysis',
      matrix: 'Matrix Analysis',
      dotted: 'Event Analysis',
      project: 'Project',
      eventGroup: 'Dataset',
      event: 'Event Log',
      standard: 'Baseline Process',
      mapping: 'Mapping',
      processEditor: 'Process Editor'
    },
    pageCant: {
      title: 'Screen Resolution',
      content: '<p>Device screen resolution is not supported.</p><div class="limit-text"><div class="title">Recommended Resolution</div><p>PC > 1920</p><p>Tablet > 1024</p></div>'
    },
    noPermission : {
      title: 'Unauthorized access',
      content: ' <p>Account does not have permission to access this page.</p>',
      home: 'Redirect to Home',
    },
    // 공통 툴 팁 여기 모아놓기
    tooltip: {
      help: 'Help'
    },
    alert: {
      notSupported: 'Browser is not supported.</h5>\n<h5>Please use supported Chrome, Edge, Firefox or Safari browser.',
      allowPopup: 'Please allow pop-up on your browser settings.',
      serverError: 'Server error occurs. If repeated error occured please contact us.'
    },
    label: {
      noPermission: 'Unauthorized access',
      noPermissionExplanation: 'Account does not have permission to access this functionality.',
    },
    maints: {
      valueValidate: 'Please enter a value',
      //'영문, 숫자, 특수문자를 포함한 8~16자리'
      passwordValidate: 'Please enter the same password as above',
      //올바른 이메일 주소를 입력하세요
    }
  }
};

export default commonTranslation;
