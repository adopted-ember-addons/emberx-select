import Ember from 'ember';
import Cars from 'dummy/mixins/cars';

export default Ember.Route.extend(Cars, {
  model: function() {
    return this.get('makes')[2];
  }
});
