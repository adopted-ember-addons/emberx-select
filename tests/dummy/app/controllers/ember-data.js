import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    rollback() {
      this.get('model').rollbackAttributes();
    }
  }
});
