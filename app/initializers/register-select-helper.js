import ENV from '../config/environment';
import registerSelectHelper from 'emberx-select/helpers/register-select-helper';

export function initialize() {
  if (ENV.environment === 'test') {
    registerSelectHelper();
  }
}

export default {
  name: 'register-select-helper',
  initialize: initialize
};
