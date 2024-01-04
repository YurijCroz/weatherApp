import ACTION from "./actionTypes";

export const getEventDataAction = (data: any) => ({
  type: ACTION.FETCH_WEATHER_REQUEST,
  data,
});
