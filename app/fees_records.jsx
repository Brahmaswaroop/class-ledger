import { ScrollView, StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";
import { fetchAllStudents } from "@/components/DatabaseMethods";
import MonthPickerModal from "@/components/MonthPickerModal";
import StudentButtons from "@/components/buttons/StudentButtons";
import DateSelector from "@/components/DateSelector";

export default FeesRecords = () => {
  const [students, setStudents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = async () => {
    const studentsData = await fetchAllStudents();
    setStudents(studentsData || {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScrollView>
        <View>
          <MonthPickerModal
            onClose={(selectedYear, selectedMonth) => {
              setSelectedDate(`${selectedYear} ${selectedMonth}`);
            }}
          />
        </View>
        {selectedDate && (
          <View>
            {Object.entries(students).map(([id, student]) => (
              <>
                <StudentButtons
                  key={id}
                  IdOfStudent={id}
                  title={student.name}
                  presentState={true}
                  onPress={(IdOfStudent, presentState) => {
                    console.log(
                      `Student ID: ${IdOfStudent}, Present State: ${presentState}`
                    );
                  }}
                />
                <DateSelector key={`D${id}`} />
              </>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});
