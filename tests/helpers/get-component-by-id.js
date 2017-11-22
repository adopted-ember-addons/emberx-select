import { registerHelper } from '@ember/test';

function getComponentById(app, id) {
  return app.__container__.lookup('-view-registry:main')[id];
}

const customHelpers = (function() {
  registerHelper('getComponentById', getComponentById);
})();

export default customHelpers;
