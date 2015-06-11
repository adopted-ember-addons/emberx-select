var EOL = require('os').EOL;

module.exports = {
  description: '',

  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    return this.insertIntoFile('tests/.jshintrc', '    "select",', { after: '"click",' + EOL});
  }
};
