/*global expect, getComponentById */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from 'mocha';


let App;

describe('XSelect: Embedded HTML', function() {
  beforeEach(function() {
    App = startApp();
    visit("test-bed/zany-embedded-html");
  });
  beforeEach(function() {
    let el = Ember.$('select');
    this.component = getComponentById(el.attr('id'));
    this.$ = function() {
      return this.component.$.apply(this.component, arguments);
    };
    this.controller = App.__container__.lookup('controller:test-bed.zanyEmbeddedHTML');
  });

  it("renders", function() {
    expect(this.$()).to.exist;
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });
});
