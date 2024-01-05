import React, { FC } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

interface IDailyWeather {
  forecastday: IForecastday[];
  isDarkMode: boolean;
}

interface IForecastday {
  date: string;
  day: {
    avgtemp_c: string;
    condition: {
      icon: string;
      text: string;
    };
  };
}

const DailyWeather: FC<IDailyWeather> = ({ forecastday, isDarkMode }) => {
  const styles = getStyles(isDarkMode);

  return (
    <ScrollView>
      {forecastday.map(({ date, day }) => (
        <View key={date} style={styles.day}>
          <Text style={styles.locationText}>{`${date}: `}</Text>
          <Text style={styles.temperatureText}>
            {Math.round(+day.avgtemp_c)}°C
          </Text>
          <Image
            source={{ uri: `https:${day.condition.icon}` }}
            style={styles.image}
          />
          <Text style={styles.weatherText}>{day.condition.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    day: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    locationText: {
      fontSize: 16,
      color: isDarkMode ? "#ddd" : "#333",
    },
    temperatureText: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "#ddd" : "#333",
      paddingLeft: 4,
      paddingRight: 4,
    },
    weatherText: {
      paddingLeft: 4,
      fontSize: 16,
      color: isDarkMode ? "#ccc" : "#555",
    },
    image: {
      width: 32,
      height: 32,
      resizeMode: "cover",
    },
  });
};

export default DailyWeather;
