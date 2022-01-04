const dashboardTranslation = {
  dashboard: {
    general: {
      kpi: {
        case: {
          duration: {
            over: {
              ref: {
                model: {
                  title: '표준 소요시간 초과 케이스',
                  value: '<div><h3>{count}건 ({percentage})</h3><span>표준 소요시간</span><br><span>{duration}</span></div>',
                },
              },
            },
          },
          outlier: {
            title: '소요시간 상위 10% 케이스',
            value: '<div><h3>{count}건</h3><span>기준 소요시간</span><br><span>{threshold}</span></div>',
          },
        },
      },
    },
    overview: {
      title: '데이터 요약',
      chart: {
        case: {
          over: {
            time: '케이스 추이',
          },
          duration: '소요시간 Top 10 케이스 구간별 소요시간',
          trend: '케이스 추이',
        },
        monthly: {
          case: '월별 케이스 수',
        },
        bottleneck: '병목 구간 현황',
        duration: {
          by: {
            case: '소요시간 별 케이스 수',
          },
        },
        events: {
          over: {
            time: '이벤트 추이',
          },
        },
        mean: {
          duration: {
            variant: '평균 소요시간 상위 프로세스 그룹',
          },
        },
      },
      kpi: {
        case: {
          total: '총 케이스 수',
        },
        event: {
          total: '총 이벤트 수',
        },
        start: {
          timestamp: '시작 시간',
        },
        end: {
          timestamp: '종료 시간',
        },
        completion: {
          rate: '이번 달 완료율',
        },
      },
      // saas
      summary: {
        title: '데이터 요약',
        numberOfCases: '케이스 개수',
        numberOfEvents: '이벤트 개수',
        startTime: '시작 시간',
        endTime: '종료 시간',
      },
      eventsOverTime: '이벤트 추이',
      activities: '액티비티 별 비율',
      activeCasesOverTime: {
        count: '케이스 추이',
        monthly: '월별 케이스 수',
      },

      caseDurationHistogram: '소요시간 별 케이스 수',
      bottleneck: {
        statistics: '병목 구간 현황',
      },
      cases: {
        title: '케이스 목록',
        caseId: '케이스 아이디',
        events: '이벤트 수',
        started: '시작 시간',
        finished: '종료 시간',
        duration: '총 소요시간',
        activeTime: '실제 소요시간',
        utilization: '이용률',
      },
      tracevariantDuration: '평균 소요시간 상위 배리언트',
    },
    activity: {
      title: '액티비티',
      chart: {
        mean: {
          duration: '액티비티 별 소요시간',
        },
        count: '액티비티 별 발생 건수',
        end: {
          ratio: '종료 액티비티 비율',
        },
        start: {
          ratio: '시작 액티비티 비율',
        },
        trend: '액티비티 추이',
      },
      kpi: {
        total: '총 액티비티 수',
        min: '케이스 별 최소 액티비티 수',
        avg: '케이스 별 평균 액티비티 수',
        max: '케이스 별 최대 액티비티 수',
      },

      // saas
      count: '액티비티 총 개수',
      maxPerCase: '케이스 별 최대 액티비티 수',
      minPerCase: '케이스 별 최소 액티비티 수',
      meanPerCase: '케이스 별 평균 액티비티 수',
      frequency: '액티비티 별 이벤트 수',
      meanDuration: '액티비티 별 이벤트 평균',

      dimension: {
        trend: '액티비티 별 표준 시간 준수 비율',
        starts: '시작 액티비티 매치',
        ends: '종료 액티비티 매치',
      },
    },
    resource: {
      title: '리소스',
      chart: {
        resource: {
          by: {
            activity: '액티비티 별 리소스',
          },
        },
        event: {
          to: {
            duration: {
              ratio: '리소스 별 건수 대비 평균 소요시간',
            },
          },
        },
        count: '리소스 별 발생 건수',
        mean: {
          duration: '리소스 별 평균 소요시간',
        },
      },
      kpi: {
        total: '총 리소스 수',
        min: '케이스 별 최소 리소스 수',
        avg: '케이스 별 평균 리소스 수',
        max: '케이스 별 최대 리소스 수',
      },

      // saas
      count: '총 리소스 개수',
      maxPerCase: '케이스 별 최대 리소스 수',
      minPerCase: '케이스 별 최소 리소스 수',
      meanPerCase: '케이스 별 평균 리소스 수',
      frequency: '리소스 별 이벤트 수',
      meanDuration: '리소스 별 이벤트 평균',
    },
    originator: {
      title: '담당자',
      chart: {
        originator: {
          by: {
            activity: '액티비티 별 담당자',
          },
        },
        event: {
          to: {
            duration: {
              ratio: '담당자 별 건수 대비 평균 소요시간',
            },
          },
        },
        count: ' 담당자 별 발생 건수',
        mean: {
          duration: '담당자 별 평균 소요시간',
        },
      },
      kpi: {
        total: '총 담당자 수',
        min: '케이스 별 최소 담당자 수',
        avg: '케이스 별 평균 담당자 수',
        max: '케이스 별 최대 담당자 수',
      },

      // saas
      count: '총 담당자 수',
      maxPerCase: '케이스 별 최대 담당자 수',
      minPerCase: '케이스 별 최소 담당자 수',
      meanPerCase: '케이스 별 평균 담당자 수',
      frequency: '담당자 별 이벤트 수',
      meanDuration: '담당자 별 이벤트 평균',
    },
    cost: {
      title: '비용',
      chart: {
        cases: '비용 발생 Top 10 케이스',
        avg: {
          by: {
            resource: 'Top 10 리소스 별 평균 발생 비용',
            originator: 'Top 10 담당자 별 평균 발생 비용',
          },
        },
        ratio: {
          by: {
            activity: '액티비티 별 비용 발생 비율',
          },
        },
      },
      kpi: {
        total: '총 비용',
        min: '케이스 별 최소 비용',
        avg: '케이스 별 평균 비용',
        max: '케이스 별 최대 비용',
      },
    },
    personal: {
      title: '개인',
    },
    all: {
      title: '전체',
    },
    etc: {
      title: '기타',
    },
    kpi: {},
    dimension: {
      meanDuration: '{dimension} 별 평균 소요시간', //[DIMENSION=액티비티|담당자|리소스]
      frequency: {
        count: '{dimension} 별 발생 건수',
        trend: '{dimension} 추이', //[DIMENSION=액티비티|담당자|리소스]
        starts: '시작 {dimension} 비율', //[DIMENSION=액티비티|담당자|리소스]
        ends: '종료 {dimension} 비율', //[DIMENSION=액티비티|담당자|리소스]
      },
    },
    unit: {
      second: '(초)',
      minute: '(분)',
      hour: '(시)',
      day: '(일)',
      number: '(건수)',
    },
    table: {
      case: '케이스',
      duration: '소요시간',
      cost: '비용',
      needClickRow: '테이블 행을 클릭해주세요.',
    },
    caseSectionDuration: {
      actual: '실제 소요시간',
      standard: '표준 소요시간',
    },
    tracevariantDuration: {
      variant: '그룹',
    },
    activityTrend: {
      monthly: '월 별',
      daily: '일 별',
      time: '시간대 별',
      HH: '시',
    },
    activityFreqRatio: {
      match: '표준 프로세스와 일치',
      notMatch: '표준 프로세스와 일치하지 않음',
    },
    casesTimeRatio: {
      durationTooltip: '소요시간 {percentage}% 기준치 : {value}',
      freqTooltip: '건수 {percentage}% 기준치 : {value}',
    },
    histogramChart: {
      timeConfig: '소요시간 설정',
      option: '옵션',
      unit: '단위',
      yTime: '{axis}축: 시간',
      yRate: '{axis}축: 비율',

      input: '입력',

      day: '일',
      hour: '시',
      min: '분',
      sec: '초',

      minDuration: '최소시간',
      maxDuration: '최대시간',
      avgDuration: '평균시간',
      save: '적용',
      cancel: '취소',
    },
    editor: {
      title: '대시보드 편집',
      palette: {
        kpi: 'KPI 목록',
        chart: '차트 목록',
        selectTab: '탭 선택',
      },
      inspector: {
        title: '설정',
        kpi: {
          name: 'KPI 이름',
          namePlaceholder: 'KPI 이름을 입력하세요',
        },
        chart: {
          name: '차트 이름',
          namePlaceholder: '차트 이름을 입력하세요',
          type: '차트 유형',
          color: '차트 색상',
        },
      },
      alert: {
        save: {
          empty: '생성된 KPI 또는 차트가 없으므로 저장할 수 없습니다.',
          check: '저장하시겠습니까?',
        },
        delete: {
          check: `개인탭을 제거하시겠습니까?\n(제거 시 다른 이벤트로그에서 사용하실 수 없습니다.)`,
          finish: '개인 탭이 제거되었습니다.',
        },
        exit: {
          title: '변경된 사항이 있습니다.',
          content: '저장하지 않고 나가시겠습니까?',
        },
      },
    },
    button: {
      reset: '초기화',
      clear: '비우기',
      size: '차트 정렬',
      save: '저장',
      tabDelete: '개인탭 삭제',
      exit: '나가기',
    },
    alert: {
      histogramValidation: '시간 설정이 중복되었습니다.',
      histogramUpperbound: '범위 외의 범주까지 포함해서 범주는 최대 7개 이하 되어야 합니다.',
      histogramDownbound: '범주는 최소 4개 이상 되어야 합니다.',
      histogramSeries: '범주는 최소 4개부터 최대 7개까지 생성할 수 있습니다.',
      histogramLowerUpperCheck: '시간 범위를 초과합니다.',
      noProcess: '기본 표준 프로세스가 설정 되지않았습니다.',
      needAnalysis: '분석 조건을 설정해주세요.',
    },
    tooltip: {
      table: '케이스 목록',
      processDiscovery: '프로세스 분석으로 이동',
      logReplay: '프로세스 애니메이션으로 이동',
      matrixModel: '데이터 분석으로 이동',
      processFlow: '프로세스 흐름 분석으로 이동',
    },
  },
};
export default dashboardTranslation;
