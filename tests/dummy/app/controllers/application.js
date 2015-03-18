import Ember from 'ember';

var bastion = {name: 'Bastion'};

var charles = {name: 'Charles'};

var stanley = {name: 'Stanley'};

export default Ember.ObjectController.extend({
  bastion: bastion,
  charles: charles,
  stanley: stanley,
  it: bastion,
  it2: [bastion],
  isDisabled: false,
  model: {},

  actions: {
    tagYouAreIt: function(object) {
      this.set('tagged', object);
    }
  }
});
