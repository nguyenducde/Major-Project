import { takeLatest, call, put } from "redux-saga/effects";
import symbolApi from "./symbolApi";

// worker saga: makes the api call when watcher saga sees the action
export function* workerSaga() {
  try {
    const response = yield call(symbolApi.getAll());
    const data = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", data });

  } catch (error) {
    // dispatch a failure action to the store with the error
   // yield put({ type: "API_CALL_FAILURE", error });
  }
}