import xSelectInteractor from 'dummy/tests/helpers/x-select';
import pageInteractor from 'dummy/tests/interactors/test-page';
import { setupApplicationTest } from 'ember-mocha';
import { visit, click } from '@ember/test-helpers';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { when } from '@bigtest/convergence';

describe('Acceptance: Events', function() {
  let xselect = new xSelectInteractor('.x-select');
  let page = new pageInteractor();

  setupApplicationTest();

  beforeEach(async function() {
    await visit('test-bed/e');
  });

  describe('visiting blur and triggering the blur event', function() {
    beforeEach(async () => {
      await click('.spec-blur-link');
      await xselect.focus().blur();
    });

    it('fires the blur action', async () => {
      await when(() => expect(page.eventTypeText).to.equal('blur'));
    });
  });

  describe('visiting click and triggering the click event', function() {
    beforeEach(async () => {
      await click('.spec-click-link');
      await xselect.click();
    });

    it('fires the click action', async () => {
      await when(() => expect(page.eventTypeText).to.equal('click'));
    });
  });

  describe('visiting focus-out and triggering the focus-out event', function() {
    beforeEach(async () => {
      await click('.spec-focus-out-link');
      await xselect.focus().blur();
    });

    it('fires the focus-out action', async () => {
      await when(() => expect(page.eventTypeText).to.equal('focusout'));
    });
  });
});
