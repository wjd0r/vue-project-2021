import { Moment } from 'moment';

interface IDuration {
  start: Moment | Date;
  end: Moment | Date;
}

export default interface IFilter {
  duration: IDuration;
  // dashbaord
  comparedDuration?: IDuration;
  variantType?: 'STANDARD' | 'ES_MONTHLY' | string;
  // discovery
  algorithm?: 'fhm' | 'fuzzy';
  // discovery, delta, animation
  nodeText?: string;
  arcText?: string;
  dep?: number;
  freq?: number;
  // discovery
  nodeSign?: number;
  arcSign?: number;
  isComparedToPM?: boolean;
  // detla
  viewMode?: 'merged' | 'twoView';
  // animation
  tokenInclude?: string;
  tokenValue?: string;
  // social
  layout?: 'd3-force' | 'circle';
  colEventActivity?: string;
  rank?: string;
  // matrix
  selectedX?: string;
  selectedY?: string;
  selectedColorBy?: string;
  // dotted
  component?: string;
  value?: string;
  // gantt
  barSeries?: string;
  sortBy?: string;
  sortDirection?: string;

  sortingBy?: string;
}
