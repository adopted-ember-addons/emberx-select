import Ember from 'ember';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import { beforeEach, describe, it } from 'mocha';
import { select } from 'dummy/tests/helpers/x-select';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration: XSelectActionsComponent', function() {
  setupComponentTest('x-select-actions', {
    integration: true
  });

  describe("x-option actions", function() {
    beforeEach(function() {
      this.set('handleDisable', sinon.spy());

      this.render(hbs`
        {{#x-select value=value as |xs|}}
          {{#xs.option value="Hello" on-disable=(action handleDisable) disabled=disabledProp class="test-xs-option"}}
            Hello
          {{/xs.option}}
        {{/x-select}}
      `);
      this.set('disabledProp', false);
    });

    it('the option is not disabled', function() {
      expect(this.$('.test-xs-option').prop('disabled')).to.equal(false);
    });

    it("does not fire the action", function() {
      expect(this.get('handleDisable')).to.not.have.been.called;
    });

    describe("disabling an option", function() {
      beforeEach(function() {
        this.set('disabledProp', true);
      });

      it("disables the option", function() {
        expect(this.$('.test-xs-option').prop('disabled')).to.equal(true);
      });

      it("calls the disable action", function() {
        expect(this.get('handleDisable')).to.have.been.called;
      });

      it("has the correct arguments passed to the action", function() {
        expect(this.get('handleDisable').args[0][0]).to.equal('Hello', 'First argument should be the value');
        expect(this.get('handleDisable').args[0][1]).to.equal(true, 'Second argument should be the disabled boolean');
      });

      describe("setting the same value", function() {
        beforeEach(function() {
          this.set('disabledProp', true);
        });

        it("doesn't fire the action twice", function() {
          // Once because this spy has already been called in the
          // parent describe
          expect(this.get('handleDisable')).to.have.been.calledOnce;
        });

      });

    });
  });

  describe("x-select actions", function() {
    describe("sending a string action", function() {
      beforeEach(function() {
        this.render(hbs`
        {{#x-select value=value on-change="stringaction" as |xs|}}
          {{#xs.option value="Hello"}}Hello{{/xs.option}}
        {{/x-select}}
      `);
        /* eslint-disable */
        Ember.warn = sinon.spy();

        select(this.$(), 'Hello');
      });

      it("sends a warning in the console", function() {
        expect(Ember.warn).to.have.been.calledOnce;
        /* eslint-enable */
      });
    });
  });
});
