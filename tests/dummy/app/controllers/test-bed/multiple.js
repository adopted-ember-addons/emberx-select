import { reads } from '@ember/object/computed';
import Controller from '@ember/controller';
import Folks from 'dummy/mixins/folks';

export default Controller.extend(Folks, {
  currentSelections: reads('selections'),
  actions: {
    selectionsChanged: function(selections) {
      this.set('currentSelections', selections);
    }
  }
});
