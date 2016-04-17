module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1-13',
      dependencies: {
        "ember": "^1.13.4" //1.13.0-1.13.3 is broken with x-select
      },
      resolutions: {
        "ember": "^1.13.4"
      }
    },
    {
      name: 'ember-2-0',
      dependencies: {
        "ember": "~2.0.0"
      },
      resolutions: {
        "ember": "~2.0.0"
      }
    },
    {
      name: 'ember-2-1',
      dependencies: {
        "ember": "~2.1.0"
      },
      resolutions: {
        "ember": "~2.1.0"
      }
    },
    {
      // ember 2 before contextual components
      name: 'ember-2-2',
      dependencies: {
        "ember": "~2.2.0"
      },
      resolutions: {
        "ember": "~2.2.0"
      }
    },
    {
      name: 'ember-2-3',
      dependencies: {
        "ember": "~2.3.0"
      },
      resolutions: {
        "ember": "~2.3.0"
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      allowedToFail: true,
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
