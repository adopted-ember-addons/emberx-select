import xSelectInteractor from 'emberx-select/test-support/interactor';
import { describe, it, beforeEach } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { visit, currentRouteName, click } from '@ember/test-helpers';
import { expect } from 'chai';

describe('Acceptance: EmberData', function() {
  let xselect = new xSelectInteractor('.x-select');

  setupApplicationTest();

  beforeEach(async function() {
    await visit('test-bed/ember-data');
  });

  it('can visit /ember-data', function() {
    expect(currentRouteName()).to.equal('test-bed.ember-data');
  });

  describe('selecting a new value', function() {
    beforeEach(async () => {
      await xselect.select('Ollie');
    });

    describe('navigating to another route', function() {
      beforeEach(async () => {
        await click('.spec-single');
      });

      it("doesn't blow up", function() {
        expect(currentRouteName()).to.equal('test-bed.single');
      });
    });
  });
});
