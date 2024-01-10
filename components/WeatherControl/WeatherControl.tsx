import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import svgCollection from "../../svg/svgCollection";

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
      <TouchableOpacity style={styles.switch} onPress={() => toggleDarkMode()}>
        <SvgXml
          xml={
            isDarkMode
              ? svgCollection.night("#ddd")
              : svgCollection.sunny("#333")
          }
          width="42"
          height="42"
        />
      </TouchableOpacity>
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
    switch: {
      width: 52,
      height: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 15,
      bottom: 75,
      padding: 20,
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
