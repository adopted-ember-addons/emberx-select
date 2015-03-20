import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.ObjectController.extend(Folks, {
  isDisabled: false,
  actions: {
    tagYouAreIt: function(object) {
      this.tagged = object;
    }
  }
});
