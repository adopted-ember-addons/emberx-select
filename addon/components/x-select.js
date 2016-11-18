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
   * Bound to the `tabindex` attribute on the native <select> tag.
   *
   * @property tabindex
   * @type Integer
   * @default 0
   */
  tabindex: 0,

  /**
   * Determies if one way data binding is enabled. If set to true the
   * value of x-select will not be updated when changing options. Instead, you
   * would consume the new value through an action. E.g.
   *
   * {{#x-select value=someVal one-way=true action=(action "selectionChanged")}}
   *   {{!options here ....}}
   * {{/x-select}}
   *
   * @property one-way
   * @type Boolean
   * @default false
   */
  'one-way': false,

  /**
   * oneWay alias is a backward-compatible attribute for a release that existed
   * for a short time
   *
   * @deprecated
   */
  'oneWay': Ember.computed.alias('one-way'),

  /**
   * Set to true when `willDestroyElement` is called.
   *
   * @private
   * @property isXSelectDestroying
   */
  isXSelectDestroying: false,

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
    let nextValue = this._getValue();

    if (!this.get('one-way')) {
      this.set('value', nextValue);
    }

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
      try {
        return option.$().is(':selected');
      } catch(err) {
        console.log(err);
      }
    });

    if (this.get('multiple')) {
      return Ember.A(options).mapBy('value');
    } else {
      let option = options[0];
      return option ? option.get('value') : null;
    }
  },

  /**
   * Reads the current value and sets it.
   * @private
   */
  _updateValue: function() {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }
    this.set('value', this._getValue());
  },

  /**
   * If no explicit value is set, apply default values based on selected=true in
   * the template.
   *
   * @private
   */
  _setDefaultValues: function() {
    if (this.get('value') == null) {
      if (!this.get('one-way')) {
        this._updateValue();
      }

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
    this._super.apply(this, arguments);

    this.set('isXSelectDestroying', true);

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
    if (!this.get('isXSelectDestroying')) {
      this._updateValue();
    }
  }
});
