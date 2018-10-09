import xSelectInteractor from 'dummy/tests/helpers/x-select';
import { expect } from 'chai';
import { when } from '@bigtest/convergence';
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
    await when(() => expect(xselect.isPresent).to.equal(true));
  });
});
