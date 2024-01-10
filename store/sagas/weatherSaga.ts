import { call, put } from "redux-saga/effects";
import axios from "axios";
import ACTIONS from "../actions/actionTypes";

export function* getWeatherWorker(action: any) {
  try {
    const data: FetchedDataType<any> = yield call(getWeather, action.data);

    yield put({ type: ACTIONS.FETCH_WEATHER_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({ type: ACTIONS.FETCH_WEATHER_ERROR, payload: error.message });
  }
}

import { AxiosResponse } from "axios";
type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type GetWeather = {
  q: string;
  days: number;
};

const getWeather = async ({ q, days }: GetWeather): FetchedDataType<any> => {
  const { data } = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json`,
    {
      params: {
        key: "6d1f9cb9e1d84964a87113237240401",
        q,
        days: days !== 1 ? days : days + 1,
      },
    }
  );
  return data;
};
