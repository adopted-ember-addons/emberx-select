# emberx-select

[![npm version](https://badge.fury.io/js/emberx-select.svg)](http://badge.fury.io/js/emberx-select)
[![Ember Observer Score](http://emberobserver.com/badges/emberx-select.svg)](http://emberobserver.com/addons/emberx-select)
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
  {{#x-option value=fred}}Fred Flintstone{{/x-option}}
  {{#x-option value=bob}}Bob Newhart{{/x-option}}
{{/x-select}}
```
the options are always up to date, so that when the object bound to
`value` changes, the corresponding option becomes selected.

Whenever the select tag receives a change event, it will fire
`action`

### Multiselect

As of version 1.1.0, `emberx-select` supports the `multiple`
option. This means you can pass an array as its value, and it will set
its selections directly on that array.

```hbs
{{#x-select value=selections multiple=true action="selectionsChanged"}}
 {{#x-option value=fred}}Fred Flintstone{{/x-option}}
 {{#x-option value=bob}}Bob Newhart{{/x-option}}
 {{#x-option value=andrew}}Andrew WK{{/x-option}}
{{/x-select}}

```

The selections array will be initialized to an empty array if not present.

> Heads Up! This will mutate the contents of your value array as the
> user changes their selections. This can lead to strange behavior and
> inconsistencies if you are using computed using arrays and/or
> ember-data `hasMany` relationships. Just remember, you can't go
> wrong if you use just a simple array.


## EmberX

emberx-select is part of the "missing components of ember" collectively
known as emberx. See also:

* [emberx-slider](https://github.com/thefrontside/emberx-slider)

## Installation

ember install:addon emberx-select

## Running Tests

* `ember test`
* `ember test --server`
