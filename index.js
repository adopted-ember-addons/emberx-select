/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberx-select',

  hasContextualComponents: function () {
    var VersionChecker = require('ember-cli-version-checker');

    var checker = new VersionChecker(this);
    var dep = checker.for('ember-source', 'npm');

    if (!dep.version) {
      dep = checker.for('ember', 'bower');
    }

    var isBetaOrCanary = ['beta', 'canary'].filter(function(version) {
      return dep.version.indexOf(version) >= 0;
    });

    return !!(dep.satisfies('>= 2.3.0 < 3.0.0') || isBetaOrCanary.length > 0);
  },

  treeForAddonTemplates: function treeForAddonTemplates(tree) {
    var path = require('path');
    var baseTemplatesPath = path.join(this.root, 'addon/templates');

    if (this.hasContextualComponents()) {
      return this.treeGenerator(path.join(baseTemplatesPath, 'current'));
    } else {
      return this.treeGenerator(path.join(baseTemplatesPath, 'less-than-2.3'));
    }
  }
};
