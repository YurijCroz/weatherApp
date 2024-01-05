import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({
  weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
