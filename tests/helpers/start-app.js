import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import './get-component-by-id';

export default function startApp(attrs) {
  let application;

  // Warning for the Ember-CLI upgrader:
  // Don't update this line to Ember.assign because we must test in
  // versions of ember that don't have Ember.assign.
  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
