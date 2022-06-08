import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  user: {},
  token: null,
  errors: null,
  loading: true,
  feedbackMessage: null,
};

const AuthStart = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
    feedbackMessage: null,
  });
};

const AuthSuccess = (state, action = {}) => {
  const { currentuser, token } = action;
  const isAdmin = +currentuser?.account === 1;
  return updateObject(state, {
    user: currentuser,
    token,
    isAdmin,
    loading: false,
    error: null,
  });
};

const UpdateSuccess = (state, action) => {
  return updateObject(state, {
    user: action.currentuser,
    token: action.token,
    loading: false,
    feedbackMessage: action.feedback,
    error: null,
  });
};

const AuthFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
  });
};

const AuthLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    user: null,
  });
};

const AuthLogoutFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
  });
};

const resetFeedbackMessage = (state, action) => {
  return updateObject(state, {
    feedbackMessage: "",
  });
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return AuthStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return AuthSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return AuthFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return AuthLogout(state, action);
    case actionTypes.AUTH_LOGOUT_FAIL:
      return AuthLogoutFail(state, action);

    case actionTypes.UPDATE_USER_START:
      return AuthStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return UpdateSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return AuthFail(state, action);

    case actionTypes.RESET_FD_MESSAGE:
      return resetFeedbackMessage(state, action);

    default:
      return state;
  }
};

export default auth;
