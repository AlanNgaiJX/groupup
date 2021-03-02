import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { count, registForm, publicKey, userId } from "./reducers.js";

const reducers = combineReducers({ count, registForm, publicKey, userId });
const store = createStore(reducers, composeWithDevTools());
export default store;
