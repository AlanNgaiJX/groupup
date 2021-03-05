import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    count,
    registForm,
    publicKey,
    userId,
    imageViewerOn,
    imageViewerList,
} from "./reducers.js";

const reducers = combineReducers({
    count,
    registForm,
    publicKey,
    userId,
    imageViewerOn,
    imageViewerList,
});

const store = createStore(reducers, composeWithDevTools());
export default store;
