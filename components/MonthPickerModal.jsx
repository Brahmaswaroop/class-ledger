import React, { useState, useRef, useEffect } from "react";
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

export default function MonthPickerModal({ onClose }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const yearListRef = useRef(null);
  const monthListRef = useRef(null);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        yearListRef.current?.scrollToIndex({
          index: years.indexOf(currentYear) - 1,
          animated: true,
        });
        monthListRef.current?.scrollToIndex({
          index: months.indexOf(currentMonth) - 1,
          animated: true,
        });
      }, 100); // slight delay to allow rendering
    }
  }, [modalVisible]);

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
                ref={yearListRef}
                data={years}
                keyExtractor={(item) => item.toString()}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setSelectedYear(item);
                      if (selectedMonth) {
                        setModalVisible(false);
                        onClose(selectedMonth, selectedYear);
                      }
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                getItemLayout={(data, index) => ({
                  length: 42,
                  offset: 42 * index,
                  index,
                })}
              />
              <FlatList
                ref={monthListRef}
                data={months}
                keyExtractor={(item) => item}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setSelectedMonth(item);
                      if (selectedYear) {
                        setModalVisible(false);
                        onClose(selectedMonth, selectedYear);
                      }
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                getItemLayout={(data, index) => ({
                  length: 42,
                  offset: 42 * index,
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 250,
    height: 148,
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
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#25A18E",
  },
  optionText: {
    fontSize: 16,
    color: "#004E64",
  },
});
