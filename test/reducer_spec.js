import { expect } from "chai";
import { Map, fromJS, List } from "immutable";

import { reducer } from "../src/reducer";

describe("reducer", () => {
  it("handles SET_ENTRIES", () => {
    const initialState = Map();
    const action = { type: "SET_ENTRIES", entries: ["Man of Steel"] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(
      fromJS({
        entries: ["Man of Steel"],
      })
    );
  }); // end SET_ENTRIES

  it("handles NEXT", () => {
    const initialState = fromJS({
      entries: ["Man of Steel", "Iron Man"],
    });
    const action = { type: "NEXT" };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(
      fromJS({
        vote: {
          pair: ["Man of Steel", "Iron Man"],
        },
        entries: [],
      })
    );
  }); // end NEXT

  it("handles VOTE", () => {
    const initialState = Map({
      vote: Map({
        pair: List.of("Man of Steel", "Iron Man"),
      }),
      entries: List(),
    });
    const action = { type: "VOTE", entry: "Man of Steel" };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(
      Map({
        vote: Map({
          pair: List.of("Man of Steel", "Iron Man"),
          tally: Map({
            "Man of Steel": 1,
          }),
        }),
        entries: List(),
      })
    );
  }); // end VOTE test

  it("can be used with reduce", () => {
    const actions = [
      { type: "SET_ENTRIES", entries: ["Man of Steel", "Iron Man"] },
      { type: "NEXT" },
      { type: "VOTE", entry: "Man of Steel" },
      { type: "VOTE", entry: "Iron Man" },
      { type: "VOTE", entry: "Man of Steel" },
      { type: "NEXT" },
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(
      fromJS({
        winner: ["Man of Steel"],
      })
    );
  }); // end reduce test
}); // end reducer test
