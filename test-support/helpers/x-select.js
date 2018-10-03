import {
  interactor,
  selectable,
  property,
  clickable,
  collection,
  hasClass,
  blurrable,
  is
} from "@bigtest/interactor";

const xSelectInteractor = interactor({
  selectOption: selectable(),
  isDisabled: property("disabled"),
  blur: blurrable(),
  click: clickable(),
  hasFocus: is(":focus"),

  options: collection("option", {
    isSelected: hasClass("is-selected")
  }),

  // TODO
  focus() {
    this.$root.focus();
    return this;
  }
});

export default xSelectInteractor;
