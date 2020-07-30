import { createStore } from "redux";

import { reducer } from "../src/reducer";

export function makeStore() {
  return createStore(reducer);
}
