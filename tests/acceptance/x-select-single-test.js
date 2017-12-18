/*global expect, getComponentById */

import { run } from '@ember/runloop';

import $ from 'jquery';
import startApp from '../helpers/start-app';
import {
  beforeEach,
  afterEach,
  describe,
  it
} from 'mocha';
import { select } from 'dummy/tests/helpers/x-select';
import { stanley } from 'dummy/mixins/folks';
import { shouldBindAttrs } from './shared/attr-test';

let App;

describe('XSelect: Single Selection', function() {
  beforeEach(function() {
    App = startApp();
    visit("test-bed/single");
  });
  beforeEach(function() {
    let el = $('select');
    this.component = getComponentById(el.attr('id'));
    this.$ = function() {
      return this.component.$.apply(this.component, arguments);
    };
    this.controller = App.__container__.lookup('controller:test-bed.single');
  });

  afterEach(function() {
    run(App, 'destroy');
  });

  it("does not fire any actions on didInsertElement", function() {
    expect(this.controller.get('tagged')).not.to.be.ok;
  });

  it('is enabled by default', function() {
    expect(this.$()).not.to.be.disabled;
  });

  it('renders an option for each view', function() {
    expect(this.$('option').length).to.equal(4);
    expect(this.$('option:first').text()).to.equal('Charles');
    expect(this.$('option:last').text()).to.equal('Nobody');
  });

  it('marks the selected value', function() {
    expect(this.$('option:eq(1)')).to.be.selected;
  });

  describe('choosing the last option', function() {
    beforeEach(function() {
      select('.x-select', 'Stanley');
    });

    it('invokes action', function() {
      expect(this.controller.get('it')).to.equal(stanley);
    });
  });

  describe('manually setting the selected binding', function() {
    beforeEach(function() {
      this.controller.set('it', this.controller.get('charles'));
    });
    it('updates the selected option', function() {
      expect(this.$('option:first')).to.be.selected;
    });
  });

  describe('disabling', function() {
    beforeEach(function() {
      this.controller.set('isDisabled', true);
    });
    it('disables the select box', function() {
      expect(this.$()).not.to.be.enabled;
    });
  });

  describe("when no option is selected", function() {
    beforeEach(function() {
      this.$().prop('selectedIndex', 4).trigger('change');
    });
    it("has no value", function() {
      expect(this.controller.get('it')).to.equal(null);
    });
  });

  shouldBindAttrs();

});
