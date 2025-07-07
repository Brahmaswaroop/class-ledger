import { ScrollView, StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";
import { uploadFeesByMonth, uploadStudentFees } from "@/utils/DatabaseMethods";
import { useAppData } from "@/utils/AppDataContext";
import MonthPickerModal from "@/components/MonthPickerModal";
import ToggleButton from "@/components/ToggleButton";
import ActionButton from "@/components/ActionButton";

export default FeesRecordScreen = () => {
  const [students, setStudents] = useState({});
  const [feesByMonth, setFeesByMonth] = useState({});
  const [studentFees, setStudentFees] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);

  const {
    students: contextStudents,
    feesByMonth: contextFeesByMonth,
    studentFees: contextFees,
  } = useAppData();

  useEffect(() => {
    setStudents(contextStudents || {});
    setFeesByMonth(contextFeesByMonth || {});
    setStudentFees(contextFees || {});
  }, [contextFeesByMonth, contextStudents, contextFees]);

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
