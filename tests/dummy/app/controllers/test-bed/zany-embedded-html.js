import { A } from '@ember/array';
import { schedule } from '@ember/runloop';
import { on } from '@ember/object/evented';
import Controller from '@ember/controller';

/**
 * This controller sets up things a bit weirdly, because we're trying
 * to trigger this bug in ember:
 * https://github.com/emberjs/ember.js/pull/11266/files
 *
 * After initialization, it automatically triggers a re-render by
 * updating the groups to be rendered. This will fail on ember
 * 1.13.{0,3}.
 *
 * It was initially reported as:
 *
 * https://github.com/thefrontside/emberx-select/issues/44
 */

export default Controller.extend({
  groupsOfZanyThings: A([]),


  schedulePopulate: on('init', function() {
    schedule('afterRender', this, 'populate');
  }),

  populate: function() {
    this.set('groupsOfZanyThings', A([
      {
        label: 'Sandwiches',
        things: [
          { description: 'Cucumber and Peanutbutter' },
          { description: 'Wasabe Muffuletta'},
          { description: 'Ice Cream Burger' }
        ]
      }, {
        label: 'Haircuts',
        things: [
          { description: 'One Direction' },
          { description: 'Inverse Beehive' },
          { description: '"The Cellist"' }
        ]
      }, {
        label: 'Cars',
        things: [
          { description: 'The Smart Car' },
          { description: 'The Dumb Car' },
          { description: 'Delorean on Fire' }
        ]
      }
    ]));
  }
});
