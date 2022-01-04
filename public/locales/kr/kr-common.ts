const commonTranslation = {
  // {{ $t('view.common.header.projectList') }}
  common: {
    // 상단 모든 내용 여기 모아놓기
    header: {
      projectList: '프로젝트',
      eventList: '이벤트',
      standardList: '표준 프로세스',
      loginUserName: '{name} 님',
      updateMe: '계정 정보',
      management: '시스템 관리',
      purple: '보라 테마',
      brown: '갈색 테마',
      green: '초록 테마',
      QnA: '문의하기',
      logout: '로그아웃',
    },
    sidebar: {},
    help: {
      title: '도움말',
      dashboard: '데이터 요약',
      discovery: '프로세스 분석',
      delta: '프로세스 비교',
      logReplay: '프로세스 애니메이션',
      social: '리소스 관계 분석',
      matrix: '데이터 분석',
      dotted: '액티비티 분석',
      project: '프로젝트',
      eventGroup: '데이터셋',
      event: '이벤트',
      standard: '표준 프로세스',
      mapping: '매핑',
      processEditor: '프로세스 편집',
    },
    pageCant: {
      title: '해상도 제한',
      content: `<p>현재 기기에서 해당 화면을 확인하실 수 없습니다.</p><div class="limit-text"><div class="title">권장 해상도</div><p>PC 1920 이상</p><p>태블릿 1024 이상</p></div>`
    },
    noPermission : {
      title: '권한 없음',
      content: ' <p>해당 기능의 권한이 없습니다.</p>',
      home: '홈으로',
    },
    // 공통 툴 팁 여기 모아놓기
    tooltip: {
      help: '도움말',
    },
    alert: {
      notSupported: '해당 브라우저는 서비스를 지원하지 않습니다.</h5>\n<h5>엣지 또는 크롬 브라우저를 사용하시기 바랍니다.',
      allowPopup: '팝업차단을 허용해주시기 바랍니다.',
      serverError: '서버 에러가 발생했습니다. 에러가 반복되면 이메일을 통한 문의 바랍니다.'
    },
    label: {
      noPermission: '권한 없음',
      noPermissionExplanation: '해당 기능의 권한이 없습니다.',
    },
    maints: {
      valueValidate: '값을 입력하세요',
      //'영문, 숫자, 특수문자를 포함한 8~16자리'
      passwordValidate: '위와 동일한 비밀번호를 입력하세요',
      //올바른 이메일 주소를 입력하세요
    }
  }
};

export default commonTranslation;
