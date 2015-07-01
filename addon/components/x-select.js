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
  attributeBindings: ['disabled', 'tabindex', 'multiple', 'name', 'autofocus', 'form', 'required', 'size', 'title'],

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
   * @ default 1
   */
  tabindex: null,

  /**
   * Auxiliary computed property that replaces `content.`
   * in `optionValuePath`.
   *
   * @private
   * @property _valuePath
   */
  _valuePath: Ember.computed('optionValuePath', function() {
    var optionValuePath = this.get('optionValuePath');
    if (optionValuePath) {
      return optionValuePath.replace(/^content\.?/, '');
    }
    return null;
  }),

  /**
   * Auxiliary computed property that replaces `content.`
   * in `optionLabelPath`.
   *
   * @private
   * @property _labelPath
   */
  _labelPath: Ember.computed('optionLabelPath', function() {
    return this.get('optionLabelPath').replace(/^content\.?/, '');
  }),

  /**
   * Alias to `value`.
   * This way we accept `value` or `selection` properties.
   *
   * @property selection
   */
  selection: Ember.computed.alias('value'),

  /**
   * Alias to `prompt`.
   * This way we accept `prompt` or `placeholder` properties.
   *
   * @property placeholder
   */
  placeholder: Ember.computed.alias('prompt'),

  /**
   * Auxiliary computed array that holds `content` array
   * values and their labels. Used only in the blockless version.
   *
   * @private
   * @property _optionValues
   */
  _optionValues: Ember.computed.map('content', function(obj) {
    var value     = obj;
    var valuePath = this.get('_valuePath');

    if (valuePath) {
      value = Ember.get(obj, valuePath);
    }

    return {
      value: value,
      label: Ember.get(obj, this.get('_labelPath'))
    };
  }),

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
   * Listen for change events on the native <select> element, which
   * indicates that the user has chosen a new option from the
   * dropdown. If there is an associated `x-option` component that is
   * selected, then the overall value of `x-select` becomes the value
   * of that option.
   *
   * @override
   */
  didInsertElement: function() {
    this._super.apply(this, arguments);

    this.$().on('change', Ember.run.bind(this, function() {
      this._contentDidChange();
    }));
  },

  /**
   * Triggers an update of the selected options.
   * Observing `content` ensures that if an element is removed that
   * is also part of the selection, selection is cleared.
   *
   * @private
   */
  _contentDidChange: Ember.observer('content.@each', function() {
    if (this.get('multiple')) {
      this._updateValueMultiple();
    } else {
      this._updateValueSingle();
    }
  }),

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
      this.set('value', undefined);
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

    var newValues = options.mapBy('value');

    if (isArray(this.get('value'))) {
      this.get('value').setObjects(newValues);
    } else {
      this.set('value', newValues);
    }
    this.raiseAction();
  },

  /**
   * @override
   */
  willDestroyElement: function() {
    this._super.apply(this, arguments);

    this.$().off('change');
    // might be overkill, but make sure options can get gc'd
    this.get('options').clear();
  },

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
   * If this is a multi-select, and the value is not an array, that
   * probably indicates a misconfiguration somewhere, so we error out.
   *
   * @private
   */
  ensureProperType: Ember.observer('value', function() {
    var value = this.get('value');
    if (value != null && this.get('multiple') && !isArray(value)) {
      throw new Error('x-select multiple=true was set, but value "' + value + '" is not enumerable.');
    }
  }).on('init'),

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
