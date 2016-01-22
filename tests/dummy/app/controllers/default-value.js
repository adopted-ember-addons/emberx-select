import Ember from 'ember';
import Cars from 'dummy/mixins/cars';

export default Ember.Controller.extend(Cars, {
  autopopulatedField: null,

  make: null,

  carModel: null,

  trim: null,

  makeIsSet: false,

  modelIsSet: false,

  trimIsSet: false,

  actions: {
    setMake: function(object) {
      if (object) {
        console.log('You selected Make:', object.name);
      }
    },
    setCarModel: function(object) {
      if (object) {
        console.log('You selected Model:', object.name);
      }
    },
    setTrim: function(object) {
      if (object) {
        console.log('You selected Trim:', object.name);
      }
    },
    updateField: function(object) {
      if (object) {
        console.log('You selected Make:', object.name);
      }
    }
  }
});
