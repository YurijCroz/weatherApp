import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { getStyles } from "./stylesWeatherApp";
import useLocationPermission from "../../hook/useLocationPermission";
import useDarkMode from "../../hook/useDarkMode";
import DaySelectionModal from "../DaySelectionModal/DaySelectionModal";
import WeatherControl from "../WeatherControl/WeatherControl";
import WeatherApiLogoLink from "../WeatherApiLink/WeatherApiLink";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import { getEventDataAction } from "../../store/actions/actionCreator";

const WeatherApp = () => {
  const [selectedDays, setSelectedDays] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const { location } = useLocationPermission();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
      <WeatherApiLogoLink isDarkMode={isDarkMode} />
      <WeatherControl
        isDarkMode={isDarkMode}
        setModalVisible={setModalVisible}
        toggleDarkMode={toggleDarkMode}
        selectedDays={selectedDays}
      />
      <View style={styles.weatherContainer}>
        <WeatherDisplay isDarkMode={isDarkMode} selectedDays={selectedDays} />
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
