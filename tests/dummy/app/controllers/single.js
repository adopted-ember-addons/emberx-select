import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Controller.extend(Folks, {
  isDisabled: false,
  isRequired: false,
  hasAutofocus: false,
  attrName: null,
  attrForm: null,
  attrSize: null,

  actions: {
    tagYouAreIt: function(value) {
      this.set('it', value);
    }
  }
});
