/*global expect */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from 'mocha';
import { select } from 'dummy/tests/helpers/x-select';
import { stanley } from 'dummy/mixins/folks';
import { shouldBindAttrs } from './shared/attr-test';

var App;

describe('XSelect: Single Selection', function() {
  beforeEach(function() {
    App = startApp();
    visit("/single");
  });
  beforeEach(function() {
    var el = Ember.$('select');
    this.component = getComponentById(el.attr('id'));
    this.$ = function() {
      return this.component.$.apply(this.component, arguments);
    };
    this.controller = App.__container__.lookup('controller:single');
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  it("does not fire any actions on didInsertElement", function() {
    expect(this.controller.get('tagged')).not.to.be.ok;
  });

  it('is enabled by default', function() {
    expect(this.$()).not.to.be.disabled;
  });

  it('renders an option for each view', function() {
    expect(this.$('option').length).to.equal(4);
    expect(this.$('option:first')).to.have.text('Charles');
    expect(this.$('option:last')).to.have.text('Nobody');
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
