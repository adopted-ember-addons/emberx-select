import { on } from '@ember/object/evented';
import { once } from '@ember/runloop';
import Component from '@ember/component';
import { isArray, A } from '@ember/array';
import { computed, observer } from '@ember/object';

const isSelectedOption = option => option.element.selected;

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
export default Component.extend({
  tagName: 'select',
  classNameBindings: [':x-select'],
  attributeBindings: [
    'disabled',
    'tabindex',
    'multiple',
    'form',
    'name',
    'autofocus',
    'required',
    'size',
    'title'
  ],

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
   * The collection of options for this select box. When options are
   * rendered as a child from x-select, they will register themselves with their
   * containing `x-select`. This is for internal book-keeping only and should
   * not be changed from outside.
   *
   * @private
   * @property options
   */
  options: computed(function() {
    return A([]);
  }),

  /**
   * Bound to the `tabindex` attribute on the native <select> tag.
   *
   * @property tabindex
   * @type Integer
   * @default null
   */
  tabindex: null,

  /**
   * Function for the `on-blur` action
   *
   * @property on-blur
   * @type Function
   */
  'on-blur'() {},

  /**
   * Function for the `on-click` action
   *
   * @property on-click
   * @type Function
   */
  'on-click'() {},

  /**
   * Function for the `on-change` action
   *
   * @property on-change
   * @type Function
   */
  'on-change'() {},

  /**
   * Function for the `on-focus-out` action
   *
   * @property on-focus-out
   * @type Function
   */
  'on-focus-out'() {},

  /**
   * Function that calls an action and sends the proper arguments.
   *
   * @method _handleAction
   * @type Function
   * @param {String} action - string name of the action to invoke
   * @param {String|Object} value - current value of the component
   * @param {Object} event - DOM event from the current action
   */
  _handleAction(action, value, event) {
    this.get(action)(value, event);
  },

  /**
   * When the select DOM event fires on the element, trigger the
   * component's action with the current value.
   */
  change(event) {
    this._handleAction('on-change', this._getValue(), event);
  },

  /**
   * When the click DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the DOM event.
   */
  click(event) {
    this._handleAction('on-click', this._getValue(), event);
  },

  /**
   * When the blur DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the DOM event.
   */
  blur(event) {
    this._handleAction('on-blur', this._getValue(), event);
  },

  /**
   * When the focusOut DOM event fires on the element, trigger the
   * component's action with the component, x-select value, and the DOM event.
   */
  focusOut(event) {
    this._handleAction('on-focus-out', this._getValue(), event);
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
    return this.get('multiple') ? this._findMultipleValues() : this._findSingleValue();
  },

  /**
   * Finds all selected values from all `x-option`
   * children. Used when this.get('multiple') === true
   *
   * @private
   * @return {Array} all the values from selected x-options
   */
  _findMultipleValues() {
    return this.get('options')
      .filter(isSelectedOption)
      .map(option => option.get('value'));
  },

  /**
   * Returns the value of the first selected `x-option`.
   * Used when `this.get('multiple') !== true`
   *
   * @private
   * @return {Object} the value of the first select `x-option`, or null
   */
  _findSingleValue() {
    let selectedValue = this.get('options').find(isSelectedOption);
    return selectedValue ? selectedValue.get('value') : null;
  },

  /**
   * If no explicit value is set, apply default values based on selected=true in
   * the template.
   *
   * @private
   */
  _setDefaultValues() {
    once(this, this.__setDefaultValues);
  },

  __setDefaultValues() {
    let canSet = !this.isDestroying && !this.isDestroyed;

    if (canSet && this.get('value') == null) {
      // `on-change` is the default event we use
      this._handleAction('on-change', this._getValue(), event);
    }
  },

  /**
   * @override
   */
  didInsertElement() {
    this._super.apply(this, arguments);

    this.element.addEventListener('blur', event => this.blur(event));
  },

  /**
   * @override
   */
  willDestroyElement: function() {
    this.element.removeEventListener('blur', this.blur);
    this._super.apply(this, arguments);
  },

  /**
   * If this is a multi-select, and the value is not an array, that
   * probably indicates a misconfiguration somewhere, so we error out.
   *
   * @private
   */
  /* eslint-disable */
  ensureProperType: on(
    'init',
    observer('value', function() {
      let value = this.get('value');

      if (value != null && this.get('multiple') && !isArray(value)) {
        throw new Error(`x-select multiple=true was set, but value ${value} is not enumerable.`);
      }
    })
  ),
  /* eslint-enable */

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
