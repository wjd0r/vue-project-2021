const dashboardTranslation = {
  dashboard: {
    general: {
      kpi: {
        case: {
          duration: {
            over: {
              ref: {
                model: {
                  title: 'Case over baseline duration',
                  value: '<div><h3>{count} ({percentage})</h3><span>Baseline Duration</span><br><span>{duration}</span></div>'
                }
              }
            }
          },
          outlier: {
            title: 'Top 10% quartile case duration',
            value: '<div><h3>{count}</h3><span>Baseline Duration</span><br><span>{threshold}</span></div>'
          }
        }
      }
    },
    overview: {
      title: 'Overview',
      chart: {
        case: {
          over: {
            time: 'Case Over Time'
          },
          duration: 'Top 10 Case Duration',
          trend: 'Case Over Time'
        },
        monthly: {
          case: 'Monthly Case Occurrence'
        },
        bottleneck: 'Bottleneck Region Analysis',
        duration: {
          by: {
            case: 'Case Group per Range Duration'
          }
        },
        events: {
          over: {
            time: 'Event Over Time'
          }
        },
        mean: {
          duration: {
            variant: 'Top Variants Avg. Duration '
          }
        }
      },
      kpi: {
        case: {
          total: 'Total Case'
        },
        event: {
          total: 'Total Event'
        },
        start: {
          timestamp: 'Start Timestamp'
        },
        end: {
          timestamp: 'End Timestamp'
        },
        completion: {
          rate: 'Completion Rate (This month)'
        }
      },
      // saas
      summary: {
        title: 'Overview',
        numberOfCases: 'No. of Cases',
        numberOfEvents: 'No. of Events',
        startTime: 'Start Timestamp',
        endTime: 'End Timestamp'
      },
      eventsOverTime: 'Events Over Time',
      activities: 'Activity Ratio',
      activeCasesOverTime: {
        count: 'Active Cases Over Time',
        monthly: 'Monthly Active Cases'
      },

      caseDurationHistogram: 'Case Duration Histogram',
      bottleneck: {
        statistics: 'Bottleneck Region'
      },
      cases: {
        title: 'Cases Summary',
        caseId: 'Case ID',
        events: 'No. of Events',
        started: 'Start Timestamp',
        finished: 'End Timestamp',
        duration: 'Duration',
        activeTime: 'Active Duration',
        utilization: 'Utilization'
      },
      tracevariantDuration: 'Avg. Processing Time per Variant'
    },
    activity: {
      title: 'Activity',
      chart: {
        mean: {
          duration: 'Duration per Activity'
        },
        count: 'Total Events per Activity',
        end: {
          ratio: 'End Activity Compliance'
        },
        start: {
          ratio: 'Start Activity Compliance'
        },
        trend: 'Activity Over Time'
      },
      kpi: {
        total: 'Total Activity',
        min: 'Min. Activity per Case',
        avg: 'Avg. Activity per Case',
        max: 'Max. Activity per Case'
      },

      // saas
      count: 'Total Activity',
      maxPerCase: 'Max. Activity per Case',
      minPerCase: 'Min. Activity per Case',
      meanPerCase: 'Avg. Activity per Case',
      frequency: 'Total Event per Activity',
      meanDuration: 'Avg. Event per Activity',

      dimension: {
        trend: 'Compliance Ratio of Working Hours per Activity',
        starts: 'Start Activity Compliance',
        ends: 'End Activity Compliance'
      }
    },
    resource: {
      title: 'Resource',
      chart: {
        resource: {
          by: {
            activity: 'Resource per Activity'
          }
        },
        event: {
          to: {
            duration: {
              ratio: 'Count vs Avg. Duration per Resource'
            }
          }
        },
        count: 'Total Event per Resource',
        mean: {
          duration: 'Mean Duration per Resource'
        }
      },
      kpi: {
        total: 'Total Resource',
        min: 'Min. Resource per Case',
        avg: 'Avg. Resource per Case',
        max: 'Max. Resource per Case'
      },

      // saas
      count: 'Total Worker',
      maxPerCase: 'Max. Worker per Case',
      minPerCase: 'Min. Worker per Case',
      meanPerCase: 'Avg. Worker per Case',
      frequency: 'Total Event per Worker',
      meanDuration: 'Avg. Event per Worker'
    },
    originator: {
      title: 'Originator',
      chart: {
        originator: {
          by: {
            activity: 'Originator per Activity'
          }
        },
        event: {
          to: {
            duration: {
              ratio: 'Count vs Avg. Duration per Originator'
            }
          }
        },
        count: 'Total Events per Originator',
        mean: {
          duration: 'Mean Duration per Originator'
        }
      },
      kpi: {
        total: 'Total Originator',
        min: 'Min. Originator per Case',
        avg: 'Avg. Originator per Case',
        max: 'Max. Originator per Case'
      },

      // saas
      count: 'Total Equipment',
      maxPerCase: 'Max. Equipment per Case',
      minPerCase: 'Min. Equipment per Case',
      meanPerCase: 'Avg. Equipment per Case',
      frequency: 'Total Event per Equipment',
      meanDuration: 'Avg. Event per Equipment'
    },
    cost: {
      title: 'Cost',
      chart: {
        cases: 'Top 10 Case Total Cost',
        avg: {
          by: {
            resource: 'Top 10 Avg. Cost per Resource',
            originator: 'Top 10 Avg. Cost per Originator'
          }
        },
        ratio: {
          by: {
            activity: 'Cost per Activity'
          }
        }
      },
      kpi: {
        total: 'Total Cost',
        min: 'Min. Cost per Case',
        avg: 'Avg. Cost per Case',
        max: 'Max. Cost per Case'
      }
    },
    personal: {
      title: 'Personalized'
    },
    all: {
      title: 'All'
    },
    etc: {
      title: 'Other'
    },
    kpi: {},
    dimension: {
      meanDuration: 'Avg. Processing Time per {dimension}', //[DIMENSION=액티비티|담당자|리소스]
      frequency: {
        count: 'No. of {dimension}',
        trend: '{dimension} Trends', //[DIMENSION=액티비티|담당자|리소스]
        starts: 'Start {dimension} Ratio', //[DIMENSION=액티비티|담당자|리소스]
        ends: 'End {dimension} Ratio' //[DIMENSION=액티비티|담당자|리소스]
      }
    },
    unit: {
      second: '(Second)',
      minute: '(Minute)',
      hour: '(Hour)',
      day: '(Day)',
      number: '(Count)'
    },
    table: {
      case: 'Case',
      duration: 'Duration',
      cost: 'Cost',
      needClickRow: 'Please click a row on the table.'
    },
    caseSectionDuration: {
      actual: 'Actual Duration',
      standard: 'Baseline Duration'
    },
    tracevariantDuration: {
      variant: 'Variant'
    },
    activityTrend: {
      monthly: 'Monthly',
      daily: 'Daily',
      time: 'Hourly',
      HH: 'Hour'
    },
    activityFreqRatio: {
      match: 'Matched with baseline process',
      notMatch: 'Occured only in event log',
    },
    casesTimeRatio: {
      durationTooltip: 'Duration {percentage}% Threshold : {value}',
      freqTooltip: 'Count {percentage}% Threshold : {value}'
    },
    histogramChart: {
      timeConfig: 'Duration Configuration',
      option: 'Option',
      unit: 'Unit',
      yTime: 'Y-axis: Time',
      yRate: 'Y-axis: Ratio',

      input: 'Enter value',

      day: 'Day',
      hour: 'Hour',
      min: 'Minute',
      sec: 'Second',

      minDuration: 'Min. Duration',
      maxDuration: 'Max. Duration',
      avgDuration: 'Avg. Duration',
      save: 'Apply',
      cancel: 'Cancel'
    },
    editor: {
      title: 'Dashboard Editing',
      palette: {
        kpi: 'KPI List',
        chart: 'Chart List',
        selectTab: 'Select tab',
      },
      inspector: {
        title: 'Setting',
        kpi: {
          name: 'KPI Name',
          namePlaceholder: 'Please enter KPI name'
        },
        chart: {
          name: 'Chart Name',
          namePlaceholder: 'Please enter chart name',
          type: 'Chart Type',
          color: 'Chart Color'
        }
      },
      alert: {
        save: {
          empty: 'The dashboard configuration cannot be saved due to data does not exist.',
          check: 'Configuration will be saved. Are you sure?'
        },
        delete: {
          check: 'Personalized dashboard will be deleted. Are you sure?\n(After deletion, the personalized dashboard cannot be shown on other event logs.)',
          finish: 'Personalized dashboard is successfully deleted.'
        },
        exit: {
          title: 'Configuration changes detected.',
          content: 'Unsaved configurations exist. Are you sure to leave this page?'
        }
      }
    },
    button: {
      reset: 'Reset',
      clear: 'Clear',
      size: 'Resize',
      save: 'Save',
      tabDelete: 'Delete Tab',
      exit: 'Exit'
    },
    alert: {
      histogramValidation: 'Time interval is overlapped.',
      histogramUpperbound: 'Only up to 7 series items are allowed.',
      histogramDownbound: 'At least 4 series items must be configured.',
      histogramSeries: 'At least 4 and at most 7 series items must be registered.',
      histogramLowerUpperCheck: 'Selected time series is out of time range.',
      noProcess: 'No associated baseline process is registered.',
      needAnalysis: 'Please configure Filter options',
    },
    tooltip: {
      table: 'Case Table',
      processDiscovery: 'Use this data in Process Analysis',
      logReplay: 'Use this data in Process Animation',
      matrixModel: 'Use this data in Matrix Analysis',
      processFlow: 'Use this data in Variant Analysis',
    },
  }
};
export default dashboardTranslation;
