import axios from "axios";

/**
 * we use this function to set the token in the http request header in each axios call
 */
const setAuthToken = (token) => {
  if (token) {
    //Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;

/**
 * this is function is used to update the object properties inside the reducer
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
