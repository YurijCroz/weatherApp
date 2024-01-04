import ACTIONS from "../actions/actionTypes";

const initialState = {
  weatherData: null,
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_WEATHER_REQUEST:
      return {
        ...state,
        weatherData: null,
        loading: true,
        error: null,
      };

    case ACTIONS.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
      };

    case ACTIONS.FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default weatherReducer;
