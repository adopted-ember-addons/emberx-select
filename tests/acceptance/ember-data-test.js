import { run } from '@ember/runloop';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import { select } from 'dummy/tests/helpers/x-select';
import startApp from '../helpers/start-app';

describe('Acceptance: EmberData', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    visit('test-bed/ember-data');
  });

  afterEach(function() {
    run(application, 'destroy');
  });

  it('can visit /ember-data', function() {
    expect(currentPath()).to.equal('test-bed.ember-data');
  });

  describe("selecting a new value", function() {
    beforeEach(function() {
      select('.x-select', "Ollie");
    });

    describe("navigating to another route", function() {
      beforeEach(function() {
        return click("a:contains('Single')");
      });

      it("doesn't blow up", function() {
        expect(currentPath()).to.equal('test-bed.single');
      });

    });

  });

});
