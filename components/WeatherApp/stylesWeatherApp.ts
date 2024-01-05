import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode: boolean) => {
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
  });
};
