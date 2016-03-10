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
    if (this.get('select.multiple') && isArray(this.get('select.value'))) {
      let selectValue = Ember.A(this.get('select.value'));

      return selectValue.contains(this.get('value'));
    } else {
      return this.get('value') === this.get('select.value');
    }
  }),

  /**
   * Register this x-option with the containing `x-select`
   *
   * @override
   */
  didInsertElement() {
    this._super.apply(this, arguments);
    Ember.run.scheduleOnce('afterRender', this, 'registerWithXSelect');
  },

  select: Ember.computed(function() {
    return this.nearestOfType(XSelectComponent);
  }),

  registerWithXSelect() {
    const select = this.get('select');
    Ember.assert("x-option component declared without enclosing x-select", !!select);
    select.registerOption(this);
  },

  /**
   * Unregister this x-option with its containing x-select.
   *
   * @override
   */
  willDestroyElement: function() {
    this._super.apply(this, arguments);
    let select = this.get('select');
    if(select) {
      select.unregisterOption(this);
    }
  }
});
