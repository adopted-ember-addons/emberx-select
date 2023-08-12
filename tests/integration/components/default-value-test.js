import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import { describe, beforeEach, it } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import xSelectInteractor from 'emberx-select/test-support/interactor';

describe('Integration: DefaultValue', function() {
  let xselect = new xSelectInteractor('.x-select');

  setupComponentTest('default-value', {
    integration: true
  });

  describe('default value of null', function() {
    beforeEach(function() {
      this.set('make', null);
      this.set('selectAction', (value, event) => {
        this.set('make', value);
        this.set('event', event);
        this.set('wasCalled', true);
      });

      this.render(hbs`
        {{#x-select value=make onChange=(action selectAction) as |xs|}}
          {{#xs.option value="fordValue" class="spec-ford-option"}}Ford{{/xs.option}}
          {{#xs.option value="chevyValue"}}Chevy{{/xs.option}}
          {{#xs.option value="dodgeValue" class="spec-dodge-option"}}Dodge{{/xs.option}}
        {{/x-select}}
      `);
    });

    it('displays the first item in the list', async () => {
      await xselect.when(() => {
        expect(xselect.options(0).isSelected).to.equal(true);
        expect(xselect.options(0).text).to.equal('Ford');
      });
    });

    it('sets the default value to the first element', function() {
      expect(this.get('make')).to.equal('fordValue');
      expect(this.get('event') instanceof Event).to.be.true;
    });

    it('invokes the select action on init', function() {
      expect(this.get('wasCalled')).to.equal(true);
    });
  });
});
