import Ember from 'ember';
import Folks from 'dummy/mixins/folks';

export default Ember.Route.extend(Folks, {
  model() {
    return Ember.A([
      this.get('bastion'),
      this.get('stanley')
    ]);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('it', model);
    controller.set('folks', Ember.A([this.get('charles'), this.get('bastion'), this.get('stanley') ]));
  }
});
