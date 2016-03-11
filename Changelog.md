# Change Log

## [v2.1.0](https://github.com/thefrontside/emberx-select/tree/v2.1.0) (2016-03-11)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v2.0.2...v2.1.0)

**Implemented enhancements:**

- Any way to attach to blur event? [\#84](https://github.com/thefrontside/emberx-select/issues/84)
- Default value not applied [\#81](https://github.com/thefrontside/emberx-select/issues/81)
- \[feature\] add contextual components support [\#101](https://github.com/thefrontside/emberx-select/pull/101) ([fivetanley](https://github.com/fivetanley))
- Adding `on-click` and `on-blur` actions [\#92](https://github.com/thefrontside/emberx-select/pull/92) ([Robdel12](https://github.com/Robdel12))
- Update register code to set default option [\#90](https://github.com/thefrontside/emberx-select/pull/90) ([lydiaguarino](https://github.com/lydiaguarino))

**Fixed bugs:**

- Attempts to set property after model is deleted/rolled back [\#94](https://github.com/thefrontside/emberx-select/issues/94)

**Closed issues:**

- Icons not displayed \(optgroups\) [\#95](https://github.com/thefrontside/emberx-select/issues/95)
- Is it possible to set a default value? [\#78](https://github.com/thefrontside/emberx-select/issues/78)
- Issues with promise values? [\#69](https://github.com/thefrontside/emberx-select/issues/69)
- Selection not selected when component rerendered [\#54](https://github.com/thefrontside/emberx-select/issues/54)
- dynamically hide options [\#98](https://github.com/thefrontside/emberx-select/issues/98)
- Remove dead placeholder / prompt param [\#85](https://github.com/thefrontside/emberx-select/issues/85)
- update readme to remove reference to Ember.select [\#73](https://github.com/thefrontside/emberx-select/issues/73)

**Merged pull requests:**

- Update README.md [\#104](https://github.com/thefrontside/emberx-select/pull/104) ([flexyford](https://github.com/flexyford))
- Add explicit places for ember/cli versions [\#100](https://github.com/thefrontside/emberx-select/pull/100) ([Robdel12](https://github.com/Robdel12))
- Add issue template [\#96](https://github.com/thefrontside/emberx-select/pull/96) ([Robdel12](https://github.com/Robdel12))
- Remove dead properties leftover from x-select-blockless [\#86](https://github.com/thefrontside/emberx-select/pull/86) ([Robdel12](https://github.com/Robdel12))
- Add keywords to `package.json` [\#103](https://github.com/thefrontside/emberx-select/pull/103) ([Robdel12](https://github.com/Robdel12))
- Fix the README description [\#102](https://github.com/thefrontside/emberx-select/pull/102) ([Robdel12](https://github.com/Robdel12))
- Don't update value if tearing component down [\#97](https://github.com/thefrontside/emberx-select/pull/97) ([Robdel12](https://github.com/Robdel12))

## [v2.0.2](https://github.com/thefrontside/emberx-select/tree/v2.0.2) (2015-11-04)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v2.0.1...v2.0.2)

**Closed issues:**

- Changing x-select options gives `Cannot read property 'unregisterOption'` of undefined error [\#79](https://github.com/thefrontside/emberx-select/issues/79)
- x-option registers too often [\#70](https://github.com/thefrontside/emberx-select/issues/70)

**Merged pull requests:**

- Fix issue with unregisterOption \(with Test\)  [\#80](https://github.com/thefrontside/emberx-select/pull/80) ([JackCA](https://github.com/JackCA))
- add learning resource [\#77](https://github.com/thefrontside/emberx-select/pull/77) ([jeffreybiles](https://github.com/jeffreybiles))
- Fixes demo for multiple [\#76](https://github.com/thefrontside/emberx-select/pull/76) ([Robdel12](https://github.com/Robdel12))

## [v2.0.1](https://github.com/thefrontside/emberx-select/tree/v2.0.1) (2015-08-28)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v2.0.0...v2.0.1)

**Closed issues:**

- Matching selected value on related records via async [\#68](https://github.com/thefrontside/emberx-select/issues/68)

**Merged pull requests:**

- Add an example of changing a model [\#74](https://github.com/thefrontside/emberx-select/pull/74) ([steveklabnik](https://github.com/steveklabnik))
- Standardize on the emberx directory. [\#72](https://github.com/thefrontside/emberx-select/pull/72) ([cowboyd](https://github.com/cowboyd))
- Schedule x-option registration in didInsertElement\(\) hook instead of didRender\(\) [\#71](https://github.com/thefrontside/emberx-select/pull/71) ([arunasf](https://github.com/arunasf))

## [v2.0.0](https://github.com/thefrontside/emberx-select/tree/v2.0.0) (2015-08-14)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.1.4...v2.0.0)

**Implemented enhancements:**

- Update Ember CLI & Ember [\#60](https://github.com/thefrontside/emberx-select/issues/60)

**Fixed bugs:**

- x-option declared without x-select error [\#44](https://github.com/thefrontside/emberx-select/issues/44)

**Closed issues:**

- Deprecation in 1.13.8 [\#66](https://github.com/thefrontside/emberx-select/issues/66)
- Blockless and block form do not behave the same. [\#59](https://github.com/thefrontside/emberx-select/issues/59)
- emberx-select does not select initial value in component [\#56](https://github.com/thefrontside/emberx-select/issues/56)
- Disable x-select mutating "value" upon selection [\#52](https://github.com/thefrontside/emberx-select/issues/52)
- Multiple {{x-selects}} on the same template [\#48](https://github.com/thefrontside/emberx-select/issues/48)
- Depreciation - hasBlock [\#47](https://github.com/thefrontside/emberx-select/issues/47)
- Depreciation - Performance degradation [\#46](https://github.com/thefrontside/emberx-select/issues/46)
- Selection not set when using a RecordArray as `content` and a PromiseObject as `value` [\#20](https://github.com/thefrontside/emberx-select/issues/20)

**Merged pull requests:**

- Remove depercation caused changing data in didRender [\#67](https://github.com/thefrontside/emberx-select/pull/67) ([Robdel12](https://github.com/Robdel12))
- Updated the README to reflect x-select 2.0 changes [\#65](https://github.com/thefrontside/emberx-select/pull/65) ([Robdel12](https://github.com/Robdel12))
- Update Ember mocha for Ember 2.0+ compatibility [\#64](https://github.com/thefrontside/emberx-select/pull/64) ([Robdel12](https://github.com/Robdel12))
- Make array values immuatable [\#62](https://github.com/thefrontside/emberx-select/pull/62) ([Robdel12](https://github.com/Robdel12))
- Remove blockless form [\#61](https://github.com/thefrontside/emberx-select/pull/61) ([Robdel12](https://github.com/Robdel12))
- Fixed typo [\#58](https://github.com/thefrontside/emberx-select/pull/58) ([achambers](https://github.com/achambers))
- Use `didRender` in `x-option` [\#53](https://github.com/thefrontside/emberx-select/pull/53) ([seanpdoyle](https://github.com/seanpdoyle))
- Add usage section. [\#51](https://github.com/thefrontside/emberx-select/pull/51) ([knownasilya](https://github.com/knownasilya))
- Upgrade Ember CLI to 1.13.1 [\#50](https://github.com/thefrontside/emberx-select/pull/50) ([cowboyd](https://github.com/cowboyd))
- bump ember dependency for parentView bugfix. [\#49](https://github.com/thefrontside/emberx-select/pull/49) ([cowboyd](https://github.com/cowboyd))
- Ember form attribute binding \(1.13.3\) [\#42](https://github.com/thefrontside/emberx-select/pull/42) ([Robdel12](https://github.com/Robdel12))

## [v1.1.4](https://github.com/thefrontside/emberx-select/tree/v1.1.4) (2015-07-09)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.1.3...v1.1.4)

**Implemented enhancements:**

- Add demo to package.json [\#39](https://github.com/thefrontside/emberx-select/issues/39)
- test against canary [\#18](https://github.com/thefrontside/emberx-select/issues/18)

**Closed issues:**

- Deprecation warning with emberjs 1.13 [\#41](https://github.com/thefrontside/emberx-select/issues/41)
- action not fired when expected [\#36](https://github.com/thefrontside/emberx-select/issues/36)
- Obligatory "doesn't work on Canary issue" [\#22](https://github.com/thefrontside/emberx-select/issues/22)

**Merged pull requests:**

- Update Ember-CLI / Remove prototype extensions [\#40](https://github.com/thefrontside/emberx-select/pull/40) ([Robdel12](https://github.com/Robdel12))

## [v1.1.3](https://github.com/thefrontside/emberx-select/tree/v1.1.3) (2015-07-02)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.1.2...v1.1.3)

**Closed issues:**

- Block less not supporting ValuePath [\#34](https://github.com/thefrontside/emberx-select/issues/34)
- Add Title AttributeBinding [\#30](https://github.com/thefrontside/emberx-select/issues/30)
- Add `tmp` dir to the .npmignore. [\#23](https://github.com/thefrontside/emberx-select/issues/23)
- How does this work with `fillIn` test helper? [\#13](https://github.com/thefrontside/emberx-select/issues/13)

**Merged pull requests:**

- Don't break when optionLabelPath is missing [\#38](https://github.com/thefrontside/emberx-select/pull/38) ([tp](https://github.com/tp))
- use a null default tabindex so that the select is tabbable in a form... [\#37](https://github.com/thefrontside/emberx-select/pull/37) ([joshuaconner](https://github.com/joshuaconner))
- Clean up some Glimmer deprecations [\#33](https://github.com/thefrontside/emberx-select/pull/33) ([jamesarosen](https://github.com/jamesarosen))
- Add title attr binding [\#32](https://github.com/thefrontside/emberx-select/pull/32) ([Robdel12](https://github.com/Robdel12))
- Adds optionValuePath [\#31](https://github.com/thefrontside/emberx-select/pull/31) ([jeremywrowe](https://github.com/jeremywrowe))
- Use block params [\#28](https://github.com/thefrontside/emberx-select/pull/28) ([AVCEngineering](https://github.com/AVCEngineering))
- Robust test helper [\#27](https://github.com/thefrontside/emberx-select/pull/27) ([Robdel12](https://github.com/Robdel12))
- add tmp dir to npmignore fix \#23 [\#24](https://github.com/thefrontside/emberx-select/pull/24) ([odoe](https://github.com/odoe))
- Use correct syntax for installing addon [\#17](https://github.com/thefrontside/emberx-select/pull/17) ([harianus](https://github.com/harianus))

## [v1.1.2](https://github.com/thefrontside/emberx-select/tree/v1.1.2) (2015-05-01)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.1.1...v1.1.2)

**Closed issues:**

- Binding options [\#16](https://github.com/thefrontside/emberx-select/issues/16)
- Add support for missing attributes [\#11](https://github.com/thefrontside/emberx-select/issues/11)

**Merged pull requests:**

- Update installation in readme [\#15](https://github.com/thefrontside/emberx-select/pull/15) ([abulrim](https://github.com/abulrim))
- Introduce `registerSelectHelper` [\#14](https://github.com/thefrontside/emberx-select/pull/14) ([seanpdoyle](https://github.com/seanpdoyle))
- fix README formatting [\#12](https://github.com/thefrontside/emberx-select/pull/12) ([fivetanley](https://github.com/fivetanley))
- add blockless version. closes \#8 [\#9](https://github.com/thefrontside/emberx-select/pull/9) ([miguelcobain](https://github.com/miguelcobain))

## [v1.1.1](https://github.com/thefrontside/emberx-select/tree/v1.1.1) (2015-04-07)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.1.0...v1.1.1)

**Closed issues:**

- \[FEATURE\] - Support Ember.SelectView style API [\#8](https://github.com/thefrontside/emberx-select/issues/8)
- support multiple selection [\#5](https://github.com/thefrontside/emberx-select/issues/5)

**Merged pull requests:**

- - add name to attribute bindings to specify a form element name [\#10](https://github.com/thefrontside/emberx-select/pull/10) ([enspandi](https://github.com/enspandi))

## [v1.1.0](https://github.com/thefrontside/emberx-select/tree/v1.1.0) (2015-03-20)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.0.3...v1.1.0)

**Merged pull requests:**

- Add multiple selection feature [\#7](https://github.com/thefrontside/emberx-select/pull/7) ([miguelcobain](https://github.com/miguelcobain))
- update to ember-cli 0.2.0 [\#6](https://github.com/thefrontside/emberx-select/pull/6) ([miguelcobain](https://github.com/miguelcobain))

## [v1.0.3](https://github.com/thefrontside/emberx-select/tree/v1.0.3) (2015-03-17)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.0.2...v1.0.3)

**Merged pull requests:**

- some fixes + cleanup [\#4](https://github.com/thefrontside/emberx-select/pull/4) ([stefanpenner](https://github.com/stefanpenner))

## [v1.0.2](https://github.com/thefrontside/emberx-select/tree/v1.0.2) (2015-03-09)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.0.1...v1.0.2)

**Merged pull requests:**

- Fix README typo [\#3](https://github.com/thefrontside/emberx-select/pull/3) ([mitchlloyd](https://github.com/mitchlloyd))
- Update package.json [\#2](https://github.com/thefrontside/emberx-select/pull/2) ([kategengler](https://github.com/kategengler))

## [v1.0.1](https://github.com/thefrontside/emberx-select/tree/v1.0.1) (2015-02-23)
[Full Changelog](https://github.com/thefrontside/emberx-select/compare/v1.0.0...v1.0.1)

**Closed issues:**

- SyntaxError: Unexpected token [\#1](https://github.com/thefrontside/emberx-select/issues/1)

## [v1.0.0](https://github.com/thefrontside/emberx-select/tree/v1.0.0) (2015-02-16)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*