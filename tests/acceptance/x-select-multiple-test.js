import xSelectInteractor from "dummy/tests/helpers/x-select";
import startApp from "../helpers/start-app";
import { expect } from "chai";
import { run } from "@ember/runloop";
import { beforeEach, afterEach, describe, it } from "mocha";
import { when } from "@bigtest/convergence";

describe("XSelect: Multiple Selection", function() {
  let App;
  let xselect = new xSelectInteractor(".x-select");

  beforeEach(async () => {
    App = startApp();
    await visit("test-bed/multiple");
  });

  afterEach(function() {
    run(App, "destroy");
  });

  // not an acceptance test
  it.skip("does not fire any actions on didInsertElement", function() {
    expect(this.controller.get("changedSelections")).not.to.be.ok;
  });

  it("marks all selected values", async () => {
    await when(() => {
      expect(xselect.options(1).isSelected).to.equal(true);
      expect(xselect.options(2).isSelected).to.equal(true);
    });
  });

  // TODO, interactors need to support multiselects
  describe.skip("choosing the last option", function() {
    beforeEach(async () => {
      await xselect.selectOption("Stanley");
    });

    it("invokes action", async () => {
      await when(() => {
        expect(xselect.options(2).isSelected).to.equal(false);
        expect(xselect.options(3).isSelected).to.equal(true);
        expect(xselect.options(3).text).to.equal("Nobody");
      });
    });
  });

  // this is an integration test
  describe.skip("manually setting the selected binding", function() {
    beforeEach(function() {
      this.controller.set("selections", [this.controller.get("charles"), this.controller.get("stanley")]);
    });

    it("updates the selected option", function() {
      expect(this.$("option:first")).to.be.selected;
      expect(this.$("option:eq(2)")).to.be.selected;
    });
  });

  // this is an integration test
  describe.skip("when no option is selected", function() {
    beforeEach(function() {
      this.$()
        .prop("selectedIndex", 3)
        .trigger("change");
    });

    it("has the empty array as a value", function() {
      expect(this.controller.get("currentSelections.length")).to.equal(0);
    });
  });

  // this is an integration test
  // TODO: come back to this when https://github.com/emberjs/ember.js/issues/15013 is resolved.
  // Ember 2.11 broke testing code that throws exceptions.
  describe.skip("trying to set the value to a non-array", function() {
    beforeEach(function() {
      try {
        run(() => {
          this.controller.set("selections", "OHAI!");
        });
      } catch (e) {
        this.exception = e;
      }
    });
    it("throws an error", function() {
      expect(this.exception).not.to.be.undefined;
      expect(this.exception.message).to.match(/enumerable/);
    });
  });
});
