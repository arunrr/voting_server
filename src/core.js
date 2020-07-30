import { List, Map, get } from "immutable";

export const INITIAL_STATE = Map(); // Initial state is empty

// Add entries to state
export function setEntries(state, entries) {
  return state.set("entries", List(entries));
}

// Returns winner based on total votes
function getWinner(vote) {
  if (!vote) return []; //No votes
  const [a, b] = vote.get("pair");
  const aVote = vote.getIn(["tally", a], 0); //Total vote of first entry
  const bVote = vote.getIn(["tally", b], 0); //Total vote of second entry

  // Return entry that has highest vote
  if (aVote > bVote) return [a];
  else if (aVote < bVote) return [b];
  else return [a, b]; // Return both entries if votes are tied
}

// Changes state based on votes
export function next(state) {
  // Get list of entries from state and add entries to it based on what getWinner returns
  const entries = state.get("entries").concat(getWinner(state.get("vote")));

  // If there is only one entry in state then create new state with only winner in it
  if (entries.size === 1) {
    return state.remove("vote").remove("entries").set("winner", entries);
  } else {
    // Return new state by selected next pair of items to vote
    return state.merge({
      vote: Map({
        pair: entries.take(2),
      }),
      entries: entries.skip(2),
    });
  }
}

// Add vote to entry that is passed as argument
export function vote(voteState, entry) {
  return voteState.updateIn(["tally", entry], 0, (tally) => tally + 1);
}
