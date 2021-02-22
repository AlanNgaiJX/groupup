import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { count, registForm, publicKey } from "./reducers.js";

const reducers = combineReducers({ count, registForm, publicKey });
const store = createStore(reducers, composeWithDevTools());
export default store;
