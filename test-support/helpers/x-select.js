import Ember from 'ember';
import jQuery from 'jquery';

/**
 * Picks an option from the select and sets it to be `selected` in the DOM.
 *
 * @method select
 * @param {string|<jQuery>} selector - selector for the select to pick from.
 * @param {string} texts - text of the option you are picking
 */
export function select(selector, ...texts) {
  const $select = selector instanceof jQuery ? selector : Ember.$(selector);
  const $options = $select.find(`option`);

  if (!$options.length) {
    throw `No options found in ${selector}`;
  }

  $options.each(function() {
    const $option = Ember.$(this);

    Ember.run(() => {
      const selected = texts.some((text) => {
        // uppercase both texts so the helper isn't case sensastive.
        const optionText = $option.text().trim().toUpperCase();

        return optionText === text.toUpperCase();
      });

      if(selected) {
        $option.prop('selected', true).trigger('change');
      }
    });
  });
}
