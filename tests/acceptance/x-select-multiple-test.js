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
import { shouldBindAttrs } from './shared/attr-test';

let App;

describe('XSelect: Multiple Selection', function() {
  beforeEach(function() {
    App = startApp();
    visit("test-bed/multiple");
  });
  beforeEach(function() {
    let el = $('select');
    this.component = getComponentById(el.attr('id'));
    this.$ = function() {
      return this.component.$.apply(this.component, arguments);
    };
    this.controller = App.__container__.lookup('controller:test-bed.multiple');
  });

  afterEach(function() {
    run(App, 'destroy');
  });

  it("does not fire any actions on didInsertElement", function() {
    expect(this.controller.get('changedSelections')).not.to.be.ok;
  });

  it('marks all selected values', function() {
    expect(this.$('option:eq(1)')).to.be.selected;
    expect(this.$('option:eq(2)')).to.be.selected;
  });

  describe('choosing the last option', function() {
    beforeEach(function() {
      select('.x-select', 'Stanley');
    });

    it('invokes action', function() {
      expect(this.controller.get('currentSelections.length')).to.equal(1);
      expect(this.controller.get('currentSelections')[0].name).to.deep.equal('Stanley');
    });
  });

  describe('manually setting the selected binding', function() {
    beforeEach(function() {
      this.controller.set('selections', [this.controller.get('charles'), this.controller.get('stanley')]);
    });
    it('updates the selected option', function() {
      expect(this.$('option:first')).to.be.selected;
      expect(this.$('option:eq(2)')).to.be.selected;
    });
  });

  describe("when no option is selected", function() {
    beforeEach(function() {
      this.$().prop('selectedIndex', 3).trigger('change');
    });

    it("has the empty array as a value", function() {
      expect(this.controller.get('currentSelections.length')).to.equal(0);
    });
  });

  // TODO: come back to this when https://github.com/emberjs/ember.js/issues/15013 is resolved.
  // Ember 2.11 broke testing code that throws exceptions.
  describe.skip("trying to set the value to a non-array", function() {
    beforeEach(function() {
      try {
        run(() => {
          this.controller.set('selections', 'OHAI!');
        });
      } catch (e) {
        this.exception = e;
      }
    });
    it("throws an error", function() {
      expect(this.exception).not.to.be.undefined;
      expect(this.exception.message).to.match(/enumerable/);
    });
  });

  shouldBindAttrs();

});
