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
   * @default null
   */
  disabled: null,

  /**
   * Bound to the `multiple` attribute on the native <select> tag.
   *
   * @property multiple
   * @type Boolean
   * @default null
   */
  multiple: null,

  /**
   * The collection of options for this select box. When options are
   * rendered as a child from x-select, they will register themselves with their
   * containing `x-select`. This is for internal book-keeping only and should
   * not be changed from outside.
   *
   * @private
   * @property options
   */
  options: Ember.A([]),

  /**
   * Bound to the `tabindex` attribute on the native <select> tag.
   *
   * @property tabindex
   * @type Integer
   * @default 0
   */
  tabindex: 0,

  /**
   * When the select DOM event fires on the element, trigger the
   * component's action with the current value.
   */
  change(event) {
    let nextValue = this._getValue();

    this.sendAction('action', nextValue, this);
    this.sendAction('onchange', this, nextValue, event);
  },

  /**
   * When the click DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the jQuery event.
   */
  click(event) {
    this.sendAction('onclick', this, this._getValue(), event);
  },

  /**
   * When the blur DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the jQuery event.
   */
  blur(event) {
    this.sendAction('onblur', this, this._getValue(), event);
  },

  /**
   * When the focusOut DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the jQuery event.
   */
  focusOut(event) {
    this.sendAction('onfocusout', this, this._getValue(), event);
  },

  /**
   * Reads the current selection from this select's options.
   *
   * If this is a multi-select, then the value will be an
   * array. Otherwise, it will be a single value which could be null.
   *
   * @private
   * @return {Array|Object} the current selection
   */
  _getValue() {
    let options = this.get('options').filter(function(option) {
      return option.$().is(':selected');
    });

    if (this.get('multiple')) {
      return Ember.A(options).mapBy('value');
    } else {
      let option = options[0];
      return option ? option.get('value') : null;
    }
  },

  /**
   * If no explicit value is set, apply default values based on selected=true in
   * the template.
   *
   * @private
   */
  _setDefaultValues: function() {
    if (this.get('value') === null) {
      this.sendAction('action', this._getValue());
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
    this.$().off('blur');
    this._super.apply(this, arguments);
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

  actions: {

    /**
     * Registers a new option that is contained within x-select.
     *
     * This is called whenever an x-option component is inserted into the DOM.
     *
     * @param {<x-option>} option - x-option component.
     * @private
     */
    registerOption(option) {
      this.get('options').push(option);
      this._setDefaultValues();
    },

    /**
     * Removes a the passed option that is contained within x-select.
     *
     * This is called whenever an x-option component is begining teardown.
     *
     * @param {<x-option>} option - x-option component.
     * @private
     */
    unregisterOption(option) {
      this.get('options').removeObject(option);
      this._setDefaultValues();
    }
  }
});
