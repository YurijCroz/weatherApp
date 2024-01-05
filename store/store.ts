import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const configureStore = (preloadedState: any) =>
  createStore(reducer, preloadedState, applyMiddleware(sagaMiddleware));

const store = configureStore(undefined);

sagaMiddleware.run(rootSaga);

export default store;
