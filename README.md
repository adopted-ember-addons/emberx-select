# emberx-select

[![Build Status](https://travis-ci.org/thefrontside/emberx-select.svg)](https://travis-ci.org/thefrontside/emberx-select)

A Select component based on the native html select.

Why a select component? Because `Ember.Select` is hard to use, and
really, all you want to do is just use a `<select>` tag dammit. The
only difference is that you want value of the options to be any object
and not just a string.

By allowing arbitrary html to appear in the template of the select
element, you can use it just like you would normally. This means
things like having `<optgroup>` tags inside your select, or even plain
old `<option>` elements to represent things like empty values.

XSelect thinly wraps a native <select> element so that it can be object
and binding aware. It is used in conjuction with the `x-option`
component to construct select boxes. E.g.

```handlebars
{{#x-select value=bob action="selectPerson"}}
  {{x-option value=fred}}Fred Flintstone{{/x-option}}
  {{x-option value=bob}}Bob Newhart{{/x-option}}
{{/x-select}}
```
the options are always up to date, so that when the object bound to
`value` changes, the corresponding option becomes selected.

Whenever the select tag receives a change event, it will fire
`action`


## EmberX

emberx-select is part of the "missing components of ember" collectively
known as emberx. See also:

* [emberx-slider](https://github.com/thefrontside/emberx-slider)

## Installation

ember install:addon emberx-select

## Running Tests

* `ember test`
* `ember test --server`
