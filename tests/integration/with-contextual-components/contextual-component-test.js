import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const integration = true;

function hasContextualComponents() {
  return !Ember.VERSION.match(/^2\.[0-2]\./) && !Ember.VERSION.match(/^1/);
}

describe('X-Select - Contextual Component', function() {
  setupComponentTest('x-select', {integration});

  if (hasContextualComponents()) {
    it('yields a hash with the option component', function() {
      this.render(hbs`
        {{#x-select value=status as |xs|}}
          {{#xs.option value="in the office"}}In the Office{{/xs.option}}
          {{#xs.option value="out of office"}}Out of Office{{/xs.option}}
        {{/x-select}}
      `);

      expect(this.$('option').length).to.equal(2);
    });
  }
});
