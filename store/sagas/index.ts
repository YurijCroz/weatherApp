import { takeEvery } from "redux-saga/effects";
import ACTIONS from "../actions/actionTypes";

import { getWeatherWorker } from "./weatherSaga";

function* rootSaga() {
  yield takeEvery(ACTIONS.FETCH_WEATHER_REQUEST, getWeatherWorker);
}

export default rootSaga;
