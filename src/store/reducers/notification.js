import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  notification: null,
};

const resetNotification = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
  });
};

const setNotification = (state, action) => ({
  notification: action.notification,
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_NOTIFICATION:
      return resetNotification(state, action);
    case actionTypes.SET_NOTIFICATION:
      return setNotification(state, action);
    default:
      return state;
  }
};

export default notificationReducer;
