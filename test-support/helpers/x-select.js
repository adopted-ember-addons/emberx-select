import {
  interactor,
  selectable,
  property,
  clickable,
  collection,
  hasClass,
  blurrable,
  focusable,
  is
} from "@bigtest/interactor";

const xSelectInteractor = interactor({
  selectOption: selectable(),
  isDisabled: property("disabled"),
  blur: blurrable(),
  click: clickable(),
  focus: focusable(),
  hasFocus: is(":focus"),

  options: collection("option", {
    isSelected: property("selected"),
    hasSelectedClass: hasClass("is-selected")
  })
});

export default xSelectInteractor;
