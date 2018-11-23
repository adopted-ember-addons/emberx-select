import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import xSelectInteractor from 'emberx-select/test-support/interactor';

describe('Integration | Component | attributes', function() {
  let xselect = new xSelectInteractor('.x-select');

  setupComponentTest('attributes', {
    integration: true
  });

  describe('default attributes', function() {
    beforeEach(async function() {
      this.setProperties({
        value: 'ollie',
        handleChange(value) {
          this.set('value', value);
        }
      });

      await this.render(hbs`
        {{#x-select
          value=value
          onChange=(action handleChange) as |xs|
        }}
          {{#xs.option value="wally"}}Wally{{/xs.option}}
          {{#xs.option value="ollie"}}Olllie{{/xs.option}}
          {{#xs.option value="new"}}New Pup?{{/xs.option}}
        {{/x-select}}
      `);
    });

    it('does not render optional attributes', async () => {
      await xselect.when(() => {
        expect(xselect.name).to.equal(null);
        expect(xselect.form).to.equal(null);
        expect(xselect.title).to.equal(null);
        expect(xselect.size).to.equal(null);
        expect(xselect.isRequired).to.equal(false);
        expect(xselect.isAutofocus).to.equal(false);
        expect(xselect.tabindex).to.equal(null);
      });
    });
  });

  beforeEach(async function() {
    this.setProperties({
      value: 'ollie',
      attrName: 'person-select',
      attrForm: 'person-form',
      title: 'person title',
      attrSize: '3',
      isRequired: true,
      hasAutofocus: true,
      isDisabled: true,
      handleChange(value) {
        this.set('value', value);
      }
    });

    await this.render(hbs`
      {{#x-select
        value=value
        onChange=(action handleChange)
        disabled=isDisabled
        title=title
        required=isRequired
        autofocus=hasAutofocus
        name=attrName
        form=attrForm
        tabindex=2
        size=attrSize as |xs|
      }}
        {{#xs.option value="wally" name="Walter"}}Wally{{/xs.option}}
        {{#xs.option value="ollie" title="The Pup"}}Olllie{{/xs.option}}
        {{#xs.option value="new" disabled=true}}New Pup?{{/xs.option}}
      {{/x-select}}
    `);
  });

  it('renders the name attribute', async () => {
    await xselect.when(() => expect(xselect.name).to.equal('person-select'));
  });

  it('renders the disabled property', async () => {
    await xselect.when(() => expect(xselect.isDisabled).to.equal(true));
  });

  it('renders the form attribute', async () => {
    await xselect.when(() => expect(xselect.form).to.equal('person-form'));
  });

  it('renders the title attribute', async () => {
    await xselect.when(() => expect(xselect.title).to.equal('person title'));
  });

  it('renders the size attribute', async () => {
    await xselect.when(() => expect(xselect.size).to.equal('3'));
  });

  it('renders the required property', async () => {
    await xselect.when(() => expect(xselect.isRequired).to.equal(true));
  });

  it('renders the autofocus property', async () => {
    await xselect.when(() => expect(xselect.isAutofocus).to.equal(true));
  });

  it('renders the tabindex attribute with 2', async () => {
    await xselect.when(() => expect(xselect.tabindex).to.equal('2'));
  });

  describe('options properties & attributes', function() {
    it('renders the value attribute', async () => {
      await xselect.when(() => expect(xselect.options(0).value).to.equal('wally'));
    });

    it('renders the name attribute', async () => {
      await xselect.when(() => expect(xselect.options(0).name).to.equal('Walter'));
    });

    it('renders the disabled property', async () => {
      await xselect.when(() => expect(xselect.options(2).isDisabled).to.equal(true));
    });

    it('renders the title attribute', async () => {
      await xselect.when(() => expect(xselect.options(1).title).to.equal('The Pup'));
    });
  });
});
