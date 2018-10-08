import {
  interactor,
  selectable,
  property,
  clickable,
  collection,
  hasClass,
  blurrable,
  focusable,
  attribute,
  is
} from "@bigtest/interactor";

const xSelectInteractor = interactor({
  selectOption: selectable(),
  blur: blurrable(),
  click: clickable(),
  focus: focusable(),
  hasFocus: is(":focus"),
  name: attribute("name"),
  form: attribute("form"),
  title: attribute("title"),
  size: attribute("size"),
  tabindex: attribute("tabindex"),
  isDisabled: property("disabled"),
  isRequired: property("required"),
  isAutofocus: property("autofocus"),

  options: collection("option", {
    name: attribute("name"),
    value: property("value"),
    title: attribute("title"),
    isSelected: property("selected"),
    isDisabled: property("disabled"),
    hasSelectedClass: hasClass("is-selected")
  })
});

export default xSelectInteractor;
