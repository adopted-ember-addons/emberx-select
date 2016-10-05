import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('introduction');
  this.route('actions');
  this.route('testing');
  this.route('examples');

  this.route('test-bed', function() {
    this.route('single');
    this.route('multiple');
    this.route('zany-embedded-html');
    this.route('default-value');
    this.route('events', { path: '/e' }, function() {
      this.route('blur');
      this.route('click');
      this.route('focus-out');
    });
    this.route('ember-data');
  });
});

export default Router;
