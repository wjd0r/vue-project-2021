const processTranslation = {
  process: {
    label: {
      er: '리소스',
      eo: '담당자',
      duration: '소요시간',
    },
    // 각 메뉴마다 사용하는 필터들 여기다 모아놓기
    filter: {
      //placeholder
      startDate: '시작 일자',
      endDate: '종료 일자',
      selectDuration: '기간을 선택해주세요.',
      title: {
        filterTitle: '분석 조건',
        duration: '기간',
        variantType: '분석 항목',
        algorithm: '알고리즘',
        nodeText: '액티비티',
        arcText: '연결선',
        direct: '방향',

        isComparedToPM: '표준 프로세스와 비교하기',

        legend: '범례',
        sortBy: '정렬 기준',
        viewMode: '보기 방법', // 프로세스 비교
        layout: '보기 방법', // 리소스 관계 분석
        colEventActivity: '분석 기준',

        selectX: 'X축',
        selectY: 'Y축',
        selectedColorby: '값 유형',

        tokenInclude: '추가조건',
        tokenValue: '조건값',

        C: 'Y축',
        Ca: '구분속성',
      },
      value: {
        STANDARD: '흐름 분석',
        ES_MONTHLY: '월간 분석',
        fhm: 'Heuristics Miner',
        fuzzy: 'Fuzzy Miner',
        ccnt: '케이스 수',
        vs: '시작 시간',
        vc: '완료 시간',
        aduravgASC: '짧은 기간',
        aduravgDESC: '긴 기간',
        statistics: {
          count: '빈도',
          countCases: '케이스 수',
          total: '소요시간 - 합계',
          min: '소요시간 - 최소',
          max: '소요시간 - 최대',
          average: '소요시간 - 평균',
          q2: '소요시간 - 중간값',
          total2: '사용률',
          en: '이벤트 비용',
          cn: '케이스 총 비용',

          en_total: '이벤트 비용 - 합계',
          en_min: '이벤트 비용 - 최소',
          en_max: '이벤트 비용 - 최대',
          en_average: '이벤트 비용 - 평균',

          cn_total: '케이스 총 비용 - 합계',
          cn_min: '케이스 총 비용 - 최소',
          cn_max: '케이스 총 비용 - 최대',
          cn_average: '케이스 총 비용 - 평균',
        },
        d: '의존도',
        f: '빈도',
        reworks: { total: '반복' },
        bottlenecks: '병목 구간',

        tb: '세로',
        rb: '가로',

        all: '전체',
        select: '선택',
        ea: '액티비티',
        edf: '액티비티 구간',
        eo: '담당자',
        er: '리소스',
        ci: '케이스 아이디',
        caseId: '케이스 아이디',
        esm: '기간(월)',

        d3Force: '자동',
        circle: '원형',

        merged: '합쳐서 보기',
        twoView: '나눠서 보기',
      },
      option: {
        optionVariantTye: '분석 항목',
        optionAlgorithm: '알고리즘',
        optionNode: '액티비티',
        optionArc: '연결선',
        optionArcControl: '연결선 조정',
        optionbase: '기준',
        optionCaseid: '케이스 아이디',
        optionX: 'X축',
        optionY: 'Y축',
        optionCa: '구분속성',
        optionvalue: '값 유형',
        optionSelect: '선택된',
        optionSelectItem: '선택된 아이템',
        optionSelectchart: '선택된 차트 값',
        optionSelecttoken: '선택된 토큰',
        optionsBarSeries: '범례',
        optionSortBy: '정렬 기준',
      },
    },
    // 각 메뉴마다 사용하는 버튼들 여기다 모아놓기
    button: {
      getVariant: '조회',
      analysis: '분석',
      hide: '숨기기',
      show: '보이기',
    },
    variant: {
      title: {
        variantTitle: '분석 목록',
        allTitle: '전체',
        caseCount: '케이스 수',
        variantName: '그룹',
        variantProcess: '표준 프로세스',
      },
    },
    discovery: {
      NODE: '액티비티',
      ARC: '연결선',
    },
    delta: {
      labelKpi: '상호 적합도',
      labelAll: '전체',
      labelStandard: '표준',
      labelGroup: '그룹',
      labelProcess: '프로세스',
    },
    logreplay: {},
    social: {
      NODE: '노드',
      ARC: '연결선',
      baseBy: {
        ea: '액티비티',
        eo: '담당자',
        er: '리소스',
      },
    },
    matrix: {},
    dotted: {},
    gantt: {
      tooltip: {
        ea: '액티비티',
        ccnt: '케이스 수',
        minStartTime: '최소 시작 시간',
        maxCompleteTime: '최대 종료 시간',
        meanTime: '평균 시간',
        variant: '그룹',
        minDuration: '최소 소요시간',
        maxDuration: '최대 소요시간',
        meanDuration: '평균 소요시간',
      },
    },
    flow: {
      chart: {
        axis: {
          variant: '그룹',
          fitness: '적합도',
        },
        tooltip: {
          ea: '액비티비',
          ccnt: '케이스 건수',
          minStartTime: '최소 시작 시간',
          maxCompleteTime: '최대 종료 시간',
          meanTime: '평균 시간',
          variant: {
            title: '분석 그룹',
            content: '그룹',
          },
          minDuration: '최소 소요시간',
          maxDuration: '최대 소요시간',
          meanDuration: '평균 소요시간',
        },
      },
    },

    // 각 테이블 칼럼들 여기다 모아놓기
    table: {
      caseTitle: '케이스 목록',
      resourceTitle: '리소스 목록',
      originatorTitle: '담당자 목록',
      caseDetailTitle: '상세 목록',
      reworksTitle: '반복 액티비티 목록',
      bottlenecksTitle: '병목 구간 목록',
      bottlenecksTitleDiscovery: '병목 구간 목록(프로세스 분석)',
      bottlenecksTitleReplay: '병목 구간 목록(프로세스 애니메이션)',
      bottlenecksBase: '기준 : 소요시간',

      ci: '케이스 아이디',
      ecnt: '이벤트 수',
      ces: '시작 시간',
      cec: '종료 시간',
      source: '시작 액티비티',
      target: {
        discovery: '도착 액티비티',
        replay: '종료 액티비티',
      },
      cdur: '케이스 소요시간',
      edur: '소요시간',
      edur_avg: '평균 소요시간',
      tdur: '액티비티 구간 소요시간',
      group: '그룹',
      ucl: '병목기준',
      total: '소요시간',
      activity: '액티비티',
      rwCount: '반복 횟수',
      rwAverageCases: '반복 평균 소요시간',
      rwCountCases: '반복 케이스 수',
      outlierCountCasesRatio: '병목비율 (건수)',
      outlierAverageCases: '병목 케이스 평균',
      averageCases: '케이스 평균',
      outlierAverageCasesRatio: '병목비율 (시간)',
      cl: '케이스 완료 여부',

      ea: '액티비티 명',
      eo: '담당자',
      er: '리소스',
      cn: '케이스 비용',
      en: '이벤트 비용',

      complete: '완료',
      imcomplete: '미완료',

      countConstant: '건수 {percentage}% 기준',
      durationConstant: '소요시간 {percentage}% 기준',

      freq: '발생 건수',
      duration: '소요시간',

      dayUnit: '일',
      hourUnit: '시',
      minUnit: '분',
      secUnit: '초',

      noRowsToShow: '해당 데이터가 없습니다.',
    },
    // 필요한 alert 메세지 여기다 모아놓기
    alert: {
      title: {
        alarm: '경고',
      },
      variantNodata: '해당 데이터가 없거나 분석 결과가 없습니다.',
      Nodata: '해당 데이터가 없습니다.',
      dataErEo: "페이지를 표시하기 위해서는 '담당자' 또는 '리소스' 데이터가 필요합니다.",
      cantMakeProcessNodata: '해당 데이터가 없어 표준 프로세스를 만들 수 없습니다.',
      cantMakeProcess413: '개체 크기가 1,000개를 초과하여 표준 프로세스를 만들 수 없습니다.',
      chooseFilter: '분석 조건을 설정하여 조회해주세요.',
      loadingVariantList: '분석 목록을 가져오고 있습니다.',
      chooseVariant: '분석 목록을 통해 그룹을 선택해 주세요.',
      needTokenValue: '조건값을 입력해주세요.',

      variant: {
        choose: {
          one: '프로세스 그룹을 선택해주세요.',
          two: '프로세스 그룹 2개를 선택해주세요.',
        },
      },

      IPR_ERR_413_00030001: '개체 크기가 1,000개를 초과하여 결과를 표시할 수 없습니다. 분석 조건에서 세부적인 조건을 적용할 시 결과를 확인할 수 있습니다.',
    },
    // 각 툴팁 내용 여기다 모아놓기
    tooltip: {
      tooltipHelp: '도움말',
      tooltipFilter: '분석 조건',
      tooltipVariant: '분석 목록',
      tooltipEditor: '표준 프로세스 편집기',
      tooltipCase: '케이스 목록',
      tooltipReworks: '반복 액티비티 목록',
      tooltipBottlenecks: '병목 구간 목록',
      tooltipDownload: '다운로드',
      tooltipDirectTB: '세로로 보기',
      tooltipDirectLR: '가로로 보기',
      tooltipMinimapOn: '미니맵 보이기',
      tooltipMinimapOff: '미니맵 숨기기',
      tooltipAlign: '그래프 정렬',
    },
  },
};

export default processTranslation;
