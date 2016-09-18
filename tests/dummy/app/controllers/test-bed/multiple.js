import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Controller.extend(Folks, {
  currentSelections: Ember.computed.reads('selections'),
  actions: {
    selectionsChanged: function(selections) {
      this.set('currentSelections', selections);
    }
  }
});
