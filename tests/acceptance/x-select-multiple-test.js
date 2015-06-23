/*global expect */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from '../test-helper';
import { bastion, stanley, charles } from 'dummy/mixins/folks';

var App;

describe('XSelect: Multiple Selection', function() {
  var component, controller;
  beforeEach(function() {
    App = startApp();
    visit("/multiple");
  });
  beforeEach(function() {
    var el = Ember.$('select');
    component = Ember.View.views[el.attr('id')];
    this.$ = function() {
      return component.$.apply(component, arguments);
    };
    controller = App.__container__.lookup('controller:multiple');
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
      expect(controller.get('currentSelections.length')).to.equal(1);
      expect(controller.get('currentSelections.firstObject.name')).to.deep.equal('Stanley');
    });
  });

  describe('manually setting the selected binding', function() {
    beforeEach(function() {
      controller.set('selections', [controller.get('charles'), controller.get('stanley')]);
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
      expect(controller.get('currentSelections.length')).to.equal(0);
    });
  });

  describe("trying to set the value to a non-array", function() {
    beforeEach(function() {
      try {
        Ember.run(function() {
          controller.set('selections', 'OHAI!');
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

  describe('native select element attributes', function() {
    beforeEach(function() {
      controller.setProperties({
        attrName: 'person-select',
        attrForm: 'person-form',
        title: 'person title',
        attrSize: '3',
        isRequired: true,
        hasAutofocus: true
      });
    });
    it('renders the name attribute', function() {
      expect(this.$().attr('name')).to.equal('person-select');
    });
    it('renders the form attribute', function() {
      expect(this.$().attr('form')).to.equal('person-form');
    });
    it('renders the title attribute', function() {
      expect(this.$().attr('title')).to.equal('person title');
    });
    it('renders the size attribute', function() {
      expect(this.$().attr('size')).to.equal('3');
    });
    it('renders the required attribute', function() {
      expect(this.$().attr('required')).to.equal('required');
    });
    it('renders the autofocus attribute', function() {
      expect(this.$().attr('autofocus')).to.equal('autofocus');
    });
  });


});
