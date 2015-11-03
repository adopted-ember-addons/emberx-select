/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';


describeComponent(
  'x-option',
  'XOptionComponent',
  {
    needs: []
  },
  function() {
    it('does not blow up when destroyed before rendered', function() {
      var component = this.subject();
      expect(function() {
        component.willDestroyElement();
      }).not.to.throw();
    });
  }
);
