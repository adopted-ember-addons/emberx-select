import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    focusOut(component, value, event) {
      this.set('eventType', event.type);
    }
  }
});
