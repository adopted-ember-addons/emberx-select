import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Route.extend(Folks, {
  model: function() {
    return Ember.A([
      this.get('bastion'),
      this.get('stanley')
    ]);
  },
  setupController: function(controller, model) {
    this._super(...arguments);
    controller.set('selections', model);
  }
});
