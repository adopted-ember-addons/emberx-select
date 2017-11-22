import Mixin from '@ember/object/mixin';

export const sport = {name: 'Sport'};

export const sedan = {name: 'Sedan'};

export const hatchback = {name: 'Hatchback'};

export const camry = {name: 'Camry', trimOptions: [sport, sedan, hatchback]};

export const corolla = {name: 'Corolla', trimOptions: [sedan]};

export const tacoma = {name: 'Tacoma', trimOptions: []};

export const fit = {name: 'Fit', trimOptions: [sport, hatchback]};

export const civic = {name: 'Civic', trimOptions: [sedan, sport]};

export const accord = {name: 'Accord', trimOptions: []};

export const focus = {name: 'Focus', trimOptions: [sport, hatchback]};

export const fiesta = {name: 'Fiesta', trimOptions: [hatchback, sedan]};

export const mustang = {name: 'Mustang', trimOptions: [sport]};

export const toyotaModels = [camry, corolla, tacoma];

export const hondaModels = [fit, civic, accord];

export const fordModels = [focus, fiesta, mustang];

export const toyota = {name: 'Toyota', models: toyotaModels};

export const honda = {name: 'Honda', models: hondaModels};

export const ford = {name: 'Ford', models: fordModels};

export default Mixin.create({
  makes: [toyota, honda, ford],

  toyota: toyota,

  honda: honda,

  ford: ford
});
