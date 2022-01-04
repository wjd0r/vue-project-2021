import { Vue, Component } from 'vue-property-decorator';

import _ from 'lodash';
import { utils } from '@/common';
import { IKeyValueObject } from '@/interface';

@Component({})
export default class UtilsMixin extends Vue {
  isEmpty(value: any) {
    return _.isEmpty(value);
  }

  numberWithCommas(value: number | string) {
    return utils.numberWithCommas(value);
  }

  toDDHHMMSS(time: string | number, unit: string) {
    return utils.toDDHHMMSS(time, unit);
  }

  haveReferenceModel(eventView: IKeyValueObject) {
    return utils.haveReferenceModel(eventView);
  }

  isPMDeployed(eventView: IKeyValueObject) {
    return utils.isPMDeployed(eventView);
  }

  isMobile() {
    return utils.isMobile();
  }

  isMobileBlock() {
    return utils.isMobile() && utils.isMaxWidth767();
  }
}
