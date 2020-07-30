import { expect } from "chai";
import { List, Map } from "immutable";

import { setEntries, next, vote } from "../src/core";

describe("application logic", () => {
  describe("set entries", () => {
    it("adds entries to the state", () => {
      const state = Map();
      const entries = List.of("Man of Steel", "Iron Man");
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(
        Map({
          entries: List.of("Man of Steel", "Iron Man"),
        })
      );
    }); //end add entries

    it("converts to immutable", () => {
      const state = Map();
      const entries = ["Man of Steel", "Iron Man"];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(
        Map({
          entries: List.of("Man of Steel", "Iron Man"),
        })
      );
    }); //end convert
  }); //end set entries test

  describe("next", () => {
    it("takes the next two entries under vote", () => {
      const state = Map({
        entries: List.of("Man of Steel", "Iron Man", "Life"),
      });
      const nextState = next(state);

      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Man of Steel", "Iron Man"),
          }),

          entries: List.of("Life"),
        })
      );
    }); //end next two

    it("put the winner of current vote back to entry", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Man of Steel", "Iron Man"),
          tally: Map({
            "Man of Steel": 10,
            "Iron Man": 5,
          }),
        }),
        entries: List.of("Life", "The Happening", "BumbleBee"),
      });

      const nextState = next(state);

      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Life", "The Happening"),
          }),
          entries: List.of("BumbleBee", "Man of Steel"),
        })
      );
    }); //end put winner back

    it("put both entries back to list if votes are tied", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Man of Steel", "Iron Man"),
          tally: Map({
            "Man of Steel": 5,
            "Iron Man": 5,
          }),
        }),
        entries: List.of("Life", "The Happening", "BumbleBee"),
      });

      const nextState = next(state);

      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Life", "The Happening"),
          }),
          entries: List.of("BumbleBee", "Man of Steel", "Iron Man"),
        })
      );
    }); //end put both entries back
  }); //end next Test

  describe("vote", () => {
    it("creates a tally for the voted entry", () => {
      const state = Map({
        pair: List.of("Man of Steel", "Iron Man"),
      });

      const nextState = vote(state, "Man of Steel");

      expect(nextState).to.equal(
        Map({
          pair: List.of("Man of Steel", "Iron Man"),
          tally: Map({
            "Man of Steel": 1,
          }),
        })
      );
    }); //end create tally

    it("adds tally to existing vote entries", () => {
      const state = Map({
        pair: List.of("Man of Steel", "Iron Man"),
        tally: Map({
          "Man of Steel": 3,
          "Iron Man": 2,
        }),
      });

      const nextState = vote(state, "Man of Steel");

      expect(nextState).to.equal(
        Map({
          pair: List.of("Man of Steel", "Iron Man"),
          tally: Map({
            "Man of Steel": 4,
            "Iron Man": 2,
          }),
        })
      );
    }); //end add tally
  }); //end vote Test
}); //end Main Test
