import { describe, it } from "mocha";
import { expect } from "chai";
import { List, Map } from "immutable";

import { makeStore } from "../src/store";

describe("store", () => {
  it("is a Redux store configured using correct Reducers", () => {
    const store = makeStore();

    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: "SET_ENTRIES",
      entries: ["Man of Steel", "Iron Man"],
    });

    expect(store.getState()).to.equal(
      Map({
        entries: List.of("Man of Steel", "Iron Man"),
      })
    );
  });
});
