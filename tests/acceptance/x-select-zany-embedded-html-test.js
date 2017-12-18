/*global expect, getComponentById */

import { run } from '@ember/runloop';

import $ from 'jquery';
import startApp from '../helpers/start-app';
import {
  beforeEach,
  afterEach,
  describe,
  it
} from 'mocha';


let App;

describe('XSelect: Embedded HTML', function() {
  beforeEach(function() {
    App = startApp();
    visit("test-bed/zany-embedded-html");
  });
  beforeEach(function() {
    let el = $('select');
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
    run(App, 'destroy');
  });
});
