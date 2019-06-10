import { fromJS } from "immutable";
import NAMESPACE from "./namespace";

export const selectFlags = state => {
  return state.getIn([NAMESPACE, "flags"]) || fromJS([]);
};

export const selectChartInnerText = state => {
  return state.getIn([NAMESPACE, "chartInnerText"]) || fromJS([]);
};

export const selectCasesByStatus = state => {
  return state.getIn([NAMESPACE, "casesByStatus"]) || fromJS({});
};

export const selectCasesByCaseWorker = state => {
  return state.getIn([NAMESPACE, "casesByCaseWorker"]) || fromJS({});
};

export const selectCasesRegistration = state => {
  return state.getIn([NAMESPACE, "casesRegistration"]) || fromJS({});
};
