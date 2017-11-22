import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    rollback() {
      this.get('model').rollbackAttributes();
    }
  }
});
