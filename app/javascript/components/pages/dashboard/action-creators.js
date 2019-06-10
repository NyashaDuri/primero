import * as Actions from "./actions";

export const fetchFlags = () => async dispatch => {
  dispatch({
    type: Actions.DASHBOARD_FLAGS
  });
};

export const fetchCasesByStatus = () => async dispatch => {
  dispatch({
    type: Actions.CASES_BY_STATUS
  });
};

export const fetchCasesByCaseWorker = () => async dispatch => {
  dispatch({
    type: Actions.CASES_BY_CASE_WORKER
  });
};

export const fetchCasesRegistration = () => async dispatch => {
  dispatch({
    type: Actions.CASES_REGISTRATION
  });
};
