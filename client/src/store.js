import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

// Make network request with thunk
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {console.log(store.getState())})

export default store;