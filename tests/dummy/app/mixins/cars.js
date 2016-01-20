import Ember from 'ember';

export var sport = {name: 'Sport'};

export var sedan = {name: 'Sedan'};

export var hatchback = {name: 'Hatchback'};

export var camry = {name: 'Camry', trimOptions: [sport, sedan, hatchback]};

export var corolla = {name: 'Corolla', trimOptions: [sedan]};

export var tacoma = {name: 'Tacoma', trimOptions: []};

export var fit = {name: 'Fit', trimOptions: [sport, hatchback]};

export var civic = {name: 'Civic', trimOptions: [sedan, sport]};

export var accord = {name: 'Accord', trimOptions: []};

export var focus = {name: 'Focus', trimOptions: [sport, hatchback]};

export var fiesta = {name: 'Fiesta', trimOptions: [hatchback, sedan]};

export var mustang = {name: 'Mustang', trimOptions: [sport]};

export var toyotaModels = [camry, corolla, tacoma];

export var hondaModels = [fit, civic, accord];

export var fordModels = [focus, fiesta, mustang];

export var toyota = {name: 'Toyota', models: toyotaModels};

export var honda = {name: 'Honda', models: hondaModels};

export var ford = {name: 'Ford', models: fordModels};

export default Ember.Mixin.create({
  makes: [toyota, honda, ford],

  toyota: toyota,

  honda: honda,

  ford: ford
});
