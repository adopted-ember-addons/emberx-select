/*global expect */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from 'mocha';


var App;

describe('XSelect: Embedded HTML', function() {
  beforeEach(function() {
    App = startApp();
    visit("/zany-embedded-html");
  });
  beforeEach(function() {
    var el = Ember.$('select');
    this.component = getComponentById(el.attr('id'));
    this.$ = function() {
      return this.component.$.apply(this.component, arguments);
    };
    this.controller = App.__container__.lookup('controller:zanyEmbeddedHTML');
  });

  it("renders", function() {
    expect(this.$()).to.exist;
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });
});
