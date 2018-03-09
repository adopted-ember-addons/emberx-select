import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { isArray, A } from '@ember/array';

/**
 * Used to wrap a native `<option>` tag and associate an object with
 * it that can be bound. It can only be used in conjuction with a
 * containing `x-select` component
 *
 * @class Ember.XOptionComponent
 * @extends Ember.Component
 */
export default Component.extend({
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
  selected: computed('value', 'select.{value,multiple}', function() {
    if (this.get('select.multiple') && isArray(this.get('select.value'))) {
      let selectValue = A(this.get('select.value'));

      return selectValue.includes(this.get('value'));
    } else {
      return this.get('value') === this.get('select.value');
    }
  }),

  didReceiveAttrs() {
    this._super.apply(this, arguments);

    let oldDisabled = this.get('_oldDisabled');

    if(oldDisabled !== undefined && !oldDisabled) {
      // Undefined means the first time

      if(this.get('disabled') !== oldDisabled) {
        // eslint-disable-next-line ember/closure-actions
        this.sendAction('on-disable', this.get('value'), this.get('disabled'));
      }
    }

    this.set('_oldDisabled', this.get('disabled'));
  },

  /**
   * Register this x-option with the containing `x-select`
   *
   * @override
   */
  didInsertElement() {
    this._super.apply(this, arguments);

    scheduleOnce('afterRender', () => {
      this.get('register')(this);
    });
  },

  /**
   * Unregister this x-option with its containing x-select.
   *
   * @override
   */
  willDestroyElement: function() {
    this.get('unregister')(this);
    this._super.apply(this, arguments);
  }
});
