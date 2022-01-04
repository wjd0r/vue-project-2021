// overview
import CaseDurationHistogram from './CaseDurationHistogram.vue'; // 케이스 별 소요시간
import TracevariantDuration from './TracevariantDuration.vue'; // 평균 소요시간 상위 배리언트
import CaseSectionDuration from './CaseSectionDuration.vue'; // 소요시간 TOP 10 케이스 구간별 소요시간
import BottleneckStatistic from './BottleneckStatistic.vue'; // 병목 구간 현황
import CaseFreqTrend from './CaseFreqTrend.vue'; // 케이스 추이
// activity
import ActivityFreqCount from './ActivityFreqCount.vue'; // 액티비티 별 발생 건수
import ActivityDuration from './ActivityDuration.vue'; // 액티비티 별 평균 소요시간
import ActivityFreqTrend from './ActivityFreqTrend.vue'; // 액티비티 추이
import ActivityFreqStartRatio from './ActivityFreqStartRatio.vue'; // 시작 액티비티 비율
import ActivityFreqEndRatio from './ActivityFreqEndRatio.vue'; // 종료 액티비티 비율
// resource
import ResourceActivity from './ResourceActivity.vue'; // 액티비티 별 리소스
import ResourceCasesTimeRatio from './ResourceCasesTimeRatio.vue'; // 리소스 별 건수 대비 소요시간 비율
import ResourceFreqCount from './ResourceFreqCount.vue'; // 리소스 별 발생 건수
import ResourceMeanDuration from './ResourceMeanDuration.vue'; // 리소스 별 평균 소요시간
// originator
import OriginatorActivity from './OriginatorActivity.vue'; // 액티비티 별 담당자
import OriginatorCasesTimeRatio from './OriginatorCasesTimeRatio.vue'; // 담당자 별 건수 대비 소요시간 비율
import OriginatorFreqCount from './OriginatorFreqCount.vue'; // 담당자 별 발생 건수
import OriginatorMeanDuration from './OriginatorMeanDuration.vue'; // 담당자 별 평균 소요시간
// cost
import CostCases from './CostCases.vue'; // 비용 발생 TOP 10 케이스
import CostRatioByActivity from './CostRatioByActivity.vue'; // 액티비티 별 비용 발생 비율
import CostMeanResource from './CostMeanResource.vue'; // Top 10 리소스 별 평균 발생 비용
import CostMeanOriginator from './CostMeanOriginator.vue'; // Top 10 담당자 별 평균 발생 비용
// etc
import EventOverTime from './EventOverTime.vue'; // 이벤트 추이
// prettier-ignore
export default { 
  CaseDurationHistogram,
  TracevariantDuration,
  CaseSectionDuration,
  BottleneckStatistic,
  CaseFreqTrend,
  ActivityFreqCount,
  ActivityDuration,
  ActivityFreqTrend,
  ActivityFreqStartRatio,
  ActivityFreqEndRatio,
  ResourceActivity,
  ResourceCasesTimeRatio,
  ResourceFreqCount,
  ResourceMeanDuration,
  OriginatorActivity,
  OriginatorCasesTimeRatio,
  OriginatorFreqCount,
  OriginatorMeanDuration,
  CostCases,
  CostRatioByActivity,
  CostMeanResource,
  CostMeanOriginator,
  EventOverTime,
};
