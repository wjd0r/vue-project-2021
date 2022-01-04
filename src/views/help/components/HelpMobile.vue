<template>
  <!-- 도움말 : 모바일/태블릿 -->
  <div class="help-component">
    <section id="help-support-device">
      <div class="content-header"><h3 class="title">{{$t('view.helpMobile.supportDevice')}}</h3></div>
      <div class="content-body">
        <div class="help-content help-common">
          <div class="content-header"><h3 class="title">{{$t('view.helpMobile.supportDeviceAndDisplay')}}</h3></div>
          <div class="content-middle">
            <div class="content-text" v-html="$t('view.helpMobile.explainSupportDeviceAndDisplay')">
            </div>
          </div>
          <div class="content-body overflow-x">
            <table class="table line help-table-body">
              <thead>
                <tr>
                  <th width="100px">{{$t('view.helpMobile.supportDevice')}}</th>
                  <th>{{$t('view.helpMobile.create')}}</th>
                  <th>{{$t('view.helpMobile.modify')}}</th>
                  <th>{{$t('view.helpMobile.delete')}}</th>
                  <th>{{$t('view.helpMobile.edit')}}</th>
                  <th>{{$t('view.helpMobile.viewer')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{{$t('view.helpMobile.viewer')}}</th>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                </tr>
                <tr>
                  <th>{{$t('view.helpMobile.tablet')}}</th>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                </tr>
                <tr>
                  <th>{{$t('view.helpMobile.mobile')}}</th>
                  <td>{{$t('view.helpMobile.x')}}</td>
                  <td>{{$t('view.helpMobile.x')}}</td>
                  <td>{{$t('view.helpMobile.x')}}</td>
                  <td>{{$t('view.helpMobile.x')}}</td>
                  <td>{{$t('view.helpMobile.o')}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="help-item">
            <div class="help-group">
              <div class="help-sub-group">
                <div class="help">
                  <div class="help-header"><h4 class="title">{{$t('view.helpMobile.limitedDisplay')}}</h4></div>
                  <div class="help-middle">
                    <div class="content-text">
                      <p>{{$t('view.helpMobile.explainLimitedDisplay')}}</p>
                    </div>
                  </div>
                  <div class="help-body overflow-x">
                    <table class="table line help-table-body">
                      <thead>
                        <tr>
                          <th width="100px;">{{$t('view.helpMobile.device')}}</th>
                          <th>{{$t('view.helpMobile.limitedDisplay')}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th width="100px;">{{$t('view.helpMobile.pc')}}</th>
                          <td>{{$t('view.helpMobile.over1920')}}</td>
                        </tr>
                        <tr>
                          <th>{{$t('view.helpMobile.tablet')}}</th>
                          <td>{{$t('view.helpMobile.below1099')}}</td>
                        </tr>
                        <tr>
                          <th>{{$t('view.helpMobile.mobile')}}</th>
                          <td>{{$t('view.helpMobile.below767OnlyViewerFunctionEnable')}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 도움말 : 모바일/태블릿 -->
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {

  },
  computed: mapGetters({}),
})
export default class HelpMobile extends Vue {
  /* Prop 선언 */
  /* mapGetters 변수 선언 */
  /* 클래스 변수 선언 */
  /* refs 선언 */
  /* Watch 선언 */
  /* navigator guard 선언 */
  /* lifecycle hook 선언 (안 쓰는 hook은 지울 것) */
  /* 메소드 선언 */
}
</script>