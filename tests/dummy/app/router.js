import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('single');
  this.route('multiple');
  this.route('blockless-single');
  this.route('blockless-single-option-value');
  this.route('blockless-multiple');
  this.route('zany-embedded-html');
});

export default Router;
