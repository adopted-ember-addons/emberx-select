import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onBlur(value, event) {
      this.set('eventType', event.type);
    }
  }
});
