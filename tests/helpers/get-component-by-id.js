import Ember from "ember";

function getComponentById(app, id) {
  return app.__container__.lookup('-view-registry:main')[id];
}

const customHelpers = (function() {
  Ember.Test.registerHelper('getComponentById', getComponentById);
})();

export default customHelpers;
