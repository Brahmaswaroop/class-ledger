import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, TextInput, Button } from "react-native-paper";

const newStudentId = (studentsList) => {
  const studentCount = studentsList ? Object.keys(studentsList).at(-1) : 0;
  const studentCountNum = studentCount ? parseInt(studentCount.slice(3)) : 0;
  return `STD${String(studentCountNum + 1).padStart(3, "0")}`;
};

const updateStudent = (studentsList, studentId, studentDetails) => {
  return { ...studentsList, [studentId]: studentDetails }; // RETURN a NEW object
};

export default StudentDetailsEditorPopup = ({
  studentsList,
  student,
  onClose,
  onSave,
  IsNewEntry,
}) => {
  const [studentDetails, setStudentDetails] = useState(
    IsNewEntry ? {} : student.data
  );

  const handleSave = () => {
    let updatedStudentsList = updateStudent(
      studentsList,
      IsNewEntry ? newStudentId(studentsList) : student.id,
      studentDetails
    );
    onSave(updatedStudentsList);
    onClose();
  };

  // Helper function to render TextInput with common styles
  const renderInput = (label, key, options = {}) => (
    <TextInput
      label={label}
      value={studentDetails[key] || ""}
      onChangeText={(text) =>
        setStudentDetails((prev) => ({ ...prev, [key]: text }))
      }
      mode="outlined"
      returnKeyType="enter"
      style={styles.text}
      {...options}
    />
  );

  return (
    <Portal>
      <Dialog visible onDismiss={onClose}>
        <Dialog.Title>
          {IsNewEntry ? "Add Student" : "Edit Student"}
        </Dialog.Title>
        <Dialog.Content>
          {renderInput("Name", "name", {
            placeholder: "3–20 characters",
            autoFocus: { IsNewEntry },
          })}
          {renderInput("Class", "class", {
            placeholder: "between 1 to 12",
            keyboardType: "numeric",
          })}
          {renderInput("Date of Joining", "dateOfJoining", {
            placeholder: "YYYY/MM/DD",
          })}
          {renderInput("Fees assigned", "feesAssigned", {
            placeholder: "Enter fees:",
            keyboardType: "numeric",
          })}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={() => {
              if (
                !studentDetails.name ||
                !studentDetails.class ||
                !studentDetails.dateOfJoining ||
                !studentDetails.feesAssigned
              ) {
                alert("Please fill all the fields");
                return;
              }
              handleSave();
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  text: { marginBottom: 10 },
});
