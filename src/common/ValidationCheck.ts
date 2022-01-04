import { forEach } from 'lodash';
import i18n from './i18n';

enum Type {
  English_Number, // 영문, 숫자
  English_Koreanm_Number, // 문자, 숫자
  English_Koreanm_Number_Special, // 문자, 숫자, 특문
  Password, // 비밀번호
  Email, // 이메일 정규 형식
  Contact, // 연락처 정규 형식
  Number, // 숫자
  Ip,
  Special, // 특수문자만
}

// 다국어 스크립트 validate 키
const messageKeyBase = 'view.repo.validate.';

function duplication(text: string, duplications: any, column: string): boolean {
  let duplication = true;

  forEach(duplications, (user) => {
    if (user[column] == text) {
      duplication = false;
    }
  });

  return duplication;
}

// 정규식만 체크만 하는 곳
function checkRegExp(type: number, text: string) {
  const onlyEnglishNumber = i18n.t(messageKeyBase + 'onlyEnglishNumber').toString();
  const onlyKorEngNum = i18n.t(messageKeyBase + 'onlyKorEngNum').toString();
  const email = i18n.t(messageKeyBase + 'email').toString();
  const password = i18n.t(messageKeyBase + 'password').toString();
  const onlyNumber = i18n.t(messageKeyBase + 'onlyNumber').toString();
  const contact = i18n.t(messageKeyBase + 'contact').toString();
  const ip = i18n.t(messageKeyBase + 'ip').toString();
  const onlyKorEngNumPermiSpacial = i18n.t(messageKeyBase + 'onlyKorEngNumPermiSpacial').toString();
  const keyboardPermitSpecial = i18n.t(messageKeyBase + 'keyboardPermitSpecial').toString();

  switch (type) {
    case Type.English_Number: {
      return {
        state: new RegExp(`^[A-Za-z0-9]+$`).test(text),
        feedback: !new RegExp(`^[A-Za-z0-9]+$`).test(text) ? onlyEnglishNumber : '',
      };
    }
    case Type.English_Koreanm_Number: {
      return {
        state: new RegExp(`^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z0-9]+$`).test(text),
        feedback: !new RegExp(`^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z0-9]+$`).test(text) ? onlyKorEngNum : '',
      };
    }
    case Type.English_Koreanm_Number_Special: {
      return {
        state: new RegExp(`^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z0-9!@#$%^&*()\\-_+=|~<>{}\\[\\],.?/:;\` ]+$`).test(text),
        feedback: !new RegExp(`^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z0-9!@#$%^&*()\\-_+=|~<>{}\\[\\],.?/:;\` ]+$`).test(text) ? onlyKorEngNumPermiSpacial : '',
      };
    }
    case Type.Password: {
      return {
        state: new RegExp(`^.*(?=^.{8,15}$)(?=.*d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$`).test(text),
        feedback: !new RegExp(`^.*(?=^.{8,15}$)(?=.*d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$`).test(text) ? password : ``,
      };
    }
    case Type.Email: {
      return {
        state: new RegExp(`^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$`).test(text),
        feedback: !new RegExp(`^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$`).test(text) ? email : '',
      };
    }
    case Type.Contact: {
      const phone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(text); // 휴대폰
      const tell = /^\d{2,3}-?\d{3,4}-?\d{4}$/.test(text); // 일반 전화번호
      return {
        state: phone || tell,
        feedback: !(phone || tell) ? contact : '',
      };
    }
    case Type.Number: {
      return {
        state: /\d/.test(text),
        feedback: !/\d/.test(text) ? onlyNumber : '',
      };
    }
    case Type.Ip: {
      return {
        state: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(text),
        feedback: !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(text) ? ip : '',
      };
    }
    case Type.Special: {
      return {
        state: new RegExp(`^[!@#$%^&*()\\-_+=|~<>{}\\[\\],.?/:;\`]+$`).test(text),
        feedback: !new RegExp(`^[!@#$%^&*()\\-_+=|~<>{}\\[\\],.?/:;\`]+$`).test(text) ? keyboardPermitSpecial : '',
      };
    }
  }
}

// 전반적인 validate check
function check(type: number, min: number, max: number, text: any, duplications?: any, column?: string) {
  const firstBlankTest = i18n.t(messageKeyBase + 'firstBlankTest').toString();
  const duplicate = i18n.t(messageKeyBase + 'duplicate').toString();
  const digit = i18n.t(messageKeyBase + 'digit', { min: min }).toString();
  const maxDigit = i18n.t(messageKeyBase + 'maxDigit', { max: max }).toString();

  if (text == null) {
    text = '';
  }

  if (typeof text == 'string' && text.length == 0 && min != 0) {
    return {
      state: false,
      feedback: '',
    };
  }

  if (/^[\s][a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\s]*$/.test(text)) {
    return {
      state: false,
      feedback: firstBlankTest,
    };
  }

  if (!new RegExp(`^.*(?=^.{${min},}$).*$`).test(text)) {
    return {
      state: false,
      feedback: digit,
    };
  }

  if (!new RegExp(`^.*(?=^.{0,${max}}$).*$`).test(text)) {
    return {
      state: false,
      feedback: maxDigit,
    };
  }

  if (!duplication(text, duplications, column)) {
    return {
      state: false,
      feedback: duplicate,
    };
  }

  return checkRegExp(type, text);
}

export default {
  Type,
  checkRegExp,
  check,
};
