import React from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";

interface IWeatherControl {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedDays: number;
}

const WeatherControl: React.FC<IWeatherControl> = ({
  isDarkMode,
  setModalVisible,
  toggleDarkMode,
  selectedDays,
}) => {
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.controlContainer}>
      <View style={styles.switchContainer}>
        <Text style={styles.themeText}>Theme:</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>{`${selectedDays} Day(s)`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
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

export default WeatherControl;
