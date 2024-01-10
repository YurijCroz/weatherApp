import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

interface IHourForecast {
  time: string;
  temp_c: string;
  condition: {
    icon: string;
    text: string;
  };
}

interface IForecastday {
  hour: IHourForecast[];
}

interface IHourWeatherList {
  forecastday: IForecastday[];
  isDarkMode: boolean;
  currentTime: string;
}

const HourWeatherList: FC<IHourWeatherList> = ({
  isDarkMode,
  forecastday,
  currentTime,
}) => {
  const styles = getStyles(isDarkMode);

  const [forecastList, setForecastList] = useState<null | IHourForecast[]>(
    null
  );

  useEffect(() => {
    const [today, tomorrow] = forecastday;
    const leftToday = today.hour.filter(
      ({ time }) =>
        currentTime.split(":")[0] <= time.split(" ")[1].split(":")[0]
    );
    const extraTomorrow = tomorrow.hour.slice(0, 24 - leftToday.length);

    setForecastList([...leftToday, ...extraTomorrow]);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {forecastList?.map(({ time, condition, temp_c }) => (
        <View key={time} style={styles.hour}>
          <Text style={styles.time}>{`${time.split(" ")[1]}: `}</Text>
          <Text style={styles.temperatureText}>{Math.round(+temp_c)}°C</Text>
          <Image
            source={{ uri: `https:${condition.icon}` }}
            style={styles.image}
          />
          <Text style={styles.weatherText}>{condition.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      padding: 5,
      marginTop: 10,
      marginBottom: 10,
    },
    hour: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginBottom: 5,
    },
    time: {
      fontSize: 16,
      color: isDarkMode ? "#ddd" : "#333",
    },
    temperatureText: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "#ddd" : "#333",
      paddingLeft: 4,
      paddingRight: 4,
      minWidth: 50,
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

export default HourWeatherList;
