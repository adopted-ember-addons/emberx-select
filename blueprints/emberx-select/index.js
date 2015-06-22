var EOL = require('os').EOL;

module.exports = {
  description: '',

  normalizeEntityName: function() {},

  afterInstall: function() {
    // Import statement
    var firstFile = 'tests/test-helper.js';
    var firstText = "import registerSelectHelper from './helpers/register-select-helper';";
    var afterFirstText = "import resolver from './helpers/resolver';" + EOL;

    // Execution of registration function
    var secondFile = 'tests/test-helper.js';
    var secondText = "registerSelectHelper();";
    var afterSecondText = firstText + EOL;

    return this.insertIntoFile(firstFile, firstText, { after: afterFirstText}).then(function() {
      return this.insertIntoFile(secondFile, secondText, { after: afterSecondText});
    }.bind(this)).then( function() {
      return this.insertIntoFile('tests/.jshintrc', '    "select",', { after: '"click",' + EOL});
    }.bind(this));
  }
};
