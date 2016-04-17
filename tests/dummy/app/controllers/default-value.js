import Ember from 'ember';
import Cars from 'dummy/mixins/cars';

export default Ember.Controller.extend(Cars, {
  autopopulatedField: null,

  make: null,

  carModel: null,

  trim: null,

  selectedQuantity: 0,

  makeIsSet: false,

  modelIsSet: false,

  trimIsSet: false,

  quantities: [5, 4, 3, 2, 1, 0],

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
    },
    updateSelectedQuantity: function(object) {
      if (object != null) {
        console.log('You selected Quantity:', object);
      }
    }
  }
});
