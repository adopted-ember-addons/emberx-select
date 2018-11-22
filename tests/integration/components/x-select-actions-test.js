import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import xSelectInteractor from 'dummy/tests/helpers/x-select';

describe('Integration: XSelectActionsComponent', function() {
  let xselect = new xSelectInteractor('.x-select');

  setupComponentTest('x-select-actions', {
    integration: true
  });

  describe('x-option actions', function() {
    beforeEach(function() {
      this.set('handleDisable', sinon.spy());

      this.render(hbs`
        {{#x-select value=value as |xs|}}
          {{#xs.option value="Hello" on-disable=(action handleDisable) disabled=disabledProp}}
            Hello
          {{/xs.option}}
        {{/x-select}}
      `);
      this.set('disabledProp', false);
    });

    it('the option is not disabled', async () => {
      await xselect.when(() => {
        expect(xselect.options(0).isDisabled).to.equal(false);
        expect(xselect.options(0).text).to.equal('Hello');
      });
    });

    it('does not fire the action', function() {
      expect(this.get('handleDisable')).to.not.have.been.called;
    });

    describe('disabling an option', function() {
      beforeEach(function() {
        this.set('disabledProp', true);
      });

      it('disables the option', async () => {
        await xselect.when(() => expect(xselect.options(0).isDisabled).to.equal(true));
      });

      it('calls the disable action', function() {
        expect(this.get('handleDisable')).to.have.been.called;
      });

      it('has the correct arguments passed to the action', function() {
        expect(this.get('handleDisable').args[0][0]).to.equal('Hello', 'First argument should be the value');
        expect(this.get('handleDisable').args[0][1]).to.equal(
          true,
          'Second argument should be the disabled boolean'
        );
      });

      describe('setting the same value', function() {
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
});
