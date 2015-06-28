/*global expect */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from '../test-helper';
import { bastion, stanley, charles } from 'dummy/mixins/folks';

var App;

describe('XSelect: Multiple Selection (Blockless)', function() {
  var component, controller;
  beforeEach(function() {
    App = startApp();
    visit("/blockless-multiple");
  });
  beforeEach(function() {
    var el = Ember.$('select');
    component = getComponentById(el.attr('id'));
    this.$ = function() {
      return component.$.apply(component, arguments);
    };
    controller = App.__container__.lookup('controller:blocklessMultiple');
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  it("does not fire any actions on didInsertElement", function() {
    expect(controller.get('changedSelections')).not.to.be.ok();
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
      expect(controller.get('it.length')).to.equal(1);
      expect(controller.get('it.firstObject.name')).to.deep.equal('Stanley');
    });
  });

  describe('manually setting the selected binding', function() {
    beforeEach(function() {
      controller.set('it', [controller.get('charles'), controller.get('stanley')]);
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
      expect(controller.get('it.length')).to.equal(0);
    });
  });

  describe("trying to set the value to a non-array", function() {
    beforeEach(function() {
      try {
        Ember.run(function() {
          controller.set('it', 'OHAI!');
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


});
