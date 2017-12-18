import Route from '@ember/routing/route';
import Folks from 'dummy/mixins/folks';

export default Route.extend(Folks, {
  model: function() {
    return this.get('bastion');
  },

  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    controller.set('it', model);
  }
});
