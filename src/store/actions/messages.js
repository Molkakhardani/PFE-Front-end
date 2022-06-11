/*  */
import * as actionTypes from "./actionsTypes";
import axios from "axios";
import setAuthToken from "../utility/utility";

const SendMessageStart = () => {
  return {
    type: actionTypes.SEND_MESSAGE_START,
  };
};

const SendMessageSuccess = ({ data }) => {
  return {
    type: actionTypes.SEND_MESSAGE_SUCCESS,
    user: data.user,
  };
};

const SendMessageFail = (errors) => {
  return {
    type: actionTypes.SEND_MESSAGE_FAIL,
    errors: errors.response.data,
  };
};

export const sendMessage = (messageData, router) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);

    dispatch(SendMessageStart());
    axios
      .post("http://localhost:5000/api/message/new-message", messageData)
      .then(({ data }) => {
        dispatch(SendMessageSuccess({ data }));
        router.push("/messages");
      })
      .catch((err) => {
        dispatch(SendMessageFail(err));
        console.log(err);
      });
  };
};

const LoadMessagesStart = () => {
  return {
    type: actionTypes.LOAD_MESSAGES_START,
  };
};

const LoadMessagesSuccess = ({ data = {} }) => {
  return {
    type: actionTypes.LOAD_MESSAGES_SUCCESS,
    messages: data.messages,
    received: data.receivedMessages,
  };
};

const LoadMessagesFail = (errors = {}) => {
  return {
    type: actionTypes.LOAD_MESSAGES_FAIL,
    errors: errors.response?.data,
  };
};

export const getUserMessage = (messageData, router) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    dispatch(LoadMessagesStart());
    axios
      .get("http://localhost:5000/api/message/my-messages")
      .then(({ data }) => {
        console.log(data);
        dispatch(LoadMessagesSuccess({ data }));
      })
      .catch((err) => {
        dispatch(LoadMessagesFail(err));
        console.log(err);
      });
  };
};

export const openMessage = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    const data = { id };
    axios
      .post("http://localhost:5000/api/message/update-messages", data)
      .then(({ data }) => {
        console.log(data);
        router.push("/messages");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
