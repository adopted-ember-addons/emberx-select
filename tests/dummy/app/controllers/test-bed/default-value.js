import Controller from '@ember/controller';
import { A } from '@ember/array';
import Cars from 'dummy/mixins/cars';

export default Controller.extend(Cars, {
  autopopulatedField: null,

  make: null,

  carModel: null,

  trim: undefined,

  selectedQuantity: 0,

  makeIsSet: false,

  modelIsSet: false,

  trimIsSet: false,

  quantities: A([5, 4, 3, 2, 1, 0]),

  actions: {
    setMake: function(object) {
      if(object) {
        this.set('carModel', object.models[0]);
        this.set('make', object);
      }
    },
    setCarModel: function(object) {
      if(object) {
        this.set('carModel', object);
      }
    },
    setTrim: function(object) {
      if(object) {
        this.set('trim', object);
      }
    },
    updateField: function() {},
    updateSelectedQuantity: function() {}
  }
});
