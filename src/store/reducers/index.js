// #region Global Imports
import { combineReducers } from "redux";

import authentication from "./authentication";
import usersReducer from "./users";
import visitsReducer from "./visits";
import notificationReducer from "./notification";

export default combineReducers({
  auth: authentication,
  users: usersReducer,
  visits: visitsReducer,
  notification: notificationReducer,
});
