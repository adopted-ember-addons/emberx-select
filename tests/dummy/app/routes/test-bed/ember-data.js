import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('person');
  },
  actions: {
    willTransition() {
      this._super.apply(this, arguments);

      this.controller.send('rollback');
    }
  }
});
