import Ember from 'ember';

export default function() {
  Ember.Test.registerAsyncHelper('select', function(app, selector, text) {
    var $el = app.testHelpers.findWithAssert(selector + "option:contains('" + text + "')");

    $el.each(function() {
      var _this = this;

      Ember.run(function() {
        _this.selected = true;
        Ember.$(_this).trigger('change');
      });
    });

    return app.testHelpers.wait();
  });
}
