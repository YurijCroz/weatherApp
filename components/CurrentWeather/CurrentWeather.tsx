import React, { FC } from "react";
import { Text, StyleSheet, Image } from "react-native";
import reverseDate from "../../utils/reverseDate";

interface ICurrentWeather {
  current: {
    temp_c: string;
    condition: {
      icon: string;
      text: string;
    };
  };
  localtime: string;
  isDarkMode: boolean;
}

const CurrentWeather: FC<ICurrentWeather> = ({
  current,
  localtime,
  isDarkMode,
}) => {
  const styles = getStyles(isDarkMode);

  const [date, time] = localtime.split(" ");

  return (
    <>
      <Text style={styles.dateText}>{`${reverseDate(date)} ${time}`}</Text>
      <Text style={styles.temperatureText}>
        {Math.round(+current.temp_c)}°C
      </Text>
      <Image
        source={{ uri: `https:${current.condition.icon}` }}
        style={styles.image}
      />
      <Text style={styles.weatherText}>{current.condition.text}</Text>
    </>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    dateText: {
      fontSize: 18,
      color: isDarkMode ? "#ddd" : "#333",
    },
    temperatureText: {
      fontSize: 32,
      fontWeight: "bold",
      color: isDarkMode ? "#ddd" : "#333",
    },
    weatherText: {
      fontSize: 18,
      color: isDarkMode ? "#ccc" : "#555",
    },
    image: {
      width: 64,
      height: 64,
      resizeMode: "cover",
    },
  });
};

export default CurrentWeather;
