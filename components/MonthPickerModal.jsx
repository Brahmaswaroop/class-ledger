import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const years = Array.from({ length: 131 }, (_, i) => 1970 + i);

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

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

function CustomList({
  data,
  dataRef,
  setItem,
  closeCondition,
  setModalVisible,
  onClose,
}) {
  return (
    <FlatList
      ref={dataRef}
      data={data}
      keyExtractor={(item) => item.toString()}
      style={{ flex: 1 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setItem(item);
            if (closeCondition) {
              setModalVisible(false);
              onClose(
                typeof item === "string" ? item : closeCondition,
                typeof item === "string" ? closeCondition : item
              );
            }
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      )}
      getItemLayout={(_, index) => ({
        length: 42,
        offset: 42 * index,
        index,
      })}
    />
  );
}

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
      }, 100);
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
          <Text>{`${selectedMonth} ${selectedYear}`}</Text>
        ) : (
          <Text>Select Month and Year</Text>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalBody}>
              <CustomList
                data={years}
                dataRef={yearListRef}
                setItem={setSelectedYear}
                closeCondition={selectedMonth}
                setModalVisible={setModalVisible}
                onClose={onClose}
              />
              <CustomList
                data={months}
                dataRef={monthListRef}
                setItem={setSelectedMonth}
                closeCondition={selectedYear}
                setModalVisible={setModalVisible}
                onClose={onClose}
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
