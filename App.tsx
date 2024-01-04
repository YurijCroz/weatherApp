import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { StatusBar } from "expo-status-bar";
import WeatherApp from "./components/WeatherApp/WeatherApp";

export default function App() {
  return (
    <Provider store={store}>
      <>
        <StatusBar style="auto" />
        <WeatherApp />
      </>
    </Provider>
  );
}
