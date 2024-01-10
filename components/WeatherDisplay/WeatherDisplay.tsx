import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import DailyWeather from "../DailyWeather/DailyWeather";
import HourWeatherList from "../HourWeatherList/HourWeatherList";
import { RootState } from "../../store/reducers";

interface IWeatherDisplay {
  isDarkMode: boolean;
  selectedDays: number;
}

const WeatherDisplay: FC<IWeatherDisplay> = ({ isDarkMode, selectedDays }) => {
  const styles = getStyles(isDarkMode);

  const { weatherData, loading } = useSelector(
    (state: RootState) => state.weatherReducer
  );

  return weatherData ? (
    <>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{weatherData.location.name}</Text>
      </View>
      {selectedDays === 1 ? (
        <>
          <CurrentWeather
            current={weatherData.current}
            localtime={weatherData.location.localtime}
            isDarkMode={isDarkMode}
          />
          <HourWeatherList
            isDarkMode={isDarkMode}
            forecastday={weatherData.forecast.forecastday}
            currentTime={weatherData.location.localtime.split(" ")[1]}
          />
        </>
      ) : (
        <DailyWeather
          forecastday={weatherData.forecast.forecastday}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  ) : (
    loading && <Text style={styles.locationText}>Loading weather data...</Text>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    locationContainer: {
      marginBottom: 10,
    },
    locationText: {
      fontSize: 18,
      color: isDarkMode ? "#ddd" : "#333",
    },
  });
};

export default WeatherDisplay;
