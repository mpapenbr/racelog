import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { iRacingReducer } from "./iracing/reducer";
import iRacingSaga from "./iracing/sagas";
import { IRacingState } from "./iracing/types";

export interface ApplicationState {
  iracing: IRacingState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    iracing: iRacingReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(iRacingSaga)]);
}
