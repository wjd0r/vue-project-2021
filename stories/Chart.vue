<template>
  <div class="d-flex w-100 h-100">
    <div class="card w-25 h-100">
      <div class="card-body">
        <b-form-group :label="`Login ${isLogin ? '(Logged)' : ''}`">
          <b-form-input v-model="loginURL"></b-form-input>
          <b-input-group>
            <b-form-input v-model="username"></b-form-input>
            <b-form-input v-model="password"></b-form-input>
            <b-input-group-prepend v-model="password">
              <b-button @click="login()">login</b-button>
            </b-input-group-prepend>
          </b-input-group>
        </b-form-group>
        <b-form-group label="URL">
          <b-form-input v-model="url"></b-form-input>
        </b-form-group>
        <b-form-group label="Request Json">
          <b-form-textarea v-model="request" :rows="15" no-resize></b-form-textarea>
        </b-form-group>
        <b-form-group label="Chart Type">
          <b-form-select v-model="chartType" :options="chartOptions"></b-form-select>
        </b-form-group>
        <b-button @click.prevent="run">RUN</b-button>
        <span v-show="isEmpty">{{ $t('view.sso.alert.checkBlank') }}</span>
      </div>
    </div>
    <div class="w-75 h-100">
      <div class="card w-100 h-50">
        <div class="card-body w-100 h-100">
          <div v-show="chartType !== 'table' && chartType !== 'kpi'" ref="chart" class="w-100 h-100"></div>
          <table v-show="chartType === 'table'">
            <tbody>
              <tr v-for="(value, index) in table" :key="`table-${index}`">
                <td>{{ value.sname }}</td>
                <td>{{ value.stotal }}</td>
              </tr>
            </tbody>
          </table>
          <table v-show="chartType === 'kpi'">
            <tbody>
              <tr v-for="(value, index) in table" :key="`kpi-${index}`">
                <td>{{ value.name }}</td>
                <td>{{ value.value }}</td>
                <td>{{ value.prevValue }}</td>
                <td>{{ value.nextValue }}</td>
                <td>{{ value.valueFormat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card w-100 h-50">
        <div class="card-body">
          <b-form-group label="Response Json">
            <b-form-textarea v-model="response" :rows="14" no-resize plaintext></b-form-textarea>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { BFormGroup, BFormInput, BFormTextarea, BFormSelectOption, BFormSelect, BButton, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import axios from 'axios';
import echarts, { EChartOption, ECharts } from 'echarts';
import _ from 'lodash';
import { IKeyValueObject } from '@/interface';

const http = axios.create({});

@Component({
  name: 'chart',
  components: {
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormSelect,
    BFormSelectOption,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
  },
})
export default class Chart extends Vue {
  /* Prop 선언 */

  /* mapGetters 변수 선언 */

  /* 클래스 변수 선언 */
  loginURL = 'https://sso-ent.ipr.iochord.co.kr';
  username = 'admin@iochord.com';
  password = 'admi123';
  isLogin = false;

  url = '';

  token = '';

  request =
    '[{"_type":"SqlDataWidgetConfiguration","repository":{"id":"ids20210811100102_ier20210811100257","_type":"EventRepository","project":{"id":"ipr20210405010744","_type":"Project"}},"data":{"_type":"EchartWidgetLiteImpl","id":"dev.ChartWidget","name":"Example","widgetType":"LINE_CHART","dataParams":{"query":"\n${withSql}\nSELECT\n\t(ci||\'${someDataParam}\')::text AS x,\n\t(COUNT(*))::real AS y\nFROM ${repoAlias} GROUP BY ci LIMIT 10\n","someDataParam":"YYYY-MM-DD HH24:MI:SS"}}}]';

  chartOptions = [
    { value: 'line', text: 'Line' },
    { value: 'bar', text: 'Bar' },
    { value: 'pie', text: 'Pie' },
    { value: 'boxplot', text: 'Boxplot' },
    { value: 'scatter', text: 'Dotted' },
    { value: 'sunburst', text: 'Sunburst' },
    { value: 'kpi', text: 'Kpi' },
    { value: 'table', text: 'Table' },
  ];

  chartType = 'line';

  response = '';

  table = {};

  chart: ECharts = null;
  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  };

  isEmpty: boolean = false;

  /* refs 선언 */
  $refs!: {
    chart: HTMLDivElement;
  };

  /* Watch 선언 */

  /* navigator guard 선언 */

  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */

  /* 
 created(){
   
 }
 */

  mounted() {
    this.chart = echarts.init(this.$refs.chart, 'light');
  }

  /* 메소드 선언 */

  login() {
    if (this.loginURL === '' || this.username === '' || this.password === '') {
      return;
    }
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('scope', 'all');

    http.post(`${this.loginURL}/oauth/token`, formData, { auth: { username: 'ipr-lite', password: 'ipr-lite' }, headers: { Accept: 'application/json' } }).then((res) => {
      http.defaults.headers.common.Authorization = 'Bearer ' + res.data.access_token;
      this.isLogin = true;
    });
  }

  async run() {
    if (this.url === '' || this.token === '' || this.request === '' || this.chartType === '') {
      this.isEmpty = true;
      return;
    }

    this.table = {};

    this.isEmpty = false;

    const request = this.request.replaceAll('\r', ' ').replaceAll('\n', ' ').replaceAll('\t', ' ');

    const res = await http.post(this.url, JSON.parse(request));

    this.response = JSON.stringify(res.data);

    if (!_.isEmpty(res.data.data) && !_.isEmpty(res.data.data.data)) {
      const data = res.data.data.data;
      switch (this.chartType) {
        case 'table':
          this.table = data.results;
          break;
        case 'kpi':
          this.table = data;
          break;
        case 'boxplot': {
          const seriesData: IKeyValueObject = data.series;
          const series: any[] = [];
          const xAxis: any[] = [];
          for (const [key, value] of Object.entries(seriesData)) {
            let data;

            if (key !== 'outlier') {
              data = value.values.map((item: any) => {
                if (_.find(xAxis, item[0])) {
                  xAxis.push(item[0]);
                }
                return [item[1], item[2], item[3], item[4], item[5]];
              });
            }
          }

          this.chartOption.xAxis = {
            type: 'category',
            data: xAxis,
          };

          this.chartOption.series = series;
          this.chart.setOption(this.chartOption, { notMerge: true });

          break;
        }
        default: {
          const seriesData: IKeyValueObject = data.series,
            series = [];
          for (const [key, value] of Object.entries(seriesData)) {
            series.push({ name: key, type: this.chartType, data: value.values });
          }
          this.chartOption.xAxis = { type: 'category' };
          this.chartOption.series = series;
          this.chart.setOption(this.chartOption, { notMerge: true });
          break;
        }
      }
    }
  }

  initChartOption() {
    this.chartOption = {
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
    };
  }
}
</script>