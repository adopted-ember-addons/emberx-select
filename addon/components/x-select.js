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
  disabled: false,

  /**
   * Bound to the `multiple` attribute on the native <select> tag.
   *
   * @property multiple
   * @type Boolean
   * @default false
   */
  multiple: false,

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
  change() {
    if (this.get('multiple')) {
      this._updateValueMultiple();
    } else {
      this._updateValueSingle();
    }

    this.sendAction('action', this.get('value'), this);
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
   * @override
   */
  willDestroyElement: function() {
    this._super.apply(this, arguments);

    // might be overkill, but make sure options can get gc'd
    this.get('options').clear();
  },

  /**
   * If this is a multi-select, and the value is not an array, that
   * probably indicates a misconfiguration somewhere, so we error out.
   *
   * @private
   */
  ensureProperType: Ember.on('init', Ember.observer('value', function() {
    var value = this.get('value');

    if (value != null && this.get('multiple') && !isArray(value)) {
      throw new Error('x-select multiple=true was set, but value "' + value + '" is not enumerable.');
    }
  })),

  /**
   * @private
   */
   setDefaultValue: function(){
     var options = this.get('options');
     if(Ember.isEmpty(this.get('value'))&&!this.get('multiple')){
       let value = options[0].get('value');
       this.set('value', value);
     }
   },

  /**
   * @private
   */
  registerOption: function(option) {
    this.get('options').addObject(option);
    if(this.get('options').length === 1) {
      this.setDefaultValue();
    }
  },

  /**
   * @private
   */
  unregisterOption: function(option) {
    this.get('options').removeObject(option);
  }
});
