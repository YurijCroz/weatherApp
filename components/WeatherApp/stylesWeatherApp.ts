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
