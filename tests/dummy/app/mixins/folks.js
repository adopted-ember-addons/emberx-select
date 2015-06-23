import Ember from 'ember';

export var bastion = {name: 'Bastion', cowboy: 'nope'};

export var charles = {name: 'Charles', cowboy: 'yep'};

export var stanley = {name: 'Stanley', cowboy: 'maybe'};

export default Ember.Mixin.create({
  bastion: bastion,

  charles: charles,

  stanley: stanley
});
