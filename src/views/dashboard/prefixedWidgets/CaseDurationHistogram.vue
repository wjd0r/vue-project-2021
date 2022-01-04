<template>
  <chart-widget ref="chartWidget" :title="title" :widget="widget" :isNoData="isNoData" :showLoading="showLoading">
    <template v-if="!isEditor" #right-align>
      <template v-if="!isNoData && !showLoading">
        <div class="ico-header ico-table" :class="{ disabled: tableFilter.value === '' }" @click="onClickTable()" alt="케이스 테이블 아이콘"></div>
        <div class="ico-header ico-manage" @click="onClickDuration()" alt="소요시간 설정 아이콘"></div>
      </template>
    </template>
    <template #content>
      <div ref="chart" class="content w-100 h-100"></div>
      <template v-if="!isEditor && !isNoData">
        <!-- 케이스 테이블 -->
        <widget-table ref="widgetTable" v-model="showTable" :option="widgetTableOpion" :tableLoading.sync="tableLoading" @getCaseTableView="getCaseTableView" @onInputPage="onInputPage" @onDetailInputPage="onDetailInputPage" @downloadCSV="downloadCSV"></widget-table>
        <!-- 케이스 테이블 -->
        <!-- 소요시간 -->
        <div v-show="showDuration && !showLoading" class="duration-component" :style="{ 'z-index': showDuration ? 9 : 0 }">
          <div class="duration-content">
            <div class="content-header">
              <div class="title" desc="소요시 시간 설정">{{ $t('view.dashboard.histogramChart.timeConfig') }}</div>
            </div>
            <div class="content-body">
              <div class="filter-content">
                <div class="form-content">
                  <b-form-group id="option-select" label-cols-sm="3" label-cols-lg="2" :label="$t('view.dashboard.histogramChart.option')">
                    <b-form-select v-model="yOptions" disabled>
                      <b-form-select-option value="yTime">
                        {{ $t('view.dashboard.histogramChart.yTime', { axis: data.widgetType === 'BAR_CHART' ? 'Y' : 'X' }) }}
                        <!--Y축: 시간-->
                      </b-form-select-option>
                      <b-form-select-option value="yRate">
                        {{ $t('view.dashboard.histogramChart.yRate', { axis: data.widgetType === 'BAR_CHART' ? 'Y' : 'X' }) }}
                        <!--Y축: 비율-->
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </div>
                <div class="form-content">
                  <b-form-group id="unit-select" label-cols-sm="3" label-cols-lg="2" :label="$t('view.dashboard.histogramChart.unit')">
                    <b-form-select class="durationUnit" v-model="durationUnit" @change="durationUnitChangedToTime()" :disabled="yOptions === 'yRate'">
                      <b-form-select-option value="day">
                        {{ $t('view.dashboard.histogramChart.day') }}
                        <!--일-->
                      </b-form-select-option>
                      <b-form-select-option value="hour">
                        {{ $t('view.dashboard.histogramChart.hour') }}
                        <!--시-->
                      </b-form-select-option>
                      <b-form-select-option value="minute">
                        {{ $t('view.dashboard.histogramChart.min') }}
                        <!--분-->
                      </b-form-select-option>
                      <b-form-select-option value="second">
                        {{ $t('view.dashboard.histogramChart.sec') }}
                        <!--초-->
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </div>
              </div>

              <div class="times-content">
                <div class="min-time">
                  <div class="content-header">
                    <div class="title">
                      {{ $t('view.dashboard.histogramChart.minDuration') }}
                      <!--최소시간-->
                    </div>
                  </div>
                  <div class="content-body">
                    <div class="time-text">{{ minDuration }}</div>
                  </div>
                </div>

                <div class="max-time">
                  <div class="content-header">
                    <div class="title">
                      {{ $t('view.dashboard.histogramChart.maxDuration') }}
                      <!--최대시간-->
                    </div>
                  </div>
                  <div class="content-body">
                    <div class="time-text">{{ maxDuration }}</div>
                  </div>
                </div>

                <div class="avg-time">
                  <div class="content-header">
                    <div class="title">
                      {{ $t('view.dashboard.histogramChart.avgDuration') }}
                      <!--평균시간-->
                    </div>
                  </div>
                  <div class="content-body">
                    <div class="time-text">{{ avgDuration }}</div>
                  </div>
                </div>
              </div>

              <div class="times-form-content">
                <div class="form-content">
                  <div v-for="(item, index) in durationForm" :key="index">
                    <b-form-group id="duration-form">
                      <b-form-input type="number" autofocus required v-model="item.st" :placeholder="$t('view.dashboard.histogramChart.input')" autocomplete="off" @change="setPreDuration(index)"></b-form-input>
                      <b-form-input type="number" autofocus required v-model="item.et" :placeholder="$t('view.dashboard.histogramChart.input')" autocomplete="off" :readonly="index != durationForm.length - 1"></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="btn-group">
                  <b-button variant="outline-secondary" @click="onClickRemoveDuration()">-</b-button>
                  <b-button variant="outline-secondary" class="btn-add" @click="onClickAddDuration()">+</b-button>
                </div>
              </div>
            </div>
            <div class="content-footer">
              <div class="btn-group">
                <b-button variant="primary" @click="onClickApply()">
                  {{ $t('view.dashboard.histogramChart.save') }}
                  <!--저장-->
                </b-button>
                <b-button variant="secondary" @click="onClickCancel()">
                  {{ $t('view.dashboard.histogramChart.cancel') }}
                  <!--취소-->
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 소요시간 -->
      </template>
    </template>
  </chart-widget>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { EventBus, utils } from '@/common';
import { IKeyValueObject, IWidgetDataConfiguration, IWidgetTableOption } from '@/interface';

import { EChartOption } from 'echarts';
import _ from 'lodash';

import { UtilsMixin, WidgetMixin, WidgetTableMixin } from '@/mixin';

import Chart from '../ts/AbstractChart';
import { DashbaordTheme as theme } from '../editor/dashboard-editor-service';
import { CaseDurationHistogramData } from './SampleData';

import WidgetTable from '../components/WidgetTable.vue';

@Component({
  components: {
    WidgetTable,
  },
})
export default class CaseDurationHistogram extends Mixins(WidgetMixin, WidgetTableMixin, UtilsMixin) {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  chart: Chart = null;

  // 소요시간 별 케이스 수
  name: string = 'overview.chart.duration.by.case';

  data: IWidgetDataConfiguration = {
    _type: 'EchartWidgetLiteImpl',
    id: this.name,
    widgetType: 'BAR_CHART', // BAR_CHART, LINE_CHART
    dataParams: {
      // bins: 'null',
      nbin: '4',
    },
  };

  sampleData = CaseDurationHistogramData;

  showTable: boolean = false;
  showDuration: boolean = false;

  //최소시간
  minDuration: any = 0; //나중에 수정
  //최대시간
  maxDuration: any = 150; //나중에 수정
  //평균시간
  avgDuration: any = 75; //나중에 수정

  minSecond: any = 0;
  maxSecond: any = 0;
  avgSecond: any = 0;

  //소요시간/비율 입력창
  durationForm: any = [];

  //옵션값("yTime", "yRate")
  originYOption: 'yTime' | 'yRate' = 'yTime';
  yOptions: 'yTime' | 'yRate' = 'yTime';
  //소요시간단위("day", "hour", "minute")
  originDurationUnit: 'day' | 'hour' | 'minute' = 'day';
  durationUnit: 'day' | 'hour' | 'minute' = 'day';

  convert = { day: 60 * 60 * 24, hour: 60 * 60, minute: 60, second: 1 };
  // 다국어 처리 되어있음
  convertunit = { day: '(일)', hour: '(시)', minute: '(분)', second: '(초)' };

  xInput: any[] = [];

  caseCount: number = 0;

  widgetTableOpion: IWidgetTableOption = {
    widgetName: this.name,
    title: this.title,
    detail: false,
    custom: false,
  };

  /* refs 선언 */
  $refs!: {
    chart: HTMLDivElement;
  };

  /* Watch 선언 */
  @Watch('widget.widgetType')
  onChartTypeChanged(newValue: string) {
    this.initChartOption();
    this.drawSampleChart();
  }

  @Watch('widget.colorPalette')
  onColorPaletteChanged(newValue: string) {
    this.setColor();

    this.drawSampleChart();
  }

  @Watch('widget.colorTheme')
  onColorThemeChanged(newValue: number) {
    this.setColor();

    this.drawSampleChart();
  }

  @Watch('showTable')
  onShowTableChanged(newValue: boolean) {
    if (newValue === false) {
      this.widgetTableOpion.selectedBy = null;
      this.tableFilter.value = '';
      this.chart.chart.dispatchAction({
        type: 'downplay',
      });
    }
  }
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  created() {
    if (!_.isEmpty(this.widget)) {
      this.data.widgetType = this.widget.widgetType;
    }
  }

  mounted() {
    this.chart = new Chart(this.$refs.chart);

    this.initChartOption();

    EventBus.$on('widgetReset', () => {
      this.tableFilter.value = '';
      this.widgetTableOpion.selectedBy = null;
    });

    this.$nextTick(() => {
      if (!this.isEditor) {
        this.chart.setEventHandler('click', (cell: any) => {
          this.widgetTableOpion.selectedBy = {
            duration: this.data.widgetType === 'BAR_CHART' ? cell.value[1] : cell.value[0],
          };
          this.tableFilter.value = this.data.widgetType === 'BAR_CHART' ? cell.value[1] : cell.value[0];
          this.chart.chart.dispatchAction({
            type: 'downplay',
          });
          this.chart.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: cell.seriesIndex,
            dataIndex: cell.dataIndex,
          });
        });
      }
    });
  }

  beforeDestroy() {
    EventBus.$off('widgetReset');
  }

  /* 메소드 선언 */

  dataProcessing(res: any) {
    const data = res.data.data;
    if (data === null || data === undefined) {
      this.isNoData = true;
    } else if (_.isEmpty(data.data)) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }

    if (!this.isNoData) {
      this.dataFields = data.data?.fields;

      this.minSecond = data.data.valueStatistics.null.min;
      this.maxSecond = data.data.valueStatistics.null.max;
      this.avgSecond = data.data.valueStatistics.null.average;

      this.xInput = [];

      this.initDuration();

      const series: IKeyValueObject = data.data.series;

      let index = 0;
      const newSeries: any[] = [];
      const chartType = _.isEmpty(this.widget) ? this.data.widgetType : this.widget.widgetType;

      for (const [key, value] of Object.entries(series)) {
        const series: any = {
          name: value.name,
          type: chartType.split('_CHART')[0].toLowerCase(),
          data: [],
        };
        for (const item of value.values) {
          if (this.yOptions == 'yTime') {
            this.xInput.push(item[0]); // 초단위
          }

          let data;
          let value;
          const xAxis = {
            type: 'value',
            name: this.getAxisName('number'),
            axisLabel: {
              formatter: (value: any) => {
                return this.numberSymbol(value);
              },
            },
          };

          const yAxis = {
            type: 'category',
            name: this.getAxisName(this.originDurationUnit),
            axisLabel: {
              formatter: (value: string) => {
                if (this.yOptions === 'yTime') {
                  const convertNum: string[] = this.getConvertNum(value, false, '~') as string[];
                  return this.data.widgetType === 'BAR_CHART' ? convertNum.join('\n') : convertNum.join(' ');
                }
              },
            },
          };

          // 차트 타입에 따라서 x, y축 값이 변함
          if (chartType === 'BAR_CHART') {
            const colorIndex = this.widget ? this.widget.colorTheme : this.isDarkTheme ? theme.defaultDarkThemeIndex : theme.defaultMultiColorIndex;
            value = [item[1], item[0]];
            data = {
              value: [item[1], item[0]],
              itemStyle: {
                color: theme.multiColorPalette[colorIndex][index],
              },
            };
            this.chart.chartOption.xAxis = xAxis as EChartOption.XAxis;
            this.chart.chartOption.yAxis = yAxis as EChartOption.YAxis;
          } else {
            data = {
              value: [item[0], item[1]],
            };
            this.chart.chartOption.xAxis = yAxis as EChartOption.XAxis;
            this.chart.chartOption.yAxis = xAxis as EChartOption.YAxis;
          }

          series.data.push(data);
          if (chartType === 'BAR_CHART') {
            index = index >= 10 ? 0 : index + 1;
          }
        }

        newSeries.push(series);
      }

      this.initXInput();

      this.chart.setSeries(newSeries);
      this.chart.setHighlight();
      this.chart.drawChart();
    }

    this.showLoading = false;
  }

  get title() {
    if (_.isEmpty(this.widget)) {
      return this.$t('view.dashboard.' + this.name);
    } else {
      if (this.widget.widgetTitle && this.widget.widgetTitle !== '') {
        return this.widget.widgetTitle;
      } else {
        return this.$t('view.dashboard.' + this.name);
      }
    }
  }

  drawSampleChart() {
    let index = 0;
    const newSeries: any[] = [];
    const chartType = this.widget.widgetType;

    for (const [key, value] of Object.entries(this.sampleData.series)) {
      const series: any = {
        name: value.name,
        type: chartType.split('_CHART')[0].toLowerCase(),
        data: [],
      };
      for (const item of value.values) {
        const data: IKeyValueObject = {
          value: chartType === 'BAR_CHART' ? [item.value[1], item.value[0]] : item.value,
        };

        if (chartType === 'BAR_CHART') {
          data.itemStyle = {
            color: theme.multiColorPalette[this.widget.colorTheme][index],
          };
          index = index > 10 ? 0 : index + 1;
        }

        series.data.push(data);
      }

      newSeries.push(series);
    }

    this.chart.setSeries(newSeries);
    this.chart.drawChart();
  }

  initChartOption() {
    const option: EChartOption = {
      color: [theme.singleColorPalette[theme.defaultSingleColorIndex]],
      tooltip: {
        show: true,
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
        transitionDuration: 0,
        formatter: (params: any | any[]) => {
          if (this.yOptions === 'yTime') {
            if (params.seriesType === 'bar') {
              return `${params.marker} ${this.getConvertNum(params.data.value[1], true)}: ${this.numberWithCommas(params.data.value[0])}`;
            } else if (params.seriesType === 'line') {
              return `${params.marker} ${this.getConvertNum(params.data.value[0], true)}: ${this.numberWithCommas(params.data.value[1])}`;
            }
          }
        },
      },
      xAxis: {
        type: 'value',
        name: this.getAxisName('number'),
        axisLabel: {
          formatter: (value: any) => {
            return this.numberSymbol(value);
          },
        },
      },
      yAxis: {
        type: 'category',
        name: this.getAxisName(this.originDurationUnit),
      },
      grid: {
        top: '30px',
        left: 100,
        bottom: '30px',
        right: 60,
      },
    };

    if (!_.isEmpty(this.widget) && this.widget.widgetType === 'LINE_CHART') {
      option.grid = {
        top: '30px',
        left: '40px',
        bottom: '30px',
        right: 60,
      };

      option.xAxis = {
        type: 'category',
        name: this.getAxisName(this.originDurationUnit),
      };

      option.yAxis = {
        type: 'value',
        name: this.getAxisName('number'),
        axisLabel: {
          formatter: (value: any) => {
            return this.numberSymbol(value);
          },
        },
      };

      option.tooltip.formatter = (params: any | any[]) => {
        return `${params[0].marker} ${params[0].data.value[0]}: ${params[0].data.value[1]}`;
      };
    }

    this.chart.setOption(option);
  }

  setLocale() {
    if (!_.isEmpty(this.widget) && this.widget.widgetType === 'LINE_CHART') {
      if (Array.isArray(this.chart.chartOption.xAxis)) {
        this.chart.chartOption.xAxis[0].name = this.getAxisName(this.originDurationUnit);
      } else {
        this.chart.chartOption.xAxis.name = this.getAxisName(this.originDurationUnit);
      }
      if (Array.isArray(this.chart.chartOption.yAxis)) {
        this.chart.chartOption.yAxis[0].name = this.getAxisName('number');
      } else {
        this.chart.chartOption.yAxis.name = this.getAxisName('number');
      }
    } else {
      if (Array.isArray(this.chart.chartOption.xAxis)) {
        this.chart.chartOption.xAxis[0].name = this.getAxisName('number');
      } else {
        this.chart.chartOption.xAxis.name = this.getAxisName('number');
      }
      if (Array.isArray(this.chart.chartOption.yAxis)) {
        this.chart.chartOption.yAxis[0].name = this.getAxisName(this.originDurationUnit);
      } else {
        this.chart.chartOption.yAxis.name = this.getAxisName(this.originDurationUnit);
      }
    }
  }

  onClickTable() {
    if (this.tableFilter.value === '') {
      return;
    }

    this.showTable = !this.showTable;

    if (this.showTable === true) {
      this.widgetTableOpion.selectedBy = {
        duration: this.getConvertNum(this.tableFilter.value, true),
        unit: this.durationUnit,
      };
      this.getTable(1);
    }
  }

  onClickDuration() {
    this.showDuration = !this.showDuration;

    if (this.$parent.$el.classList.contains('vue-grid-item')) {
      EventBus.$emit('setHistogramDuration', this.$parent.$props.i, this.showDuration);
    }

    if (this.showDuration === false) {
      this.durationUnit = this.originDurationUnit;
      this.durationUnitChangedToTime();
    }
  }

  //케이스 별 소요시간 차트 설정
  onClickApply() {
    if (this.getTotalBarCount() > 7) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.alert.histogramSeries').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'error');

      return;
    }

    //validation
    // st < et
    // et < 다음 st
    const durationArray: any[] = [];
    let index = 0;

    //durationForm: 화면에 보이는 값들
    //값들이 오름차순인지 체크하는 코드 부분
    this.durationForm.forEach((element: any) => {
      durationArray.push(element.st);
      durationArray.push(element.et);
      index++;
    });
    index = 0;
    let validation = true;
    durationArray.forEach((element: any) => {
      if (index < durationArray.length - 1) {
        if (Number(durationArray[index]) > Number(durationArray[index + 1])) {
          validation = false;
        }
        index++;
      }
    });

    this.originDurationUnit = this.durationUnit;
    //min & max check
    const convertNum = this.convert[this.originDurationUnit];
    const minDuration = (this.minSecond / convertNum).toFixed(2); //가져온 초단위를 지정한 단위의 값으로 변환
    const maxDuration = (this.maxSecond / convertNum).toFixed(2);
    const lowerThanMin = Number(this.durationForm[0].st) < Number(minDuration);
    const upperThanMax = Number(this.durationForm[this.durationForm.length - 1].et) > Number(maxDuration);

    if (!validation) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.alert.histogramValidation').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'error');

      return;
    } else if (this.yOptions == 'yTime' && (lowerThanMin || upperThanMax)) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.alert.histogramLowerUpperCheck').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'error');
      return;
    } /* else if (this.yOptions == 'yRate' && (this.durationForm[0].st < 0 || this.durationForm[this.durationForm.length - 1].et > 100)) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.alert.histogramLowerUpperCheck').toString();
      utils.bvModalmsgBoxOk(this, title, content);
      return;
    } */
    //validation end

    //generate bins
    let bins = '';
    if (this.yOptions == 'yTime') {
      //옵션값 (Y축:시간)

      const convertNum = this.convert[this.originDurationUnit];
      index = 0;
      this.durationForm.forEach((element: any) => {
        // 처음 범주이고 시작값이 최소값보다 클때 (최소값, 시작값)
        if (index == 0 && element.st > (this.minSecond / convertNum).toFixed(2)) {
          bins += '(' + this.minSecond + ',' + element.st * convertNum + '),';
        }

        //bins
        bins += '(' + element.st * convertNum + ',' + element.et * convertNum + ')';

        // 마지막 범주이고 끝값이 최대값보다 작을 때 (끝값, 최대값)
        if (index == this.durationForm.length - 1 && element.et < (this.maxSecond / convertNum).toFixed(2)) {
          bins += ',(' + element.et * convertNum + ',' + this.maxSecond + ')';
        }

        //마지막 범주가 아닐 때는 ',' 를 더해준다
        if (index < this.durationForm.length - 1) {
          bins += ',';
        }

        index++;
      });
    } /* else if (this.yOptions == 'yRate') {
      //옵션값 (Y축:비율)
      //minSecond;
      //maxSecond;
      //avgSecond;
      index = 0;
      this.durationForm.forEach((element: any) => {
        // Y축: 비율 일 경우 비율 계산 check 필요

        const st = element.st * 0.01 * (this.maxSecond - this.minSecond) + this.minSecond;
        const et = element.et * 0.01 * (this.maxSecond - this.minSecond) + this.minSecond;

        // 시작 범주이고 시작값이 0보다 더 클때 (0, 시작값)
        if (index == 0 && element.st > 0) {
          bins += '(0,' + st + '),';
        }

        //bins
        bins += '(' + st + ',' + et + ')';

        // 마지막 범주이고 끝값이 100보다 작을 때 (끝값, 최대값) => 체크 필요!
        if (index == this.durationForm.length - 1 && element.et < 100) {
          bins += ',(' + et + ',' + this.maxSecond + ')';
        }

        //마지막 범주가 아닐 때는 ',' 를 더해준다
        if (index < this.durationForm.length - 1) {
          bins += ',';
        }
        index++;
      });
    } */
    //generate bins end
    this.data.dataParams.bins = bins == '(0,0),(0,0),(0,0)' ? null : bins;

    this.chart.chartOption.yAxis = {
      type: 'category',
      name: this.convertunit[this.originDurationUnit],
    };

    this.getWidgetData();

    this.showDuration = false;
  }

  onClickCancel() {
    this.showDuration = false;
    this.durationUnit = this.originDurationUnit;
    this.durationUnitChangedToTime();
  }

  //bar 3~7개: 범위 누락 따라 처리 필요
  onClickRemoveDuration() {
    if (this.durationForm.length <= 4) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.alert.histogramSeries').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'error');

      return;
    }
    this.durationForm.splice(-1);
  }

  onClickAddDuration() {
    if (this.getTotalBarCount() >= 7) {
      const title = this.$t('view.repo.alert.title.alarm').toString();
      const content = this.$t('view.dashboard.alert.histogramSeries').toString();
      utils.bvModalmsgBoxOk(this, title, content, 'error');

      return;
    }
    this.durationForm.push({ st: this.durationForm[this.durationForm.length - 1].et, et: this.durationForm[this.durationForm.length - 1].et });
  }

  getTotalBarCount() {
    let totalBarCount = this.durationForm.length;
    //범주 밖
    if (this.yOptions == 'yTime') {
      //const stTime = this.durationForm[0].st*this.convert[this.durationUnit];
      //const etTime = this.durationForm[this.durationForm.length-1].et*this.convert[this.durationUnit];

      const stTime = this.durationForm[0].st;
      const etTime = this.durationForm[this.durationForm.length - 1].et;

      const convertNum = this.convert[this.durationUnit];
      const minDuration = (this.minSecond / convertNum).toFixed(2); //가져온 초단위를 지정한 단위의 값으로 변환
      const maxDuration = (this.maxSecond / convertNum).toFixed(2);

      //validation start
      const durationArray: any[] = [];
      let index = 0;
      this.durationForm.forEach((element: any) => {
        durationArray.push(element.st);
        durationArray.push(element.et);
        index++;
      });
      index = 0;
      let validation = true;
      durationArray.forEach((element: any) => {
        if (index < durationArray.length - 1) {
          if (Number(durationArray[index]) > Number(durationArray[index + 1])) {
            validation = false;
          }
          index++;
        }
      });
      //validation end

      if (stTime > this.minDuration && validation) {
        //맨 시작값 보다 최소값이 작을 때
        totalBarCount++;
      }
      if (etTime < this.maxDuration && validation) {
        //맨 끝값 보다 최대값이 클 때
        totalBarCount++;
      }
    } else if (this.yOptions == 'yRate') {
      if (this.durationForm[0].st > 0) {
        //맨 시작값 보다 0이 작을 때
        totalBarCount++;
      }
      if (this.durationForm[this.durationForm.length - 1].et < 100) {
        // 맨 끝값 보다 100이 클 때
        totalBarCount++;
      }
    } /* else if (this.yOptions == 'yRate') {
      if (this.durationForm[0].st > 0) {
        //맨 시작값 보다 0이 작을 때
        totalBarCount++;
      }
      if (this.durationForm[this.durationForm.length - 1].et < 100) {
        // 맨 끝값 보다 100이 클 때
        totalBarCount++;
      }
    } */

    return totalBarCount;
  }

  setPreDuration(index: any) {
    if (index > 0) {
      this.durationForm[index - 1].et = this.durationForm[index].st;
    }
  }

  getConvertNum(value: string, isJoin: boolean, middle: string = ' - ') {
    const convertNum = this.convert[this.durationUnit];
    const time = value.split('-');
    time[0] = (Number(time[0]) / convertNum).toFixed(2);
    time[1] = (Number(time[1]) / convertNum).toFixed(2);
    time.splice(1, 0, `${middle}`);
    if (isJoin) {
      return time.join('');
    } else {
      return time;
    }
  }

  initDuration() {
    this.yOptions = 'yTime';
    let convertNum = this.convert[this.durationUnit];

    const getDuration = (second: number) => {
      convertNum = this.convert[this.durationUnit];
      return Math.round((second / convertNum + Number.EPSILON) * 100) / 100;
    };

    //최소시간(범위 적용)
    this.minDuration = getDuration(this.minSecond);
    //최대시간(범위 적용)
    this.maxDuration = getDuration(this.maxSecond);
    //평균시간(범위 적용)
    this.avgDuration = getDuration(this.avgSecond);

    if (this.maxDuration <= 0) {
      while (this.maxDuration <= 0) {
        this.durationUnit = this.durationUnit === 'day' ? 'hour' : 'minute';
        this.originDurationUnit = this.durationUnit;
        this.minDuration = getDuration(this.minSecond);
        //최대시간(범위 적용)
        this.maxDuration = getDuration(this.maxSecond);
        //평균시간(범위 적용)
        this.avgDuration = getDuration(this.avgSecond);
      }
    }
  }

  initXInput() {
    // 소요시간 input 에 넣어주기
    this.durationForm = [];
    this.xInput.forEach((x: string) => {
      const newX = this.getConvertNum(x, false); //second -> convert
      this.durationForm.push({ st: newX[0], et: newX[2] });
    });
  }

  durationUnitChangedToTime(isFirst?: boolean) {
    //시간단위 변경 시 자동으로 'Y축:시간'으로 전환
    this.yOptions = 'yTime';
    let convertNum = this.convert[this.durationUnit];

    const getDuration = (second: number) => {
      convertNum = this.convert[this.durationUnit];
      return Math.round((second / convertNum + Number.EPSILON) * 100) / 100;
    };

    //최소시간(범위 적용)
    this.minDuration = getDuration(this.minSecond).toFixed(2);
    //최대시간(범위 적용)
    this.maxDuration = getDuration(this.maxSecond).toFixed(2);
    //평균시간(범위 적용)
    this.avgDuration = getDuration(this.avgSecond).toFixed(2);

    // 소요시간 input 에 넣어주기
    this.initXInput();
  }

  /* onChangeYOptions() {
    //입력값 초기화
    if (this.yOptions == 'yTime') {
      this.durationUnitChangedToTime();
    } else if (this.yOptions == 'yRate') {
      // Y축:비율 선택 시 단위는 일단 (일)로 초기화 -> 그래프 표시용
      this.durationUnit = 'day';

      const convertNum = this.convert[this.durationUnit];
      this.durationForm = [];
      this.xInput.forEach((x: any) => {
        //=> 계산 로직 점검 필요
        const stinput = ((100 * (x[0] - this.minSecond)) / (this.maxSecond - this.minSecond)).toFixed(2);
        const etinput = ((100 * (x[1] - this.minSecond)) / (this.maxSecond - this.minSecond)).toFixed(2);
        this.durationForm.push({ st: stinput, et: etinput });
      });

      //this.durationForm = [{st: 0, et: 25},{st: 25, et: 50}, {st: 50, et: 75}, {st: 75, et: 100}];
    }
  } */
}
</script>