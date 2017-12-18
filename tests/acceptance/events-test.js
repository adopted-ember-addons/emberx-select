import $ from 'jquery';
import { run } from '@ember/runloop';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';

describe('Acceptance: Events', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    visit('test-bed/e');
  });

  afterEach(function() {
    run(application, 'destroy');
  });

  describe("visiting blur and triggering the blur event", function() {
    beforeEach(function() {
      return click('.spec-blur-link');
    });

    beforeEach(function() {
      $('.x-select').trigger('blur');
    });

    it("fires the blur action", function() {
      expect($('.spec-event-type').text().trim()).to.equal('blur');
    });
  });

  describe("visiting click and triggering the click event", function() {
    beforeEach(function() {
      click('.spec-click-link');
      return click('.x-select');
    });

    it("fires the click action", function() {
      expect($('.spec-event-type').text().trim()).to.equal('click');
    });
  });

  describe("visiting focus-out and triggering the focus-out event", function() {
    beforeEach(function() {
      return click('.spec-focus-out-link');
    });

    beforeEach(function() {
      $('.x-select').trigger('focusout');
    });

    it("fires the focus-out action", function() {
      expect($('.spec-event-type').text().trim()).to.equal('focusout');
    });
  });

});
