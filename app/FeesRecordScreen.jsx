import { ScrollView, StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";
import {
  fetchAllStudents,
  fetchFeesByMonth,
  fetchStudentFees,
  uploadFeesByMonth,
  uploadStudentFees,
} from "@/components/DatabaseMethods";
import MonthPickerModal from "@/components/MonthPickerModal";
import ToggleButton from "@/components/buttons/StudentButtons";
import ActionButton from "@/components/buttons/ActionButton";

export default FeesRecords = () => {
  const [students, setStudents] = useState({});
  const [feesByMonth, setFeesByMonth] = useState({});
  const [studentFees, setStudentFees] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);

  const fetchData = async () => {
    const studentsData = await fetchAllStudents();
    setStudents(studentsData || {});
    const feesData = await fetchFeesByMonth();
    setFeesByMonth(feesData || {});
    const studentFeesData = await fetchStudentFees();
    setStudentFees(studentFeesData || {});
    console.log("Fetched fees by month:", feesData);
    console.log("Fetched student fees:", studentFeesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadData = async () => {
    if (Object.keys(feesByMonth).length > 0) {
      const result = await uploadFeesByMonth(feesByMonth);
      console.log("Upload fees by month result:", result);
    }
  };

  return (
    <>
      <ScrollView>
        <View>
          <MonthPickerModal
            onClose={(selectedYear, selectedMonth) => {
              setSelectedMonth(`${selectedMonth}-${selectedYear}`);
            }}
          />
        </View>
        {selectedMonth && (
          <View>
            {Object.entries(students).map(([id, student]) => (
              <View key={id} style={styles.studentFeeDate}>
                <ToggleButton
                  IdOfStudent={id}
                  title={student.name}
                  presentState={feesByMonth[selectedMonth]?.[id]?.paid ?? false}
                  onPress={(IdOfStudent, presentState) => {
                    setFeesByMonth((prev) => ({
                      ...prev,
                      [selectedMonth]: {
                        ...(prev[selectedMonth] || {}),
                        [IdOfStudent]: {
                          paid: presentState,
                          date: presentState
                            ? new Date().toISOString().split("T")[0]
                            : null,
                        },
                      },
                    }));
                  }}
                />
              </View>
            ))}
            <ActionButton
              title={"Submit"}
              handlePress={() => {
                uploadData();
              }}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  studentFeeDate: {
    padding: 10,
  },
});
