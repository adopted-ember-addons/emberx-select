import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onBlur(component, value, event) {
      this.set('eventType', event.type);
    }
  }
});
