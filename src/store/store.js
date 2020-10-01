import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import isDev from "../utils/devDetect";

const initalState = {};
const middleware = [thunk];

let store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (isDev() && ReactReduxDevTools) {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware), ReactReduxDevTools)
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
