import React, { FC } from "react";
import {
  Modal,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface IDaySelectionModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDays: React.Dispatch<React.SetStateAction<number>>;
  isDarkMode: boolean;
}

interface IDayItem {
  item: number;
}

const DaySelectionModal: FC<IDaySelectionModal> = ({
  modalVisible,
  setModalVisible,
  setSelectedDays,
  isDarkMode,
}) => {
  const styles = getStyles(isDarkMode);

  const renderDayItem = ({ item }: IDayItem) => (
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
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
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
  });
};

export default DaySelectionModal;
