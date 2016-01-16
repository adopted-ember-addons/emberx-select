/*global expect */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from '../test-helper';
import { charles } from 'dummy/mixins/folks';
import { shouldBindAttrs } from './shared/attr-test';

var App;

describe('XSelect: Single Selection default value', function() {
  beforeEach(function() {
    App = startApp();
    visit("/default-value");
  });
  beforeEach(function() {
    var el = Ember.$('select');
    this.component = getComponentById(el.attr('id'));
    this.$ = function() {
      return this.component.$.apply(this.component, arguments);
    };
    this.controller = App.__container__.lookup('controller:default-value');
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  describe('defaulting to the first option', function() {
    it('first option is selected', function() {
      expect(this.controller.get('it')).to.equal(charles);
    });
  });

  shouldBindAttrs();

});
