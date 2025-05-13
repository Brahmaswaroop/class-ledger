import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

let years = [];
for (let i = 1970; i <= 2100; i++) {
  years.push(i);
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthPickerModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setSelectedMonth(null);
          setSelectedYear(null);
        }}
        style={styles.selectBox}
      >
        <Text>{selectedYear + " " + selectedMonth || "Select Month"}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" style={styles.modal}>
        <View style={{ flex: 1, flexDirection: "row", height: 100 }}>
          <FlatList
            data={years}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => {
                  setSelectedYear(item);
                  selectedMonth ? setModalVisible(false) : setSelected(item);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={months}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => {
                  setSelectedMonth(item);
                  selectedYear ? setModalVisible(false) : setSelected(item);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 10,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 18,
  },
});
