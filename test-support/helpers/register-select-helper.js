import Ember from 'ember';

// TODO:
// Can you pass an object instead of a string?
// Can you make it not case sensastive?
// Rename the file / move the select function?
export function select(selector, ...texts) {
  let $options = Ember.$(`${selector} option`);

  if (!$options.length) {
    throw `No options found in ${selector}` ;
  }

  $options.each(function() {
    let $option = Ember.$(this);

    Ember.run(() => {
      this.selected = texts.some(text => $option.is(`:contains('${text}')`));

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
