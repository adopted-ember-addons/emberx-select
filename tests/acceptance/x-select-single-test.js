import startApp from "../helpers/start-app";
import xSelectInteractor from "dummy/tests/helpers/x-select";
import pageInteractor from "dummy/tests/interactors/test-page";
import { expect } from "chai";
import { run } from "@ember/runloop";
import { beforeEach, afterEach, describe, it } from "mocha";
import { when } from "@bigtest/convergence";

describe("XSelect: Single Selection", function() {
  let App;
  let xselect = new xSelectInteractor(".x-select");
  let page = new pageInteractor();

  beforeEach(async () => {
    App = startApp();
    await visit("test-bed/single");
  });

  afterEach(function() {
    run(App, "destroy");
  });

  // Not an acceptance test
  it.skip("does not fire any actions on didInsertElement", function() {
    expect(this.controller.get("tagged")).not.to.be.ok;
  });

  it("is enabled by default", async () => {
    await when(() => expect(xselect.isDisabled).to.equal(false));
  });

  it("renders an option for each view", async () => {
    await when(() => {
      expect(xselect.options().length).to.equal(4);
      expect(xselect.options(0).text).to.equal("Charles");
      expect(xselect.options(3).text).to.equal("Nobody");
    });
  });

  it("marks the selected value", async () => {
    await when(() => expect(xselect.options(1).isSelected).to.equal(true));
  });

  describe("choosing the last option", function() {
    beforeEach(async () => {
      await xselect.selectOption("Stanley");
    });

    it("invokes action & changes the value on page", async () => {
      await when(() => expect(page.selectedText).to.equal("Stanley"));
    });
  });

  // not an acceptance test
  describe.skip("manually setting the selected binding", function() {
    beforeEach(function() {
      this.controller.set("it", this.controller.get("charles"));
    });

    it("updates the selected option", function() {
      expect(this.$("option:first")).to.be.selected;
    });
  });

  // not an acceptance test
  describe.skip("disabling", function() {
    beforeEach(function() {
      this.controller.set("isDisabled", true);
    });

    it("disables the select box", function() {
      expect(this.$()).not.to.be.enabled;
    });
  });

  // not an acceptance test
  describe.skip("when no option is selected", function() {
    beforeEach(function() {
      this.$()
        .prop("selectedIndex", 4)
        .trigger("change");
    });

    it("has no value", function() {
      expect(this.controller.get("it")).to.equal(null);
    });
  });
});
