import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Controller.extend(Folks, {
  actions: {
    selectionsChanged: function(selections) {
      this.set('currentSelections', selections);
    }
  }
});
