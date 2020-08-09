import { all } from "redux-saga/effects";

export default function* iRacingSaga() {
  // does NOT work: yield all([watchSagaTestRequest]);
  // does work: yield all([fork(watchSagaTestRequest)]);
  // does work: yield all([watchSagaTestRequest()]);

  yield all([]);
}
