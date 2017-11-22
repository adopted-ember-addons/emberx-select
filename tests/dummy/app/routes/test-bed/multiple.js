import { A } from '@ember/array';
import Route from '@ember/routing/route';
import Folks from 'dummy/mixins/folks';

export default Route.extend(Folks, {
  model: function() {
    return A([this.get('bastion'), this.get('stanley')]);
  },
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    controller.set('selections', model);
  }
});
