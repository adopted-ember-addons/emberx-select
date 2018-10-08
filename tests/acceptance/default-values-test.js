import startApp from '../helpers/start-app';
import xSelectInteractor from 'dummy/tests/helpers/x-select';
import pageInteractor from 'dummy/tests/interactors/test-page';
import { expect } from 'chai';
import { when } from '@bigtest/convergence';
import { run } from '@ember/runloop';
import { describe, it, beforeEach, afterEach } from 'mocha';

describe('XSelect: Default Values', function() {
  let App;
  let page = new pageInteractor();
  let makeSelect = new xSelectInteractor('.spec-car-make');
  let modelSelect = new xSelectInteractor('.spec-car-model');
  let trimSelect = new xSelectInteractor('.spec-car-trim');
  let modelMakeSelect = new xSelectInteractor('.spec-autopopulated-make-field');
  let quantitySelect = new xSelectInteractor('.spec-autopopulated-quantity-field');

  beforeEach(function() {
    App = startApp();
  });

  afterEach(function() {
    run(App, 'destroy');
  });

  describe('Initializing with default values', function() {
    beforeEach(async () => {
      await visit('test-bed/default-value');
    });

    it('initializes with defaults if no explicit value is present', async () => {
      await when(() => expect(page.carMakeText).to.equal('Selected Make: Honda'));
    });

    it('sets the selected property on the correct default option', async () => {
      await when(() => expect(makeSelect.options(1).isSelected).to.equal(true));
    });

    it('can set a default to the first option in a dynamic list', async () => {
      await when(() => expect(page.carModelText).to.equal('Selected Model: Fit'));
    });

    it('sets the selected property on the correct default option', async () => {
      await when(() => expect(modelSelect.options(0).isSelected).to.equal(true));
    });

    it('initializes with the correct explicit value if one is present', async () => {
      await when(() => expect(modelMakeSelect.options(2).isSelected).to.equal(true));
    });

    it('sets the selected property on the correct explicity value option', async () => {
      await when(() => expect(modelMakeSelect.options(2).text).to.equal('Ford'));
    });

    it('does not set the selected property on the default option', async () => {
      await when(() => expect(modelMakeSelect.options(0).isSelected).to.equal(false));
    });

    it('sets the selected property to the explicitly set value', async () => {
      await when(() => {
        expect(quantitySelect.options(5).text).to.equal('0');
        expect(quantitySelect.options(5).isSelected).to.equal(true);
      });
    });

    it('initializes with the correct explicit value if one is present even if that value is falsy', async () => {
      await when(() => expect(page.selectedQuantityText).to.equal('Selected Quantity: 0'));
    });

    it('sets the selected property on the correct default option', async () => {
      await when(() => {
        expect(trimSelect.options(0).isSelected).to.equal(true);
        expect(trimSelect.options(0).text).to.equal('Sport');
      });
    });

    describe('Changing the value on fields with default values', function() {
      beforeEach(async () => {
        await makeSelect.selectOption('Toyota');
      });

      it('updates the value', async () => {
        await when(() => {
          expect(makeSelect.options(2).isSelected).to.equal(true);
          expect(makeSelect.options(2).text).to.equal('Toyota');
        });
      });

      it('removes the selected property on the previously selected option', async () => {
        await when(() => {
          expect(makeSelect.options(1).isSelected).to.equal(false);
          expect(makeSelect.options(1).text).to.equal('Honda');
        });
      });

      it('reevalutates the dynamic default value', async () => {
        await when(() => {
          expect(modelSelect.options(0).isSelected).to.equal(true);
          expect(modelSelect.options(0).text).to.equal('Camry');
        });
      });
    });
  });
});
