import { StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";
import MonthPickerModal from "@/components/MonthPickerModal";

import { fetchAllStudents } from "@/components/DatabaseMethods";
import StudentButtons from "@/components/buttons/StudentButtons";
import ActionButton from "@/components/buttons/ActionButton";

const FeesRecords = () => {
  const [students, setStudents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = async () => {
    const studentsData = await fetchAllStudents();
    setStudents(studentsData || {});
    console.log("Fetched students:", studentsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <View>
        <MonthPickerModal />
      </View>
      <View></View>
    </>
  );
};

export default FeesRecords;

const styles = StyleSheet.create({});
