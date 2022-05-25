// #region Global Imports
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// #endregion Global Imports

// #region Local Imports
import Reducers from "./reducers";
// #endregion Local Imports

const store = createStore(Reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
