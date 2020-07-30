import { createStore } from "redux";

import { reducer } from "../src/reducer";

export default function makeStore() {
  return createStore(reducer);
}
