import * as actionTypes from "./actionsTypes";
import axios from "axios";

const CreateVisitStart = () => {
  return {
    type: actionTypes.CREATE_VISIT_START,
  };
};

const CreateVisitSuccess = (visit) => {
  return {
    type: actionTypes.CREATE_VISIT_SUCCESS,
    visit,
  };
};

const CreateVisitFail = (errors) => {
  return {
    type: actionTypes.CREATE_VISIT_FAIL,
    errors: errors,
  };
};

export const createVisit = (visitData, router) => {
  return (dispatch) => {
    dispatch(CreateVisitStart());
    axios
      .post("http://localhost:5000/api/admin/new-visit", visitData)
      .then(({ data }) => {
        dispatch(CreateVisitSuccess(data));
        router.push("/visits");
      })
      .catch((err) => {
        dispatch(CreateVisitFail(err));
        console.log(err);
      });
  };
};

const loadVisitsStart = () => {
  return {
    type: actionTypes.LOAD_VISITS_START,
  };
};

const loadVisitsSuccess = (visits) => {
  return {
    type: actionTypes.LOAD_VISITS_SUCCESS,
    visits,
  };
};

const loadVisitsFail = (errors) => {
  return {
    type: actionTypes.LOAD_VISITS_FAIL,
    errors: errors,
  };
};

export const loadVisits = () => {
  return (dispatch) => {
    dispatch(loadVisitsStart());
    axios
      .get("http://localhost:5000/api/user/visits")
      .then(({ data }) => {
        dispatch(loadVisitsSuccess(data.visits));
      })
      .catch((err) => {
        dispatch(loadVisitsFail(err));
        console.log(err);
      });
  };
};
export const deleteAccountVisit = (visitId, router) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_VISIT_START });
    axios
      .delete(`http://localhost:5000/api/admin/delete-visit/${visitId}`)
      .then(({ data }) => {
        dispatch({ type: actionTypes.DELETE_VISIT_SUCCESS, visitId });
        router.push("/visits");
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_VISIT_FAIL,
          errors: err.response.data,
        });
        console.log(err);
      });
  };
};
export const updateVisit = (updatedData, router) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ACCOUNT_VISIT_START });
    axios
      .post(`http://localhost:5000/api/admin/update-visit`, updatedData)
      .then(({ data }) => {
        dispatch({ type: actionTypes.UPDATE_ACCOUNT_VISIT_SUCCESS });
        router.push("/visits");
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_ACCOUNT_VISIT_FAIL,
          errors: err.response.data,
        });
        console.log(err);
      });
  };
};
