const processTranslation = {
  process: {
    label: {
      er: 'Resource',
      eo: 'Originator',
      duration: 'Duration',
    },
    // 각 메뉴마다 사용하는 필터들 여기다 모아놓기
    filter: {
      //placeholder
      startDate: 'Start Date',
      endDate: 'End Date',
      selectDuration: 'Please select duration',
      title: {
        filterTitle: 'Filter',
        duration: 'Duration',
        variantType: 'Group Items',
        algorithm: 'Algorithm',
        nodeText: 'Activity',
        arcText: 'Transition',
        direct: 'Direction',

        isComparedToPM: 'Display with baseline process',

        legend: 'Series',
        sortBy: 'Sort By',
        viewMode: 'View mode', // 프로세스 비교
        layout: 'Layout', // 리소스 관계 분석
        colEventActivity: 'Perspective',

        selectX: 'X-axis',
        selectY: 'Y-axis',
        selectedColorby: 'Calculate',

        tokenInclude: 'Includes',
        tokenValue: 'Values',

        C: 'Y-axis',
        Ca: 'Classifier'
      },
      value: {
        STANDARD: 'Trace Variant',
        ES_MONTHLY: 'Monthly',
        fhm: 'Heuristics Miner',
        fuzzy: 'Fuzzy Miner',
        ccnt: 'Case Count',
        vs: 'Start Timestamp',
        vc: 'End Timestamp',
        aduravgASC: 'Shortest Duration',
        aduravgDESC: 'Longest Duration',
        statistics: {
          count: 'Frequency',
          countCases: 'Case Count',
          total: 'Duration - Total',
          min: 'Duration - Min.',
          max: 'Duration - Max',
          average: 'Duration - Avg.',
          q2: 'Duration - Median',
          total2: 'Utilization',
          en: 'Cost - Event',
          cn: 'Cost - Case',

          en_total: 'Event Cost - Total',
          en_min: 'Event Cost - Min.',
          en_max: 'Event Cost - Max.',
          en_average: 'Event Cost - Avg.',

          cn_total: 'Case Cost - Total',
          cn_min: 'Case Cost - Min.',
          cn_max: 'Case Cost - Max.',
          cn_average: 'Case Cost - Avg.'
        },
        d: 'Dependency',
        f: 'Frequency',
        reworks: { total: 'Rework' },
        bottlenecks: 'Bottleneck',

        tb: 'Vertical',
        rb: 'Horizontal',

        all: 'All',
        select: 'Select',
        ea: 'Activity',
        edf: 'Activity Flow',
        eo: 'Originator',
        er: 'Resource',
        ci: 'Case ID',
        caseId: 'Case ID',
        esm: 'Monthly',

        d3Force: 'Automatic',
        circle: 'Circular',

        merged: 'Integrated',
        twoView: 'Split'
      },
      option: {
        optionVariantTye: 'Variants',
        optionAlgorithm: 'Algorithms',
        optionNode: 'Activity',
        optionArc: 'Transition',
        optionArcControl: 'Adjust graph',
        optionbase: 'Baseline',
        optionCaseid: 'Case ID',
        optionX: 'X-axis',
        optionY: 'Y-axis',
        optionCa: 'Classifier',
        optionvalue: 'Calculate',
        optionSelect: 'Selected',
        optionSelectItem: 'Selected items',
        optionSelectchart: 'Selected charts',
        optionSelecttoken: 'Selected tokens',
        optionsBarSeries: 'Series',
        optionSortBy: 'Sort By'
      }
    },
    // 각 메뉴마다 사용하는 버튼들 여기다 모아놓기
    button: {
      getVariant: 'Analyze',
      analysis: 'Analyze',
      hide: 'Hide',
      show: 'Show'
    },
    variant: {
      title: {
        variantTitle: 'Results',
        allTitle: 'All',
        caseCount: 'Case Count',
        variantName: 'Variant',
        variantProcess: 'Baseline Process'
      }
    },
    discovery: {
      NODE: 'Activity',
      ARC: 'Transition'
    },
    delta: {
      labelKpi: 'Cross-Fitness',
      labelAll: 'All',
      labelStandard: 'Baseline Process',
      labelGroup: 'Variant',
      labelProcess: 'Process'
    },
    logreplay: {},
    social: {
      NODE: 'Node',
      ARC: 'Arc',
      baseBy: {
        ea: 'Activity',
        eo: 'Originator',
        er: 'Resource'
      }
    },
    matrix: {},
    dotted: {},
    gantt: {
      tooltip: {
        ea: 'Activity',
        ccnt: 'Case Count',
        minStartTime: 'Min. Start Time',
        maxCompleteTime: 'Max. Completion Time',
        meanTime: 'Duration - Avg.',
        variant: 'Variant',
        minDuration: 'Duration - Min.',
        maxDuration: 'Duration - Max.',
        meanDuration: 'Duration - Avg.'
      }
    },
    flow: {
      chart: {
        axis: {
          variant: 'Variant',
          fitness: 'Fitness'
        },
        tooltip: {
          ea: 'Activity',
          ccnt: 'Case Count',
          minStartTime: 'Min. Start Time',
          maxCompleteTime: 'Max. Completion Time',
          meanTime: 'Duration - Avg.',
          variant: {
            title: 'Variants',
            content: 'Variant'
          },
          minDuration: 'Duration - Min.',
          maxDuration: 'Duration - Max.',
          meanDuration: 'Duration - Avg.'
        }
      }
    },

    // 각 테이블 칼럼들 여기다 모아놓기
    table: {
      caseTitle: 'Case Table',
      resourceTitle: 'Resource Table',
      originatorTitle: 'Originator Table',
      caseDetailTitle: 'Activity Table',
      reworksTitle: 'Reworks Activity Table',
      bottlenecksTitle: 'Bottleneck Region Table',
      bottlenecksTitleDiscovery: 'Bottleneck Region Table (Process Analysis)',
      bottlenecksTitleReplay: 'Bottleneck Region Table (Process Animation)',
      bottlenecksBase: 'Baseline : Processing Time',

      ci: 'Case ID',
      ecnt: 'No. of Event',
      ces: 'Start Timestamp',
      cec: 'End Timestamp',
      source: 'Source Activity',
      target: {
        discovery: 'Target Activity',
        replay: 'Target Activity'
      },
      cdur: 'Case Duration',
      edur: 'Duration',
      edur_avg: 'Avg. Duration',
      tdur: 'Transition Processing Time',
      group: 'Group',
      ucl: 'Upper Control Limit',
      total: 'Processing Time',
      activity: 'Activity',
      rwCount: 'Reworks Count',
      rwAverageCases: 'Avg. Reworks Processing Time',
      rwCountCases: 'No. of Reworks Case',
      outlierCountCasesRatio: 'Reworks Ratio (Count)',
      outlierAverageCases: 'Avg. Reworks Case',
      averageCases: 'Avg. Cases',
      outlierAverageCasesRatio: 'Reworks Ratio (Hour)',
      cl: 'Case Completion',

      ea: 'Activity',
      eo: 'Originator',
      er: 'Resource',
      cn: 'Cost - Case',
      en: 'Cost - Event',

      complete: 'Complete',
      imcomplete: 'Incomplete',

      countConstant: 'Freq. Thresh. {percentage}%',
      durationConstant: 'Duration Thresh. {percentage}%',

      freq: 'Frequency',
      duration: 'Duration',

      dayUnit: 'Day',
      hourUnit: 'Hour',
      minUnit: 'Minute',
      secUnit: 'Second',

      noRowsToShow: 'Result not found. Please try again.'
    },
    // 필요한 alert 메세지 여기다 모아놓기
    alert: {
      title: {
        alarm: 'Warning'
      },
      variantNodata: 'Result not found. Please try again.',
      Nodata: 'Result not found. Please try again.',
      dataErEo: "This analysis required 'Resource' or 'Originator' field in the event log.",
      cantMakeProcessNodata: 'Data not found. Baseline process cannot be created.',
      cantMakeProcess413: 'There are more than 1,000 objects in this graph. To create baseline process, please filter the graph.',
      chooseFilter: 'Please configure Filter.',
      loadingVariantList: 'Calculating variants.',
      chooseVariant: 'Please select variant in the Results.',
      needTokenValue: 'Please enter include values',

      variant: {
        choose: {
          one: 'Please select 1 variant',
          two: 'Please select 2 variants'
        }
      },

      IPR_ERR_413_00030001: 'The graph cannot be shown due to graph size more than 1,000 objects. Please reconfigure the filter selection.'
    },
    // 각 툴팁 내용 여기다 모아놓기
    tooltip: {
      tooltipHelp: 'Help',
      tooltipFilter: 'Filter',
      tooltipVariant: 'Results',
      tooltipEditor: 'Baseline Process Editor',
      tooltipCase: 'Case Table',
      tooltipReworks: 'Reworks Activity Table',
      tooltipBottlenecks: 'Bottleneck Region Table.',
      tooltipDownload: 'Download',
      tooltipDirectTB: 'Vertical View',
      tooltipDirectLR: 'Horizontal View',
      tooltipMinimapOn: 'Show Minimap',
      tooltipMinimapOff: 'Hide Minimap',
      tooltipAlign: 'Sort Graph'
    }
  }
};

export default processTranslation;
