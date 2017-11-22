import { run } from '@ember/runloop';
import $ from 'jquery';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import { select } from 'dummy/tests/helpers/x-select';

describe('XSelect: Default Values', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    run(application, 'destroy');
  });

  describe('Initializing with default values', function(){
    beforeEach(function() {
      visit('test-bed/default-value');
    });

    it('initializes with defaults if no explicit value is present', function() {
      expect($(".spec-selected-make:contains('Selected Make: Honda')")).to.exist;
    });

    it('sets the selected property on the correct default option', function() {
      expect($(".spec-car-make option:contains('Honda')")).to.be.selected;
    });

    it('can set a default to the first option in a dynamic list', function() {
      expect($(".spec-selected-model:contains('Selected Model: Fit')")).to.exist;
    });

    it('sets the selected property on the correct default option', function() {
      expect($(".spec-car-model option:contains('Fit')")).to.be.selected;
    });

    it('initializes with the correct explicit value if one is present', function() {
      expect($(".spec-selected-make-from-model:contains('Selected Make: Ford')")).to.exist;
    });

    it('sets the selected property on the correct explicity value option', function() {
      expect($(".spec-autopopulated-make-field option:contains('Ford')")).to.be.selected;
    });

    it('does not set the selected property on the default option', function() {
      expect($(".spec-autopopulated-make-field option:contains('Toyota')")).not.to.be.selected;
    });

    it('sets the selected property to the explicitly set value', function() {
      expect($(".spec-autopopulated-quantity-field option:contains('0')")).to.be.selected;
    });

    it('initializes with the correct explicit value if one is present even if that value is falsy', function() {
      expect($(".spec-selected-quantity:contains('Selected Quantity: 0')")).to.exist;
    });

    it('sets the selected property on the correct default option', function() {
      expect($(".spec-car-trim option:contains('Sport')")).to.be.selected;
    });

    it('initializes with the correct explicit value if one is present even if that value is undefined', function() {
      expect($(".spec-selected-trim:contains('Selected Trim: Sport')")).to.exist;
    });

    describe("Changing the value on fields with default values", function() {
      beforeEach(function() {
        select('.spec-car-make', 'Toyota');
      });

      it("updates the value", function() {
        expect($(".spec-selected-make:contains('Selected Make: Toyota')")).to.exist;
      });

      it("sets the selected property on the correct updated option", function() {
        expect($(".spec-car-make option:contains('Toyota')")).to.be.selected;
      });

      it("removes the selected property on the previously selected option", function() {
        expect($(".spec-car-make option:contains('Honda')")).not.to.be.selected;
      });

      it("reevalutates the dynamic default value", function() {
        expect($(".spec-selected-model:contains('Selected Model: Camry')")).to.exist;
      });

      it("sets the selected property on the correct default value", function() {
        expect($(".spec-car-model option:contains('Camry')")).to.be.selected;
      });
    });
  });
});
