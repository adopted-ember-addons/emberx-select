# emberx-select

[![npm version](https://badge.fury.io/js/emberx-select.svg)](http://badge.fury.io/js/emberx-select)
[![Ember Observer Score](http://emberobserver.com/badges/emberx-select.svg)](http://emberobserver.com/addons/emberx-select)
[![Build Status](https://travis-ci.org/thefrontside/emberx-select.svg?branch=master)](https://travis-ci.org/thefrontside/emberx-select)

A Select component based on the native html select.

We've tried other select components, and were missing the reliability, 
maintainability, and accessbility of the native html `<select>`. 
`<x-select>` is a drop-in component to let you use any
object for your selectable options. You can use it out of the box, or
as a building block of something more ambitious.

The goal of `<x-select>` is to let you see how it works and style it
right in your template, rather than passing in a ball of configuration
or wrapping a hard-coded, inaccessible jQuery plugin.


## Installation

```
ember install emberx-select
```

By allowing arbitrary html to appear in the template of the select
element, you can use it just like you would normally. This means
things like having `<optgroup>` tags inside your select, or even plain
old `<option>` elements to represent things like empty values.

XSelect thinly wraps a native `<select>` element so that it can be object
and binding aware. It is used in conjuction with the `x-option`
component to construct select boxes. E.g.

```handlebars
{{#x-select value=bob action="selectPerson"}}
  {{#x-option value=fred}}Fred Flintstone{{/x-option}}
  {{#x-option value=bob}}Bob Newhart{{/x-option}}
{{/x-select}}
```

the options are always up to date, so that when the object bound to
`value` changes, the corresponding option becomes selected.

Whenever the select tag receives a change event, it will fire
`action`.

If you're just changing a model's property, you don't need `action`. For example,
if you have a model with a `status` field with an integer, you can do this:

```handlebars
{{#x-select value=model.status }}
  {{#x-option value=1}}Active{{/x-option}}
  {{#x-option value=2}}Inactive{{/x-option}}
{{/x-select}}
```

### Contextual Components

As of version 2.1.0, `emberx-select` takes advantage of Ember's
[contextual components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components)
feature. Using contextual components allows `emberx-select` to skip some
potentially expensive DOM traversals. This feature works with **Ember
2.3.0 and above!** If you're using such a version, we highly recommend
you use it:

```handlebars
{{#x-select value=model.status as |xs|}}
  {{#xs.option value=1}}Active{{/xs.option}}
  {{#xs.option value=2}}Inactive{{/xs.option}}
{{/x-select}}
```

If you're using a lower version of Ember, `emberx-select` will continue
to work without block params for the forseeable future.

### Multiselect

As of version 1.1.0, `emberx-select` supports the `multiple`
option. This means you can pass an array as its value, and it will set
its selections directly on that array.

```handlebars
{{#x-select value=selections multiple=true action="selectionsChanged"}}
 {{#x-option value=fred}}Fred Flintstone{{/x-option}}
 {{#x-option value=bob}}Bob Newhart{{/x-option}}
 {{#x-option value=andrew}}Andrew WK{{/x-option}}
{{/x-select}}
```

The selections array will be initialized to an empty array if not present.


## Action and Action Arguments

The action that is dispatched by x-select whenever the selected value or values
change (change event) has a function signature of:

```js
/**
* @param value {Object} the value selected by the user.
* @param component {Ember.Component} the x-select component itself
*/
function (value, component) {
  // action body...
}
```

Most of the time all you need is the value that has been selected, but
sometimes your action requires more context than just that. In those
cases, you can associate arbitrary attributes with the component
itself and use them later inside your action handler.  For example:

```handlebars
{{#x-select action="didMakeSelection" default=anything}}
  <option>Nothing</option>
  {{#x-option value=something}}Something{{/x-option}}
{{/x-select}}
```
then, inside your action handler:

```js
export default Ember.Route.extend({
  actions: {
    didMakeSelection: function(selection, component) {
      if (selection) {
        this.set('selection', selection)
      } else {
        this.set('selection', component.get('default'))
      }
    }
  }
});
```

#### Other Actions

x-select also provides other actions that fire on different event
types. These actions follow the HTML input event naming convention.

**onblur**

`onblur` fires anytime the `blur` event is triggered on the x-select
component. When the action fires it sends three arguments: the
component, the value, and the jQuery event.

**onfocusout**

`onfocusout` fires anytime the `focusOut` event is triggered on the x-select
component. When the action fires it sends three arguments: the
component, the value, and the jQuery event.

**onclick**

`onclick` fires when x-select is clicked. When the action fires it
sends three arguments: the component, the value, and the jQuery event.

### Test Helpers

Since `emberx-select` uses internal identifiers as the `value` attribute, it
doesn't integrate with the `fillIn` test helper. But don't fret, we've automatically
injected the test helper into your app.

#### Using the test helper

As of version 1.1.3 we support both multiselects and regular selects. To use, you
need to specify the class on the select as the first argument and the rest
of the arguments are the options you'd like to select. For example:

```js
//... Single select
  select('.my-drop-down', 'My Option');
//...
```

Multiselect
```js
//... Multiselect
  select('.my-drop-down', 'My Option', 'My Option Two', 'My Option Three');
//...
```

#### Why am I getting a JSHint error?

You need to run the generator: `ember g emberx-select`

#### Why am I getting a "Can't find variable: select" error?

You need to either run the generator (`ember g emberx-select`) or import the test helper into your
`test-helper.js` file:

```js
import registerSelectHelper from './helpers/register-select-helper';
registerSelectHelper();
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


## Code of Conduct
Please note that this project is released with a Contributor Code of
Conduct. By participating in this project you agree to abide by its
terms, which can be found in the `CODE_OF_CONDUCT.md` file in this
repository.
