import * as actionTypes from "./actionsTypes";
import axios from "axios";
import setAuthToken from "../utility/utility";

const CreateUserStart = () => {
  return {
    type: actionTypes.CREATE_USER_START,
  };
};

const CreateUserSuccess = ({ data }) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    user: data.user,
  };
};

const CreateUserFail = (errors) => {
  return {
    type: actionTypes.CREATE_USER_FAIL,
    errors: errors.response.data,
  };
};

export const createAccount = (accountData, router) => {
  return (dispatch) => {
    dispatch(CreateUserStart());
    axios
      .post("http://localhost:5000/api/admin/new-user", accountData)
      .then(({ data }) => {
        dispatch(CreateUserSuccess({ data }));
        router.push("/users");
      })
      .catch((err) => {
        dispatch(CreateUserFail(err));
        console.log(err);
      });
  };
};

export const deleteAccount = (userId, router) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_USER_START });
    axios
      .delete(`http://localhost:5000/api/admin/delete-user/${userId}`)
      .then(({ data }) => {
        dispatch({ type: actionTypes.DELETE_USER_SUCCESS, userId });
        router.push("/users");
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_USER_FAIL,
          errors: err.response.data,
        });
        console.log(err);
      });
  };
};

export const updatedAccountStatus = (userId, status, router) => {
  const statusData = { userId, status };

  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ACCOUNT_STATUS_START });
    axios
      .post(`http://localhost:5000/api/admin/account-status`, statusData)
      .then(({ data }) => {
        dispatch({ type: actionTypes.UPDATE_ACCOUNT_STATUS_SUCCESS });
        router.push("/users");
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_ACCOUNT_STATUS_FAIL,
          errors: err.response.data,
        });
        console.log(err);
      });
  };
};

const loadUsersStart = () => {
  return {
    type: actionTypes.LOAD_USERS_START,
  };
};

const loadUsersSuccess = (users) => {
  return {
    type: actionTypes.LOAD_USERS_SUCCESS,
    users,
  };
};

const loadUsersFail = (errors) => {
  return {
    type: actionTypes.LOAD_USERS_FAIL,
    errors: errors,
  };
};

export const loadUsers = () => {
  return (dispatch) => {
    dispatch(loadUsersStart());
    axios
      .get("http://localhost:5000/api/user/users")
      .then(({ data }) => {
        dispatch(loadUsersSuccess(data.users));
      })
      .catch((err) => {
        dispatch(loadUsersFail(err));
        console.log(err);
      });
  };
};
