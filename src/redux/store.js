import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { count, registForm } from "./reducers.js";

const reducers = combineReducers({ count, registForm });
const store = createStore(reducers, composeWithDevTools());
export default store;
