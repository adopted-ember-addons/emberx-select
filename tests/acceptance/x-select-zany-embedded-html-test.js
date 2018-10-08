import startApp from '../helpers/start-app';
import xSelectInteractor from 'dummy/tests/helpers/x-select';
import { expect } from 'chai';
import { run } from '@ember/runloop';
import { when } from '@bigtest/convergence';
import { beforeEach, afterEach, describe, it } from 'mocha';

describe('XSelect: Embedded HTML', function() {
  let xselect = new xSelectInteractor('.x-select');
  let App;

  beforeEach(async () => {
    App = startApp();
    visit('test-bed/zany-embedded-html');
  });

  afterEach(function() {
    run(App, 'destroy');
  });

  it('renders', async () => {
    await when(() => expect(xselect.isPresent).to.equal(true));
  });
});
