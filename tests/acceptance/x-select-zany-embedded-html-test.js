import xSelectInteractor from 'emberx-select/test-support/interactor';
import { expect } from 'chai';
import { visit } from '@ember/test-helpers';
import { beforeEach, describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';

describe('XSelect: Embedded HTML', function() {
  let xselect = new xSelectInteractor('.x-select');

  setupApplicationTest();

  beforeEach(async () => {
    visit('test-bed/zany-embedded-html');
  });

  it('renders', async () => {
    await xselect.when(() => expect(xselect.isPresent).to.equal(true));
  });
});
