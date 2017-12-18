import Mixin from '@ember/object/mixin';

export const bastion = {name: 'Bastion', cowboy: 'nope'};

export const charles = {name: 'Charles', cowboy: 'yep'};

export const stanley = {name: 'Stanley', cowboy: 'maybe'};

export default Mixin.create({
  bastion: bastion,

  charles: charles,

  stanley: stanley
});
