import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import DailyWeather from "../DailyWeather/DailyWeather";
import { getEventDataAction } from "../../store/actions/actionCreator";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedDays, setSelectedDays] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const { weatherData, loading } = useSelector((state) => state.weatherReducer);
  const dispatch = useDispatch();

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(`${location.coords.latitude},${location.coords.longitude}`);
      }
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(getEventDataAction({ q: location, days: selectedDays }));
    }
  }, [location, selectedDays]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const renderDayItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dayItem}
      onPress={() => {
        setSelectedDays(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.dayText}>{item} Day(s)</Text>
    </TouchableOpacity>
  );

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={[1, 3, 7, 14]}
            renderItem={renderDayItem}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#222" : "#fff",
    },
    header: {
      paddingTop: 30,
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      color: isDarkMode ? "#ddd" : "#333",
    },
    controlContainer: {
      alignItems: "center",
      paddingBottom: 30,
    },
    switchContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    themeText: {
      fontSize: 18,
      color: isDarkMode ? "#ddd" : "#333",
      paddingRight: 10,
    },
    locationContainer: {
      marginBottom: 10,
    },
    locationText: {
      fontSize: 18,
      color: isDarkMode ? "#ddd" : "#333",
    },
    lightSelectedText: {
      color: "#333",
    },
    darkSelectedText: {
      color: "#fff",
    },
    weatherContainer: {
      alignItems: "center",
    },
    /*  */
    dayItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    dayText: {
      fontSize: 18,
      color: isDarkMode ? "#ddd" : "#333",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    selectButton: {
      padding: 10,
      backgroundColor: "#2196F3",
      borderRadius: 5,
      marginVertical: 10,
      alignItems: "center",
    },
    selectButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
    },
  });
};

export default WeatherApp;
