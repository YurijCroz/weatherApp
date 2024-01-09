import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Text,
} from "react-native";

interface IWeatherApiLogoLink {
  isDarkMode: boolean;
}

const WeatherApiLogoLink: FC<IWeatherApiLogoLink> = ({ isDarkMode }) => {
  const styles = getStyles(isDarkMode);

  const handlePress = () => {
    Linking.openURL("https://www.weatherapi.com/");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>Powered by</Text>
      <Image
        source={{
          uri: "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      left: 20,
      top: 50,
    },
    text: {
      color: isDarkMode ? "#ddd" : "#333",
      fontSize: 10,
      paddingBottom: 2,
      textAlign: "right",
    },
    image: {
      width: 107 / 1.5,
      height: 50 / 1.5,
    },
  });
};

export default WeatherApiLogoLink;
