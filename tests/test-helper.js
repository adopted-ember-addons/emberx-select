import Ember from 'ember';
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import registerSelectHelper from 'emberx-select/helpers/register-select-helper';
registerSelectHelper();


setResolver(resolver);

export function beforeEach(fn) {
  window.beforeEach(function() {
    var test = this;
    Ember.run(function() {
      fn.call(test);
    });
  });
}
export function afterEach(fn) {
  window.afterEach(function() {
    var test = this;
    Ember.run(function() {
      fn.call(test);
    });
  });
}

export var describe = window.describe;
