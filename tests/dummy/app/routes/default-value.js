import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Route.extend(Folks, {
  model(){},
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    controller.set('it', model);
  }
});
