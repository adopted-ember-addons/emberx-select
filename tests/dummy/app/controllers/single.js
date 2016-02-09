import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Controller.extend(Folks, {
  isDisabled: false,
  isRequired: false,
  hasAutofocus: false,
  attrName: null,
  attrForm: null,
  attrSize: null,
  selectBlur: true,

  actions: {
    tagYouAreIt: function(object) {
      this.tagged = object;
    },

    selectBlur(component, value, event) {
      this.set('eventType', event.type);
    },

    selectClick(component, value, event) {
      this.set('eventType', event.type);
    },

    selectFocusOut(component, value, event) {
      this.set('eventType', event.type);
    },

    triggerEventSelect(type) {
      this.setProperties({
        selectBlur: false,
        selectClick: false,
        selectFocus: false
      });

      this.set(`${type}`, true);
    }
  }
});
