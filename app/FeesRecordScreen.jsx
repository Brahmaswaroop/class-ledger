import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { uploadFeesByMonth, uploadStudentFees } from "@/utils/DatabaseMethods";
import { useAppData } from "@/utils/AppDataContext";
import MonthPickerModal from "@/components/MonthPickerModal";
import ToggleButton from "@/components/ToggleButton";
import ActionButton from "@/components/ActionButton";

const FeesRecordScreen = () => {
  const [students, setStudents] = useState({});
  const [feesByMonth, setFeesByMonth] = useState({});
  const [studentFees, setStudentFees] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    students: contextStudents,
    feesByMonth: contextFeesByMonth,
    studentFees: contextFees,
    refresh,
    setRefresh,
  } = useAppData();

  useEffect(() => {
    setStudents(contextStudents || {});
    setFeesByMonth(contextFeesByMonth || {});
    setStudentFees(contextFees || {});
  }, [refresh, contextStudents, contextFeesByMonth, contextFees]);

  const uploadData = async () => {
    if (!Object.keys(feesByMonth).length) return;
    setUploading(true);
    try {
      await uploadFeesByMonth(feesByMonth);
      console.log("Upload successful");
      setRefresh((prev) => !prev);
    } catch (e) {
      console.error("Upload failed", e);
    }
    setUploading(false);
  };

  return (
    <ScrollView>
      <View style={styles.monthPickerBox}>
        <MonthPickerModal
          onClose={(selectedMonthName, selectedYear) => {
            setRefresh((prev) => !prev);
            setSelectedMonth(`${selectedMonthName}-${selectedYear}`);
          }}
        />
      </View>

      {selectedMonth && (
        <View style={styles.studentFeeBox}>
          {Object.entries(students).map(([id, student]) => {
            const currentPaidState =
              feesByMonth[selectedMonth]?.[id]?.paid || false;

            return (
              <View key={id} style={styles.studentFeeDate}>
                <ToggleButton
                  title={student.name}
                  currentState={currentPaidState}
                  onPress={(newState) => {
                    setFeesByMonth((prev) => {
                      const currentMonth = prev[selectedMonth] || {};
                      return {
                        ...prev,
                        [selectedMonth]: {
                          ...currentMonth,
                          [id]: {
                            paid: newState,
                            date: newState
                              ? new Date().toISOString().split("T")[0]
                              : null,
                          },
                        },
                      };
                    });
                    console.log(id, newState, feesByMonth);
                  }}
                />
              </View>
            );
          })}

          <ActionButton
            title={"Submit"}
            handlePress={uploadData}
            disabled={uploading}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default FeesRecordScreen;

const styles = StyleSheet.create({
  monthPickerBox: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FEFEFA",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  studentFeeBox: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FEFEFA",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  studentFeeDate: {
    marginBottom: 3,
  },
});
