import Ember from 'ember';

/**
 * Wraps a native <select> element so that it can be object and
 * binding aware. It is used in conjuction with the
 * `x-option` component to construct select boxes. E.g.
 *
 *   {{#x-select value="bob" action="selectPerson"}}
 *     {{x-option value="fred"}}Fred Flintstone{{/x-option}}
 *     {{x-option value="bob"}}Bob Newhart{{/x-option}}
 *   {{/x-select}}
 *
 * the options are always up to date, so that when the object bound to
 * `value` changes, the corresponding option becomes selected.
 *
 * Whenever the select tag receives a change event, it will fire
 * `action`
 *
 * @class Ember.XSelectComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: "select",
  classNameBindings: [":x-select"],
  attributeBindings: ['disabled', 'tabindex'],

  /**
   * Bound to the `disabled` attribute on the native <select> tag.
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  /**
   * Bound to the `tabindex` attribute on the native <select> tag.
   *
   * @property tabindex
   * @type Integer
   * @ default 1
   */
  tabindex: 1,

  /**
   * The collection of options for this select box. When options are
   * inserted into the dom, they will register themselves with their
   * containing `x-select`. This is for internal book-keeping only and should
   * not be changed from outside.
   *
   * @private
   * @property options
   */
  options: Ember.computed(function() {
    return Ember.A();
  }),

  /**
   * @private
   */
  setup: (function() {
    this.$().on('change', Ember.run.bind(this, function() {
      var option = this.get('options').find(function(option) {
        return option.$().is(':selected');
      });

      if (option) {
        this.set('value', option.get('value'));
      }
    }));
  }).on('didInsertElement'),


  /**
   * XSelect supports both two-way binding as well as an action. Observe the
   * `value` property, and when it changes, raise that as an action.
   *
   * @private
   */
  raiseAction: Ember.observer('value', function() {
    this.sendAction('action', this.get('value'), this);
  }),

  /**
   * @private
   */
  teardown: (function() {
    this.$().off('change');
    // might be overkill, but make sure options can get gc'd
    this.get('options').clear();
  }).on('willDestroyElement'),

  /**
   * @private
   */
  registerOption: function(option) {
    this.get('options').addObject(option);
  },

  /**
   * @private
   */
  unregisterOption: function(option) {
    this.get('options').removeObject(option);
  }
});
