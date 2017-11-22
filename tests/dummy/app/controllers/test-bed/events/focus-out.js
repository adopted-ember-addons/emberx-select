import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    focusOut(value, event) {
      this.set('eventType', event.type);
    }
  }
});
