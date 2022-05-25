import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  errors: {},
  loading: false,
  users: [],
};

const createUserStart = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
  });
};

const createUserSuccess = (state, action) => {
  return updateObject(state, {
    users: state.users.concat(action.user),
    loading: false,
    error: null,
  });
};

const createUserFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const getAllUsersStart = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
  });
};

const getAllUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false,
    error: null,
  });
};

const getAllUsersFails = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_START:
      return createUserStart(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAIL:
      return createUserFail(state, action);

    case actionTypes.LOAD_USERS_START:
      return getAllUsersStart(state, action);
    case actionTypes.LOAD_USERS_SUCCESS:
      return getAllUsersSuccess(state, action);
    case actionTypes.LOAD_USERS_FAIL:
      return getAllUsersFails(state, action);

    default:
      return state;
  }
};

export default usersReducer;
