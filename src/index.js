import makeStore from "./store";
import startServer from "./server";

// Create Redux store
const store = makeStore();
startServer(store);
