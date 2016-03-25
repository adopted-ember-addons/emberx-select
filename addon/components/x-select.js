import Ember from 'ember';

var isArray = Ember.isArray;

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
  attributeBindings: ['disabled', 'tabindex', 'multiple', 'form', 'name', 'autofocus', 'required', 'size', 'title'],

  /**
   * Bound to the `disabled` attribute on the native <select> tag.
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: null,

  /**
   * Bound to the `multiple` attribute on the native <select> tag.
   *
   * @property multiple
   * @type Boolean
   * @default false
   */
  multiple: null,

  /**
   * Bound to the `tabindex` attribute on the native <select> tag.
   *
   * @property tabindex
   * @type Integer
   * @ default 0
   */
  tabindex: 0,

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
   * When the select DOM event fires on the element, trigger the
   * component's action with the current value.
   */
  change(event) {
    this._updateValue();

    this.sendAction('action', this.get('value'), this);
    this.sendAction('onchange', this, this.get('value'), event);
  },

  /**
   * When the click DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the jQuery event.
   */
  click(event) {
    this.sendAction('onclick', this, this.get('value'), event);
  },

  /**
   * When the blur DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the jQuery event.
   */
  blur(event) {
    this.sendAction('onblur', this, this.get('value'), event);
  },

  /**
   * When the focusOut DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the jQuery event.
   */
  focusOut(event) {
    this.sendAction('onfocusout', this, this.get('value'), event);
  },

  /**
   * Updates `value` with the object associated with the selected option tag
   *
   * @private
   */
  _updateValueSingle: function(){
    var option = this.get('options').find(function(option) {
      return option.$().is(':selected');
    });

    if (option) {
      this.set('value', option.get('value'));
    } else {
      this.set('value', null);
    }
  },

  /**
   * Updates `value` with an array of objects associated with the selected option tags
   *
   * @private
   */
  _updateValueMultiple: function() {
    var options = this.get('options').filter(function(option) {
      return option.$().is(':selected');
    });

    this.set('value', Ember.A(options).mapBy('value'));
  },

  /**
   * A utility method to determine if the select is multiple or single and call
   * its respective method to update the value.
   *
   * @private
   * @utility
   */
  _updateValue: function() {
    if (this.get('multiple')) {
      this._updateValueMultiple();
    } else {
      this._updateValueSingle();
    }
  },

  /**
   * If no explicit value is set, apply default values based on selected=true in
   * the template.
   *
   * @private
   */
  _setDefaultValues: function() {
    if (!this.get('value')) {
      this._updateValue();
    }
  },

  /**
   * @override
   */
  didInsertElement() {
    this._super.apply(this, arguments);

    this.$().on('blur', (event) => {
      this.blur(event);
    });
  },

  /**
   * @override
   */
  willDestroyElement: function() {
    this._super.apply(this, arguments);

    // might be overkill, but make sure options can get gc'd
    this.get('options').clear();
    this.$().off('blur');
  },

  /**
   * If this is a multi-select, and the value is not an array, that
   * probably indicates a misconfiguration somewhere, so we error out.
   *
   * @private
   */
  ensureProperType: Ember.on('init', Ember.observer('value', function() {
    let value = this.get('value');

    if (value != null && this.get('multiple') && !isArray(value)) {
      throw new Error(`x-select multiple=true was set, but value ${value} is not enumerable.`);
    }
  })),

  /**
   * @private
   */
  registerOption: function(option) {
    this.get('options').addObject(option);
    this._setDefaultValues();
  },

  /**
   * @private
   */
  unregisterOption: function(option) {
    this.get('options').removeObject(option);

    // We don't want to update the value if we're tearing the component down.
    if (!this.get('isDestroying')) {
      this._updateValue();
    }
  }
});
