import Route from '@ember/routing/route';
import Cars from 'dummy/mixins/cars';

export default Route.extend(Cars, {
  model: function() {
    return this.get('makes')[2];
  }
});
