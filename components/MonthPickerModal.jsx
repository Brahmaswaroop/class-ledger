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

const currentMonth = new Date().toLocaleString("default", {
  month: "long",
});
const currentYear = new Date().getFullYear();

export default function MonthPickerModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

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
        {selectedMonth && selectedYear ? (
          <Text>
            {selectedYear} {selectedMonth}
          </Text>
        ) : (
          <Text>Select Month and Year</Text>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalBody}>
              <FlatList
                data={years}
                keyExtractor={(item) => item.toString()}
                style={styles.list}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setSelectedYear(item);
                      if (selectedMonth) setModalVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={currentYear - 1970 - 1}
                getItemLayout={(data, index) => ({
                  length: 40, // height of each item (adjust to match your style)
                  offset: 40 * index,
                  index,
                })}
              />
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                style={styles.list}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setSelectedMonth(item);
                      if (selectedYear) setModalVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={months.indexOf(currentMonth) - 1}
                getItemLayout={(data, index) => ({
                  length: 40, // height of each item (adjust to match your style)
                  offset: 40 * index,
                  index,
                })}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 250,
    height: 126,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  modalBody: {
    flexDirection: "row",
    flex: 1,
  },
  list: {
    flex: 1,
    marginBottom: 10,
  },
  option: {
    backgroundColor: "#f8f8f8",
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#25A18E",
  },
  optionText: {
    fontSize: 16,
    color: "#004E64",
  },
});
