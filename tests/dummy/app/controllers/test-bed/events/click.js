import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onClick(value, event) {
      this.set('eventType', event.type);
    }
  }
});
