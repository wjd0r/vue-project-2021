<template>
  <div class="animated fadeIn sso-common-component qna-component">
    <b-container class="qna-content">
      <div class="content-header">
        <div class="title" desc="도움이 필요하신가요?">{{ $t('view.sso.qna.title') }}</div>
        <h2 class="sub-title" desc="도움이 필요하면 언제든지 문의 바랍니다.">{{ $t('view.sso.qna.subTitle') }}</h2>
      </div>
      <div class="content-body">
        <div class="form-content">
          <span class="notice-text" desc="도움이 필요한 내용을 아래에 작성해주세요.">{{ $t('view.sso.qna.noticeText') }}</span>
          <b-form validated @submit.prevent="sendQnAEmail">
            <!--<b-form-group label="이름" :label-cols="2">
                <b-form-input type="text" placeholder="이름을 입력하세요."  maxlength="50" v-model="name"/>
              </b-form-group>-->

            <b-form-group :label="$t('view.sso.label.email')" desc="이메일" :label-cols="2">
              <b-form-input type="email" :placeholder="$t('view.sso.label.putEmailForAnswer')" desc="답변을 받을 이메일을 입력하세요." maxlength="50" v-model="email" :disabled="isLoading" required />
            </b-form-group>

            <!--<b-form-group label="회사" :label-cols="2">
                <b-form-input type="text" placeholder="회사명을 입력하세요."  maxlength="100" v-model="company"/>
              </b-form-group>

              <b-form-group label="직업" :label-cols="2">
                <b-form-input type="text" placeholder="직업을 입력하세요."  maxlength="100" v-model="job"/>
              </b-form-group>-->

            <b-form-group :label="$t('view.sso.label.title')" desc="제목" :label-cols="2">
              <b-form-input type="text" :placeholder="$t('view.sso.label.putTitle')" desc="제목을 입력하세요." maxlength="100" v-model="title" :disabled="isLoading" required />
            </b-form-group>

            <b-form-group :label="$t('view.sso.label.content')" desc="내용" :label-cols="2">
              <b-form-textarea :placeholder="$t('view.sso.label.putQAContent')" desc="문의 내용을 적어주세요." v-model="contents" :disabled="isLoading" no-resize required></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-2" label-for="filefirst">
              <b-form-file id="filefirst" v-model="filefirst" type="file" accept="image/*" :placeholder="$t('view.sso.label.putImageFile')" desc="첨부할 이미지 파일을 선택하세요." :disabled="isLoading"></b-form-file>
            </b-form-group>

            <b-form-group id="input-group-2" label-for="filesecond">
              <b-form-file id="filesecond" v-model="filesecond" type="file" accept="image/*" :placeholder="$t('view.sso.label.putImageFile')" desc="첨부할 이미지 파일을 선택하세요." :disabled="isLoading"></b-form-file>
            </b-form-group>

            <b-form-group>
              <b-button type="submit" variant="primary right" :disabled="isLoading">
                <template v-if="isLoading === false" desc="문의하기">{{ $t('view.sso.button.qna') }}</template>
                <template v-else><b-spinner label="Spinning" small></b-spinner></template>
              </b-button>
            </b-form-group>
          </b-form>
        </div>
      </div>
    </b-container>
    <div class="content-footer">
      <b-container class="inf-component">
        <div class="logo-iochord" alt="아이오코드 로고"></div>
        <div class="inf-content">
          <div class="company-name">
            <h4 desc="회사이름">{{ $t('view.sso.qna.companyName') }}</h4>
          </div>
          <div class="company-addr">
            <span desc="부산주소">{{ $t('view.sso.qna.addressBusan') }}</span>
            <span desc="서울주소">{{ $t('view.sso.qna.addressSeoul') }}</span>
          </div>
          <div class="company-inf">
            <span desc="회사이메일">{{ $t('view.sso.qna.companyEmail') }}</span>
            <span desc="회사번호">{{ $t('view.sso.qna.companyDigits') }}</span>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: mapGetters({}),
})
export default class QnApage extends Vue {
  //name: string = '';
  email: string = '';
  //company: string = '';
  //job: string = '';
  title: string = '';
  contents: string = '';
  images: any[];

  filefirst: any = null;
  filesecond: any = null;

  isLoading: boolean = false;

  reportBug(iemail: string, ititle: string, icontents: string, images: any[]) {
    this.$store
      .dispatch('sso/reportBug', {
        //name: iname,
        email: iemail,
        //company: icompany,
        //job: ijob,
        title: ititle,
        content: icontents,
        images: images,
      })
      .then((res) => {
        this.isLoading = false;
        //EventBus.$emit('offLoading');
        if (res.data == '0') {
          this.$bvModal
            .msgBoxOk(this.$t('view.sso.alert.reportComplete').toString(), {
              title: this.$t('view.sso.alert.title.reportComplete').toString(),
              size: 'sm',
              buttonSize: 'sm',
              centered: true,
            })
            .then((value) => {
              this.email = '';
              this.title = '';
              this.contents = '';
              this.filefirst = null;
              this.filesecond = null;
            });
        } else {
          this.$bvModal.msgBoxOk(this.$t('view.sso.alert.reportFail').toString(), {
            title: this.$t('view.sso.alert.title.reportFail').toString(),
            size: 'sm',
            buttonSize: 'sm',
            centered: true,
          });
        }
      });
  }

  sendQnAEmail() {
    if (this.email == '' || this.title == '' || this.contents == '') {
      this.$bvModal.msgBoxOk(this.$t('view.sso.alert.reportRequired').toString(), {
        title: this.$t('view.sso.alert.title.warning').toString(),
        size: 'sm',
        buttonSize: 'sm',
        centered: true,
      });
      return;
    }

    this.isLoading = true;
    const istore = this.$store;
    //const iname = this.name;
    const iemail = this.email;
    //const icompany = this.company;
    //const ijob = this.job;
    const ititle = this.title;
    const icontents = this.contents;
    const iimages = this.images;
    const ireportBug = this.reportBug;

    const filefirst = (document.getElementById('filefirst') as any).files[0];
    const filesecond = (document.getElementById('filesecond') as any).files[0];

    let readerFirst = new FileReader();
    let readerSecond = new FileReader();

    if (filefirst != null) readerFirst.readAsDataURL(filefirst);
    else readerFirst = null;

    if (filesecond != null) readerSecond.readAsDataURL(filesecond);
    else readerSecond = null;

    if (readerFirst == null) {
      if (readerSecond == null) {
        const images: any[] = [];
        ireportBug(iemail, ititle, icontents, images);
      } else {
        readerSecond.onload = function () {
          const urlSecond = readerSecond.result as string;

          const images = [];
          images.push(urlSecond);

          ireportBug(iemail, ititle, icontents, images);
        };
      }
    } else {
      readerFirst.onload = function () {
        const urlFirst = readerFirst.result as string;

        if (readerSecond == null) {
          const images = [];
          images.push(urlFirst);

          ireportBug(iemail, ititle, icontents, images);
        } else {
          readerSecond.onload = function () {
            const urlSecond = readerSecond.result as string;

            const images = [];
            images.push(urlFirst);
            images.push(urlSecond);

            ireportBug(iemail, ititle, icontents, images);
          };
        }
      };
    }
  }
}
</script>
