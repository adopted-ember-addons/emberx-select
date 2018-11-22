import xSelectInteractor from 'dummy/tests/helpers/x-select';
import pageInteractor from 'dummy/tests/interactors/test-page';
import { expect } from 'chai';
import { visit } from '@ember/test-helpers';
import { beforeEach, describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';

describe('XSelect: Single Selection', function() {
  let xselect = new xSelectInteractor('.x-select');
  let page = new pageInteractor();

  setupApplicationTest();

  beforeEach(async function() {
    await visit('test-bed/single');
  });

  it('is enabled by default', async () => {
    await xselect.when(() => expect(xselect.isDisabled).to.equal(false));
  });

  it('renders an option for each view', async () => {
    await xselect.when(() => {
      expect(xselect.options().length).to.equal(4);
      expect(xselect.options(0).text).to.equal('Charles');
      expect(xselect.options(3).text).to.equal('Nobody');
    });
  });

  it('marks the selected value', async () => {
    await xselect.when(() => expect(xselect.options(1).isSelected).to.equal(true));
  });

  describe('choosing the last option', function() {
    it('invokes action & changes the value on page', async () => {
      await xselect
        .select('Stanley')
        .when(() => expect(page.selectedText).to.equal('Stanley'));
    });
  });
});
