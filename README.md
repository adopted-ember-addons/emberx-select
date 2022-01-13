# emberx-select
[![npm version](https://badge.fury.io/js/emberx-select.svg)](http://badge.fury.io/js/emberx-select)
[![Ember Observer Score](http://emberobserver.com/badges/emberx-select.svg)](http://emberobserver.com/addons/emberx-select)
[![CircleCI](https://circleci.com/gh/thefrontside/emberx-select/tree/master.svg?style=svg)](https://circleci.com/gh/thefrontside/emberx-select/tree/master)

A select component based on the native html select.

We've tried other select components, and were missing the reliability,
maintainability, and accessbility of the native html `<select>`.
`<XSelect>` is a drop-in component to let you use any
object for your selectable options. You can use it out of the box, or
as a building block of something more ambitious.

The goal of `<XSelect>` is to let you see how it works and style it
right in your template, rather than passing in a ball of configuration
or wrapping a hard-coded, inaccessible jQuery plugin.

## Compatibility

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

## Installation

```
ember install emberx-select
```

## Usage

By allowing arbitrary html to appear in the template of the select
element, you can use it just like you would normally. This means
things like having `<optgroup>` tags inside your select, or even plain
old `<option>` elements to represent things like empty values.

`<XSelect>` thinly wraps a native `<select>` element so that it can be object
and binding aware. It is used in conjuction with the `x-option`
component to construct select boxes. E.g.

**Ember >= 3.4:**
```handlebars
<XSelect @value={{bob}} @onChange={{action "selectPerson"}} as |xs|>
  <xs.option @value={{fred}}>Fred Flintstone</xs.option>
  <xs.option @value={{bob}}>Bob Newhart</xs.option>
</XSelect>
```

**Ember < 3.4:**
```handlebars
{{#x-select value=bob on-change=(action "selectPerson") as |xs|}}
  {{#xs.option value=fred}}Fred Flintstone{{/xs.option}}
  {{#xs.option value=bob}}Bob Newhart{{/xs.option}}
{{/x-select}}
```

The options are always up to date, so that when the object bound to
`value` changes, the corresponding option becomes selected.

Whenever the select tag receives a change event, it will fire
`onChange` action. This is the default action that is fired but not
the only event that's available.


### Contextual Components

As of version 3.0.0, `emberx-select` will only support contextual
components. This means you will have to use Ember 2.3 or higher. Using
contextual components allows `emberx-select` to skip some
potentially expensive DOM traversals. Now the options can register
through data rather than through the DOM.

```handlebars
<XSelect @value={{model.status}} as |xs|>
  <xs.option @value=1>Active</xs.option>
  <xs.option @value=2>Inactive</xs.option>
</XSelect>
```

### Multiselect

`<XSelect>` supports the `multiple` option. This means you can pass an
array as its value, and it will set its selections directly on that
array.

```handlebars
<XSelect @value=selections @multiple=true @onChange={{action "selectionsChanged"}} as |xs|>
 <xs.option @value={{fred}}>Fred Flintstone</xs.option>
 <xs.option @value={{bob}}>Bob Newhart</xs.option>
 <xs.option @value={{andrew}}>Andrew WK</xs.option>
</XSelect>
```

The selections array will be initialized to an empty array if not present.

## Actions and Action Arguments

All of `<XSelect>`s actions are closure actions. This means you must use
the `action` helper (i.e. `@onClick={{action "onClick"}}`). The function
that is dispatched by `<XSelect>` whenever the event fires has a function
signature of:

```js
/**
* @param {Object} value - the value selected by the user.
* @param {Object} event - the DOM event of the action
*/
function (value, event) {
  // action body...
}
```

Most of the time all you need is the value that has been selected, but
sometimes your action requires more context than just that. In those
cases, you can pass any arguments you need from the template. For
example:

```handlebars
<XSelect @onClick={{action "didMakeSelection" isXSelectRequired}} @required={{isXSelectRequired}} as |xs|>
  <option>Nothing</option>
  <xs.option @value={{something}}>Something</xs.option>
</XSelect>
```

then, inside your action handler:

```js
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    didMakeSelection(value, event, isXSelectRequired) {
      if (!value & isXSelectRequired) {
        this.set('error', 'You must fill out this field');
      } else {
        this.set('selection', value);
      }
    }
  }
});
```

`<XSelect>` provides other actions that fire on different event
types. These actions follow the HTML input event naming convention.

**onBlur**

`onBlur` fires anytime the `blur` event is triggered on the `<XSelect>`
component. When the action fires it sends two arguments: the value,
the DOM event.

**onFocusOut**

`onFocusOut` fires anytime the `focusOut` event is triggered on the `<XSelect>`
component. When the action fires it sends two arguments: the value,
the DOM event.

**onClick**

`onClick` fires when `<XSelect>` is clicked. When the action fires it
sends two arguments: the value, the DOM event.

**onDisable** (x-option)

`onDisable` fires when x-option detects a change to its `disabled`
attribute. When the action fires it sends two arguments: the value
and if it is disabled (boolean).

### Test Helper

`<XSelect>` 4.0 ships with an entirely new test helper that goes
beyond just allowing you to select an option. It allows you to
interact with your `<select>` element in all different ways. For
example, if you need to assert your first option is `disabled`
or not:

```javascript
expect(xselect.options(0).isDisabled).to.equal(true);
```

Under the hood this new test helper is using a [BigTest
Interactor](https://bigtestjs.io/guides/interactors/introduction/). Interactors
allow you to think about how you're going to _interact_ with the DOM
and abstract that into composable & immutable containers. Interactors
are similar to page objects, but for components.

#### Using the test helper

Import the select interactor:

``` javascript
// you can name the import whatever you want
import XSelectInteractor from 'emberx-select/test-support/interactor';
```

At the top of your test file you need to initialize the
interactor. This should go at the top most part of your test so it's
available to all tests in the file. Here's an example in Qunit:


``` javascript
module("Acceptance | Your Test", function(hooks) {
  let xselect = new XSelectInteractor('.selector-for-select');
  setupApplicationTest(hooks);
  // ...
});
```

Once you have initialized the interactor, you're ready to start
selecting!

``` javascript
module("Acceptance | Your Test", function(hooks) {
  let xselect = new XSelectInteractor('.selector-for-select');
  // ...

  test('Selecting an option', async (assert) => {
    await xselect
      .select('Fred Flintstone')
      .when(() => assert.equal(xselect.options(0).isSelected, true));

    // for a multiselect pass an array
    // await xselect
    //   .select(['Fred Flintstone', 'Bob Newhart'])
    //   .when(() => assert.equal(xselect.options(0).isSelected, true));;
  });
});
```

You can do more than just select options with this helper.

``` javascript
module('Acceptance | Your Test', function(hooks) {
  let xselect = new XSelectInteractor('.selector-for-select');
  // ...

  test('Selecting an option', async (assert) => {
    await xselect.select('Fred Flintstone')
      // assert the change is has happened. It's important to make the
      // assertion inside of `when`, so tests are not flakey.
      .when(() => assert.equal(xselect.options(0).isSelected, true));
  });
});
```

In this example we're using `@bigtest/convergence#when` to
assert. The TL;DR of convergence is it basically _converges_ on the
state of the DOM. It checks every 10ms until the assertion is
truthy. Once it's truthy the test passes. [You can read more about
convergences here](https://github.com/bigtestjs/convergence#why-convergence)

You don't need to include `@bigtest/convergence` in your project, it's
already a dependency of `@bigtest/interactor` and interactor provides
all of the convergence methods to you (like `when` and `do`).

This is the full interactor which has all of the attributes or
interactions for an `HTMLSelectElement`.

``` javascript
const xSelectInteractor = interactor({
  hasFocus: is(':focus'),
  name: attribute('name'),
  form: attribute('form'),
  title: attribute('title'),
  size: attribute('size'),
  tabindex: attribute('tabindex'),
  isDisabled: property('disabled'),
  isRequired: property('required'),
  isAutofocus: property('autofocus'),

  options: collection('option', {
    name: attribute('name'),
    value: property('value'),
    title: attribute('title'),
    isSelected: property('selected'),
    isDisabled: property('disabled'),
    hasSelectedClass: hasClass('is-selected')
  })
});
```

Example usage might be:

``` html
<select name="World" class="x-select">
  <option value="hello world">Hello world!</option>
</select>
```

``` javascript
let xselect = new XSelectInteractor('.x-select');

xselect.options(0).value; //=> "hello world"
xselect.options(0).text; //=> "Hello World!"
xselect.name; //=> "World"
xselect.form; //=> null
xselect.hasFocus; //=> false
xselect.tabIndex; //=> 0
```

If you want to see this test helper used in many different ways look
no further than [this addons test suite!](https://github.com/thefrontside/emberx-select/tree/master/tests)

#### Extending the XSelect interactor

If you want to add custom interactions to your `<XSelect>` interactor,
you can do so by importing it into the custom interactor you want to
create, and extend it:

``` javascript
import XSelectInteractor from 'emberx-select/test-support/interactor';
import { clickable } from '@bigtest/interactor';

@XSelectInteractor.extend
class NewInteractor {
  submitForm = clickable('[data-test-form-submit]');

  fillAndSubmit(value) {
    return this.select(value).submitForm();
  }
}
```

## EmberX

emberx-select is part of the "missing components of ember" collectively
known as emberx:

* [emberx-select](https://github.com/thefrontside/emberx-select)
* [emberx-slider](https://github.com/thefrontside/emberx-slider)
* [emberx-file-input](https://github.com/thefrontside/emberx-file-input)

## Other Resources

* [EmberScreencasts video on creating select boxes with vanilla Ember and emberx-select](https://www.emberscreencasts.com/posts/54-select-boxes-in-ember-20)

## Running Tests

* `ember test`
* `ember test --server`

## Release Process

Every commit to master results in a build and push to the demo
application at http://emberx-select.netlify.com

Npm releases use semver and happen at the project owner's discretion.


## Code of Conduct

Please note that this project is released with a Contributor Code of
Conduct. By participating in this project you agree to abide by its
terms, which can be found in the `CODE_OF_CONDUCT.md` file in this
repository.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
