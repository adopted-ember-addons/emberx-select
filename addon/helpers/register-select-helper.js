import Ember from 'ember';

export default function() {
  Ember.Test.registerAsyncHelper('select', function(app, selector, text) {
    const $el = app.testHelpers.findWithAssert(`${selector} option:contains("${text}")`);

    $el.each(function() {
      Ember.run(() => {
        this.selected = true;
        Ember.$(this).trigger('change');
      });
    });

    return app.testHelpers.wait();
  });
}
