import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getStyles } from "./stylesWeatherApp";
import useLocationPermission from "../../hook/useLocationPermission";
import useDarkMode from "../../hook/useDarkMode";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import DailyWeather from "../DailyWeather/DailyWeather";
import DaySelectionModal from "../DaySelectionModal/DaySelectionModal";
import { getEventDataAction } from "../../store/actions/actionCreator";

const WeatherApp = () => {
  const [selectedDays, setSelectedDays] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const { location } = useLocationPermission();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { weatherData, loading } = useSelector((state) => state.weatherReducer);
  const dispatch = useDispatch();

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    if (location) {
      dispatch(getEventDataAction({ q: location, days: selectedDays }));
    }
  }, [location, selectedDays]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <View style={styles.controlContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.themeText}>Theme:</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={styles.selectButtonText}
          >{`${selectedDays} Day(s)`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weatherContainer}>
        {weatherData ? (
          <>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                {weatherData.location.name}
              </Text>
            </View>
            {!weatherData.forecast ? (
              <CurrentWeather
                current={weatherData.current}
                localtime={weatherData.location.localtime}
                isDarkMode={isDarkMode}
              />
            ) : (
              <DailyWeather
                forecastday={weatherData.forecast.forecastday}
                isDarkMode={isDarkMode}
              />
            )}
          </>
        ) : (
          loading && (
            <Text style={styles.locationText}>Loading weather data...</Text>
          )
        )}
      </View>

      <DaySelectionModal
        modalVisible={modalVisible}
        isDarkMode={isDarkMode}
        setModalVisible={setModalVisible}
        setSelectedDays={setSelectedDays}
      />
    </View>
  );
};

export default WeatherApp;
