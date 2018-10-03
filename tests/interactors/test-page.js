import { interactor, text } from "@bigtest/interactor";

// this is exactly the best use of interactors (by stuffing everything
// into a single interactor), but for this cause I think it's okay.
let pageInteractor = interactor({
  selectedText: text("[data-test-selected]"),
  eventTypeText: text(".spec-event-type"),

  // default selected page tests
  carMakeText: text(".spec-selected-make"),
  carModelText: text(".spec-selected-model"),
  carTrimText: text(".spec-selected-trim"),
  selectedMakeModelText: text(".spec-selected-make-from-model"),
  selectedQuantityText: text(".spec-selected-quantity")
});

export default pageInteractor;
