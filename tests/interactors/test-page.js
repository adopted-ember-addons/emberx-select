import { interactor, text, collection } from "@bigtest/interactor";

// this isn't exactly the best use of interactors (by stuffing everything
// into a single interactor), but for this cause I think it's okay.
let pageInteractor = interactor({
  selectedText: text("[data-test-selected]"),
  eventTypeText: text(".spec-event-type"),

  // default selected page tests
  carMakeText: text(".spec-selected-make"),
  carModelText: text(".spec-selected-model"),
  carTrimText: text(".spec-selected-trim"),
  selectedMakeModelText: text(".spec-selected-make-from-model"),
  selectedQuantityText: text(".spec-selected-quantity"),

  multiselectValues: collection("[data-test-multiselected] li")
});

export default pageInteractor;
