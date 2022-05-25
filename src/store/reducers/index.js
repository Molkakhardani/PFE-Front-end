// #region Global Imports
import { combineReducers } from "redux";

import usersReducer from "./users";
import visitsReducer from "./visits";
import notificationReducer from "./notification";

export default combineReducers({
  users: usersReducer,
  visits: visitsReducer,
  notification: notificationReducer,
});
