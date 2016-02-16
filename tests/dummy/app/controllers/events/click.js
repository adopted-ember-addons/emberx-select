import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onClick(component, value, event) {
      this.set('eventType', event.type);
    }
  }
});
