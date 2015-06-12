var EOL = require('os').EOL;

module.exports = {
  description: '',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.insertIntoFile('tests/.jshintrc', '    "select",', { after: '"click",' + EOL});
  }
};
