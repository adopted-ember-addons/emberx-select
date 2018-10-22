import xSelectInteractor from 'dummy/tests/helpers/x-select';
import pageInteractor from 'dummy/tests/interactors/test-page';
import { expect } from 'chai';
import { when } from '@bigtest/convergence';
import { visit } from '@ember/test-helpers';
import { beforeEach, describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';

describe('XSelect: Multiple Selection', function() {
  let xselect = new xSelectInteractor('.x-select');
  let page = new pageInteractor();

  setupApplicationTest();

  beforeEach(async () => {
    await visit('test-bed/multiple');
  });

  it('marks all selected values initially', async () => {
    await when(() => {
      expect(xselect.options(1).text).to.equal('Bastion');
      expect(xselect.options(2).text).to.equal('Stanley');

      expect(xselect.options(1).isSelected).to.equal(true);
      expect(xselect.options(2).isSelected).to.equal(true);

      expect(page.multiselectValues(0).text).to.equal('Bastion');
      expect(page.multiselectValues(1).text).to.equal('Stanley');
    });
  });

  describe('deselecting', function() {
    beforeEach(async () => {
      await xselect.select('Stanley');
    });

    it('properly deselects the right option', async () => {
      await when(() => {
        expect(xselect.options(1).text).to.equal('Bastion');
        expect(xselect.options(2).text).to.equal('Stanley');

        expect(xselect.options(1).isSelected).to.equal(true);
        expect(xselect.options(2).isSelected).to.equal(false);
      });
    });

    it('updates the page values', async () => {
      await when(() => expect(page.multiselectValues(0).text).to.equal('Bastion'));
    });
  });

  describe('when no option is selected', function() {
    beforeEach(async () => {
      await xselect.select(['Bastion', 'Stanley']);
    });

    it('updates the select values', async () => {
      await when(() => {
        expect(xselect.options(1).isSelected).to.equal(false);
        expect(xselect.options(1).text).to.equal('Bastion');

        expect(xselect.options(2).isSelected).to.equal(false);
        expect(xselect.options(2).text).to.equal('Stanley');
      });
    });

    it('updates the page values', async () => {
      await when(() => expect(page.multiselectValues(0).text).to.equal('None'));
    });
  });
});
