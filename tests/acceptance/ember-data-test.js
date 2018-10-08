import startApp from '../helpers/start-app';
import xSelectInteractor from 'dummy/tests/helpers/x-select';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { run } from '@ember/runloop';
import { expect } from 'chai';

describe('Acceptance: EmberData', function() {
  let App;
  let xselect = new xSelectInteractor('.x-select');

  beforeEach(async () => {
    App = startApp();
    await visit('test-bed/ember-data');
  });

  afterEach(function() {
    run(App, 'destroy');
  });

  it('can visit /ember-data', function() {
    expect(currentPath()).to.equal('test-bed.ember-data');
  });

  describe('selecting a new value', function() {
    beforeEach(async () => {
      await xselect.selectOption('Ollie');
    });

    describe('navigating to another route', function() {
      beforeEach(async () => {
        await click("a:contains('Single')");
      });

      it("doesn't blow up", function() {
        expect(currentPath()).to.equal('test-bed.single');
      });
    });
  });
});
