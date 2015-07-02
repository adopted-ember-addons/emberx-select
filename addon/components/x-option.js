import Ember from 'ember';
import XSelectComponent from './x-select';

var isArray = Ember.isArray;

/**
 * Used to wrap a native `<option>` tag and associate an object with
 * it that can be bound. It can only be used in conjuction with a
 * containing `x-select` component
 *
 * @class Ember.XOptionComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['selected', 'name', 'disabled', 'value', 'title'],
  classNameBindings: [':x-option'],

  /**
   * The value associated with this option. When this option is
   * selected, the `x-select` will fire its action with this
   * value.
   *
   * @property value
   * @type Object
   * @default null
   */
  value: null,

  /**
   * Property bound to the `selected` attribute of the native
   * `<option>` element. It is aware of the containing `x-select`'s
   * value and will mark itself if it is the same.
   *
   * @private
   * @property selected
   * @type Boolean
   */
  selected: Ember.computed('value', 'select.value', 'select.multiple', function() {
    let selectValue = Ember.A(this.get('select.value'));

    if (this.get('select.multiple') && isArray(selectValue)) {
      return this.get('select.value').contains(this.get('value'));
    } else {
      return this.get('value') === this.get('select.value');
    }
  }),

  /**
   * Register this x-option with the containing `x-select`
   *
   * @override
   */
  didInsertElement: function() {
    this._super.apply(this, arguments);

    Ember.run.scheduleOnce('afterRender', () => {
      var select = this.nearestOfType(XSelectComponent);
      Ember.assert("x-option component declared without enclosing x-select", !!select);
      this.set('select', select);
      select.registerOption(this);
    });
  },

  /**
   * Unregister this x-option with its containing x-select.
   *
   * @override
   */
  willDestroyElement: function() {
    this._super.apply(this, arguments);
    this.get('select').unregisterOption(this);
  }
});
