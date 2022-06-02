import * as actionTypes from "./actionsTypes";
import axios from "axios";
import setAuthToken from "../utility/utility";
import jwt_decode from "jwt-decode";

/**
 * this actions creator is responsible for the all actions realted
 * to the authentications process
 *  */

export const AuthStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const AuthSuccess = (decode, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    currentuser: decode,
  };
};

export const AuthFail = (errors) => {
  return {
    type: actionTypes.AUTH_FAIL,
    errors: errors.response.data,
  };
};

export const autologout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("expirationDate");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logoutFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGOUT_FAIL,
    error: error,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(autologout());
    }, expirationTime * 1000);
  };
};

/**
 * this function is used to authenticated the user.
 * it takes the token from the response and store it inside the local Storage
 */
export const auth = (authData, history) => {
  return (dispatch) => {
    dispatch(AuthStart());
    axios
      .post("http://localhost:5000/api/user/auth", authData)
      .then((res) => {
        const { token } = res.data;
        setAuthToken(token);
        const decoded = jwt_decode(token);
        const expirationDate = new Date(decoded.exp * 1000);
        const expirationTime = decoded.exp - decoded.iat;
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("jwtToken", token);
        dispatch(AuthSuccess(decoded, token));
        dispatch(checkAuthTimeout(expirationTime));
        history.push("/");
      })
      .catch((err) => {
        dispatch(AuthFail(err));
        console.log(err);
      });
  };
};

/**
 * this function is used to verify the authentication state in the application.
 * it will be called in component didMount of the app component
 */
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      dispatch(autologout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(autologout());
      } else {
        const user = jwt_decode(token);
        dispatch(AuthSuccess(user, token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};
