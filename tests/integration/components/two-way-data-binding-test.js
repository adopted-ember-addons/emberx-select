/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import { select } from 'dummy/tests/helpers/register-select-helper';

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
          {{#x-select value=make one-way=true action=capture onclick=onClick onfocusout=onFocusOut onblur=onBlur as |xs|}}
            {{#xs.option value="ford"}}Ford{{/xs.option}}
            {{#xs.option value="chevy"}}Chevy{{/xs.option}}
            {{#xs.option value="dodge" class="spec-dodge-option"}}Dodge{{/xs.option}}
          {{/x-select}}
        `);
      });

      beforeEach(function() {
        select('.x-select', 'Dodge');
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

    describe("default value of null with two way data binding disabled", function() {
      beforeEach(function() {
        this.set('make', null);
        this.set('selectAction', (value) => {
          this.set("make", value);
          this.set("wasCalled", true);
        });

        this.render(hbs`
          {{#x-select value=make one-way=true action=selectAction as |xs|}}
            {{#xs.option value="fordValue" class="spec-ford-option"}}Ford{{/xs.option}}
            {{#xs.option value="chevyValue"}}Chevy{{/xs.option}}
            {{#xs.option value="dodgeValue" class="spec-dodge-option"}}Dodge{{/xs.option}}
          {{/x-select}}
        `);
      });

      it("displays the first item in the list", function() {
        expect(this.$('select option:selected').text()).to.equal("Ford");
      });

      it("sets the default value to the first element", function() {
        expect(this.get('make')).to.equal("fordValue");
      });

      it("invokes the select action on init", function() {
        expect(this.get("wasCalled")).to.equal(true);
      });

    });
  }
);
