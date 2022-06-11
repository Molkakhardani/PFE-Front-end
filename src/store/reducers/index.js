// #region Global Imports
import { combineReducers } from "redux";

import authentication from "./authentication";
import usersReducer from "./users";
import visitsReducer from "./visits";
import messagesReducer from "./messages";
import notificationReducer from "./notification";

export default combineReducers({
  auth: authentication,
  users: usersReducer,
  visits: visitsReducer,
  messages: messagesReducer,
  notification: notificationReducer,
});
