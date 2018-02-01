# emberx-select
[![Ember Badge](https://embadge.io/b/7.svg)](https://embadge.io/badges/7)
[![npm version](https://badge.fury.io/js/emberx-select.svg)](http://badge.fury.io/js/emberx-select)
[![Ember Observer Score](http://emberobserver.com/badges/emberx-select.svg)](http://emberobserver.com/addons/emberx-select)
[![CircleCI](https://circleci.com/gh/thefrontside/emberx-select/tree/master.svg?style=svg)](https://circleci.com/gh/thefrontside/emberx-select/tree/master)

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
{{#x-select value=bob action=(action "selectPerson") as |xs|}}
  {{#xs.option value=fred}}Fred Flintstone{{/xs.option}}
  {{#xs.option value=bob}}Bob Newhart{{/xs.option}}
{{/x-select}}
```

the options are always up to date, so that when the object bound to
`value` changes, the corresponding option becomes selected.

Whenever the select tag receives a change event, it will fire
`action`.


### Contextual Components

As of version 3.0.0, `emberx-select` will only support contextual
components. This means you will have to use Ember 2.3 or higher. Using
contextual components allows `emberx-select` to skip some
potentially expensive DOM traversals. Now the options can register
through data rather than through the DOM.

```handlebars
{{#x-select value=model.status as |xs|}}
  {{#xs.option value=1}}Active{{/xs.option}}
  {{#xs.option value=2}}Inactive{{/xs.option}}
{{/x-select}}
```

### Multiselect

As of version 1.1.0, `emberx-select` supports the `multiple`
option. This means you can pass an array as its value, and it will set
its selections directly on that array.

```handlebars
{{#x-select value=selections multiple=true action="selectionsChanged" as |xs|}}
 {{#xs.option value=fred}}Fred Flintstone{{/xs.option}}
 {{#xs.option value=bob}}Bob Newhart{{/xs.option}}
 {{#xs.option value=andrew}}Andrew WK{{/xs.option}}
{{/x-select}}
```

The selections array will be initialized to an empty array if not present.

## Actions and Action Arguments

All of x-selects actions are closure actions. This means you must use
the `action` helper (i.e. `on-click=(action "onClick")`). The function
that is dispatched by x-select whenever the event fires has a function
signature of:

```js
/**
* @param {Object} value - the value selected by the user.
* @param {Object} event - the jQuery event of the action
*/
function (value, event) {
  // action body...
}
```

Most of the time all you need is the value that has been selected, but
sometimes your action requires more context than just that. In those
cases, you can pass any arguments you need from the template. For example:

```handlebars
{{#x-select on-click=(action "didMakeSelection" isXSelectRequired) required=isXSelectRequired as |xs|}}
  <option>Nothing</option>
  {{#xs.option value=something}}Something{{/xs.option}}
{{/x-select}}
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

x-select provides other actions that fire on different event
types. These actions follow the HTML input event naming convention.

**on-blur**

`on-blur` fires anytime the `blur` event is triggered on the x-select
component. When the action fires it sends two arguments: the value,
the jQuery event.

**on-focus-out**

`on-focus-out` fires anytime the `focusOut` event is triggered on the x-select
component. When the action fires it sends two arguments: the value,
the jQuery event.

**on-click**

`on-click` fires when x-select is clicked. When the action fires it
sends two arguments: the value, the jQuery event.

**on-disable** (x-option)

`on-disable` fires when x-option detects a change to its `disabled`
attribute. When the action fires it sends two arguments: the value
and if it is disabled (boolean).

### Test Helper

Since `x-select` uses internal identifiers as the `value` attribute, it
doesn't integrate with the `fillIn` test helper. But don't fret, we've built a
test helper for you.

#### Using the test helper

To use the select helper in your tests you have to import the select function:

``` javascript
  import { select } from "yourappname/tests/helpers/x-select";
```

We support both multiselects and regular selects. To use, you
need to specify the class on the select (or a jquery object) as the
first argument and the rest of the arguments are the options you'd
like to select. For example:

```js
//... Single select
  select(".my-drop-down", "My Option");
//...
```

Multiselect
```javascript
//... Multiselect
  select(Ember.$(".my-drop-down"), "My Option", "My Option Two", "My Option Three");
//...
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
