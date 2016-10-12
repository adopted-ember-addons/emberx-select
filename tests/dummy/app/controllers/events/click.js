import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onClick(value, event) {
      this.set('eventType', event.type);
    }
  }
});
