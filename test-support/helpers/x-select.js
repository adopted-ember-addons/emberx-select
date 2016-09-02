import Ember from 'ember';
import jQuery from 'jquery';

// TODO:
// Rename the file / move the select function?
export function select(selector, ...texts) {
  let $select = selector instanceof jQuery ? selector : Ember.$(selector);
  let $options = $select.find(`option`);

  if (!$options.length) {
    throw `No options found in ${selector}` ;
  }

  $options.each(function() {
    let $option = Ember.$(this);

    Ember.run(() => {
      this.selected = texts.some((text) => {
        // uppercase both texts so the helper isn't case sensastive.
        let optionText = $option.text().trim().toUpperCase();

        return optionText === text.toUpperCase();
      });

      if(this.selected) {
        $option.prop('selected', true).trigger('change');
      }
    });
  });
}

export default function() {
  Ember.Test.registerAsyncHelper('select', function(app, selector, texts) {
    select(selector, texts);

    return app.testHelpers.wait();
  });
}
