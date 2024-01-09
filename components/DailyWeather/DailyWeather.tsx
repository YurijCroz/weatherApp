import React, { FC } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import reverseDate from "../../utils/reverseDate";

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
    <ScrollView showsVerticalScrollIndicator={false}>
      {forecastday.map(({ date, day }, index) => (
        <View
          key={date}
          style={[
            styles.day,
            index < forecastday.length - 1 ? styles.everyDay : styles.lastDay,
          ]}
        >
          <Text style={styles.dateText}>{reverseDate(date)}</Text>
          <View style={styles.tempImgContainer}>
            <Text style={styles.temperatureText}>
              {Math.round(+day.avgtemp_c)}°C
            </Text>
            <Image
              source={{ uri: `https:${day.condition.icon}` }}
              style={styles.image}
            />
          </View>
          <Text style={styles.weatherText}>{day.condition.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    day: {
      minWidth: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    everyDay: {
      borderBottomColor: isDarkMode ? "#ddd" : "#333",
      borderBottomWidth: 0.5,
      paddingBottom: 10,
      marginBottom: 10,
    },
    lastDay: {
      paddingBottom: 5,
    },
    dateText: {
      fontSize: 20,
      color: isDarkMode ? "#ddd" : "#333",
    },
    tempImgContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 2,
      paddingTop: 2,
    },
    temperatureText: {
      fontSize: 22,
      fontWeight: "bold",
      color: isDarkMode ? "#ddd" : "#333",
      paddingLeft: 4,
      paddingRight: 4,
    },
    weatherText: {
      paddingLeft: 4,
      fontSize: 18,
      color: isDarkMode ? "#ccc" : "#555",
    },
    image: {
      width: 42,
      height: 42,
      resizeMode: "cover",
    },
  });
};

export default DailyWeather;
