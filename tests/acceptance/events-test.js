import startApp from '../helpers/start-app';
import xSelectInteractor from 'dummy/tests/helpers/x-select';
import pageInteractor from 'dummy/tests/interactors/test-page';
import { run } from '@ember/runloop';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { when } from '@bigtest/convergence';

describe('Acceptance: Events', function() {
  let App;
  let xselect = new xSelectInteractor('.x-select');
  let page = new pageInteractor();

  beforeEach(async () => {
    App = startApp();
    await visit('test-bed/e');
  });

  afterEach(function() {
    run(App, 'destroy');
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
