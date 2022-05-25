import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  errors: {},
  loading: false,
  visits: [],
};

const createVisitStart = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
  });
};

const createVisitSuccess = (state, action) => {
  return updateObject(state, {
    visits: state.visits.concat(action.visit),
    loading: false,
    error: null,
  });
};

const createVisitFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const getAllVisitsStart = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: true,
  });
};

const getAllVisitsSuccess = (state, action) => {
  return updateObject(state, {
    visits: action.visits,
    loading: false,
    error: null,
  });
};

const getAllVisitsFails = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const visitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_VISIT_START:
      return createVisitStart(state, action);
    case actionTypes.CREATE_VISIT_SUCCESS:
      return createVisitSuccess(state, action);
    case actionTypes.CREATE_VISIT_FAIL:
      return createVisitFail(state, action);

    case actionTypes.LOAD_VISITS_START:
      return getAllVisitsStart(state, action);
    case actionTypes.LOAD_VISITS_SUCCESS:
      return getAllVisitsSuccess(state, action);
    case actionTypes.LOAD_VISITS_FAIL:
      return getAllVisitsFails(state, action);

    default:
      return state;
  }
};

export default visitsReducer;
