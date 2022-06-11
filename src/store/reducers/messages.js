import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  errors: {},
  loading: false,
  messages: [],
  receivedMessages: [],
};

const LoadMessagesStart = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
  });
};

const LoadMessagesSuccess = (state, action) => {
  return updateObject(state, {
    messages: action.messages,
    receivedMessages: action.received,
    loading: false,
    error: null,
  });
};

const LoadMessagesFails = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MESSAGES_START:
      return LoadMessagesStart(state, action);
    case actionTypes.LOAD_MESSAGES_SUCCESS:
      return LoadMessagesSuccess(state, action);
    case actionTypes.LOAD_MESSAGES_FAIL:
      return LoadMessagesFails(state, action);

    default:
      return state;
  }
};

export default messagesReducer;
