import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onBlur(value, event) {
      this.set('eventType', event.type);
    }
  }
});
