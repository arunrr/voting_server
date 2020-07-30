import makeStore from "./store";
import startServer from "./server";

// Create Redux store
const store = makeStore();
// Start socket io server
startServer(store);

// Initialize state with dummy entries data
store.dispatch({
  type: "SET_ENTRIES",
  entries: require("./entries.json"),
});
// Select first pair of entries to vote
store.dispatch({
  type: "NEXT",
});
