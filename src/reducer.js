import { setEntries, next, vote, INITIAL_STATE } from "./core";

// reducer function for redux
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_ENTRIES":
      return setEntries(state, action.entries); // adds entries to state
    case "NEXT":
      return next(state); // selects next pair of entries to vote
    case "VOTE":
      return state.update("vote", (voteState) => vote(voteState, action.entry)); // updates votes of an entry
  }
  return state; // returns state passed by default
}
