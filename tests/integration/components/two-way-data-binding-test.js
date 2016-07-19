/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'two-way-data-binding',
  'Integration: XSelectTwoWayDataBinding',
  {
    integration: true
  },
  function() {
    describe("changing the selection with two way data binding disabled", function() {
      beforeEach(function() {
        this.set('make', 'ford');
        this.set('capture', (value)=> this.value = value);
        this.set('onClick', (x, value)=> this.click = value);
        this.set('onFocusOut', (x, value)=> this.focusOut = value);
        this.set('onBlur', (x, value)=> this.blur = value);

        this.render(hbs`
          {{#x-select value=make one-way=true action=capture onclick=onClick onfocusout=onFocusOut onblur=onBlur}}
            {{#x-option value="ford"}}Ford{{/x-option}}
            {{#x-option value="chevy"}}Chevy{{/x-option}}
            {{#x-option value="dodge" class="spec-dodge-option"}}Dodge{{/x-option}}
          {{/x-select}}
        `);
      });

      beforeEach(function() {
        this.$('.spec-dodge-option').prop('selected', true).trigger('change');
      });

      it("doesn't mutate the value", function() {
        expect(this.get('make')).to.equal("ford");
      });
      it("passes the new value to the action closure ", function() {
        expect(this.value).to.equal('dodge');
      });

      describe("upon subsequent triggering of a DOM event", function() {
        beforeEach(function() {
          this.$('.x-select')
            .trigger('click')
            .trigger('focusout')
            .trigger('blur');
        });
        it("fires bound handlers with the new value", function() {
          expect(this.click).to.equal('dodge');
          expect(this.focusOut).to.equal('dodge');
          expect(this.blur).to.equal('dodge');
        });
      });

    });
  }
);
